// ============================================================
// Fill-in-the-Blank — Dialogue Story Quests
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Volume2 } from 'lucide-react';
import { dialogueScenarios } from '../../data/germanCurriculum';
import { speakGerman } from '../../utils/audio';
import confetti from 'canvas-confetti';

type Props = {
  game: ReturnType<typeof import('../../hooks/useGameState').useGameState>;
};

export default function FillInBlank({ game }: Props) {
  const { state, addXP, recordQuizResult } = game;

  const scenarios = useMemo(
    () => dialogueScenarios.filter((d) => d.level === state.currentLevel),
    [state.currentLevel]
  );

  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'wrong'>>({});
  const [score, setScore] = useState(0);

  const scenario = scenarios[scenarioIdx];

  if (!scenario) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl block mb-4">📝</span>
        <p className="font-[Fredoka] text-xl">No dialogues for {state.currentLevel}</p>
      </div>
    );
  }

  const isComplete = lineIdx >= scenario.lines.length;

  const handleSelect = (lineIndex: number, option: string) => {
    if (feedback[lineIndex] !== undefined) return;

    const line = scenario.lines[lineIndex];
    const correct = option === line.blankAnswer;

    setAnswers({ ...answers, [lineIndex]: option });
    setFeedback({ ...feedback, [lineIndex]: correct ? 'correct' : 'wrong' });
    recordQuizResult(scenario.id + '-' + lineIndex, correct, 'fillin');

    if (correct) {
      setScore((s) => s + 12);
      addXP(12);
    }
  };

  const advanceLine = () => {
    if (lineIdx < scenario.lines.length) {
      setLineIdx(lineIdx + 1);
    }
  };

  const nextScenario = () => {
    if (scenarioIdx + 1 < scenarios.length) {
      setScenarioIdx(scenarioIdx + 1);
      setLineIdx(0);
      setAnswers({});
      setFeedback({});
      confetti({ particleCount: 30, spread: 40 });
    }
  };

  const currentLine = scenario.lines[lineIdx];
  const visibleLines = scenario.lines.slice(0, lineIdx + 1);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Scenario header */}
      <div className="tactile-card p-5 bg-[#FAF8F5] dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl p-2 rounded-xl bg-white dark:bg-[#252837] border border-black/10 dark:border-[#353A50]">{scenario.emoji}</span>
          <div>
            <h3 className="font-['Fraunces'] text-lg font-black text-slate-900 dark:text-white">{scenario.title}</h3>
            <p className="text-xs font-mono font-bold text-[#FF4A00]">{scenario.titleDe} · Level {state.currentLevel}</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 italic">📍 {scenario.setting}</p>
      </div>

      {/* Dialogue lines */}
      <div className="space-y-3">
        <AnimatePresence>
          {visibleLines.map((line, i) => {
            const char = scenario.characters.find((c) => c.name === line.speaker);
            const isBlankLine = line.isBlank;
            const answered = feedback[i] !== undefined;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-3"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${char?.avatarSeed || 'default'}`}
                    alt={char?.name}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-black dark:border-[#2E3245] shadow-sm"
                  />
                </div>

                {/* Bubble */}
                <div className="flex-1 rounded-2xl p-4 border-2 border-black dark:border-[#2E3245] bg-white dark:bg-[#1E202B] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F]">
                  <p className="text-xs font-black text-[#FF4A00] uppercase tracking-wider mb-1">{line.speaker}</p>

                  {isBlankLine && !answered ? (
                    <div>
                      <p className="text-sm font-bold font-['Fraunces'] mb-3 text-slate-900 dark:text-white">
                        {line.german.replace(line.blankAnswer!, '________')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {line.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(i, opt)}
                            className="tactile-btn tactile-btn-neutral px-3 py-1.5 text-xs font-bold"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold font-['Fraunces'] text-slate-900 dark:text-white">{line.german}</p>
                      {answered && isBlankLine && (
                        <span className={`inline-flex items-center gap-1 text-xs mt-1.5 font-black ${
                          feedback[i] === 'correct' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {feedback[i] === 'correct' ? <><Check size={14} /> Correct!</> : <><X size={14} /> Correct Answer: {line.blankAnswer}</>}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">"{line.english}"</p>

                  <button
                    onClick={() => speakGerman(line.german, 0.85, state.audioMuted)}
                    className="text-[#FF4A00] hover:text-[#FF4A00]/80 mt-2 flex items-center gap-1 text-xs font-bold"
                  >
                    <Volume2 size={14} />
                    <span>Listen</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Continue / Next */}
      <div className="flex gap-3">
        {!isComplete && (!currentLine?.isBlank || feedback[lineIdx] !== undefined) && (
          <button
            onClick={advanceLine}
            className="flex-1 tactile-btn tactile-btn-blue py-3 text-sm font-black"
          >
            Continue Dialogue →
          </button>
        )}
        {isComplete && scenarioIdx + 1 < scenarios.length && (
          <button
            onClick={nextScenario}
            className="flex-1 tactile-btn tactile-btn-primary py-3 text-sm font-black"
          >
            Next Story Scenario →
          </button>
        )}
        {isComplete && (
          <div className="text-center w-full py-4">
            <p className="font-['Fraunces'] text-lg font-black text-emerald-600 dark:text-emerald-400">🎉 Story Quest Complete! +{score} XP</p>
          </div>
        )}
      </div>
    </div>
  );
}
