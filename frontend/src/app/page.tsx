import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* 1. Header / Navbar */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-extrabold shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-logo text-xl sm:text-2xl tracking-wide text-foreground block">PROSCANCX</span>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase hidden sm:block">Better Medical Engine</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#features" className="hover:text-primary transition-colors">Methodology</a>
            <a href="#biomarkers" className="hover:text-primary transition-colors">Biomarkers</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Clinicians</a>
          </nav>

          {/* Header Action Button & Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/assessment">
              <button className="btn-pill-primary text-xs font-bold shadow-lg flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2">
                <span className="hidden sm:inline">Get Tested</span>
                <span className="sm:hidden">Test</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-xs font-medium text-primary">
              <GraduationCap className="w-4 h-4" />
              <span>FUPRE CS Research</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Vin-Okemeri Courage (COS/909/2022)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Let's help your doctors access and afford decision clarity.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed max-w-xl">
              With zero-bias tuning, ProsCancX's Platt-scaled machine learning engine equips clinicians to gradually stratify and manage prostate cancer risk — always.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/assessment">
                <button className="btn-pill-primary text-sm font-bold flex items-center gap-2">
                  <span>Get Tested</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/login">
                <button className="btn-pill-outline text-sm font-semibold flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  <span>Clinician Portal</span>
                </button>
              </Link>
            </div>

          </div>

          {/* Hero Right Column (Image / Rounded Card Feature) */}
          <div className="lg:col-span-6">
            <div className="bg-card rounded-[32px] p-6 lg:p-10 border border-border relative overflow-hidden shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-[#0077BE]/20">
                  <Activity className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                  Nigerian Population Calibrated
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Dual-Model Risk Stratification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Combining primary XGBoost classification with logistic Platt scaling to reflect epidemiological prevalence in Nigerian men aged 40+.
                </p>
              </div>

              {/* Quick Feature Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="bg-muted p-4 rounded-2xl">
                  <span className="text-xs font-bold text-muted-foreground block uppercase">Explainable AI</span>
                  <span className="text-xl font-bold text-primary">SHAP Visuals</span>
                </div>
                <div className="bg-muted p-4 rounded-2xl">
                  <span className="text-xs font-bold text-muted-foreground block uppercase">PSA Velocity</span>
                  <span className="text-xl font-bold text-primary">Longitudinal</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Soft Cream Features Section ("Seamless Healthcare at Your Fingertips") */}
      <section id="features" className="bg-secondary text-secondary-foreground py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Seamless healthcare decisioning at your fingertips.
            </h2>
            <p className="text-base text-muted-foreground font-normal">
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
              <h3 className="text-xl font-bold text-foreground">Access XGBoost model</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We make it easy to assess diagnostic risk. Compute real-time localized risk scores based on diagnostic biomarkers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Platt-scaled precision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Raw model probabilities are recalibrated using population-specific epidemiological prevalence for Nigerian men.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-primary flex items-center justify-center">
                <Dna className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">SHAP explainability</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visual attribution charts break down exactly how Age, PSA, and DRE exam findings contribute to the risk score.
              </p>
            </div>

          </div>

          {/* 4. Browse Clinical Biomarkers Section (Light Cream Continued) */}
          <div id="biomarkers" className="pt-16 border-t border-border space-y-12">
            
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Browse clinical indicators.
              </h2>
              <p className="text-sm text-muted-foreground">
                Our model evaluates key biomarkers, eliminating diagnostic ambiguity without requiring invasive procedures upfront.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">PSA Density & Level</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Evaluates total serum PSA and density ratios to identify abnormal prostate tissue proliferation early.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">DRE Clinical Findings</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Categorizes exam findings into Normal, Suspicious, or Abnormal nodular structures.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Comorbidities & Age</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
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
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Clinicians trust ProsCancX.
          </h2>
          <p className="text-base text-muted-foreground font-normal">
            Designed for seamless integration into oncology workflows, providing clear clinical reasoning narratives alongside quantitative predictions.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-card p-6 sm:p-8 rounded-[24px] border border-border space-y-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
              "The SHAP explainability charts give our oncology department total confidence in evaluating high-risk PSA thresholds."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Dr. A. Bello</h4>
                <p className="text-xs text-muted-foreground">Consultant Urologist</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-[24px] border border-border space-y-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
              "Having a Platt-scaled calibration specific to Nigerian prevalence fixes the risk overestimation we used to see with Western tools."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Dr. E. Okon</h4>
                <p className="text-xs text-muted-foreground">Clinical Oncologist</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-[24px] border border-border space-y-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
              "Longitudinal tracking allows us to monitor PSA velocity over time, giving patients peace of mind and timely interventions."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Dr. C. Nwosu</h4>
                <p className="text-xs text-muted-foreground">Senior Pathologist</p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 6. CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
        <div className="bg-card rounded-[32px] p-8 sm:p-16 border border-border text-center space-y-8 shadow-2xl relative overflow-hidden">
          
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
            Your modern clinical decision engine.
          </h2>

          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            We are a team of researchers, computer scientists, and clinicians dedicated to reinventing prostate cancer screening for Nigerian men.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/assessment">
              <button className="btn-pill-primary text-sm font-bold flex items-center gap-2">
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
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground text-xs font-medium">
          
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-logo text-lg text-foreground">PROSCANCX</span>
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
