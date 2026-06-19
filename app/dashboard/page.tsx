"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Leaf,
  Flame,
  ShieldAlert,
  Award,
  Zap,
  Car,
  Utensils,
  Home,
  Smartphone,
  Trees,
  Settings,
  ArrowRight,
  ArrowLeft,
  X,
  HelpCircle,
} from "lucide-react";

// 1. Data Interfaces & Constants
export interface BaselineData {
  commuteKm: number;
  commuteMode: string; // Petrol Car, Public Transit, EV
  dietStyle: string; // Heavy Meat, Balanced, Vegetarian, Vegan
  housingType: string; // Apartment, Townhouse, Detached House
  energyKw: number;
}

// Environmental emission factors (kg CO2e)
const EMISSION_FACTORS = {
  transit: {
    "Petrol Car": 0.17,
    "Public Transit": 0.06,
    EV: 0.04,
  } as Record<string, number>,
  diet: {
    "Heavy Meat": 3.3,
    Balanced: 2.2,
    Vegetarian: 1.5,
    Vegan: 1.1,
  } as Record<string, number>,
  housing: {
    Apartment: 0.5,
    Townhouse: 1.2,
    "Detached House": 2.2,
  } as Record<string, number>,
  powerGrid: 0.8, // kg CO2e per kWh
};

