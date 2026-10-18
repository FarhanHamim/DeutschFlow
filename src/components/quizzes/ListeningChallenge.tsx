// ============================================================
// Listening Challenge — Hear it, then identify it
// ============================================================

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Turtle, Check, X } from 'lucide-react';
import { vocabularyData } from '../../data/germanCurriculum';
import { speakGerman } from '../../utils/audio';
import confetti from 'canvas-confetti';

type Props = {
  game: ReturnType<typeof import('../../hooks/useGameState').useGameState>;
};

export default function ListeningChallenge({ game }: Props) {
  const { state, addXP, recordQuizResult } = game;

  const words = useMemo(
    () =>
      [...vocabularyData, ...state.customWords]
        .filter((w) => w.level === state.currentLevel)
        .sort(() => Math.random() - 0.5),
    [state.currentLevel, state.customWords]
  );

  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState<string[]>(() => generateOptions(0));
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  function generateOptions(index: number): string[] {
    const word = words[index];
    if (!word) return [];

    const otherWords = words
      .filter((w) => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.german);

    const allOptions = [word.german, ...otherWords].sort(() => Math.random() - 0.5);
    return allOptions;
  }

  const word = words[idx];

  const playAudio = useCallback(
    (speed: number = 1.0) => {
      if (!word) return;
      const text = word.gender && word.gender !== 'none' 
        ? `${word.gender} ${word.german}` 
        : word.german;
      speakGerman(text, speed, state.audioMuted);
    },
    [word, state.audioMuted]
  );

  const handleAnswer = (answer: string) => {
    if (feedback || !word) return;
    
    const correct = answer === word.german;
    setSelectedAnswer(answer);
    setFeedback(correct ? 'correct' : 'wrong');
    setTotal((t) => t + 1);
    recordQuizResult(word.id, correct, 'listening');

    if (correct) {
      setScore((s) => s + 10);
      addXP(10);
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
    }
  };

  const next = () => {
    if (idx + 1 < words.length) {
      const newIdx = idx + 1;
      setIdx(newIdx);
      setOptions(generateOptions(newIdx));
      setFeedback(null);
      setSelectedAnswer(null);
    }
  };

  if (words.length < 4) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl block mb-4">🎧</span>
        <p className="font-[Fredoka] text-xl">Need at least 4 words for {state.currentLevel}</p>
      </div>
    );
  }

  if (!word || idx >= words.length) {
    const accuracy = total > 0 ? Math.round((score / (total * 10)) * 100) : 0;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto text-center space-y-6 py-10">
        <span className="text-6xl block">🎉</span>
        <h2 className="font-[Fredoka] text-2xl font-bold">Listening Complete!</h2>
        <div className={`rounded-xl p-6 ${state.darkMode ? 'bg-slate-800' : 'bg-white border border-slate-200'}`}>
          <p className="text-3xl font-bold text-orange-500">{score} pts</p>
          <p className="text-sm opacity-60">{accuracy}% accuracy</p>
        </div>
        <button
          onClick={() => { setIdx(0); setOptions(generateOptions(0)); setFeedback(null); setSelectedAnswer(null); setScore(0); setTotal(0); }}
          className="btn-3d px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
        >
          Play Again 🔄
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-['Fraunces'] text-xl font-black text-slate-900 dark:text-white">Listening Challenge 🎧</h3>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Score: {score} · {idx + 1}/{words.length}</span>
      </div>

      {/* Audio card */}
      <div className="tactile-card p-8 text-center bg-white dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]">
        <span className="text-5xl block mb-4">🔊</span>
        <p className="font-['Fraunces'] text-lg font-black text-slate-900 dark:text-white mb-4">What word did you hear?</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => playAudio(1.0)}
            className="tactile-btn tactile-btn-primary flex items-center gap-2 px-6 py-3 text-sm font-black"
          >
            <Volume2 size={20} /> Play 1.0x
          </button>
          <button
            onClick={() => playAudio(0.75)}
            className="tactile-btn tactile-btn-neutral flex items-center gap-2 px-4 py-3 text-sm font-bold"
            title="Play slower (0.75x)"
          >
            <Turtle size={18} /> Slow
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          let style = 'bg-white dark:bg-[#181A24] border-black dark:border-[#2E3245] text-slate-900 dark:text-white hover:border-[#FF4A00] dark:hover:border-[#FF4A00] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F]';
          if (feedback && opt === word.german) {
            style = 'bg-emerald-100 border-emerald-500 dark:bg-emerald-950/70 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100 shadow-[0_3px_0_0_#10B981]';
          } else if (feedback && opt === selectedAnswer && opt !== word.german) {
            style = 'bg-rose-100 border-rose-500 dark:bg-rose-950/70 dark:border-rose-400 text-rose-950 dark:text-rose-100 shadow-[0_3px_0_0_#F43F5E]';
          }

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAnswer(opt)}
              disabled={!!feedback}
              className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all ${style} disabled:cursor-default`}
            >
              {opt}
              {feedback && opt === word.german && <Check size={16} className="inline ml-2 text-emerald-600 dark:text-emerald-400" />}
              {feedback && opt === selectedAnswer && opt !== word.german && <X size={16} className="inline ml-2 text-rose-600 dark:text-rose-400" />}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <p className={`font-black text-base ${feedback === 'correct' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {feedback === 'correct' ? '✅ Correct! (Richtig)' : `❌ Correct answer: ${word.german}`}
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Meaning: {word.english}</p>
          <button
            onClick={next}
            className="tactile-btn tactile-btn-primary px-8 py-2.5 text-sm font-black mx-auto"
          >
            Next Word →
          </button>
        </motion.div>
      )}
    </div>
  );
}
