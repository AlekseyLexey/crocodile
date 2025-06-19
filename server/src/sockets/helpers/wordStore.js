const getWordsByTheme = require('./getWordsByTheme');
const getRandomWord = require('./getRandomWord');
const ThemeRoomService = require('../../services/themeRoomService');

const roomWords = new Map();

async function initWordsForRoom(roomId) {
  if (roomWords.get(roomId)) {
    return;
  }
  const themeId = await ThemeRoomService.getThemeIdByRoomId(roomId);

  const words = await getWordsByTheme(themeId);

  roomWords.set(roomId, {
    allWords: words,
    unUsedWords: [...words],
    usedWords: [],
    currentWord: null,
  });
}

function clearRoomWords(roomId) {
  roomWords.delete(roomId);
}

function getCurrentWord(roomId) {
  const state = roomWords.get(roomId);

  return state?.currentWord || null;
}

function getRandomWordForRoom(roomId) {
  return getRandomWord(roomId, roomWords);
}

module.exports = {
  roomWords,
  initWordsForRoom,
  clearRoomWords,
  getCurrentWord,
  getRandomWordForRoom,
};
