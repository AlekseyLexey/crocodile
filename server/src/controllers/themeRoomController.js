const ThemeRoomService = require('../services/themeRoomService');
const { formatResponse } = require('../utils/formatResponse');

class ThemeRoomController {
  static async createThemeRoom(req, res, next) {
    try {
      const { themeId, roomId } = req.body;
      const newThemeRoom = await ThemeRoomService.createThemeRoom({
        themeId,
        roomId,
      });

      return res.status(201).json(formatResponse(201, 'Success', newThemeRoom));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ThemeRoomController;
