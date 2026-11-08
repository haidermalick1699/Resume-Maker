"use client";

import html2canvas from "html2canvas";
import { ResumeData, ResumeDesign } from "@/schemas/resume.schema";
import { buildJsPdfResume } from "./pdf-builder";

export interface ExportPdfOptions {
  filename?: string;
  paperSize?: "A4" | "LETTER";
  resumeId?: string | null;
  data?: ResumeData;
  design?: ResumeDesign;
}

/**
 * Downloads a binary blob to the user's local disk with a given filename.
 */
function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 1500);
}

/**
 * High-Fidelity Multi-Page PDF Export:
 *
 * Priority 1: When in the editor, captures the rendered template directly from
 * `#resume-page-canvas` at ultra-sharp 300+ DPI Retina resolution.
 * Automatically slices into exact A4 / Letter pages so that the downloaded PDF is
 * a 100% exact, pixel-perfect visual replica of the edited and finalized resume!
 *
 * Priority 2: When outside the editor (e.g. dashboard direct download), calls
 * `/api/resumes/:id/export/pdf` which generates a comprehensive vector PDF.
 */
export async function exportResumeToPdf(options: ExportPdfOptions = {}): Promise<boolean> {
  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename =
    rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";

  // Priority 1: When in the editor, capture the exact rendered template from the DOM
  const element =
    typeof document !== "undefined"
      ? document.getElementById("resume-page-canvas") ||
        document.getElementById("resume-export-container")
      : null;

  if (element) {
    try {
      const canvas = await (html2canvas as any)(element, {
        scale: 3, // Ultra-sharp 300+ DPI Retina resolution
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 15000,
        onclone: (clonedDoc: Document) => {
          // Reset any interactive CSS zoom scale on the cloned document
          // so that html2canvas captures at full 100% native unscaled resolution
          const clonedContainer = clonedDoc.getElementById("resume-export-container");
          if (clonedContainer) {
            clonedContainer.style.transform = "none";
            clonedContainer.style.margin = "0";
            clonedContainer.style.padding = "0";
            clonedContainer.style.width = "auto";
            clonedContainer.style.height = "auto";
          }
          const clonedCanvas = clonedDoc.getElementById("resume-page-canvas");
          if (clonedCanvas) {
            clonedCanvas.style.transform = "none";
            clonedCanvas.style.boxShadow = "none";
            clonedCanvas.style.margin = "0";
            clonedCanvas.style.maxWidth = "none";
          }
        },
      });

      const { jsPDF } = await import("jspdf");
      const isA4 = options.paperSize !== "LETTER";
      const pageWidthMm = isA4 ? 210 : 215.9;
      const pageHeightMm = isA4 ? 297 : 279.4;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const totalImgHeightMm = (canvasHeight * pageWidthMm) / canvasWidth;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: isA4 ? "a4" : "letter",
        compress: true,
      });

      const imgData = canvas.toDataURL("image/png");

      let heightLeftMm = totalImgHeightMm;
      let positionMm = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, positionMm, pageWidthMm, totalImgHeightMm, undefined, "FAST");
      heightLeftMm -= pageHeightMm;

      // Add subsequent pages if resume content extends beyond 1 page
      // so zero content is ever cut off!
      while (heightLeftMm > 2) {
        positionMm -= pageHeightMm;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, positionMm, pageWidthMm, totalImgHeightMm, undefined, "FAST");
        heightLeftMm -= pageHeightMm;
      }

      pdf.save(`${safeFilename}.pdf`);
      return true;
    } catch (canvasErr) {
      console.warn("DOM template PDF capture failed, falling back to server vector PDF:", canvasErr);
    }
  }

  // Priority 2: Attempt server API download if resumeId is provided
  if (options.resumeId) {
    try {
      const response = await fetch(`/api/resumes/${options.resumeId}/export/pdf`, {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob && blob.size > 100) {
          triggerBrowserDownload(blob, `${safeFilename}.pdf`);
          return true;
        }
      }
    } catch (serverError) {
      console.warn("Server PDF export failed, falling back to client vector PDF:", serverError);
    }
  }

  // Priority 3: Client-side vector jsPDF generation directly from state
  try {
    if (options.data) {
      const doc = buildJsPdfResume(options.data, options.design);
      doc.save(`${safeFilename}.pdf`);
      return true;
    }
  } catch (clientDocErr) {
    console.error("All PDF generation methods failed:", clientDocErr);
  }

  return false;
}

/**
 * Directly downloads the resume as a Microsoft Word (.docx) document,
 * sending current in-memory resume data if available to preserve 100% of the
 * edited and finalized content.
 */
export async function exportResumeToDocx(options: {
  resumeId?: string | null;
  filename?: string;
  data?: ResumeData;
}): Promise<boolean> {
  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename =
    rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";

  try {
    let response: Response;

    if (options.data && options.resumeId) {
      response = await fetch(`/api/resumes/${options.resumeId}/export/docx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: options.data, title: options.filename }),
      });
    } else if (options.resumeId) {
      response = await fetch(`/api/resumes/${options.resumeId}/export/docx`, {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });
    } else {
      throw new Error("No resume ID provided");
    }

    if (!response.ok) {
      throw new Error(`DOCX export failed with status: ${response.status}`);
    }

    const blob = await response.blob();
    triggerBrowserDownload(blob, `${safeFilename}.docx`);
    return true;
  } catch (error) {
    console.error("Failed to download DOCX:", error);
    throw error;
  }
}

/**
 * Directly downloads the resume canvas element as an ultra-high-resolution, razor-sharp PNG image.
 * Uses 3x retina scaling (~2400 x 3400 pixels) with transform-neutralization to eliminate any blurriness.
 */
export async function exportResumeToPng(options: { filename?: string } = {}): Promise<boolean> {
  const element =
    document.getElementById("resume-page-canvas") ||
    document.getElementById("resume-export-container");

  if (!element) {
    console.error("Resume canvas element not found.");
    return false;
  }

  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename =
    rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";

  try {
    // Render at 3x scale (300+ DPI Retina equivalent: ~2400 x 3400 px)
    const canvas = await (html2canvas as any)(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      imageTimeout: 15000,
      onclone: (clonedDoc: Document) => {
        // Reset any CSS transform (such as zoom scale) on the cloned document
        // so that html2canvas captures at full 100% native unscaled resolution
        const clonedContainer = clonedDoc.getElementById("resume-export-container");
        if (clonedContainer) {
          clonedContainer.style.transform = "none";
          clonedContainer.style.margin = "0";
          clonedContainer.style.padding = "0";
          clonedContainer.style.width = "auto";
          clonedContainer.style.height = "auto";
        }
        const clonedCanvas = clonedDoc.getElementById("resume-page-canvas");
        if (clonedCanvas) {
          clonedCanvas.style.transform = "none";
          clonedCanvas.style.boxShadow = "none";
          clonedCanvas.style.margin = "0";
          clonedCanvas.style.maxWidth = "none";
        }
      },
    });

    // Use toBlob for maximum PNG fidelity and to avoid data URL size truncation
    return new Promise<boolean>((resolve) => {
      canvas.toBlob(
        (blob: Blob | null) => {
          if (!blob) {
            // Fallback to dataURL if toBlob is unavailable
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${safeFilename}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve(true);
            return;
          }
          triggerBrowserDownload(blob, `${safeFilename}.png`);
          resolve(true);
        },
        "image/png"
      );
    });
  } catch (error) {
    console.error("High-res PNG export failed:", error);
    return false;
  }
}
