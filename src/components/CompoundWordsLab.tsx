// ============================================================
// Lego Compound Word Splitter — Komposita-Labor
// The Last Word Rule 👑 & Visual Tactile Puzzle Blocks
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles, Crown, ArrowRight, Layers, Split, CheckCircle2, RotateCcw } from 'lucide-react';
import { speakGerman } from '../utils/audio';
import { playClick, playFlip, playSuccess, playError } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface CompoundBlock {
  word: string;
  article: 'der' | 'die' | 'das' | '';
  meaning: string;
  emoji: string;
  isLastWord?: boolean;
}

interface CompoundWordItem {
  id: string;
  fullWord: string;
  article: 'der' | 'die' | 'das';
  english: string;
  emoji: string;
  funFact: string;
  blocks: CompoundBlock[];
}

const COMPOUND_WORDS: CompoundWordItem[] = [
  {
    id: 'handschuh',
    fullWord: 'Handschuh',
    article: 'der',
    english: 'Glove (literally: "Hand Shoe")',
    emoji: '🧤',
    funFact: 'Germans literally call gloves "hand-shoes"!',
    blocks: [
      { word: 'Hand', article: 'die', meaning: 'Hand', emoji: '✋' },
      { word: 'Schuh', article: 'der', meaning: 'Shoe', emoji: '👟', isLastWord: true },
    ],
  },
  {
    id: 'kuehlschrank',
    fullWord: 'Kühlschrank',
    article: 'der',
    english: 'Refrigerator (literally: "Cool Cupboard")',
    emoji: '❄️',
    funFact: 'A cupboard (Schrank) that keeps things cool (kühl).',
    blocks: [
      { word: 'kühl', article: '', meaning: 'Cool', emoji: '🧊' },
      { word: 'Schrank', article: 'der', meaning: 'Cupboard / Wardrobe', emoji: '🚪', isLastWord: true },
    ],
  },
  {
    id: 'schildkroete',
    fullWord: 'Schildkröte',
    article: 'die',
    english: 'Turtle / Tortoise (literally: "Shield Toad")',
    emoji: '🐢',
    funFact: 'A toad with a shield strapped to its back!',
    blocks: [
      { word: 'Schild', article: 'das', meaning: 'Shield', emoji: '🛡️' },
      { word: 'Kröte', article: 'die', meaning: 'Toad', emoji: '🐸', isLastWord: true },
    ],
  },
  {
    id: 'krankenwagen',
    fullWord: 'Krankenwagen',
    article: 'der',
    english: 'Ambulance (literally: "Sick People Wagon")',
    emoji: '🚑',
    funFact: 'Wagen is masculine, so every car, cart, or ambulance is "der".',
    blocks: [
      { word: 'Kranken', article: 'die', meaning: 'Sick people', emoji: '🤒' },
      { word: 'Wagen', article: 'der', meaning: 'Wagon / Car', emoji: '🚗', isLastWord: true },
    ],
  },
  {
    id: 'gluehbirne',
    fullWord: 'Glühbirne',
    article: 'die',
    english: 'Lightbulb (literally: "Glow Pear")',
    emoji: '💡',
    funFact: 'Because original lightbulbs were shaped like glowing pears!',
    blocks: [
      { word: 'glüh', article: '', meaning: 'Glow / Embers', emoji: '🔥' },
      { word: 'Birne', article: 'die', meaning: 'Pear', emoji: '🍐', isLastWord: true },
    ],
  },
  {
    id: 'faultier',
    fullWord: 'Faultier',
    article: 'das',
    english: 'Sloth (literally: "Lazy Animal")',
    emoji: '🦥',
    funFact: 'The most honest name in the animal kingdom.',
    blocks: [
      { word: 'faul', article: '', meaning: 'Lazy', emoji: '😴' },
      { word: 'Tier', article: 'das', meaning: 'Animal', emoji: '🐾', isLastWord: true },
    ],
  },
  {
    id: 'feierabend',
    fullWord: 'Feierabend',
    article: 'der',
    english: 'End of the workday (literally: "Celebration Evening")',
    emoji: '🍺',
    funFact: 'Sacred German ritual: the minute work ends, you celebrate!',
    blocks: [
      { word: 'Feier', article: 'die', meaning: 'Celebration / Party', emoji: '🎉' },
      { word: 'Abend', article: 'der', meaning: 'Evening', emoji: '🌇', isLastWord: true },
    ],
  },
  {
    id: 'kummerspeck',
    fullWord: 'Kummerspeck',
    article: 'der',
    english: 'Comfort weight gain (literally: "Grief Bacon")',
    emoji: '🥓',
    funFact: 'The pounds you put on from emotional overeating during tough times.',
    blocks: [
      { word: 'Kummer', article: 'der', meaning: 'Grief / Sorrow', emoji: '😢' },
      { word: 'Speck', article: 'der', meaning: 'Bacon / Fat', emoji: '🥓', isLastWord: true },
    ],
  },
  {
    id: 'staubsauger',
    fullWord: 'Staubsauger',
    article: 'der',
    english: 'Vacuum cleaner (literally: "Dust Sucker")',
    emoji: '🧹',
    funFact: 'It sucks (saugt) dust (Staub). Simple and mechanical.',
    blocks: [
      { word: 'Staub', article: 'der', meaning: 'Dust', emoji: '💨' },
      { word: 'Sauger', article: 'der', meaning: 'Sucker', emoji: '🌪️', isLastWord: true },
    ],
  },
  {
    id: 'flugzeug',
    fullWord: 'Flugzeug',
    article: 'das',
    english: 'Airplane (literally: "Flight Stuff/Gear")',
    emoji: '✈️',
    funFact: '"Zeug" means stuff or gear. Germans use it for vehicle tools!',
    blocks: [
      { word: 'Flug', article: 'der', meaning: 'Flight', emoji: '🛫' },
      { word: 'Zeug', article: 'das', meaning: 'Thing / Gear', emoji: '⚙️', isLastWord: true },
    ],
  },
  {
    id: 'zahnarzt',
    fullWord: 'Zahnarzt',
    article: 'der',
    english: 'Dentist (literally: "Tooth Doctor")',
    emoji: '🦷',
    funFact: 'Combine any body part with "Arzt" to get the specialist!',
    blocks: [
      { word: 'Zahn', article: 'der', meaning: 'Tooth', emoji: '🦷' },
      { word: 'Arzt', article: 'der', meaning: 'Doctor', emoji: '🩺', isLastWord: true },
    ],
  },
  {
    id: 'fahrkarte',
    fullWord: 'Fahrkarte',
    article: 'die',
    english: 'Transit Ticket (literally: "Travel Card")',
    emoji: '🎟️',
    funFact: 'Karte is feminine ("die"), so all cards (Bankkarte, Kreditkarte) are "die".',
    blocks: [
      { word: 'Fahr', article: '', meaning: 'Drive / Travel', emoji: '🚆' },
      { word: 'Karte', article: 'die', meaning: 'Card / Ticket', emoji: '💳', isLastWord: true },
    ],
  },
  {
    id: 'regenschirm',
    fullWord: 'Regenschirm',
    article: 'der',
    english: 'Umbrella (literally: "Rain Shield")',
    emoji: '☔',
    funFact: 'Schirm means umbrella/shield. Fallschirm = Parachute ("Fall shield")!',
    blocks: [
      { word: 'Regen', article: 'der', meaning: 'Rain', emoji: '🌧️' },
      { word: 'Schirm', article: 'der', meaning: 'Screen / Canopy', emoji: '☂️', isLastWord: true },
    ],
  },
  {
    id: 'sonnenbrille',
    fullWord: 'Sonnenbrille',
    article: 'die',
    english: 'Sunglasses (literally: "Sun Glasses")',
    emoji: '🕶️',
    funFact: 'Brille is always feminine, so sunglasses inherit "die".',
    blocks: [
      { word: 'Sonnen', article: 'die', meaning: 'Sun', emoji: '☀️' },
      { word: 'Brille', article: 'die', meaning: 'Eyeglasses', emoji: '👓', isLastWord: true },
    ],
  },
];

