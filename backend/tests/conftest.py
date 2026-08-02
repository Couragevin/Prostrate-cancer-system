import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.core.supabase import get_db_connection

# Mock Database Connection
def mock_get_db_connection():
    mock_db = MagicMock()
    mock_cursor = MagicMock()
    
    # Setup mock returns for cursor operations
    mock_db.cursor.return_value = mock_cursor
    
    # Mocking description for fetchall in history endpoint
    mock_cursor.description = [
        ('id',), ('age',), ('psa_level',), ('psa_density',), ('dre_finding',), 
        ('family_history',), ('bmi_category',), ('comorbidities',), ('model_used',), 
        ('risk_score',), ('risk_category',), ('shap_summary',), ('created_at',)
    ]
    mock_cursor.fetchall.return_value = [
        (1, 50, 4.5, 0.15, 'Normal', False, 'Normal', '', 'xgboost', 0.2, 'Low', 'Test summary', '2023-01-01')
    ]
    
    yield mock_db

app.dependency_overrides[get_db_connection] = mock_get_db_connection

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c
