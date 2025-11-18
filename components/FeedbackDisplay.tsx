import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpeakerWaveIcon } from './icons/SpeakerWaveIcon';
import { SpeakerXMarkIcon } from './icons/SpeakerXMarkIcon';

interface FeedbackDisplayProps {
  feedback: string;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Cleanup speech synthesis on component unmount or when feedback changes
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [feedback]);

  const handleToggleSpeech = () => {
    if (!feedback) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Clean up markdown for a better listening experience
      const cleanedFeedback = feedback
        .replace(/###/g, '')
        .replace(/`/g, '')
        .replace(/\*\*/g, '');
        
      const utterance = new SpeechSynthesisUtterance(cleanedFeedback);
      utterance.lang = 'cs-CZ';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error("Speech synthesis error:", e);
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };


  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        <SparklesIcon className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Zpětná vazba ke kódu</h3>
        <p className="text-sm">Vaše revize kódu se zde zobrazí.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 flex flex-col shadow-sm">
       <div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <SparklesIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
            Revize kódu
        </h2>
        <button
            onClick={handleToggleSpeech}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            title={isSpeaking ? "Zastavit čtení" : "Přečíst nahlas"}
        >
            {isSpeaking ? <SpeakerXMarkIcon className="w-5 h-5" /> : <SpeakerWaveIcon className="w-5 h-5" />}
        </button>
       </div>
      <div className="p-6 overflow-y-auto flex-grow">
        <div className="prose dark:prose-invert prose-sm max-w-none">
          {/* Using a simple pre-wrap to display markdown-formatted text */}
          <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'sans-serif' }}>{feedback}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;