import { Suspense } from "react";
import { Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateGoalDrawer } from "@/components/create-goal-drawer";

import { GoalsOverview } from "./_components/goals-overview";
import { GoalsList } from "./_components/goals-list";

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
          <CreateGoalDrawer>
            <Button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 h-10 text-[13px] font-bold shadow-sm w-full sm:w-auto flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Goal
            </Button>
          </CreateGoalDrawer>
        </div>
      </div>

      <GoalsOverview goals={goals} />

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-6 items-start">
        <GoalsList goals={goals} />
      </div>
    </div>
  );
}
