// Statistics and Analytics panel component
import React from 'react';
import { AnalyticsData } from '../types';

interface StatsPanelProps {
  isOpen: boolean;
  analytics: AnalyticsData;
  onClose: () => void;
  onReset: () => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  isOpen,
  analytics,
  onClose,
  onReset,
}) => {
  if (!isOpen) return null;

  const totalOps = analytics.totalReviews + analytics.totalCorrections;

  const topLanguages = Object.entries(analytics.languageUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topModels = Object.entries(analytics.modelUsage)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Statistiky
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                Celkem kontrol
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {analytics.totalReviews}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                Celkem oprav
              </div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                {analytics.totalCorrections}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                Celkem operací
              </div>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {totalOps}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
              <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">
                Průměrný čas
              </div>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                {analytics.averageProcessingTime.toFixed(1)}s
              </div>
            </div>
          </div>

          {/* Top Languages */}
          {topLanguages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Nejpoužívanější jazyky
              </h3>
              <div className="space-y-2">
                {topLanguages.map(([language, count]) => {
                  const percentage = totalOps > 0 ? (count / totalOps) * 100 : 0;
                  return (
                    <div key={language}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                          {language}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {count}x ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Model Usage */}
          {topModels.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Použité modely
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {topModels.map(([model, count]) => (
                  <div key={model} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {model}
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {count}x
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Used */}
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
            Poslední použití: {new Date(analytics.lastUsed).toLocaleString('cs-CZ')}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Resetovat statistiky
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
