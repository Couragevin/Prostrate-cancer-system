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
  Quote,
  Ribbon
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
              <Ribbon className="w-6 h-6" />
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
              <button className="btn-geometric-primary text-xs font-bold flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2">
                <span className="hidden sm:inline">Get Tested</span>
                <span className="sm:hidden">Test</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Modern Hero Section (Geometric) */}
      <section id="about" className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center relative z-10">

          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-8">

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Ribbon className="w-4 h-4 text-primary" />
                <span>Clinical Decision Support</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>HIPAA Inspired</span>
              </div>
            </div>

            <h1 className="text-[40px] sm:text-[56px] font-black tracking-tight text-foreground leading-[1.05]">
              Predict prostate cancer risk using <span className="text-primary">machine learning</span> & clinical indicators.
            </h1>

            <p className="text-[20px] sm:text-[24px] text-muted-foreground font-medium leading-relaxed max-w-2xl">
              Equip your clinical workflow with Platt-scaled, zero-bias risk stratification tailored for precise demographic accuracy.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                AI-assisted prediction model
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                Secure, anonymized patient data processing
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                Interpretable clinical decision support via SHAP
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/assessment">
                <button className="btn-geometric-primary text-[16px] flex items-center gap-2 py-3 px-6">
                  <Stethoscope className="w-5 h-5" />
                  <span>Start Assessment</span>
                </button>
              </Link>
              <a href="#features">
                <button className="btn-geometric-outline text-[16px] flex items-center gap-2 py-3 px-6">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>

          {/* Hero Right Column (Medical Illustration / Interface Preview) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-card p-8 border border-border relative z-10 space-y-8 overflow-hidden">

              {/* Decorative top bar */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Risk Assessment</div>
                    <div className="text-xs text-muted-foreground">ID: PROS-8821</div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-black rounded uppercase tracking-wider">
                  Analyzing
                </div>
              </div>

              {/* Interface mock */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-muted-foreground">PSA Level</span>
                    <span className="font-bold text-foreground">8.4 ng/mL</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-warning rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-muted-foreground">Age Factor</span>
                    <span className="font-bold text-foreground">62 Years</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-[45%] h-full bg-primary rounded-full"></div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" className="stroke-muted fill-none" strokeWidth="12" />
                      <circle cx="64" cy="64" r="56" className="stroke-primary fill-none transition-all duration-1000 ease-out" strokeWidth="12" strokeDasharray="351.85" strokeDashoffset="87.96" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black text-foreground">75%</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Risk Score</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2.5 Statistics Row */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-[32px] font-black text-primary">12,000+</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Assessments</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-[32px] font-black text-foreground">98%</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Model Accuracy</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-[32px] font-black text-foreground">2 sec</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Prediction Time</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <ShieldCheck className="w-8 h-8 text-success mb-1" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">HIPAA Inspired</span>
          </div>
        </div>
      </section>

      {/* 3. Soft Cream Features Section -> Geometric Structure */}
      <section id="features" className="border-b border-border py-20 lg:py-28">
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
              <div className="w-14 h-14 border border-border bg-card text-foreground flex items-center justify-center">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Access XGBoost model</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We make it easy to assess diagnostic risk. Compute real-time localized risk scores based on diagnostic biomarkers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-14 h-14 border border-border bg-card text-foreground flex items-center justify-center">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Platt-scaled precision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Raw model probabilities are recalibrated using population-specific epidemiological prevalence for Nigerian men.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-14 h-14 border border-border bg-card text-foreground flex items-center justify-center">
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

          <div className="bg-card p-6 sm:p-8 border border-border space-y-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
              "The SHAP explainability charts give our oncology department total confidence in evaluating high-risk PSA thresholds."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 border border-border bg-card text-foreground flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Dr. A. Bello</h4>
                <p className="text-xs text-muted-foreground">Consultant Urologist</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 sm:p-8 border border-border space-y-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
              "Having a Platt-scaled calibration specific to Nigerian prevalence fixes the risk overestimation we used to see with Western tools."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 border border-border bg-card text-foreground flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Dr. E. Okon</h4>
                <p className="text-xs text-muted-foreground">Clinical Oncologist</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 sm:p-8 border border-border space-y-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
              "Longitudinal tracking allows us to monitor PSA velocity over time, giving patients peace of mind and timely interventions."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 border border-border bg-card text-foreground flex items-center justify-center font-bold">
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
        <div className="bg-card p-8 sm:p-16 border border-border text-center space-y-8 relative overflow-hidden">

          <h2 className="text-3xl sm:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
            Your modern clinical decision engine.
          </h2>

          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            We are a team of researchers, computer scientists, and clinicians dedicated to reinventing prostate cancer screening for Nigerian men.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/assessment">
              <button className="btn-geometric-primary text-sm font-bold flex items-center gap-2">
                <span>Get Tested</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>

          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground text-xs font-medium">

          <div className="flex items-center gap-3">
            <Ribbon className="w-5 h-5 text-primary fill-primary" />
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
