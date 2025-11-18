// Custom hook for app settings management
import { useState, useEffect } from 'react';
import { Settings } from '../types';
import { storage } from '../utils/storage';

const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  aiModel: 'gemini-2.5-flash',
  reviewFocus: 'complete',
  uiLanguage: 'cs',
  autoSaveHistory: true,
  showLineNumbers: true,
  enableSyntaxHighlight: true,
  soundEnabled: true,
};

export const useSettings = () => {
  const [settings, setSettingsState] = useState<Settings>(() => {
    return storage.getSettings(DEFAULT_SETTINGS);
  });

  // Persist settings to localStorage whenever they change
  useEffect(() => {
    storage.setSettings(settings);
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettingsState(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettingsState(DEFAULT_SETTINGS);
  };

  const getSetting = <K extends keyof Settings>(key: K): Settings[K] => {
    return settings[key];
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    getSetting,
  };
};
