"""
Prostate Cancer Risk Stratification System - Backend
Author: Vin-Okemeri Courage (Matriculation Number: COS/909/2022)
Affiliation: Computer Science Department at FUPRE (Federal University of Petroleum Resources Effurun), Delta State.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings
from app.core.supabase import init_pool, close_pool
from app.ml.inference import inference_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: load ML artifacts once, so the first request is not penalised by
    # model deserialisation and SHAP explainer construction.
    inference_service.load_models()
    init_pool()
    yield
    # Shutdown
    close_pool()

app = FastAPI(
    title="Prostate Cancer Risk Stratification API",
    version="1.0.0",
    description="Backend API for Prostate Cancer Risk Stratification CDS. Features a dual-model XGBoost/Logistic Regression pipeline.",
    contact={
        "name": "Vin-Okemeri Courage (COS/909/2022)",
        "url": "https://fupre.edu.ng",
        "email": "student@fupre.edu.ng",
    },
    lifespan=lifespan,
)

# Set all CORS enabled origins
if settings.cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
