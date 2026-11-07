"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export const PreviewViewport: React.FC = () => {
  const { data, design, templateId, hasWatermark } = useResumeStore();
  const { zoom, zoomIn, zoomOut, resetZoom } = useEditorUIStore();

  return (
    <div className="flex-1 bg-slate-100 flex flex-col h-full overflow-hidden relative">
      {/* Zoom Control Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur shadow-md rounded-lg p-1 border border-slate-200">
        <button
          onClick={zoomOut}
          className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono font-medium px-2 text-slate-700 select-none">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomIn}
          className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={resetZoom}
          className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition border-l border-slate-200 ml-1"
          title="Reset Zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.1s ease-out",
          }}
          className="my-4"
        >
          <TemplateRenderer
            data={data}
            design={design}
            templateId={templateId}
            hasWatermark={hasWatermark}
          />
        </div>
      </div>
    </div>
  );
};

