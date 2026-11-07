import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present" || dateString.toLowerCase() === "current") {
    return "Present";
  }

  // Format YYYY-MM
  const match = dateString.match(/^(\d{4})(?:-(\d{2}))?$/);
  if (!match) return dateString;

  const year = match[1];
  const month = match[2];

  if (!month) return year;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex >= 0 && monthIndex < 12) {
    return `${months[monthIndex]} ${year}`;
  }

  return dateString;
}

