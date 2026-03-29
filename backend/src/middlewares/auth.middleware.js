const { verifyToken } = require('../utils/jwt.utils');
const User = require('../models/user.model');
const { sendError } = require('../utils/response.utils');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'No token provided. Authorization denied.', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return sendError(res, error.message || 'Invalid token', 401);
    }

    // Find user by decoded userId
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return sendError(res, 'User not found. Authorization denied.', 401);
    }

    // Attach user to request object
    req.user = user.toJSON();
    next();
  } catch (error) {
    return sendError(res, 'Authentication failed', 401);
  }
};

module.exports = authMiddleware;
