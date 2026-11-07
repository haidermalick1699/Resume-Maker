import React from "react";
import { ResumeData, ResumeDesign } from "@/schemas/resume.schema";
import { getTemplateById } from "@/templates/registry";
import { PageWrapper } from "./PageWrapper";

interface TemplateRendererProps {
  data: ResumeData;
  design: ResumeDesign;
  templateId: string;
  hasWatermark?: boolean;
  isPrint?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  data,
  design,
  templateId,
  hasWatermark = false,
  isPrint = false,
}) => {
  const templateDef = getTemplateById(templateId);
  const Component = templateDef.component;

  return (
    <PageWrapper design={design} hasWatermark={hasWatermark}>
      <Component data={data} design={design} isPrint={isPrint} />
    </PageWrapper>
  );
};

