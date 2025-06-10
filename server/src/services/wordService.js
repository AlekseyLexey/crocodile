const { Word } = require('../../db/models');

class WordService {
  static async findAllWords() {
    return await Word.findAll({
      attributes: ['id', 'name', 'theme_id'],
    });
  }

  static async findWordById(wordId) {
    return await Word.findByPk(wordId, {
      attributes: ['id', 'name', 'theme_id'],
    });
  }
}

module.exports = WordService;
