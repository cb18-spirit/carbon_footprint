"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Flame, Menu, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Quest Tracker", href: "/tracker" },
  { name: "Education", href: "/education" },
  { name: "Social Feed", href: "/feed" },
  { name: "Analytics", href: "/analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(450);

  // Load live user progress metrics from localStorage to display in the header action badge
  useEffect(() => {
    const loadStats = () => {
      const savedPoints = localStorage.getItem("terra_carbon_points");
      const savedStreak = localStorage.getItem("terra_carbon_streak");
      if (savedPoints) setPoints(Number(savedPoints));
      if (savedStreak) setStreak(Number(savedStreak));
    };

    const timer = setTimeout(loadStats, 0);

    // Handle updates across tabs/navigation updates
    const handleStorageChange = () => {
      const p = localStorage.getItem("terra_carbon_points");
      const s = localStorage.getItem("terra_carbon_streak");
      if (p) setPoints(Number(p));
      if (s) setStreak(Number(s));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname]); // Also refresh stats when pathname changes (navigation)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-[#faf8f5]/85 dark:bg-[#0f1812]/85 backdrop-blur-md border-b border-[#1e3124]/5 dark:border-white/5 transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">
        
        {/* Left: Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="h-4.5 w-4.5 text-[#2d5a27] dark:text-[#a3b899] group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xxs font-black tracking-[0.25em] text-[#1e3124] dark:text-[#f2f5f3] uppercase transition-opacity group-hover:opacity-85 font-sans">
            TerraCarbon
          </span>
        </Link>

        {/* Center: Structural Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xxxxs font-bold tracking-[0.2em] uppercase transition-all px-3 py-1.5 rounded-full font-sans ${
                  isActive
                    ? "bg-[#2d5a27]/10 text-[#2d5a27] dark:bg-[#a3b899]/15 dark:text-[#a3b899]"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Minimalist Action Button/Badge & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/tracker"
            className="hidden sm:flex items-center gap-2 rounded-full px-4 py-1.5 text-xxxxs font-bold tracking-[0.15em] uppercase glass-button text-zinc-800 dark:text-zinc-200 font-sans"
          >
            <Flame className="h-3.5 w-3.5 text-orange-650 animate-pulse fill-orange-500/10" />
            <span>{streak} Days</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>{points} Pts</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 w-full bg-[#faf8f5] dark:bg-[#0f1812] border-b border-[#1e3124]/5 dark:border-white/5 py-4 px-6 flex flex-col gap-3 md:hidden shadow-lg font-sans">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xxxxs font-bold tracking-[0.2em] uppercase py-2.5 px-4 rounded-full transition-all ${
                  isActive
                    ? "bg-[#2d5a27]/10 text-[#2d5a27] dark:bg-[#a3b899]/15 dark:text-[#a3b899]"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full py-2.5 text-xxxxs font-bold tracking-[0.15em] uppercase glass-button text-zinc-800 dark:text-zinc-200 mt-2"
          >
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span>{streak} Days • {points} Points</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
