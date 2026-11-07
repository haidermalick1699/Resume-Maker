"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Plus,
  FileText,
  Copy,
  Trash2,
  ExternalLink,
  Loader2,
  LogOut,
  Sparkles,
  ShieldCheck,
  Clock,
  Download,
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

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [resumes, setResumes] = useState<ResumeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern-minimal");
  const [newTitle, setNewTitle] = useState("My Resume");

  // Fetch user resumes
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchResumes();
    }
  }, [status, router]);

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

      if (res.ok) {
        const data = await res.json();
        router.push(`/editor/${data.resume.id}`);
      }
    } catch (err) {
      console.error(err);
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

  if (status === "loading" || loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-medium text-slate-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xs">
            RM
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            Resume Maker
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/billing"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Plan & Billing
          </Link>
          <a
            href="/api/user/export"
            download
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition"
            title="Export all resume and account data in JSON format"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" /> Export Data
          </a>
          <div className="text-right hidden md:block border-l border-slate-200 pl-3">
            <div className="text-xs font-bold text-slate-800">{session?.user?.name || "User"}</div>
            <div className="text-[11px] text-slate-500">{session?.user?.email}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Banner / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              My Resumes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create, customize, and export ATS-optimized resumes tailored for target job postings.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Create New Resume
          </button>
        </div>

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">No resumes yet</h3>
            <p className="text-xs text-slate-500 mb-6">
              Start by building your first resume from one of our professional, ATS-optimized templates.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
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
                  className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Title and Template Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link
                        href={`/editor/${resume.id}`}
                        className="font-bold text-slate-900 group-hover:text-blue-600 transition text-base line-clamp-1"
                      >
                        {resume.title}
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {tmpl.name}
                      </span>
                      {resume.atsScore && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> ATS: {resume.atsScore}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDuplicate(resume.id)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 transition"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/editor/${resume.id}`}
                        className="ml-1 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition"
                      >
                        Edit
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

