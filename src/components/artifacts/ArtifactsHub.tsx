"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useStartup } from "@/context/StartupContext";
import { Artifact, ArtifactCategory } from "@/types/artifact";
import {
  FileText,
  Search,
  Download,
  Copy,
  Check,
  Sparkles,
  Tag,
  Clock,
  Layers,
  X,
  Compass,
  ArrowRight,
  TrendingUp,
  Pin,
  Bot,
} from "lucide-react";

export const ArtifactsHub: React.FC = () => {
  const { artifacts, project } = useStartup();
  const [selectedCategory, setSelectedCategory] = useState<ArtifactCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Artifacts" },
    { id: "discovery", label: "Customer Discovery" },
    { id: "architecture", label: "Product & MVP PRDs" },
    { id: "growth", label: "Growth & Outbound" },
    { id: "strategy", label: "Strategy & Triage" },
  ];

  const filteredArtifacts = artifacts.filter((art) => {
    const matchCategory = selectedCategory === "all" || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (artifact: Artifact) => {
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(artifact.content);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${artifact.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-full">
      {/* Header Banner */}
      <GlassCard
        hasReflection
        className="p-6 bg-gradient-to-r from-navy-900/90 via-navy-850 to-navy-900/80 border-slate-700/60"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous Content & Deliverables Repository</span>
              </span>
              <span className="text-xs text-slate-400">Layer 2 Output Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Generated Deliverables & Artifacts
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Full-length operational documents autonomously synthesized by your co-founders for{" "}
              <strong className="text-brand-cyan">{project.name}</strong>: Mom Test interview protocols, PRDs, cold outreach sequences, and thought leadership articles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Total Documents
              </span>
              <span className="text-xl font-bold text-white">
                {artifacts.length} Synthesized
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id as ArtifactCategory | "all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-sm"
                    : "bg-navy-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artifacts, tags, or hooks..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>
      </GlassCard>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArtifacts.map((artifact) => {
          return (
            <GlassCard
              key={artifact.id}
              variant="elevated"
              className="p-6 flex flex-col justify-between hover:border-slate-700 transition-all bg-navy-900/70 border-slate-800"
            >
              <div className="space-y-4">
                {/* Author & Category Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-center text-lg">
                      {artifact.authorAvatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {artifact.authorAgentName}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                          {artifact.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{artifact.createdAt}</span>
                    </div>
                  </div>

                  {artifact.isPinned && (
                    <span className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20" title="Pinned Core Document">
                      <Pin className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3
                    onClick={() => setActiveArtifact(artifact)}
                    className="text-base font-bold text-white hover:text-brand-cyan transition-colors cursor-pointer"
                  >
                    {artifact.title}
                  </h3>
                  {artifact.subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{artifact.subtitle}</p>
                  )}
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-300 leading-relaxed bg-navy-950/60 p-3 rounded-xl border border-slate-800/80">
                  {artifact.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {artifact.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-navy-950 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                  {artifact.wordCount && (
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5">
                      ~{artifact.wordCount} words
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setActiveArtifact(artifact)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Read Document
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(artifact.content, artifact.id)}
                    leftIcon={
                      copiedId === artifact.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                    className="text-xs"
                  >
                    {copiedId === artifact.id ? "Copied" : "Copy"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(artifact)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    .md
                  </Button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {filteredArtifacts.length === 0 && (
        <div className="text-center py-12 bg-navy-900/40 rounded-2xl border border-slate-800 space-y-3">
          <FileText className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="text-sm text-slate-300 font-semibold">No matching deliverables found</p>
          <p className="text-xs text-slate-500">
            Run standing routines in the Agents hub to automatically synthesize new artifacts.
          </p>
        </div>
      )}

      {/* Reader Modal */}
      {activeArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
          <GlassCard
            variant="elevated"
            className="max-w-3xl w-full p-6 sm:p-8 bg-navy-900 border-brand-cyan/40 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-xl">
                  {activeArtifact.authorAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
                      {activeArtifact.authorAgentName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      • {activeArtifact.createdAt}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {activeArtifact.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveArtifact(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Markdown Content Display */}
            <div className="p-4 sm:p-6 rounded-xl bg-navy-950 border border-slate-800 overflow-x-auto text-slate-200 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap">
              {activeArtifact.content}
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Tag className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{activeArtifact.tags.join(" • ")}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleCopy(activeArtifact.content, activeArtifact.id)}
                  leftIcon={
                    copiedId === activeArtifact.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )
                  }
                >
                  {copiedId === activeArtifact.id ? "Copied" : "Copy Markdown"}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleDownload(activeArtifact)}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  Download .md
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveArtifact(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
