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
      {/* Immersive Bright & Clean Background Canvas with Forest Pattern */}
      <div className="absolute inset-0 h-full w-full z-0 bg-[#FFFFFF] dark:bg-[#0A0F0D] flex flex-col justify-end">
        {/* Soft Background Forest Pattern / Illustration */}
        <div className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.02] pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="forestPattern" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Minimalist tree outlines */}
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

      {/* Welcome & Login Overlay Card */}
      <div className="relative z-10 max-w-5xl w-full px-6 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="glass-panel p-8 md:p-12 w-full max-w-4xl shadow-2xl flex flex-col items-center gap-6">
          
          {/* Brand Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full glass-button text-[#2D6A4F] dark:text-[#52B788] hover:text-white dark:hover:text-white hover:bg-[#2D6A4F] dark:hover:bg-[#52B788] mb-2 shadow-sm transition-all duration-300">
            <Leaf className="h-6 w-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
            Stand for the Climate with{" "}
            <span className="italic text-[#2D6A4F] dark:text-[#52B788]">
              TerraCarbon
            </span>
          </h1>
          
          <p className="text-xs md:text-sm font-medium tracking-wide text-[#374151] dark:text-[#C4D1C2] max-w-2xl leading-relaxed uppercase">
            Understand your footprint, track daily forest-saving actions, expand your climate literacy, and align with a sustainable community.
          </p>
 
          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] dark:bg-[#52B788] dark:hover:bg-[#40916C] text-white px-7 py-3.5 text-xxs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md"
            >
              Enter Eco Dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full glass-button px-7 py-3.5 text-xxs font-bold tracking-[0.2em] uppercase text-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:text-white hover:bg-[#2D6A4F] dark:hover:bg-[#52B788] transition-all duration-300 shadow-sm"
            >
              <User className="h-3.5 w-3.5" />
              Partner Sign In
            </Link>
          </div>
 
          {/* Feature Quicklinks */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full border-t border-[#2D6A4F]/10 dark:border-white/10 pt-10">
            <Link
              href="/dashboard"
              className="flex flex-col items-center p-6 rounded-3xl glass-card"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2D6A4F] dark:text-[#52B788] hover:text-white hover:bg-[#2D6A4F] transition-all duration-350">
                <LayoutDashboard className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase">Eco Dashboard</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#2D3748] dark:text-[#A0AEC0] text-center leading-relaxed">
                Monitor weekly carbon allowance and view proportional breakdown metrics.
              </p>
            </Link>
 
            <Link
              href="/tracker"
              className="flex flex-col items-center p-6 rounded-3xl glass-card"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2D6A4F] dark:text-[#52B788] hover:text-white hover:bg-[#2D6A4F] transition-all duration-350">
                <ClipboardList className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase">Quest Tracker</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#2D3748] dark:text-[#A0AEC0] text-center leading-relaxed">
                Check off daily sustainable habits to log carbon reduction scores.
              </p>
            </Link>
 
            <Link
              href="/education"
              className="flex flex-col items-center p-6 rounded-3xl glass-card"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2D6A4F] dark:text-[#52B788] hover:text-white hover:bg-[#2D6A4F] transition-all duration-350">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase">Green Library</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#2D3748] dark:text-[#A0AEC0] text-center leading-relaxed">
                Discover research-backed articles regarding systemic carbon mitigation.
              </p>
            </Link>
 
            <Link
              href="/feed"
              className="flex flex-col items-center p-6 rounded-3xl glass-card sm:col-span-2 lg:col-span-1 lg:col-start-1"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2D6A4F] dark:text-[#52B788] hover:text-white hover:bg-[#2D6A4F] transition-all duration-350">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase">Eco Feed</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#2D3748] dark:text-[#A0AEC0] text-center leading-relaxed">
                Celebrate eco-achievements and discuss goals with the community.
              </p>
            </Link>
 
            <Link
              href="/analytics"
              className="flex flex-col items-center p-6 rounded-3xl glass-card sm:col-span-2 lg:col-span-2"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full glass-button mb-4 text-[#2D6A4F] dark:text-[#52B788] hover:text-white hover:bg-[#2D6A4F] transition-all duration-350">
                <LineChart className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xxs font-bold tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788] uppercase">Predictive Forecast</h3>
              <p className="mt-2 text-xxxxs tracking-wider uppercase text-[#2D3748] dark:text-[#A0AEC0] text-center leading-relaxed">
                Examine predictive charts forecasting future emission lines against goals.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
