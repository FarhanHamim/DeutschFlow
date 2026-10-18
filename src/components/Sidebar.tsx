// ============================================================
// Tactile Alpine Arcade Sidebar & Mobile Arcade Dock
// ============================================================

import {
  LayoutDashboard,
  Compass,
  Layers,
  Gamepad2,
  BookOpen,
  MessageSquare,
  Flame,
  Settings as SettingsIcon,
  X,
  ChevronRight,
  Puzzle,
  Anchor,
  Swords,
} from 'lucide-react';
import type { View } from '../App';

type Props = {
  currentView: View;
  onNavigate: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  weakWordsCount?: number;
  rankTitle?: string;
  rankEmoji?: string;
  xpProgress?: number;
};

type NavItem = {
  id: View;
  label: string;
  mobileLabel: string;
  emoji: string;
  icon: typeof LayoutDashboard;
  badge?: number;
  isPrimaryMobile?: boolean;
};

export default function Sidebar({
  currentView,
  onNavigate,
  isOpen,
  onClose,
  darkMode,
  weakWordsCount = 0,
  rankTitle = 'Pretzel Rookie',
  rankEmoji = '🥨',
  xpProgress = 20,
}: Props) {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', mobileLabel: 'Home', emoji: '🏠', icon: LayoutDashboard, isPrimaryMobile: true },
    { id: 'journey', label: 'Learning Journey', mobileLabel: 'Guide', emoji: '🗺️', icon: Compass, isPrimaryMobile: true },
    { id: 'flashcards', label: 'Flashcards', mobileLabel: 'Cards', emoji: '🃏', icon: Layers, isPrimaryMobile: true },
    { id: 'quiz', label: 'Quiz Arcade', mobileLabel: 'Arcade', emoji: '🎮', icon: Gamepad2, isPrimaryMobile: true },
    { id: 'compound-words', label: 'Compound Words', mobileLabel: 'Komposita', emoji: '🧩', icon: Puzzle, isPrimaryMobile: false },
    { id: 'verb-kicker', label: 'Verb-Kicker 🥾', mobileLabel: 'V2 Kicker', emoji: '⚓', icon: Anchor, isPrimaryMobile: false },
    { id: 'boss-battles', label: 'Boss Battles ⚔️', mobileLabel: 'Battles', emoji: '⚔️', icon: Swords, isPrimaryMobile: false },
    { id: 'grammar', label: 'Grammar Sheets', mobileLabel: 'Grammar', emoji: '📚', icon: BookOpen, isPrimaryMobile: false },
    { id: 'dialogues', label: 'Roleplay Stories', mobileLabel: 'Stories', emoji: '💬', icon: MessageSquare, isPrimaryMobile: false },
    { id: 'weak-words', label: 'Weak Words Vault', mobileLabel: 'Vault', emoji: '🔥', icon: Flame, badge: weakWordsCount, isPrimaryMobile: false },
    { id: 'settings', label: 'Settings & Data', mobileLabel: 'Settings', emoji: '⚙️', icon: SettingsIcon, isPrimaryMobile: false },
  ];

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP TACTILE SIDEBAR DOCK (Visible on md+ screens)     */}
      {/* ============================================================ */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 z-30 transition-transform duration-300 border-r-2 border-[#18181B] dark:border-[#2E3245] flex flex-col justify-between select-none ${
          darkMode ? 'bg-[#12131A]' : 'bg-[#FAF6F0]'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Mobile Header in Slideout Drawer */}
        <div className="flex items-center justify-between p-4 md:hidden border-b-2 border-[#18181B] dark:border-[#2E3245] bg-white dark:bg-[#1E202B]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇩🇪</span>
            <span className="font-['Fraunces'] font-black text-base">DeutschFlow Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 py-1 text-[11px] font-['Fredoka'] font-black uppercase tracking-wider opacity-60">
            Study Modules
          </div>

          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-['Fredoka'] font-black transition-all group ${
                  isActive
                    ? 'tactile-btn tactile-btn-primary !translate-y-0 !shadow-[0px_4px_0px_#18181B] dark:!shadow-[0px_4px_0px_#090A0F]'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-[#18181B] dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-125 transition-transform">
                    {item.emoji}
                  </span>
                  <span className="tracking-wide">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`vinyl-sticker px-2 py-0.5 text-[10px] ${
                      isActive
                        ? 'bg-white text-orange-600'
                        : 'bg-rose-600 text-white animate-pulse'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Bottom Rank Widget */}
        <div className="p-3.5 border-t-2 border-[#18181B] dark:border-[#2E3245] bg-white/50 dark:bg-black/20">
          <div className="tactile-card p-3 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 dark:from-[#231A12] dark:to-[#1A140F]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-float">{rankEmoji}</span>
                <div>
                  <p className="text-xs font-['Fraunces'] font-black leading-tight text-[#18181B] dark:text-white">
                    {rankTitle}
                  </p>
                  <p className="text-[10px] font-['Fredoka'] font-bold opacity-60">Current Rank</p>
                </div>
              </div>
              <ChevronRight size={14} className="opacity-50" />
            </div>

            {/* Candy-Cane Rank Progress Bar */}
            <div className="w-full bg-[#18181B]/15 dark:bg-black/40 h-2.5 rounded-full border border-[#18181B] dark:border-black overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full progress-candy-cane transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(8, xpProgress))}%` }}
              />
            </div>
            <p className="text-[10px] text-right mt-1 font-['Space_Mono'] opacity-70 font-bold">
              {xpProgress}% to next rank
            </p>
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 2. MOBILE BOTTOM ARCADE DOCK (Thumb-Friendly on <md screens) */}
      {/* ============================================================ */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t-2 border-[#18181B] dark:border-[#2E3245] transition-colors flex items-center justify-around px-2 ${
          darkMode
            ? 'bg-[#12131A] text-slate-300'
            : 'bg-[#FAF6F0] text-slate-800 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]'
        }`}
      >
        {navItems
          .filter((item) => item.isPrimaryMobile)
          .map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
                  isActive
                    ? 'scale-110 font-bold text-orange-600 dark:text-orange-400'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="text-xl mb-0.5">{item.emoji}</span>
                <span className="text-[10px] font-['Fredoka'] font-black tracking-tight">
                  {item.mobileLabel}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-0.5 shadow-sm" />
                )}
              </button>
            );
          })}

        {/* "More" Trigger for Drawer on mobile */}
        <button
          onClick={onClose}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
            currentView === 'weak-words' || currentView === 'settings' || currentView === 'grammar' || currentView === 'dialogues'
              ? 'scale-110 font-bold text-orange-600 dark:text-orange-400'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div className="relative">
            <span className="text-xl mb-0.5">
              {currentView === 'weak-words' ? '🔥' : currentView === 'settings' ? '⚙️' : '✨'}
            </span>
            {weakWordsCount > 0 && (
              <span className="vinyl-sticker absolute -top-1 -right-2 px-1.5 py-0 bg-rose-600 text-white text-[9px]">
                {weakWordsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-['Fredoka'] font-black tracking-tight">More</span>
        </button>
      </nav>
    </>
  );
}
