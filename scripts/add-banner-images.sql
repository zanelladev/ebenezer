-- Add banner_url column to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS banner_url TEXT;

-- Add banner_url column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS banner_url TEXT;

-- Update RLS policies remain the same (existing policies already cover all columns)
