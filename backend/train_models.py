"""
Trains the dual-model risk stratification pipeline from the bundled dataset.

    python train_models.py

Produces, in app/ml/artifacts/:
    xgboost_model.joblib                  - primary multiclass XGBoost classifier
    logistic_regression_calibrated.joblib - Platt-scaled logistic regression
    metadata.json                         - feature order, class order, metrics

Run this whenever prostate_cancer_dataset.csv changes. The artifacts are
committed so the API has no train-time dependency at boot.
"""

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.calibration import CalibratedClassifierCV
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier

from app.ml.features import FEATURE_ORDER, RISK_CLASSES, build_frame

BASE_DIR = Path(__file__).parent
DATASET_PATH = BASE_DIR / "prostate_cancer_dataset.csv"
ARTIFACT_DIR = BASE_DIR / "app" / "ml" / "artifacts"

RANDOM_STATE = 42


def load_dataset() -> tuple[pd.DataFrame, np.ndarray]:
    df = pd.read_csv(DATASET_PATH)

    missing = [c for c in FEATURE_ORDER + ["target_risk"] if c not in df.columns]
    if missing:
        raise ValueError(f"Dataset is missing required columns: {missing}")

    X = build_frame(df.to_dict(orient="records"))
    y = df["target_risk"].map({label: i for i, label in enumerate(RISK_CLASSES)}).to_numpy()

    if pd.isna(y).any():
        unexpected = sorted(set(df["target_risk"]) - set(RISK_CLASSES))
        raise ValueError(f"Unexpected target_risk values: {unexpected}")

    return X, y


def evaluate(name: str, model, X_test: pd.DataFrame, y_test: np.ndarray) -> dict:
    proba = model.predict_proba(X_test)
    preds = proba.argmax(axis=1)

    accuracy = float(accuracy_score(y_test, preds))
    # One-vs-rest macro AUC: the target is 3-class, so a plain binary AUC
    # would not be defined here.
    auc = float(roc_auc_score(y_test, proba, multi_class="ovr", average="macro"))

    print(f"\n=== {name} ===")
    print(f"accuracy      : {accuracy:.3f}")
    print(f"roc_auc (ovr) : {auc:.3f}")
    print(classification_report(y_test, preds, target_names=RISK_CLASSES, zero_division=0))

    return {"accuracy": round(accuracy, 4), "roc_auc_ovr_macro": round(auc, 4)}


def main() -> None:
    X, y = load_dataset()
    print(f"Loaded {len(X)} rows, {len(FEATURE_ORDER)} features.")
    print("Class balance:", {RISK_CLASSES[i]: int((y == i).sum()) for i in range(len(RISK_CLASSES))})

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE, stratify=y
    )

    # --- Primary model: multiclass XGBoost -------------------------------
    # Shallow trees and a modest estimator count: 400 rows of training data
    # overfits fast, and SHAP TreeExplainer stays cheap on a small ensemble.
    xgb = XGBClassifier(
        n_estimators=220,
        max_depth=3,
        learning_rate=0.08,
        subsample=0.9,
        colsample_bytree=0.9,
        reg_lambda=1.5,
        objective="multi:softprob",
        num_class=len(RISK_CLASSES),
        eval_metric="mlogloss",
        random_state=RANDOM_STATE,
        n_jobs=2,
    )
    xgb.fit(X_train, y_train)
    xgb_metrics = evaluate("XGBoost (primary)", xgb, X_test, y_test)

    # --- Secondary model: Platt-scaled logistic regression ---------------
    # CalibratedClassifierCV(method="sigmoid") *is* Platt scaling: it fits a
    # sigmoid to the base classifier's scores via cross-validation, so the
    # emitted probabilities track the observed prevalence in this cohort.
    lr_base = Pipeline(
        [
            ("scaler", StandardScaler()),
            ("clf", LogisticRegression(max_iter=2000, random_state=RANDOM_STATE)),
        ]
    )
    lr_calibrated = CalibratedClassifierCV(lr_base, method="sigmoid", cv=5)
    lr_calibrated.fit(X_train, y_train)
    lr_metrics = evaluate("Logistic Regression (Platt-scaled)", lr_calibrated, X_test, y_test)

    # --- Persist ---------------------------------------------------------
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(xgb, ARTIFACT_DIR / "xgboost_model.joblib")
    joblib.dump(lr_calibrated, ARTIFACT_DIR / "logistic_regression_calibrated.joblib")

    # Honesty check. If a depth-3 decision tree fits the whole dataset
    # perfectly, the labels are a deterministic function of the features -
    # i.e. synthetic data generated from a rule base. The headline metrics then
    # measure how well the model recovers that rule, NOT clinical predictive
    # performance, and must never be reported as the latter.
    baseline_tree = DecisionTreeClassifier(max_depth=3, random_state=RANDOM_STATE).fit(X, y)
    rule_recoverable = bool(baseline_tree.score(X, y) >= 0.999)
    if rule_recoverable:
        print(
            "\n!! A depth-3 decision tree fits this dataset perfectly.\n"
            "   The labels are rule-derived (synthetic), so the accuracy/AUC above\n"
            "   describe rule recovery, not clinical validity. Report them as such."
        )

    metadata = {
        "feature_order": FEATURE_ORDER,
        "risk_classes": RISK_CLASSES,
        "n_samples": int(len(X)),
        "n_train": int(len(X_train)),
        "n_test": int(len(X_test)),
        "random_state": RANDOM_STATE,
        "metrics": {"xgboost": xgb_metrics, "logistic_regression_calibrated": lr_metrics},
        "labels_are_rule_derived": rule_recoverable,
        "metrics_caveat": (
            "Dataset labels are reproducible by a depth-3 decision tree, indicating "
            "synthetic rule-generated ground truth. Metrics measure recovery of that "
            "rule, not clinical predictive performance on real patients."
        )
        if rule_recoverable
        else None,
    }
    (ARTIFACT_DIR / "metadata.json").write_text(json.dumps(metadata, indent=2))

    print(f"\nArtifacts written to {ARTIFACT_DIR}")


if __name__ == "__main__":
    main()
