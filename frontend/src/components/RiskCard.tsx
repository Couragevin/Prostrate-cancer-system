import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon, CheckCircle2, AlertTriangle, ShieldCheck, FileText, BrainCircuit, Activity } from "lucide-react";

interface RiskCardProps {
  riskScore: number;
  clinicalNarrative: string;
}

export function RiskCard({ riskScore, clinicalNarrative }: RiskCardProps) {
  const percentage = (riskScore * 100).toFixed(1);
  const numericPercentage = Math.min(100, Math.max(0, riskScore * 100));
  
  let riskLevel = "Low Risk Profile";
  let colorClass = "text-emerald-600 dark:text-emerald-400";
  let barColorClass = "bg-emerald-500";
  let bgClass = "bg-emerald-50/80 dark:bg-emerald-950/30";
  let borderClass = "border-emerald-200 dark:border-emerald-900/60";
  let Icon = CheckCircle2;

  if (riskScore >= 0.7) {
    riskLevel = "High Risk Profile";
    colorClass = "text-rose-600 dark:text-rose-400";
    barColorClass = "bg-rose-500";
    bgClass = "bg-rose-50/80 dark:bg-rose-950/30";
    borderClass = "border-rose-200 dark:border-rose-900/60";
    Icon = AlertOctagon;
  } else if (riskScore >= 0.3) {
    riskLevel = "Moderate Risk Profile";
    colorClass = "text-amber-600 dark:text-amber-400";
    barColorClass = "bg-amber-500";
    bgClass = "bg-amber-50/80 dark:bg-amber-950/30";
    borderClass = "border-amber-200 dark:border-amber-900/60";
    Icon = AlertTriangle;
  }

  return (
    <Card className={`overflow-hidden border-2 ${borderClass} shadow-md bg-white dark:bg-zinc-900`}>
      <CardHeader className={`${bgClass} border-b ${borderClass} pb-4`}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-lg font-bold">
            <Icon className={`w-6 h-6 ${colorClass}`} />
            <span className={colorClass}>{riskLevel}</span>
          </CardTitle>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/80 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 shadow-2xs">
            <BrainCircuit className="w-3.5 h-3.5 text-teal-500" />
            <span>Platt Scaled</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Risk Score Display */}
          <div className="flex-shrink-0 w-full md:w-auto p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center md:text-left min-w-[200px]">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              <Activity className="w-4 h-4 text-teal-500" />
              <span>Calibrated Risk</span>
            </div>
            
            <div className={`text-5xl font-black ${colorClass}`}>
              {percentage}%
            </div>

            {/* Visual Risk Gauge Bar */}
            <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full ${barColorClass} transition-all duration-1000 ease-out`}
                style={{ width: `${numericPercentage}%` }}
              />
            </div>
          </div>

          {/* Clinical Reasoning Narrative */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-teal-500" />
              <span>Automated Clinical Assessment</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/80">
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-normal">
                {clinicalNarrative}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
