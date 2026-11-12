"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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

interface PreviewViewportProps {
  isDesktopForced?: boolean;
}

export const PreviewViewport: React.FC<PreviewViewportProps> = ({ isDesktopForced = false }) => {
  const { resumeId, title, data, design, templateId, hasWatermark, isDirty, saveResume } =
    useResumeStore();
  const { zoom, zoomIn, zoomOut, resetZoom, setZoom, fitToWidth } = useEditorUIStore();
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const isA4 = design.paperSize !== "LETTER";
  const paperWidth = isA4 ? 794 : 816;
  const paperHeight = isA4 ? 1123 : 1056;

  // Smart responsive auto-fit on mount & resize
  const handleAutoFit = useCallback(() => {
    if (!containerRef.current) return;
    const availableWidth = containerRef.current.clientWidth;
    if (availableWidth > 50) {
      fitToWidth(availableWidth, paperWidth);
    }
  }, [fitToWidth, paperWidth]);

  useEffect(() => {
    handleAutoFit();

    // Re-check on window resize
    window.addEventListener("resize", handleAutoFit);
    return () => window.removeEventListener("resize", handleAutoFit);
  }, [handleAutoFit, isDesktopForced]);

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
          data,
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
      if (isDirty) {
        await saveResume();
      }
      const ok = await exportResumeToPng({
        filename: title || "Resume",
      });
      if (ok) {
        triggerToast("✓ High-resolution PNG image downloaded!");
      }
    } finally {
      setDownloadingPng(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-100/90 flex flex-col h-full overflow-hidden select-none relative">
      {/* Dedicated Preview Toolbar Strip */}
      <div className="h-12 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-2 sm:px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Paper Tag & Zoom Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="hidden xs:flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg text-slate-600 text-xs font-semibold mr-1">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>{isA4 ? "A4" : "Letter"}</span>
          </div>

          <button
            onClick={zoomOut}
            className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          <span className="text-xs font-mono font-bold px-1 text-slate-800 min-w-[36px] sm:min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={zoomIn}
            className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          <button
            onClick={handleAutoFit}
            className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 transition"
            title="Fit to Screen Width"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetZoom}
            className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition border-l border-slate-200 ml-0.5"
            title="Reset Zoom (100%)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Quick Action Download Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={handleQuickPdf}
            disabled={downloadingPdf}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-bold shadow-2xs hover:shadow-xs transition disabled:opacity-50"
            title="Save Resume as PDF"
          >
            {downloadingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleQuickDocx}
            disabled={downloadingDocx}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 rounded-lg text-xs font-semibold shadow-2xs transition"
            title="Save Resume as Word (.docx)"
          >
            {downloadingDocx ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span className="hidden sm:inline">Word</span>
          </button>

          <button
            onClick={handleQuickPng}
            disabled={downloadingPng}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 rounded-lg text-xs font-semibold shadow-2xs transition"
            title="Save High-Resolution Resume Image (PNG)"
          >
            {downloadingPng ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
            ) : (
              <FileImage className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span className="hidden sm:inline">PNG</span>
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

      {/* Canvas Viewport Area with Dimensional Outer Wrapper */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-6 flex justify-center items-start min-h-0 select-none"
      >
        <div
          style={{
            width: `${paperWidth * zoom}px`,
            height: `${paperHeight * zoom}px`,
            transition: "width 0.1s ease-out, height 0.1s ease-out",
          }}
          className="relative shrink-0 my-2 sm:my-4 transition-all"
        >
          <div
            id="resume-export-container"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              width: `${paperWidth}px`,
              height: `${paperHeight}px`,
            }}
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
    </div>
  );
};
