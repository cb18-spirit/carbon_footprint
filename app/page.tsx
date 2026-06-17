import Link from "next/link";
import {
  Leaf,
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  MessageSquare,
  LineChart,
  ArrowRight,
  User,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden">
      {/* 2. Immersive Video Background Gateway */}
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

      {/* Welcome & Login Overlay Card */}
      <div className="relative z-10 max-w-5xl w-full px-6 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="glass-panel p-8 md:p-12 w-full max-w-4xl shadow-2xl flex flex-col items-center gap-6 border border-white/20">
          
          {/* Brand Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full glass-button text-[#2d5a27] dark:text-[#a3b899] mb-2 shadow-sm">
            <Leaf className="h-6 w-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3124] dark:text-[#f2f5f3]">
            Stand for the Climate with{" "}
            <span className="italic text-[#2d5a27] dark:text-[#a3b899]">
              TerraCarbon
            </span>
          </h1>
          
          <p className="text-xs md:text-sm font-medium tracking-wide text-[#3a503e] dark:text-[#c4d1c2] max-w-2xl leading-relaxed uppercase">
            Understand your footprint, track daily forest-saving actions, expand your climate literacy, and align with a sustainable community.
          </p>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3124] hover:bg-[#2d5a27] dark:bg-[#f2f5f3] dark:hover:bg-[#d6ded9] text-white dark:text-[#1e3124] px-7 py-3.5 text-xxs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md"
            >
              Enter Eco Dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full glass-button px-7 py-3.5 text-xxs font-bold tracking-[0.2em] uppercase text-[#1e3124] dark:text-[#f2f5f3] shadow-sm"
            >
              <User className="h-3.5 w-3.5" />
              Partner Sign In
            </Link>
          </div>

          {/* Feature Quicklinks */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full border-t border-[#1e3124]/10 dark:border-white/10 pt-10">
            <Link
              href="/dashboard"
              className="flex flex-col items-center p-6 rounded-3xl glass-card border border-white/20"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2d5a27] dark:text-[#a3b899]">
                <LayoutDashboard className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase">Eco Dashboard</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] text-center leading-relaxed">
                Monitor weekly carbon allowance and view proportional breakdown metrics.
              </p>
            </Link>

            <Link
              href="/tracker"
              className="flex flex-col items-center p-6 rounded-3xl glass-card border border-white/20"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2d5a27] dark:text-[#a3b899]">
                <ClipboardList className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase">Quest Tracker</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] text-center leading-relaxed">
                Check off daily sustainable habits to log carbon reduction scores.
              </p>
            </Link>

            <Link
              href="/education"
              className="flex flex-col items-center p-6 rounded-3xl glass-card border border-white/20"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2d5a27] dark:text-[#a3b899]">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase">Green Library</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] text-center leading-relaxed">
                Discover research-backed articles regarding systemic carbon mitigation.
              </p>
            </Link>

            <Link
              href="/feed"
              className="flex flex-col items-center p-6 rounded-3xl glass-card border border-white/20 sm:col-span-2 lg:col-span-1 lg:col-start-1"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2d5a27] dark:text-[#a3b899]">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase">Eco Feed</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] text-center leading-relaxed">
                Celebrate eco-achievements and discuss goals with the community.
              </p>
            </Link>

            <Link
              href="/analytics"
              className="flex flex-col items-center p-6 rounded-3xl glass-card border border-white/20 sm:col-span-2 lg:col-span-2"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2d5a27] dark:text-[#a3b899]">
                <LineChart className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#1e3124] dark:text-[#f2f5f3] uppercase">Predictive Forecast</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#4a5f4e] dark:text-[#a2b5a5] text-center leading-relaxed">
                Examine predictive charts forecasting future emission lines against goals.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
