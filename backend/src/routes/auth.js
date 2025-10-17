const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const config = require('../config/env');
const createUniqueStreamKey = require('../utils/createUniqueStreamKey');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const normalizedUsername = typeof username === 'string' ? username.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedPassword = typeof password === 'string' ? password.trim() : '';

    if (!normalizedUsername || !normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ message: 'username, email, and password are required' });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User with provided email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10);
    const streamKey = await createUniqueStreamKey(prisma);

    const normalizedRole = typeof role === 'string' && role.trim() ? role.trim() : 'streamer';

    const user = await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        password: hashedPassword,
        role: normalizedRole,
        streamKey,
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        streamKey: user.streamKey,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedPassword = typeof password === 'string' ? password.trim() : '';

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(normalizedPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: '1h',
    });

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        streamKey: user.streamKey,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
