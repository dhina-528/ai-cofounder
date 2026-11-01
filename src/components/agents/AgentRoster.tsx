"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useStartup } from "@/context/StartupContext";
import { Agent, AgentDepartment, RoutineExecutionResult } from "@/types/agent";
import {
  Sparkles,
  Play,
  RotateCw,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Shield,
  Bot,
  Zap,
  ArrowRight,
  X,
  FileText,
  CheckSquare,
} from "lucide-react";

import { ScaffoldAgentModal } from "./ScaffoldAgentModal";

export const AgentRoster: React.FC = () => {
  const {
    agents,
    executionLogs,
    runStandingRoutine,
    toggleAgentEnabled,
    project,
  } = useStartup();

  const [selectedDept, setSelectedDept] = useState<AgentDepartment | "all">("all");
  const [runningRoutineId, setRunningRoutineId] = useState<string | null>(null);
  const [activeModalLog, setActiveModalLog] = useState<RoutineExecutionResult | null>(null);
  const [isScaffoldOpen, setIsScaffoldOpen] = useState(false);

  const filteredAgents = agents.filter((a) => {
    if (selectedDept === "all") return true;
    return a.department === selectedDept;
  });

  const handleTriggerRoutine = async (routineId: string) => {
    try {
      setRunningRoutineId(routineId);
      const result = await runStandingRoutine(routineId);
      setActiveModalLog(result);
    } catch (err) {
      console.error("Error executing routine:", err);
      alert("Failed to execute routine. Please check your network and try again.");
    } finally {
      setRunningRoutineId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Philosophy */}
      <GlassCard
        hasReflection
        className="p-6 bg-gradient-to-r from-navy-900/90 via-navy-850 to-navy-900/80 border-slate-700/60"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous Co-Founder Roster</span>
              </span>
              <span className="text-xs text-slate-400">Proactive Standing Jobs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Specialized Autonomous AI Co-Founders
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Instead of waiting for prompts, your specialized AI agents execute standing routines on a schedule—synthesizing customer discovery guides, auditing MVP scope, and unblocking daily execution for{" "}
              <strong className="text-brand-cyan">{project.name}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsScaffoldOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Scaffold Custom Agent
            </Button>
            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Total Agents Active
              </span>
              <span className="text-xl font-bold text-white">
                {agents.filter((a) => a.enabled).length}/{agents.length} Standing
              </span>
            </div>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 mr-2 font-medium">Department:</span>
          {(
            [
              { id: "all", label: "All Departments" },
              { id: "strategy", label: "Strategy & Triage" },
              { id: "validation", label: "Customer Discovery" },
              { id: "growth", label: "Growth & Outbound" },
              { id: "product", label: "Product & Architecture" },
            ] as const
          ).map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDept === dept.id
                  ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-sm"
                  : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Agents Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => {
          const isRunning = agent.status === "running";

          return (
            <GlassCard
              key={agent.id}
              variant="elevated"
              className={`p-6 flex flex-col justify-between transition-all ${
                isRunning
                  ? "border-brand-cyan/50 shadow-glass-glow bg-navy-900/90"
                  : "bg-navy-900/60 border-slate-800/90"
              }`}
            >
              <div className="space-y-5">
                {/* Agent Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10"
                      style={{ backgroundColor: `${agent.color}20` }}
                    >
                      {agent.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-white">
                          {agent.displayName}
                        </h2>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                            isRunning
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse"
                              : agent.enabled
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {isRunning ? "Running..." : agent.enabled ? "Active" : "Paused"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{agent.role}</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        Engine: {agent.model}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Agent Enabled */}
                  <button
                    onClick={() => toggleAgentEnabled(agent.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                      agent.enabled
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                        : "bg-navy-950 text-slate-500 border-slate-800 hover:text-slate-300"
                    }`}
                  >
                    {agent.enabled ? "Pause" : "Enable"}
                  </button>
                </div>

                {/* System Prompt snippet */}
                <p className="text-xs text-slate-400 italic bg-navy-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  &ldquo;{agent.systemPrompt}&rdquo;
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {agent.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-navy-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Standing Routines Section */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Standing Routines & Automated Jobs</span>
                  </span>

                  <div className="space-y-2.5">
                    {agent.routines.map((routine) => {
                      const isRoutineRunning =
                        runningRoutineId === routine.id || routine.status === "running";

                      return (
                        <div
                          key={routine.id}
                          className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                        >
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold text-white flex items-center gap-2">
                              <span>{routine.name}</span>
                              <span className="text-[10px] font-normal text-slate-400 px-1.5 py-0.2 rounded bg-slate-800">
                                {routine.schedule}
                              </span>
                            </h3>
                            <p className="text-[11px] text-slate-400 leading-snug">
                              {routine.description}
                            </p>
                            {routine.lastRun && (
                              <span className="text-[10px] text-brand-cyan/80 block mt-0.5">
                                Last executed: {routine.lastRun}
                              </span>
                            )}
                          </div>

                          <Button
                            size="sm"
                            variant="primary"
                            disabled={!agent.enabled || isRoutineRunning}
                            onClick={() => handleTriggerRoutine(routine.id)}
                            leftIcon={
                              isRoutineRunning ? (
                                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )
                            }
                            className="shrink-0 font-semibold text-xs"
                          >
                            {isRoutineRunning ? "Running..." : "Run Routine"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Routine Execution Results Modal */}
      {activeModalLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
          <GlassCard
            variant="elevated"
            className="max-w-2xl w-full p-6 bg-navy-900 border-brand-cyan/40 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-xl">
                  {activeModalLog.agentAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
                      {activeModalLog.agentName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      • {activeModalLog.executedAt}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {activeModalLog.headline}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveModalLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Strategic Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Autonomous Executive Summary
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 bg-navy-950/70 p-4 rounded-xl border border-slate-800 leading-relaxed">
                {activeModalLog.summary}
              </p>
            </div>

            {/* Deliverables Injected */}
            {activeModalLog.deliverablesCreated.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Deliverables Synced to Roadmap</span>
                </h4>
                <div className="space-y-1.5">
                  {activeModalLog.deliverablesCreated.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tactical Tasks Added */}
            {activeModalLog.tasksAdded.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-violet flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4" />
                  <span>Sprint Tasks Dispatched</span>
                </h4>
                <div className="space-y-1.5">
                  {activeModalLog.tasksAdded.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-brand-violet/10 border border-brand-violet/20 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Trace Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Agent Execution Telemetry
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {activeModalLog.logSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-navy-950/80 border border-slate-800/80 flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-brand-cyan font-semibold block">
                        {step.step}
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        {step.detail}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {step.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-800">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="sm" variant="secondary" className="w-full sm:w-auto">
                  View in Founder Dashboard
                </Button>
              </Link>
              <Link href="/chat" className="w-full sm:w-auto">
                <Button size="sm" variant="primary" className="w-full sm:w-auto">
                  Debate Output in Chat
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveModalLog(null)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Recent Autonomous Execution History Stream */}
      <GlassCard className="p-6 bg-navy-900/60 border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-cyan" />
            <span>Autonomous Routine Execution Stream</span>
          </h2>
          <span className="text-xs text-slate-400">
            {executionLogs.length} recent executions logged
          </span>
        </div>

        <div className="space-y-3">
          {executionLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => setActiveModalLog(log)}
              className="p-3.5 rounded-xl bg-navy-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl p-2 rounded-xl bg-navy-900 border border-slate-800 shrink-0">
                  {log.agentAvatar}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white hover:text-brand-cyan transition-colors">
                    {log.headline}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {log.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                <span className="text-[10px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                  {log.executedAt}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <ScaffoldAgentModal
        isOpen={isScaffoldOpen}
        onClose={() => setIsScaffoldOpen(false)}
      />
    </div>
  );
};
