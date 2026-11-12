"use client";

import React from "react";
import { useEditorUIStore, EditorSectionKey } from "@/stores/useEditorUIStore";
import { BasicsSection } from "./sections/BasicsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CustomSection } from "./sections/CustomSection";
import { StyleCustomizer } from "./StyleCustomizer";
import { TemplatesSection } from "./TemplatesSection";
import { ExportSection } from "./sections/ExportSection";

const QUICK_SECTIONS: { key: EditorSectionKey; label: string }[] = [
  { key: "basics", label: "Contact" },
  { key: "work", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "custom", label: "Custom" },
  { key: "design", label: "Design" },
  { key: "templates", label: "Templates" },
  { key: "export", label: "Export" },
];

export const EditorPanel: React.FC = () => {
  const { activeSection, setActiveSection } = useEditorUIStore();

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      {/* Mobile Horizontal Quick-Section Navigator */}
      <div className="md:hidden sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-2xs">
        {QUICK_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.key;
          return (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {sec.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 p-3.5 sm:p-5 md:p-8 max-w-3xl mx-auto w-full">
        {activeSection === "basics" && <BasicsSection />}
        {activeSection === "work" && <ExperienceSection />}
        {activeSection === "education" && <EducationSection />}
        {activeSection === "skills" && <SkillsSection />}
        {activeSection === "projects" && <ProjectsSection />}
        {activeSection === "custom" && <CustomSection />}
        {activeSection === "design" && <StyleCustomizer />}
        {activeSection === "templates" && <TemplatesSection />}
        {activeSection === "export" && <ExportSection />}
      </div>
    </div>
  );
};

