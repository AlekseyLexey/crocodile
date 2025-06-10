const { ThemeRoom } = require('../../db/models');

class ThemeRoomService {
  static async createThemeRoom({ themeId, roomId }) {
    const themeRoom = await ThemeRoom.create({
      theme_id: themeId,
      room_id: roomId,
    });

    return await ThemeRoom.findOne({
      where: {
        theme_id: themeId,
        room_id: roomId,
      },
      attributes: ['id', 'theme_id', 'room_id'],
    });
  }
}

module.exports = ThemeRoomService;
