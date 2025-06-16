const { ThemeRoom } = require('../../db/models');

class ThemeRoomService {
  static async createThemeRoom({ themeId, roomId }) {
    const themeRoom = await ThemeRoom.create({
      theme_id: themeId,
      room_id: roomId,
    });

    if (themeRoom) {
      return await ThemeRoom.findOne({
        where: {
          theme_id: themeId,
          room_id: roomId,
        },
        attributes: ['id', 'theme_id', 'room_id'],
      });
    }
  }

  static async getThemeIdByRoomId(roomId) {
    const themeRoom = await ThemeRoom.findOne({
      where: { room_id: roomId },
    });

    return themeRoom?.theme_id ?? null;
  }
}

module.exports = ThemeRoomService;
