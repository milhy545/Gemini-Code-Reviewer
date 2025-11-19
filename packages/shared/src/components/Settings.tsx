// Settings modal component
import React from 'react';
import { Settings as SettingsType } from '@gemini-reviewer/core';
import { AI_MODELS, REVIEW_PRESETS, UI_LANGUAGES } from '@gemini-reviewer/core';

interface SettingsProps {
  isOpen: boolean;
  settings: SettingsType;
  onClose: () => void;
  onUpdate: (updates: Partial<SettingsType>) => void;
  onReset: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdate,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nastavení
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Zavřít"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Settings Content */}
          <div className="space-y-6">
            {/* AI Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Model
              </label>
              <select
                value={settings.aiModel}
                onChange={(e) => onUpdate({ aiModel: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {AI_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} - {model.description}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Vyberte AI model pro analýzu kódu
              </p>
            </div>

            {/* Review Focus Preset */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Zaměření kontroly
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {REVIEW_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onUpdate({ reviewFocus: preset.id })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      settings.reviewFocus === preset.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{preset.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {preset.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {preset.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* UI Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jazyk rozhraní
              </label>
              <select
                value={settings.language}
                onChange={(e) => onUpdate({ language: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {UI_LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Automaticky ukládat do historie
                </span>
                <button
                  onClick={() => onUpdate({ autoSaveHistory: !settings.autoSaveHistory })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoSaveHistory ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoSaveHistory ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              

              

              
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Obnovit výchozí
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Zavřít
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
