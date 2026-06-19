"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingDown, Calendar, DollarSign, Target, Globe, Sparkles, Leaf } from "lucide-react";

// Timeframe types
type Timeframe = "6-month" | "1-year" | "5-year";

// Datasets for each outlook
const datasets: Record<Timeframe, Array<{ name: string; GhostBaseline: number; ActiveTrajectory: number }>> = {
  "6-month": [
    { name: "Month 1", GhostBaseline: 15.0, ActiveTrajectory: 15.0 },
    { name: "Month 2", GhostBaseline: 15.0, ActiveTrajectory: 13.2 },
    { name: "Month 3", GhostBaseline: 15.0, ActiveTrajectory: 11.5 },
    { name: "Month 4", GhostBaseline: 15.0, ActiveTrajectory: 9.8 },
    { name: "Month 5", GhostBaseline: 15.0, ActiveTrajectory: 8.2 },
    { name: "Month 6", GhostBaseline: 15.0, ActiveTrajectory: 6.8 },
  ],
  "1-year": [
    { name: "Q1", GhostBaseline: 15.0, ActiveTrajectory: 14.2 },
    { name: "Q2", GhostBaseline: 15.0, ActiveTrajectory: 11.8 },
    { name: "Q3", GhostBaseline: 15.0, ActiveTrajectory: 9.2 },
    { name: "Q4", GhostBaseline: 15.0, ActiveTrajectory: 6.5 },
  ],
  "5-year": [
    { name: "Year 1", GhostBaseline: 15.0, ActiveTrajectory: 12.5 },
    { name: "Year 2", GhostBaseline: 15.0, ActiveTrajectory: 9.0 },
    { name: "Year 3", GhostBaseline: 15.0, ActiveTrajectory: 6.2 },
    { name: "Year 4", GhostBaseline: 15.0, ActiveTrajectory: 3.8 },
    { name: "Year 5", GhostBaseline: 15.0, ActiveTrajectory: 1.5 },
  ],
};

