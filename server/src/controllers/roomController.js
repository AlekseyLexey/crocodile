const RoomService = require('../services/roomService');
const { formatResponse } = require('../utils/formatResponse');

class RoomController {
  static async getAllRooms(_, res, next) {
    try {
      const rooms = await RoomService.findAllRooms();

      return res.status(200).json(formatResponse(200, 'Success', rooms));
    } catch (err) {
      next(err);
    }
  }

  static async getRoomById(req, res, next) {
    try {
      const roomId = req.validateId;
      const room = await RoomService.findRoomById(roomId);

      if (!room) {
        return res
          .status(404)
          .json(formatResponse(404, 'Room not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', room));
    } catch (err) {
      next(err);
    }
  }

  static async createRoom(req, res, next) {
    try {

      const { pictures, status, name } = req.body;
      const newRoom = await RoomService.createNewRoom({
        pictures,
        status,
        name,
      });

      if (!newRoom) {
        return res
          .status(400)
          .json(formatResponse(400, 'Room was not created', null));
      }

      return res.status(201).json(formatResponse(201, 'Success', newRoom));
    } catch (err) {
      next(err);
    }
  }

  static async updateRoom(req, res, next) {
    try {
      const roomId = req.validateId;

      const { pictures, status, name } = req.body;
      const updatedRoom = await RoomService.updateRoomById(roomId, {
        pictures,
        status,
        name,
      });

      if (!updatedRoom) {
        return res
          .status(404)
          .json(formatResponse(404, 'Room not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', updatedRoom));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RoomController;
