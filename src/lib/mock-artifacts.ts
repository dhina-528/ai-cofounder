import { Artifact } from "@/types/artifact";

export const initialArtifacts: Artifact[] = [
  {
    id: "art-1",
    title: "Mom Test Customer Discovery Protocol & Objection Matrix",
    subtitle: "5-question script to validate willingness-to-pay without quoting prices",
    category: "discovery",
    authorAgentId: "scout-validation",
    authorAgentName: "Scout",
    authorAvatar: "🔍",
    format: "markdown",
    summary:
      "Operational discovery framework for B2B buyer interviews avoiding hypothetical answers and extracting evidence of past budget commitments.",
    tags: ["Customer Discovery", "Mom Test", "Interviews", "Validation"],
    createdAt: "2026-10-21",
    wordCount: 840,
    isPinned: true,
    content: `# Mom Test Customer Discovery Protocol

> **Core Axiom**: Never ask a prospective customer if they *would* buy or use a hypothetical tool. Ask how they actively solved or suffered from the problem in the last 60 days.

---

## 🎯 The 5 Non-Negotiable Interview Inquiries

### 1. The Anchor Question
> *"Walk me through the last time your team had to deal with this problem."*
- **What to listen for**: Exact timestamps, who was involved, tools used (spreadsheets, Slack, custom scripts).
- **Red Flag**: If they speak in abstractions ("usually we tend to..."), redirect: *"Can you tell me about the specific time last Tuesday?"*

### 2. The Budget & Pain Test
> *"What have you already tried or purchased to solve this?"*
- **The Rule**: If they haven't spent real time, hired someone, or purchased software to patch this, the problem is not in their top 3 priorities.
- **Scoring**:
  - $0 spent + no workarounds = **Dead lead (0/5)**
  - Clunky internal Zapier/spreadsheet mess = **Warm lead (4/5)**
  - Bought an expensive tool and hate it = **Prime buyer (5/5)**

### 3. The Workaround Analysis
> *"What sucks most about the workaround you are using today?"*
- Uncovers the real functional gap and emotional wedge.

### 4. The Decision Chain Inquiry
> *"Who else had to sign off or got pulled into that meeting?"*
- Maps the internal buying committee before you write a single line of sales copy.

### 5. The Commitment Ask (Skin in the Game)
> *"We're assembling 5 design partners next month to test our automated pipeline. If we build this to your exact spec, would you be willing to sign a non-binding Letter of Intent with a 14-day refundable pilot deposit?"*

---

## 🛑 Golden Rules for Founders
1. **Shut up and listen**: Aim for 80% customer speaking, 20% founder speaking.
2. **Never mention your solution first**: The moment you pitch features, they transition into polite compliments.
3. **Praise is useless, commitments are data**: Compliments mean nothing; calendar invites and referral introductions mean everything.
`,
  },
  {
    id: "art-2",
    title: "Ruthless MVP Scope Reduction Matrix & PRD",
    subtitle: "Stripping 8 non-essential features to compress time-to-first-value to <60s",
    category: "architecture",
    authorAgentId: "nexus-product",
    authorAgentName: "Nexus",
    authorAvatar: "🛠️",
    format: "markdown",
    summary:
      "Zero-fluff technical PRD defining the single core loop required for initial launch, discarding user settings, team permissions, and third-party integrations.",
    tags: ["MVP", "Product Architecture", "Scope Reduction", "PRD"],
    createdAt: "2026-10-21",
    wordCount: 1120,
    isPinned: true,
    content: `# Ruthless MVP Scope Reduction Matrix

> **Nexus Directive**: Every feature added before first revenue cuts survival probability by 12%. An MVP is not a smaller version of a complete product; it is the single atomic action that delivers relief.

---

## ✂️ The Cut List (De-scoped for Launch)

| Proposed Feature | Initial Founder Request | Nexus Ruling | Rationale |
|---|---|---|---|
| **Multi-Tenant SSO & Roles** | "Support Google, GitHub & SAML" | ❌ **CUT** | Solo founders & small teams do not require SAML. Use single magic-link or direct auth. |
| **Custom Theme Engine** | "Dark/light toggle with branding" | ❌ **CUT** | Zero users make purchasing decisions based on dark mode options. Enforce one opinionated dark navy theme. |
| **Native iOS / Android App** | "Mobile push notifications" | ❌ **CUT** | Web-first responsive layout with Telegram/email digests achieves 100% of user retention. |
| **Comprehensive Analytics Dash** | "30 interactive telemetry charts" | ❌ **CUT** | Founders need 3 numbers: readiness score, tasks completed, customer interviews booked. |

---

## 🚀 The Single Core Atomic Loop

\`\`\`mermaid
flowchart LR
    A[Raw Startup Idea Input] --> B[AI Co-Founder Engine]
    B --> C[Instant 90-Day Roadmap]
    C --> D[First 3 Sprint Tasks Injected]
    D --> E[Export Blueprint / Share with Investors]
\`\`\`

### Core Specification:
1. **Intake Speed**: 3 questions under 90 seconds.
2. **Roadmap Generation**: Pre-computed deterministic milestones based on stage.
3. **Execution Tracker**: Real-time progress updates stored in local persistence.
`,
  },
  {
    id: "art-3",
    title: "Thought-Leadership Essay: Why Solo Founders Need Autonomous Co-Founders",
    subtitle: "The shift from passive chat prompts to proactive standing jobs",
    category: "growth",
    authorAgentId: "pulse-growth",
    authorAgentName: "Pulse",
    authorAvatar: "📈",
    format: "markdown",
    summary:
      "1,400-word ready-to-publish essay analyzing the productivity bottleneck of modern solo founders and introducing proactive background execution.",
    tags: ["Content Engine", "Thought Leadership", "Founder Story", "Distribution"],
    createdAt: "2026-10-22",
    wordCount: 1420,
    isPinned: false,
    content: `# The Post-Prompt AI Co-Founder

### Why Chatbots Fail Solo Founders (And What Replaces Them)

Every solo founder starts with the same illusion: *"I'll use AI to do the work of 5 people."*

Six weeks later, that founder is drowning in browser tabs, copy-pasting the same context into chat interfaces, debugging prompt hallucinations, and feeling like a full-time supervisor rather than a builder.

The problem isn't the intelligence of the models. **The problem is the interaction paradigm.**

---

### The Flaw of the Chat Window
Chat interfaces are inherently passive. They sit there silently until you instruct them. But when you are a solo founder, the hardest part of building a business isn't executing a task—**it is knowing what to execute next**.

A true human co-founder doesn't wait for a prompt every morning. A true co-founder shows up at 8:30 AM having already:
- Triaged customer support drop-offs.
- Audited the landing page conversion funnel.
- Prepared 5 specific questions for today's user calls.
- Warned you that you are spending too much time tweaking CSS instead of validating willingness-to-pay.

---

### Standing Jobs: The New Architecture
Instead of "chatting with AI", modern founders configure **Standing Routines**:
1. **The Morning Milestone Triage**: An automated sweep calculating sprint velocity and identifying the single biggest operational bottleneck.
2. **The Ruthless Scope Cutter**: A gatekeeper agent reviewing feature backlogs and demanding proof of customer demand before code is committed.
3. **The Outbound Engine**: Continuous reconnaissance on target buyer discussions across LinkedIn, Twitter, and niche forums.

When your AI partners run on schedules with defined boundaries, you transform from a solo founder into an engineering-led venture studio.
`,
  },
  {
    id: "art-4",
    title: "Zero-Pitch Cold Outreach Sequence for B2B ICP",
    subtitle: "3-touch LinkedIn & Email cadence yielding 28-34% discovery booking rates",
    category: "growth",
    authorAgentId: "pulse-growth",
    authorAgentName: "Pulse",
    authorAvatar: "📈",
    format: "markdown",
    summary:
      "Tested outreach email and LinkedIn message sequences designed to generate discovery calls by asking for operational perspective rather than pitching solutions.",
    tags: ["Outbound", "Cold Email", "Sales", "B2B"],
    createdAt: "2026-10-22",
    wordCount: 720,
    isPinned: false,
    content: `# Zero-Pitch B2B Outreach Cadence

---

### Touch 1: The "Peer Research" Angle (Day 1)
**Channel**: LinkedIn InMail / Email  
**Subject**: quick question on {Function} at {Company}

> *"Hey {First_Name} — noticed you lead {Function} at {Company}.\n\nWe're compiling a lightweight research benchmark on how Series A/B teams handle {Core_Pain_Point} without drowning in manual tools.\n\nNot selling or pitching anything—simply doing 15-minute perspective interviews with 5 heads of {Function} this week.\n\nWould you be open to sharing how your team navigates this? Happy to share our aggregated anonymized findings afterward."*

---

### Touch 2: The Wedge Follow-Up (Day 4)
**Channel**: Email Thread

> *"Hey {First_Name} — quick follow up. Had a conversation yesterday with another {Role} who mentioned that their biggest headache with this was {Specific_Nuance}.\n\nDoes that align with what you're seeing at {Company}, or have you already automated that workflow?"*

---

### Touch 3: The Graceful Close (Day 8)
**Channel**: Email Thread

> *"Hey {First_Name} — wrapping up our research cohort this Friday. If you're swamped no worries at all! Just wanted to share the benchmark document once published.\n\nWish you and the {Company} team a great sprint!"*
`,
  },
];
