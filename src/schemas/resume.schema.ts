import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  network: z.string(),
  username: z.string().optional().default(""),
  url: z.string().optional().default(""),
});

export const LocationSchema = z.object({
  address: z.string().optional().default(""),
  postalCode: z.string().optional().default(""),
  city: z.string().optional().default(""),
  countryCode: z.string().optional().default(""),
  region: z.string().optional().default(""),
});

export const BasicsSchema = z.object({
  name: z.string().default(""),
  label: z.string().default(""),
  image: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  url: z.string().default(""),
  summary: z.string().default(""),
  location: LocationSchema.default({}),
  profiles: z.array(ProfileSchema).default([]),
});

export const WorkExperienceSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  position: z.string().default(""),
  url: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  current: z.boolean().default(false),
  location: z.string().default(""),
  summary: z.string().default(""),
  highlights: z.array(z.string()).default([]),
});

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().default(""),
  url: z.string().default(""),
  area: z.string().default(""),
  studyType: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  current: z.boolean().default(false),
  score: z.string().default(""),
  courses: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
});

export const SkillCategorySchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  level: z.string().default("Advanced"),
  keywords: z.array(z.string()).default([]),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  description: z.string().default(""),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  url: z.string().default(""),
  githubUrl: z.string().default(""),
});

export const CertificateSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  date: z.string().default(""),
  issuer: z.string().default(""),
  url: z.string().default(""),
});

export const LanguageSchema = z.object({
  id: z.string(),
  language: z.string().default(""),
  fluency: z.string().default("Professional Working"),
});

export const AwardSchema = z.object({
  id: z.string(),
  title: z.string().default(""),
  date: z.string().default(""),
  awarder: z.string().default(""),
  summary: z.string().default(""),
});

export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  reference: z.string().default(""),
  contact: z.string().default(""),
});

export const CustomSectionItemSchema = z.object({
  id: z.string(),
  title: z.string().default(""),
  subtitle: z.string().default(""),
  date: z.string().default(""),
  summary: z.string().default(""),
  highlights: z.array(z.string()).default([]),
});

export const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string().default("Custom Section"),
  items: z.array(CustomSectionItemSchema).default([]),
});

export const SectionLayoutSchema = z.object({
  order: z.array(z.string()).default([
    "basics",
    "summary",
    "work",
    "education",
    "skills",
    "projects",
    "certificates",
    "languages",
    "awards",
  ]),
  leftColumn: z.array(z.string()).default(["work", "education", "projects"]),
  rightColumn: z.array(z.string()).default(["skills", "certificates", "languages", "awards"]),
  hidden: z.array(z.string()).default([]),
});

