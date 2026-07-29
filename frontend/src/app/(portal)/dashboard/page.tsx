import { PatientHistory } from "@/components/PatientHistory";
import Link from "next/link";
import { 
  Stethoscope, 
  Users, 
  Activity, 
  TrendingUp, 
  PlusCircle, 
  LogOut, 
  Home, 
  ShieldCheck, 
  BarChart3,
  ChevronRight
} from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardPage() {
  return (
    <>
      
      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10">
        
        {/* Welcome Header & CTA */}
        <div className="bg-card rounded-[32px] p-6 sm:p-10 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-3xl font-bold text-foreground">Clinician Workspace</h1>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-[#0077BE]/30">
                Active Practitioner Session
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage patient cohorts, review Platt-scaled diagnostic predictions, and monitor longitudinal PSA trajectories.
            </p>
          </div>

          <Link href="/assessment">
            <button className="btn-pill-primary text-xs font-bold flex items-center gap-2 py-3.5 px-6 shadow-xl whitespace-nowrap">
              <PlusCircle className="w-4 h-4" />
              <span>New Risk Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Clinical Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-card p-6 rounded-[24px] border border-border flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Patient Records</p>
              <h3 className="text-3xl font-black text-foreground mt-0.5">142</h3>
              <p className="text-xs text-primary font-semibold mt-0.5">+12 this month</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-[24px] border border-border flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">High Risk Ratio</p>
              <h3 className="text-3xl font-black text-rose-400 mt-0.5">18.4%</h3>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Nigerian Calibrated</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-[24px] border border-border flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg Cohort PSA</p>
              <h3 className="text-3xl font-black text-foreground mt-0.5">5.2 ng/mL</h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">Borderline Zone</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-[24px] border border-border flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-primary/10 text-primary border border-[#0077BE]/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Model Engine</p>
              <h3 className="text-xl font-black text-primary mt-0.5">XGBoost v1.2</h3>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">SHAP TreeExplainer</p>
            </div>
          </div>

        </div>

        {/* Patient History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Longitudinal Patient Analytics</h2>
            </div>
            <span className="text-xs font-mono text-primary bg-card px-3 py-1 rounded-full border border-border">Active Patient: test-patient-1</span>
          </div>

          <PatientHistory patientId="test-patient-1" />
        </div>

      </main>
    </>
  );
}
