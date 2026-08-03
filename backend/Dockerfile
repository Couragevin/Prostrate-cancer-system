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

# The models will be downloaded at runtime in app/ml/inference.py

COPY ./app /app/app

# Render assigns a dynamic port via the PORT environment variable
ENV PORT=8000

# Start the application
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
