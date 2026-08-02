from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from app.models.schemas import ClinicalInput, PredictionResponse
from app.services.reasoning import ClinicalReasoningEngine
from app.ml.inference import ModelInference
from app.core.supabase import get_db_connection

router = APIRouter()
reasoning_engine = ClinicalReasoningEngine()
inference_service = ModelInference()

@router.post("/", response_model=PredictionResponse)
def predict_risk(
    features: ClinicalInput, 
    use_logistic: bool = False, 
    patient_id: Optional[str] = None,
    db = Depends(get_db_connection)
):
    """
    Predicts the risk of prostate cancer based on patient features.
    Handles dual-model inference (XGBoost or Calibrated Logistic Regression)
    and returns SHAP explanations synthesized into a plain-language narrative.
    Saves the prediction to the database if patient_id is provided.
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
        prediction_result.patient_id = patient_id
        
        # Persist prediction to the database if a patient ID is provided
        if patient_id:
            try:
                numeric_age = int(features.age_band.split('-')[0].replace('+', ''))
            except ValueError:
                numeric_age = 50
                
            model_used = "logistic_regression" if use_logistic else "xgboost"
            risk_score = prediction_result.logistic_risk_score if use_logistic else prediction_result.xgboost_probability
            
            cursor = db.cursor()
            insert_query = """
                INSERT INTO prediction_history (
                    patient_id, age, psa_level, psa_density, dre_finding, family_history, 
                    bmi_category, comorbidities, model_used, risk_score, risk_category, shap_summary
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                patient_id, numeric_age, features.psa_level, features.psa_density, 
                features.dre_finding, features.family_history, features.bmi_category, 
                "", model_used, risk_score, prediction_result.risk_category, narrative
            ))
            db.commit()
            cursor.close()
            
        return prediction_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference or persistence failed: {str(e)}")
