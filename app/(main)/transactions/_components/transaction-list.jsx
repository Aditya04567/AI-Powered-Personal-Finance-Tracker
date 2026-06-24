"use client";

import { useState } from "react";
import { format } from "date-fns";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const getCategoryBadge = (category) => {
  const styles = {
    "Food & Dining": "bg-purple-50 text-purple-600",
    "Salary": "bg-emerald-50 text-emerald-600",
    "Shopping": "bg-amber-50 text-amber-600",
    "Entertainment": "bg-purple-50 text-purple-600",
    "Bills & Utilities": "bg-blue-50 text-blue-600",
    "Transport": "bg-blue-50 text-blue-600",
    "Freelance": "bg-emerald-50 text-emerald-600",
  };
  return styles[category] || "bg-slate-100 text-slate-600";
};

const getCategoryIconColor = (category) => {
  const styles = {
    "Food & Dining": "bg-red-500", // Zomato red, Starbucks green (will use generic colors)
    "Salary": "bg-emerald-100 text-emerald-600",
    "Shopping": "bg-pink-100 text-pink-600",
    "Entertainment": "bg-green-500", // Spotify green
    "Bills & Utilities": "bg-purple-400 text-white",
    "Transport": "bg-amber-100 text-amber-600",
    "Freelance": "bg-blue-100 text-blue-600",
  };
  return styles[category] || "bg-slate-200";
};

export function TransactionList({ transactions, accounts }) {
  const [activeTab, setActiveTab] = useState("All");

  // Mock transactions for styling purposes if none exist
  const displayData = transactions.length > 0 ? transactions : [
    { id: 1, name: "Zomato Order", category: "Food & Dining", accountName: "HDFC Bank", date: new Date(), amount: -24.80, type: "EXPENSE" },
    { id: 2, name: "Salary Received", category: "Salary", accountName: "HDFC Bank", date: new Date(), amount: 6000.00, type: "INCOME" },
    { id: 3, name: "Amazon Purchase", category: "Shopping", accountName: "HDFC Bank", date: new Date(), amount: -59.99, type: "EXPENSE" },
    { id: 4, name: "Spotify Subscription", category: "Entertainment", accountName: "HDFC Bank", date: new Date(), amount: -9.99, type: "EXPENSE" },
    { id: 5, name: "Electricity Bill", category: "Bills & Utilities", accountName: "HDFC Bank", date: new Date(), amount: -40.00, type: "EXPENSE" },
  ];

  const tabs = ["All", "Income", "Expense", "Transfer"];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <button className="h-9 px-3 flex items-center gap-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="w-3.5 h-3.5" /> Filter <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="h-9 px-3 flex items-center gap-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Category <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="h-9 px-3 flex items-center gap-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Account <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="h-9 px-3 flex items-center gap-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Jun 1 - Jun 30, 2026
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 mb-4 pb-0">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold transition-colors relative ${
                activeTab === tab ? "text-[#6b46c1]" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#6b46c1] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        <div className="pb-3 flex items-center gap-2 text-xs font-semibold text-slate-500 cursor-pointer hover:text-slate-700">
          Sort by: Latest <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
        <div className="col-span-4 pl-2">Transaction</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Account</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2 text-right pr-8">Amount</div>
      </div>

      {/* Table Body */}
      <div className="space-y-2 mb-6">
        {displayData.map((t, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 py-3 items-center hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
            <div className="col-span-4 flex items-center gap-3 pl-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${getCategoryIconColor(t.category)}`}>
                {t.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{t.name || t.description}</p>
                <p className="text-[10px] font-semibold text-slate-400 truncate">{t.category}</p>
              </div>
            </div>
            
            <div className="col-span-2">
              <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold ${getCategoryBadge(t.category)}`}>
                {t.category}
              </span>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-bold text-slate-900 truncate">{t.accountName || "HDFC Bank"}</p>
              <p className="text-[10px] font-semibold text-slate-400">•••• 1234</p>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-bold text-slate-900">{format(new Date(t.date), "MMM d, yyyy")}</p>
              <p className="text-[10px] font-semibold text-slate-400">{format(new Date(t.date), "h:mm a")}</p>
            </div>

            <div className="col-span-2 flex items-center justify-end gap-3 pr-2">
              <span className={`text-xs font-bold ${t.type === "INCOME" || t.amount > 0 ? "text-emerald-600" : "text-red-500"}`}>
                {t.type === "INCOME" || t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <button className="text-slate-400 hover:text-[#6b46c1] opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-slate-500">Showing 1 to 10 of 48 transactions</p>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 rounded bg-purple-50 text-[#6b46c1] font-bold text-[11px] flex items-center justify-center">1</button>
          <button className="w-7 h-7 rounded border border-slate-200 text-slate-600 font-bold text-[11px] hover:bg-slate-50 transition-colors flex items-center justify-center">2</button>
          <button className="w-7 h-7 rounded border border-slate-200 text-slate-600 font-bold text-[11px] hover:bg-slate-50 transition-colors flex items-center justify-center">3</button>
          <span className="w-5 text-center text-slate-400 text-xs">...</span>
          <button className="w-7 h-7 rounded border border-slate-200 text-slate-600 font-bold text-[11px] hover:bg-slate-50 transition-colors flex items-center justify-center">5</button>
          <button className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
