import type { Metadata } from "next";
import "./globals.css";
import { StartupProvider } from "@/context/StartupContext";

export const metadata: Metadata = {
  title: "AI Co-Founder – From Startup Idea to Execution",
  description:
    "Turn unstructured startup ideas into validated businesses with AI-driven 90-day roadmaps, weekly milestones, and conversational strategic co-founder guidance.",
  keywords: [
    "AI startup founder",
    "startup execution",
    "90-day roadmap",
    "idea validation",
    "founder copilot",
    "SaaS builder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 min-h-screen antialiased selection:bg-brand-cyan/20 selection:text-brand-cyan">
        <StartupProvider>{children}</StartupProvider>
      </body>
    </html>
  );
}

