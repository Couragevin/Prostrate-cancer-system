import { z } from "zod";

export const clinicalInputSchema = z.object({
  age_band: z.string().min(1, { message: "Age band is required" }),
  psa_level: z.number()
    .min(0, { message: "PSA level must be 0 or greater" })
    .max(1000, { message: "PSA level is unusually high, please verify (max 1000)" }),
  psa_density: z.number()
    .min(0, { message: "PSA density must be 0 or greater" })
    .max(100, { message: "PSA density is unusually high, please verify (max 100)" }),
  family_history: z.boolean(),
  bmi_category: z.string().min(1, { message: "BMI category is required" }),
  dre_finding: z.string().min(1, { message: "DRE finding is required" }),
});

export type ClinicalInput = z.infer<typeof clinicalInputSchema>;
