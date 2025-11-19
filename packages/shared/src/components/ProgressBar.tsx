// Progress bar component for showing loading state
import React from 'react';

interface ProgressBarProps {
  isVisible: boolean;
  progress?: number; // 0-100, optional for indeterminate progress
  message?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  isVisible,
  progress,
  message,
}) => {
  if (!isVisible) return null;

  const isDeterminate = progress !== undefined && progress >= 0 && progress <= 100;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Spinner */}
          <div className="flex-shrink-0">
            <svg className="animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          {/* Progress Bar */}
          <div className="flex-1">
            {message && (
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {message}
              </div>
            )}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              {isDeterminate ? (
                // Determinate progress
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              ) : (
                // Indeterminate progress
                <div className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full animate-pulse" style={{ width: '40%', animation: 'shimmer 1.5s infinite' }}/>
              )}
            </div>
            {isDeterminate && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {progress}%
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};
