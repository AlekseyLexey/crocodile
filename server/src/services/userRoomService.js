const { UserRoom, User, Room } = require('../../db/models');
const HttpError = require('../exceptions/HttpError');
const { Op } = require('sequelize');

class UserRoomService {
  static async findUserRoomByIds(userId, roomId) {
    const userRoom = await UserRoom.findOne({
      where: {
        user_id: userId,
        room_id: roomId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'point'],
        },
      ],
      attributes: ['user_id', 'room_id', 'point', 'is_lead', 'was_lead'],
    });

    return userRoom;
  }

  static async createUserRoom({ userId, roomId, point = 0, is_lead = false }) {
    const newUserRoom = await UserRoom.create({
      user_id: userId,
      room_id: roomId,
      point,
      is_lead,
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

  static async findLeadOfRoom({ roomId }) {
    const lead = await UserRoom.findOne({
      where: {
        room_id: roomId,
        is_lead: true,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    return lead ? lead.get({ plain: true }) : null;
  }

  static async findNextLeadOfRoom({ roomId }) {
    const lead = await UserRoom.findOne({
      where: {
        room_id: roomId,
        is_lead: false,
        was_lead: false,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    return lead ? lead.get({ plain: true }) : null;
  }

  static async changeLeadStatus({
    userId,
    roomId,
    leadStatus,
    wasLeadStatus = false,
  }) {
    const changedItem = await UserRoomService.findUserRoomByIds(userId, roomId);

    if (!changedItem) {
      throw new HttpError(404, 'UserRoom not found');
    }

    await changedItem.update({ is_lead: leadStatus, was_lead: wasLeadStatus });

    return await UserRoomService.findUserRoomByIds(userId, roomId);
  }

  static async findUserFinishedRooms(userId) {
    const userRooms = await UserRoom.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Room,
          as: 'room',
          where: {
            status: 'end',
          },
          attributes: [
            'id',
            'pictures',
            'status',
            'name',
            'owner_id',
            'type',
            'createdAt',
          ],
          required: true,
        },
      ],
      order: [
        [
          {
            model: Room,
            as: 'room',
          },
          'createdAt',
          'ASC',
        ],
      ],
      attributes: ['point'],
    });

    if (userRooms.length === 0) {
      return null
    }

    return userRooms.map((room) => room.get({ plain: true }));
  }

  static async findUserActiveRooms(userId) {
    const userRooms = await UserRoom.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Room,
          as: 'room',
          where: {
            status: {
              [Op.in]: ['active', 'pause'],
            },
          },
          attributes: [
            'id',
            'pictures',
            'status',
            'name',
            'owner_id',
            'type',
            'createdAt',
          ],
          required: true,
        },
      ],
      order: [
        [
          {
            model: Room,
            as: 'room',
          },
          'createdAt',
          'ASC',
        ],
      ],
      attributes: ['point'],
    });

    if (userRooms.length === 0) {
      return null
    }

    return userRooms.map((room) => room.get({ plain: true }));
  }
}

module.exports = UserRoomService;

UserRoomService.findUserActiveRooms(2).then((data) => console.log(data));
