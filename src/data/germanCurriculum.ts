// ============================================================
// DeutschFlow — Complete German Curriculum Seed Data
// A1, A2, B1 aligned with Goethe-Institut / Telc standards
// ============================================================

import { VocabItem, GrammarTopic, DialogueScenario, JourneyStage, CEFRLevel } from '../types';

// ============================================================
// 1. COMBINED VOCABULARY DATABASE (1,000 WORDS TOTAL, SEPARATED LEVELWISE)
// ============================================================

import { vocabA1 } from './vocabA1';
import { vocabA2 } from './vocabA2';
import { vocabB1 } from './vocabB1';

export { vocabA1, vocabA2, vocabB1 };

export const vocabularyData: VocabItem[] = [
  ...vocabA1,
  ...vocabA2,
  ...vocabB1,
];

// ============================================================
// 2. LEARNING JOURNEY ROADMAP (13 STEP-BY-STEP STAGES)
// ============================================================

export const journeyStages: JourneyStage[] = [
  {
    "id": "stage-1",
    "stageNumber": 1,
    "level": "A1",
    "title": "Erste Schritte & Begrüßung",
    "titleDe": "First Steps & Greetings",
    "emoji": "🌱",
    "description": "Learn the German phonetic alphabet, core numbers, personal introductions, and essential polite greetings.",
    "grammarFocus": "Personal pronouns (ich, du, er, sie, es) and basic verb conjugation in Präsens (sein, haben, heißen).",
    "vocabFocus": [
      "Guten Tag",
      "Name",
      "Uhr",
      "sein",
      "haben",
      "sprechen",
      "lernen",
      "Bitte",
      "Danke schön"
    ],
    "checkpoint": "Introduce yourself confidently, ask where someone is from, and count to 100 in German.",
    "tip": "German pronunciation is phonetic: every letter is pronounced consistently once you know the rules.",
    "filterTag": "stage-1"
  },
  {
    "id": "stage-2",
    "stageNumber": 2,
    "level": "A1",
    "title": "Essen & Trinken im Restaurant",
    "titleDe": "Food, Drinks & Ordering",
    "emoji": "🥨",
    "description": "Navigate a German bakery, supermarket, or traditional Biergarten. Order food and ask for the bill.",
    "grammarFocus": "Akkusativ case for direct objects (den / die / das) and polite requests with \"möchten\".",
    "vocabFocus": [
      "Brot",
      "Kaffee",
      "Wasser",
      "Käse",
      "Bier",
      "Apfel",
      "lecker",
      "essen",
      "trinken",
      "kaufen"
    ],
    "checkpoint": "Order your favorite meal in a German restaurant and ask \"Wie viel kostet das?\".",
    "tip": "Notice that in Akkusativ, ONLY the masculine article changes: der -> den. Die and das stay the same!",
    "filterTag": "stage-2"
  },
  {
    "id": "stage-3",
    "stageNumber": 3,
    "level": "A1",
    "title": "Wohnen & Mein Alltag",
    "titleDe": "Home, Family & Living",
    "emoji": "🏠",
    "description": "Describe your apartment, furniture, rooms, family members, and everyday domestic items.",
    "grammarFocus": "Possessive articles (mein / dein / sein / ihr) and plural noun endings (-e, -er, -en, -s).",
    "vocabFocus": [
      "Haus",
      "Zimmer",
      "Tisch",
      "Stuhl",
      "Fenster",
      "Tür",
      "Familie",
      "Mutter",
      "Vater",
      "wohnen"
    ],
    "checkpoint": "Give a 2-minute spoken tour of your home and describe your immediate family.",
    "tip": "Always memorize German nouns together with their definite article: never just \"Haus\", always \"das Haus\".",
    "filterTag": "stage-3"
  },
  {
    "id": "stage-4",
    "stageNumber": 4,
    "level": "A1",
    "title": "Unterwegs in der Stadt",
    "titleDe": "City, Transport & Directions",
    "emoji": "🚉",
    "description": "Navigate public transit (U-Bahn, S-Bahn, ICE), ask for directions, and understand street signs.",
    "grammarFocus": "Prepositions of place (in, an, auf, nach, zu) and V2 word order inversion (Morgen fahre ich...).",
    "vocabFocus": [
      "Stadt",
      "Straße",
      "Bahnhof",
      "Zug",
      "Auto",
      "Fahrrad",
      "gehen",
      "fahren",
      "schnell"
    ],
    "checkpoint": "Ask a passerby for directions to the train station and purchase a transit ticket.",
    "tip": "When a sentence starts with time or place, the verb MUST stay in position 2: \"Heute gehe ich\" (not \"Heute ich gehe\").",
    "filterTag": "stage-4"
  },
  {
    "id": "stage-5",
    "stageNumber": 5,
    "level": "A1",
    "title": "A1 Goethe Abschluss-Check",
    "titleDe": "A1 Milestone & Article Mastery",
    "emoji": "🏆",
    "description": "Consolidate all A1 vocabulary, master der/die/das instincts, and test your readiness for Goethe A1 Start Deutsch.",
    "grammarFocus": "Full A1 grammar synthesis: Nominativ, Akkusativ, basic sentence order, negation with nicht/kein.",
    "vocabFocus": [
      "Hund",
      "Katze",
      "Buch",
      "Zeit",
      "Geld",
      "Arbeit",
      "gut",
      "schlecht",
      "groß",
      "klein"
    ],
    "checkpoint": "Pass the A1 Quiz Arcade with 80%+ accuracy and review any weak words in your Vault.",
    "tip": "Celebration! Completing Stage 5 means you possess over 500 recognized German words and basic fluency.",
    "filterTag": "stage-1"
  },
  {
    "id": "stage-6",
    "stageNumber": 6,
    "level": "A2",
    "title": "Arbeit & Berufsalltag",
    "titleDe": "Workplace & Daily Office Life",
    "emoji": "💼",
    "description": "Communicate with colleagues, arrange meetings (Termine), write simple emails, and discuss your profession.",
    "grammarFocus": "Separable prefix verbs (anrufen, aufstehen, mitbringen) and modal verbs in present tense.",
    "vocabFocus": [
      "Büro",
      "Kollege",
      "Kollegin",
      "Termin",
      "Feierabend",
      "anrufen",
      "aufstehen",
      "pünktlich",
      "wichtig"
    ],
    "checkpoint": "Schedule a formal appointment by phone and write a polite confirmation message.",
    "tip": "In separable verbs, the prefix always flies to the very end of the main clause: \"Ich rufe dich morgen an.\"",
    "filterTag": "stage-6"
  },
  {
    "id": "stage-7",
    "stageNumber": 7,
    "level": "A2",
    "title": "Reisen & Urlaub im DACH-Raum",
    "titleDe": "Travel & Hotels in Germany, Austria, Swiss",
    "emoji": "✈️",
    "description": "Book hotels, handle travel situations at the airport, and explore German-speaking geographic culture.",
    "grammarFocus": "Wechselpräpositionen (two-way prepositions: in, an, auf, über, unter) with Akkusativ (movement) vs Dativ (location).",
    "vocabFocus": [
      "Reise",
      "Flughafen",
      "Flugzeug",
      "Koffer",
      "Hotel",
      "sauber",
      "ankommen",
      "gefallen"
    ],
    "checkpoint": "Check into a hotel, resolve a minor room complaint, and ask about local sightseeing excursions.",
    "tip": "Memory trick: Wo? (Where at?) takes Dativ. Wohin? (Where to?) takes Akkusativ.",
    "filterTag": "stage-7"
  },
  {
    "id": "stage-8",
    "stageNumber": 8,
    "level": "A2",
    "title": "Gesundheit & Freizeit",
    "titleDe": "Doctor, Body & Hobbies",
    "emoji": "🩺",
    "description": "Describe physical symptoms to a physician (Arzt), understand prescriptions, and talk about hobbies and weekends.",
    "grammarFocus": "Dativ verbs (helfen, danken, gefallen) and personal pronouns in Dativ (mir, dir, ihm, ihr, uns, ihnen).",
    "vocabFocus": [
      "Arzt",
      "Ärztin",
      "Krankenhaus",
      "Wetter",
      "Sonne",
      "Regen",
      "Geschenk",
      "helfen",
      "sich freuen"
    ],
    "checkpoint": "Explain a health symptom at the pharmacy and purchase the correct over-the-counter medicine.",
    "tip": "Verbs like \"helfen\" demand Dativ: always say \"Kann ich Ihnen helfen?\" never \"Sie\".",
    "filterTag": "stage-8"
  },
  {
    "id": "stage-9",
    "stageNumber": 9,
    "level": "A2",
    "title": "Vergangenheit & Satzverbindung",
    "titleDe": "The Past Tense (Perfekt) & Connectors",
    "emoji": "⏳",
    "description": "Tell engaging stories about what happened yesterday, last year, or during your childhood.",
    "grammarFocus": "Das Perfekt with haben vs sein (movement/change of state) + Partizip II, and subclause connectors (weil, dass, wenn).",
    "vocabFocus": [
      "können",
      "müssen",
      "wollen",
      "dürfen",
      "sollen",
      "weil",
      "dass",
      "deshalb"
    ],
    "checkpoint": "Narrate your weekend activities in 5 complete German sentences using Perfekt tense.",
    "tip": "Movement and state-change verbs take sein in Perfekt: \"Ich bin gefahren\", \"Er ist aufgewacht\".",
    "filterTag": "stage-9"
  },
  {
    "id": "stage-10",
    "stageNumber": 10,
    "level": "B1",
    "title": "Karriere, Bewerbung & Ausbildung",
    "titleDe": "Career, Job Interviews & Education",
    "emoji": "🎯",
    "description": "Draft a German curriculum vitae (Lebenslauf), prepare for a job interview, and discuss career ambitions.",
    "grammarFocus": "Verbs with fixed prepositions (sich bewerben um, teilnehmen an, sich freuen auf/über) + Da-/Wo-compounds.",
    "vocabFocus": [
      "Erfahrung",
      "Ausbildung",
      "Bewerbung",
      "Verantwortung",
      "Gesellschaft",
      "zuverlässig",
      "erfolgreich",
      "vereinbaren"
    ],
    "checkpoint": "Answer standard job interview questions regarding your past professional experience in German.",
    "tip": "Learn verb + preposition as a single unit: \"sich bewerben UM + Akkusativ\".",
    "filterTag": "stage-10"
  },
  {
    "id": "stage-11",
    "stageNumber": 11,
    "level": "B1",
    "title": "Umwelt, Technologie & Zukunft",
    "titleDe": "Sustainability, Tech & Future Trends",
    "emoji": "🌱",
    "description": "Debate contemporary topics: renewable energy, digital transformation, electric mobility, and sustainability.",
    "grammarFocus": "Passiv (werden + Partizip II) and Futur I (werden + Infinitiv) for discussing predictions and technological processes.",
    "vocabFocus": [
      "Umwelt",
      "Nachhaltigkeit",
      "Zukunft",
      "verzichten auf",
      "umweltfreundlich"
    ],
    "checkpoint": "Present a 3-minute oral monologue on how renewable energy impacts society.",
    "tip": "Passive voice shifts focus from the person acting to the action itself: \"Das Auto wird repariert.\"",
    "filterTag": "stage-11"
  },
  {
    "id": "stage-12",
    "stageNumber": 12,
    "level": "B1",
    "title": "Meinung, Debatte & Argumentation",
    "titleDe": "Opinions, Discourse & Complex Clauses",
    "emoji": "⚖️",
    "description": "Weigh advantages and disadvantages (Vor- und Nachteile), persuade others, and disagree politely and constructively.",
    "grammarFocus": "Complex subordinate clauses: obwohl, während, anstatt...zu, um...zu, and Konjunktiv II (Wünsche & Höflichkeit).",
    "vocabFocus": [
      "Entscheidung",
      "Unterschied",
      "Meinung",
      "Lösung",
      "Vorurteil",
      "überzeugen",
      "abhängen von",
      "obwohl",
      "trotzdem",
      "Meiner Ansicht nach"
    ],
    "checkpoint": "Participate in a structured debate, stating your opinion, acknowledging opposing views, and drawing conclusions.",
    "tip": "\"Obwohl\" (subordinating, verb at end) contrasts with \"trotzdem\" (adverbial connector, verb in position 2).",
    "filterTag": "stage-12"
  },
  {
    "id": "stage-13",
    "stageNumber": 13,
    "level": "B1",
    "title": "Goethe / Telc B1 Prüfungsreife",
    "titleDe": "The B1 Certification Pinnacle",
    "emoji": "🏆",
    "description": "The capstone milestone: comprehensive mastery across Reading (Lesen), Listening (Hören), Writing (Schreiben), and Speaking (Sprechen).",
    "grammarFocus": "Complete synthesis of A1-B1 grammar, idiomatic expressions, complex connective transitions.",
    "vocabFocus": [
      "anspruchsvoll",
      "Es steht außer Frage",
      "Herausforderung"
    ],
    "checkpoint": "Achieve 85%+ across all Quiz Arcade modes and clear all items from the Weak Words Vault.",
    "tip": "Herzlichen Glückwunsch! Reaching this checkpoint means you are ready for the official Goethe-Zertifikat B1.",
    "filterTag": "stage-10"
  }
];

