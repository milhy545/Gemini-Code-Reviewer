import React, { useState, useEffect } from 'react';
import {
  Header,
  Settings,
  HistoryPanel,
  StatsPanel,
  HelpModal,
  ExportMenu,
  ProgressBar,
  CodeInput,
  FeedbackDisplay,
  CorrectedCodeDisplay,
  LanguageSelector,
  useTheme,
  useSettings,
  useHistory,
  useKeyboardShortcuts,
  analytics,
} from '@gemini-reviewer/shared';
import { reviewCode, correctCode, LANGUAGES, REVIEW_PRESETS } from '@gemini-reviewer/core';
import type { ReviewHistoryItem } from '@gemini-reviewer/core';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

function App() {
  // Core state
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [feedback, setFeedback] = useState('');
  const [correctedCode, setCorrectedCode] = useState('');
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [isLoadingCorrection, setIsLoadingCorrection] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'review' | 'correct'>('review');
  const [progress, setProgress] = useState(0);

  // Modal/Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Custom hooks
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings, resetSettings } = useSettings();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  // Listen for Tauri events
  useEffect(() => {
    // Listen for quick review event from system tray
    const unlisten = listen('quick-review', () => {
      if (code) {
        handleReviewCode();
      }
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [code]);

  // Tauri-specific: Open file dialog
  const handleOpenFile = async () => {
    try {
      const filePath = await invoke<string>('open_file_dialog');
      const content = await invoke<string>('read_file', { path: filePath });
      setCode(content);
    } catch (error) {
      console.error('Failed to open file:', error);
    }
  };

  const handleReviewCode = async () => {
    if (!code.trim()) {
      setError('Vložte prosím nějaký kód ke kontrole.');
      return;
    }

    setIsLoadingReview(true);
    setError(null);
    setFeedback('');
    setCorrectedCode('');
    setActiveTab('review');
    setProgress(0);

    const startTime = Date.now();

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      const result = await reviewCode(code, language, settings.aiModel, settings.reviewFocus);

      clearInterval(progressInterval);
      setProgress(100);

      setFeedback(result);

      const processingTime = (Date.now() - startTime) / 1000;
      analytics.trackReview(language, settings.aiModel, processingTime);

      if (settings.autoSaveHistory) {
        addToHistory(code, language, settings.aiModel, settings.reviewFocus, result, undefined);
      }
    } catch (err) {
      setError('Nepodařilo se získat revizi kódu. Zkuste to prosím znovu.');
      console.error(err);
    } finally {
      setIsLoadingReview(false);
      setProgress(0);
    }
  };

  const handleCorrectCode = async () => {
    if (!code.trim()) {
      setError('Vložte prosím nějaký kód k opravě.');
      return;
    }

    setIsLoadingCorrection(true);
    setError(null);
    setFeedback('');
    setCorrectedCode('');
    setActiveTab('correct');
    setProgress(0);

    const startTime = Date.now();

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      const result = await correctCode(code, language, settings.aiModel, settings.reviewFocus);

      clearInterval(progressInterval);
      setProgress(100);

      setCorrectedCode(result);

      const processingTime = (Date.now() - startTime) / 1000;
      analytics.trackCorrection(language, settings.aiModel, processingTime);

      if (settings.autoSaveHistory) {
        addToHistory(code, language, settings.aiModel, settings.reviewFocus, undefined, result);
      }
    } catch (err) {
      setError('Nepodařilo se opravit kód. Zkuste to prosím znovu.');
      console.error(err);
    } finally {
      setIsLoadingCorrection(false);
      setProgress(0);
    }
  };

  const handleHistoryItemSelect = (item: ReviewHistoryItem) => {
    setCode(item.fullCode);
    setLanguage(item.language);
    if (item.reviewResult) {
      setFeedback(item.reviewResult);
      setActiveTab('review');
    }
    if (item.correctionResult) {
      setCorrectedCode(item.correctionResult);
      setActiveTab('correct');
    }
    setIsHistoryOpen(false);
  };

  const renderOutput = () => {
    if (activeTab === 'review') {
      return <FeedbackDisplay feedback={feedback} />;
    }
    if (activeTab === 'correct') {
      return <CorrectedCodeDisplay code={correctedCode} language={language} />;
    }
    return <FeedbackDisplay feedback={feedback} />;
  };

  const currentPreset = REVIEW_PRESETS.find((p) => p.id === settings.reviewFocus);

  // Desktop-specific keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'o',
      ctrl: true,
      description: 'Otevřít soubor',
      callback: () => handleOpenFile(),
    },
    {
      key: 'Enter',
      ctrl: true,
      description: 'Zkontrolovat kód',
      callback: () => !isLoadingReview && !isLoadingCorrection && handleReviewCode(),
    },
    {
      key: 'Enter',
      ctrl: true,
      shift: true,
      description: 'Opravit kód',
      callback: () => !isLoadingReview && !isLoadingCorrection && handleCorrectCode(),
    },
  ]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans transition-colors">
      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Progress Bar */}
      <ProgressBar
        isVisible={isLoadingReview || isLoadingCorrection}
        progress={progress}
        message={isLoadingReview ? 'Analyzuji kód...' : 'Opravuji kód...'}
      />

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop-specific: File Open Button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LanguageSelector
                language={language}
                onLanguageChange={setLanguage}
                languages={LANGUAGES}
              />
              <button
                onClick={handleOpenFile}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                📂 Otevřít soubor
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded">
                {settings.aiModel}
              </span>
              {currentPreset && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded flex items-center gap-1">
                  <span>{currentPreset.icon}</span>
                  <span>{currentPreset.name}</span>
                </span>
              )}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
            {/* Left Column - Input */}
            <div className="flex flex-col gap-4">
              <CodeInput
                code={code}
                onCodeChange={setCode}
                onFileRead={setCode}
                language={language}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleReviewCode}
                  disabled={isLoadingReview || isLoadingCorrection}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isLoadingReview ? '⏳ Analyzuji...' : '✨ Zkontrolovat kód'}
                </button>
                <button
                  onClick={handleCorrectCode}
                  disabled={isLoadingReview || isLoadingCorrection}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isLoadingCorrection ? '⏳ Opravuji...' : '🔧 Opravit kód'}
                </button>
              </div>
              {(feedback || correctedCode) && (
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  💾 Exportovat výsledky
                </button>
              )}
            </div>

            {/* Right Column - Output */}
            <div className="relative">
              {error && (
                <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 flex items-center justify-center z-10 rounded-lg">
                  <div className="text-center p-6 bg-red-50 dark:bg-red-900/50 border-2 border-red-500 dark:border-red-700 rounded-lg max-w-md">
                    <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Zavřít
                    </button>
                  </div>
                </div>
              )}
              {isLoadingReview || isLoadingCorrection ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="w-16 h-16 mb-4 text-indigo-600 dark:text-indigo-400">⏳</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isLoadingReview ? 'Analyzuji kód...' : 'Opravuji kód...'}
                  </h3>
                  <p className="text-sm">Prosím, chvilku strpení.</p>
                </div>
              ) : (
                renderOutput()
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals and Panels */}
      <Settings
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onUpdate={updateSettings}
        onReset={resetSettings}
      />

      <HistoryPanel
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onSelectItem={handleHistoryItemSelect}
        onDeleteItem={removeFromHistory}
        onClearAll={clearHistory}
      />

      <StatsPanel
        isOpen={isStatsOpen}
        analytics={analytics.getData()}
        onClose={() => setIsStatsOpen(false)}
        onReset={analytics.reset}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <ExportMenu
        isOpen={isExportOpen}
        code={code}
        language={language}
        review={feedback}
        correction={correctedCode}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}

export default App;
