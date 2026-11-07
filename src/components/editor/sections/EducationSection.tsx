"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export const EducationSection: React.FC = () => {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Education</h2>
          <p className="text-xs text-slate-500">
            List your degrees, institutions, graduation dates, and academic honors.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No education records added yet.</p>
          <button
            onClick={addEducation}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add your degree or school
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <span className="text-xs font-bold text-slate-600">
                  Degree #{idx + 1}: {edu.institution || "Untitled School"}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-xs text-slate-400 hover:text-red-600 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="e.g. Stanford University"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree / Study Type
                  </label>
                  <input
                    type="text"
                    value={edu.studyType}
                    onChange={(e) => updateEducation(edu.id, { studyType: e.target.value })}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    value={edu.area}
                    onChange={(e) => updateEducation(edu.id, { area: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GPA or Honors
                  </label>
                  <input
                    type="text"
                    value={edu.score}
                    onChange={(e) => updateEducation(edu.id, { score: e.target.value })}
                    placeholder="e.g. 3.8 / 4.0 or Magna Cum Laude"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    placeholder="e.g. 2016-09"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date / Graduation Year
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    placeholder="e.g. 2020-05 or Present"
                    className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

