"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useStartup } from "@/context/StartupContext";
import { Agent, AgentDepartment, StandingRoutine } from "@/types/agent";
import { skillCatalog } from "@/lib/skills";
import {
  X,
  Bot,
  Sparkles,
  Layers,
  Clock,
  Shield,
  Plus,
  Wrench,
  CheckCircle2,
} from "lucide-react";

interface ScaffoldAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScaffoldAgentModal: React.FC<ScaffoldAgentModalProps> = ({ isOpen, onClose }) => {
  const { addCustomAgent, project } = useStartup();

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState<AgentDepartment>("growth");
  const [avatar, setAvatar] = useState("🤖");
  const [color, setColor] = useState("#06B6D4");
  const [model, setModel] = useState("claude-3-5-sonnet");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["article-writing"]);
  const [routineName, setRoutineName] = useState("");
  const [routineSchedule, setRoutineSchedule] = useState("Daily at 09:00 AM");
  const [routineActionType, setRoutineActionType] = useState<StandingRoutine["actionType"]>("triage_briefing");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !role.trim()) return;

    const initialRoutine: StandingRoutine = {
      id: `rt-${Date.now()}`,
      agentId: "",
      name: routineName.trim() || `${displayName} Standing Sweep`,
      description: `Autonomous standing routine for ${project.name}: ${role}.`,
      schedule: routineSchedule,
      status: "ready",
      actionType: routineActionType,
    };

    addCustomAgent({
      displayName: displayName.trim(),
      role: role.trim(),
      department,
      avatar,
      color,
      model,
      enabled: true,
      schedule: routineSchedule,
      skills: selectedSkills,
      systemPrompt:
        systemPrompt.trim() ||
        `You are ${displayName}, responsible for ${role} for ${project.name}. Prioritize high-velocity execution and customer validation.`,
      routines: [initialRoutine],
    });

    onClose();
  };

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <GlassCard
        variant="elevated"
        className="max-w-2xl w-full p-6 sm:p-8 bg-navy-900 border-brand-cyan/40 shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-6"
      >
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan p-[1px]">
              <div className="w-full h-full bg-navy-900 rounded-[11px] flex items-center justify-center text-xl">
                {avatar}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
                  Engine /scaffold-agent
                </span>
                <span className="text-[10px] text-slate-400">Agent Scaffold v1.0</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Scaffold New Autonomous Co-Founder
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Agent Display Name *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Argus, Lex, Echo, Vector"
                className="w-full px-3 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Specific Role / Specialization *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Technical SEO Lead, Legal & IP Scout"
                className="w-full px-3 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as AgentDepartment)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
              >
                <option value="strategy">Strategy & Triage</option>
                <option value="validation">Customer Discovery</option>
                <option value="growth">Growth & Outbound</option>
                <option value="product">Product Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Avatar Emoji
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white text-center text-base"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Base Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
              >
                <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                <option value="gemini-1-5-flash">Gemini 1.5 Flash</option>
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="claude-3-5-haiku">Claude 3.5 Haiku</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Agent System Prompt / Mandate
            </label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder={`Define the strict mandate and veto instincts for ${displayName || 'this agent'}...`}
              className="w-full px-3 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
            />
          </div>

          {/* Assigned Skills */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Assign Modular Skills from Library</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skillCatalog.map((s) => {
                const isSelected = selectedSkills.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleSkill(s.id)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-navy-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{s.displayName}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-cyan-400 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Standing Routine */}
          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Standing Automated Routine</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Routine Name</label>
                <input
                  type="text"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  placeholder="e.g. Daily SERP Sweep, Morning IP Audit"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-navy-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Execution Schedule</label>
                <input
                  type="text"
                  value={routineSchedule}
                  onChange={(e) => setRoutineSchedule(e.target.value)}
                  placeholder="e.g. Daily at 08:30 AM, Weekly on Monday"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-navy-900 border border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Deploy Agent to Roster
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
