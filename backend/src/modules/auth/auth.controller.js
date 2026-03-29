const { registerUser, loginUser } = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.utils');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    return sendSuccess(res, result, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    return sendSuccess(res, result, 'Login successful', 200);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  return sendSuccess(res, { user: req.user }, 'User retrieved successfully', 200);
};

module.exports = { register, login, getMe };
