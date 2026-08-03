# Stage 1: Build environment
FROM python:3.11-slim as builder

WORKDIR /app
COPY requirements.txt .

RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Stage 2: Runtime environment
FROM python:3.11-slim

WORKDIR /app

# Install dependencies for running the app
COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .
RUN pip install --no-cache /wheels/*

# Pass HuggingFace token as a build argument
ARG HF_TOKEN
ENV HF_TOKEN=${HF_TOKEN}

# Pre-download HuggingFace models to avoid cold-start latency on Render
RUN python -c "from huggingface_hub import hf_hub_download; import os; token = os.environ.get('HF_TOKEN'); hf_hub_download(repo_id='Couragevin/prostate-cancer-risk-models', filename='xgboost_model.joblib', token=token); hf_hub_download(repo_id='Couragevin/prostate-cancer-risk-models', filename='logistic_regression_calibrated.joblib', token=token)"

COPY ./app /app/app

# Render assigns a dynamic port via the PORT environment variable
ENV PORT=8000

# Start the application
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
