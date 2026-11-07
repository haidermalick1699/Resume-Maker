"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Plus, Trash2, X } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { data, addSkillCategory, updateSkillCategory, removeSkillCategory } = useResumeStore();
  const { skills } = data;
  const [tagInputs, setTagInputs] = useState<{ [id: string]: string }>({});

  const handleAddKeyword = (catId: string) => {
    const inputVal = (tagInputs[catId] || "").trim();
    if (!inputVal) return;

    const cat = skills.find((s) => s.id === catId);
    if (!cat) return;

    // Split by comma if multiple entered
    const newItems = inputVal
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k && !cat.keywords.includes(k));

    updateSkillCategory(catId, {
      keywords: [...cat.keywords, ...newItems],
    });

    setTagInputs((prev) => ({ ...prev, [catId]: "" }));
  };

  const handleRemoveKeyword = (catId: string, keyword: string) => {
    const cat = skills.find((s) => s.id === catId);
    if (!cat) return;
    updateSkillCategory(catId, {
      keywords: cat.keywords.filter((k) => k !== keyword),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Skills & Competencies</h2>
          <p className="text-xs text-slate-500">
            Group your skills into categories (e.g. Languages, Cloud, Frameworks) for maximum ATS scan score.
          </p>
        </div>
        <button
          type="button"
          onClick={addSkillCategory}
          className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No skills added yet.</p>
          <button
            onClick={addSkillCategory}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add skill group
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => updateSkillCategory(cat.id, { name: e.target.value })}
                  placeholder="Category Name (e.g. Core Languages)"
                  className="font-bold text-sm text-slate-800 border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none pb-0.5 w-1/2"
                />
                <button
                  type="button"
                  onClick={() => removeSkillCategory(cat.id)}
                  className="text-xs text-slate-400 hover:text-red-600 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              {/* Tag Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInputs[cat.id] || ""}
                  onChange={(e) =>
                    setTagInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddKeyword(cat.id);
                    }
                  }}
                  placeholder="Type skill and press Enter (e.g. TypeScript, React)"
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddKeyword(cat.id)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-lg transition"
                >
                  Add
                </button>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 bg-slate-50 border border-slate-100 rounded-lg">
                {cat.keywords.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic">
                    No skills in this category yet. Type above to add.
                  </span>
                ) : (
                  cat.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md shadow-2xs"
                    >
                      {kw}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(cat.id, kw)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

