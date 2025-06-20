const UserRoomService = require('../services/userRoomService');
const { formatResponse } = require('../utils/formatResponse');

class UserRoomController {
  static async createUserRoom(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { roomId, point } = req.body;

      const newUserRoom = await UserRoomService.createUserRoom({
        userId,
        roomId,
        point,
      });

      return res.status(201).json(formatResponse(201, 'Success', newUserRoom));
    } catch (err) {
      next(err);
    }
  }

  static async updateUserRoomPoint(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { roomId, point } = req.body;

      const updatedUserRoom = await UserRoomService.updatePoint({
        userId,
        roomId,
        point,
      });

      if (!updatedUserRoom) {
        return res
          .status(404)
          .json(formatResponse(404, 'UserRoom not found', null));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Success', updatedUserRoom));
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserRoom(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { roomId } = req.body;

      const deletedCount = await UserRoomService.deleteUserRoom({
        userId,
        roomId,
      });

      if (deletedCount === 0) {
        return res
          .status(404)
          .json(formatResponse(404, 'UserRoom  not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', deletedCount));
    } catch (err) {
      next(err);
    }
  }

  static async findUserRoomByUserId(req, res, next) {
    try {
      const { userId, roomId } = req.body;

      const userRoom = await UserRoomService.findUserRoomByIds(userId, roomId);

      return res.status(200).json(formatResponse(200, 'Success', userRoom));
    } catch (err) {
      next(err);
    }
  }

  static async getEndedUserRooms(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const userRooms = await UserRoomService.findUserFinishedRooms(userId);

      return res.status(200).json(formatResponse(200, 'Success', userRooms));
    } catch (err) {
      next(err);
    }
  }

  static async getActiveUserRooms(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const userRooms = await UserRoomService.findUserActiveRooms(userId);

      return res.status(200).json(formatResponse(200, 'Success', userRooms));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserRoomController;
