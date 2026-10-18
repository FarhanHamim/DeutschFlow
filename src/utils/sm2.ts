// ============================================================
// SM-2 Spaced Repetition Algorithm (Simplified)
// ============================================================

import { SM2Data } from '../types';

export type SM2Grade = 0 | 1 | 2; // 0=Hard, 1=Good, 2=Easy

export function createSM2Data(wordId: string): SM2Data {
  return {
    wordId,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 1,
    nextReview: Date.now(),
    lastReview: Date.now(),
  };
}

export function gradeSM2(data: SM2Data, grade: SM2Grade): SM2Data {
  const now = Date.now();
  let { repetitions, easeFactor, interval } = data;

  if (grade === 0) {
    // Hard — reset
    repetitions = 0;
    interval = 1;
  } else if (grade === 1) {
    // Good
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Easy
    if (repetitions === 0) {
      interval = 2;
    } else if (repetitions === 1) {
      interval = 5;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetitions += 1;
    easeFactor = Math.max(1.3, easeFactor + 0.15);
  }

  // Adjust ease factor for hard
  if (grade === 0) {
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (grade === 1) {
    easeFactor = Math.max(1.3, easeFactor - 0.05);
  }

  const nextReview = now + interval * 24 * 60 * 60 * 1000; // days to ms

  return {
    wordId: data.wordId,
    repetitions,
    easeFactor,
    interval,
    nextReview,
    lastReview: now,
  };
}

export function isDueForReview(data: SM2Data): boolean {
  return Date.now() >= data.nextReview;
}

export function getMasteryLevel(data: SM2Data): 'new' | 'learning' | 'reviewing' | 'mastered' {
  if (data.repetitions === 0) return 'new';
  if (data.repetitions < 3) return 'learning';
  if (data.interval < 21) return 'reviewing';
  return 'mastered';
}
