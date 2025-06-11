const WordService = require('../services/wordService');
const { formatResponse } = require('../utils/formatResponse');

class WordController {
  static async getAllWords(_, res, next) {
    try {
      const words = await WordService.findAllWords();

      return res.status(200).json(formatResponse(200, 'Success', words));
    } catch (err) {
      next(err);
    }
  }

  static async getWordById(req, res, next) {
    try {
      const wordId = req.validateId;

      const word = await WordService.findWordById(wordId);

      if (!word) {
        return res
          .status(404)
          .json(formatResponse(404, 'Word not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', word));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WordController;
