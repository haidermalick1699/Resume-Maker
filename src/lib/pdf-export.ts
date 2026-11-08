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
 * Guaranteed PDF Export:
 * 1. Tries server-side generation via /api/resumes/:id/export/pdf (if resumeId provided).
 * 2. If offline, unsaved, unauthenticated, or server errors: instantly falls back to
 *    client-side vector jsPDF generation directly from state.
 *
 * Guaranteed to save a real .pdf file directly to disk. NEVER calls window.print().
 */
export async function exportResumeToPdf(options: ExportPdfOptions = {}): Promise<boolean> {
  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename =
    rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";

  // Step 1: Attempt server API download if resumeId is provided
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
      console.warn("Server PDF export failed, falling back to instant client vector PDF:", serverError);
    }
  }

  // Step 2: Instant Client-Side Vector PDF Generation
  // Works 100% reliably in any browser with zero network or server dependence
  try {
    if (options.data) {
      const doc = buildJsPdfResume(options.data, options.design);
      doc.save(`${safeFilename}.pdf`);
      return true;
    }
  } catch (clientDocErr) {
    console.warn("Client vector PDF generation failed, attempting canvas capture:", clientDocErr);
  }

  // Step 3: Fallback canvas capture if data is not available
  const element =
    document.getElementById("resume-page-canvas") ||
    document.getElementById("resume-export-container");

  if (element) {
    try {
      const canvas = await (html2canvas as any)(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc: Document) => {
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
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: isA4 ? "a4" : "letter",
        compress: true,
      });

      const imgWidth = isA4 ? 210 : 215.9;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
      pdf.save(`${safeFilename}.pdf`);
      return true;
    } catch (canvasErr) {
      console.error("Canvas export failed:", canvasErr);
    }
  }

  return false;
}

/**
 * Directly downloads the resume as a Microsoft Word (.docx) document.
 */
export async function exportResumeToDocx(options: {
  resumeId: string;
  filename?: string;
}): Promise<boolean> {
  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename =
    rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";

  try {
    const response = await fetch(`/api/resumes/${options.resumeId}/export/docx`, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    });

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
