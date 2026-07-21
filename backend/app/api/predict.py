from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import ClinicalInput, PredictionResponse
from app.services.reasoning import ClinicalReasoningEngine
from app.ml.inference import ModelInference

router = APIRouter()
reasoning_engine = ClinicalReasoningEngine()
inference_service = ModelInference()

@router.post("/", response_model=PredictionResponse)
def predict_risk(features: ClinicalInput, use_logistic: bool = False):
    """
    Predicts the risk of prostate cancer based on patient features.
    Handles dual-model inference (XGBoost or Calibrated Logistic Regression)
    and returns SHAP explanations synthesized into a plain-language narrative.
    """
    try:
        # ML Inference
        prediction_result = inference_service.predict_and_explain(features, use_logistic)
        
        # Synthesize Clinical Narrative
        narrative = reasoning_engine.generate_narrative(
            features=features,
            risk_category=prediction_result.risk_category,
            shap_values=prediction_result.shap_values
        )
        
        # Enhance the result with the comprehensive narrative
        prediction_result.shap_summary = narrative
        
        return prediction_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")
