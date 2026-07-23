export interface PredictionResponse {
  risk_score: number;
  risk_category?: string;
  clinical_narrative: string;
  shap_values?: Record<string, number>;
  record_id?: string;
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
