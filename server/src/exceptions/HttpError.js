class HttpError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }

  static UnauthorizedError() {
    return new HttpError(401, "Пользователь не авторизован");
  }

  static BadRequestError(message, errors = []) {
    return new HttpError(400, message, errors);
  }
}

module.exports = HttpError;
