"use client";

import React from "react";
import { useEditorUIStore, EditorSectionKey } from "@/stores/useEditorUIStore";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  PlusSquare,
  Palette,
  LayoutTemplate,
  Download,
} from "lucide-react";

interface NavItem {
  key: EditorSectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { key: "basics", label: "Contact & Summary", icon: User },
  { key: "work", label: "Work Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Wrench },
  { key: "projects", label: "Projects", icon: FolderGit2 },
  { key: "custom", label: "Custom Sections", icon: PlusSquare },
  { key: "design", label: "Design & Formatting", icon: Palette },
  { key: "templates", label: "Templates", icon: LayoutTemplate },
  { key: "export", label: "Download & Export", icon: Download },
];

interface EditorSidebarProps {
  isDesktopForced?: boolean;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({ isDesktopForced = false }) => {
  const { activeSection, setActiveSection } = useEditorUIStore();

  const isWide = isDesktopForced;

  return (
    <aside
      className={`bg-slate-900 text-white flex flex-col shrink-0 select-none transition-all duration-200 ${
        isWide ? "w-52" : "w-14 sm:w-16 md:w-56"
      }`}
    >
      <div
        className={`p-3 md:p-4 text-xs font-bold text-slate-400 uppercase tracking-wider ${
          isWide ? "block" : "hidden md:block"
        }`}
      >
        Sections
      </div>
      <nav className="flex-1 space-y-1 px-1.5 sm:px-2 py-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-2.5 sm:px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4 shrink-0 mx-auto md:mx-0" />
              <span className={`truncate ${isWide ? "inline" : "hidden md:inline"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

