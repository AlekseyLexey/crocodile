const { UserRoom, User } = require('../../db/models');

class UserRoomService {
  static async findUserRoomByIds(userId, roomId) {
    const userRoom = await UserRoom.findOne({
      where: {
        user_id: userId,
        room_id: roomId,
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'point']
      }],
      attributes: ['user_id', 'room_id', 'point', 'is_lead', 'was_lead'],
    });

    if (!userRoom) {
      throw new HttpError(404, 'UserRoom not found');
    }

    return userRoom;
  }

  static async createUserRoom({ userId, roomId, point = 0, is_lead = false }) {
    const newUserRoom = await UserRoom.create({
      user_id: userId,
      room_id: roomId,
      point,
      is_lead
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
  //или н и не нужен
  static async findLeadOfRoom({ roomId }) {
    const lead = await UserRoom.findOne({
      where: {
        room_id: roomId,
        is_lead: true
      },
      include: [{
        model: User,
        as: 'user'
      }]
    })

    return lead;
  }

  static async findNextLeadOfRoom({ roomId }) {
    const lead = await UserRoom.findOne({
      where: {
        room_id: roomId,
        is_lead: false,
        was_lead: false
      },
      include: [{
        model: User,
        as: 'user'
      }],
      order: [['createdAt', 'ASC']],
    })

    return lead;
  }

  static async changeLeadStatus({ userId, roomId, leadStatus, wasLeadStatus = false }) {
    const changedItem = await UserRoomService.findUserRoomByIds(userId, roomId);

    if (!changedItem) {
      throw new HttpError(404, 'UserRoom not found');
    }

    await changedItem.update({ is_lead:  leadStatus, was_lead: wasLeadStatus});

    return await UserRoomService.findUserRoomByIds(userId, roomId);
  }
}

module.exports = UserRoomService;

