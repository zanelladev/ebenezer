# 🚀 Quick Fix Guide - Get Your Site Working Now!

## The Problem
Your event shows "Failed to load event content" because it has a placeholder URL instead of a real one.

## 3-Step Solution

### Step 1: Clean Up Database (1 minute)

1. Open Supabase SQL Editor: https://awlyscgniciwzqcxnkrq.supabase.co/project/awlyscgniciwzqcxnkrq/editor

2. Copy and paste this SQL command:
   ```sql
   DELETE FROM events 
   WHERE content_url LIKE '%your-project.supabase.co%';
   
   DELETE FROM posts 
   WHERE content_url LIKE '%your-project.supabase.co%';
   ```

3. Click "Run" to delete the placeholder data

### Step 2: Verify Database Schema (Optional)

If you haven't run the setup script yet, run this in SQL Editor:

```sql
-- Check if tables exist with correct schema
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events';
```

You should see:
- `id` (uuid)
- `created_at` (timestamp)
- `name` (text)
- `date` (timestamp)
- `location` (text)
- `content_url` (text)

If the columns are different, run the full `supabase-setup.sql` script.

### Step 3: Create Your First Event (2 minutes)

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3000/login

3. Log in with your Supabase credentials

4. Navigate to: http://localhost:3000/admin/events

5. Click "+ Create Event"

6. Fill in the form:
   - **Name**: "Culto de Domingo"
   - **Date**: Select a future date
   - **Location**: "Salão Principal - Rua Exemplo, 123"
   - **Content**: Write some markdown, for example:
     ```markdown
     # Bem-vindo ao Culto de Domingo!
     
     Junte-se a nós para um momento de louvor e adoração.
     
     ## Programação
     - 10:00 - Louvor
     - 10:30 - Mensagem
     - 11:00 - Oração
     
     Todos são bem-vindos!
     ```

7. Click "Save Event"

8. Visit: http://localhost:3000/events

9. Click on your new event - it should display perfectly! ✨

## What Just Happened?

When you created the event through the admin panel:
1. ✅ The markdown content was uploaded to Supabase Storage
2. ✅ A unique filename was generated (e.g., `culto-de-domingo-1730372400.md`)
3. ✅ The storage URL was saved to the database
4. ✅ The event page can now fetch and display the content

## Troubleshooting

### "Storage bucket not found"
Run the setup script:
```sql
-- In Supabase SQL Editor, paste the entire contents of supabase-setup.sql
```

### "Authentication required"
1. Make sure you're logged in at `/login`
2. Check that your `.env.local` has the correct credentials

### Still seeing errors?
1. Check the Migration Check tool: http://localhost:3000/admin/migrate
2. Click "Check Database" to see detailed status
3. Follow the on-screen instructions

## Next Steps

Once your first event works:
- ✅ Create more events
- ✅ Create blog posts
- ✅ Delete the old placeholder data
- ✅ Test the public-facing pages

## Summary

The key point: **Always create events and posts through the admin dashboard**, not by manually inserting SQL. The admin dashboard handles:
- Uploading markdown to storage
- Generating unique filenames
- Creating proper content URLs
- Saving everything to the database

Happy content creating! 🎉
