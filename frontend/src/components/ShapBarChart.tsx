"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { Dna, ArrowUpRight, ArrowDownRight } from "lucide-react";

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

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#0A3D4C] p-6 sm:p-8 space-y-6 shadow-xl text-white">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00C9A7]/10 text-[#00C9A7] border border-[#00C9A7]/20">
            <Dna className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Feature Importance (SHAP)</h3>
            <p className="text-xs text-slate-300">
              Quantitative feature attribution explaining prediction influences.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1 text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/30">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Increases Risk</span>
          </div>
          <div className="flex items-center gap-1 text-[#00C9A7] bg-[#00C9A7]/10 px-3 py-1.5 rounded-full border border-[#00C9A7]/30">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Decreases Risk</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pt-2">
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
              tick={{ fontSize: 12, fill: "#CBD5E1" }}
              width={130}
            />
            <Tooltip 
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              contentStyle={{ 
                borderRadius: "16px", 
                backgroundColor: "#03242E", 
                borderColor: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)" 
              }}
              formatter={(value: any) => [
                typeof value === "number" ? (value > 0 ? `+${value.toFixed(4)}` : value.toFixed(4)) : String(value ?? ""),
                "SHAP Contribution"
              ]}
            />
            <ReferenceLine x={0} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            <Bar dataKey="impact" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.impact > 0 ? "#F43F5E" : "#00C9A7"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
