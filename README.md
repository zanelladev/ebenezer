# Ebenezer Church Website

A modern, full-stack institutional website for a church community, built with Next.js 15, TypeScript, TailwindCSS, and Supabase.

## ✨ Features

### Public Pages
- **Home**: Welcoming hero section, about preview, upcoming events, and latest blog posts
- **About Us**: Church story, mission, and values
- **Events**: List of all events (upcoming and past) with individual event pages
- **Blog**: Article listing with individual blog post pages
- **Donate**: Information page encouraging donations (no payment integration)

### Admin Dashboard
- **Authentication**: Secure login with Supabase Auth
- **Event Management**: Create, edit, and delete events with Markdown support
- **Blog Management**: Create, edit, and delete blog posts with Markdown support
- **WYSIWYG Editor**: Rich text editing with live Markdown preview

### Technical Features
- ⚡ **Next.js 15** with App Router and Server Components
- 🔐 **Supabase** for database and authentication
- 🎨 **TailwindCSS** for beautiful, responsive styling
- ✨ **Framer Motion** for smooth animations
- 📝 **Markdown** support for content (React Markdown + MD Editor)
- 🎯 **TypeScript** for type safety
- 📱 **Fully Responsive** design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### 1. Clone and Install

\`\`\`bash
cd ebenezer
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run these commands to create your tables:

\`\`\`sql
-- Create events table
create table events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  date text not null,
  short_description text not null,
  content text not null,
  image_url text
);

-- Create posts table
create table posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  excerpt text not null,
  content text not null,
  author text not null,
  image_url text
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
\`\`\`

3. Create an admin user:
   - Go to **Authentication** > **Users**
   - Click **Add user** > **Create new user**
   - Add email and password for your admin account

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Then edit `.env.local` and add your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

You can find these in your Supabase project settings under **API**.

### 4. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your website!

## 📖 Usage

### Public Access
- Visit the home page to see the website
- Navigate through About, Events, Blog, and Donate pages
- Click on individual events or blog posts to see full content

### Admin Access
1. Go to `/login`
2. Sign in with the admin credentials you created in Supabase
3. You'll be redirected to `/admin`
4. Use the sidebar to manage Events or Blog Posts
5. Click **Create** to add new content
6. Click **Edit** or **Delete** on existing items

### Content Management
- All content uses **Markdown** for formatting
- The admin editor provides a WYSIWYG interface
- Content is stored in Supabase and rendered on the public pages
- Images can be added via URL (consider using Supabase Storage for uploads)

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- `primary`: Main brand color (currently blue)
- `warm`: Secondary warm tones (beige/cream)

### Fonts
Fonts are configured in `src/app/layout.tsx`:
- Body: Inter
- Headings: Crimson Text

### Content
- Update church name and details in components
- Modify copy in About and Donate pages
- Add your own images and branding

## 📁 Project Structure

\`\`\`
ebenezer/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── about/           # About page
│   │   ├── admin/           # Admin dashboard
│   │   ├── blog/            # Blog listing and posts
│   │   ├── donate/          # Donation page
│   │   ├── events/          # Events listing and details
│   │   ├── login/           # Login page
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── home/            # Home page components
│   │   ├── BlogCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── lib/
│       └── supabase/        # Supabase client setup
├── public/                   # Static assets
└── package.json
\`\`\`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

### Update Supabase Settings
After deployment, add your production URL to Supabase:
- Go to **Authentication** > **URL Configuration**
- Add your Vercel URL to **Site URL** and **Redirect URLs**

## 🔒 Security Notes

- Admin access is protected by Supabase Authentication
- Row Level Security (RLS) is enabled on database tables
- Environment variables keep credentials secure
- Never commit `.env.local` to version control

## 📝 License

This project is open source and available for use by church communities.

## 🙏 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ for church communities
