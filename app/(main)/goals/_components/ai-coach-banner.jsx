"use client";

import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AICoachBanner() {
  const recommendations = [
    "Increase monthly savings",
    "Reduce dining out expenses",
    "Auto-invest your extra cash",
    "Review and optimize budgets",
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-[2rem] p-6 shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl"></div>
      <div className="absolute right-20 -top-10 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-6 flex-1 z-10">
        
        {/* Plant Icon Area */}
        <div className="w-24 h-24 shrink-0 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-200/50 rounded-full blur-md"></div>
          {/* We'll use a stylized div to represent the plant icon from the image */}
          <div className="relative z-10 w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center border-4 border-emerald-100">
             <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-lg">
                $
             </div>
             <div className="absolute -bottom-2 w-10 h-4 bg-emerald-400 rounded-t-lg"></div>
          </div>
        </div>

        {/* Text Content */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-[15px] font-black text-slate-900 tracking-tight">AI Tip for You</h2>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#6b46c1] text-white">
              Beta
            </span>
          </div>
          
          <p className="text-[12px] font-semibold text-slate-700 leading-relaxed max-w-md mb-4">
            You can reach your goals 2.3x faster by increasing your monthly savings by <span className="font-black text-emerald-600">$320.00</span>.
          </p>
          
          <Link href="/ai-assistant">
            <button className="bg-white border border-slate-200 text-[#6b46c1] px-4 py-2 rounded-xl text-[11px] font-bold shadow-sm hover:bg-purple-50 transition-colors flex items-center gap-1.5">
              View Recommendations <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Recommended Actions List */}
      <div className="md:w-1/3 shrink-0 z-10 border-t md:border-t-0 md:border-l border-emerald-200/50 pt-4 md:pt-0 md:pl-8">
        <p className="text-[11px] font-black text-slate-900 mb-3">Recommended Actions</p>
        <ul className="space-y-2">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              {rec}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
