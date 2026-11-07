"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TEMPLATES } from "@/templates/registry";
import { TemplateCategory } from "@/templates/types";
import { ShieldCheck, Search, ArrowRight } from "lucide-react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = TEMPLATES.filter((tmpl) => {
    const matchesCategory =
      selectedCategory === "all" || tmpl.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.recommendedRoles.some((r) =>
        r.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xs">
            RM
          </div>
          <span className="font-extrabold text-base text-slate-900 tracking-tight">Resume Maker</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-slate-900">
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-xs"
          >
            Create Resume
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Resume & CV Template Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse our catalog of recruiter-approved, ATS-friendly templates. Fully customizable and free to use.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl text-xs font-medium w-full sm:w-auto">
            {["all", "modern", "classic", "creative"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg capitalize transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat === "all" ? "All Templates" : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or style..."
              className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-base">{tmpl.name}</h3>
                  {tmpl.isAtsOptimized && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> ATS Friendly
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mb-4">{tmpl.description}</p>
                <div className="space-y-1 mb-6">
                  <span className="text-[11px] font-semibold text-slate-700">Best for:</span>
                  <div className="flex flex-wrap gap-1">
                    {tmpl.recommendedRoles.map((role, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/register?template=${tmpl.id}`}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition"
              >
                Use This Template <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

