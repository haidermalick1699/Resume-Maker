"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, FileText } from "lucide-react";

export const PreviewViewport: React.FC = () => {
  const { data, design, templateId, hasWatermark } = useResumeStore();
  const { zoom, zoomIn, zoomOut, resetZoom, setZoom } = useEditorUIStore();

  const isA4 = design.paperSize !== "LETTER";

  return (
    <div className="flex-1 bg-slate-900/5 dark:bg-slate-950 flex flex-col h-full overflow-hidden relative select-none">
      {/* Floating Viewport Status & Zoom Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg rounded-2xl p-1.5 border border-slate-200/80 dark:border-slate-800 transition-all">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-slate-500 border-r border-slate-200/80 dark:border-slate-800 text-[11px] font-medium">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>{isA4 ? "A4 Page" : "Letter"}</span>
        </div>

        <button
          onClick={zoomOut}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-bold px-1.5 text-slate-800 dark:text-slate-200 min-w-[42px] text-center">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={zoomIn}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoom(0.85)}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          title="Fit View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={resetZoom}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors border-l border-slate-200 dark:border-slate-800 ml-0.5"
          title="Reset Zoom (100%)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

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
          {/* Subtle paper shadow wrap */}
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
