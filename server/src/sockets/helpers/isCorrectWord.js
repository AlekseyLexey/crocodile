const { getCurrentWord } = require("../helpers/wordStore");
const { roomWords } = require("./wordStore");

function isCorrectWord(incomeWord, roomId) {
  const currentWord = getCurrentWord(roomId);

  if (currentWord === null) {
    return;
  }

  const currentLowerWord = currentWord.toLowerCase();
  const incomeLowerWord = incomeWord.trim().toLowerCase();

  if (currentLowerWord === incomeLowerWord) {
    const roomMap = roomWords.get(roomId);
    const index = roomMap.unUsedWords.findIndex(
      (word) => word.toLowerCase() === incomeLowerWord
    );
    const word = roomMap.unUsedWords.splice(index, 1)[0];
    roomMap.usedWords.push(word);
    return true;
  }

  return false;
}

module.exports = isCorrectWord;
