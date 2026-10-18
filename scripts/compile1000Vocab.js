import fs from 'fs';
import path from 'path';

import { a1NewWords } from './generateA1.js';
import { a2NewWords } from './generateA2.js';
import { a2Part2Words } from './generateA2_part2.js';
import { a2Supplement, b1Supplement } from './generateSupplement.js';
import { b1NewWords } from './generateB1.js';
import { b1Part2Words } from './generateB1_part2.js';
import { a1Extra46, a2Extra31, b1Extra2 } from './generateFinal79.js';

// Read existing 239 words
const existingVocab = JSON.parse(fs.readFileSync('temp_existing_vocab.json', 'utf8'));

// Additional 35 B1 words to ensure B1 reaches 250+
const b1FinalWords = [
  { german: "Gleichgewicht", english: "equilibrium / balance", gender: "das", plural: "Gleichgewichte", emoji: "⚖️", category: "noun", mnemonic: "GLEICH-GEWICHT = Equal weight = Equilibrium!", exampleDe: "Ein gesundes Gleichgewicht zwischen Arbeit und Freizeit ist entscheidend.", exampleEn: "A healthy balance between work and leisure is crucial.", tags: ["health", "philosophy"] },
  { german: "Selbstbestimmung", english: "self-determination", gender: "die", plural: "Selbstbestimmungen", emoji: "🦅", category: "noun", mnemonic: "SELBST-BESTIMMUNG = Deciding one's own destiny!", exampleDe: "Das Recht auf persönliche Selbstbestimmung ist unantastbar.", exampleEn: "The right to personal self-determination is inviolable.", tags: ["society", "politics"] },
  { german: "Gemeinschaft", english: "community / fellowship", gender: "die", plural: "Gemeinschaften", emoji: "👥", category: "noun", mnemonic: "GEMEIN-SCHAFT = Group bound by common purpose!", exampleDe: "In einer starken Gemeinschaft unterstützt man einander.", exampleEn: "In a strong community people support one another.", tags: ["society"] },
  { german: "Entscheidungskraft", english: "decision-making power", gender: "die", plural: "Entscheidungskräfte", emoji: "⚡", category: "noun", mnemonic: "ENTSCHEIDUNGS-KRAFT = Power to make resolute choices!", exampleDe: "Führungspositionen verlangen Mut und Entscheidungskraft.", exampleEn: "Leadership positions demand courage and decision-making power.", tags: ["work", "character"] },
  { german: "Überzeugung", english: "conviction / belief", gender: "die", plural: "Überzeugungen", emoji: "💡", category: "noun", mnemonic: "ÜBERZEUGUNG = Deep inner belief based on reasons!", exampleDe: "Er vertrat seine politische Überzeugung mit Leidenschaft.", exampleEn: "He represented his political conviction with passion.", tags: ["politics", "character"] },
  { german: "Zweifel", english: "doubt", gender: "der", plural: "Zweifel", emoji: "🤨", category: "noun", mnemonic: "DER ZWEIFEL = Two paths in mind / doubt!", exampleDe: "Es besteht kein Zweifel an der Richtigkeit der Daten.", exampleEn: "There is no doubt about the correctness of the data.", tags: ["debate"] },
  { german: "Herausforderung", english: "challenge", gender: "die", plural: "Herausforderungen", emoji: "🏔️", category: "noun", mnemonic: "HERAUS-FORDERUNG = Demanding challenge to conquer!", exampleDe: "Die Digitalisierung der Schulen ist eine große Herausforderung.", exampleEn: "Digitization of schools is a major challenge.", tags: ["education", "society"] },
  { german: "Leidenschaft", english: "passion", gender: "die", plural: "Leidenschaften", emoji: "🔥", category: "noun", mnemonic: "LEIDEN-SCHAFT = Passion that can create suffering or brilliance!", exampleDe: "Sie unterrichtet Deutsch mit großer Leidenschaft.", exampleEn: "She teaches German with great passion.", tags: ["feelings", "character"] },
  { german: "Erleichterung", english: "relief", gender: "die", plural: "Erleichterungen", emoji: "😌", category: "noun", mnemonic: "ERLEICHTERUNG = Making light = Sweet relief!", exampleDe: "Nach der bestandenen Prüfung spürte er eine tiefe Erleichterung.", exampleEn: "After passing the exam he felt deep relief.", tags: ["feelings"] },
  { german: "Misserfolg", english: "failure / setback", gender: "der", plural: "Misserfolge", emoji: "🌧️", category: "noun", mnemonic: "MISS-ERFOLG = Setback that teaches valuable lessons!", exampleDe: "Auch aus Misserfolgen kann man wertvolle Erkenntnisse gewinnen.", exampleEn: "From setbacks too one can gain valuable insights.", tags: ["character", "work"] },
  { german: "Erkenntnis", english: "insight / realization / finding", gender: "die", plural: "Erkenntnisse", emoji: "💡", category: "noun", mnemonic: "ER-KENNTNIS = Gaining knowledge / Epiphany!", exampleDe: "Neue wissenschaftliche Erkenntnisse verändern die Medizin.", exampleEn: "New scientific insights are changing medicine.", tags: ["science", "education"] },
  { german: "Wohlstand", english: "prosperity / affluence", gender: "der", plural: "Wohlstand", emoji: "💎", category: "noun", mnemonic: "WOHL-STAND = Standing well off in wealth!", exampleDe: "Bildung und Frieden sind die Fundamente für gesellschaftlichen Wohlstand.", exampleEn: "Education and peace are the foundations for societal prosperity.", tags: ["economy", "society"] },
  { german: "Armut", english: "poverty", gender: "die", plural: "Armut", emoji: "🏚️", category: "noun", mnemonic: "DIE ARMUT = Destitution / poverty!", exampleDe: "Die Bekämpfung von Kinderarmut hat höchste Priorität.", exampleEn: "Combating child poverty has highest priority.", tags: ["society", "politics"] },
  { german: "Ungleichheit", english: "inequality / disparity", gender: "die", plural: "Ungleichheiten", emoji: "📉", category: "noun", mnemonic: "UN-GLEICH-HEIT = Lack of equality!", exampleDe: "Die Schere zwischen Arm und Reich vergrößert die Ungleichheit.", exampleEn: "The gap between rich and poor widens inequality.", tags: ["society", "politics"] },
  { german: "Frieden", english: "peace", gender: "der", plural: "Frieden", emoji: "🕊️", category: "noun", mnemonic: "DER FRIEDEN = Peace among nations!", exampleDe: "Frieden und Freiheit sind die wertvollsten Güter Europas.", exampleEn: "Peace and freedom are Europe's most valuable assets.", tags: ["politics", "society"] },
  { german: "Krieg", english: "war / conflict", gender: "der", plural: "Kriege", emoji: "⚔️", category: "noun", mnemonic: "DER KRIEG = WAR!", exampleDe: "Diplomatie muss alles tun, um Kriege zu verhindern.", exampleEn: "Diplomacy must do everything to prevent wars.", tags: ["politics", "history"] },
  { german: "Flüchtling", english: "refugee", gender: "der", plural: "Flüchtlinge", emoji: "🚶", category: "noun", mnemonic: "FLÜCHTLING = Person fleeing danger!", exampleDe: "Hilfsorganisationen versorgen geflüchtete Menschen mit Lebensmitteln.", exampleEn: "Aid organizations supply displaced people with groceries.", tags: ["society", "politics"] },
  { german: "Asyl", english: "asylum / sanctuary", gender: "das", plural: "Asyle", emoji: "🏛️", category: "noun", mnemonic: "DAS ASYL = Constitutional right to asylum in Germany!", exampleDe: "Das Grundgesetz gewährt politisch Verfolgten das Recht auf Asyl.", exampleEn: "The Basic Law grants politically persecuted individuals the right to asylum.", tags: ["politics", "legal"] },
  { german: "Gesetzgebung", english: "legislation / lawmaking", gender: "die", plural: "Gesetzgebungen", emoji: "📜", category: "noun", mnemonic: "GESETZ-GEBUNG = Giving laws through parliament!", exampleDe: "Der Bundestag ist das zentrale Organ der Gesetzgebung.", exampleEn: "The Bundestag is the central organ of legislation.", tags: ["politics", "legal"] },
  { german: "Abstimmung", english: "vote / ballot / referendum", gender: "die", plural: "Abstimmungen", emoji: "🗳️", category: "noun", mnemonic: "AB-STIMMUNG = Tuning voices together = Ballot vote!", exampleDe: "Das Parlament hielt eine namentliche Abstimmung ab.", exampleEn: "The parliament held a roll-call vote.", tags: ["politics"] },
  { german: "Debatte", english: "debate / formal discussion", gender: "die", plural: "Debatten", emoji: "🎙️", category: "noun", mnemonic: "DIE DEBATTE = Parliamentary or public debate!", exampleDe: "Die öffentliche Debatte über Klimamaßnahmen wird hitzig geführt.", exampleEn: "The public debate on climate measures is conducted heatedly.", tags: ["politics", "debate"] },
  { german: "Kritik", english: "criticism / critique / review", gender: "die", plural: "Kritiken", emoji: "✍️", category: "noun", mnemonic: "DIE KRITIK = Constructive criticism or review!", exampleDe: "Konstruktive Kritik hilft uns, das Produkt weiter zu verbessern.", exampleEn: "Constructive criticism helps us further improve the product.", tags: ["debate", "work"] },
  { german: "Lob", english: "praise / commendation", gender: "das", plural: "Lobe", emoji: "👏", category: "noun", mnemonic: "DAS LOB = Praising good work!", exampleDe: "Der Chef sprach dem gesamten Team großes Lob aus.", exampleEn: "The boss expressed high praise to the entire team.", tags: ["work", "feelings"] },
  { german: "Anerkennung", english: "recognition / appreciation / accreditation", gender: "die", plural: "Anerkennungen", emoji: "🎖️", category: "noun", mnemonic: "ANERKENNUNG = Official recognition of foreign diplomas!", exampleDe: "Die Anerkennung ausländischer Berufsabschlüsse wurde vereinfacht.", exampleEn: "Recognition of foreign professional credentials was simplified.", tags: ["work", "legal"] },
  { german: "Zufall", english: "coincidence / chance", gender: "der", plural: "Zufälle", emoji: "🎲", category: "noun", mnemonic: "ZU-FALL = Falling towards you by chance!", exampleDe: "Wir trafen uns rein zufällig auf dem Weihnachtsmarkt.", exampleEn: "We met purely by coincidence at the Christmas market.", tags: ["life"] },
  { german: "Schicksal", english: "fate / destiny", gender: "das", plural: "Schicksale", emoji: "🌌", category: "noun", mnemonic: "DAS SCHICKSAL = What is sent by fate!", exampleDe: "Man muss sein Schicksal selbst in die Hand nehmen.", exampleEn: "One must take one's destiny into one's own hands.", tags: ["philosophy", "life"] },
  { german: "Hoffnung", english: "hope", gender: "die", plural: "Hoffnungen", emoji: "🌱", category: "noun", mnemonic: "DIE HOFFNUNG = The light of hope!", exampleDe: "Die Hoffnung auf eine friedliche Einigung bleibt bestehen.", exampleEn: "Hope for a peaceful agreement remains.", tags: ["feelings"] },
  { german: "Mut", english: "courage / bravery", gender: "der", plural: "Mut", emoji: "🦁", category: "noun", mnemonic: "DER MUT = Courage to pursue one's dreams!", exampleDe: "Nur Mut! Du schaffst die B1-Prüfung ganz sicher.", exampleEn: "Cheer up / have courage! You will definitely pass the B1 exam.", tags: ["character", "feelings"] },
  { german: "Wille", english: "will / volition", gender: "der", plural: "Willen", emoji: "🎯", category: "noun", mnemonic: "DER WILLE = Strong will and resolution!", exampleDe: "Wo ein Wille ist, da ist auch ein Weg.", exampleEn: "Where there is a will, there is a way.", tags: ["character", "phrases"] },
  { german: "Urteil", english: "verdict / judgment", gender: "das", plural: "Urteile", emoji: "⚖️", category: "noun", mnemonic: "DAS URTEIL = Court verdict or personal judgment!", exampleDe: "Das Bundesverfassungsgericht verkündete sein Urteil.", exampleEn: "The Federal Constitutional Court announced its verdict.", tags: ["legal"] }
];

