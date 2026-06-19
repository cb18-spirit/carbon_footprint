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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-white/90 dark:bg-[#0A0F0D]/90 backdrop-blur-md border-b border-[#2D6A4F]/5 dark:border-[#52B788]/5 transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">
        
        {/* Left: Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="h-4.5 w-4.5 text-[#2D6A4F] dark:text-[#52B788] group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xxs font-black tracking-[0.25em] text-[#2D6A4F] dark:text-[#E2E8F0] uppercase transition-opacity group-hover:opacity-85 font-sans">
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
                className={`text-xxxxs font-bold tracking-[0.25em] uppercase transition-all px-3.5 py-2 rounded-full font-sans ${
                  isActive
                    ? "bg-[#2D6A4F] text-white dark:bg-[#52B788] dark:text-[#0A0F0D] shadow-sm"
                    : "text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
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
            className="hidden sm:flex items-center gap-2 rounded-full px-4 py-1.5 text-xxxxs font-bold tracking-[0.15em] uppercase glass-button text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D] font-sans transition-all duration-300"
          >
            <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse fill-orange-500/10" />
            <span>{streak} Days</span>
            <span className="opacity-30">|</span>
            <span>{points} Pts</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-[#2D6A4F] hover:bg-[#2D6A4F]/10 dark:text-[#52B788] dark:hover:bg-[#52B788]/10 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 w-full bg-white dark:bg-[#0A0F0D] border-b border-[#2D6A4F]/10 dark:border-[#52B788]/10 py-4 px-6 flex flex-col gap-3 md:hidden shadow-lg font-sans">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xxxxs font-bold tracking-[0.2em] uppercase py-2.5 px-4 rounded-full transition-all ${
                  isActive
                    ? "bg-[#2D6A4F] text-white dark:bg-[#52B788] dark:text-[#0A0F0D]"
                    : "text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full py-2.5 text-xxxxs font-bold tracking-[0.15em] uppercase glass-button text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D] mt-2 transition-all duration-300"
          >
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span>{streak} Days • {points} Points</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
