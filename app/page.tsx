import Link from "next/link";
import {
  Leaf,
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  MessageSquare,
  LineChart,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-4xl mx-auto text-center">
      {/* Brand Icon & Name */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mb-6 dark:bg-emerald-950/30 dark:text-emerald-400">
        <Leaf className="h-9 w-9 animate-bounce" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-405 dark:to-teal-400">
          TerraCarbon
        </span>
      </h1>
      <p className="mt-4 text-base md:text-lg text-zinc-500 max-w-2xl dark:text-zinc-400 leading-relaxed">
        Understand your impact, track daily eco-actions, expand your climate literacy, and connect with a sustainable community.
      </p>

      {/* Direct link to dashboard */}
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="group flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-600 transition-all duration-300 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Enter Eco Dashboard
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid of features */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <Link
          href="/dashboard"
          className="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 bg-white hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 dark:border-zinc-950 dark:bg-zinc-950 dark:hover:border-emerald-500/20"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Main Dashboard</h3>
          <p className="mt-1 text-xxs text-zinc-400 text-center leading-relaxed">
            Monitor weekly carbon allowance and view proportional breakdown metrics.
          </p>
        </Link>

        <Link
          href="/tracker"
          className="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 bg-white hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 dark:border-zinc-950 dark:bg-zinc-950 dark:hover:border-emerald-500/20"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-450 mb-4">
            <ClipboardList className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Quest Tracker</h3>
          <p className="mt-1 text-xxs text-zinc-400 text-center leading-relaxed">
            Check off daily sustainable habits to log carbon reduction scores.
          </p>
        </Link>

        <Link
          href="/education"
          className="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 bg-white hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 dark:border-zinc-950 dark:bg-zinc-950 dark:hover:border-emerald-500/20"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 mb-4">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Green Library</h3>
          <p className="mt-1 text-xxs text-zinc-400 text-center leading-relaxed">
            Discover research-backed articles regarding systemic carbon mitigation.
          </p>
        </Link>

        <Link
          href="/feed"
          className="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 bg-white hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 dark:border-zinc-950 dark:bg-zinc-950 dark:hover:border-emerald-500/20 sm:col-span-2 lg:col-span-1 lg:col-start-1"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 mb-4">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Eco Feed</h3>
          <p className="mt-1 text-xxs text-zinc-400 text-center leading-relaxed">
            Celebrate eco-achievements and discuss goals with the community.
          </p>
        </Link>

        <Link
          href="/analytics"
          className="flex flex-col items-center p-6 rounded-2xl border border-zinc-200 bg-white hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 dark:border-zinc-950 dark:bg-zinc-950 dark:hover:border-emerald-500/20 sm:col-span-2 lg:col-span-2"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400 mb-4">
            <LineChart className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Predictive Forecast</h3>
          <p className="mt-1 text-xxs text-zinc-400 text-center leading-relaxed">
            Examine predictive charts forecasting future emission lines against goals.
          </p>
        </Link>
      </div>
    </div>
  );
}
