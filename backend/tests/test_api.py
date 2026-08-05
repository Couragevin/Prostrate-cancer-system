import pytest

LOW_RISK = {
    "age_band": "40-49",
    "psa_level": 1.2,
    "psa_density": 0.03,
    "family_history": False,
    "bmi_category": "Normal",
    "hypertension": False,
    "diabetes": False,
    "dre_finding": "Normal",
}

HIGH_RISK = {
    "age_band": "70+",
    "psa_level": 18.75,
    "psa_density": 0.586,
    "family_history": True,
    "bmi_category": "Obese",
    "hypertension": True,
    "diabetes": True,
    "dre_finding": "Abnormal",
}


def test_health_check(client):
    response = client.get("/api/v1/")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    # A degraded boot must be visible from /health, not only at predict time.
    assert body["models_loaded"] is True
    assert body["model_error"] is None


def test_predict_risk_xgboost(client):
    response = client.post(
        "/api/v1/predict/?use_logistic=false&patient_id=test-patient-123", json=HIGH_RISK
    )
    assert response.status_code == 200
    data = response.json()

    assert data["model_type"] == "xgboost"
    assert data["patient_id"] == "test-patient-123"
    assert data["risk_category"] in {"Low", "Intermediate", "High"}
    assert 0.0 <= data["xgboost_probability"] <= 1.0
    assert data["shap_summary"]
    assert data["shap_basis"] == "xgboost"


def test_predict_risk_logistic(client):
    response = client.post("/api/v1/predict/?use_logistic=true", json=HIGH_RISK)
    assert response.status_code == 200
    data = response.json()

    assert data["model_type"] == "logistic_regression"
    assert 0.0 <= data["logistic_risk_score"] <= 1.0
    assert data["risk_category"] in {"Low", "Intermediate", "High"}


def test_class_probabilities_form_a_distribution(client):
    data = client.post("/api/v1/predict/", json=HIGH_RISK).json()
    probs = data["class_probabilities"]

    assert set(probs) == {"Low", "Intermediate", "High"}
    assert pytest.approx(sum(probs.values()), abs=1e-4) == 1.0


def test_risk_category_matches_argmax_of_probabilities(client):
    """The headline category must never disagree with the distribution behind it."""
    for payload in (LOW_RISK, HIGH_RISK):
        data = client.post("/api/v1/predict/", json=payload).json()
        probs = data["class_probabilities"]
        assert data["risk_category"] == max(probs, key=probs.get)


def test_risk_index_is_monotonic_in_severity(client):
    """A clearly high-risk patient must not score below a clearly low-risk one."""
    low = client.post("/api/v1/predict/", json=LOW_RISK).json()
    high = client.post("/api/v1/predict/", json=HIGH_RISK).json()

    assert low["risk_category"] == "Low"
    assert high["risk_category"] == "High"
    assert high["xgboost_probability"] > low["xgboost_probability"]


def test_shap_values_cover_every_model_feature(client):
    from app.ml.features import FEATURE_ORDER

    data = client.post("/api/v1/predict/", json=HIGH_RISK).json()
    assert set(data["shap_values"]) == set(FEATURE_ORDER)


def test_narrative_reflects_inputs(client):
    data = client.post("/api/v1/predict/", json=HIGH_RISK).json()
    summary = data["shap_summary"]

    assert "18.75" in summary
    assert "Abnormal" in summary
    assert "Clinical Recommendations" in summary
    # Comorbidities are collected, so they must appear in the narrative.
    assert "hypertension" in summary and "diabetes" in summary


def test_optional_comorbidities_default_to_false(client):
    """Older clients that omit the comorbidity fields must still be accepted."""
    payload = {k: v for k, v in HIGH_RISK.items() if k not in ("hypertension", "diabetes")}
    assert client.post("/api/v1/predict/", json=payload).status_code == 200


def test_predict_validation_error(client):
    payload = {k: v for k, v in HIGH_RISK.items() if k != "dre_finding"}
    assert client.post("/api/v1/predict/", json=payload).status_code == 422


@pytest.mark.parametrize(
    "field,bad_value",
    [
        ("age_band", "99-100"),
        ("bmi_category", "Skinny"),
        ("dre_finding", "Bogus"),
        ("psa_level", -1.0),
        ("psa_level", 5000.0),
        ("psa_density", -0.1),
    ],
)
def test_rejects_out_of_domain_values(client, field, bad_value):
    """
    Unrecognised categoricals must 422 rather than silently coercing to a
    default band - a silent coercion returns a confident score for input the
    model never received.
    """
    payload = {**HIGH_RISK, field: bad_value}
    assert client.post("/api/v1/predict/", json=payload).status_code == 422


def test_history_endpoint(client):
    response = client.get("/api/v1/history/test-patient-123")
    assert response.status_code == 200
    data = response.json()
    assert data["patient_id"] == "test-patient-123"
    assert len(data["history"]) > 0
    assert data["history"][0]["age"] == 50
