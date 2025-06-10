const { Word, Theme } = require('../../db/models');

class ThemeService {
  static async findAllThemes() {
    return await Theme.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Word,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  static async findThemeById(themeId) {
    return await Theme.findByPk(themeId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: Word,
          attributes: ['id', 'name'],
        },
      ],
    });
  }
}

module.exports = ThemeService;
