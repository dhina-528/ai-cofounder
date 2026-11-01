"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { StartupProject, OnboardingFormValues } from "@/types/startup";
import { Milestone } from "@/types/milestone";
import { Task } from "@/types/task";
import { Agent, StandingRoutine, RoutineExecutionResult, RoutineExecutionStep } from "@/types/agent";
import { Artifact } from "@/types/artifact";
import { AICloneProfile, OrgKnowledgeBase, ChannelIntegrations } from "@/types/knowledge";
import {
  initialStartupProject,
  initialMilestones,
  initialTasks,
} from "@/lib/mock-data";
import { initialAgents, initialExecutionLogs } from "@/lib/agent-data";
import { initialArtifacts } from "@/lib/mock-artifacts";
import { initialAiClone, initialOrgKnowledge, initialChannelIntegrations } from "@/lib/mock-knowledge";

const STORAGE_KEY = "ai_cofounder_data_v2";

export interface StartupContextType {
  project: StartupProject;
  milestones: Milestone[];
  tasks: Task[];
  agents: Agent[];
  executionLogs: RoutineExecutionResult[];
  artifacts: Artifact[];
  aiClone: AICloneProfile;
  orgKnowledge: OrgKnowledgeBase;
  integrations: ChannelIntegrations;
  onboardingData: OnboardingFormValues | null;
  isHydrated: boolean;
  createProjectFromOnboarding: (data: OnboardingFormValues) => StartupProject;
  toggleTaskStatus: (taskId: string) => void;
  addTask: (newTask: Omit<Task, "id">) => void;
  deleteTask: (taskId: string) => void;
  addMilestoneDeliverable: (milestoneId: string, deliverable: string) => void;
  updateProject: (updates: Partial<StartupProject>) => void;
  runStandingRoutine: (routineId: string) => Promise<RoutineExecutionResult>;
  toggleAgentEnabled: (agentId: string) => void;
  addCustomAgent: (newAgent: Omit<Agent, "id" | "status">) => Agent;
  addArtifact: (newArtifact: Omit<Artifact, "id" | "createdAt">) => Artifact;
  deleteArtifact: (artifactId: string) => void;
  updateAiClone: (updates: Partial<AICloneProfile>) => void;
  updateOrgKnowledge: (updates: Partial<OrgKnowledgeBase>) => void;
  updateIntegrations: (updates: Partial<ChannelIntegrations>) => void;
  resetToDemo: () => void;
  exportBlueprintJSON: () => void;
  exportInvestorUpdateMarkdown: () => void;
  exportGitHubIssuesCSV: () => void;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

function calculateDynamicMetrics(
  currentProject: StartupProject,
  currentTasks: Task[],
  currentMilestones: Milestone[]
): {
  project: StartupProject;
  milestones: Milestone[];
} {
  const totalTasks = currentTasks.length;
  const completedTasks = currentTasks.filter((t) => t.status === "completed").length;
  const tasksRemaining = currentTasks.filter((t) => t.status !== "completed").length;

  const taskCompletionRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;
  const progressPercent = Math.round(taskCompletionRatio * 100);

  const updatedMilestones = currentMilestones.map((m) => {
    const assignedTasks = currentTasks.filter((t) => t.milestoneId === m.id);
    if (assignedTasks.length > 0) {
      const mCompleted = assignedTasks.filter((t) => t.status === "completed").length;
      const mPercent = Math.round((mCompleted / assignedTasks.length) * 100);
      const mStatus =
        mPercent === 100
          ? "completed"
          : mPercent > 0
          ? "in_progress"
          : m.status === "completed"
          ? "in_progress"
          : m.status;
      return {
        ...m,
        progressPercent: mPercent,
        status: mStatus as Milestone["status"],
      };
    }
    return m;
  });

  const interviewBonus = Math.min(20, (currentProject.metrics.interviewsCompleted || 0) * 2);
  const readinessScore = Math.min(98, Math.max(35, Math.round(35 + taskCompletionRatio * 45 + interviewBonus)));

  const updatedProject: StartupProject = {
    ...currentProject,
    progressPercent,
    readinessScore,
    updatedAt: new Date().toISOString().split("T")[0],
    metrics: {
      ...currentProject.metrics,
      tasksRemainingThisWeek: tasksRemaining,
      mvpProgress: Math.min(100, Math.max(currentProject.metrics.mvpProgress, Math.round(progressPercent * 0.9 + 10))),
    },
  };

  return { project: updatedProject, milestones: updatedMilestones };
}

export const StartupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<StartupProject>(initialStartupProject);
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [executionLogs, setExecutionLogs] = useState<RoutineExecutionResult[]>(initialExecutionLogs);
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [aiClone, setAiClone] = useState<AICloneProfile>(initialAiClone);
  const [orgKnowledge, setOrgKnowledge] = useState<OrgKnowledgeBase>(initialOrgKnowledge);
  const [integrations, setIntegrations] = useState<ChannelIntegrations>(initialChannelIntegrations);
  const [onboardingData, setOnboardingData] = useState<OnboardingFormValues | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // 1. Initial hydration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.project && Array.isArray(parsed.milestones) && Array.isArray(parsed.tasks)) {
          setProject(parsed.project);
          setMilestones(parsed.milestones);
          setTasks(parsed.tasks);
          if (Array.isArray(parsed.agents) && parsed.agents.length > 0) {
            setAgents(parsed.agents);
          }
          if (Array.isArray(parsed.executionLogs) && parsed.executionLogs.length > 0) {
            setExecutionLogs(parsed.executionLogs);
          }
          if (Array.isArray(parsed.artifacts) && parsed.artifacts.length > 0) {
            setArtifacts(parsed.artifacts);
          }
          if (parsed.aiClone) {
            setAiClone(parsed.aiClone);
          }
          if (parsed.orgKnowledge) {
            setOrgKnowledge(parsed.orgKnowledge);
          }
          if (parsed.integrations) {
            setIntegrations(parsed.integrations);
          }
          if (parsed.onboardingData) {
            setOnboardingData(parsed.onboardingData);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to load startup state from localStorage, using defaults:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Persist state changes to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload = {
        project,
        milestones,
        tasks,
        agents,
        executionLogs,
        artifacts,
        aiClone,
        orgKnowledge,
        integrations,
        onboardingData,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save startup state to localStorage:", err);
    }
  }, [
    project,
    milestones,
    tasks,
    agents,
    executionLogs,
    artifacts,
    aiClone,
    orgKnowledge,
    integrations,
    onboardingData,
    isHydrated,
  ]);

  // Keep derived progress and metrics in sync whenever the task collection changes.
  useEffect(() => {
    if (!isHydrated) return;

    setProject((currentProject) => {
      const { project: updatedProject } = calculateDynamicMetrics(
        currentProject,
        tasks,
        milestones
      );
      return updatedProject;
    });
    setMilestones((currentMilestones) => {
      const { milestones: updatedMilestones } = calculateDynamicMetrics(
        project,
        tasks,
        currentMilestones
      );
      return updatedMilestones;
    });
  }, [tasks, isHydrated]);

  // Toggle task status
  const toggleTaskStatus = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus = task.status === "completed" ? "todo" : "completed";
        return { ...task, status: nextStatus };
      })
    );
  }, []);

  // Add task
  const addTask = useCallback((newTaskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    setTasks((prev) => [newTask, ...prev]);
  }, []);

  // Delete task
  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  // Add deliverable to milestone
  const addMilestoneDeliverable = useCallback((milestoneId: string, deliverable: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === milestoneId) {
          return {
            ...m,
            keyDeliverables: [...m.keyDeliverables, deliverable.trim()],
          };
        }
        return m;
      })
    );
  }, []);

  // Update project fields
  const updateProject = useCallback((updates: Partial<StartupProject>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0],
    }));
  }, []);

  // Artifact management
  const addArtifact = useCallback(
    (newArtifact: Omit<Artifact, "id" | "createdAt">): Artifact => {
      const created: Artifact = {
        ...newArtifact,
        id: `art-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setArtifacts((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const deleteArtifact = useCallback((artifactId: string) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== artifactId));
  }, []);

  // AI-Clone & Org updates
  const updateAiClone = useCallback((updates: Partial<AICloneProfile>) => {
    setAiClone((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateOrgKnowledge = useCallback((updates: Partial<OrgKnowledgeBase>) => {
    setOrgKnowledge((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateIntegrations = useCallback((updates: Partial<ChannelIntegrations>) => {
    setIntegrations((prev) => ({ ...prev, ...updates }));
  }, []);

  // Custom agent creator
  const addCustomAgent = useCallback((newAgent: Omit<Agent, "id" | "status">): Agent => {
    const agentId = `agent-${newAgent.displayName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}`;
    const fullAgent: Agent = {
      ...newAgent,
      id: agentId,
      status: "idle",
      routines: newAgent.routines.map((r) => ({
        ...r,
        agentId,
        id: r.id || `rt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: "ready",
      })),
    };
    setAgents((prev) => [...prev, fullAgent]);
    return fullAgent;
  }, []);

  // Create project from Onboarding form
  const createProjectFromOnboarding = useCallback((data: OnboardingFormValues): StartupProject => {
    const startupName = data.name.trim() || "My New Startup";
    const dateNow = new Date().toISOString().split("T")[0];

    const newProject: StartupProject = {
      id: `sp-${Date.now()}`,
      name: startupName,
      tagline: data.tagline.trim() || "Transforming vision into traction",
      targetMarket: data.targetAudience.trim() || "Early market adopters & decision makers",
      stage: data.currentStage || "ideation",
      progressPercent: 12,
      readinessScore: 48,
      currentWeeklyGoal: `Complete 5 customer discovery calls to validate: "${data.tagline || 'value proposition'}"`,
      createdAt: dateNow,
      updatedAt: dateNow,
      founder: {
        name: "Founder",
        role: "Founder & Lead Builder",
        avatarUrl: "/images/founder-avatar.png",
      },
      metrics: {
        interviewsCompleted: 0,
        waitlistCount: 0,
        mvpProgress: 10,
        tasksRemainingThisWeek: 4,
      },
      blockers: [
        {
          id: `b-${Date.now()}-1`,
          title: data.biggestChallenge || "Securing target customer discovery interviews",
          severity: "high",
          suggestedAction: "Run personalized cold outreach on LinkedIn with zero-pitch question framework.",
        },
      ],
    };

    const newMilestones: Milestone[] = [
      {
        id: `m-1`,
        month: 1,
        monthName: "Month 1: Problem & Customer Validation",
        title: `Validate Problem Space for ${startupName}`,
        description: `Conduct 15 customer discovery interviews with ${data.targetAudience || "target users"} and confirm willingness-to-pay.`,
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "in_progress",
        progressPercent: 20,
        metricTarget: "15 customer interviews completed, 100+ qualified waitlist signups",
        keyDeliverables: [
          `Buyer persona & pain point teardown for ${data.targetAudience || "core buyers"}`,
          `Landing page with waitlist funnel testing: "${data.tagline || 'core hook'}"`,
          `Customer interview synthesis ledger addressing: ${data.biggestChallenge || "core friction"}`,
        ],
      },
      {
        id: `m-2`,
        month: 2,
        monthName: "Month 2: Interactive MVP & Closed Beta",
        title: `Deploy Functional MVP to 5 Pilot Users`,
        description: `Deliver core solution addressing: ${data.biggestChallenge || "primary operational bottleneck"}.`,
        targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "planned",
        progressPercent: 0,
        metricTarget: "5 active beta pilot teams providing weekly usage data",
        keyDeliverables: [
          "Interactive core workflow prototype solving primary user task",
          "Usage telemetry & automated feedback capture",
          "Weekly founder-led user walkthrough sessions",
        ],
      },
      {
        id: `m-3`,
        month: 3,
        monthName: "Month 3: Commercial Validation & Public Launch",
        title: `Commercial Rollout & Target: ${data.primaryGoal90Days || "Paid Customers"}`,
        description: `Implement monetization through ${data.monetization || "subscription model"} and drive public launch.`,
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "planned",
        progressPercent: 0,
        metricTarget: data.primaryGoal90Days || "Convert initial paid design partners",
        keyDeliverables: [
          "Billing infrastructure & self-serve checkout flow",
          "Public launch distribution (Product Hunt, LinkedIn, Communities)",
          "Customer retention & referral tracking system",
        ],
      },
    ];

    const newTasks: Task[] = [
      {
        id: `t-${Date.now()}-1`,
        milestoneId: "m-1",
        title: `Conduct 5 discovery calls with ${data.targetAudience || "target users"}`,
        description: `Test whether "${data.tagline || 'the core problem'}" is an urgent hair-on-fire priority.`,
        status: "in_progress",
        priority: "urgent",
        category: "validation",
        dueDate: "Today",
        estimatedHours: 2.5,
        aiCoFounderTip: "Never pitch your solution first. Ask what they currently pay in time and money to deal with it.",
      },
      {
        id: `t-${Date.now()}-2`,
        milestoneId: "m-1",
        title: `Launch waitlist landing page for ${startupName}`,
        description: `Deploy clean landing page highlighting: "${data.tagline || 'the promise'}" and measure click-through rate.`,
        status: "todo",
        priority: "high",
        category: "marketing",
        dueDate: "This Week",
        estimatedHours: 2.0,
        aiCoFounderTip: "Keep form friction minimal: require only email and one qualifying question.",
      },
      {
        id: `t-${Date.now()}-3`,
        milestoneId: "m-1",
        title: `Map competitive alternatives and current workarounds`,
        description: `Analyze how prospective users currently solve ${data.biggestChallenge || 'this challenge'}.`,
        status: "todo",
        priority: "medium",
        category: "validation",
        dueDate: "This Week",
        estimatedHours: 1.5,
        aiCoFounderTip: "Your biggest competitor is almost always Excel or doing nothing.",
      },
      {
        id: `t-${Date.now()}-4`,
        milestoneId: "m-2",
        title: `Wireframe the core single-feature prototype loop`,
        description: `Deconstruct the workflow so users reach the 'aha' moment in under 60 seconds.`,
        status: "todo",
        priority: "high",
        category: "product",
        dueDate: "Next Week",
        estimatedHours: 3.0,
        aiCoFounderTip: "Kill every tertiary feature that doesn't directly solve the primary pain point.",
      },
      {
        id: `t-${Date.now()}-5`,
        milestoneId: "m-3",
        title: `Configure checkout & terms for ${data.monetization || "subscription tier"}`,
        description: `Set up initial payment collection and draft pilot agreement terms.`,
        status: "todo",
        priority: "medium",
        category: "tech",
        dueDate: "Month 3",
        estimatedHours: 2.0,
        aiCoFounderTip: "Charging even $99 in beta is the only honest validation of product value.",
      },
    ];

    setProject(newProject);
    setMilestones(newMilestones);
    setTasks(newTasks);
    setOnboardingData(data);

    return newProject;
  }, []);

  // Toggle agent active status
  const toggleAgentEnabled = useCallback((agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, enabled: !a.enabled } : a))
    );
  }, []);

  // Run autonomous standing routine and synthesize complete Artifact
  const runStandingRoutine = useCallback(
    async (routineId: string): Promise<RoutineExecutionResult> => {
      let foundAgent: Agent | undefined;
      let foundRoutine: StandingRoutine | undefined;

      for (const a of agents) {
        const r = a.routines.find((item) => item.id === routineId);
        if (r) {
          foundAgent = a;
          foundRoutine = r;
          break;
        }
      }

      if (!foundAgent || !foundRoutine) {
        throw new Error(`Routine ${routineId} not found`);
      }

      setAgents((prev) =>
        prev.map((a) =>
          a.id === foundAgent!.id
            ? {
                ...a,
                status: "running",
                routines: a.routines.map((r) =>
                  r.id === routineId ? { ...r, status: "running" } : r
                ),
              }
            : a
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 800));

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      let headline = "";
      let summary = "";
      let artifactContent = "";
      let artifactCategory: Artifact["category"] = "strategy";
      const deliverablesCreated: string[] = [];
      const tasksAdded: string[] = [];
      const logSteps: RoutineExecutionStep[] = [];

      const targetAudience = project.targetMarket || "target customers";
      const startupName = project.name || "Startup";

      if (foundRoutine.actionType === "interview_generator") {
        headline = `Mom Test Customer Discovery Guide for ${startupName}`;
        summary = `Synthesized 5 unbiased discovery questions specifically designed for ${targetAudience}. Focused on extracting real past behaviors without pitching the solution prematurely.`;
        artifactCategory = "discovery";
        const newDeliverable = `Mom Test Discovery Questionnaire for ${targetAudience}`;
        deliverablesCreated.push(newDeliverable);

        setMilestones((prev) =>
          prev.map((m) =>
            m.month === 1
              ? { ...m, keyDeliverables: [...m.keyDeliverables, newDeliverable] }
              : m
          )
        );

        const newTaskTitle = `Conduct 3 Mom Test interviews with ${targetAudience} using Scout's guide`;
        tasksAdded.push(newTaskTitle);
        addTask({
          milestoneId: "m-1",
          title: newTaskTitle,
          description: `Ask: "What do you currently spend in time or money to solve ${project.tagline}?" and observe friction points.`,
          status: "todo",
          priority: "urgent",
          category: "validation",
          dueDate: "This Week",
          estimatedHours: 2.0,
          aiCoFounderTip: "Never ask 'Do you think this is a good idea?' Instead ask 'When was the last time this problem occurred?'",
        });

        artifactContent = `# Mom Test Discovery Guide: ${startupName}

### Target Audience: ${targetAudience}
*Generated by Scout • Standing Job Execution*

1. **"Walk me through the last time your team had to manage ${project.tagline}."**
2. **"What have you tried or purchased to solve this in the past 60 days?"**
3. **"Who else in your organization got pulled into that problem?"**
4. **"What did that workaround cost you in either engineering hours or budget?"**
5. **"If we solve this with a 14-day prototype, can we set up a follow-up test with your team?"**
`;

        logSteps.push(
          { step: "Target Persona Modeling", timestamp: timeStr, detail: `Loaded ICP parameters: ${targetAudience}.` },
          { step: "Hypothesis Inversion", timestamp: timeStr, detail: `Inverted "${project.tagline}" into non-leading behavioral discovery questions.` },
          { step: "Artifact Deployment", timestamp: timeStr, detail: "Generated questionnaire & injected into Month 1 deliverables." }
        );
      } else if (foundRoutine.actionType === "outbound_sequence") {
        headline = `Cold Discovery Outbound Sequence for ${startupName}`;
        summary = `Created 3 high-converting cold outbound templates tailored to ${targetAudience}. Features a 2-sentence value hook and low-friction 15-minute discovery call ask.`;
        artifactCategory = "growth";
        const newDeliverable = `Cold Outbound Multi-Touch Sequence for ${targetAudience}`;
        deliverablesCreated.push(newDeliverable);

        setMilestones((prev) =>
          prev.map((m) =>
            m.month === 1 || m.month === 2
              ? { ...m, keyDeliverables: [...m.keyDeliverables, newDeliverable] }
              : m
          )
        );

        const newTaskTitle = `Dispatch 15 personalized cold messages using Pulse's outbound pack`;
        tasksAdded.push(newTaskTitle);
        addTask({
          milestoneId: "m-1",
          title: newTaskTitle,
          description: `Target verified ${targetAudience} on LinkedIn with zero-pitch problem inquiry.`,
          status: "todo",
          priority: "high",
          category: "marketing",
          dueDate: "Tomorrow",
          estimatedHours: 1.5,
          aiCoFounderTip: "Personalize the first 8 words with a specific observation about their company.",
        });

        artifactContent = `# 3-Touch Cold Discovery Sequence: ${startupName}
*Target Market: ${targetAudience} • Synthesized by Pulse*

### Touch 1 (Day 1 - Zero-Pitch Research Inquiry)
"Hey {FirstName} — noticed you lead {Area} at {Company}. We're assembling a benchmark on how teams handle ${project.tagline}. Not selling anything—just doing 15-minute perspective calls with 5 founders this week. Open to sharing your perspective?"

### Touch 2 (Day 4 - Nuance Follow-up)
"Hey {FirstName} — spoke with another leader yesterday who flagged that {Nuance} was their biggest roadblock. Curious if that matches your team's experience?"

### Touch 3 (Day 8 - Breakaway Close)
"Hey {FirstName} — closing our cohort this Friday. Happy to send over the synthesized findings document once complete. Wish you a great sprint!"
`;

        logSteps.push(
          { step: "Channel Optimization", timestamp: timeStr, detail: "Analyzed cold outreach open and reply benchmarks." },
          { step: "Hook Crafting", timestamp: timeStr, detail: `Drafted 3-part sequence anchored on: "${project.tagline}".` },
          { step: "Deliverable Sync", timestamp: timeStr, detail: "Injected sequence template and created outbound sprint task." }
        );
      } else if (foundRoutine.actionType === "scope_reduction") {
        headline = `MVP Minimal-Loop De-risking Audit`;
        summary = `Audited planned feature backlog. Identified non-essential capabilities that would delay launch by 4 weeks. Recommended building strictly the core loop.`;
        artifactCategory = "architecture";
        const newDeliverable = `Nexus Ruthless MVP Scope Specification (14-Day Delivery Loop)`;
        deliverablesCreated.push(newDeliverable);

        setMilestones((prev) =>
          prev.map((m) =>
            m.month === 2
              ? { ...m, keyDeliverables: [...m.keyDeliverables, newDeliverable] }
              : m
          )
        );

        const newTaskTitle = `Strip secondary settings and defer custom team roles until after 10 paid pilots`;
        tasksAdded.push(newTaskTitle);
        addTask({
          milestoneId: "m-2",
          title: newTaskTitle,
          description: `Keep the MVP interface limited strictly to the primary outcome promise.`,
          status: "todo",
          priority: "high",
          category: "product",
          dueDate: "This Sprint",
          estimatedHours: 1.0,
          aiCoFounderTip: "Every feature you don't build is a feature you don't have to debug.",
        });

        setProject((prev) => ({
          ...prev,
          readinessScore: Math.min(99, prev.readinessScore + 5),
        }));

        artifactContent = `# MVP Scope Reduction Specification: ${startupName}
*Nexus Product Architecture Audit*

### Features Stripped:
- ❌ Custom Team Permissions (Build single-user access only)
- ❌ Social Authentication Integrations (Use Magic Link only)
- ❌ Granular Dark/Light Theme Settings (Opinionated Navy design only)

### The Single Atomic Loop:
Input (${project.tagline}) ➔ Autonomous Processing ➔ Instant Executable Output.
`;

        logSteps.push(
          { step: "Backlog Complexity Analysis", timestamp: timeStr, detail: "Identified high-effort low-validation feature branches." },
          { step: "Core Loop Isolation", timestamp: timeStr, detail: "Cut scope down to essential 1-person task resolution." },
          { step: "Sprint Compression", timestamp: timeStr, detail: "Shortened launch timeline and boosted readiness score." }
        );
      } else {
        headline = `Executive Sprint Triage & Focus Briefing`;
        summary = `Audited execution metrics for ${startupName}. Found ${project.metrics.tasksRemainingThisWeek} pending tasks. Prioritized immediate milestone focus.`;
        artifactCategory = "strategy";
        const newDeliverable = `Daily Strategic Triage Briefing (${timeStr})`;
        deliverablesCreated.push(newDeliverable);

        setProject((prev) => ({
          ...prev,
          currentWeeklyGoal: `Focus 100% on active milestone deliverables for ${startupName}`,
          updatedAt: new Date().toISOString().split("T")[0],
        }));

        artifactContent = `# Daily Executive Triage Briefing: ${startupName}
*Generated by Alex Vanguard • ${timeStr}*

- **Active Goal**: ${project.currentWeeklyGoal}
- **Sprint Status**: Readiness Score ${project.readinessScore}/100
- **Action**: Execute remaining sprint tasks before introducing new feature ideas.
`;

        logSteps.push(
          { step: "Telemetry Sweep", timestamp: timeStr, detail: `Examined task statuses and current velocity.` },
          { step: "Risk Assessment", timestamp: timeStr, detail: "Cleared low-priority distractions." },
          { step: "Weekly Target Alignment", timestamp: timeStr, detail: "Updated active weekly sprint target." }
        );
      }

      // Add to Artifacts Hub
      addArtifact({
        title: headline,
        subtitle: `Generated by ${foundAgent.displayName} on standing schedule`,
        category: artifactCategory,
        authorAgentId: foundAgent.id,
        authorAgentName: foundAgent.displayName,
        authorAvatar: foundAgent.avatar,
        format: "markdown",
        content: artifactContent,
        summary,
        tags: [foundAgent.department, "Standing Routine", "Automated"],
        wordCount: artifactContent.split(/\s+/).length,
      });

      const result: RoutineExecutionResult = {
        id: `exec-${Date.now()}`,
        routineId,
        agentId: foundAgent.id,
        agentName: foundAgent.displayName,
        agentAvatar: foundAgent.avatar,
        executedAt: `Today at ${timeStr}`,
        headline,
        summary,
        deliverablesCreated,
        tasksAdded,
        logSteps,
      };

      setAgents((prev) =>
        prev.map((a) =>
          a.id === foundAgent!.id
            ? {
                ...a,
                status: "idle",
                routines: a.routines.map((r) =>
                  r.id === routineId
                    ? { ...r, status: "completed", lastRun: `Today at ${timeStr}` }
                    : r
                ),
              }
            : a
        )
      );

      setExecutionLogs((prev) => [result, ...prev]);

      return result;
    },
    [agents, project, addTask, addArtifact]
  );

  // Reset to Demo Data
  const resetToDemo = useCallback(() => {
    setProject(initialStartupProject);
    setMilestones(initialMilestones);
    setTasks(initialTasks);
    setAgents(initialAgents);
    setExecutionLogs(initialExecutionLogs);
    setArtifacts(initialArtifacts);
    setAiClone(initialAiClone);
    setOrgKnowledge(initialOrgKnowledge);
    setIntegrations(initialChannelIntegrations);
    setOnboardingData(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not remove localStorage key:", e);
    }
  }, []);

  // Export Blueprint as JSON
  const exportBlueprintJSON = useCallback(() => {
    try {
      const blueprint = {
        exportedAt: new Date().toISOString(),
        version: "2.0",
        startup: project,
        aiClone,
        orgKnowledge,
        milestones,
        tasks,
        agents,
        artifacts,
        executionLogs,
      };

      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(blueprint, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `${project.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-90day-blueprint.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Failed to export blueprint:", err);
      alert("Failed to export blueprint. Please try again.");
    }
  }, [project, aiClone, orgKnowledge, milestones, tasks, agents, artifacts, executionLogs]);

  // Export Investor Update Markdown
  const exportInvestorUpdateMarkdown = useCallback(() => {
    try {
      const completedTasks = tasks.filter((t) => t.status === "completed");
      const activeMilestone = milestones.find((m) => m.status === "in_progress") || milestones[0];

      const content = `# Monthly Founder Update: ${project.name}
**Date**: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" })}  
**Founder**: ${project.founder.name} (${project.founder.role})  
**Phase**: Month ${activeMilestone?.month || 1} • Readiness Score ${project.readinessScore}/100

---

## 🚀 1. The One-Liner
> **${project.name}**: ${project.tagline}  
> Targeting: ${project.targetMarket}

---

## 📈 2. Velocity & Key Highlights
- **Readiness Score**: ${project.readinessScore} / 100
- **Overall Roadmap Progress**: ${project.progressPercent}%
- **Interviews Completed**: ${project.metrics.interviewsCompleted}
- **Tasks Executed**: ${completedTasks.length} / ${tasks.length}
- **Current Weekly Goal**: ${project.currentWeeklyGoal}

---

## 🎯 3. Current Sprint Focus (${activeMilestone?.monthName || "Active Month"})
- **Milestone**: ${activeMilestone?.title || "Validation Sprint"}
- **Target Deliverables**:
${activeMilestone?.keyDeliverables.map((d) => `  - [${activeMilestone.status === "completed" ? "x" : " "}] ${d}`).join("\n") || "  - Active validation sprint"}

---

## 🛑 4. Current Blockers & Asks
${project.blockers.map((b) => `- **${b.severity.toUpperCase()}**: ${b.title}\n  *Action*: ${b.suggestedAction}`).join("\n\n") || "- None currently."}

---
*Synthesized autonomously by AI Co-Founder Platform*
`;

      const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(content);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `${project.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-investor-update.md`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Failed to export investor update:", err);
    }
  }, [project, milestones, tasks]);

  // Export GitHub Issues CSV
  const exportGitHubIssuesCSV = useCallback(() => {
    try {
      const headers = ["Title", "Description", "Priority", "Category", "Status", "Milestone"];
      const rows = tasks.map((t) => [
        `"${t.title.replace(/"/g, '""')}"`,
        `"${(t.description || "").replace(/"/g, '""')}"`,
        t.priority,
        t.category,
        t.status,
        t.milestoneId || "",
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `${project.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-github-issues.csv`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Failed to export GitHub CSV:", err);
    }
  }, [project, tasks]);

  return (
    <StartupContext.Provider
      value={{
        project,
        milestones,
        tasks,
        agents,
        executionLogs,
        artifacts,
        aiClone,
        orgKnowledge,
        integrations,
        onboardingData,
        isHydrated,
        createProjectFromOnboarding,
        toggleTaskStatus,
        addTask,
        deleteTask,
        addMilestoneDeliverable,
        updateProject,
        runStandingRoutine,
        toggleAgentEnabled,
        addCustomAgent,
        addArtifact,
        deleteArtifact,
        updateAiClone,
        updateOrgKnowledge,
        updateIntegrations,
        resetToDemo,
        exportBlueprintJSON,
        exportInvestorUpdateMarkdown,
        exportGitHubIssuesCSV,
      }}
    >
      {children}
    </StartupContext.Provider>
  );
};

export function useStartup(): StartupContextType {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error("useStartup must be used within a StartupProvider");
  }
  return context;
}
