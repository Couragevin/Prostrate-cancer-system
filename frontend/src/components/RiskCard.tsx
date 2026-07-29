import { AlertOctagon, CheckCircle2, AlertTriangle, BrainCircuit, Activity, FileText } from "lucide-react";

interface RiskCardProps {
  riskScore: number;
  clinicalNarrative: string;
}

export function RiskCard({ riskScore, clinicalNarrative }: RiskCardProps) {
  const percentage = (riskScore * 100).toFixed(1);
  const numericPercentage = Math.min(100, Math.max(0, riskScore * 100));
  
  let riskLevel = "Low Risk Profile";
  let colorClass = "text-emerald-400";
  let barColorClass = "bg-emerald-400";
  let bgClass = "bg-emerald-500/10";
  let borderClass = "border-emerald-500/30";
  let Icon = CheckCircle2;

  if (riskScore >= 0.7) {
    riskLevel = "High Risk Profile";
    colorClass = "text-rose-400";
    barColorClass = "bg-rose-500";
    bgClass = "bg-rose-500/10";
    borderClass = "border-rose-500/30";
    Icon = AlertOctagon;
  } else if (riskScore >= 0.3) {
    riskLevel = "Moderate Risk Profile";
    colorClass = "text-amber-400";
    barColorClass = "bg-amber-400";
    bgClass = "bg-amber-500/10";
    borderClass = "border-amber-500/30";
    Icon = AlertTriangle;
  }

  return (
    <div className={`rounded-[28px] border ${borderClass} bg-muted p-6 sm:p-8 space-y-6 shadow-xl`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${bgClass}`}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>
          <h3 className={`text-xl font-bold ${colorClass}`}>{riskLevel}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-background text-primary border border-border">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Platt Scaled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Metric Display Box */}
        <div className="md:col-span-5 bg-background p-6 rounded-2xl border border-border text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Calculated Risk Probability
          </span>
          <div className={`text-5xl font-black ${colorClass}`}>
            {percentage}%
          </div>
          {/* Risk Gauge Bar */}
          <div className="w-full bg-card h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full ${barColorClass} transition-all duration-1000 ease-out`}
              style={{ width: `${numericPercentage}%` }}
            />
          </div>
        </div>

        {/* Narrative Callout */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <FileText className="w-4 h-4" />
            <span>Automated Clinical Narrative</span>
          </div>
          <div className="p-5 rounded-2xl bg-background/70 border border-border">
            <p className="text-muted-foreground text-sm leading-relaxed font-normal">
              {clinicalNarrative}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
