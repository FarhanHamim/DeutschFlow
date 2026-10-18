# 🥨 DeutschFlow — Tactile German Alpine Arcade

> **Master German from A1 to B1 with tactile Neo-Brutalist joy, synesthetic gender colors, and 1,000 Goethe & Telc aligned words.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-deutschflow.vercel.app-FF5500?style=for-the-badge&logo=vercel&logoColor=white)](https://deutschflow.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-DeutschFlow-18181B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FarhanHamim/DeutschFlow)
[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://deutschflow.vercel.app)

🌐 **Live Demo:** [https://deutschflow.vercel.app](https://deutsch-flow-beta.vercel.app/)  
📦 **Source Code:** [https://github.com/FarhanHamim/DeutschFlow](https://github.com/FarhanHamim/DeutschFlow)

---

DeutschFlow is a personal web application for mastering the German language from levels **A1 (Beginner)**, **A2 (Elementary)**, to **B1 (Intermediate)**. Built specifically for English speakers learning German, all navigation, instructions, and controls are presented in clear English while the learning material is German.

---

## 📸 Key Highlights

- 📚 **1,000 Essential German Words:** Separated levelwise (A1: 400 · A2: 350 · B1: 250) covering daily life in Germany (Supermarkets, Deutsche Bahn train travel, Bürgeramt, WG flatshares, weather, and work).
- 🎨 **Tactile Alpine Arcade & Sticker-Book Aesthetic:** Neo-Brutalism meets Duolingo tactility, physical keycap buttons, and tactile drop shadows.
- 🌈 **Synesthetic Gender Color Coding:** Instant article intuition with **Der** (Electric Blue), **Die** (Coral Rose), and **Das** (Emerald Green).
- 🧠 **SM-2 Spaced Repetition Engine:** Smart review schedules for flashcards and a dedicated **Weak Words Vault** that automatically tracks tricky vocabulary.
- 🔊 **Zero-Dependency Native German Speech:** Natural German pronunciation powered by the Web Speech Synthesis API with normal (1.0x) and slow (0.75x turtle) playback modes.
- 🎮 **4 Quiz Arcade Game Modes:** Rapid-fire Gender drills, Sentence Builder (*Satzbau*), Story Quests (*Fill-in-the-Blank*), and Listening Challenges.
- 🐻 **Bärli the Berlin Bear:** Interactive companion mascot providing context-sensitive grammar tips, Goethe milestones, and cultural trivia.
- 🌓 **Midnight Dark & Warm Cream Light Modes:** Fully responsive, high-contrast dark theme with tactile borders and deep bevels.
- 💾 **100% Offline-Capable & Privacy First:** Zero login required; all XP, streaks, weak words, and custom decks persist in `localStorage` with one-click JSON backup/restore.

---

## 🗺️ Curriculum & Modular Architecture

DeutschFlow’s curriculum follows the official **Common European Framework of Reference for Languages (CEFR)** aligned with **Goethe-Institut** and **Telc** standards:

```
├── Level A1 (400 Words) — Beginner
│   ├── Stages 1–5: Greetings, Numbers, Café & Supermarket, Home & Family, City Transit
│   └── Grammar: Present tense (Präsens), Nominative vs. Accusative articles, W-Questions
│
├── Level A2 (350 Words) — Elementary
│   ├── Stages 6–9: Bürgeramt & Paperwork, DB Trains & Travel, Doctor & Health, WG Flatshare & Weather
│   └── Grammar: Modal verbs, Separable verbs (trennbare Verben), Dative case, Perfect tense (Perfekt)
│
└── Level B1 (250 Words) — Intermediate
    ├── Stages 10–13: Job Interviews & Work, Tenancy & Contracts, Media & Politics, Environment & Debate
    └── Grammar: Subordinate clauses (weil, dass, obwohl), Passive voice (Passiv), Subjunctive II (Konjunktiv II)
```

Every vocabulary item includes:
1. German word & contextual Emoji
2. English translation
3. Grammatical gender (*der / die / das / none*)
4. Plural form (*e.g., die Hunde, die Äpfel*)
5. Mnemonic memory story (*e.g., "A HOUND sounds like HUND — imagine a loyal hound in lederhosen!"*)
6. Natural German example sentence with highlighted syntax
7. Parallel English translation
8. Direct audio pronunciation hook

---

## 🕹️ Interactive Study Modules

### 1. 📊 Central Dashboard
- **Welcome Station:** Shows your current CEFR level, active deck count, player rank (from *Brezel Rookie* to *Goethe Meister*), and daily streak flame.
- **German Proverb of the Day:** Authentic German idioms with pronunciation and idiomatic translations.
- **Action Launchers:** Direct tactile shortcuts to your next roadmap stage, flashcard deck, or arcade challenge.
- **Curriculum Radar:** Real-time breakdown of learned words, quiz accuracy, and weak words count.

### 2. 🗺️ German Learning Roadmap (13 Stages)
- Visual step-by-step journey from your first German greeting to B1 conversational fluency.
- Filters for `Full Path (1–13)`, `Level A1`, `Level A2`, and `Level B1`.
- Detailed stage guide station featuring:
  - **Learning Mission & Real-Life Context**
  - **Grammar Anchor:** Core syntactic rules for that stage
  - **Core Vocabulary Targets:** Quick-listen pronunciation chips
  - **Goethe Stage Checkpoint:** Practical fluency checklist
  - **Mastery Tip:** Expert language-acquisition heuristics

### 3. 🃏 Collectible 3D Flashcards
- 3D tactile card flip animations powered by Framer Motion.
- High-contrast stage featuring German noun gender aura ribbons.
- Flipped side reveals English definition, plural forms, authentic example sentence, and a warm sticky-paper mnemonic note pinned to the card.
- **SM-2 Grading Buttons:** `Hard [1]`, `Good [2]`, `Easy [3]` with keyboard shortcuts.
- Dual-speed German audio playback: `1.0x Normal` and `0.75x Slow`.

### 4. 🎮 Quiz Arcade Lobby (4 Game Modes)
1. **Der, Die, or Das? (Speed Drill):** Fast-paced gender reflex arcade. Rapidly identify whether a noun takes *der*, *die*, or *das*. Supports physical keyboard shortcuts (`1`, `2`, `3`).
2. **Sentence Builder (Satzbau):** Construct authentic German sentences by clicking and arranging word chips in valid syntax, reinforcing verb positions (V2 rule, subordinate clause verb-final placement).
3. **Story Quests (Fill-in-the-Blank):** Real-life dialogue stories set in bakeries, airports, clinics, and government offices where you fill in missing words.
4. **Listening Ear Trainer:** Listen to natural German speech synthesis and choose the matching word or phrase among phonetic distractors.

### 5. 📚 Grammar Reference Sheets
- Interactive syntax cheat sheets with accordion cards for Nominative, Accusative, Dative, Two-Way Prepositions (*Wechselpräpositionen*), Modal Verbs, and Sentence Structure.
- Comparative declension tables and color-highlighted pattern examples with one-click audio.

### 6. 💬 Roleplay Stories
- Authentic conversational roleplay simulations with animated DiceBear character avatars.
- Turn-by-turn interactive chat bubbles with audio playback and parallel English translations.
- Scenarios: Ordering at a German bakery (*Bäckerei*), reserving a train ticket (*DB Reisezentrum*), flat hunting (*WG-Besichtigung*), and visiting the doctor (*Beim Arzt*).

### 7. 🔥 Weak Words Vault
- Automatically captures every word you missed in quizzes or rated "Hard" in flashcards.
- Provides focused drill sessions until challenged words are committed to long-term memory.
- Searchable by German or English with level filters (`ALL`, `A1`, `A2`, `B1`).

### 8. ⚙️ Settings & Data Management
- Set default CEFR target level (`A1`, `A2`, `B1`).
- Dark/Light theme toggle (Warm Cream Oat Paper vs. Midnight Alpine Dark).
- Web Speech audio test and mute controls.
- **Custom Vocabulary Deck:** Append your own German words with custom emojis, mnemonics, and example sentences.
- **Backup & Restore:** One-click JSON export and import for zero data loss.
- **Danger Zone:** Option to reset XP and streak history.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Context | Action |
|:---:|:---:|:---|
| <kbd>Space</kbd> | Flashcards | Flip active flashcard |
| <kbd>←</kbd> | Flashcards | Previous card |
| <kbd>→</kbd> | Flashcards | Next card |
| <kbd>1</kbd> | Flashcards | Grade card as **Hard** (0) |
| <kbd>2</kbd> | Flashcards | Grade card as **Good** (1) |
| <kbd>3</kbd> | Flashcards | Grade card as **Easy** (2) |
| <kbd>1</kbd> | Gender Quiz | Select **DER** (Masculine) |
| <kbd>2</kbd> | Gender Quiz | Select **DIE** (Feminine) |
| <kbd>3</kbd> | Gender Quiz | Select **DAS** (Neuter) |

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript 6](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 8](https://vitejs.dev/) (Sub-second HMR, optimized production build)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with bespoke Neo-Brutalist utility tokens
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (3D card flips, layout shifts, spring physics)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visuals & Avatars:** [DiceBear Adventurer API](https://www.dicebear.com/)
- **Celebrations:** [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Audio:** Native HTML5 `window.speechSynthesis` (German `de-DE` locale)
- **Typography:** Google Fonts:
  - `--font-display`: `'Fraunces'` (700, 900)
  - `--font-arcade`: `'Fredoka'` (600, 700)
  - `--font-sans`: `'Plus Jakarta Sans'` (500, 600, 700)
  - `--font-mono`: `'Space Mono'` (700)

---

## 📁 Project Structure

```
d:/German Learning Site/
├── index.html                   # HTML entry point with Google Fonts preconnects
├── package.json                 # Project dependencies & npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
│
├── src/
│   ├── main.tsx                 # React application root
│   ├── App.tsx                  # Main layout, view router & theme sync
│   ├── index.css                # Neo-Brutalist design tokens, custom dark variant & styles
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces (VocabItem, GameState, CEFRLevel)
│   │
│   ├── data/
│   │   ├── vocabA1.ts           # 400 A1 vocabulary items (Goethe-Zertifikat aligned)
│   │   ├── vocabA2.ts           # 350 A2 vocabulary items (Daily life & bureaucracy)
│   │   ├── vocabB1.ts           # 250 B1 vocabulary items (Work, debate, contracts)
│   │   └── germanCurriculum.ts  # Unified 1,000 words, 13 stages, grammar & dialogues
│   │
│   ├── hooks/
│   │   ├── useGameState.ts      # Core game loop, SM-2 grading, streaks, ranks & XP
│   │   └── useLocalStorage.ts   # Resilient localStorage hook with fallback
│   │
│   ├── utils/
│   │   ├── audio.ts             # Web Speech Synthesis helper (German speech & rate)
│   │   └── sm2.ts               # SuperMemo SM-2 spaced repetition algorithm
│   │
│   └── components/
│       ├── TopBar.tsx           # Tactile header, CEFR sticker selector & Bärli
│       ├── Sidebar.tsx          # Desktop left navigation & mobile floating dock
│       ├── Dashboard.tsx        # Overview, proverb, stats, and action stations
│       ├── LearningJourney.tsx  # 13-stage Goethe roadmap timeline & stage guide
│       ├── Flashcards.tsx       # 3D interactive collectible cards with SM-2 controls
│       ├── QuizArcade.tsx       # 4-mode game lobby (Gender, Sentence, Story, Audio)
│       ├── GrammarSheets.tsx    # Interactive syntax reference & declension tables
│       ├── Dialogues.tsx        # Authentic roleplay stories with DiceBear avatars
│       ├── WeakWordsVault.tsx   # Automated spaced repetition vault for missed words
│       ├── Settings.tsx         # Preferences, audio tester, custom vocab & backup
│       ├── AddWordModal.tsx     # Modal to add user-defined custom German words
│       ├── MascotBarli.tsx      # Interactive Berlin Bear mascot & speech bubble
│       │
│       └── quizzes/
│           ├── GenderQuiz.tsx        # High-speed Der/Die/Das reflex quiz
│           ├── SentenceBuilder.tsx   # Click-to-assemble word order syntax quiz
│           ├── FillInBlank.tsx       # Dialogue quest cloze challenge
│           └── ListeningChallenge.tsx# Phonetic ear-training challenge
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd "German Learning Site"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 📦 Production Build & Vercel Deployment

### Build Locally
To create an optimized production build:
```bash
npm run build
```
This runs `tsc` (TypeScript type checking) followed by `vite build`. Output assets are written to the `dist/` directory with zero build errors.

To preview the production build locally:
```bash
npm run preview
```

### Deploy to Vercel (Zero-Config)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Keep the default settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your German learning application is live worldwide!

---

## 🎨 Design Philosophy & Synesthetic Colors

DeutschFlow rejects sterile, generic corporate dashboards in favor of the **Tactile Alpine Arcade**:
- **Physical Affordance:** Buttons feature visible 3D bottom bevels (`border-b-4`) that physically depress on click or tap (`active:translate-y-1`).
- **Synesthetic Gender Retention:** Color psychology is directly mapped to grammatical gender:
  - 🔵 **Der** = `#3B82F6` (Electric Blue)
  - 🔴 **Die** = `#F43F5E` (Vivid Coral Rose)
  - 🟢 **Das** = `#10B981` (Alpine Emerald)
  - 🟡 **Verben & Satzbau** = `#F59E0B` (Amber Gold)
- **High-Contrast Midnight Dark Mode:** Built with deep Midnight Ink (`#12131A`), card surfaces (`#1E202B`), and visible slate borders (`#2E3245`) so elements never blend into invisible blacks.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
Feel free to fork, expand the curriculum, or customize the game engine for other languages!
