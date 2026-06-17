"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  Award,
  Leaf,
  RefreshCw,
  Sparkles,
  Info,
  Check,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  co2Saved: number; // in kg
  pointsValue: number;
  impactGroup: "Low" | "Medium" | "High";
  category: "Energy" | "Transit" | "Diet" | "Waste";
  completed: boolean;
}

const initialTasks: Task[] = [
  // Low Impact (Saves < 1.0 kg)
  {
    id: "t1",
    title: "Phantom Power Slayer",
    description: "Unplug standby electronics, chargers, and power strips before leaving.",
    co2Saved: 0.1,
    pointsValue: 30,
    impactGroup: "Low",
    category: "Energy",
    completed: false,
  },
  {
    id: "t2",
    title: "Eco Shopper",
    description: "Carry canvas bags instead of requesting single-use plastics.",
    co2Saved: 0.3,
    pointsValue: 40,
    impactGroup: "Low",
    category: "Waste",
    completed: false,
  },
  {
    id: "t3",
    title: "Cold Brew Cleaning",
    description: "Wash kitchen dishes using cold tap water instead of hot.",
    co2Saved: 0.4,
    pointsValue: 50,
    impactGroup: "Low",
    category: "Energy",
    completed: false,
  },

  // Medium Impact (Saves 1.0 - 2.0 kg)
  {
    id: "t4",
    title: "Plant-Based Lunch",
    description: "Skip meat and dairy for a clean, vegan agricultural meal footprint.",
    co2Saved: 1.2,
    pointsValue: 100,
    impactGroup: "Medium",
    category: "Diet",
    completed: false,
  },
  {
    id: "t5",
    title: "Shower Sprint",
    description: "Limit shower time to under 5 minutes to conserve thermal gas/power.",
    co2Saved: 1.0,
    pointsValue: 80,
    impactGroup: "Medium",
    category: "Energy",
    completed: false,
  },
  {
    id: "t6",
    title: "Cold Wash Laundry",
    description: "Run a full wash cycle of clothing using cold water instead of hot.",
    co2Saved: 1.5,
    pointsValue: 120,
    impactGroup: "Medium",
    category: "Energy",
    completed: false,
  },

  // High Impact (Saves > 2.0 kg)
  {
    id: "t7",
    title: "Active Commute",
    description: "Walk, cycle, or use public transit instead of single petrol driving.",
    co2Saved: 2.5,
    pointsValue: 200,
    impactGroup: "High",
    category: "Transit",
    completed: false,
  },
  {
    id: "t8",
    title: "Thermostat Moderation",
    description: "Adjust home heating down (or AC cooling up) by 2 degrees for the day.",
    co2Saved: 2.2,
    pointsValue: 180,
    impactGroup: "High",
    category: "Energy",
    completed: false,
  },
  {
    id: "t9",
    title: "Transit Carpool Share",
    description: "Ride share or group carpool with colleagues/friends to split transit load.",
    co2Saved: 2.0,
    pointsValue: 150,
    impactGroup: "High",
    category: "Transit",
    completed: false,
  },
];

