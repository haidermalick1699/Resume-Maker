import { ResumeData, ResumeDesign } from "@/schemas/resume.schema";
import { ComponentType } from "react";

export interface TemplateProps {
  data: ResumeData;
  design: ResumeDesign;
  isPrint?: boolean;
}

export type TemplateCategory = "modern" | "classic" | "creative" | "academic";

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  component: ComponentType<TemplateProps>;
  thumbnail?: string;
  isAtsOptimized: boolean;
  isPremium: boolean;
  recommendedRoles: string[];
}

