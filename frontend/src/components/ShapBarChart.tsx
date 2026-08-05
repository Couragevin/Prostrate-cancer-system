"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { Dna, ArrowUpRight, ArrowDownRight, Lightbulb } from "lucide-react";

/**
 * The category axis takes a fixed pixel width in Recharts. At 130px it consumed
 * half of a phone-width chart, squeezing every bar into a sliver. Narrow the
 * axis (and the gutters) on small screens so the bars keep readable length.
 */
function useCompactChart(): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return compact;
}

interface ShapBarChartProps {
  shapValues: Record<string, number>;
}

export function ShapBarChart({ shapValues }: ShapBarChartProps) {
  const compact = useCompactChart();

  const data = Object.entries(shapValues)
    .map(([feature, impact]) => ({
      feature: formatFeatureName(feature),
      impact: impact,
      absImpact: Math.abs(impact),
    }))
    .sort((a, b) => b.absImpact - a.absImpact);

  // SHAP values here are contributions to the model's raw log-odds margin, not
  // to a probability. Reporting `impact * 100` as "percentage points" produced
  // impossible figures like "272 percentage points". Share of total absolute
  // attribution is the honest, unit-free way to rank drivers.
  const totalAbsImpact = data.reduce((sum, d) => sum + d.absImpact, 0);

  const topDrivers = data
    .filter((d) => d.absImpact > 0)
    .slice(0, 3)
    .map((d) => ({
      ...d,
      share: totalAbsImpact > 0 ? (d.absImpact / totalAbsImpact) * 100 : 0,
    }));

  return (
    <div className="rounded-[32px] border border-border bg-card p-6 sm:p-8 space-y-8 shadow-2xl text-foreground mt-8 print:rounded-none print:shadow-none print:p-0 print:mt-6 print:break-before-page">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Dna className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-foreground">What Affected This Result</h3>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
              How each field changed the risk score
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1 text-danger bg-danger/10 px-3 py-1.5 rounded-full border border-danger/30">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Raised Risk</span>
          </div>
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/30">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Lowered Risk</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart Area */}
        <div className="lg:col-span-7 h-[350px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={compact ? { top: 5, right: 8, left: 0, bottom: 5 } : { top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="feature"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: compact ? 10 : 12, fill: "var(--color-muted-foreground)" }}
                width={compact ? 84 : 130}
              />
              <Tooltip 
                cursor={{ fill: "var(--color-muted)" }}
                contentStyle={{ 
                  borderRadius: "16px", 
                  backgroundColor: "var(--color-card)", 
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" 
                }}
                formatter={(value: unknown) => [
                  typeof value === "number"
                    ? (value > 0 ? `+${value.toFixed(3)}` : value.toFixed(3))
                    : String(value ?? ""),
                  "Effect on score"
                ]}
              />
              <ReferenceLine x={0} stroke="var(--color-border)" strokeDasharray="3 3" />
              <Bar dataKey="impact" radius={[0, 8, 8, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.impact > 0 ? "var(--color-destructive)" : "var(--color-primary)"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Explainability Panel */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Lightbulb className="w-4 h-4" />
            <span>Top Factors</span>
          </div>
          
          <div className="space-y-3">
            {topDrivers.map((driver, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-muted/50 flex items-start gap-4">
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  driver.impact > 0 ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
                }`}>
                  <span className="text-xs font-black">{idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{driver.feature}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {driver.impact > 0 ? "Made the result look more concerning" : "Made the result look less concerning"},
                    making up {driver.share.toFixed(0)}% of the model&apos;s total influence for this result.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
            <span className="font-bold">How to read this:</span> Longer bars had a stronger effect.
            Red bars raised the risk score, while blue bars lowered it. This chart shows influence,
            not a diagnosis.
          </div>
        </div>

      </div>
    </div>
  );
}

function formatFeatureName(key: string): string {
  const map: Record<string, string> = {
    age: "Age Group",
    age_band: "Age Group",
    psa_level: "PSA Blood Test",
    psa_density: "PSA Density",
    family_history: "Close Family History",
    bmi_category: "BMI Group",
    hypertension: "High Blood Pressure",
    diabetes: "Diabetes",
    dre_finding: "Prostate Exam"
  };
  // Fall back to a title-cased version rather than leaking a raw snake_case key.
  return (
    map[key] ??
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
