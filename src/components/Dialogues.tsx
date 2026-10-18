// ============================================================
// Dialogues — Real-Life Roleplay Stories & Conversations
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ArrowLeft, Play, Sparkles, MessageCircle, RotateCcw, Mic } from 'lucide-react';
import { dialogueScenarios } from '../data/germanCurriculum';
import { speakGerman } from '../utils/audio';
import { sounds } from '../utils/soundEffects';
import PronunciationCoach from './PronunciationCoach';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

export default function Dialogues({ game }: Props) {
  const { state, addXP } = game;
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [revealedLines, setRevealedLines] = useState(0);
  const [practicingLine, setPracticingLine] = useState<number | null>(null);

  const scenarios = useMemo(
    () => dialogueScenarios.filter((d) => d.level === state.currentLevel),
    [state.currentLevel]
  );

  const scenario = scenarios.find((s) => s.id === activeScenario);

  if (scenario) {
    const visibleLines = scenario.lines.slice(0, revealedLines);
    const hasMore = revealedLines < scenario.lines.length;

    const revealNext = () => {
      const next = revealedLines + 1;
      setRevealedLines(next);
      const currentLine = scenario.lines[revealedLines];
      if (currentLine) {
        speakGerman(currentLine.german, 0.95, state.audioMuted);
      }
      if (next === scenario.lines.length) {
        addXP(15);
      }
    };

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => {
            setActiveScenario(null);
            setRevealedLines(0);
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-extrabold px-4 py-2 rounded-2xl btn-duo btn-duo-neutral"
        >
          <ArrowLeft size={16} />
          <span>All Roleplay Scenarios</span>
        </button>

        {/* Scenario Header Card */}
        <div
          className="tactile-card p-6 border-2 transition-all bg-[#FAF8F5] dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl p-2.5 rounded-2xl bg-white dark:bg-[#181A24] border-2 border-black dark:border-[#2E3245] shrink-0">
              {scenario.emoji}
            </span>
            <div>
              <h2 className="font-['Fraunces'] text-2xl font-black text-slate-900 dark:text-white">
                {scenario.title}
              </h2>
              <p className="text-xs font-mono font-bold text-[#FF4A00]">
                {scenario.titleDe}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic mb-4">📍 {scenario.setting}</p>

          {/* Characters Cast */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-200 dark:border-[#2E3245]">
            {scenario.characters.map((char) => (
              <div
                key={char.name}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white dark:bg-[#181A24] border-2 border-black dark:border-[#2E3245] shadow-[0_2px_0_0_#000] dark:shadow-[0_2px_0_0_#090A0F]"
              >
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${char.avatarSeed}`}
                  alt={char.name}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-black/10 dark:border-[#353A50]"
                />
                <div>
                  <p className="text-xs font-bold leading-tight text-slate-900 dark:text-white">{char.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{char.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat / Dialogue Flow */}
        <div className="space-y-4 min-h-[220px]">
          <AnimatePresence>
            {visibleLines.map((line, i) => {
              const char = scenario.characters.find((c) => c.name === line.speaker);
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 items-end ${!isEven ? 'flex-row-reverse' : ''}`}
                >
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${
                      char?.avatarSeed || 'speaker'
                    }`}
                    alt={line.speaker}
                    className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 mb-1 border-2 border-white dark:border-slate-800 shadow-sm"
                  />

                  <div
                    className={`max-w-[80%] rounded-3xl p-4 shadow-sm border transition-all ${
                      isEven
                        ? state.darkMode
                          ? 'bg-slate-800 border-slate-700 text-slate-100 rounded-bl-sm'
                          : 'bg-white border-slate-200 text-slate-800 rounded-bl-sm'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400 rounded-br-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className={`text-[11px] font-black ${isEven ? 'text-orange-500' : 'text-amber-100'}`}>
                        {line.speaker}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setPracticingLine(practicingLine === i ? null : i);
                          }}
                          className={`p-1 rounded-full transition-colors ${
                            practicingLine === i
                              ? 'bg-amber-400 text-slate-900 font-bold'
                              : isEven
                              ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-500'
                              : 'hover:bg-white/20 text-white'
                          }`}
                          title="Speak & Shadow Pronunciation"
                        >
                          <Mic size={14} />
                        </button>
                        <button
                          onClick={() => speakGerman(line.german, 0.95, state.audioMuted)}
                          className={`p-1 rounded-full ${
                            isEven
                              ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-orange-500'
                              : 'hover:bg-white/20 text-white'
                          }`}
                          title="Hear line"
                        >
                          <Volume2 size={15} />
                        </button>
                      </div>
                    </div>

                    <p className="font-[Outfit] text-sm sm:text-base font-bold leading-snug">
                      "{line.german}"
                    </p>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        isEven ? 'opacity-65' : 'text-orange-50'
                      }`}
                    >
                      "{line.english}"
                    </p>

                    {/* Inline Pronunciation Coach when active */}
                    {practicingLine === i && (
                      <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-slate-900 dark:text-slate-100">
                        <PronunciationCoach
                          targetText={line.german}
                          englishMeaning={line.english}
                          compact={true}
                          onMastered={() => addXP(10)}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visibleLines.length === 0 && (
            <div className="text-center py-10 opacity-60">
              <p className="text-sm font-semibold">Press "Start Conversation" below to begin!</p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex gap-3">
          {hasMore ? (
            <button
              onClick={revealNext}
              className="flex-1 btn-duo btn-duo-primary py-3.5 rounded-2xl font-[Outfit] text-sm font-black flex items-center justify-center gap-2 shadow-lg"
            >
              <Play size={18} className="fill-white" />
              <span>
                {revealedLines === 0
                  ? 'Start Conversation'
                  : `Next Line (${revealedLines}/${scenario.lines.length})`}
              </span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                <Sparkles size={16} /> Scene Completed! (+15 XP)
              </span>
              <button
                onClick={() => setRevealedLines(0)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5"
              >
                <RotateCcw size={14} /> Replay
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div
        className="tactile-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#FAF8F5] dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FF4A00]/10 text-[#FF4A00] border border-[#FF4A00]/20">
            <MessageCircle size={14} />
            <span>AUTHENTIC CONVERSATIONS</span>
          </div>

          <h1 className="font-['Fraunces'] text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Roleplay Stories 💬
          </h1>

          <p className="text-xs sm:text-sm font-medium opacity-80 max-w-lg leading-relaxed text-slate-700 dark:text-slate-300">
            Step into practical dialogues in a café, bakery, train station, or doctor's office with animated characters and speech audio.
          </p>
        </div>

        <div className="flex sm:flex-col items-center justify-between sm:justify-center p-4 rounded-2xl bg-white dark:bg-[#181A24] border-2 border-black dark:border-[#2E3245] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F] shrink-0 min-w-[150px]">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Level {state.currentLevel} Scenarios</span>
          <span className="font-['Fredoka'] text-3xl font-black text-[#FF4A00] my-0.5">
            {scenarios.length}
          </span>
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Interactive Roleplay</span>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {scenarios.map((scen) => (
          <motion.div
            key={scen.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveScenario(scen.id);
              setRevealedLines(0);
            }}
            className="tactile-card p-6 border-2 transition-all cursor-pointer bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] hover:border-[#FF4A00] dark:hover:border-[#FF4A00] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-4xl p-2.5 rounded-2xl bg-[#FF4A00]/10 text-[#FF4A00] border-2 border-black dark:border-[#2E3245]">
                {scen.emoji}
              </span>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#252837] text-slate-800 dark:text-slate-200 border border-black/10 dark:border-[#353A50] font-mono">
                {scen.lines.length} lines
              </span>
            </div>

            <h3 className="font-['Fraunces'] text-xl font-black mb-1 text-slate-900 dark:text-white">
              {scen.title}
            </h3>
            <p className="text-xs font-mono font-bold text-[#FF4A00] mb-2">
              {scen.titleDe}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-4">📍 {scen.setting}</p>

            {/* Avatars */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-[#2E3245]">
              <div className="flex -space-x-2">
                {scen.characters.map((char) => (
                  <img
                    key={char.name}
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${char.avatarSeed}`}
                    alt={char.name}
                    className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1E202B] bg-slate-200"
                    title={`${char.name} (${char.role})`}
                  />
                ))}
              </div>

              <span className="text-xs font-black text-[#FF4A00] flex items-center gap-1">
                <span>Start</span> →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
