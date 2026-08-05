from fastapi import APIRouter

from app.ml.inference import inference_service
from app.models.schemas import HealthResponse

router = APIRouter()


@router.get("/", response_model=HealthResponse)
def health_check():
    """
    Health check endpoint. Reports ML artifact status so a deployment that
    booted without its models is visible rather than only failing at predict time.
    """
    loaded = inference_service.models_loaded
    return HealthResponse(
        status="ok" if loaded else "degraded",
        message=(
            "Prostate Cancer CDS Backend is running."
            if loaded
            else "Backend is running but ML artifacts failed to load; predictions are unavailable."
        ),
        models_loaded=loaded,
        model_error=inference_service.load_error,
    )
