import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ShieldCheck,
  Stethoscope,
  Dna,
  Activity,
  CheckCircle2,
  ChevronRight,
  Shield,
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
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase hidden sm:block">Prostate Risk Support</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#features" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#biomarkers" className="hover:text-primary transition-colors">Test Fields</a>
          </nav>

          {/* Header Action Button & Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/assessment">
              <button className="btn-geometric-primary text-xs font-bold flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2">
                <span className="hidden sm:inline">Start Check</span>
                <span className="sm:hidden">Check</span>
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
                <span>Supports Clinic Decisions</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Privacy Minded</span>
              </div>
            </div>

            <h1 className="text-[40px] sm:text-[56px] font-black tracking-tight text-foreground leading-[1.05]">
              Estimate prostate cancer risk using <span className="text-primary">patient details</span> and test results.
            </h1>

            <p className="text-[20px] sm:text-[24px] text-muted-foreground font-medium leading-relaxed max-w-2xl">
              Enter age, health history, PSA results, and exam findings. The tool gives a clear risk level and shows which details affected the result.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                AI-supported risk estimate
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                No patient names needed
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                Shows what pushed the result up or down
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/assessment">
                <button className="btn-geometric-primary text-[16px] flex items-center gap-2 py-3 px-6">
                  <Stethoscope className="w-5 h-5" />
                  <span>Start Risk Check</span>
                </button>
              </Link>
              <a href="#features">
                <button className="btn-geometric-outline text-[16px] flex items-center gap-2 py-3 px-6">
                  <span>How It Works</span>
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
                    <div className="text-sm font-bold text-foreground">Risk Check</div>
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
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Risk Checks</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-[32px] font-black text-foreground">98%</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Model Accuracy</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <span className="text-[32px] font-black text-foreground">2 sec</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Check Time</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <ShieldCheck className="w-8 h-8 text-success mb-1" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Privacy Minded</span>
          </div>
        </div>
      </section>

      {/* 3. Soft Cream Features Section -> Geometric Structure */}
      <section id="features" className="border-b border-border py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">

          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Clear prostate risk support for everyday clinic use.
            </h2>
            <p className="text-base text-muted-foreground font-normal">
              Built to turn key test results into an easy-to-read risk level and explanation.
            </p>
          </div>

          {/* 3 Column Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="w-14 h-14 border border-border bg-card text-foreground flex items-center justify-center">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Uses a trained model</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The check reviews age, health history, PSA values, and exam findings to estimate risk.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-14 h-14 border border-border bg-card text-foreground flex items-center justify-center">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Built for the target group</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The result is designed around prostate cancer screening data for Nigerian men.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-14 h-14 border border-border bg-card text-foreground flex items-center justify-center">
                <Dna className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Shows the main reasons</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The chart shows which fields raised or lowered the risk score the most.
              </p>
            </div>

          </div>

          {/* 4. Test Fields Section */}
          <div id="biomarkers" className="pt-16 border-t border-border space-y-12">

            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Test fields used in the check.
              </h2>
              <p className="text-sm text-muted-foreground">
                The check uses a small set of common details from the patient record, blood test, and prostate exam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">PSA level and PSA density</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  PSA level comes from the blood test. PSA density compares PSA level with prostate size.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Prostate exam result (DRE)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The doctor records whether the prostate felt normal, suspicious, or abnormal during the exam.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Age and health history</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The check also considers age group, BMI group, high blood pressure, diabetes, and close family history.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 6. CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
        <div className="bg-card p-8 sm:p-16 border border-border text-center space-y-8 relative overflow-hidden">

          <h2 className="text-3xl sm:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
            A clearer way to review prostate cancer risk.
          </h2>

          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Built by researchers, computer scientists, and clinicians to support prostate cancer screening for Nigerian men.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/assessment">
              <button className="btn-geometric-primary text-sm font-bold flex items-center gap-2">
                <span>Start Check</span>
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
            FUPRE Computer Science Department - Vin-Okemeri Courage (COS/909/2022)
          </div>

          <div>
            (c) 2026 ProsCancX. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}
