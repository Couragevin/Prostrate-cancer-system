from app.models.schemas import PatientFeatures

class ClinicalRulesEngine:
    """
    Applies deterministic clinical guidelines before or alongside the ML models.
    Tailored for early detection in Nigerian men aged 40 and above.
    """
    
    def __init__(self):
        # Specific thresholds could be calibrated based on FUPRE research or clinical standards
        self.abnormal_psa_threshold = 4.0

    def evaluate_guidelines(self, features: PatientFeatures) -> dict:
        """
        Evaluates the features against standard guidelines.
        """
        flags = []
        if features.psa_level > self.abnormal_psa_threshold:
            flags.append("Elevated PSA level detected.")
            
        if features.family_history:
            flags.append("Family history indicates higher risk.")
            
        # Add longitudinal PSA velocity check here if history > 2 data points
        
        return {
            "flags": flags,
            "requires_immediate_attention": len(flags) > 1
        }
