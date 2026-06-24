"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { ChevronDown } from "lucide-react";

export function SavingsChart({ goals = [] }) {
  const totalSaved = goals.reduce((acc, g) => acc + Number(g.currentAmount), 0);
  const totalTarget = goals.reduce((acc, g) => acc + Number(g.targetAmount), 0);
  const remaining = Math.max(totalTarget - totalSaved, 0);
  const completion = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // In a real app, this would be historical goal progress.
  // For now, we keep the beautiful mock chart data and make the summary stats dynamic.
  const data = [
    { name: 'Jan', saved: 6000, target: 8000 },
    { name: 'Feb', saved: 8500, target: 10000 },
    { name: 'Mar', saved: 5000, target: 7000 },
    { name: 'Apr', saved: 12000, target: 15000 },
    { name: 'May', saved: 7000, target: 9000 },
    { name: 'Jun', saved: 14000, target: 16000 },
    { name: 'Jul', saved: 4000, target: 8000 },
    { name: 'Aug', saved: 11000, target: 15000 },
    { name: 'Sep', saved: 13000, target: 14000 },
    { name: 'Oct', saved: 22000, target: 24000 },
    { name: 'Nov', saved: 6000, target: 10000 },
    { name: 'Dec', saved: 15000, target: 18000 },
  ];

  const CustomLegend = () => {
    return (
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#6b46c1]"></div>
          <span className="text-[11px] font-bold text-slate-600">Saved Amount</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-slate-100"></div>
          <span className="text-[11px] font-bold text-slate-600">Target Amount</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Savings vs Target</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer appearance-none pr-6 relative">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>

      <CustomLegend />

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barSize={12}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
              formatter={(value) => [`$${value}`, ""]}
            />
            
            {/* Background Bar for Target */}
            <Bar dataKey="target" fill="#f1f5f9" radius={[4, 4, 4, 4]} />
            {/* Foreground Bar for Saved */}
            <Bar dataKey="saved" fill="#6b46c1" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
        <div>
          <p className="text-[10px] font-bold text-slate-500 mb-0.5">Total Saved</p>
          <p className="text-[14px] font-black text-slate-900">${totalSaved.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 mb-0.5">Total Target</p>
          <p className="text-[14px] font-black text-slate-900">${totalTarget.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 mb-0.5">Remaining</p>
          <p className="text-[14px] font-black text-slate-900">${remaining.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 mb-0.5">Completion</p>
          <p className="text-[14px] font-black text-slate-900">{completion.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
