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

export type ActiveTabMode = "editor" | "preview" | "desktop";

interface EditorUIState {
  activeSection: EditorSectionKey;
  activeMobileTab: ActiveTabMode;
  zoom: number;
  isExporting: boolean;

  setActiveSection: (section: EditorSectionKey) => void;
  setActiveMobileTab: (tab: ActiveTabMode) => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  fitToWidth: (availableWidth: number, paperWidth?: number) => void;
  setIsExporting: (val: boolean) => void;
}

export const useEditorUIStore = create<EditorUIState>((set) => ({
  activeSection: "basics",
  activeMobileTab: "editor",
  zoom: 1,
  isExporting: false,

  setActiveSection: (activeSection) => set({ activeSection }),
  setActiveMobileTab: (activeMobileTab) => set({ activeMobileTab }),
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.25), 2.0) }),
  zoomIn: () => set((state) => ({ zoom: Math.min(state.zoom + 0.1, 2.0) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(state.zoom - 0.1, 0.25) })),
  resetZoom: () => set({ zoom: 1 }),
  fitToWidth: (availableWidth: number, paperWidth = 794) => {
    // Leave 24px-32px padding for margins
    const targetWidth = Math.max(availableWidth - 28, 260);
    const calculatedScale = Number((targetWidth / paperWidth).toFixed(2));
    const clampedScale = Math.min(Math.max(calculatedScale, 0.3), 1.25);
    set({ zoom: clampedScale });
  },
  setIsExporting: (isExporting) => set({ isExporting }),
}));

