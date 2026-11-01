"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useStartup } from "@/context/StartupContext";
import {
  Activity,
  Terminal,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

interface DecisionEvent {
  id: string;
  type: "routine.start" | "tool.exec" | "subagent.think" | "decision.action" | "audit.telemetry";
  agentName: string;
  agentAvatar: string;
  text: string;
  timestamp: string;
  status: "running" | "completed" | "info";
}

export const DecisionFeed: React.FC = () => {
  const { project, agents, executionLogs } = useStartup();

  const [events, setEvents] = useState<DecisionEvent[]>([
    {
      id: "ev-1",
      type: "routine.start",
      agentName: "Alex Vanguard",
      agentAvatar: "⚡",
      text: `Standing routine initialized for ${project.name}: Morning Milestone Triage.`,
      timestamp: "08:30:02",
      status: "completed",
    },
    {
      id: "ev-2",
      type: "tool.exec",
      agentName: "Scout",
      agentAvatar: "🔍",
      text: `Tool: research-serp mapping ICP pain points for ${project.targetMarket}.`,
      timestamp: "08:30:15",
      status: "completed",
    },
    {
      id: "ev-3",
      type: "subagent.think",
      agentName: "Nexus",
      agentAvatar: "🛠️",
      text: `Subagent thinking: Evaluating feature complexity against 14-day prototype constraint.`,
      timestamp: "08:30:24",
      status: "completed",
    },
    {
      id: "ev-4",
      type: "decision.action",
      agentName: "Pulse",
      agentAvatar: "🚀",
      text: `Decision: Dispatched 3 cold discovery angles for ${project.targetMarket} to sprint board.`,
      timestamp: "08:31:05",
      status: "completed",
    },
  ]);

  const [isLive, setIsLive] = useState(true);

  // Stream new live agent thoughts periodically
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      if (!randomAgent) return;

      const thoughtPool = [
        `Tool: analytics-traffic auditing step 2 signup funnel drop-off for ${project.name}.`,
        `Subagent thinking: Calibrating willingness-to-pay signals for ${project.targetMarket}.`,
        `Audit: Verified Month 1 milestone target date against sprint velocity.`,
        `Event: Telemetry check passed — 0 unhandled exceptions in active task loop.`,
        `Tool: seo-audit analyzing headline punchiness: "${project.tagline}".`,
      ];

      const text = thoughtPool[Math.floor(Math.random() * thoughtPool.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newEv: DecisionEvent = {
        id: `ev-${Date.now()}`,
        type: Math.random() > 0.5 ? "tool.exec" : "subagent.think",
        agentName: randomAgent.displayName,
        agentAvatar: randomAgent.avatar,
        text,
        timestamp: timeStr,
        status: "info",
      };

      setEvents((prev) => [newEv, ...prev.slice(0, 14)]);
    }, 9000);

    return () => clearInterval(interval);
  }, [isLive, agents, project]);

  return (
    <GlassCard className="p-5 bg-navy-900/70 border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-brand-cyan/15 text-brand-cyan">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Decision Feed & Agent Event Stream</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-[11px] text-slate-400">
              Live asynchronous stream of autonomous co-founder operations
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase border transition-all ${
            isLive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-slate-800 text-slate-400 border-slate-700"
          }`}
        >
          {isLive ? "Stream Active" : "Stream Paused"}
        </button>
      </div>

      {/* Stream List */}
      <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-xs pr-1">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-2.5 rounded-lg bg-navy-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-3"
          >
            <span className="text-base select-none shrink-0 mt-0.5">
              {ev.agentAvatar}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-brand-cyan truncate">
                  {ev.agentName}
                </span>
                <span className="text-[10px] text-slate-500 font-sans shrink-0">
                  {ev.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">
                {ev.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
