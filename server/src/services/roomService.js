const { Room, User } = require('../../db/models');
const HttpError = require('../exceptions/HttpError');

class RoomService {
  static async findAllRooms() {
    return await Room.findAll({
      attributes: ['id', 'pictures', 'status', 'name', 'owner_id', 'type'],
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
    const room = await Room.findByPk(roomId, {
      attributes: ['id', 'pictures', 'status', 'name', 'owner_id', 'type'],
      include: [
        {
          model: User,
          as: 'roomUsers',
          attributes: ['id', 'username', 'point'],
          through: {
            attributes: ['point', 'is_lead'],
          },
        },
      ],
    });

    if (!room) {
      throw new HttpError(404, 'Room not found');
    }

    return room.get({ plain: true });
  }

  static async createNewRoom(roomData) {
    const newRoom = await Room.create({
      pictures: roomData.pictures,
      status: 'prepare',
      name: roomData.name,
      owner_id: roomData.userId,
      type: 'mono',
    });

    if (newRoom) {
      return await RoomService.findRoomById(newRoom.id);
    }
  }

  static async updateRoomById(roomId, roomData) {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new HttpError(404, 'Room not found');
    }

    await room.update({
      pictures: roomData.pictures,
      status: roomData.status,
      name: roomData.name,
      owner_id: roomData.userId,
      type: roomData.type,
    });

    return await RoomService.findRoomById(room.id);
  }
}

module.exports = RoomService;


