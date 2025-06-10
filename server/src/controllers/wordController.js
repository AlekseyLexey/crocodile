const WordService = require('../services/wordService');

class WordController {
  static async getAllWords(_, res, next) {
    try {
      const words = await WordService.findAllWords();

      return res.status(200).json({
        message: 'Success',
        data: words,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getWordById(req, res, next) {
    try {
      const wordId = req.validateId;

      const word = await WordService.findWordById(wordId);

      if (!word) {
        return res.status(404).json({
          message: 'Word not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: word,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WordController;
