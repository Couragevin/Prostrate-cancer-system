import { z } from "zod";

export const clinicalInputSchema = z.object({
  age_band: z.string().min(1, { message: "Age band is required" }),
  psa_level: z.number().min(0, { message: "PSA level must be 0 or greater" }),
  psa_density: z.number().min(0, { message: "PSA density must be 0 or greater" }),
  family_history: z.boolean(),
  bmi_category: z.string().min(1, { message: "BMI category is required" }),
  hypertension: z.boolean(),
  diabetes: z.boolean(),
  dre_finding: z.string().min(1, { message: "DRE finding is required" }),
});

export type ClinicalInput = z.infer<typeof clinicalInputSchema>;
