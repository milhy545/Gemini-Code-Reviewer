// Global TypeScript types for Gemini Code Reviewer

export type Theme = 'light' | 'dark';

export type AIModel =
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro'
  | 'gemini-1.5-flash'
  | 'gemini-1.5-pro';

export type ReviewFocus =
  | 'complete'      // Complete review (all aspects)
  | 'security'      // Security vulnerabilities focus
  | 'performance'   // Performance optimization focus
  | 'bestPractices' // Code quality & best practices focus
  | 'bugs';         // Bug detection focus

export type UILanguage = 'cs' | 'en';

export type ExportFormat = 'pdf' | 'json' | 'markdown';

export interface Settings {
  theme: Theme;
  aiModel: AIModel;
  reviewFocus: ReviewFocus;
  uiLanguage: UILanguage;
  autoSaveHistory: boolean;
  showLineNumbers: boolean;
  enableSyntaxHighlight: boolean;
  soundEnabled: boolean;
}

export interface ReviewHistoryItem {
  id: string;
  timestamp: number;
  language: string;
  codeSnippet: string; // First 100 chars
  fullCode: string;
  reviewResult?: string;
  correctionResult?: string;
  model: AIModel;
  reviewFocus: ReviewFocus;
}

export interface AnalyticsData {
  totalReviews: number;
  totalCorrections: number;
  languageUsage: Record<string, number>;
  modelUsage: Record<AIModel, number>;
  averageProcessingTime: number;
  lastUsed: number;
}

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
}

export interface ModelInfo {
  id: AIModel;
  name: string;
  description: string;
  speed: 'fast' | 'medium' | 'slow';
  quality: 'good' | 'better' | 'best';
  costLevel: 'low' | 'medium' | 'high';
}

export interface ReviewPreset {
  id: ReviewFocus;
  name: string;
  description: string;
  icon: string;
}
