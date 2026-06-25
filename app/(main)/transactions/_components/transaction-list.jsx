"use client";

import { useState } from "react";
import { format } from "date-fns";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { bulkDeleteTransactions } from "@/actions/account";
import { useRouter } from "next/navigation";

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

export function TransactionList({ transactions = [], accounts = [] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  // 1. Filter by Search
  let filtered = transactions.filter(t => {
    const tName = (t.name || t.description || "").toLowerCase();
    const tCat = (t.category || "").toLowerCase();
    return tName.includes(searchTerm.toLowerCase()) || tCat.includes(searchTerm.toLowerCase());
  });

  // 2. Filter by Tab (Income/Expense/All)
  if (activeTab === "Income") {
    filtered = filtered.filter(t => t.type === "INCOME");
  } else if (activeTab === "Expense") {
    filtered = filtered.filter(t => t.type === "EXPENSE");
  }

  // 3. Sort logic
  filtered = [...filtered].sort((a, b) => {
    if (sortOption === "Latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "Oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "Highest Amount") {
      return Math.abs(b.amount) - Math.abs(a.amount);
    } else if (sortOption === "Lowest Amount") {
      return Math.abs(a.amount) - Math.abs(b.amount);
    }
    return 0;
  });

  // 4. Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  // Ensure current page is valid after filtering
  if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const tabs = ["All", "Income", "Expense"];

  const handleDelete = async (id) => {
    try {
      const res = await bulkDeleteTransactions([id]);
      if (res.success) {
        toast.success("Transaction deleted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete transaction");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete transaction");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 mb-4 pb-0">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // Reset to first page on tab change
              }}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="pb-3 flex items-center gap-2 text-xs font-semibold text-slate-500 cursor-pointer hover:text-slate-700">
              Sort by: {sortOption} <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-xl p-1 border-slate-100 shadow-sm">
            {["Latest", "Oldest", "Highest Amount", "Lowest Amount"].map(option => (
              <DropdownMenuItem 
                key={option}
                className={`text-[11px] font-bold cursor-pointer rounded-lg px-3 py-2 ${sortOption === option ? "bg-purple-50 text-[#6b46c1]" : "text-slate-600 hover:bg-slate-50"}`}
                onClick={() => {
                  setSortOption(option);
                  setCurrentPage(1);
                }}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
        {displayData.map((t, i) => {
          const tName = t.name || t.description || "Transaction";
          const account = accounts?.find(a => a.id === t.accountId);
          const accName = t.accountName || account?.name || "Bank Account";
          
          return (
          <div key={t.id || i} className="grid grid-cols-12 gap-4 py-3 items-center hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
            <div className="col-span-4 flex items-center gap-3 pl-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${getCategoryIconColor(t.category)}`}>
                {tName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{tName}</p>
                <p className="text-[10px] font-semibold text-slate-400 truncate">{t.category}</p>
              </div>
            </div>
            
            <div className="col-span-2">
              <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold ${getCategoryBadge(t.category)}`}>
                {t.category}
              </span>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-bold text-slate-900 truncate">{accName}</p>
              <p className="text-[10px] font-semibold text-slate-400">•••• 1234</p>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-bold text-slate-900">{format(new Date(t.date), "MMM d, yyyy")}</p>
              <p className="text-[10px] font-semibold text-slate-400">{format(new Date(t.date), "h:mm a")}</p>
            </div>

            <div className="col-span-2 flex items-center justify-end gap-3 pr-2">
              <span className={`text-xs font-bold ${t.type === "INCOME" ? "text-emerald-600" : "text-red-500"}`}>
                {t.type === "INCOME" ? "+" : "-"}${Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-slate-400 hover:text-[#6b46c1] opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-xl p-1 border-slate-100 shadow-sm">
                  <DropdownMenuItem 
                    className="text-[11px] font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer rounded-lg px-3 py-2 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(t.id);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-slate-500">
          Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} transactions
        </p>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded border font-bold text-[11px] flex items-center justify-center transition-colors ${
                  currentPage === i + 1 
                    ? "bg-purple-50 text-[#6b46c1] border-purple-100" 
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
      
      {displayData.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm font-semibold text-slate-500">No transactions found.</p>
        </div>
      )}
    </div>
  );
}
