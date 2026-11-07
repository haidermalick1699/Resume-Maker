"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("resumeforge_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("resumeforge_cookie_consent", "all");
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("resumeforge_cookie_consent", "essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 shadow-2xl text-slate-200 animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">We respect your privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            ResumeForge uses essential cookies for authentication and optional cookies to analyze platform performance. We never sell your personal or resume data. Read our{" "}
            <Link href="/privacy" className="text-cyan-400 underline hover:text-cyan-300">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-1.5 px-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleEssentialOnly}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleEssentialOnly}
              aria-label="Dismiss cookie notice"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
