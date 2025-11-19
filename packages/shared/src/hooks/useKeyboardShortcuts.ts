// Custom hook for keyboard shortcuts
import { useEffect } from 'react';

export interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  callback: (event: KeyboardEvent) => void;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutHandler[], enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const matchesKey = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const matchesCtrl = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const matchesShift = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const matchesAlt = shortcut.alt ? event.altKey : !event.altKey;

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          event.preventDefault();
          shortcut.callback(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled]);

  // Return formatted shortcut strings for display
  const getShortcutDisplay = (shortcut: ShortcutHandler): string => {
    const parts: string[] = [];
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.shift) parts.push('Shift');
    if (shortcut.alt) parts.push('Alt');
    parts.push(shortcut.key.toUpperCase());
    return parts.join('+');
  };

  return { getShortcutDisplay };
};

// Common keyboard shortcuts for the app
export const APP_SHORTCUTS = {
  REVIEW_CODE: { key: 'Enter', ctrl: true, description: 'Zkontrolovat kód' },
  CORRECT_CODE: { key: 'Enter', ctrl: true, shift: true, description: 'Opravit kód' },
  TOGGLE_SETTINGS: { key: ',', ctrl: true, description: 'Otevřít nastavení' },
  TOGGLE_HISTORY: { key: 'h', ctrl: true, description: 'Otevřít historii' },
  CLEAR_CODE: { key: 'k', ctrl: true, description: 'Vymazat kód' },
  TOGGLE_THEME: { key: 'd', ctrl: true, description: 'Přepnout téma' },
  HELP: { key: '?', shift: true, description: 'Zobrazit nápovědu' },
  EXPORT: { key: 's', ctrl: true, shift: true, description: 'Exportovat výsledky' },
} as const;
