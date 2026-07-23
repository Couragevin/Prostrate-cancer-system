"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicalInputSchema, type ClinicalInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { api } from "@/lib/api";
import { RiskCard } from "./RiskCard";
import { ShapBarChart } from "./ShapBarChart";

export function AssessmentForm() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClinicalInput>({
    resolver: zodResolver(clinicalInputSchema),
    defaultValues: {
      family_history: false,
      hypertension: false,
      diabetes: false,
    },
  });

  const onSubmit = async (data: ClinicalInput) => {
    setLoading(true);
    try {
      const response = await api.post("/api/v1/predict", data);
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Band */}
          <div className="space-y-2">
            <Label htmlFor="age_band">Age Band</Label>
            <Select onValueChange={(val) => { if (val) setValue("age_band", val as string); }}>
              <SelectTrigger id="age_band">
                <SelectValue placeholder="Select Age Band" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="40-49">40-49</SelectItem>
                <SelectItem value="50-59">50-59</SelectItem>
                <SelectItem value="60-69">60-69</SelectItem>
                <SelectItem value="70+">70+</SelectItem>
              </SelectContent>
            </Select>
            {errors.age_band && <p className="text-sm text-red-500">{errors.age_band.message}</p>}
          </div>

          {/* BMI Category */}
          <div className="space-y-2">
            <Label htmlFor="bmi_category">BMI Category</Label>
            <Select onValueChange={(val) => { if (val) setValue("bmi_category", val as string); }}>
              <SelectTrigger id="bmi_category">
                <SelectValue placeholder="Select BMI Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Overweight">Overweight</SelectItem>
                <SelectItem value="Obese">Obese</SelectItem>
              </SelectContent>
            </Select>
            {errors.bmi_category && <p className="text-sm text-red-500">{errors.bmi_category.message}</p>}
          </div>

          {/* PSA Level */}
          <div className="space-y-2">
            <Label htmlFor="psa_level">PSA Level (ng/mL)</Label>
            <Input
              id="psa_level"
              type="number"
              step="0.1"
              {...register("psa_level", { valueAsNumber: true })}
              placeholder="e.g. 4.5"
            />
            {errors.psa_level && <p className="text-sm text-red-500">{errors.psa_level.message}</p>}
          </div>

          {/* PSA Density */}
          <div className="space-y-2">
            <Label htmlFor="psa_density">PSA Density</Label>
            <Input
              id="psa_density"
              type="number"
              step="0.01"
              {...register("psa_density", { valueAsNumber: true })}
              placeholder="e.g. 0.15"
            />
            {errors.psa_density && <p className="text-sm text-red-500">{errors.psa_density.message}</p>}
          </div>

          {/* DRE Finding */}
          <div className="space-y-2">
            <Label htmlFor="dre_finding">DRE Finding</Label>
            <Select onValueChange={(val) => { if (val) setValue("dre_finding", val as string); }}>
              <SelectTrigger id="dre_finding">
                <SelectValue placeholder="Select DRE Finding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Suspicious">Suspicious</SelectItem>
                <SelectItem value="Abnormal">Abnormal</SelectItem>
              </SelectContent>
            </Select>
            {errors.dre_finding && <p className="text-sm text-red-500">{errors.dre_finding.message}</p>}
          </div>
          
          {/* Family History */}
          <div className="space-y-2 flex flex-col justify-end">
            <Label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <input type="checkbox" {...register("family_history")} className="w-4 h-4" />
              Family History of Prostate Cancer
            </Label>
          </div>

          {/* Hypertension */}
          <div className="space-y-2 flex flex-col justify-end">
            <Label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <input type="checkbox" {...register("hypertension")} className="w-4 h-4" />
              Hypertension
            </Label>
          </div>

          {/* Diabetes */}
          <div className="space-y-2 flex flex-col justify-end">
            <Label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <input type="checkbox" {...register("diabetes")} className="w-4 h-4" />
              Diabetes
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
          {loading ? "Analyzing..." : "Run Risk Assessment"}
        </Button>
      </form>

      {result && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <RiskCard 
            riskScore={result.risk_score} 
            clinicalNarrative={result.clinical_narrative} 
          />
          {result.shap_values && (
            <ShapBarChart shapValues={result.shap_values} />
          )}
        </div>
      )}
    </div>
  );
}
