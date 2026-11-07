export interface ProfessionData {
  slug: string;
  name: string;
  headline: string;
  category: string;
  description: string;
  recommendedTemplateId: string;
  targetKeywords: string[];
  suggestedBullets: string[];
  faqs: { q: string; a: string }[];
}

export const PROFESSIONS: ProfessionData[] = [
  {
    slug: "software-engineer",
    name: "Software Engineer",
    headline: "ATS-Optimized Software Engineer Resume Template & Examples",
    category: "Technology",
    description: "Build an interview-ready software engineering resume emphasizing system architecture, distributed microservices, CI/CD, and measurable engineering impact.",
    recommendedTemplateId: "modern-minimal",
    targetKeywords: [
      "TypeScript", "React", "Node.js", "Python", "Go", "Distributed Systems",
      "Docker", "Kubernetes", "AWS", "CI/CD", "PostgreSQL", "System Architecture"
    ],
    suggestedBullets: [
      "Architected real-time event streaming pipeline using Kafka and Go, reducing data processing latency by 45%.",
      "Refactored legacy core monolithic services into Go microservices, improving system throughput by 3.5x under peak load.",
      "Spearheaded multi-region disaster recovery deployment, reducing Recovery Time Objective (RTO) from 4 hours to under 8 minutes.",
      "Automated CI/CD build pipelines in GitHub Actions, slashing release cycle times from 2 days to 35 minutes.",
    ],
    faqs: [
      {
        q: "What should a Software Engineer include on their resume in 2026?",
        a: "Focus on business outcomes and scale rather than just language syntax. Quantify your engineering impact (e.g., latency reduction, cost savings, user scale, uptime reliability).",
      },
      {
        q: "Is a two-column or single-column resume better for tech roles?",
        a: "Single-column layouts (like our Modern Minimal and Classic ATS Standard) are the safest for large enterprise ATS systems like Workday and Greenhouse.",
      },
    ],
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    headline: "Product Manager Resume Template — Focused on Metrics & Strategy",
    category: "Product & Management",
    description: "Highlight cross-functional leadership, product discovery, GTM strategy, and revenue growth with our recruiter-tested PM resume template.",
    recommendedTemplateId: "modern-corporate",
    targetKeywords: [
      "Product Strategy", "User Research", "A/B Testing", "Agile / Scrum", "GTM Strategy",
      "Roadmapping", "SQL", "Data Analytics", "Customer Retention", "KPIs", "Stakeholder Alignment"
    ],
    suggestedBullets: [
      "Led end-to-end product discovery and launch of AI recommendation engine, driving a 24% increase in user engagement and $2.1M in ARR.",
      "Prioritized engineering sprint backlogs across 3 cross-functional squads utilizing data-driven user feedback loops.",
      "Designed and executed 40+ A/B experiments that improved onboarding checkout conversion from 3.2% to 5.4%.",
    ],
    faqs: [
      {
        q: "How should a Product Manager demonstrate technical competency?",
        a: "Detail your partnership with engineering, your use of SQL/data analytics for decision-making, and your understanding of API contracts and technical trade-offs.",
      },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    headline: "Data Scientist & Machine Learning Resume Template",
    category: "Data & AI",
    description: "Showcase statistical modeling, deep learning architectures, feature engineering, and business impact for top AI and quantitative analytics roles.",
    recommendedTemplateId: "modern-sidebar",
    targetKeywords: [
      "Machine Learning", "Python", "PyTorch", "TensorFlow", "SQL", "Pandas",
      "LLMs", "Feature Engineering", "Statistical Analysis", "Data Pipelines", "BigQuery"
    ],
    suggestedBullets: [
      "Developed gradient-boosted churn prediction model achieving 0.89 AUC, saving $850K annually in customer attrition.",
      "Fine-tuned open-source LLM for customer support triage, automating 42% of tier-1 support tickets with 94% customer satisfaction.",
      "Productionized ML model deployment via FastAPI and Docker on AWS SageMaker serving 500+ requests per second.",
    ],
    faqs: [
      {
        q: "Should I list academic research or business applications first?",
        a: "For industry data science positions, prioritize deployed business models and production data pipelines before academic publications.",
      },
    ],
  },
  {
    slug: "registered-nurse",
    name: "Registered Nurse",
    headline: "Registered Nurse (RN) Resume Template & Clinical Guide",
    category: "Healthcare",
    description: "Designed for RNs, clinical nurse specialists, and travel nurses to clearly display licenses, certifications (BLS/ACLS), patient ratios, and unit specialties.",
    recommendedTemplateId: "classic-ats-standard",
    targetKeywords: [
      "Patient Care", "BLS / ACLS Certified", "ICU / Emergency Care", "Triage", "EMR / Epic",
      "Medication Administration", "Care Plans", "HIPAA Compliance", "Clinical Leadership"
    ],
    suggestedBullets: [
      "Delivered comprehensive nursing care in a 24-bed high-acuity ICU, managing ventilators and titrating critical infusions.",
      "Maintained 100% compliance with Joint Commission and HIPAA standards while coordinating multidisciplinary care plans.",
      "Precepted and mentored 8 newly hired graduate nurses on hospital safety protocols and Epic EMR charting.",
    ],
    faqs: [
      {
        q: "Where should my nursing licenses and certifications appear?",
        a: "Place certifications (BLS, ACLS, RN License number) at the very top of your resume beneath your contact header for instantaneous recruiter verification.",
      },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Financial Analyst",
    headline: "Financial Analyst & Investment Banking Resume Template",
    category: "Finance & Accounting",
    description: "Clean, authoritative resume layout tailored for corporate finance, investment banking, FP&A, and equity research professionals.",
    recommendedTemplateId: "classic-ivy-league",
    targetKeywords: [
      "Financial Modeling", "DCF Valuation", "FP&A", "Variance Analysis", "Excel (VBA)",
      "Budgeting & Forecasting", "Tableau", "Capital Allocation", "GAAP", "Bloomberg Terminal"
    ],
    suggestedBullets: [
      "Built dynamic 3-statement financial models and 5-year strategic revenue forecasts for $120M annual operating budget.",
      "Conducted Discounted Cash Flow (DCF) and comparable company valuation for $45M M&A target acquisition.",
      "Automated monthly divisional variance reporting utilizing Power BI and SQL, cutting reporting turnaround from 5 days to 4 hours.",
    ],
    faqs: [
      {
        q: "What formatting does Wall Street / Banking prefer?",
        a: "Traditional monochrome serif templates (like Classic Ivy League) are the standard across private equity, hedge funds, and investment banking firms.",
      },
    ],
  },
  {
    slug: "marketing-manager",
    name: "Marketing Manager",
    headline: "Growth & Digital Marketing Manager Resume Template",
    category: "Marketing",
    description: "Showcase customer acquisition, paid media ROI, organic SEO growth, and brand campaigns with high-impact visual design.",
    recommendedTemplateId: "creative-accent",
    targetKeywords: [
      "Digital Marketing", "Paid Acquisition (CAC/LTV)", "SEO", "Content Strategy", "HubSpot",
      "Google Analytics 4", "Email Marketing", "Brand Positioning", "Campaign Management", "CRO"
    ],
    suggestedBullets: [
      "Scaled multi-channel performance marketing budget to $1.2M annually while reducing Customer Acquisition Cost (CAC) by 28%.",
      "Spearheaded organic SEO content overhaul growing monthly unique search visitors from 45K to 320K in 12 months.",
      "Executed comprehensive product rebrand resulting in a 35% increase in inbound enterprise pipeline generation.",
    ],
    faqs: [
      {
        q: "Should a marketer use a creative or traditional resume?",
        a: "Digital and growth marketers benefit from modern templates with subtle accent colors (like Creative Accent) that feature clear metrics and KPIs prominently.",
      },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    headline: "DevOps & Site Reliability Engineer (SRE) Resume Template",
    category: "Technology",
    description: "Highlight cloud automation, infrastructure as code (Terraform), Kubernetes cluster orchestration, and 99.99% system availability.",
    recommendedTemplateId: "modern-sidebar",
    targetKeywords: [
      "Kubernetes", "Terraform", "AWS", "GCP", "CI/CD", "Prometheus", "Grafana",
      "Docker", "Linux", "Infrastructure as Code", "Ansible", "Site Reliability Engineering"
    ],
    suggestedBullets: [
      "Provisioned multi-tenant Kubernetes clusters across AWS and GCP using Terraform, supporting 200+ microservices.",
      "Architected zero-downtime blue/green deployment strategy reducing production deployment failures by 80%.",
      "Configured centralized observability dashboard with Prometheus and Grafana, lowering Mean Time to Resolution (MTTR) by 50%.",
    ],
    faqs: [
      {
        q: "How can I prove reliability and uptime metrics?",
        a: "Cite exact availability SLAs (e.g. 99.99% uptime), deployment frequency improvements, and incident reduction percentages in your experience bullets.",
      },
    ],
  },
  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    headline: "Graphic Designer & UI/UX Resume Template",
    category: "Design & Creative",
    description: "Present design systems, typography mastery, Figma workflows, and portfolio links in a visually balanced, recruiter-friendly layout.",
    recommendedTemplateId: "creative-designer",
    targetKeywords: [
      "Figma", "UI/UX Design", "Design Systems", "Adobe Creative Suite", "Typography",
      "Wireframing", "Prototyping", "User Centered Design", "Brand Identity", "Motion Graphics"
    ],
    suggestedBullets: [
      "Designed and documented comprehensive Figma design system adopted by 15 designers and 60+ frontend engineers.",
      "Redesigned mobile application checkout flow, resulting in an 18% lift in completed transactions and 4.8 App Store rating.",
      "Created visual marketing collateral and packaging guidelines for 12 international product launches.",
    ],
    faqs: [
      {
        q: "Should my portfolio link be clickable on the PDF?",
        a: "Yes! Resume Maker embeds live hyperlinks in exported PDFs so hiring managers can click directly through to your Dribbble, Behance, or custom portfolio site.",
      },
    ],
  },
];

export function getProfessionBySlug(slug: string): ProfessionData | undefined {
  return PROFESSIONS.find((p) => p.slug === slug);
}

