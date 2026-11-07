"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { TEMPLATES } from "@/templates/registry";
import { Check, ShieldCheck } from "lucide-react";

export const TemplatesSection: React.FC = () => {
  const { templateId, setTemplateId } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Select Template</h2>
        <p className="text-xs text-slate-500">
          Switch between professionally designed layouts. All your data and customizations are preserved automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {TEMPLATES.map((tmpl) => {
          const isSelected = templateId === tmpl.id;

          return (
            <div
              key={tmpl.id}
              onClick={() => setTemplateId(tmpl.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50/40 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{tmpl.name}</h3>
                    {tmpl.isAtsOptimized && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> ATS Friendly
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{tmpl.description}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-1 mt-3">
                {tmpl.recommendedRoles.map((role, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

