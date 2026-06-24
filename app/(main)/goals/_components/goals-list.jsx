"use client";

import { Car, Palmtree, Shield, Home, GraduationCap, Laptop, Sprout, LayoutGrid, List, ChevronDown, MoreVertical, Plus, Target } from "lucide-react";
import Link from "next/link";

export function GoalsList({ goals = [] }) {
  // Helper to get styling based on category
  const getCategoryStyles = (category) => {
    switch(category?.toLowerCase()) {
      case "transportation": return { icon: Car, iconColor: "text-[#6b46c1]", iconBg: "bg-purple-50", barColor: "bg-[#6b46c1]" };
      case "travel": return { icon: Palmtree, iconColor: "text-emerald-500", iconBg: "bg-emerald-50", barColor: "bg-emerald-500" };
      case "savings": return { icon: Shield, iconColor: "text-amber-500", iconBg: "bg-amber-50", barColor: "bg-amber-500" };
      case "real estate": return { icon: Home, iconColor: "text-blue-500", iconBg: "bg-blue-50", barColor: "bg-blue-500" };
      case "education": return { icon: GraduationCap, iconColor: "text-purple-600", iconBg: "bg-purple-100", barColor: "bg-purple-400" };
      case "gadgets": return { icon: Laptop, iconColor: "text-emerald-600", iconBg: "bg-emerald-100", barColor: "bg-emerald-400" };
      case "investment": return { icon: Sprout, iconColor: "text-orange-500", iconBg: "bg-orange-50", barColor: "bg-orange-400" };
      default: return { icon: Target, iconColor: "text-[#6b46c1]", iconBg: "bg-purple-50", barColor: "bg-[#6b46c1]" };
    }
  };

  const displayGoals = goals.length > 0 ? goals.map(g => ({
    id: g.id,
    title: g.name,
    category: g.category || "Savings", // Assuming category might be added later, fallback for now
    saved: Number(g.currentAmount),
    target: Number(g.targetAmount),
    percentage: Math.min(Math.round((Number(g.currentAmount) / Number(g.targetAmount)) * 100), 100),
    timeLeft: "Ongoing",
    ...getCategoryStyles(g.category || g.name)
  })) : [];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">My Goals</h2>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500">Sort by:</span>
            <div className="relative">
              <select className="text-[11px] font-bold text-slate-900 bg-transparent pr-4 outline-none cursor-pointer appearance-none">
                <option>Progress</option>
                <option>Amount Saved</option>
                <option>Time Left</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          {/* View Toggles */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
            <button className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center text-[#6b46c1]">
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {displayGoals.map((goal) => (
          <div key={goal.id} className="group relative flex flex-col gap-3 p-1 cursor-pointer">
            
            <div className="flex items-center gap-4 w-full">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${goal.iconBg} ${goal.iconColor}`}>
                <goal.icon className="w-6 h-6" />
              </div>

              {/* Title & Category */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-slate-900 mb-0.5 truncate">{goal.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500">{goal.category}</p>
              </div>

              {/* Amounts (Centered visually in wider layouts) */}
              <div className="hidden md:block flex-1 text-center">
                <span className="text-[13px] font-black text-slate-900">
                  ${goal.saved.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[12px] font-semibold text-slate-400 mx-1">/</span>
                <span className="text-[12px] font-semibold text-slate-400">
                  ${goal.target.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Percentage & Time */}
              <div className="text-right pr-6 md:pr-8 shrink-0">
                <p className="text-[18px] font-black text-slate-900 leading-none mb-1">
                  {goal.percentage}%
                </p>
                <p className="text-[10px] font-semibold text-slate-400">
                  {goal.timeLeft}
                </p>
              </div>

              {/* Actions Menu */}
              <button className="text-slate-400 hover:text-[#6b46c1] opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-3 p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-1 relative">
              <div 
                className={`absolute left-0 top-0 bottom-0 rounded-full transition-all duration-1000 ${goal.barColor}`}
                style={{ width: `${goal.percentage}%` }}
              ></div>
            </div>
            
            <div className="md:hidden flex items-center justify-between mt-1">
               <span className="text-[11px] font-black text-slate-900">
                  ${goal.saved.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Target: ${goal.target.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
            </div>
          </div>
        ))}

        {/* Add New Goal Button */}
        <Link href="/goals/create">
          <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer group mt-8">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#6b46c1] flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">Create New Goal</h3>
              <p className="text-[11px] font-semibold text-slate-500">Start saving for something important</p>
            </div>
            <div className="ml-auto text-slate-400 group-hover:text-[#6b46c1] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
