import pandas as pd
import numpy as np
from typing import Dict, Any
from huggingface_hub import hf_hub_download
import joblib
import shap

from app.models.schemas import ClinicalInput, PredictionResponse, XGBoostResponse, LogisticRegressionResponse

class ModelInference:
    """
    Handles the dual-model approach: 
    1. Primary XGBoost classifier
    2. Logistic regression model adjusted via Platt scaling for the Nigerian demographic
    3. SHAP TreeExplainer for Explainable AI (XAI)
    """
    def __init__(self):
        self.repo_id = "Couragevin/prostate-cancer-risk-models"
        self.xgb_filename = "xgboost_model.joblib"
        self.lr_filename = "logistic_regression_calibrated.joblib"
        self.xgb_model = None
        self.lr_model = None
        self.xgb_explainer = None
        self.lr_explainer = None
        self.models_loaded = False
        
    def load_models(self):
        """Loads models from Hugging Face."""
        try:
            xgb_path = hf_hub_download(repo_id=self.repo_id, filename=self.xgb_filename)
            self.xgb_model = joblib.load(xgb_path)
            
            lr_path = hf_hub_download(repo_id=self.repo_id, filename=self.lr_filename)
            self.lr_model = joblib.load(lr_path)
            
            # Initialize explainers if possible
            if self.xgb_model:
                self.xgb_explainer = shap.TreeExplainer(self.xgb_model)
            if self.lr_model:
                self.lr_explainer = shap.LinearExplainer(self.lr_model, shap.maskers.Independent(np.zeros((1, 5)))) # Placeholder masker
                
            self.models_loaded = True
        except Exception as e:
            print(f"Model loading from HF Hub failed (using simulated fallback): {e}")
            self.models_loaded = False

    def predict_and_explain(self, features: ClinicalInput, use_logistic: bool = False) -> PredictionResponse:
        """
        Runs inference and returns a discriminated union response.
        """
        # Prepare feature array/dataframe
        # Assuming model expects: age (numeric), psa_level, psa_density, family_history, bmi_category_encoded
        bmi_mapping = {"Normal": 0, "Overweight": 1, "Obese": 2}
        bmi_encoded = bmi_mapping.get(features.bmi_category, 0)
        
        # Extract lower bound of age_band
        try:
            numeric_age = int(features.age_band.split('-')[0].replace('+', ''))
        except ValueError:
            numeric_age = 50  # fallback
            
        feature_dict = {
            "age": numeric_age,
            "psa_level": features.psa_level,
            "psa_density": features.psa_density,
            "family_history": int(features.family_history),
            "bmi_category": bmi_encoded
        }
        
        df_features = pd.DataFrame([feature_dict])

        if self.models_loaded:
            if use_logistic and self.lr_model:
                risk_score = float(self.lr_model.predict_proba(df_features)[0][1])
                shap_vals_array = self.lr_explainer.shap_values(df_features) if self.lr_explainer else [[0]*len(feature_dict)]
            else:
                risk_score = float(self.xgb_model.predict_proba(df_features)[0][1])
                shap_vals_array = self.xgb_explainer.shap_values(df_features) if self.xgb_explainer else [[0]*len(feature_dict)]
                
            # Convert SHAP values array to dict
            shap_values = dict(zip(feature_dict.keys(), shap_vals_array[0] if isinstance(shap_vals_array, list) else shap_vals_array[0]))
        else:
            # --- Simulated fallback ---
            risk_score = min(1.0, (features.psa_level * 0.05) + (numeric_age * 0.005))
            if features.family_history:
                risk_score = min(1.0, risk_score + 0.15)
                
            shap_values = {
                "psa_level": features.psa_level * 0.01,
                "age": numeric_age * 0.001,
                "family_history": 0.15 if features.family_history else 0.0,
                "psa_density": 0.05,
                "bmi_category": 0.02
            }
        
        if risk_score < 0.3:
            category = "Low"
        elif risk_score < 0.7:
            category = "Intermediate"
        else:
            category = "High"
            
        shap_summary = "Placeholder for SHAP narrative."

        if use_logistic:
            return LogisticRegressionResponse(
                risk_category=category,
                shap_summary=shap_summary,
                shap_values=shap_values,
                logistic_risk_score=risk_score
            )
        else:
            return XGBoostResponse(
                risk_category=category,
                shap_summary=shap_summary,
                shap_values=shap_values,
                xgboost_probability=risk_score
            )

