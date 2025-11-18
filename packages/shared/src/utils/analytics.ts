// Analytics tracking utility
import { AnalyticsData, AIModel } from '../types';
import { storage } from './storage';

const DEFAULT_ANALYTICS: AnalyticsData = {
  totalReviews: 0,
  totalCorrections: 0,
  languageUsage: {},
  modelUsage: {} as Record<AIModel, number>,
  averageProcessingTime: 0,
  lastUsed: Date.now(),
};

export const analytics = {
  // Get current analytics data
  getData(): AnalyticsData {
    return storage.getAnalytics(DEFAULT_ANALYTICS);
  },

  // Track a code review
  trackReview(language: string, model: AIModel, processingTime: number): void {
    const data = this.getData();

    data.totalReviews += 1;
    data.languageUsage[language] = (data.languageUsage[language] || 0) + 1;
    data.modelUsage[model] = (data.modelUsage[model] || 0) + 1;

    // Update average processing time
    const totalOperations = data.totalReviews + data.totalCorrections;
    data.averageProcessingTime =
      (data.averageProcessingTime * (totalOperations - 1) + processingTime) / totalOperations;

    data.lastUsed = Date.now();

    storage.setAnalytics(data);
  },

  // Track a code correction
  trackCorrection(language: string, model: AIModel, processingTime: number): void {
    const data = this.getData();

    data.totalCorrections += 1;
    data.languageUsage[language] = (data.languageUsage[language] || 0) + 1;
    data.modelUsage[model] = (data.modelUsage[model] || 0) + 1;

    // Update average processing time
    const totalOperations = data.totalReviews + data.totalCorrections;
    data.averageProcessingTime =
      (data.averageProcessingTime * (totalOperations - 1) + processingTime) / totalOperations;

    data.lastUsed = Date.now();

    storage.setAnalytics(data);
  },

  // Get most used language
  getMostUsedLanguage(): string | null {
    const data = this.getData();
    if (Object.keys(data.languageUsage).length === 0) return null;

    return Object.entries(data.languageUsage)
      .sort(([, a], [, b]) => b - a)[0][0];
  },

  // Get most used model
  getMostUsedModel(): AIModel | null {
    const data = this.getData();
    if (Object.keys(data.modelUsage).length === 0) return null;

    return Object.entries(data.modelUsage)
      .sort(([, a], [, b]) => b - a)[0][0] as AIModel;
  },

  // Reset analytics
  reset(): void {
    storage.setAnalytics(DEFAULT_ANALYTICS);
  },

  // Export analytics as JSON
  export(): string {
    return JSON.stringify(this.getData(), null, 2);
  },

  // Get total operations
  getTotalOperations(): number {
    const data = this.getData();
    return data.totalReviews + data.totalCorrections;
  },
};
