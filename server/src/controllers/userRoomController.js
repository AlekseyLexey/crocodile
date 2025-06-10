const UserRoomService = require('../services/userRoomService');

class UserRoomController {
  static async createUserRoom(req, res, next) {
		try {
			const userId = res.locals.user.id
      const { roomId, point } = req.body;

      const newUserRoom = await UserRoomService.createUserRoom({
        userId,
        roomId,
        point,
      });

      return res.status(201).json({
        message: 'Success',
        data: newUserRoom,
      });
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
        return res.status(404).json({
          message: 'UserRoom not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: updatedUserRoom,
      });
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
        return res.status(404).json({
          message: 'UserRoom  not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserRoomController;
