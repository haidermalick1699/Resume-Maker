import React from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "Will my resume pass Applicant Tracking Systems (ATS)?",
    a: "Yes. Our templates are specifically formatted according to industry ATS standards. They use machine-readable typography, standard heading hierachies (EXPERIENCE, EDUCATION, SKILLS), and parseable date formats to ensure systems like Workday, Greenhouse, and Taleo extract your information without errors.",
  },
  {
    q: "Can I download my resume as a PDF for free?",
    a: "Yes! Free accounts can create and export resumes as PDF anytime. The free version includes a discreet watermark at the bottom of the page, which can be removed with any Pro plan.",
  },
  {
    q: "Will I lose my information if I change templates?",
    a: "No. Unlike older builders that lock your text into template blocks, Resume Maker uses a decoupled data architecture. When you switch templates, your resume data automatically reformats into the new design without any data loss.",
  },
  {
    q: "Can I customize colors, fonts, and margins?",
    a: "Absolutely. In the 'Design & Formatting' tab in the editor, you can change the accent color, switch between serif and sans-serif fonts, adjust page margins (compact, normal, spacious), and toggle photo shapes.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xs">
            RM
          </div>
          <span className="font-extrabold text-base text-slate-900 tracking-tight">Resume Maker</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition"
        >
          Go to Workspace
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Common questions regarding ATS compatibility, template switching, and exports.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-2">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

