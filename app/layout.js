import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spendly",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.ico" sizes="any" />
        </head>
        <body className={`${inter.className}`} suppressHydrationWarning>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* New Footer Matching Design */}
          <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                {/* Logo Column */}
                <div className="lg:col-span-2">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Image
                      src={"/logo.png"}
                      alt="Spendly Logo"
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                  <p className="text-xs text-slate-500 font-medium">
                    © {new Date().getFullYear()} Spendly. All rights reserved.
                  </p>
                </div>

                {/* Product Column */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-6 tracking-wider">Product</h4>
                  <ul className="space-y-4">
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Features</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Pricing</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Security</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Integrations</Link></li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-6 tracking-wider">Resources</h4>
                  <ul className="space-y-4">
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Blog</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Help Center</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Guides</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">API Documentation</Link></li>
                  </ul>
                </div>

                {/* Company & Social Column */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-6 tracking-wider">Company</h4>
                  <ul className="space-y-4 mb-8">
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">About Us</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Careers</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Press</Link></li>
                    <li><Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">Contact</Link></li>
                  </ul>

                  <h4 className="text-xs font-bold text-slate-900 mb-4 tracking-wider">Follow us</h4>
                  <div className="flex gap-4">
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                      <Twitter className="w-4 h-4 fill-current" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                      <Linkedin className="w-4 h-4 fill-current" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                      <Facebook className="w-4 h-4 fill-current" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
