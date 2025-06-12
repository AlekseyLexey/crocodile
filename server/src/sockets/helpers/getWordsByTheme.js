const WordService = require('../../services/wordService');
const ThemeService = require('../../services/themeService');

async function getWordsByTheme(themeId = null) {
  if (themeId === null) {
    const allWords = await WordService.findAllWords();

    return allWords.map((word) => word.name);
  }

  const theme = await ThemeService.findThemeById(themeId);

  themeWords = theme.themeWords.map((themeWord) => themeWord.name);

  return themeWords;

}

getWordsByTheme(1).then(data => console.log(data));


module.exports = getWordsByTheme;
