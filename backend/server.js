const config = require('./src/config/env');
const { connectDB, sequelize } = require('./src/config/db');
const app = require('./src/app');

// Import models to ensure they are registered with Sequelize
require('./src/models/user.model');
require('./src/modules/tasks/task.model');

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Sync database models (creates tables if they don't exist)
    await sequelize.sync({ alter: config.nodeEnv === 'development' });
    console.log('✅ Database models synchronized');

    // Start server
    app.listen(config.port, () => {
      console.log(`\n🚀 Server running in ${config.nodeEnv} mode`);
      console.log(`📡 API URL: http://localhost:${config.port}/api/v1`);
      console.log(`📚 Swagger Docs: http://localhost:${config.port}/api-docs`);
      console.log(`❤️  Health Check: http://localhost:${config.port}/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

startServer();
