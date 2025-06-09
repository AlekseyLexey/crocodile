"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Token.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      refreshToken: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
