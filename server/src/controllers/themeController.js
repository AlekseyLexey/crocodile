const ThemeService = require('../services/themeService');
const { formatResponse } = require('../utils/formatResponse');

class ThemeController {
  static async getAllThemes(_, res, next) {
    try {
      const themes = await ThemeService.findAllThemes();

      return res.status(200).json(formatResponse(200, 'Success', themes));
    } catch (err) {
      next(err);
    }
  }

  static async getThemeById(req, res, next) {
    try {
      const themeId = req.validateId;
      const theme = await ThemeService.findThemeById(themeId);

      if (!theme) {
        return res
          .status(404)
          .json(formatResponse(404, 'Theme not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', theme));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ThemeController;
