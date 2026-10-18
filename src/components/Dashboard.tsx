// ============================================================
// Swiss Bento Grid Dashboard — Tactile Alpine Arcade
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Gamepad2,
  Layers,
  MessageSquare,
  AlertTriangle,
  Star,
  Zap,
  Volume2,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle,
  Trophy,
  Compass,
  Puzzle,
  Anchor,
  Swords,
} from 'lucide-react';
import { vocabularyData, grammarTopics, dialogueScenarios } from '../data/germanCurriculum';
import { getMasteryLevel } from '../utils/sm2';
import { speakGerman } from '../utils/audio';
import type { View } from '../App';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
  onNavigate: (view: View) => void;
};

const PROVERBS = [
  { de: 'Übung macht den Meister.', en: 'Practice makes perfect.', author: 'German Proverb' },
  { de: 'Aller Anfang ist schwer.', en: 'Every beginning is hard.', author: 'Goethe' },
  { de: 'Wer rastet, der rostet.', en: 'He who rests grows rusty.', author: 'German Idiom' },
  { de: 'Ohne Fleiß kein Preis.', en: 'No pain, no gain.', author: 'Popular Saying' },
  { de: 'Morgenstund hat Gold im Mund.', en: 'The early bird catches the worm.', author: 'German Proverb' },
];

