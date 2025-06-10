'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsToMany(models.User, {
        through: models.UserRoom,
        foreignKey: 'room_id',
        otherKey: 'user_id'
      });
      Room.belongsToMany(models.Theme, {
        through: models.ThemeRoom,
        foreignKey: 'room_id',
        otherKey: 'theme_id'
      });
    }
  }
  Room.init({
    pictures: DataTypes.TEXT,
    status: DataTypes.TEXT,
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};