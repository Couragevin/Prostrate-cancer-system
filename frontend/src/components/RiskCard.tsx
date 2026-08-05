"use client";

import { AlertOctagon, CheckCircle2, AlertTriangle, BrainCircuit, FileText, ClipboardList, Printer } from "lucide-react";
import type { ClinicalInput } from "@/lib/schemas";
import type { RiskCategory } from "@/lib/types";

interface RiskCardProps {
  riskScore: number;
  /** Authoritative category from the backend. */
  riskCategory?: RiskCategory;
  clinicalNarrative: string;
  classProbabilities?: Record<string, number>;
  modelType?: "xgboost" | "logistic_regression";
  completedAt?: Date | null;
  inputs?: ClinicalInput;
}

const PRESENTATION: Record<RiskCategory, {
  label: string;
  color: string;
  bg: string;
  border: string;
  stroke: string;
  Icon: typeof CheckCircle2;
  recommendations: string[];
}> = {
  Low: {
    label: "Low Risk Profile",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    stroke: "var(--color-success)",
    Icon: CheckCircle2,
    recommendations: [
      "Routine screening recommended in 1-2 years.",
      "Discuss lifestyle factors and general prostate health.",
      "Monitor for any new urinary symptoms.",
    ],
  },
  Intermediate: {
    label: "Intermediate Risk Profile",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    stroke: "var(--color-warning)",
    Icon: AlertTriangle,
    recommendations: [
      "Consider supplementary testing (e.g., multiparametric MRI).",
      "Schedule repeat PSA testing in 6 months.",
      "Discuss risk profile and the option of watchful waiting.",
    ],
  },
  High: {
    label: "High Risk Profile",
    color: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/30",
    stroke: "var(--color-danger)",
    Icon: AlertOctagon,
    recommendations: [
      "Urgent urology referral recommended.",
      "Discuss biopsy options with patient.",
      "Consider multiparametric MRI if not already performed.",
    ],
  },
};

/**
 * Fallback only. The backend is the source of truth for stratification; this
 * exists so the card still renders if `risk_category` is ever absent.
 */
function categoryFromScore(score: number): RiskCategory {
  if (score >= 0.7) return "High";
  if (score >= 0.3) return "Intermediate";
  return "Low";
}

const MODEL_LABEL: Record<string, string> = {
  xgboost: "XGBoost Classifier",
  logistic_regression: "Logistic Regression (Platt-scaled)",
};

