const fs = require('fs');
const path = require('path');

// Read existing 239 words
const existingVocab = JSON.parse(fs.readFileSync('temp_existing_vocab.json', 'utf8'));

const existingGermanWords = new Set(existingVocab.map(w => w.german.toLowerCase().trim()));

console.log('Existing vocabulary items:', existingVocab.length);
console.log('Unique existing German words:', existingGermanWords.size);
