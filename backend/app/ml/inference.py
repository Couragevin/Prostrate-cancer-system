import json
import threading
from pathlib import Path
from typing import Dict, List, Optional

import joblib
import numpy as np
import xgboost as xgb

from app.ml.features import FEATURE_ORDER, RISK_CLASSES, build_frame
from app.models.schemas import (
    ClinicalInput,
    LogisticRegressionResponse,
    PredictionResponse,
    XGBoostResponse,
)

ARTIFACT_DIR = Path(__file__).parent / "artifacts"


class ModelsUnavailableError(RuntimeError):
    """Raised when a prediction is requested but the artifacts never loaded."""


class ModelInference:
    """
    Dual-model risk stratification:
      1. Primary multiclass XGBoost classifier
      2. Logistic regression calibrated via Platt scaling (sigmoid)
      3. TreeSHAP feature attribution for Explainable AI (XAI)

    TreeSHAP is computed through XGBoost's native `pred_contribs` rather than the
    standalone `shap` package: shap 0.46 cannot parse an XGBoost 3.x multiclass
    model dump (it chokes on the vector-valued base_score). `pred_contribs` is
    the same exact TreeSHAP algorithm implemented inside XGBoost, and it is
    additively exact - contributions plus bias reconstruct the raw class margin.

    Artifacts are produced by `python train_models.py` and loaded once at
    application start-up. There is deliberately no silent numeric fallback: a
    clinical decision support tool that invents a plausible-looking risk score
    when its model is missing is worse than one that reports an outage.
    """

    def __init__(self) -> None:
        self.xgb_model = None
        self.lr_model = None
        self.xgb_explainer = None
        self.lr_explainer = None
        self.metadata: Dict = {}
        self.models_loaded = False
        self.load_error: Optional[str] = None
        self._lock = threading.Lock()

    def load_models(self) -> bool:
        """Load artifacts from disk. Returns True on success."""
        with self._lock:
            try:
                self.xgb_model = joblib.load(ARTIFACT_DIR / "xgboost_model.joblib")
                self.lr_model = joblib.load(ARTIFACT_DIR / "logistic_regression_calibrated.joblib")

                metadata_path = ARTIFACT_DIR / "metadata.json"
                if metadata_path.exists():
                    self.metadata = json.loads(metadata_path.read_text())

                trained_order = self.metadata.get("feature_order")
                if trained_order and list(trained_order) != list(FEATURE_ORDER):
                    raise ValueError(
                        "Feature order in artifacts does not match app.ml.features."
                        f" Artifacts: {trained_order}. Code: {FEATURE_ORDER}."
                        " Re-run train_models.py."
                    )

                # Booster handle used for native TreeSHAP contributions.
                self.xgb_explainer = self.xgb_model.get_booster()

                self.models_loaded = True
                self.load_error = None
                print(f"ML artifacts loaded from {ARTIFACT_DIR}")
            except Exception as exc:  # noqa: BLE001 - surfaced via /health
                self.models_loaded = False
                self.load_error = f"{type(exc).__name__}: {exc}"
                print(f"ML artifact loading FAILED: {self.load_error}")

            return self.models_loaded

    def _shap_for_prediction(self, frame, predicted_class: int) -> Dict[str, float]:
        """
        TreeSHAP attributions explaining the class the model actually predicted.

        `pred_contribs` returns (n_rows, n_classes, n_features + 1) for a
        multiclass model, where the trailing column is the bias/base term. Only
        the row for the predicted class is reported, so the chart explains the
        classification the clinician is actually looking at.
        """
        contributions = np.asarray(
            self.xgb_explainer.predict(xgb.DMatrix(frame), pred_contribs=True)
        )

        if contributions.ndim == 3:
            values = contributions[0, predicted_class, :-1]
        else:
            # Binary/regression layout: (n_rows, n_features + 1)
            values = contributions[0, :-1]

        return {name: float(value) for name, value in zip(FEATURE_ORDER, values)}

    def predict_and_explain(
        self, features: ClinicalInput, use_logistic: bool = False
    ) -> PredictionResponse:
        if not self.models_loaded:
            raise ModelsUnavailableError(
                self.load_error or "Model artifacts are not loaded. Run train_models.py."
            )

        frame = build_frame([features.model_dump()])

        model = self.lr_model if use_logistic else self.xgb_model
        probabilities: List[float] = model.predict_proba(frame)[0].tolist()

        predicted_class = int(np.argmax(probabilities))
        category = RISK_CLASSES[predicted_class]

        # Headline score: an expected-severity index over the ordinal risk
        # classes, sum(P(class) * severity(class)) with severity Low=0,
        # Intermediate=0.5, High=1.
        #
        # NOT simply P(High) or P(not Low). On this cohort the classifier
        # saturates near 0/1, so P(not Low) returns ~0.9996 for an Intermediate
        # patient and ~0.9997 for a High one - indistinguishable on a gauge.
        # The index instead lands near 0.0 / 0.5 / 1.0 respectively, so the
        # displayed figure separates the three strata and stays monotonic in
        # severity. It is an index on [0, 1], not a probability of one event.
        severities = np.linspace(0.0, 1.0, len(RISK_CLASSES))
        risk_score = float(np.dot(probabilities, severities))

        # Attribution always comes from the primary tree model. A linear
        # explainer over CalibratedClassifierCV is not well-defined (the
        # calibrator wraps a scaler+LR pipeline per CV fold), so the response
        # labels its attribution basis explicitly rather than implying the SHAP
        # values describe whichever model produced the score.
        xgb_class = int(np.argmax(self.xgb_model.predict_proba(frame)[0])) if use_logistic else predicted_class
        shap_values = self._shap_for_prediction(frame, xgb_class)

        class_probabilities = {
            label: round(float(p), 6) for label, p in zip(RISK_CLASSES, probabilities)
        }

        common = {
            "risk_category": category,
            "shap_summary": "",  # populated by the reasoning engine in the route
            "shap_values": shap_values,
            "class_probabilities": class_probabilities,
            "shap_basis": "xgboost",
        }

        if use_logistic:
            return LogisticRegressionResponse(**common, logistic_risk_score=risk_score)
        return XGBoostResponse(**common, xgboost_probability=risk_score)


# Single shared instance; `load_models()` is called from the FastAPI lifespan.
inference_service = ModelInference()
