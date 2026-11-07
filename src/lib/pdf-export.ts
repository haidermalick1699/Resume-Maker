"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface ExportOptions {
  filename?: string;
  paperSize?: "A4" | "LETTER";
}

/**
 * Directly downloads the resume canvas element as a high-resolution, pixel-accurate PDF file.
 */
export async function exportResumeToPdf(options: ExportOptions = {}): Promise<boolean> {
  const element = document.getElementById("resume-page-canvas");
  if (!element) {
    console.error("Resume canvas element '#resume-page-canvas' not found.");
    window.print();
    return false;
  }

  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename = rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";
  const isA4 = options.paperSize !== "LETTER";

  try {
    // Render the element to a canvas with 2x scale for crisp 300-DPI retina typography
    const canvas = await (html2canvas as any)(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);

    // Standard PDF page dimensions in millimeters
    const pdfPageWidth = isA4 ? 210 : 215.9;
    const pdfPageHeight = isA4 ? 297 : 279.4;

    const imgWidth = pdfPageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: isA4 ? "a4" : "letter",
      compress: true,
    });

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfPageHeight;

    // Handle multi-page documents (e.g. Academic CV or long experience)
    while (heightLeft > 2) { // 2mm margin of error
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfPageHeight;
    }

    // Save directly to the user's downloads folder
    pdf.save(`${safeFilename}.pdf`);
    return true;
  } catch (error) {
    console.error("Direct PDF export failed, falling back to browser print:", error);
    window.print();
    return false;
  }
}

/**
 * Directly downloads the resume canvas element as a high-resolution PNG image file.
 */
export async function exportResumeToPng(options: ExportOptions = {}): Promise<boolean> {
  const element = document.getElementById("resume-page-canvas");
  if (!element) {
    console.error("Resume canvas element '#resume-page-canvas' not found.");
    return false;
  }

  const rawFilename = (options.filename || "Resume").trim();
  const safeFilename = rawFilename.replace(/[^a-zA-Z0-9_\- ]/g, "").replace(/\s+/g, "_") || "Resume";

  try {
    const canvas = await (html2canvas as any)(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${safeFilename}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error("PNG export failed:", error);
    return false;
  }
}
