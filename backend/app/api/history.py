from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

@router.get("/{patient_id}")
def get_patient_history(patient_id: str):
    """
    Retrieves the longitudinal PSA and prediction risk history for a given patient.
    Intended to be integrated with Supabase.
    """
    # Stub: Fetch from Supabase
    return {"patient_id": patient_id, "history": []}
