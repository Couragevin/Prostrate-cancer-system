"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicalInputSchema, type ClinicalInput } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { api } from "@/lib/api";
import { RiskCard } from "./RiskCard";
import { ShapBarChart } from "./ShapBarChart";
import { type PredictionResponse } from "@/lib/types";
import { 
  Calendar, 
  Scale, 
  TestTube, 
  Microscope, 
  Stethoscope, 
  Users, 
  HeartPulse, 
  Activity, 
  Sparkles, 
  CheckSquare, 
  Loader2,
  FileCheck2,
  ChevronRight
} from "lucide-react";

export function AssessmentForm() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Quantitative Biomarkers Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-3">
            <FileCheck2 className="w-4 h-4 text-primary" />
            <span>Quantitative Clinical Biomarkers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Age Band */}
            <div className="space-y-2">
              <Label htmlFor="age_band" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Age Band</span>
              </Label>
              <Select onValueChange={(val) => { if (val) setValue("age_band", val as string); }}>
                <SelectTrigger id="age_band" className="h-12 bg-muted border-border text-foreground rounded-xl focus:ring-[#0077BE]">
                  <SelectValue placeholder="Select Age Group" />
                </SelectTrigger>
                <SelectContent className="bg-muted border-border text-foreground">
                  <SelectItem value="40-49">40-49 years</SelectItem>
                  <SelectItem value="50-59">50-59 years</SelectItem>
                  <SelectItem value="60-69">60-69 years</SelectItem>
                  <SelectItem value="70+">70+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.age_band && <p className="text-xs font-semibold text-rose-400">{errors.age_band.message}</p>}
            </div>

            {/* BMI Category */}
            <div className="space-y-2">
              <Label htmlFor="bmi_category" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Scale className="w-4 h-4 text-primary" />
                <span>BMI Category</span>
              </Label>
              <Select onValueChange={(val) => { if (val) setValue("bmi_category", val as string); }}>
                <SelectTrigger id="bmi_category" className="h-12 bg-muted border-border text-foreground rounded-xl focus:ring-[#0077BE]">
                  <SelectValue placeholder="Select BMI Category" />
                </SelectTrigger>
                <SelectContent className="bg-muted border-border text-foreground">
                  <SelectItem value="Normal">Normal (&lt; 25)</SelectItem>
                  <SelectItem value="Overweight">Overweight (25 - 29.9)</SelectItem>
                  <SelectItem value="Obese">Obese (≥ 30)</SelectItem>
                </SelectContent>
              </Select>
              {errors.bmi_category && <p className="text-xs font-semibold text-rose-400">{errors.bmi_category.message}</p>}
            </div>

            {/* PSA Level */}
            <div className="space-y-2">
              <Label htmlFor="psa_level" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <TestTube className="w-4 h-4 text-primary" />
                <span>Total Serum PSA (ng/mL)</span>
              </Label>
              <Input
                id="psa_level"
                type="number"
                step="0.1"
                className="h-12 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-[#0077BE]"
                {...register("psa_level", { valueAsNumber: true })}
                placeholder="e.g. 4.5"
              />
              {errors.psa_level && <p className="text-xs font-semibold text-rose-400">{errors.psa_level.message}</p>}
            </div>

            {/* PSA Density */}
            <div className="space-y-2">
              <Label htmlFor="psa_density" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Microscope className="w-4 h-4 text-primary" />
                <span>PSA Density</span>
              </Label>
              <Input
                id="psa_density"
                type="number"
                step="0.01"
                className="h-12 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-[#0077BE]"
                {...register("psa_density", { valueAsNumber: true })}
                placeholder="e.g. 0.15"
              />
              {errors.psa_density && <p className="text-xs font-semibold text-rose-400">{errors.psa_density.message}</p>}
            </div>

            {/* DRE Finding */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="dre_finding" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Stethoscope className="w-4 h-4 text-primary" />
                <span>Digital Rectal Exam (DRE) Findings</span>
              </Label>
              <Select onValueChange={(val) => { if (val) setValue("dre_finding", val as string); }}>
                <SelectTrigger id="dre_finding" className="h-12 bg-muted border-border text-foreground rounded-xl focus:ring-[#0077BE]">
                  <SelectValue placeholder="Select Exam Finding" />
                </SelectTrigger>
                <SelectContent className="bg-muted border-border text-foreground">
                  <SelectItem value="Normal">Normal (Smooth, symmetrical, non-tender)</SelectItem>
                  <SelectItem value="Suspicious">Suspicious (Induration / Asymmetry)</SelectItem>
                  <SelectItem value="Abnormal">Abnormal (Hard nodules / Fixed mass)</SelectItem>
                </SelectContent>
              </Select>
              {errors.dre_finding && <p className="text-xs font-semibold text-rose-400">{errors.dre_finding.message}</p>}
            </div>

          </div>
        </div>

        {/* Comorbidities Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <CheckSquare className="w-4 h-4 text-primary" />
            <span>Risk Factors & Medical History</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <label className="flex items-center gap-3 p-4 bg-muted border border-border rounded-2xl cursor-pointer hover:border-[#0077BE]/50 transition-colors">
              <input type="checkbox" {...register("family_history")} className="w-4 h-4 rounded text-primary accent-[#0077BE]" />
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>Family History</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-muted border border-border rounded-2xl cursor-pointer hover:border-[#0077BE]/50 transition-colors">
              <input type="checkbox" {...register("hypertension")} className="w-4 h-4 rounded text-primary accent-[#0077BE]" />
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Hypertension</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-muted border border-border rounded-2xl cursor-pointer hover:border-[#0077BE]/50 transition-colors">
              <input type="checkbox" {...register("diabetes")} className="w-4 h-4 rounded text-primary accent-[#0077BE]" />
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Diabetes</span>
              </div>
            </label>

          </div>
        </div>

        {/* Submit Pill Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="btn-pill-primary w-full text-base font-bold flex items-center justify-center gap-2 shadow-xl py-4"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-primary-foreground" />
              <span>Calculating Platt Scaled Risk & SHAP...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <span>Run Risk Stratification Assessment</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Prediction Results Display */}
      {result && (
        <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-border">
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
