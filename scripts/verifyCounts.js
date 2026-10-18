import fs from 'fs';

const getCount = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/"id":/g);
  return matches ? matches.length : 0;
};

const a1 = getCount('src/data/vocabA1.ts');
const a2 = getCount('src/data/vocabA2.ts');
const b1 = getCount('src/data/vocabB1.ts');

console.log('Level A1 count:', a1);
console.log('Level A2 count:', a2);
console.log('Level B1 count:', b1);
console.log('GRAND TOTAL:', a1 + a2 + b1);
