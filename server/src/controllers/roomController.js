const RoomService = require('../services/roomService');

class RoomController {
  static async getAllRooms(_, res, next) {
    try {
      const rooms = await RoomService.findAllRooms();

      return res.status(200).json({
        message: 'Success',
        data: rooms,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getRoomById(req, res, next) {
    try {
      const roomId = req.validateId;
      const room = await RoomService.findRoomById(roomId);

      if (!room) {
        return res.status(404).json({
          message: 'Room not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: room,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createRoom(req, res, next) {
    try {
      const { picture, status, name } = req.body;
      const newRoom = await RoomService.createNewRoom({
        picture,
        status,
        name,
      });

      if (!newRoom) {
        return res.status(400).json({
          message: 'Room was not created',
          data: null,
        });
      }

      return res.status(201).json({
        message: 'Success',
        data: newRoom,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateRoom(req, res, next) {
    try {
      const roomId = req.validateId;
      const { picture, status, name } = req.body;
      const updatedRoom = await RoomService.updateRoomById(roomId, {
        picture,
        status,
        name,
      });

      return res.status(201).json({
        message: 'Success',
        data: updatedRoom,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RoomController;
