-- Supabase Database Setup for Ebenezer Church Website
-- Run this in your Supabase SQL Editor

-- Create events table
create table events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  date timestamp with time zone not null,
  location text not null,
  content_url text not null
);

-- Create posts table
create table posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  author_name text not null,
  content_url text not null
);

-- Enable Row Level Security
alter table events enable row level security;
alter table posts enable row level security;

-- Create policies for public read access
create policy "Events are viewable by everyone"
  on events for select
  using (true);

create policy "Posts are viewable by everyone"
  on posts for select
  using (true);

-- Create policies for authenticated users (admins)
create policy "Authenticated users can insert events"
  on events for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update events"
  on events for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete events"
  on events for delete
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert posts"
  on posts for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update posts"
  on posts for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete posts"
  on posts for delete
  using (auth.role() = 'authenticated');

-- Create storage bucket for markdown files
insert into storage.buckets (id, name, public)
values ('markdown-content', 'markdown-content', true);

-- Storage policies for markdown files
create policy "Markdown files are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'markdown-content');

create policy "Authenticated users can upload markdown files"
  on storage.objects for insert
  with check (
    bucket_id = 'markdown-content' 
    and auth.role() = 'authenticated'
  );

create policy "Authenticated users can update markdown files"
  on storage.objects for update
  using (
    bucket_id = 'markdown-content' 
    and auth.role() = 'authenticated'
  );

create policy "Authenticated users can delete markdown files"
  on storage.objects for delete
  using (
    bucket_id = 'markdown-content' 
    and auth.role() = 'authenticated'
  );

-- Optional: Insert sample data
-- Note: Sample data is commented out because it requires actual markdown files in storage
-- Create events and posts through the admin dashboard instead

-- Sample Event (commented out - create through admin dashboard)
-- insert into events (name, date, location, content_url) values
-- (
--   'Culto de Domingo',
--   '2025-11-07T10:00:00',
--   'Salão Principal - Comunidade Ebenézer',
--   'https://awlyscgniciwzqcxnkrq.supabase.co/storage/v1/object/public/markdown-content/events/sample-event.md'
-- );

-- Sample Blog Post (commented out - create through admin dashboard)
-- insert into posts (name, author_name, content_url) values
-- (
--   'Encontrando Paz em Tempos Turbulentos',
--   'Pastor João Silva',
--   'https://awlyscgniciwzqcxnkrq.supabase.co/storage/v1/object/public/markdown-content/posts/sample-post.md'
-- );
