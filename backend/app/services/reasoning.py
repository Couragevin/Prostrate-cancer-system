from app.models.schemas import ClinicalInput

class ClinicalReasoningEngine:
    """
    Synthesizes plain-language clinical narratives and applies deterministic 
    clinical guidelines tailored for Nigerian men.
    """
    
    def generate_narrative(self, features: ClinicalInput, risk_category: str, shap_values: dict = None) -> str:
        """
        Synthesizes a plain-language clinical narrative based on inputs and model explanations.
        """
        try:
            numeric_age = int(features.age_band.split('-')[0].replace('+', ''))
        except ValueError:
            numeric_age = 50
            
        narrative_parts = [
            f"The patient, aged {numeric_age}+, presents with a PSA level of {features.psa_level} ng/mL "
            f"(density: {features.psa_density}) and a DRE finding of '{features.dre_finding}'."
        ]
        
        # Rule-based Reasoning Engine
        recommendations = []
        
        # PSA and Density rules
        if features.psa_level > 10.0:
            recommendations.append("A prostate biopsy is strongly recommended due to notably elevated PSA (>10 ng/mL).")
        elif 4.0 <= features.psa_level <= 10.0:
            if features.psa_density > 0.15:
                recommendations.append("Despite PSA being in the 'grey zone' (4-10 ng/mL), a PSA density > 0.15 elevates risk, warranting a biopsy or multiparametric MRI.")
            else:
                recommendations.append("PSA is in the 'grey zone' (4-10 ng/mL) with a reassuring PSA density (<= 0.15). Active surveillance and regular monitoring are advised.")
        
        # Family history rules
        if features.family_history:
            narrative_parts.append("A documented family history of prostate cancer increases the baseline risk profile.")
            if numeric_age < 50:
                recommendations.append("Given the family history, earlier and more frequent screening is recommended.")
                
        # BMI and Comorbidities
        if features.bmi_category in ["Overweight", "Obese"]:
            narrative_parts.append(f"The patient's BMI category is {features.bmi_category}.")
            recommendations.append("Lifestyle modifications (diet and exercise) are advised to improve overall health outcomes.")
            
        narrative_parts.append(f"Overall, the ML model classifies the risk as {risk_category.upper()}.")
        
        # SHAP integration
        if shap_values:
            # Sort the features by importance (absolute SHAP value)
            sorted_factors = sorted(shap_values.items(), key=lambda x: abs(x[1]), reverse=True)
            top_factor = sorted_factors[0][0].replace('_', ' ')
            narrative_parts.append(f"The primary driver for this classification was the patient's {top_factor}.")
            
        if recommendations:
            narrative_parts.append("\nClinical Recommendations:")
            for rec in recommendations:
                narrative_parts.append(f"- {rec}")
        
        return " ".join(narrative_parts[:4]) + "\n" + "\n".join(narrative_parts[4:])
