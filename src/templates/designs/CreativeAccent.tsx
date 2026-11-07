import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export const CreativeAccent: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages } = data;
  const primaryColor = design.primaryColor || "#6366F1"; // Modern Indigo/Violet

  return (
    <div className="bg-white text-slate-800 font-sans text-xs max-w-[800px] mx-auto min-h-[1100px] overflow-hidden shadow-sm">
      {/* Vibrant Header Banner */}
      <header
        className="p-8 text-white relative flex flex-col justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {basics.name || "Your Name"}
            </h1>
            {basics.label && (
              <p className="text-sm font-medium text-white/90 mt-1 uppercase tracking-wider">
                {basics.label}
              </p>
            )}
          </div>
          {design.photo.visible && basics.image && (
            <img
              src={basics.image}
              alt={basics.name}
              className={`w-20 h-20 object-cover ${
                design.photo.shape === "circle"
                  ? "rounded-full"
                  : design.photo.shape === "rounded"
                  ? "rounded-2xl"
                  : "rounded-none"
              } border-2 border-white/60 shadow-md`}
            />
          )}
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-[11px] text-white/80 border-t border-white/20 pt-3">
          {basics.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-white/70" />
              <a href={`mailto:${basics.email}`} className="hover:underline">{basics.email}</a>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-white/70" />
              <span>{basics.phone}</span>
            </div>
          )}
          {(basics.location.city || basics.location.region) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span>{[basics.location.city, basics.location.region].filter(Boolean).join(", ")}</span>
            </div>
          )}
          {basics.url && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-white/70" />
              <span>{basics.url.replace(/^https?:\/\//, "")}</span>
            </div>
          )}
          {basics.profiles?.map((p) => (
            <div key={p.id} className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3 text-white/70" />
              <span>{p.network}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Body */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {basics.summary && (
          <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-700 leading-relaxed text-xs">{basics.summary}</p>
          </section>
        )}

        {/* Experience with timeline dots */}
        {work && work.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              Professional Journey
            </h2>
            <div className="space-y-4 pl-3 border-l-2 border-slate-100 ml-1">
              {work.map((job) => (
                <div key={job.id} className="relative pl-3">
                  <div
                    className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex justify-between items-baseline font-bold text-slate-800 text-sm">
                    <span>{job.position}</span>
                    <span className="text-xs text-slate-500 font-normal">
                      {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium text-xs mb-1">
                    {job.name} {job.location ? `• ${job.location}` : ""}
                  </div>
                  {job.summary && <p className="text-slate-600 mb-1">{job.summary}</p>}
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-xs">
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

        {/* 2-column Split: Left (Projects & Education), Right (Skills & Extras) */}
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 space-y-5">
            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Featured Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{p.name}</span>
                        {p.url && (
                          <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                            Live Demo
                          </a>
                        )}
                      </div>
                      {p.description && <p className="text-slate-600 text-xs mt-1">{p.description}</p>}
                      {p.keywords && p.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {p.keywords.map((kw, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-white text-slate-600 rounded text-[10px] border border-slate-200">
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="font-bold text-slate-800">{edu.studyType} in {edu.area}</div>
                      <div className="text-slate-600">{edu.institution} ({formatDate(edu.startDate)} – {formatDate(edu.endDate)})</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-2 space-y-5">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                  style={{ color: primaryColor }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Skills & Tools
                </h2>
                <div className="space-y-2.5">
                  {skills.map((s) => (
                    <div key={s.id}>
                      <div className="font-semibold text-slate-700 text-[11px] mb-1">{s.name}</div>
                      <div className="flex flex-wrap gap-1">
                        {s.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications & Languages */}
            {certificates && certificates.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Certifications
                </h2>
                <div className="space-y-1.5 text-slate-700">
                  {certificates.map((c) => (
                    <div key={c.id}>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.issuer}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Languages
                </h2>
                <div className="space-y-1 text-slate-700">
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
    </div>
  );
};

