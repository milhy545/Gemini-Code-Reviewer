import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Settings } from '@gemini-reviewer/shared';
import { storage } from '@gemini-reviewer/shared';
import type { Settings as SettingsType } from '@gemini-reviewer/core';

const DEFAULT_SETTINGS: SettingsType = {
  theme: 'dark',
  aiModel: 'gemini-2.5-flash',
  reviewFocus: 'complete',
  uiLanguage: 'cs',
  autoSaveHistory: true,
  showLineNumbers: true,
  enableSyntaxHighlight: true,
  soundEnabled: false
};

function OptionsApp() {
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from storage
    browser.storage.sync.get(['settings', 'apiKey']).then((result) => {
      if (result.settings) {
        setSettings(result.settings);
      }
      if (result.apiKey) {
        setApiKey(result.apiKey);
      }
    });
  }, []);

  const handleSave = () => {
    // Save to browser storage
    browser.storage.sync.set({
      settings,
      apiKey
    }).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleReset = () => {
    if (confirm('Opravdu chcete obnovit výchozí nastavení?')) {
      setSettings(DEFAULT_SETTINGS);
      setApiKey('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            🤖 Gemini Code Reviewer
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Extension Settings
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Nastavení pro browser extension
          </p>
        </div>

        {/* API Key Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🔑 API Klíč
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Zadejte váš Gemini API klíč"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Získat klíč: <a href="https://ai.google.dev/" target="_blank" rel="noopener" className="text-indigo-600 dark:text-indigo-400 hover:underline">https://ai.google.dev/</a>
              </p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <Settings
            isOpen={true}
            settings={settings}
            onClose={() => {}}
            onUpdate={(updates) => setSettings({ ...settings, ...updates })}
            onReset={handleReset}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
          >
            🔄 Obnovit výchozí
          </button>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-600 dark:text-green-400 font-medium">
                ✅ Uloženo!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
            >
              💾 Uložit nastavení
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Gemini Code Reviewer Extension v2.0.0</p>
          <p className="mt-1">
            Nastavení jsou synchronizována across všech zařízeních
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>
);

export default OptionsApp;
