import { Suspense } from "react";
import { Bell, Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { GoalsOverview } from "./_components/goals-overview";
import { GoalsList } from "./_components/goals-list";
import { GoalsAnalytics } from "./_components/goals-analytics";
import { GoalsInsights } from "./_components/goals-insights";
import { SavingsChart } from "./_components/savings-chart";
import { RecentGoalActivity } from "./_components/recent-goal-activity";
import { AICoachBanner } from "./_components/ai-coach-banner";

import { getUserGoals } from "@/actions/goals";

export default async function GoalsPage() {
  const goals = await getUserGoals();

  return (
    <div className="space-y-6 pb-12 font-sans max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-[22px] font-bold text-slate-900 mb-0.5 tracking-tight">
            Goals
          </h1>
          <p className="text-[13px] font-medium text-slate-500">
            Track your goals and achieve your dreams.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <Link href="/goals/create">
            <Button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 h-10 text-[13px] font-bold shadow-sm w-full sm:w-auto flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Goal
            </Button>
          </Link>
        </div>
      </div>

      <GoalsOverview goals={goals} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (Wider) */}
        <div className="xl:col-span-8 space-y-6">
          <GoalsList goals={goals} />
          <SavingsChart goals={goals} />
          <AICoachBanner />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="xl:col-span-4 space-y-6">
          <GoalsAnalytics goals={goals} />
          <GoalsInsights goals={goals} />
          <RecentGoalActivity goals={goals} />
        </div>
      </div>
    </div>
  );
}
