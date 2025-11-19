// Custom hook for app settings management
import { useState, useEffect } from 'react';
import { Settings } from '@gemini-reviewer/core';
import { storage } from '../utils/storage';

const DEFAULT_SETTINGS: Settings = {
  aiModel: 'gemini-2.5-flash',
  reviewFocus: 'complete',
  language: 'cs',
  autoSaveHistory: true,
  darkMode: true,
  ttsEnabled: true,
  maxHistoryItems: 50,
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
