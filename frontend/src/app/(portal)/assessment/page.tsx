import { AssessmentForm } from "@/components/AssessmentForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { ArrowLeft, Activity, ShieldCheck, LayoutDashboard } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-6 md:py-12 flex flex-col relative z-10 selection:bg-primary selection:text-primary-foreground">
      
      {/* Container */}
      <div className="w-full space-y-8 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="btn-pill-outline text-xs flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/dashboard" 
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Clinician Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Page Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-primary text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Clinical Diagnostic Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Prostate Cancer Risk Stratification
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Input diagnostic biomarkers to compute Platt-scaled risk probabilities and extract SHAP explainable AI attribution for Nigerian men aged 40+.
          </p>
        </div>

        {/* Diagnostic Assessment Card Container */}
        <div className="bg-card rounded-[32px] border border-border p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-[#0077BE]/20">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Diagnostic Parameters</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Parameters evaluated via XGBoost classifier recalibrated for Nigerian population prevalence.
              </p>
            </div>
          </div>

          {/* Form Component */}
          <AssessmentForm />
        </div>

      </div>
    </div>
  );
}
