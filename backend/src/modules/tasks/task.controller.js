const taskService = require('./task.service');
const { sendSuccess } = require('../../utils/response.utils');

const getAllTasks = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const tasks = await taskService.getAllTasks(userId, role);
    return sendSuccess(res, { tasks }, 'Tasks retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId, role } = req.user;
    const task = await taskService.getTaskById(taskId, userId, role);
    return sendSuccess(res, { task }, 'Task retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const task = await taskService.createTask(userId, req.body);
    return sendSuccess(res, { task }, 'Task created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId, role } = req.user;
    const task = await taskService.updateTask(taskId, userId, role, req.body);
    return sendSuccess(res, { task }, 'Task updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId, role } = req.user;
    const result = await taskService.deleteTask(taskId, userId, role);
    return sendSuccess(res, result, 'Task deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
