"use client";

import React, { useState, useEffect } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  TrendingUp,
} from "lucide-react";
import { AtsCheckResult } from "@/server/services/ats.service";

interface AtsAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtsAuditModal: React.FC<AtsAuditModalProps> = ({ isOpen, onClose }) => {
  const { resumeId } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AtsCheckResult | null>(null);

  useEffect(() => {
    if (isOpen && resumeId) {
      runAudit();
    }
  }, [isOpen, resumeId]);

  const runAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/ats-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });

      if (res.ok) {
        const data = await res.json();
        setAudit(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                ATS Compatibility & Scoring Audit
              </h2>
              <p className="text-xs text-slate-500">
                Automated screening simulator based on Workday, Taleo, and Greenhouse criteria.
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

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
            <p className="text-xs font-semibold text-slate-600">
              Auditing keywords, section structure, and action verbs...
            </p>
          </div>
        ) : audit ? (
          <div className="overflow-y-auto space-y-6 pr-2">
            {/* Scorecard Hero */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Calculated ATS Score
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-slate-900">{audit.score}</span>
                  <span className="text-sm font-bold text-slate-400">/ 100</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ml-2 ${
                      audit.grade === "A"
                        ? "bg-emerald-100 text-emerald-800"
                        : audit.grade === "B"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Grade {audit.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 max-w-md">{audit.summary}</p>
              </div>

              {/* Counters */}
              <div className="space-y-2 text-right hidden sm:block">
                <div className="text-xs">
                  <span className="text-slate-400">Quantified Metrics: </span>
                  <strong className="text-slate-800 font-bold">{audit.metricsCount}</strong>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400">Power Verbs: </span>
                  <strong className="text-slate-800 font-bold">{audit.actionVerbCount}</strong>
                </div>
              </div>
            </div>

            {/* Check Items */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Checklist Results ({audit.checks.length} criteria)
              </h3>

              <div className="space-y-2">
                {audit.checks.map((check, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      check.passed
                        ? "bg-emerald-50/40 border-emerald-200"
                        : check.severity === "critical"
                        ? "bg-red-50/40 border-red-200"
                        : "bg-amber-50/40 border-amber-200"
                    }`}
                  >
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : check.severity === "critical" ? (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{check.label}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{check.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{check.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-xl transition"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
