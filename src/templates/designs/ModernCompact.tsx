import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";

export const ModernCompact: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages } = data;
  const primaryColor = design.primaryColor || "#334155"; // Slate Charcoal

  return (
    <div className="p-6 bg-white text-slate-800 text-[11px] font-sans leading-snug max-w-[800px] mx-auto min-h-[1100px]">
      {/* Compact Header */}
      <header className="border-b border-slate-300 pb-3 mb-3 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight" style={{ color: primaryColor }}>
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="text-xs font-semibold text-slate-600 tracking-wide mt-0.5">
              {basics.label}
            </p>
          )}
        </div>

        <div className="text-right text-[10px] text-slate-500 space-y-0.5">
          <div className="flex gap-2 justify-end">
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>• {basics.phone}</span>}
          </div>
          <div className="flex gap-2 justify-end">
            {(basics.location.city || basics.location.region) && (
              <span>{[basics.location.city, basics.location.region].filter(Boolean).join(", ")}</span>
            )}
            {basics.url && <span>• {basics.url.replace(/^https?:\/\//, "")}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <p className="text-[11px] text-slate-700 leading-tight mb-3">
          {basics.summary}
        </p>
      )}

      {/* Skills Bar (Horizontal High-Density Matrix) */}
      {skills && skills.length > 0 && (
        <section className="mb-3 bg-slate-50 p-2 rounded border border-slate-200">
          <div className="space-y-1">
            {skills.map((s) => (
              <div key={s.id} className="text-[10px]">
                <strong className="text-slate-800">{s.name}: </strong>
                <span className="text-slate-600">{s.keywords.join(" • ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {work && work.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2"
            style={{ color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-2.5">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{job.position} — <span className="font-semibold text-slate-700">{job.name}</span></span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-700 mt-0.5 text-[10.5px]">
                    {job.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2-Column Split for Education, Projects, Credentials */}
      <div className="grid grid-cols-2 gap-4">
        {/* Education & Credentials */}
        <div className="space-y-3">
          {education && education.length > 0 && (
            <section>
              <h2
                className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5"
                style={{ color: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.studyType} in {edu.area}</div>
                    <div className="text-[10px] text-slate-600">{edu.institution} ({formatDate(edu.startDate)} – {formatDate(edu.endDate)})</div>
                    {edu.score && <div className="text-[10px] text-slate-500">GPA: {edu.score}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certificates && certificates.length > 0 && (
            <section>
              <h2
                className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1"
                style={{ color: primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-1 text-[10px]">
                {certificates.map((c) => (
                  <div key={c.id}>
                    <strong>{c.name}</strong> • {c.issuer}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects & Languages */}
        <div className="space-y-3">
          {projects && projects.length > 0 && (
            <section>
              <h2
                className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5"
                style={{ color: primaryColor }}
              >
                Selected Projects
              </h2>
              <div className="space-y-1.5">
                {projects.map((p) => (
                  <div key={p.id}>
                    <div className="font-bold text-slate-900">{p.name}</div>
                    {p.description && <p className="text-[10px] text-slate-600">{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section>
              <h2
                className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1"
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-2 text-[10px]">
                {languages.map((l) => (
                  <span key={l.id}><strong>{l.language}:</strong> {l.fluency}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

