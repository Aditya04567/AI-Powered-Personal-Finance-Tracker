"use client";

import { MoreVertical, Plus, ArrowUpRight, ArrowDownRight, Landmark, Wallet, Banknote, Trash2, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteAccount, updateDefaultAccount } from "@/actions/account";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function AccountsList({ accounts = [] }) {
  const displayAccounts = accounts.length > 0 ? accounts.map((acc, index) => {
    let icon = Landmark;
    let logoColor = "bg-blue-600";
    
    if (acc.type === "WALLET") {
      icon = Wallet;
      logoColor = "bg-purple-600";
    } else if (acc.type === "CASH") {
      icon = Banknote;
      logoColor = "bg-emerald-500";
    } else {
      // Alternate colors for bank accounts using a stable hash of the ID
      const colors = ["bg-blue-600", "bg-orange-500", "bg-rose-600"];
      const hash = (acc.id || "").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      logoColor = colors[hash % colors.length];
    }

    return {
      id: acc.id,
      name: acc.name,
      type: acc.type === "SAVINGS" ? "Savings Account" : acc.type === "CURRENT" ? "Current Account" : acc.type === "WALLET" ? "Wallet" : "Physical Cash",
      number: acc.number || null,
      balance: Number(acc.balance),
      isDefault: acc.isDefault,
      logoColor,
      icon,
    };
  }) : [];

  const handleDelete = async (accountId) => {
    try {
      const result = await deleteAccount(accountId);
      if (result?.success) {
        toast.success("Account deleted successfully");
      } else {
        toast.error(result?.error || "Failed to delete account");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
    }
  };

  const handleMakePrimary = async (accountId) => {
    try {
      const result = await updateDefaultAccount(accountId);
      if (result?.success) {
        toast.success("Account set as primary successfully");
      } else {
        toast.error(result?.error || "Failed to set account as primary");
      }
    } catch (error) {
      toast.error(error.message || "Failed to set account as primary");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Your Accounts</h2>
      </div>

      <div className="space-y-3 flex-1">
        {displayAccounts.map((acc) => (
          <div key={acc.id} className="group relative flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer bg-white">
            
            {/* Institution Logo */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-inner ${acc.logoColor}`}>
              <acc.icon className="w-5 h-5" />
            </div>

            {/* Account Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-[13px] font-bold text-slate-900 truncate">{acc.name}</h3>
                {acc.isDefault && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-[#6b46c1]">
                    Primary
                  </span>
                )}
              </div>
              <div className="flex items-center text-[11px] font-semibold text-slate-500">
                <span>{acc.type}</span>
                {acc.number && (
                  <>
                    <span className="mx-2 text-slate-300">•</span>
                    <span>•••• {acc.number}</span>
                  </>
                )}
              </div>
            </div>

            {/* Balances */}
            <div className="text-right pr-8 min-w-0 shrink-1">
              <p className="text-[14px] font-black text-slate-900 mb-1 truncate" title={`$${acc.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}>
                ${acc.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-slate-400 hover:text-[#6b46c1] opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 p-2">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl p-1 border-slate-100 shadow-sm">
                {!acc.isDefault && (
                  <>
                    <DropdownMenuItem 
                      className="text-[11px] font-bold text-slate-700 focus:bg-purple-50 focus:text-[#6b46c1] cursor-pointer rounded-lg px-3 py-2 flex items-center gap-2 mb-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMakePrimary(acc.id);
                      }}
                    >
                      <Star className="w-3.5 h-3.5" />
                      Make Primary
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-100" />
                  </>
                )}
                <DropdownMenuItem 
                  className="text-[11px] font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer rounded-lg px-3 py-2 flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(acc.id);
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}

      </div>
    </div>
  );
}
