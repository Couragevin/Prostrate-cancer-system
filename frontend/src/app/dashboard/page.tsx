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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#03242E] text-white font-sans selection:bg-[#00C9A7] selection:text-[#03242E]">
      
      {/* Clinician Top Navbar */}
      <header className="bg-[#03242E]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C9A7] flex items-center justify-center text-[#03242E] font-extrabold shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="font-logo text-2xl tracking-wide text-white block">PROSCANCX</span>
              <span className="text-[10px] font-semibold text-[#00C9A7] tracking-wider uppercase">Clinician Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="btn-pill-outline text-xs font-semibold flex items-center gap-1.5 py-2 px-4">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>
            </Link>

            <Link href="/login">
              <button className="btn-pill-outline text-xs font-semibold text-rose-300 border-rose-500/30 hover:border-rose-500 flex items-center gap-1.5 py-2 px-4">
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Portal</span>
              </button>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10">
        
        {/* Welcome Header & CTA */}
        <div className="bg-[#073543] rounded-[32px] p-8 sm:p-10 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Clinician Workspace</h1>
              <span className="px-3 py-1 rounded-full bg-[#00C9A7]/20 text-[#00C9A7] text-xs font-bold border border-[#00C9A7]/30">
                Active Practitioner Session
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Manage patient cohorts, review Platt-scaled diagnostic predictions, and monitor longitudinal PSA trajectories.
            </p>
          </div>

          <Link href="/assessment">
            <button className="btn-pill-mint text-xs font-bold flex items-center gap-2 py-3.5 px-6 shadow-xl whitespace-nowrap">
              <PlusCircle className="w-4 h-4" />
              <span>New Risk Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Clinical Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#073543] p-6 rounded-[24px] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Records</p>
              <h3 className="text-3xl font-black text-white mt-0.5">142</h3>
              <p className="text-xs text-[#00C9A7] font-semibold mt-0.5">+12 this month</p>
            </div>
          </div>

          <div className="bg-[#073543] p-6 rounded-[24px] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk Ratio</p>
              <h3 className="text-3xl font-black text-rose-400 mt-0.5">18.4%</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Nigerian Calibrated</p>
            </div>
          </div>

          <div className="bg-[#073543] p-6 rounded-[24px] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Cohort PSA</p>
              <h3 className="text-3xl font-black text-white mt-0.5">5.2 ng/mL</h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">Borderline Zone</p>
            </div>
          </div>

          <div className="bg-[#073543] p-6 rounded-[24px] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-[#00C9A7]/10 text-[#00C9A7] border border-[#00C9A7]/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Model Engine</p>
              <h3 className="text-xl font-black text-[#00C9A7] mt-0.5">XGBoost v1.2</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">SHAP TreeExplainer</p>
            </div>
          </div>

        </div>

        {/* Patient History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00C9A7]" />
              <h2 className="text-xl font-bold text-white">Longitudinal Patient Analytics</h2>
            </div>
            <span className="text-xs font-mono text-[#00C9A7] bg-[#073543] px-3 py-1 rounded-full border border-white/10">Active Patient: test-patient-1</span>
          </div>

          <PatientHistory patientId="test-patient-1" />
        </div>

      </main>
    </div>
  );
}
