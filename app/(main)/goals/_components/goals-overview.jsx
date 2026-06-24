"use client";

import { Target, TrendingUp, PieChart, CalendarCheck } from "lucide-react";

export function GoalsOverview({ goals = [] }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + Number(g.currentAmount), 0);
  
  const averageProgress = totalGoals > 0 
    ? goals.reduce((acc, g) => acc + (Number(g.currentAmount) / Number(g.targetAmount)), 0) / totalGoals * 100
    : 0;

  const onTrackGoals = goals.filter(g => (Number(g.currentAmount) / Number(g.targetAmount)) > 0.5).length;

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals.toString(),
      subtext: "Active goals",
      icon: Target,
      iconColor: "text-[#6b46c1]",
      iconBg: "bg-purple-50",
    },
    {
      title: "Total Saved",
      value: `$${totalSaved.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "Across all goals",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Goal Progress",
      value: `${averageProgress.toFixed(1)}%`,
      subtext: "Average progress",
      icon: PieChart,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
    {
      title: "On Track",
      value: onTrackGoals.toString(),
      subtext: "Goals > 50% done",
      icon: CalendarCheck,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center gap-5 hover:border-purple-100 transition-colors group cursor-pointer"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${stat.iconBg} ${stat.iconColor} shadow-inner`}>
            <stat.icon className="w-6 h-6" />
          </div>
          
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-0.5">{stat.title}</p>
            <h3 className="text-[22px] font-black text-slate-900 tracking-tight mb-0.5">
              {stat.value}
            </h3>
            <p className="text-[11px] font-semibold text-slate-400">
              {stat.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
