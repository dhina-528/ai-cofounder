export type ArtifactCategory = 'strategy' | 'discovery' | 'growth' | 'architecture' | 'legal_ops';

export type ArtifactFormat = 'markdown' | 'checklist' | 'json' | 'svg';

export interface Artifact {
  id: string;
  title: string;
  subtitle?: string;
  category: ArtifactCategory;
  authorAgentId: string;
  authorAgentName: string;
  authorAvatar: string;
  format: ArtifactFormat;
  content: string;
  summary: string;
  tags: string[];
  createdAt: string;
  wordCount?: number;
  isPinned?: boolean;
}
