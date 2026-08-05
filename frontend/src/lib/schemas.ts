import { z } from "zod";

// These enums mirror the backend's Pydantic Literals exactly. Keeping them as
// enums rather than free strings means a bad value is caught in the browser
// instead of coming back as an opaque 422.
export const AGE_BANDS = ["40-49", "50-59", "60-69", "70+"] as const;
export const BMI_CATEGORIES = ["Normal", "Overweight", "Obese"] as const;
export const DRE_FINDINGS = ["Normal", "Suspicious", "Abnormal"] as const;

export const clinicalInputSchema = z.object({
  age_band: z.enum(AGE_BANDS, {
    errorMap: () => ({ message: "Age band is required" }),
  }),
  psa_level: z
    .number({ invalid_type_error: "Enter the total serum PSA in ng/mL" })
    .min(0, { message: "PSA level must be 0 or greater" })
    .max(1000, { message: "PSA level is unusually high, please verify (max 1000)" }),
  psa_density: z
    .number({ invalid_type_error: "Enter the PSA density" })
    .min(0, { message: "PSA density must be 0 or greater" })
    .max(100, { message: "PSA density is unusually high, please verify (max 100)" }),
  family_history: z.boolean(),
  bmi_category: z.enum(BMI_CATEGORIES, {
    errorMap: () => ({ message: "BMI category is required" }),
  }),
  hypertension: z.boolean(),
  diabetes: z.boolean(),
  dre_finding: z.enum(DRE_FINDINGS, {
    errorMap: () => ({ message: "Select a DRE finding" }),
  }),
});

export type ClinicalInput = z.infer<typeof clinicalInputSchema>;
