'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'productCategories',
      });

      Product.belongsToMany(models.User, {
        through: models.Buy,
        foreignKey: 'product_id',
        otherKey: 'user_id',
        as: 'productUsers',
      });
    }
  }
  Product.init(
    {
      name: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
