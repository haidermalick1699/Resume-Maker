import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";

export const ClassicIvyLeague: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages, awards } = data;
  const primaryColor = design.primaryColor || "#4B1D24"; // Rich burgundy / Ivy League crimson

  return (
    <div className="p-10 bg-white text-slate-900 font-serif text-xs leading-relaxed max-w-[800px] mx-auto min-h-[1100px]">
      {/* Centered Prestigious Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-normal tracking-wide text-slate-900 mb-1" style={{ color: primaryColor }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="text-xs uppercase tracking-widest text-slate-600 font-sans mb-3">
            {basics.label}
          </p>
        )}
        <div className="border-t border-b border-slate-300 py-1.5 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] text-slate-700 font-sans">
          {(basics.location.city || basics.location.region) && (
            <span>
              {[basics.location.city, basics.location.region, basics.location.countryCode].filter(Boolean).join(", ")}
            </span>
          )}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.email && (
            <span>
              • <a href={`mailto:${basics.email}`} className="hover:underline">{basics.email}</a>
            </span>
          )}
          {basics.url && (
            <span>
              • <a href={basics.url} target="_blank" rel="noreferrer" className="hover:underline">{basics.url.replace(/^https?:\/\//, "")}</a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-5">
          <p className="italic text-slate-700 text-center max-w-xl mx-auto leading-relaxed">
            "{basics.summary}"
          </p>
        </section>
      )}

      {/* Education (Ivy League style puts Education first or prominent) */}
      {education && education.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans"
            style={{ color: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>{edu.institution}</span>
                  <span className="text-xs font-sans text-slate-600 font-normal">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-slate-800 text-xs">
                  <span>{edu.studyType} in {edu.area}</span>
                  {edu.score && <span className="not-italic text-slate-600 font-sans">Honors / GPA: {edu.score}</span>}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-700">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans"
            style={{ color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>{job.position}</span>
                  <span className="text-xs font-sans text-slate-600 font-normal">
                    {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-slate-800 text-xs mb-1">
                  <span>{job.name}</span>
                  {job.location && <span className="not-italic text-slate-600 font-sans">{job.location}</span>}
                </div>
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

      {/* Selected Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans"
            style={{ color: primaryColor }}
          >
            Selected Works & Research
          </h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{p.name}</span>
                  {(p.startDate || p.endDate) && (
                    <span className="text-xs font-sans text-slate-600 font-normal">
                      {formatDate(p.startDate)} {p.endDate ? `– ${formatDate(p.endDate)}` : ""}
                    </span>
                  )}
                </div>
                {p.description && <p className="text-slate-700 italic mt-0.5">{p.description}</p>}
                {p.highlights && p.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-700">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills, Honors & Languages */}
      <section className="mb-4">
        <h2
          className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2 font-sans"
          style={{ color: primaryColor }}
        >
          Competencies, Honors & Languages
        </h2>
        <div className="space-y-1.5 text-slate-800">
          {skills && skills.length > 0 && (
            <div>
              <span className="font-bold">Skills: </span>
              <span>{skills.map((s) => s.keywords.join(", ")).join("; ")}</span>
            </div>
          )}
          {awards && awards.length > 0 && (
            <div>
              <span className="font-bold">Honors: </span>
              <span>{awards.map((a) => `${a.title} (${a.awarder})`).join("; ")}</span>
            </div>
          )}
          {languages && languages.length > 0 && (
            <div>
              <span className="font-bold">Languages: </span>
              <span>{languages.map((l) => `${l.language} (${l.fluency})`).join(", ")}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

