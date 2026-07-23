import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface RiskCardProps {
  riskScore: number;
  clinicalNarrative: string;
}

export function RiskCard({ riskScore, clinicalNarrative }: RiskCardProps) {
  const percentage = (riskScore * 100).toFixed(1);
  
  let riskLevel = "Low Risk";
  let colorClass = "text-green-600 dark:text-green-400";
  let bgClass = "bg-green-50 dark:bg-green-950/20";
  let borderClass = "border-green-200 dark:border-green-900";
  let Icon = CheckCircle;

  if (riskScore >= 0.7) {
    riskLevel = "High Risk";
    colorClass = "text-red-600 dark:text-red-400";
    bgClass = "bg-red-50 dark:bg-red-950/20";
    borderClass = "border-red-200 dark:border-red-900";
    Icon = AlertTriangle;
  } else if (riskScore >= 0.3) {
    riskLevel = "Moderate Risk";
    colorClass = "text-amber-600 dark:text-amber-400";
    bgClass = "bg-amber-50 dark:bg-amber-950/20";
    borderClass = "border-amber-200 dark:border-amber-900";
    Icon = Info;
  }

  return (
    <Card className={`overflow-hidden border ${borderClass} shadow-sm`}>
      <CardHeader className={`${bgClass} border-b ${borderClass} pb-4`}>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Icon className={`w-5 h-5 ${colorClass}`} />
          <span className={colorClass}>{riskLevel} Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Calculated Risk Score
            </div>
            <div className={`text-5xl font-extrabold ${colorClass}`}>
              {percentage}%
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Clinical Narrative
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
              {clinicalNarrative}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
