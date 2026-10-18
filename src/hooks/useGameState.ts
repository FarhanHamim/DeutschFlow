// ============================================================
// useGameState Hook — Central Game State Management
// ============================================================

import { useCallback, useMemo } from 'react';
import { GameState, DEFAULT_GAME_STATE, CEFRLevel, RANKS, VocabItem } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { createSM2Data, gradeSM2, SM2Grade } from '../utils/sm2';

export function useGameState() {
  const [state, setState] = useLocalStorage<GameState>('deutschflow-state', DEFAULT_GAME_STATE);

  // Check and update streak
  const checkStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setState((prev) => {
      if (prev.lastActiveDate === today) return prev;

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;

      return { ...prev, streak: newStreak, lastActiveDate: today };
    });
  }, [setState]);

  // Add XP
  const addXP = useCallback(
    (amount: number) => {
      setState((prev) => ({ ...prev, xp: prev.xp + amount }));
    },
    [setState]
  );

  // Set current level
  const setLevel = useCallback(
    (level: CEFRLevel) => {
      setState((prev) => ({ ...prev, currentLevel: level }));
    },
    [setState]
  );

  // Grade a word (SM-2)
  const gradeWord = useCallback(
    (wordId: string, grade: SM2Grade) => {
      setState((prev) => {
        const existingData = prev.sm2Data[wordId] || createSM2Data(wordId);
        const updatedData = gradeSM2(existingData, grade);

        const newWeakWords = grade === 0
          ? [...new Set([...prev.weakWords, wordId])]
          : prev.weakWords.filter((id) => id !== wordId);

        const xpGain = grade === 0 ? 2 : grade === 1 ? 5 : 10;

        return {
          ...prev,
          sm2Data: { ...prev.sm2Data, [wordId]: updatedData },
          weakWords: newWeakWords,
          xp: prev.xp + xpGain,
          wordsLearned: Object.keys({ ...prev.sm2Data, [wordId]: updatedData }).length,
        };
      });
    },
    [setState]
  );

  // Record quiz result
  const recordQuizResult = useCallback(
    (wordId: string, correct: boolean, quizType: string) => {
      setState((prev) => {
        const newWeakWords = !correct
          ? [...new Set([...prev.weakWords, wordId])]
          : prev.weakWords;

        return {
          ...prev,
          quizHistory: [
            ...prev.quizHistory.slice(-500), // keep last 500
            { wordId, correct, timestamp: Date.now(), quizType },
          ],
          weakWords: newWeakWords,
          xp: prev.xp + (correct ? 8 : 1),
          completedQuizzes: prev.completedQuizzes + 1,
        };
      });
    },
    [setState]
  );

  // Add custom word
  const addCustomWord = useCallback(
    (word: VocabItem) => {
      setState((prev) => ({
        ...prev,
        customWords: [...prev.customWords, word],
      }));
    },
    [setState]
  );

  // Remove custom word
  const removeCustomWord = useCallback(
    (wordId: string) => {
      setState((prev) => ({
        ...prev,
        customWords: prev.customWords.filter((w) => w.id !== wordId),
      }));
    },
    [setState]
  );

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setState((prev) => {
      const newDark = !prev.darkMode;
      if (newDark) {
        document.body.classList.add('dark');
        document.documentElement.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
        document.documentElement.classList.remove('dark');
      }
      return { ...prev, darkMode: newDark };
    });
  }, [setState]);

  // Toggle audio mute
  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, audioMuted: !prev.audioMuted }));
  }, [setState]);

  // Export state as JSON
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deutschflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  // Import state from JSON
  const importData = useCallback(
    (jsonString: string) => {
      try {
        const parsed = JSON.parse(jsonString);
        setState({ ...DEFAULT_GAME_STATE, ...parsed });
        return true;
      } catch {
        return false;
      }
    },
    [setState]
  );

  // Current rank
  const currentRank = useMemo(() => {
    const sorted = [...RANKS].sort((a, b) => b.minXP - a.minXP);
    return sorted.find((r) => state.xp >= r.minXP) || RANKS[0];
  }, [state.xp]);

  // Next rank
  const nextRank = useMemo(() => {
    const idx = RANKS.findIndex((r) => r.title === currentRank.title);
    return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
  }, [currentRank]);

  // XP progress to next rank (0-100)
  const xpProgress = useMemo(() => {
    if (!nextRank) return 100;
    const range = nextRank.minXP - currentRank.minXP;
    const progress = state.xp - currentRank.minXP;
    return Math.min(100, Math.round((progress / range) * 100));
  }, [state.xp, currentRank, nextRank]);

  return {
    state,
    setState,
    checkStreak,
    addXP,
    setLevel,
    gradeWord,
    recordQuizResult,
    addCustomWord,
    removeCustomWord,
    toggleDarkMode,
    toggleMute,
    exportData,
    importData,
    currentRank,
    nextRank,
    xpProgress,
  };
}
