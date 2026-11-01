export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskCategory = 'product' | 'validation' | 'marketing' | 'tech' | 'fundraising';

export interface Task {
  id: string;
  milestoneId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
  estimatedHours?: number;
  aiCoFounderTip?: string;
  assignedTo?: string;
}
