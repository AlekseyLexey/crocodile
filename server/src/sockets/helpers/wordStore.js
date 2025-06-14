const getWordsByTheme = require("./getWordsByTheme");
const getRandomWord = require("./getRandomWord");

const roomWords = new Map();

async function initWordsForRoom(themeId, roomId) {
  const words = await getWordsByTheme(themeId);

  roomWords.set(Number(roomId), {
    allWords: words,
    unUsedWords: [...words],
    usedWords: [],
    currentWord: null,
  });
}

function clearRoomWords(roomId) {
  roomWords.delete(Number(roomId));
}

function getCurrentWord(roomId) {
  const state = roomWords.get(Number(roomId));

  return state?.currentWord || null;
}

function getRandomWordForRoom(roomId) {
  return getRandomWord(Number(roomId), roomWords);
}

module.exports = {
  roomWords,
  initWordsForRoom,
  clearRoomWords,
  getCurrentWord,
  getRandomWordForRoom,
};
