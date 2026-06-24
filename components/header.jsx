import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Spendly Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Middle: Links removed for cleaner look */}
        <div className="hidden md:flex items-center space-x-8">
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-900"
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg">
                <PenBox size={18} className="mr-2" />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="ghost" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Log in
              </Button>
            </SignInButton>
            <Link href="/dashboard">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-6 py-2 h-auto text-sm font-medium">
                Get started
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
