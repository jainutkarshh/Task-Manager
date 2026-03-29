const config = require('../config/env');

const errorMiddleware = (err, req, res, next) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    statusCode = 422;
    message = err.errors.map((e) => e.message).join(', ');
  }

  // Handle Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = err.errors.map((e) => e.message).join(', ');
  }

  // Log error in development
  if (config.nodeEnv === 'development') {
    console.error('Error:', err);
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    // Only include stack trace in development
    ...(config.nodeEnv === 'development' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;
