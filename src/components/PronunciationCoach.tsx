// ============================================================
// Pronunciation Coach ("Speak & Shadow" via Web Speech Recognition)
// Zero-dependency native speech recognition for German ('de-DE')
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, CheckCircle2, RotateCcw, AlertCircle, Sparkles, Volume2 } from 'lucide-react';
import { playSuccess, playError, playClick } from '../utils/soundEffects';
import { speakGerman } from '../utils/audio';
import confetti from 'canvas-confetti';

// Extend window for webkitSpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

type Props = {
  targetText: string;
  englishMeaning?: string;
  onMastered?: () => void;
  compact?: boolean;
};

// Normalize German text: lowercase, remove punctuation
function cleanGerman(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Word-level similarity & Levenshtein matching
function calculateSimilarity(spoken: string, target: string): number {
  const cleanSpoken = cleanGerman(spoken);
  const cleanTarget = cleanGerman(target);

  if (!cleanSpoken || !cleanTarget) return 0;
  if (cleanSpoken === cleanTarget) return 100;

  const targetWords = cleanTarget.split(' ');
  const spokenWords = cleanSpoken.split(' ');

  let matches = 0;
  targetWords.forEach((word) => {
    if (spokenWords.some((sw) => sw === word || sw.includes(word) || word.includes(sw))) {
      matches++;
    }
  });

  const wordRatio = matches / targetWords.length;

  // Character Levenshtein distance for single words
  if (targetWords.length === 1 && spokenWords.length === 1) {
    const s1 = cleanSpoken;
    const s2 = cleanTarget;
    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j;
        else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    const dist = costs[s2.length];
    const maxLen = Math.max(s1.length, s2.length);
    const charSim = Math.max(0, 1 - dist / maxLen);
    return Math.round(charSim * 100);
  }

  return Math.min(100, Math.round(wordRatio * 100));
}

export default function PronunciationCoach({
  targetText,
  englishMeaning,
  onMastered,
  compact = false,
}: Props) {
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    playClick();
    setErrorMessage(null);
    setTranscript('');
    setScore(null);

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSupported(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'de-DE';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: { error: string }) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please allow microphone permissions in your browser.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No German speech detected. Hold or tap the mic and speak clearly.');
        } else {
          setErrorMessage(`Audio note: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setErrorMessage('Could not initialize microphone. Please check your browser permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);

      setTimeout(() => {
        if (transcript) {
          const sim = calculateSimilarity(transcript, targetText);
          setScore(sim);

          if (sim >= 80) {
            playSuccess();
            try {
              confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
            } catch {}
            if (onMastered) onMastered();
          } else {
            playError();
          }
        }
      }, 300);
    }
  };

  const reset = () => {
    playClick();
    setTranscript('');
    setScore(null);
    setErrorMessage(null);
  };

  if (!isSupported) {
    return (
      <div className="p-3 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
        <AlertCircle size={16} className="shrink-0" />
        <span>Live Speech Coach requires Google Chrome, Edge, or a Chromium-based browser with Web Speech API support.</span>
      </div>
    );
  }

  const isSuccess = score !== null && score >= 80;

  return (
    <div
      className={`rounded-2xl border-2 transition-all ${
        compact ? 'p-3' : 'p-4'
      } bg-[#FAF8F5] dark:bg-[#181A24] border-black dark:border-[#2E3245] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F]`}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🎙️</span>
          <span className="font-['Fraunces'] text-xs font-black tracking-wide text-slate-900 dark:text-white uppercase">
            Live Pronunciation Coach
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF4A00]/10 text-[#FF4A00] font-black">
            de-DE
          </span>
        </div>

        <button
          onClick={() => speakGerman(targetText, 0.85, false)}
          className="tactile-btn tactile-btn-neutral px-2.5 py-1 text-xs font-bold flex items-center gap-1"
          title="Listen to native model audio"
        >
          <Volume2 size={13} className="text-[#FF4A00]" />
          <span>Model Audio</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Microphone Button with Animated Pulse Wave */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {isListening && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-2xl bg-[#FF4A00]/40 -z-10"
                />
                <motion.div
                  animate={{ scale: [1, 1.75, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-2xl bg-[#FF4A00]/25 -z-20"
                />
              </>
            )}

            <button
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              onClick={() => {
                if (!isListening) {
                  startListening();
                } else {
                  stopListening();
                }
              }}
              className={`tactile-btn px-4 py-3 flex items-center gap-2 text-xs font-black select-none ${
                isListening
                  ? 'tactile-btn-pink shadow-[0_2px_0_0_#F43F5E]'
                  : isSuccess
                  ? 'tactile-btn-emerald'
                  : 'tactile-btn-primary'
              }`}
              title="Hold or tap to speak German"
            >
              {isListening ? (
                <>
                  <MicOff size={16} className="animate-pulse" />
                  <span>Listening... Release to Check</span>
                </>
              ) : (
                <>
                  <Mic size={16} />
                  <span>Hold to Speak 🎤</span>
                </>
              )}
            </button>
          </div>

          {score !== null && (
            <button
              onClick={reset}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Try again"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>

        {/* Live Score Badge */}
        {score !== null && (
          <div
            className={`px-3 py-1.5 rounded-xl border-2 font-mono font-black text-xs flex items-center gap-1.5 ${
              isSuccess
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
            }`}
          >
            {isSuccess ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            <span>Accuracy: {score}%</span>
          </div>
        )}
      </div>

      {/* Transcript & Feedback Area */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3 rounded-xl border border-black/10 dark:border-[#2E3245] bg-white dark:bg-[#1E202B] text-xs space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span>You said:</span>
              {isListening && <span className="text-[#FF4A00] animate-pulse">Recording voice...</span>}
            </div>
            <p className="font-['Fredoka'] font-bold text-sm text-slate-900 dark:text-white">
              "{transcript}"
            </p>
            {isSuccess && (
              <p className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1 pt-1 text-xs">
                <Sparkles size={13} /> Ausgezeichnet! Clear German pronunciation! (+10 XP)
              </p>
            )}
            {!isSuccess && score !== null && (
              <p className="text-rose-600 dark:text-rose-400 font-bold text-xs pt-1">
                Target: "{targetText}". Try shadowing the model audio and speak a bit louder!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {errorMessage && (
        <div className="mt-2 text-[11px] font-bold text-rose-500 flex items-center gap-1">
          <AlertCircle size={13} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
