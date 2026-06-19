"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Plus,
  Check,
  Search,
  Bell,
  TrendingDown,
  X,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: "Energy" | "Transit" | "Food" | "Zero-Waste";
  readTime: string;
  co2Saved: number; // in kg CO2e
  pointsValue: number;
}

const articlesData: Article[] = [
  {
    id: "a1",
    title: "Vampire Power: Exposing the Standby Electricity Drain",
    excerpt: "Standby appliances quietly consume up to 10% of standard home electricity. Unplugging them creates immediate carbon offsets.",
    category: "Energy",
    readTime: "4 min read",
    co2Saved: 0.8,
    pointsValue: 60,
  },
  {
    id: "a2",
    title: "Commuting Clean: Active Transit vs. Petrol Fuel",
    excerpt: "Swapping solo vehicle transit for cycling or public buses prevents massive greenhouse gases per kilometer commuted.",
    category: "Transit",
    readTime: "7 min read",
    co2Saved: 2.8,
    pointsValue: 220,
  },
  {
    id: "a3",
    title: "Plant-Based Dietary Adjustments for Climate Action",
    excerpt: "Oxford research notes shifting dietary habits away from heavy meat cuts presents the single highest agricultural offset action.",
    category: "Food",
    readTime: "6 min read",
    co2Saved: 1.4,
    pointsValue: 110,
  },
  {
    id: "a4",
    title: "The Plastic Loophole: Moving to Zero-Waste Shopping",
    excerpt: "Plastics production is highly energy intensive. Utilizing reusable canvas alternatives cuts petrochemical packaging demand.",
    category: "Zero-Waste",
    readTime: "5 min read",
    co2Saved: 0.5,
    pointsValue: 40,
  },
  {
    id: "a5",
    title: "Thermostats and Climate Comfort Mitigation",
    excerpt: "Lowering household winter heat or raising summer AC by just 2 degrees creates massive thermal grid electricity savings.",
    category: "Energy",
    readTime: "5 min read",
    co2Saved: 2.2,
    pointsValue: 180,
  },
  {
    id: "a6",
    title: "Zero-Emission Carpooling: Collaborative Commutes",
    excerpt: "Sharing commutes split vehicle emissions mathematically. A shared ride keeps high quantities of tailpipe emissions out of air.",
    category: "Transit",
    readTime: "5 min read",
    co2Saved: 2.0,
    pointsValue: 150,
  },
];

interface Toast {
  id: string;
  message: string;
  co2Saved: number;
  title: string;
  impactGroup: "Low" | "Medium" | "High";
}

