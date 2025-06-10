const ThemeRoomService = require('../services/themeRoomService');

class ThemeRoomController {
  static async createThemeRoom(req, res, next) {
    try {
      const { themeId, roomId } = req.body;
      const newThemeRoom = await ThemeRoomService.createThemeRoom({
        themeId,
        roomId,
      });

      return res.status(201).json({
        message: 'Success',
        data: newThemeRoom,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ThemeRoomController;
