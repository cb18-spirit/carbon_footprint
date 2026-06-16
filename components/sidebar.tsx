"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  MessageSquare,
  LineChart,
  Menu,
  X,
  Leaf,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Quest Tracker", href: "/tracker", icon: ClipboardList },
  { name: "Education", href: "/education", icon: BookOpen },
  { name: "Social Feed", href: "/feed", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: LineChart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-emerald-950/10 bg-white/80 px-6 backdrop-blur-md dark:border-emerald-500/10 dark:bg-zinc-950/80 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            TerraCarbon
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-emerald-950/10 bg-white px-6 py-6 transition-transform duration-350 ease-in-out dark:border-emerald-500/10 dark:bg-zinc-950 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-0 -left-64"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              TerraCarbon
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-400"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold shadow-md dark:bg-emerald-500">
              U
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Eco Warrior
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                Level 12 • Active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-emerald-950/10 bg-white px-6 py-8 dark:border-emerald-500/10 dark:bg-zinc-950 lg:flex lg:flex-col">
        <div className="flex items-center gap-2 px-2">
          <Leaf className="h-7 w-7 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            TerraCarbon
          </span>
        </div>

        <nav className="mt-10 flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-400"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-50"
                }`}
              >
                {/* Active left indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-emerald-600 dark:bg-emerald-400" />
                )}
                <Icon
                  className={`h-5 w-5 transition-transform group-hover:scale-105 ${
                    isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 pt-5 dark:border-zinc-900">
          <div className="flex items-center gap-3.5 rounded-xl p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors duration-200 cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold shadow-sm dark:bg-emerald-500">
              EW
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-zinc-800 dark:text-zinc-200">
                Eco Warrior
              </p>
              <p className="text-xs truncate text-zinc-500 dark:text-zinc-500">
                Level 12 • Active
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
