const { UserRoom } = require('../../db/models');

class UserRoomService {
  static async findUserRoomByIds(userId, roomId) {
    const userRoom = await UserRoom.findOne({
      where: {
        user_id: userId,
        room_id: roomId,
      },
      attributes: ['user_id', 'room_id', 'point'],
    });

    if (!userRoom) {
      throw new HttpError(404, 'UserRoom not found');
    }

    return userRoom;
  }

  static async createUserRoom({ userId, roomId, point }) {
    const newUserRoom = await UserRoom.create({
      user_id: userId,
      room_id: roomId,
      point,
    });

    return await UserRoomService.findUserRoomByIds(
      newUserRoom.user_id,
      newUserRoom.room_id
    );
  }

  static async updatePoint({ userId, roomId, point }) {
    const userRoom = await UserRoomService.findUserRoomByIds(userId, roomId);

    if (!userRoom) {
      throw new HttpError(404, 'UserRoom not found');
    }

    await userRoom.update({ point });

    return await UserRoomService.findUserRoomByIds(userId, roomId);
  }

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
