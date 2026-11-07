"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { TEMPLATES } from "@/templates/registry";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileCode,
  FileEdit,
  FileText,
  FileUp,
  LayoutTemplate,
  Loader2,
  Palette,
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
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-30 sticky top-0">
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                autoFocus
                className="text-base md:text-lg font-bold text-slate-900 border border-blue-400 rounded px-2 py-0.5 outline-none"
              />
            ) : (
              <button
                onClick={() => {
                  setTempTitle(title);
                  setIsEditingTitle(true);
                }}
                className="group flex items-center gap-1.5 text-base md:text-lg font-bold text-slate-800 hover:text-blue-600 transition"
              >
                <span>{title}</span>
                <FileEdit className="w-4 h-4 text-slate-400 group-hover:text-blue-600 opacity-60 group-hover:opacity-100" />
              </button>
            )}

            {/* Save Status Badge */}
            <div className="hidden sm:flex items-center text-xs text-slate-500 ml-2">
              {isSaving ? (
                <span className="flex items-center gap-1 text-blue-600">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </span>
              ) : isDirty ? (
                <span className="text-amber-600 font-medium">• Unsaved changes</span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-600">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: AI & ATS Action Buttons (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5">
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg px-3 py-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Copilot</span>
          </button>

          <button
            onClick={() => setShowAtsModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg px-3 py-1.5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ATS Audit</span>
          </button>

          <button
            onClick={() => setShowTailorModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-1.5 transition"
          >
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Tailor to Job</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 transition"
            title="Import Resume"
          >
            <FileUp className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
          </button>
        </div>

        {/* Middle: Mobile Tab Toggle */}
        <div className="flex lg:hidden bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveMobileTab("editor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
              activeMobileTab === "editor"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => setActiveMobileTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
              activeMobileTab === "preview"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>

        {/* Right Actions: Template select, Design, Save, Export */}
        <div className="flex items-center gap-2">
          {/* Template Picker Dropdown */}
          <div className="hidden md:flex items-center gap-1">
            <LayoutTemplate className="w-4 h-4 text-slate-400" />
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-blue-500 max-w-[150px]"
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
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 transition"
          >
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            Design
          </button>

          {/* Manual Save Button */}
          <button
            onClick={() => saveResume()}
            disabled={isSaving}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 px-3 py-1.5 rounded-lg transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Multi-Format Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                <button
                  onClick={handlePrint}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>PDF Document (Print)</span>
                </button>
                <button
                  onClick={handleDownloadDocx}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-800" />
                  <span>Word Document (.docx)</span>
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100"
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-500" />
                  <span>Plain Text (.txt)</span>
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
