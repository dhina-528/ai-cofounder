import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  CalendarRange,
  Users2,
  ListTodo,
  BotMessageSquare,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: CalendarRange,
      iconColor: "text-brand-violet",
      bgColor: "bg-brand-violet/10",
      borderColor: "border-brand-violet/20",
      title: "Algorithmic 90-Day Execution Engine",
      description:
        "Transforms high-level concepts into a structured 3-month roadmap with defined phases: Discovery, Minimal Prototype, and Monetization.",
    },
    {
      icon: Users2,
      iconColor: "text-brand-cyan",
      bgColor: "bg-brand-cyan/10",
      borderColor: "border-brand-cyan/20",
      title: "Problem Validation & Interview Scripts",
      description:
        "Generates tailored discovery interview scripts to extract true willingness-to-pay without leading the witness or hearing fake validation.",
    },
    {
      icon: ListTodo,
      iconColor: "text-brand-cyanGlow",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      title: "Daily Tactical Momentum Prioritizer",
      description:
        "Eliminates founder fatigue by spotlighting the top 3 high-impact tasks each morning with actionable tactical coaching.",
    },
    {
      icon: BotMessageSquare,
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      title: "24/7 Strategic AI Co-Founder",
      description:
        "Debate pricing models, target ICPs, tech trade-offs, and go-to-market channels with a partner that challenges your blind spots.",
    },
    {
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      title: "Early Blocker Detection & Antidotes",
      description:
        "Flags low interview response rates, scope creep, or drop-off friction before they derail your timeline, prescribing proven fixes.",
    },
    {
      icon: FileCheck2,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      title: "Audit-Ready Validation Ledger",
      description:
        "Every completed milestone and user interview is logged with verifiable evidence, ready to export for angel investors or accelerators.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-brand-cyan px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            Engineered For Speed & Clarity
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything solo founders need to go from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">
              zero to verified traction
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Most startups die in the unstructured fog between having an idea and shipping a functional product. AI Co-Founder replaces the fog with deterministic steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <GlassCard
                key={idx}
                variant="hoverable"
                hasReflection
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bgColor} ${feature.borderColor} border mb-5`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  <Link href="/dashboard" className="inline-flex items-center gap-1.5 font-medium">
                    <span>Explore live capability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
