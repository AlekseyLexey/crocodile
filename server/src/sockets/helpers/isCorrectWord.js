const { getCurrentWord } = require('../helpers/wordStore');
const { roomWords } = require('./wordStore');

function isCorrectWord(incomeWord, roomId) {
  const currentWord = getCurrentWord(roomId);

  if (currentWord === null) {
    return;
  }

  const currentLowerWord = currentWord.toLowerCase();
  const incomeLowerWord = incomeWord.trim().toLowerCase();

  if (currentLowerWord === incomeLowerWord) {
    const roomMap = roomWords.get(roomId);
    roomMap.usedWords.push(currentWord);
    return true;
  }

  return false;
}

module.exports = isCorrectWord;
