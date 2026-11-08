import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Packer,
} from "docx";
import { ResumeData } from "@/schemas/resume.schema";
import { formatDate } from "@/lib/utils";

/**
 * Generates an editable Microsoft Word (.docx) document preserving 100% of the
 * edited and finalized resume content including custom sections, languages,
 * awards, certificates, project highlights, and detailed contact profiles.
 */
export async function generateDocxResume(resume: ResumeData): Promise<Buffer> {
  const {
    basics,
    work = [],
    education = [],
    skills = [],
    projects = [],
    certificates = [],
    languages = [],
    awards = [],
    references = [],
    customSections = [],
  } = resume;

  const children: Paragraph[] = [];

  // Helper to create Section Headings with clean divider border
  const createSectionHeader = (title: string): Paragraph => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 260, after: 120 },
      border: {
        bottom: {
          color: "2563EB", // Primary Accent Blue
          space: 2,
          style: BorderStyle.SINGLE,
          size: 8,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22, // 11pt
          font: "Calibri",
          color: "1E293B",
        }),
      ],
    });
  };

  // 1. Header: Name
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: (basics.name || "Your Name").toUpperCase(),
          bold: true,
          size: 34, // 17pt font
          font: "Calibri",
          color: "0F172A",
        }),
      ],
    })
  );

  // 2. Header: Professional Title / Label
  if (basics.label) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: basics.label,
            italics: true,
            size: 22, // 11pt
            font: "Calibri",
            color: "2563EB",
          }),
        ],
      })
    );
  }

  // 3. Contact & Profiles Line
  const contactParts: string[] = [];
  if (basics.email) contactParts.push(basics.email);
  if (basics.phone) contactParts.push(basics.phone);
  if (basics.location?.city || basics.location?.region) {
    contactParts.push(
      [basics.location.city, basics.location.region].filter(Boolean).join(", ")
    );
  }
  if (basics.url) contactParts.push(basics.url.replace(/^https?:\/\//, ""));

  if (basics.profiles && basics.profiles.length > 0) {
    for (const p of basics.profiles) {
      if (p.url) {
        contactParts.push(p.url.replace(/^https?:\/\/(www\.)?/, ""));
      } else if (p.username) {
        contactParts.push(`${p.network}: ${p.username}`);
      }
    }
  }

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        border: {
          bottom: {
            color: "E2E8F0",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        children: [
          new TextRun({
            text: contactParts.join("  |  "),
            size: 19, // 9.5pt
            font: "Calibri",
            color: "475569",
          }),
        ],
      })
    );
  }

  // 4. Professional Summary
  if (basics.summary && basics.summary.trim()) {
    children.push(createSectionHeader("Professional Summary"));
    children.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: basics.summary.trim(),
            size: 20, // 10pt
            font: "Calibri",
            color: "334155",
          }),
        ],
      })
    );
  }

  // 5. Work Experience
  if (work && work.length > 0) {
    children.push(createSectionHeader("Work Experience"));

    work.forEach((job) => {
      const sDate = formatDate(job.startDate);
      const eDate = job.current ? "Present" : formatDate(job.endDate);
      const dateStr = sDate ? `${sDate} – ${eDate}` : "";

      // Position & Date
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 30 },
          children: [
            new TextRun({
              text: job.position || "Position",
              bold: true,
              size: 21,
              font: "Calibri",
              color: "0F172A",
            }),
            ...(dateStr
              ? [
                  new TextRun({
                    text: `\t${dateStr}`,
                    bold: false,
                    size: 19,
                    font: "Calibri",
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );

      // Company & Location
      const metaParts: string[] = [];
      if (job.name) metaParts.push(job.name);
      if (job.location) metaParts.push(job.location);

      if (metaParts.length > 0) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: metaParts.join(" — "),
                italics: true,
                size: 20,
                font: "Calibri",
                color: "2563EB",
              }),
            ],
          })
        );
      }

      // Summary
      if (job.summary && job.summary.trim()) {
        children.push(
          new Paragraph({
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: job.summary.trim(),
                size: 19,
                font: "Calibri",
                color: "334155",
              }),
            ],
          })
        );
      }

      // Bullet Highlights
      if (job.highlights && job.highlights.length > 0) {
        job.highlights.forEach((bullet) => {
          if (!bullet.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 30 },
              children: [
                new TextRun({
                  text: bullet.trim(),
                  size: 19,
                  font: "Calibri",
                  color: "334155",
                }),
              ],
            })
          );
        });
      }
    });
  }

  // 6. Education
  if (education && education.length > 0) {
    children.push(createSectionHeader("Education"));

    education.forEach((edu) => {
      const sDate = formatDate(edu.startDate);
      const eDate = edu.current ? "Present" : formatDate(edu.endDate);
      const eduDate = sDate ? `${sDate} – ${eDate}` : "";
      const degreeStr = [edu.studyType, edu.area].filter(Boolean).join(" in ") || "Degree";

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 30 },
          children: [
            new TextRun({
              text: degreeStr,
              bold: true,
              size: 21,
              font: "Calibri",
              color: "0F172A",
            }),
            ...(eduDate
              ? [
                  new TextRun({
                    text: `\t${eduDate}`,
                    size: 19,
                    font: "Calibri",
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );

      const eduMeta: string[] = [];
      if (edu.institution) eduMeta.push(edu.institution);
      if (edu.score) eduMeta.push(`Honors/GPA: ${edu.score}`);

      if (eduMeta.length > 0) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: eduMeta.join(" — "),
                italics: true,
                size: 20,
                font: "Calibri",
                color: "2563EB",
              }),
            ],
          })
        );
      }

      if (edu.courses && edu.courses.length > 0) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `Relevant Coursework: ${edu.courses.join(", ")}`,
                size: 19,
                font: "Calibri",
                color: "475569",
              }),
            ],
          })
        );
      }

      if (edu.highlights && edu.highlights.length > 0) {
        edu.highlights.forEach((h) => {
          if (!h.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 30 },
              children: [
                new TextRun({
                  text: h.trim(),
                  size: 19,
                  font: "Calibri",
                  color: "334155",
                }),
              ],
            })
          );
        });
      }
    });
  }

  // 7. Technical Skills & Core Competencies
  if (skills && skills.length > 0) {
    children.push(createSectionHeader("Skills & Competencies"));

    skills.forEach((cat) => {
      children.push(
        new Paragraph({
          spacing: { after: 50 },
          children: [
            new TextRun({
              text: `${cat.name || "Skills"}: `,
              bold: true,
              size: 20,
              font: "Calibri",
              color: "0F172A",
            }),
            new TextRun({
              text: (cat.keywords || []).join(", "),
              size: 20,
              font: "Calibri",
              color: "334155",
            }),
          ],
        })
      );
    });
  }

  // 8. Projects
  if (projects && projects.length > 0) {
    children.push(createSectionHeader("Projects"));

    projects.forEach((proj) => {
      const projLinks: string[] = [];
      if (proj.url) projLinks.push(proj.url);
      if (proj.githubUrl) projLinks.push(proj.githubUrl);

      children.push(
        new Paragraph({
          spacing: { before: 90, after: 30 },
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
              size: 21,
              font: "Calibri",
              color: "0F172A",
            }),
            ...(projLinks.length > 0
              ? [
                  new TextRun({
                    text: `\t${projLinks.join("  |  ")}`,
                    size: 18,
                    font: "Calibri",
                    color: "2563EB",
                  }),
                ]
              : []),
          ],
        })
      );

      if (proj.description && proj.description.trim()) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: proj.description.trim(),
                size: 19,
                font: "Calibri",
                color: "334155",
              }),
            ],
          })
        );
      }

      if (proj.highlights && proj.highlights.length > 0) {
        proj.highlights.forEach((bullet) => {
          if (!bullet.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 30 },
              children: [
                new TextRun({
                  text: bullet.trim(),
                  size: 19,
                  font: "Calibri",
                  color: "334155",
                }),
              ],
            })
          );
        });
      }
    });
  }

  // 9. Certificates & Licenses
  if (certificates && certificates.length > 0) {
    children.push(createSectionHeader("Certifications & Licenses"));

    certificates.forEach((cert) => {
      const meta = [cert.issuer, formatDate(cert.date)].filter(Boolean).join("  •  ");
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 30 },
          children: [
            new TextRun({
              text: cert.name,
              bold: true,
              size: 20,
              font: "Calibri",
              color: "0F172A",
            }),
            ...(meta
              ? [
                  new TextRun({
                    text: `\t${meta}`,
                    size: 19,
                    font: "Calibri",
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );
    });
  }

  // 10. Languages
  if (languages && languages.length > 0) {
    children.push(createSectionHeader("Languages"));
    const langItems = languages.map((l) => `${l.language} (${l.fluency || "Proficient"})`);
    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: langItems.join("  •  "),
            size: 20,
            font: "Calibri",
            color: "334155",
          }),
        ],
      })
    );
  }

  // 11. Awards & Honors
  if (awards && awards.length > 0) {
    children.push(createSectionHeader("Honors & Awards"));
    awards.forEach((aw) => {
      const meta = [aw.awarder, formatDate(aw.date)].filter(Boolean).join("  •  ");
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({
              text: aw.title,
              bold: true,
              size: 20,
              font: "Calibri",
              color: "0F172A",
            }),
            ...(meta
              ? [
                  new TextRun({
                    text: `\t${meta}`,
                    size: 19,
                    font: "Calibri",
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );

      if (aw.summary && aw.summary.trim()) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: aw.summary.trim(),
                size: 19,
                font: "Calibri",
                color: "475569",
              }),
            ],
          })
        );
      }
    });
  }

  // 12. Custom Sections (Preserves all user-added and edited custom sections!)
  if (customSections && customSections.length > 0) {
    customSections.forEach((sec) => {
      if (!sec.items || sec.items.length === 0) return;
      children.push(createSectionHeader(sec.title || "Additional Information"));

      sec.items.forEach((item) => {
        children.push(
          new Paragraph({
            spacing: { before: 70, after: 20 },
            children: [
              new TextRun({
                text: item.title,
                bold: true,
                size: 20,
                font: "Calibri",
                color: "0F172A",
              }),
              ...(item.date
                ? [
                    new TextRun({
                      text: `\t${item.date}`,
                      size: 19,
                      font: "Calibri",
                      color: "64748B",
                    }),
                  ]
                : []),
            ],
          })
        );

        if (item.subtitle) {
          children.push(
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({
                  text: item.subtitle,
                  italics: true,
                  size: 19,
                  font: "Calibri",
                  color: "2563EB",
                }),
              ],
            })
          );
        }

        if (item.summary) {
          children.push(
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({
                  text: item.summary,
                  size: 19,
                  font: "Calibri",
                  color: "334155",
                }),
              ],
            })
          );
        }

        if (item.highlights && item.highlights.length > 0) {
          item.highlights.forEach((bullet) => {
            if (!bullet.trim()) return;
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 30 },
                children: [
                  new TextRun({
                    text: bullet.trim(),
                    size: 19,
                    font: "Calibri",
                    color: "334155",
                  }),
                ],
              })
            );
          });
        }
      });
    });
  }

  // 13. References
  if (references && references.length > 0) {
    children.push(createSectionHeader("References"));
    references.forEach((ref) => {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({
              text: ref.name,
              bold: true,
              size: 20,
              font: "Calibri",
              color: "0F172A",
            }),
            ...(ref.contact
              ? [
                  new TextRun({
                    text: `  (${ref.contact})`,
                    size: 19,
                    font: "Calibri",
                    color: "64748B",
                  }),
                ]
              : []),
          ],
        })
      );
      if (ref.reference) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: ref.reference,
                italics: true,
                size: 19,
                font: "Calibri",
                color: "475569",
              }),
            ],
          })
        );
      }
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch margins
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
