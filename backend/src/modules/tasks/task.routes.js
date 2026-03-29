const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('./task.controller');
const { createTaskValidator, updateTaskValidator } = require('./task.validator');
const validateMiddleware = require('../../middlewares/validate.middleware');

// All routes require authentication (applied at router mount level)

// GET /api/v1/tasks - Get all tasks (user: own tasks, admin: all)
router.get('/', getAllTasks);

// GET /api/v1/tasks/:id - Get task by ID
router.get('/:id', getTaskById);

// POST /api/v1/tasks - Create a new task
router.post('/', createTaskValidator, validateMiddleware, createTask);

// PUT /api/v1/tasks/:id - Update a task
router.put('/:id', updateTaskValidator, validateMiddleware, updateTask);

// DELETE /api/v1/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
