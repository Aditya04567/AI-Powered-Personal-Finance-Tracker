"use client";

import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export function GoalsInsights({ goals = [] }) {
  const totalGoals = goals.length || 1;
  const onTrackGoals = goals.filter(g => (Number(g.currentAmount) / Number(g.targetAmount)) > 0.5).length;
  
  return (
    <div className="space-y-6">
      {/* Doing Great Card */}
      <div className="bg-gradient-to-br from-[#6b46c1] to-[#4c1d95] rounded-[2rem] p-6 shadow-md text-white relative overflow-hidden">
        {/* Abstract shapes for design */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
        <svg className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C30,60 70,80 100,20 L100,100 Z" fill="currentColor" />
        </svg>

        <div className="relative z-10">
          <h2 className="text-[16px] font-black tracking-tight mb-2 flex items-center gap-2">
            You're doing great! 🎉
          </h2>
          <p className="text-[12px] font-medium text-purple-100 mb-6 leading-relaxed max-w-[85%]">
            You're ahead of 78% of users who set similar goals.
          </p>
          
          <Link href="/analytics">
            <button className="bg-white text-[#6b46c1] px-4 py-2 rounded-xl text-[11px] font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              View Insights <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Goal Forecast Card */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative">
        <div className="flex items-center gap-1.5 mb-3">
          <h2 className="text-[14px] font-bold text-slate-900 tracking-tight">Goal Forecast</h2>
          <Info className="w-3.5 h-3.5 text-slate-400" />
        </div>
        
        <p className="text-[11px] font-semibold text-slate-500 mb-6 leading-relaxed">
          You will achieve {onTrackGoals} of your {goals.length} goals based on your current progress.
        </p>
        
        <div className="mb-2">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl font-black text-slate-900">{onTrackGoals}</span>
            <span className="text-[14px] font-bold text-slate-400">/ {goals.length}</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400">Goals likely to be achieved</p>
        </div>

        {/* Segmented Progress Bar */}
        <div className="flex gap-1 h-2 mt-3 mb-4">
          {Array.from({ length: goals.length }).map((_, i) => (
            <div key={i} className={`flex-1 rounded-full ${i < onTrackGoals ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
          ))}
        </div>

        <p className="text-[10px] font-bold text-slate-500">
          Keep going! You're on the right track.
        </p>
      </div>
    </div>
  );
}
