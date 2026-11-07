import { create } from "zustand";
import {
  ResumeData,
  ResumeDesign,
  createDefaultResume,
  WorkExperience,
  Education,
  SkillCategory,
  Project,
  CustomSection,
} from "@/schemas/resume.schema";
import { generateId } from "@/lib/utils";

interface ResumeStoreState {
  resumeId: string | null;
  title: string;
  templateId: string;
  data: ResumeData;
  design: ResumeDesign;
  hasWatermark: boolean;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Actions
  setResume: (payload: {
    id: string;
    title: string;
    templateId: string;
    data: ResumeData;
    design: ResumeDesign;
    hasWatermark?: boolean;
  }) => void;
  setTitle: (title: string) => void;
  setTemplateId: (templateId: string) => void;

  // Granular update actions
  updateBasics: (partial: Partial<ResumeData["basics"]>) => void;
  updateLocation: (partial: Partial<ResumeData["basics"]["location"]>) => void;
  addProfile: () => void;
  removeProfile: (id: string) => void;
  updateProfile: (id: string, partial: Partial<{ network: string; username: string; url: string }>) => void;

  // Work experience
  setWork: (work: WorkExperience[]) => void;
  addWork: () => void;
  updateWork: (id: string, partial: Partial<WorkExperience>) => void;
  removeWork: (id: string) => void;

