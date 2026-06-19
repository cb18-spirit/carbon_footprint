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

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
  label?: string;
}

// Custom Tooltip component for Recharts conforming to design tokens
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-[#141C18]/95 border border-[#2D6A4F]/15 dark:border-[#52B788]/20 p-3 rounded-2xl shadow-lg backdrop-blur-md">
        <p className="text-xxxxs font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-550 mb-1">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-xxs font-bold uppercase tracking-wider text-[#2D6A4F] dark:text-[#52B788]">
            {pld.name}: {pld.value} kg
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[#2D6A4F]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
            Predictive Analytics
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-[#A0AEC0] mt-1 font-bold">
            Compare historical trends with predictive AI carbon reduction projections.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full glass-button px-4 py-2 text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] dark:text-[#52B788]">
          <Calendar className="h-4 w-4" />
          <span>Forecast Horizon: 4 Weeks</span>
        </div>
      </div>

      {/* Analytics Summary Stats Banner */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl glass-card p-6">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-550 dark:text-zinc-400 mb-3">
            <TrendingDown className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            Projected Reduction
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
            -32.6%
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-relaxed font-bold">
            Calculated target by Week 7, assuming daily quest completion remains above 80%.
          </p>
        </div>

        <div className="rounded-3xl glass-card p-6">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-550 dark:text-zinc-400 mb-3">
            <ZapOff className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            Avoided Emissions
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
            25.2 kg
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-relaxed font-bold">
            Carbon emissions prevented from entering the biosphere over the past 30 days.
          </p>
        </div>

        <div className="rounded-3xl glass-card p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-550 dark:text-zinc-400 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            Allowance Goal Fit
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
            On Track
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-relaxed font-bold">
            Predicted curve sits comfortably below the carbon ceiling threshold of 120 kg.
          </p>
        </div>
      </div>

      {/* Main Chart wrapper */}
      <div className="rounded-3xl glass-card p-6">
        <h2 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase mb-1 font-sans">
          Predictive Emission Projections
        </h2>
        <p className="text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-6">
          Historical records (solid line) merged with our predictive model&apos;s future forecast (dotted line).
        </p>

        <div className="min-h-[300px] flex items-center justify-center relative w-full pr-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2421" className="hidden dark:block" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#718096" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#718096" }} axisLine={false} tickLine={false} label={{ value: "CO2E (KG)", angle: -90, position: "insideLeft", style: { fontSize: 8, fill: "#718096", letterSpacing: "0.1em" } }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "9px", paddingTop: "15px", textTransform: "uppercase", letterSpacing: "0.1em" }} />
                <Line
                  type="monotone"
                  dataKey="Actual"
                  stroke="#2D6A4F"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 1.5, fill: "#FFFFFF", stroke: "#2D6A4F" }}
                  activeDot={{ r: 6 }}
                  name="Historical Actual"
                />
                <Line
                  type="monotone"
                  dataKey="Predicted"
                  stroke="#74C69D"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 3, strokeWidth: 1, fill: "#FFFFFF", stroke: "#74C69D" }}
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
      <div className="rounded-3xl glass-card p-6">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase flex items-center gap-2 mb-6 font-sans">
          <Sparkles className="h-4 w-4 text-[#2D6A4F] dark:text-[#52B788]" />
          Predictive Insights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#F5F5F5] dark:bg-zinc-900/40 border border-[#2D6A4F]/10 dark:border-white/10 p-4">
            <h4 className="text-xxxxs font-bold tracking-[0.15em] uppercase text-zinc-800 dark:text-zinc-200 mb-1.5 font-sans">Impact of Dietary Changes</h4>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-zinc-400 leading-relaxed font-bold">
              Based on your quest logs, maintaining your vegan lunch habit on weekdays will shift the forecast curve down an additional 4.2 kg CO2e by Week 7.
            </p>
          </div>
          <div className="rounded-2xl bg-[#F5F5F5] dark:bg-zinc-900/40 border border-[#2D6A4F]/10 dark:border-white/10 p-4">
            <h4 className="text-xxxxs font-bold tracking-[0.15em] uppercase text-zinc-800 dark:text-zinc-200 mb-1.5 font-sans">Allowance Buffer Target</h4>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-zinc-400 leading-relaxed font-bold">
              You will reach a safety buffer margin of 58% of your weekly allowance, permitting you to accommodate emergency transit events without breaking limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
