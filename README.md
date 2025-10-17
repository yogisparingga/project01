# YouTube Live Streaming Platform

Foundational setup for a YouTube live streaming application featuring a backend API, RTMP server, PostgreSQL database, and supporting infrastructure.

## Tech Stack

- **Backend**: Node.js with Express.js
- **RTMP Server**: node-media-server with FFmpeg transcoding
- **Database**: PostgreSQL managed via Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Containerization**: Docker & docker-compose

## Project Structure

```
backend/    # Express API, Prisma schema, RTMP server setup
frontend/   # Placeholder for client-side application
deployment/ # Deployment assets and future infrastructure configuration
```

## Getting Started

1. Copy the environment template and adjust values as needed:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

2. Install backend dependencies (optional when using Docker):
   ```bash
   cd backend
   npm install
   ```

3. Start the services with Docker Compose:
   ```bash
   docker-compose up --build
   ```

   - Backend API available at `http://localhost:3000`
   - RTMP server listening on `rtmp://localhost:1935/live`
   - RTMP HTTP playback endpoint at `http://localhost:8000`

4. Apply database migrations (if not using Docker command above):
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## API Overview

- `POST /api/auth/register` – Create a new user account
- `POST /api/auth/login` – Authenticate and receive a JWT
- `GET /api/users/profile` – Retrieve authenticated user profile
- `GET /api/users/stream-key` – Fetch the current stream key
- `POST /api/users/regenerate-key` – Rotate the user stream key

All endpoints under `/api/users` require a valid `Authorization: Bearer <token>` header.

## RTMP Streaming

Publish streams to `rtmp://localhost:1935/live/<stream_key>` using the stream key associated with the authenticated user. Streams with invalid keys are rejected.

## Development Notes

- Prisma schema and migrations are located in `backend/prisma`.
- The RTMP server uses FFmpeg for HLS/DASH transcoding. Ensure `FFMPEG_PATH` points to a valid executable.
- Modify `.env` or Docker Compose environment variables to change ports, secrets, or database credentials.
