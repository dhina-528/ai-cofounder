"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Milestone } from "@/types/milestone";
import { useStartup } from "@/context/StartupContext";
import {
  CalendarRange,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  Plus,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  CheckSquare,
  Square,
} from "lucide-react";

interface RoadmapViewProps {
  milestones?: Milestone[];
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ milestones }) => {
  const {
    milestones: contextMilestones,
    addMilestoneDeliverable,
    exportBlueprintJSON,
    exportInvestorUpdateMarkdown,
    exportGitHubIssuesCSV,
    tasks,
    toggleTaskStatus,
  } = useStartup();

  const activeRoadmap =
    contextMilestones && contextMilestones.length > 0
      ? contextMilestones
      : milestones || [];

  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [addedItemText, setAddedItemText] = useState("");
  const [targetMilestoneId, setTargetMilestoneId] = useState<string>(
    activeRoadmap[0]?.id || ""
  );
  const [isAddingDeliverable, setIsAddingDeliverable] = useState(false);

  const displayedMilestones =
    selectedMonth === "all"
      ? activeRoadmap
      : activeRoadmap.filter((m) => m.month === selectedMonth);

  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addedItemText.trim() || !targetMilestoneId) return;

    addMilestoneDeliverable(targetMilestoneId, addedItemText.trim());
    setAddedItemText("");
    setIsAddingDeliverable(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <GlassCard
        hasReflection
        className="p-6 bg-gradient-to-r from-navy-900/90 via-navy-850 to-navy-900/80 border-slate-700/60"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                Execution Framework
              </span>
              <span className="text-xs text-slate-400">90-Day Deterministic Sprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Startup Execution Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every month represents a validation barrier. Complete each phase sequentially to avoid building unneeded features before confirming buyer intent.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                if (!targetMilestoneId && activeRoadmap[0]) {
                  setTargetMilestoneId(activeRoadmap[0].id);
                }
                setIsAddingDeliverable(!isAddingDeliverable);
              }}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Deliverable
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exportInvestorUpdateMarkdown}
              leftIcon={<Download className="w-3.5 h-3.5" />}
              title="Download Investor Update (.md)"
            >
              Investor Update (.md)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exportGitHubIssuesCSV}
              leftIcon={<Download className="w-3.5 h-3.5" />}
              title="Download Sprint Tasks as CSV"
            >
              GitHub Issues (.csv)
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={exportBlueprintJSON}
              leftIcon={<Download className="w-3.5 h-3.5" />}
              title="Export complete startup blueprint"
            >
              JSON Blueprint
            </Button>
          </div>
        </div>

        {/* Month Selector Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 mr-2 font-medium">Timeline View:</span>
          <button
            onClick={() => setSelectedMonth("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedMonth === "all"
                ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40"
                : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All 90 Days
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedMonth(num)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedMonth === num
                  ? "bg-brand-violet/20 text-brand-violet border border-brand-violet/40"
                  : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Month {num}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Add Deliverable Modal / Form */}
      {isAddingDeliverable && (
        <form
          onSubmit={handleAddDeliverable}
          className="p-4 rounded-xl bg-navy-900 border border-brand-cyan/30 space-y-3"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="New deliverable (e.g. Conduct pricing experiment with 10 leads)"
              value={addedItemText}
              onChange={(e) => setAddedItemText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              autoFocus
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={targetMilestoneId}
                onChange={(e) => setTargetMilestoneId(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-brand-cyan"
              >
                {activeRoadmap.map((m) => (
                  <option key={m.id} value={m.id}>
                    Month {m.month}: {m.title}
                  </option>
                ))}
              </select>
              <Button type="submit" size="sm" variant="primary">
                Add
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setIsAddingDeliverable(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Detailed Timeline Cards */}
      <div className="space-y-6">
        {displayedMilestones.map((m, idx) => (
          <GlassCard
            key={m.id}
            variant="elevated"
            className="p-6 bg-navy-900/60 border-slate-800 relative overflow-hidden"
          >
            {/* Visual background gradient sheen */}
            <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-brand-violet/10 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-brand-cyan border border-slate-700">
                    MONTH {m.month}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border uppercase ${
                      m.status === "completed"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : m.status === "in_progress"
                        ? "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {m.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-400">Target: {m.targetDate}</span>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight">{m.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {m.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 pt-2 max-w-md">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Phase Completion Status</span>
                    <span className="font-semibold text-white">{m.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-violet to-brand-cyan h-2 rounded-full transition-all duration-500"
                      style={{ width: `${m.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* KPI badge */}
              {m.metricTarget && (
                <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 lg:w-72 shrink-0 space-y-1">
                  <div className="flex items-center gap-1.5 text-brand-cyan text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Success Metric Target</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">{m.metricTarget}</p>
                </div>
              )}
            </div>

            {/* Deliverables Checklist */}
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Milestone Deliverables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {m.keyDeliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        m.status === "completed"
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }`}
                    />
                    <span className="text-xs text-slate-300 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Milestone Tactical Tasks with Live Toggle */}
            {(() => {
              const milestoneTasks = tasks.filter((t) => t.milestoneId === m.id);
              if (milestoneTasks.length === 0) return null;
              const completedTasksCount = milestoneTasks.filter((t) => t.status === "completed").length;

              return (
                <div className="mt-6 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Month {m.month} Execution Tasks</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                      {completedTasksCount}/{milestoneTasks.length} Completed
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {milestoneTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                          task.status === "completed"
                            ? "bg-navy-950/40 border-slate-800/80 opacity-70"
                            : "bg-navy-950/80 border-slate-700 hover:border-brand-cyan/50 shadow-sm"
                        }`}
                      >
                        {task.status === "completed" ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-xs font-medium block truncate ${
                              task.status === "completed"
                                ? "line-through text-slate-400"
                                : "text-white"
                            }`}
                          >
                            {task.title}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400">{task.dueDate}</span>
                            <span className="text-[10px] uppercase font-bold text-brand-violet bg-brand-violet/10 px-1.5 py-0.2 rounded border border-brand-violet/20">
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase">
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
