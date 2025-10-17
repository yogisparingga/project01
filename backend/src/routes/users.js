const express = require('express');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');
const createUniqueStreamKey = require('../utils/createUniqueStreamKey');

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        streamKey: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.get('/stream-key', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { streamKey: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ streamKey: user.streamKey });
  } catch (error) {
    return next(error);
  }
});

router.post('/regenerate-key', async (req, res, next) => {
  try {
    const newStreamKey = await createUniqueStreamKey(prisma);
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { streamKey: newStreamKey },
      select: { streamKey: true },
    });

    req.user.streamKey = updatedUser.streamKey;

    return res.json({ streamKey: updatedUser.streamKey });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }

    return next(error);
  }
});

module.exports = router;
