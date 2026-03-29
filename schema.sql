-- =============================================================
-- Run this once in your Vercel Postgres dashboard (or psql)
-- to create all required tables.
-- =============================================================

-- Contact messages (you may already have this)
CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT DEFAULT '',
  message     TEXT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume download tracking
CREATE TABLE IF NOT EXISTS resume_downloads (
  id          SERIAL PRIMARY KEY,
  ip          TEXT,
  user_agent  TEXT,
  referrer    TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: page views (for future use)
CREATE TABLE IF NOT EXISTS page_views (
  id          SERIAL PRIMARY KEY,
  ip          TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster dashboard queries
CREATE INDEX IF NOT EXISTS idx_downloads_created  ON resume_downloads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_created   ON contact_messages (created_at DESC);
