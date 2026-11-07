import { ResumeData, ResumeDesign } from "@/schemas/resume.schema";
import { buildJsPdfResume } from "@/lib/pdf-builder";

/**
 * Generates an ATS-optimized, high-fidelity PDF resume buffer.
 * Built with native vector typography for 100% selectable text, perfect page breaks,
 * and universal compatibility across all operating systems and browsers.
 */
export async function generatePdfResume(
  resume: ResumeData,
  design?: ResumeDesign
): Promise<Buffer> {
  const doc = buildJsPdfResume(resume, design);
  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
