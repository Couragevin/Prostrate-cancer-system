"""
Guards against training/serving skew.

If the encoding in app.ml.features drifts from what the committed artifacts were
trained on, every prediction is silently wrong: the model still returns a
confident number, just for the wrong feature vector. These tests fail loudly instead.
"""

import json
from pathlib import Path

import pytest

from app.ml.features import (
    AGE_BAND_MAP,
    BMI_CATEGORY_MAP,
    DRE_FINDING_MAP,
    FEATURE_LABELS,
    FEATURE_ORDER,
    RISK_CLASSES,
    build_frame,
)

ARTIFACT_DIR = Path(__file__).resolve().parents[1] / "app" / "ml" / "artifacts"

SAMPLE = {
    "age_band": "60-69",
    "psa_level": 7.4,
    "psa_density": 0.21,
    "family_history": True,
    "bmi_category": "Obese",
    "hypertension": False,
    "diabetes": True,
    "dre_finding": "Abnormal",
}


def test_artifacts_are_present():
    for name in ("xgboost_model.joblib", "logistic_regression_calibrated.joblib", "metadata.json"):
        assert (ARTIFACT_DIR / name).exists(), f"Missing {name}. Run: python train_models.py"


def test_artifact_feature_order_matches_code():
    metadata = json.loads((ARTIFACT_DIR / "metadata.json").read_text())
    assert metadata["feature_order"] == FEATURE_ORDER
    assert metadata["risk_classes"] == RISK_CLASSES


def test_build_frame_preserves_column_order():
    frame = build_frame([SAMPLE])
    assert list(frame.columns) == FEATURE_ORDER
    assert len(frame) == 1


def test_encodings_are_ordinal_and_monotonic():
    assert list(AGE_BAND_MAP.values()) == sorted(AGE_BAND_MAP.values())
    assert list(BMI_CATEGORY_MAP.values()) == sorted(BMI_CATEGORY_MAP.values())
    # Suspicious must sit between Normal and Abnormal on the severity scale.
    assert DRE_FINDING_MAP["Normal"] < DRE_FINDING_MAP["Suspicious"] < DRE_FINDING_MAP["Abnormal"]


def test_every_feature_has_a_display_label():
    """A missing label would render a raw snake_case key in the SHAP chart."""
    assert set(FEATURE_LABELS) >= set(FEATURE_ORDER)


@pytest.mark.parametrize("truthy", [True, "True", "true", 1])
def test_bool_coercion_handles_csv_and_json_forms(truthy):
    assert build_frame([{**SAMPLE, "family_history": truthy}])["family_history"].iloc[0] == 1


@pytest.mark.parametrize("falsy", [False, "False", "false", 0])
def test_bool_coercion_handles_false_forms(falsy):
    assert build_frame([{**SAMPLE, "family_history": falsy}])["family_history"].iloc[0] == 0
