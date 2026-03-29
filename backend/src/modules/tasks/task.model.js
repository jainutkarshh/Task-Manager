const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('../../models/user.model');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' },
      len: { args: [3, 255], msg: 'Title must be between 3 and 255 characters' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  updatedAt: false
});

// Set up associations
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Task, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Task;
