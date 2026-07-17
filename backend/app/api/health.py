from fastapi import APIRouter
from app.models.schemas import HealthResponse

router = APIRouter()

@router.get("/", response_model=HealthResponse)
def health_check():
    """
    Health check endpoint to verify the service is running.
    """
    return HealthResponse(status="ok", message="Prostate Cancer CDS Backend is running.")
