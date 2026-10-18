// ============================================================
// Grammar Cheat Sheets — Visual, Interactive Syntax Cards
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronDown, ChevronUp, Lightbulb, Search, BookOpen, Sparkles } from 'lucide-react';
import { grammarTopics } from '../data/germanCurriculum';
import { speakGerman } from '../utils/audio';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

export default function GrammarSheets({ game }: Props) {
  const { state } = game;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const topics = useMemo(
    () => grammarTopics.filter((g) => g.level === state.currentLevel),
    [state.currentLevel]
  );

  const filteredTopics = useMemo(() => {
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.titleDe.toLowerCase().includes(search.toLowerCase()) ||
        t.explanation.toLowerCase().includes(search.toLowerCase())
    );
  }, [topics, search]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div
        className="tactile-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#FAF8F5] dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <BookOpen size={14} />
            <span>SYNTAX ARCHITECTURE</span>
          </div>

          <h1 className="font-['Fraunces'] text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Grammar Reference 📚
          </h1>

          <p className="text-xs sm:text-sm font-medium opacity-80 max-w-lg leading-relaxed text-slate-700 dark:text-slate-300">
            Master German sentence structures, cases (Nominativ, Akkusativ, Dativ), modal verbs, and word order rules.
          </p>
        </div>

        <div className="flex sm:flex-col items-center justify-between sm:justify-center p-4 rounded-2xl bg-white dark:bg-[#181A24] border-2 border-black dark:border-[#2E3245] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F] shrink-0 min-w-[150px]">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Level {state.currentLevel} Guides</span>
          <span className="font-['Fredoka'] text-3xl font-black text-emerald-600 dark:text-emerald-400 my-0.5">
            {topics.length}
          </span>
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Interactive Rules</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search grammar topics (e.g. Akkusativ, Modalverben, Satzbau)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm border-2 border-black dark:border-[#2E3245] bg-white dark:bg-[#181A24] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F]"
        />
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3.5">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedId === topic.id;
          return (
            <motion.div
              key={topic.id}
              layout
              className={`rounded-3xl border-2 transition-all shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F] ${
                isExpanded
                  ? 'border-emerald-500 bg-white dark:bg-[#1E202B]'
                  : 'border-black dark:border-[#2E3245] bg-white dark:bg-[#1E202B] hover:border-slate-500'
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl p-2 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                    {topic.emoji}
                  </span>
                  <div>
                    <h3 className="font-['Fraunces'] text-lg font-black text-slate-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {topic.titleDe}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-2 rounded-xl transition-all border border-black dark:border-[#2E3245] ${
                    isExpanded
                      ? 'bg-emerald-500 text-white rotate-180'
                      : 'bg-slate-100 dark:bg-[#181A24] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 space-y-5 border-t border-slate-200 dark:border-[#2E3245] pt-4">
                      {/* Explanation */}
                      <p className="text-sm leading-relaxed opacity-85 font-medium">
                        {topic.explanation}
                      </p>

                      {/* Interactive Table */}
                      {topic.table && (
                        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                              <tr>
                                {topic.table.headers.map((h, i) => (
                                  <th key={i} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {topic.table.rows.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                                >
                                  {row.map((cell, ci) => (
                                    <td key={ci} className="px-4 py-3 font-mono font-medium">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Examples with Audio & Highlight */}
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Sample Usage & Highlighted Patterns
                        </p>
                        {topic.examples.map((ex, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-2xl flex items-center justify-between gap-3 border-2 border-black/10 dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#181A24]"
                          >
                            <div>
                              <p className="text-sm font-bold font-['Fraunces'] text-slate-900 dark:text-white">
                                {ex.highlight
                                  ? ex.german.split(ex.highlight).map((part, pi, arr) => (
                                      <span key={pi}>
                                        {part}
                                        {pi < arr.length - 1 && (
                                          <span className="font-black text-[#FF4A00] px-1 py-0.5 rounded bg-orange-500/10 underline decoration-orange-400 decoration-2">
                                            {ex.highlight}
                                          </span>
                                        )}
                                      </span>
                                    ))
                                  : ex.german}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">"{ex.english}"</p>
                            </div>

                            <button
                              onClick={() => speakGerman(ex.german, 0.9, state.audioMuted)}
                              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors shrink-0 border border-emerald-500/20"
                              title="Listen to German sentence"
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Pro Tip */}
                      {topic.tip && (
                        <div
                          className="p-4 rounded-2xl flex items-start gap-3 border-2 border-amber-300 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200"
                        >
                          <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-black text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-0.5">
                              Pro Tip
                            </p>
                            <p className="text-xs leading-relaxed font-medium">{topic.tip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="text-center py-16 opacity-60">
            <p className="font-bold">No grammar topics match "{search}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
