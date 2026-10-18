// ============================================================
// Settings — Preferences, Custom Vocab & Data Management
// ============================================================

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Plus,
  Trash2,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import { CEFRLevel, DEFAULT_GAME_STATE } from '../types';
import { speakGerman } from '../utils/audio';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
  onOpenAddWord: () => void;
};

export default function Settings({ game, onOpenAddWord }: Props) {
  const {
    state,
    setState,
    toggleDarkMode,
    toggleMute,
    setLevel,
    removeCustomWord,
    exportData,
    importData,
    currentRank,
  } = game;

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          setImportStatus('Backup successfully imported! 🚀');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Failed to parse backup JSON file.');
          setTimeout(() => setImportStatus(null), 4000);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    setState(DEFAULT_GAME_STATE);
    setConfirmReset(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div
        className="tactile-card p-6 border-2 transition-colors bg-[#FAF8F5] dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-500 border-2 border-black dark:border-[#2E3245] flex items-center justify-center text-3xl shrink-0 shadow-sm">
            ⚙️
          </div>
          <div>
            <h1 className="font-['Fraunces'] text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Settings & Data Management
            </h1>
            <p className="text-sm font-medium opacity-80 mt-0.5 text-slate-700 dark:text-slate-300">
              Personalize your study experience, manage your custom vocabulary, and backup progress.
            </p>
          </div>
        </div>
      </div>

      {/* Target Level */}
      <div
        className="tactile-card p-6 border-2 bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <h2 className="text-lg font-bold font-['Fredoka'] mb-1 flex items-center gap-2 text-slate-900 dark:text-white">
          <span>🎯</span> Target CEFR Level
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-4">
          Sets default filter across quizzes, flashcards, dialogues, and grammar topics.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {(['A1', 'A2', 'B1'] as CEFRLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                state.currentLevel === lvl
                  ? 'border-[#FF4A00] bg-[#FF4A00]/10 font-bold text-[#FF4A00] dark:text-[#FF4A00] shadow-[0_3px_0_0_#FF4A00] scale-[1.01]'
                  : 'border-black dark:border-[#2E3245] hover:border-slate-500 bg-white dark:bg-[#181A24] text-slate-800 dark:text-slate-200 shadow-[0_2px_0_0_#000] dark:shadow-[0_2px_0_0_#090A0F]'
              }`}
            >
              <div className="text-2xl font-['Fredoka'] font-black">{lvl}</div>
              <div className="text-xs opacity-75 mt-1 font-semibold">
                {lvl === 'A1' ? 'Beginner' : lvl === 'A2' ? 'Elementary' : 'Intermediate'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Audio & Display Preferences */}
      <div
        className="tactile-card p-6 border-2 bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <h2 className="text-lg font-bold font-['Fredoka'] mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <span>🎨</span> Audio & Interface Preferences
        </h2>

        <div className="space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border-2 border-black/10 dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#181A24]">
            <div className="flex items-center gap-3">
              {state.darkMode ? (
                <Moon className="text-indigo-400" size={22} />
              ) : (
                <Sun className="text-amber-500" size={22} />
              )}
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Theme Appearance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {state.darkMode ? 'Midnight Alpine dark mode active' : 'Warm cream tactile light mode active'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`tactile-btn px-4 py-2 text-xs font-black ${
                state.darkMode
                  ? 'tactile-btn-primary'
                  : 'tactile-btn-neutral'
              }`}
            >
              Toggle {state.darkMode ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Sound / TTS */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border-2 border-black/10 dark:border-[#2E3245] bg-[#FAF8F5] dark:bg-[#181A24]">
            <div className="flex items-center gap-3">
              {state.audioMuted ? (
                <VolumeX className="text-rose-500" size={22} />
              ) : (
                <Volume2 className="text-emerald-500" size={22} />
              )}
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">German Speech Audio</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {state.audioMuted ? 'Voice synthesis is currently muted' : 'High quality German speech synthesis'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakGerman('Guten Tag! Deutsch lernen macht Spaß.', 1.0, false)}
                className="tactile-btn tactile-btn-neutral px-3 py-2 text-xs font-bold"
              >
                Test Voice 🔊
              </button>
              <button
                onClick={toggleMute}
                className={`tactile-btn px-4 py-2 text-xs font-black ${
                  state.audioMuted
                    ? 'tactile-btn-pink'
                    : 'tactile-btn-emerald'
                }`}
              >
                {state.audioMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Vocabulary */}
      <div
        className="tactile-card p-6 border-2 bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-['Fredoka'] flex items-center gap-2 text-slate-900 dark:text-white">
              <span>📝</span> Custom Vocabulary Deck
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                {state.customWords.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              Add your own custom German words and phrases into your personal spaced repetition deck.
            </p>
          </div>
          <button
            onClick={onOpenAddWord}
            className="tactile-btn tactile-btn-primary flex items-center gap-1.5 px-4 py-2 text-xs font-black"
          >
            <Plus size={16} />
            <span>Add Word</span>
          </button>
        </div>

        {state.customWords.length === 0 ? (
          <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-[#2E3245] text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
            No custom words yet. Click "Add Word" to append words from your own German class or reading!
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {state.customWords.map((word) => (
              <div
                key={word.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#181A24] border border-black/10 dark:border-[#2E3245] text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{word.emoji}</span>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {word.german}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 ml-2">({word.english})</span>
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-[#2E3245] text-slate-800 dark:text-slate-200 font-bold uppercase">
                      {word.level}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeCustomWord(word.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Delete Custom Word"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Backup & Data Sync */}
      <div
        className="tactile-card p-6 border-2 bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_4px_0_0_#000] dark:shadow-[0_4px_0_0_#090A0F]"
      >
        <h2 className="text-lg font-bold font-['Fredoka'] mb-1 flex items-center gap-2 text-slate-900 dark:text-white">
          <span>💾</span> Backup & Export
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-4">
          All progress is stored in your browser's localStorage. Download backups anytime to ensure zero data loss.
        </p>

        {importStatus && (
          <div className="mb-4 p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-2">
            <Check size={16} />
            <span>{importStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={exportData}
            className="tactile-btn tactile-btn-neutral flex items-center justify-center gap-2 p-3 text-xs font-bold"
          >
            <Download size={16} className="text-[#FF4A00]" />
            <span>Export Progress (JSON)</span>
          </button>

          <label className="tactile-btn tactile-btn-neutral flex items-center justify-center gap-2 p-3 text-xs font-bold cursor-pointer">
            <Upload size={16} className="text-indigo-500" />
            <span>Import Progress Backup</span>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Reset Progress Section */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#2E3245] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle size={14} /> Danger Zone
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Reset all XP, streaks, and review data.</p>
          </div>

          {confirmReset ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                Yes, Reset All
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <RotateCcw size={13} />
              <span>Reset Game Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
