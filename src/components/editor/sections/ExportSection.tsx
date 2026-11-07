"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import {
  exportResumeToPdf,
  exportResumeToDocx,
  exportResumeToPng,
} from "@/lib/pdf-export";
import {
  Download,
  FileText,
  FileImage,
  FileCode,
  Printer,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export const ExportSection: React.FC = () => {
  const { resumeId, title, data, design, isDirty, saveResume } = useResumeStore();
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const notify = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    setStatusMessage(null);
    try {
      if (isDirty) {
        await saveResume();
      }
      const ok = await exportResumeToPdf({
        filename: title || "Resume",
        paperSize: design.paperSize,
        resumeId,
        data,
        design,
      });
      if (ok) {
        notify("success", "✓ PDF resume successfully saved to your Downloads folder!");
      } else {
        notify("error", "Failed to generate PDF. Please try again.");
      }
    } catch (err) {
      console.error("PDF export error:", err);
      notify("error", "An error occurred while generating your PDF.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    setDownloadingDocx(true);
    setStatusMessage(null);
    try {
      if (isDirty) {
        await saveResume();
      }
      if (resumeId) {
        await exportResumeToDocx({
          resumeId,
          filename: title || "Resume",
        });
        notify("success", "✓ Word document (.docx) successfully downloaded!");
      } else {
        notify("error", "Please save your resume first before exporting to Word.");
      }
    } catch (err) {
      console.error("DOCX export error:", err);
      notify("error", "Failed to generate Word document.");
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleDownloadPng = async () => {
    setDownloadingPng(true);
    setStatusMessage(null);
    try {
      const ok = await exportResumeToPng({
        filename: title || "Resume",
      });
      if (ok) {
        notify("success", "✓ Resume image (.png) successfully downloaded!");
      } else {
        notify("error", "Failed to capture image screenshot.");
      }
    } finally {
      setDownloadingPng(false);
    }
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

      {statusMessage && (
        <div
          className={`border text-xs rounded-xl p-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Document Card */}
        <div className="bg-white rounded-2xl border-2 border-blue-600 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Recommended
          </div>
          <div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">PDF Document (.pdf)</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Crisp vector typography with embedded fonts and 100% selectable text. Ideal for uploading to LinkedIn, Indeed, Workday, and company portals.
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
        <div className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between">
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
            disabled={downloadingDocx}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloadingDocx ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Word...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Download Word (.docx)
              </>
            )}
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
            <div className="text-xs font-bold text-slate-800">Print via Browser</div>
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
