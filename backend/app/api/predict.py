from typing import Optional

from fastapi import APIRouter, HTTPException

from app.ml.inference import ModelsUnavailableError, inference_service
from app.models.schemas import ClinicalInput, PredictionResponse
from app.services.reasoning import ClinicalReasoningEngine

router = APIRouter()
reasoning_engine = ClinicalReasoningEngine()


@router.post("/", response_model=PredictionResponse)
def predict_risk(
    features: ClinicalInput,
    use_logistic: bool = False,
    patient_id: Optional[str] = None,
):
    """
    Predicts the risk of prostate cancer based on patient features.
    Handles dual-model inference (XGBoost or Platt-calibrated Logistic Regression)
    and returns SHAP explanations synthesized into a plain-language narrative.
    """
    try:
        prediction_result = inference_service.predict_and_explain(features, use_logistic)
    except ModelsUnavailableError as exc:
        # 503, not 500: the service is temporarily unable to serve predictions,
        # and the client should be told to retry rather than shown a bug.
        raise HTTPException(
            status_code=503,
            detail=f"Risk model is unavailable: {exc}",
        ) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Model inference failed: {exc}") from exc

    prediction_result.shap_summary = reasoning_engine.generate_narrative(
        features=features,
        risk_category=prediction_result.risk_category,
        shap_values=prediction_result.shap_values,
    )
    prediction_result.patient_id = patient_id

    return prediction_result
