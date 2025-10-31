# Troubleshooting Guide - Ebenezer Church Website

## Issue: "Failed to load event content"

### Problem
When viewing an event detail page, you see the error: "Failed to load event content"

### Cause
This happens when an event was created **before** the database schema was updated to use Supabase Storage. Old events have their content stored directly in the database (in a `content` field), but the new system expects a `content_url` field pointing to a markdown file in storage.

### Solution

#### Option 1: Use the Migration Check Tool (Recommended)
1. Log in to the admin dashboard
2. Go to **🔧 Migration Check** in the sidebar
3. Click "Check Database" to see which events need updating
4. Follow the on-screen instructions

#### Option 2: Manual Fix

**Step 1: Delete the Old Event**
1. Go to Admin → Events
2. Find and delete the problematic event

**Step 2: Create a New Event**
1. Click "+ Create Event"
2. Fill in the event details:
   - **Name**: Event title
   - **Date**: Event date and time
   - **Location**: Event address
   - **Content**: Event description in Markdown
3. Click "Save Event"

The new event will automatically:
- Upload the markdown content to Supabase Storage
- Store the storage URL in the `content_url` field
- Display correctly on the event detail page

### Verification Steps

1. After creating the new event, visit the events page
2. Click on the event card
3. You should see the full event content without errors

## Issue: Storage Bucket Not Found

### Problem
Getting errors about "markdown-content bucket not found"

### Solution
Run the SQL setup script in Supabase:

1. Open your Supabase Dashboard: https://awlyscgniciwzqcxnkrq.supabase.co
2. Go to SQL Editor
3. Copy the contents of `supabase-setup.sql`
4. Paste and execute the SQL

This will create:
- The `events` and `posts` tables with the new schema
- The `markdown-content` storage bucket
- All necessary security policies

## Issue: Cannot Upload Markdown Files

### Problem
When creating events/posts, markdown content doesn't save

### Possible Causes & Solutions

**1. Storage Policies Not Set**
- Run the SQL setup script to create storage policies
- Ensure you're logged in as an authenticated user

**2. Bucket Doesn't Exist**
- Check Supabase Dashboard → Storage
- Verify "markdown-content" bucket exists
- If not, run the SQL setup script

**3. Network/CORS Issues**
- Check browser console for errors
- Verify `.env.local` has correct Supabase credentials
- Check Supabase project status

## Database Schema Reference

### Current Schema (Storage-Based)

**Events:**
```sql
CREATE TABLE events (
  id uuid PRIMARY KEY,
  created_at timestamp,
  name text NOT NULL,
  date timestamp NOT NULL,
  location text NOT NULL,
  content_url text NOT NULL  -- URL to markdown file
);
```

**Posts:**
```sql
CREATE TABLE posts (
  id uuid PRIMARY KEY,
  created_at timestamp,
  name text NOT NULL,
  author_name text NOT NULL,
  content_url text NOT NULL  -- URL to markdown file
);
```

### Old Schema (Database-Stored Content)

If you see these fields in your database, you need to migrate:
- `title` (should be `name`)
- `content` (should be `content_url`)
- `short_description` (removed)
- `excerpt` (removed)
- `image_url` (removed)
- `author` (should be `author_name`)

## Quick Fixes Checklist

- [ ] Run SQL setup script in Supabase
- [ ] Verify storage bucket exists
- [ ] Check `.env.local` has correct credentials
- [ ] Delete old events/posts
- [ ] Create new events/posts through admin dashboard
- [ ] Test event detail pages
- [ ] Test blog post detail pages

## Getting Help

If issues persist:

1. Check browser console for errors
2. Check Supabase Dashboard → Logs
3. Verify all files have latest code from schema update
4. Restart the development server: `npm run dev`

## Useful Commands

```bash
# Restart dev server
npm run dev

# Build to check for errors
npm run build

# Check TypeScript errors
npx tsc --noEmit
```

## Storage URL Format

Correct markdown file URLs should look like:
```
https://awlyscgniciwzqcxnkrq.supabase.co/storage/v1/object/public/markdown-content/events/event-name-1234567890.md
```

If your `content_url` doesn't match this pattern, the event needs to be recreated.
