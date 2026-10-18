// ============================================================
// Weak Words Vault — Practice and Master Challenging Vocab
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Volume2,
  CheckCircle2,
  Search,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Filter,
} from 'lucide-react';
import { vocabularyData } from '../data/germanCurriculum';
import { speakGerman } from '../utils/audio';
import { VocabItem, CEFRLevel } from '../types';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

export default function WeakWordsVault({ game }: Props) {
  const { state, gradeWord } = game;
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Combine curriculum and custom words
  const allVocabMap = useMemo(() => {
    const map = new Map<string, VocabItem>();
    vocabularyData.forEach((w) => map.set(w.id, w));
    state.customWords.forEach((w) => map.set(w.id, w));
    return map;
  }, [state.customWords]);

  // Find all weak words currently recorded in state
  const weakWordList = useMemo(() => {
    const list: VocabItem[] = [];
    state.weakWords.forEach((id) => {
      const item = allVocabMap.get(id);
      if (item) list.push(item);
    });
    return list;
  }, [state.weakWords, allVocabMap]);

  // Filtered weak words
  const filteredWords = useMemo(() => {
    return weakWordList.filter((w) => {
      const matchesLevel = selectedLevel === 'ALL' || w.level === selectedLevel;
      const matchesSearch =
        search === '' ||
        w.german.toLowerCase().includes(search.toLowerCase()) ||
        w.english.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [weakWordList, selectedLevel, search]);

  const currentPracticeWord = filteredWords[practiceIndex] || null;

  const handlePracticeGrade = (grade: 0 | 1 | 2) => {
    if (!currentPracticeWord) return;
    gradeWord(currentPracticeWord.id, grade);
    setRevealed(false);
    if (practiceIndex >= filteredWords.length - 1) {
      setPracticeIndex(0);
      setPracticeMode(false);
    } else {
      setPracticeIndex((prev) => prev + 1);
    }
  };

  const getGenderColor = (gender?: string) => {
    switch (gender) {
      case 'der':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'die':
        return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'das':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="tactile-card p-6 border-2 transition-colors bg-[#FAF8F5] dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 border-2 border-black dark:border-[#2E3245] flex items-center justify-center text-3xl shrink-0 shadow-sm">
              🔥
            </div>
            <div>
              <h1 className="font-['Fraunces'] text-2xl sm:text-3xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
                Weak Words Vault
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {weakWordList.length} {weakWordList.length === 1 ? 'Word' : 'Words'}
                </span>
              </h1>
              <p className="text-sm font-medium opacity-80 mt-0.5 text-slate-700 dark:text-slate-300">
                Target words you missed in flashcards and quizzes until they become second nature.
              </p>
            </div>
          </div>

          {weakWordList.length > 0 && !practiceMode && (
            <button
              onClick={() => {
                setPracticeMode(true);
                setPracticeIndex(0);
                setRevealed(false);
              }}
              className="tactile-btn tactile-btn-primary flex items-center justify-center gap-2 px-5 py-3 text-sm font-black"
            >
              <Sparkles size={18} />
              <span>Drill Vault ({filteredWords.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Drill Mode View */}
      {practiceMode && currentPracticeWord ? (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-70">
              Drilling {practiceIndex + 1} of {filteredWords.length}
            </span>
            <button
              onClick={() => {
                setPracticeMode(false);
                setRevealed(false);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:opacity-80 transition-opacity"
            >
              Exit Practice
            </button>
          </div>

          <div
            className={`rounded-2xl p-8 border-2 text-center transition-all shadow-lg ${
              state.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-5xl mb-4">{currentPracticeWord.emoji}</div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border ${getGenderColor(
                  currentPracticeWord.gender
                )}`}
              >
                {currentPracticeWord.gender && currentPracticeWord.gender !== 'none'
                  ? currentPracticeWord.gender
                  : currentPracticeWord.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold opacity-75">
                {currentPracticeWord.level}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 my-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-[Fredoka] text-orange-500">
                {currentPracticeWord.german}
              </h2>
              <button
                onClick={() => speakGerman(currentPracticeWord.german, 1.0, state.audioMuted)}
                className="p-2 rounded-full hover:bg-orange-500/10 text-orange-500 transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 size={24} />
              </button>
            </div>

            {currentPracticeWord.plural && (
              <p className="text-sm opacity-60 mb-4">Plural: {currentPracticeWord.plural}</p>
            )}

            <AnimatePresence>
              {revealed ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4"
                >
                  <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                    {currentPracticeWord.english}
                  </p>

                  {currentPracticeWord.mnemonic && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                      <span className="font-bold">💡 Mnemonic: </span>
                      {currentPracticeWord.mnemonic}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-xs space-y-1 text-left">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      "{currentPracticeWord.exampleDe}"
                    </p>
                    <p className="opacity-60">"{currentPracticeWord.exampleEn}"</p>
                  </div>

                  <div className="pt-2 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handlePracticeGrade(0)}
                      className="py-2.5 px-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20 hover:bg-rose-500/20 transition-all text-xs"
                    >
                      Still Weak (0)
                    </button>
                    <button
                      onClick={() => handlePracticeGrade(1)}
                      className="py-2.5 px-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20 hover:bg-amber-500/20 transition-all text-xs"
                    >
                      Getting It (1)
                    </button>
                    <button
                      onClick={() => handlePracticeGrade(2)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 hover:bg-emerald-500/20 transition-all text-xs"
                    >
                      Mastered! (2)
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full mt-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Reveal Meaning & Examples
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* List & Search View */
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search weak words in German or English..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border-2 border-black dark:border-[#2E3245] bg-white dark:bg-[#181A24] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#FF4A00] dark:focus:border-[#FF4A00] shadow-[0_2px_0_0_#000] dark:shadow-[0_2px_0_0_#090A0F]"
              />
            </div>

            <div className="flex items-center gap-1.5 self-start">
              <Filter size={16} className="opacity-50 mr-1" />
              {(['ALL', 'A1', 'A2', 'B1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all border-2 ${
                    selectedLevel === lvl
                      ? 'bg-[#FF4A00] text-white border-black dark:border-[#FF4A00] shadow-[0_2px_0_0_#000]'
                      : 'bg-white dark:bg-[#181A24] border-black dark:border-[#2E3245] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252837]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {weakWordList.length === 0 ? (
            <div
              className="tactile-card p-12 text-center border-2 border-dashed border-black dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#1E202B]"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="font-['Fraunces'] text-2xl font-black mb-2 text-slate-900 dark:text-white">
                No Weak Words Yet!
              </h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                Your vault is completely empty. As you take quizzes and study flashcards, any
                words you struggle with will be automatically filed here for focused review.
              </p>
            </div>
          ) : filteredWords.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p>No weak words match your search or level filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((word) => (
                <div
                  key={word.id}
                  className="tactile-card p-4 border-2 transition-all hover:scale-[1.01] bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F]"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{word.emoji}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border ${getGenderColor(
                          word.gender
                        )}`}
                      >
                        {word.gender && word.gender !== 'none' ? word.gender : word.category}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#252837] text-slate-700 dark:text-slate-300 font-bold border border-slate-300 dark:border-[#353A50]">
                        {word.level}
                      </span>
                    </div>

                    <button
                      onClick={() => speakGerman(word.german, 1.0, state.audioMuted)}
                      className="p-1.5 rounded-lg hover:bg-orange-500/10 text-orange-500 transition-colors"
                      title="Speak"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div className="mb-2">
                    <p className="text-lg font-bold font-['Fredoka'] text-slate-900 dark:text-white">
                      {word.german}
                    </p>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {word.english}
                    </p>
                    {word.plural && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Plural: {word.plural}</p>
                    )}
                  </div>

                  {word.mnemonic && (
                    <p className="text-xs italic text-slate-700 dark:text-slate-300 mb-3 line-clamp-2">
                      💡 {word.mnemonic}
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-200 dark:border-[#2E3245] flex items-center justify-between">
                    <span className="text-[11px] text-amber-500 font-bold flex items-center gap-1">
                      <AlertTriangle size={12} /> Needs review
                    </span>

                    <button
                      onClick={() => gradeWord(word.id, 2)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 transition-colors border border-emerald-500/30"
                      title="Mark as Mastered"
                    >
                      <CheckCircle2 size={13} />
                      <span>Mastered</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
