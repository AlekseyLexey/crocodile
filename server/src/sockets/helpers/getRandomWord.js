function getRandomWord(roomId, wordsMap) {
  const currentWordsMap = wordsMap.get(roomId);

  if (!currentWordsMap) {
    return null;
  }

  if (currentWordsMap.unUsedWords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * currentWordsMap.unUsedWords.length
  );
  const word = currentWordsMap.unUsedWords[randomIndex];
  currentWordsMap.currentWord = word;

  return word;
}

module.exports = getRandomWord;
