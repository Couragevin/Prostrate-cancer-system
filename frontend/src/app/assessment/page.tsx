import { AssessmentForm } from "@/components/AssessmentForm";
import Link from "next/link";
import { ArrowLeft, Activity, ShieldCheck, LayoutDashboard } from "lucide-react";

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[#03242E] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative selection:bg-[#00C9A7] selection:text-[#03242E]">
      
      {/* Container */}
      <div className="w-full max-w-4xl space-y-8 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="btn-pill-outline text-xs flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link 
            href="/dashboard" 
            className="text-xs font-semibold text-[#00C9A7] hover:underline flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Clinician Dashboard</span>
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#073543] border border-white/10 text-[#00C9A7] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Clinical Diagnostic Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Prostate Cancer Risk Stratification
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Input diagnostic biomarkers to compute Platt-scaled risk probabilities and extract SHAP explainable AI attribution for Nigerian men aged 40+.
          </p>
        </div>

        {/* Diagnostic Assessment Card Container */}
        <div className="bg-[#073543] rounded-[32px] border border-white/10 p-8 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-[#00C9A7]/10 text-[#00C9A7] border border-[#00C9A7]/20">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Diagnostic Parameters</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Parameters evaluated via XGBoost classifier recalibrated for Nigerian population prevalence.
              </p>
            </div>
          </div>

          {/* Form Component */}
          <AssessmentForm />
        </div>

      </div>
    </main>
  );
}
