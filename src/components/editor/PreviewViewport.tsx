"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import {
  exportResumeToPdf,
  exportResumeToDocx,
  exportResumeToPng,
} from "@/lib/pdf-export";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  FileText,
  Download,
  FileImage,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export const PreviewViewport: React.FC = () => {
  const { resumeId, title, data, design, templateId, hasWatermark, isDirty, saveResume } =
    useResumeStore();
  const { zoom, zoomIn, zoomOut, resetZoom, setZoom } = useEditorUIStore();
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  const isA4 = design.paperSize !== "LETTER";

  const triggerToast = (msg: string) => {
    setQuickToast(msg);
    setTimeout(() => setQuickToast(null), 3500);
  };

  const handleQuickPdf = async () => {
    setDownloadingPdf(true);
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
        triggerToast("✓ PDF downloaded to your device!");
      }
    } catch (err) {
      console.error("PDF download error:", err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleQuickDocx = async () => {
    setDownloadingDocx(true);
    try {
      if (isDirty) {
        await saveResume();
      }
      if (resumeId) {
        await exportResumeToDocx({
          resumeId,
          filename: title || "Resume",
        });
        triggerToast("✓ Word document downloaded!");
      }
    } catch (err) {
      console.error("Docx export error:", err);
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleQuickPng = async () => {
    setDownloadingPng(true);
    try {
      const ok = await exportResumeToPng({
        filename: title || "Resume",
      });
      if (ok) {
        triggerToast("✓ PNG image downloaded!");
      }
    } finally {
      setDownloadingPng(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-100/80 flex flex-col h-full overflow-hidden select-none relative">
      {/* Dedicated Preview Toolbar Strip */}
      <div className="h-12 bg-white/90 backdrop-blur-xs border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Paper Tag & Zoom Controls */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-lg text-slate-600 text-xs font-semibold mr-1">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>{isA4 ? "A4" : "US Letter"}</span>
          </div>

          <button
            onClick={zoomOut}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold px-1.5 text-slate-800 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={zoomIn}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoom(0.85)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition"
            title="Fit to Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetZoom}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition border-l border-slate-200 ml-0.5"
            title="Reset Zoom (100%)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Quick Action Download Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleQuickPdf}
            disabled={downloadingPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-bold shadow-2xs hover:shadow-xs transition disabled:opacity-50"
            title="Save Resume as PDF"
          >
            {downloadingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Save as PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleQuickDocx}
            disabled={downloadingDocx}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 rounded-lg text-xs font-semibold shadow-2xs transition"
            title="Save Resume as Word (.docx)"
          >
            {downloadingDocx ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span>Word (.docx)</span>
          </button>

          <button
            onClick={handleQuickPng}
            disabled={downloadingPng}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-medium transition"
            title="Save Resume as PNG"
          >
            <FileImage className="w-3.5 h-3.5 text-emerald-600" />
            <span>Image</span>
          </button>
        </div>
      </div>

      {/* Floating feedback inside preview viewport */}
      {quickToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{quickToast}</span>
        </div>
      )}

      {/* Canvas Viewport Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          id="resume-export-container"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="my-4 transition-all"
        >
          {/* Paper shadow wrap */}
          <div className="rounded-xs shadow-2xl ring-1 ring-slate-900/10">
            <TemplateRenderer
              data={data}
              design={design}
              templateId={templateId}
              hasWatermark={hasWatermark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