export const ResumeDataSchema = z.object({
  basics: BasicsSchema.default({}),
  work: z.array(WorkExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillCategorySchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  certificates: z.array(CertificateSchema).default([]),
  languages: z.array(LanguageSchema).default([]),
  awards: z.array(AwardSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
  customSections: z.array(CustomSectionSchema).default([]),
  layout: SectionLayoutSchema.default({}),
});

export const ResumeDesignSchema = z.object({
  paperSize: z.enum(["A4", "LETTER"]).default("A4"),
  fontFamily: z.enum([
    "Inter",
    "Roboto",
    "Merriweather",
    "Playfair Display",
    "Courier Prime"
  ]).default("Inter"),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
  lineHeight: z.enum(["compact", "normal", "relaxed"]).default("normal"),
  pageMargins: z.enum(["compact", "normal", "spacious"]).default("normal"),
  sectionSpacing: z.enum(["compact", "normal", "spacious"]).default("normal"),
  primaryColor: z.string().default("#2563EB"),
  textColor: z.string().default("#1E293B"),
  backgroundColor: z.string().default("#FFFFFF"),
  photo: z.object({
    visible: z.boolean().default(true),
    shape: z.enum(["circle", "square", "rounded"]).default("circle"),
    size: z.enum(["small", "medium", "large"]).default("medium"),
    border: z.boolean().default(false),
  }).default({}),
  isRtl: z.boolean().default(false),
  language: z.string().default("en"),
  showWatermark: z.boolean().default(false),
});

export const defaultDesign = ResumeDesignSchema.parse({});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type ResumeDesign = z.infer<typeof ResumeDesignSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type CustomSection = z.infer<typeof CustomSectionSchema>;

export function createDefaultResume(): ResumeData {
  return {
    basics: {
      name: "",
      label: "",
      image: "",
      email: "",
      phone: "",
      url: "",
      summary: "",
      location: { address: "", postalCode: "", city: "", region: "", countryCode: "" },
      profiles: [],
    },
    work: [],
    education: [],
    skills: [],
    projects: [],
    certificates: [],
    languages: [],
    awards: [],
    references: [],
    customSections: [],
    layout: {
      order: ["basics", "summary", "work", "education", "skills", "projects", "certificates", "languages", "awards"],
      leftColumn: ["work", "education", "projects"],
      rightColumn: ["skills", "certificates", "languages", "awards"],
      hidden: [],
    },
  };
}

export function createSampleResume(): ResumeData {
  return {
    basics: {
      name: "Alex Sterling",
      label: "Senior Full-Stack Architect",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: "alex.sterling@example.com",
      phone: "+1 (555) 234-5678",
      url: "https://alexsterling.dev",
      summary: "Results-driven Software Architect with 8+ years of expertise designing mission-critical distributed systems, microservices, and reactive web applications. Proven track record leading high-performing engineering teams to deliver scalable cloud architectures with 99.99% uptime.",
      location: {
        city: "San Francisco",
        region: "CA",
        countryCode: "US",
        address: "Market Street",
        postalCode: "94103",
      },
      profiles: [
        { id: "p1", network: "LinkedIn", username: "alexsterling", url: "https://linkedin.com/in/alexsterling" },
        { id: "p2", network: "GitHub", username: "alexsterling", url: "https://github.com/alexsterling" },
      ],
    },
    work: [
      {
        id: "w1",
        name: "Vanguard Tech Cloud",
        position: "Lead Cloud Architect",
        url: "https://example.com",
        startDate: "2021-03",
        endDate: "Present",
        current: true,
        location: "San Francisco, CA",
        summary: "Led cloud modernization and architectural design for enterprise data platform processing 12M+ daily events.",
        highlights: [
          "Architected real-time event streaming pipeline using Kafka and Go, reducing data latency by 45%.",
          "Spearheaded multi-region disaster recovery strategy, cutting recovery time objective (RTO) from 4 hours to under 8 minutes.",
          "Mentored 14 senior and staff engineers across 3 distributed engineering squads.",
        ],
      },
      {
        id: "w2",
        name: "Hyperion Systems",
        position: "Senior Full-Stack Engineer",
        url: "https://example.com",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        location: "New York, NY",
        summary: "Developed mission-critical web applications and customer-facing analytics dashboards.",
        highlights: [
          "Migrated legacy monolithic application to Next.js and GraphQL, improving Core Web Vitals score from 58 to 98.",
          "Designed automated CI/CD pipelines in GitHub Actions, slashing deployment cycle times by 65%.",
          "Integrated Stripe Billing engine handling $4.5M in annual recurring subscription revenue.",
        ],
      },
    ],
    education: [
      {
        id: "e1",
        institution: "University of California, Berkeley",
        url: "https://berkeley.edu",
        area: "Computer Science & Engineering",
        studyType: "Bachelor of Science",
        startDate: "2014-08",
        endDate: "2018-05",
        current: false,
        score: "3.85 / 4.0",
        courses: ["Distributed Systems", "Algorithms", "Database Architecture", "Computer Security"],
        highlights: ["EECS Honors Program", "Dean's Honor List all semesters"],
      },
    ],
    skills: [
      {
        id: "s1",
        name: "Languages & Frameworks",
        level: "Expert",
        keywords: ["TypeScript", "Node.js", "React", "Next.js", "Go", "Python"],
      },
      {
        id: "s2",
        name: "Cloud & Infrastructure",
        level: "Expert",
        keywords: ["AWS", "Docker", "Kubernetes", "Terraform", "PostgreSQL", "Redis"],
      },
      {
        id: "s3",
        name: "Architecture & Practices",
        level: "Advanced",
        keywords: ["System Design", "Microservices", "Event-Driven", "CI/CD", "TDD"],
      },
    ],
    projects: [
      {
        id: "pr1",
        name: "ApexMesh Service Mesh",
        description: "Open-source lightweight Envoy-based service discovery and rate limiting tool for Kubernetes.",
        highlights: [
          "Surpassed 2,800+ GitHub stars and adopted by 180+ production deployments.",
          "Achieved sub-millisecond p99 request routing latency with eBPF acceleration.",
        ],
        keywords: ["Go", "Kubernetes", "eBPF", "Envoy"],
        startDate: "2022-01",
        endDate: "2023-08",
        url: "https://apexmesh.io",
        githubUrl: "https://github.com/alexsterling/apexmesh",
      },
    ],
    certificates: [
      {
        id: "c1",
        name: "AWS Certified Solutions Architect - Professional",
        date: "2023-04",
        issuer: "Amazon Web Services",
        url: "https://aws.amazon.com",
      },
    ],
    languages: [
      { id: "l1", language: "English", fluency: "Native / Bilingual" },
      { id: "l2", language: "German", fluency: "Professional Working" },
    ],
    awards: [
      {
        id: "a1",
        title: "Innovator of the Year",
        date: "2022",
        awarder: "Vanguard Tech Cloud",
        summary: "Awarded for exceptional leadership in enterprise migration to cloud-native microservices.",
      },
    ],
    references: [],
    customSections: [],
    layout: {
      order: ["basics", "summary", "work", "education", "skills", "projects", "certificates", "languages", "awards"],
      leftColumn: ["work", "education", "projects"],
      rightColumn: ["skills", "certificates", "languages", "awards"],
      hidden: [],
    },
  };
}
