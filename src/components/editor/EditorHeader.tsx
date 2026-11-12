"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { LogoIcon } from "@/components/ui/Logo";
import {
  exportResumeToPdf,
  exportResumeToDocx,
  exportResumeToPng,
} from "@/lib/pdf-export";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileCode,
  FileEdit,
  FileImage,
  FileText,
  Loader2,
  MoreVertical,
  Printer,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  Monitor,
  UploadCloud,
} from "lucide-react";
import { AtsAuditModal } from "./modals/AtsAuditModal";
import { JobTailoringModal } from "./modals/JobTailoringModal";
import { AiAssistantModal } from "./modals/AiAssistantModal";
import { ImportResumeModal } from "./modals/ImportResumeModal";

export const EditorHeader: React.FC = () => {
  const {
    resumeId,
    title,
    data,
    design,
    setTitle,
    isDirty,
    isSaving,
    saveResume,
  } = useResumeStore();

  const { activeMobileTab, setActiveMobileTab, setActiveSection } = useEditorUIStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);

  // User feedback toast state
  const [toast, setToast] = useState<{ type: "success" | "error" | "info"; message: string } | null>(
    null
  );

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Modals state
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [showTailorModal, setShowTailorModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      setTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  /**
   * Triggers a guaranteed, direct PDF file download.
   * Streams from server or instantly generates via client-side vector jsPDF.
   */
  const handleDownloadPdf = async () => {
    setShowMoreMenu(false);
    setIsExportingPdf(true);
    showToast("info", "Preparing your PDF document for download...");

    try {
      if (isDirty) {
        await saveResume();
      }

      const success = await exportResumeToPdf({
        filename: title || "Resume",
        paperSize: design.paperSize,
        resumeId,
        data,
        design,
      });

      if (success) {
        showToast("success", "✓ PDF downloaded successfully! Check your Downloads folder.");
      } else {
        showToast("error", "Could not generate PDF. Please try again.");
      }
    } catch (err: any) {
      console.error("PDF download failed:", err);
      showToast("error", "Failed to download PDF. Please try again.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  /**
   * Triggers a direct Microsoft Word (.docx) file download.
   */
  const handleDownloadDocx = async () => {
    setShowMoreMenu(false);
    setIsExportingDocx(true);
    showToast("info", "Generating Word document (.docx)...");

    try {
      if (isDirty) {
        await saveResume();
      }

      if (resumeId) {
        await exportResumeToDocx({
          resumeId,
          filename: title || "Resume",
          data,
        });
        showToast("success", "✓ Word document downloaded successfully!");
      } else {
        showToast("error", "Please save your resume before exporting to Word.");
      }
    } catch (err) {
      console.error("Word export failed:", err);
      showToast("error", "Failed to download Word document. Please try again.");
    } finally {
      setIsExportingDocx(false);
    }
  };

  /**
   * Triggers a direct ultra-high-resolution PNG image download.
   */
  const handleDownloadPng = async () => {
    setShowMoreMenu(false);
    setIsExportingPng(true);
    showToast("info", "Capturing crystal-sharp PNG image...");

    try {
      if (isDirty) {
        await saveResume();
      }
      const ok = await exportResumeToPng({ filename: title || "Resume" });
      if (ok) {
        showToast("success", "✓ High-resolution PNG image downloaded!");
      } else {
        showToast("error", "Failed to generate PNG image.");
      }
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleDownloadTxt = () => {
    setShowMoreMenu(false);
    if (!resumeId) return;
    window.open(`/api/resumes/${resumeId}/export/txt`, "_blank");
  };

  const handlePrint = () => {
    setShowMoreMenu(false);
    window.print();
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200/90 px-3 sm:px-5 flex items-center justify-between z-30 sticky top-0 shadow-xs">
        {/* Left: Dashboard Back & Resume Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            <Link href="/" title="Go to Home" className="transition-transform hover:scale-105">
              <LogoIcon size="sm" />
            </Link>

            {/* Editable Title */}
            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                autoFocus
                className="text-sm font-bold text-slate-900 border border-blue-500 rounded-lg px-2.5 py-1 outline-none shadow-xs max-w-[140px] sm:max-w-xs"
              />
            ) : (
              <button
                onClick={() => {
                  setTempTitle(title);
                  setIsEditingTitle(true);
                }}
                className="group flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-blue-600 transition"
                title="Click to rename resume"
              >
                <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-[240px]">
                  {title || "Untitled Resume"}
                </span>
                <FileEdit className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-70 group-hover:opacity-100 transition" />
              </button>
            )}

            {/* Save Status Indicator */}
            <div className="hidden sm:flex items-center ml-1">
              {isSaving ? (
                <span className="flex items-center gap-1 text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md">
                  <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                </span>
              ) : isDirty ? (
                <button
                  onClick={() => saveResume()}
                  className="flex items-center gap-1 text-[11px] text-amber-700 font-medium bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md transition"
                  title="Click to save changes now"
                >
                  <Save className="w-3 h-3 text-amber-600" /> Save changes
                </button>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                  <Check className="w-3 h-3 text-emerald-600" /> Saved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: AI, ATS & Job Tools (Visible on Tablets, Desktops & Mobile Desktop View) */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-xl px-2.5 lg:px-3 py-1.5 shadow-2xs transition active:scale-95"
            title="AI Copilot: Summaries, Bullet points, Cover letter"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden lg:inline">AI Copilot</span>
            <span className="lg:hidden">AI</span>
          </button>

          <button
            onClick={() => setShowAtsModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl px-2.5 lg:px-3 py-1.5 shadow-2xs transition active:scale-95"
            title="ATS Audit: Check applicant tracking system score"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline">ATS Audit</span>
            <span className="lg:hidden">ATS</span>
          </button>

          <button
            onClick={() => setShowTailorModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-xl px-2.5 lg:px-3 py-1.5 shadow-2xs transition active:scale-95"
            title="Job Tailor: Target resume to specific job description"
          >
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden lg:inline">Job Tailor</span>
            <span className="lg:hidden">Tailor</span>
          </button>
        </div>

        {/* Center: Mobile Device View Switcher (Edit | Preview | Desktop View) */}
        <div className="flex md:hidden bg-slate-100 p-0.5 rounded-xl text-xs font-semibold mx-1">
          <button
            onClick={() => setActiveMobileTab("editor")}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition ${
              activeMobileTab === "editor"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Switch to Form Editor"
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setActiveMobileTab("preview")}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition ${
              activeMobileTab === "preview"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Switch to Live Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setActiveMobileTab("desktop")}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition ${
              activeMobileTab === "desktop"
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Switch to Full Desktop Split View on Device"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Desktop</span>
          </button>
        </div>

        {/* Right: PRIMARY EXPORT HUB (PDF & WORD & MORE) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Mobile AI Tools Trigger */}
          <button
            onClick={() => setShowAiModal(true)}
            className="md:hidden p-2 text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-xl transition"
            title="AI Career Assistant"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
          </button>

          {/* PRIMARY BUTTON: DOWNLOAD PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-60 shrink-0"
            title="Download high-resolution ATS-optimized PDF resume"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Saving PDF...</span>
                <span className="sm:hidden">PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </>
            )}
          </button>

          {/* SECONDARY BUTTON: DOWNLOAD WORD (.DOCX) */}
          <button
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="hidden xs:flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 bg-white hover:bg-blue-50/70 border border-slate-300 hover:border-blue-400 text-slate-800 hover:text-blue-900 rounded-xl text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all disabled:opacity-60 shrink-0"
            title="Download editable Microsoft Word document (.docx)"
          >
            {isExportingDocx ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="hidden sm:inline">Exporting...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Word (.docx)</span>
                <span className="sm:hidden">Word</span>
              </>
            )}
          </button>

          {/* MORE OPTIONS DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition border border-transparent hover:border-slate-200"
              title="More options and device view controls"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                {/* Device View Mode Section */}
                <div className="px-3.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Device View
                </div>

                <button
                  onClick={() => {
                    setActiveMobileTab("desktop");
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Monitor className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Desktop View</span>
                  </span>
                  {activeMobileTab === "desktop" && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>

                <button
                  onClick={() => {
                    setActiveMobileTab("editor");
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2.5">
                    <FileEdit className="w-3.5 h-3.5 text-slate-500" />
                    <span>Standard Mobile View</span>
                  </span>
                  {activeMobileTab === "editor" && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>

                <div className="my-1 border-t border-slate-100" />

                {/* AI & Career Tools */}
                <div className="px-3.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Career Tools
                </div>

                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowAiModal(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 flex items-center gap-2.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Copilot (Summaries, Bullets)</span>
                </button>

                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowAtsModal(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2.5 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ATS Screening Score Audit</span>
                </button>

                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowTailorModal(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2.5 transition"
                >
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>Job Description Tailor</span>
                </button>

                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowImportModal(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                  <span>Import Resume (JSON / LinkedIn)</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                {/* Export Options */}
                <div className="px-3.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Exports
                </div>

                <button
                  onClick={handleDownloadDocx}
                  className="xs:hidden w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Word Document (.docx)</span>
                </button>

                <button
                  onClick={handleDownloadPng}
                  disabled={isExportingPng}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <FileImage className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High-Res Image (.png)</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-500" />
                  <span>Plain Text (.txt)</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print Document</span>
                </button>

                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    setActiveSection("export");
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center gap-2.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Full Export Center</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Floating Status Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold border ${toast.type === "success"
                ? "bg-emerald-600 text-white border-emerald-500"
                : toast.type === "error"
                  ? "bg-red-600 text-white border-red-500"
                  : "bg-slate-900 text-white border-slate-800"
              }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 shrink-0 text-white" />}
            {toast.type === "info" && <Loader2 className="w-4 h-4 shrink-0 animate-spin text-blue-300" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <AtsAuditModal isOpen={showAtsModal} onClose={() => setShowAtsModal(false)} />
      <JobTailoringModal isOpen={showTailorModal} onClose={() => setShowTailorModal(false)} />
      <AiAssistantModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      <ImportResumeModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
    </>
  );
};
