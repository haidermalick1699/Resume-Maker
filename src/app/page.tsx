import React from "react";
import Link from "next/link";
import { TEMPLATES } from "@/templates/registry";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Layout,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Public Navbar */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
              R
            </div>
            <span className="font-black text-xl tracking-tight">ResumeForge</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/templates" className="hover:text-blue-600 transition">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-blue-600 transition">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition"
            >
              Build Resume Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> 100% Recruiter & ATS Approved Templates
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
          Build an <span className="text-blue-600 underline decoration-blue-200">Interview-Winning</span> Resume in Minutes.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Create polished, high-scoring resumes designed to pass through Applicant Tracking Systems (ATS). Edit in real-time, switch templates without data loss, and export to pixel-perfect PDF.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition"
          >
            Create My Resume Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/templates"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-xl transition"
          >
            Explore 5 Templates
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to start
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified ATS-compliant
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Engineered for Modern Job Searches
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to stand out from hundreds of competing applicants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                100% ATS Optimized
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured typography, standard headings, and clean parsing guarantee your resume is accurately indexed by Workday, Taleo, and Greenhouse.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Real-Time Live Preview
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                See your document update keystroke by keystroke. Customize margins, accent colors, and photo shapes with immediate visual feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Seamless Template Switching
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Swap between single-column, two-column, serif, and modern creative designs in one click without losing a single word of your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Handcrafted Professional Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose from modern tech-focused layouts, Ivy League classics, and high-impact designs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-base">{tmpl.name}</h3>
                  <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {tmpl.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">{tmpl.description}</p>
                <div className="flex flex-wrap gap-1 mb-6">
                  {tmpl.recommendedRoles.slice(0, 3).map((role, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/register"
                className="w-full text-center text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition"
              >
                Use This Template
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-black text-white text-base mb-3">ResumeForge</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              The intelligent, ATS-friendly resume and CV builder for ambitious career professionals.
            </p>
          </div>

          <div>
            <div className="font-bold text-white text-xs mb-3">Product</div>
            <ul className="space-y-2">
              <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing Plans</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white text-xs mb-3">Templates</div>
            <ul className="space-y-2">
              <li><Link href="/templates" className="hover:text-white transition">Modern Minimal</Link></li>
              <li><Link href="/templates" className="hover:text-white transition">ATS Standard</Link></li>
              <li><Link href="/templates" className="hover:text-white transition">Classic Ivy League</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white text-xs mb-3">Account</div>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-white transition">Create Account</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">My Resumes</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© {new Date().getFullYear()} ResumeForge. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/privacy#security" className="hover:text-white transition">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

