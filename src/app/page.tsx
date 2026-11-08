"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileText,
  FileCheck2,
  Bot,
  Layers,
  Check,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const ctaLink = "/dashboard";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle top ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.15),rgba(99,102,241,0.06),rgba(255,255,255,0))] pointer-events-none -z-10" />

      {/* Clean Navbar with Direct Access & High Standard Branding */}
      <header className="border-b border-slate-200/80 sticky top-0 bg-white/85 backdrop-blur-lg z-40 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" href="/" />

          {/* Functional Navigation */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/templates" className="hover:text-blue-600 transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Direct Workspace Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-98 flex items-center gap-1.5"
            >
              <span>Build Resume Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        {/* Recruiter Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>100% Recruiter & ATS Approved Resume Builder</span>
        </div>

        {/* Hero Headline - Clean, Modern Gradient, ZERO UNDERLINES */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] mb-5">
          Build an{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Interview-Winning
          </span>{" "}
          Resume in Minutes
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Create polished, high-scoring resumes engineered to pass Applicant Tracking Systems (ATS). Edit with live real-time preview and download directly as PDF or Word (.docx).
        </p>

        {/* Functional Hero Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
          <Link
            href={ctaLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base px-7 py-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98"
          >
            <span>Create My Resume Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/templates"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-sm sm:text-base px-6 py-3 rounded-xl shadow-2xs transition-all"
          >
            <span>Explore Templates</span>
          </Link>
        </div>

        {/* Functional Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Free to start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Instant PDF & Word download</span>
          </div>
        </div>

        {/* Compact Resume Preview Card */}
        <div className="mt-10 bg-slate-50/80 rounded-2xl border border-slate-200 p-4 sm:p-6 text-left shadow-md max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-400 font-mono text-[11px] ml-1">Live Resume Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> 98/100 ATS Score
              </span>
              <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded text-[11px] flex items-center gap-1">
                <Download className="w-3 h-3 text-blue-600" /> Direct PDF & DOCX
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-base font-black text-slate-900 tracking-tight">ALEX STERLING</div>
                <div className="text-xs font-semibold text-blue-600">Senior Full-Stack Architect</div>
              </div>
              <div className="text-[11px] text-slate-500 text-right">
                alex@example.com • San Francisco, CA
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
              Results-driven software architect with 8+ years designing scalable cloud architectures and reactive web applications. Led enterprise migration handling 12M+ daily events with 99.99% uptime.
            </p>
          </div>
        </div>
      </section>

      {/* Steps to Make Resume Section */}
      <section className="py-14 px-4 sm:px-6 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto">
          {/* Section Header - NO UNDERLINE */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Quick & Easy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5 mb-2">
              4 Steps to Make Your Resume
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Follow these simple steps to build and download your interview-ready resume.
            </p>
          </div>

          {/* The 4 Steps Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                  Choose a Template
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Select from 10 recruiter-tested templates: Modern Minimal, ATS Standard, Executive, and Academic.
                </p>
              </div>
              <Link
                href="/templates"
                className="w-full text-center text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-xl transition flex items-center justify-center gap-1"
              >
                <span>View Templates</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                  Add Your Experience
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Enter your work, education, and skills. Use built-in AI to craft high-impact bullet points and summaries.
                </p>
              </div>
              <Link
                href={ctaLink}
                className="w-full text-center text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-xl transition flex items-center justify-center gap-1"
              >
                <span>Start Editing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                  Audit with ATS & Tailor
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Run the 1-click ATS scan to detect missing keywords, fix formatting issues, and tailor to job descriptions.
                </p>
              </div>
              <Link
                href={ctaLink}
                className="w-full text-center text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 py-2 rounded-xl transition flex items-center justify-center gap-1"
              >
                <span>Check ATS Score</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                  Download PDF & Word
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Directly save your resume to your device as a vector PDF, editable Word (.docx), or high-res PNG image.
                </p>
              </div>
              <Link
                href={ctaLink}
                className="w-full text-center text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 py-2 rounded-xl transition flex items-center justify-center gap-1"
              >
                <span>Download Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Call to Action Banner */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-white">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto mb-6">
            Get started in under a minute. Free to create, edit, and download.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={ctaLink}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow transition active:scale-98"
            >
              Start Building Free Now →
            </Link>
            <Link
              href="/templates"
              className="w-full sm:w-auto bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-blue-400/40 transition"
            >
              Browse 10 Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Compact Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2.5 text-slate-300 font-bold">
            <Logo size="sm" showText={false} />
            <span>Resume Maker • © {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <Link href="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
