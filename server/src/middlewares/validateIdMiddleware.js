const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: null,
    });
  }

  req.validateId = id;
  next();
};

module.exports = validateId;
