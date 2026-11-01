import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-navy-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-900 border border-slate-700 p-1 flex items-center justify-center">
              <Image src="/images/logo.svg" alt="Logo" width={24} height={24} />
            </div>
            <span className="font-bold text-white tracking-tight">AI Co-Founder</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The intelligent operational co-pilot for solo founders and early-stage teams. Turning ideas into validated traction in 90 days.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational Engine Active</span>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Platform
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                Founder Dashboard
              </Link>
            </li>
            <li>
              <Link href="/planner" className="hover:text-cyan-400 transition-colors">
                90-Day Execution Roadmap
              </Link>
            </li>
            <li>
              <Link href="/chat" className="hover:text-cyan-400 transition-colors">
                AI Co-Founder Advisory
              </Link>
            </li>
            <li>
              <Link href="/onboarding" className="hover:text-cyan-400 transition-colors">
                Interactive Startup Setup
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources & System */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Developer & System
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href="/api/health"
                target="_blank"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                API Health Endpoint
              </Link>
            </li>
            <li>
              <span className="text-slate-500">Framework: Next.js 15 App Router</span>
            </li>
            <li>
              <span className="text-slate-500">Styling: Tailwind CSS Glassmorphism</span>
            </li>
            <li>
              <span className="text-slate-500">Runtime: TypeScript Strict</span>
            </li>
          </ul>
        </div>

        {/* Founder Mindset */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Execution Philosophy
          </h4>
          <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 text-brand-cyan font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bias Toward Action</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Ideas are cheap. Momentum comes from 15 customer discovery calls, rapid prototypes, and weekly un-blockers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} AI Co-Founder. Built for high-velocity builders.</p>
        <p className="text-center sm:text-right text-[11px]">
          Prototype demonstration mode. Backend LLM connectors configurable via environment variables.
        </p>
      </div>
    </footer>
  );
};
