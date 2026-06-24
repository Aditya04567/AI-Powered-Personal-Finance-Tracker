"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans flex-col lg:flex-row overflow-hidden">
      {/* Mobile Navigation Header */}
      <MobileNav />
      
      {/* Desktop Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-10 transition-all duration-300 ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[250px]"}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
