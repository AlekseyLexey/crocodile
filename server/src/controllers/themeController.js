const ThemeService = require('../services/themeService');

class ThemeController {
  static async getAllThemes(_, res, next) {
    try {
      const themes = await ThemeService.findAllThemes();

      return res.status(200).json({
        message: 'Success',
        data: themes,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getThemeById(req, res, next) {
    try {
      const themeId = req.validateId;
      const theme = await ThemeService.findThemeById(themeId);

      if (!theme) {
        return res.status(404).json({
          message: 'Theme not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: theme,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ThemeController;
