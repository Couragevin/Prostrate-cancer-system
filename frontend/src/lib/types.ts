export type RiskCategory = "Low" | "Intermediate" | "High";

export interface PredictionResponse {
  model_type?: "xgboost" | "logistic_regression";
  /** Expected-severity risk index on [0, 1] from the primary XGBoost model. */
  xgboost_probability?: number;
  /** Expected-severity risk index on [0, 1] from the Platt-calibrated model. */
  logistic_risk_score?: number;
  /** Authoritative stratification from the backend - never recomputed client-side. */
  risk_category?: RiskCategory;
  shap_summary: string;
  shap_values?: Record<string, number>;
  class_probabilities?: Record<string, number>;
  /** Which model the SHAP attributions were computed against. */
  shap_basis?: string;
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
