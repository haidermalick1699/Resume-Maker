import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export const ModernCorporate: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages, awards } = data;
  const primaryColor = design.primaryColor || "#1E3A8A"; // Deep Corporate Navy

  return (
    <div className="bg-white text-slate-800 text-xs font-sans max-w-[800px] mx-auto min-h-[1100px] shadow-sm">
      {/* Top Banner with Dark Corporate Accent */}
      <header
        className="p-8 text-white flex justify-between items-start gap-4"
        style={{ backgroundColor: primaryColor }}
      >
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight uppercase">
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="text-xs uppercase tracking-widest text-white/80 font-semibold mt-1">
              {basics.label}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[11px] text-white/90">
            {basics.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 opacity-80" /> {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 opacity-80" /> {basics.phone}
              </span>
            )}
            {(basics.location.city || basics.location.region) && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 opacity-80" />
                {[basics.location.city, basics.location.region].filter(Boolean).join(", ")}
              </span>
            )}
            {basics.url && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 opacity-80" />
                {basics.url.replace(/^https?:\/\//, "")}
              </span>
            )}
          </div>
        </div>

        {design.photo.visible && basics.image && (
          <img
            src={basics.image}
            alt={basics.name}
            className={`w-20 h-20 object-cover ${
              design.photo.shape === "circle"
                ? "rounded-full"
                : design.photo.shape === "rounded"
                ? "rounded-xl"
                : "rounded-none"
            } border-2 border-white/80 shadow`}
          />
        )}
      </header>

      {/* Main Body Grid: 2 Columns (68% left / 32% right) */}
      <div className="p-8 grid grid-cols-12 gap-8">
        {/* Left Column (Main experience & summary) */}
        <div className="col-span-8 space-y-6">
          {/* Executive Summary */}
          {basics.summary && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Executive Summary
              </h2>
              <p className="text-slate-700 leading-relaxed text-xs">{basics.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {work && work.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Leadership & Experience
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

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Strategic Initiatives & Projects
              </h2>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                      <span>{p.name}</span>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-blue-600 font-normal hover:underline">
                          Link
                        </a>
                      )}
                    </div>
                    {p.description && <p className="text-slate-600 mt-0.5">{p.description}</p>}
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
        </div>

        {/* Right Sidebar (Skills, Education, Credentials) */}
        <div className="col-span-4 space-y-6 border-l border-slate-100 pl-6">
          {/* Core Competencies */}
          {skills && skills.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Core Competencies
              </h2>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div key={s.id}>
                    <div className="font-semibold text-slate-800 text-[11px] mb-1">{s.name}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.keywords.map((kw, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.studyType} in {edu.area}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-slate-400 text-[11px]">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</div>
                    {edu.score && <div className="text-slate-500 text-[11px]">Honors: {edu.score}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications & Languages */}
          {certificates && certificates.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-1.5">
                {certificates.map((c) => (
                  <div key={c.id}>
                    <div className="font-medium text-slate-800">{c.name}</div>
                    <div className="text-slate-400 text-[10px]">{c.issuer} • {c.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium">{l.language}</span>
                    <span className="text-slate-400 text-[11px]">{l.fluency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

