import { StartupProject } from "@/types/startup";
import { Milestone } from "@/types/milestone";
import { Task } from "@/types/task";

export interface MockChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    route?: string;
    actionType?: string;
  };
}

export const initialStartupProject: StartupProject = {
  id: "sp-01",
  name: "Synthetix AI",
  tagline: "Autonomous customer insight synthesis for high-velocity B2B teams",
  targetMarket: "B2B SaaS product managers & founders (10-50 FTE)",
  stage: "validation",
  progressPercent: 68,
  readinessScore: 84,
  currentWeeklyGoal: "Complete 10 qualitative customer discovery calls and test the interactive prototype pricing tier.",
  createdAt: "2026-09-01",
  updatedAt: "2026-10-15",
  founder: {
    name: "Alex Vance",
    role: "Founder & Lead Builder",
    avatarUrl: "/images/founder-avatar.png",
  },
  metrics: {
    interviewsCompleted: 14,
    waitlistCount: 342,
    mvpProgress: 75,
    tasksRemainingThisWeek: 4,
  },
  blockers: [
    {
      id: "b-1",
      title: "Waitlist drop-off on step 2 questionnaire",
      severity: "medium",
      suggestedAction: "Shorten form from 6 fields to 2; defer budget questions to the 1-on-1 discovery call.",
    },
    {
      id: "b-2",
      title: "Need Stripe customer portal test configuration",
      severity: "low",
      suggestedAction: "Set up test webhooks and simulate 3 customer subscription life cycles.",
    },
  ],
};

export const initialMilestones: Milestone[] = [
  {
    id: "m-1",
    month: 1,
    monthName: "Month 1: Problem & Customer Validation",
    title: "Validate Problem-Solution Fit",
    description: "Conduct 15 deep founder interviews, validate willingness-to-pay, and secure 200 qualified waitlist signups.",
    targetDate: "2026-09-30",
    status: "completed",
    progressPercent: 100,
    metricTarget: "15 interviews completed, >40% 'very disappointed' score",
    keyDeliverables: [
      "Customer interview synthesis document",
      "Competitive teardown of Gong & UserTesting",
      "High-converting landing page with waitlist funnel",
    ],
  },
  {
    id: "m-2",
    month: 2,
    monthName: "Month 2: Interactive MVP & Closed Beta",
    title: "Deploy Functional MVP with 5 Pilot Users",
    description: "Build core synthetic report generator, invite 5 vetted design partners, and observe end-to-end task completion.",
    targetDate: "2026-10-31",
    status: "in_progress",
    progressPercent: 65,
    metricTarget: "5 daily active design partners, <3 min time-to-insight",
    keyDeliverables: [
      "Interactive data ingestion dashboard",
      "Vector search & automated executive summary generation",
      "Closed alpha testing round with 5 teams",
    ],
  },
  {
    id: "m-3",
    month: 3,
    monthName: "Month 3: Monetization & Public Launch",
    title: "Convert 10 Paid Annual Subscriptions",
    description: "Roll out self-serve team billing, launch on Product Hunt & Hacker News, and target $2k MRR.",
    targetDate: "2026-11-30",
    status: "planned",
    progressPercent: 15,
    metricTarget: "$2,000 MRR from first 10 pilot conversions",
    keyDeliverables: [
      "Stripe checkout & team workspace permissions",
      "Launch playbook (Product Hunt, LinkedIn thought leadership)",
      "Automated founder referral loop",
    ],
  },
];

export const initialTasks: Task[] = [
  {
    id: "t-1",
    milestoneId: "m-2",
    title: "Synthesize transcript analysis from yesterday's call with FinTech PM",
    description: "Extract key quotes around feature prioritization pain points and add to discovery ledger.",
    status: "in_progress",
    priority: "urgent",
    category: "validation",
    dueDate: "Today",
    estimatedHours: 1.5,
    aiCoFounderTip: "Focus on how much time they spend manually cutting weekly stakeholder decks. That's your pricing anchor.",
  },
  {
    id: "t-2",
    milestoneId: "m-2",
    title: "Finish weekly roadmap preview for Design Partner #2",
    description: "Deliver click-through prototype link and prepare 3 targeted validation questions.",
    status: "todo",
    priority: "high",
    category: "product",
    dueDate: "Tomorrow",
    estimatedHours: 2.0,
    aiCoFounderTip: "Don't walk them through it step-by-step; watch where their cursor pauses without guidance.",
  },
  {
    id: "t-3",
    milestoneId: "m-2",
    title: "Refine landing page hero copy based on cold outbound feedback",
    description: "A/B test headline emphasizing 'automated sprint summaries' vs 'customer voice analysis'.",
    status: "todo",
    priority: "medium",
    category: "marketing",
    dueDate: "Oct 18",
    estimatedHours: 1.0,
    aiCoFounderTip: "Vague headlines convert at 3%. Concrete promises with specific workflow nouns convert at 12%+.",
  },
  {
    id: "t-4",
    milestoneId: "m-1",
    title: "Set up PostHog telemetry on Onboarding Form",
    description: "Track drop-off rate between step 1 (idea input) and step 3 (monetization expectations).",
    status: "completed",
    priority: "high",
    category: "tech",
    dueDate: "Oct 12",
    estimatedHours: 3.0,
    aiCoFounderTip: "Funnels with step-level dropoff visualization pinpoint exactly where users lose conviction.",
  },
  {
    id: "t-5",
    milestoneId: "m-2",
    title: "Draft pilot agreement terms & initial $199/mo pilot invoice",
    description: "Prepare standard one-page letter of intent for 3 prospective beta design partners.",
    status: "todo",
    priority: "high",
    category: "fundraising",
    dueDate: "Oct 20",
    estimatedHours: 1.5,
    aiCoFounderTip: "Charging money even in beta is the only honest form of validation. Offer a 100% money-back guarantee.",
  },
  {
    id: "t-6",
    milestoneId: "m-1",
    title: "Map competitive pricing tiers of 4 leading competitors",
    description: "Create comparative analysis table of features vs seat pricing.",
    status: "completed",
    priority: "medium",
    category: "validation",
    dueDate: "Oct 10",
    estimatedHours: 2.0,
  },
];

export const initialChatMessages: MockChatMessage[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Welcome back, Alex. I've analyzed your progress on Synthetix AI for Month 2. You are currently at 68% milestone completion. Your biggest leverage point today is closing the prototype review with your fintech design partner.",
    timestamp: "10:14 AM",
    suggestedAction: {
      label: "View Today's Priority Tasks",
      route: "/dashboard",
    },
  },
  {
    id: "msg-2",
    sender: "user",
    text: "Should we offer a free tier when we launch on Product Hunt next month, or should we stick strictly to a 14-day paid trial?",
    timestamp: "10:16 AM",
  },
  {
    id: "msg-3",
    sender: "ai",
    text: "For a B2B productivity/intelligence tool selling to teams of 10-50 FTE, I strongly advise against a permanent free tier right now. Free users demand 80% of support bandwidth but generate 0% validation of pricing power.\n\nRecommendation:\n1. 14-day unrestricted trial with credit card required upfront.\n2. Product Hunt exclusive incentive: 50% discount on first 3 months with founder onboarding call.\n3. Keep the waitlist intake active as your qualification filter.",
    timestamp: "10:17 AM",
    suggestedAction: {
      label: "Update Launch Milestone Strategy",
      route: "/planner",
    },
  },
];
