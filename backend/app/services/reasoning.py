from typing import Dict, Optional

from app.ml.features import AGE_BAND_MAP, FEATURE_LABELS
from app.models.schemas import ClinicalInput


class ClinicalReasoningEngine:
    """
    Synthesizes plain-language clinical narratives and applies deterministic
    clinical guidelines tailored for Nigerian men.

    The rules below are guideline-style heuristics layered on top of the model
    output; they are intentionally separate from the ML pipeline so a clinician
    can audit the advice independently of the risk score.
    """

    def generate_narrative(
        self,
        features: ClinicalInput,
        risk_category: str,
        shap_values: Optional[Dict[str, float]] = None,
    ) -> str:
        age_floor = self._age_floor(features.age_band)

        narrative_parts = [
            f"The patient, aged {features.age_band}, presents with a PSA level of "
            f"{features.psa_level} ng/mL (density: {features.psa_density}) and a DRE "
            f"finding of '{features.dre_finding}'."
        ]
        recommendations = []

        # --- PSA and density ---
        if features.psa_level > 10.0:
            recommendations.append(
                "A prostate biopsy is strongly recommended due to notably elevated PSA (>10 ng/mL)."
            )
        elif 4.0 <= features.psa_level <= 10.0:
            if features.psa_density > 0.15:
                recommendations.append(
                    "Despite PSA being in the 'grey zone' (4-10 ng/mL), a PSA density > 0.15 "
                    "elevates risk, warranting a biopsy or multiparametric MRI."
                )
            else:
                recommendations.append(
                    "PSA is in the 'grey zone' (4-10 ng/mL) with a reassuring PSA density "
                    "(<= 0.15). Active surveillance and regular monitoring are advised."
                )

        # --- DRE ---
        if features.dre_finding == "Abnormal":
            recommendations.append(
                "An abnormal DRE (hard nodules) is an independent indication for urological "
                "referral regardless of PSA."
            )
        elif features.dre_finding == "Suspicious":
            recommendations.append(
                "A suspicious DRE (induration) warrants repeat examination by a urologist."
            )

        # --- Family history ---
        if features.family_history:
            narrative_parts.append(
                "A documented family history of prostate cancer increases the baseline risk profile."
            )
            if age_floor < 50:
                recommendations.append(
                    "Given the family history, earlier and more frequent screening is recommended."
                )

        # --- BMI and comorbidities ---
        if features.bmi_category in ("Overweight", "Obese"):
            narrative_parts.append(f"The patient's BMI category is {features.bmi_category}.")
            recommendations.append(
                "Lifestyle modifications (diet and exercise) are advised to improve overall "
                "health outcomes."
            )

        comorbidities = [
            name
            for name, present in (("hypertension", features.hypertension), ("diabetes", features.diabetes))
            if present
        ]
        if comorbidities:
            narrative_parts.append(
                f"Recorded comorbidities: {' and '.join(comorbidities)}."
            )
            recommendations.append(
                "Comorbidity control should be optimised before any invasive diagnostic procedure."
            )

        narrative_parts.append(
            f"Overall, the model classifies the risk as {risk_category.upper()}."
        )

        # --- SHAP integration ---
        if shap_values:
            ranked = sorted(shap_values.items(), key=lambda kv: abs(kv[1]), reverse=True)
            top_key, top_value = ranked[0]
            direction = "increased" if top_value > 0 else "decreased"
            label = FEATURE_LABELS.get(top_key, top_key.replace("_", " "))
            narrative_parts.append(
                f"The strongest single contributor to this classification was {label}, "
                f"which {direction} the assessed risk."
            )

        summary = " ".join(narrative_parts)

        if recommendations:
            bullets = "\n".join(f"- {rec}" for rec in recommendations)
            return f"{summary}\n\nClinical Recommendations:\n{bullets}"
        return summary

    @staticmethod
    def _age_floor(age_band: str) -> int:
        """Lower bound of the age band, used for age-conditional guidance."""
        if age_band in AGE_BAND_MAP:
            return int(age_band.replace("+", "").split("-")[0])
        return 50
