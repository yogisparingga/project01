const crypto = require('crypto');

function generateStreamKey(length = 32) {
  const bytes = Math.ceil(length / 2);
  return crypto.randomBytes(bytes).toString('hex').slice(0, length);
}

module.exports = generateStreamKey;
