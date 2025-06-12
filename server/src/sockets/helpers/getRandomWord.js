const WordService = require('../../services/wordService');
const ThemeService = require('../../services/themeService');

 async function getRandomWord(roomId, wordsMap) {
  const currentWordsMap = wordsMap.get(roomId);

  console.log('currentWordsMap', currentWordsMap);
  
  if (!currentWordsMap) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * currentWordsMap.unUsedWords.length
  );
  const word = currentWordsMap.unUsedWords.splice(randomIndex, 1)[0];
  currentWordsMap.usedWords.push(word);
  currentWordsMap.currentWord = word;

  return word;
}

module.exports = getRandomWord;
