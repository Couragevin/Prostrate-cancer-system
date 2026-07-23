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
  FileCheck2
} from "lucide-react";

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
        
        {/* Quantitative Biomarkers Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 border-b border-teal-100 dark:border-teal-900/40 pb-2">
            <FileCheck2 className="w-4 h-4" />
            <span>Quantitative Clinical Indicators</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Band */}
            <div className="space-y-2">
              <Label htmlFor="age_band" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4 text-teal-500" />
                <span>Age Band</span>
              </Label>
              <Select onValueChange={(val) => { if (val) setValue("age_band", val as string); }}>
                <SelectTrigger id="age_band" className="h-11">
                  <SelectValue placeholder="Select Age Band" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="40-49">40-49 years</SelectItem>
                  <SelectItem value="50-59">50-59 years</SelectItem>
                  <SelectItem value="60-69">60-69 years</SelectItem>
                  <SelectItem value="70+">70+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.age_band && <p className="text-xs font-semibold text-red-500">{errors.age_band.message}</p>}
            </div>

            {/* BMI Category */}
            <div className="space-y-2">
              <Label htmlFor="bmi_category" className="flex items-center gap-2 text-sm font-medium">
                <Scale className="w-4 h-4 text-teal-500" />
                <span>BMI Category</span>
              </Label>
              <Select onValueChange={(val) => { if (val) setValue("bmi_category", val as string); }}>
                <SelectTrigger id="bmi_category" className="h-11">
                  <SelectValue placeholder="Select BMI Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal (&lt; 25)</SelectItem>
                  <SelectItem value="Overweight">Overweight (25 - 29.9)</SelectItem>
                  <SelectItem value="Obese">Obese (≥ 30)</SelectItem>
                </SelectContent>
              </Select>
              {errors.bmi_category && <p className="text-xs font-semibold text-red-500">{errors.bmi_category.message}</p>}
            </div>

            {/* PSA Level */}
            <div className="space-y-2">
              <Label htmlFor="psa_level" className="flex items-center gap-2 text-sm font-medium">
                <TestTube className="w-4 h-4 text-teal-500" />
                <span>Total PSA Level (ng/mL)</span>
              </Label>
              <Input
                id="psa_level"
                type="number"
                step="0.1"
                className="h-11"
                {...register("psa_level", { valueAsNumber: true })}
                placeholder="e.g. 4.5"
              />
              {errors.psa_level && <p className="text-xs font-semibold text-red-500">{errors.psa_level.message}</p>}
            </div>

            {/* PSA Density */}
            <div className="space-y-2">
              <Label htmlFor="psa_density" className="flex items-center gap-2 text-sm font-medium">
                <Microscope className="w-4 h-4 text-teal-500" />
                <span>PSA Density</span>
              </Label>
              <Input
                id="psa_density"
                type="number"
                step="0.01"
                className="h-11"
                {...register("psa_density", { valueAsNumber: true })}
                placeholder="e.g. 0.15"
              />
              {errors.psa_density && <p className="text-xs font-semibold text-red-500">{errors.psa_density.message}</p>}
            </div>

            {/* DRE Finding */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="dre_finding" className="flex items-center gap-2 text-sm font-medium">
                <Stethoscope className="w-4 h-4 text-teal-500" />
                <span>Digital Rectal Examination (DRE) Finding</span>
              </Label>
              <Select onValueChange={(val) => { if (val) setValue("dre_finding", val as string); }}>
                <SelectTrigger id="dre_finding" className="h-11">
                  <SelectValue placeholder="Select DRE Exam Finding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal (Smooth, symmetrical, non-tender)</SelectItem>
                  <SelectItem value="Suspicious">Suspicious (Induration / Asymmetry)</SelectItem>
                  <SelectItem value="Abnormal">Abnormal (Hard nodules / Fixed mass)</SelectItem>
                </SelectContent>
              </Select>
              {errors.dre_finding && <p className="text-xs font-semibold text-red-500">{errors.dre_finding.message}</p>}
            </div>
          </div>
        </div>

        {/* Clinical History & Comorbidities Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 border-b border-teal-100 dark:border-teal-900/40 pb-2">
            <CheckSquare className="w-4 h-4" />
            <span>Comorbidities & Risk Factors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Family History */}
            <label className="flex items-center gap-3 p-3.5 border border-slate-200 dark:border-zinc-800 rounded-xl cursor-pointer bg-slate-50/50 dark:bg-zinc-900/50 hover:border-teal-500/50 transition-colors shadow-xs">
              <input type="checkbox" {...register("family_history")} className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500" />
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Family History</span>
              </div>
            </label>

            {/* Hypertension */}
            <label className="flex items-center gap-3 p-3.5 border border-slate-200 dark:border-zinc-800 rounded-xl cursor-pointer bg-slate-50/50 dark:bg-zinc-900/50 hover:border-teal-500/50 transition-colors shadow-xs">
              <input type="checkbox" {...register("hypertension")} className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500" />
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>Hypertension</span>
              </div>
            </label>

            {/* Diabetes */}
            <label className="flex items-center gap-3 p-3.5 border border-slate-200 dark:border-zinc-800 rounded-xl cursor-pointer bg-slate-50/50 dark:bg-zinc-900/50 hover:border-teal-500/50 transition-colors shadow-xs">
              <input type="checkbox" {...register("diabetes")} className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500" />
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Activity className="w-4 h-4 text-amber-500" />
                <span>Diabetes</span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Action Button */}
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all rounded-xl flex items-center justify-center gap-2" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Calculating Platt Scaled Risk & SHAP...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Run Clinical Risk Assessment</span>
            </>
          )}
        </Button>
      </form>

      {/* Prediction Output */}
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
