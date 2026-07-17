from fastapi import APIRouter

from app.api import health, predict, history

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(predict.router, prefix="/predict", tags=["prediction"])
api_router.include_router(history.router, prefix="/history", tags=["history"])
