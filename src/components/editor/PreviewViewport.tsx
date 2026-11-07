"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { exportResumeToPdf, exportResumeToPng } from "@/lib/pdf-export";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  FileText,
  Download,
  FileImage,
  Loader2,
} from "lucide-react";

export const PreviewViewport: React.FC = () => {
  const { resumeId, title, data, design, templateId, hasWatermark } = useResumeStore();
  const { zoom, zoomIn, zoomOut, resetZoom, setZoom } = useEditorUIStore();
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);

  const isA4 = design.paperSize !== "LETTER";

  const handleQuickPdf = async () => {
    setDownloadingPdf(true);
    try {
      await exportResumeToPdf({
        filename: title || "Resume",
        paperSize: design.paperSize,
      });
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleQuickPng = async () => {
    setDownloadingPng(true);
    try {
      await exportResumeToPng({
        filename: title || "Resume",
      });
    } finally {
      setDownloadingPng(false);
    }
  };

  const handleQuickDocx = () => {
    if (!resumeId) return;
    window.open(`/api/resumes/${resumeId}/export/docx`, "_blank");
  };

  return (
    <div className="flex-1 bg-slate-900/5 dark:bg-slate-950 flex flex-col h-full overflow-hidden relative select-none">
      {/* Top Left: Quick Download Action Pills */}
      <div className="absolute top-4 left-4 z-20 hidden md:flex items-center gap-1.5 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-1.5 border border-slate-200/80 transition-all">
        <span className="text-[10px] font-bold tracking-wider text-slate-400 px-2 uppercase">
          Save:
        </span>

        <button
          onClick={handleQuickPdf}
          disabled={downloadingPdf}
          className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition disabled:opacity-50"
          title="Save Resume as PDF (.pdf)"
        >
          {downloadingPdf ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span>PDF</span>
        </button>

        <button
          onClick={handleQuickDocx}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
          title="Save Resume as Word Document (.docx)"
        >
          <FileText className="w-3.5 h-3.5 text-blue-700" />
          <span>Word</span>
        </button>

        <button
          onClick={handleQuickPng}
          disabled={downloadingPng}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition disabled:opacity-50"
          title="Save Resume as High-Res Image (.png)"
        >
          {downloadingPng ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
          ) : (
            <FileImage className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>PNG</span>
        </button>
      </div>

      {/* Top Right: Viewport Status & Zoom Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-1.5 border border-slate-200/80 transition-all">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-slate-500 border-r border-slate-200/80 text-[11px] font-medium">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>{isA4 ? "A4 Page" : "Letter"}</span>
        </div>

        <button
          onClick={zoomOut}
          className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-bold px-1.5 text-slate-800 min-w-[42px] text-center">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={zoomIn}
          className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoom(0.85)}
          className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
          title="Fit View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={resetZoom}
          className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-colors border-l border-slate-200 ml-0.5"
          title="Reset Zoom (100%)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Canvas Viewport Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start pt-16 md:pt-16">
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
