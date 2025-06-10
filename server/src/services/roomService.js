const { Room, User } = require('../../db/models');

class RoomService {
  static async findAllRooms() {
    return await Room.findAll({
      attributes: ['id', 'pictures', 'status', 'name'],
      include: [
        {
          model: User,
          as: 'roomUsers',
          attributes: ['id', 'username', 'point'],
          through: {
            attributes: ['point'],
          },
        },
      ],
    });
  }

  static async findRoomById(roomId) {
    return await Room.findByPk(roomId, {
      attributes: ['id', 'pictures', 'status', 'name'],
      include: [
        {
          model: User,
          as: 'roomUsers',
          attributes: ['id', 'username', 'point'],
          through: {
            attributes: ['point'],
          },
        },
      ],
    });
  }

  static async createNewRoom(roomData) {
    return await Room.create({
      pictures: roomData.pictures,
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
      pictures: roomData.pictures,
      status: roomData.status,
      name: roomData.name,
    });
  }
}

module.exports = RoomService;
