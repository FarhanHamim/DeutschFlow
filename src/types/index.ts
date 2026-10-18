// ============================================================
// DeutschFlow — Core Type Definitions
// ============================================================

export type CEFRLevel = 'A1' | 'A2' | 'B1';

export type Gender = 'der' | 'die' | 'das' | 'none';

export type WordCategory =
  | 'noun'
  | 'verb'
  | 'phrase'
  | 'adjective'
  | 'preposition'
  | 'conjunction';

export type GrammarTopic = {
  id: string;
  level: CEFRLevel;
  title: string;
  titleDe: string;
  emoji: string;
  explanation: string;
  table?: GrammarTable;
  examples: GrammarExample[];
  tip?: string;
};

export type GrammarTable = {
  headers: string[];
  rows: string[][];
};

export type GrammarExample = {
  german: string;
  english: string;
  highlight?: string; // substring to highlight
};

export type VocabItem = {
  id: string;
  level: CEFRLevel;
  category: WordCategory;
  german: string;
  english: string;
  gender?: Gender;
  plural?: string;
  emoji: string;
  mnemonic: string;
  exampleDe: string;
  exampleEn: string;
  tags?: string[];
};

export type DialogueScenario = {
  id: string;
  level: CEFRLevel;
  title: string;
  titleDe: string;
  emoji: string;
  setting: string;
  characters: DialogueCharacter[];
  lines: DialogueLine[];
};

export type DialogueCharacter = {
  name: string;
  role: string;
  avatarSeed: string;
};

export type DialogueLine = {
  speaker: string;
  german: string;
  english: string;
  isBlank?: boolean;
  blankAnswer?: string;
  options?: string[];
};

export type JourneyStage = {
  id: string;
  stageNumber: number;
  level: CEFRLevel;
  title: string;
  titleDe: string;
  emoji: string;
  description: string;
  grammarFocus: string;
  vocabFocus: string[];
  checkpoint: string;
  tip: string;
  filterTag?: string;
};

// ============================================================
// Spaced Repetition & Game State
// ============================================================

export type SM2Data = {
  wordId: string;
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReview: number; // timestamp
  lastReview: number;
};

export type QuizResult = {
  wordId: string;
  correct: boolean;
  timestamp: number;
  quizType: string;
};

export type GameState = {
  xp: number;
  streak: number;
  lastActiveDate: string; // ISO date string
  currentLevel: CEFRLevel;
  completedQuizzes: number;
  wordsLearned: number;
  weakWords: string[]; // word IDs
  sm2Data: Record<string, SM2Data>;
  customWords: VocabItem[];
  quizHistory: QuizResult[];
  audioMuted: boolean;
  darkMode: boolean;
};

export type Rank = {
  title: string;
  emoji: string;
  minXP: number;
};

export const RANKS: Rank[] = [
  { title: 'Brezel Rookie', emoji: '🥨', minXP: 0 },
  { title: 'Kartoffel Starter', emoji: '🥔', minXP: 100 },
  { title: 'Biergarten Regular', emoji: '🍺', minXP: 300 },
  { title: 'Marktplatz Explorer', emoji: '🏰', minXP: 600 },
  { title: 'Berlin Adventurer', emoji: '🐻', minXP: 1000 },
  { title: 'Schwarzwald Wanderer', emoji: '🌲', minXP: 1500 },
  { title: 'Dichter & Denker', emoji: '📚', minXP: 2500 },
  { title: 'Goethe Meister', emoji: '🏆', minXP: 4000 },
];

export const DEFAULT_GAME_STATE: GameState = {
  xp: 0,
  streak: 0,
  lastActiveDate: '',
  currentLevel: 'A1',
  completedQuizzes: 0,
  wordsLearned: 0,
  weakWords: [],
  sm2Data: {},
  customWords: [],
  quizHistory: [],
  audioMuted: false,
  darkMode: false,
};
