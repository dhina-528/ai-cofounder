"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, Sparkles, LayoutDashboard, CalendarRange, MessageSquareCode, ArrowRight, Bot, FileText, BrainCircuit } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Roadmap", href: "/planner", icon: CalendarRange },
    { label: "Agents", href: "/agents", icon: Bot },
    { label: "Artifacts", href: "/artifacts", icon: FileText },
    { label: "Knowledge", href: "/knowledge", icon: BrainCircuit },
    { label: "Chat", href: "/chat", icon: MessageSquareCode },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan p-[1px] shadow-sm shadow-brand-violet/20 group-hover:shadow-brand-cyan/40 transition-all">
            <div className="w-full h-full bg-navy-950 rounded-[11px] flex items-center justify-center p-1.5">
              <Image
                src="/images/logo.svg"
                alt="AI Co-Founder Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              AI Co-Founder
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold bg-brand-cyan/15 text-brand-cyan rounded-md border border-brand-cyan/30">
                PROTOTYPE
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Idea to Execution
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-navy-900/60 p-1 rounded-full border border-slate-800/80">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5 opacity-70" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Live Demo
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-cyan-200" />}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start My Startup
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-navy-950/95 backdrop-blur-2xl px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white"
              >
                {item.icon && <item.icon className="w-4 h-4 text-brand-cyan" />}
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Launch My Startup
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
