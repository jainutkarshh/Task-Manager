const Task = require('./task.model');
const User = require('../../models/user.model');

const getAllTasks = async (userId, role) => {
  const whereClause = role === 'admin' ? {} : { user_id: userId };

  const tasks = await Task.findAll({
    where: whereClause,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return tasks;
};

const getTaskById = async (taskId, userId, role) => {
  const task = await Task.findByPk(taskId, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    ]
  });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // Check ownership for non-admin users
  if (role === 'user' && task.user_id !== userId) {
    const error = new Error('Forbidden: you do not have access to this task');
    error.statusCode = 403;
    throw error;
  }

  return task;
};

const createTask = async (userId, data) => {
  const task = await Task.create({
    user_id: userId,
    title: data.title,
    description: data.description || null,
    status: data.status || 'pending'
  });

  // Fetch the task with user info
  return Task.findByPk(task.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    ]
  });
};

const updateTask = async (taskId, userId, role, data) => {
  // Find task and check ownership
  const task = await getTaskById(taskId, userId, role);

  // Update task
  await task.update({
    ...(data.title && { title: data.title }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.status && { status: data.status })
  });

  // Return updated task with user info
  return Task.findByPk(taskId, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    ]
  });
};

const deleteTask = async (taskId, userId, role) => {
  const task = await Task.findByPk(taskId);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // Check ownership for non-admin users
  if (role === 'user' && task.user_id !== userId) {
    const error = new Error('Forbidden: you can only delete your own tasks');
    error.statusCode = 403;
    throw error;
  }

  await task.destroy();
  return { id: taskId };
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
