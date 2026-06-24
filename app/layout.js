import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spendly",
  description: "One stop Finance Platform",
};

import { checkUser } from "@/lib/checkUser";

export default async function RootLayout({ children }) {
  await checkUser();
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

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
