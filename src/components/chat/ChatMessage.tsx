import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MockChatMessage } from "@/lib/mock-data";
import { Sparkles, ArrowRight, User } from "lucide-react";

interface ChatMessageProps {
  message: MockChatMessage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === "ai";

  return (
    <div className={`flex gap-3.5 ${isAi ? "items-start" : "items-start flex-row-reverse"}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
          isAi
            ? "bg-navy-900 border-brand-cyan/40 text-brand-cyan shadow-sm shadow-brand-cyan/20"
            : "bg-navy-800 border-slate-700 text-slate-300"
        }`}
      >
        {isAi ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-2xl space-y-2 ${isAi ? "text-left" : "text-right"}`}>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isAi ? "AI Co-Founder" : "You (Founder)"}
          </span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
            isAi
              ? "bg-navy-900/80 border border-slate-800 text-slate-200 shadow-glass-sm"
              : "bg-gradient-to-r from-brand-violet to-brand-cyan text-white shadow-md text-left"
          }`}
        >
          {message.text}
        </div>

        {/* Suggested Action Pill if AI */}
        {isAi && message.suggestedAction && (
          <div className="pt-1">
            {message.suggestedAction.route ? (
              <Link
                href={message.suggestedAction.route}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 border border-brand-cyan/40 text-brand-cyan transition-colors"
              >
                <span>{message.suggestedAction.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-900 border border-brand-cyan/30 text-brand-cyan">
                {message.suggestedAction.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
