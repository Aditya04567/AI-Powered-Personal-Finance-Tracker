"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function AccountDistribution({ accounts = [] }) {
  const bankAccounts = accounts.filter(a => a.type === "SAVINGS" || a.type === "CURRENT");
  const bankBalance = bankAccounts.reduce((acc, account) => acc + Number(account.balance), 0);

  const wallets = accounts.filter(a => a.type === "WALLET");
  const walletBalance = wallets.reduce((acc, account) => acc + Number(account.balance), 0);

  const cashAccounts = accounts.filter(a => a.type === "CASH");
  const cashBalance = cashAccounts.reduce((acc, account) => acc + Number(account.balance), 0);

  const data = [
    { name: "Bank Accounts", value: bankBalance, color: "#6b46c1" },
    { name: "Wallets", value: walletBalance, color: "#f97316" },
    { name: "Cash", value: cashBalance, color: "#10b981" },
  ].filter(d => d.value > 0);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
      <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mb-6">Account Distribution</h2>
      
      <div className="flex items-center justify-between gap-4 flex-1">
        
        {/* Donut Chart */}
        <div className="relative w-[140px] h-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
            <span className="text-[15px] font-black text-slate-900 leading-none">
              ${(total / 1000).toFixed(1)}K
            </span>
            <span className="text-[9px] font-bold text-slate-400 mt-1">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                <span className="text-[11px] font-bold text-slate-600">{item.name}</span>
              </div>
              <span className="text-[11px] font-black text-slate-900">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
