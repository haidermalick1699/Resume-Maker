"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Plus, Trash2, GripVertical, PlusCircle } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const { data, addWork, updateWork, removeWork } = useResumeStore();
  const { work } = data;

  const handleHighlightChange = (jobId: string, index: number, value: string) => {
    const job = work.find((w) => w.id === jobId);
    if (!job) return;
    const newHighlights = [...job.highlights];
    newHighlights[index] = value;
    updateWork(jobId, { highlights: newHighlights });
  };

  const addHighlight = (jobId: string) => {
    const job = work.find((w) => w.id === jobId);
    if (!job) return;
    updateWork(jobId, { highlights: [...job.highlights, ""] });
  };

  const removeHighlight = (jobId: string, index: number) => {
    const job = work.find((w) => w.id === jobId);
    if (!job) return;
    const newHighlights = job.highlights.filter((_, i) => i !== index);
    updateWork(jobId, { highlights: newHighlights });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Work Experience</h2>
          <p className="text-xs text-slate-500">
            Showcase your employment history, key responsibilities, and achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={addWork}
          className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {work.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No work experience added yet.</p>
          <button
            onClick={addWork}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add your first position
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {work.map((job, index) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold text-slate-600">
                  Position #{index + 1}: {job.position || "Untitled Role"}
                </span>
                <button
                  type="button"
                  onClick={() => removeWork(job.id)}
                  className="text-xs text-slate-400 hover:text-red-600 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title / Position *
                  </label>
                  <input
                    type="text"
                    value={job.position}
                    onChange={(e) => updateWork(job.id, { position: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={job.name}
                    onChange={(e) => updateWork(job.id, { name: e.target.value })}
                    placeholder="e.g. Google / Stripe"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={job.startDate}
                    onChange={(e) => updateWork(job.id, { startDate: e.target.value })}
                    placeholder="e.g. 2021-03 or Mar 2021"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      End Date
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={job.current}
                        onChange={(e) =>
                          updateWork(job.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? "Present" : "",
                          })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      Current position
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={job.current}
                    value={job.current ? "Present" : job.endDate}
                    onChange={(e) => updateWork(job.id, { endDate: e.target.value })}
                    placeholder="e.g. 2023-08 or Present"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={job.location}
                    onChange={(e) => updateWork(job.id, { location: e.target.value })}
                    placeholder="e.g. San Francisco, CA (or Remote)"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Bullet Points / Highlights */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Key Achievements & Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={() => addHighlight(job.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {job.highlights?.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-2 text-xs">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleHighlightChange(job.id, bIdx, e.target.value)}
                        placeholder="Action verb + Context + Quantifiable Metric (e.g. Architected streaming pipeline cutting latency by 45%)"
                        className="flex-1 text-xs border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(job.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition mt-1"
                        title="Delete bullet"
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

