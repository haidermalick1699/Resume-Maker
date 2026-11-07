import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const ClassicCleanLine: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages } = data;
  const primaryColor = design.primaryColor || "#0284C7"; // Clean Sky Blue

  return (
    <div className="p-8 bg-white text-slate-800 text-xs font-sans max-w-[800px] mx-auto min-h-[1100px] leading-relaxed">
      {/* Header with prominent left accent stripe */}
      <header className="border-l-4 pl-4 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="text-sm font-semibold text-slate-600 mt-0.5">
            {basics.label}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500">
          {basics.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> {basics.phone}
            </span>
          )}
          {(basics.location.city || basics.location.region) && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {[basics.location.city, basics.location.region].filter(Boolean).join(", ")}
            </span>
          )}
          {basics.url && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {basics.url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-5">
          <p className="text-slate-700 leading-normal">{basics.summary}</p>
        </section>
      )}

      {/* Experience */}
      {work && work.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider pl-2 border-l-2 mb-3"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>{job.position}</span>
                  <span className="text-xs text-slate-500 font-normal">
                    {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium mb-1">
                  {job.name} {job.location ? `• ${job.location}` : ""}
                </div>
                {job.summary && <p className="text-xs text-slate-600 mb-1">{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
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

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider pl-2 border-l-2 mb-3"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{edu.studyType} in {edu.area}</span>
                  <span className="text-xs text-slate-500 font-normal">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{edu.institution}</span>
                  {edu.score && <span>GPA: {edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider pl-2 border-l-2 mb-3"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Skills & Expertise
          </h2>
          <div className="space-y-1.5">
            {skills.map((s) => (
              <div key={s.id}>
                <strong className="text-slate-800">{s.name}: </strong>
                <span className="text-slate-600">{s.keywords.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider pl-2 border-l-2 mb-3"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Featured Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{p.name}</span>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-normal hover:underline">
                      Link
                    </a>
                  )}
                </div>
                {p.description && <p className="text-slate-600 text-xs">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

