"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicalInputSchema, type ClinicalInput } from "@/lib/schemas";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { api, describeApiError } from "@/lib/api";
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
  Droplet,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  AlertOctagon,
  Info
} from "lucide-react";

const STEPS = [
  { id: "patient_info", title: "Patient Details" },
  { id: "medical_history", title: "Health History" },
  { id: "lab_results", title: "Test Results" },
  { id: "prediction", title: "Risk Result" }
];

/** Minimum time the loader stays visible, so a fast response doesn't flash. */
const MIN_LOADER_MS = 1200;

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completedAt, setCompletedAt] = useState<Date | null>(null);

  // Local state for continuous sliders before converting to discrete API bands
  const [ageContinuous, setAgeContinuous] = useState(55);
  const [bmiContinuous, setBmiContinuous] = useState(24.5);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
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

  const handleAgeChange = (val: number | readonly number[]) => {
    const age = Array.isArray(val) ? val[0] : (val as number);
    setAgeContinuous(age);
    if (age < 50) setValue("age_band", "40-49");
    else if (age < 60) setValue("age_band", "50-59");
    else if (age < 70) setValue("age_band", "60-69");
    else setValue("age_band", "70+");
  };

  const handleBmiChange = (val: number | readonly number[]) => {
    const bmi = Array.isArray(val) ? val[0] : (val as number);
    setBmiContinuous(bmi);
    if (bmi < 25) setValue("bmi_category", "Normal");
    else if (bmi < 30) setValue("bmi_category", "Overweight");
    else setValue("bmi_category", "Obese");
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ClinicalInput)[] = [];
    if (currentStep === 0) fieldsToValidate = ["age_band", "bmi_category"];
    if (currentStep === 1) fieldsToValidate = ["family_history"];
    if (currentStep === 2) fieldsToValidate = ["psa_level", "psa_density", "dre_finding"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast.error("Please check the highlighted fields before continuing.");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const runPrediction = async (data: ClinicalInput) => {
    // Stay on the results step for the whole request. Previously a failed call
    // sent the user back to the lab-results form, which read as "the button did
    // nothing" - the actual error only ever appeared in a toast that had already
    // faded. Errors now render in place, next to a Retry control.
    setCurrentStep(3);
    setLoading(true);
    setSubmitError(null);
    setResult(null);

    // Start the minimum-display timer alongside the request rather than
    // measuring elapsed time afterwards: awaiting it in `finally` holds a fast
    // response back briefly, and costs nothing extra once the request is slower.
    const loaderFloor = new Promise<void>((resolve) => setTimeout(resolve, MIN_LOADER_MS));

    try {
      const response = await api.post<PredictionResponse>("/api/v1/predict/", data);
      setResult(response.data);
      setCompletedAt(new Date());
      toast.success("Analysis complete");
    } catch (error) {
      // warn, not error: this failure is fully handled and surfaced in the UI.
      // console.error would additionally trigger Next's dev error overlay,
      // which covers the screen with a code frame for an error the app already
      // recovered from.
      console.warn("Prediction failed:", error);
      const message = describeApiError(error);
      setSubmitError(message);
      toast.error(message);
    } finally {
      await loaderFloor;
      setLoading(false);
    }
  };

  const onInvalid = () => {
    // handleSubmit swallows invalid submissions silently by default, so the
    // button appeared inert when a required field was missing.
    toast.error("Please check the highlighted fields before continuing.");
  };

  const retryPrediction = () => runPrediction(getValues());

  const startNewAssessment = () => {
    setResult(null);
    setSubmitError(null);
    setCompletedAt(null);
    setCurrentStep(0);
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
                <h3 className="text-2xl font-bold text-foreground">Patient Details</h3>
                <p className="text-sm text-muted-foreground">Enter the patient&apos;s age and body size.</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Age Slider */}
                <div className="space-y-4 bg-muted/50 p-6 rounded-2xl border border-border">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Age</span>
                    </Label>
                    <span className="text-xl font-bold text-primary">{ageContinuous} years</span>
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
                <h3 className="text-2xl font-bold text-foreground">Health History</h3>
                <p className="text-sm text-muted-foreground">Tick any health conditions or family history that apply.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                
                <label className="flex items-center justify-between p-5 bg-card border-2 border-border hover:border-primary/50 cursor-pointer rounded-2xl transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-has-[:checked]:bg-primary group-has-[:checked]:text-primary-foreground transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Close Family History</h4>
                      <p className="text-xs text-muted-foreground">Father or brother has had prostate cancer</p>
                    </div>
                  </div>
                  <input type="checkbox" {...register("family_history")} className="w-5 h-5 rounded text-primary accent-primary" />
                </label>

                <label className="flex items-center justify-between p-5 bg-card border-2 border-border hover:border-primary/50 cursor-pointer rounded-2xl transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-has-[:checked]:bg-primary group-has-[:checked]:text-primary-foreground transition-colors">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">High Blood Pressure</h4>
                      <p className="text-xs text-muted-foreground">A doctor has diagnosed high blood pressure</p>
                    </div>
                  </div>
                  <input type="checkbox" {...register("hypertension")} className="w-5 h-5 rounded text-primary accent-primary" />
                </label>

                <label className="flex items-center justify-between p-5 bg-card border-2 border-border hover:border-primary/50 cursor-pointer rounded-2xl transition-all group has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-has-[:checked]:bg-primary group-has-[:checked]:text-primary-foreground transition-colors">
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Diabetes</h4>
                      <p className="text-xs text-muted-foreground">A doctor has diagnosed type 1 or type 2 diabetes</p>
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
                <h3 className="text-2xl font-bold text-foreground">Test Results</h3>
                <p className="text-sm text-muted-foreground">Enter the PSA test numbers and prostate exam finding.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                
                {/* PSA Level */}
                <div className="space-y-3">
                  <Label htmlFor="psa_level" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <TestTube className="w-4 h-4 text-primary" />
                    <span>PSA Blood Test Result (ng/mL)</span>
                  </Label>
                  <p id="psa-level-help" className="text-xs text-muted-foreground">
                    The total PSA number shown on the blood test report.
                  </p>
                  <Input
                    id="psa_level"
                    type="number"
                    step="0.1"
                    aria-describedby="psa-level-help"
                    className="h-14 bg-muted border-border text-lg font-bold text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-primary px-4"
                    {...register("psa_level", { valueAsNumber: true })}
                    placeholder="Example: 4.5"
                  />
                  {errors.psa_level && <p className="text-xs font-semibold text-danger">{errors.psa_level.message}</p>}
                </div>

                {/* PSA Density */}
                <div className="space-y-3">
                  <Label htmlFor="psa_density" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Microscope className="w-4 h-4 text-primary" />
                    <span>PSA Density</span>
                  </Label>
                  <p id="psa-density-help" className="text-xs text-muted-foreground">
                    A PSA value adjusted for prostate size. Use the value listed as PSA density on the report.
                  </p>
                  <Input
                    id="psa_density"
                    type="number"
                    step="0.01"
                    aria-describedby="psa-density-help"
                    className="h-14 bg-muted border-border text-lg font-bold text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-primary px-4"
                    {...register("psa_density", { valueAsNumber: true })}
                    placeholder="Example: 0.15"
                  />
                  {errors.psa_density && <p className="text-xs font-semibold text-danger">{errors.psa_density.message}</p>}
                </div>

                {/* DRE Finding */}
                <div className="space-y-3">
                  <Label htmlFor="dre_finding" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    <span>Prostate Exam Result (DRE)</span>
                  </Label>
                  <p id="dre-finding-help" className="text-xs text-muted-foreground">
                    DRE means digital rectal exam. Choose what the doctor found during the exam.
                  </p>
                  
                  <Controller
                    name="dre_finding"
                    control={control}
                    render={({ field }) => (
                      // `?? null` keeps the Select controlled from the first
                      // render. Base UI treats `undefined` as uncontrolled and
                      // warns when the field later receives a value.
                      <Select onValueChange={field.onChange} value={field.value ?? null}>
                        <SelectTrigger aria-describedby="dre-finding-help" className="h-14 bg-muted border-border text-foreground text-sm rounded-xl focus:ring-primary">
                          <SelectValue placeholder="Choose the exam result" />
                        </SelectTrigger>
                        <SelectContent className="bg-muted border-border text-foreground">
                          <SelectItem value="Normal">Normal (smooth)</SelectItem>
                          <SelectItem value="Suspicious">Suspicious (firm area)</SelectItem>
                          <SelectItem value="Abnormal">Abnormal (hard lump or nodule)</SelectItem>
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
                  Your entries are used only to run this risk check. The app does not ask for or store names, addresses, or other personal details.
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <button type="button" onClick={prevStep} className="btn-pill-secondary text-sm flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleSubmit(runPrediction, onInvalid)} className="btn-pill-primary text-sm flex items-center gap-2 shadow-xl shadow-primary/20">
                  <span>Check Risk</span>
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
              {loading ? (
                <div className="py-20">
                   <AnimatedLoader />
                </div>
              ) : submitError ? (
                /* Error state: the user stays here rather than being bounced
                   back to the form, and can retry without re-entering data. */
                <div className="py-10 flex flex-col items-center text-center space-y-6" data-testid="prediction-error">
                  <div className="w-16 h-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center">
                    <AlertOctagon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <h3 className="text-2xl font-bold text-foreground">Risk Check Could Not Finish</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{submitError}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button onClick={retryPrediction} className="btn-pill-primary text-sm flex items-center gap-2">
                      <RotateCw className="w-4 h-4" />
                      <span>Try Again</span>
                    </button>
                    <button onClick={() => setCurrentStep(2)} className="btn-pill-secondary text-sm flex items-center gap-2">
                      <ChevronLeft className="w-4 h-4" />
                      <span>Edit Test Results</span>
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your entered values have been kept.
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-10">

                  {/* Results Header Action - hidden when printing */}
                  <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
                    <h3 className="text-2xl font-bold text-foreground">Risk Check Complete</h3>
                    <button
                      onClick={startNewAssessment}
                      className="btn-pill-outline text-xs py-1.5 px-4"
                    >
                      New Check
                    </button>
                  </div>

                  <RiskCard
                    riskScore={result.xgboost_probability ?? result.logistic_risk_score ?? 0}
                    riskCategory={result.risk_category}
                    clinicalNarrative={result.shap_summary}
                    classProbabilities={result.class_probabilities}
                    modelType={result.model_type}
                    completedAt={completedAt}
                    inputs={getValues()}
                  />

                  {result.shap_values && (
                    <ShapBarChart shapValues={result.shap_values} />
                  )}

                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
