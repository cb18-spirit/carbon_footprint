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
    <div className="flex-1 space-y-8 p-6 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Predictive Analytics
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Compare historical trends with predictive AI carbon reduction projections.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-2 text-cyan-800 dark:bg-cyan-950/20 dark:text-cyan-400">
          <Calendar className="h-5 w-5" />
          <span className="text-sm font-semibold">Forecast Horizon: 4 Weeks</span>
        </div>
      </div>

      {/* Analytics Summary Stats Banner */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-950 dark:bg-zinc-950">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            <TrendingDown className="h-4.5 w-4.5 text-emerald-500" />
            Projected Reduction
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            -32.6%
          </p>
          <p className="mt-2 text-xxs text-zinc-500 leading-normal">
            Calculated target by Week 7, assuming daily quest completion remains above 80%.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-950 dark:bg-zinc-950">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            <ZapOff className="h-4.5 w-4.5 text-cyan-500" />
            Avoided Emissions
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            25.2 kg
          </p>
          <p className="mt-2 text-xxs text-zinc-500 leading-normal">
            Carbon emissions prevented from entering the biosphere over the past 30 days.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-950 dark:bg-zinc-950 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="h-4.5 w-4.5 text-purple-500" />
            Allowance Goal Fit
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            On Track
          </p>
          <p className="mt-2 text-xxs text-zinc-500 leading-normal">
            Predicted curve sits comfortably below the carbon ceiling threshold of 120 kg.
          </p>
        </div>
      </div>

      {/* Main Chart wrapper */}
      <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm dark:border-emerald-500/10 dark:bg-zinc-950">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          Predictive Emission Projections
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          Historical records (solid line) merged with our predictive model&apos;s future forecast (dotted line).
        </p>

        <div className="min-h-[300px] flex items-center justify-center relative w-full pr-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" className="hidden dark:block" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} label={{ value: "CO2e (kg)", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "#888" } }} />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "15px" }} />
                <Line
                  type="monotone"
                  dataKey="Actual"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  name="Historical Actual"
                />
                <Line
                  type="monotone"
                  dataKey="Predicted"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 4, strokeWidth: 1 }}
                  name="Projected Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] w-full rounded-2xl border-4 border-dashed border-zinc-200 dark:border-zinc-800 animate-pulse" />
          )}
        </div>
      </div>

      {/* Insights Section */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-950 dark:bg-zinc-950">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/10" />
          Predictive Insights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">Impact of Dietary Changes</h4>
            <p className="text-xxs text-zinc-500 dark:text-zinc-450 leading-relaxed">
              Based on your quest logs, maintaining your vegan lunch habit on weekdays will shift the forecast curve down an additional 4.2 kg CO2e by Week 7.
            </p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">Allowance Buffer Target</h4>
            <p className="text-xxs text-zinc-500 dark:text-zinc-450 leading-relaxed">
              You will reach an safety buffer margin of 58% of your weekly allowance, permitting you to accommodate emergency transit events without breaking limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
