# 📊 Supabase Database Schema

## Tables

### `events`
Stores church events and gatherings.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | uuid | NOT NULL | Primary key (auto-generated) |
| `created_at` | timestamp | NOT NULL | Creation timestamp (auto-generated) |
| `title` | text | NOT NULL | Event title |
| `date` | text | NOT NULL | Event date/time (ISO format) |
| `short_description` | text | NOT NULL | Brief description for cards |
| `content` | text | NOT NULL | Full event details (Markdown) |
| `image_url` | text | NULL | Optional image URL |

**Indexes:**
- Primary key on `id`

**RLS Policies:**
- `Events are viewable by everyone` - Public read access
- `Authenticated users can insert events` - Admin create
- `Authenticated users can update events` - Admin edit
- `Authenticated users can delete events` - Admin delete

---

### `posts`
Stores blog posts and articles.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | uuid | NOT NULL | Primary key (auto-generated) |
| `created_at` | timestamp | NOT NULL | Creation timestamp (auto-generated) |
| `title` | text | NOT NULL | Post title |
| `excerpt` | text | NOT NULL | Short summary for cards |
| `content` | text | NOT NULL | Full post content (Markdown) |
| `author` | text | NOT NULL | Author name |
| `image_url` | text | NULL | Optional featured image URL |

**Indexes:**
- Primary key on `id`

**RLS Policies:**
- `Posts are viewable by everyone` - Public read access
- `Authenticated users can insert posts` - Admin create
- `Authenticated users can update posts` - Admin edit
- `Authenticated users can delete posts` - Admin delete

---

## Row Level Security (RLS)

Both tables have RLS enabled with the following access patterns:

**Public Access (Everyone):**
- ✅ SELECT (read) - Anyone can view events and posts

**Admin Access (Authenticated Users):**
- ✅ INSERT - Create new items
- ✅ UPDATE - Edit existing items
- ✅ DELETE - Remove items

This ensures:
- The public website can display content
- Only logged-in admins can modify content
- No unauthorized changes can be made

---

## Authentication

Uses Supabase Auth with email/password:

- Admin users are created in **Authentication** > **Users**
- `auth.role() = 'authenticated'` policy checks login status
- JWT tokens manage sessions
- Middleware protects `/admin` routes

---

## Sample Data

The setup script includes optional sample data:

**Sample Event:**
- Sunday Worship Service
- Date: November 7, 2025
- Full Markdown content
- Sample image from Unsplash

**Sample Blog Post:**
- "Finding Peace in Turbulent Times"
- Author: Pastor John Smith
- Full Markdown article
- Sample image from Unsplash

---

## Adding More Fields

To extend the schema, you can add fields like:

### For Events:
```sql
ALTER TABLE events ADD COLUMN location text;
ALTER TABLE events ADD COLUMN duration integer;
ALTER TABLE events ADD COLUMN capacity integer;
ALTER TABLE events ADD COLUMN registration_required boolean;
```

### For Posts:
```sql
ALTER TABLE posts ADD COLUMN category text;
ALTER TABLE posts ADD COLUMN tags text[];
ALTER TABLE posts ADD COLUMN featured boolean;
ALTER TABLE posts ADD COLUMN published boolean;
```

---

## Querying Examples

### Get Upcoming Events
```sql
SELECT * FROM events 
WHERE date >= NOW()
ORDER BY date ASC;
```

### Get Recent Posts
```sql
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 10;
```

### Search Events by Title
```sql
SELECT * FROM events 
WHERE title ILIKE '%worship%';
```

---

## Backup & Migration

### Export Data
```sql
COPY events TO '/path/to/events.csv' CSV HEADER;
COPY posts TO '/path/to/posts.csv' CSV HEADER;
```

### Import Data
```sql
COPY events FROM '/path/to/events.csv' CSV HEADER;
COPY posts FROM '/path/to/posts.csv' CSV HEADER;
```

---

## Monitoring

Check table usage in Supabase:
1. Go to **Table Editor**
2. Select `events` or `posts`
3. View row count and recent changes

For analytics:
1. Go to **Reports**
2. View API usage
3. Monitor authentication attempts

---

**Schema Version:** 1.0  
**Last Updated:** October 2025
