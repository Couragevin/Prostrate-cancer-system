from app.models.schemas import ClinicalInput

class ClinicalReasoningEngine:
    """
    Synthesizes plain-language clinical narratives and applies deterministic 
    clinical guidelines tailored for Nigerian men.
    """
    
    def generate_narrative(self, features: ClinicalInput, risk_category: str, shap_summary: str) -> str:
        """
        Synthesizes a plain-language clinical narrative based on inputs and model explanations.
        """
        narrative = f"Patient presents with a PSA level of {features.psa_level} ng/mL and a DRE finding of '{features.dre_finding}'. "
        
        if features.family_history:
            narrative += "A family history of prostate cancer is noted, increasing baseline risk. "
            
        if features.bmi_category in ["Overweight", "Obese"]:
            narrative += f"BMI category is {features.bmi_category}. "
            
        narrative += f"The system classifies the risk as {risk_category.upper()}. "
        narrative += f"Explanation: {shap_summary}"
        
        return narrative
