# Prostate Cancer Risk Stratification System

**Author:** Vin-Okemeri Courage (Matriculation Number: COS/909/2022)  
**Academic Affiliation:** Computer Science Department at FUPRE (Federal University of Petroleum Resources Effurun), Delta State.

## Project Overview

This project is a clinical decision support system for Prostate Cancer Risk Stratification, specifically targeted at early detection in Nigerian men aged forty and above. It utilizes a dual-model approach combining a primary XGBoost classifier with a logistic regression model adjusted via Platt scaling to reflect Nigerian epidemiological prevalence rates.

The system addresses three critical gaps:
1. Absence of explainability in AI predictions (resolved via SHAP).
2. Lack of population-specific calibration for Nigerian men.
3. Inability to track longitudinal PSA risk over time.

## Architecture
- **Frontend:** Next.js
- **Backend:** FastAPI, Supabase (PostgreSQL)
- **Machine Learning Pipeline:** XGBoost, scikit-learn, Pandas, NumPy, SHAP (TreeExplainer)

## Running the Application

### Backend
Navigate to the `backend/` directory, create a virtual environment, and install dependencies:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
Navigate to the `frontend/` directory and start the Next.js app (once initialized):
```bash
cd frontend
npm install
npm run dev
```
