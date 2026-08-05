import { AssessmentForm } from "@/components/AssessmentForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { ArrowLeft, Activity, Ribbon } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-6 md:py-12 flex flex-col relative z-10 selection:bg-primary selection:text-primary-foreground print:py-0 print:max-w-none">
      
      {/* Container */}
      <div className="w-full space-y-8 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between print:hidden">
          <Link 
            href="/" 
            className="btn-pill-outline text-xs flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Page Title Header - the printed report carries its own header,
            so this on-screen title would only duplicate it on paper. */}
        <div className="text-center space-y-3 print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-primary text-xs font-bold">
            <Ribbon className="w-4 h-4 fill-primary" />
            <span>Prostate Risk Check</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Prostate Cancer Risk Check
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Enter age, health history, PSA test values, and exam findings to estimate low, medium, or high prostate cancer risk for Nigerian men aged 40+.
          </p>
        </div>

        {/* Diagnostic Assessment Card Container */}
        <div className="bg-card rounded-[32px] border border-border p-6 sm:p-10 shadow-2xl space-y-8 print:rounded-none print:border-0 print:p-0 print:shadow-none print:space-y-0">
          <div className="flex items-center gap-4 pb-6 border-b border-border print:hidden">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-[#0077BE]/20">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Information Needed</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                These details are checked by a trained model and turned into an easy-to-read risk result.
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
