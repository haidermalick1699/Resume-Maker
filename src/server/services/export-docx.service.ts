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

export async function generateDocxResume(resume: ResumeData): Promise<Buffer> {
  const { basics, work, education, skills, projects, certificates, languages } = resume;

  const children: Paragraph[] = [];

  // 1. Header: Name
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: (basics.name || "Your Name").toUpperCase(),
          bold: true,
          size: 32, // 16pt font
          font: "Calibri",
        }),
      ],
    })
  );

  // 2. Header: Professional Label
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
            color: "555555",
          }),
        ],
      })
    );
  }

  // 3. Contact Line
  const contactParts: string[] = [];
  if (basics.email) contactParts.push(basics.email);
  if (basics.phone) contactParts.push(basics.phone);
  if (basics.location.city || basics.location.region) {
    contactParts.push([basics.location.city, basics.location.region].filter(Boolean).join(", "));
  }
  if (basics.url) contactParts.push(basics.url.replace(/^https?:\/\//, ""));

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        border: {
          bottom: {
            color: "CCCCCC",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        children: [
          new TextRun({
            text: contactParts.join(" | "),
            size: 19, // 9.5pt
            font: "Calibri",
          }),
        ],
      })
    );
  }

  // Helper to create Section Headings
  const createSectionHeader = (title: string): Paragraph => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22, // 11pt
          font: "Calibri",
          color: "000000",
        }),
      ],
    });
  };

  // 4. Professional Summary
  if (basics.summary) {
    children.push(createSectionHeader("Professional Summary"));
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: basics.summary,
            size: 21,
            font: "Calibri",
          }),
        ],
      })
    );
  }

  // 5. Work Experience
  if (work && work.length > 0) {
    children.push(createSectionHeader("Professional Experience"));

    work.forEach((job) => {
      // Position and dates
      const dateStr = `${formatDate(job.startDate)} – ${job.current ? "Present" : formatDate(job.endDate)}`;
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: job.position,
              bold: true,
              size: 21,
              font: "Calibri",
            }),
            new TextRun({
              text: `\t${dateStr}`,
              bold: false,
              size: 20,
              font: "Calibri",
            }),
          ],
        })
      );

      // Company and location
      children.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: job.name,
              italics: true,
              size: 20,
              font: "Calibri",
            }),
            job.location
              ? new TextRun({
                  text: ` — ${job.location}`,
                  size: 20,
                  font: "Calibri",
                  color: "666666",
                })
              : new TextRun(""),
          ],
        })
      );

      // Bullets
      job.highlights?.forEach((bullet) => {
        if (!bullet.trim()) return;
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: bullet,
                size: 20,
                font: "Calibri",
              }),
            ],
          })
        );
      });
    });
  }

  // 6. Education
  if (education && education.length > 0) {
    children.push(createSectionHeader("Education"));

    education.forEach((edu) => {
      const eduDate = `${formatDate(edu.startDate)} – ${edu.current ? "Present" : formatDate(edu.endDate)}`;
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: `${edu.studyType} in ${edu.area}`,
              bold: true,
              size: 21,
              font: "Calibri",
            }),
            new TextRun({
              text: `\t${eduDate}`,
              size: 20,
              font: "Calibri",
            }),
          ],
        })
      );

      children.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: edu.institution,
              italics: true,
              size: 20,
              font: "Calibri",
            }),
            edu.score
              ? new TextRun({
                  text: ` (Honors/GPA: ${edu.score})`,
                  size: 20,
                  font: "Calibri",
                  color: "666666",
                })
              : new TextRun(""),
          ],
        })
      );
    });
  }

  // 7. Skills
  if (skills && skills.length > 0) {
    children.push(createSectionHeader("Technical Skills & Core Competencies"));

    skills.forEach((cat) => {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${cat.name}: `,
              bold: true,
              size: 20,
              font: "Calibri",
            }),
            new TextRun({
              text: cat.keywords.join(", "),
              size: 20,
              font: "Calibri",
            }),
          ],
        })
      );
    });
  }

  // 8. Projects
  if (projects && projects.length > 0) {
    children.push(createSectionHeader("Featured Projects"));

    projects.forEach((proj) => {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
              size: 21,
              font: "Calibri",
            }),
            proj.url
              ? new TextRun({
                  text: ` (${proj.url})`,
                  size: 19,
                  font: "Calibri",
                  color: "2563EB",
                })
              : new TextRun(""),
          ],
        })
      );

      if (proj.description) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: proj.description,
                size: 20,
                font: "Calibri",
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
              top: 720,    // 0.5 inch margins
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

