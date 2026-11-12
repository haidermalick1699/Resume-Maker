"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResumeStore } from "@/stores/useResumeStore";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { EditorHeader } from "@/components/editor/EditorHeader";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { PreviewViewport } from "@/components/editor/PreviewViewport";
import { Loader2 } from "lucide-react";

export default function ResumeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.resumeId as string;

  const { setResume, isDirty, isSaving, saveResume } = useResumeStore();
  const { activeMobileTab } = useEditorUIStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch resume and hydrate store
  useEffect(() => {
    if (!resumeId) return;

    let isMounted = true;
    async function loadResume() {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (!res.ok) {
          throw new Error("Resume not found");
        }

        const data = await res.json();
        if (isMounted) {
          const r = data.resume;
          setResume({
            id: r.id,
            title: r.title,
            templateId: r.templateId,
            data: r.content,
            design: r.design,
            hasWatermark: r.hasWatermark,
          });
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load resume");
          setLoading(false);
        }
      }
    }

    loadResume();
    return () => {
      isMounted = false;
    };
  }, [resumeId, router, setResume]);

  // 2. Debounced Auto-save (Every 2 seconds of inactivity when dirty)
  useEffect(() => {
    if (!isDirty || isSaving) return;

    const timer = setTimeout(() => {
      saveResume();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isDirty, isSaving, saveResume]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-medium text-slate-600">Loading your resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-6 rounded-xl border border-red-200 text-center max-w-md shadow-sm">
          <p className="text-base font-bold text-red-600 mb-2">Error Loading Resume</p>
          <p className="text-xs text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs bg-slate-900 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isDesktopMode = activeMobileTab === "desktop";

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Top Header */}
      <EditorHeader />

      {/* Main Workspace Wrapper (Enables smooth horizontal scrolling if desktop view is forced on small screens) */}
      <div className="flex-1 flex overflow-hidden relative">
        <div
          className={`flex-1 flex overflow-hidden ${
            isDesktopMode ? "overflow-x-auto min-w-[1020px]" : ""
          }`}
        >
          {/* Navigation Sidebar */}
          <EditorSidebar isDesktopForced={isDesktopMode} />

          {/* Dual Column Workspace */}
          <div className="flex-1 flex overflow-hidden min-w-0">
            {/* Form Editor Column */}
            <div
              className={`flex-col border-r border-slate-200 bg-white min-w-0 ${
                isDesktopMode
                  ? "flex w-[480px] shrink-0"
                  : activeMobileTab === "editor"
                  ? "flex w-full md:w-1/2"
                  : "hidden md:flex md:w-1/2"
              }`}
            >
              <EditorPanel />
            </div>

            {/* Live Preview Column */}
            <div
              className={`flex-col min-w-0 ${
                isDesktopMode
                  ? "flex w-[540px] shrink-0"
                  : activeMobileTab === "preview"
                  ? "flex w-full md:w-1/2"
                  : "hidden md:flex md:w-1/2"
              }`}
            >
              <PreviewViewport isDesktopForced={isDesktopMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

