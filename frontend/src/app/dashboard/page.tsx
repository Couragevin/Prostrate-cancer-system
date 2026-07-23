import { PatientHistory } from "@/components/PatientHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  FileText, 
  CheckCircle2, 
  Sparkles,
  BarChart3
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      
      {/* Clinician Top Navbar */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="font-logo text-xl tracking-wide text-slate-900 dark:text-white">CANCER COURAGE</span>
              <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 ml-2 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-900">
                Clinician Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Landing Page</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs font-semibold text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 flex items-center gap-1.5">
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Portal</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Header & New Assessment CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/80 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinician Workspace</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">Active Session</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage patient cohorts, review Platt-scaled diagnostic predictions, and monitor longitudinal PSA trajectories.
            </p>
          </div>

          <Link href="/assessment">
            <Button className="h-11 px-5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>New Diagnostic Assessment</span>
            </Button>
          </Link>
        </div>

        {/* Clinical Summary Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="shadow-xs border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Records</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">142</h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">+12 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk Ratio</p>
                <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">18.4%</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Nigerian Calibrated</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Cohort PSA</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">5.2 ng/mL</h3>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">Borderline Zone</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Model Status</p>
                <h3 className="text-xl font-black text-teal-600 dark:text-teal-400 mt-0.5">XGBoost v1.2</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">SHAP TreeExplainer Active</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Longitudinal History Chart Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Longitudinal Patient Analytics</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">Active Patient: test-patient-1</span>
          </div>

          <PatientHistory patientId="test-patient-1" />
        </div>

      </main>
    </div>
  );
}
