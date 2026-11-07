# Resume Maker 🚀

**Resume Maker** is an enterprise-grade, production-ready ATS Resume, CV, and Cover Letter Builder web application built end to end with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma ORM, Zustand, Anthropic Claude 3.5 Sonnet, and Stripe.

---

## 🌟 Comprehensive Feature Tour

### 1. Public SEO & Marketing Engine
- **Fully Crawlable SSR/SSG**: Pre-rendered semantic HTML with OpenGraph metadata, JSON-LD Schema (`WebApplication`), canonical tags, auto-generated `sitemap.xml`, and `robots.txt`.
- **Programmatic SEO Landing Pages (`/resume-template/[profession]`)**: Automated landing pages for 8+ high-intent careers (Software Engineer, Product Manager, Data Scientist, Registered Nurse, Financial Analyst, DevOps, Marketing Manager, Graphic Designer) with pre-computed STAR bullet examples and targeted ATS keywords.
- **Conversion-Optimized Pages**: Template Gallery with interactive tag filters, Transparent Pricing Matrix, Interactive FAQ Accordion, Terms of Service, and GDPR/CCPA Privacy Policy.
- **Interactive Cookie Consent**: Persistent banner with local storage state and granular essential-only preference toggle.

### 2. User Authentication & Dashboard
- **Security & Session Layer**: NextAuth credentials and JWT sessions, bcrypt password hashing, input validation via Zod, and brute-force rate limiting.
- **1-Click Demo Login**: Pre-seeded `demo@resumemaker.com` account for instant evaluation.
- **Resume Management Dashboard**:
  - Live grid view showing real-time thumbnail previews, template badge, last-edited timestamp, and ATS score indicator.
  - 1-click duplicate, rename, delete actions with optimistic UI updates.
  - One-click **GDPR Data Portability** export downloading all resume data and career logs in structured JSON format.

### 3. Real-Time Resume Editor (Core Module)
- **Two-Way Synchronization**: Zustand reactive state management with debounced auto-save.
- **Comprehensive Resume Sections**:
  - Personal Information & Contact details (Phone, Email, LinkedIn, GitHub, Website, Location).
  - Professional Executive Summary.
  - Work Experience with role, company, employment dates, and STAR-method bullet points.
  - Education & Academic Credentials.
  - Categorized Technical & Soft Skills.
  - Key Projects with live URLs and repository links.
  - Custom Modular Sections for certifications, awards, languages, or publications.
- **Live Style & Layout Customizer**:
  - Font families (Sans-Serif Inter, Serif Merriweather, JetBrains Mono).
  - Font sizing scales (Compact, Normal, Large).
  - Dynamic primary accent color picker with brand presets.
  - Margin & padding sliders (0.25in to 1.25in).
  - Photo geometry (Circle, Rounded, Square) and visibility toggles.
  - Native **RTL (Right-to-Left)** language switch with Arabic & Urdu support.
- **Multi-Format Export Engine**:
  - **Pixel-Accurate PDF**: Embedded fonts, selectable text, ATS-readable structure.
  - **Microsoft Word (.docx)**: Generated via `docx` library matching document typography and bullet structures.
  - **Plain Text (.txt)**: Clean plain-text formatting for copy-pasting directly into legacy ATS textboxes.
  - **Watermark Engine**: Automatically applies subtle watermark for Free-tier users and automatically removes it for active Pro subscribers.

### 4. Recruiter-Approved Template Engine (11 Templates)
1. **Modern Minimal**: Clean, scannable layout with accent bar headings and generous white space.
2. **Modern Sidebar**: High-contrast two-column split view with colored contact/skills rail.
3. **Modern Corporate**: Executive layout optimized for leadership, management, and enterprise roles.
4. **Modern Compact**: Density-optimized single-page format for high-volume content.
5. **Classic ATS Standard**: 100% monochrome, single-column layout engineered for Taleo, Workday, and Brassring.
6. **Classic Ivy League**: Traditional serif typography based on Harvard, Stanford, and Wharton career office standards.
7. **Classic Clean Line**: Subtle horizontal separators and distinguished metadata alignment.
8. **Creative Accent**: Colorful left border ribbons and modern card styling.
9. **Creative Designer**: Bold asymmetrical typographic layout for UX/UI designers and creative directors.
10. **Academic & Scientific CV**: Multi-page format tailored for postdocs, researchers, professors, and medical fellows.
11. **Cover Letter Generator**: Matching typography and layout styling for seamless job applications.