export default function TrackerPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<"Low" | "Medium" | "High">("Low");
  
  // Gamified metrics
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(450);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (!active) return;
      setIsMounted(true);
      const savedTasks = localStorage.getItem("terra_carbon_tasks");
      const savedStreak = localStorage.getItem("terra_carbon_streak");
      const savedPoints = localStorage.getItem("terra_carbon_points");

      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks));
        } catch (e) {
          console.error(e);
        }
      }
      if (savedStreak) setStreak(Number(savedStreak));
      if (savedPoints) setPoints(Number(savedPoints));

      // Parse query params to load active tab directly
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get("tab");
        if (tabParam === "Low" || tabParam === "Medium" || tabParam === "High") {
          setActiveTab(tabParam);
        }
      }
    }, 0);
    return () => {
      active = false;
    };
  }, []);

  // Update localStorage helper
  const syncState = (updatedTasks: Task[], newPoints: number) => {
    setTasks(updatedTasks);
    setPoints(newPoints);
    localStorage.setItem("terra_carbon_tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("terra_carbon_points", String(newPoints));
    window.dispatchEvent(new Event("storage"));
  };

  const toggleTask = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        const ptsDiff = nextCompleted ? t.pointsValue : -t.pointsValue;
        setPoints((prev) => {
          const next = prev + ptsDiff;
          localStorage.setItem("terra_carbon_points", String(next));
          return next;
        });
        return { ...t, completed: nextCompleted };
      }
      return t;
    });
    setTasks(updated);
    localStorage.setItem("terra_carbon_tasks", JSON.stringify(updated));
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 0);
  };

  const handleResetQuests = () => {
    const reset = tasks.map((t) => ({ ...t, completed: false }));
    setTasks(reset);
    setPoints(450);
    localStorage.setItem("terra_carbon_tasks", JSON.stringify(reset));
    localStorage.setItem("terra_carbon_points", "450");
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 0);
  };

  const handleCompleteAll = () => {
    const completed = tasks.map((t) => ({ ...t, completed: true }));
    const totalPts = completed.reduce((sum, t) => sum + t.pointsValue, 0) + 450;
    syncState(completed, totalPts);
  };

  // Calculations
  const completedTasks = tasks.filter((t) => t.completed);
  const totalTasksCount = tasks.length;
  const isAllCleared = completedTasks.length === totalTasksCount;

  const co2AvoidedToday = Number(
    completedTasks.reduce((sum, t) => sum + t.co2Saved, 0).toFixed(2)
  );

  // Filter tasks by active difficulty tab
  const activeTabTasks = tasks.filter((t) => t.impactGroup === activeTab);
  const isTabAllCleared = activeTabTasks.every((t) => t.completed);

  // Hydration fallback
  if (!isMounted) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="h-10 w-10 rounded-full border border-dashed border-[#2d5a27] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-4xl mx-auto">
      {/* Page Title & Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[#1e3124]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3124] dark:text-[#f2f5f3]">
            Daily Quest Board
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] mt-1 font-bold">
            Earn streak points and decrease emissions by logging daily environmental tasks.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleResetQuests}
            className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xxxxs font-bold tracking-[0.2em] uppercase text-zinc-650 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
            title="Reset all tasks to unchecked"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Today
          </button>
          <button
            onClick={handleCompleteAll}
            className="rounded-full bg-[#1e3124] hover:bg-[#2d5a27] text-white dark:bg-[#f2f5f3] dark:hover:bg-[#d6ded9] dark:text-[#1e3124] px-5 py-2.5 text-xxxxs font-bold tracking-[0.2em] uppercase cursor-pointer"
          >
            Complete All
          </button>
        </div>
      </div>

      {/* 1. Daily Progress Header Card */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Streak score Card */}
        <div className="relative overflow-hidden rounded-3xl glass-card p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-orange-600 dark:text-orange-400 shrink-0">
              <Flame className="h-4 w-4 fill-orange-500/10" />
            </div>
            <div>
              <span className="text-xxxxs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block">
                Active Streak
              </span>
              <p className="text-lg font-bold text-[#1e3124] dark:text-[#f2f5f3] mt-1">
                {streak} Days
              </p>
            </div>
          </div>
        </div>

        {/* CO2 Avoided Card */}
        <div className="relative overflow-hidden rounded-3xl glass-card p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-emerald-600 dark:text-emerald-400 shrink-0">
              <Leaf className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xxxxs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block">
                CO2 Avoided Today
              </span>
              <p className="text-lg font-bold text-[#1e3124] dark:text-[#f2f5f3] mt-1">
                {co2AvoidedToday} kg CO2e
              </p>
            </div>
          </div>
        </div>

        {/* Streak Points score Card */}
        <div className="relative overflow-hidden rounded-3xl glass-card p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-cyan-600 dark:text-cyan-400 shrink-0">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xxxxs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block">
                Streak Points
              </span>
              <p className="text-lg font-bold text-[#1e3124] dark:text-[#f2f5f3] mt-1">
                {points.toLocaleString()} pts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Completion Indicator */}
      <div className="rounded-3xl glass-card p-5 border border-white/20">
        <div className="flex justify-between items-center text-xxxxs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
          <span>Overall Daily Quests</span>
          <span className="text-zinc-950 dark:text-white font-bold">
            {completedTasks.length} / {totalTasksCount} ({Math.round((completedTasks.length / totalTasksCount) * 100)}%)
          </span>
        </div>
        <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-850 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2d5a27] dark:bg-[#a3b899] rounded-full transition-all duration-500"
            style={{ width: `${(completedTasks.length / totalTasksCount) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. Interactive Task Matrix Tabs */}
      <div className="flex gap-2 border-b border-[#1e3124]/10 dark:border-white/10 pb-2">
        {(["Low", "Medium", "High"] as const).map((group) => {
          const isActive = activeTab === group;
          return (
            <button
              key={group}
              onClick={() => setActiveTab(group)}
              className={`rounded-full px-5 py-2 text-xxxxs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer border ${
                isActive
                  ? "bg-[#2d5a27] text-white border-[#2d5a27] dark:bg-white dark:text-[#1e3124]"
                  : "bg-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border-transparent"
              }`}
            >
              {group} Impact
            </button>
          );
        })}
      </div>

      {/* 4. Smooth Empty State vs Task List matrix */}
      {isAllCleared ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-3xl glass-card border border-white/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full glass-button mb-6 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-xs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase font-sans">
            All Quests Cleared!
          </h2>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 max-w-sm mt-3 mb-6 leading-relaxed font-bold">
            Come back tomorrow to keep your streak alive. You have completely offset today&apos;s standard carbon footprint ceiling.
          </p>
          <button
            onClick={handleResetQuests}
            className="rounded-full glass-button px-5 py-2.5 text-xxxxs font-bold tracking-[0.2em] uppercase text-zinc-700 dark:text-zinc-350 cursor-pointer"
          >
            Reset for Demo
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xxxxs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-[0.25em]">
              {activeTab} Impact Activities
            </h3>
            {isTabAllCleared && (
              <span className="text-xxxxs font-bold text-emerald-600 dark:text-emerald-450 flex items-center gap-1.5 uppercase tracking-wider">
                <Check className="h-3.5 w-3.5" /> All Tab Quests Done
              </span>
            )}
          </div>

          <div className="grid gap-4">
            {activeTabTasks.map((task) => (
              /* 3. Gamified Toggle Mechanics */
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`group flex items-center justify-between rounded-3xl border p-5 transition-all duration-300 cursor-pointer select-none ${
                  task.completed
                    ? "border-emerald-500/20 bg-emerald-500/[0.01] opacity-60 dark:opacity-40"
                    : "glass-card border border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Custom Checkbox */}
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                      task.completed
                        ? "border-[#2d5a27] bg-[#2d5a27] text-white dark:border-[#a3b899] dark:bg-[#a3b899] dark:text-[#1e3124]"
                        : "border-zinc-300 bg-transparent group-hover:border-[#2d5a27] dark:border-zinc-800 dark:group-hover:border-[#a3b899]"
                    }`}
                  >
                    {task.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wide transition-all ${
                        task.completed
                          ? "text-zinc-455 line-through dark:text-zinc-600"
                          : "text-zinc-850 dark:text-zinc-200 group-hover:text-[#2d5a27] dark:group-hover:text-white"
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p
                      className={`mt-1 text-xxxxs tracking-wider uppercase leading-relaxed ${
                        task.completed
                          ? "text-zinc-400/70 dark:text-zinc-655"
                          : "text-zinc-550 dark:text-zinc-450"
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-4 border-l border-zinc-900/5 dark:border-zinc-100/5">
                  <div className="text-right">
                    <span className="text-xxxxs text-zinc-400 dark:text-zinc-500 block font-bold uppercase tracking-wider">Offsets</span>
                    <span
                      className={`text-xs font-bold tracking-wider ${
                        task.completed
                          ? "text-zinc-400 dark:text-zinc-600"
                          : "text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      -{task.co2Saved} kg
                    </span>
                  </div>
                  <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass-button text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick info tip */}
      <div className="flex items-start gap-3 rounded-3xl bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-900/5 dark:border-zinc-100/5 p-4">
        <Info className="h-4 w-4 text-[#2d5a27] dark:text-[#a3b899] shrink-0 mt-0.5" />
        <p className="text-xxxxs tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-relaxed font-bold">
          Streak Multiplier rewards are applied automatically to offset stats. Complete at least one quest per 24-hour cycle to avoid streak reset.
        </p>
      </div>
    </div>
  );
}
