const { UserRoom } = require('../../db/models');

class UserRoomService {
  static async createUserRoom({ userId, roomId, point }) {
    return await UserRoom.create({
      user_id: userId,
      room_id: roomId,
      point,
    });
  }

  static async updatePoint({ userId, roomId, point }) {
    const userRoom = await UserRoom.findOne({
      where: {
        user_id: userId,
        room_id: roomId,
      },
    });

    if (!userRoom) {
      return null;
    }

    return await userRoom.update({ point });
  }

  //при отключении пользователя, будем ли удалять его из комнаты?
  static async deleteUserRoom({ userId, roomId }) {
    return await UserRoom.destroy({
      where: {
        user_id: userId,
        room_id: roomId,
      },
    });
  }
}

module.exports = UserRoomService;
