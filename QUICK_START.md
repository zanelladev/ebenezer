# 🚀 Quick Start Guide

## 1. Install Dependencies (Already Done ✅)
```bash
npm install
```

## 2. Set Up Supabase

### A. Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in project details
4. Wait for project to be ready

### B. Run Database Setup
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase-setup.sql`
3. Paste and run it
4. This creates:
   - `events` table
   - `posts` table
   - Row Level Security policies
   - Sample data (optional)

### C. Create Admin User
1. Go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter:
   - Email: `admin@ebenezer.church` (or your preferred email)
   - Password: Create a strong password
4. Click **Create user**

### D. Get API Credentials
1. Go to **Project Settings** > **API**
2. Copy:
   - `Project URL`
   - `anon` `public` key

## 3. Configure Environment

Edit `.env.local` and replace with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

## 5. Test the Application

### Public Site
- ✅ Home page
- ✅ About page
- ✅ Events page (will be empty until you add events)
- ✅ Blog page (will be empty until you add posts)
- ✅ Donate page

### Admin Dashboard
1. Go to http://localhost:3000/login
2. Sign in with the admin credentials you created
3. You'll be redirected to `/admin`
4. Click **Events** or **Blog Posts** in the sidebar
5. Click **Create Event** or **Create Post**
6. Fill in the form using Markdown for content
7. Click **Save**

## 6. Customize

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { /* change these */ },
  warm: { /* change these */ }
}
```

### Update Content
- Edit text in `src/app/about/page.tsx`
- Edit text in `src/app/donate/page.tsx`
- Update church name in `src/components/Navbar.tsx`
- Update footer in `src/components/Footer.tsx`

### Add Images
You can:
1. Use Supabase Storage for images
2. Use external image URLs
3. Add images to `/public` folder

## 7. Deploy to Production

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click **New Project**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### After Deployment
1. Go to Supabase **Authentication** > **URL Configuration**
2. Add your Vercel URL to:
   - Site URL
   - Redirect URLs

## 🎉 You're Done!

Your church website is now live!

## Need Help?

- Check `README.md` for full documentation
- Check `PROJECT_COMPLETE.md` for what was built
- Review Supabase docs: https://supabase.com/docs
- Review Next.js docs: https://nextjs.org/docs
