from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any

class PatientFeatures(BaseModel):
    """
    Pydantic schema representing the patient features required for the model pipeline.
    Target demographic: Nigerian men aged 40 and above.
    """
    age: int = Field(..., ge=40, description="Patient age, must be 40 or older.")
    psa_level: float = Field(..., ge=0.0, description="Latest Prostate-Specific Antigen (PSA) level in ng/mL.")
    psa_history: Optional[List[float]] = Field(default=None, description="Longitudinal PSA history to track risk over time.")
    family_history: bool = Field(default=False, description="Family history of prostate cancer.")
    # Add other relevant clinical features based on final model
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "age": 55,
                "psa_level": 4.5,
                "psa_history": [2.1, 3.0, 4.5],
                "family_history": True
            }
        }
    )

class PredictionResponse(BaseModel):
    """
    Pydantic schema for the prediction output, including explainability summaries.
    """
    patient_id: Optional[str] = None
    risk_score: float = Field(..., description="Calibrated risk score reflecting Nigerian epidemiological prevalence (0-1).")
    risk_category: str = Field(..., description="Risk category: Low, Intermediate, or High.")
    shap_summary: str = Field(..., description="Plain-language summary of the SHAP explanations for clinicians.")
    shap_values: Optional[Dict[str, float]] = Field(default=None, description="Feature importances based on SHAP.")

class HealthResponse(BaseModel):
    status: str
    message: str
