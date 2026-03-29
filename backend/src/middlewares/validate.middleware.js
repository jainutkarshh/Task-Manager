const { validationResult } = require('express-validator');

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg
    }));

    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      data: { errors: errorMessages }
    });
  }

  next();
};

module.exports = validateMiddleware;
