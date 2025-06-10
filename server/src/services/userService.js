const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateRefreshToken,
} = require("./tokenService");
const { formatResponse } = require("../utils/formatResponse");
const HttpError = require("../exceptions/HttpError");

const registrationService = async (username, email, password) => {
  const candidateByLogin = await User.findOne({ where: { username } });

  if (candidateByLogin) {
    throw new HttpError(400, "Пользователь с таким именем уже существует");
  }

  const candidateByEmail = await User.findOne({ where: { email } });

  if (candidateByEmail) {
    throw new HttpError(400, "Пользователь с такой почтой уже существует");
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const user = await User.create({ username, email, password: hashPassword });
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    point: user.point,
  };

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const loginService = async (username, email, password) => {
  const user = await User.findOne({ where: { username, email } });

  if (!user) {
    throw new HttpError(404, "Пользователя не существует");
  }

  const isPassEqual = await bcrypt.compare(password, user.password);

  if (!isPassEqual) {
    throw new HttpError(400, "Неверный пароль");
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    point: user.point,
  };

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const logoutService = async (refreshToken) => {
  const countToken = await removeToken(refreshToken);
  return countToken;
};

const refreshService = async (refreshToken) => {
  if (!refreshToken) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const isValid = validateRefreshToken(refreshToken);

  const tokenFromDB = await findToken(refreshToken);

  if (!isValid || !tokenFromDB) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const user = await User.findByPk(tokenFromDB.user_id);

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    point: user.point,
  };

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

module.exports = {
  registrationService,
  loginService,
  logoutService,
  refreshService,
};
