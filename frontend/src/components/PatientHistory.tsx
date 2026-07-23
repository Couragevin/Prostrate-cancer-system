"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";
import { TrendingUp, History, Activity, Calendar, UserCheck } from "lucide-react";

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
        const formattedData = (historyData || []).reverse().map((record: HistoryRecord) => ({
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
    return (
      <Card className="shadow-md border-slate-200 dark:border-zinc-800">
        <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center space-y-3">
          <Activity className="w-8 h-8 text-teal-500 animate-spin" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading patient longitudinal history...</p>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-md border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <CardHeader className="border-b border-slate-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Longitudinal PSA & Risk Trajectory</CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Patient ID: <span className="font-mono font-semibold">{patientId}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8 pb-8 text-center space-y-2">
          <History className="w-10 h-10 text-slate-300 dark:text-zinc-700 mx-auto" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            No historical entries found for patient <span className="font-mono text-teal-600 dark:text-teal-400">{patientId}</span>.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Run a clinical risk assessment above to log the initial diagnostic baseline.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <CardHeader className="border-b border-slate-100 dark:border-zinc-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Longitudinal PSA & Risk Trajectory</CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Tracking historical PSA velocity and predicted risk scores across clinical visits.
              </CardDescription>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>Patient: {patientId}</span>
          </div>
        </div>
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
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="psa_level" 
                name="PSA Level (ng/mL)"
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#0ea5e9" }}
                activeDot={{ r: 7 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="risk" 
                name="Platt Scaled Risk (%)"
                stroke="#f43f5e" 
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#f43f5e" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
