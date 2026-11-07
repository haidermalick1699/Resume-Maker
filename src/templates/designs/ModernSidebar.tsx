import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export const ModernSidebar: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages, awards } = data;
  const primaryColor = design.primaryColor || "#0F766E";

  return (
    <div className="bg-white text-slate-800 text-sm max-w-[800px] mx-auto min-h-[1100px] flex">
      {/* Left Column / Sidebar (32%) */}
      <aside className="w-[32%] bg-slate-50 p-6 border-r border-slate-200 flex flex-col gap-6">
        {/* Photo */}
        {design.photo.visible && basics.image && (
          <div className="flex justify-center">
            <img
              src={basics.image}
              alt={basics.name}
              className={`w-28 h-28 object-cover ${
                design.photo.shape === "circle"
                  ? "rounded-full"
                  : design.photo.shape === "rounded"
                  ? "rounded-xl"
                  : "rounded-none"
              } border-2 border-white shadow-sm`}
            />
          </div>
        )}

        {/* Contact details */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-1">
            Contact
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            {basics.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <a href={`mailto:${basics.email}`} className="hover:underline">{basics.email}</a>
              </div>
            )}
            {basics.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>{basics.phone}</span>
              </div>
            )}
            {(basics.location.city || basics.location.region) && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>
                  {[basics.location.city, basics.location.region, basics.location.countryCode]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
            {basics.url && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <a href={basics.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {basics.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {basics.profiles?.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <a href={p.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {p.network}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-1">
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((cat) => (
                <div key={cat.id} className="text-xs">
                  <div className="font-semibold text-slate-700 mb-1">{cat.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-200/70 text-slate-700 rounded text-[11px]"
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
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-1">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-slate-800">{edu.studyType} {edu.area}</div>
                  <div className="text-slate-600">{edu.institution}</div>
                  <div className="text-slate-400 text-[11px]">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                  </div>
                  {edu.score && <div className="text-slate-500 mt-0.5">GPA: {edu.score}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">
              Languages
            </h2>
            <div className="space-y-1 text-xs">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between text-slate-700">
                  <span className="font-medium">{l.language}</span>
                  <span className="text-slate-500 text-[11px]">{l.fluency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Column / Main Body (68%) */}
      <main className="w-[68%] p-8 flex flex-col gap-6">
        {/* Name and Summary Header */}
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="text-base font-semibold text-slate-600 mt-0.5 tracking-wide uppercase text-xs">
              {basics.label}
            </p>
          )}
          {basics.summary && (
            <p className="mt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {basics.summary}
            </p>
          )}
        </header>

        {/* Work Experience */}
        {work && work.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {work.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-800 text-sm">{job.position}</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mb-1">
                    {job.name} {job.location ? `• ${job.location}` : ""}
                  </div>
                  {job.summary && <p className="text-xs text-slate-600 mb-1">{job.summary}</p>}
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700">
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-800 text-sm">
                    <div className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-normal hover:underline">
                          Link
                        </a>
                      )}
                    </div>
                    {(p.startDate || p.endDate) && (
                      <span className="text-xs text-slate-500 font-normal">
                        {formatDate(p.startDate)} {p.endDate ? `– ${formatDate(p.endDate)}` : ""}
                      </span>
                    )}
                  </div>
                  {p.description && <p className="text-xs text-slate-600 mt-0.5">{p.description}</p>}
                  {p.highlights && p.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-xs text-slate-700">
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
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Certifications & Honors
            </h2>
            <div className="space-y-2 text-xs">
              {certificates?.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span className="font-semibold text-slate-800">{c.name} ({c.issuer})</span>
                  <span className="text-slate-500">{c.date}</span>
                </div>
              ))}
              {awards?.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span className="font-semibold text-slate-800">{a.title} ({a.awarder})</span>
                  <span className="text-slate-500">{a.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

