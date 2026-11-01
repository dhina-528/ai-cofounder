export type StartupStage = 'ideation' | 'validation' | 'mvp' | 'launch' | 'growth';

export interface StartupProject {
  id: string;
  name: string;
  tagline: string;
  targetMarket: string;
  stage: StartupStage;
  progressPercent: number;
  readinessScore: number;
  currentWeeklyGoal: string;
  createdAt: string;
  updatedAt: string;
  founder: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  metrics: {
    interviewsCompleted: number;
    waitlistCount: number;
    mvpProgress: number;
    tasksRemainingThisWeek: number;
  };
  blockers: {
    id: string;
    title: string;
    severity: 'low' | 'medium' | 'high';
    suggestedAction: string;
  }[];
}

export interface OnboardingFormValues {
  name: string;
  tagline: string;
  description: string;
  targetAudience: string;
  monetization: string;
  currentStage: StartupStage;
  primaryGoal90Days: string;
  biggestChallenge: string;
}
