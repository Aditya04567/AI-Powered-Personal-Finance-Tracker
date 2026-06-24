"use client";

import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      icon: TrendingUp,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      text: "You spent 15% more on Food & Dining than last month.",
    },
    {
      icon: AlertTriangle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      text: "Your Entertainment budget is 60% used. Plan ahead!",
    },
    {
      icon: Lightbulb,
      iconBg: "bg-purple-100",
      iconColor: "text-[#6b46c1]",
      text: "Great job! You saved $200 more than last month.",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <SparklesIcon className="w-5 h-5 text-[#6b46c1]" />
        <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Insights</h2>
      </div>

      <div className="space-y-4 flex-1">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full ${insight.iconBg} ${insight.iconColor} flex items-center justify-center shrink-0`}>
              <insight.icon className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed mt-0.5">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1">
          View All Insights <span>→</span>
        </button>
      </div>
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
