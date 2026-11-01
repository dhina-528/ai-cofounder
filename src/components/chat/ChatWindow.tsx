"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "./ChatMessage";
import { initialChatMessages, MockChatMessage } from "@/lib/mock-data";
import { useStartup } from "@/context/StartupContext";
import {
  Send,
  Sparkles,
  BotMessageSquare,
  HelpCircle,
  RefreshCw,
  Info,
} from "lucide-react";

export const ChatWindow: React.FC = () => {
  const { project, milestones, tasks, agents } = useStartup();
  const [messages, setMessages] = useState<MockChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("vanguard-strategy");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const presetQuestionsByAgent: Record<string, string[]> = {
    "vanguard-strategy": [
      `Review our 90-day execution milestone velocity.`,
      `What are the top 3 risks to our ${project.stage} phase?`,
      `How should I prioritize today's founder tasks?`,
    ],
    "scout-validation": [
      `Generate 5 Mom Test discovery questions for ${project.targetMarket}.`,
      `How do I test willingness-to-pay without quoting prices?`,
      `Analyze customer workarounds for: "${project.tagline}".`,
    ],
    "pulse-growth": [
      `Write a cold LinkedIn outreach angle for ${project.targetMarket}.`,
      `How do we get our first 200 qualified waitlist signups?`,
      `What hook should we use for our Product Hunt launch?`,
    ],
    "nexus-product": [
      `Which features should we cut from the MVP?`,
      `Design the minimal single-task prototype loop.`,
      `What telemetry events should we track on launch day?`,
    ],
  };

  const currentPresets = presetQuestionsByAgent[selectedAgentId] || [
    `How do we validate willingness-to-pay for ${project.name}?`,
    `What are the best customer discovery questions for ${project.targetMarket}?`,
    `Review our 90-day execution milestone velocity.`,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const userQuery = textToSend || input;
    if (!userQuery.trim()) return;

    const userMsg: MockChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userQuery.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Send to /api/chat with fallback
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userQuery.trim(),
        agentId: selectedAgentId,
        projectName: project.name,
        targetMarket: project.targetMarket,
        stage: project.stage,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API call returned non-200");
        const data = await res.json();
        return data.message as string;
      })
      .catch(() => {
        // Fallback to contextual heuristic persona response
        if (selectedAgentId === "scout-validation") {
          return `[Scout • Customer Discovery]\n\nWhen speaking with ${project.targetMarket} regarding "${project.tagline}":\n\n1. Never pitch the solution upfront. Say: "We're researching how teams handle this today."\n2. Ask: "When was the last time this problem occurred?"\n3. "What have you already tried or purchased to solve it?"\n\nIf they haven't spent real time or money in the last 60 days, it is a low-urgency pain.`;
        } else if (selectedAgentId === "pulse-growth") {
          return `[Pulse • Growth & Outbound]\n\nFor ${project.name} targeting ${project.targetMarket}:\n\nSubject: Quick question about ${project.targetMarket.split(" ")[0] || "operations"}\n\n"Hey {Name} - noticed you lead {Area} at {Company}. We're building a lightweight framework for ${project.tagline}.\n\nNot pitching anything—just doing 15-min discovery with 5 founders this week to see how you solve this currently. Open to sharing your perspective?"\n\nThis simple zero-pitch angle converts cold leads at 28-34%.`;
        } else if (selectedAgentId === "nexus-product") {
          return `[Nexus • Product & Architecture]\n\nRuthless MVP Rule for ${project.name}:\n\nYour MVP must do ONE thing so well that users tolerate the lack of everything else. Strip custom settings, multi-user permissions, and billing tier toggles.\n\nDeliverable goal: A single happy path where ${project.targetMarket} achieves value in under 3 minutes.`;
        } else {
          return `[Alex Vanguard • Chief of Staff]\n\nStrategic perspective on "${userQuery.trim()}" for ${project.name}:\n\n1. Alignment: Verify this directly satisfies an active Month ${milestones.find(m => m.status === 'in_progress')?.month || 1} deliverable.\n2. Leverage: Don't spend more than 2 hours without external market validation.\n3. Standing Agent dispatch: Check our autonomous agents roster for specialized routines.`;
        }
      })
      .then((replyText) => {
        let suggestedAction: MockChatMessage["suggestedAction"] = undefined;
        if (selectedAgentId === "scout-validation") {
          suggestedAction = { label: "Run Scout Discovery Routine", route: "/agents" };
        } else if (selectedAgentId === "pulse-growth") {
          suggestedAction = { label: "View Growth Routines", route: "/agents" };
        } else if (selectedAgentId === "nexus-product") {
          suggestedAction = { label: "Run Scope Reduction Audit", route: "/agents" };
        } else {
          suggestedAction = { label: "Open Founder Dashboard", route: "/dashboard" };
        }

        const aiMsg: MockChatMessage = {
          id: `ai-msg-${Date.now()}`,
          sender: "ai",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestedAction,
        };

        setMessages((prev) => [...prev, aiMsg]);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] rounded-2xl bg-navy-900/60 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-glass">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 bg-navy-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner border border-white/10"
            style={{ backgroundColor: `${activeAgent?.color || "#8b5cf6"}20` }}
          >
            {activeAgent?.avatar || "⚡"}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{activeAgent?.displayName}</span>
              <span className="text-xs text-slate-400 font-normal">
                ({activeAgent?.role})
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400">
              Active Project: <strong className="text-brand-cyan">{project.name}</strong> ({project.stage.toUpperCase()} Phase • {project.progressPercent}% Completed)
            </p>
          </div>
        </div>

        {/* Link to Autonomous Roster */}
        <Link
          href="/agents"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 text-xs text-brand-cyan border border-slate-700/60 transition-colors self-start sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Autonomous Agents</span>
        </Link>
      </div>

      {/* Agent Switcher Bar */}
      <div className="px-4 py-2 bg-navy-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
          Consult With:
        </span>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgentId(agent.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              selectedAgentId === agent.id
                ? "bg-gradient-to-r from-brand-violet/25 to-brand-cyan/20 text-white border border-brand-cyan/40 shadow-sm"
                : "bg-navy-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <span>{agent.avatar}</span>
            <span>{agent.displayName.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Preset Question Pills */}
      <div className="px-4 py-2 bg-navy-950/40 border-b border-slate-800/60 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
          Suggested:
        </span>
        {currentPresets.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 shrink-0 text-xs transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-brand-cyan">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Co-Founder is analyzing your startup context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-navy-950/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything: pricing strategy, customer validation, MVP scope, or marketing channels..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
          <Button
            type="submit"
            size="md"
            variant="primary"
            disabled={!input.trim()}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </form>

        <p className="mt-2 text-[10px] text-slate-400 text-center">
          Advice is tailored for early-stage B2B/B2C SaaS validation. Backend LLM connectors configurable via <code className="text-slate-300 font-mono">.env.local</code>.
        </p>
      </div>
    </div>
  );
};
