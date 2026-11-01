export type MilestoneStatus = 'planned' | 'in_progress' | 'completed' | 'delayed';

export interface Milestone {
  id: string;
  month: number;
  monthName: string;
  title: string;
  description: string;
  targetDate: string;
  status: MilestoneStatus;
  progressPercent: number;
  keyDeliverables: string[];
  associatedTaskIds?: string[];
  metricTarget?: string;
}
