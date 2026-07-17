"""
Prostate Cancer Risk Stratification System - Backend
Author: Vin-Okemeri Courage (Matriculation Number: COS/909/2022)
Affiliation: Computer Science Department at FUPRE (Federal University of Petroleum Resources Effurun), Delta State.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Backend API for Prostate Cancer Risk Stratification CDS",
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
