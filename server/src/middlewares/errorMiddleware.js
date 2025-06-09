const HttpError = require("../exceptions/HttpError");

const errorMiddleware = (err, req, res, next) => {
  console.log("ERROR", err.message);

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: `Ошибка сервера: ${err.message}` });
};

module.exports = errorMiddleware;
