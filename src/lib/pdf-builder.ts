import { jsPDF } from "jspdf";
import { ResumeData, ResumeDesign } from "@/schemas/resume.schema";
import { formatDate } from "@/lib/utils";

/**
 * Builds an ATS-optimized, high-fidelity vector PDF document using jsPDF.
 * Universal and isomorphic: runs identically on server and in browser.
 */
export function buildJsPdfResume(
  resume: ResumeData,
  design?: ResumeDesign
): jsPDF {
  const isA4 = design?.paperSize !== "LETTER";
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: isA4 ? "a4" : "letter",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Margins in points (72 pt = 1 inch)
  const margin =
    design?.pageMargins === "compact"
      ? 36
      : design?.pageMargins === "spacious"
      ? 54
      : 44;
  const contentWidth = pageWidth - margin * 2;

  // Accent color in RGB
  let primaryR = 37;
  let primaryG = 99;
  let primaryB = 235; // Default blue #2563EB
  if (design?.primaryColor && design.primaryColor.startsWith("#")) {
    const hex = design.primaryColor.replace("#", "");
    if (hex.length === 6) {
      primaryR = parseInt(hex.substring(0, 2), 16);
      primaryG = parseInt(hex.substring(2, 4), 16);
      primaryB = parseInt(hex.substring(4, 6), 16);
    }
  }

  let y = margin + 10;

  // Helper: Check and add page if needed
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin + 10;
    }
  };

  // Helper: Section Heading with stylish accent divider line
  const addSectionHeader = (title: string) => {
    checkPageBreak(35);
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryR, primaryG, primaryB);
    doc.text(title.toUpperCase(), margin, y);

    // Accent line below heading
    y += 4;
    doc.setDrawColor(primaryR, primaryG, primaryB);
    doc.setLineWidth(1);
    doc.line(margin, y, margin + contentWidth, y);
    y += 12;
    doc.setTextColor(30, 41, 59); // Slate 800
  };

  // 1. Header: Full Name
  const name = (resume.basics.name || "Your Name").toUpperCase();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text(name, pageWidth / 2, y, { align: "center" });
  y += 18;

  // 2. Header: Label / Subtitle
  if (resume.basics.label) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(primaryR, primaryG, primaryB);
    doc.text(resume.basics.label, pageWidth / 2, y, { align: "center" });
    y += 15;
  }

  // 3. Contact Details Line
  const contactItems: string[] = [];
  if (resume.basics.email) contactItems.push(resume.basics.email);
  if (resume.basics.phone) contactItems.push(resume.basics.phone);
  if (resume.basics.location?.city || resume.basics.location?.region) {
    contactItems.push(
      [resume.basics.location.city, resume.basics.location.region]
        .filter(Boolean)
        .join(", ")
    );
  }
  if (resume.basics.url)
    contactItems.push(resume.basics.url.replace(/^https?:\/\//, ""));

  if (resume.basics.profiles && resume.basics.profiles.length > 0) {
    for (const p of resume.basics.profiles) {
      if (p.url) contactItems.push(p.url.replace(/^https?:\/\/(www\.)?/, ""));
      else if (p.username) contactItems.push(`${p.network}: ${p.username}`);
    }
  }

  if (contactItems.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105); // Slate 600
    const contactText = contactItems.join("  •  ");
    const wrappedContact = doc.splitTextToSize(contactText, contentWidth);
    for (const line of wrappedContact) {
      doc.text(line, pageWidth / 2, y, { align: "center" });
      y += 12;
    }
    y += 4;
  }

  // 4. Professional Summary
  if (resume.basics.summary && resume.basics.summary.trim()) {
    addSectionHeader("Professional Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(
      resume.basics.summary.trim(),
      contentWidth
    );
    for (const line of summaryLines) {
      checkPageBreak(13);
      doc.text(line, margin, y);
      y += 13;
    }
    y += 4;
  }

  // 5. Work Experience
  if (resume.work && resume.work.length > 0) {
    addSectionHeader("Work Experience");

    for (const job of resume.work) {
      checkPageBreak(30);

      // Row 1: Role & Period
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text(job.position || "Position", margin, y);

      const startDate = formatDate(job.startDate);
      const endDate = job.current ? "Present" : formatDate(job.endDate);
      const dateText = startDate ? `${startDate} – ${endDate}` : "";
      if (dateText) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(dateText, margin + contentWidth, y, { align: "right" });
      }
      y += 13;

      // Row 2: Company & Location
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(primaryR, primaryG, primaryB);
      doc.text(job.name || "", margin, y);

      if (job.location) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(job.location, margin + contentWidth, y, { align: "right" });
      }
      y += 13;

      // Summary
      if (job.summary) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const jobSummaryLines = doc.splitTextToSize(job.summary, contentWidth);
        for (const line of jobSummaryLines) {
          checkPageBreak(12);
          doc.text(line, margin, y);
          y += 12;
        }
      }

      // Highlights / Bullets
      if (job.highlights && job.highlights.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        for (const bullet of job.highlights) {
          if (!bullet.trim()) continue;
          checkPageBreak(14);
          doc.setTextColor(primaryR, primaryG, primaryB);
          doc.text("•", margin + 4, y);
          doc.setTextColor(51, 65, 85);
          const bulletLines = doc.splitTextToSize(
            bullet.trim(),
            contentWidth - 14
          );
          for (let i = 0; i < bulletLines.length; i++) {
            if (i > 0) checkPageBreak(12);
            doc.text(bulletLines[i], margin + 14, y);
            y += 12;
          }
          y += 2;
        }
      }
      y += 8;
    }
  }

  // 6. Education
  if (resume.education && resume.education.length > 0) {
    addSectionHeader("Education");

    for (const edu of resume.education) {
      checkPageBreak(25);

      // Degree & Dates
      const degreeStr =
        [edu.studyType, edu.area].filter(Boolean).join(" in ") || "Degree";
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(degreeStr, margin, y);

      const sDate = formatDate(edu.startDate);
      const eDate = edu.current ? "Present" : formatDate(edu.endDate);
      const eduDate = sDate ? `${sDate} – ${eDate}` : "";
      if (eduDate) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(eduDate, margin + contentWidth, y, { align: "right" });
      }
      y += 12;

      // Institution & Location
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(primaryR, primaryG, primaryB);
      doc.text(edu.institution || "", margin, y);

      if (edu.score) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`GPA / Grade: ${edu.score}`, margin + contentWidth, y, {
          align: "right",
        });
      }
      y += 14;
    }
    y += 4;
  }

  // 7. Skills
  if (resume.skills && resume.skills.length > 0) {
    addSectionHeader("Skills & Competencies");

    for (const skillGroup of resume.skills) {
      checkPageBreak(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      const groupLabel = `${skillGroup.name}: `;
      doc.text(groupLabel, margin, y);
      const groupWidth = doc.getTextWidth(groupLabel);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const skillsStr = (skillGroup.keywords || []).join(", ");
      const wrappedSkills = doc.splitTextToSize(
        skillsStr,
        contentWidth - groupWidth
      );

      if (wrappedSkills.length > 0) {
        doc.text(wrappedSkills[0], margin + groupWidth, y);
        y += 13;
        for (let i = 1; i < wrappedSkills.length; i++) {
          checkPageBreak(13);
          doc.text(wrappedSkills[i], margin + groupWidth, y);
          y += 13;
        }
      } else {
        y += 13;
      }
    }
    y += 4;
  }

  // 8. Projects
  if (resume.projects && resume.projects.length > 0) {
    addSectionHeader("Projects");

    for (const proj of resume.projects) {
      checkPageBreak(25);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.name, margin, y);

      if (proj.url) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(primaryR, primaryG, primaryB);
        doc.text(
          proj.url.replace(/^https?:\/\//, ""),
          margin + contentWidth,
          y,
          { align: "right" }
        );
      }
      y += 12;

      if (proj.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const projDescLines = doc.splitTextToSize(
          proj.description,
          contentWidth
        );
        for (const line of projDescLines) {
          checkPageBreak(12);
          doc.text(line, margin, y);
          y += 12;
        }
      }

      if (proj.highlights && proj.highlights.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        for (const bullet of proj.highlights) {
          if (!bullet.trim()) continue;
          checkPageBreak(13);
          doc.setTextColor(primaryR, primaryG, primaryB);
          doc.text("•", margin + 4, y);
          doc.setTextColor(51, 65, 85);
          const bLines = doc.splitTextToSize(bullet.trim(), contentWidth - 14);
          for (let i = 0; i < bLines.length; i++) {
            if (i > 0) checkPageBreak(12);
            doc.text(bLines[i], margin + 14, y);
            y += 12;
          }
          y += 2;
        }
      }
      y += 6;
    }
  }

  // 9. Certificates
  if (resume.certificates && resume.certificates.length > 0) {
    addSectionHeader("Certificates & Licenses");
    for (const cert of resume.certificates) {
      checkPageBreak(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(cert.name, margin, y);

      const meta = [cert.issuer, formatDate(cert.date)]
        .filter(Boolean)
        .join("  •  ");
      if (meta) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(meta, margin + contentWidth, y, { align: "right" });
      }
      y += 14;
    }
  }

  return doc;
}

