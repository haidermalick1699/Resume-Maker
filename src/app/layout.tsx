import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CookieConsent } from "@/components/layout/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "ResumeForge — Free Online Resume Builder & ATS Resume Generator",
  description:
    "Create high-scoring, ATS-optimized resumes in minutes. Choose from professional, recruiter-approved templates, customize live, and export to pixel-perfect PDF.",
  keywords: [
    "resume builder",
    "CV maker",
    "ATS resume",
    "free resume templates",
    "cover letter generator",
    "professional CV",
  ],
  authors: [{ name: "ResumeForge Team" }],
  openGraph: {
    title: "ResumeForge — Professional ATS-Friendly Resume Builder",
    description:
      "Craft interview-winning resumes with real-time preview and ATS compliance testing.",
    url: "https://resumeforge.com",
    siteName: "ResumeForge",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ResumeForge",
    url: "https://resumeforge.com",
    description: "Production-grade ATS Resume and CV builder with live preview.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}

