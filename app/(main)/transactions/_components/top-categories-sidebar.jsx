"use client";

import Link from "next/link";
import { Utensils, Car, ShoppingBag, Zap, Tv, ChevronDown, ArrowRight } from "lucide-react";

export function TopCategoriesSidebar({ transactions }) {
  // Using mock data matching the image for visual accuracy
  const categories = [
    {
      name: "Food & Dining",
      percent: 40,
      amount: 40.00,
      icon: Utensils,
      color: "text-purple-600",
      bg: "bg-purple-100",
      progressBg: "bg-purple-600",
    },
    {
      name: "Transport",
      percent: 20,
      amount: 20.00,
      icon: Car,
      color: "text-blue-500",
      bg: "bg-blue-100",
      progressBg: "bg-blue-500",
    },
    {
      name: "Shopping",
      percent: 15,
      amount: 15.00,
      icon: ShoppingBag,
      color: "text-amber-500",
      bg: "bg-amber-100",
      progressBg: "bg-amber-500",
    },
    {
      name: "Bills & Utilities",
      percent: 10,
      amount: 10.00,
      icon: Zap,
      color: "text-red-500",
      bg: "bg-red-100",
      progressBg: "bg-red-500",
    },
    {
      name: "Entertainment",
      percent: 5,
      amount: 5.00,
      icon: Tv,
      color: "text-purple-500",
      bg: "bg-purple-100",
      progressBg: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[13px] font-bold text-slate-900 tracking-tight">Top Categories</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1 outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="space-y-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cat.bg} ${cat.color}`}>
              <cat.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold text-slate-900 truncate pr-2">{cat.name}</p>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-900 leading-none">{cat.percent}%</p>
                  <p className="text-[8px] font-semibold text-slate-400 mt-0.5">${cat.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                <div 
                  className={`h-full rounded-full ${cat.progressBg}`} 
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center bg-slate-50 rounded-xl py-2 cursor-pointer hover:bg-slate-100 transition-colors">
        <Link href="/categories" className="text-[10px] font-bold text-[#6b46c1] hover:text-[#553c9a] inline-flex items-center gap-1 transition-colors">
          View All Categories <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
