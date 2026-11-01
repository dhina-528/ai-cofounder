import { Agent, RoutineExecutionResult } from "@/types/agent";

export const initialAgents: Agent[] = [
  {
    id: "vanguard-strategy",
    displayName: "Alex Vanguard",
    role: "Chief of Staff & Milestone Copilot",
    department: "strategy",
    avatar: "⚡",
    color: "#8b5cf6",
    model: "Claude 3.7 Sonnet (Thinking)",
    enabled: true,
    schedule: "Daily at 08:30 AM",
    status: "idle",
    skills: [
      "Sprint Blocker Triage",
      "90-Day Milestone Forecasting",
      "Readiness Score Calibration",
      "Resource Allocation",
    ],
    systemPrompt:
      "You are the Chief of Staff. You enforce brutal execution discipline, prevent scope creep, and ensure every activity maps directly to the active 90-day milestone.",
    routines: [
      {
        id: "routine-triage",
        agentId: "vanguard-strategy",
        name: "Morning Milestone Triage & Blocker Sweep",
        description:
          "Scans pending tasks, highlights blockers, and generates today's 3 highest-leverage founder priorities.",
        schedule: "Daily at 08:30 AM",
        status: "ready",
        actionType: "triage_briefing",
      },
      {
        id: "routine-readiness",
        agentId: "vanguard-strategy",
        name: "Weekly Traction & Readiness Audit",
        description:
          "Recalculates validation confidence, assesses pilot feedback velocity, and adjusts sprint timelines.",
        schedule: "Weekly on Mondays",
        status: "ready",
        actionType: "triage_briefing",
      },
    ],
  },
  {
    id: "scout-validation",
    displayName: "Scout",
    role: "Head of Customer Discovery & Intel",
    department: "validation",
    avatar: "🔍",
    color: "#06b6d4",
    model: "Claude 3.5 Sonnet",
    enabled: true,
    schedule: "Every 48 Hours",
    status: "idle",
    skills: [
      "Mom Test Interview Scripting",
      "Pain Point & Workaround Extraction",
      "Willingness-to-Pay Probing",
      "Competitive Intel Analysis",
    ],
    systemPrompt:
      "You are Scout, the relentless customer validation researcher. You extract honest feedback from busy buyers without asking biased hypothetical questions.",
    routines: [
      {
        id: "routine-interview-guide",
        agentId: "scout-validation",
        name: "Mom Test Customer Discovery Guide",
        description:
          "Generates 5 tailored, unbiased discovery questions specifically for your target market and value proposition.",
        schedule: "On-Demand & Sprint Start",
        status: "ready",
        actionType: "interview_generator",
      },
      {
        id: "routine-competitive-intel",
        agentId: "scout-validation",
        name: "Competitive Workaround & Pricing Sweep",
        description:
          "Maps alternative workflows, compares seat pricing tiers, and isolates your defensible wedge.",
        schedule: "Bi-weekly",
        status: "ready",
        actionType: "competitive_sweep",
      },
    ],
  },
  {
    id: "pulse-growth",
    displayName: "Pulse",
    role: "Head of Growth & Outbound Distribution",
    department: "growth",
    avatar: "🚀",
    color: "#ec4899",
    model: "Claude 3.5 Haiku",
    enabled: true,
    schedule: "Twice Weekly",
    status: "idle",
    skills: [
      "Cold Discovery Email Copy",
      "LinkedIn Zero-Pitch Outreach",
      "Waitlist Viral Hooks",
      "Product Hunt Playbooks",
    ],
    systemPrompt:
      "You are Pulse, growth and distribution engine. You craft high-converting, personalized outreach copy that gets 30%+ response rates from cold decision makers.",
    routines: [
      {
        id: "routine-cold-outreach",
        agentId: "pulse-growth",
        name: "Cold Discovery Outreach Pack",
        description:
          "Synthesizes 3 customized outbound copy templates (LinkedIn InMail, cold email, referral request).",
        schedule: "Twice Weekly",
        status: "ready",
        actionType: "outbound_sequence",
      },
      {
        id: "routine-launch-playbook",
        agentId: "pulse-growth",
        name: "Viral Waitlist & Community Launch Teardown",
        description:
          "Constructs channel-specific launch angles for Product Hunt, Reddit, and founder communities.",
        schedule: "Monthly",
        status: "ready",
        actionType: "launch_playbook",
      },
    ],
  },
  {
    id: "nexus-product",
    displayName: "Nexus",
    role: "Principal Product & Technical Architect",
    department: "product",
    avatar: "🛠️",
    color: "#10b981",
    model: "Claude 3.7 Sonnet (Thinking)",
    enabled: true,
    schedule: "Weekly on Fridays",
    status: "idle",
    skills: [
      "Ruthless Scope Triage",
      "MVP Single-Loop Architecture",
      "Telemetry & Activation Funnels",
      "Technical Risk De-escalation",
    ],
    systemPrompt:
      "You are Nexus, technical co-founder. You ruthlessly cut non-essential features so solo founders can ship a working core product in under 14 days.",
    routines: [
      {
        id: "routine-scope-reduction",
        agentId: "nexus-product",
        name: "Ruthless MVP Scope Reduction Audit",
        description:
          "Audits current features and strips away everything outside the core single-user value loop.",
        schedule: "Weekly Sprint Review",
        status: "ready",
        actionType: "scope_reduction",
      },
    ],
  },
];

export const initialExecutionLogs: RoutineExecutionResult[] = [
  {
    id: "log-init-1",
    routineId: "routine-triage",
    agentId: "vanguard-strategy",
    agentName: "Alex Vanguard",
    agentAvatar: "⚡",
    executedAt: "Today at 08:30 AM",
    headline: "Morning Sprint Triage: 4 Active Tasks Reviewed",
    summary:
      "Analyzed current sprint velocity. Month 2 milestone is on track at 68%. Identified primary dependency: closing prototype walkthrough with fintech design partner.",
    deliverablesCreated: [
      "Executive Daily Priority Briefing (pinned to Dashboard)",
    ],
    tasksAdded: [
      "Review prototype feedback recording from FinTech lead",
    ],
    logSteps: [
      {
        step: "Sprint Ledger Inspection",
        timestamp: "08:30:02",
        detail: "Audited 6 open tasks across validation and product categories.",
      },
      {
        step: "Blocker Risk Calculation",
        timestamp: "08:30:14",
        detail: "Waitlist questionnaire friction flagged; recommended reducing to 2 fields.",
      },
      {
        step: "Priority Synthesis",
        timestamp: "08:30:26",
        detail: "Dispatched prioritized daily roadmap to Founder Dashboard.",
      },
    ],
  },
];
