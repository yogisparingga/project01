const app = require('./app');
const config = require('./config/env');
const prisma = require('./lib/prisma');
const { startRTMPServer, stopRTMPServer } = require('./rtmp/server');

const server = app.listen(config.port, () => {
  console.log(`Backend API listening on http://0.0.0.0:${config.port}`);
});

startRTMPServer();

async function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting Prisma', error);
  }

  stopRTMPServer();

  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.warn('Forcing shutdown');
    process.exit(0);
  }, 5000).unref();
}

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal);
  });
});
