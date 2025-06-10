const themeRouter = require('express').Router();
const ThemeController = require('../../controllers/themeController');
const validateId = require('../../middlewares/validateIdMiddleware');

//themes
themeRouter.get('/', ThemeController.getAllThemes);
themeRouter.get('/:id', validateId, ThemeController.getThemeById);

module.exports = themeRouter;
