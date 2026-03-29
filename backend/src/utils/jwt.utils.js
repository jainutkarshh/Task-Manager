const jwt = require('jsonwebtoken');
const config = require('../config/env');

const signToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Token has expired');
      err.statusCode = 401;
      throw err;
    }
    if (error.name === 'JsonWebTokenError') {
      const err = new Error('Invalid token');
      err.statusCode = 401;
      throw err;
    }
    throw error;
  }
};

module.exports = { signToken, verifyToken };
