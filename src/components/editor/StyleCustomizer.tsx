"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";

const COLOR_PRESETS = [
  { name: "Executive Blue", hex: "#2563EB" },
  { name: "Teal Green", hex: "#0F766E" },
  { name: "Burgundy Crimson", hex: "#4B1D24" },
  { name: "Indigo Purple", hex: "#6366F1" },
  { name: "Slate Charcoal", hex: "#334155" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Classic Monochrome", hex: "#000000" },
];

export const StyleCustomizer: React.FC = () => {
  const { design, updateDesign } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Design & Formatting</h2>
        <p className="text-xs text-slate-500">
          Personalize colors, typography, margins, language, and reading direction.
        </p>
      </div>

      {/* Language & RTL Mode */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Language & Reading Direction
        </label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[11px] text-slate-500 mb-1">Document Language</label>
            <select
              value={design.language || "en"}
              onChange={(e) => {
                const lang = e.target.value;
                const isRtl = lang === "ar" || lang === "ur";
                updateDesign({ language: lang, isRtl });
              }}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 outline-none bg-white"
            >
              <option value="en">English (LTR)</option>
              <option value="es">Español / Spanish (LTR)</option>
              <option value="ar">العربية / Arabic (RTL)</option>
              <option value="ur">اردو / Urdu (RTL)</option>
              <option value="fr">Français / French (LTR)</option>
              <option value="de">Deutsch / German (LTR)</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer p-2 bg-white border border-slate-300 rounded-lg w-full">
              <input
                type="checkbox"
                checked={design.isRtl}
                onChange={(e) => updateDesign({ isRtl: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Right-to-Left (RTL) Layout
            </label>
          </div>
        </div>
      </div>

      {/* Primary Accent Color */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Accent Color
        </label>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color.hex}
              onClick={() => updateDesign({ primaryColor: color.hex })}
              className={`w-7 h-7 rounded-full border-2 transition ${
                design.primaryColor === color.hex
                  ? "border-blue-600 scale-110 shadow-sm"
                  : "border-white hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <div className="flex items-center gap-2 ml-2">
            <input
              type="color"
              value={design.primaryColor}
              onChange={(e) => updateDesign({ primaryColor: e.target.value })}
              className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-600 uppercase">
              {design.primaryColor}
            </span>
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Typography / Font Family
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["Inter", "Roboto", "Merriweather", "Playfair Display", "Courier Prime"] as const).map(
            (font) => (
              <button
                key={font}
                onClick={() => updateDesign({ fontFamily: font })}
                className={`p-2.5 rounded-lg border text-xs text-left transition ${
                  design.fontFamily === font
                    ? "border-blue-600 bg-blue-50/50 font-semibold text-blue-900"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <span>{font}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Paper Size & Margins */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Paper Standard
          </label>
          <select
            value={design.paperSize}
            onChange={(e) => updateDesign({ paperSize: e.target.value as any })}
            className="w-full text-xs border border-slate-300 rounded-lg p-2 outline-none"
          >
            <option value="A4">A4 (International Standard)</option>
            <option value="LETTER">US Letter (North America)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Page Margins
          </label>
          <select
            value={design.pageMargins}
            onChange={(e) => updateDesign({ pageMargins: e.target.value as any })}
            className="w-full text-xs border border-slate-300 rounded-lg p-2 outline-none"
          >
            <option value="compact">Compact (More content per page)</option>
            <option value="normal">Normal (Recommended)</option>
            <option value="spacious">Spacious (Clean & relaxed)</option>
          </select>
        </div>
      </div>

      {/* Photo Settings */}
      <div className="border-t border-slate-200 pt-4">
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Photo Options
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={design.photo.visible}
              onChange={(e) =>
                updateDesign({ photo: { ...design.photo, visible: e.target.checked } })
              }
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Show Photo in Resume
          </label>

          {design.photo.visible && (
            <div className="grid grid-cols-3 gap-2">
              {(["circle", "rounded", "square"] as const).map((shape) => (
                <button
                  key={shape}
                  onClick={() =>
                    updateDesign({ photo: { ...design.photo, shape } })
                  }
                  className={`p-2 rounded-lg border text-xs capitalize transition ${
                    design.photo.shape === shape
                      ? "border-blue-600 bg-blue-50/50 font-semibold text-blue-900"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
