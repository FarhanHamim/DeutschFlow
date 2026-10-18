// ============================================================
// Bärli the Berlin Bear 🐻🎧 — Interactive Mascot Companion
// Reacts with dynamic speech bubbles, expressions & audio tips
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles, X } from 'lucide-react';
import { speakGerman } from '../utils/audio';

type Props = {
  streak: number;
  xp: number;
  level: string;
  isMuted?: boolean;
};

const MASCOT_MESSAGES = {
  intro: [
    { de: 'Hallo! Ich bin Bärli. Bereit für Deutsch heute?', en: 'Hi! I am Bärli. Ready for German today?' },
    { de: 'Übung macht den Meister!', en: 'Practice makes perfect!' },
    { de: 'Auf geht\'s! Schnapp dir ein paar XP!', en: 'Let\'s go! Grab some XP!' },
  ],
  streak: [
    { de: 'Wahnsinn! Dein Streak brennt lichterloh! 🔥', en: 'Incredible! Your streak is burning bright!' },
    { de: 'Jeden Tag ein bisschen — so lernt man Deutsch!', en: 'A little every day — that is how you learn German!' },
  ],
  milestone: [
    { de: 'Du machst fantastische Fortschritte!', en: 'You are making fantastic progress!' },
    { de: 'Der Dativ ist dem Genitiv sein Tod... aber du schaffst das!', en: 'German grammar is tricky, but you got this!' },
  ],
};

export default function MascotBarli({ streak, xp, level, isMuted = false }: Props) {
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = streak > 2 ? MASCOT_MESSAGES.streak : MASCOT_MESSAGES.intro;
  const quote = quotes[currentQuoteIndex % quotes.length];

  const handleMascotClick = () => {
    setBubbleOpen(!bubbleOpen);
    if (!bubbleOpen) {
      speakGerman(quote.de, 1.0, isMuted);
    }
  };

  const nextQuote = () => {
    const nextIdx = (currentQuoteIndex + 1) % quotes.length;
    setCurrentQuoteIndex(nextIdx);
    speakGerman(quotes[nextIdx].de, 1.0, isMuted);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Speech Bubble */}
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute right-0 top-12 z-50 w-72 p-4 rounded-2xl bg-white dark:bg-[#1E202B] border-[2.5px] border-[#18181B] dark:border-[#2E3245] shadow-[0px_6px_0px_#18181B] dark:shadow-[0px_6px_0px_#090A0F]"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FF5500] font-[Fredoka] flex items-center gap-1">
                <Sparkles size={13} /> Bärli's German Tip:
              </span>
              <button
                onClick={() => setBubbleOpen(false)}
                className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                aria-label="Close speech bubble"
              >
                <X size={14} />
              </button>
            </div>

            <p className="font-[Fredoka] text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1">
              "{quote.de}"
            </p>
            <p className="text-xs opacity-75 font-semibold mb-3 text-slate-600 dark:text-slate-300">"{quote.en}"</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <button
                onClick={() => speakGerman(quote.de, 1.0, isMuted)}
                className="text-[#FF5500] font-bold flex items-center gap-1 hover:opacity-80"
              >
                <Volume2 size={14} /> Listen
              </button>

              <button
                onClick={nextQuote}
                className="font-bold opacity-75 hover:opacity-100 text-[#18181B] dark:text-white"
              >
                Next Tip →
              </button>
            </div>

            {/* Bubble arrow */}
            <div className="absolute -top-2.5 right-4 w-4 h-4 bg-white dark:bg-[#1E202B] border-t-[2.5px] border-l-[2.5px] border-[#18181B] dark:border-[#2E3245] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar Trigger */}
      <motion.button
        onClick={handleMascotClick}
        whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
        whileTap={{ scale: 0.92 }}
        className="relative group p-1 rounded-2xl bg-amber-100 dark:bg-amber-950/40 border-[2.5px] border-[#18181B] dark:border-black shadow-[0px_3px_0px_#18181B] dark:shadow-[0px_3px_0px_#000000] flex items-center justify-center cursor-pointer transition-all"
        title="Chat with Bärli the Berlin Bear"
        aria-label="Bärli mascot companion"
      >
        <span className="text-2xl select-none leading-none">🐻</span>
        <span className="absolute -bottom-1 -right-1 text-[11px] leading-none select-none">
          🎧
        </span>
      </motion.button>
    </div>
  );
}
