// ============================================================
// Sentence Builder — Satzbau Click-to-assemble word order quiz
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import { sentenceExercises } from '../../data/germanCurriculum';
import { speakGerman } from '../../utils/audio';
import confetti from 'canvas-confetti';

type Props = {
  game: ReturnType<typeof import('../../hooks/useGameState').useGameState>;
};

export default function SentenceBuilder({ game }: Props) {
  const { state, addXP } = game;

  const exercises = useMemo(
    () => sentenceExercises.filter((e) => e.level === state.currentLevel),
    [state.currentLevel]
  );

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>(() =>
    exercises[0] ? [...exercises[0].correctOrder].sort(() => Math.random() - 0.5) : []
  );
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const exercise = exercises[idx];

  const resetExercise = (newIdx: number) => {
    const ex = exercises[newIdx];
    if (!ex) return;
    setSelected([]);
    setAvailable([...ex.correctOrder].sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  const selectWord = (word: string, fromIdx: number) => {
    if (feedback) return;
    setSelected([...selected, word]);
    const newAvailable = [...available];
    newAvailable.splice(fromIdx, 1);
    setAvailable(newAvailable);
  };

  const deselectWord = (word: string, fromIdx: number) => {
    if (feedback) return;
    setAvailable([...available, word]);
    const newSelected = [...selected];
    newSelected.splice(fromIdx, 1);
    setSelected(newSelected);
  };

  const checkAnswer = () => {
    if (!exercise) return;
    const isCorrect = selected.join(' ') === exercise.correctOrder.join(' ');

    if (isCorrect) {
      setFeedback('correct');
      setScore((s) => s + 15);
      addXP(15);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
      speakGerman(exercise.correctOrder.join(' '), 0.9, state.audioMuted);
    } else {
      setFeedback('wrong');
    }
  };

  const next = () => {
    if (idx + 1 < exercises.length) {
      const newIdx = idx + 1;
      setIdx(newIdx);
      resetExercise(newIdx);
    }
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl block mb-4">🧱</span>
        <p className="font-[Outfit] text-xl font-bold">No sentence exercises for {state.currentLevel}</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center space-y-6 p-6 rounded-3xl border-2 glass-panel shadow-2xl"
      >
        <span className="text-6xl block animate-bounce">🎉</span>
        <h2 className="font-[Outfit] text-3xl font-extrabold">All Sentences Built!</h2>
        <p className="text-sm opacity-70">
          Total Score: <span className="font-extrabold text-orange-500">{score} XP</span>
        </p>
        <button
          onClick={() => {
            setIdx(0);
            resetExercise(0);
            setScore(0);
          }}
          className="w-full btn-duo btn-duo-primary py-3.5 rounded-2xl font-[Outfit] text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw size={18} />
          <span>Play Again</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-['Fraunces'] text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
          <span>🧱</span> Sentence Builder (Satzbau)
        </h3>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          {idx + 1} / {exercises.length} · Score: {score} XP
        </span>
      </div>

      {/* English prompt */}
      <div
        className="tactile-card p-5 border-2 bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <p className="text-xs font-black text-[#FF4A00] uppercase tracking-wider mb-1">
          Translate to German:
        </p>
        <p className="text-lg font-bold font-['Fraunces'] text-slate-900 dark:text-white">
          "{exercise.english}"
        </p>
        <p className="text-xs mt-2 text-slate-500 dark:text-slate-400 font-mono font-semibold">💡 Hint: {exercise.hint}</p>
      </div>

      {/* Selected words (answer zone) */}
      <div
        className={`min-h-[70px] rounded-3xl p-4 border-2 border-dashed flex flex-wrap gap-2 items-center transition-all ${
          feedback === 'correct'
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
            : feedback === 'wrong'
            ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
            : 'border-black dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#181A24]'
        }`}
      >
        <AnimatePresence>
          {selected.map((word, i) => (
            <motion.button
              key={`selected-${i}-${word}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => deselectWord(word, i)}
              className="tactile-btn tactile-btn-blue px-3.5 py-2 text-xs sm:text-sm font-bold"
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
        {selected.length === 0 && (
          <span className="text-xs text-slate-400 dark:text-slate-500 italic mx-auto font-medium">
            Tap words from the word bank below in the correct order…
          </span>
        )}
      </div>

      {/* Available words bank */}
      <div className="flex flex-wrap gap-2.5 justify-center py-2">
        <AnimatePresence>
          {available.map((word, i) => (
            <motion.button
              key={`avail-${i}-${word}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => selectWord(word, i)}
              className="tactile-btn tactile-btn-neutral px-4 py-2.5 text-xs sm:text-sm font-bold"
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border-2 text-center ${
            feedback === 'correct'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200 shadow-[0_3px_0_0_#10B981]'
              : 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/60 dark:border-rose-500 dark:text-rose-200 shadow-[0_3px_0_0_#F43F5E]'
          }`}
        >
          {feedback === 'correct' ? (
            <div className="flex items-center justify-center gap-3">
              <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
              <span className="font-black text-sm sm:text-base">Awesome! Correct word order! ✨</span>
              <button
                onClick={() => speakGerman(exercise.correctOrder.join(' '), 0.9, state.audioMuted)}
                className="p-1 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              >
                <Volume2 size={16} />
              </button>
            </div>
          ) : (
            <div>
              <p className="font-black text-sm flex items-center justify-center gap-2 mb-1">
                <X size={18} /> Not quite right!
              </p>
              <p className="text-xs font-mono font-bold opacity-80">
                Correct: {exercise.correctOrder.join(' ')}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => resetExercise(idx)}
          className="flex-1 tactile-btn tactile-btn-neutral py-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>

        {!feedback && selected.length === exercise.correctOrder.length && (
          <button
            onClick={checkAnswer}
            className="flex-1 tactile-btn tactile-btn-primary py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-2"
          >
            <Check size={18} />
            <span>Check Order</span>
          </button>
        )}

        {feedback && idx + 1 < exercises.length && (
          <button
            onClick={next}
            className="flex-1 tactile-btn tactile-btn-emerald py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-2"
          >
            <span>Next Sentence</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
