import React from "react";
import { ResumeDesign } from "@/schemas/resume.schema";

interface PageWrapperProps {
  children: React.ReactNode;
  design: ResumeDesign;
  hasWatermark?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  design,
  hasWatermark = false,
}) => {
  const isA4 = design.paperSize === "A4";
  const isRtl = design.isRtl || design.language === "ar" || design.language === "ur";

  return (
    <div className="relative print:m-0 print:p-0 flex flex-col items-center">
      <div
        id="resume-page-canvas"
        dir={isRtl ? "rtl" : "ltr"}
        className={`bg-white shadow-xl print:shadow-none print:w-full transition-all relative overflow-hidden ${
          isRtl ? "text-right" : "text-left"
        } ${isA4 ? "w-[794px] min-h-[1123px]" : "w-[816px] min-h-[1056px]"}`}
        style={{
          backgroundColor: design.backgroundColor || "#FFFFFF",
        }}
      >
        {children}

        {/* Free Tier Watermark */}
        {hasWatermark && (
          <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none py-1 border-t border-slate-200 bg-slate-50/90 print:bg-slate-50">
            <span className="text-[10px] text-slate-500 font-sans tracking-wide">
              Created with <strong className="text-slate-800 font-semibold">Resume Maker</strong> — Free Plan • Upgrade to remove watermark
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
