"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { TEMPLATES } from "@/templates/registry";
import { exportResumeToPdf, exportResumeToPng } from "@/lib/pdf-export";
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
  FileUp,
  LayoutTemplate,
  Loader2,
  Palette,
  Printer,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { AtsAuditModal } from "./modals/AtsAuditModal";
import { JobTailoringModal } from "./modals/JobTailoringModal";
import { AiAssistantModal } from "./modals/AiAssistantModal";
import { ImportResumeModal } from "./modals/ImportResumeModal";

export const EditorHeader: React.FC = () => {
  const {
    resumeId,
    title,
    templateId,
    setTitle,
    setTemplateId,
    isDirty,
    isSaving,
    saveResume,
  } = useResumeStore();

  const { activeMobileTab, setActiveMobileTab, setActiveSection } = useEditorUIStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);

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

  const handleDirectDownloadPdf = async () => {
    setShowExportMenu(false);
    setIsExportingPdf(true);
    try {
      await exportResumeToPdf({ filename: title, paperSize: "A4" });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDirectDownloadPng = async () => {
    setShowExportMenu(false);
    setIsExportingPng(true);
    try {
      await exportResumeToPng({ filename: title });
    } finally {
      setIsExportingPng(false);
    }
  };

  const handlePrint = () => {
    setShowExportMenu(false);
    window.print();
  };

  const handleDownloadDocx = () => {
    setShowExportMenu(false);
    if (!resumeId) return;
    window.open(`/api/resumes/${resumeId}/export/docx`, "_blank");
  };

  const handleDownloadTxt = () => {
    setShowExportMenu(false);
    if (!resumeId) return;
    window.open(`/api/resumes/${resumeId}/export/txt`, "_blank");
  };

  return (
    <>
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between z-30 sticky top-0 shadow-xs">
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-xs hidden sm:flex">
              RM
            </div>

            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                autoFocus
                className="text-sm md:text-base font-bold text-slate-900 border border-blue-500 rounded-lg px-2.5 py-1 outline-none shadow-xs"
              />
            ) : (
              <button
                onClick={() => {
                  setTempTitle(title);
                  setIsEditingTitle(true);
                }}
                className="group flex items-center gap-1.5 text-sm md:text-base font-bold text-slate-800 hover:text-blue-600 transition"
              >
                <span className="truncate max-w-[140px] sm:max-w-xs">{title}</span>
                <FileEdit className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            )}

            {/* Save Status Badge */}
            <div className="hidden sm:flex items-center text-xs text-slate-500 ml-1">
              {isSaving ? (
                <span className="flex items-center gap-1 text-blue-600 font-medium">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </span>
              ) : isDirty ? (
                <span className="text-amber-600 font-medium">• Unsaved changes</span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: AI, ATS & Tailoring Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-xl px-3 py-1.5 shadow-2xs hover:shadow-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Copilot</span>
          </button>

          <button
            onClick={() => setShowAtsModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl px-3 py-1.5 shadow-2xs hover:shadow-xs transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ATS Audit</span>
          </button>

          <button
            onClick={() => setShowTailorModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-xl px-3 py-1.5 shadow-2xs hover:shadow-xs transition"
          >
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Tailor to Job</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 transition"
            title="Import Resume (JSON or Text)"
          >
            <FileUp className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
          </button>
        </div>

        {/* Middle: Mobile Tab Toggle */}
        <div className="flex lg:hidden bg-slate-100 p-0.5 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveMobileTab("editor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeMobileTab === "editor"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => setActiveMobileTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeMobileTab === "preview"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>

        {/* Right Actions: Template select, Design, Save, Export */}
        <div className="flex items-center gap-2">
          {/* Template Picker Dropdown */}
          <div className="hidden md:flex items-center gap-1.5">
            <LayoutTemplate className="w-4 h-4 text-slate-400" />
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-blue-500 max-w-[150px] transition-colors"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Style Customizer Shortcut */}
          <button
            onClick={() => setActiveSection("design")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 transition"
          >
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            Design
          </button>

          {/* Manual Save Button */}
          <button
            onClick={() => saveResume()}
            disabled={isSaving}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 disabled:opacity-50 px-3 py-1.5 rounded-xl transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Multi-Format Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExportingPdf || isExportingPng}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving PDF...</span>
                </>
              ) : isExportingPng ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Image...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
                </>
              )}
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Download File
                </div>

                {/* Direct High-Res PDF Download */}
                <button
                  onClick={handleDirectDownloadPdf}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-medium text-slate-800 hover:bg-blue-50/80 hover:text-blue-900 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">PDF Document</div>
                      <div className="text-[10px] text-slate-500">Save directly as .pdf</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                    Best
                  </span>
                </button>

                {/* Direct High-Res PNG Download */}
                <button
                  onClick={handleDirectDownloadPng}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <FileImage className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Image (.png)</div>
                    <div className="text-[10px] text-slate-500">High-resolution image</div>
                  </div>
                </button>

                {/* DOCX Download */}
                <button
                  onClick={handleDownloadDocx}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Word Document (.docx)</div>
                    <div className="text-[10px] text-slate-500">Editable in MS Word</div>
                  </div>
                </button>

                {/* Plain Text Download */}
                <button
                  onClick={handleDownloadTxt}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Plain Text (.txt)</div>
                    <div className="text-[10px] text-slate-500">Raw text for ATS portals</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100" />

                {/* System Print Dialog */}
                <button
                  onClick={handlePrint}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                >
                  <div className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">Print / System Dialog</div>
                    <div className="text-[10px] text-slate-400">Open browser print window</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <AtsAuditModal isOpen={showAtsModal} onClose={() => setShowAtsModal(false)} />
      <JobTailoringModal isOpen={showTailorModal} onClose={() => setShowTailorModal(false)} />
      <AiAssistantModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      <ImportResumeModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
    </>
  );
};
