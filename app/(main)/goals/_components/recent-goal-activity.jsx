"use client";

import Link from "next/link";
import { Shield, Car, Palmtree, Home, GraduationCap } from "lucide-react";

export function RecentGoalActivity({ goals = [] }) {
  // We don't track individual goal deposits in the DB yet,
  // so we dynamically show the recently created/updated goals.
  
  const activities = goals.slice(0, 5).map(g => {
    let icon = Shield;
    let iconColor = "text-amber-500";
    let iconBg = "bg-amber-50";

    switch(g.category?.toLowerCase() || g.name.toLowerCase()) {
      case "transportation": 
      case "buy new car": icon = Car; iconColor = "text-[#6b46c1]"; iconBg = "bg-purple-50"; break;
      case "travel": 
      case "dream vacation": icon = Palmtree; iconColor = "text-emerald-500"; iconBg = "bg-emerald-50"; break;
      case "real estate": 
      case "new house down payment": icon = Home; iconColor = "text-blue-500"; iconBg = "bg-blue-50"; break;
      case "education": 
      case "higher education": icon = GraduationCap; iconColor = "text-purple-600"; iconBg = "bg-purple-100"; break;
    }

    return {
      id: g.id,
      title: `Created ${g.name}`,
      amount: Number(g.currentAmount),
      dateStr: new Date(g.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      icon,
      iconColor,
      iconBg,
    };
  });

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Recent Goal Activity</h2>
        <Link href="/goals/activity" className="text-[11px] font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
            
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg} ${activity.iconColor} shadow-inner`}>
                <activity.icon className="w-4 h-4" />
              </div>
              
              <div>
                <h3 className="text-[12px] font-bold text-slate-900 mb-0.5">{activity.title}</h3>
                <p className="text-[10px] font-semibold text-slate-500">{activity.dateStr}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[12px] font-black text-slate-900 mb-0.5">
                ${activity.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[10px] font-bold text-slate-400">Initial</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
