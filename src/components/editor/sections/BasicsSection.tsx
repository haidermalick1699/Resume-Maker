"use client";

import React from "react";
import { useResumeStore } from "@/stores/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export const BasicsSection: React.FC = () => {
  const {
    data,
    updateBasics,
    updateLocation,
    addProfile,
    removeProfile,
    updateProfile,
  } = useResumeStore();

  const { basics } = data;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Personal Details</h2>
        <p className="text-xs text-slate-500">
          Enter your contact information and professional headline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={basics.name}
            onChange={(e) => updateBasics({ name: e.target.value })}
            placeholder="e.g. Alex Sterling"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Professional Title / Headline */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Professional Title / Headline
          </label>
          <input
            type="text"
            value={basics.label}
            onChange={(e) => updateBasics({ label: e.target.value })}
            placeholder="e.g. Senior Full-Stack Architect"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={basics.email}
            onChange={(e) => updateBasics({ email: e.target.value })}
            placeholder="e.g. alex@example.com"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={basics.phone}
            onChange={(e) => updateBasics({ phone: e.target.value })}
            placeholder="e.g. +1 (555) 234-5678"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* City & State */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            City & State / Region
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={basics.location.city}
              onChange={(e) => updateLocation({ city: e.target.value })}
              placeholder="City (e.g. San Francisco)"
              className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={basics.location.region}
              onChange={(e) => updateLocation({ region: e.target.value })}
              placeholder="State / Region (e.g. CA)"
              className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Personal Website / Portfolio URL */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Website or Portfolio URL
          </label>
          <input
            type="url"
            value={basics.url}
            onChange={(e) => updateBasics({ url: e.target.value })}
            placeholder="e.g. https://alexsterling.dev"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Photo URL */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Photo URL
          </label>
          <input
            type="url"
            value={basics.image}
            onChange={(e) => updateBasics({ image: e.target.value })}
            placeholder="Paste public image URL (e.g. https://images.unsplash.com/...)"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={basics.summary}
          onChange={(e) => updateBasics({ summary: e.target.value })}
          placeholder="Brief 2-4 sentence overview of your career background, key accomplishments, and target roles..."
          className="w-full text-xs border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Social Profiles */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700">
            Social Profiles & Links
          </label>
          <button
            type="button"
            onClick={addProfile}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold"
          >
            <Plus className="w-3.5 h-3.5" /> Add Link
          </button>
        </div>

        <div className="space-y-2">
          {basics.profiles?.map((prof) => (
            <div key={prof.id} className="flex items-center gap-2">
              <select
                value={prof.network}
                onChange={(e) => updateProfile(prof.id, { network: e.target.value })}
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 outline-none"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="GitHub">GitHub</option>
                <option value="Twitter">Twitter / X</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Dribbble">Dribbble</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="url"
                value={prof.url}
                onChange={(e) => updateProfile(prof.id, { url: e.target.value })}
                placeholder="https://..."
                className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeProfile(prof.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

