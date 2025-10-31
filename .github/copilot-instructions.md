<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Ebenezer Church Website - Development Guidelines

## Project Overview
This is a Next.js 15 institutional website for a church community with:
- Public-facing pages (Home, About, Events, Blog, Donate)
- Admin dashboard with Supabase authentication
- Full CRUD operations for events and blog posts
- Markdown content management

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database & Auth**: Supabase
- **Animations**: Framer Motion
- **Markdown**: React Markdown & @uiw/react-md-editor

## Code Style Guidelines
1. Use functional components with TypeScript
2. Prefer server components unless client interactivity is needed
3. Use `'use client'` directive only when necessary
4. Follow Next.js 15 conventions for async components and params
5. Use Tailwind utility classes for styling
6. Implement proper error handling and loading states

## Component Patterns
- Server components for data fetching (events, blog posts)
- Client components for interactive UI (forms, editors, animations)
- Reusable components in `/components` directory
- Admin-specific components in `/components/admin`

## Supabase Integration
- Use `createClient()` from `@/lib/supabase/server` for server components
- Use `createClient()` from `@/lib/supabase/client` for client components
- Always handle auth state properly
- Use TypeScript types from `@/lib/supabase/types`

## Design System
- Primary color: Blue shades (primary-*)
- Secondary: Warm tones (warm-*)
- Font: Inter for body, Crimson Text for headings
- Spacing: Consistent padding/margin using Tailwind
- Responsive: Mobile-first approach

## Best Practices
- Keep components focused and single-purpose
- Use semantic HTML
- Ensure accessibility (ARIA labels, alt text)
- Optimize images and assets
- Handle edge cases (empty states, errors)
- Write meaningful commit messages
