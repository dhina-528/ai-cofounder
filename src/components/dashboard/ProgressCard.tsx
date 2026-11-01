"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StartupProject } from "@/types/startup";
import {
  TrendingUp,
  Target,
  Users2,
  BookmarkCheck,
  AlertOctagon,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface ProgressCardProps {
  project: StartupProject;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Project Focus */}
      <GlassCard
        hasReflection
        className="p-6 bg-gradient-to-r from-navy-900/90 via-navy-850 to-navy-900/80 border-slate-700/60"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                Phase: {project.stage}
              </span>
              <span className="text-xs text-slate-400">
                Started {project.createdAt}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/chat"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Ask AI Co-Founder</span>
            </Link>
            <Link
              href="/planner"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-violet to-brand-cyan text-white shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <span>View 90-Day Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Current Weekly Focus Highlight */}
        <div className="mt-6 p-4 rounded-xl bg-navy-950/70 border border-brand-cyan/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan shrink-0 mt-0.5">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan">
                Active Weekly Sprint Target
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5">
                {project.currentWeeklyGoal}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md self-start sm:self-center shrink-0">
            {project.metrics.tasksRemainingThisWeek} tasks pending
          </span>
        </div>
      </GlassCard>

      {/* Key Metric Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <GlassCard className="p-4 bg-navy-900/60 border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Roadmap Progress</span>
            <div className="p-1.5 rounded-lg bg-brand-violet/15 text-brand-violet">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{project.progressPercent}%</span>
            <span className="text-xs font-medium text-emerald-400">+12% this sprint</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-violet to-brand-cyan h-1.5 rounded-full"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </GlassCard>

        {/* Metric 2 */}
        <GlassCard className="p-4 bg-navy-900/60 border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Validation Score</span>
            <div className="p-1.5 rounded-lg bg-brand-cyan/15 text-brand-cyan">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{project.readinessScore}/100</span>
            <span className="text-xs font-medium text-cyan-400">High Confidence</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-cyan h-1.5 rounded-full"
              style={{ width: `${project.readinessScore}%` }}
            />
          </div>
        </GlassCard>

        {/* Metric 3 */}
        <GlassCard className="p-4 bg-navy-900/60 border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Customer Discovery</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{project.metrics.interviewsCompleted}</span>
            <span className="text-xs font-medium text-slate-400">/ 15 target calls</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-400 h-1.5 rounded-full"
              style={{ width: `${(project.metrics.interviewsCompleted / 15) * 100}%` }}
            />
          </div>
        </GlassCard>

        {/* Metric 4 */}
        <GlassCard className="p-4 bg-navy-900/60 border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Qualified Waitlist</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
              <BookmarkCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{project.metrics.waitlistCount}</span>
            <span className="text-xs font-medium text-indigo-300">users joined</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: "68%" }}
            />
          </div>
        </GlassCard>
      </div>

      {/* Blockers & Countermeasures */}
      {project.blockers.length > 0 && (
        <GlassCard className="p-5 bg-navy-900/70 border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Identified Blockers & AI Countermeasures
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.blockers.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">{b.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      b.severity === "high"
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {b.severity} severity
                  </span>
                </div>
                <div className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="font-semibold text-brand-cyan">AI Co-Founder Advice: </span>
                  {b.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
