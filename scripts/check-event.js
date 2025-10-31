// Quick script to check event data
// Run with: node scripts/check-event.js

const eventId = 'b169451e-c315-4ec5-be41-db3a81c6fac8';

console.log(`
To check the event data in Supabase:

1. Go to: https://awlyscgniciwzqcxnkrq.supabase.co/project/awlyscgniciwzqcxnkrq/editor
2. Run this SQL query:

SELECT * FROM events WHERE id = '${eventId}';

3. Check if the 'content_url' field contains a valid URL to a markdown file.

Expected format: 
https://awlyscgniciwzqcxnkrq.supabase.co/storage/v1/object/public/markdown-content/events/filename.md

If the content_url is missing or invalid, you'll need to either:
- Create a new event through the admin dashboard
- Or manually create a markdown file in storage and update the event record
`);
