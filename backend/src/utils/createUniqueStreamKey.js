const generateStreamKey = require('./generateStreamKey');

async function createUniqueStreamKey(prismaClient, length = 40, maxAttempts = 5) {
  let attempt = 0;

  while (attempt < maxAttempts) {
    const candidate = generateStreamKey(length);
    const existing = await prismaClient.user.findUnique({
      where: { streamKey: candidate },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }

    attempt += 1;
  }

  throw new Error('Unable to generate unique stream key');
}

module.exports = createUniqueStreamKey;
