'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Theme.belongsToMany(models.Room, {
        through: models.ThemeRoom,
        foreignKey: 'theme_id',
        otherKey: 'room_id'
      });
      Theme.hasMany(models.Word, {
        foreignKey: 'theme_id'
      });
    }
  }
  Theme.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};