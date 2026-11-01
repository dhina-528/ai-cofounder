import { Milestone } from "@/types/milestone";
import { Task } from "@/types/task";
import { OnboardingFormValues } from "@/types/startup";

export function calculateOverallProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;
  const total = milestones.reduce((sum, m) => sum + m.progressPercent, 0);
  return Math.round(total / milestones.length);
}

export function calculateTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, inProgress, todo, percent };
}

export function generateRoadmapFromOnboarding(values: OnboardingFormValues): Milestone[] {
  const startupName = values.name || "Your Startup";

  return [
    {
      id: `m-gen-1`,
      month: 1,
      monthName: "Month 1: Deep Discovery & Problem Validation",
      title: `Validate Problem Space for ${startupName}`,
      description: `Run 15 structured problem interviews with ${values.targetAudience || "target buyers"} to isolate willingness-to-pay.`,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "in_progress",
      progressPercent: 30,
      metricTarget: "15 customer interviews completed, 100+ target waitlist signups",
      keyDeliverables: [
        "Buyer persona & pain point teardown document",
        "Offer hypothesis & landing page value proposition",
        "First 5 discovery customer recordings with notes",
      ],
    },
    {
      id: `m-gen-2`,
      month: 2,
      monthName: "Month 2: Core Prototype & Closed Pilot",
      title: `Build MVP & Onboard 5 Early Adopters`,
      description: `Deliver core solution addressing: ${values.biggestChallenge || "primary operational bottleneck"}.`,
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "planned",
      progressPercent: 0,
      metricTarget: "5 active beta pilot participants providing weekly feedback",
      keyDeliverables: [
        "Functional minimal prototype addressing primary user loop",
        "Feedback loop dashboard & telemetry tracking",
        "Weekly founder office hours with pilot customers",
      ],
    },
    {
      id: `m-gen-3`,
      month: 3,
      monthName: "Month 3: Commercial Validation & Launch",
      title: `Execute Commercial Rollout & Target: ${values.primaryGoal90Days || "Revenue"}`,
      description: `Implement monetization through ${values.monetization || "subscription model"} and drive public launch.`,
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "planned",
      progressPercent: 0,
      metricTarget: values.primaryGoal90Days || "Achieve initial paid customers and positive unit economics",
      keyDeliverables: [
        "Billing & payment processing infrastructure",
        "Launch campaign across relevant communities & channels",
        "Customer retention and referral tracking system",
      ],
    },
  ];
}
