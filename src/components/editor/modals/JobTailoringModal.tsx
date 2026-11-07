"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Target, Sparkles, Check, Loader2, X, ArrowRight } from "lucide-react";
import { TailorResult } from "@/server/services/tailor.service";

interface JobTailoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobTailoringModal: React.FC<JobTailoringModalProps> = ({ isOpen, onClose }) => {
  const { resumeId, data, updateBasics } = useResumeStore();

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TailorResult | null>(null);
  const [applied, setApplied] = useState<{ [idx: number]: boolean }>({});

  if (!isOpen) return null;

  const handleTailor = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/tailor-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId,
          jobTitle: jobTitle || "Target Role",
          companyName: companyName || "Target Company",
          jobDescription,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AI Job Tailoring & Keyword Matcher
              </h2>
              <p className="text-xs text-slate-500">
                Paste a target job description to match keywords and generate targeted bullet suggestions.
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

        <div className="overflow-y-auto space-y-5 pr-1 flex-1">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Role / Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Company
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Stripe / Google"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Description *
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job requirements, responsibilities, and qualifications..."
              className="w-full text-xs border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleTailor}
            disabled={loading || !jobDescription.trim()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-xs disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Analyze Match & Generate Edits
          </button>

          {/* Results Area */}
          {result && (
            <div className="space-y-5 pt-4 border-t border-slate-200">
              {/* Match Score Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">
                    Keyword Match Score
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-0.5">
                    {result.matchScore}%
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-emerald-700 font-bold block">
                    {result.matchedKeywords.length} Matched Keywords
                  </span>
                  <span className="text-amber-700 font-bold block mt-0.5">
                    {result.missingKeywords.length} Missing Keywords
                  </span>
                </div>
              </div>

              {/* Missing Keywords Badges */}
              {result.missingKeywords.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Missing Keywords to Add:
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Adjustments */}
              {result.tailoredDiff.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Targeted Bullet Recommendations:
                  </h3>

                  {result.tailoredDiff.map((diff, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-xl text-xs space-y-1.5"
                    >
                      <div className="font-bold text-blue-900">{diff.section}</div>
                      <p className="text-slate-700">{diff.suggestion}</p>
                      <p className="text-[11px] text-slate-500 italic">Why: {diff.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

