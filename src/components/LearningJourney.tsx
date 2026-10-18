// ============================================================
// Learning Journey (Lernpfad) — Step-by-Step German Guide
// A1 -> A2 -> B1 Goethe/Telc Road to Fluency
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Volume2,
  Sparkles,
  Layers,
  Gamepad2,
  Lightbulb,
  Award,
  Flame,
} from 'lucide-react';
import { journeyStages, vocabularyData } from '../data/germanCurriculum';
import { CEFRLevel, JourneyStage } from '../types';
import { speakGerman } from '../utils/audio';
import type { View } from '../App';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
  onNavigate: (view: View) => void;
};

export default function LearningJourney({ game, onNavigate }: Props) {
  const { state, setLevel } = game;
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>(state.currentLevel);
  const [activeStageId, setActiveStageId] = useState<string>('stage-1');

  // Filter stages based on CEFR selector
  const visibleStages = useMemo(() => {
    if (selectedLevel === 'ALL') return journeyStages;
    return journeyStages.filter((s) => s.level === selectedLevel);
  }, [selectedLevel]);

  const activeStage = useMemo(() => {
    return journeyStages.find((s) => s.id === activeStageId) || journeyStages[0];
  }, [activeStageId]);

  // Stage vocabulary items for quick preview
  const stageVocabItems = useMemo(() => {
    return vocabularyData.filter((w) =>
      activeStage.vocabFocus.some(
        (target) => w.german.toLowerCase() === target.toLowerCase()
      )
    );
  }, [activeStage]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ============================================================ */}
      {/* 1. SIMPLE, BOLD HERO GUIDE BANNER                           */}
      {/* ============================================================ */}
      <div
        className="tactile-card p-6 sm:p-8 transition-all bg-[#FAF8F5] dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-[#FF4A00]/10 text-[#FF4A00] border border-[#FF4A00]/20">
              <Compass size={14} />
              <span>OFFICIAL GOETHE & TELC CURRICULUM</span>
            </div>

            <h1 className="font-['Fraunces'] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#18181B] dark:text-white">
              German Learning Roadmap 🗺️
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base opacity-80 font-medium leading-relaxed text-[#18181B] dark:text-slate-300">
              Step-by-step roadmap from your first German words to full B1 conversational and
              written fluency. Master grammar checkpoints, essential vocabulary, and real-life scenarios.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div
            className="p-5 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 min-w-[200px] text-center bg-white dark:bg-[#161822] border-black dark:border-[#2E3245] shadow-[0_3px_0_0_#000] dark:shadow-[0_3px_0_0_#090A0F]"
          >
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Your Current Level
            </span>
            <span className="font-['Fredoka'] text-4xl font-black text-[#FF4A00] my-1">
              {state.currentLevel}
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {state.currentLevel === 'A1'
                ? 'Beginner: Stages 1–5'
                : state.currentLevel === 'A2'
                ? 'Elementary: Stages 6–9'
                : 'Intermediate: Stages 10–13'}
            </span>
          </div>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-[#2E3245]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
            Filter Roadmap:
          </span>
          {(['ALL', 'A1', 'A2', 'B1'] as const).map((lvl) => {
            const isActive = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${
                  isActive
                    ? 'bg-[#FF4A00] text-white border-black dark:border-[#FF4A00] shadow-[0_2px_0_0_#000]'
                    : 'bg-white dark:bg-[#181A24] border-black dark:border-[#2E3245] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#252837]'
                }`}
              >
                {lvl === 'ALL' ? 'Full Path (1–13)' : `Level ${lvl}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. ROADMAP STAGES GRID & DETAILS SPLIT                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Stage Step Timeline */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {visibleStages.map((stage) => {
            const isSelected = activeStageId === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageId(stage.id);
                  setLevel(stage.level);
                }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#FF4A00] bg-[#FF4A00]/10 dark:bg-[#FF4A00]/15 shadow-[0_3px_0_0_#FF4A00] translate-x-1'
                    : 'bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] hover:border-[#FF4A00] dark:hover:border-[#FF4A00] shadow-[0_2px_0_0_#000] dark:shadow-[0_2px_0_0_#090A0F]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#252837] border border-black/10 dark:border-[#353A50] flex items-center justify-center text-xl shrink-0">
                    {stage.emoji}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-[#2E3245] text-slate-800 dark:text-slate-200">
                        {stage.level} · Stage {stage.stageNumber}
                      </span>
                    </div>
                    <p className="font-['Fredoka'] font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                      {stage.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{stage.titleDe}</p>
                  </div>
                </div>

                <div
                  className={`w-3.5 h-3.5 rounded-full border border-black dark:border-[#2E3245] ${
                    isSelected ? 'bg-[#FF4A00]' : 'bg-slate-300 dark:bg-[#2E3245]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Active Stage Detailed Guide Station */}
        <div className="lg:col-span-7">
          <div
            className="tactile-card p-6 sm:p-8 space-y-6 bg-white dark:bg-[#1E202B] border-2 border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
          >
            {/* Stage Title */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-[#2E3245] pb-5">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl p-2.5 rounded-2xl bg-[#FF4A00]/10 text-[#FF4A00] border-2 border-black dark:border-[#2E3245]">
                  {activeStage.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-[#FF4A00] text-white border border-black">
                      Stage {activeStage.stageNumber} of 13
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#252837] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-[#353A50]">
                      Level {activeStage.level}
                    </span>
                  </div>
                  <h2 className="font-['Fraunces'] text-2xl font-black text-slate-900 dark:text-white">
                    {activeStage.title}
                  </h2>
                  <p className="text-xs font-mono font-bold text-[#FF4A00]">
                    {activeStage.titleDe}
                  </p>
                </div>
              </div>
            </div>

            {/* Stage Description */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Learning Mission & Context
              </h3>
              <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {activeStage.description}
              </p>
            </div>

            {/* Grammar Focus */}
            <div
              className="p-4 rounded-2xl border-2 bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60"
            >
              <div className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                <BookOpen size={15} />
                <span>Grammar Anchor</span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {activeStage.grammarFocus}
              </p>
            </div>

            {/* Core Vocabulary Chips with Audio */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Core Vocabulary Targets
              </h3>
              <div className="flex flex-wrap gap-2">
                {stageVocabItems.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => speakGerman(w.german, 1.0, state.audioMuted)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-bold transition-all bg-slate-50 dark:bg-[#181A24] border-black dark:border-[#2E3245] hover:border-[#FF4A00] dark:hover:border-[#FF4A00] text-slate-800 dark:text-slate-200 shadow-[0_2px_0_0_#000] dark:shadow-[0_2px_0_0_#090A0F]"
                    title={`Click to listen to "${w.german}"`}
                  >
                    <span>{w.emoji}</span>
                    <span>{w.gender && w.gender !== 'none' ? `${w.gender} ` : ''}{w.german}</span>
                    <Volume2 size={13} className="text-[#FF4A00]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Milestone Checkpoint */}
            <div
              className="p-4 rounded-2xl border-2 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60"
            >
              <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <CheckCircle2 size={15} />
                <span>Goethe Stage Checkpoint</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                {activeStage.checkpoint}
              </p>
            </div>

            {/* Pedagogical Tip */}
            <div
              className="p-4 rounded-2xl border-2 bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60"
            >
              <div className="flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                <Lightbulb size={15} />
                <span>Mastery Tip</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                {activeStage.tip}
              </p>
            </div>

            {/* Direct Action Launchers */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('flashcards')}
                className="tactile-btn tactile-btn-primary py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2"
              >
                <Layers size={16} />
                <span>Drill Flashcards</span>
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="tactile-btn tactile-btn-neutral py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2"
              >
                <Gamepad2 size={16} />
                <span>Test in Arcade</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
