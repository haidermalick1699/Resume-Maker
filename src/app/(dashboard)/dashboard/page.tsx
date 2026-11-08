"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/ui/Logo";
import {
  Plus,
  FileText,
  Copy,
  Trash2,
  ExternalLink,
  Loader2,
  Sparkles,
  ShieldCheck,
  Clock,
  Download,
  ArrowRight,
} from "lucide-react";
import { TEMPLATES } from "@/templates/registry";

interface ResumeSummary {
  id: string;
  title: string;
  templateId: string;
  atsScore: number | null;
  hasWatermark: boolean;
  updatedAt: string;
}

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<ResumeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern-minimal");
  const [newTitle, setNewTitle] = useState("My Resume");

  // Fetch resumes unconditionally on mount
  useEffect(() => {
    fetchResumes();
  }, []);

  // Handle URL params for template selection from external/template links
  useEffect(() => {
    const tmpl = searchParams.get("template");
    const role = searchParams.get("role");
    if (tmpl) {
      setSelectedTemplate(tmpl);
      if (role) {
        setNewTitle(`${decodeURIComponent(role)} Resume`);
      }
      setShowCreateModal(true);
    }
  }, [searchParams]);

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle || "Untitled Resume",
          templateId: selectedTemplate,
        }),
      });

      const data = await res.json();
      if (res.ok && data.resume?.id) {
        setShowCreateModal(false);
        router.push(`/editor/${data.resume.id}`);
        return;
      } else {
        alert(data.error || "Failed to create resume. Please try again.");
      }
    } catch (err) {
      console.error("Create resume error:", err);
      alert("Network error creating resume. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/resumes/${id}/duplicate`, { method: "POST" });
      if (res.ok) {
        fetchResumes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume? This cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-medium text-slate-600">Loading your resumes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <Logo size="md" href="/" />

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold ml-2">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Pro Unlocked</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/templates"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition"
          >
            <span>Templates</span>
          </Link>
          <a
            href="/api/user/export"
            download
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition"
            title="Export all resume data in JSON format"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Data</span>
          </a>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Resume</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Banner / Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-500/15 mb-8 relative overflow-hidden">
          {/* Subtle background circles for depth */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Professional Career Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                My Resumes
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                Design, customize, and download recruiter-approved resumes. Edit with real-time live preview and save directly to PDF, Word (.docx), or high-res image.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-md transition"
              >
                <span>Browse Templates</span>
              </Link>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1.5">No resumes yet</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Start building your first resume from one of our professional, ATS-optimized templates.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-blue-500/20"
            >
              Build Resume Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const tmpl = TEMPLATES.find((t) => t.id === resume.templateId) || TEMPLATES[0];

              return (
                <div
                  key={resume.id}
                  className="bg-white border border-slate-200/90 hover:border-blue-400/90 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden hover:-translate-y-0.5"
                >
                  {/* Subtle Top Gradient Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Header: Title and Template Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link
                        href={`/editor/${resume.id}`}
                        className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base line-clamp-1"
                      >
                        {resume.title}
                      </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200/60">
                        {tmpl.name}
                      </span>
                      {resume.atsScore && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ATS: {resume.atsScore}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    <div className="flex items-center gap-1">
                      <a
                        href={`/api/resumes/${resume.id}/export/pdf`}
                        download
                        className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-700 rounded-lg transition"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`/api/resumes/${resume.id}/export/docx`}
                        download
                        className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-700 rounded-lg transition"
                        title="Download Word Document (.docx)"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDuplicate(resume.id)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition"
                        title="Duplicate Resume"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/editor/${resume.id}`}
                        className="ml-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1"
                      >
                        <span>Edit</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Create Resume Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Create New Resume</h2>
            <p className="text-xs text-slate-500 mb-4">
              Choose a title and starting template layout.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Software Engineer - Google"
                  className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting Template
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition ${
                        selectedTemplate === tmpl.id
                          ? "border-blue-600 bg-blue-50/50 font-semibold text-blue-900"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div>
                        <div>{tmpl.name}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{tmpl.description}</div>
                      </div>
                      {selectedTemplate === tmpl.id && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-xs font-semibold text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={creating}
                className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {creating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                Create & Open
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
          <p className="text-sm font-medium text-slate-600">Loading your dashboard...</p>
        </div>
      }
    >
      <DashboardInner />
    </Suspense>
  );
}

