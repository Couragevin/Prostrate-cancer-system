import { AssessmentForm } from "@/components/AssessmentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Activity, Sparkles, Stethoscope, Dna, LayoutDashboard } from "lucide-react";

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </Link>

          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Clinician Dashboard</span>
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>Diagnostic Sandbox / Tester Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Prostate Cancer Risk Stratification Engine
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Input patient clinical biomarkers to compute Platt-scaled risk probabilities and extract SHAP explainable AI attribution.
          </p>
        </div>

        {/* Diagnostic Assessment Card */}
        <Card className="shadow-xl border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden">
          <CardHeader className="bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-100 dark:border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Diagnostic Inputs & Machine Learning Assessment</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Parameters are evaluated using our XGBoost model recalibrated specifically for Nigerian population prevalence.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <AssessmentForm />
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
