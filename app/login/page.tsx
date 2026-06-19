"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ArrowLeft, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all standard credentials fields.");
      return;
    }

    setIsLoading(true);
    // Simulate authentication verification checks
    setTimeout(() => {
      setIsLoading(false);
      // Success, route directly to dashboard
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden p-6">
      {/* Immersive Bright & Clean Background Canvas with Forest Pattern */}
      <div className="absolute inset-0 h-full w-full z-0 bg-[#FFFFFF] dark:bg-[#0A0F0D] flex flex-col justify-end">
        {/* Soft Background Forest Pattern / Illustration */}
        <div className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.02] pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="forestPattern" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 20 L45 55 L52 55 L40 80 L55 80 L55 95 L65 95 L65 80 L80 80 L68 55 L75 55 Z" fill="#2D6A4F" />
                <path d="M20 50 L10 75 L15 75 L5 95 L18 95 L18 105 L22 105 L22 95 L35 95 L25 75 L30 75 Z" fill="#2D6A4F" />
                <path d="M100 40 L92 60 L96 60 L88 80 L98 80 L98 90 L102 90 L102 80 L112 80 L104 60 L108 60 Z" fill="#2D6A4F" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#forestPattern)" />
          </svg>
        </div>
        {/* Soft organic shape gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#74C69D]/5 dark:bg-[#52B788]/2 rounded-full filter blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#2D6A4F]/3 dark:bg-[#52B788]/2 rounded-full filter blur-3xl pointer-events-none z-0" />
      </div>

      {/* Login Card Panel */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel p-8 md:p-10 shadow-2xl flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:text-white dark:hover:text-white hover:bg-[#2D6A4F] dark:hover:bg-[#52B788] mb-4 shadow-sm transition-all duration-300">
              <Leaf className="h-5.5 w-5.5" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
              Partner Sign In
            </h2>
            <p className="text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] dark:text-[#A0AEC0] mt-1">
              Access your ecological metrics portal
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/5 border border-red-500/20 p-3 text-center text-xxxxs font-bold tracking-wider uppercase text-red-650 dark:text-red-450 rounded-2xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2 flex flex-col">
              <label className="text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] dark:text-[#A0AEC0]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[#2D6A4F] dark:text-[#52B788]" />
                <input
                  type="email"
                  placeholder="name@organization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent py-3 pl-11 pr-4 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:focus:border-[#52B788] text-zinc-850 dark:text-zinc-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 flex flex-col">
              <label className="text-xxxxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] dark:text-[#A0AEC0]">
                Account Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#2D6A4F] dark:text-[#52B788]" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent py-3 pl-11 pr-4 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:focus:border-[#52B788] text-zinc-855 dark:text-zinc-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] dark:bg-[#52B788] dark:hover:bg-[#40916C] text-white py-3.5 text-xxxxs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Validating Account..." : "Authenticate Access"}
            </button>
          </form>

          {/* Footer Back link */}
          <div className="flex justify-center border-t border-zinc-900/5 dark:border-white/5 pt-6 mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xxxxs font-bold tracking-[0.25em] uppercase text-zinc-500 hover:text-[#2D6A4F] dark:text-zinc-400 dark:hover:text-[#52B788] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Welcome
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
