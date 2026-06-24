import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { featuresData, testimonialsData } from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { 
  ShieldCheck, 
  BrainCircuit, 
  RefreshCw, 
  Lock,
  Smartphone,
  CheckCircle2,
  BarChart3,
  PieChart,
  ArrowRight
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Strip */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Bank-level security</div>
                <div className="text-xs text-slate-500">256-bit SSL encryption</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <BrainCircuit className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">AI-powered insights</div>
                <div className="text-xs text-slate-500">Smart analysis & tips</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Real-time sync</div>
                <div className="text-xs text-slate-500">Automatically updated</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Lock className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Privacy first</div>
                <div className="text-xs text-slate-500">Your data, your control</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block bg-[#fff8f1] rounded-full px-5 py-1.5 mb-4">
              <span className="text-xs font-bold tracking-[0.15em] text-[#b35928] uppercase">
                POWERFUL FEATURES
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
              Everything you need, all in one place.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Spendly brings all your financial data together <br className="hidden md:block" /> so you can focus on what matters most.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 mt-16">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6 justify-center">
              <div className="bg-white rounded-3xl p-6 xl:p-8 flex gap-5 transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 items-start">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-6 h-6 text-indigo-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base xl:text-lg font-bold text-slate-900 mb-2">AI Insights</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Get personalized insights and smart recommendations.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 xl:p-8 flex gap-5 transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-blue-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base xl:text-lg font-bold text-slate-900 mb-2">Budget Tracking</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Create budgets and track your progress in real time.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Column (Mobile First) */}
            <div className="flex-[2] bg-[#f9fafb] rounded-[2rem] overflow-hidden relative flex flex-col sm:flex-row items-stretch transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60">
              
              {/* Phone Mockup (Left Side) */}
              <div className="flex-[1.1] w-full flex justify-center items-end self-stretch pt-12 px-2 relative h-full min-h-[400px]">
                <div className="w-full max-w-[260px] bg-white border-[6px] border-slate-900 rounded-t-[2.5rem] shadow-xl relative z-10 translate-y-4">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-5 bg-slate-900 rounded-b-xl z-20"></div>
                  {/* Screen Content */}
                  <div className="p-4 pt-10 h-[380px] overflow-hidden flex flex-col font-sans">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-4 h-4 rounded bg-slate-100"></div>
                      <div className="text-[10px] font-bold text-slate-900">Overview</div>
                      <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                    </div>
                    <div className="mb-6">
                      <div className="text-[9px] text-slate-500 font-medium">Total Balance</div>
                      <div className="text-2xl font-bold text-slate-900 leading-tight">$5,200</div>
                      <div className="text-[8px] text-emerald-500 font-medium">+12.5% from last month</div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[9px] font-bold text-slate-800">Overview</div>
                      <div className="text-[8px] text-slate-500">This month ˅</div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between mb-6">
                      <div className="text-sm font-bold text-slate-800">03,200</div>
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] font-bold text-slate-700">80%</div>
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-blue-500 border-r-blue-500 rotate-45"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[9px] font-bold text-slate-800">Transactions</div>
                      <div className="text-[8px] text-slate-500">˅</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[6px] text-blue-600">🏠</div>
                          <div className="text-[9px] font-bold text-slate-700">Housing</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-[8px] text-slate-400">40%</div>
                          <div className="text-[9px] font-bold text-slate-800">$1,280</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-[6px] text-orange-600">🍔</div>
                          <div className="text-[9px] font-bold text-slate-700">Food</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-[8px] text-slate-400">20%</div>
                          <div className="text-[9px] font-bold text-slate-800">$640</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Nav */}
                  <div className="absolute bottom-0 w-full h-12 bg-white/90 backdrop-blur-md border-t border-slate-100 flex items-center justify-around px-4 pb-2 z-30">
                    <div className="flex flex-col items-center gap-0.5 text-blue-600"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div><div className="text-[6px] font-bold">Overview</div></div>
                    <div className="flex flex-col items-center gap-0.5 text-slate-400"><div className="w-3 h-3 border-2 border-slate-400 rounded-sm"></div><div className="text-[6px] font-bold">Transactions</div></div>
                    <div className="flex flex-col items-center gap-0.5 text-slate-400"><div className="w-3 h-3 border-2 border-slate-400 rounded-full"></div><div className="text-[6px] font-bold">Budget</div></div>
                  </div>
                </div>
              </div>
              
              {/* Text Content (Right Side) */}
              <div className="flex-1 w-full text-left py-10 px-6 sm:px-8 z-10 flex flex-col justify-center">
                <h3 className="text-xl xl:text-2xl font-bold text-slate-900 mb-3">Mobile First</h3>
                <p className="text-slate-600 text-sm xl:text-base mb-8 max-w-[280px] font-medium leading-relaxed">
                  Manage your finances on the go with our mobile app.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900"><polyline points="20 6 9 17 4 12"></polyline></svg> Real-time notifications
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900"><polyline points="20 6 9 17 4 12"></polyline></svg> Receipt scanning
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900"><polyline points="20 6 9 17 4 12"></polyline></svg> Quick transactions
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-2 text-sm font-bold text-[#1a56db] cursor-pointer hover:text-blue-800 transition-colors">
                  Learn more <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6 justify-center">
              <div className="bg-white rounded-3xl p-6 xl:p-8 flex gap-5 transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <PieChart className="w-6 h-6 text-blue-700" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base xl:text-lg font-bold text-slate-900 mb-2">Smart Categories</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    AI automatically categorizes your transactions.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 xl:p-8 flex gap-5 transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 items-start">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base xl:text-lg font-bold text-slate-900 mb-2">Reports & Analytics</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Visualize your spending and make better decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Analytics Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-[#f9fafb] border border-slate-100/60 rounded-[2.5rem] p-8 lg:p-12 xl:p-16 flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center lg:max-w-[280px]">
              <div>
                <div className="inline-block bg-[#fff8f1] rounded-md px-3 py-1 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#b35928] uppercase">
                    SMART ANALYTICS
                  </span>
                </div>
                <h2 className="text-3xl xl:text-4xl font-semibold text-slate-900 leading-[1.1] tracking-tight mb-4">
                  Understand your money like never before.
                </h2>
                <p className="text-sm xl:text-base text-slate-600 font-medium leading-relaxed mb-10">
                  Advanced analytics and beautiful visualizations help you make informed financial decisions.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-colors">
                  Explore all reports <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Right Content - Cards Grid */}
            <div className="flex-[3] w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Cash Flow */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 flex flex-col">
                <p className="text-xs font-bold text-slate-700 mb-2">Cash Flow</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">$5,200</p>
                <p className="text-[10px] font-bold text-emerald-500 mb-8">+12% from last month</p>
                
                <div className="flex items-end justify-between h-32 gap-1.5 mt-auto">
                  <div className="flex gap-0.5 items-end h-full">
                    <div className="w-2.5 bg-[#93c5fd] rounded-t-sm h-[40%]"></div>
                    <div className="w-2.5 bg-[#2563eb] rounded-t-sm h-[30%]"></div>
                  </div>
                  <div className="flex gap-0.5 items-end h-full">
                    <div className="w-2.5 bg-[#93c5fd] rounded-t-sm h-[70%]"></div>
                    <div className="w-2.5 bg-[#2563eb] rounded-t-sm h-[60%]"></div>
                  </div>
                  <div className="flex gap-0.5 items-end h-full">
                    <div className="w-2.5 bg-[#93c5fd] rounded-t-sm h-[20%]"></div>
                    <div className="w-2.5 bg-[#2563eb] rounded-t-sm h-[80%]"></div>
                  </div>
                  <div className="flex gap-0.5 items-end h-full">
                    <div className="w-2.5 bg-[#93c5fd] rounded-t-sm h-[50%]"></div>
                    <div className="w-2.5 bg-[#2563eb] rounded-t-sm h-[40%]"></div>
                  </div>
                  <div className="flex gap-0.5 items-end h-full">
                    <div className="w-2.5 bg-[#93c5fd] rounded-t-sm h-[90%]"></div>
                    <div className="w-2.5 bg-[#2563eb] rounded-t-sm h-[80%]"></div>
                  </div>
                  <div className="flex gap-0.5 items-end h-full">
                    <div className="w-2.5 bg-[#93c5fd] rounded-t-sm h-[30%]"></div>
                    <div className="w-2.5 bg-[#2563eb] rounded-t-sm h-[40%]"></div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-6 text-[9px] font-bold text-slate-500">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>Income</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#93c5fd]"></div>Expenses</div>
                </div>
              </div>

              {/* Card 2: Net Worth */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 flex flex-col">
                <p className="text-xs font-bold text-slate-700 mb-2">Net Worth</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">$24,500</p>
                <p className="text-[10px] font-bold text-emerald-500 mb-8">+8.5% from last month</p>
                
                <div className="h-32 w-full relative mt-auto pr-2 pb-2">
                  <svg className="absolute inset-0 h-[85%] w-[95%] left-[5%] top-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,90 C15,80 20,70 30,70 C40,70 45,60 55,50 C65,40 70,30 85,20 C90,15 95,10 100,5 L100,100 L0,100 Z" fill="url(#gradient)" />
                    <path d="M0,90 C15,80 20,70 30,70 C40,70 45,60 55,50 C65,40 70,30 85,20 C90,15 95,10 100,5" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute left-0 bottom-6 text-[8px] font-medium text-slate-400 flex flex-col justify-between h-[85%]">
                    <span>$25K</span>
                    <span>$20K</span>
                    <span>$15K</span>
                    <span>$10K</span>
                    <span>$5K</span>
                  </div>
                  <div className="absolute bottom-0 left-[5%] w-[95%] flex justify-between text-[8px] font-medium text-slate-400">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Top Spending */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 flex flex-col">
                <p className="text-xs font-bold text-slate-700 mb-2">Top Spending Category</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">$1,280</p>
                <p className="text-[10px] font-bold text-emerald-500 mb-8">+15% from last month</p>
                
                <div className="flex-1 flex items-center justify-between mt-auto">
                  {/* CSS Donut */}
                  <div className="w-24 h-24 rounded-full border-[8px] border-slate-100 relative shrink-0">
                    <div className="absolute inset-[-8px] rounded-full border-[8px] border-[#3b82f6] border-r-transparent border-b-transparent -rotate-45"></div>
                    <div className="absolute inset-[-8px] rounded-full border-[8px] border-[#93c5fd] border-l-transparent border-t-transparent border-r-transparent rotate-45"></div>
                    <div className="absolute inset-[-8px] rounded-full border-[8px] border-[#eab308] border-l-transparent border-b-transparent border-t-transparent -rotate-12"></div>
                    <div className="absolute inset-[-8px] rounded-full border-[8px] border-[#fde047] border-l-transparent border-b-transparent border-r-transparent rotate-180"></div>
                  </div>
                  
                  <div className="flex flex-col justify-center gap-3">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div><span className="text-[10px] font-bold text-slate-600">Housing</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#93c5fd]"></div><span className="text-[10px] font-bold text-slate-600">Food</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400"></div><span className="text-[10px] font-bold text-slate-600">Transport</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#eab308]"></div><span className="text-[10px] font-bold text-slate-600">Shopping</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="text-[10px] font-bold text-slate-600">Other</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 space-y-4">
            <div className="inline-block bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 mb-2">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                TRUSTED BY THOUSANDS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
              What our users say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-8 flex-1">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full bg-slate-100"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 pb-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <RefreshCw className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  Ready to take control of your finances?
                </h2>
                <p className="text-slate-500 text-sm">
                  Join thousands of users who are already building a better financial future.
                </p>
              </div>
            </div>
            <Link href="/dashboard" className="shrink-0">
              <Button
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-8 h-12 text-base font-medium whitespace-nowrap"
              >
                Start your free trial <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
