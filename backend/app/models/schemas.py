from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any, Union, Literal

class ClinicalInput(BaseModel):
    """
    Pydantic schema representing the clinical input required for the dual-model pipeline.
    Target demographic: Nigerian men aged 40 and above.

    Categorical fields are Literals rather than bare strings so an unrecognised
    value is rejected with a 422 instead of being silently coerced to a default
    band - a silent coercion would return a confident risk score for input the
    model never actually received.
    """
    age_band: Literal["40-49", "50-59", "60-69", "70+"] = Field(
        ..., description="Age category."
    )
    psa_level: float = Field(
        ..., ge=0.0, le=1000.0, description="Latest Prostate-Specific Antigen (PSA) level in ng/mL."
    )
    psa_density: float = Field(
        ..., ge=0.0, le=100.0, description="PSA density (PSA / prostate volume)."
    )
    family_history: bool = Field(default=False, description="Family history of prostate cancer.")
    bmi_category: Literal["Normal", "Overweight", "Obese"] = Field(
        ..., description="BMI category."
    )
    hypertension: bool = Field(default=False, description="Diagnosed hypertension.")
    diabetes: bool = Field(default=False, description="Diagnosed diabetes mellitus.")
    dre_finding: Literal["Normal", "Suspicious", "Abnormal"] = Field(
        ..., description="Digital Rectal Exam (DRE) finding."
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "age_band": "50-59",
                "psa_level": 4.5,
                "psa_density": 0.12,
                "family_history": True,
                "bmi_category": "Overweight",
                "hypertension": False,
                "diabetes": False,
                "dre_finding": "Abnormal"
            }
        }
    )

class BasePredictionResponse(BaseModel):
    patient_id: Optional[str] = None
    risk_category: str = Field(..., description="Risk category: Low, Intermediate, or High.")
    shap_summary: str = Field(..., description="Plain-language summary of the SHAP explanations for clinicians.")
    shap_values: Optional[Dict[str, float]] = Field(default=None, description="Feature importances based on SHAP.")
    class_probabilities: Optional[Dict[str, float]] = Field(
        default=None,
        description="Full probability distribution across Low / Intermediate / High.",
    )
    shap_basis: Optional[str] = Field(
        default=None,
        description="Which model the SHAP attributions were computed against.",
    )

class XGBoostResponse(BasePredictionResponse):
    model_type: Literal['xgboost'] = 'xgboost'
    xgboost_probability: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description=(
            "Expected-severity risk index on [0, 1] from the primary XGBoost classifier: "
            "sum(P(class) * severity), severity Low=0, Intermediate=0.5, High=1. "
            "An ordinal index, not the probability of a single event."
        ),
    )

class LogisticRegressionResponse(BasePredictionResponse):
    model_type: Literal['logistic_regression'] = 'logistic_regression'
    logistic_risk_score: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description=(
            "Expected-severity risk index on [0, 1] from the logistic regression "
            "calibrated via Platt scaling (sigmoid) against this cohort's prevalence."
        ),
    )

# Discriminated union for the response
PredictionResponse = Union[XGBoostResponse, LogisticRegressionResponse]

class HealthResponse(BaseModel):
    status: str
    message: str
    version: str = "1.0.0"
    models_loaded: bool = Field(
        default=False, description="Whether the ML artifacts loaded successfully at start-up."
    )
    model_error: Optional[str] = Field(
        default=None, description="Artifact loading error, if any."
    )
