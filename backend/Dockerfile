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

# Model artifacts are committed under app/ml/artifacts and ship inside this
# COPY. There is no download step and no registry token at build or run time,
# so a cold start cannot fail on a network fetch. Regenerate the artifacts with
# `python train_models.py` whenever the dataset changes.
COPY ./app /app/app

# Render assigns a dynamic port via the PORT environment variable
ENV PORT=8000

# Start the application
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
