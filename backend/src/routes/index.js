const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const taskRoutes = require('../modules/tasks/task.routes');
const authMiddleware = require('../middlewares/auth.middleware');

// Auth routes (public except /me)
router.use('/auth', authRoutes);

// Task routes (all protected)
router.use('/tasks', authMiddleware, taskRoutes);

module.exports = router;
