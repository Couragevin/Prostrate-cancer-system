def test_health_check(client):
    response = client.get("/api/v1/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Prostate Cancer CDS Backend is running."}

def test_predict_risk(client):
    payload = {
        "age": 55,
        "psa_level": 5.2,
        "psa_history": [2.5, 3.8, 5.2],
        "family_history": True
    }
    response = client.post("/api/v1/predict/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "risk_score" in data
    assert "risk_category" in data
    assert "shap_summary" in data
