// ============================================================
// TopBar — Tactile Alpine Arcade Header
// Mechanical keycaps, synesthetic badges, candy-cane XP & Bärli
// ============================================================

import { Volume2, VolumeX, Moon, Sun, Menu, Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { CEFRLevel } from '../types';
import MascotBarli from './MascotBarli';
import type { View } from '../App';

type Props = {
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
  onNavigate: (view: View) => void;
  onToggleSidebar: () => void;
};

const levels: { key: CEFRLevel; label: string; sticker: string; bg: string }[] = [
  { key: 'A1', label: 'A1 Beginner', sticker: '🌱 A1', bg: 'bg-[#059669]' },
  { key: 'A2', label: 'A2 Elementary', sticker: '⚡ A2', bg: 'bg-[#2563EB]' },
  { key: 'B1', label: 'B1 Intermediate', sticker: '🚀 B1', bg: 'bg-[#E11D48]' },
];

export default function TopBar({ game, onNavigate, onToggleSidebar }: Props) {
  const { state, setLevel, toggleDarkMode, toggleMute, currentRank, xpProgress } = game;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-18 px-3 sm:px-6 flex items-center justify-between border-b-[2.5px] border-[#18181B] dark:border-[#2E3245] transition-colors ${
        state.darkMode
          ? 'bg-[#12131A]/95 text-white shadow-[0px_4px_0px_#090A0F]'
          : 'bg-[#FAF6F0]/95 text-[#18181B] shadow-[0px_4px_0px_#18181B]/5 backdrop-blur-md'
      }`}
    >
      {/* Left: Mobile Drawer Trigger + Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl tactile-btn tactile-btn-neutral"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 group transition-transform active:scale-95 text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FF5500] border-[2.5px] border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
            🥨
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Fraunces'] font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
                DeutschFlow
              </span>
              <span className="hidden sm:inline-block text-[10px] font-['Fredoka'] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#18181B] text-[#FF5500] dark:bg-white dark:text-[#18181B] rotate-[-2deg]">
                ARCADE
              </span>
            </div>
            <p className="text-[10px] hidden sm:block opacity-70 font-['Space_Mono'] font-bold -mt-0.5 tracking-tight text-[#18181B] dark:text-slate-300">
              LEARN GERMAN A1 · A2 · B1
            </p>
          </div>
        </button>
      </div>

      {/* Center: CEFR Level Selector Die-Cut Stickers */}
      <div className="hidden sm:flex items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-[#1E202B] border-[2.5px] border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F]">
        {levels.map((l) => {
          const isActive = state.currentLevel === l.key;
          return (
            <button
              key={l.key}
              onClick={() => setLevel(l.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-['Fredoka'] font-black transition-all cursor-pointer ${
                isActive
                  ? `${l.bg} text-white border-[2px] border-[#18181B] dark:border-white shadow-[0px_2px_0px_#18181B] scale-105`
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {l.sticker}
            </button>
          );
        })}
      </div>

      {/* Right: Gamified Controls (Streak, Candy-Cane XP, Bärli Mascot) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Flame Mechanical Badge */}
        <div
          title={`${state.streak} Day Streak!`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-[2.5px] border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] font-['Fredoka'] font-black text-xs ${
            state.streak > 0
              ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200'
              : 'bg-slate-100 dark:bg-[#1E202B] text-slate-400'
          }`}
        >
          <motion.div
            animate={state.streak > 0 ? { scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <Flame
              size={17}
              className={state.streak > 0 ? 'text-[#FF5500] fill-[#FF5500]' : 'text-slate-400'}
            />
          </motion.div>
          <span>{state.streak}</span>
        </div>

        {/* Liquid Candy-Cane Striped XP Pill */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl border-[2.5px] border-[#18181B] dark:border-[#2E3245] shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#090A0F] bg-white dark:bg-[#1E202B] hover:translate-y-[-1px] transition-all cursor-pointer"
        >
          <Sparkles size={14} className="text-[#FF5500]" />
          <div className="flex flex-col items-start">
            <span className="text-[11px] font-['Fredoka'] font-black leading-none text-[#18181B] dark:text-white">
              {state.xp} XP
            </span>
            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#FF5500] progress-candy-cane rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, xpProgress))}%` }}
              />
            </div>
          </div>
        </button>

        {/* Mute Audio Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-xl tactile-btn tactile-btn-neutral"
          title={state.audioMuted ? 'Unmute German speech' : 'Mute speech synthesis'}
          aria-label={state.audioMuted ? 'Unmute' : 'Mute'}
        >
          {state.audioMuted ? (
            <VolumeX size={17} className="text-rose-500" />
          ) : (
            <Volume2 size={17} className="text-emerald-500" />
          )}
        </button>

        {/* Theme Dark/Light Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl tactile-btn tactile-btn-neutral"
          title={state.darkMode ? 'Switch to Light Oat Paper' : 'Switch to Midnight Dark'}
          aria-label={state.darkMode ? 'Switch to Light' : 'Switch to Dark'}
        >
          {state.darkMode ? (
            <Sun size={17} className="text-amber-400 animate-spin-slow" />
          ) : (
            <Moon size={17} className="text-indigo-600" />
          )}
        </button>

        {/* Bärli the Berlin Bear Mascot */}
        <MascotBarli
          streak={state.streak}
          xp={state.xp}
          level={state.currentLevel}
          isMuted={state.audioMuted}
        />
      </div>
    </header>
  );
}