// Summary metrics per timeframe
const metrics: Record<Timeframe, { co2Avoided: string; savings: string; netZeroYear: string; reductionPercent: string }> = {
  "6-month": {
    co2Avoided: "185 kg CO2e",
    savings: "$152",
    netZeroYear: "2032 (Est.)",
    reductionPercent: "-54.7%",
  },
  "1-year": {
    co2Avoided: "480 kg CO2e",
    savings: "$410",
    netZeroYear: "2030 (Est.)",
    reductionPercent: "-56.6%",
  },
  "5-year": {
    co2Avoided: "3,150 kg CO2e",
    savings: "$2,680",
    netZeroYear: "2027 (On Track)",
    reductionPercent: "-90.0%",
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

// Custom Tooltip component for Recharts conforming to design tokens
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-[#141C18]/95 border border-[#2D6A4F]/15 dark:border-[#52B788]/20 p-3 rounded-2xl shadow-lg backdrop-blur-md">
        <p className="text-xxxxs font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-550 mb-1.5">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-xxs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: pld.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pld.color }} />
            {pld.name === "GhostBaseline" ? "Ghost Baseline" : "Active Trajectory"}: {pld.value.toFixed(1)} kg/day
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [timeframe, setTimeframe] = useState<Timeframe>("6-month");

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (active) setMounted(true);
    }, 0);
    return () => {
      active = false;
    };
  }, []);

  const activeData = datasets[timeframe];
  const activeMetrics = metrics[timeframe];

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#2D6A4F]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
            Predictive Forecast
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-[#A0AEC0] mt-1 font-bold">
            Simulate your active quest momentum against your onboarding baseline.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full glass-button px-4 py-2 text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] dark:text-[#52B788]">
          <Calendar className="h-4 w-4" />
          <span>Active Forecast System</span>
        </div>
      </div>

      {/* 1. Interactive Timeframe Selectors */}
      <div className="flex flex-wrap gap-2.5 border-b border-[#2D6A4F]/5 dark:border-white/5 pb-4">
        {(["6-month", "1-year", "5-year"] as Timeframe[]).map((tf) => {
          const isActive = timeframe === tf;
          const label = tf === "6-month" ? "6-Month Outlook" : tf === "1-year" ? "1-Year Forecast" : "5-Year Target";
          return (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-5 py-2.5 rounded-full text-xxxxs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#2D6A4F] text-white dark:bg-[#52B788] dark:text-[#0A0F0D]"
                  : "border border-[#2D6A4F]/20 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:border-[#52B788]/20 dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 2. The Dual-Line Predictive Chart */}
      <div className="rounded-3xl glass-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase mb-1 font-sans">
              Daily Emission Projections (CO2e kg/day)
            </h2>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-550">
              Contrasting your static onboarding footprint against your dynamic habit trajectories.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xxxxs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-450 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-3.5 border-t-2 border-dashed border-zinc-400 inline-block" />
              Ghost Baseline
            </span>
            <span className="flex items-center gap-1.5 text-[#2D6A4F] dark:text-[#52B788]">
              <span className="h-1.5 w-3.5 border-t-2 border-solid border-[#2D6A4F] dark:border-[#52B788] inline-block" />
              Active Trajectory
            </span>
          </div>
        </div>

        <div className="min-h-[300px] flex items-center justify-center relative w-full pr-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2421" className="hidden dark:block" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#718096" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#718096" }} axisLine={false} tickLine={false} domain={[0, 16]} label={{ value: "CO2E / DAY (KG)", angle: -90, position: "insideLeft", style: { fontSize: 8, fill: "#718096", letterSpacing: "0.1em" } }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="GhostBaseline"
                  stroke="#94A3B8"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ r: 3, strokeWidth: 1.5, fill: "#FFFFFF", stroke: "#94A3B8" }}
                  name="GhostBaseline"
                />
                <Line
                  type="monotone"
                  dataKey="ActiveTrajectory"
                  stroke="#2D6A4F"
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 1.5, fill: "#FFFFFF", stroke: "#2D6A4F" }}
                  activeDot={{ r: 6 }}
                  name="ActiveTrajectory"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] w-full rounded-3xl border border-dashed border-[#2D6A4F]/10 dark:border-[#52B788]/10 animate-pulse" />
          )}
        </div>
      </div>

      {/* 3. Comparative Metric Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Projected CO2 Avoided */}
        <div className="rounded-3xl glass-card p-6">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-550 dark:text-zinc-400 mb-3">
            <TrendingDown className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            Emissions Avoided
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
            {activeMetrics.co2Avoided}
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-zinc-550 leading-relaxed font-bold">
            Projected total cumulative emissions offsets achieved by target date.
          </p>
        </div>

        {/* Net Financial Savings */}
        <div className="rounded-3xl glass-card p-6">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-550 dark:text-zinc-400 mb-3">
            <DollarSign className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            Financial Savings
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
            {activeMetrics.savings}
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-zinc-550 leading-relaxed font-bold">
            Direct utility and transit fuel costs saved through sustainable choices.
          </p>
        </div>

        {/* Target Net-Zero Year */}
        <div className="rounded-3xl glass-card p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-550 dark:text-zinc-400 mb-3">
            <Target className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            Net-Zero Outlook
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
            {activeMetrics.netZeroYear}
          </p>
          <p className="mt-3 text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-zinc-550 leading-relaxed font-bold">
            Estimated timeframe to reduce operational emissions below the threshold.
          </p>
        </div>
      </div>

      {/* AI Insights & Guidance Details */}
      <div className="rounded-3xl glass-card p-6">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase flex items-center gap-2 mb-6 font-sans">
          <Sparkles className="h-4 w-4 text-[#2D6A4F] dark:text-[#52B788]" />
          Predictive Insights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#F5F5F5] dark:bg-zinc-900/40 border border-[#2D6A4F]/10 dark:border-white/10 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Leaf className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
              <h4 className="text-xxxxs font-bold tracking-[0.15em] uppercase text-zinc-800 dark:text-zinc-200 font-sans">Timeframe Forecast Analysis</h4>
            </div>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-zinc-450 leading-relaxed font-bold">
              Your carbon curve is projected to decline by {activeMetrics.reductionPercent} under the selected timeframe if quest completion remains above 80%.
            </p>
          </div>
          <div className="rounded-2xl bg-[#F5F5F5] dark:bg-zinc-900/40 border border-[#2D6A4F]/10 dark:border-white/10 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Globe className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
              <h4 className="text-xxxxs font-bold tracking-[0.15em] uppercase text-zinc-800 dark:text-zinc-200 font-sans">Allowance Buffer Targets</h4>
            </div>
            <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-zinc-450 leading-relaxed font-bold">
              Staying below the Ghost Baseline increases your relative carbon allowance credit margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
