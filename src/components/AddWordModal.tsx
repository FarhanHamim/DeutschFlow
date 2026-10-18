// ============================================================
// AddWordModal — Add Custom Vocabulary to DeutschFlow
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles, Volume2 } from 'lucide-react';
import { CEFRLevel, Gender, WordCategory, VocabItem } from '../types';
import { speakGerman } from '../utils/audio';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  game: ReturnType<typeof import('../hooks/useGameState').useGameState>;
};

const POPULAR_EMOJIS = ['🇩🇪', '☕', '🥐', '🏠', '🚗', '📚', '💼', '💻', '🚲', '🍕', '🐱', '🐶', '✈️', '🌟'];

export default function AddWordModal({ isOpen, onClose, game }: Props) {
  const { addCustomWord, state } = game;

  const [german, setGerman] = useState('');
  const [english, setEnglish] = useState('');
  const [level, setLevel] = useState<CEFRLevel>(state.currentLevel);
  const [category, setCategory] = useState<WordCategory>('noun');
  const [gender, setGender] = useState<Gender>('der');
  const [plural, setPlural] = useState('');
  const [emoji, setEmoji] = useState('🇩🇪');
  const [mnemonic, setMnemonic] = useState('');
  const [exampleDe, setExampleDe] = useState('');
  const [exampleEn, setExampleEn] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!german.trim() || !english.trim()) {
      setError('Please provide both the German word and English translation.');
      return;
    }

    const newWord: VocabItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      german: german.trim(),
      english: english.trim(),
      level,
      category,
      gender: category === 'noun' ? gender : 'none',
      plural: plural.trim() || undefined,
      emoji: emoji.trim() || '🇩🇪',
      mnemonic: mnemonic.trim(),
      exampleDe: exampleDe.trim() || `${german.trim()} ist wichtig.`,
      exampleEn: exampleEn.trim() || `${english.trim()} is important.`,
    };

    addCustomWord(newWord);

    // Reset fields
    setGerman('');
    setEnglish('');
    setPlural('');
    setMnemonic('');
    setExampleDe('');
    setExampleEn('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl border-2 p-6 z-10 max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1E202B] border-black dark:border-[#2E3245] shadow-[0_10px_0_0_#000] dark:shadow-[0_10px_0_0_#090A0F] text-slate-900 dark:text-white"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#2E3245]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <h2 className="font-['Fraunces'] text-xl font-black">Add Custom Vocabulary</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 opacity-70 hover:opacity-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Level and Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">CEFR Level</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['A1', 'A2', 'B1'] as CEFRLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        level === lvl
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as WordCategory)}
                  className={`w-full py-2 px-3 rounded-lg text-xs border font-medium ${
                    state.darkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="noun">Noun (Nomen)</option>
                  <option value="verb">Verb (Verb)</option>
                  <option value="phrase">Phrase / Idiom</option>
                  <option value="adjective">Adjective</option>
                  <option value="preposition">Preposition</option>
                  <option value="conjunction">Conjunction</option>
                </select>
              </div>
            </div>

            {/* Gender selector if noun */}
            {category === 'noun' && (
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Grammatical Article</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('der')}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      gender === 'der'
                        ? 'border-blue-500 bg-blue-500/20 text-blue-500 font-extrabold'
                        : 'border-slate-200 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    der (Masc)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('die')}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      gender === 'die'
                        ? 'border-rose-500 bg-rose-500/20 text-rose-500 font-extrabold'
                        : 'border-slate-200 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    die (Fem)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('das')}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      gender === 'das'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-500 font-extrabold'
                        : 'border-slate-200 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    das (Neut)
                  </button>
                </div>
              </div>
            )}

            {/* German & English */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">
                  German Word / Phrase *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. der Feierabend"
                    value={german}
                    onChange={(e) => setGerman(e.target.value)}
                    className={`w-full py-2 px-3 pr-9 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      state.darkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                  {german.trim() && (
                    <button
                      type="button"
                      onClick={() => speakGerman(german, 1.0, state.audioMuted)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 p-1 hover:opacity-80"
                      title="Test Audio"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">
                  English Translation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. end of the working day"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  className={`w-full py-2 px-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    state.darkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Plural and Emoji */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category === 'noun' && (
                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">
                    Plural Form (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. die Feierabende"
                    value={plural}
                    onChange={(e) => setPlural(e.target.value)}
                    className={`w-full py-2 px-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      state.darkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Icon Emoji</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={3}
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className={`w-14 text-center py-2 px-2 rounded-xl text-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      state.darkMode
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  />
                  <div className="flex gap-1 overflow-x-auto py-1">
                    {POPULAR_EMOJIS.slice(0, 6).map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setEmoji(em)}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-base"
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mnemonic Memory Hook */}
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">
                Mnemonic / Memory Hook (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Think of 'party evening' when work is over!"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                className={`w-full py-2 px-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  state.darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Example Sentences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">
                  Example Sentence (German)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schönen Feierabend!"
                  value={exampleDe}
                  onChange={(e) => setExampleDe(e.target.value)}
                  className={`w-full py-2 px-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    state.darkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">
                  Example Translation (English)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Have a nice evening!"
                  value={exampleEn}
                  onChange={(e) => setExampleEn(e.target.value)}
                  className={`w-full py-2 px-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    state.darkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <Plus size={16} />
                <span>Save Word</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
