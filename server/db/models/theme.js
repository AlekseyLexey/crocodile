'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {

    static associate(models) {
      Theme.belongsToMany(models.Room, {
        through: models.ThemeRoom,
        foreignKey: 'theme_id',
        otherKey: 'room_id',
        as: 'themeRooms'
      });
      Theme.hasMany(models.Word, {
        foreignKey: 'theme_id',
        as: 'themeWords'
      });
    }
  }
  Theme.init({
    name: { type: DataTypes.TEXT, allowNull: false }
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};