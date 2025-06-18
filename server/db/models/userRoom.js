'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {
    static associate(models) {
      UserRoom.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      UserRoom.belongsTo(models.Room, {
        foreignKey: 'room_id',
        as: 'room',
      });
    }
  }
  UserRoom.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      room_id: { type: DataTypes.INTEGER, allowNull: false },
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      is_lead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      was_lead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'UserRoom',
    }
  );
  return UserRoom;
};
