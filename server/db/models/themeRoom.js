'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThemeRoom extends Model {

    static associate(models) {
      
    }
  }
  ThemeRoom.init({
    theme_id: { type: DataTypes.INTEGER, allowNull: false },
    room_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'ThemeRoom',
  });
  return ThemeRoom;
};