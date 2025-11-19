// LocalStorage utility functions with type safety

const STORAGE_KEYS = {
  SETTINGS: 'gemini-code-reviewer-settings',
  HISTORY: 'gemini-code-reviewer-history',
  ANALYTICS: 'gemini-code-reviewer-analytics',
} as const;

export const storage = {
  // Generic get/set with JSON parsing
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      // Handle quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded. Clearing old data...');
        this.clearHistory();
      }
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Specific methods for app data
  getSettings<T>(defaultSettings: T): T {
    return this.get(STORAGE_KEYS.SETTINGS, defaultSettings);
  },

  setSettings<T>(settings: T): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  },

  getHistory<T>(defaultHistory: T): T {
    return this.get(STORAGE_KEYS.HISTORY, defaultHistory);
  },

  setHistory<T>(history: T): void {
    this.set(STORAGE_KEYS.HISTORY, history);
  },

  clearHistory(): void {
    this.remove(STORAGE_KEYS.HISTORY);
  },

  getAnalytics<T>(defaultAnalytics: T): T {
    return this.get(STORAGE_KEYS.ANALYTICS, defaultAnalytics);
  },

  setAnalytics<T>(analytics: T): void {
    this.set(STORAGE_KEYS.ANALYTICS, analytics);
  },

  // Get storage size estimate
  getStorageSize(): number {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  },

  // Format bytes to human readable
  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  },
};
