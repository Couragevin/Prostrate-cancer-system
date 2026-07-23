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
  FileSpreadsheet, 
  CheckCircle2, 
  BrainCircuit, 
  TrendingUp, 
  Lock, 
  ChevronRight,
  Layers,
  Award
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-slate-900 dark:text-slate-100 relative overflow-hidden">
      
      {/* Decorative Grid Mesh & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navbar */}
      <header className="relative z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-logo text-2xl tracking-wide text-slate-900 dark:text-white">CANCER COURAGE</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 ml-2 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-900">
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
        
        {/* Academic Project Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
          <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>FUPRE Final Year Project</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          <span className="text-teal-700 dark:text-teal-400 font-mono">Vin-Okemeri Courage (COS/909/2022)</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-logo tracking-wider text-slate-900 dark:text-white leading-none">
            PROSTATE CANCER RISK STRATIFICATION SYSTEM
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Population-Specific ML Decision Support System Calibrated for Nigerian Men Aged 40+ with SHAP Explainable AI
          </p>
        </div>

        {/* Hero Role CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-6">
          
          {/* Card 1: Sandbox / Evaluator Mode */}
          <Card className="shadow-lg border-teal-200 dark:border-teal-900/50 bg-gradient-to-br from-white to-teal-50/40 dark:from-zinc-900 dark:to-teal-950/20 text-left relative overflow-hidden group hover:border-teal-500 transition-all">
            <CardHeader className="pb-3">
              <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit mb-2 border border-teal-500/20">
                <TestTube className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                <span>Diagnostic Sandbox</span>
                <ArrowRight className="w-5 h-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Instant evaluator access to test the XGBoost risk engine and SHAP explainability visualizations.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/assessment" className="w-full">
                <Button className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2">
                  <span>Launch Risk Assessment Sandbox</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card 2: Clinician Portal */}
          <Card className="shadow-lg border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-left relative overflow-hidden group hover:border-emerald-500 transition-all">
            <CardHeader className="pb-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-2 border border-emerald-500/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                <span>Clinician Workspace</span>
                <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Practitioner portal for managing longitudinal patient records, tracking PSA velocity, and clinical reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-11 border-slate-300 dark:border-zinc-700 hover:border-emerald-500 font-semibold text-xs rounded-xl flex items-center justify-center gap-2">
                  <span>Access Clinician Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* Key Innovation Pillars Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80 dark:border-zinc-800/80">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-900">
            <Award className="w-3.5 h-3.5" />
            <span>Core Research Gaps Addressed</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Clinical & Methodological Innovations</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Addressing black-box AI predictions, miscalibrated global risk scores, and static single-visit assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white/80 dark:bg-zinc-900/80 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 backdrop-blur-md">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit border border-teal-500/20">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. SHAP Explainable AI</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides transparent feature attribution using SHAP TreeExplainer, showing clinicians exactly how Age, PSA density, DRE findings, and comorbidities influence the predicted score.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/80 dark:bg-zinc-900/80 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 backdrop-blur-md">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit border border-emerald-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Platt-Scaled Calibration</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Recalibrates raw XGBoost probability outputs using logistic regression (Platt scaling) tailored to Nigerian epidemiological prevalence data to eliminate over/underestimation.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/80 dark:bg-zinc-900/80 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 backdrop-blur-md">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit border border-blue-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. Longitudinal Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tracks patient PSA velocity and algorithmic risk progression dynamically over historical visit records using interactive Recharts visualization.
            </p>
          </div>

        </div>
      </section>

      {/* Project Metadata & Academic Footer */}
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
