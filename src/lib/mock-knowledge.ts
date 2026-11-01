import { AICloneProfile, OrgKnowledgeBase, ChannelIntegrations } from "@/types/knowledge";

export const initialAiClone: AICloneProfile = {
  founderName: "Alex Vance",
  founderRole: "Technical Solo Founder",
  decisionPrinciples: [
    "Ruthlessly cut scope before writing code: If a customer won't pay without it, build it; otherwise cut it.",
    "Never pitch solutions on discovery calls: Extract past behavior, exact dollar costs, and workaround pain.",
    "Charge early: Demand a refundable pilot deposit or signed Letter of Intent before committing custom work.",
    "Speed over perfection: Deliver working value within 60 seconds of onboarding.",
  ],
  vetoRules: [
    "No custom enterprise SSO or SOC2 guarantees before 10 paid self-serve customers.",
    "No free trials without explicit activation milestones or credit card commitment.",
    "No paid ad spending before finding an organic wedge with >20% referral conversion.",
  ],
  communicationTone: "concise",
  pastMistakes: [
    "Spent 4 months building a multi-tenant dashboard that nobody asked for.",
    "Believed compliments on social media instead of checking Stripe checkout conversion.",
    "Failed to ask 'When was the last time this happened?' and built for hypothetical problems.",
  ],
};

export const initialOrgKnowledge: OrgKnowledgeBase = {
  companyIdentity: "AI Co-Founder – The Autonomous Execution Platform for Solo Founders",
  brandVoice: "Direct, engineering-grounded, zero-hype, execution-obsessed",
  valueProposition: "Transform unstructured startup hypotheses into 90-day validated execution with proactive background AI co-founders.",
  targetICP: "Technical solo founders, engineers, and bootstrapped product builders navigating pre-seed to seed validation.",
  elevatorPitch: "Most solo founders drown in endless chat prompts and build features nobody wants. AI Co-Founder gives you 4 specialized proactive partners with standing jobs—triaging scope, running customer discovery, and executing outbound loops while you write code.",
  competitors: [
    {
      name: "ChatGPT / Claude Chat",
      weakness: "Purely passive. Requires user prompts for every single action and has zero persistent project context.",
      ourAdvantage: "Proactive standing routines that execute on schedules and directly mutate 90-day milestones and sprint tasks.",
    },
    {
      name: "Standard Project Management (Jira/Linear)",
      weakness: "Empty containers that require manual task creation and strategic planning.",
      ourAdvantage: "Synthesizes the entire 90-day roadmap automatically from a 3-question intake with built-in validation barriers.",
    },
  ],
  pricingTiers: [
    {
      name: "Starter Founder",
      price: "$29/mo",
      features: "1 Startup Project, 4 Autonomous Co-Founders, 90-Day Execution Matrix, Telegram alerts.",
    },
    {
      name: "Venture Studio",
      price: "$99/mo",
      features: "Unlimited Projects, Custom Agent Scaffolding, Custom Skill Creation, Direct API Key integration.",
    },
  ],
};

export const initialChannelIntegrations: ChannelIntegrations = {
  telegramBotToken: "",
  telegramChatId: "",
  telegramEnabled: false,
  discordWebhookUrl: "",
  discordEnabled: false,
  preferredLlmProvider: "gemini",
};
