"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";

export function GoalsAnalytics({ goals = [] }) {
  const totalGoals = goals.length || 1; // avoid division by zero
  
  const onTrack = goals.filter(g => (Number(g.currentAmount) / Number(g.targetAmount)) > 0.5).length;
  const atRisk = goals.filter(g => {
    const p = Number(g.currentAmount) / Number(g.targetAmount);
    return p > 0.2 && p <= 0.5;
  }).length;
  const behind = goals.filter(g => (Number(g.currentAmount) / Number(g.targetAmount)) <= 0.2).length;
  const completed = goals.filter(g => g.isCompleted || Number(g.currentAmount) >= Number(g.targetAmount)).length;

  const data = [
    { name: "On Track", value: onTrack, color: "#6b46c1", percentage: `${Math.round((onTrack / totalGoals) * 100)}%` },
    { name: "At Risk", value: atRisk, color: "#10b981", percentage: `${Math.round((atRisk / totalGoals) * 100)}%` },
    { name: "Behind", value: behind, color: "#f97316", percentage: `${Math.round((behind / totalGoals) * 100)}%` },
    { name: "Completed", value: completed, color: "#3b82f6", percentage: `${Math.round((completed / totalGoals) * 100)}%` },
  ].filter(d => d.value > 0); // Hide empty slices

  const avgProgress = goals.length > 0 
    ? goals.reduce((acc, g) => acc + (Number(g.currentAmount) / Number(g.targetAmount)), 0) / goals.length * 100
    : 0;

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Goals Overview</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer appearance-none pr-6 relative">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
        <ChevronDown className="absolute right-8 top-8 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      </div>
      
      <div className="flex flex-col items-center justify-between gap-6 flex-1">
        
        {/* Donut Chart */}
        <div className="relative w-[180px] h-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
            <span className="text-[20px] font-black text-slate-900 leading-none mb-0.5">
              {avgProgress.toFixed(1)}%
            </span>
            <span className="text-[10px] font-bold text-slate-400">Avg Progress</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: item.color }}></div>
                <span className="text-[12px] font-bold text-slate-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-black text-slate-900">{item.value}</span>
                <span className="text-[11px] font-semibold text-slate-400 w-10 text-right">({item.percentage})</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
