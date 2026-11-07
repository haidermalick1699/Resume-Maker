"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { FileUp, Loader2, X, FileCode, AlignLeft } from "lucide-react";

interface ImportResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportResumeModal: React.FC<ImportResumeModalProps> = ({ isOpen, onClose }) => {
  const { setResume, title, templateId, design, hasWatermark } = useResumeStore();
  const [format, setFormat] = useState<"json" | "text">("json");
  const [payload, setPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (!payload.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/import/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, payload }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to import resume");

      // Populate current resume store
      const parsedData = data.resume;
      setResume({
        id: "imported_temp_id",
        title: parsedData.basics?.name ? `${parsedData.basics.name}'s Resume` : title,
        templateId,
        data: parsedData,
        design,
        hasWatermark,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to parse resume input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Import Existing Resume</h2>
              <p className="text-xs text-slate-500">
                Import JSON Resume standard or paste raw plain text to parse.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {/* Format Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold mb-4">
          <button
            onClick={() => setFormat("json")}
            className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              format === "json" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> JSON Resume Standard
          </button>
          <button
            onClick={() => setFormat("text")}
            className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              format === "text" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" /> Plain Text Resume
          </button>
        </div>

        <textarea
          rows={10}
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder={
            format === "json"
              ? `{\n  "basics": {\n    "name": "Jane Doe",\n    "email": "jane@example.com"\n  },\n  "work": [...]\n}`
              : "Paste raw resume text here with sections like SUMMARY, EXPERIENCE, EDUCATION, SKILLS..."
          }
          className="w-full text-xs font-mono border border-slate-300 rounded-xl p-3 outline-none focus:border-blue-500 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={loading || !payload.trim()}
            className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileUp className="w-3.5 h-3.5" />}
            Parse & Import
          </button>
        </div>
      </div>
    </div>
  );
};
