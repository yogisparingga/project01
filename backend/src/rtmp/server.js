const NodeMediaServer = require('node-media-server');
const config = require('../config/env');
const prisma = require('../lib/prisma');

let nmsInstance;

async function validateStreamKey(streamKey) {
  if (!streamKey) return false;

  const user = await prisma.user.findUnique({
    where: { streamKey },
    select: { id: true },
  });

  return Boolean(user);
}

function buildConfig() {
  const baseConfig = {
    logType: 2,
    rtmp: {
      port: config.rtmpPort,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: config.rtmpHttpPort,
      allow_origin: '*',
    },
    auth: {
      api: true,
    },
  };

  if (config.ffmpegPath) {
    baseConfig.trans = {
      ffmpeg: config.ffmpegPath,
      tasks: [
        {
          app: config.streamAppName,
          hls: true,
          hlsFlags: '[hls_time=2:hls_list_size=6:hls_flags=delete_segments]',
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        },
      ],
    };
  }

  return baseConfig;
}

function startRTMPServer() {
  if (nmsInstance) {
    return nmsInstance;
  }

  const nmsConfig = buildConfig();
  const nms = new NodeMediaServer(nmsConfig);

  nms.on('prePublish', async (id, streamPath) => {
    const session = nms.getSession(id);
    const parts = streamPath.split('/');
    const streamKey = parts[parts.length - 1];

    try {
      const isValid = await validateStreamKey(streamKey);
      if (!isValid) {
        console.warn(`RTMP publish rejected. Invalid stream key: ${streamKey}`);
        session && session.reject();
      } else {
        console.log(`RTMP publish accepted for stream key: ${streamKey}`);
      }
    } catch (error) {
      console.error('Error validating stream key', error);
      session && session.reject();
    }
  });

  nms.on('donePublish', (id, streamPath) => {
    console.log(`Stream ended: ${streamPath}`);
  });

  nms.run();
  nmsInstance = nms;
  console.log(`RTMP server is running on rtmp://0.0.0.0:${config.rtmpPort}/${config.streamAppName}`);
  return nms;
}

function stopRTMPServer() {
  if (nmsInstance) {
    try {
      nmsInstance.stop();
      console.log('RTMP server stopped');
    } catch (error) {
      console.error('Error stopping RTMP server', error);
    } finally {
      nmsInstance = null;
    }
  }
}

module.exports = {
  startRTMPServer,
  stopRTMPServer,
};