### 5. Advanced AI Copilot (Anthropic Claude 3.5 Sonnet)
- **Summary Generator**: Crafts tailored 3-sentence executive summaries based on target role, experience level, and tone.
- **STAR Bullet Improver**: Transforms weak bullet points into high-impact, metric-driven achievements (Situation, Task, Action, Result).
- **Tone Rewriter**: Rewrites content across Executive, Creative, Technical, or Casual tones.
- **Cover Letter AI**: Synthesizes resume experience with pasted job descriptions to draft customized cover letters.
- **Deterministic Heuristic Fallback Engine**: If no Anthropic API key is provided, the platform automatically activates a local heuristic transformer so all features remain functional out of the box.

### 6. ATS Checker & Job Tailoring Engine
- **ATS Compliance Scoring (0-100)**:
  - Metrics & quantification density scoring (% improvements, revenue, scale).
  - Power action verb density (Architected, Spearheaded, Accelerated, Pioneered).
  - Buzzword & cliché detection (Synergy, Rockstar, Go-getter).
  - Structure, section completeness, and contact completeness diagnostics.
- **Job Description Tailoring**:
  - Extracts key technical keywords, cloud platforms, tools, and methodologies from job postings.
  - Matches resume content against job keywords and provides a percentage match score.
  - Identifies critical missing keywords and generates targeted bullet recommendations.

### 7. Monetization & Subscription Management
- **Stripe Integration**:
  - Stripe Checkout Sessions for Pro Monthly, Pro Annual, and One-Time Download Pass.
  - Webhook listener syncing subscription lifecycle states (`ACTIVE`, `CANCELED`, `PAST_DUE`).
  - Self-service Customer Billing Portal for subscription upgrades, cancellations, and invoices.
- **Plan Gating**: Server-side middleware (`plan-guard.ts`) enforcing feature tiers.

### 8. Admin Operations Portal (`/admin`)
- **Key Metrics Dashboard**: Real-time KPI cards for Total Accounts, Active Pro Subscribers, MRR, and Total Resumes.
- **User Management**: Instant search, account inspection, and 1-click Pro plan granting / downgrading.

### 9. Security, Hardening & Compliance
- **Sliding-Window Rate Limiting**: In-memory and Redis-ready rate limiter protecting Auth, AI, and Export endpoints with standard `X-RateLimit-*` headers.
- **GDPR / CCPA Right to Portability**: `/api/user/export` endpoint producing complete JSON data dumps.
- **GDPR Right to Erasure**: `/api/user/delete` cascading transactional account deletion.
- **Input Validation**: Strict Zod schemas validating all API payloads.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 14.2+ (App Router, React 18, Server Components) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS with `@media print` support |
| **State Management** | Zustand (Store with optimistic local state & auto-save sync) |
| **Database & ORM** | Prisma ORM with SQLite (Local dev zero-config) / PostgreSQL (Production) |
| **Authentication** | NextAuth.js (Credentials & JWT Session strategy) |
| **Validation** | Zod (Extended JSON Resume schema) |
| **AI Layer** | Anthropic Claude 3.5 Sonnet (`@anthropic-ai/sdk`) + Local Heuristic Engine |
| **Payments** | Stripe SDK (Checkout, Webhooks, Billing Portal) |
| **Document Export** | `docx` library (Word) + HTML5 Print / Playwright (PDF) |
| **Testing** | Vitest (Unit/Integration, 21 tests) + Playwright (E2E) |
| **DevOps & Containers** | Docker (Multi-stage build), Docker Compose, GitHub Actions CI |

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd "Resume Builder"

# Install all dependencies
npm install

# Initialize local database schema
npm run prisma:generate
npm run prisma:push

# Seed demo account and realistic starter resume
npm run prisma:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Seeded Demo Account
- **Email**: `demo@resumeforge.com`
- **Password**: `password123`
*(Or click the "Try Demo Account" button on `/login` for instant 1-click login)*

---

## 🧪 Testing

```bash
# Run Vitest test suite (21 unit & integration tests)
npm test

# Run TypeScript typecheck across all files
npx tsc --noEmit

# Run Playwright E2E tests (requires running dev server or webServer)
npm run test:e2e

# Run production build check
npm run build
```

