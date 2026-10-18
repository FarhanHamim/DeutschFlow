import React, { useState } from 'react';
import { 
  Anchor, 
  Scissors, 
  Play, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  Info, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SentenceScenario {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1';
  concept: 'v2' | 'separable' | 'subordinate';
  english: string;
  notes: string;
  ruleExplanation: string;
  modes: {
    key: 'standard' | 'separable' | 'subordinate';
    label: string;
    icon: string;
    description: string;
    tokens: {
      text: string;
      role: 'subject' | 'verb' | 'prefix' | 'conjunction' | 'object' | 'time' | 'kicker';
      roleLabel: string;
      color: string;
      isAnchor?: boolean;
      isScissors?: boolean;
      isKicked?: boolean;
      isSplitPrefix?: boolean;
    }[];
    translation: string;
  }[];
}

const SCENARIOS: SentenceScenario[] = [
  {
    id: 'einkaufen',
    title: 'Grocery Shopping (einkaufen)',
    level: 'A1',
    concept: 'separable',
    english: 'I go shopping at the supermarket.',
    notes: 'The prefix "ein-" detaches and flies all the way to the sentence end (Satzklammer)!',
    ruleExplanation: 'In main clauses, the conjugated verb stem sits firmly in Position 2 ⚓ while the prefix travels to the absolute end.',
    modes: [
      {
        key: 'standard',
        label: 'Infinitive Form',
        icon: '📦',
        description: 'Before splitting: The verb is whole.',
        tokens: [
          { text: 'Ich', role: 'subject', roleLabel: 'Subject (Pos 1)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'muss', role: 'verb', roleLabel: 'Modal Verb ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400', isAnchor: true },
          { text: 'im Supermarkt', role: 'object', roleLabel: 'Middle Field (Mittelfeld)', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'einkaufen', role: 'verb', roleLabel: 'Full Infinitive', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-400' }
        ],
        translation: 'I have to shop at the supermarket.'
      },
      {
        key: 'separable',
        label: 'Separated! (✂️ Satzklammer)',
        icon: '✂️',
        description: 'Present Tense: "kaufe" locks in Pos 2, "ein" gets snipped and sent to the back.',
        tokens: [
          { text: 'Ich', role: 'subject', roleLabel: 'Subject (Pos 1)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'kaufe', role: 'verb', roleLabel: 'Verb Stem ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'im Supermarkt', role: 'object', roleLabel: 'Middle Field (Mittelfeld)', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'ein', role: 'prefix', roleLabel: 'Prefix ✂️ (End)', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold animate-bounce', isScissors: true, isSplitPrefix: true }
        ],
        translation: 'I am shopping at the supermarket.'
      },
      {
        key: 'subordinate',
        label: 'Subordinate: "weil..." (🥾 Kicked)',
        icon: '🥾',
        description: 'Subordinating conjunction "weil" kicks the verb reunited to the very end!',
        tokens: [
          { text: '...weil', role: 'conjunction', roleLabel: 'Kicker Conjunction 🧲', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-400 font-bold' },
          { text: 'ich', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'im Supermarkt', role: 'object', roleLabel: 'Middle Field', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'einkaufe', role: 'verb', roleLabel: 'Kicked Verb 🥾 (Final)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isKicked: true }
        ],
        translation: '...because I am shopping at the supermarket.'
      }
    ]
  },
  {
    id: 'aufstehen',
    title: 'Waking Up Early (aufstehen)',
    level: 'A1',
    concept: 'separable',
    english: 'He wakes up at 7:00 AM.',
    notes: 'Aufstehen splits into "steht ... auf". But with "obwohl" (although), the verb gets kicked back together!',
    ruleExplanation: 'The German sentence bracket (Satzklammer) acts like bookends wrapping around the objects and time phrases.',
    modes: [
      {
        key: 'standard',
        label: 'V2 Question (Anchor)',
        icon: '⚓',
        description: 'Question word in Vorfeld, verb in Pos 2.',
        tokens: [
          { text: 'Wann', role: 'subject', roleLabel: 'W-Word (Pos 1)', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-400' },
          { text: 'steht', role: 'verb', roleLabel: 'Verb ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'er morgen', role: 'time', roleLabel: 'Time & Subject', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'auf?', role: 'prefix', roleLabel: 'Prefix ✂️ (End)', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold', isScissors: true }
        ],
        translation: 'When does he wake up tomorrow?'
      },
      {
        key: 'separable',
        label: 'Standard Main Clause (✂️)',
        icon: '✂️',
        description: 'Prefix "auf" is sliced and placed at the very end.',
        tokens: [
          { text: 'Er', role: 'subject', roleLabel: 'Subject (Pos 1)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'steht', role: 'verb', roleLabel: 'Verb Stem ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'jeden Tag um 7 Uhr', role: 'time', roleLabel: 'Time / Middle Field', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'auf', role: 'prefix', roleLabel: 'Prefix ✂️ (End)', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold', isScissors: true, isSplitPrefix: true }
        ],
        translation: 'He wakes up every day at 7 o’clock.'
      },
      {
        key: 'subordinate',
        label: 'Subordinate: "obwohl..." (🥾)',
        icon: '🥾',
        description: '"obwohl" kicks the whole verb to the final spot!',
        tokens: [
          { text: '...obwohl', role: 'conjunction', roleLabel: 'Kicker Conjunction 🧲', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-400 font-bold' },
          { text: 'er', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'so müde ist,', role: 'object', roleLabel: 'Middle Field', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'steht er auf', role: 'verb', roleLabel: 'Main clause inverted', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400' }
        ],
        translation: '...although he is so tired, he gets up.'
      }
    ]
  },
  {
    id: 'lernen-weil',
    title: 'Studying German (weil & dass)',
    level: 'A2',
    concept: 'subordinate',
    english: 'I am learning German because I live in Berlin.',
    notes: 'The subordinating boot 🥾: Whenever "weil", "dass", "wenn", or "obwohl" appear, the conjugated verb is banished to the caboose of the clause.',
    ruleExplanation: 'The Golden Rule of German Nebensätze: The conjugated verb moves to the LAST position of the sub-clause.',
    modes: [
      {
        key: 'standard',
        label: 'Two Main Clauses (denn)',
        icon: '⚓',
        description: '"denn" does NOT kick the verb! Verb remains in Pos 2.',
        tokens: [
          { text: 'Ich lerne Deutsch,', role: 'object', roleLabel: 'Main Clause 1', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'denn', role: 'conjunction', roleLabel: 'ADUSO Conjunction (Pos 0)', color: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-400 font-bold' },
          { text: 'ich', role: 'subject', roleLabel: 'Subject (Pos 1)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'wohne', role: 'verb', roleLabel: 'Verb ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'in Berlin.', role: 'object', roleLabel: 'Location', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' }
        ],
        translation: 'I learn German, for (because) I live in Berlin.'
      },
      {
        key: 'subordinate',
        label: 'Subordinate with "weil" (🥾 Kicked!)',
        icon: '🥾',
        description: '"weil" triggers the verb-kicker boot: "wohne" is kicked to the back!',
        tokens: [
          { text: 'Ich lerne Deutsch,', role: 'object', roleLabel: 'Main Clause', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'weil', role: 'conjunction', roleLabel: 'Kicker Conjunction 🧲', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-400 font-bold' },
          { text: 'ich', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'in Berlin', role: 'object', roleLabel: 'Location', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'wohne.', role: 'verb', roleLabel: 'Kicked Verb 🥾 (Final)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold animate-pulse', isKicked: true }
        ],
        translation: 'I learn German because I live in Berlin.'
      },
      {
        key: 'separable',
        label: 'Subordinate with Modal: "möchte"',
        icon: '🚂',
        description: 'With a modal verb, the modal gets kicked to the very end!',
        tokens: [
          { text: 'Ich lerne Deutsch,', role: 'object', roleLabel: 'Main Clause', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'weil', role: 'conjunction', roleLabel: 'Kicker Conjunction 🧲', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-400 font-bold' },
          { text: 'ich', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'in Berlin', role: 'object', roleLabel: 'Location', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'studieren', role: 'verb', roleLabel: 'Infinitive Verb', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-400' },
          { text: 'möchte.', role: 'verb', roleLabel: 'Kicked Modal 🥾 (Pos Final)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isKicked: true }
        ],
        translation: 'I learn German because I would like to study in Berlin.'
      }
    ]
  },
  {
    id: 'anrufen',
    title: 'Calling the Doctor (anrufen)',
    level: 'A2',
    concept: 'separable',
    english: 'She calls the doctor because she is sick.',
    notes: 'Watch the double action: "an-" splits to the end of clause 1, then "ist" is kicked to the end of clause 2!',
    ruleExplanation: 'Combines both Separable Verbs and Subordinating Clause in one real-world sentence.',
    modes: [
      {
        key: 'standard',
        label: 'Main Clause Only',
        icon: '⚓',
        description: 'Separable verb "anrufen" splits across the sentence bracket.',
        tokens: [
          { text: 'Sie', role: 'subject', roleLabel: 'Subject (Pos 1)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'ruft', role: 'verb', roleLabel: 'Verb Stem ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'den Arzt heute', role: 'object', roleLabel: 'Accusative + Time', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'an.', role: 'prefix', roleLabel: 'Prefix ✂️ (End)', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold', isScissors: true, isSplitPrefix: true }
        ],
        translation: 'She is calling the doctor today.'
      },
      {
        key: 'subordinate',
        label: 'Full Compound Sentence',
        icon: '🥾',
        description: 'Scissors on the left, Boot on the right!',
        tokens: [
          { text: 'Sie', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'ruft', role: 'verb', roleLabel: 'Verb ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'den Arzt', role: 'object', roleLabel: 'Object', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'an,', role: 'prefix', roleLabel: 'Prefix ✂️', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold', isScissors: true },
          { text: 'weil', role: 'conjunction', roleLabel: 'Kicker 🧲', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-400 font-bold' },
          { text: 'sie', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'krank', role: 'object', roleLabel: 'Adjective', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'ist.', role: 'verb', roleLabel: 'Kicked Verb 🥾', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isKicked: true }
        ],
        translation: 'She calls the doctor because she is sick.'
      },
      {
        key: 'separable',
        label: 'Inverted with Time: "Heute..."',
        icon: '🔄',
        description: 'V2 Rule in action: When "Heute" takes Pos 1, Subject moves behind the Verb!',
        tokens: [
          { text: 'Heute', role: 'time', roleLabel: 'Time (Pos 1)', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-400 font-bold' },
          { text: 'ruft', role: 'verb', roleLabel: 'Verb ⚓ (Pos 2 MUST)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'sie', role: 'subject', roleLabel: 'Subject (Pos 3)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'den Arzt', role: 'object', roleLabel: 'Object', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'an.', role: 'prefix', roleLabel: 'Prefix ✂️ (End)', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold', isScissors: true }
        ],
        translation: 'Today, she is calling the doctor.'
      }
    ]
  },
  {
    id: 'zug-abfahren',
    title: 'The Train Departure (abfahren & dass)',
    level: 'B1',
    concept: 'subordinate',
    english: 'I know that the train departs at 08:30.',
    notes: 'In subordinate clauses with "dass", separable verbs DO NOT split! They stay together at the end.',
    ruleExplanation: 'Secret Hack: If a separable verb gets kicked into a subordinate clause, it glues back together! (abfährt, NOT fährt ... ab).',
    modes: [
      {
        key: 'standard',
        label: 'Main Clause (Splits ✂️)',
        icon: '✂️',
        description: 'The train departs at 08:30 (standard split).',
        tokens: [
          { text: 'Der Zug', role: 'subject', roleLabel: 'Subject (Pos 1)', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'fährt', role: 'verb', roleLabel: 'Verb ⚓ (Pos 2)', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold', isAnchor: true },
          { text: 'um 08:30 Uhr', role: 'time', roleLabel: 'Time', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'ab.', role: 'prefix', roleLabel: 'Prefix ✂️', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 font-bold', isScissors: true }
        ],
        translation: 'The train departs at 08:30.'
      },
      {
        key: 'subordinate',
        label: 'Dass-Clause (Re-glued & Kicked! 🧲)',
        icon: '🥾',
        description: '"dass" kicks the verb AND re-glues the separable prefix!',
        tokens: [
          { text: 'Ich weiß,', role: 'object', roleLabel: 'Main Clause', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'dass', role: 'conjunction', roleLabel: 'Kicker Conjunction 🧲', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-400 font-bold' },
          { text: 'der Zug', role: 'subject', roleLabel: 'Subject', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400' },
          { text: 'um 08:30 Uhr', role: 'time', roleLabel: 'Time', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300' },
          { text: 'abfährt.', role: 'verb', roleLabel: 'Reunited & Kicked 🥾', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400 font-bold ring-2 ring-amber-500', isKicked: true }
        ],
        translation: 'I know that the train departs at 08:30.'
      }
    ]
  }
];

export const VerbKickerVisualizer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);
  const [activeModeIndex, setActiveModeIndex] = useState<number>(1);
  const [animating, setAnimating] = useState<boolean>(false);
  const [activeTokenIndex, setActiveTokenIndex] = useState<number | null>(null);

  const scenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];
  const mode = scenario.modes[activeModeIndex] || scenario.modes[0];

  const handleScenarioChange = (id: string) => {
    sounds.playClick();
    setSelectedScenarioId(id);
    setActiveModeIndex(0);
    setActiveTokenIndex(null);
  };

  const handleModeChange = (index: number) => {
    sounds.playFlip();
    setAnimating(true);
    setActiveModeIndex(index);
    setActiveTokenIndex(null);
    setTimeout(() => setAnimating(false), 500);
  };

  const speakSentence = () => {
    const fullSentence = mode.tokens.map(t => t.text).join(' ').replace(/\s+([,?.!])/g, '$1');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullSentence);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 md:p-8 text-white shadow-xl shadow-orange-500/20">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-200" />
            Interactive Grammar Sandbox
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
            The Verb-Kicker 🥾 & V2 Anchor ⚓
          </h1>
          <p className="mt-2 text-white/90 text-sm md:text-base font-body max-w-2xl">
            Master German word order intuitively with real-time visual physics. See why the verb is locked in Position 2 ⚓, watch prefixes split with scissors ✂️, and witness the mighty conjunction boot 🥾 kicking verbs to the finish line!
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-xs font-bold text-amber-200">
              <Anchor className="w-3.5 h-3.5" />
              <span>V2 Rule: Verb in Position 2</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-xs font-bold text-rose-200">
              <Scissors className="w-3.5 h-3.5" />
              <span>Trennbar: Prefix Flies to End</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-xs font-bold text-purple-200">
              <span>🥾 Nebensatz: Verb Kicked to Final</span>
            </div>
          </div>
        </div>

        {/* Ambient decorative graphic */}
        <div className="absolute right-4 -bottom-6 text-9xl opacity-15 select-none pointer-events-none">
          ⚓🥾
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === scenario.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc.id)}
              className={`tactile-btn flex-shrink-0 px-4 py-2.5 rounded-2xl font-arcade font-bold text-sm transition-all flex items-center gap-2 border-2 ${
                isSelected
                  ? 'bg-amber-500 text-slate-900 border-amber-600 shadow-md scale-102'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <span className={`text-xs px-1.5 py-0.5 rounded font-black ${
                sc.level === 'A1' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                sc.level === 'A2' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                'bg-purple-500/20 text-purple-600 dark:text-purple-400'
              }`}>
                {sc.level}
              </span>
              <span>{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-3 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Scenario Header & Grammar Insight */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                {scenario.title}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                {scenario.concept.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              🇬🇧 English: &quot;{scenario.english}&quot;
            </p>
          </div>

          <button
            onClick={speakSentence}
            className="tactile-btn self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/50 text-slate-700 dark:text-slate-200 hover:text-amber-600 font-bold text-sm border-2 border-slate-200 dark:border-slate-700 transition-colors"
            title="Read sentence aloud in German"
          >
            <Volume2 className="w-4 h-4 text-amber-500" />
            <span>Listen (0.9x)</span>
          </button>
        </div>

        {/* Mode Selector Buttons */}
        <div>
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
            Choose Sentence Structure Rule:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scenario.modes.map((m, idx) => {
              const isSelected = idx === activeModeIndex;
              return (
                <button
                  key={m.key + idx}
                  onClick={() => handleModeChange(idx)}
                  className={`tactile-btn p-3.5 rounded-2xl text-left border-2 transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 shadow-md shadow-amber-500/10'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl mt-0.5">{m.icon}</span>
                  <div>
                    <div className="font-arcade font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {m.label}
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Visual Sentence Animator Board */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-950 dark:to-slate-900/90 p-6 md:p-8 border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
          
          {/* Track Labels: Vorfeld, Finates Verb (Pos 2), Mittelfeld, Satzende */}
          <div className="hidden md:grid grid-cols-4 gap-2 mb-4 text-center text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <div className="p-1 rounded bg-white/60 dark:bg-slate-800/60 border border-dashed border-slate-200 dark:border-slate-700">
              Position 1 (Vorfeld)
            </div>
            <div className="p-1 rounded bg-amber-500/10 border border-dashed border-amber-300 dark:border-amber-700/60 text-amber-600 dark:text-amber-400 font-bold">
              Position 2 ⚓ (Finates Verb)
            </div>
            <div className="p-1 rounded bg-white/60 dark:bg-slate-800/60 border border-dashed border-slate-200 dark:border-slate-700">
              Mittelfeld (Middle Info)
            </div>
            <div className="p-1 rounded bg-purple-500/10 border border-dashed border-purple-300 dark:border-purple-700/60 text-purple-600 dark:text-purple-400 font-bold">
              Nachfeld / Satzende 🥾✂️
            </div>
          </div>

          {/* Words Container */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 min-h-[140px] py-4">
            {mode.tokens.map((token, tIdx) => {
              const isSelected = activeTokenIndex === tIdx;
              return (
                <div
                  key={`${token.text}-${tIdx}-${activeModeIndex}`}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTokenIndex(isSelected ? null : tIdx);
                  }}
                  className={`group relative cursor-pointer select-none transition-all duration-300 transform ${
                    animating ? 'scale-90 opacity-40' : 'scale-100 opacity-100'
                  } ${
                    isSelected ? 'scale-105 z-20' : 'hover:scale-102'
                  }`}
                >
                  {/* Floating Action Badge on Top */}
                  {token.isAnchor && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 font-black text-[10px] flex items-center gap-1 shadow-md animate-bounce">
                      <Anchor className="w-2.5 h-2.5" />
                      <span>V2 ANCHOR</span>
                    </div>
                  )}

                  {token.isScissors && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center gap-1 shadow-md animate-pulse">
                      <Scissors className="w-2.5 h-2.5" />
                      <span>SPLIT PREFIX</span>
                    </div>
                  )}

                  {token.isKicked && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-purple-600 text-white font-black text-[10px] flex items-center gap-1 shadow-md">
                      <span>🥾 KICKED TO END</span>
                    </div>
                  )}

                  {/* Main Word Pill */}
                  <div className={`px-4 py-3 md:px-5 md:py-4 rounded-2xl border-2 font-display text-lg md:text-2xl shadow-sm transition-all ${token.color} ${
                    isSelected ? 'ring-4 ring-amber-400 ring-offset-2 dark:ring-offset-slate-900 shadow-lg' : ''
                  }`}>
                    {token.text}
                  </div>

                  {/* Subtitle / Role Label */}
                  <div className="text-center mt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight">
                    {token.roleLabel}
                  </div>
                </div>
              );
            })}
          </div>

          {/* English Meaning of Current Mode */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 uppercase font-black tracking-wider mr-2">Translation:</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 italic font-body">
              &quot;{mode.translation}&quot;
            </span>
          </div>
        </div>

        {/* Educational Explainer Box */}
        <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 p-5 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-900 font-bold shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-arcade font-bold text-amber-900 dark:text-amber-300 text-sm">
              Alpine Grammar Hack
            </h4>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-body leading-relaxed">
              {scenario.ruleExplanation}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span>Pro Tip:</span>
              <span className="italic">{scenario.notes}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default VerbKickerVisualizer;
