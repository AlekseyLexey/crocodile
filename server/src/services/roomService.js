const { Room, User } = require("../../db/models");
const HttpError = require("../exceptions/HttpError");

class RoomService {
  static async findAllRooms() {
    return await Room.findAll({
      attributes: ["id", "pictures", "status", "name", "owner_id"],
      include: [
        {
          model: User,
          as: "roomUsers",
          attributes: ["id", "username", "point"],
          through: {
            attributes: ["point"],
          },
        },
      ],
    });
  }

  static async findRoomById(roomId) {
    return await Room.findByPk(roomId, {
      attributes: ["id", "pictures", "status", "name", "owner_id"],
      include: [
        {
          model: User,
          as: "roomUsers",
          attributes: ["id", "username", "point"],
          through: {
            attributes: ["point"],
          },
        },
      ],
    });
  }

  static async createNewRoom(roomData) {
    const newRoom = await Room.create({
      pictures: roomData.pictures,
      status: roomData.status,
      name: roomData.name,
      owner_id: roomData.userId,
    });

    if (newRoom) {
      return await RoomService.findRoomById(newRoom.id);
    }
  }

  static async updateRoomById(roomId, roomData) {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new HttpError(404, "Room not found");
    }

    await room.update({
      pictures: roomData.pictures,
      status: roomData.status,
      name: roomData.name,
      owner_id: roomData.userId,
    });

    return await RoomService.findRoomById(room.id);
  }
}

module.exports = RoomService;
