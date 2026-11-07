"use client";

import React from "react";
import { useEditorUIStore } from "@/stores/useEditorUIStore";
import { BasicsSection } from "./sections/BasicsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CustomSection } from "./sections/CustomSection";
import { StyleCustomizer } from "./StyleCustomizer";
import { TemplatesSection } from "./TemplatesSection";

export const EditorPanel: React.FC = () => {
  const { activeSection } = useEditorUIStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full">
      {activeSection === "basics" && <BasicsSection />}
      {activeSection === "work" && <ExperienceSection />}
      {activeSection === "education" && <EducationSection />}
      {activeSection === "skills" && <SkillsSection />}
      {activeSection === "projects" && <ProjectsSection />}
      {activeSection === "custom" && <CustomSection />}
      {activeSection === "design" && <StyleCustomizer />}
      {activeSection === "templates" && <TemplatesSection />}
    </div>
  );
};

