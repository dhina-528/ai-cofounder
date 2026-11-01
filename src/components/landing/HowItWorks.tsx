import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, MessageSquare, Compass, Rocket, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Seed Your Startup Hypothesis",
      subtitle: "2-Minute Structured Intake",
      description:
        "Input your startup idea, target persona, envisioned monetization model, and biggest known hurdle into our guided onboarding questionnaire.",
      icon: MessageSquare,
      color: "from-brand-violet to-indigo-500",
    },
    {
      number: "02",
      title: "Synthesize 90-Day Execution Matrix",
      subtitle: "Tailored Milestone Blueprint",
      description:
        "Our engine constructs Month 1 (Validation), Month 2 (MVP Prototype), and Month 3 (Commercial Launch) with concrete deliverable checklists.",
      icon: Compass,
      color: "from-indigo-500 to-cyan-500",
    },
    {
      number: "03",
      title: "Execute Daily with Your AI Co-Founder",
      subtitle: "Zero Fatigue, Maximum Momentum",
      description:
        "Tackle prioritized tasks each morning, get instant feedback on discovery transcripts, and pivot strategies before burning capital.",
      icon: Rocket,
      color: "from-cyan-500 to-emerald-400",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-navy-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-wider uppercase text-brand-violet px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20">
            Frictionless Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How AI Co-Founder drives you from napkin to revenue
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            A proven framework modeled on top accelerator playbooks (Y Combinator, Techstars), tailored to your unique market conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-navy-950/70 border border-slate-800 p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-3xl font-extrabold text-slate-700 group-hover:text-brand-cyan/60 transition-colors">
                    {step.number}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${step.color} p-[1px] flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-navy-950 rounded-[11px] flex items-center justify-center text-white">
                      <Icon className="w-5 h-5 text-slate-100" />
                    </div>
                  </div>
                </div>

                {/* Step Details */}
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-cyan">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action card */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-violet/20 via-navy-900 to-brand-cyan/20 border border-slate-700/60 p-8 sm:p-12 text-center relative overflow-hidden shadow-glass-glow">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to test your startup thesis this week?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an instant 90-day execution roadmap and step-by-step interview guide for your exact startup idea.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto"
                  leftIcon={<Sparkles className="w-4 h-4 text-cyan-200" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Generate My Custom Roadmap
                </Button>
              </Link>
              <Link href="/chat" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Chat with AI Co-Founder First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
