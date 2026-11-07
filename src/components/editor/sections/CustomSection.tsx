"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Plus, Trash2, PlusCircle } from "lucide-react";

export const CustomSection: React.FC = () => {
  const { data, addCustomSection, updateCustomSection, removeCustomSection } = useResumeStore();
  const { customSections } = data;

  const addItem = (secId: string) => {
    const sec = customSections.find((s) => s.id === secId);
    if (!sec) return;
    const newItem = {
      id: `item_${Date.now()}`,
      title: "New Item",
      subtitle: "",
      date: "",
      summary: "",
      highlights: [],
    };
    updateCustomSection(secId, { items: [...sec.items, newItem] });
  };

  const removeItem = (secId: string, itemId: string) => {
    const sec = customSections.find((s) => s.id === secId);
    if (!sec) return;
    updateCustomSection(secId, { items: sec.items.filter((it) => it.id !== itemId) });
  };

  const updateItem = (secId: string, itemId: string, partial: any) => {
    const sec = customSections.find((s) => s.id === secId);
    if (!sec) return;
    updateCustomSection(secId, {
      items: sec.items.map((it) => (it.id === itemId ? { ...it, ...partial } : it)),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Custom Sections</h2>
          <p className="text-xs text-slate-500">
            Create custom sections for volunteering, publications, licenses, or patents.
          </p>
        </div>
        <button
          type="button"
          onClick={() => addCustomSection("Custom Section")}
          className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Section
        </button>
      </div>

      {customSections.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No custom sections added.</p>
          <button
            onClick={() => addCustomSection("Volunteer Work")}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Create a custom section
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {customSections.map((sec) => (
            <div
              key={sec.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => updateCustomSection(sec.id, { title: e.target.value })}
                  placeholder="Section Title (e.g. Publications & Patents)"
                  className="font-bold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-2/3"
                />
                <button
                  type="button"
                  onClick={() => removeCustomSection(sec.id)}
                  className="text-xs text-slate-400 hover:text-red-600 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Section
                </button>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {sec.items.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(sec.id, item.id, { title: e.target.value })}
                        placeholder="Title / Heading"
                        className="text-xs font-semibold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-1/2"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(sec.id, item.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={item.subtitle || ""}
                        onChange={(e) => updateItem(sec.id, item.id, { subtitle: e.target.value })}
                        placeholder="Subtitle / Organization"
                        className="text-xs border border-slate-200 bg-white rounded px-2.5 py-1.5 outline-none"
                      />
                      <input
                        type="text"
                        value={item.date || ""}
                        onChange={(e) => updateItem(sec.id, item.id, { date: e.target.value })}
                        placeholder="Date (e.g. 2023)"
                        className="text-xs border border-slate-200 bg-white rounded px-2.5 py-1.5 outline-none"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={item.summary || ""}
                      onChange={(e) => updateItem(sec.id, item.id, { summary: e.target.value })}
                      placeholder="Summary details..."
                      className="w-full text-xs border border-slate-200 bg-white rounded p-2 outline-none"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem(sec.id)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mt-2"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

