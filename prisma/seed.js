const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create or upsert demo user
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@resumemaker.com" },
    update: {},
    create: {
      email: "demo@resumemaker.com",
      name: "Alex Sterling",
      hashedPassword,
      role: "USER",
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
        },
      },
    },
  });

  // Also support demo@resumeforge.com for backwards compatibility
  await prisma.user.upsert({
    where: { email: "demo@resumeforge.com" },
    update: {},
    create: {
      email: "demo@resumeforge.com",
      name: "Alex Sterling",
      hashedPassword,
      role: "USER",
    },
  });

  // 2. Create sample resume for demo user
  const sampleContent = {
    basics: {
      name: "Alex Sterling",
      label: "Senior Full-Stack Architect",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: "alex.sterling@example.com",
      phone: "+1 (555) 234-5678",
      url: "https://alexsterling.dev",
      summary: "Results-driven Software Architect with 8+ years of expertise designing mission-critical distributed systems, microservices, and reactive web applications.",
      location: { city: "San Francisco", region: "CA", countryCode: "US" },
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
          "Spearheaded multi-region disaster recovery strategy, cutting RTO from 4 hours to under 8 minutes.",
        ],
      },
    ],
    education: [
      {
        id: "e1",
        institution: "UC Berkeley",
        area: "Computer Science",
        studyType: "B.S.",
        startDate: "2014-08",
        endDate: "2018-05",
        current: false,
        score: "3.85 / 4.0",
        highlights: ["EECS Honors Program"],
      },
    ],
    skills: [
      { id: "s1", name: "Languages & Frameworks", level: "Expert", keywords: ["TypeScript", "Node.js", "React", "Next.js", "Go"] },
      { id: "s2", name: "Cloud & DevOps", level: "Expert", keywords: ["AWS", "Docker", "Kubernetes", "PostgreSQL"] },
    ],
    projects: [
      {
        id: "pr1",
        name: "ApexMesh",
        description: "Open-source service mesh and dynamic traffic router.",
        highlights: ["Achieved sub-millisecond p99 request routing latency."],
        keywords: ["Go", "Kubernetes", "Envoy"],
        startDate: "2022-01",
        endDate: "2023-08",
        url: "https://apexmesh.io",
      },
    ],
    certificates: [
      { id: "c1", name: "AWS Solutions Architect Professional", date: "2023-04", issuer: "AWS" },
    ],
    languages: [
      { id: "l1", language: "English", fluency: "Native / Bilingual" },
    ],
    awards: [],
    references: [],
    customSections: [],
    layout: {
      order: ["basics", "summary", "work", "education", "skills", "projects", "certificates", "languages"],
      leftColumn: ["work", "education", "projects"],
      rightColumn: ["skills", "certificates", "languages"],
      hidden: [],
    },
  };

  const sampleDesign = {
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
    showWatermark: true,
  };

  const existing = await prisma.resume.findFirst({
    where: { userId: demoUser.id },
  });

  if (!existing) {
    await prisma.resume.create({
      data: {
        userId: demoUser.id,
        title: "Senior Full-Stack Architect",
        templateId: "modern-minimal",
        content: JSON.stringify(sampleContent),
        design: JSON.stringify(sampleDesign),
        hasWatermark: true,
        atsScore: 92,
      },
    });
    console.log("Created demo resume for Alex Sterling!");
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

