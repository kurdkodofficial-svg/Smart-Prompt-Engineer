export type SupportedLang = 'en' | 'ku_ckb' | 'ku_bad' | 'ku_kmr' | 'ku_hwr' | 'ar';

export type KurdishDialect = 'ckb' | 'bad' | 'kmr' | 'hwr';

export type ToolCategory = 'code' | 'text' | 'image' | 'video' | 'data';

export interface AIToolOption {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  badge: string;
  defaultFormat: string;
}

export interface PromptSections {
  role: string;
  context: string;
  task: string;
  format: string;
  constraints: string;
  example?: string;
  successCriteria: string;
}

export interface ClarifyingQuestion {
  field: 'targetTool' | 'endGoal' | 'constraints' | string;
  question: string;
  sensibleDefault: string;
}

export interface GeneratedPromptResult {
  status: 'ready' | 'needs_clarification';
  clarifyingQuestions?: ClarifyingQuestion[];
  finalPrompt?: string;
  sections?: PromptSections;
  targetToolIdentified?: string;
  keyChoiceNote?: string;
  changesAppliedSummary?: string;
}

export interface SavedPromptItem {
  id: string;
  title: string;
  createdAt: string;
  targetTool: string;
  category: ToolCategory;
  promptText: string;
  sections?: PromptSections;
  isFavorite?: boolean;
}

export interface QuickTemplate {
  id: string;
  title: string;
  category: ToolCategory;
  iconName: string;
  tool: string;
  roughRequest: string;
  endGoal: string;
  constraints: string;
}

export type PaymentMethod = 'fastpay' | 'fib';

export interface SubscriberState {
  isSubscribed: boolean;
  status: 'inactive' | 'pending_approval' | 'active';
  planName: string;
  priceIQD: number;
  subscriberName: string;
  subscriberPhone: string;
  paymentMethod: PaymentMethod;
  receiptImage: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  expiresAt: string | null;
  note: string;
}
