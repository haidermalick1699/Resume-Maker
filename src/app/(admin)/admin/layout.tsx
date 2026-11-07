import React from "react";
import Link from "next/link";
import { Users, LayoutDashboard, ShieldCheck, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Admin Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
            title="Back to App"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-extrabold text-base tracking-tight text-white">
              Resume Maker Operations Portal
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white transition"
          >
            User App
          </Link>
          <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono text-[10px]">
            ADMIN
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}

