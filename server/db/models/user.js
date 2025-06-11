"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Token, {
        foreignKey: "user_id",
        as: "tokens",
      });
      User.belongsToMany(models.Room, {
        through: models.UserRoom,
        foreignKey: 'user_id',
        otherKey: 'room_id',
        as: 'userRooms'
      });
      User.belongsToMany(models.Product, {
        through: models.Buy,
        foreignKey: 'user_id',
        otherKey: 'product_id',
        as: 'userProducts'
      })
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
