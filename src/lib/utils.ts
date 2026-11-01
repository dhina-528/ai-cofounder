import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getPriorityBadgeColor(priority: string): string {
  switch (priority) {
    case "urgent":
      return "bg-rose-500/15 text-rose-400 border-rose-500/30";
    case "high":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "medium":
      return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
    case "low":
    default:
      return "bg-slate-500/15 text-slate-400 border-slate-500/30";
  }
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "in_progress":
      return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
    case "delayed":
      return "bg-rose-500/15 text-rose-400 border-rose-500/30";
    case "planned":
    default:
      return "bg-slate-600/20 text-slate-400 border-slate-600/30";
  }
}
