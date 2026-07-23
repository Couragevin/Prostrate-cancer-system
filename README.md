# Prostate Cancer Risk Stratification System

**Author:** Vin-Okemeri Courage (Matriculation Number: COS/909/2022)  
**Academic Affiliation:** Computer Science Department at FUPRE (Federal University of Petroleum Resources Effurun), Delta State.

## Project Overview

This project is a clinical decision support system for Prostate Cancer Risk Stratification, specifically targeted at early detection in Nigerian men aged forty and above. It utilizes a dual-model approach combining a primary XGBoost classifier with a logistic regression model adjusted via Platt scaling to reflect Nigerian epidemiological prevalence rates.

The system addresses three critical clinical gaps:
1. **Explainable AI (XAI)**: Visualizes feature importance using SHAP values (Age, PSA, DRE findings, BMI, Comorbidities).
2. **Population-Specific Calibration**: Recalibrates machine learning risk probabilities using Platt scaling tailored to Nigerian epidemiological prevalence rates.
3. **Longitudinal Risk Tracking**: Tracks patient PSA velocity and risk scores dynamically across historical visits using Recharts.

---

## Technical Stack & Architecture

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, `shadcn/ui`, React Hook Form + Zod, Recharts, `@supabase/ssr`
- **Backend**: FastAPI (Python 3.11), Pydantic v2, Uvicorn, SHAP, XGBoost, scikit-learn, `psycopg2-binary`
- **Database & Auth**: Supabase (PostgreSQL with RLS), Supabase Auth
- **Deployment & DevOps**: Docker, Render (Backend API), Vercel (Frontend PWA)

---

## Environment Variables Configuration

### Backend (`backend/.env`)
```env
DATABASE_URL="postgresql://postgres:<PASSWORD>@db.<PROJECT_REF>.supabase.co:5432/postgres"
BACKEND_CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000,https://your-app.vercel.app"
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL="https://<PROJECT_REF>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<YOUR_SUPABASE_ANON_KEY>"
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000" # Or your Render backend API URL
```

---

## Local Development Setup

### 1. Database Initialization
Execute `schema.sql` in your Supabase project's SQL Editor to set up `patient_records` and `prediction_history` tables.

### 2. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Open API docs at `http://127.0.0.1:8000/docs`.

### 3. Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm dev
```
Open application at `http://localhost:3000`.

---

## Production Deployment Guide

### Deploying Backend to Render (Docker Web Service)

1. Connect your GitHub repository to [Render](https://render.com).
2. Select **New > Blueprint** and link the repository (Render will auto-detect `render.yaml`).
3. Alternatively, create a **Web Service** manually:
   - **Environment**: Docker
   - **Docker Context**: `./backend`
   - **Dockerfile Path**: `./backend/Dockerfile`
   - **Environment Variables**: Add `DATABASE_URL` and `BACKEND_CORS_ORIGINS` (include your Vercel domain).
4. Deploy the service. Note down your API URL (e.g., `https://cancer-courage-api.onrender.com`).

### Deploying Frontend to Vercel

1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set the Root Directory to `frontend`.
3. Configure Environment Variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `NEXT_PUBLIC_API_URL`: Your deployed Render API URL (e.g., `https://cancer-courage-api.onrender.com`)
4. Click **Deploy**.
