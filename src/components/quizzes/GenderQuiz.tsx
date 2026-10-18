// ============================================================
// Gender Quiz — "Der, Die, oder Das?" Alpine Speed Arcade
// ============================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Volume2, RotateCcw, Sparkles } from 'lucide-react';
import { vocabularyData } from '../../data/germanCurriculum';
import { speakGerman } from '../../utils/audio';
import confetti from 'canvas-confetti';

type Props = {
  game: ReturnType<typeof import('../../hooks/useGameState').useGameState>;
};

type Gender = 'der' | 'die' | 'das';

export default function GenderQuiz({ game }: Props) {
  const { state, recordQuizResult, addXP } = game;

  const nouns = useMemo(
    () =>
      [...vocabularyData, ...state.customWords].filter(
        (w) => w.level === state.currentLevel && w.gender && w.gender !== 'none'
      ),
    [state.currentLevel, state.customWords]
  );

  const [shuffled, setShuffled] = useState(() =>
    [...nouns].sort(() => Math.random() - 0.5)
  );
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showXpPill, setShowXpPill] = useState(false);

  const word = shuffled[idx];

  const handleAnswer = useCallback(
    (guess: Gender) => {
      if (feedback || !word) return;

      const correct = word.gender === guess;
      recordQuizResult(word.id, correct, 'gender');

      if (correct) {
        const comboBonus = Math.min(combo, 5);
        const points = 10 + comboBonus * 2;
        setScore((s) => s + points);
        setCombo((c) => {
          const newCombo = c + 1;
          if (newCombo > bestCombo) setBestCombo(newCombo);
          return newCombo;
        });
        setFeedback('correct');
        setShowXpPill(true);

        // Gender-colored confetti burst
        try {
          const colors =
            word.gender === 'der'
              ? ['#2563EB', '#60A5FA', '#93C5FD']
              : word.gender === 'die'
              ? ['#E11D48', '#FB7185', '#FDA4AF']
              : ['#059669', '#34D399', '#6EE7B7'];

          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.65 },
            colors,
          });
        } catch {}
      } else {
        setCombo(0);
        setFeedback('wrong');
        setShowXpPill(false);
      }

      setAnswered((a) => a + 1);

      setTimeout(() => {
        setFeedback(null);
        setShowXpPill(false);
        if (idx + 1 >= shuffled.length) {
          setFinished(true);
          addXP(score);
          try {
            confetti({ particleCount: 100, spread: 120, origin: { y: 0.6 } });
          } catch {}
        } else {
          setIdx((i) => i + 1);
        }
      }, 1200);
    },
    [feedback, word, combo, bestCombo, idx, shuffled.length, score, recordQuizResult, addXP]
  );

  // Keyboard shortcuts (1, 2, 3)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '1') handleAnswer('der');
      if (e.key === '2') handleAnswer('die');
      if (e.key === '3') handleAnswer('das');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleAnswer]);

  const restart = () => {
    setShuffled([...nouns].sort(() => Math.random() - 0.5));
    setIdx(0);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setAnswered(0);
    setFinished(false);
    setFeedback(null);
  };

  if (nouns.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl block mb-4">🤷</span>
        <p className="font-['Fraunces'] text-xl font-bold">No nouns available for Level {state.currentLevel}</p>
      </div>
    );
  }

  if (finished) {
    const accuracy = answered > 0 ? Math.round((score / (answered * 10)) * 100) : 0;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center space-y-6 p-6 sm:p-8 tactile-card bg-white dark:bg-[#1E202B]"
      >
        <span className="text-7xl block animate-bounce">🏆</span>
        <h2 className="font-['Fraunces'] text-3xl font-black text-[#18181B] dark:text-white">Round Complete!</h2>
        <p className="font-['Fredoka'] text-sm opacity-75 font-semibold text-[#18181B] dark:text-slate-300">
          Fantastic performance in the article drill!
        </p>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border-2 border-[#18181B] dark:border-[#2E3245] bg-[#FAF6F0] dark:bg-[#141620] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F]">
          <div>
            <p className="font-['Fraunces'] text-2xl font-black text-orange-600 dark:text-orange-400">{score}</p>
            <p className="text-[11px] font-['Fredoka'] font-bold opacity-70 text-[#18181B] dark:text-slate-300">Score</p>
          </div>
          <div>
            <p className="font-['Fraunces'] text-2xl font-black text-emerald-600 dark:text-emerald-400">{bestCombo}x</p>
            <p className="text-[11px] font-['Fredoka'] font-bold opacity-70 text-[#18181B] dark:text-slate-300">Best Combo</p>
          </div>
          <div>
            <p className="font-['Fraunces'] text-2xl font-black text-blue-600 dark:text-blue-400">{accuracy}%</p>
            <p className="text-[11px] font-['Fredoka'] font-bold opacity-70 text-[#18181B] dark:text-slate-300">Accuracy</p>
          </div>
        </div>

        <button
          onClick={restart}
          className="w-full tactile-btn tactile-btn-primary py-3.5 text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          <span>Play Again</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-5">
      {/* Score & Combo Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">Score: {score}</span>
          {combo > 1 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="vinyl-sticker px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs rotate-[-3deg] flex items-center gap-1"
            >
              <Flame size={14} className="fill-white" />
              <span>{combo}x COMBO 🔥</span>
            </motion.span>
          )}
        </div>
        <span className="vinyl-sticker px-2.5 py-0.5 bg-white dark:bg-[#1E202B] text-[11px] font-['Space_Mono'] text-[#18181B] dark:text-white">
          {idx + 1} / {shuffled.length}
        </span>
      </div>

      {/* Candy-Cane Progress Track */}
      <div className="w-full bg-[#18181B]/15 dark:bg-black/50 h-3 rounded-full border-2 border-[#18181B] dark:border-[#2E3245] overflow-hidden p-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 to-rose-500 rounded-full progress-candy-cane"
          animate={{ width: `${((idx + 1) / shuffled.length) * 100}%` }}
        />
      </div>

      {/* Word Question Card with Dynamic Shake or Bounce */}
      <div className="relative">
        {/* Floating +15 XP Pill on Correct Answer */}
        <AnimatePresence>
          {showXpPill && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1.15 }}
              exit={{ opacity: 0, y: -70 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 vinyl-sticker px-4 py-1.5 bg-amber-400 text-amber-950 font-black text-sm shadow-xl flex items-center gap-1.5 pointer-events-none"
            >
              <Sparkles size={16} />
              <span>+15 XP ✨</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {word && (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className={`tactile-card p-7 sm:p-8 text-center select-none transition-all ${
                feedback === 'wrong' ? 'animate-shake' : ''
              } ${
                feedback === 'correct'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600'
                  : feedback === 'wrong'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600'
                  : state.darkMode
                  ? 'bg-[#1E202B]'
                  : 'bg-white'
              }`}
            >
              {/* Illustration Stage */}
              <div className="text-7xl block mb-4 animate-float select-none drop-shadow">
                {word.emoji}
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="font-['Fraunces'] text-3xl font-black text-[#18181B] dark:text-white">
                  _____ {word.german}
                </p>
                <button
                  onClick={() => speakGerman(word.german, 1.0, state.audioMuted)}
                  className="p-1.5 rounded-full hover:bg-orange-500/10 text-orange-500 transition-colors"
                  title="Hear pronunciation"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold text-slate-600 dark:text-slate-300">
                "{word.english}"
              </p>

              {word.plural && (
                <p className="font-['Space_Mono'] text-xs opacity-65 font-bold mt-1 text-[#18181B] dark:text-slate-300">
                  Plural: die {word.plural}
                </p>
              )}

              {/* Feedback Pill & Band-Aid Badge */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5"
                >
                  {feedback === 'correct' ? (
                    <div className="vinyl-sticker px-4 py-2 bg-emerald-500 text-white text-xs sm:text-sm font-black rotate-[-1deg]">
                      ✅ Ausgezeichnet! Correct!
                    </div>
                  ) : (
                    <div className="vinyl-sticker px-4 py-2 bg-rose-500 text-white text-xs sm:text-sm font-black rotate-[1deg] flex items-center gap-2">
                      <span>🩹</span>
                      <span>Almost! It is: {word.gender?.toUpperCase()} {word.german} 💪</span>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mechanical 3D Keycap Answer Buttons (der / die / das) */}
      <div className="grid grid-cols-3 gap-3">
        {(['der', 'die', 'das'] as Gender[]).map((g, i) => {
          const isDer = g === 'der';
          const isDie = g === 'die';
          const btnColor = isDer
            ? 'tactile-btn-blue'
            : isDie
            ? 'tactile-btn-rose'
            : 'tactile-btn-emerald';

          return (
            <button
              key={g}
              onClick={() => handleAnswer(g)}
              disabled={!!feedback}
              className={`tactile-btn ${btnColor} py-4 text-xl flex flex-col items-center justify-center disabled:opacity-50`}
            >
              <span className="uppercase tracking-wider">{g}</span>
              <span className="text-[10px] font-['Space_Mono'] opacity-80 font-bold">[Key {i + 1}]</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
