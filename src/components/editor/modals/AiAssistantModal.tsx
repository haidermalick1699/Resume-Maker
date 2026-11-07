"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Sparkles, Loader2, X, Copy, Check, FileText, Wand2, Mail } from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const { resumeId, data, updateBasics } = useResumeStore();

  const [activeTab, setActiveTab] = useState<"summary" | "bullet" | "cover">("summary");

  // Summary state
  const [role, setRole] = useState(data.basics.label || "");
  const [tone, setTone] = useState("Executive");
  const [summaries, setSummaries] = useState<string[]>([]);
  const

    [summaryLoading, setSummaryLoading] = useState(false);

  // Bullet state
  const [bulletText, setBulletText] = useState("");
  const [bulletSuggestions, setBulletSuggestions] = useState<string[]>([]);
  const [bulletLoading, setBulletLoading] = useState(false);

  // Cover Letter state
  const [coverJob, setCoverJob] = useState("");
  const [coverCompany, setCoverCompany] = useState("");
  const [coverJd, setCoverJd] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLoading, setCoverLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    try {
      const allSkills = data.skills.flatMap((s) => s.keywords);
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role || "Professional", skills: allSkills, tone }),
      });

      if (res.ok) {
        const d = await res.json();
        setSummaries(d.summaries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleImproveBullet = async () => {
    if (!bulletText.trim()) return;
    setBulletLoading(true);
    try {
      const res = await fetch("/api/ai/improve-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bullet: bulletText, role: data.basics.label }),
      });

      if (res.ok) {
        const d = await res.json();
        setBulletSuggestions(d.suggestions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBulletLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setCoverLoading(true);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId,
          jobTitle: coverJob,
          companyName: coverCompany,
          jobDescription: coverJd,
        }),
      });

      if (res.ok) {
        const d = await res.json();
        setCoverLetter(d.coverLetter || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCoverLoading(false);
    }
  };

  const handleApplySummary = (text: string) => {
    updateBasics({ summary: text });
    onClose();
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AI Career Copilot (Claude 3.5 Sonnet)
              </h2>
              <p className="text-xs text-slate-500">
                Generate summaries, improve bullet points with STAR metrics, or create cover letters.
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

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold mb-5">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${activeTab === "summary" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
          >
            <FileText className="w-3.5 h-3.5" /> Executive Summary
          </button>
          <button
            onClick={() => setActiveTab("bullet")}
            className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${activeTab === "bullet" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
          >
            <Wand2 className="w-3.5 h-3.5" /> STAR Bullet Improver
          </button>
          <button
            onClick={() => setActiveTab("cover")}
            className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${activeTab === "cover" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
          >
            <Mail className="w-3.5 h-3.5" /> Cover Letter
          </button>
        </div>

        {/* Tab 1: Executive Summary */}
        {activeTab === "summary" && (
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Architect"
                  className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tone of Voice
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 outline-none"
                >
                  <option value="Executive">Executive & Authoritative</option>
                  <option value="Technical">Technical & Rigorous</option>
                  <option value="Confident">Confident & Ambitious</option>
                  <option value="Concise">Concise & Direct</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateSummary}
              disabled={summaryLoading}
              className="w-full flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-xs disabled:opacity-50"
            >
              {summaryLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate 3 Summaries
            </button>

            {summaries.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                {summaries.map((s, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                    <p className="text-slate-800 leading-relaxed">{s}</p>
                    <button
                      onClick={() => handleApplySummary(s)}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
                    >
                      Use This Summary
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: STAR Bullet Improver */}
        {activeTab === "bullet" && (
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Original Bullet Point
              </label>
              <textarea
                rows={3}
                value={bulletText}
                onChange={(e) => setBulletText(e.target.value)}
                placeholder="Paste an existing bullet point (e.g. 'Responsible for managing database migration and helping the team')..."
                className="w-full text-xs border border-slate-300 rounded-lg p-3 outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleImproveBullet}
              disabled={bulletLoading || !bulletText.trim()}
              className="w-full flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-xs disabled:opacity-50"
            >
              {bulletLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              Rewrite with STAR Method & Metrics
            </button>

            {bulletSuggestions.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                {bulletSuggestions.map((b, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-start justify-between gap-3">
                    <p className="text-slate-800 leading-relaxed">• {b}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(b);
                        alert("Copied to clipboard! You can paste it into any job highlight.");
                      }}
                      className="shrink-0 text-slate-500 hover:text-slate-900 p-1"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Cover Letter */}
        {activeTab === "cover" && (
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={coverJob}
                  onChange={(e) => setCoverJob(e.target.value)}
                  placeholder="e.g. Senior Engineering Manager"
                  className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={coverCompany}
                  onChange={(e) => setCoverCompany(e.target.value)}
                  placeholder="e.g. OpenAI"
                  className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description</label>
              <textarea
                rows={3}
                value={coverJd}
                onChange={(e) => setCoverJd(e.target.value)}
                placeholder="Paste key requirements..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleGenerateCoverLetter}
              disabled={coverLoading}
              className="w-full flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-xs disabled:opacity-50"
            >
              {coverLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Targeted Cover Letter
            </button>

            {coverLetter && (
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Generated Cover Letter:</span>
                  <button
                    onClick={handleCopyCoverLetter}
                    className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                </div>
                <textarea
                  rows={8}
                  readOnly
                  value={coverLetter}
                  className="w-full text-xs border border-slate-300 bg-slate-50 rounded-xl p-3 outline-none font-sans leading-relaxed"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

