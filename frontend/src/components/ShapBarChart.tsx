"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

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
    <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
      <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <CardTitle className="text-lg">Feature Importance (SHAP)</CardTitle>
        <CardDescription>
          Visualizes how each clinical parameter influenced the final risk score.
          Values pushing the score higher are red, those lowering it are green.
        </CardDescription>
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
                width={120}
              />
              <Tooltip 
                cursor={{ fill: "transparent" }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                formatter={(value: number) => [value > 0 ? `+${value.toFixed(4)}` : value.toFixed(4), "Impact"]}
              />
              <ReferenceLine x={0} stroke="#cbd5e1" strokeDasharray="3 3" />
              <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.impact > 0 ? "#ef4444" : "#22c55e"} 
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
    age: "Age",
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
