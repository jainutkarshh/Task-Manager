const User = require('../../models/user.model');
const { signToken } = require('../../utils/jwt.utils');

const registerUser = async (name, email, password) => {
  // Check if email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  // Create user (password hashing handled by model hook)
  const user = await User.create({
    name,
    email,
    password_hash: password // Will be hashed by beforeCreate hook
  });

  // Generate token
  const token = signToken({ userId: user.id, role: user.role });

  // Return user without password_hash
  return {
    user: user.toJSON(),
    token
  };
};

const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Generate token
  const token = signToken({ userId: user.id, role: user.role });

  // Return token and user info (without password_hash)
  return {
    user: user.toJSON(),
    token
  };
};

module.exports = { registerUser, loginUser };
