"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Link href={`/account/${id}`}>
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#6b46c1] transition-all group font-sans h-full flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 capitalize">{name}</h3>
              <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-wider">
                {type}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {isDefault && <span className="text-[10px] font-bold text-[#6b46c1]">Default</span>}
            <div onClick={handleDefaultChange}>
              <Switch
                checked={isDefault}
                disabled={updateDefaultLoading}
                className="data-[state=checked]:bg-[#6b46c1]"
              />
            </div>
          </div>
        </div>

        <div className="mb-6 flex-1">
          <p className="text-xs font-semibold text-slate-500 mb-1">Balance</p>
          <div className="text-2xl font-bold text-slate-900">
            ${parseFloat(balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-bold pt-4 border-t border-slate-50 mt-auto">
          <div className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
            <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
            Income
          </div>
          <div className="flex items-center text-red-600 hover:text-red-700 transition-colors">
            <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
            Expense
          </div>
        </div>
      </div>
    </Link>
  );
}
