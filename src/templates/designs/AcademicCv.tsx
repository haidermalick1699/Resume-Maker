import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";

export const AcademicCv: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, awards, customSections } = data;
  const primaryColor = design.primaryColor || "#3F3F46"; // Academic Charcoal

  return (
    <div className="p-10 bg-white text-slate-900 font-serif text-xs leading-relaxed max-w-[800px] mx-auto min-h-[1100px]">
      {/* Formal Academic Header */}
      <header className="text-center border-b border-slate-300 pb-5 mb-6">
        <h1 className="text-3xl font-normal tracking-wide text-slate-950 mb-1">
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="text-xs uppercase tracking-widest text-slate-600 font-sans mb-3">
            {basics.label}
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 font-sans">
          {(basics.location.city || basics.location.region) && (
            <span>{[basics.location.city, basics.location.region].filter(Boolean).join(", ")}</span>
          )}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.email && (
            <span>• <a href={`mailto:${basics.email}`} className="hover:underline">{basics.email}</a></span>
          )}
          {basics.url && (
            <span>• <a href={basics.url} target="_blank" rel="noreferrer" className="hover:underline">{basics.url.replace(/^https?:\/\//, "")}</a></span>
          )}
        </div>
      </header>

      {/* Research Statement / Summary */}
      {basics.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2 font-sans text-slate-700">
            Research Interests & Profile
          </h2>
          <p className="text-slate-800 leading-relaxed italic">{basics.summary}</p>
        </section>
      )}

      {/* Higher Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans text-slate-700">
            Higher Education & Degrees
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-950 text-sm">
                  <span>{edu.studyType} in {edu.area}</span>
                  <span className="text-xs font-sans text-slate-600 font-normal">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="italic text-slate-700 text-xs">
                  {edu.institution} {edu.score ? `(Honors / GPA: ${edu.score})` : ""}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-700 text-xs">
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

      {/* Academic & Research Appointments */}
      {work && work.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans text-slate-700">
            Academic Appointments & Experience
          </h2>
          <div className="space-y-4">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-950 text-sm">
                  <span>{job.position}</span>
                  <span className="text-xs font-sans text-slate-600 font-normal">
                    {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="italic text-slate-700 text-xs mb-1">
                  {job.name} {job.location ? `• ${job.location}` : ""}
                </div>
                {job.summary && <p className="text-slate-800 text-xs mb-1">{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800 text-xs">
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

      {/* Publications / Research Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans text-slate-700">
            Selected Publications & Research Grants
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
                {p.description && <p className="italic text-slate-700 mt-0.5">{p.description}</p>}
                {p.highlights && p.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-800">
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

      {/* Honors, Awards & Grants */}
      {awards && awards.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2 font-sans text-slate-700">
            Honors, Fellowships & Awards
          </h2>
          <div className="space-y-1.5">
            {awards.map((a) => (
              <div key={a.id} className="flex justify-between">
                <span><strong>{a.title}</strong> — {a.awarder}</span>
                <span className="text-slate-600 font-sans">{a.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Teaching, Methodologies & Languages */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2 font-sans text-slate-700">
          Methodologies & Languages
        </h2>
        <div className="space-y-1 text-slate-800">
          {skills && skills.length > 0 && (
            <div>
              <strong>Methodologies & Tools: </strong>
              <span>{skills.map((s) => s.keywords.join(", ")).join("; ")}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

