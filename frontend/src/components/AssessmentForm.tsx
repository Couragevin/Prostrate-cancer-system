"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicalInputSchema, type ClinicalInput } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";
import { RiskCard } from "./RiskCard";
import { ShapBarChart } from "./ShapBarChart";
import { AnimatedLoader } from "./AnimatedLoader";
import { type PredictionResponse } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Scale, 
  TestTube, 
  Microscope, 
  Stethoscope, 
  Users, 
  HeartPulse, 
  Activity, 
  ChevronRight,
  ChevronLeft,
  Info
} from "lucide-react";

const STEPS = [
  { id: "patient_info", title: "Patient Information" },
  { id: "medical_history", title: "Medical History" },
  { id: "lab_results", title: "Laboratory Results" },
  { id: "prediction", title: "Prediction Results" }
];

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Local state for continuous sliders before converting to discrete API bands
  const [ageContinuous, setAgeContinuous] = useState(55);
  const [bmiContinuous, setBmiContinuous] = useState(24.5);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ClinicalInput>({
    resolver: zodResolver(clinicalInputSchema),
    defaultValues: {
      age_band: "50-59",
      bmi_category: "Normal",
      family_history: false,
      hypertension: false,
      diabetes: false,
    },
  });

  const handleAgeChange = (val: number[]) => {
    const age = val[0];
    setAgeContinuous(age);
    if (age < 50) setValue("age_band", "40-49");
    else if (age < 60) setValue("age_band", "50-59");
    else if (age < 70) setValue("age_band", "60-69");
    else setValue("age_band", "70+");
  };

  const handleBmiChange = (val: number[]) => {
    const bmi = val[0];
    setBmiContinuous(bmi);
    if (bmi < 25) setValue("bmi_category", "Normal");
    else if (bmi < 30) setValue("bmi_category", "Overweight");
    else setValue("bmi_category", "Obese");
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ClinicalInput)[] = [];
    if (currentStep === 0) fieldsToValidate = ["age_band", "bmi_category"];
    if (currentStep === 1) fieldsToValidate = ["family_history", "hypertension", "diabetes"];
    if (currentStep === 2) fieldsToValidate = ["psa_level", "psa_density", "dre_finding"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: ClinicalInput) => {
    setCurrentStep(3); // Move to prediction step
    setLoading(true);
    try {
      const response = await api.post("/api/v1/predict", data);
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      // fallback step on error
      setCurrentStep(2);
    } finally {
      // Small delay to ensure loader is visible for at least a few seconds to build trust
      setTimeout(() => setLoading(false), 3000); 
    }
  };

  const progressValue = ((currentStep) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full space-y-8">
      
      {/* Wizard Header */}
      {currentStep < 3 && (
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-muted-foreground">Step {currentStep + 1} of 3</span>
            <span className="text-primary">{STEPS[currentStep].title}</span>
          </div>
          <Progress value={progressValue} className="h-2 bg-muted [&>div]:bg-primary" />
        </div>
      )}

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PATIENT INFORMATION */}
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2 border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-foreground">Patient Information</h3>
                <p className="text-sm text-muted-foreground">Enter basic demographic factors.</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Age Slider */}
                <div className="space-y-4 bg-muted/50 p-6 rounded-2xl border border-border">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Patient Age</span>
                    </Label>
                    <span className="text-xl font-bold text-primary">{ageContinuous} Years</span>
                  </div>
                  <Slider 
                    value={[ageContinuous]} 
                    min={40} 
                    max={90} 
                    step={1} 
                    onValueChange={handleAgeChange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-semibold">
                    <span>40 yrs</span>
                    <span>90+ yrs</span>
                  </div>
                </div>

                {/* BMI Slider */}
                <div className="space-y-4 bg-muted/50 p-6 rounded-2xl border border-border">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Scale className="w-4 h-4 text-primary" />
                      <span>Body Mass Index (BMI)</span>
                    </Label>
                    <span className="text-xl font-bold text-primary">{bmiContinuous}</span>
                  </div>
                  <Slider 
                    value={[bmiContinuous]} 
                    min={15} 
                    max={45} 
                    step={0.5} 
                    onValueChange={handleBmiChange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-semibold">
                    <span>Underweight (15)</span>
                    <span>Normal (22)</span>
                    <span>Obese (30+)</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="button" onClick={nextStep} className="btn-pill-primary text-sm flex items-center gap-2">
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MEDICAL HISTORY */}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2 border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-foreground">Medical History</h3>
                <p className="text-sm text-muted-foreground">Select all known comorbidities and family risk factors.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                
                <label className="flex items-center justify-between p-5 bg-card border-2 border-border hover:border-primary/50 cursor-pointer rounded-2xl transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-has-[:checked]:bg-primary group-has-[:checked]:text-primary-foreground transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Direct Family History</h4>
                      <p className="text-xs text-muted-foreground">Father or brother diagnosed with prostate cancer</p>
                    </div>
                  </div>
                  <input type="checkbox" {...register("family_history")} className="w-5 h-5 rounded text-primary accent-primary" />
                </label>

                <label className="flex items-center justify-between p-5 bg-card border-2 border-border hover:border-primary/50 cursor-pointer rounded-2xl transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-rose-500 group-has-[:checked]:bg-rose-500 group-has-[:checked]:text-white transition-colors">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Hypertension</h4>
                      <p className="text-xs text-muted-foreground">Chronic high blood pressure</p>
                    </div>
                  </div>
                  <input type="checkbox" {...register("hypertension")} className="w-5 h-5 rounded text-primary accent-primary" />
                </label>

                <label className="flex items-center justify-between p-5 bg-card border-2 border-border hover:border-primary/50 cursor-pointer rounded-2xl transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-warning group-has-[:checked]:bg-warning group-has-[:checked]:text-white transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Diabetes</h4>
                      <p className="text-xs text-muted-foreground">Type 1 or Type 2 Diabetes Mellitus</p>
                    </div>
                  </div>
                  <input type="checkbox" {...register("diabetes")} className="w-5 h-5 rounded text-primary accent-primary" />
                </label>

              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={prevStep} className="btn-pill-secondary text-sm flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button type="button" onClick={nextStep} className="btn-pill-primary text-sm flex items-center gap-2">
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: LABORATORY RESULTS */}
          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2 border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-foreground">Laboratory Results</h3>
                <p className="text-sm text-muted-foreground">Input clinical biomarkers for diagnostic processing.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                
                {/* PSA Level */}
                <div className="space-y-3">
                  <Label htmlFor="psa_level" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <TestTube className="w-4 h-4 text-primary" />
                    <span>Total Serum PSA (ng/mL)</span>
                  </Label>
                  <Input
                    id="psa_level"
                    type="number"
                    step="0.1"
                    className="h-14 bg-muted border-border text-lg font-bold text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-primary px-4"
                    {...register("psa_level", { valueAsNumber: true })}
                    placeholder="e.g. 4.5"
                  />
                  {errors.psa_level && <p className="text-xs font-semibold text-danger">{errors.psa_level.message}</p>}
                </div>

                {/* PSA Density */}
                <div className="space-y-3">
                  <Label htmlFor="psa_density" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Microscope className="w-4 h-4 text-primary" />
                    <span>PSA Density</span>
                  </Label>
                  <Input
                    id="psa_density"
                    type="number"
                    step="0.01"
                    className="h-14 bg-muted border-border text-lg font-bold text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-primary px-4"
                    {...register("psa_density", { valueAsNumber: true })}
                    placeholder="e.g. 0.15"
                  />
                  {errors.psa_density && <p className="text-xs font-semibold text-danger">{errors.psa_density.message}</p>}
                </div>

                {/* DRE Finding */}
                <div className="space-y-3">
                  <Label htmlFor="dre_finding" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    <span>Digital Rectal Exam (DRE)</span>
                  </Label>
                  
                  <Controller
                    name="dre_finding"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="h-14 bg-muted border-border text-foreground text-sm rounded-xl focus:ring-primary">
                          <SelectValue placeholder="Select Exam Finding" />
                        </SelectTrigger>
                        <SelectContent className="bg-muted border-border text-foreground">
                          <SelectItem value="Normal">Normal (Smooth, non-tender)</SelectItem>
                          <SelectItem value="Suspicious">Suspicious (Induration)</SelectItem>
                          <SelectItem value="Abnormal">Abnormal (Hard nodules)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.dre_finding && <p className="text-xs font-semibold text-danger">{errors.dre_finding.message}</p>}
                </div>
              </div>

              {/* Security Banner */}
              <div className="bg-success/5 border border-success/20 rounded-xl p-4 flex gap-3 items-start">
                <Info className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  By submitting this form, data is processed entirely in memory via secure stateless APIs. No personally identifiable information (PII) is stored or logged.
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <button type="button" onClick={prevStep} className="btn-pill-secondary text-sm flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleSubmit(onSubmit)} className="btn-pill-primary text-sm flex items-center gap-2 shadow-xl shadow-primary/20">
                  <span>Run Prediction</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: RESULTS */}
          {currentStep === 3 && (
            <motion.div
              key="step4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {loading || !result ? (
                <div className="py-20">
                   <AnimatedLoader />
                </div>
              ) : (
                <div className="space-y-10">
                  
                  {/* Results Header Action */}
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h3 className="text-2xl font-bold text-foreground">Analysis Complete</h3>
                    <button 
                      onClick={() => {
                        setCurrentStep(0);
                        setResult(null);
                      }}
                      className="btn-pill-outline text-xs py-1.5 px-4"
                    >
                      New Assessment
                    </button>
                  </div>

                  <RiskCard 
                    riskScore={result.risk_score} 
                    clinicalNarrative={result.clinical_narrative} 
                  />
                  
                  {result.shap_values && (
                    <ShapBarChart shapValues={result.shap_values} />
                  )}

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
