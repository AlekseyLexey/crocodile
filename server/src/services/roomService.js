const { Room, User } = require('../../db/models');

class RoomService {
  static async findAllRooms() {
    return await Room.findAll({
      attributes: ['id', 'picture', 'status', 'name'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'points'],
          through: {
            attributes: ['point'],
          },
        },
      ],
    });
  }

  static async findRoomById(roomId) {
    return await Room.findByPk(roomId, {
      attributes: ['id', 'picture', 'status', 'name'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'points'],
          through: {
            attributes: ['point'],
          },
        },
      ],
    });
  }

  static async createNewRoom(roomData) {
    return await Room.create({
      picture: roomData.picture,
      status: roomData.status,
      name: roomData.name,
    });
  }

  static async updateRoomById(roomId, roomData) {
    const room = await Room.findByPk(roomId);
    if (!room) {
      return null;
    }

    return await room.update({
      picture: roomData.picture,
      status: roomData.status,
      name: roomData.name,
    });
  }
}

module.exports = RoomService;
