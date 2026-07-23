"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { BarChart2, Dna, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface ShapBarChartProps {
  shapValues: Record<string, number>;
}

export function ShapBarChart({ shapValues }: ShapBarChartProps) {
  // Transform dict into array and sort by absolute impact
  const data = Object.entries(shapValues)
    .map(([feature, impact]) => ({
      feature: formatFeatureName(feature),
      impact: impact,
      absImpact: Math.abs(impact),
    }))
    .sort((a, b) => b.absImpact - a.absImpact);

  return (
    <Card className="shadow-md border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <CardHeader className="border-b border-slate-100 dark:border-zinc-800 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Feature Importance (SHAP)</CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Quantitative attribution of each clinical parameter to the final prediction.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-md border border-rose-200 dark:border-rose-900">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Increases Risk</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-900">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>Decreases Risk</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
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
                tick={{ fontSize: 12, fill: "currentColor" }}
                width={130}
              />
              <Tooltip 
                cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                formatter={(value: any) => [
                  typeof value === "number" ? (value > 0 ? `+${value.toFixed(4)}` : value.toFixed(4)) : String(value ?? ""),
                  "SHAP Contribution"
                ]}
              />
              <ReferenceLine x={0} stroke="#cbd5e1" strokeDasharray="3 3" />
              <Bar dataKey="impact" radius={[0, 6, 6, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.impact > 0 ? "#f43f5e" : "#10b981"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
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
