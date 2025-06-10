module.exports.formatResponse = (statusCode, message, data = null) => {
  return { statusCode, message, data };
};
