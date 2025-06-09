require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Token } = require("../../db/models");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (user_id, refreshToken) => {
  const tokenData = await Token.findOne({ where: { user_id } });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    await tokenData.save();
    return tokenData;
  }

  const token = await Token.create({ user_id, refreshToken });
  return token;
};

const removeToken = async (refreshToken) => {
  const countToken = await Token.destroy({ where: { refreshToken } });
  return countToken;
};

const findToken = async (refreshToken) => {
  const token = await Token.findOne({ where: { refreshToken } });
  return token;
};

const validateAccessToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return isValid;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return isValid;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateAccessToken,
  validateRefreshToken,
};
