const {getCurrentWord} = require('../helpers/wordStore');

function isCorrectWord(incomeWord, roomId) {
	const currentWord = getCurrentWord(roomId);
	

  if (currentWord === null) {
    return;
  }
  return currentWord.toLowerCase() === incomeWord.trim().toLowerCase();
}

module.exports = isCorrectWord;
