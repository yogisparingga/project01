const path = require('path');
const dotenv = require('dotenv');

const projectRoot = path.resolve(__dirname, '../../');
const defaultEnvPath = path.join(projectRoot, '.env');
const defaultMediaRoot = path.join(projectRoot, 'media');

dotenv.config({ path: process.env.ENV_PATH || defaultEnvPath, override: false });

const isTestEnv = (process.env.NODE_ENV || '').toLowerCase() === 'test';

describeMissingEnv('DATABASE_URL', 'postgresql://user:password@localhost:5432/dbname?schema=public');
describeMissingEnv('JWT_SECRET', 'a strong secret string');

function describeMissingEnv(key, description) {
  if (isTestEnv) return;
  if (!process.env[key]) {
    console.warn(`[env] ${key} is not set. Expected ${description}.`);
  }
}

function resolveMediaRoot(value) {
  if (!value) {
    return defaultMediaRoot;
  }

  return path.isAbsolute(value) ? value : path.resolve(projectRoot, value);
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  databaseUrl: process.env.DATABASE_URL || '',
  rtmpPort: Number(process.env.RTMP_PORT) || 1935,
  rtmpHttpPort: Number(process.env.RTMP_HTTP_PORT) || 8000,
  ffmpegPath: process.env.FFMPEG_PATH || '/usr/bin/ffmpeg',
  streamAppName: process.env.RTMP_APP_NAME || 'live',
  rtmpMediaRoot: resolveMediaRoot(process.env.RTMP_MEDIA_ROOT),
};

module.exports = config;
