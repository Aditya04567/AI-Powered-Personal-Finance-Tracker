"use client";

import { Download } from "lucide-react";

export function DownloadReportButton({ transactions = [] }) {
  return (
    <button 
      onClick={() => window.print()}
      className="bg-[#6b46c1] text-white rounded-xl px-5 h-10 text-[12px] font-bold shadow-sm flex items-center gap-2 hover:bg-[#553c9a] transition-all print:hidden active:scale-95"
    >
      <Download className="w-4 h-4" />
      Download Full PDF
    </button>
  );
}
