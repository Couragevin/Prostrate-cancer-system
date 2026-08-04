export interface PredictionResponse {
  xgboost_probability?: number;
  logistic_risk_score?: number;
  risk_category?: string;
  shap_summary: string;
  shap_values?: Record<string, number>;
  patient_id?: string;
}

export interface PatientHistoryRecord {
  id: string;
  psa_level: number;
  risk_score: number;
  created_at: string;
}

export interface ChartHistoryPoint {
  date: string;
  psa_level: number;
  risk: number;
}
