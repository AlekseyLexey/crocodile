'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buy extends Model {
    static associate(models) {
      Buy.belongsTo(models.Product, { foreignKey: 'product_id' });
      Buy.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Buy.init(
    {
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Buy',
    }
  );
  return Buy;
};
