from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import PatientFeatures, PredictionResponse
from app.services.clinical_rules import ClinicalRulesEngine
from app.ml.inference import ModelInference

router = APIRouter()
rules_engine = ClinicalRulesEngine()
inference_service = ModelInference()

@router.post("/", response_model=PredictionResponse)
def predict_risk(features: PatientFeatures):
    """
    Predicts the risk of prostate cancer based on patient features.
    It combines rule-based clinical guidelines with the ML pipeline (XGBoost + Platt-scaled Logistic Regression).
    """
    # 1. Apply preliminary clinical rules
    rule_decision = rules_engine.evaluate_guidelines(features)
    
    # 2. ML Inference and Explainability
    try:
        prediction_result = inference_service.predict_and_explain(features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")
        
    return PredictionResponse(
        risk_score=prediction_result.get("risk_score"),
        risk_category=prediction_result.get("risk_category"),
        shap_summary=prediction_result.get("shap_summary"),
        shap_values=prediction_result.get("shap_values")
    )
