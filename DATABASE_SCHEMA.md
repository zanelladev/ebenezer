# Database Schema - Ebenezer Church Website

## Overview
The database uses **Supabase** with two main tables: `events` and `posts`. Markdown content is stored in **Supabase Storage** and referenced via URLs in the database.

## Tables

### Events Table
Stores church events and gatherings.

| Column       | Type      | Required | Description                          |
|--------------|-----------|----------|--------------------------------------|
| id           | uuid      | Yes      | Primary key (auto-generated)         |
| created_at   | timestamp | Yes      | Auto-generated creation timestamp    |
| name         | text      | Yes      | Event name/title                     |
| date         | timestamp | Yes      | Event date and time                  |
| location     | text      | Yes      | Event location/address               |
| content_url  | text      | Yes      | URL to markdown file in storage      |

**Example:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2025-10-31T10:00:00Z",
  "name": "Sunday Worship Service",
  "date": "2025-11-07T10:00:00Z",
  "location": "Main Sanctuary, 123 Church St",
  "content_url": "https://[project].supabase.co/storage/v1/object/public/markdown-content/events/sunday-worship-123456.md"
}
```

### Posts Table
Stores blog posts and articles.

| Column       | Type      | Required | Description                          |
|--------------|-----------|----------|--------------------------------------|
| id           | uuid      | Yes      | Primary key (auto-generated)         |
| created_at   | timestamp | Yes      | Auto-generated creation timestamp    |
| name         | text      | Yes      | Post title                           |
| author_name  | text      | Yes      | Author's name                        |
| content_url  | text      | Yes      | URL to markdown file in storage      |

**Example:**
```json
{
  "id": "987fcdeb-51a2-43f7-9abc-def012345678",
  "created_at": "2025-10-31T15:30:00Z",
  "name": "Finding Peace in Turbulent Times",
  "author_name": "Pastor John Smith",
  "content_url": "https://[project].supabase.co/storage/v1/object/public/markdown-content/posts/finding-peace-123456.md"
}
```

## Storage Structure

### Bucket: `markdown-content`
- **Public**: Yes
- **Folder structure**:
  ```
  markdown-content/
  ├── events/
  │   ├── event-name-1234567890.md
  │   └── another-event-9876543210.md
  └── posts/
      ├── post-title-1234567890.md
      └── another-post-9876543210.md
  ```

### File Naming Convention
Files are named using: `{slug}-{timestamp}.md`
- **slug**: URL-safe version of the title (lowercase, no special chars)
- **timestamp**: Unix timestamp for uniqueness

Example: `sunday-worship-service-1730372400000.md`

## Row Level Security (RLS)

### Events Table Policies
- **Public read**: Everyone can view events
- **Authenticated insert**: Only authenticated users can create events
- **Authenticated update**: Only authenticated users can edit events
- **Authenticated delete**: Only authenticated users can delete events

### Posts Table Policies
- **Public read**: Everyone can view posts
- **Authenticated insert**: Only authenticated users can create posts
- **Authenticated update**: Only authenticated users can edit posts
- **Authenticated delete**: Only authenticated users can delete posts

### Storage Policies
- **Public read**: Everyone can view markdown files
- **Authenticated upload**: Only authenticated users can upload files
- **Authenticated update**: Only authenticated users can update files
- **Authenticated delete**: Only authenticated users can delete files

## Setup Instructions

1. **Run SQL Setup**:
   Execute the SQL commands in `supabase-setup.sql` in your Supabase SQL Editor.

2. **Configure Environment**:
   Ensure your `.env.local` file has:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Storage Bucket**:
   The SQL script automatically creates the `markdown-content` bucket.

## TypeScript Types

The database types are defined in `src/lib/supabase/types.ts`:

```typescript
interface Event {
  id: string;
  created_at: string;
  name: string;
  date: string;
  location: string;
  content_url: string;
}

interface Post {
  id: string;
  created_at: string;
  name: string;
  author_name: string;
  content_url: string;
}
```

## Storage Utilities

Helper functions in `src/lib/storage.ts`:

- **`uploadMarkdownFile(content, type, filename)`**: Upload markdown to storage
- **`fetchMarkdownContent(url)`**: Fetch markdown content from URL
- **`deleteMarkdownFile(url)`**: Delete markdown file from storage
- **`generateFilename(title)`**: Generate unique filename from title

## Usage Examples

### Creating an Event
```typescript
// 1. Upload markdown content
const { url } = await uploadMarkdownFile(
  markdownContent,
  'events',
  generateFilename(eventName)
);

// 2. Insert event record
const { data, error } = await supabase
  .from('events')
  .insert({
    name: 'Sunday Worship',
    date: '2025-11-07T10:00:00Z',
    location: 'Main Sanctuary',
    content_url: url,
  });
```

### Fetching an Event with Content
```typescript
// 1. Get event from database
const { data: event } = await supabase
  .from('events')
  .select('*')
  .eq('id', eventId)
  .single();

// 2. Fetch markdown content
const { content } = await fetchMarkdownContent(event.content_url);
```

### Deleting an Event
```typescript
// 1. Delete from database
await supabase.from('events').delete().eq('id', eventId);

// 2. Delete markdown file
await deleteMarkdownFile(event.content_url);
```

## Migration from Old Schema

If migrating from a schema with `short_description`, `excerpt`, or `image_url` fields:

1. The simplified schema removes these fields
2. All descriptive content should be in the markdown file
3. Images can be embedded in markdown using standard syntax:
   ```markdown
   ![Alt text](https://your-image-url.com/image.jpg)
   ```

## Benefits of This Approach

1. **Separation of Concerns**: Metadata in database, content in storage
2. **Scalability**: Large markdown files don't bloat database
3. **Flexibility**: Easy to edit markdown without database migrations
4. **Version Control**: Markdown files can be versioned independently
5. **Cost Efficiency**: Storage is cheaper than database space
6. **Better Performance**: Smaller database records, faster queries
