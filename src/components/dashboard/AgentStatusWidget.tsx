"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useStartup } from "@/context/StartupContext";
import {
  Sparkles,
  Bot,
  Play,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

export const AgentStatusWidget: React.FC = () => {
  const { agents, runStandingRoutine, project } = useStartup();
  const [runningRoutineId, setRunningRoutineId] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<string | null>(null);

  const handleRun = async (routineId: string, routineName: string, agentName: string) => {
    try {
      setRunningRoutineId(routineId);
      const res = await runStandingRoutine(routineId);
      setLastNotification(
        `${agentName} completed "${routineName}" — new deliverables & sprint tasks added!`
      );
      setTimeout(() => setLastNotification(null), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setRunningRoutineId(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-brand-cyan" />
            <span>Autonomous Co-Founder Team</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet border border-brand-violet/30 uppercase">
              Proactive Engine
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Specialized autonomous agents executing standing routines to accelerate {project.name}.
          </p>
        </div>

        <Link
          href="/agents"
          className="text-xs font-semibold text-brand-cyan hover:text-cyan-300 flex items-center gap-1 self-start sm:self-center transition-colors"
        >
          <span>Open Full Agent Command Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Toast Notification */}
      {lastNotification && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between gap-3 animate-fade-in shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{lastNotification}</span>
          </div>
          <Link
            href="/planner"
            className="text-[11px] underline font-semibold text-white shrink-0 hover:text-emerald-200"
          >
            View in Planner
          </Link>
        </div>
      )}

      {/* Agents Quick Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {agents.map((agent) => {
          const primaryRoutine = agent.routines[0];
          const isRunning = runningRoutineId === primaryRoutine?.id;

          return (
            <GlassCard
              key={agent.id}
              variant="hoverable"
              className="p-4 bg-navy-900/60 border-slate-800/80 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl p-1.5 rounded-xl bg-navy-950 border border-slate-800">
                      {agent.avatar}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-white line-clamp-1">
                        {agent.displayName}
                      </h3>
                      <span className="text-[10px] text-slate-400 line-clamp-1">
                        {agent.role.split("&")[0]}
                      </span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {primaryRoutine && (
                  <div className="p-2.5 rounded-lg bg-navy-950/70 border border-slate-800/70 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan block truncate">
                      {primaryRoutine.name}
                    </span>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                      {primaryRoutine.description}
                    </p>
                  </div>
                )}
              </div>

              {primaryRoutine && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 truncate">
                    {primaryRoutine.schedule}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isRunning}
                    onClick={() =>
                      handleRun(primaryRoutine.id, primaryRoutine.name, agent.displayName)
                    }
                    leftIcon={
                      isRunning ? (
                        <RotateCw className="w-3 h-3 animate-spin text-brand-cyan" />
                      ) : (
                        <Play className="w-3 h-3 text-brand-cyan" />
                      )
                    }
                    className="text-[11px] py-1 px-2.5 h-7"
                  >
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
