'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'category_id',
        as: 'categoryProducts'
      });
    }
  }
  Category.init({
    name: { type: DataTypes.TEXT, allowNull: false }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};