const DAILY_BUDGET_CAP = 15; // kg CO2e per day

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [profile, setProfile] = useState<BaselineData | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Onboarding wizard step states
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [formCommuteKm, setFormCommuteKm] = useState(25);
  const [formCommuteMode, setFormCommuteMode] = useState("Petrol Car");
  const [formDietStyle, setFormDietStyle] = useState("Balanced");
  const [formHousingType, setFormHousingType] = useState("Apartment");
  const [formEnergyKw, setFormEnergyKw] = useState(10);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (!active) return;
      setIsMounted(true);
      const savedProfile = localStorage.getItem("terra_carbon_profile");
      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error("Failed to parse saved profile", e);
          setShowOnboarding(true);
        }
      } else {
        setShowOnboarding(true);
      }
    }, 0);
    return () => {
      active = false;
    };
  }, []);

  const handleSaveProfile = () => {
    const data: BaselineData = {
      commuteKm: formCommuteKm,
      commuteMode: formCommuteMode,
      dietStyle: formDietStyle,
      housingType: formHousingType,
      energyKw: formEnergyKw,
    };
    localStorage.setItem("terra_carbon_profile", JSON.stringify(data));
    setProfile(data);
    setShowOnboarding(false);
    
    // Dispatch storage event to update stats in header
    window.dispatchEvent(new Event("storage"));
  };

  const handleOpenOnboarding = () => {
    if (profile) {
      setFormCommuteKm(profile.commuteKm);
      setFormCommuteMode(profile.commuteMode);
      setFormDietStyle(profile.dietStyle);
      setFormHousingType(profile.housingType);
      setFormEnergyKw(profile.energyKw);
    }
    setOnboardingStep(1);
    setShowOnboarding(true);
  };

  // Calculations
  const calculateMetrics = () => {
    if (!profile) return { transport: 0, diet: 0, housing: 0, energy: 0, total: 0, remaining: 15, isOver: false };

    const transport = profile.commuteKm * (EMISSION_FACTORS.transit[profile.commuteMode] || 0);
    const diet = EMISSION_FACTORS.diet[profile.dietStyle] || 0;
    const housing = EMISSION_FACTORS.housing[profile.housingType] || 0;
    const energy = profile.energyKw * EMISSION_FACTORS.powerGrid;
    const total = Number((transport + diet + housing + energy).toFixed(2));
    const remaining = Number((DAILY_BUDGET_CAP - total).toFixed(2));
    const isOver = total > DAILY_BUDGET_CAP;

    return { transport, diet, housing, energy, total, remaining, isOver };
  };

  const metrics = calculateMetrics();

  // Recharts Chart Data
  const getChartData = () => {
    const data = [
      { name: "Transit", value: metrics.transport, color: "#2D6A4F" }, // Primary Forest Green
      { name: "Diet", value: metrics.diet, color: "#52B788" },         // Brighter Green
      { name: "Housing", value: metrics.housing, color: "#74C69D" },      // Sage Green
      { name: "Energy", value: metrics.energy, color: "#95D5B2" },       // Mint Green
    ].filter(item => item.value > 0);

    if (metrics.remaining > 0) {
      data.push({ name: "Remaining Budget", value: metrics.remaining, color: "rgba(45, 106, 79, 0.08)" });
    }

    return data;
  };

  const chartData = getChartData();

  // Translations
  const smartphoneCharges = Math.round(metrics.total / 0.0083);
  const treeAbsorptionDays = Number((metrics.total / 0.06).toFixed(1));

  // Loading Skeleton / SSR protection
  if (!isMounted) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="h-10 w-10 rounded-full border border-dashed border-[#2D6A4F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
      {/* 2. Top Header & Setup status */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[#2D6A4F]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
            Eco Footprint Dashboard
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-[#A0AEC0] mt-1 font-bold">
            Analyze your daily greenhouse emissions and check translation metrics.
          </p>
        </div>
        <button
          onClick={handleOpenOnboarding}
          className="flex items-center justify-center gap-2 rounded-full glass-button px-5 py-3 text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:text-[#0A0F0D] hover:bg-[#2D6A4F] dark:hover:bg-[#52B788] transition-all duration-300"
        >
          <Settings className="h-3.5 w-3.5" />
          Update Base Profile
        </button>
      </div>

      {/* Main layout once profile exists */}
      {profile ? (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left section: Donut Chart and current stats */}
          <div className="flex flex-col rounded-3xl glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase font-sans">
                  Daily Emission Status
                </h2>
                <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-[#A0AEC0] mt-1 font-bold">
                  Breakdown of carbon generated relative to your daily target of {DAILY_BUDGET_CAP} kg.
                </p>
              </div>
              {metrics.isOver ? (
                <span className="rounded-full bg-red-500/5 border border-red-500/20 px-4 py-2 text-xxxxs font-bold tracking-wider uppercase text-red-650 dark:text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Budget Overrun
                </span>
              ) : (
                <span className="rounded-full bg-[#2D6A4F]/5 border border-[#2D6A4F]/25 px-4 py-2 text-xxxxs font-bold tracking-wider uppercase text-[#2D6A4F] dark:text-[#52B788] flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  Eco Fit
                </span>
              )}
            </div>

            {/* 3. Interactive Recharts Ring */}
            <div className="flex flex-1 flex-col items-center justify-center min-h-[300px] relative mt-6">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={105}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === "Remaining Budget" && metrics.isOver ? "#ef4444" : entry.color}
                        className="transition-all duration-300 outline-none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid rgba(45, 106, 79, 0.15)",
                      color: "#2D6A4F",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      borderRadius: "1rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Absolute Ring Text */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold tracking-tight text-[#2D6A4F] dark:text-[#52B788]">
                  {metrics.total}
                </span>
                <span className="text-xxxxs uppercase tracking-[0.2em] text-zinc-450 dark:text-[#A0AEC0] font-bold mt-1">
                  kg CO2e / Day
                </span>
                <span
                  className={`text-xxxxs font-bold uppercase tracking-wider mt-2.5 rounded-full border px-3 py-1.5 ${
                    metrics.isOver
                      ? "bg-red-500/5 border-red-500/25 text-red-650 dark:text-red-400"
                      : "bg-[#2D6A4F]/5 border-[#2D6A4F]/25 text-[#2D6A4F] dark:text-[#52B788]"
                  }`}
                >
                  {metrics.isOver
                    ? `${Math.abs(metrics.remaining)} kg Over`
                    : `${metrics.remaining} kg Left`}
                </span>
              </div>
            </div>

            {/* Legend list details */}
            <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 border-t border-[#2D6A4F]/10 dark:border-white/10 pt-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
                  <span className="text-xxxxs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Transit</span>
                </div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {metrics.transport.toFixed(1)} kg
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#52B788]" />
                  <span className="text-xxxxs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Diet</span>
                </div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {metrics.diet.toFixed(1)} kg
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#74C69D]" />
                  <span className="text-xxxxs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Housing</span>
                </div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {metrics.housing.toFixed(1)} kg
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#95D5B2]" />
                  <span className="text-xxxxs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Energy</span>
                </div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {metrics.energy.toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>

          {/* Right section: Detailed parameters */}
          <div className="space-y-6 flex flex-col justify-between rounded-3xl glass-card p-6">
            <div>
              <h2 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase mb-1 font-sans">
                Profile Parameters
              </h2>
              <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-[#A0AEC0] mb-6 font-bold">
                Active variables contributing to your daily baseline footprints.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 border-b border-[#2D6A4F]/5 dark:border-white/5 pb-4">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300 shrink-0">
                    <Car className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xxxxs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Transit Commute</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{profile.commuteKm} km via {profile.commuteMode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-b border-[#2D6A4F]/5 dark:border-white/5 pb-4">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300 shrink-0">
                    <Utensils className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xxxxs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Dietary Intake</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{profile.dietStyle} Style</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-b border-[#2D6A4F]/5 dark:border-white/5 pb-4">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300 shrink-0">
                    <Home className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xxxxs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Residential Structure</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{profile.housingType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pb-2">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300 shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xxxxs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Daily Electricity</p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{profile.energyKw} kWh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#2D6A4F]/5 dark:border-white/5 pt-5 mt-6">
              <div className="rounded-2xl bg-[#2D6A4F]/5 p-4 border border-[#2D6A4F]/10">
                <h4 className="text-xxxxs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase mb-1.5 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                  Allowance Health
                </h4>
                <p className="text-xxs text-[#2D3748] dark:text-[#C4D1C2] leading-relaxed font-medium">
                  {metrics.isOver
                    ? "Your baseline footprint exceeds the 15 kg threshold. Look into quest challenges to offset transit carbon."
                    : "Excellent! You are safely below the allowance target. Maintaining this secures bonus multipliers."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl glass-card p-8">
          <Leaf className="h-10 w-10 text-[#2D6A4F] dark:text-[#52B788] animate-pulse mb-4" />
          <h2 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase font-sans">No Profile Configured</h2>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-[#A0AEC0] max-w-sm mt-1 mb-6">
            Please configure your environmental metrics parameters to unlock daily dashboard tracking stats.
          </p>
          <button
            onClick={handleOpenOnboarding}
            className="rounded-full glass-button px-6 py-3.5 text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:text-[#0A0F0D] hover:bg-[#2D6A4F] dark:hover:bg-[#52B788] transition-all duration-300"
          >
            Create Baseline Profile
          </button>
        </div>
      )}

      {/* 4. Concrete Translation Cards */}
      {profile && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase font-sans">
            Tangible Carbon Equivalents
          </h3>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-zinc-500 font-bold">
            Understand your daily carbon impact converted into tangible physical actions.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Phone charges card */}
            <div className="flex items-center gap-5 rounded-3xl glass-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xxxxs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                  Smartphone Charging footprint
                </h4>
                <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                  {smartphoneCharges.toLocaleString()} Charges
                </p>
                <p className="text-xxxxs tracking-wider uppercase text-zinc-400 mt-1 leading-normal">
                  Equivalent to charging an average smartphone battery. (0.0083 kg CO2e per charge)
                </p>
              </div>
            </div>

            {/* Tree absorption card */}
            <div className="flex items-center gap-5 rounded-3xl glass-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300">
                <Trees className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xxxxs font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider mb-1">
                  Forest Absorption equivalent
                </h4>
                <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                  {treeAbsorptionDays.toLocaleString()} Days
                </p>
                <p className="text-xxxxs tracking-wider uppercase text-zinc-400 mt-1 leading-normal">
                  Time needed for a mature tree to absorb this carbon volume. (0.06 kg absorbed per day)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Glassmorphic Modal Window */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-md">
          {/* Main Modal Body */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-panel p-8 shadow-2xl transition-all">
            {/* Close button if profile exists */}
            {profile && (
              <button
                onClick={() => setShowOnboarding(false)}
                className="absolute right-6 top-6 rounded-full p-2 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 glass-button h-8 w-8 flex items-center justify-center"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Wizard progress steps */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${onboardingStep >= 1 ? "bg-[#2D6A4F]" : "bg-zinc-200 dark:bg-zinc-850"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${onboardingStep >= 2 ? "bg-[#2D6A4F]" : "bg-zinc-200 dark:bg-zinc-850"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${onboardingStep >= 3 ? "bg-[#2D6A4F]" : "bg-zinc-200 dark:bg-zinc-850"}`} />
            </div>

            {/* Wizard Header */}
            <div className="mb-8">
              <h3 className="text-xs font-bold tracking-[0.2em] text-[#2D6A4F] dark:text-[#52B788] uppercase flex items-center gap-2 font-sans">
                <Leaf className="h-4 w-4 text-[#2D6A4F] dark:text-[#52B788]" />
                Configure Baseline Profile
              </h3>
              <p className="text-xxxxs tracking-wider uppercase text-[#2D6A4F] dark:text-[#A0AEC0] mt-1 font-bold">
                Step {onboardingStep} of 3: Provide your daily environmental estimates.
              </p>
            </div>

            {/* Step 1: Transit */}
            {onboardingStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2 flex flex-col">
                  <label className="text-xxxxs font-bold text-[#2D6A4F] dark:text-[#A0AEC0] uppercase tracking-wider">
                    Daily Transit Mode
                  </label>
                  <select
                    value={formCommuteMode}
                    onChange={(e) => setFormCommuteMode(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-250 bg-transparent px-4 py-3.5 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Petrol Car" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Petrol Car (0.17 kg/km)</option>
                    <option value="Public Transit" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Public Transit (0.06 kg/km)</option>
                    <option value="EV" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Electric Vehicle (0.04 kg/km)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xxxxs font-bold text-[#2D6A4F] dark:text-[#A0AEC0] uppercase tracking-wider">
                      Daily Commute Distance
                    </label>
                    <span className="text-xxs font-bold tracking-wider text-[#2D6A4F] dark:text-white">
                      {formCommuteKm} km
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formCommuteKm}
                    onChange={(e) => setFormCommuteKm(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 accent-[#2D6A4F] cursor-pointer"
                  />
                  <div className="flex justify-between text-xxxxs text-zinc-400 dark:text-zinc-500 font-bold tracking-wider uppercase">
                    <span>0 km</span>
                    <span>50 km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Diet & Housing */}
            {onboardingStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2 flex flex-col">
                  <label className="text-xxxxs font-bold text-[#2D6A4F] dark:text-[#A0AEC0] uppercase tracking-wider">
                    Dietary Profile
                  </label>
                  <select
                    value={formDietStyle}
                    onChange={(e) => setFormDietStyle(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-250 bg-transparent px-4 py-3.5 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Heavy Meat" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Heavy Meat Intake (3.3 kg/day)</option>
                    <option value="Balanced" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Balanced Diet (2.2 kg/day)</option>
                    <option value="Vegetarian" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Vegetarian Diet (1.5 kg/day)</option>
                    <option value="Vegan" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Vegan / Plant-Based (1.1 kg/day)</option>
                  </select>
                </div>

                <div className="space-y-2 flex flex-col">
                  <label className="text-xxxxs font-bold text-[#2D6A4F] dark:text-[#A0AEC0] uppercase tracking-wider">
                    Residential Structure
                  </label>
                  <select
                    value={formHousingType}
                    onChange={(e) => setFormHousingType(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-250 bg-transparent px-4 py-3.5 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Apartment" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Apartment (0.5 kg/day Base)</option>
                    <option value="Townhouse" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Townhouse (1.2 kg/day Base)</option>
                    <option value="Detached House" className="bg-[#faf8f5] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Detached House (2.2 kg/day Base)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Energy */}
            {onboardingStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2 flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xxxxs font-bold text-[#2D6A4F] dark:text-[#A0AEC0] uppercase tracking-wider">
                      Daily Energy Consumption
                    </label>
                    <span className="text-xxxxs text-zinc-400 dark:text-zinc-500 flex items-center gap-1 font-bold uppercase tracking-wider">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Grid: 0.8 kg/kWh
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formEnergyKw}
                      onChange={(e) => setFormEnergyKw(Math.max(0, Number(e.target.value)))}
                      className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 pr-16 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:border-zinc-800 dark:text-zinc-100"
                    />
                    <span className="absolute right-4 top-3.5 text-xxxxs font-bold text-[#2D6A4F] dark:text-[#A0AEC0] uppercase tracking-wider">
                      kWh
                    </span>
                  </div>
                  <p className="text-xxxxs text-zinc-405 dark:text-zinc-500 tracking-wider uppercase leading-relaxed pt-2 font-bold">
                    Estimate based on your monthly utility bills (e.g. 300 kWh/month = ~10 kWh/day).
                  </p>
                </div>
              </div>
            )}

            {/* Footer Navigation Buttons */}
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#2D6A4F]/10 dark:border-white/10 pt-6">
              {onboardingStep > 1 ? (
                <button
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className="flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-[#2D6A4F]/20 px-4 py-2.5 text-xxxxs font-bold tracking-[0.25em] uppercase text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-zinc-450 dark:hover:text-[#0A0F0D] dark:hover:bg-[#52B788] transition-all duration-300 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {onboardingStep < 3 ? (
                <button
                  onClick={() => setOnboardingStep(onboardingStep + 1)}
                  className="flex items-center gap-1.5 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white dark:bg-white dark:hover:bg-zinc-150 dark:text-zinc-950 px-5 py-2.5 text-xxxxs font-bold tracking-[0.25em] uppercase cursor-pointer transition-all duration-300"
                >
                  Next Step
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-1.5 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-6 py-2.5 text-xxxxs font-black tracking-[0.25em] uppercase transition-all cursor-pointer"
                >
                  Save Profile
                  <Leaf className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
