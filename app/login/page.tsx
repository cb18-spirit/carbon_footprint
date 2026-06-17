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
      {/* Immersive Video Background Gateway */}
      <div className="absolute inset-0 h-full w-full z-0 bg-stone-100 dark:bg-[#0c140f]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/nature_fallback.png"
          className="absolute inset-0 h-full w-full object-cover opacity-60 dark:opacity-30 transition-opacity duration-700"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Login Card Panel */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel p-8 md:p-10 shadow-2xl flex flex-col gap-6 border border-white/20">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full glass-button text-[#2d5a27] dark:text-[#a3b899] mb-4 shadow-sm">
              <Leaf className="h-5.5 w-5.5" />
            </div>
            <h2 className="text-2xl font-bold text-[#1e3124] dark:text-[#f2f5f3]">
              Partner Sign In
            </h2>
            <p className="text-xxxxs font-bold tracking-[0.2em] uppercase text-[#3a503e] dark:text-[#c4d1c2] mt-1">
              Access your ecological metrics portal
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/5 border border-red-500/20 p-3 text-center text-xxxxs font-bold tracking-wider uppercase text-red-650 dark:text-red-400 rounded-2xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2 flex flex-col">
              <label className="text-xxxxs font-bold tracking-[0.2em] uppercase text-[#3a503e] dark:text-[#c4d1c2]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="email"
                  placeholder="name@organization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent py-3 pl-11 pr-4 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2d5a27] dark:focus:border-white text-[#1e3124] dark:text-zinc-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 flex flex-col">
              <label className="text-xxxxs font-bold tracking-[0.2em] uppercase text-[#3a503e] dark:text-[#c4d1c2]">
                Account Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent py-3 pl-11 pr-4 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2d5a27] dark:focus:border-white text-[#1e3124] dark:text-zinc-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1e3124] hover:bg-[#2d5a27] dark:bg-[#f2f5f3] dark:hover:bg-[#d6ded9] text-white dark:text-[#1e3124] py-3.5 text-xxxxs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Validating Account..." : "Authenticate Access"}
            </button>
          </form>

          {/* Footer Back link */}
          <div className="flex justify-center border-t border-zinc-900/5 dark:border-white/5 pt-6 mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xxxxs font-bold tracking-[0.25em] uppercase text-zinc-505 hover:text-[#2d5a27] dark:text-zinc-400 dark:hover:text-white transition-colors"
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
