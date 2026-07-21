from fastapi import APIRouter, HTTPException, Depends
from typing import List, Any
from app.core.supabase import get_db_connection

router = APIRouter()

@router.get("/{patient_id}")
def get_patient_history(patient_id: str, db = Depends(get_db_connection)):
    """
    Retrieves the longitudinal PSA and prediction risk history for a given patient.
    """
    try:
        cursor = db.cursor()
        query = """
            SELECT 
                id, age, psa_level, psa_density, dre_finding, family_history, 
                bmi_category, comorbidities, model_used, risk_score, risk_category, 
                shap_summary, created_at 
            FROM prediction_history 
            WHERE patient_id = %s 
            ORDER BY created_at DESC
        """
        cursor.execute(query, (patient_id,))
        rows = cursor.fetchall()
        
        # Get column names
        colnames = [desc[0] for desc in cursor.description]
        
        history = []
        for row in rows:
            record = dict(zip(colnames, row))
            history.append(record)
            
        cursor.close()
        return {"patient_id": patient_id, "history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
