"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";
import { TrendingUp, History, Activity, UserCheck } from "lucide-react";
import { type PatientHistoryRecord, type ChartHistoryPoint } from "@/lib/types";

interface PatientHistoryProps {
  patientId: string;
}

export function PatientHistory({ patientId }: PatientHistoryProps) {
  const [data, setData] = useState<ChartHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`/api/v1/history/${patientId}`);
        const historyData = response.data.history;
        
        const formattedData = (historyData || []).reverse().map((record: PatientHistoryRecord) => ({
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
      <div className="rounded-[28px] border border-white/10 bg-[#0A3D4C] p-8 text-center space-y-3">
        <Activity className="w-8 h-8 text-[#00C9A7] animate-spin mx-auto" />
        <p className="text-sm font-medium text-slate-300">Loading patient longitudinal history...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-[#0A3D4C] p-8 text-center space-y-4 text-white">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="p-2.5 rounded-xl bg-[#00C9A7]/10 text-[#00C9A7]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">Longitudinal PSA & Risk Trajectory</h3>
            <p className="text-xs text-slate-300">Patient ID: <span className="font-mono text-[#00C9A7]">{patientId}</span></p>
          </div>
        </div>

        <div className="py-6 space-y-2">
          <History className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="text-sm font-medium text-slate-300">
            No historical entries recorded for patient <span className="font-mono text-[#00C9A7]">{patientId}</span>.
          </p>
          <p className="text-xs text-slate-400">
            Submit a diagnostic assessment to log the initial clinical baseline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#0A3D4C] p-6 sm:p-8 space-y-6 shadow-xl text-white">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00C9A7]/10 text-[#00C9A7]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Longitudinal PSA & Risk Trajectory</h3>
            <p className="text-xs text-slate-300">
              Tracking historical PSA velocity and predicted risk scores across clinical visits.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#03242E] text-[#00C9A7] border border-white/10">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Patient: {patientId}</span>
        </div>
      </div>

      <div className="h-[350px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#CBD5E1" }} 
              dy={10}
            />
            <YAxis 
              yAxisId="left" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#CBD5E1" }} 
              label={{ value: 'PSA (ng/mL)', angle: -90, position: 'insideLeft', offset: -5, fill: '#CBD5E1' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#CBD5E1" }} 
              label={{ value: 'Risk (%)', angle: 90, position: 'insideRight', offset: -5, fill: '#CBD5E1' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: "16px", 
                backgroundColor: "#03242E", 
                borderColor: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)" 
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="psa_level" 
              name="PSA Level (ng/mL)"
              stroke="#38BDF8" 
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: "#38BDF8" }}
              activeDot={{ r: 7 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="risk" 
              name="Platt Scaled Risk (%)"
              stroke="#F43F5E" 
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: "#F43F5E" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