export default function EducationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [addedArticles, setAddedArticles] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (!active) return;
      setIsMounted(true);
      // Determine which quests are already in tracker tasks
      const savedTasks = localStorage.getItem("terra_carbon_tasks");
      if (savedTasks) {
        try {
          const tasks = JSON.parse(savedTasks);
          // Map ids to identify which have been added from library
          const addedIds: string[] = [];
          tasks.forEach((t: { id: string }) => {
            if (t.id.startsWith("edu-task-")) {
              addedIds.push(t.id.replace("edu-task-", ""));
            }
          });
          setAddedArticles(addedIds);
        } catch (e) {
          console.error(e);
        }
      }
    }, 0);
    return () => {
      active = false;
    };
  }, []);

  const handleAddQuest = (article: Article) => {
    if (addedArticles.includes(article.id)) return;

    // Fetch existing tasks
    let existingTasks = [];
    const savedTasks = localStorage.getItem("terra_carbon_tasks");
    if (savedTasks) {
      try {
        existingTasks = JSON.parse(savedTasks);
      } catch (e) {
        console.error(e);
      }
    }

    // Map to tracker schema
    const newQuest = {
      id: `edu-task-${article.id}`,
      title: article.title.split(":")[0], // Short title
      description: `Action from educational library: ${article.excerpt.substring(0, 60)}...`,
      co2Saved: article.co2Saved,
      pointsValue: article.pointsValue,
      impactGroup: article.co2Saved > 2.0 ? "High" : article.co2Saved > 0.8 ? "Medium" : "Low",
      category: article.category === "Zero-Waste" ? "Waste" : article.category === "Food" ? "Diet" : article.category === "Energy" ? "Energy" : "Transit",
      completed: false,
    };

    // Append and save
    const updatedTasks = [...existingTasks, newQuest];
    localStorage.setItem("terra_carbon_tasks", JSON.stringify(updatedTasks));

    // Update local state
    setAddedArticles([...addedArticles, article.id]);

    // Dispatch custom storage event to update points instantly in the top nav
    window.dispatchEvent(new Event("storage"));

    // Trigger toast notification
    toastIdRef.current += 1;
    const impactGroup = article.co2Saved > 2.0 ? "High" : article.co2Saved > 0.8 ? "Medium" : "Low";
    const newToast: Toast = {
      id: `toast-${toastIdRef.current}`,
      title: article.title.split(":")[0],
      message: "Quest added to Daily Tracker!",
      co2Saved: article.co2Saved,
      impactGroup: impactGroup,
    };
    setToasts([...toasts, newToast]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter logic
  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isMounted) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="h-10 w-10 rounded-full border border-dashed border-[#2D6A4F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-5xl mx-auto relative min-h-screen pb-24">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[#2D6A4F]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
            Green Knowledge Hub
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-[#A0AEC0] mt-1 font-bold">
            Expand your climate literacy and bridge learning into actionable daily quests.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#2D6A4F] dark:text-[#52B788]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent py-2.5 pl-11 pr-4 text-xxs font-bold uppercase tracking-wider outline-none transition-all focus:border-[#2D6A4F] dark:text-zinc-100 dark:focus:border-white"
          />
        </div>
      </div>

      {/* 1. Category Quick-Filters */}
      <div className="flex flex-wrap gap-2 pb-2">
        {["All", "Energy", "Transit", "Food", "Zero-Waste"].map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xxxxs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer border ${
                isActive
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F] dark:bg-white dark:text-[#2D6A4F]"
                  : "bg-transparent text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white border-transparent transition-all duration-300"
              }`}
            >
              {cat === "Zero-Waste" ? "Zero Waste" : cat}
            </button>
          );
        })}
      </div>

      {/* 2. Rich Media Article Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => {
            const isAdded = addedArticles.includes(article.id);
            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-3xl glass-card p-6"
              >
                <div>
                  {/* Category and Read time row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-[#2D6A4F]/5 border border-[#2D6A4F]/25 px-3 py-1 text-xxxxs font-bold uppercase tracking-wider text-[#2D6A4F] dark:text-[#52B788]">
                      {article.category === "Zero-Waste" ? "Zero Waste" : article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xxxxs font-bold uppercase tracking-wider text-zinc-400">
                      <Clock className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <h3 className="text-sm font-bold uppercase tracking-[0.05em] text-[#2D6A4F] group-hover:text-[#1B4332] dark:text-zinc-100 dark:group-hover:text-white transition-colors duration-200 line-clamp-2 font-sans">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xxxxs tracking-wider uppercase leading-relaxed text-zinc-500 dark:text-zinc-450 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Card Footer: Impact and Action Bridge */}
                <div className="mt-6 border-t border-[#2D6A4F]/5 dark:border-white/5 pt-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-xxxxs font-bold uppercase tracking-widest text-zinc-450">
                      <TrendingDown className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                      CO2 Impact
                    </div>
                    <span className="text-xs font-bold tracking-wider text-[#2D6A4F] dark:text-[#52B788]">
                      -{article.co2Saved} kg/day
                    </span>
                  </div>

                  {/* 3. Action Bridge Feature */}
                  {isAdded ? (
                    <div className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 py-3 text-center text-xxxxs font-bold tracking-[0.15em] uppercase text-[#2D6A4F] dark:text-[#52B788] select-none">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      Quest Added!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddQuest(article)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white dark:bg-[#52B788] dark:hover:bg-[#40916C] dark:text-[#0A0F0D] py-3 text-center text-xxxxs font-bold tracking-[0.2em] uppercase cursor-pointer transition-all duration-300"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Quest
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl glass-card">
          <BookOpen className="h-10 w-10 text-zinc-450 mb-2" />
          <p className="text-xxxxs tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            No resources match your current selection.
          </p>
        </div>
      )}

      {/* 5. State Confirmation Toast Notifications System */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm px-4 md:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-start justify-between gap-3 rounded-3xl glass-panel p-4 shadow-xl animate-slide-up"
          >
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 flex items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] shrink-0">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xxxxs font-bold uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-50">
                  {toast.message}
                </h4>
                <p className="text-xxxxs tracking-wider uppercase text-zinc-455 dark:text-zinc-500 mt-1 leading-normal">
                  Task *{toast.title}* is now active. Saves -{toast.co2Saved} kg daily.
                </p>
                <div className="mt-3">
                  <Link
                    href={`/tracker?tab=${toast.impactGroup}`}
                    className="inline-flex items-center gap-1 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-150 px-4 py-2 text-xxxxs font-bold tracking-[0.15em] uppercase transition-all shadow-sm"
                  >
                    View in Tracker
                  </Link>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-650 rounded-full p-1.5 dark:hover:bg-zinc-900 glass-button h-6 w-6 flex items-center justify-center shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
