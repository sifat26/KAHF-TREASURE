import app from './app';
import config from './config';
import { connectDB } from './config/db';

async function startServer() {
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`🚀 KAHF Treasure API running on http://localhost:${config.port}`);
    console.log(`   Environment: ${config.node_env}`);
    console.log(`   API base: http://localhost:${config.port}/api/v1`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    server.close(() => process.exit(0));
  });
}

startServer();
