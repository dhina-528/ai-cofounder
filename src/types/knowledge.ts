export interface AICloneProfile {
  founderName: string;
  founderRole: string;
  decisionPrinciples: string[];
  vetoRules: string[];
  communicationTone: 'direct' | 'analytical' | 'inspirational' | 'concise';
  pastMistakes: string[];
}

export interface CompetitorItem {
  name: string;
  weakness: string;
  ourAdvantage: string;
}

export interface PricingItem {
  name: string;
  price: string;
  features: string;
}

export interface OrgKnowledgeBase {
  companyIdentity: string;
  brandVoice: string;
  valueProposition: string;
  targetICP: string;
  competitors: CompetitorItem[];
  pricingTiers: PricingItem[];
  elevatorPitch: string;
}

export interface ChannelIntegrations {
  telegramBotToken: string;
  telegramChatId: string;
  telegramEnabled: boolean;
  discordWebhookUrl: string;
  discordEnabled: boolean;
  preferredLlmProvider: 'gemini' | 'anthropic' | 'openai' | 'local_heuristic';
}
