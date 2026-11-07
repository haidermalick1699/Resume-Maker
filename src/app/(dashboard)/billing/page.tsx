"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Check, ShieldCheck, Sparkles, Loader2, ArrowLeft, CreditCard } from "lucide-react";

export default function BillingPage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("FREE");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setCurrentPlan((session.user as any).plan || "FREE");
    }
    if (typeof window !== "undefined" && window.location.search.includes("payment=success")) {
      setSuccessMessage(true);
    }
  }, [session]);

  const handleUpgrade = async (plan: "PRO_MONTHLY" | "PRO_ANNUAL") => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleManagePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const isPro = currentPlan === "PRO_MONTHLY" || currentPlan === "PRO_ANNUAL";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">
            Billing & Subscription
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center gap-3 text-emerald-800 text-xs font-semibold">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Payment Successful!</p>
              <p className="font-normal text-emerald-700">
                Your account has been upgraded to Pro. Watermarks have been removed from all resumes.
              </p>
            </div>
          </div>
        )}

        {/* Current Plan Overview Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Current Plan
            </span>
            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-2xl font-black text-slate-900">
                {isPro ? "Pro Membership" : "Free Plan"}
              </h2>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isPro
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {isPro ? "Active" : "Standard"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isPro
                ? "Full access to watermark-free PDF/DOCX exports and all 11 premium templates."
                : "Free tier with standard templates and watermarked PDF downloads."}
            </p>
          </div>

          {isPro ? (
            <button
              onClick={handleManagePortal}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-xs disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" /> Manage Subscription
            </button>
          ) : (
            <button
              onClick={() => handleUpgrade("PRO_MONTHLY")}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-sm disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Upgrade to Pro ($12/mo)
            </button>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Free Tier</h3>
              <p className="text-xs text-slate-500 mb-4">Basic resume drafting</p>
              <div className="text-2xl font-black text-slate-900 mb-6">$0</div>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Standard PDF download (watermarked)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Access to basic templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Live synchronized editor
                </li>
              </ul>
            </div>

            {!isPro && (
              <span className="text-center text-xs font-semibold text-slate-400 py-2">
                Current Plan
              </span>
            )}
          </div>

          {/* Pro Plan Details */}
          <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Recommended
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Pro Membership</h3>
              <p className="text-xs text-slate-500 mb-4">For active job seekers</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-black text-slate-900">$12</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> <strong>Zero Watermarks</strong> on all downloads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> All 11+ Executive & Creative templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Word Document (.docx) ATS export
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> AI Resume Optimizer & Keyword Matcher
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Unlimited resumes & version snapshots
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade("PRO_MONTHLY")}
              disabled={loading || isPro}
              className="w-full text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-2.5 rounded-xl transition shadow-xs"
            >
              {isPro ? "Plan Active" : "Upgrade to Pro"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

