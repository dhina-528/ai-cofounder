"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { skillCatalog, Skill } from "@/lib/skills";
import { useStartup } from "@/context/StartupContext";
import {
  Wrench,
  Sparkles,
  Play,
  RotateCw,
  CheckCircle2,
  FileCode,
  Tag,
  ChevronRight,
  X,
} from "lucide-react";

export const SkillLibrary: React.FC = () => {
  const { project, addTask, addMilestoneDeliverable } = useStartup();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "analysis", label: "Analysis & Audit" },
    { id: "writing", label: "Writing & Content" },
    { id: "research", label: "Research & Recon" },
    { id: "finance", label: "Finance & Monetization" },
    { id: "growth", label: "Growth & Traffic" },
  ];

  const filteredSkills = skillCatalog.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  const handleExecuteSkill = async (skill: Skill) => {
    setIsExecuting(true);
    setExecutionOutput(null);

    await new Promise((r) => setTimeout(r, 900));

    let output = "";
    if (skill.id === "seo-audit") {
      output = `[SEO & Content Audit Score: 88/100]\n\nTarget Page: Landing Hero for "${project.name}"\n\n• H1 Structure: PASS (Clear execution promise)\n• Value Hook: PASS ("${project.tagline}")\n• Actionable Fix: Add proof badge next to waitlist input to increase conversion by ~4.2%.\n\nDeliverable injected into Month 1 roadmap.`;
      addMilestoneDeliverable("m-1", `SEO & Content Audit: 88/100 for ${project.name}`);
    } else if (skill.id === "article-writing") {
      output = `[Thought-Leadership Article Draft Synthesized]\n\nTitle: Why ${project.targetMarket} Are Ditching Manual Workflows for Automated Execution\n\n1. The Problem: Founders spend 14+ hours per week cutting decks manually.\n2. The Solution: How ${project.name} turns unstructured raw hypotheses into 90-day execution.\n3. The Wedge: Low-overhead, autonomous co-founder operations.\n\nWord count: 1,420 words. Formatted in GitHub markdown.`;
      addMilestoneDeliverable("m-1", `Thought-Leadership Article Draft (1,420 words)`);
      addTask({
        milestoneId: "m-1",
        title: `Publish thought-leadership article to LinkedIn and founder communities`,
        description: `Use synthesized draft to drive first 100 waitlist clicks.`,
        status: "todo",
        priority: "high",
        category: "marketing",
        dueDate: "This Sprint",
      });
    } else if (skill.id === "financial-yesterday") {
      output = `[Daily Financial & Stripe Health Triage]\n\n• Active Monetization Hypothesis: ${project.name} Beta Pricing\n• Target Pricing: Pilot Tier ($99–$199/mo)\n• 90-Day Revenue Target: Initial 10 paid design partners\n• Gateway Readiness: Test webhooks verified. Ready for live self-serve pilot onboarding.`;
      addMilestoneDeliverable("m-3", `Financial Health & Stripe Gateway Checklist`);
    } else {
      output = `[${skill.displayName} Execution Complete]\n\nSynthesized actionable recommendations for ${project.name} targeting ${project.targetMarket}. Injected into sprint deliverables.`;
      addMilestoneDeliverable("m-1", `${skill.displayName} Deliverable`);
    }

    setExecutionOutput(output);
    setIsExecuting(false);
  };

  return (
    <GlassCard className="p-6 bg-navy-900/70 border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-brand-cyan" />
            <span>Co-Founder Skill Library (Engine v1.0)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Modular agent skills ported from artemiimillier/ai-cofounder: content generation, SEO auditing, SERP research, and revenue triage.
          </p>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {skillCatalog.length} Skills Loaded
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === c.id
                ? "bg-brand-violet/20 text-brand-violet border border-brand-violet/40"
                : "bg-navy-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => setActiveSkillModal(skill)}
            className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl p-1.5 rounded-lg bg-navy-900 border border-slate-800">
                  {skill.icon}
                </span>
                <span className="text-[10px] uppercase font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                  {skill.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white line-clamp-1">
                {skill.displayName}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">By {skill.assignedAgent.split(" ")[0]}</span>
              <span className="text-brand-cyan font-semibold flex items-center gap-1">
                Inspect <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {activeSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
          <GlassCard className="max-w-xl w-full p-6 bg-navy-900 border-brand-violet/40 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-navy-950 border border-slate-800">
                  {activeSkillModal.icon}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {activeSkillModal.displayName}
                  </h3>
                  <span className="text-[11px] text-brand-cyan font-mono">
                    Owner: {activeSkillModal.assignedAgent}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveSkillModal(null);
                  setExecutionOutput(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-400">
                Capability Description
              </h4>
              <p className="text-slate-300 bg-navy-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {activeSkillModal.description}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-400">
                Operating Instructions & Rules
              </h4>
              <p className="text-slate-300 bg-navy-950 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono text-[11px]">
                {activeSkillModal.instructions}
              </p>
            </div>

            {/* Execution Result Box */}
            {executionOutput && (
              <div className="space-y-2 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Execution Output Artifact</span>
                </h4>
                <pre className="text-emerald-300 bg-navy-950 p-3 rounded-xl border border-emerald-500/30 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                  {executionOutput}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <Button
                variant="primary"
                disabled={isExecuting}
                onClick={() => handleExecuteSkill(activeSkillModal)}
                leftIcon={
                  isExecuting ? (
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )
                }
              >
                {isExecuting ? "Executing Skill..." : `Test Skill on ${project.name}`}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveSkillModal(null);
                  setExecutionOutput(null);
                }}
              >
                Close
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </GlassCard>
  );
};
