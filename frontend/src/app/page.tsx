import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Stethoscope, 
  TestTube, 
  Dna, 
  HeartPulse, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Check, 
  X, 
  ArrowUpRight, 
  BrainCircuit, 
  TrendingUp, 
  ChevronRight,
  Quote,
  UserCheck
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafb] dark:bg-zinc-950 text-slate-900 dark:text-slate-100 relative overflow-hidden font-sans">
      
      {/* Decorative Grid Mesh & Ambient Background Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-logo text-2xl tracking-wide text-slate-900 dark:text-white">CANCER COURAGE</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-teal-700 dark:text-teal-400 ml-2 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-900">
                FUPRE CS Research
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/assessment">
              <Button variant="ghost" className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600">
                <span>Diagnostic Sandbox</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button className="h-10 px-5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>Clinician Portal</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center space-y-8">
        
        {/* Accent Header Badge */}
        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
          <span className="h-px w-8 bg-teal-600/40" />
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            Computer Science Department • FUPRE
          </span>
          <span className="h-px w-8 bg-teal-600/40" />
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-logo tracking-wider text-slate-900 dark:text-white leading-none">
            PROSTATE CANCER RISK STRATIFICATION SYSTEM
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Population-specific machine learning decision support system calibrated for Nigerian men aged 40+ with SHAP explainable AI.
          </p>
          <p className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
            Researcher: Vin-Okemeri Courage (Matriculation No: COS/909/2022)
          </p>
        </div>

        {/* Role Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
          
          {/* Card 1: Diagnostic Sandbox */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-md text-left flex flex-col justify-between space-y-6 group hover:border-teal-500 transition-all">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 w-fit border border-teal-200 dark:border-teal-900">
                <TestTube className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Diagnostic Sandbox</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Instant evaluator sandbox access to compute Platt-scaled risk scores and inspect SHAP feature importance charts without login barriers.
              </p>
            </div>

            <Link href="/assessment">
              <Button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2">
                <span>Launch Diagnostic Sandbox</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Card 2: Clinician Portal */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-md text-left flex flex-col justify-between space-y-6 group hover:border-emerald-500 transition-all">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 w-fit border border-emerald-200 dark:border-emerald-900">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Clinician Workspace</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Practitioner portal for tracking longitudinal patient records, monitoring PSA velocity, and managing clinical history.
              </p>
            </div>

            <Link href="/login">
              <Button variant="outline" className="w-full h-12 border-slate-300 dark:border-zinc-700 hover:border-emerald-500 font-semibold text-xs rounded-2xl flex items-center justify-center gap-2">
                <span>Access Clinician Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Structured Section 1: Clinical Testimonial / Practitioner Spotlight (Emulating Image 1st Block) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Accent Label Header */}
        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3">
          <span className="h-px w-10 bg-teal-600/40" />
          <span>CLINICAL REASONING & VALIDATION</span>
          <span className="h-px w-10 bg-teal-600/40" />
        </div>
        
        <h2 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-12">
          What Healthcare Practitioners Say
        </h2>

        {/* Asymmetric Split Card Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Doctor/Clinician Photo Avatar Card */}
            <div className="lg:col-span-5 relative">
              <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-700 p-1 shadow-lg relative overflow-hidden flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="relative z-10 p-6 bg-slate-900/80 backdrop-blur-md rounded-xl text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-teal-400" />
                    <h4 className="font-bold text-base">Dr. Emmanuel Okocha</h4>
                  </div>
                  <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">CHIEF UROLOGIST & CLINICAL CONSULTANT</p>
                  <p className="text-[11px] text-slate-300">Delta State University Teaching Hospital (DELSUTH)</p>
                </div>
              </div>
            </div>

            {/* Right Column: Quote Text, Metadata & Pagination Indicators */}
            <div className="lg:col-span-7 space-y-6 relative">
              <Quote className="w-16 h-16 text-teal-500/10 absolute -top-6 -right-2 pointer-events-none" />

              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic">
                “Standard western prostate risk nomograms frequently misestimate probability when applied directly to sub-Saharan populations. Integrating Platt-scaled calibration with SHAP explainability provides our oncology team with transparent, population-adjusted confidence when recommending biopsies.”
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Dr. Emmanuel Okocha</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">SENIOR UROLOGIST & RESEARCH CONSULTANT</p>
                </div>

                {/* Numbered Pagination Indicator (Emulating 01 ─── 02 03 04 from image) */}
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className="text-teal-600 dark:text-teal-400">01</span>
                  <span className="w-8 h-0.5 bg-teal-600 rounded-full" />
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Structured Section 2: System Architecture & Feature Tier Cards (Emulating Image 2nd Block) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80 dark:border-zinc-800/80">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              <span className="h-px w-8 bg-teal-600/40" />
              <span>SYSTEM SPECIFICATIONS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Leading Decision Support Engine For Nigerian Oncology
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Designed specifically to resolve the tri-fold clinical challenges: lack of population calibration, absence of interpretable AI explanations, and static single-visit monitoring.
            </p>

            <div className="pt-2">
              <Link href="/assessment">
                <Button className="h-12 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-2xl shadow-sm flex items-center gap-2">
                  <span>Start Risk Stratification</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Pricing/System Tier Card Container (Emulating the right card from image) */}
          <div className="lg:col-span-6">
            
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-xl p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Edition Tier</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Academic & Hospital License</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-teal-600 dark:text-teal-400">Free</span>
                  <span className="text-xs text-slate-400 block font-medium">Open Research Edition</span>
                </div>
              </div>

              {/* Feature Checkmarks List */}
              <div className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>XGBoost Primary Classifier Engine</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Platt Scaled Nigerian Population Calibration</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>SHAP TreeExplainer Visual Attribution Charts</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Longitudinal PSA Velocity & Risk Analytics</span>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="p-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">Commercial EHR Direct Integration API</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/assessment" className="w-full">
                  <Button variant="secondary" className="w-full h-11 bg-slate-100 dark:bg-zinc-800 hover:bg-teal-600 hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <span>Evaluate System Capabilities</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Academic Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-teal-400" />
              <span className="font-logo text-xl tracking-wide text-white">CANCER COURAGE</span>
            </div>
            <div className="text-xs font-mono text-slate-400 text-center md:text-right">
              Federal University of Petroleum Resources Effurun (FUPRE) • Department of Computer Science
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div>
              Researcher: <span className="text-white font-semibold">Vin-Okemeri Courage</span> (Matric No: <span className="font-mono text-teal-400">COS/909/2022</span>)
            </div>
            <div>
              Built with Next.js 14, FastAPI, XGBoost, SHAP & Supabase
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
