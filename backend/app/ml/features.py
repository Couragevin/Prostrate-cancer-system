"""
Single source of truth for feature encoding.

Both the training script and the inference service import from here, so the
column order and the categorical encodings can never drift apart. Training/serving
skew of this kind is silent: the model still returns a number, it is just the
wrong number.
"""

from typing import Any, Dict, List

import pandas as pd

# Column order the models are trained on. Order matters: XGBoost matches by
# position, so a reordering here silently corrupts every prediction.
FEATURE_ORDER: List[str] = [
    "age_band",
    "psa_level",
    "psa_density",
    "family_history",
    "bmi_category",
    "hypertension",
    "diabetes",
    "dre_finding",
]

# Human-readable labels for the SHAP chart / narrative.
FEATURE_LABELS: Dict[str, str] = {
    "age_band": "Age Band",
    "psa_level": "PSA Level",
    "psa_density": "PSA Density",
    "family_history": "Family History",
    "bmi_category": "BMI Category",
    "hypertension": "Hypertension",
    "diabetes": "Diabetes",
    "dre_finding": "DRE Finding",
}

# Ordinal encodings. These are ordered severity scales rather than one-hot
# columns, which keeps the feature space small (500 training rows) and keeps the
# SHAP output readable: one bar per clinical concept instead of one per level.
AGE_BAND_MAP: Dict[str, int] = {"40-49": 0, "50-59": 1, "60-69": 2, "70+": 3}
BMI_CATEGORY_MAP: Dict[str, int] = {"Normal": 0, "Overweight": 1, "Obese": 2}

# NOTE: the bundled training set only contains "Normal" and "Abnormal". The UI
# also offers "Suspicious" (induration), which is clinically intermediate, so it
# is encoded as 1 and sits between the two observed levels on the ordinal scale.
# It is an interpolation, not a level the model has actually seen - see README.
DRE_FINDING_MAP: Dict[str, int] = {"Normal": 0, "Suspicious": 1, "Abnormal": 2}

# Risk classes, in the order the classifiers emit their probabilities.
RISK_CLASSES: List[str] = ["Low", "Intermediate", "High"]


def _coerce_bool(value: Any) -> int:
    """Accept real bools, numerics, and the string forms pandas reads from CSV."""
    if isinstance(value, str):
        return int(value.strip().lower() in {"true", "1", "yes"})
    return int(bool(value))


def encode_row(raw: Dict[str, Any]) -> Dict[str, float]:
    """Encode one patient record into the model's numeric feature space."""
    return {
        "age_band": AGE_BAND_MAP.get(str(raw.get("age_band")), 1),
        "psa_level": float(raw.get("psa_level") or 0.0),
        "psa_density": float(raw.get("psa_density") or 0.0),
        "family_history": _coerce_bool(raw.get("family_history")),
        "bmi_category": BMI_CATEGORY_MAP.get(str(raw.get("bmi_category")), 0),
        "hypertension": _coerce_bool(raw.get("hypertension")),
        "diabetes": _coerce_bool(raw.get("diabetes")),
        "dre_finding": DRE_FINDING_MAP.get(str(raw.get("dre_finding")), 0),
    }


def build_frame(rows: List[Dict[str, Any]]) -> pd.DataFrame:
    """Encode records into a DataFrame with the exact training column order."""
    return pd.DataFrame([encode_row(row) for row in rows], columns=FEATURE_ORDER)
