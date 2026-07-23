"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

interface HistoryRecord {
  id: string;
  psa_level: number;
  risk_score: number;
  created_at: string;
}

interface PatientHistoryProps {
  patientId: string;
}

export function PatientHistory({ patientId }: PatientHistoryProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`/api/v1/history/${patientId}`);
        const historyData = response.data.history;
        
        // Transform data for Recharts (reverse to get chronological order)
        const formattedData = historyData.reverse().map((record: HistoryRecord) => ({
          date: format(new Date(record.created_at), "MMM yyyy"),
          psa_level: record.psa_level,
          risk: record.risk_score * 100, // percentage
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch patient history:", error);
      } finally {
        setLoading(false);
      }
    }

    if (patientId) {
      fetchHistory();
    }
  }, [patientId]);

  if (loading) {
    return <div className="animate-pulse h-64 bg-zinc-100 dark:bg-zinc-900 rounded-lg"></div>;
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
        <CardContent className="pt-6 text-center text-zinc-500">
          No longitudinal data available for this patient yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
      <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <CardTitle className="text-lg">Longitudinal Tracking</CardTitle>
        <CardDescription>
          Tracking PSA velocity and algorithmic risk progression over time.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "currentColor" }} 
                dy={10}
              />
              <YAxis 
                yAxisId="left" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "currentColor" }} 
                label={{ value: 'PSA (ng/mL)', angle: -90, position: 'insideLeft', offset: -5 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "currentColor" }} 
                label={{ value: 'Risk (%)', angle: 90, position: 'insideRight', offset: -5 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="psa_level" 
                name="PSA Level"
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="risk" 
                name="Risk Score"
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
