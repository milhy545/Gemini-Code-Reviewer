export type AIModel = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-1.5-flash' | 'gemini-1.5-pro';
export type ReviewFocus = 'complete' | 'security' | 'performance' | 'bestPractices' | 'bugs';
export type Theme = 'light' | 'dark';
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
export interface Settings {
    aiModel: AIModel;
    reviewFocus: ReviewFocus;
    autoSaveHistory: boolean;
    darkMode: boolean;
    ttsEnabled: boolean;
    maxHistoryItems: number;
    language: 'cs' | 'en';
}
export interface ReviewHistoryItem {
    id: string;
    timestamp: number;
    fullCode: string;
    language: string;
    aiModel: AIModel;
    reviewFocus: ReviewFocus;
    reviewResult?: string;
    correctionResult?: string;
}
export interface AnalyticsData {
    totalReviews: number;
    totalCorrections: number;
    languageUsage: Record<string, number>;
    modelUsage: Record<AIModel, number>;
    avgProcessingTime: number;
    totalProcessingTime: number;
    sessionsCount: number;
    lastSession: number;
}
export interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    description: string;
    callback: () => void;
}
export interface ExportFormat {
    format: 'markdown' | 'pdf' | 'html' | 'json';
    fileName: string;
}
//# sourceMappingURL=index.d.ts.map