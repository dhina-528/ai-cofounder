"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { OnboardingFormValues, StartupStage } from "@/types/startup";
import { generateRoadmapFromOnboarding } from "@/lib/planner";
import { Milestone } from "@/types/milestone";
import { useStartup } from "@/context/StartupContext";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Rocket,
  Compass,
  Users2,
  DollarSign,
  Layers,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { createProjectFromOnboarding } = useStartup();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<Milestone[] | null>(null);

  const [formData, setFormData] = useState<OnboardingFormValues>({
    name: "",
    tagline: "",
    description: "",
    targetAudience: "",
    monetization: "Monthly B2B SaaS Subscription ($99-$299/mo)",
    currentStage: "ideation",
    primaryGoal90Days: "Acquire first 5 paid pilot customers and reach $1,000 MRR",
    biggestChallenge: "Securing customer discovery calls with busy decision makers",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 3 submission -> generate and save project to central StartupContext
      createProjectFromOnboarding(formData);
      const roadmap = generateRoadmapFromOnboarding(formData);
      setGeneratedRoadmap(roadmap);
      setCurrentStep(4);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Stepper Header */}
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-xs text-brand-violet font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Co-Founder Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Structure Your Startup Execution Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Answer 3 quick questions about your vision. Our engine constructs your customized 90-day milestone roadmap.
          </p>

          {/* Step Progress Dots */}
          <div className="flex items-center justify-center gap-3 pt-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === step
                      ? "bg-gradient-to-r from-brand-violet to-brand-cyan text-white shadow-glass-glow"
                      : currentStep > step
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-navy-900 text-slate-500 border border-slate-800"
                  }`}
                >
                  {currentStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-0.5 ${
                      currentStep > step ? "bg-emerald-500/50" : "bg-slate-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <GlassCard hasReflection className="p-6 sm:p-8 bg-navy-900/70 border-slate-700/60 shadow-glass">
          {currentStep === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brand-cyan" />
                  <span>Step 1: The Core Hypothesis</span>
                </h2>
                <p className="text-xs text-slate-400">
                  What is the working name and core promise of your new venture?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Startup or Project Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. LeadPulse AI, DocuFlow, DevAgent"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    One-Line Value Proposition *
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    required
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="e.g. Automated SOC2 compliance auditing for seed-stage SaaS"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    The Painful Problem You Are Solving
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe how customers currently handle this and why it causes pain..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Target Market
                </Button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-brand-violet" />
                  <span>Step 2: Target Audience & Stage</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Who suffers from this problem most acutely and what stage are you in?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ideal Customer Profile (ICP) *
                  </label>
                  <input
                    type="text"
                    name="targetAudience"
                    required
                    value={formData.targetAudience}
                    onChange={handleChange}
                    placeholder="e.g. VP of Sales at Series A B2B software companies (20-100 employees)"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Current Execution Stage
                  </label>
                  <select
                    name="currentStage"
                    value={formData.currentStage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="ideation">Ideation (Unvalidated hypothesis, zero code)</option>
                    <option value="validation">Validation (Talking to users, testing willingness-to-pay)</option>
                    <option value="mvp">MVP Build (Building clickable/functional prototype)</option>
                    <option value="launch">Pre-Launch (Beta ready, building waitlist)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(1)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Goals
                </Button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Step 3: Commercial Model & 90-Day Target</span>
                </h2>
                <p className="text-xs text-slate-400">
                  How will you charge and what concrete result must be achieved in 90 days?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Monetization Model
                  </label>
                  <input
                    type="text"
                    name="monetization"
                    value={formData.monetization}
                    onChange={handleChange}
                    placeholder="e.g. $199/month subscription or usage-based tier"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    90-Day North Star Metric *
                  </label>
                  <input
                    type="text"
                    name="primaryGoal90Days"
                    required
                    value={formData.primaryGoal90Days}
                    onChange={handleChange}
                    placeholder="e.g. 5 signed letters of intent with deposit, or 1,000 active users"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Biggest Known Bottleneck
                  </label>
                  <input
                    type="text"
                    name="biggestChallenge"
                    value={formData.biggestChallenge}
                    onChange={handleChange}
                    placeholder="e.g. Finding leads to interview, API integration complexity"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(2)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="glow"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                  rightIcon={<Rocket className="w-4 h-4" />}
                >
                  Synthesize 90-Day Plan
                </Button>
              </div>
            </form>
          )}

          {currentStep === 4 && generatedRoadmap && (
            <div className="space-y-6">
              <div className="text-center space-y-2 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  90-Day Execution Matrix Synthesized!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Custom roadmap generated for{" "}
                  <strong className="text-brand-cyan">
                    {formData.name || "Your Startup"}
                  </strong>
                </p>
              </div>

              {/* Generated Milestones Preview */}
              <div className="space-y-4">
                {generatedRoadmap.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-violet uppercase">
                        Month {m.month}
                      </span>
                      <span className="text-[10px] text-slate-400">Due {m.targetDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{m.title}</h3>
                    <p className="text-xs text-slate-400">{m.description}</p>
                    <div className="pt-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                        Deliverables:
                      </span>
                      <ul className="space-y-1">
                        {m.keyDeliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-300 flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto">
                    Go to Founder Dashboard
                  </Button>
                </Link>
                <Link href="/chat" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Debate Strategy with AI Co-Founder
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
