// Custom hook for theme management with persistence
import { useState, useEffect } from 'react';
import { Theme } from '../types';
import { storage } from '../utils/storage';

const THEME_STORAGE_KEY = 'gemini-code-reviewer-theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize from localStorage or system preference
    const stored = storage.get<Theme>(THEME_STORAGE_KEY, 'dark');
    return stored;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Save to localStorage
    storage.set(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, toggleTheme, setTheme };
};
