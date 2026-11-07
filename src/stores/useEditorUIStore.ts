import { create } from "zustand";

export type EditorSectionKey =
  | "basics"
  | "work"
  | "education"
  | "skills"
  | "projects"
  | "custom"
  | "design"
  | "templates"
  | "export";

interface EditorUIState {
  activeSection: EditorSectionKey;
  activeMobileTab: "editor" | "preview";
  zoom: number;
  isExporting: boolean;

  setActiveSection: (section: EditorSectionKey) => void;
  setActiveMobileTab: (tab: "editor" | "preview") => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setIsExporting: (val: boolean) => void;
}

export const useEditorUIStore = create<EditorUIState>((set) => ({
  activeSection: "basics",
  activeMobileTab: "editor",
  zoom: 1,
  isExporting: false,

  setActiveSection: (activeSection) => set({ activeSection }),
  setActiveMobileTab: (activeMobileTab) => set({ activeMobileTab }),
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.5), 1.5) }),
  zoomIn: () => set((state) => ({ zoom: Math.min(state.zoom + 0.1, 1.5) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(state.zoom - 0.1, 0.5) })),
  resetZoom: () => set({ zoom: 1 }),
  setIsExporting: (isExporting) => set({ isExporting }),
}));

