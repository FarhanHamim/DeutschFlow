import fs from 'fs';

const content = fs.readFileSync('src/data/germanCurriculum.ts', 'utf8');
const vocabMarker = '// 1. EXPANDED VOCABULARY DATABASE';
const journeyMarker = '// 2. LEARNING JOURNEY ROADMAP (13 STEP-BY-STEP STAGES)';

const vocabIdx = content.indexOf(vocabMarker);
const journeyIdx = content.indexOf(journeyMarker);

if (vocabIdx !== -1 && journeyIdx !== -1) {
  const header = content.slice(0, vocabIdx);
  const remainder = content.slice(journeyIdx);

  const newVocab = `// 1. COMBINED VOCABULARY DATABASE (1,000 WORDS TOTAL, SEPARATED LEVELWISE)
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
`;

  fs.writeFileSync('src/data/germanCurriculum.ts', header + newVocab + remainder);
  console.log('Successfully updated germanCurriculum.ts!');
} else {
  console.log('Markers not found: vocabIdx =', vocabIdx, 'journeyIdx =', journeyIdx);
}
