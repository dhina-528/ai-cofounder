import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  label,
}) => {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={cn("inline-flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "rounded-full border-slate-700/60 border-t-brand-cyan border-r-brand-violet animate-spin",
          sizeMap[size]
        )}
      />
      {label && <span className="text-xs font-medium text-slate-400 tracking-wide">{label}</span>}
    </div>
  );
};
