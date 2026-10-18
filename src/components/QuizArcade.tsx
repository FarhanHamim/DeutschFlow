// ============================================================
// Quiz Arcade — 4 High-Energy Interactive Game Modes
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Zap, Play } from 'lucide-react';
import GenderQuiz from './quizzes/GenderQuiz';
import SentenceBuilder from './quizzes/SentenceBuilder';
import FillInBlank from './quizzes/FillInBlank';
import ListeningChallenge from './quizzes/ListeningChallenge';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

type QuizMode = null | 'gender' | 'sentence' | 'fillin' | 'listening';

const quizModes = [
  {
    id: 'gender' as const,
    title: 'Der, Die, or Das?',
    subtitle: 'High-speed German noun gender reflex drill',
    emoji: '🎯',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    shadow: 'shadow-blue-500/20',
    tag: 'SPEED DRILL',
    xpReward: '+10 XP / correct',
    hint: 'Keyboard: 1 = Der · 2 = Die · 3 = Das',
  },
  {
    id: 'sentence' as const,
    title: 'Sentence Builder',
    subtitle: 'Construct proper German sentences & master verb positions',
    emoji: '🧱',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    shadow: 'shadow-emerald-500/20',
    tag: 'GRAMMAR LOGIC',
    xpReward: '+12 XP / puzzle',
    hint: 'Tap words in valid German order',
  },
  {
    id: 'fillin' as const,
    title: 'Story Quests',
    subtitle: 'Complete real-life conversational German dialogue scenarios',
    emoji: '📝',
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    shadow: 'shadow-orange-500/20',
    tag: 'STORY IMMERSION',
    xpReward: '+15 XP / quest',
    hint: 'Context clues & vocabulary recall',
  },
  {
    id: 'listening' as const,
    title: 'Listening Ear Trainer',
    subtitle: 'Train your ear to natural German speech synthesis',
    emoji: '🎧',
    gradient: 'from-pink-600 via-rose-600 to-purple-700',
    shadow: 'shadow-pink-500/20',
    tag: 'EAR TRAINING',
    xpReward: '+10 XP / round',
    hint: 'Listen closely and identify the word',
  },
];

export default function QuizArcade({ game }: Props) {
  const [activeMode, setActiveMode] = useState<QuizMode>(null);

  if (activeMode) {
    return (
      <div className="space-y-4">
        {/* Back Button */}
        <button
          onClick={() => setActiveMode(null)}
          className="tactile-btn tactile-btn-neutral flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm mb-4"
        >
          <ArrowLeft size={16} />
          <span>Exit to Arcade Lobby</span>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {activeMode === 'gender' && <GenderQuiz game={game} />}
            {activeMode === 'sentence' && <SentenceBuilder game={game} />}
            {activeMode === 'fillin' && <FillInBlank game={game} />}
            {activeMode === 'listening' && <ListeningChallenge game={game} />}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div
        className={`tactile-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
          game.state.darkMode
            ? 'bg-gradient-to-r from-purple-950/40 via-[#1E202B] to-[#1E202B] border-[#2E3245]'
            : 'bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50'
        }`}
      >
        <div className="space-y-2">
          <div className="vinyl-sticker px-3 py-1 bg-purple-600 text-white text-xs rotate-[-2deg] flex items-center gap-1.5 w-fit">
            <Trophy size={14} />
            <span>GAMIFIED TRAINER</span>
          </div>

          <h1 className="font-['Fraunces'] text-3xl sm:text-4xl font-black tracking-tight text-[#18181B] dark:text-white">
            Quiz Arcade 🎮
          </h1>

          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm opacity-80 max-w-lg font-semibold leading-relaxed text-[#18181B] dark:text-slate-300">
            Test your reflexes, reinforce German grammar intuition, and earn XP multipliers.
            Any mistakes made will be saved to your Weak Words Vault for spaced review.
          </p>
        </div>

        <div className="flex sm:flex-col items-center justify-between sm:justify-center p-4 rounded-2xl bg-white/80 dark:bg-[#141620] border-2 border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] shrink-0 min-w-[160px]">
          <span className="text-xs font-['Fredoka'] font-bold opacity-70 text-[#18181B] dark:text-slate-300">Completed Quizzes</span>
          <span className="font-['Fraunces'] text-3xl font-black text-purple-600 dark:text-purple-400">
            {game.state.completedQuizzes}
          </span>
          <span className="text-[11px] font-['Space_Mono'] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
            <Zap size={12} /> XP Active
          </span>
        </div>
      </div>

      {/* Arcade Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {quizModes.map((mode) => (
          <motion.div
            key={mode.id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setActiveMode(mode.id)}
            className="tactile-card relative overflow-hidden p-6 sm:p-7 text-white cursor-pointer select-none"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient}`} />

            {/* Background Big Watermark Emoji */}
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-15 pointer-events-none select-none">
              {mode.emoji}
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
                    {mode.emoji}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="vinyl-sticker px-2.5 py-0.5 bg-black/40 border-white/50 text-[10px] text-white tracking-wider">
                      {mode.tag}
                    </span>
                    <span className="text-[11px] font-['Space_Mono'] font-bold text-amber-200">
                      {mode.xpReward}
                    </span>
                  </div>
                </div>

                <h3 className="font-['Fraunces'] text-2xl font-black mb-1">{mode.title}</h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/90 font-semibold">{mode.subtitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <span className="opacity-80 font-['Space_Mono'] text-[11px] font-bold">{mode.hint}</span>
                <div className="tactile-btn tactile-btn-neutral flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-900 !shadow-[0px_3px_0px_#18181B]">
                  <Play size={12} className="fill-slate-900" />
                  <span>Play</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
