export type AgentDepartment = 'strategy' | 'validation' | 'growth' | 'product';

export type AgentStatus = 'idle' | 'running' | 'scheduled';

export interface StandingRoutine {
  id: string;
  agentId: string;
  name: string;
  description: string;
  schedule: string;
  lastRun?: string;
  nextRun?: string;
  status: 'ready' | 'running' | 'completed';
  actionType:
    | 'triage_briefing'
    | 'interview_generator'
    | 'competitive_sweep'
    | 'outbound_sequence'
    | 'scope_reduction'
    | 'launch_playbook';
}

export interface Agent {
  id: string;
  displayName: string;
  role: string;
  department: AgentDepartment;
  avatar: string;
  color: string;
  model: string;
  enabled: boolean;
  schedule: string;
  status: AgentStatus;
  skills: string[];
  systemPrompt: string;
  routines: StandingRoutine[];
}

export interface RoutineExecutionStep {
  step: string;
  timestamp: string;
  detail: string;
}

export interface RoutineExecutionResult {
  id: string;
  routineId: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  executedAt: string;
  headline: string;
  summary: string;
  deliverablesCreated: string[];
  tasksAdded: string[];
  logSteps: RoutineExecutionStep[];
}
