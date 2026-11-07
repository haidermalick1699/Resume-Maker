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
  FileText,
  FileImage,
  Layers,
  Bot,
  Target,
  Palette,
  Check,
  Award,
  Lock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const featuredTemplates = TEMPLATES.slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Ambient background glow at the top */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />

      {/* Public Navbar */}
      <header className="border-b border-slate-200/80 sticky top-0 bg-white/85 backdrop-blur-md z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              RM
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Resume Maker
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <Link href="/templates" className="hover:text-blue-600 transition-colors">
              Templates
            </Link>
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98"
            >
              Build Resume Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto text-center relative">
        {/* Shiny Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-2xs hover:bg-blue-100/70 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>Next-Gen AI Resume & CV Builder • 100% Recruiter Approved</span>
        </div>

        {/* Main Hero Heading - Clean, Modern Gradient, ZERO UNDERLINES */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto">
          Build an{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Interview-Winning
          </span>{" "}
          Resume in Minutes
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-9 leading-relaxed">
          Create polished, high-scoring resumes engineered to pass through Applicant Tracking Systems (ATS). Edit with real-time live preview, tailor to any job description with Claude AI, and download as pixel-perfect PDF and Word (.docx).
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <Link
            href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <span>Create My Resume Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/templates"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-2xs transition-all"
          >
            <span>Browse 10 Templates</span>
          </Link>
        </div>

        {/* Social Proof & Trust Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Free to Start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Direct PDF & Word Downloads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>ATS Compatibility Verified</span>
          </div>
        </div>

        {/* Hero Interactive Showcase Card (Elevated Resume Mockup) */}
        <div className="mt-14 relative max-w-4xl mx-auto">
          {/* Decorative ambient aura behind the mockup */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-75" />

          {/* Elevated Product Card */}
          <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-4 sm:p-7 overflow-hidden text-left">
            {/* Top Toolbar simulation */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
                  resumemaker.com/editor/live-preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-lg text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 98/100 ATS Score
                </span>
                <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-lg text-[11px] flex items-center gap-1">
                  <Download className="w-3 h-3 text-blue-600" /> PDF & DOCX Ready
                </span>
              </div>
            </div>

            {/* Resume Content Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/60">
              {/* Left Column (Main experience) */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">ALEX STERLING</h3>
                    <span className="text-xs text-blue-600 font-bold">San Francisco, CA</span>
                  </div>
                  <p className="text-xs font-semibold text-blue-600">Senior Full-Stack Architect</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Results-driven architect with 8+ years experience designing mission-critical distributed systems. Led cloud modernization processing 12M+ daily events with 99.99% uptime.
                  </p>
                </div>

                {/* Simulated Experience item */}
                <div className="border-t border-slate-200/80 pt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">Lead Cloud Architect • Vanguard Cloud</span>
                    <span className="text-slate-400 font-mono text-[10px]">2021 – Present</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 mt-1.5 space-y-1 list-disc list-inside">
                    <li>Architected real-time event streaming cluster reducing p99 latency by 42%.</li>
                    <li>Mentored 14 engineers and drove 100% test coverage across microservices.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column (Skills & Highlights) */}
              <div className="border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-5 space-y-3.5">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Core Competencies
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["TypeScript", "React", "Next.js", "Node.js", "Go", "Kubernetes", "AWS", "PostgreSQL"].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-md shadow-2xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Education & Certs
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">B.S. in Computer Science</div>
                  <div className="text-[10px] text-slate-500">UC Berkeley • 3.9 GPA</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">✓ AWS Solutions Architect Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-400 tracking-tight">10,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Resumes Created</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">3.5x</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">More Interview Invites</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-purple-400 tracking-tight">98%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Average ATS Pass Rate</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Vector PDF & Word Accuracy</div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 bg-slate-50/70">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - NO UNDERLINE */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
              Engineered for Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-3">
              Everything You Need to Get Hired Faster
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Powerful technology built to satisfy both automated ATS robots and human recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 1-Click Multi-Format Export */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Direct PDF & Word Exports</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Download your resume directly to your device as a crisp 300-DPI vector PDF, editable Microsoft Word (.docx), or high-res PNG image.
              </p>
              <div className="flex gap-1.5 text-[10px] font-bold text-slate-500">
                <span className="px-2 py-0.5 bg-slate-100 rounded">PDF</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded">DOCX</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded">PNG</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded">TXT</span>
              </div>
            </div>

            {/* Card 2: 100% ATS Optimized */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">100% ATS-Compliant</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Structured typography, standard section titles, and selectable text guarantee clean parsing by Workday, Taleo, Greenhouse, and Lever.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" /> Zero parsing errors guaranteed
              </div>
            </div>

            {/* Card 3: Claude AI Copilot */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition group">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Claude AI Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Generate impactful professional summaries, transform weak job bullets with quantifiable metrics, and tailor keywords for target jobs.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-purple-600 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Powered by Claude AI
              </div>
            </div>

            {/* Card 4: Real-Time Live Preview */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Real-Time Live Preview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Watch your resume render keystroke by keystroke. Instant zoom controls, A4 and US Letter page toggles, and live multi-page calculation.
              </p>
            </div>

            {/* Card 5: Effortless Template Switching */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Instant Template Switching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch between modern tech, Ivy League academic, and executive corporate layouts with 1 click without losing a single line of your data.
              </p>
            </div>

            {/* Card 6: Job Description Tailoring */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition group">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Targeted Job Tailoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste any job posting to immediately detect missing keywords, match requirements, and boost your ATS relevance score before applying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Section Header - NO UNDERLINE */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-3">
            How Resume Maker Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From blank page to interview-ready application in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Pick a Template</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select from 10 professionally formatted, ATS-verified template designs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Add Your Experience</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fill out your details with live preview or auto-enhance with AI assistance.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Run ATS Audit</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Check your ATS score and tailor keywords directly to your target job role.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">Download PDF & Word</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Save your resume as a pristine PDF or DOCX file ready for instant application.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Template Showcase */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - NO UNDERLINE */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
                Recruiter Calibrated
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                Handcrafted Resume Templates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Engineered for maximum readability, ATS score, and executive presence.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition self-start md:self-auto"
            >
              <span>View All 10 Templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {tmpl.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {tmpl.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-6">
                    {tmpl.recommendedRoles.slice(0, 3).map((role, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/register"
                  className="w-full text-center text-xs font-bold text-blue-600 group-hover:text-white bg-blue-50 group-hover:bg-blue-600 py-3 rounded-xl transition-all shadow-2xs"
                >
                  Use This Template →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Section Header - NO UNDERLINE */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Loved by Job Seekers & Hiring Managers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real feedback from professionals who accelerated their careers with Resume Maker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              “I went from sending 50 applications with zero callbacks to landing 4 interview invites in 10 days. The ATS audit highlighted 5 missing technical keywords in seconds.”
            </p>
            <div>
              <div className="font-bold text-xs text-slate-900">David M.</div>
              <div className="text-[11px] text-slate-400">Senior Software Engineer at Fintech</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              “The direct PDF and Word exports match the live preview pixel-for-pixel. Recruiter feedback praised the clean formatting and readable structure.”
            </p>
            <div>
              <div className="font-bold text-xs text-slate-900">Sarah L.</div>
              <div className="text-[11px] text-slate-400">Principal Product Manager</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              “Being able to switch templates without losing data saved me hours. The AI bullet point enhancer gave my accomplishments measurable impact.”
            </p>
            <div>
              <div className="font-bold text-xs text-slate-900">Marcus K.</div>
              <div className="text-[11px] text-slate-400">Cloud Infrastructure Lead</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white rounded-3xl p-8 sm:p-14 text-center shadow-xl relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Header - NO UNDERLINE */}
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 mb-8 leading-relaxed">
              Join thousands of job seekers creating interview-winning resumes today. 100% free to start with instant PDF and Word download.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-blue-700 font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-98"
              >
                Create My Resume Free Now →
              </Link>
            </div>
            <p className="text-xs text-blue-200 mt-4">
              No credit card required • Instant access in 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs py-14 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="font-black text-white text-base mb-3 flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                RM
              </div>
              Resume Maker
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              The intelligent, ATS-friendly resume and CV builder for ambitious career professionals.
            </p>
          </div>

          <div>
            <div className="font-bold text-white text-xs mb-3">Product</div>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white text-xs mb-3">Popular Formats</div>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Modern Minimal
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Classic ATS Standard
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Classic Ivy League
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Modern Sidebar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white text-xs mb-3">Account</div>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Create Free Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  My Resumes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© {new Date().getFullYear()} Resume Maker. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy#security" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
