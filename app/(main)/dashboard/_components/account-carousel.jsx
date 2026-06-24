"use client";

import { useRef, useState, useEffect } from "react";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AccountCard } from "./account-card";

export function AccountCarousel({ accounts }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Allow a small buffer for precision errors
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [accounts]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-8 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-1 bg-[#6b46c1] rounded-full"></div>
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">Your Accounts</h2>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Left Scroll Button */}
        <button 
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`shrink-0 w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm transition-all mb-4 ${
            canScrollLeft ? "hover:bg-slate-50 cursor-pointer" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-4 overflow-x-auto pb-4 hide-scrollbar flex-1 scroll-smooth"
        >
          <Link href="/account/create" className="shrink-0 block">
            <div className="w-[260px] h-[100px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-[#6b46c1] hover:border-[#6b46c1] hover:bg-slate-50 transition-all bg-white cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-[#6b46c1] flex items-center justify-center mb-1.5">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold">Add New Account</span>
            </div>
          </Link>
          
          {accounts?.map((account, index) => (
            <AccountCard key={account.id} account={account} index={index} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`shrink-0 w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm transition-all mb-4 ${
            canScrollRight ? "hover:bg-slate-50 cursor-pointer" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
