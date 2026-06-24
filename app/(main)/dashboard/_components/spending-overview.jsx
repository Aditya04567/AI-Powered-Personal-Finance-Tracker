"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

export function SpendingOverview({ transactions }) {
  // Compute data for AreaChart (last 30 days)
  const chartData = useMemo(() => {
    const data = [];
    const today = startOfDay(new Date());
    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, "MMM d");
      
      const dayTransactions = transactions.filter(t => 
        t.type === "EXPENSE" && 
        format(new Date(t.date), "MMM d") === dateStr
      );
      
      const total = dayTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
      data.push({ date: dateStr, amount: total });
    }
    return data;
  }, [transactions]);

  // Compute Top Categories
  const topCategories = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "EXPENSE");
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0) || 1; // avoid division by zero
    
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
    
    const sorted = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: Math.round((amount / totalExpense) * 100),
        color: getColorForCategory(name)
      }));
      
    return sorted;
  }, [transactions]);

  const totalSpending = useMemo(() => {
    return transactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-5 h-full">
      
      {/* Left Side: Chart */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Spending Overview</h2>
          <select className="text-xs font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1 outline-none cursor-pointer">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        
        <div className="mb-4">
          <p className="text-xl font-black text-slate-900 tracking-tighter mb-0.5">
            ${totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs font-semibold text-slate-400">Total Spending</p>
        </div>

        <div className="flex-1 min-h-[140px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                dy={10}
                tickFormatter={(val, i) => i % 5 === 0 ? val : ''} // show every 5th label
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                itemStyle={{ color: '#8b5cf6' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAmount)" 
                activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1">
            View full analytics <span>→</span>
          </button>
        </div>
      </div>

      <div className="w-full md:w-[240px] flex flex-col pt-2 md:pt-8">
        <h3 className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wider">Top Categories</h3>
        <div className="space-y-3 flex-1">
          {topCategories.length > 0 ? (
            topCategories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: cat.color }}>
                  {cat.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{cat.name}</p>
                  <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-[#6b46c1]">{cat.percentage}%</p>
                  <p className="text-[10px] font-semibold text-slate-400">${cat.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 font-medium">No expenses yet.</p>
          )}
        </div>
      </div>
      
    </div>
  );
}

// Helper to assign colors
function getColorForCategory(name) {
  const colors = {
    "Housing": "#8b5cf6",
    "Transportation": "#3b82f6",
    "Food": "#ec4899",
    "Utilities": "#f59e0b",
    "Entertainment": "#f43f5e",
    "Shopping": "#10b981",
    "Healthcare": "#14b8a6",
  };
  return colors[name] || "#94a3b8"; // Default color
}
