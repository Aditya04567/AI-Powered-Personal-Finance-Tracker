"use client";

import { useState } from "react";
import { Bot, Loader2, SparklesIcon } from "lucide-react";
import { generateReportInsights } from "@/actions/ai";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ReportInsights({ transactions = [] }) {
  const [insightText, setInsightText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await generateReportInsights(transactions);
      if (res?.success) {
        setInsightText(res.data);
      } else {
        toast.error(res?.error || "Failed to generate report analysis.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full mt-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-[#6b46c1]" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">AI Report Analysis</h2>
          <p className="text-[11px] font-semibold text-slate-500">Comprehensive review of your financial health</p>
        </div>
      </div>

      <div className="flex-1">
        {!insightText ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <SparklesIcon className="w-7 h-7 text-[#6b46c1]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Ready for Analysis</h3>
            <p className="text-xs font-semibold text-slate-500 mb-6 max-w-[300px]">
              Let our AI analyze your income, expenses, and savings rate to provide a personalized financial health report.
            </p>
            <Button 
              onClick={handleGenerate} 
              disabled={isLoading || transactions.length === 0}
              className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-6 h-10 text-xs font-bold shadow-sm"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Report...</>
              ) : (
                <><SparklesIcon className="w-4 h-4 mr-2" /> Generate Full Analysis</>
              )}
            </Button>
            {transactions.length === 0 && !isLoading && (
              <p className="text-[10px] text-slate-400 mt-3 font-semibold">Add transactions to generate a report.</p>
            )}
          </div>
        ) : (
          <div className="prose prose-sm prose-slate max-w-none prose-p:text-sm prose-p:font-semibold prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-black">
            {insightText.split('\n\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;
              
              // Simple markdown bold parser for paragraphs
              const formattedParagraph = paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                return part;
              });

              return (
                <p key={index} className="mb-4 last:mb-0 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  {formattedParagraph}
                </p>
              );
            })}

            <div className="mt-6 flex justify-end">
              <Button 
                variant="outline"
                onClick={handleGenerate}
                disabled={isLoading}
                className="rounded-xl px-4 h-9 text-xs font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <SparklesIcon className="w-3.5 h-3.5 mr-2 text-[#6b46c1]" />}
                {isLoading ? "Refreshing..." : "Refresh Analysis"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
