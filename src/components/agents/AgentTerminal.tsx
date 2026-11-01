"use client";

import React, { useState, useRef, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useStartup } from "@/context/StartupContext";
import { Terminal, Send, Play, Sparkles } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string;
}

export const AgentTerminal: React.FC = () => {
  const { project, agents, runStandingRoutine } = useStartup();
  const [cmd, setCmd] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "sys-1",
      type: "system",
      text: `AI Co-Founder Engine v1.0.0 (artemiimillier/ai-cofounder bridge online)`,
    },
    {
      id: "sys-2",
      type: "system",
      text: `Active Venture: ${project.name} (${project.stage}) · Type "help" or "status" to interact.`,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const userLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: "input",
      text: `$ ${trimmed}`,
    };

    setHistory((prev) => [...prev, userLine]);
    setCmd("");

    const lower = trimmed.toLowerCase();

    if (lower === "help") {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `Available Commands:
  • status    - Display all active agents & scheduled standing routines
  • triage    - Execute morning sprint triage with Alex Vanguard
  • scout     - Generate Mom Test customer discovery interview questions
  • skills    - List all modular skills in the engine library
  • metrics   - View current venture traction & readiness score
  • clear     - Clear terminal buffer`,
        },
      ]);
    } else if (lower === "status") {
      const summary = agents
        .map(
          (a) =>
            `[${a.status.toUpperCase()}] ${a.displayName} (${a.department}) -> Model: ${a.model} | Next: ${a.schedule}`
        )
        .join("\n");

      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `Autonomous Co-Founder Team Status:\n${summary}`,
        },
      ]);
    } else if (lower === "triage") {
      setHistory((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          type: "system",
          text: `Dispatching routine-triage to Alex Vanguard...`,
        },
      ]);
      const res = await runStandingRoutine("routine-triage");
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `✓ ${res.headline}\n${res.summary}\nDeliverables created: ${res.deliverablesCreated.join(", ")}`,
        },
      ]);
    } else if (lower === "scout") {
      setHistory((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          type: "system",
          text: `Dispatching interview generator to Scout...`,
        },
      ]);
      const res = await runStandingRoutine("routine-interview-guide");
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `✓ ${res.headline}\n${res.summary}\nDispatched task: ${res.tasksAdded.join(", ")}`,
        },
      ]);
    } else if (lower === "skills") {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `Loaded Engine Skills:
  1. seo-audit (Analysis)           - Landing copy & readability validator
  2. article-writing (Writing)      - Long-form thought-leadership engine
  3. research-serp (Research)       - Keyword intent & competitor recon
  4. financial-yesterday (Finance)  - Stripe revenue & checkout triage
  5. db-morning-triage (Ops)        - Telemetry and conversion audit
  6. analytics-traffic (Growth)     - Conversion funnel & drop-off analytics`,
        },
      ]);
    } else if (lower === "metrics") {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `Venture Metrics for ${project.name}:
  • Stage: ${project.stage.toUpperCase()}
  • Progress: ${project.progressPercent}%
  • Readiness Score: ${project.readinessScore}/100
  • Tasks Remaining: ${project.metrics.tasksRemainingThisWeek}
  • Target: "${project.currentWeeklyGoal}"`,
        },
      ]);
    } else if (lower === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: "error",
          text: `command not found: "${trimmed}". Type "help" for available commands.`,
        },
      ]);
    }
  };

  return (
    <GlassCard className="p-5 bg-navy-950 border-slate-800 space-y-3 font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-slate-300 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
            <span>ai-cofounder-cli ~ agent-bridge</span>
          </span>
        </div>

        <span className="text-[10px] text-slate-500">Node v22 / TS 5.5</span>
      </div>

      {/* Terminal Output */}
      <div className="space-y-1.5 min-h-[160px] max-h-[240px] overflow-y-auto pr-1">
        {history.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-cyan-300 font-bold"
                : line.type === "system"
                ? "text-slate-400 italic"
                : line.type === "error"
                ? "text-rose-400"
                : "text-emerald-300"
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Prompt */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        <span className="text-cyan-400 select-none font-bold">❯</span>
        <input
          type="text"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder="Type command (e.g. status, triage, scout, skills, help)..."
          className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs"
        />
        <button type="submit" className="text-slate-400 hover:text-cyan-400">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </GlassCard>
  );
};
