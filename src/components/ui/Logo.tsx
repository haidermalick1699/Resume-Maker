import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textClassName?: string;
  iconOnly?: boolean;
  className?: string;
  href?: string;
}

export const LogoIcon: React.FC<{ size?: "sm" | "md" | "lg" | "xl"; className?: string }> = ({
  size = "md",
  className = "",
}) => {
  const dimensions = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14",
  }[size];

  return (
    <div
      className={`relative ${dimensions} shrink-0 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-[1.5px] shadow-sm shadow-blue-500/25 group-hover:shadow-md group-hover:shadow-indigo-500/35 transition-all duration-300 ${className}`}
    >
      {/* Inner container with subtle specular gloss */}
      <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
        {/* Ambient top-left highlight */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/25 via-transparent to-black/10 pointer-events-none" />

        {/* Bespoke Resume Maker SVG Glyph */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[72%] h-[72%] text-white drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        >
          {/* Document Body Silhouette */}
          <path
            d="M9 7C9 5.89543 9.89543 5 11 5H21L27 11V29C27 30.1046 26.1046 31 25 31H11C9.89543 31 9 30.1046 9 29V7Z"
            fill="currentColor"
            fillOpacity="0.16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Corner Fold Flap */}
          <path
            d="M21 5V11H27"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.32"
          />

          {/* Resume Structural Lines / Achievement Bars */}
          <line
            x1="13.5"
            y1="15.5"
            x2="19.5"
            y2="15.5"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="13.5"
            y1="20.5"
            x2="22.5"
            y2="20.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="13.5"
            y1="25.5"
            x2="18.5"
            y2="25.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/* Modern AI Spark Accent (Career Star) */}
          <path
            d="M28 4.5C28 6.5 29.5 8 31.5 8C29.5 8 28 9.5 28 11.5C28 9.5 26.5 8 24.5 8C26.5 8 28 6.5 28 4.5Z"
            fill="#FBBF24"
          />
        </svg>
      </div>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  textClassName = "",
  iconOnly = false,
  className = "",
  href = "/",
}) => {
  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <LogoIcon size={size} />

      {!iconOnly && showText && (
        <div className="flex items-baseline gap-1">
          <span
            className={`font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors ${
              size === "sm"
                ? "text-base"
                : size === "md"
                ? "text-lg sm:text-xl"
                : size === "lg"
                ? "text-2xl"
                : "text-3xl"
            } ${textClassName}`}
          >
            Resume<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Maker</span>
          </span>
          <span className="hidden sm:inline-block text-[9px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/80 px-1.5 py-0.2 rounded-md ml-1 -translate-y-0.5">
            PRO
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
};