  // Education
  setEducation: (education: Education[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, partial: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills
  setSkills: (skills: SkillCategory[]) => void;
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, partial: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;

  // Projects
  setProjects: (projects: Project[]) => void;
  addProject: () => void;
  updateProject: (id: string, partial: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Custom Sections
  setCustomSections: (sections: CustomSection[]) => void;
  addCustomSection: (title?: string) => void;
  updateCustomSection: (id: string, partial: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;

  // Design
  updateDesign: (partial: Partial<ResumeDesign>) => void;

  // Persistence
  saveResume: () => Promise<boolean>;
}

export const useResumeStore = create<ResumeStoreState>((set, get) => ({
  resumeId: null,
  title: "Untitled Resume",
  templateId: "modern-minimal",
  data: createDefaultResume(),
  design: {
    paperSize: "A4",
    fontFamily: "Inter",
    fontSize: "medium",
    lineHeight: "normal",
    pageMargins: "normal",
    sectionSpacing: "normal",
    primaryColor: "#2563EB",
    textColor: "#1E293B",
    backgroundColor: "#FFFFFF",
    photo: { visible: true, shape: "circle", size: "medium", border: false },
    isRtl: false,
    language: "en",
    showWatermark: true,
  },
  hasWatermark: true,
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,

  setResume: ({ id, title, templateId, data, design, hasWatermark = true }) => {
    set({
      resumeId: id,
      title,
      templateId,
      data,
      design,
      hasWatermark,
      isDirty: false,
      lastSavedAt: new Date(),
    });
  },

  setTitle: (title) => set({ title, isDirty: true }),
  setTemplateId: (templateId) => set({ templateId, isDirty: true }),

  updateBasics: (partial) => {
    set((state) => ({
      data: {
        ...state.data,
        basics: { ...state.data.basics, ...partial },
      },
      isDirty: true,
    }));
  },

  updateLocation: (partial) => {
    set((state) => ({
      data: {
        ...state.data,
        basics: {
          ...state.data.basics,
          location: { ...state.data.basics.location, ...partial },
        },
      },
      isDirty: true,
    }));
  },

  addProfile: () => {
    set((state) => ({
      data: {
        ...state.data,
        basics: {
          ...state.data.basics,
          profiles: [
            ...state.data.basics.profiles,
            { id: generateId("prof"), network: "LinkedIn", username: "", url: "" },
          ],
        },
      },
      isDirty: true,
    }));
  },

  removeProfile: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        basics: {
          ...state.data.basics,
          profiles: state.data.basics.profiles.filter((p) => p.id !== id),
        },
      },
      isDirty: true,
    }));
  },

  updateProfile: (id, partial) => {
    set((state) => ({
      data: {
        ...state.data,
        basics: {
          ...state.data.basics,
          profiles: state.data.basics.profiles.map((p) =>
            p.id === id ? { ...p, ...partial } : p
          ),
        },
      },
      isDirty: true,
    }));
  },

  setWork: (work) => {
    set((state) => ({
      data: { ...state.data, work },
      isDirty: true,
    }));
  },

  addWork: () => {
    const newJob: WorkExperience = {
      id: generateId("job"),
      name: "",
      position: "",
      url: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      summary: "",
      highlights: [""],
    };
    set((state) => ({
      data: {
        ...state.data,
        work: [newJob, ...state.data.work],
      },
      isDirty: true,
    }));
  },

  updateWork: (id, partial) => {
    set((state) => ({
      data: {
        ...state.data,
        work: state.data.work.map((w) => (w.id === id ? { ...w, ...partial } : w)),
      },
      isDirty: true,
    }));
  },

  removeWork: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        work: state.data.work.filter((w) => w.id !== id),
      },
      isDirty: true,
    }));
  },

  setEducation: (education) => {
    set((state) => ({
      data: { ...state.data, education },
      isDirty: true,
    }));
  },

  addEducation: () => {
    const newEdu: Education = {
      id: generateId("edu"),
      institution: "",
      url: "",
      area: "",
      studyType: "",
      startDate: "",
      endDate: "",
      current: false,
      score: "",
      courses: [],
      highlights: [],
    };
    set((state) => ({
      data: {
        ...state.data,
        education: [newEdu, ...state.data.education],
      },
      isDirty: true,
    }));
  },

  updateEducation: (id, partial) => {
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((e) =>
          e.id === id ? { ...e, ...partial } : e
        ),
      },
      isDirty: true,
    }));
  },

  removeEducation: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((e) => e.id !== id),
      },
      isDirty: true,
    }));
  },

  setSkills: (skills) => {
    set((state) => ({
      data: { ...state.data, skills },
      isDirty: true,
    }));
  },

  addSkillCategory: () => {
    const newCat: SkillCategory = {
      id: generateId("skill"),
      name: "Technical Skills",
      level: "Advanced",
      keywords: [],
    };
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, newCat],
      },
      isDirty: true,
    }));
  },

  updateSkillCategory: (id, partial) => {
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((s) => (s.id === id ? { ...s, ...partial } : s)),
      },
      isDirty: true,
    }));
  },

  removeSkillCategory: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((s) => s.id !== id),
      },
      isDirty: true,
    }));
  },

  setProjects: (projects) => {
    set((state) => ({
      data: { ...state.data, projects },
      isDirty: true,
    }));
  },

  addProject: () => {
    const newProj: Project = {
      id: generateId("proj"),
      name: "",
      description: "",
      highlights: [],
      keywords: [],
      startDate: "",
      endDate: "",
      url: "",
      githubUrl: "",
    };
    set((state) => ({
      data: {
        ...state.data,
        projects: [newProj, ...state.data.projects],
      },
      isDirty: true,
    }));
  },

  updateProject: (id, partial) => {
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((p) =>
          p.id === id ? { ...p, ...partial } : p
        ),
      },
      isDirty: true,
    }));
  },

  removeProject: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((p) => p.id !== id),
      },
      isDirty: true,
    }));
  },

  setCustomSections: (customSections) => {
    set((state) => ({
      data: { ...state.data, customSections },
      isDirty: true,
    }));
  },

  addCustomSection: (title = "Custom Section") => {
    const newSec: CustomSection = {
      id: generateId("sec"),
      title,
      items: [
        {
          id: generateId("item"),
          title: "New Item",
          subtitle: "",
          date: "",
          summary: "",
          highlights: [],
        },
      ],
    };
    set((state) => ({
      data: {
        ...state.data,
        customSections: [...state.data.customSections, newSec],
      },
      isDirty: true,
    }));
  },

  updateCustomSection: (id, partial) => {
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.map((sec) =>
          sec.id === id ? { ...sec, ...partial } : sec
        ),
      },
      isDirty: true,
    }));
  },

  removeCustomSection: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.filter((sec) => sec.id !== id),
      },
      isDirty: true,
    }));
  },

  updateDesign: (partial) => {
    set((state) => ({
      design: { ...state.design, ...partial },
      isDirty: true,
    }));
  },

  saveResume: async () => {
    const { resumeId, title, templateId, data, design } = get();
    if (!resumeId) return false;

    set({ isSaving: true });
    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          templateId,
          content: data,
          design,
        }),
      });

      if (!res.ok) throw new Error("Failed to save resume");
      set({ isDirty: false, isSaving: false, lastSavedAt: new Date() });
      return true;
    } catch (err) {
      console.error(err);
      set({ isSaving: false });
      return false;
    }
  },
}));

