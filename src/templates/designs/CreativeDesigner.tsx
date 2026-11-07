import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export const CreativeDesigner: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages } = data;
  const primaryColor = design.primaryColor || "#EC4899"; // Vibrant Pink / Creative Magenta

  return (
    <div className="bg-white text-slate-800 text-xs font-sans max-w-[800px] mx-auto min-h-[1100px] flex shadow-md">
      {/* Dark Modern Sidebar (34%) */}
      <aside className="w-[34%] bg-slate-900 text-white p-6 flex flex-col gap-6">
        {/* Photo with Accent Ring */}
        {design.photo.visible && basics.image && (
          <div className="flex justify-center">
            <img
              src={basics.image}
              alt={basics.name}
              className={`w-24 h-24 object-cover ${
                design.photo.shape === "circle"
                  ? "rounded-full"
                  : design.photo.shape === "rounded"
                  ? "rounded-2xl"
                  : "rounded-none"
              } border-2 shadow-lg`}
              style={{ borderColor: primaryColor }}
            />
          </div>
        )}

        {/* Name in Sidebar */}
        <div className="text-center">
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-1" style={{ color: primaryColor }}>
              {basics.label}
            </p>
          )}
        </div>

        {/* Contact Links */}
        <div className="space-y-2 text-[11px] text-slate-300 border-t border-slate-800 pt-4">
          {basics.email && (
            <div className="flex items-center gap-2 break-all">
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />
              <a href={`mailto:${basics.email}`} className="hover:text-white transition">{basics.email}</a>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />
              <span>{basics.phone}</span>
            </div>
          )}
          {(basics.location.city || basics.location.region) && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />
              <span>{[basics.location.city, basics.location.region].filter(Boolean).join(", ")}</span>
            </div>
          )}
          {basics.url && (
            <div className="flex items-center gap-2 break-all">
              <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />
              <a href={basics.url} target="_blank" rel="noreferrer" className="hover:text-white transition">
                {basics.url.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {basics.profiles?.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: primaryColor }} />
              <a href={p.url} target="_blank" rel="noreferrer" className="hover:text-white transition">
                {p.network}
              </a>
            </div>
          ))}
        </div>

        {/* Skills Chips */}
        {skills && skills.length > 0 && (
          <div className="border-t border-slate-800 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Design & Tech Stack
            </h2>
            <div className="space-y-3">
              {skills.map((s) => (
                <div key={s.id}>
                  <div className="text-[11px] font-semibold text-slate-200 mb-1">{s.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="border-t border-slate-800 pt-4 text-[11px]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="font-semibold text-white">{edu.studyType} in {edu.area}</div>
                <div className="text-slate-400 text-[10px]">{edu.institution}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content (66%) */}
      <main className="w-[66%] p-8 flex flex-col gap-6">
        {/* Summary */}
        {basics.summary && (
          <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-700 leading-relaxed text-xs">{basics.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {work && work.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Work History
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
                  <div className="text-xs font-semibold mb-1" style={{ color: primaryColor }}>
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

        {/* Projects / Portfolio Highlights */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Portfolio & Featured Works
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{p.name}</span>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="text-xs font-semibold hover:underline" style={{ color: primaryColor }}>
                        View Case Study
                      </a>
                    )}
                  </div>
                  {p.description && <p className="text-xs text-slate-600 mt-1">{p.description}</p>}
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
      </main>
    </div>
  );
};

