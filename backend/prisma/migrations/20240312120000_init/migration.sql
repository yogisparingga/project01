-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable users
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'streamer',
    "stream_key" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable schedules
CREATE TABLE IF NOT EXISTS "schedules" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "youtube_url" TEXT,
    "stream_key" TEXT,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable stream_sessions
CREATE TABLE IF NOT EXISTS "stream_sessions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "schedule_id" UUID,
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'inactive',
    "viewer_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- AddForeignKeys
ALTER TABLE "schedules"
    ADD CONSTRAINT "schedules_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stream_sessions"
    ADD CONSTRAINT "stream_sessions_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "stream_sessions"
    ADD CONSTRAINT "stream_sessions_schedule_id_fkey"
        FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id")
        ON DELETE SET NULL ON UPDATE CASCADE;

-- Indexes
CREATE INDEX IF NOT EXISTS "schedules_user_id_idx" ON "schedules" ("user_id");
CREATE INDEX IF NOT EXISTS "stream_sessions_user_id_idx" ON "stream_sessions" ("user_id");
CREATE INDEX IF NOT EXISTS "stream_sessions_schedule_id_idx" ON "stream_sessions" ("schedule_id");
