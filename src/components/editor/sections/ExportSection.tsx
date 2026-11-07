"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { exportResumeToPdf, exportResumeToPng } from "@/lib/pdf-export";
import {
  Download,
  FileText,
  FileImage,
  FileCode,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  ExternalLink,
} from "lucide-react";

export const ExportSection: React.FC = () => {
  const { resumeId, title, design } = useResumeStore();
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    setDownloadSuccess(null);
    try {
      const ok = await exportResumeToPdf({
        filename: title || "Resume",
        paperSize: design.paperSize,
      });
      if (ok) {
        setDownloadSuccess("PDF successfully downloaded to your device!");
      }
    } finally {
      setDownloadingPdf(false);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  const handleDownloadPng = async () => {
    setDownloadingPng(true);
    setDownloadSuccess(null);
    try {
      const ok = await exportResumeToPng({
        filename: title || "Resume",
      });
      if (ok) {
        setDownloadSuccess("Image (.png) successfully downloaded to your device!");
      }
    } finally {
      setDownloadingPng(false);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  const handleDownloadDocx = () => {
    if (!resumeId) return;
    window.open(`/api/resumes/${resumeId}/export/docx`, "_blank");
  };

  const handleDownloadTxt = () => {
    if (!resumeId) return;
    window.open(`/api/resumes/${resumeId}/export/txt`, "_blank");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Download className="w-5 h-5 text-blue-600" />
          Download & Export Resume
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Save your resume in your preferred format. All exports are fully compatible with applicant tracking systems and modern recruiters.
        </p>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Document Card */}
        <div className="bg-white rounded-2xl border-2 border-blue-600/80 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">PDF Document (.pdf)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Crisp 300-DPI vector PDF with embedded fonts and selectable text. Ideal for uploading to LinkedIn, Indeed, and company portals.
            </p>
          </div>
          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
        </div>

        {/* Word Document (.docx) */}
        <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Microsoft Word (.docx)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Standard editable Microsoft Word format with clean headings and bullet structures. Best when agency recruiters request an unformatted .docx file.
            </p>
          </div>
          <button
            onClick={handleDownloadDocx}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download Word (.docx)
          </button>
        </div>

        {/* High-Resolution PNG Image */}
        <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <FileImage className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Image (.png)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              High-resolution PNG image screenshot. Ideal for quick mobile sharing, WhatsApp/Slack previews, or embedding on your portfolio website.
            </p>
          </div>
          <button
            onClick={handleDownloadPng}
            disabled={downloadingPng}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloadingPng ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                Generating Image...
              </>
            ) : (
              <>
                <FileImage className="w-4 h-4 text-emerald-600" />
                Download PNG
              </>
            )}
          </button>
        </div>

        {/* Plain Text (.txt) */}
        <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-3">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Plain Text (.txt)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Clean raw text with standard spacing. Perfect for copy-pasting directly into government, university, or legacy ATS portal application forms.
            </p>
          </div>
          <button
            onClick={handleDownloadTxt}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            <FileCode className="w-4 h-4 text-slate-500" />
            Download Plain Text
          </button>
        </div>
      </div>

      {/* Additional Options */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600">
            <Printer className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Print or Save via Browser</div>
            <div className="text-[11px] text-slate-500">
              Open the system print window to print directly to a physical printer.
            </div>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          Print Document
        </button>
      </div>
    </div>
  );
};
