import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base">
            R
          </div>
          <span className="font-extrabold text-base text-slate-900 tracking-tight">ResumeForge</span>
        </Link>
        <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-slate-900">
          Sign In
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Transparent, Predictable Pricing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Build your resume free forever, or upgrade for watermark-free exports and AI job tailoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-base font-bold text-slate-900 mb-1">Free Tier</div>
              <p className="text-xs text-slate-500 mb-4">
                Perfect for quickly drafting and testing your resume.
              </p>
              <div className="text-3xl font-black text-slate-900 mb-6">$0</div>

              <ul className="space-y-3 text-xs text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Full access to all 5 starter templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Real-time live preview editor
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Unlimited section reordering
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Standard PDF export (with watermark)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Auto-save and cloud storage
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Most Popular
            </div>

            <div>
              <div className="text-base font-bold text-slate-900 mb-1">Pro Member</div>
              <p className="text-xs text-slate-500 mb-4">
                Complete suite for serious job seekers and career transitions.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-black text-slate-900">$12</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> <strong>Zero Watermarks</strong> on PDF downloads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Access to all 10+ premium templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> AI Resume Bullet Rewriter & Optimizer
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> ATS Compatibility Scorecard & Suggestions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> DOCX and plain-text exports
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Unlimited version history
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition shadow-md"
            >
              Start 7-Day Free Trial
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

