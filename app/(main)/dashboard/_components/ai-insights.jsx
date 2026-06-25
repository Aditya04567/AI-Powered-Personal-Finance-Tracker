"use client";

import { useState } from "react";
import { TrendingUp, AlertTriangle, Lightbulb, Bot, Loader2 } from "lucide-react";
import { generateFinancialInsights } from "@/actions/ai";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AIInsights({ transactions = [] }) {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const icons = [
    { icon: TrendingUp, bg: "bg-emerald-100", color: "text-emerald-600" },
    { icon: AlertTriangle, bg: "bg-amber-100", color: "text-amber-500" },
    { icon: Lightbulb, bg: "bg-purple-100", color: "text-[#6b46c1]" },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await generateFinancialInsights(transactions);
      if (res?.success) {
        setInsights(res.data);
      } else {
        toast.error(res?.error || "Failed to generate insights.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <SparklesIcon className="w-5 h-5 text-[#6b46c1]" />
        <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Insights</h2>
      </div>

      <div className="space-y-4 flex-1">
        {insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
              <Bot className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-[13px] font-semibold text-slate-500 mb-4 max-w-[200px]">
              Generate real-time AI insights based on your spending habits.
            </p>
            <Button 
              onClick={handleGenerate} 
              disabled={isLoading || transactions.length === 0}
              className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 h-9 text-xs font-semibold shadow-sm w-full"
            >
              {isLoading ? (
                <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Analyzing...</>
              ) : (
                <><SparklesIcon className="w-3.5 h-3.5 mr-1.5" /> Generate Insights</>
              )}
            </Button>
            {transactions.length === 0 && !isLoading && (
              <p className="text-[10px] text-slate-400 mt-2">Add transactions to get insights.</p>
            )}
          </div>
        ) : (
          insights.map((insight, index) => {
            const style = icons[index % icons.length];
            return (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${style.bg} ${style.color} flex items-center justify-center shrink-0`}>
                  <style.icon className="w-4 h-4" />
                </div>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed mt-0.5">
                  {insight}
                </p>
              </div>
            );
          })
        )}
      </div>

      {insights.length > 0 && (
        <div className="mt-5">
          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1 disabled:opacity-50"
          >
            {isLoading ? "Refreshing..." : "Refresh Insights"} <SparklesIcon className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// Inline sparkles icon for the title
function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
