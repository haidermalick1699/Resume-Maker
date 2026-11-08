"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";

function RegisterRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const target = template ? `/dashboard?template=${encodeURIComponent(template)}` : "/dashboard";

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center max-w-sm w-full">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <h2 className="text-lg font-bold text-slate-800 mb-1">Welcome to Resume Maker!</h2>
        <p className="text-xs text-slate-500 mb-6">
          No registration required. Opening your builder workspace right now.
        </p>
        <Link
          href={target}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl transition"
        >
          <span>Continue to Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      }
    >
      <RegisterRedirectContent />
    </Suspense>
  );
}