export function RiskCard({
  riskScore,
  riskCategory,
  clinicalNarrative,
  classProbabilities,
  modelType = "xgboost",
  completedAt,
  inputs,
}: RiskCardProps) {
  const category = riskCategory ?? categoryFromScore(riskScore);
  const { label, color, bg, border, stroke, Icon, recommendations } = PRESENTATION[category];

  const numericPercentage = Math.min(100, Math.max(0, riskScore * 100));
  const percentage = numericPercentage.toFixed(1);

  // Semi-circular gauge geometry.
  const radius = 60;
  const circumference = radius * Math.PI;
  const dashoffset = circumference - (numericPercentage / 100) * circumference;

  const timestamp = completedAt ?? new Date();

  return (
    <div className={`rounded-[32px] border ${border} bg-card p-6 sm:p-8 space-y-8 shadow-2xl print:shadow-none print:border print:rounded-none print:p-0`}>

      {/* Print-only report header. Hidden on screen; anchors the paper copy
          with who/when/what, which a clinical record needs. */}
      <div className="hidden print:block border-b-2 border-black pb-3 mb-4">
        <h1 className="text-xl font-bold">Prostate Cancer Risk Stratification Report</h1>
        <div className="flex justify-between text-[11px] mt-2">
          <span>Generated: {timestamp.toLocaleString()}</span>
          <span>Model: {MODEL_LABEL[modelType] ?? modelType}</span>
        </div>
      </div>

      {/* Print-only input summary, so the report is self-contained. */}
      {inputs && (
        <table className="hidden print:table w-full text-[11px] mb-4 border-collapse">
          <tbody>
            <tr>
              <th className="text-left border border-black px-2 py-1 w-1/4">Age Band</th>
              <td className="border border-black px-2 py-1">{inputs.age_band}</td>
              <th className="text-left border border-black px-2 py-1 w-1/4">BMI Category</th>
              <td className="border border-black px-2 py-1">{inputs.bmi_category}</td>
            </tr>
            <tr>
              <th className="text-left border border-black px-2 py-1">PSA Level</th>
              <td className="border border-black px-2 py-1">{inputs.psa_level} ng/mL</td>
              <th className="text-left border border-black px-2 py-1">PSA Density</th>
              <td className="border border-black px-2 py-1">{inputs.psa_density}</td>
            </tr>
            <tr>
              <th className="text-left border border-black px-2 py-1">DRE Finding</th>
              <td className="border border-black px-2 py-1">{inputs.dre_finding}</td>
              <th className="text-left border border-black px-2 py-1">Family History</th>
              <td className="border border-black px-2 py-1">{inputs.family_history ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th className="text-left border border-black px-2 py-1">Hypertension</th>
              <td className="border border-black px-2 py-1">{inputs.hypertension ? "Yes" : "No"}</td>
              <th className="text-left border border-black px-2 py-1">Diabetes</th>
              <td className="border border-black px-2 py-1">{inputs.diabetes ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${bg} print:hidden`}>
            <Icon className={`w-7 h-7 ${color}`} />
          </div>
          <div>
            <h3 className={`text-2xl font-black ${color}`}>{label}</h3>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Primary Assessment Result</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted text-primary border border-primary/20">
            <BrainCircuit className="w-4 h-4" />
            <span>{MODEL_LABEL[modelType] ?? modelType}</span>
          </div>
          <button
            onClick={() => window.print()}
            className="btn-pill-outline text-xs py-1.5 px-4 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:grid-cols-2 print:gap-4">

        {/* Metric Display Box (Circular Gauge) */}
        <div className="lg:col-span-4 bg-muted/50 p-6 rounded-[24px] border border-border text-center space-y-4 flex flex-col items-center justify-center print:break-inside-avoid">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Composite Risk Index
          </span>

          <div className="relative w-48 h-24 overflow-hidden flex items-end justify-center pt-4">
             <svg className="absolute top-0 w-40 h-40 transform -rotate-180" aria-hidden="true">
               <circle cx="80" cy="80" r={radius} className="stroke-muted fill-none" strokeWidth="16" />
               <circle
                 cx="80"
                 cy="80"
                 r={radius}
                 className="fill-none transition-all duration-1000 ease-out"
                 stroke={stroke}
                 strokeWidth="16"
                 strokeDasharray={circumference}
                 strokeDashoffset={dashoffset}
                 strokeLinecap="round"
               />
             </svg>
             <div className="absolute bottom-0 flex flex-col items-center pb-2">
               <span className={`text-4xl font-black ${color}`}>
                 {percentage}%
               </span>
             </div>
          </div>

          <p className="text-[10px] font-semibold text-muted-foreground w-full text-center px-4">
            Expected-severity index across Low / Intermediate / High. Not the probability of a diagnosis.
          </p>

          {classProbabilities && (
            <dl className="w-full space-y-1.5 pt-3 border-t border-border">
              {(["Low", "Intermediate", "High"] as const).map((key) => (
                <div key={key} className="flex items-center justify-between text-[11px]">
                  <dt className="font-semibold text-muted-foreground">{key}</dt>
                  <dd className="font-bold text-foreground tabular-nums">
                    {((classProbabilities[key] ?? 0) * 100).toFixed(1)}%
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Narrative & Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <FileText className="w-4 h-4 print:hidden" />
              <span>Automated Clinical Narrative</span>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border print:p-2">
              <p className="text-foreground text-sm leading-relaxed font-medium whitespace-pre-line">
                {clinicalNarrative}
              </p>
            </div>
          </div>

          <div className="space-y-3 print:break-inside-avoid">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <ClipboardList className="w-4 h-4 print:hidden" />
              <span>Clinical Recommendations</span>
            </div>
            <ul className="space-y-2">
              {recommendations.map((rec) => (
                <li key={rec} className="flex items-start gap-3 text-sm text-muted-foreground font-medium p-3 rounded-xl bg-card border border-border print:p-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${bg} ${color} print:hidden`}>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Print-only footer: a printed clinical document must carry its own
          provenance and limitations once it leaves the screen. */}
      <div className="hidden print:block border-t border-black pt-2 mt-4 text-[9px] leading-snug">
        <p>
          <strong>Decision support only.</strong> This report is generated by a machine-learning
          model and does not constitute a diagnosis. Clinical correlation and specialist
          review are required before any diagnostic or treatment decision.
        </p>
        <p className="mt-1">
          Generated {timestamp.toLocaleString()} &middot; Prostate Cancer Risk Stratification System
        </p>
      </div>

    </div>
  );
}