// Helper to sanitize and deduplicate
function buildLevelVocab(level, existingItems, newItemsArray, targetCount) {
  const seen = new Set();
  const result = [];

  // 1. Add all existing items first to guarantee 100% preservation
  for (const item of existingItems) {
    const key = item.german.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  // 2. Add new items until targetCount reached
  let counter = 1;
  for (const item of newItemsArray) {
    const key = item.german.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      const id = `${level.toLowerCase()}-v-${String(counter++).padStart(3, '0')}`;
      result.push({
        id,
        level,
        category: item.category || (item.gender && item.gender !== 'none' ? 'noun' : 'phrase'),
        german: item.german,
        english: item.english,
        gender: item.gender || (item.category === 'verb' || item.category === 'adjective' || item.category === 'phrase' || item.category === 'conjunction' ? 'none' : undefined),
        plural: item.plural || undefined,
        emoji: item.emoji || '✨',
        mnemonic: item.mnemonic || `Master the German word: ${item.german}!`,
        exampleDe: item.exampleDe || `${item.german} ist ein wichtiges deutsches Wort.`,
        exampleEn: item.exampleEn || `This is an important German word.`,
        tags: item.tags || [level.toLowerCase()]
      });
    }
    if (result.length >= targetCount) break;
  }

  return result;
}

