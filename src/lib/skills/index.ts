export interface Skill {
  id: string;
  name: string;
  displayName: string;
  category: 'analysis' | 'writing' | 'research' | 'finance' | 'ops' | 'growth';
  icon: string;
  color: string;
  description: string;
  instructions: string;
  assignedAgent: string;
  outputFormat: 'markdown' | 'json' | 'checklist';
}

export const skillCatalog: Skill[] = [
  {
    id: "seo-audit",
    name: "seo-audit",
    displayName: "SEO & Content Architecture Auditor",
    category: "analysis",
    icon: "📊",
    color: "#FFAA00",
    description:
      "Audits landing page copy, value props, and markdown drafts for semantic clarity, H1/H2 hierarchy, and readability score.",
    instructions:
      "Parses page structure, inspects headline punchiness, verifies that benefits precede features, and flags fluff or vague copy.",
    assignedAgent: "Scout (Customer Discovery)",
    outputFormat: "json",
  },
  {
    id: "article-writing",
    name: "article-writing",
    displayName: "Autonomous Thought-Leadership Engine",
    category: "writing",
    icon: "✍️",
    color: "#9F7AEA",
    description:
      "Crafts 1,200–2,500 word technical essays, LinkedIn founder posts, and Product Hunt playbooks with zero corporate jargon.",
    instructions:
      "Follows problem-agitation-solution arc. Anchors every claim in real customer pain points and quotes from discovery interviews.",
    assignedAgent: "Pulse (Growth & Outreach)",
    outputFormat: "markdown",
  },
  {
    id: "research-serp",
    name: "research-serp",
    displayName: "Competitive SERP & Keyword Recon",
    category: "research",
    icon: "🔎",
    color: "#06B6D4",
    description:
      "Maps competitor keyword footprints, analyzes user search intent, and identifies unaddressed market wedges.",
    instructions:
      "Scrapes top ranking pages for core problem keywords, isolates common buyer objections, and extracts pricing anchors.",
    assignedAgent: "Scout (Customer Discovery)",
    outputFormat: "markdown",
  },
  {
    id: "financial-yesterday",
    name: "financial-yesterday",
    displayName: "Stripe & Revenue Daily Triage",
    category: "finance",
    icon: "💰",
    color: "#10B981",
    description:
      "Monitors daily checkout volume, MRR velocity, customer churn signals, and trial-to-paid conversion rates.",
    instructions:
      "Aggregates daily transaction volume, checks refund ratios, flags payment processor anomalies, and prepares a 3-line executive brief.",
    assignedAgent: "Alex Vanguard (Chief of Staff)",
    outputFormat: "checklist",
  },
  {
    id: "db-morning-triage",
    name: "db-morning-triage",
    displayName: "System Health & Event Telemetry Triage",
    category: "ops",
    icon: "⚡",
    color: "#F59E0B",
    description:
      "Audits system telemetry, error spikes, onboarding funnel drop-offs, and critical database anomalies.",
    instructions:
      "Scans daily error logs, checks drop-off rates on step 2 of signup, and flags database latency bottlenecks before users complain.",
    assignedAgent: "Nexus (Technical Architect)",
    outputFormat: "checklist",
  },
  {
    id: "analytics-traffic",
    name: "analytics-traffic",
    displayName: "Funnel Conversion & Traffic Inspector",
    category: "growth",
    icon: "📈",
    color: "#EC4899",
    description:
      "Analyzes landing page visitor-to-waitlist conversion velocity and isolates highest-converting traffic referral sources.",
    instructions:
      "Compares weekly visitor volume, identifies highest-converting UTM sources, and suggests headline A/B test variations.",
    assignedAgent: "Pulse (Growth & Outreach)",
    outputFormat: "markdown",
  },
];
