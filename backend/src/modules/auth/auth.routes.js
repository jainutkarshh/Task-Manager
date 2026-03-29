const express = require('express');
const router = express.Router();

const { register, login, getMe } = require('./auth.controller');
const { registerValidator, loginValidator } = require('./auth.validator');
const validateMiddleware = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

// POST /api/v1/auth/register
router.post('/register', registerValidator, validateMiddleware, register);

// POST /api/v1/auth/login
router.post('/login', loginValidator, validateMiddleware, login);

// GET /api/v1/auth/me (protected)
router.get('/me', authMiddleware, getMe);

module.exports = router;