// ============================================================
// 3. GRAMMAR TOPICS
// ============================================================

export const grammarTopics: GrammarTopic[] = [
  // ===================== A1 GRAMMAR =====================
  {
    id: 'g-a1-01',
    level: 'A1',
    title: 'Present Tense Conjugation',
    titleDe: 'Präsens',
    emoji: '🔄',
    explanation:
      'German verbs change their endings based on the subject. Regular verbs drop the "-en" from the infinitive and append personal endings: -e, -st, -t, -en, -t, -en.',
    table: {
      headers: ['Pronoun', 'Ending', 'spielen (to play)', 'machen (to do)'],
      rows: [
        ['ich (I)', '-e', 'spiele', 'mache'],
        ['du (you sing. inf.)', '-st', 'spielst', 'machst'],
        ['er/sie/es (he/she/it)', '-t', 'spielt', 'macht'],
        ['wir (we)', '-en', 'spielen', 'machen'],
        ['ihr (you pl. inf.)', '-t', 'spielt', 'macht'],
        ['sie/Sie (they/you formal)', '-en', 'spielen', 'machen'],
      ],
    },
    examples: [
      { german: 'Ich spiele gern Fußball.', english: 'I like playing football.', highlight: 'spiele' },
      { german: 'Was machst du heute Abend?', english: 'What are you doing this evening?', highlight: 'machst' },
      { german: 'Wir lernen zusammen Deutsch.', english: 'We learn German together.', highlight: 'lernen' },
    ],
    tip: 'Irregular vowel changes (e -> i/ie, a -> ä) only happen in the "du" and "er/sie/es" forms (e.g., du siehst, er fährt)!',
  },
  {
    id: 'g-a1-02',
    level: 'A1',
    title: 'The Three Genders & Articles',
    titleDe: 'Der, Die, Das & Ein, Eine, Ein',
    emoji: '🎯',
    explanation:
      'Every German noun has a grammatical gender: Masculine (der / ein), Feminine (die / eine), or Neuter (das / ein). Gender rarely relates to physical biological traits.',
    table: {
      headers: ['Gender', 'Definite', 'Indefinite', 'Negative', 'Example'],
      rows: [
        ['Masculine', 'der', 'ein', 'kein', 'der Hund (the dog)'],
        ['Feminine', 'die', 'eine', 'keine', 'die Katze (the cat)'],
        ['Neuter', 'das', 'ein', 'kein', 'das Haus (the house)'],
        ['Plural', 'die', '-', 'keine', 'die Häuser (the houses)'],
      ],
    },
    examples: [
      { german: 'Der Tisch ist sehr groß.', english: 'The table is very big.', highlight: 'Der' },
      { german: 'Ich habe eine kleine Katze.', english: 'I have a small cat.', highlight: 'eine' },
      { german: 'Das ist kein Problem.', english: 'That is no problem.', highlight: 'kein' },
    ],
    tip: 'Look for word endings! Words ending in -ung, -heit, -keit, -schaft, -ei, -tät are ALWAYS feminine ("die")!',
  },
  {
    id: 'g-a1-03',
    level: 'A1',
    title: 'The Accusative Case',
    titleDe: 'Der Akkusativ',
    emoji: '📦',
    explanation:
      'The Accusative case is used for direct objects — the person or thing directly receiving the action of the verb. ONLY masculine articles change form (der -> den, ein -> einen). Feminine, neuter, and plural stay identical to Nominative!',
    table: {
      headers: ['Gender', 'Nominativ (Subject)', 'Akkusativ (Direct Object)', 'Indefinite Akkusativ'],
      rows: [
        ['Masculine', 'der Hund', 'den Hund', 'einen Hund'],
        ['Feminine', 'die Katze', 'die Katze', 'eine Katze'],
        ['Neuter', 'das Buch', 'das Buch', 'ein Buch'],
        ['Plural', 'die Bücher', 'die Bücher', 'keine Bücher'],
      ],
    },
    examples: [
      { german: 'Ich habe den Schlüssel gefunden.', english: 'I found the key.', highlight: 'den Schlüssel' },
      { german: 'Er kauft einen neuen Laptop.', english: 'He is buying a new laptop.', highlight: 'einen neuen' },
      { german: 'Wir trinken das frische Wasser.', english: 'We drink the fresh water.', highlight: 'das frische' },
    ],
    tip: 'Accusative prepositions: "bis, durch, für, gegen, ohne, um" always trigger the accusative case (DOGPU)!',
  },
  {
    id: 'g-a1-04',
    level: 'A1',
    title: 'Basic German Sentence Order (V2 Rule)',
    titleDe: 'Satzbau & Inversion',
    emoji: '🧱',
    explanation:
      'In a normal German main clause, the conjugated finite verb is ALWAYS in Position 2. If you begin the sentence with a time or place expression, the subject moves to Position 3 (known as Inversion).',
    table: {
      headers: ['Position 1 (First)', 'Position 2 (VERB)', 'Position 3 (Subject)', 'Rest of Sentence'],
      rows: [
        ['Ich (Normal)', 'trinke', '-', 'jeden Morgen Kaffee.'],
        ['Heute (Time)', 'trinke', 'ich', 'einen Tee.'],
        ['In Berlin (Place)', 'wohnen', 'meine Freunde', 'seit zwei Jahren.'],
        ['Morgen (Time)', 'fahren', 'wir', 'nach München.'],
      ],
    },
    examples: [
      { german: 'Morgen gehe ich zur Arbeit.', english: 'Tomorrow I go to work.', highlight: 'gehe ich' },
      { german: 'Jetzt verstehe ich die Grammatik.', english: 'Now I understand the grammar.', highlight: 'verstehe ich' },
    ],
    tip: 'Never say "Heute ich gehe" — that is an immediate tell of English interference. Always put the verb in second position!',
  },

  // ===================== A2 GRAMMAR =====================
  {
    id: 'g-a2-01',
    level: 'A2',
    title: 'Separable Prefix Verbs',
    titleDe: 'Trennbare Verben',
    emoji: '✂️',
    explanation:
      'Many German verbs have separable prefixes (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-). In a present tense main clause, the prefix detaches and jumps to the very end of the sentence!',
    table: {
      headers: ['Infinitive', 'Prefix', 'Sentence Example'],
      rows: [
        ['aufstehen (get up)', 'auf', 'Ich stehe um sieben Uhr auf.'],
        ['anrufen (call up)', 'an', 'Er ruft seine Mutter an.'],
        ['einkaufen (shop)', 'ein', 'Wir kaufen im Supermarkt ein.'],
        ['mitbringen (bring along)', 'mit', 'Bringst du bitte Bier mit?'],
      ],
    },
    examples: [
      { german: 'Der Zug kommt um 14 Uhr an.', english: 'The train arrives at 2 PM.', highlight: 'kommt ... an' },
      { german: 'Wann fängst du mit dem Kurs an?', english: 'When do you start the course?', highlight: 'fängst ... an' },
    ],
    tip: 'Unseparable prefixes (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-) NEVER detach (e.g. verstehen: ich verstehe, NOT ich stehe ver).',
  },
  {
    id: 'g-a2-02',
    level: 'A2',
    title: 'The Past Tense (Perfekt)',
    titleDe: 'Das Perfekt',
    emoji: '⏳',
    explanation:
      'The Perfekt is the primary spoken past tense in German. It consists of an auxiliary verb ("haben" or "sein" in position 2) plus the past participle (Partizip II) at the very end of the clause.',
    table: {
      headers: ['Auxiliary', 'When to use', 'Example'],
      rows: [
        ['haben', 'Most verbs (transitive, stationary)', 'Ich habe gestern Pizza gegessen.'],
        ['sein', 'Movement from A to B (gehen, fahren, fliegen)', 'Er ist nach Berlin gefahren.'],
        ['sein', 'Change of state (aufwachen, sterben, einschlafen)', 'Sie ist früh aufgewacht.'],
        ['sein', 'Exceptions: sein, bleiben, werden, passieren', 'Wir sind zu Hause geblieben.'],
      ],
    },
    examples: [
      { german: 'Ich habe gestern Deutsch gelernt.', english: 'I learned German yesterday.', highlight: 'habe ... gelernt' },
      { german: 'Sie ist gestern nach Wien geflogen.', english: 'She flew to Vienna yesterday.', highlight: 'ist ... geflogen' },
    ],
    tip: 'Remember the "Klammer" (bracket) principle: Auxiliary in position 2, Partizip II locked at the very end!',
  },
  {
    id: 'g-a2-03',
    level: 'A2',
    title: 'Modal Verbs in Action',
    titleDe: 'Die Modalverben',
    emoji: '🚦',
    explanation:
      'Modal verbs express ability (können), necessity (müssen), permission (dürfen), intention (wollen), obligation (sollen), or polite wish (möchten). The main action verb goes to the end in the infinitive.',
    table: {
      headers: ['Modal', 'Meaning', 'ich/er/sie form', 'Full Sentence'],
      rows: [
        ['können', 'can / able to', 'kann', 'Ich kann sehr gut kochen.'],
        ['müssen', 'must / have to', 'muss', 'Wir müssen den Zug erwischen.'],
        ['dürfen', 'allowed to / may', 'darf', 'Hier darf man nicht rauchen.'],
        ['wollen', 'want to', 'will', 'Er will Deutsch lernen.'],
        ['sollen', 'should / supposed to', 'soll', 'Du sollst dich ausruhen.'],
      ],
    },
    examples: [
      { german: 'Ich muss morgen früh aufstehen.', english: 'I have to get up early tomorrow.', highlight: 'muss ... aufstehen' },
      { german: 'Darf ich hier mein Auto parken?', english: 'May I park my car here?', highlight: 'Darf ... parken' },
    ],
    tip: 'Notice that with all modal verbs, the "ich" and "er/sie/es" forms have NO ending (ich kann, er kann, NOT ich kanne)!',
  },

  // ===================== B1 GRAMMAR =====================
  {
    id: 'g-b1-01',
    level: 'B1',
    title: 'Subordinate Clauses & Verb-Kicker Conjunctions',
    titleDe: 'Nebensätze mit weil, dass, wenn, obwohl',
    emoji: '⚽',
    explanation:
      'Subordinating conjunctions ("weil", "dass", "wenn", "obwohl", "während") act as "verb kickers": they banish the conjugated verb to the very end of the subclause.',
    table: {
      headers: ['Conjunction', 'Meaning', 'Example Sentence'],
      rows: [
        ['weil', 'because', 'Ich lerne Deutsch, weil ich hier arbeite.'],
        ['dass', 'that', 'Ich weiß, dass du Recht hast.'],
        ['wenn', 'if / when', 'Wenn es regnet, bleibe ich daheim.'],
        ['obwohl', 'although', 'Obwohl es kalt ist, geht er schwimmen.'],
        ['während', 'while', 'Während sie kocht, liest er die Zeitung.'],
      ],
    },
    examples: [
      { german: 'Ich lerne fleißig, weil ich die B1-Prüfung bestehen möchte.', english: 'I study hard because I want to pass the B1 exam.', highlight: 'bestehen möchte' },
      { german: 'Obwohl er müde war, arbeitete er bis Mitternacht weiter.', english: 'Although he was tired, he kept working until midnight.', highlight: 'war' },
    ],
    tip: 'If the subordinate clause comes FIRST, the main clause begins directly with its verb: "Weil es regnet, BLEIBE ich zu Hause."',
  },
  {
    id: 'g-b1-02',
    level: 'B1',
    title: 'The Passive Voice',
    titleDe: 'Das Passiv',
    emoji: '⚙️',
    explanation:
      'The passive voice shifts focus onto the process or result rather than who performs the action. Formed with: werden (conjugated) + Partizip II at the end.',
    table: {
      headers: ['Tense', 'Structure', 'Example'],
      rows: [
        ['Präsens', 'wird + Partizip II', 'Das Auto wird repariert.'],
        ['Präteritum', 'wurde + Partizip II', 'Das Haus wurde 1920 gebaut.'],
        ['Perfekt', 'ist + Partizip II + worden', 'Die E-Mail ist verschickt worden.'],
        ['Modalverb', 'muss + Partizip II + werden', 'Die Rechnung muss bezahlt werden.'],
      ],
    },
    examples: [
      { german: 'In Deutschland wird viel Brot gegessen.', english: 'A lot of bread is eaten in Germany.', highlight: 'wird ... gegessen' },
      { german: 'Das Problem wurde sofort gelöst.', english: 'The problem was resolved immediately.', highlight: 'wurde ... gelöst' },
    ],
    tip: 'To mention the agent in passive, use "von + Dativ": "Das Buch wurde von Goethe geschrieben."',
  },
  {
    id: 'g-b1-03',
    level: 'B1',
    title: 'Konjunktiv II — Politeness & Hypotheticals',
    titleDe: 'Der Konjunktiv II',
    emoji: '✨',
    explanation:
      'Konjunktiv II is used for polite requests, hypotheticals, wishes, and unreal conditions ("If I had... I would..."). Formed with "würde + infinitive", or special forms for sein (wäre) and haben (hätte).',
    table: {
      headers: ['Form', 'Meaning', 'Example'],
      rows: [
        ['würde + Infinitiv', 'would do', 'Ich würde gern nach Japan reisen.'],
        ['hätte', 'would have / if had', 'Wenn ich mehr Zeit hätte, würde ich mehr lesen.'],
        ['wäre', 'would be / if were', 'Wenn ich reich wäre, würde ich ein Haus kaufen.'],
        ['könnte', 'could / would be able to', 'Könnten Sie mir bitte helfen?'],
      ],
    },
    examples: [
      { german: 'Könnten Sie das bitte wiederholen?', english: 'Could you please repeat that?', highlight: 'Könnten Sie' },
      { german: 'Ich hätte gern eine Tasse Kaffee.', english: 'I would like to have a cup of coffee.', highlight: 'hätte gern' },
    ],
    tip: 'In everyday spoken German, use "würde + infinitive" for almost all verbs except sein (wäre), haben (hätte), and modals (könnte, müsste, sollte)!',
  },
];

