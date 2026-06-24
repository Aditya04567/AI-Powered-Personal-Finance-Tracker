"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const remaining = initialBudget ? initialBudget.amount - currentExpenses : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#6b46c1]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Monthly Budget</h3>
            <p className="text-xs font-medium text-slate-500">Default Account</p>
          </div>
        </div>
        
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="w-32 h-9 rounded-xl border-slate-200"
              placeholder="Amount"
              autoFocus
              disabled={isLoading}
            />
            <Button variant="ghost" size="icon" onClick={handleUpdateBudget} disabled={isLoading} className="h-9 w-9 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel} disabled={isLoading} className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="h-9 px-4 rounded-xl text-xs font-bold text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
          </Button>
        )}
      </div>

      {initialBudget ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
              <p className="text-xs font-semibold text-slate-500 mb-1">Spent</p>
              <p className="text-lg font-bold text-slate-900">${currentExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
              <p className="text-xs font-semibold text-slate-500 mb-1">Budget</p>
              <p className="text-lg font-bold text-slate-900">${initialBudget.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
              <p className="text-xs font-semibold text-slate-500 mb-1">Remaining</p>
              <p className="text-lg font-bold text-emerald-600">${remaining.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${percentUsed >= 90 ? 'bg-red-500' : percentUsed >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600">
                {percentUsed.toFixed(1)}% used
              </span>
              <span className="text-xs font-medium text-slate-500">
                ${remaining.toLocaleString("en-US", { minimumFractionDigits: 2 })} left to spend
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-sm font-semibold text-slate-500">No budget set for this month.</p>
        </div>
      )}
    </div>
  );
}
