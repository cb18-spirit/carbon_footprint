"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, Flame, Sparkles, TrendingUp, Info } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  co2Saved: number; // in kg
  category: "Diet" | "Transport" | "Energy" | "Waste";
  completed: boolean;
}

const initialQuests: Quest[] = [
  {
    id: "q1",
    title: "Eco Commuter",
    description: "Cycle, walk, or use public transit for all daily commutes.",
    points: 150,
    co2Saved: 4.8,
    category: "Transport",
    completed: true,
  },
  {
    id: "q2",
    title: "Plant-Based Feast",
    description: "Eat entirely meat-free and dairy-free meals today.",
    points: 100,
    co2Saved: 3.2,
    category: "Diet",
    completed: false,
  },
  {
    id: "q3",
    title: "Phantom Power Slayer",
    description: "Unplug standby electronics and chargers when not in use.",
    points: 50,
    co2Saved: 0.8,
    category: "Energy",
    completed: true,
  },
  {
    id: "q4",
    title: "Cold Wash Only",
    description: "Wash a load of laundry using cold water instead of hot.",
    points: 80,
    co2Saved: 1.5,
    category: "Energy",
    completed: false,
  },
  {
    id: "q5",
    title: "Zero Waste Shop",
    description: "Use reusable containers and refuse single-use bags/packaging.",
    points: 70,
    co2Saved: 0.5,
    category: "Waste",
    completed: false,
  },
  {
    id: "q6",
    title: "Local Produce Champion",
    description: "Purchase foods sourced within a 100-mile radius.",
    points: 90,
    co2Saved: 1.2,
    category: "Diet",
    completed: false,
  },
];

const categoryStyles = {
  Diet: "bg-orange-50 text-orange-700 border-orange-200/50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30",
  Transport: "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
  Energy: "bg-cyan-50 text-cyan-700 border-cyan-200/50 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/30",
  Waste: "bg-purple-50 text-purple-700 border-purple-200/50 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30",
};

export default function TrackerPage() {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);

  const toggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  const completedCount = quests.filter((q) => q.completed).length;
  const totalCo2Saved = quests
    .filter((q) => q.completed)
    .reduce((sum, q) => sum + q.co2Saved, 0);

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Quest Tracker
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Complete daily quests, earn green points, and save real carbon.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-white shadow-sm dark:bg-emerald-600">
          <Sparkles className="h-4 w-4 text-emerald-400 dark:text-emerald-200" />
          <span className="text-sm font-semibold">Today&apos;s Total: +{(totalCo2Saved).toFixed(1)} kg saved</span>
        </div>
      </div>

      {/* Progress Card Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-950/10 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 dark:border-emerald-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
              Daily Challenge Progress
              <Flame className="h-5 w-5 text-amber-500 fill-amber-500" />
            </h2>
            <p className="text-sm text-emerald-800/85 dark:text-emerald-400/85">
              Complete 4 quests today to secure your double-streak bonus multiplier.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
              {completedCount} / {quests.length} Completed
            </span>
            <div className="w-40 h-3 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${(completedCount / quests.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quest Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quests.map((quest) => {
          const Icon = quest.completed ? CheckCircle2 : Circle;
          return (
            <div
              key={quest.id}
              onClick={() => toggleQuest(quest.id)}
              className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 cursor-pointer select-none ${
                quest.completed
                  ? "border-emerald-500/30 bg-emerald-500/[0.02] shadow-sm"
                  : "border-zinc-200 bg-white hover:border-emerald-500/40 hover:shadow-md dark:border-zinc-950 dark:bg-zinc-950 dark:hover:border-emerald-500/30"
              }`}
            >
              <div>
                {/* Card Top Row: Category and Points */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xxs font-semibold uppercase tracking-wider ${
                      categoryStyles[quest.category]
                    }`}
                  >
                    {quest.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-zinc-500">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    <span>+{quest.points} pts</span>
                  </div>
                </div>

                {/* Card Title & Desc */}
                <h3
                  className={`text-base font-bold transition-colors ${
                    quest.completed
                      ? "text-zinc-400 line-through dark:text-zinc-500"
                      : "text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                  }`}
                >
                  {quest.title}
                </h3>
                <p
                  className={`mt-1.5 text-xs leading-relaxed ${
                    quest.completed
                      ? "text-zinc-400/80 dark:text-zinc-600"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {quest.description}
                </p>
              </div>

              {/* Card Bottom Row: Checkbox and CO2 */}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900/60">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-5 w-5 transition-all ${
                      quest.completed
                        ? "text-emerald-500 fill-emerald-500/10"
                        : "text-zinc-400 group-hover:text-emerald-500"
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      quest.completed
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {quest.completed ? "Completed" : "Mark Done"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-zinc-400 block">Saved</span>
                  <span
                    className={`text-sm font-extrabold ${
                      quest.completed
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {quest.co2Saved} kg CO2e
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Tip */}
      <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/40">
        <Info className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
          Carbon calculations are estimated based on local energy grids and EPA lifecycle assessment guidelines. Take part in new community quests released every Monday.
        </p>
      </div>
    </div>
  );
}