---

## 🐳 Docker & Production Deployment

### Option A: Docker Compose (App + PostgreSQL + Redis)
Run the entire production stack locally or on any cloud VPS (DigitalOcean, AWS EC2, Hetzner, Linode):

```bash
# 1. Configure environment secrets
cp .env.example .env

# 2. Build and start containers
docker compose up -d --build

# 3. Check logs
docker compose logs -f web
```
The application will be live at `http://localhost:3000` connected to containerized PostgreSQL and Redis.

### Option B: Deploying to Vercel
1. Push your repository to GitHub.
2. Import the project into Vercel.
3. In Project Settings > Environment Variables, configure:
   - `DATABASE_URL`: Hosted PostgreSQL URL (e.g. Supabase, Neon, AWS RDS, Railway)
   - `NEXTAUTH_SECRET`: Random 32-character string (`openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your custom production domain (e.g. `https://resumemaker.com` or Vercel generated URL)
   - `ANTHROPIC_API_KEY`: Anthropic API Key
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Deploy! Next.js will automatically optimize SSG pages and edge routes.

---

## 📁 Repository Directory Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI/CD pipeline
├── prisma/
│   ├── schema.prisma          # Database schema (User, Resume, Subscription, JobTailoring)
│   └── seed.js                # Database seeder script
├── public/                    # Static images, favicon, icons
├── src/
│   ├── app/
│   │   ├── (admin)/           # Admin Operations Portal (/admin)
│   │   ├── (auth)/            # Login & Register pages
│   │   ├── (dashboard)/       # User Dashboard & Billing (/dashboard, /billing)
│   │   ├── (editor)/          # Live Interactive Editor (/editor/[resumeId])
│   │   ├── (public)/          # Landing, Templates, Pricing, FAQ, Privacy, Terms, SSG Pages
│   │   ├── api/               # API Routes (Auth, Resumes, Billing, AI, Import, GDPR)
│   │   ├── layout.tsx         # Root layout with fonts & Cookie Consent
│   │   ├── page.tsx           # SEO Landing Page
│   │   ├── robots.ts          # Robots crawler directives
│   │   └── sitemap.ts         # XML Sitemap generator
│   ├── components/
│   │   ├── editor/            # Editor Header, Sidebar, Panel, Preview, Modals
│   │   ├── layout/            # CookieConsent, Navigation, Footers
│   │   ├── providers/         # NextAuth Session Provider
│   │   └── templates/         # 11 Resume & CV template components
│   ├── data/                  # Programmatic SEO data definitions
│   ├── lib/                   # NextAuth config, utilities, helpers
│   ├── schemas/               # Zod validation schemas (Resume, Auth, Customizer)
│   ├── server/
│   │   ├── db/                # Prisma client singleton
│   │   ├── middleware/        # Plan guard & Sliding-window rate limiter
│   │   └── services/          # AI Service, ATS Audit, Tailor, Import, Word Export, Stripe
│   ├── stores/                # Zustand client state stores
│   └── templates/             # Template registry and layout definitions
├── tests/
│   ├── e2e/                   # Playwright end-to-end tests
│   ├── phase2.test.ts         # Phase 2 test suite
│   ├── phase3.test.ts         # Phase 3 test suite
│   ├── phase4.test.ts         # Phase 4 test suite (Rate limiting, Security, GDPR)
│   └── resume-schema.test.ts  # Schema validation tests
├── Dockerfile                 # Multi-stage production container definition
├── docker-compose.yml         # Container orchestration (App + Postgres + Redis)
├── playwright.config.ts       # Playwright configuration
├── vitest.config.ts           # Vitest configuration
├── package.json
└── tsconfig.json
```

---

## 🔒 Security & Privacy Highlights
- **No Unsanitized HTML**: All user inputs rendered through React escape sequences; markdown parsed via typed ASTs.
- **Privacy By Design**: User career data is strictly isolated by account ownership checks in all database queries.
- **GDPR / CCPA Ready**: Instant JSON data export and permanent cascade account deletion tools available out of the box.
- **Rate-Limited Endpoints**: Sliding window defense prevents scraping, brute-force logins, and AI token exhaustion.

---

## 📄 License
This project is proprietary software developed for Resume Maker. All rights reserved.
