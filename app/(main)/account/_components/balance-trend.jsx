"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function BalanceTrend() {
  const data = [
    { date: "Jun 1", balance: 12000 },
    { date: "Jun 5", balance: 15500 },
    { date: "Jun 8", balance: 14800 },
    { date: "Jun 12", balance: 18000 },
    { date: "Jun 15", balance: 17500 },
    { date: "Jun 19", balance: 19500 },
    { date: "Jun 22", balance: 18900 },
    { date: "Jun 26", balance: 22000 },
    { date: "Jun 30", balance: 20900 },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Balance Trend</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="mb-6">
        <p className="text-[11px] font-bold text-slate-500 mb-1">Total Balance</p>
        <div className="flex items-end gap-3">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">$20,900.00</h3>
          <span className="flex items-center text-[12px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            6.5%
          </span>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6b46c1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6b46c1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
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
              contentStyle={{ backgroundColor: "#1e293b", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px", fontWeight: "bold" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#6b46c1" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#6b46c1", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#6b46c1", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
