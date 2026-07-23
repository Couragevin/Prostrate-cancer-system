import { AssessmentForm } from "@/components/AssessmentForm";
import { PatientHistory } from "@/components/PatientHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldCheck, Stethoscope, Dna, Sparkles, HeartPulse, Hospital } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative Background Doodles & Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 space-y-8">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-semibold tracking-wide border border-teal-200 dark:border-teal-800 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
            <span>Clinical Decision Support System</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-teal-700 dark:text-teal-400">Nigerian Population Calibrated</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-logo tracking-wide text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <ShieldCheck className="w-12 h-12 text-teal-600 dark:text-teal-400 hidden sm:inline-block" />
            <span>CANCER COURAGE</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium">
            Prostate Cancer Risk Stratification & Explainable ML Reasoning Engine
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 bg-white/70 dark:bg-zinc-900/70 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-xs">
              <Stethoscope className="w-4 h-4 text-emerald-500" />
              <span>XGBoost + Platt Scaling</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 dark:bg-zinc-900/70 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-xs">
              <Dna className="w-4 h-4 text-blue-500" />
              <span>SHAP Explainable AI</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 dark:bg-zinc-900/70 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-xs">
              <HeartPulse className="w-4 h-4 text-red-500" />
              <span>Longitudinal PSA Velocity</span>
            </div>
          </div>
        </div>

        {/* Main Diagnostic Card */}
        <Card className="shadow-xl border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden">
          <CardHeader className="bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-100 dark:border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Clinical Input Parameters</CardTitle>
                <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Input patient diagnostic biomarkers to calculate localized risk and extract ML explainability insights.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <AssessmentForm />
          </CardContent>
        </Card>

        {/* Patient History Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-lg px-1">
            <Hospital className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2>Patient Longitudinal Medical Records</h2>
          </div>
          <PatientHistory patientId="test-patient-1" />
        </div>

      </div>
    </main>
  );
}
