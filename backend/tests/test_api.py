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
        "hypertension": False,
        "diabetes": False,
        "dre_finding": "Normal"
    }
    response = client.post("/api/v1/predict/?use_logistic=false", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["model_type"] == "xgboost"
    assert "xgboost_probability" in data
    assert "risk_category" in data
    assert "shap_summary" in data

def test_predict_risk_logistic(client):
    payload = {
        "age_band": "50-59",
        "psa_level": 5.2,
        "psa_density": 0.15,
        "family_history": True,
        "bmi_category": "Overweight",
        "hypertension": False,
        "diabetes": False,
        "dre_finding": "Normal"
    }
    response = client.post("/api/v1/predict/?use_logistic=true", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["model_type"] == "logistic_regression"
    assert "logistic_risk_score" in data
    assert "risk_category" in data
    assert "shap_summary" in data
