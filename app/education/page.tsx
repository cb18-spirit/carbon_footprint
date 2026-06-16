"use client";

import React, { useState } from "react";
import { BookOpen, Clock, Heart, ArrowUpRight, Search } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: "Energy" | "Diet" | "Mobility" | "Circular";
  readTime: string;
  likes: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const articlesData: Article[] = [
  {
    id: "a1",
    title: "The Silent Drain: Standby Power & How to Stop It",
    excerpt: "Discover the energy-consuming habits of 'vampire appliances' and simple steps to slash your electric bill.",
    category: "Energy",
    readTime: "4 min read",
    likes: 124,
    level: "Beginner",
  },
  {
    id: "a2",
    title: "Understanding CO2e: The Carbon Equivalence Formula",
    excerpt: "A deep dive into how greenhouse gases are converted into Carbon Dioxide Equivalent for standard reporting.",
    category: "Circular",
    readTime: "8 min read",
    likes: 87,
    level: "Advanced",
  },
  {
    id: "a3",
    title: "Decarbonizing Your Diet: Vegan vs. Vegetarian vs. Local",
    excerpt: "Which eating habit has the lowest carbon lifecycle assessment? We compare diet changes backed by Oxford research.",
    category: "Diet",
    readTime: "6 min read",
    likes: 245,
    level: "Intermediate",
  },
  {
    id: "a4",
    title: "Electric Vehicles: Myths vs. Reality of Lifespan Emissions",
    excerpt: "Breaking down manufacturing footprints and battery recycling to understand the true lifecycle of EVs.",
    category: "Mobility",
    readTime: "7 min read",
    likes: 198,
    level: "Intermediate",
  },
  {
    id: "a5",
    title: "Home Heat Pumps: The Ultimate Green Energy Swap",
    excerpt: "How swapping out natural gas furnaces for electric heat pumps reduces carbon and long-term heating expenses.",
    category: "Energy",
    readTime: "5 min read",
    likes: 156,
    level: "Beginner",
  },
  {
    id: "a6",
    title: "Zero Waste and the Carbon Value of Plastics",
    excerpt: "Why recycling alone cannot solve the carbon crisis, and how a circular economy design alters resource footprints.",
    category: "Circular",
    readTime: "5 min read",
    likes: 112,
    level: "Beginner",
  },
];

const categoryLabels = {
  All: "All Topics",
  Energy: "Energy Efficiency",
  Diet: "Diet & Agriculture",
  Mobility: "Green Mobility",
  Circular: "Circular Economy",
};

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articlesData.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Green Library
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Expand your ecological literacy with guides on carbon mitigation.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-100 pb-4 dark:border-zinc-900">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === key
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-950 dark:bg-zinc-950"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xxs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {article.category}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-xxs font-semibold ${
                      article.level === "Beginner"
                        ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                        : article.level === "Intermediate"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                        : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                    }`}
                  >
                    {article.level}
                  </span>
                </div>

                {/* Title and Excerpt */}
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Bottom footer bar */}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-50 pt-4 dark:border-zinc-900/60">
                <div className="flex items-center gap-4 text-xxs font-medium text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
                    <Heart className="h-3.5 w-3.5" />
                    {article.likes}
                  </span>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 group-hover:bg-emerald-50 text-zinc-600 group-hover:text-emerald-600 dark:bg-zinc-900 dark:group-hover:bg-emerald-950/45 dark:text-zinc-400 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="h-10 w-10 text-zinc-300 mb-2" />
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            No articles found matching search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
