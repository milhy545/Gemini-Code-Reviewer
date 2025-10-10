import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import CorrectedCodeDisplay from './components/CorrectedCodeDisplay';
import LanguageSelector from './components/LanguageSelector';
import { reviewCode, correctCode } from './services/geminiService';
import { LANGUAGES, DEFAULT_CODE_SNIPPET } from './constants';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { WandIcon } from './components/icons/WandIcon';
import { LoaderIcon } from './components/icons/LoaderIcon';

function App() {
  const [code, setCode] = useState<string>(DEFAULT_CODE_SNIPPET);
  const [language, setLanguage] = useState<string>('javascript');
  const [feedback, setFeedback] = useState<string>('');
  const [correctedCode, setCorrectedCode] = useState<string>('');
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(false);
  const [isLoadingCorrection, setIsLoadingCorrection] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'review' | 'correct'>('review');

  const handleReviewCode = async () => {
    if (!code.trim()) return;
    setIsLoadingReview(true);
    setError(null);
    setFeedback('');
    setCorrectedCode('');
    setActiveTab('review');

    try {
      const result = await reviewCode(code, language);
      setFeedback(result);
    } catch (err) {
      setError('Nepodařilo se získat revizi kódu. Zkuste to prosím znovu.');
      console.error(err);
    } finally {
      setIsLoadingReview(false);
    }
  };

  const handleCorrectCode = async () => {
    if (!code.trim()) return;
    setIsLoadingCorrection(true);
    setError(null);
    setFeedback('');
    setCorrectedCode('');
    setActiveTab('correct');
    
    try {
      const result = await correctCode(code, language);
      setCorrectedCode(result);
    } catch (err) {
      setError('Nepodařilo se opravit kód. Zkuste to prosím znovu.');
      console.error(err);
    } finally {
      setIsLoadingCorrection(false);
    }
  };

  const handleFileRead = (content: string) => {
    setCode(content);
  };
  
  const renderOutput = () => {
    if (activeTab === 'review') {
      return <FeedbackDisplay feedback={feedback} />;
    }
    if (activeTab === 'correct') {
      return <CorrectedCodeDisplay code={correctedCode} language={language} />;
    }
    return <FeedbackDisplay feedback={feedback} />; // Default to review tab view
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <header className="py-4 px-8 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-center">AI Code Reviewer</h1>
      </header>
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <LanguageSelector 
              language={language}
              onLanguageChange={setLanguage}
              languages={LANGUAGES}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
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
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
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
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
                >
                   {isLoadingCorrection ? (
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                  ) : (
                    <WandIcon className="w-5 h-5 mr-2" />
                  )}
                  Opravit kód
                </button>
              </div>
            </div>

            <div className="relative">
              {error && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
                    <div className="text-center p-4 bg-red-900/50 border border-red-700 rounded-lg">
                        <p className="text-red-300">{error}</p>
                    </div>
                </div>
              )}
              { (isLoadingReview || isLoadingCorrection) ? (
                 <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 rounded-lg border border-gray-700 bg-gray-900">
                    <LoaderIcon className="w-16 h-16 mb-4 animate-spin" />
                    <h3 className="text-lg font-semibold">
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
    </div>
  );
}

export default App;
