"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingDown, Calendar, ShieldCheck, ZapOff, Sparkles } from "lucide-react";

// Mock forecasting data combining history & prediction
const forecastData = [
  { name: "Week 1", Actual: 112, Predicted: null },
  { name: "Week 2", Actual: 98, Predicted: null },
  { name: "Week 3", Actual: 85, Predicted: null },
  { name: "Week 4 (Now)", Actual: 77.2, Predicted: 77.2 },
  { name: "Week 5", Actual: null, Predicted: 68 },
  { name: "Week 6", Actual: null, Predicted: 60 },
  { name: "Week 7", Actual: null, Predicted: 52 },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (active) setMounted(true);
    }, 0);
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[#1e3124]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3124] dark:text-[#f2f5f3]">
            Predictive Analytics
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] mt-1 font-bold">
            Compare historical trends with predictive AI carbon reduction projections.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full glass-button px-4 py-2 text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2d5a27] dark:text-[#a3b899]">
          <Calendar className="h-4 w-4" />
          <span>Forecast Horizon: 4 Weeks</span>
        </div>
      </div>

      {/* Analytics Summary Stats Banner */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl glass-card p-6 border border-white/20">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-[#3a503e] dark:text-[#c4d1c2] mb-3">
            <TrendingDown className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Projected Reduction
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#1e3124] dark:text-[#f2f5f3]">
            -32.6%
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-[#a2b5a5] leading-relaxed">
            Calculated target by Week 7, assuming daily quest completion remains above 80%.
          </p>
        </div>

        <div className="rounded-3xl glass-card p-6 border border-white/20">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-[#3a503e] dark:text-[#c4d1c2] mb-3">
            <ZapOff className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            Avoided Emissions
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#1e3124] dark:text-[#f2f5f3]">
            25.2 kg
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-[#a2b5a5] leading-relaxed">
            Carbon emissions prevented from entering the biosphere over the past 30 days.
          </p>
        </div>

        <div className="rounded-3xl glass-card p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-[#3a503e] dark:text-[#c4d1c2] mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-650 dark:text-purple-400" />
            Allowance Goal Fit
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#1e3124] dark:text-[#f2f5f3]">
            On Track
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-[#a2b5a5] leading-relaxed">
            Predicted curve sits comfortably below the carbon ceiling threshold of 120 kg.
          </p>
        </div>
      </div>

      {/* Main Chart wrapper */}
      <div className="rounded-3xl glass-card p-6 border border-white/20">
        <h2 className="text-xs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase mb-1 font-sans">
          Predictive Emission Projections
        </h2>
        <p className="text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-6">
          Historical records (solid line) merged with our predictive model&apos;s future forecast (dotted line).
        </p>

        <div className="min-h-[300px] flex items-center justify-center relative w-full pr-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" className="hidden dark:block" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#666" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#666" }} axisLine={false} tickLine={false} label={{ value: "CO2E (KG)", angle: -90, position: "insideLeft", style: { fontSize: 8, fill: "#666", letterSpacing: "0.1em" } }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(250, 248, 245, 0.95)",
                    border: "1px solid rgba(30, 49, 36, 0.15)",
                    color: "#1e3124",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    borderRadius: "1rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "9px", paddingTop: "15px", textTransform: "uppercase", letterSpacing: "0.1em" }} />
                <Line
                  type="monotone"
                  dataKey="Actual"
                  stroke="#4a7c59"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 1.5 }}
                  activeDot={{ r: 6 }}
                  name="Historical Actual"
                />
                <Line
                  type="monotone"
                  dataKey="Predicted"
                  stroke="#d4a373"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 3, strokeWidth: 1 }}
                  name="Projected Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] w-full rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 animate-pulse" />
          )}
        </div>
      </div>

      {/* Insights Section */}
      <div className="rounded-3xl glass-card p-6 border border-white/20">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase flex items-center gap-2 mb-6 font-sans">
          <Sparkles className="h-4 w-4 text-amber-600 fill-amber-500/10" />
          Predictive Insights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-black/5 dark:bg-white/5 border border-zinc-900/5 dark:border-zinc-100/5 p-4">
            <h4 className="text-xxxxs font-bold tracking-[0.15em] uppercase text-zinc-800 dark:text-zinc-200 mb-1.5 font-sans">Impact of Dietary Changes</h4>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-zinc-450 leading-relaxed font-bold">
              Based on your quest logs, maintaining your vegan lunch habit on weekdays will shift the forecast curve down an additional 4.2 kg CO2e by Week 7.
            </p>
          </div>
          <div className="rounded-2xl bg-black/5 dark:bg-white/5 border border-[#1e3124]/5 dark:border-zinc-100/5 p-4">
            <h4 className="text-xxxxs font-bold tracking-[0.15em] uppercase text-zinc-800 dark:text-zinc-200 mb-1.5 font-sans">Allowance Buffer Target</h4>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-zinc-450 leading-relaxed font-bold">
              You will reach an safety buffer margin of 58% of your weekly allowance, permitting you to accommodate emergency transit events without breaking limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
