"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Leaf, Flame, ShieldAlert, Award, Zap, Car, Utensils, ShoppingBag } from "lucide-react";

// Mock data for carbon footprint breakdown
const breakdownData = [
  { name: "Transport", value: 45, color: "#10b981" }, // Emerald 500
  { name: "Energy", value: 30, color: "#06b6d4" },    // Cyan 500
  { name: "Food", value: 15, color: "#f59e0b" },      // Amber 500
  { name: "Shopping", value: 10, color: "#ec4899" },  // Pink 500
];

export default function DashboardPage() {
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
      {/* Top Welcome Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Green Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Track and minimize your carbon footprint impact in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400">
          <Award className="h-5 w-5" />
          <span className="text-sm font-semibold">Tier 3 Eco-Defender</span>
        </div>
      </div>

      {/* Main Grid: Card Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Carbon Allowance Card */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm dark:border-emerald-500/10 dark:bg-zinc-950">
          <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-emerald-500/10" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Carbon Allowance
            </h2>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              42.8
            </span>
            <span className="text-sm font-medium text-zinc-500">kg CO2e left</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-zinc-500 mb-1">
              <span>Used: 77.2 kg</span>
              <span>Limit: 120 kg</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-600 dark:bg-emerald-400"
                style={{ width: "64.3%" }}
              />
            </div>
          </div>
        </div>

        {/* Energy Saver Streak Card */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-950/10 bg-white p-6 shadow-sm dark:border-cyan-500/10 dark:bg-zinc-950">
          <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-cyan-500/10" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-50 p-2.5 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400">
              <Flame className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Streak Score
            </h2>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              14
            </span>
            <span className="text-sm font-medium text-zinc-500">Days Active</span>
          </div>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            Top 8% this week! Keep completing tasks to save more CO2.
          </p>
        </div>

        {/* Warning Allowance alert */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-950/10 bg-white p-6 shadow-sm dark:border-amber-500/10 dark:bg-zinc-950 sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-amber-500/10" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Highest Impact
            </h2>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Transit
            </span>
          </div>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            Your flight last Wednesday accounted for 60% of this week&apos;s carbon use.
          </p>
        </div>
      </div>

      {/* Chart and Breakdown Segment */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recharts Donut wrapper */}
        <div className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm dark:border-emerald-500/10 dark:bg-zinc-950 lg:col-span-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
            Weekly Carbon Breakdown
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            Proportionate division of carbon emissions generated in kilograms.
          </p>

          <div className="flex flex-1 flex-col items-center justify-center min-h-[260px] relative">
            {mounted ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={breakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] w-[260px] rounded-full border-4 border-dashed border-zinc-200 dark:border-zinc-800 animate-spin" />
            )}

            {/* Inner Absolute Center Total label */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">77.2</span>
              <span className="text-xxs uppercase tracking-wider font-semibold text-zinc-400">kg CO2e Total</span>
            </div>
          </div>
        </div>

        {/* Legend list details */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm dark:border-emerald-500/10 dark:bg-zinc-950">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
              Category Breakdown
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Emissions by source category.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Transport</p>
                    <p className="text-xxs text-zinc-500">Cars, trains, flights</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">34.7 kg</p>
                  <p className="text-xxs font-medium text-emerald-500">45%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Energy</p>
                    <p className="text-xxs text-zinc-500">Home heating, electricity</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">23.2 kg</p>
                  <p className="text-xxs font-medium text-cyan-500">30%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Food</p>
                    <p className="text-xxs text-zinc-500">Meat, dairy, local items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">11.6 kg</p>
                  <p className="text-xxs font-medium text-amber-500">15%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 text-pink-600 dark:bg-pink-950/30 dark:text-pink-400">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Shopping</p>
                    <p className="text-xxs text-zinc-500">Clothing, electronics</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">7.7 kg</p>
                  <p className="text-xxs font-medium text-pink-500">10%</p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 py-3 text-center text-xs font-semibold text-white transition-all duration-200 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            Log New Carbon Activity
          </button>
        </div>
      </div>
    </div>
  );
}
