const themeRoomRouter = require('express').Router();
const ThemeRoomController = require('../../controllers/themeRoomController');

//theme-room
themeRoomRouter.post('/', ThemeRoomController.createThemeRoom);


module.exports = themeRoomRouter;