'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {

    static associate(models) {
      Word.belongsTo(models.Theme, {
        foreignKey: 'theme_id',
        as: 'wordThemes'
      });
    }
  }
  Word.init({
    name: { type: DataTypes.TEXT, allowNull: false },
    theme_id: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};