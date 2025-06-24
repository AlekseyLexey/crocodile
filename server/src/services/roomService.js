const { Room, User, Product, Buy } = require('../../db/models');
const HttpError = require('../exceptions/HttpError');

class RoomService {
  static async findAllRooms() {
    return await Room.findAll({
      where: {
        status: 'prepare',
      },
      attributes: ['id', 'pictures', 'status', 'name', 'owner_id', 'type'],
      include: [
        {
          model: User,
          as: 'roomUsers',
          attributes: ['id', 'username', 'point'],
          through: {
            attributes: ['point', 'is_lead', 'is_online'],
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
            attributes: ['point', 'is_lead', 'is_online'],
          },
          include: [
            {
              model: Product,
              as: 'userProducts',
              attributes: ['id', 'name', 'price', 'category_id'],
              // where: {
              //   category_id: 3,
              // },
              through: {
                attributes: ['id', 'user_id', 'product_id', 'is_active'],
                // where: {
                //   is_active: true,
                // },
              },
            },
          ],
        },
      ],
    });

    if (!room) {
      // throw new HttpError(404, 'Room not found');
      return null;
    }

    return room.get({ plain: true });

  }

  static async createNewRoom(roomData) {
    const newRoom = await Room.create({
      pictures: roomData.pictures,
      status: 'prepare',
      name: roomData.name,
      owner_id: roomData.userId,
      type: roomData.type,
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


RoomService.findRoomById(21).then(data => console.log(data))