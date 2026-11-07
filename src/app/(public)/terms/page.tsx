import { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle, AlertTriangle, CreditCard, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ResumeForge",
  description: "Terms and conditions for using ResumeForge's resume builder and AI career tools.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
              <p className="text-sm text-slate-400">Effective Date: November 2026</p>
            </div>
          </div>
          <p className="text-base text-slate-300 leading-relaxed">
            Please review these terms carefully before creating resumes or using our AI-powered career tools.
          </p>
        </div>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" /> 1. Intellectual Property & Resume Ownership
            </h2>
            <p>
              You own all intellectual property rights to the content, text, employment histories, and information you input into ResumeForge.
              ResumeForge retains the intellectual property rights to the underlying template designs, software code, UI components, and export engines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" /> 2. Subscriptions & Billing
            </h2>
            <p className="mb-2">
              ResumeForge offers Free, Pro Monthly, and Pro Annual plans.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong>Free Plan:</strong> Includes unlimited standard editing, basic ATS scanning, and watermark exports.</li>
              <li><strong>Pro Plans:</strong> Remove watermarks, unlock unlimited AI generations, full ATS keyword diagnostics, and DOCX exports.</li>
              <li><strong>Cancellations:</strong> You can cancel your subscription at any time via the Customer Billing Portal. Access remains active through the end of your billing cycle.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> 3. Fair Use & AI Generation Limits
            </h2>
            <p>
              Users agree not to abuse automated bots, reverse engineer API endpoints, or generate misleading or fraudulent resume credentials.
              AI token allocations are designed for personal career optimization. Automated bulk scraping or resale of generated materials is strictly prohibited.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-2">Questions Regarding Terms</h3>
            <p className="text-slate-400">
              Contact legal compliance at <a href="mailto:legal@resumeforge.com" className="text-cyan-400 underline">legal@resumeforge.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
