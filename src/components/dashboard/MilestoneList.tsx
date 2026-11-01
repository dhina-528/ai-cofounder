"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Milestone } from "@/types/milestone";
import { getStatusBadgeColor } from "@/lib/utils";
import { CheckCircle2, Clock, Calendar, CheckSquare, Target } from "lucide-react";

interface MilestoneListProps {
  milestones: Milestone[];
}

export const MilestoneList: React.FC<MilestoneListProps> = ({ milestones }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">90-Day Execution Milestones</h2>
          <p className="text-xs text-slate-400">
            Structured 3-month phases to systematically validate, build, and monetize.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {milestones.map((m) => {
          const isCompleted = m.status === "completed";
          const isInProgress = m.status === "in_progress";

          return (
            <GlassCard
              key={m.id}
              variant="hoverable"
              className={`p-5 flex flex-col justify-between ${
                isInProgress
                  ? "border-brand-cyan/40 bg-navy-900/80 shadow-glass-glow"
                  : "bg-navy-900/50 border-slate-800/80"
              }`}
            >
              <div className="space-y-4">
                {/* Header status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Month {m.month}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadgeColor(
                      m.status
                    )}`}
                  >
                    {m.status.replace("_", " ")}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Phase Completion</span>
                    <span className="font-semibold text-white">{m.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        isCompleted
                          ? "bg-emerald-400"
                          : isInProgress
                          ? "bg-gradient-to-r from-brand-violet to-brand-cyan"
                          : "bg-slate-700"
                      }`}
                      style={{ width: `${m.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Metric Target */}
                {m.metricTarget && (
                  <div className="p-2.5 rounded-lg bg-navy-950/70 border border-slate-800 flex items-start gap-2 text-xs">
                    <Target className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan block">
                        Key Metric Target
                      </span>
                      <span className="text-slate-300 text-[11px]">
                        {m.metricTarget}
                      </span>
                    </div>
                  </div>
                )}

                {/* Deliverables */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1.5">
                    {m.keyDeliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckSquare className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        )}
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Target Date */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>Due {m.targetDate}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
