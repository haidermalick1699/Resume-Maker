import React from "react";
import { TemplateProps } from "../types";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export const ModernMinimal: React.FC<TemplateProps> = ({ data, design }) => {
  const { basics, work, education, skills, projects, certificates, languages, awards, customSections } = data;
  const primaryColor = design.primaryColor || "#2563EB";

  const fontClass =
    design.fontFamily === "Merriweather"
      ? "font-serif"
      : design.fontFamily === "Courier Prime"
      ? "font-mono"
      : "font-sans";

  return (
    <div className={`p-8 bg-white text-slate-800 ${fontClass} text-sm leading-relaxed max-w-[800px] mx-auto`}>
      {/* Header */}
      <header className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900" style={{ color: primaryColor }}>
              {basics.name || "Your Name"}
            </h1>
            {basics.label && (
              <p className="text-lg font-medium text-slate-600 mt-1">{basics.label}</p>
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
                  ? "rounded-lg"
                  : "rounded-none"
              } border border-slate-200`}
            />
          )}
        </div>

        {/* Contact info pills */}
        <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-xs text-slate-600">
          {basics.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <a href={`mailto:${basics.email}`} className="hover:underline">{basics.email}</a>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{basics.phone}</span>
            </div>
          )}
          {(basics.location.city || basics.location.region) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {[basics.location.city, basics.location.region, basics.location.countryCode]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}
          {basics.url && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <a href={basics.url} target="_blank" rel="noreferrer" className="hover:underline">
                {basics.url.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {basics.profiles?.map((profile) => (
            <div key={profile.id} className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3 text-slate-400" />
              <a href={profile.url} target="_blank" rel="noreferrer" className="hover:underline">
                {profile.network}
              </a>
            </div>
          ))}
        </div>

        {/* Professional Summary */}
        {basics.summary && (
          <p className="mt-4 text-xs text-slate-700 leading-normal border-t border-slate-100 pt-3">
            {basics.summary}
          </p>
        )}
      </header>

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1"
            style={{ borderColor: primaryColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {work.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900 text-sm">{job.position}</h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {formatDate(job.startDate)} – {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-slate-600 mb-1.5">
                  <span className="font-medium">{job.name}</span>
                  {job.location && <span className="text-slate-400">{job.location}</span>}
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

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1"
            style={{ borderColor: primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {edu.studyType} {edu.area ? `in ${edu.area}` : ""}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{edu.institution}</span>
                  {edu.score && <span className="text-slate-500">GPA: {edu.score}</span>}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-xs text-slate-700">
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1"
            style={{ borderColor: primaryColor }}
          >
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="text-xs">
                <span className="font-semibold text-slate-800">{skillGroup.name}: </span>
                <span className="text-slate-600">{skillGroup.keywords.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1"
            style={{ borderColor: primaryColor }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{proj.name}</h3>
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                        View Live
                      </a>
                    )}
                  </div>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs text-slate-500">
                      {formatDate(proj.startDate)} {proj.endDate ? `– ${formatDate(proj.endDate)}` : ""}
                    </span>
                  )}
                </div>
                {proj.description && <p className="text-xs text-slate-600 mb-1">{proj.description}</p>}
                {proj.keywords && proj.keywords.length > 0 && (
                  <p className="text-xs text-slate-500 mb-1">
                    <span className="font-medium text-slate-700">Tech: </span>
                    {proj.keywords.join(", ")}
                  </p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates & Awards in 2 columns */}
      {((certificates && certificates.length > 0) || (awards && awards.length > 0)) && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          {certificates && certificates.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1"
                style={{ borderColor: primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-semibold text-slate-800">{cert.name}</div>
                    <div className="text-slate-500">{cert.issuer} {cert.date ? `• ${cert.date}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {awards && awards.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1"
                style={{ borderColor: primaryColor }}
              >
                Awards & Honors
              </h2>
              <div className="space-y-2">
                {awards.map((award) => (
                  <div key={award.id} className="text-xs">
                    <div className="font-semibold text-slate-800">{award.title}</div>
                    <div className="text-slate-500">{award.awarder} {award.date ? `• ${award.date}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1"
            style={{ borderColor: primaryColor }}
          >
            Languages
          </h2>
          <div className="flex flex-wrap gap-4 text-xs">
            {languages.map((lang) => (
              <span key={lang.id} className="text-slate-700">
                <strong className="text-slate-900">{lang.language}:</strong> {lang.fluency}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mb-6">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1"
            style={{ borderColor: primaryColor }}
          >
            {sec.title}
          </h2>
          <div className="space-y-3">
            {sec.items.map((item) => (
              <div key={item.id} className="text-xs">
                <div className="flex justify-between items-baseline font-semibold text-slate-900">
                  <span>{item.title}</span>
                  {item.date && <span className="text-slate-500 font-normal">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-slate-600 font-medium">{item.subtitle}</p>}
                {item.summary && <p className="text-slate-600 mt-1">{item.summary}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-700">
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

