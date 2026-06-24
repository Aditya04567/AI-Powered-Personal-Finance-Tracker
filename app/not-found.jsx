import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl" />
      </div>

      <div className="animate-fade-in-up">
        <div className="text-[140px] md:text-[180px] font-black leading-none bg-gradient-to-br from-violet-600 to-blue-600 bg-clip-text text-transparent mb-2">
          404
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-violet-200/50 h-11 px-6">
              <Home className="mr-2 w-4 h-4" />
              Return Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-xl border-slate-200 h-11 px-6"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
