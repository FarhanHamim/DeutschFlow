// ============================================================
// 3D Collectible Trading Card Flashcards — Alpine Arcade Style
// ============================================================

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  Turtle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { vocabularyData } from '../data/germanCurriculum';
import { speakGerman } from '../utils/audio';
import { getArticleDisplay } from '../utils/gender';
import { getMasteryLevel } from '../utils/sm2';
import type { SM2Grade } from '../utils/sm2';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

export default function Flashcards({ game }: Props) {
  const { state, gradeWord } = game;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [speakingWord, setSpeakingWord] = useState(false);

  const allWords = useMemo(() => {
    return [...vocabularyData, ...state.customWords].filter(
      (w) => w.level === state.currentLevel
    );
  }, [state.currentLevel, state.customWords]);

  const [shuffledWords, setShuffledWords] = useState(allWords);

  // Sync shuffled words on level change
  useEffect(() => {
    setShuffledWords(allWords);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [allWords]);

  const word = shuffledWords[currentIndex];

  const navigate = (dir: number) => {
    setDirection(dir);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return shuffledWords.length - 1;
        if (next >= shuffledWords.length) return 0;
        return next;
      });
    }, 60);
  };

  const shuffle = () => {
    const shuffled = [...shuffledWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleGrade = (grade: SM2Grade) => {
    if (!word) return;
    gradeWord(word.id, grade);

    // If reached end of deck, fire confetti
    if (currentIndex >= shuffledWords.length - 1) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF5500', '#2563EB', '#E11D48', '#059669', '#FBBF24'],
        });
      } catch {
        // safely ignore
      }
    }
    navigate(1);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
      } else if (e.key === '1') {
        handleGrade(0);
      } else if (e.key === '2') {
        handleGrade(1);
      } else if (e.key === '3') {
        handleGrade(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [word, currentIndex, shuffledWords.length]);

  if (!word) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl block mb-4">📭</span>
        <h2 className="font-['Fraunces'] text-2xl font-bold mb-2">No words found for {state.currentLevel}</h2>
        <p className="opacity-60 text-sm font-['Fredoka']">Add custom words or switch CEFR levels in the top navigation bar!</p>
      </div>
    );
  }

  const article = getArticleDisplay(word.gender);
  const mastery = state.sm2Data[word.id] ? getMasteryLevel(state.sm2Data[word.id]) : 'new';

  const triggerAudio = (text: string, speed: number = 1.0) => {
    setSpeakingWord(true);
    speakGerman(text, speed, state.audioMuted);
    setTimeout(() => setSpeakingWord(false), 1200);
  };

  // Synesthetic Gender Aura Theme
  const getGenderAuraClass = () => {
    if (word.gender === 'der') return 'gender-aura-der';
    if (word.gender === 'die') return 'gender-aura-die';
    if (word.gender === 'das') return 'gender-aura-das';
    return 'gender-aura-verb';
  };

  const getGenderBadge = () => {
    if (word.gender === 'der') {
      return (
        <span className="vinyl-sticker px-3 py-1 bg-blue-600 text-white text-[11px] font-black tracking-wider uppercase rotate-[-2deg]">
          DER • MASC 🔵
        </span>
      );
    }
    if (word.gender === 'die') {
      return (
        <span className="vinyl-sticker px-3 py-1 bg-rose-600 text-white text-[11px] font-black tracking-wider uppercase rotate-[2deg]">
          DIE • FEM 🔴
        </span>
      );
    }
    if (word.gender === 'das') {
      return (
        <span className="vinyl-sticker px-3 py-1 bg-emerald-600 text-white text-[11px] font-black tracking-wider uppercase rotate-[-1deg]">
          DAS • NEUT 🟢
        </span>
      );
    }
    return (
      <span className="vinyl-sticker px-3 py-1 bg-amber-500 text-white text-[11px] font-black tracking-wider uppercase rotate-[1deg]">
        VERB • ACTION ⚡
      </span>
    );
  };

  const getMasteryColor = () => {
    if (mastery === 'mastered') return 'bg-emerald-500 text-white';
    if (mastery === 'reviewing' || mastery === 'learning') return 'bg-blue-500 text-white';
    return 'bg-amber-400 text-amber-950';
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-['Fraunces'] text-2xl sm:text-3xl font-black tracking-tight text-[#18181B] dark:text-white">
              Collectible Flashcards
            </h2>
            <span className="text-2xl animate-bounce">🃏</span>
          </div>
          <p className="text-xs sm:text-sm font-['Fredoka'] opacity-75 font-semibold text-[#18181B] dark:text-slate-300">
            Card {currentIndex + 1} of {shuffledWords.length} · Level {state.currentLevel}
          </p>
        </div>

        <button
          onClick={shuffle}
          className="tactile-btn tactile-btn-neutral flex items-center gap-2 px-3.5 py-2 text-xs"
          title="Randomly shuffle the deck"
        >
          <Shuffle size={15} />
          <span>Shuffle Deck</span>
        </button>
      </div>

      {/* Candy-Cane Progress Track */}
      <div className="w-full bg-[#18181B]/10 dark:bg-black/50 h-3 rounded-full border-2 border-[#18181B] dark:border-[#2E3245] overflow-hidden p-0.5 shadow-[0px_2px_0px_#18181B] dark:shadow-[0px_2px_0px_#090A0F]">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full progress-candy-cane"
          animate={{ width: `${((currentIndex + 1) / shuffledWords.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 3D Collectible Trading Card Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={word.id}
          initial={{ opacity: 0, x: direction * 90, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -direction * 90, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-full"
        >
          <div
            className="flip-card cursor-pointer"
            style={{ minHeight: '440px' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* ================= CARD FRONT (Collectible Sticker Card) ================= */}
              <div
                className={`flip-card-front rounded-[28px] p-6 sm:p-7 flex flex-col items-center justify-between text-center select-none ${getGenderAuraClass()}`}
              >
                {/* Top Vinyl Stickers */}
                <div className="w-full flex items-center justify-between">
                  {/* Holographic CEFR Level Badge */}
                  <span className="vinyl-sticker ring-4 ring-white dark:ring-[#1E202B] px-3.5 py-1 bg-amber-400 text-amber-950 text-xs font-black rotate-[-3deg] shadow-md tracking-wider">
                    ★ {word.level}
                  </span>

                  {/* Gender Stamp */}
                  {getGenderBadge()}

                  {/* Mastery Pill */}
                  <span className={`vinyl-sticker px-2.5 py-0.5 text-[10px] font-black uppercase rotate-[2deg] ${getMasteryColor()}`}>
                    {mastery}
                  </span>
                </div>

                {/* Central Framed Illustration Stage */}
                <div className="my-auto py-3 w-full flex flex-col items-center">
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-3xl bg-white/75 dark:bg-[#12141D] border-2 border-[#18181B] dark:border-[#383E58] shadow-[inset_0px_3px_6px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 overflow-hidden">
                    {/* SVG Sparkle Accents */}
                    <svg className="absolute top-2 left-2 w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" viewBox="0 0 24 24">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                    <svg className="absolute bottom-2 right-2 w-4 h-4 text-orange-400 fill-orange-400 animate-ping opacity-60" viewBox="0 0 24 24">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>

                    {/* Giant Floating Emoji */}
                    <div className="text-7xl sm:text-8xl select-none animate-float drop-shadow-md">
                      {word.emoji}
                    </div>

                    {/* Corner DiceBear Companion Avatar */}
                    <img
                      src={`https://api.dicebear.com/9.x/bottts/svg?seed=${word.german}&backgroundColor=transparent`}
                      alt="Avatar"
                      className="absolute bottom-1 left-1 w-8 h-8 opacity-80 pointer-events-none drop-shadow"
                    />
                  </div>

                  {/* German Word with Chunky Typography */}
                  <div className="mt-4">
                    {article && (
                      <span
                        className={`text-2xl sm:text-3xl font-['Fredoka'] font-black uppercase mr-2 ${
                          word.gender === 'der'
                            ? 'text-blue-600 dark:text-blue-300'
                            : word.gender === 'die'
                            ? 'text-rose-600 dark:text-rose-300'
                            : 'text-emerald-600 dark:text-emerald-300'
                        }`}
                      >
                        {article}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-['Fraunces'] font-black tracking-tight text-[#18181B] dark:text-white">
                      {word.german}
                    </span>
                  </div>

                  {word.plural && (
                    <p className="text-xs sm:text-sm font-['Space_Mono'] opacity-80 font-bold mt-1 bg-white/70 dark:bg-black/50 px-3 py-0.5 rounded-full border border-[#18181B]/20 dark:border-white/20 text-[#18181B] dark:text-slate-200">
                      Plural: die {word.plural}
                    </p>
                  )}
                </div>

                {/* Bottom Pronunciation Controls & Audio */}
                <div className="w-full space-y-2">
                  <div
                    className="flex items-center justify-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => triggerAudio(`${article || ''} ${word.german}`, 1.0)}
                      className="tactile-btn tactile-btn-neutral flex items-center gap-2 px-4 py-2 text-xs"
                      title="Normal German pronunciation speed"
                    >
                      <Volume2 size={16} className={speakingWord ? 'text-orange-500 animate-spin' : ''} />
                      <span>1.0x Audio</span>
                    </button>

                    <button
                      onClick={() => triggerAudio(`${article || ''} ${word.german}`, 0.75)}
                      className="tactile-btn tactile-btn-neutral flex items-center gap-2 px-4 py-2 text-xs"
                      title="Slow German pronunciation for precise listening"
                    >
                      <Turtle size={16} />
                      <span>0.75x Slow</span>
                    </button>
                  </div>

                  <p className="text-[11px] font-['Fredoka'] opacity-65 font-bold text-[#18181B] dark:text-slate-300">
                    Click card or press <span className="font-['Space_Mono'] bg-white/80 dark:bg-black/40 px-1.5 py-0.5 rounded border border-[#18181B]/30 dark:border-white/20">Space</span> to flip
                  </p>
                </div>
              </div>

              {/* ================= CARD BACK (Polaroid / Memory Hook) ================= */}
              <div
                className={`flip-card-back rounded-[28px] p-6 sm:p-7 flex flex-col items-center justify-between text-center select-none ${getGenderAuraClass()}`}
              >
                {/* Back Top Ribbon */}
                <div className="w-full flex items-center justify-between">
                  <span className="vinyl-sticker px-3 py-1 bg-orange-500 text-white text-[11px] font-black uppercase rotate-[-2deg]">
                    MEANING & CONTEXT 💡
                  </span>
                  <span className="font-['Fredoka'] font-bold text-xs opacity-80 text-[#18181B] dark:text-white">
                    {article ? `${article} ` : ''}{word.german}
                  </span>
                </div>

                {/* English Translation & Polaroid Sticky Note */}
                <div className="my-auto py-2 space-y-3.5 w-full">
                  <div>
                    <span className="text-[10px] font-['Space_Mono'] font-bold uppercase tracking-wider opacity-65 text-[#18181B] dark:text-slate-300">
                      English Translation
                    </span>
                    <h3 className="font-['Fraunces'] text-3xl sm:text-4xl font-black text-[#18181B] dark:text-white mt-0.5">
                      {word.english}
                    </h3>
                  </div>

                  {/* Polaroid Yellow Sticky Mnemonic Note (Warm yellow in both modes for authentic paper look) */}
                  {word.mnemonic && (
                    <div className="relative p-4 rounded-2xl bg-[#FEF08A] text-[#713F12] border-2 border-[#18181B] shadow-[0px_4px_0px_#18181B] dark:shadow-[0px_4px_0px_#090A0F] rotate-[1deg] text-left transition-transform hover:rotate-0">
                      {/* Red Pushpin Icon */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border-2 border-[#18181B] shadow flex items-center justify-center text-white text-xs">
                        📌
                      </div>

                      <p className="font-['Fredoka'] font-black text-xs flex items-center gap-1.5 mb-1 pt-1 text-[#854D0E]">
                        <Sparkles size={14} /> Mnemonic Memory Story:
                      </p>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold leading-relaxed">
                        {word.mnemonic}
                      </p>
                    </div>
                  )}

                  {/* German in Context Example */}
                  <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-[#12141D] border-2 border-[#18181B] dark:border-[#383E58] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-['Fraunces'] font-bold text-sm text-[#18181B] dark:text-white">
                        "{word.exampleDe}"
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerAudio(word.exampleDe, 0.9);
                        }}
                        className="p-1 rounded-lg text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950 transition-colors"
                        title="Listen to example sentence"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-600 dark:text-slate-300 font-medium">
                      "{word.exampleEn}"
                    </p>
                  </div>
                </div>

                <p className="text-[11px] font-['Fredoka'] opacity-65 font-bold text-[#18181B] dark:text-slate-300">
                  Tap card to flip back ↺
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrow Controls */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={() => navigate(-1)}
          className="tactile-btn tactile-btn-neutral p-3"
          title="Previous Card (←)"
          aria-label="Previous card"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="tactile-btn tactile-btn-neutral px-5 py-2.5 text-xs flex items-center gap-2"
        >
          <RotateCcw size={16} />
          <span>Flip Card</span>
        </button>

        <button
          onClick={() => navigate(1)}
          className="tactile-btn tactile-btn-neutral p-3"
          title="Next Card (→)"
          aria-label="Next card"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Tactile Keycap SM-2 Spaced Repetition Buttons */}
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleGrade(0)}
            className="tactile-btn tactile-btn-rose py-3 px-2 flex flex-col items-center justify-center gap-0.5"
            title="Press '1' on keyboard"
          >
            <span className="text-sm">Hard 😓</span>
            <span className="text-[10px] font-['Space_Mono'] opacity-90 font-bold">[Key 1]</span>
          </button>

          <button
            onClick={() => handleGrade(1)}
            className="tactile-btn tactile-btn-blue py-3 px-2 flex flex-col items-center justify-center gap-0.5"
            title="Press '2' on keyboard"
          >
            <span className="text-sm">Good 🙂</span>
            <span className="text-[10px] font-['Space_Mono'] opacity-90 font-bold">[Key 2]</span>
          </button>

          <button
            onClick={() => handleGrade(2)}
            className="tactile-btn tactile-btn-emerald py-3 px-2 flex flex-col items-center justify-center gap-0.5"
            title="Press '3' on keyboard"
          >
            <span className="text-sm">Easy 🚀</span>
            <span className="text-[10px] font-['Space_Mono'] opacity-90 font-bold">[Key 3]</span>
          </button>
        </div>
        <p className="text-[11px] text-center font-['Fredoka'] opacity-65 font-semibold text-[#18181B] dark:text-slate-300">
          Keyboard Shortcuts: <span className="font-['Space_Mono']">1</span> Hard · <span className="font-['Space_Mono']">2</span> Good · <span className="font-['Space_Mono']">3</span> Easy · <span className="font-['Space_Mono']">Space</span> Flip
        </p>
      </div>
    </div>
  );
}
