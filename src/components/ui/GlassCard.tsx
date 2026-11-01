import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hoverable" | "elevated" | "accent-border";
  hasReflection?: boolean;
  glow?: "none" | "violet" | "cyan" | "subtle";
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      variant = "default",
      hasReflection = false,
      glow = "none",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative rounded-2xl bg-navy-900/60 backdrop-blur-xl border border-slate-700/40 text-slate-100 transition-all duration-300";

    const variantStyles = {
      default: "shadow-glass-sm",
      hoverable:
        "shadow-glass-sm hover:shadow-glass hover:border-slate-600/70 hover:-translate-y-0.5",
      elevated:
        "shadow-glass bg-navy-850/80 border-slate-700/60",
      "accent-border":
        "border-transparent bg-gradient-to-b from-brand-violet/20 via-brand-cyan/10 to-transparent p-[1px] rounded-2xl shadow-glass",
    };

    const glowStyles = {
      none: "",
      subtle: "shadow-glass-glow",
      violet: "shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]",
      cyan: "shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]",
    };

    const content = (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          glowStyles[glow],
          hasReflection && "overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Subtle top light sheen / mirror reflection line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

        {/* Diagonal glass glare reflection */}
        {hasReflection && (
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-cyan-400/10 via-violet-400/5 to-transparent rounded-full blur-2xl pointer-events-none transform -rotate-12" />
        )}

        {children}
      </div>
    );

    return content;
  }
);

GlassCard.displayName = "GlassCard";
