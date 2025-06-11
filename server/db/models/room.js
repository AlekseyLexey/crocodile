'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsToMany(models.User, {
        through: models.UserRoom,
        foreignKey: 'room_id',
        otherKey: 'user_id',
        as: 'roomUsers',
      });
      Room.belongsToMany(models.Theme, {
        through: models.ThemeRoom,
        foreignKey: 'room_id',
        otherKey: 'theme_id',
        as: 'roomThemes',
      });
      Room.belongsTo(models.User, {
        foreignKey: 'owner_id',
        as: 'roomOwner',
      });
    }
  }
  Room.init(
    {
      pictures: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.TEXT, allowNull: false },
      name: { type: DataTypes.TEXT, allowNull: false },
      owner_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
