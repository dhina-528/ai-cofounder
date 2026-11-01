"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useStartup } from "@/context/StartupContext";
import {
  Building2,
  Clock,
  Play,
  RotateCw,
  Sparkles,
  Zap,
  Coffee,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Flame,
} from "lucide-react";
import Link from "next/link";

interface DeskThought {
  thought: string;
  status: "active" | "idle" | "researching";
  countdown: string;
}

export const VirtualOffice: React.FC = () => {
  const { agents, runStandingRoutine, project } = useStartup();
  const [selectedAgentId, setSelectedAgentId] = useState<string>("vanguard-strategy");
  const [runningRoutineId, setRunningRoutineId] = useState<string | null>(null);

  const deskData: Record<string, DeskThought> = {
    "vanguard-strategy": {
      thought: `Balancing sprint tasks for Month 1. Aiming for 100% completion of validation milestones.`,
      status: "active",
      countdown: "08:30 AM",
    },
    "scout-validation": {
      thought: `Parsing interviews with ${project.targetMarket}. Testing whether they actively budget for this.`,
      status: "researching",
      countdown: "Tomorrow",
    },
    "pulse-growth": {
      thought: `A/B testing LinkedIn zero-pitch hooks against cold email response benchmarks.`,
      status: "active",
      countdown: "Thursday",
    },
    "nexus-product": {
      thought: `Stripping non-core settings from MVP backlog. Compressing time-to-first-value to <60s.`,
      status: "idle",
      countdown: "Friday",
    },
  };

  const handleRunRoutine = async (routineId: string) => {
    try {
      setRunningRoutineId(routineId);
      await runStandingRoutine(routineId);
    } catch (e) {
      console.error(e);
    } finally {
      setRunningRoutineId(null);
    }
  };

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];
  const activeThought = deskData[selectedAgentId] || {
    thought: "Analyzing sprint opportunities...",
    status: "active",
    countdown: "Scheduled",
  };

  return (
    <GlassCard className="p-6 bg-navy-900/80 border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-violet/20 text-brand-violet">
              <Building2 className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Virtual Co-Founder Office & Presence Room
            </h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              4 Co-Founders Online
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive virtual workspace where your autonomous partners coordinate daily execution for{" "}
            <strong className="text-brand-cyan">{project.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Local Time: 10:30 AM (Sprint Hours)</span>
        </div>
      </div>

      {/* Isometric Office Floor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const isSelected = agent.id === selectedAgentId;
          const info = deskData[agent.id] || {
            thought: "Coordinating sprint deliverables...",
            status: "active",
            countdown: "Scheduled",
          };

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between select-none ${
                isSelected
                  ? "bg-navy-950/90 border-brand-cyan/60 shadow-glass-glow ring-1 ring-brand-cyan/40"
                  : "bg-navy-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Desk Lighting Glow */}
              <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-30"
                style={{ backgroundColor: agent.color }}
              />

              <div className="space-y-3">
                {/* Desk Label & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                    Station #{agent.department.slice(0, 3).toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-semibold capitalize">
                      {info.status}
                    </span>
                  </div>
                </div>

                {/* Worker Avatar & Name */}
                <div className="flex items-center gap-3 pt-1">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    {agent.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {agent.displayName}
                    </h4>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">
                      {agent.role}
                    </span>
                  </div>
                </div>

                {/* Live Thought Bubble */}
                <div className="p-2.5 rounded-xl bg-navy-900/80 border border-slate-800 text-[11px] text-slate-300 relative">
                  <div className="text-[9px] uppercase font-bold text-brand-cyan mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Active Focus</span>
                  </div>
                  <p className="line-clamp-2 leading-snug">{info.thought}</p>
                </div>
              </div>

              {/* Routine Countdown Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Next Job:</span>
                <span className="font-semibold text-slate-200">{info.countdown}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Agent Workstation Control Panel */}
      {activeAgent && (
        <div className="p-4 rounded-xl bg-navy-950/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-navy-900 border border-slate-800">
              {activeAgent.avatar}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  {activeAgent.displayName}&rsquo;s Desk Console
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                  ({activeAgent.model})
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeThought.thought}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeAgent.routines[0] && (
              <Button
                size="sm"
                variant="primary"
                disabled={runningRoutineId === activeAgent.routines[0].id}
                onClick={() => handleRunRoutine(activeAgent.routines[0].id)}
                leftIcon={
                  runningRoutineId === activeAgent.routines[0].id ? (
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )
                }
              >
                {runningRoutineId === activeAgent.routines[0].id
                  ? "Running Routine..."
                  : `Run ${activeAgent.routines[0].name.split(" ")[0]} Routine`}
              </Button>
            )}

            <Link href="/chat">
              <Button size="sm" variant="secondary" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                Talk at Desk
              </Button>
            </Link>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
