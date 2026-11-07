import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";

export const ClassicAtsStandard: React.FC<TemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, certificates, languages, awards, customSections } = data;

  return (
    <div className="p-8 bg-white text-black font-sans text-xs leading-relaxed max-w-[800px] mx-auto min-h-[1100px]">
      {/* ATS Header: Center aligned, prominent name, clean contact line */}
      <header className="text-center border-b-2 border-black pb-4 mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="text-sm font-semibold uppercase tracking-wide mb-2">
            {basics.label}
          </p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px]">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {(basics.location.city || basics.location.region) && (
            <span>
              • {[basics.location.city, basics.location.region, basics.location.countryCode]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}
          {basics.url && (
            <span>• {basics.url.replace(/^https?:\/\//, "")}</span>
          )}
          {basics.profiles?.map((p) => (
            <span key={p.id}>• {p.network}: {p.url.replace(/^https?:\/\//, "")}</span>
          ))}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-slate-900 leading-normal">{basics.summary}</p>
        </section>
      )}

      {/* Skills / Core Competencies */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Technical Skills & Core Competencies
          </h2>
          <div className="space-y-1">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold">{cat.name}: </span>
                <span>{cat.keywords.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {work && work.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>{job.name}</span>
                  <span className="font-normal">
                    {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-slate-800 mb-1">
                  <span>{job.position}</span>
                  {job.location && <span className="not-italic">{job.location}</span>}
                </div>
                {job.summary && <p className="mb-1">{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-900">
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
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>{edu.institution}</span>
                  <span className="font-normal">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-slate-800">
                  <span>{edu.studyType} in {edu.area}</span>
                  {edu.score && <span className="not-italic">GPA: {edu.score}</span>}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-900">
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <span>{p.name} {p.keywords?.length ? `(${p.keywords.join(", ")})` : ""}</span>
                  {(p.startDate || p.endDate) && (
                    <span className="font-normal">
                      {formatDate(p.startDate)} {p.endDate ? `– ${formatDate(p.endDate)}` : ""}
                    </span>
                  )}
                </div>
                {p.description && <p>{p.description}</p>}
                {p.highlights && p.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-900">
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

      {/* Certifications & Awards */}
      {((certificates && certificates.length > 0) || (awards && awards.length > 0)) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Certifications & Honors
          </h2>
          <div className="space-y-1">
            {certificates?.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span><span className="font-bold">{c.name}</span> – {c.issuer}</span>
                <span>{c.date}</span>
              </div>
            ))}
            {awards?.map((a) => (
              <div key={a.id} className="flex justify-between">
                <span><span className="font-bold">{a.title}</span> – {a.awarder}</span>
                <span>{a.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Languages
          </h2>
          <div>
            {languages.map((l, i) => (
              <span key={l.id}>
                {l.language} ({l.fluency}){i < languages.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            {sec.title}
          </h2>
          <div className="space-y-2">
            {sec.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <span>{item.title}</span>
                  {item.date && <span className="font-normal">{item.date}</span>}
                </div>
                {item.subtitle && <p className="italic">{item.subtitle}</p>}
                {item.summary && <p>{item.summary}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-900">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

