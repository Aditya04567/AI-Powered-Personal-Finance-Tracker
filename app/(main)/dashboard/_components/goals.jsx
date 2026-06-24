import Link from "next/link";
import { Laptop, Palmtree, ArrowRight } from "lucide-react";

export function Goals() {
  const mockGoals = [
    {
      id: 1,
      name: "MacBook Pro",
      target: 120000,
      saved: 75000,
      icon: Laptop,
      iconBg: "bg-[#f8f5ff]",
      iconColor: "text-[#6b46c1]",
    },
    {
      id: 2,
      name: "Goa Trip",
      target: 50000,
      saved: 20000,
      icon: Palmtree,
      iconBg: "bg-[#f0fdf4]",
      iconColor: "text-[#10b981]",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Goals</h2>
        <Link href="/goals" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-5 flex-1">
        {mockGoals.map((goal) => {
          const percent = Math.min(Math.round((goal.saved / goal.target) * 100), 100);
          return (
            <div key={goal.id} className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${goal.iconBg} ${goal.iconColor}`}>
                  <goal.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{goal.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    ₹{goal.target.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              
              <div className="pl-[52px]">
                <p className="text-[10px] font-semibold text-slate-500 mb-1.5">
                  ₹{goal.saved.toLocaleString("en-IN")} saved
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#6b46c1]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 w-6 text-right">{percent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <Link href="/goals/create" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1">
          Create New Goal <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
