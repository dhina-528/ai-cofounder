"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { VirtualOffice } from "./VirtualOffice";
import { AgentRoster } from "./AgentRoster";
import { SkillLibrary } from "./SkillLibrary";
import { AgentTerminal } from "./AgentTerminal";
import { DecisionFeed } from "./DecisionFeed";
import { useStartup } from "@/context/StartupContext";
import {
  Users,
  Building2,
  Wrench,
  Terminal,
  Activity,
  Sparkles,
  Bot,
  Zap,
  Clock,
  ShieldCheck,
  RotateCw,
} from "lucide-react";

type HubTab = "overview" | "roster" | "skills" | "terminal" | "telemetry";

export const AgentsHub: React.FC = () => {
  const { agents, executionLogs, project } = useStartup();
  const [activeTab, setActiveTab] = useState<HubTab>("overview");

  const totalRoutines = agents.reduce((acc, a) => acc + (a.routines?.length || 0), 0);
  const totalExecutions = executionLogs.length;
  const activeCount = agents.filter((a) => a.enabled).length;

  return (
    <div className="space-y-8 max-w-full">
      {/* Header section with Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-navy-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Autonomous Standby Roster · 4-Layer Co-Founder Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Autonomous Co-Founder Squad
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              Live & Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Proactive background agents executing standing jobs for{" "}
            <span className="text-white font-medium">{project.name}</span>: market intel, customer discovery, ruthless MVP scope reduction, and growth loops.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-navy-900/80 border border-navy-800 rounded-xl p-2 px-4 text-xs font-mono">
          <div className="text-center px-2 border-r border-navy-800">
            <p className="text-slate-400 text-[10px] uppercase">Active Agents</p>
            <p className="text-emerald-400 font-bold text-sm">{activeCount} / {agents.length}</p>
          </div>
          <div className="text-center px-2 border-r border-navy-800">
            <p className="text-slate-400 text-[10px] uppercase">Routines</p>
            <p className="text-cyan-400 font-bold text-sm">{totalRoutines}</p>
          </div>
          <div className="text-center px-2">
            <p className="text-slate-400 text-[10px] uppercase">Telemetry Runs</p>
            <p className="text-indigo-400 font-bold text-sm">{totalExecutions}</p>
          </div>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-3">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "overview"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-navy-900/60 border border-transparent"
          }`}
        >
          <Building2 className="w-4 h-4 text-cyan-400" />
          Virtual Office & Telemetry
        </button>

        <button
          onClick={() => setActiveTab("roster")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "roster"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-navy-900/60 border border-transparent"
          }`}
        >
          <Users className="w-4 h-4 text-cyan-400" />
          Standing Routines & Rosters
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "skills"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-navy-900/60 border border-transparent"
          }`}
        >
          <Wrench className="w-4 h-4 text-cyan-400" />
          Skill Library (6 Tools)
        </button>

        <button
          onClick={() => setActiveTab("terminal")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "terminal"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-navy-900/60 border border-transparent"
          }`}
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          Agent Terminal CLI
        </button>

        <button
          onClick={() => setActiveTab("telemetry")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "telemetry"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-navy-900/60 border border-transparent"
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          Decision Feed
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Virtual Office Workstation Room */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                Virtual Co-Founder Room
              </h2>
              <span className="text-xs text-slate-400">
                Click any desk station to interact or trigger routines
              </span>
            </div>
            <VirtualOffice />
          </div>

          {/* Quick Roster Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                Standing Routine Execution Center
              </h2>
              <button
                onClick={() => setActiveTab("roster")}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
              >
                View Full Roster & Schedules →
              </button>
            </div>
            <AgentRoster />
          </div>

          {/* Live Decision Feed */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Live Telemetry & Decision Stream
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Streaming background reasoning
              </span>
            </div>
            <DecisionFeed />
          </div>
        </div>
      )}

      {activeTab === "roster" && (
        <div className="space-y-6 animate-fadeIn">
          <AgentRoster />
        </div>
      )}

      {activeTab === "skills" && (
        <div className="space-y-6 animate-fadeIn">
          <SkillLibrary />
        </div>
      )}

      {activeTab === "terminal" && (
        <div className="space-y-6 animate-fadeIn">
          <AgentTerminal />
        </div>
      )}

      {activeTab === "telemetry" && (
        <div className="space-y-6 animate-fadeIn">
          <DecisionFeed />
        </div>
      )}
    </div>
  );
};
