// Custom hook for managing code review history
import { useState, useEffect } from 'react';
import { ReviewHistoryItem, AIModel, ReviewFocus } from '../types';
import { storage } from '../utils/storage';

const MAX_HISTORY_ITEMS = 50; // Limit to prevent localStorage overflow

export const useHistory = () => {
  const [history, setHistoryState] = useState<ReviewHistoryItem[]>(() => {
    return storage.getHistory<ReviewHistoryItem[]>([]);
  });

  // Persist history to localStorage whenever it changes
  useEffect(() => {
    storage.setHistory(history);
  }, [history]);

  const addToHistory = (
    code: string,
    language: string,
    model: AIModel,
    reviewFocus: ReviewFocus,
    reviewResult?: string,
    correctionResult?: string
  ) => {
    const newItem: ReviewHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      language,
      codeSnippet: code.substring(0, 100) + (code.length > 100 ? '...' : ''),
      fullCode: code,
      reviewResult,
      correctionResult,
      model,
      reviewFocus,
    };

    setHistoryState(prev => {
      const updated = [newItem, ...prev];
      // Keep only the most recent MAX_HISTORY_ITEMS
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const removeFromHistory = (id: string) => {
    setHistoryState(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistoryState([]);
    storage.clearHistory();
  };

  const getHistoryItem = (id: string): ReviewHistoryItem | undefined => {
    return history.find(item => item.id === id);
  };

  const searchHistory = (query: string): ReviewHistoryItem[] => {
    const lowerQuery = query.toLowerCase();
    return history.filter(item =>
      item.language.toLowerCase().includes(lowerQuery) ||
      item.fullCode.toLowerCase().includes(lowerQuery) ||
      item.codeSnippet.toLowerCase().includes(lowerQuery)
    );
  };

  const getHistoryByLanguage = (language: string): ReviewHistoryItem[] => {
    return history.filter(item => item.language === language);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
    searchHistory,
    getHistoryByLanguage,
  };
};
