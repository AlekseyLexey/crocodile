const HttpError = require("../exceptions/HttpError");
const { formatResponse } = require("../utils/formatResponse");
const errorMiddleware = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json(formatResponse(err.statusCode, err.message));
  }

  return res.status(500).json(formatResponse(500, "Internal server error"));
};

module.exports = errorMiddleware;
