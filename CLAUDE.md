# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and Shadcn UI (new-york style). Single-page application with smooth scrolling navigation between sections.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

### App Structure (Next.js App Router)
- `app/page.tsx` - Main single-page layout composing all section components
- `app/layout.tsx` - Root layout with ThemeProvider, GridOverlay, GeometricShapes, and Vercel Analytics
- `app/api/github/contributions/route.ts` - GitHub GraphQL API endpoint for contribution graph data (requires GITHUB_TOKEN env var)

### Components
- `components/ui/` - Shadcn UI components (Button, Card, Input, etc.)
- `components/*.tsx` - Section components: HeroSection, AboutSection, ProjectsSection, SkillsSection, GitHubSection, CertificatesSection, ContactCard, Footer
- `components/navigation.tsx` - Fixed navigation with scroll-based section highlighting and theme toggle with view-transition animation
- `components/smart-cursor.tsx` - Custom cursor component with interactive states
- `components/geometric-*.tsx` - Decorative background elements (shapes, accents)
- `components/theme-provider.tsx` - next-themes wrapper for dark/light mode

### Utilities
- `lib/utils.ts` - Contains `cn()` helper (clsx + tailwind-merge)
- `hooks/use-section-reveal.tsx` - Section visibility animation hook

### Styling
- Tailwind CSS 4 with `@tailwindcss/postcss`
- CSS variables for theming in `app/globals.css` using OKLCH color space
- `tw-animate-css` for animations
- Dark mode is default, toggle via navigation

## Key Patterns

- Path alias: `@/*` maps to project root
- Shadcn components use CVA (class-variance-authority) for variants
- Section IDs match nav items: hero, about, projects, skills, github, certificates, contact
- Components use `"use client"` directive for client-side interactivity
- Theme toggle uses View Transition API with circular clip-path animation

## Environment Variables

- `GITHUB_TOKEN` - GitHub Personal Access Token with `read:user` scope for contributions graph
