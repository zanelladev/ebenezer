-- Clean up script for Ebenezer Church Database
-- Run this in Supabase SQL Editor to remove sample/invalid data

-- Delete all events with placeholder URLs
DELETE FROM events 
WHERE content_url LIKE '%your-project.supabase.co%';

-- Delete all posts with placeholder URLs
DELETE FROM posts 
WHERE content_url LIKE '%your-project.supabase.co%';

-- Optional: Delete ALL existing events and posts to start fresh
-- Uncomment the lines below if you want to remove everything

-- DELETE FROM events;
-- DELETE FROM posts;

-- Verify what's left
SELECT 'Events' as table_name, COUNT(*) as count FROM events
UNION ALL
SELECT 'Posts' as table_name, COUNT(*) as count FROM posts;