export default function Dashboard({ game, onNavigate }: Props) {
  const { state, currentRank, nextRank, xpProgress } = game;
  const [proverbIndex] = useState(() => Math.floor(Math.random() * PROVERBS.length));
  const dailyProverb = PROVERBS[proverbIndex];

  // Dynamic German greeting based on hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Guten Morgen 🌅';
    if (hour < 18) return 'Guten Tag ☀️';
    return 'Guten Abend 🌙';
  }, []);

  const allWords = useMemo(
    () => [...vocabularyData, ...state.customWords],
    [state.customWords]
  );
  const levelWords = allWords.filter((w) => w.level === state.currentLevel);
  const levelGrammar = grammarTopics.filter((g) => g.level === state.currentLevel);
  const levelDialogues = dialogueScenarios.filter((d) => d.level === state.currentLevel);

  // Calculate mastery stats
  const masteredCount = Object.values(state.sm2Data).filter(
    (d) => getMasteryLevel(d) === 'mastered'
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* ============================================================ */}
      {/* SWISS BENTO GRID: ROW 1 (Hero Greeting & Flame Rank Vault)   */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Bento Box 1: Alpine Storybook Hero Banner (8 Cols) */}
        <div className="lg:col-span-8 tactile-card relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-rose-50/90 dark:from-[#1E202B] dark:via-[#1A1C26] dark:to-[#171821] flex flex-col justify-between">
          {/* Subtle German Flag Top Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 flex">
            <div className="flex-1 bg-[#18181B] dark:bg-black" />
            <div className="flex-1 bg-red-600" />
            <div className="flex-1 bg-amber-400" />
          </div>

          {/* Background Decorative SVG Pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none text-[#18181B] dark:text-white">
            <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="10 5" />
              <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="6" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="vinyl-sticker px-3 py-1 bg-orange-500 text-white text-xs rotate-[-2deg]">
                ★ CEFR {state.currentLevel} ACTIVE
              </span>
              <span className="vinyl-sticker px-3 py-1 bg-white dark:bg-[#1E202B] text-[#18181B] dark:text-slate-100 text-xs rotate-[1deg]">
                {levelWords.length} Words in Current Deck
              </span>
            </div>

            <div>
              <h1 className="font-['Fraunces'] text-3xl sm:text-5xl font-black tracking-tight text-[#18181B] dark:text-white">
                {greeting} — Welcome!
              </h1>
              <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base opacity-80 mt-1 font-semibold max-w-xl text-[#18181B] dark:text-slate-200">
                Master daily German routines, conquer noun genders (der, die, das), and train your way from A1 to conversational B1 fluency!
              </p>
            </div>

            {/* Daily German Proverb with Audio & Translation */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#141620] border-2 border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl animate-float">🥨</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-['Fredoka'] font-black uppercase text-orange-600 dark:text-orange-400">German Proverb:</span>
                    <p className="font-['Fraunces'] font-bold text-xs sm:text-sm text-[#18181B] dark:text-white">
                      "{dailyProverb.de}"
                    </p>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-[11px] opacity-75 font-semibold text-slate-600 dark:text-slate-300">
                    Meaning: "{dailyProverb.en}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => speakGerman(dailyProverb.de, 1.0, state.audioMuted)}
                className="tactile-btn tactile-btn-neutral p-2 shrink-0"
                title="Hear German pronunciation"
                aria-label="Hear German pronunciation"
              >
                <Volume2 size={16} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('journey')}
                className="tactile-btn tactile-btn-primary px-5 py-3 text-sm flex items-center gap-2"
              >
                <span>Continue Learning Journey</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate('flashcards')}
                className="tactile-btn tactile-btn-neutral px-4 py-3 text-sm flex items-center gap-2"
              >
                <span>Review Flashcards</span>
                <Layers size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bento Box 2: Daily Streak Flame & Rank Trophy (4 Cols) */}
        <div className="lg:col-span-4 tactile-card p-6 sm:p-7 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 dark:from-[#231A12] dark:via-[#2E1F14] dark:to-[#1E1710] flex flex-col justify-between text-center relative overflow-hidden">
          {/* Top Badge */}
          <div className="flex items-center justify-between w-full">
            <span className="vinyl-sticker px-3 py-1 bg-amber-500 text-white text-xs rotate-[-2deg]">
              PLAYER RANK 🏆
            </span>
            <span className="font-['Fredoka'] font-black text-xs opacity-75 text-[#18181B] dark:text-white">
              Level {state.currentLevel}
            </span>
          </div>

          {/* Central Animated Trophy / Avatar */}
          <div className="my-auto py-4 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-3xl bg-white dark:bg-[#141620] border-2 border-[#18181B] dark:border-[#2E3245] shadow-[0px_5px_0px_#18181B] dark:shadow-[0px_5px_0px_#090A0F] flex items-center justify-center text-5xl animate-float">
                {currentRank.emoji}
              </div>
              <span className="vinyl-sticker absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-red-600 text-white text-[10px] rotate-[6deg]">
                🔥 {state.streak} Day Streak
              </span>
            </div>

            <h3 className="font-['Fraunces'] font-black text-xl text-[#18181B] dark:text-white">
              {currentRank.title}
            </h3>
            <p className="font-['Fredoka'] text-xs opacity-75 font-bold mt-0.5 text-[#18181B] dark:text-slate-300">
              {state.xp} Total XP Earned
            </p>
          </div>

          {/* Liquid Striped Candy-Cane XP Progress Meter */}
          <div className="w-full space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-['Fredoka'] font-bold opacity-80 text-[#18181B] dark:text-slate-200">
              <span>{state.xp} XP</span>
              <span>{nextRank ? `${nextRank.minXP} XP` : 'MAX RANK'}</span>
            </div>
            <div className="w-full h-3.5 rounded-full bg-[#18181B]/15 dark:bg-black/60 border-2 border-[#18181B] dark:border-[#2E3245] overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full progress-candy-cane"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(8, xpProgress))}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[11px] font-['Fredoka'] text-orange-600 dark:text-orange-400 font-black text-right">
              {nextRank ? `${xpProgress}% to ${nextRank.title}` : 'Maximum Rank Achieved!'}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SWISS BENTO GRID: ROW 2 (Action Stations — 4 Asymmetric Boxes)*/}
      {/* ============================================================ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕹️</span>
            <h2 className="font-['Fraunces'] text-2xl font-black tracking-tight text-[#18181B] dark:text-white">
              Alpine Arcade Stations
            </h2>
          </div>
          <span className="font-['Fredoka'] text-xs font-bold opacity-60 text-[#18181B] dark:text-slate-300">
            Choose your daily practice module
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Station 1: Learning Journey Guide */}
          <div
            onClick={() => onNavigate('journey')}
            className="tactile-card p-5 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-[#201D19] dark:to-[#2B2319] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-orange-500 text-white border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:rotate-6 transition-transform">
                  🗺️
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-orange-600 text-white text-[10px] rotate-[2deg]">
                  13 STAGES
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                Learning Journey
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Goethe A1→B1 roadmap covering Supermarkets, DB Trains, & Bürgeramt.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-orange-600 dark:text-orange-400">
              <span>View Roadmap</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 2: Der/Die/Das Speed Arcade */}
          <div
            onClick={() => onNavigate('quiz')}
            className="tactile-card p-5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#151D2C] dark:to-[#1A263D] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-blue-600 text-white border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:-rotate-6 transition-transform">
                  🎮
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-blue-600 text-white text-[10px] rotate-[-2deg]">
                  SPEED ARCADE
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                Der · Die · Das
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Drill German articles in rapid arcade mode with audio & combo multipliers!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-blue-600 dark:text-blue-400">
              <span>Play Speed Arcade (+10 XP)</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 3: Grammar Sheets */}
          <div
            onClick={() => onNavigate('grammar')}
            className="tactile-card p-5 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-[#11231D] dark:to-[#173028] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-emerald-600 text-white border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:rotate-6 transition-transform">
                  📚
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] rotate-[1deg]">
                  {levelGrammar.length} TOPICS
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                Grammar Sheets
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Accusative, Dative, separable verbs, and sentence structures made visual.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-emerald-600 dark:text-emerald-400">
              <span>Study Grammar Rules</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 4: Story Roleplay Dialogues */}
          <div
            onClick={() => onNavigate('dialogues')}
            className="tactile-card p-5 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-[#26151B] dark:to-[#381B26] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-rose-600 text-white border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:-rotate-6 transition-transform">
                  💬
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-rose-600 text-white text-[10px] rotate-[-2deg]">
                  CAST ROLEPLAY
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                Roleplay Stories
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Real conversational German at the bakery, train station, and clinic.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-rose-600 dark:text-rose-400">
              <span>Listen to Dialogues</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* POWER-USER INTERACTIVE LABS (Zero External API Free Tools)   */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-['Fraunces'] text-2xl font-black text-[#18181B] dark:text-white">
              Power-User Interactive Labs
            </h2>
            <span className="text-xl animate-pulse">⚡</span>
          </div>
          <span className="text-xs font-['Fredoka'] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Native Browser Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lab 1: Lego Compound Word Splitter */}
          <div
            onClick={() => onNavigate('compound-words')}
            className="tactile-card p-5 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-[#13192B] dark:to-[#18233C] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-indigo-600 text-white border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:rotate-6 transition-transform">
                  🧩
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] rotate-[-2deg]">
                  LEGO LAB
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                Compound Word Splitter
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Break mammoth German words into tactile puzzle pieces and discover the Last Word Rule 👑!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-indigo-600 dark:text-indigo-400">
              <span>Open Komposita-Labor</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 2: The Verb-Kicker Sentence Animator */}
          <div
            onClick={() => onNavigate('verb-kicker')}
            className="tactile-card p-5 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-[#2B1B15] dark:to-[#382317] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-amber-500 text-slate-900 border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:-rotate-6 transition-transform">
                  ⚓
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-amber-500 text-slate-900 text-[10px] rotate-[1deg]">
                  V2 & NEBENSATZ
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                The Verb-Kicker 🥾
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Visualize German sentence word order: V2 anchor ⚓, separable verb scissors ✂️, and subordinate kicker 🥾!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-amber-600 dark:text-amber-400">
              <span>Launch Sentence Sandbox</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 3: Real-Life Germany Boss Battles */}
          <div
            onClick={() => onNavigate('boss-battles')}
            className="tactile-card p-5 bg-gradient-to-br from-rose-50 to-red-100 dark:from-[#2B1218] dark:to-[#3B151F] cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-rose-600 text-white border-2 border-[#18181B] shadow-[0px_3px_0px_#18181B] group-hover:rotate-6 transition-transform">
                  ⚔️
                </span>
                <span className="vinyl-sticker px-2.5 py-0.5 bg-rose-600 text-white text-[10px] rotate-[-2deg]">
                  RPG COMIC
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-xl font-black text-[#18181B] dark:text-white">
                Real-Life Boss Battles
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold mt-1 text-[#18181B] dark:text-slate-300">
                Survive the Sunday Bäckerei, Murat the Paketbote, the WG-Casting, and the Bürgeramt with instant grammar tips!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/10 dark:border-white/10 flex items-center justify-between text-xs font-['Fredoka'] font-black text-rose-600 dark:text-rose-400">
              <span>Enter RPG Battles</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SWISS BENTO GRID: ROW 3 (Weak Words Vault & Radar)           */}
      {/* ============================================================ */}
      {state.weakWords.length > 0 ? (
        <div className="tactile-card p-6 bg-gradient-to-br from-rose-100 via-rose-50 to-amber-100 dark:from-[#33141E] dark:via-[#26151B] dark:to-[#2B1B15] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white border-2 border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] flex items-center justify-center text-3xl shrink-0 animate-bounce">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-['Fraunces'] font-black text-lg sm:text-xl text-rose-900 dark:text-rose-200">
                  Weak Words Radar: {state.weakWords.length} {state.weakWords.length === 1 ? 'word needs' : 'words need'} review!
                </h4>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold opacity-85 text-rose-800 dark:text-rose-300">
                Drill mistakes from your flashcards & quizzes using our SuperMemo SM-2 Spaced Repetition engine before they slip away.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('weak-words')}
            className="tactile-btn tactile-btn-rose px-5 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0"
          >
            <span>Open Vault & Review</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="tactile-card p-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 dark:from-[#11241C] dark:to-[#173024] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✨</span>
            <div>
              <h4 className="font-['Fraunces'] font-black text-base text-emerald-900 dark:text-emerald-200">
                Weak Words Vault is clear!
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs opacity-75 font-semibold text-emerald-800 dark:text-emerald-300">
                You've conquered all difficult vocabulary. Keep up the brilliant progress!
              </p>
            </div>
          </div>
          <span className="vinyl-sticker px-3 py-1 bg-emerald-600 text-white text-xs rotate-[2deg]">
            100% VAULT CLEAR
          </span>
        </div>
      )}

      {/* ============================================================ */}
      {/* SWISS BENTO GRID: ROW 4 (Curriculum Mastery Overview)        */}
      {/* ============================================================ */}
      <div className="tactile-card p-6 sm:p-7 bg-white dark:bg-[#1E202B]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h3 className="font-['Fraunces'] text-xl sm:text-2xl font-black text-[#18181B] dark:text-white">
              CEFR Level {state.currentLevel} Curriculum Progress
            </h3>
          </div>
          <span className="vinyl-sticker px-3 py-1 bg-amber-400 text-amber-950 text-xs font-black rotate-[-2deg]">
            Goethe-Zertifikat Standards
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Vocabulary Coverage',
              total: levelWords.length,
              done: levelWords.filter((w) => state.sm2Data[w.id]).length,
              color: 'from-blue-500 to-indigo-500',
              emoji: '🃏',
            },
            {
              label: 'Gender Mastery (der/die/das)',
              total: levelWords.filter((w) => w.gender && w.gender !== 'none').length,
              done: levelWords.filter(
                (w) =>
                  w.gender &&
                  state.sm2Data[w.id] &&
                  getMasteryLevel(state.sm2Data[w.id]) !== 'new'
              ).length,
              color: 'from-rose-500 to-pink-500',
              emoji: '🎯',
            },
            {
              label: 'Grammar Modules',
              total: levelGrammar.length,
              done: Math.min(levelGrammar.length, Math.floor(state.completedQuizzes / 2)),
              color: 'from-emerald-500 to-teal-500',
              emoji: '📚',
            },
            {
              label: 'Roleplay Dialogues',
              total: levelDialogues.length,
              done: Math.min(levelDialogues.length, Math.floor(state.completedQuizzes / 4)),
              color: 'from-amber-500 to-orange-500',
              emoji: '💬',
            },
          ].map((bar) => {
            const pct = bar.total > 0 ? Math.round((bar.done / bar.total) * 100) : 0;
            return (
              <div
                key={bar.label}
                className="p-4 rounded-2xl bg-[#FAF6F0] dark:bg-[#141620] border-2 border-[#18181B] dark:border-[#2E3245] shadow-[0px_2px_0px_#18181B] dark:shadow-[0px_2px_0px_#090A0F]"
              >
                <div className="flex items-center justify-between text-xs font-['Fredoka'] font-black mb-2 text-[#18181B] dark:text-white">
                  <span className="flex items-center gap-1.5">
                    <span>{bar.emoji}</span>
                    <span>{bar.label}</span>
                  </span>
                  <span className="font-['Space_Mono'] opacity-70">
                    {pct}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#18181B]/15 dark:bg-black/60 border border-[#18181B] dark:border-[#2E3245] overflow-hidden p-0.5">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${bar.color} progress-candy-cane`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-[10px] font-['Space_Mono'] opacity-65 font-bold text-right mt-1 text-[#18181B] dark:text-slate-300">
                  {bar.done} of {bar.total} practiced
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
