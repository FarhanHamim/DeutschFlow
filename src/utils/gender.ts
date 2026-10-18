// ============================================================
// Gender Color Utility
// ============================================================

import { Gender } from '../types';

export type GenderTheme = {
  bg: string;
  border: string;
  text: string;
  badge: string;
  gradient: string;
  darkBg: string;
  darkBorder: string;
  darkText: string;
};

const genderThemes: Record<string, GenderTheme> = {
  der: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-700',
    badge: '🔵',
    gradient: 'from-blue-400 to-blue-600',
    darkBg: 'dark:bg-blue-950',
    darkBorder: 'dark:border-blue-500',
    darkText: 'dark:text-blue-300',
  },
  die: {
    bg: 'bg-rose-50',
    border: 'border-rose-400',
    text: 'text-rose-700',
    badge: '🔴',
    gradient: 'from-rose-400 to-rose-600',
    darkBg: 'dark:bg-rose-950',
    darkBorder: 'dark:border-rose-500',
    darkText: 'dark:text-rose-300',
  },
  das: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-400',
    text: 'text-emerald-700',
    badge: '🟢',
    gradient: 'from-emerald-400 to-emerald-600',
    darkBg: 'dark:bg-emerald-950',
    darkBorder: 'dark:border-emerald-500',
    darkText: 'dark:text-emerald-300',
  },
  none: {
    bg: 'bg-amber-50',
    border: 'border-amber-400',
    text: 'text-amber-700',
    badge: '⚡',
    gradient: 'from-amber-400 to-purple-500',
    darkBg: 'dark:bg-amber-950',
    darkBorder: 'dark:border-amber-500',
    darkText: 'dark:text-amber-300',
  },
};

export function getGenderTheme(gender?: Gender): GenderTheme {
  return genderThemes[gender || 'none'];
}

export function getGenderCSS(gender?: Gender): string {
  if (!gender || gender === 'none') return 'gender-verb';
  return `gender-${gender}`;
}

export function getArticleDisplay(gender?: Gender): string {
  if (!gender || gender === 'none') return '';
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}
