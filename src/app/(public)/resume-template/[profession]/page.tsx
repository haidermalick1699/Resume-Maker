import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROFESSIONS, getProfessionBySlug } from "@/data/professions";
import { getTemplateById } from "@/templates/registry";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  FileCheck2,
} from "lucide-react";

interface PageProps {
  params: { profession: string };
}

// Generate static params for all professions during Next.js build
export async function generateStaticParams() {
  return PROFESSIONS.map((p) => ({
    profession: p.slug,
  }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const prof = getProfessionBySlug(params.profession);
  if (!prof) return {};

  return {
    title: `${prof.name} Resume Template & Guide (Free Download) — Resume Maker`,
    description: prof.description,
    keywords: [
      `${prof.name} resume`,
      `${prof.name} CV template`,
      `${prof.name} ATS keywords`,
      `${prof.name} resume examples`,
      ...prof.targetKeywords,
    ],
    openGraph: {
      title: `${prof.name} Resume Template & ATS Guide — Resume Maker`,
      description: prof.description,
      type: "article",
    },
  };
}

export default function ProfessionLandingPage({ params }: PageProps) {
  const prof = getProfessionBySlug(params.profession);
  if (!prof) notFound();

  const recommendedTemplate = getTemplateById(prof.recommendedTemplateId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xs">
            RM
          </div>
          <span className="font-extrabold text-base text-slate-900 tracking-tight">Resume Maker</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-slate-900">
            Sign In
          </Link>
          <Link
            href={`/register?template=${recommendedTemplate.id}&role=${encodeURIComponent(prof.name)}`}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg shadow-xs"
          >
            Build {prof.name} Resume
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> {prof.category} Career Guide & ATS Template
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {prof.headline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {prof.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/register?template=${recommendedTemplate.id}&role=${encodeURIComponent(prof.name)}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-sm transition"
            >
              Use This {prof.name} Template Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-12">
        {/* Recommended Template Spotlight Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Recruiter Recommended Design
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              Template: {recommendedTemplate.name}
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mb-3">
              {recommendedTemplate.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3" /> 100% ATS Verified
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                Category: <strong className="capitalize text-slate-700">{recommendedTemplate.category}</strong>
              </span>
            </div>
          </div>

          <Link
            href={`/register?template=${recommendedTemplate.id}&role=${encodeURIComponent(prof.name)}`}
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition shadow-xs"
          >
            Customize in Editor
          </Link>
        </div>

        {/* High-Value ATS Keywords */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Target Keywords for {prof.name} Resumes
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Applicant Tracking Systems (ATS) scan for these exact technical and domain terms. Make sure relevant items appear in your summary and work experience.
          </p>

          <div className="flex flex-wrap gap-2">
            {prof.targetKeywords.map((kw, i) => (
              <span
                key={i}
                className="bg-blue-50/70 text-blue-800 border border-blue-200/60 font-medium text-xs px-3 py-1 rounded-lg"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>

        {/* Pre-Written Quantified Bullets */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            STAR Method Bullet Point Examples for {prof.name}
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Model your experience after these high-impact, metric-driven achievement statements:
          </p>

          <div className="space-y-3">
            {prof.suggestedBullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Role Specific FAQs */}
        {prof.faqs && prof.faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              {prof.name} Resume FAQs
            </h2>
            <div className="space-y-3">
              {prof.faqs.map((f, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <h3 className="font-bold text-slate-900 text-xs mb-1.5">{f.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