type Props = {
  game?: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

export default function CompoundWordsLab({ game }: Props) {
  const addXP = game?.addXP || (() => {});
  const audioMuted = game?.state?.audioMuted || false;
  const [selectedWordId, setSelectedWordId] = useState<string>(COMPOUND_WORDS[0].id);
  const [isSplit, setIsSplit] = useState<Record<string, boolean>>({ [COMPOUND_WORDS[0].id]: true });
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'explorer' | 'quiz'>('explorer');

  const selectedWord = COMPOUND_WORDS.find((w) => w.id === selectedWordId) || COMPOUND_WORDS[0];

  const toggleSplit = (id: string) => {
    playFlip();
    setIsSplit((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getArticleStyles = (article: string) => {
    switch (article) {
      case 'der':
        return 'bg-blue-500 text-white border-blue-600 shadow-[0_3px_0_0_#1D4ED8]';
      case 'die':
        return 'bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#BE123C]';
      case 'das':
        return 'bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#047857]';
      default:
        return 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600';
    }
  };

  const handleQuizAnswer = (chosenArticle: 'der' | 'die' | 'das') => {
    if (quizAnswered) return;
    const currentQuizItem = COMPOUND_WORDS[quizIndex];
    setQuizAnswered(true);

    if (chosenArticle === currentQuizItem.article) {
      playSuccess();
      setQuizScore((prev) => prev + 15);
      addXP(15);
      try {
        confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
      } catch {}
    } else {
      playError();
    }
  };

  const nextQuizQuestion = () => {
    playClick();
    setQuizAnswered(false);
    setQuizIndex((prev) => (prev + 1) % COMPOUND_WORDS.length);
  };

  const currentQuizItem = COMPOUND_WORDS[quizIndex];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="tactile-card p-6 sm:p-8 bg-[#FAF8F5] dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FF4A00]/10 text-[#FF4A00] border border-[#FF4A00]/20">
              <Layers size={14} />
              <span>KOMPOSITA-LABOR · LEGO SYNTAX</span>
            </div>

            <h1 className="font-['Fraunces'] text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Compound Word Splitter 🧱
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base opacity-80 max-w-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              German is famous for stacking words together like Lego blocks. Click any word to split it apart and see how the <strong className="text-[#FF4A00]">Last Word Rule 👑</strong> always dictates the gender!
            </p>
          </div>

          {/* Golden Crown Last Word Rule Banner */}
          <div className="p-4 rounded-2xl border-2 border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/40 shadow-[0_3px_0_0_#D97706] text-amber-900 dark:text-amber-200 shrink-0 max-w-xs">
            <div className="flex items-center gap-2 text-xs font-black uppercase mb-1">
              <Crown size={18} className="text-amber-500 fill-amber-500" />
              <span>The Last Word Rule</span>
            </div>
            <p className="text-xs leading-relaxed font-semibold">
              The <strong>very last block</strong> of any German compound noun crowns the entire word with its gender and plural!
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-200 dark:border-[#2E3245]">
          <button
            onClick={() => {
              playClick();
              setActiveTab('explorer');
            }}
            className={`tactile-btn px-4 py-2 text-xs font-black ${
              activeTab === 'explorer' ? 'tactile-btn-primary' : 'tactile-btn-neutral'
            }`}
          >
            Lego Word Explorer 🔍
          </button>
          <button
            onClick={() => {
              playClick();
              setActiveTab('quiz');
            }}
            className={`tactile-btn px-4 py-2 text-xs font-black ${
              activeTab === 'quiz' ? 'tactile-btn-primary' : 'tactile-btn-neutral'
            }`}
          >
            Crown Gender Quiz 👑
          </button>
        </div>
      </div>

      {activeTab === 'explorer' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Word Selector Grid */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select a Compound Word ({COMPOUND_WORDS.length}):
            </p>
            {COMPOUND_WORDS.map((item) => {
              const isSelected = selectedWordId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClick();
                    setSelectedWordId(item.id);
                    setIsSplit((prev) => ({ ...prev, [item.id]: true }));
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#FF4A00] bg-[#FF4A00]/10 dark:bg-[#FF4A00]/15 shadow-[0_3px_0_0_#FF4A00] translate-x-1'
                      : 'bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] hover:border-[#FF4A00] shadow-[0_2px_0_0_#000] dark:shadow-[0_2px_0_0_#090A0F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 rounded-xl bg-slate-100 dark:bg-[#252837] border border-black/10 dark:border-[#353A50]">
                      {item.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${getArticleStyles(item.article)}`}>
                          {item.article}
                        </span>
                        <span className="font-['Fredoka'] font-bold text-base text-slate-900 dark:text-white">
                          {item.fullWord}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                        {item.english}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    {item.blocks.length} blocks
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Lego Splitter Stage */}
          <div className="lg:col-span-7">
            <div className="tactile-card p-6 sm:p-8 space-y-6 bg-white dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-[#2E3245] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-3 rounded-2xl bg-[#FF4A00]/10 border-2 border-black dark:border-[#2E3245]">
                    {selectedWord.emoji}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-md border ${getArticleStyles(selectedWord.article)}`}>
                        {selectedWord.article}
                      </span>
                      <span className="font-['Fraunces'] text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        {selectedWord.fullWord}
                      </span>
                      <button
                        onClick={() => speakGerman(`${selectedWord.article} ${selectedWord.fullWord}`, 0.9, audioMuted)}
                        className="p-1.5 rounded-xl hover:bg-[#FF4A00]/10 text-[#FF4A00] transition-colors"
                        title="Listen to full German compound word"
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                      {selectedWord.english}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSplit(selectedWord.id)}
                  className="tactile-btn tactile-btn-neutral px-3.5 py-2 text-xs font-black flex items-center gap-1.5"
                >
                  <Split size={14} />
                  <span>{isSplit[selectedWord.id] ? 'Snap Together' : 'Split Blocks'}</span>
                </button>
              </div>

              {/* The Interactive Lego Block Stage */}
              <div className="py-6 px-4 rounded-3xl border-2 border-dashed border-black/20 dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#161822] text-center space-y-4">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {isSplit[selectedWord.id] ? 'Split Lego Architecture' : 'Click "Split Blocks" to separate parts'}
                </p>

                <AnimatePresence mode="wait">
                  {isSplit[selectedWord.id] ? (
                    <motion.div
                      key="split-blocks"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4"
                    >
                      {selectedWord.blocks.map((block, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`relative p-4 rounded-2xl border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F] text-center min-w-[120px] transition-transform ${
                              block.isLastWord
                                ? `${getArticleStyles(selectedWord.article)}`
                                : 'bg-white dark:bg-[#1E202B] text-slate-900 dark:text-white'
                            }`}
                          >
                            {/* Crown for the Last Word */}
                            {block.isLastWord && (
                              <div
                                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 border border-black font-black text-[10px] flex items-center gap-1 shadow-sm"
                                title="Crown Rule: Determines the gender of the entire word!"
                              >
                                <Crown size={12} className="fill-amber-950" />
                                <span>CROWNS GENDER</span>
                              </div>
                            )}

                            <span className="text-2xl block mb-1">{block.emoji}</span>

                            <div className="flex items-center justify-center gap-1">
                              {block.article && (
                                <span className="text-[10px] uppercase font-bold opacity-80">
                                  {block.article}
                                </span>
                              )}
                              <span className="font-['Fredoka'] font-black text-lg">
                                {block.word}
                              </span>
                            </div>

                            <p className="text-xs opacity-75 font-medium mt-0.5">
                              {block.meaning}
                            </p>

                            <button
                              onClick={() => speakGerman(block.word, 0.9, audioMuted)}
                              className="mt-2 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-xs inline-flex items-center gap-1 font-bold"
                              title="Listen to this block"
                            >
                              <Volume2 size={12} />
                              <span>Listen</span>
                            </button>
                          </motion.div>

                          {idx < selectedWord.blocks.length - 1 && (
                            <span className="font-black text-2xl text-[#FF4A00]">+</span>
                          )}
                        </div>
                      ))}

                      <span className="font-black text-2xl text-slate-400">=</span>

                      {/* Resulting Full Compound Word */}
                      <div className="p-4 rounded-2xl border-2 border-black dark:border-[#2E3245] bg-[#FF4A00]/10 text-slate-900 dark:text-white shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F] text-center min-w-[130px]">
                        <span className="text-2xl block mb-1">{selectedWord.emoji}</span>
                        <div className="flex items-center justify-center gap-1">
                          <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${getArticleStyles(selectedWord.article)}`}>
                            {selectedWord.article}
                          </span>
                          <span className="font-['Fredoka'] font-black text-lg">
                            {selectedWord.fullWord}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5">
                          {selectedWord.english.split('(')[0]}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="merged-block"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="py-8"
                    >
                      <button
                        onClick={() => toggleSplit(selectedWord.id)}
                        className={`tactile-btn px-8 py-5 text-xl font-black rounded-3xl ${getArticleStyles(selectedWord.article)}`}
                      >
                        {selectedWord.article} {selectedWord.fullWord} {selectedWord.emoji}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cultural Fun Fact */}
              <div className="p-4 rounded-2xl border-2 border-black/10 dark:border-[#2E3245] bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 text-xs sm:text-sm font-medium flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 text-xs mb-0.5">
                    Linguistic Memory Anchor
                  </p>
                  <p>{selectedWord.funFact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Crown Gender Quiz Tab */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="tactile-card p-6 sm:p-8 text-center space-y-6 bg-white dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              <span>Question {quizIndex + 1} of {COMPOUND_WORDS.length}</span>
              <span className="text-[#FF4A00] font-black">Score: {quizScore} XP</span>
            </div>

            <div className="py-4">
              <span className="text-5xl block mb-3">{currentQuizItem.emoji}</span>
              <p className="text-xs uppercase font-black text-slate-400 mb-1">Which article belongs to this word?</p>
              <h2 className="font-['Fraunces'] text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                _____ {currentQuizItem.fullWord}
              </h2>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2">
                Meaning: "{currentQuizItem.english}"
              </p>

              {/* Clue: Show last word */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
                <Crown size={14} className="text-amber-500" />
                <span>Tip: Look at the last block "{currentQuizItem.blocks[currentQuizItem.blocks.length - 1].word}"!</span>
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {(['der', 'die', 'das'] as const).map((art) => {
                const isCorrect = art === currentQuizItem.article;
                return (
                  <button
                    key={art}
                    onClick={() => handleQuizAnswer(art)}
                    disabled={quizAnswered}
                    className={`tactile-btn py-4 text-base font-black rounded-2xl uppercase ${
                      art === 'der'
                        ? 'tactile-btn-blue'
                        : art === 'die'
                        ? 'tactile-btn-pink'
                        : 'tactile-btn-emerald'
                    }`}
                  >
                    {art}
                  </button>
                );
              })}
            </div>

            {/* Feedback and Explanation */}
            {quizAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl border-2 border-black/10 dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#181A24] space-y-3 text-left text-xs"
              >
                <div className="flex items-center gap-2 font-black text-sm">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="text-slate-900 dark:text-white">
                    Correct: <strong className="uppercase text-[#FF4A00]">{currentQuizItem.article}</strong> {currentQuizItem.fullWord}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Because the last word is <strong>{currentQuizItem.blocks[currentQuizItem.blocks.length - 1].article} {currentQuizItem.blocks[currentQuizItem.blocks.length - 1].word}</strong>, the compound word takes <strong className="uppercase">{currentQuizItem.article}</strong>.
                </p>

                <button
                  onClick={nextQuizQuestion}
                  className="tactile-btn tactile-btn-primary w-full py-3 text-xs font-black flex items-center justify-center gap-2"
                >
                  <span>Next Challenge</span>
                  <ArrowRight size={15} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
