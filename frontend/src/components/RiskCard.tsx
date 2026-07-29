import { AlertOctagon, CheckCircle2, AlertTriangle, BrainCircuit, Activity, FileText, ClipboardList } from "lucide-react";

interface RiskCardProps {
  riskScore: number;
  clinicalNarrative: string;
}

export function RiskCard({ riskScore, clinicalNarrative }: RiskCardProps) {
  const percentage = (riskScore * 100).toFixed(1);
  const numericPercentage = Math.min(100, Math.max(0, riskScore * 100));
  
  let riskLevel = "Low Risk Profile";
  let colorClass = "text-success";
  let barColorClass = "bg-success";
  let bgClass = "bg-success/10";
  let borderClass = "border-success/30";
  let Icon = CheckCircle2;
  let recommendations = [
    "Routine screening recommended in 1-2 years.",
    "Discuss lifestyle factors and general prostate health.",
    "Monitor for any new urinary symptoms."
  ];

  if (riskScore >= 0.7) {
    riskLevel = "High Risk Profile";
    colorClass = "text-danger";
    barColorClass = "bg-danger";
    bgClass = "bg-danger/10";
    borderClass = "border-danger/30";
    Icon = AlertOctagon;
    recommendations = [
      "Urgent urology referral recommended.",
      "Discuss biopsy options with patient.",
      "Consider multiparametric MRI if not already performed."
    ];
  } else if (riskScore >= 0.3) {
    riskLevel = "Moderate Risk Profile";
    colorClass = "text-warning";
    barColorClass = "bg-warning";
    bgClass = "bg-warning/10";
    borderClass = "border-warning/30";
    Icon = AlertTriangle;
    recommendations = [
      "Consider supplementary testing (e.g., MRI).",
      "Schedule repeat PSA testing in 6 months.",
      "Discuss risk profile and potential for watchful waiting."
    ];
  }

  // Calculate arc dash offset for a semi-circle gauge
  const radius = 60;
  const circumference = radius * Math.PI; // Half circle
  const dashoffset = circumference - (numericPercentage / 100) * circumference;

  return (
    <div className={`rounded-[32px] border ${borderClass} bg-card p-6 sm:p-8 space-y-8 shadow-2xl`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${bgClass}`}>
            <Icon className={`w-7 h-7 ${colorClass}`} />
          </div>
          <div>
            <h3 className={`text-2xl font-black ${colorClass}`}>{riskLevel}</h3>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Primary Assessment Result</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted text-primary border border-primary/20">
            <BrainCircuit className="w-4 h-4" />
            <span>XGBoost Engine</span>
          </div>
          <button onClick={() => window.print()} className="btn-pill-outline text-xs py-1.5 px-4 hidden md:block">
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Metric Display Box (Circular Gauge) */}
        <div className="lg:col-span-4 bg-muted/50 p-6 rounded-[24px] border border-border text-center space-y-4 flex flex-col items-center justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Risk Probability
          </span>
          
          <div className="relative w-48 h-24 overflow-hidden flex items-end justify-center pt-4">
             {/* Background Arc */}
             <svg className="absolute top-0 w-40 h-40 transform -rotate-180">
               <circle cx="80" cy="80" r="60" className="stroke-muted fill-none" strokeWidth="16" />
               <circle 
                 cx="80" 
                 cy="80" 
                 r="60" 
                 className={`fill-none transition-all duration-1500 ease-out`}
                 stroke={riskScore >= 0.7 ? "var(--color-destructive)" : riskScore >= 0.3 ? "var(--color-warning)" : "var(--color-success)"}
                 strokeWidth="16" 
                 strokeDasharray={circumference}
                 strokeDashoffset={dashoffset}
                 strokeLinecap="round"
               />
             </svg>
             <div className="absolute bottom-0 flex flex-col items-center pb-2">
               <span className={`text-4xl font-black ${colorClass}`}>
                 {percentage}%
               </span>
             </div>
          </div>
          
          <p className="text-[10px] font-semibold text-muted-foreground w-full text-center px-4">
            Platt-scaled probability calibrated for Nigerian demographic parameters.
          </p>
        </div>

        {/* Narrative & Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <FileText className="w-4 h-4" />
              <span>Automated Clinical Narrative</span>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border">
              <p className="text-foreground text-sm leading-relaxed font-medium">
                {clinicalNarrative}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <ClipboardList className="w-4 h-4" />
              <span>Clinical Recommendations</span>
            </div>
            <ul className="space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-medium p-3 rounded-xl bg-card border border-border">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${bgClass} ${colorClass}`}>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
