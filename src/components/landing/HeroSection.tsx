"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-navy-950">
      {/* Responsive Futuristic Background Image Layer with cover, center, fade-in */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 mix-blend-luminosity animate-hero-bg pointer-events-none"
        style={{ backgroundImage: `url('/images/reflection-bg.webp')` }}
      />
      {/* Subtle Dark Gradient Overlay for Pristine Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/75 to-navy-950 pointer-events-none" />

      {/* Background Radial Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[420px] bg-hero-glow pointer-events-none blur-3xl opacity-60" />
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-5 w-80 h-80 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-brand-violet/30 text-xs font-medium text-slate-300 shadow-glass-sm mb-6 hover:border-brand-cyan/40 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Next-Generation Startup Copilot</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="text-brand-cyan">Idea to Execution</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Turn your raw startup idea into{" "}
          <span className="bg-gradient-to-r from-brand-violet via-brand-cyanGlow to-brand-cyan bg-clip-text text-transparent">
            executed traction
          </span>{" "}
          in 90 days.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Stop getting stuck in endless brainstorming loops. AI Co-Founder generates structured customer validation frameworks, milestone roadmaps, and daily tactical execution steps.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/onboarding" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-semibold shadow-xl shadow-brand-violet/20"
              leftIcon={<Sparkles className="w-4 h-4 text-cyan-200" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Build My 90-Day Plan
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              View Live Dashboard Demo
            </Button>
          </Link>
        </div>

        {/* Micro-assurances */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Interactive Roadmaps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Customer Interview Generators</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Zero fluff, pure execution</span>
          </div>
        </div>

        {/* Hero Visual Showcase with Mirror / Reflection Effect */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Main Glass Screen Frame */}
          <div className="relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-transparent backdrop-blur-2xl border border-slate-700/60 shadow-glass-glow">
            {/* Top window controls */}
            <div className="h-7 bg-navy-900/90 rounded-t-xl px-4 flex items-center justify-between border-b border-slate-800/80 mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                ai-cofounder.internal/synthetix-ai/dashboard
              </span>
              <div className="w-12" />
            </div>

            {/* Dashboard Screenshot Graphic */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] w-full bg-navy-900">
              <Image
                src="/images/hero-dashboard.webp"
                alt="AI Co-Founder Executive Platform Preview"
                fill
                priority
                className="object-cover object-top"
              />

              {/* In-screen overlay reflection sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/20 via-transparent to-white/5 pointer-events-none" />
            </div>
          </div>

          {/* Elegant Mirror / Floor Reflection Effect */}
          <div className="relative w-full h-24 overflow-hidden pointer-events-none select-none mt-1">
            <div className="relative w-full aspect-[16/9] transform scale-y-[-1] opacity-20 filter blur-[2px] mask-gradient">
              <Image
                src="/images/hero-dashboard.webp"
                alt="Dashboard Reflection"
                fill
                className="object-cover object-top"
              />
            </div>
            {/* Gradient mask to gracefully fade mirror reflection into dark navy */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/80 to-navy-950" />
          </div>

        </div>
      </div>
    </section>
  );
};