// ============================================================
// 4. DIALOGUE SCENARIOS
// ============================================================

export const dialogueScenarios: DialogueScenario[] = [
  {
    id: 'd-a1-01',
    level: 'A1',
    title: 'Im Café am Marktplatz',
    titleDe: 'At the Marketplace Café',
    emoji: '☕',
    setting: 'A cozy afternoon in a traditional Bavarian café.',
    characters: [
      { name: 'Kellner', role: 'Waiter', avatarSeed: 'kellner-felix' },
      { name: 'Anna', role: 'Customer', avatarSeed: 'anna-schmidt' },
    ],
    lines: [
      { speaker: 'Kellner', german: 'Guten Tag! Was darf ich Ihnen bringen?', english: 'Good day! What may I bring you?' },
      { speaker: 'Anna', german: 'Guten Tag! Ich hätte gern einen Kaffee und ein Stück Apfelkuchen, bitte.', english: 'Good day! I would like a coffee and a slice of apple cake, please.' },
      { speaker: 'Kellner', german: 'Sehr gern. Mit Milch und Zucker?', english: 'With pleasure. With milk and sugar?' },
      { speaker: 'Anna', german: 'Nur mit etwas Milch, danke schön.', english: 'Only with a little milk, thank you.' },
      { speaker: 'Kellner', german: 'Kommt sofort! Guten Appetit!', english: 'Coming right up! Enjoy your meal!' },
      { speaker: 'Anna', german: 'Vielen Dank!', english: 'Thank you very much!' },
    ],
  },
  {
    id: 'd-a1-02',
    level: 'A1',
    title: 'Am Fahrkartenschalter',
    titleDe: 'At the Train Ticket Counter',
    emoji: '🎫',
    setting: 'Berlin Hauptbahnhof on a busy morning.',
    characters: [
      { name: 'Bahnbeamter', role: 'Ticket Officer', avatarSeed: 'bahn-markus' },
      { name: 'Lukas', role: 'Traveler', avatarSeed: 'lukas-weber' },
    ],
    lines: [
      { speaker: 'Lukas', german: 'Hallo! Eine Fahrkarte nach Hamburg, bitte.', english: 'Hello! One ticket to Hamburg, please.' },
      { speaker: 'Bahnbeamter', german: 'Einfach oder hin und zurück?', english: 'One way or round trip?' },
      { speaker: 'Lukas', german: 'Hin und zurück, bitte. Wann fährt der nächste ICE ab?', english: 'Round trip, please. When does the next ICE depart?' },
      { speaker: 'Bahnbeamter', german: 'Der nächste ICE fährt um 11:30 Uhr von Gleis 7 ab.', english: 'The next ICE departs at 11:30 AM from platform 7.' },
      { speaker: 'Lukas', german: 'Perfekt. Wie viel kostet das Ticket?', english: 'Perfect. How much does the ticket cost?' },
      { speaker: 'Bahnbeamter', german: 'Das macht 54 Euro. Gute Reise!', english: 'That comes to 54 Euros. Have a good trip!' },
    ],
  },
  {
    id: 'd-a2-01',
    level: 'A2',
    title: 'Beim Arztbesuch',
    titleDe: "At the Doctor's Practice",
    emoji: '🩺',
    setting: "Doctor's consultation room in Munich.",
    characters: [
      { name: 'Dr. Weber', role: 'Doctor', avatarSeed: 'dr-weber' },
      { name: 'Maria', role: 'Patient', avatarSeed: 'maria-garcia' },
    ],
    lines: [
      { speaker: 'Dr. Weber', german: 'Guten Tag, Frau Garcia. Was fehlt Ihnen denn?', english: 'Good day, Ms. Garcia. What seems to be the problem?' },
      { speaker: 'Maria', german: 'Ich habe seit zwei Tagen starke Halsschmerzen und Fieber.', english: 'I have had a severe sore throat and fever for two days.' },
      { speaker: 'Dr. Weber', german: 'Ich verstehe. Bitte machen Sie den Mund auf und sagen Sie "Aah".', english: 'I see. Please open your mouth and say "Aah".' },
      { speaker: 'Maria', german: 'Aah... Tut es weh?', english: 'Aah... Does it look bad?' },
      { speaker: 'Dr. Weber', german: 'Ihr Hals ist gerötet. Ich verschreibe Ihnen ein Antibiotikum und Ruhe.', english: 'Your throat is red. I am prescribing you an antibiotic and rest.' },
      { speaker: 'Maria', german: 'Vielen Dank, Herr Doktor. Wie lange soll ich zu Hause bleiben?', english: 'Thank you very much, doctor. How long should I stay at home?' },
      { speaker: 'Dr. Weber', german: 'Bleiben Sie drei Tage im Bett und trinken Sie viel Tee.', english: 'Stay in bed for three days and drink plenty of tea.' },
    ],
  },
  {
    id: 'd-b1-01',
    level: 'B1',
    title: 'Das Vorstellungsgespräch',
    titleDe: 'The Job Interview',
    emoji: '💼',
    setting: 'Conference room of a tech firm in Frankfurt.',
    characters: [
      { name: 'Frau Bauer', role: 'HR Director', avatarSeed: 'frau-bauer' },
      { name: 'Tim', role: 'Applicant', avatarSeed: 'tim-mueller' },
    ],
    lines: [
      { speaker: 'Frau Bauer', german: 'Guten Tag, Herr Müller. Vielen Dank, dass Sie heute zu uns gekommen sind.', english: 'Good day, Mr. Müller. Thank you for coming to see us today.' },
      { speaker: 'Tim', german: 'Guten Tag, Frau Bauer. Ich freue mich sehr über die Einladung.', english: 'Good day, Ms. Bauer. I am very delighted about the invitation.' },
      { speaker: 'Frau Bauer', german: 'Erzählen Sie uns kurz: Warum haben Sie sich um diese Stelle beworben?', english: 'Tell us briefly: Why did you apply for this position?' },
      { speaker: 'Tim', german: 'Weil ich bereits drei Jahre Berufserfahrung im Bereich Softwareentwicklung mitbringe und mich beruflich weiterentwickeln möchte.', english: 'Because I already bring three years of work experience in software development and wish to develop further professionally.' },
      { speaker: 'Frau Bauer', german: 'Das klingt überzeugend. Wie gehen Sie mit anspruchsvollen Fristen um?', english: 'That sounds convincing. How do you handle demanding deadlines?' },
      { speaker: 'Tim', german: 'Ich bin sehr zuverlässig und organisiere meine Aufgaben stets strukturiert nach Prioritäten.', english: 'I am very dependable and always organize my tasks systematically according to priorities.' },
      { speaker: 'Frau Bauer', german: 'Ausgezeichnet. Wir melden uns bis Ende der Woche bei Ihnen.', english: 'Excellent. We will get back in touch with you by the end of the week.' },
    ],
  },
];

