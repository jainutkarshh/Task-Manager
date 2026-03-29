const { sendError } = require('../utils/response.utils');

const roleGuard = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, 'Forbidden: insufficient permissions', 403);
    }

    next();
  };
};

module.exports = roleGuard;
