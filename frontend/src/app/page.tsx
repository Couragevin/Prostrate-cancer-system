import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  CheckCircle2, 
  BrainCircuit, 
  TrendingUp, 
  ChevronRight,
  Shield,
  FileText,
  UserCheck,
  Quote
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#03242E] text-white font-sans selection:bg-[#00C9A7] selection:text-[#03242E]">
      
      {/* 1. Header / Navbar */}
      <header className="border-b border-white/10 bg-[#03242E]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#00C9A7] flex items-center justify-center text-[#03242E] font-extrabold shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-logo text-2xl tracking-wide text-white block">PROSCANCX</span>
              <span className="text-[10px] font-semibold text-[#00C9A7] tracking-wider uppercase">Better Medical Engine</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-[#00C9A7] transition-colors">About</a>
            <a href="#features" className="hover:text-[#00C9A7] transition-colors">Methodology</a>
            <a href="#biomarkers" className="hover:text-[#00C9A7] transition-colors">Biomarkers</a>
            <a href="#testimonials" className="hover:text-[#00C9A7] transition-colors">Clinicians</a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-4">
            <Link href="/assessment">
              <button className="btn-pill-mint text-xs font-bold shadow-lg flex items-center gap-2">
                <span>Get Tested</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Section (50/50 Split Layout) */}
      <section id="about" className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Academic Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#073543] border border-white/10 text-xs font-medium text-[#00C9A7]">
              <GraduationCap className="w-4 h-4" />
              <span>FUPRE CS Research</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7]" />
              <span className="text-slate-300">Vin-Okemeri Courage (COS/909/2022)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Let's help your doctors access and afford decision clarity.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              With zero-bias tuning, ProsCancX's Platt-scaled machine learning engine equips clinicians to gradually stratify and manage prostate cancer risk — always.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/assessment">
                <button className="btn-pill-mint text-sm font-bold flex items-center gap-2">
                  <span>Get Tested</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/login">
                <button className="btn-pill-outline text-sm font-semibold flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#00C9A7]" />
                  <span>Clinician Portal</span>
                </button>
              </Link>
            </div>

          </div>

          {/* Hero Right Column (Image / Rounded Card Feature) */}
          <div className="lg:col-span-6">
            <div className="bg-[#073543] rounded-[32px] p-8 lg:p-10 border border-white/10 relative overflow-hidden shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-[#00C9A7]/10 text-[#00C9A7] border border-[#00C9A7]/20">
                  <Activity className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00C9A7]/20 text-[#00C9A7] text-xs font-bold">
                  Nigerian Population Calibrated
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Dual-Model Risk Stratification</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Combining primary XGBoost classification with logistic Platt scaling to reflect epidemiological prevalence in Nigerian men aged 40+.
                </p>
              </div>

              {/* Quick Feature Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="bg-[#0A3D4C] p-4 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Explainable AI</span>
                  <span className="text-xl font-bold text-[#00C9A7]">SHAP Visuals</span>
                </div>
                <div className="bg-[#0A3D4C] p-4 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 block uppercase">PSA Velocity</span>
                  <span className="text-xl font-bold text-[#00C9A7]">Longitudinal</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Soft Cream Features Section ("Seamless Healthcare at Your Fingertips") */}
      <section id="features" className="bg-[#F4F6F4] text-[#03242E] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#03242E] leading-tight">
              Seamless healthcare decisioning at your fingertips.
            </h2>
            <p className="text-base text-slate-600 font-normal">
              Designed specifically to resolve non-interpretable black-box predictions and static single-visit monitoring.
            </p>
          </div>

          {/* 3 Column Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#03242E]">Access XGBoost model</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We make it easy to assess diagnostic risk. Compute real-time localized risk scores based on diagnostic biomarkers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#03242E]">Platt-scaled precision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Raw model probabilities are recalibrated using population-specific epidemiological prevalence for Nigerian men.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-[#00C9A7] flex items-center justify-center">
                <Dna className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#03242E]">SHAP explainability</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visual attribution charts break down exactly how Age, PSA, and DRE exam findings contribute to the risk score.
              </p>
            </div>

          </div>

          {/* 4. Browse Clinical Biomarkers Section (Light Cream Continued) */}
          <div id="biomarkers" className="pt-16 border-t border-slate-200 space-y-12">
            
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#03242E]">
                Browse clinical indicators.
              </h2>
              <p className="text-sm text-slate-600">
                Our model evaluates key biomarkers, eliminating diagnostic ambiguity without requiring invasive procedures upfront.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#03242E]">PSA Density & Level</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluates total serum PSA and density ratios to identify abnormal prostate tissue proliferation early.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#03242E]">DRE Clinical Findings</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Categorizes exam findings into Normal, Suspicious, or Abnormal nodular structures.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#03242E]">Comorbidities & Age</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Considers patient age bands, hypertension, diabetes, and direct familial history of prostate carcinoma.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Clinical Trust Section ("Clinicians trust Cancer Courage.") */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-28 space-y-16">
        
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Clinicians trust ProsCancX.
          </h2>
          <p className="text-base text-slate-300 font-normal">
            Designed for seamless integration into oncology workflows, providing clear clinical reasoning narratives alongside quantitative predictions.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#073543] p-8 rounded-[24px] border border-white/10 space-y-6 flex flex-col justify-between">
            <p className="text-sm text-slate-200 leading-relaxed font-medium italic">
              "The SHAP explainability charts give our oncology department total confidence in evaluating high-risk PSA thresholds."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#00C9A7] text-[#03242E] flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dr. A. Bello</h4>
                <p className="text-xs text-slate-400">Consultant Urologist</p>
              </div>
            </div>
          </div>

          <div className="bg-[#073543] p-8 rounded-[24px] border border-white/10 space-y-6 flex flex-col justify-between">
            <p className="text-sm text-slate-200 leading-relaxed font-medium italic">
              "Having a Platt-scaled calibration specific to Nigerian prevalence fixes the risk overestimation we used to see with Western tools."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#00C9A7] text-[#03242E] flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dr. E. Okon</h4>
                <p className="text-xs text-slate-400">Clinical Oncologist</p>
              </div>
            </div>
          </div>

          <div className="bg-[#073543] p-8 rounded-[24px] border border-white/10 space-y-6 flex flex-col justify-between">
            <p className="text-sm text-slate-200 leading-relaxed font-medium italic">
              "Longitudinal tracking allows us to monitor PSA velocity over time, giving patients peace of mind and timely interventions."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#00C9A7] text-[#03242E] flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dr. C. Nwosu</h4>
                <p className="text-xs text-slate-400">Senior Pathologist</p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 6. CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
        <div className="bg-[#073543] rounded-[32px] p-10 sm:p-16 border border-white/10 text-center space-y-8 shadow-2xl relative overflow-hidden">
          
          <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
            Your modern clinical decision engine.
          </h2>

          <p className="text-base text-slate-300 max-w-xl mx-auto">
            We are a team of researchers, computer scientists, and clinicians dedicated to reinventing prostate cancer screening for Nigerian men.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/assessment">
              <button className="btn-pill-mint text-sm font-bold flex items-center gap-2">
                <span>Get Tested</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/login">
              <button className="btn-pill-white text-sm font-bold flex items-center gap-2">
                <span>Clinician Portal</span>
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-white/10 bg-[#03242E] py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs font-medium">
          
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00C9A7]" />
            <span className="font-logo text-lg text-white">PROSCANCX</span>
          </div>

          <div>
            FUPRE Computer Science Department • Vin-Okemeri Courage (COS/909/2022)
          </div>

          <div>
            © 2026 ProsCancX. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}
