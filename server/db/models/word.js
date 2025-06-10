'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Word.belongsTo(models.Theme, {
        foreignKey: 'theme_id'
      });
    }
  }
  Word.init({
    name: DataTypes.TEXT,
    theme_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};