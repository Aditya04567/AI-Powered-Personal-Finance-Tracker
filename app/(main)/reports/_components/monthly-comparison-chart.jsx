"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, ChevronDown } from "lucide-react";

export function MonthlyComparisonChart({ transactions = [] }) {
  // Group by month
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
    if (!acc[month]) acc[month] = { name: month, income: 0, expense: 0 };
    if (t.type === 'INCOME') acc[month].income += Number(t.amount);
    if (t.type === 'EXPENSE') acc[month].expense += Number(t.amount);
    return acc;
  }, {});

  const data = Object.values(monthlyData).reverse().slice(-6); // Last 6 months

  const CustomLegend = () => (
    <div className="flex items-center justify-center gap-6 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
        <span className="text-[11px] font-bold text-slate-600">Income</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-sm bg-rose-500"></div>
        <span className="text-[11px] font-bold text-slate-600">Expenses</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Monthly Comparison</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer appearance-none pr-6 relative">
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <CustomLegend />

      <div className="h-[180px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            barSize={10}
            barGap={4}
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
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 4, 4]} />
            <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <p className="text-[10px] font-bold text-slate-500 mb-1">Income Trend</p>
          <span className="flex items-center text-[12px] font-black text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            15.6%
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 mb-1">Expense Trend</p>
          <span className="flex items-center text-[12px] font-black text-emerald-600">
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            6.3%
          </span>
        </div>
      </div>
    </div>
  );
}
