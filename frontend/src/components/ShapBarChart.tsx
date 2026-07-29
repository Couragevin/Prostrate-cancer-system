"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { Dna, ArrowUpRight, ArrowDownRight, Lightbulb } from "lucide-react";

interface ShapBarChartProps {
  shapValues: Record<string, number>;
}

export function ShapBarChart({ shapValues }: ShapBarChartProps) {
  const data = Object.entries(shapValues)
    .map(([feature, impact]) => ({
      feature: formatFeatureName(feature),
      impact: impact,
      absImpact: Math.abs(impact),
    }))
    .sort((a, b) => b.absImpact - a.absImpact);

  const topDrivers = data.slice(0, 3);

  return (
    <div className="rounded-[32px] border border-border bg-card p-6 sm:p-8 space-y-8 shadow-2xl text-foreground mt-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Dna className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-foreground">AI Explainability (SHAP)</h3>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
              Feature Attribution Analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1 text-danger bg-danger/10 px-3 py-1.5 rounded-full border border-danger/30">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Increases Risk</span>
          </div>
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/30">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Decreases Risk</span>
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
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="feature" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                width={130}
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
                formatter={(value: any) => [
                  typeof value === "number" ? (value > 0 ? `+${value.toFixed(4)}` : value.toFixed(4)) : String(value ?? ""),
                  "SHAP Contribution"
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
            <span>Key Driving Factors</span>
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
                    This factor {driver.impact > 0 ? "increased" : "decreased"} the overall risk probability by roughly {Math.abs(driver.impact * 100).toFixed(1)} percentage points relative to the baseline demographic risk.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
            <span className="font-bold">Interpretation Guide:</span> SHAP (SHapley Additive exPlanations) values assign each feature an importance value for a particular prediction, offering transparency into how the XGBoost engine reached its conclusion.
          </div>
        </div>

      </div>
    </div>
  );
}

function formatFeatureName(key: string): string {
  const map: Record<string, string> = {
    age: "Age Band",
    psa_level: "PSA Level",
    psa_density: "PSA Density",
    family_history: "Family History",
    bmi_category: "BMI Category",
    hypertension: "Hypertension",
    diabetes: "Diabetes",
    dre_finding: "DRE Finding"
  };
  return map[key] || key;
}
