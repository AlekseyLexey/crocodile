const {
  registrationService,
  loginService,
  logoutService,
  refreshService,
  updateUserService,
} = require('../services/userService');
const cookieConfig = require('../config/cookieConfig');
const { formatResponse } = require('../utils/formatResponse');

const registration = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userData = await registrationService(username, email, password);

    res.cookie('refreshToken', userData.refreshToken, cookieConfig);

    return res
      .status(201)
      .json(formatResponse(201, 'Пользователь создан', userData));
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userData = await loginService(username, email, password);

    res.cookie('refreshToken', userData.refreshToken, cookieConfig);

    return res
      .status(200)
      .json(formatResponse(200, 'Пользователь вошел', userData));
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    await logoutService(refreshToken);

    res.clearCookie('refreshToken');

    return res.status(200).json(200, 'Пользователь вышел');
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refreshService(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, cookieConfig);

    return res
      .status(200)
      .json(formatResponse(200, 'Пользователь вошел', userData));
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const updateData = req.body;
    const updatedUser = await updateUserService(userId, updateData);

    return res
      .status(200)
      .json(
        formatResponse(200, 'Пользовательские данные изменены', updatedUser)
      );
  } catch (e) {
    next(e);
  }
};

module.exports = { registration, login, logout, refresh, updateUser };