// ============================================================
// 5. SENTENCE BUILDER EXERCISES
// ============================================================

export type SentenceExercise = {
  id: string;
  level: CEFRLevel;
  correctOrder: string[];
  english: string;
  hint: string;
};

export const sentenceExercises: SentenceExercise[] = [
  // A1
  { id: 'se-a1-01', level: 'A1', correctOrder: ['Ich', 'spiele', 'gern', 'Fußball'], english: 'I like to play football.', hint: 'V2 rule: verb in position 2' },
  { id: 'se-a1-02', level: 'A1', correctOrder: ['Morgen', 'gehe', 'ich', 'ins', 'Kino'], english: 'Tomorrow I go to the cinema.', hint: 'Inversion: Time first -> Verb -> Subject' },
  { id: 'se-a1-03', level: 'A1', correctOrder: ['Die', 'Katze', 'schläft', 'auf', 'dem', 'Sofa'], english: 'The cat sleeps on the sofa.', hint: 'Subject + Verb + Place' },
  { id: 'se-a1-04', level: 'A1', correctOrder: ['Er', 'kauft', 'jeden', 'Tag', 'frisches', 'Brot'], english: 'He buys fresh bread every day.', hint: 'Time before direct object' },
  { id: 'se-a1-05', level: 'A1', correctOrder: ['Ich', 'stehe', 'um', 'sieben', 'Uhr', 'auf'], english: "I get up at seven o'clock.", hint: 'Separable verb: prefix "auf" goes to the end!' },
  { id: 'se-a1-06', level: 'A1', correctOrder: ['Wir', 'lernen', 'heute', 'neue', 'Vokabeln'], english: 'We learn new vocabulary today.', hint: 'Subject + Verb + Time + Object' },

  // A2
  { id: 'se-a2-01', level: 'A2', correctOrder: ['Ich', 'habe', 'gestern', 'Pizza', 'gegessen'], english: 'I ate pizza yesterday.', hint: 'Perfekt bracket: haben + Partizip II at end' },
  { id: 'se-a2-02', level: 'A2', correctOrder: ['Er', 'ist', 'mit', 'dem', 'Zug', 'nach', 'Berlin', 'gefahren'], english: 'He traveled to Berlin by train.', hint: 'Movement verbs use "sein" in Perfekt' },
  { id: 'se-a2-03', level: 'A2', correctOrder: ['Ich', 'muss', 'morgen', 'früh', 'aufstehen'], english: 'I have to get up early tomorrow.', hint: 'Modal verb in pos 2, infinitive at end' },
  { id: 'se-a2-04', level: 'A2', correctOrder: ['Sie', 'hat', 'sich', 'über', 'das', 'Geschenk', 'gefreut'], english: 'She was happy about the gift.', hint: 'Reflexive verb in Perfekt' },
  { id: 'se-a2-05', level: 'A2', correctOrder: ['Kannst', 'du', 'mir', 'bitte', 'helfen?'], english: 'Can you please help me?', hint: 'Yes/No question: modal verb first + Dativ pronoun' },

  // B1
  { id: 'se-b1-01', level: 'B1', correctOrder: ['Ich', 'lerne', 'Deutsch,', 'weil', 'ich', 'in', 'Berlin', 'arbeiten', 'möchte'], english: 'I learn German because I would like to work in Berlin.', hint: '"weil" sends the conjugated verb to the very end' },
  { id: 'se-b1-02', level: 'B1', correctOrder: ['Obwohl', 'es', 'geregnet', 'hat,', 'gingen', 'wir', 'spazieren'], english: 'Although it rained, we went for a walk.', hint: 'Subclause first -> main clause starts with verb' },
  { id: 'se-b1-03', level: 'B1', correctOrder: ['Wenn', 'ich', 'mehr', 'Zeit', 'hätte,', 'würde', 'ich', 'reisen'], english: 'If I had more time, I would travel.', hint: 'Konjunktiv II conditional structure' },
  { id: 'se-b1-04', level: 'B1', correctOrder: ['Das', 'Auto', 'wird', 'in', 'der', 'Werkstatt', 'repariert'], english: 'The car is being repaired in the workshop.', hint: 'Passive voice: wird + Partizip II' },
  { id: 'se-b1-05', level: 'B1', correctOrder: ['Meiner', 'Meinung', 'nach', 'ist', 'dieser', 'Plan', 'ausgezeichnet'], english: 'In my opinion, this plan is excellent.', hint: 'Phrase + verb in pos 2' },
];
