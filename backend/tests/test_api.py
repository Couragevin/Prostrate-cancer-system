def test_health_check(client):
    response = client.get("/api/v1/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_predict_risk_xgboost(client):
    payload = {
        "age_band": "50-59",
        "psa_level": 5.2,
        "psa_density": 0.15,
        "family_history": True,
        "bmi_category": "Overweight",
        "dre_finding": "Normal"
    }
    response = client.post("/api/v1/predict/?use_logistic=false&patient_id=test-patient-123", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["model_type"] == "xgboost"
    assert "xgboost_probability" in data
    assert "risk_category" in data
    assert "shap_summary" in data
    assert data["patient_id"] == "test-patient-123"

def test_predict_risk_logistic(client):
    payload = {
        "age_band": "50-59",
        "psa_level": 5.2,
        "psa_density": 0.15,
        "family_history": True,
        "bmi_category": "Overweight",
        "dre_finding": "Normal"
    }
    response = client.post("/api/v1/predict/?use_logistic=true", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["model_type"] == "logistic_regression"
    assert "logistic_risk_score" in data
    assert "risk_category" in data
    assert "shap_summary" in data

def test_history_endpoint(client):
    response = client.get("/api/v1/history/test-patient-123")
    assert response.status_code == 200
    data = response.json()
    assert data["patient_id"] == "test-patient-123"
    assert "history" in data
    assert len(data["history"]) > 0
    assert data["history"][0]["age"] == 50

def test_predict_validation_error(client):
    # Missing required field dre_finding
    payload = {
        "age_band": "50-59",
        "psa_level": 5.2,
        "psa_density": 0.15,
        "family_history": True,
        "bmi_category": "Overweight"
    }
    response = client.post("/api/v1/predict/", json=payload)
    assert response.status_code == 422 # Unprocessable Entity
