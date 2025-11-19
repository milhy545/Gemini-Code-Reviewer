import React, { useState, useEffect } from 'react';
import CodeInput from './components/CodeInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import CorrectedCodeDisplay from './components/CorrectedCodeDisplay';
import LanguageSelector from './components/LanguageSelector';
import { Header } from './components/Header';
import { Settings } from './components/Settings';
import { HistoryPanel } from './components/HistoryPanel';
import { StatsPanel } from './components/StatsPanel';
import { HelpModal } from './components/HelpModal';
import { ExportMenu } from './components/ExportMenu';
import { ProgressBar } from './components/ProgressBar';
import { reviewCode, correctCode } from './services/geminiService';
import { LANGUAGES, DEFAULT_CODE_SNIPPET, REVIEW_PRESETS } from './constants';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { WandIcon } from './components/icons/WandIcon';
import { LoaderIcon } from './components/icons/LoaderIcon';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { useHistory } from './hooks/useHistory';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { analytics } from './utils/analytics';
import { ReviewHistoryItem } from './types';

function App() {
  // Core state
  const [code, setCode] = useState<string>(DEFAULT_CODE_SNIPPET);
  const [language, setLanguage] = useState<string>('javascript');
  const [feedback, setFeedback] = useState<string>('');
  const [correctedCode, setCorrectedCode] = useState<string>('');
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(false);
  const [isLoadingCorrection, setIsLoadingCorrection] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'review' | 'correct'>('review');
  const [progress, setProgress] = useState<number>(0);

  // Modal/Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Custom hooks
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings, resetSettings } = useSettings();
  const {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  } = useHistory();

  // Sync theme between settings and useTheme
  useEffect(() => {
    if (settings.theme !== theme) {
      updateSettings({ theme });
    }
  }, [theme]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
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
    {
      key: ',',
      ctrl: true,
      description: 'Otevřít nastavení',
      callback: () => setIsSettingsOpen(true),
    },
    {
      key: 'h',
      ctrl: true,
      description: 'Otevřít historii',
      callback: () => setIsHistoryOpen(true),
    },
    {
      key: 'k',
      ctrl: true,
      description: 'Vymazat kód',
      callback: () => setCode(''),
    },
    {
      key: 'd',
      ctrl: true,
      description: 'Přepnout téma',
      callback: (e) => {
        e.preventDefault();
        toggleTheme();
      },
    },
    {
      key: '?',
      shift: true,
      description: 'Zobrazit nápovědu',
      callback: () => setIsHelpOpen(true),
    },
    {
      key: 's',
      ctrl: true,
      shift: true,
      description: 'Exportovat výsledky',
      callback: (e) => {
        e.preventDefault();
        setIsExportOpen(true);
      },
    },
  ]);

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
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const result = await reviewCode(
        code,
        language,
        settings.aiModel,
        settings.reviewFocus
      );

      clearInterval(progressInterval);
      setProgress(100);

      setFeedback(result);

      // Track analytics
      const processingTime = (Date.now() - startTime) / 1000;
      analytics.trackReview(language, settings.aiModel, processingTime);

      // Save to history if enabled
      if (settings.autoSaveHistory) {
        addToHistory(
          code,
          language,
          settings.aiModel,
          settings.reviewFocus,
          result,
          undefined
        );
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
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const result = await correctCode(
        code,
        language,
        settings.aiModel,
        settings.reviewFocus
      );

      clearInterval(progressInterval);
      setProgress(100);

      setCorrectedCode(result);

      // Track analytics
      const processingTime = (Date.now() - startTime) / 1000;
      analytics.trackCorrection(language, settings.aiModel, processingTime);

      // Save to history if enabled
      if (settings.autoSaveHistory) {
        addToHistory(
          code,
          language,
          settings.aiModel,
          settings.reviewFocus,
          undefined,
          result
        );
      }
    } catch (err) {
      setError('Nepodařilo se opravit kód. Zkuste to prosím znovu.');
      console.error(err);
    } finally {
      setIsLoadingCorrection(false);
      setProgress(0);
    }
  };

  const handleFileRead = (content: string) => {
    setCode(content);
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

  const currentPreset = REVIEW_PRESETS.find(p => p.id === settings.reviewFocus);

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
          {/* Language Selector & Settings Info */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <LanguageSelector
              language={language}
              onLanguageChange={setLanguage}
              languages={LANGUAGES}
            />
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
                onFileRead={handleFileRead}
                language={language}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleReviewCode}
                  disabled={isLoadingReview || isLoadingCorrection}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isLoadingReview ? (
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                  ) : (
                    <SparklesIcon className="w-5 h-5 mr-2" />
                  )}
                  Zkontrolovat kód
                </button>
                <button
                  onClick={handleCorrectCode}
                  disabled={isLoadingReview || isLoadingCorrection}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isLoadingCorrection ? (
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                  ) : (
                    <WandIcon className="w-5 h-5 mr-2" />
                  )}
                  Opravit kód
                </button>
              </div>
              {(feedback || correctedCode) && (
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exportovat výsledky
                </button>
              )}
            </div>

            {/* Right Column - Output */}
            <div className="relative">
              {error && (
                <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 flex items-center justify-center z-10 rounded-lg">
                  <div className="text-center p-6 bg-red-50 dark:bg-red-900/50 border-2 border-red-500 dark:border-red-700 rounded-lg max-w-md">
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
              {(isLoadingReview || isLoadingCorrection) ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <LoaderIcon className="w-16 h-16 mb-4 animate-spin text-indigo-600 dark:text-indigo-400" />
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

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

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
