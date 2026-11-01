"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useStartup } from "@/context/StartupContext";
import { AICloneProfile, OrgKnowledgeBase, ChannelIntegrations } from "@/types/knowledge";
import {
  BrainCircuit,
  Building,
  Send,
  Sparkles,
  ShieldAlert,
  Sliders,
  Plus,
  Trash2,
  CheckCircle2,
  Bell,
  Key,
  Flame,
  MessageSquare,
  Bot,
  Zap,
} from "lucide-react";

export const KnowledgeCenter: React.FC = () => {
  const {
    aiClone,
    orgKnowledge,
    integrations,
    updateAiClone,
    updateOrgKnowledge,
    updateIntegrations,
    project,
  } = useStartup();

  const [activeTab, setActiveTab] = useState<"ai-clone" | "org" | "integrations">("ai-clone");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState<string | null>(null);

  // AI Clone form state
  const [cloneForm, setCloneForm] = useState<AICloneProfile>(aiClone);
  const [newPrinciple, setNewPrinciple] = useState("");
  const [newVetoRule, setNewVetoRule] = useState("");
  const [newMistake, setNewMistake] = useState("");

  // Org form state
  const [orgForm, setOrgForm] = useState<OrgKnowledgeBase>(orgKnowledge);
  const [newCompName, setNewCompName] = useState("");
  const [newCompWeakness, setNewCompWeakness] = useState("");
  const [newCompAdvantage, setNewCompAdvantage] = useState("");

  // Integrations state
  const [intForm, setIntForm] = useState<ChannelIntegrations>(integrations);

  const handleSaveClone = (e: React.FormEvent) => {
    e.preventDefault();
    updateAiClone(cloneForm);
    triggerSuccess();
  };

  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrgKnowledge(orgForm);
    triggerSuccess();
  };

  const handleSaveIntegrations = (e: React.FormEvent) => {
    e.preventDefault();
    updateIntegrations(intForm);
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const testTelegramPing = () => {
    if (!intForm.telegramBotToken || !intForm.telegramChatId) {
      setTelegramStatus("Please enter both Bot Token and Chat ID to simulate connection.");
      return;
    }
    setTelegramStatus("Sending test dispatch to Telegram...");
    setTimeout(() => {
      setTelegramStatus(
        `✓ Success! Test alert dispatched to Telegram Chat ID [${intForm.telegramChatId}]: "⚡ AI Co-Founder Alert: Nexus completed MVP Scope Reduction for ${project.name}."`
      );
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-full">
      {/* Banner */}
      <GlassCard
        hasReflection
        className="p-6 bg-gradient-to-r from-navy-900/90 via-navy-850 to-navy-900/80 border-slate-700/60"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The 4-Layer Foundation</span>
              </span>
              <span className="text-xs text-slate-400">Layers 3 & 4: Org & AI-Clone</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Knowledge Base & Founder Clone
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Configure who your company is (Org Knowledge) and who you are as a founder (AI-Clone). Your autonomous co-founders inherit these decision rules, tone of voice, and veto guardrails.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Knowledge updated & synced to central context!</span>
            </div>
          )}
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab("ai-clone")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "ai-clone"
                ? "bg-brand-violet/25 text-brand-violet border border-brand-violet/40 shadow-sm"
                : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            Layer 4: AI-Clone (Founder Persona)
          </button>

          <button
            onClick={() => setActiveTab("org")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "org"
                ? "bg-brand-cyan/25 text-brand-cyan border border-brand-cyan/40 shadow-sm"
                : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            Layer 3: Org (Company Knowledge)
          </button>

          <button
            onClick={() => setActiveTab("integrations")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "integrations"
                ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Channels & Telegram Webhooks
          </button>
        </div>
      </GlassCard>

      {/* Layer 4: AI-Clone View */}
      {activeTab === "ai-clone" && (
        <GlassCard className="p-6 bg-navy-900/70 border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-brand-violet" />
              <span>AI-Clone Configuration (Founder Digital Projection)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              This layer travels with you across any project. It anchors how decisions are made, your risk tolerance, and rules derived from painful past mistakes.
            </p>
          </div>

          <form onSubmit={handleSaveClone} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={cloneForm.founderName}
                  onChange={(e) => setCloneForm({ ...cloneForm, founderName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Founder Communication Tone
                </label>
                <select
                  value={cloneForm.communicationTone}
                  onChange={(e) =>
                    setCloneForm({
                      ...cloneForm,
                      communicationTone: e.target.value as AICloneProfile["communicationTone"],
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-violet"
                >
                  <option value="concise">Concise & Direct (No fluff, high velocity)</option>
                  <option value="analytical">Analytical (First-principles & data backed)</option>
                  <option value="inspirational">Inspirational & Bold</option>
                  <option value="direct">Direct & Ruthless (Aggressive prioritization)</option>
                </select>
              </div>
            </div>

            {/* Decision Principles */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Core Decision Principles (Heuristics)
              </label>
              <div className="space-y-2">
                {cloneForm.decisionPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-200"
                  >
                    <span>• {principle}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCloneForm({
                          ...cloneForm,
                          decisionPrinciples: cloneForm.decisionPrinciples.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPrinciple}
                  onChange={(e) => setNewPrinciple(e.target.value)}
                  placeholder="Add a new decision heuristic (e.g. 'Never code before cash')..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (!newPrinciple.trim()) return;
                    setCloneForm({
                      ...cloneForm,
                      decisionPrinciples: [...cloneForm.decisionPrinciples, newPrinciple.trim()],
                    });
                    setNewPrinciple("");
                  }}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Veto Rules */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5 text-rose-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Strict Veto Rules (Anti-Patterns Co-Founders Must Reject)</span>
              </label>
              <div className="space-y-2">
                {cloneForm.vetoRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-3 text-xs text-rose-200"
                  >
                    <span>🚫 {rule}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCloneForm({
                          ...cloneForm,
                          vetoRules: cloneForm.vetoRules.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-rose-400 hover:text-rose-200 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newVetoRule}
                  onChange={(e) => setNewVetoRule(e.target.value)}
                  placeholder="Add a veto rule (e.g. 'No free trials without credit card')..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (!newVetoRule.trim()) return;
                    setCloneForm({
                      ...cloneForm,
                      vetoRules: [...cloneForm.vetoRules, newVetoRule.trim()],
                    });
                    setNewVetoRule("");
                  }}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Past Mistakes */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Past Founder Mistakes (Lessons Learned the Hard Way)</span>
              </label>
              <div className="space-y-2">
                {cloneForm.pastMistakes.map((mistake, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3 text-xs text-amber-200"
                  >
                    <span>⚠️ {mistake}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCloneForm({
                          ...cloneForm,
                          pastMistakes: cloneForm.pastMistakes.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-amber-400 hover:text-amber-200 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMistake}
                  onChange={(e) => setNewMistake(e.target.value)}
                  placeholder="Add a mistake to avoid repeating (e.g. 'Spent $2k on Google Ads before PMF')..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (!newMistake.trim()) return;
                    setCloneForm({
                      ...cloneForm,
                      pastMistakes: [...cloneForm.pastMistakes, newMistake.trim()],
                    });
                    setNewMistake("");
                  }}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button type="submit" variant="primary">
                Save AI-Clone Profile
              </Button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Layer 3: Org Knowledge View */}
      {activeTab === "org" && (
        <GlassCard className="p-6 bg-navy-900/70 border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-brand-cyan" />
              <span>Org Knowledge Base (What We Are Building)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              This layer stays with <strong className="text-brand-cyan">{project.name}</strong>. It defines the brand voice, elevator pitch, and competitive moat.
            </p>
          </div>

          <form onSubmit={handleSaveOrg} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Elevator Pitch (60-Second Hook)
              </label>
              <textarea
                rows={3}
                value={orgForm.elevatorPitch}
                onChange={(e) => setOrgForm({ ...orgForm, elevatorPitch: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Brand Voice & Tone
                </label>
                <input
                  type="text"
                  value={orgForm.brandVoice}
                  onChange={(e) => setOrgForm({ ...orgForm, brandVoice: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Customer ICP
                </label>
                <input
                  type="text"
                  value={orgForm.targetICP}
                  onChange={(e) => setOrgForm({ ...orgForm, targetICP: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            {/* Competitor Dossiers */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Competitor Dossier & Wedges
              </label>
              <div className="space-y-2.5">
                {orgForm.competitors.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{comp.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setOrgForm({
                            ...orgForm,
                            competitors: orgForm.competitors.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-400">
                      <strong className="text-rose-400">Weakness:</strong> {comp.weakness}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-emerald-400">Our Advantage:</strong> {comp.ourAdvantage}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Add Competitor Dossier</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                    placeholder="Competitor Name..."
                    className="px-3 py-1.5 text-xs rounded-lg bg-navy-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={newCompWeakness}
                    onChange={(e) => setNewCompWeakness(e.target.value)}
                    placeholder="Their Vulnerability..."
                    className="px-3 py-1.5 text-xs rounded-lg bg-navy-900 border border-slate-700 text-white"
                  />
                  <input
                    type="text"
                    value={newCompAdvantage}
                    onChange={(e) => setNewCompAdvantage(e.target.value)}
                    placeholder="Our Wedge..."
                    className="px-3 py-1.5 text-xs rounded-lg bg-navy-900 border border-slate-700 text-white"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (!newCompName.trim()) return;
                    setOrgForm({
                      ...orgForm,
                      competitors: [
                        ...orgForm.competitors,
                        {
                          name: newCompName.trim(),
                          weakness: newCompWeakness.trim() || "Complex & slow",
                          ourAdvantage: newCompAdvantage.trim() || "Lightweight & automated",
                        },
                      ],
                    });
                    setNewCompName("");
                    setNewCompWeakness("");
                    setNewCompAdvantage("");
                  }}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add Competitor
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button type="submit" variant="primary">
                Save Org Knowledge
              </Button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Integrations View */}
      {activeTab === "integrations" && (
        <GlassCard className="p-6 bg-navy-900/70 border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              <span>Channels & Telegram Dispatch Bridge</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Connect external channels so that your standing agents ping your phone via Telegram or Discord whenever routines produce deliverables or flag blockers.
            </p>
          </div>

          <form onSubmit={handleSaveIntegrations} className="space-y-6">
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl">
                    ✈️
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Telegram Channel Dispatch</h3>
                    <p className="text-xs text-slate-400">Receive morning briefs and routine alerts directly in Telegram</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={intForm.telegramEnabled}
                    onChange={(e) => setIntForm({ ...intForm, telegramEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Telegram Bot Token
                  </label>
                  <input
                    type="password"
                    value={intForm.telegramBotToken}
                    onChange={(e) => setIntForm({ ...intForm, telegramBotToken: e.target.value })}
                    placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-navy-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Telegram Chat ID
                  </label>
                  <input
                    type="text"
                    value={intForm.telegramChatId}
                    onChange={(e) => setIntForm({ ...intForm, telegramChatId: e.target.value })}
                    placeholder="e.g. -100123456789 or @founder_channel"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-navy-900 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={testTelegramPing}
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Test Telegram Ping
                </Button>
                {telegramStatus && (
                  <span className="text-xs text-brand-cyan font-mono animate-fade-in">
                    {telegramStatus}
                  </span>
                )}
              </div>
            </div>

            {/* Preferred LLM Provider */}
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-brand-cyan" />
                <span>Default LLM Intelligence Transport</span>
              </h3>
              <p className="text-xs text-slate-400">
                Configure your preferred LLM provider. Keys can be set in <code>.env.local</code>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: "gemini", name: "Google Gemini 1.5", badge: "Fast & High Token Limit" },
                  { id: "anthropic", name: "Claude 3.5 Haiku / Sonnet", badge: "Agent SDK Optimized" },
                  { id: "openai", name: "OpenAI GPT-4o Mini", badge: "Direct Reasoning" },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      setIntForm({
                        ...intForm,
                        preferredLlmProvider: item.id as ChannelIntegrations["preferredLlmProvider"],
                      })
                    }
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      intForm.preferredLlmProvider === item.id
                        ? "bg-brand-cyan/15 border-brand-cyan/40 text-white"
                        : "bg-navy-900/60 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{item.name}</span>
                      {intForm.preferredLlmProvider === item.id && (
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button type="submit" variant="primary">
                Save Channel Settings
              </Button>
            </div>
          </form>
        </GlassCard>
      )}
    </div>
  );
};
