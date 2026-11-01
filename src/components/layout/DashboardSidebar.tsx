"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarRange,
  MessageSquareCode,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Target,
  SlidersHorizontal,
  RotateCcw,
  Bot,
  FileText,
  BrainCircuit,
} from "lucide-react";
import { useStartup } from "@/context/StartupContext";

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const { project, milestones, tasks, resetToDemo, artifacts } = useStartup();

  const activeMilestone =
    milestones.find((m) => m.status === "in_progress") || milestones[0] || {
      month: 1,
      progressPercent: project.progressPercent,
    };

  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  const links = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: "Live",
    },
    {
      label: "Execution Roadmap",
      href: "/planner",
      icon: CalendarRange,
      badge: "90-Day",
    },
    {
      label: "Autonomous Agents",
      href: "/agents",
      icon: Bot,
      badge: "Standing",
    },
    {
      label: "Deliverables Hub",
      href: "/artifacts",
      icon: FileText,
      badge: `${artifacts.length}`,
    },
    {
      label: "AI-Clone & Org",
      href: "/knowledge",
      icon: BrainCircuit,
      badge: "4-Layer",
    },
    {
      label: "AI Co-Founder Chat",
      href: "/chat",
      icon: MessageSquareCode,
      badge: "AI Active",
    },
    {
      label: "Startup Setup",
      href: "/onboarding",
      icon: SlidersHorizontal,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-navy-950/70 backdrop-blur-xl flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shrink-0 hidden lg:flex p-4">
      <div className="space-y-6">
        {/* Startup Card Mini */}
        <div className="p-3.5 rounded-xl bg-navy-900/80 border border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Active Project
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/30 uppercase">
              {project.stage}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white truncate" title={project.name}>
            {project.name}
          </h3>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5" title={project.tagline}>
            {project.tagline}
          </p>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Readiness</span>
            </div>
            <span className="font-semibold text-white">
              {project.readinessScore}/100
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3">
            Core Workspace
          </span>
          <nav className="mt-2 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-brand-violet/20 via-brand-cyan/15 to-transparent text-white border-l-2 border-brand-cyan font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-navy-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-brand-cyan/20 text-brand-cyan"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Milestone Snapshot Widget */}
        <div className="p-3.5 rounded-xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-brand-violet font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sprint Velocity</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Month {activeMilestone.month} Milestone</span>
              <span className="font-semibold text-brand-cyan">{activeMilestone.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-violet to-brand-cyan h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${activeMilestone.progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {completedTasks} of {tasks.length} tasks completed
            </p>
          </div>
        </div>

        {/* Reset to Demo Data button */}
        <button
          onClick={() => {
            if (confirm("Reset to demo data? This will restore the default Synthetix AI project.")) {
              resetToDemo();
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 bg-navy-900/40 hover:bg-navy-900 border border-slate-800/60 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset to Demo Data</span>
        </button>
      </div>

      {/* Founder Mini Badge */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-violet to-brand-cyan p-[1px]">
            <div className="w-full h-full bg-navy-900 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {project.founder.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">
              {project.founder.name}
            </span>
            <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
              {project.founder.role}
            </span>
          </div>
        </div>
        <Link
          href="/chat"
          title="Ask AI Co-Founder"
          className="p-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 text-brand-cyan border border-slate-700/60 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
