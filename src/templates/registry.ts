import { TemplateDefinition } from "./types";
import { ModernMinimal } from "./designs/ModernMinimal";
import { ModernSidebar } from "./designs/ModernSidebar";
import { ClassicAtsStandard } from "./designs/ClassicAtsStandard";
import { ClassicIvyLeague } from "./designs/ClassicIvyLeague";
import { CreativeAccent } from "./designs/CreativeAccent";
import { ModernCorporate } from "./designs/ModernCorporate";
import { ModernCompact } from "./designs/ModernCompact";
import { ClassicCleanLine } from "./designs/ClassicCleanLine";
import { CreativeDesigner } from "./designs/CreativeDesigner";
import { AcademicCv } from "./designs/AcademicCv";

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean, elegant, single-column design tailored for software engineers, tech professionals, and modern careers.",
    category: "modern",
    component: ModernMinimal,
    isAtsOptimized: true,
    isPremium: false,
    recommendedRoles: ["Software Engineer", "Product Manager", "DevOps", "Data Analyst"],
  },
  {
    id: "modern-sidebar",
    name: "Modern Sidebar",
    description: "Asymmetrical 30/70 two-column layout highlighting your skill inventory, education, and credentials.",
    category: "modern",
    component: ModernSidebar,
    isAtsOptimized: true,
    isPremium: false,
    recommendedRoles: ["Full-Stack Developer", "Cloud Architect", "UI/UX Designer"],
  },
  {
    id: "modern-corporate",
    name: "Modern Corporate",
    description: "Executive two-column format with dark accent header. Ideal for directors, VPs, management, and corporate strategy.",
    category: "modern",
    component: ModernCorporate,
    isAtsOptimized: true,
    isPremium: true,
    recommendedRoles: ["VP / Director", "Operations Manager", "Strategy Consultant", "Finance Director"],
  },
  {
    id: "modern-compact",
    name: "Modern Compact",
    description: "High-density single-page layout for seasoned professionals with 10+ years of dense career milestones.",
    category: "modern",
    component: ModernCompact,
    isAtsOptimized: true,
    isPremium: false,
    recommendedRoles: ["Senior Architect", "Executive", "Engineering Lead", "Department Head"],
  },
  {
    id: "classic-ats-standard",
    name: "Classic ATS Standard",
    description: "Engineered specifically for 100% compliance with ATS parsers like Workday, Taleo, and Greenhouse. Zero parse errors.",
    category: "classic",
    component: ClassicAtsStandard,
    isAtsOptimized: true,
    isPremium: false,
    recommendedRoles: ["Enterprise Careers", "Finance", "Healthcare", "Government", "General"],
  },
  {
    id: "classic-ivy-league",
    name: "Classic Ivy League",
    description: "Prestigious serif typography with Roman accents, trusted by top executive search firms, lawyers, and academics.",
    category: "classic",
    component: ClassicIvyLeague,
    isAtsOptimized: true,
    isPremium: false,
    recommendedRoles: ["Executive / C-Suite", "Lawyer / Legal", "Investment Banking", "Consulting"],
  },
  {
    id: "classic-clean-line",
    name: "Classic Clean Line",
    description: "Left-bordered section accents with balanced whitespace and clear hierarchy across engineering and operations.",
    category: "classic",
    component: ClassicCleanLine,
    isAtsOptimized: true,
    isPremium: false,
    recommendedRoles: ["Healthcare", "Civil / Mechanical Engineer", "Project Manager", "Accountant"],
  },
  {
    id: "creative-accent",
    name: "Creative Accent",
    description: "Vibrant header banner with visual timeline markers and badge pill highlights. Perfect for creative and marketing roles.",
    category: "creative",
    component: CreativeAccent,
    isAtsOptimized: false,
    isPremium: false,
    recommendedRoles: ["Marketing Specialist", "Graphic Designer", "Growth Lead", "Brand Strategist"],
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Dark sidebar panel with portfolio case-study chips, visual tech stack badges, and modern typography.",
    category: "creative",
    component: CreativeDesigner,
    isAtsOptimized: false,
    isPremium: true,
    recommendedRoles: ["UI/UX Designer", "Art Director", "Motion Designer", "Frontend Creative"],
  },
  {
    id: "academic-cv",
    name: "Academic Curriculum Vitae",
    description: "Comprehensive multi-page academic CV with publications, research appointments, grants, and teaching history.",
    category: "academic",
    component: AcademicCv,
    isAtsOptimized: true,
    isPremium: true,
    recommendedRoles: ["Postdoctoral Fellow", "Professor / Lecturer", "Research Scientist", "PhD Candidate"],
  },
];

export function getTemplateById(id: string): TemplateDefinition {
  const template = TEMPLATES.find((t) => t.id === id);
  return template || TEMPLATES[0];
}
