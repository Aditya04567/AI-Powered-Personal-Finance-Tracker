import Link from "next/link";
import { Laptop, Palmtree, ArrowRight } from "lucide-react";

export function Goals({ goals = [] }) {
  // Sort by created and take top 3
  const recentGoals = [...goals].slice(0, 3);

  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Goals</h2>
        <Link href="/goals" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-5 flex-1">
        {recentGoals.length > 0 ? recentGoals.map((goal) => {
          const saved = Number(goal.currentAmount) || 0;
          const target = Number(goal.targetAmount) || 1;
          const percent = Math.min(Math.round((saved / target) * 100), 100);
          return (
            <div key={goal.id} className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#f8f5ff] text-[#6b46c1]`}>
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{goal.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    ${target.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              
              <div className="pl-[52px]">
                <p className="text-[10px] font-semibold text-slate-500 mb-1.5">
                  ${saved.toLocaleString("en-US", { minimumFractionDigits: 2 })} saved
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#6b46c1] transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 w-6 text-right">{percent}%</span>
                </div>
              </div>
            </div>
          );
        }) : (
          <p className="text-sm text-slate-400 font-medium">No active goals.</p>
        )}
      </div>

      <div className="mt-5">
        <Link href="/goals/create" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1">
          Create New Goal <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
