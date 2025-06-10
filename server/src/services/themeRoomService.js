const { ThemeRoom } = require('../../db/models');

class ThemeRoomService {
  static async createThemeRoom({ themeId, roomId }) {
    return await ThemeRoom.create({
      theme_id: themeId,
      room_id: roomId,
    });
  }
}

module.exports = ThemeRoomService;
