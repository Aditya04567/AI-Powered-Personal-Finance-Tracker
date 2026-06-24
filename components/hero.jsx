"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6 z-10">

          {/* Badge */}
          <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              AI-Powered Financial Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
            Clarity today. <br className="hidden md:block" />
            Better tomorrow.
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Track, analyze, and grow your money with intelligent automation and real-time insights.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-6 h-11 text-sm font-medium">
                Get started free <span className="ml-2">→</span>
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-lg px-6 h-11 text-sm font-medium border-slate-200 hover:bg-slate-50">
                <Play className="w-4 h-4 mr-2" />
                Watch demo
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/men/86.jpg" alt="User 3" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/women/91.jpg" alt="User 4" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-medium mt-0.5">4.9/5 from 2k+ users</span>
              </div>
            </div>
          </div>

          {/* Logos */}
          <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-40 grayscale">
            <span className="font-serif text-xl font-bold">Forbes</span>
            <span className="font-sans text-xl font-bold tracking-tighter">TC<span className="font-normal text-sm ml-1 tracking-normal">TechCrunch</span></span>
            <span className="font-serif text-2xl font-bold">WSJ</span>
            <span className="font-sans text-xl font-bold">Bloomberg</span>
          </div>

        </div>

        {/* Right Content - Mockup */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="relative">
            {/* Soft decorative background shadow */}
            <div className="absolute inset-0 bg-slate-200/50 rounded-3xl blur-3xl transform translate-y-8"></div>
            <Image
              src="/banner.png"
              width={1000}
              height={800}
              alt="Dashboard Preview"
              className="w-full h-auto relative rounded-2xl shadow-2xl border border-slate-100 object-cover bg-white"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
