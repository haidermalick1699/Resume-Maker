"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Plus, Trash2, PlusCircle } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const { data, addProject, updateProject, removeProject } = useResumeStore();
  const { projects } = data;

  const handleHighlightChange = (projId: string, index: number, value: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    const newHighlights = [...proj.highlights];
    newHighlights[index] = value;
    updateProject(projId, { highlights: newHighlights });
  };

  const addHighlight = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, { highlights: [...proj.highlights, ""] });
  };

  const removeHighlight = (projId: string, index: number) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, {
      highlights: proj.highlights.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Projects</h2>
          <p className="text-xs text-slate-500">
            Highlight significant open-source, client, or personal software projects.
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No projects added yet.</p>
          <button
            onClick={addProject}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold text-slate-600">
                  Project #{idx + 1}: {proj.name || "Untitled Project"}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="text-xs text-slate-400 hover:text-red-600 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                    placeholder="e.g. ApexMesh Service Mesh"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Live Demo or GitHub URL
                  </label>
                  <input
                    type="url"
                    value={proj.url}
                    onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    placeholder="Brief 1-2 sentence description of what the project does..."
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Key Features / Milestones
                  </label>
                  <button
                    type="button"
                    onClick={() => addHighlight(proj.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Add Milestone
                  </button>
                </div>

                <div className="space-y-2">
                  {proj.highlights?.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">•</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleHighlightChange(proj.id, bIdx, e.target.value)}
                        placeholder="e.g. Scaled to 2,800+ GitHub stars with 99.9% uptime"
                        className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(proj.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

