const {
  registrationService,
  loginService,
  logoutService,
  refreshService,
} = require("../services/userService");
const cookieConfig = require("../config/cookieConfig");

const registration = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userData = await registrationService(username, email, password);

    res.cookie("refreshToken", userData.refreshToken, cookieConfig);

    return res.status(201).json(userData);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userData = await loginService(username, email, password);

    res.cookie("refreshToken", userData.refreshToken, cookieConfig);

    return res.status(200).json(userData);
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    await logoutService(refreshToken);

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Вы разлогинились" });
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refreshService(refreshToken);

    res.cookie("refreshToken", userData.refreshToken, cookieConfig);

    return res.status(200).json(userData);
  } catch (e) {
    next(e);
  }
};

module.exports = { registration, login, logout, refresh };
