class HttpError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new HttpError(401, "Пользователь не авторизован");
  }

  static BadRequestError(message, errors = []) {
    return new HttpError(400, message, errors);
  }
}

module.exports = HttpError;
