// ============================================================
// DeutschFlow — Main Application
// ============================================================

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { preloadVoices } from './utils/audio';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Flashcards from './components/Flashcards';
import QuizArcade from './components/QuizArcade';
import GrammarSheets from './components/GrammarSheets';
import Dialogues from './components/Dialogues';
import WeakWordsVault from './components/WeakWordsVault';
import Settings from './components/Settings';
import AddWordModal from './components/AddWordModal';
import LearningJourney from './components/LearningJourney';
import CompoundWordsLab from './components/CompoundWordsLab';
import VerbKickerVisualizer from './components/VerbKickerVisualizer';
import BossBattles from './components/BossBattles';
import { sounds } from './utils/soundEffects';

export type View =
  | 'dashboard'
  | 'journey'
  | 'flashcards'
  | 'quiz'
  | 'grammar'
  | 'dialogues'
  | 'weak-words'
  | 'compound-words'
  | 'verb-kicker'
  | 'boss-battles'
  | 'settings';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showAddWord, setShowAddWord] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const game = useGameState();

  // Initialize voices and streak
  useEffect(() => {
    preloadVoices();
    game.checkStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync audio mute state with Web Audio synthesizer sound effects
  useEffect(() => {
    sounds.setMuted(game.state.audioMuted);
  }, [game.state.audioMuted]);

  // Global tactile mechanical pop on .tactile-btn press
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.tactile-btn')) {
        sounds.playClick();
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Sync dark mode dynamically with HTML element and document body
  useEffect(() => {
    if (game.state.darkMode) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [game.state.darkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard game={game} onNavigate={setCurrentView} />;
      case 'journey':
        return <LearningJourney game={game} onNavigate={setCurrentView} />;
      case 'flashcards':
        return <Flashcards game={game} />;
      case 'quiz':
        return <QuizArcade game={game} />;
      case 'grammar':
        return <GrammarSheets game={game} />;
      case 'dialogues':
        return <Dialogues game={game} />;
      case 'weak-words':
        return <WeakWordsVault game={game} />;
      case 'compound-words':
        return <CompoundWordsLab game={game} />;
      case 'verb-kicker':
        return <VerbKickerVisualizer />;
      case 'boss-battles':
        return <BossBattles />;
      case 'settings':
        return <Settings game={game} onOpenAddWord={() => setShowAddWord(true)} />;
      default:
        return <Dashboard game={game} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div
      className={`min-h-screen relative selection:bg-[#FF5500] selection:text-white transition-colors duration-300 ${
        game.state.darkMode ? 'bg-[#12131A] text-slate-100' : 'bg-[#FAF8F5] text-slate-900'
      }`}
    >
      {/* Aesthetic Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-40 dark:opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-3xl" />
      </div>

      <TopBar
        game={game}
        onNavigate={setCurrentView}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex relative z-10">
        <Sidebar
          currentView={currentView}
          onNavigate={(v) => {
            setCurrentView(v);
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(!sidebarOpen)}
          darkMode={game.state.darkMode}
          weakWordsCount={game.state.weakWords.length}
          rankTitle={game.currentRank.title}
          rankEmoji={game.currentRank.emoji}
          xpProgress={game.xpProgress}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 md:ml-64 mt-16 min-h-[calc(100vh-4rem)] pb-24 md:pb-12 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-w-6xl mx-auto"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile slideover background overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Add Custom Word Modal */}
      <AddWordModal
        isOpen={showAddWord}
        onClose={() => setShowAddWord(false)}
        game={game}
      />
    </div>
  );
}
