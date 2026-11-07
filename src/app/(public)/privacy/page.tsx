import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, Download, Trash2, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Resume Maker",
  description: "Learn how Resume Maker protects your personal data, resume content, and AI processing privacy.",
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
              <p className="text-sm text-slate-400">Last updated: November 2026</p>
            </div>
          </div>
          <p className="text-base text-slate-300 leading-relaxed">
            At Resume Maker, your privacy is our top priority. We believe your career data belongs strictly to you.
            This policy outlines how we collect, store, safeguard, and respect your personal information.
          </p>
        </div>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" /> 1. Data We Collect
            </h2>
            <p className="mb-2">We collect only information necessary to build and optimize your resumes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong>Account Credentials:</strong> Name, email address, and encrypted hashed passwords.</li>
              <li><strong>Resume Content:</strong> Employment history, education, skills, contact info, and custom sections you input.</li>
              <li><strong>Job Tailoring Inputs:</strong> Job descriptions pasted into the editor for AI keyword matching and score generation.</li>
              <li><strong>Usage Analytics:</strong> Anonymized performance telemetry and error reporting to optimize platform speed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" /> 2. AI Processing & Third-Party Protection
            </h2>
            <p className="mb-2">
              Resume Maker utilizes Anthropic Claude API for AI summary generation, bullet point improvement, and ATS auditing:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>Your inputs are transmitted securely via TLS 1.3 encryption.</li>
              <li>Anthropic does not train their base language models on customer data sent via the commercial API.</li>
              <li>We never sell your resume information to job boards, recruiters, or data brokers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Download className="w-5 h-5 text-cyan-400" /> 3. Data Portability (GDPR & CCPA)
            </h2>
            <p>
              Under global data privacy laws including GDPR and CCPA, you retain full ownership of your data.
              You can download a complete, unencrypted JSON archive of all your resumes, tailored jobs, and account metrics
              at any time via our automated export API.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" /> 4. Right to Erasure
            </h2>
            <p>
              You have the permanent right to be forgotten. Requesting account deletion permanently wipes your account,
              stored resumes, version histories, and tailoring records from our production databases immediately.
            </p>
          </section>

          <section className="pt-6 border-t border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-2">Contact Privacy Operations</h3>
            <p className="text-slate-400">
              For any questions regarding your data or to submit a compliance inquiry, email our Data Protection Officer at{" "}
              <a href="mailto:privacy@resumemaker.com" className="text-cyan-400 underline">privacy@resumemaker.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

