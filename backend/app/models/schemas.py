from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any, Union, Literal

class ClinicalInput(BaseModel):
    """
    Pydantic schema representing the clinical input required for the dual-model pipeline.
    Target demographic: Nigerian men aged 40 and above.
    """
    age_band: str = Field(..., description="Age category, e.g., '40-49', '50-59', '60-69', '70+'.")
    psa_level: float = Field(..., ge=0.0, description="Latest Prostate-Specific Antigen (PSA) level in ng/mL.")
    psa_density: float = Field(..., ge=0.0, description="PSA density (PSA / prostate volume).")
    family_history: bool = Field(default=False, description="Family history of prostate cancer.")
    bmi_category: str = Field(..., description="BMI category, e.g., 'Normal', 'Overweight', 'Obese'.")
    hypertension: bool = Field(default=False, description="History of hypertension.")
    diabetes: bool = Field(default=False, description="History of diabetes mellitus.")
    dre_finding: str = Field(..., description="Digital Rectal Exam (DRE) finding, e.g., 'Normal', 'Abnormal'.")
    
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

class XGBoostResponse(BasePredictionResponse):
    model_type: Literal['xgboost'] = 'xgboost'
    xgboost_probability: float = Field(..., description="Raw probability from the primary XGBoost classifier (0-1).")

class LogisticRegressionResponse(BasePredictionResponse):
    model_type: Literal['logistic_regression'] = 'logistic_regression'
    logistic_risk_score: float = Field(..., description="Calibrated risk score reflecting Nigerian epidemiological prevalence via Platt scaling.")

# Discriminated union for the response
PredictionResponse = Union[XGBoostResponse, LogisticRegressionResponse]

class HealthResponse(BaseModel):
    status: str
    message: str
    version: str = "1.0.0"