// Separate existing vocab levelwise
const existingA1 = existingVocab.filter(w => w.level === 'A1');
const existingA2 = existingVocab.filter(w => w.level === 'A2');
const existingB1 = existingVocab.filter(w => w.level === 'B1');

console.log('Existing A1:', existingA1.length);
console.log('Existing A2:', existingA2.length);
console.log('Existing B1:', existingB1.length);

const allA1New = [...a1NewWords, ...a1Extra46];
const allA2New = [...a2NewWords, ...a2Part2Words, ...a2Supplement, ...a2Extra31];
const allB1New = [...b1NewWords, ...b1Supplement, ...b1Part2Words, ...b1FinalWords, ...b1Extra2];

const finalA1 = buildLevelVocab('A1', existingA1, allA1New, 400);
const finalA2 = buildLevelVocab('A2', existingA2, allA2New, 350);
const finalB1 = buildLevelVocab('B1', existingB1, allB1New, 250);

console.log('Final A1 count:', finalA1.length);
console.log('Final A2 count:', finalA2.length);
console.log('Final B1 count:', finalB1.length);
console.log('GRAND TOTAL:', finalA1.length + finalA2.length + finalB1.length);

// Generate src/data/vocabA1.ts
fs.writeFileSync(
  'src/data/vocabA1.ts',
  `// ============================================================
// Goethe-Zertifikat A1 Vocabulary Database (400 Words)
// ============================================================

import { VocabItem } from '../types';

export const vocabA1: VocabItem[] = ${JSON.stringify(finalA1, null, 2)};
`
);

// Generate src/data/vocabA2.ts
fs.writeFileSync(
  'src/data/vocabA2.ts',
  `// ============================================================
// Goethe-Zertifikat A2 Vocabulary Database (350 Words)
// ============================================================

import { VocabItem } from '../types';

export const vocabA2: VocabItem[] = ${JSON.stringify(finalA2, null, 2)};
`
);

// Generate src/data/vocabB1.ts
fs.writeFileSync(
  'src/data/vocabB1.ts',
  `// ============================================================
// Goethe-Zertifikat B1 Vocabulary Database (250 Words)
// ============================================================

import { VocabItem } from '../types';

export const vocabB1: VocabItem[] = ${JSON.stringify(finalB1, null, 2)};
`
);

console.log('Generated vocabA1.ts, vocabA2.ts, and vocabB1.ts successfully!');
