# Consultora Software - Premium Consultancy Website

A production-ready, bilingual (EN/ES) website for a premium software consultancy specializing in data platforms, automation, and AI solutions.

## 🚀 Tech Stack

- **Next.js 16.1.6 LTS** - Latest stable with Turbopack
- **React 19.2** - Included with Next.js 16
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling with @theme inline
- **shadcn/ui** - Premium Radix UI components
- **next-intl** - Internationalization (EN/ES)
- **Lucide React** - Beautiful icons

## ✨ Features

- ✅ **22 fully translated pages** (11 pages × 2 locales)
- ✅ **Complete bilingual support** (English/Spanish)
- ✅ **SEO optimized** (metadata, sitemaps, JSON-LD schemas)
- ✅ **Productized pricing** (3 packages prominently featured)
- ✅ **6 service detail pages** with challenges/deliverables/outcomes
- ✅ **Premium responsive design** (mobile-first)
- ✅ **Performance optimized** (Turbopack, static generation)

## 📦 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## ✏️ Customization Guide

### Edit Content

All website content is in translation files:

- **English**: `src/messages/en.json`
- **Spanish**: `src/messages/es.json`

Simply edit the JSON files to update text across the entire site.

### Update Branding

**Colors** (in `src/app/globals.css`):

```css
:root {
  --primary: 220 90% 56%;        /* Navy blue */
  --accent: 280 85% 60%;         /* Purple */
}
```

**Logo**: Replace the gradient in `src/components/layout/Header.tsx` with your logo.

### Add Images

Place images in `public/images/`:
- `services/` - Service icons
- `case-studies/` - Case study thumbnails
- `logos/` - Client/tech logos

## 🌐 Pages Overview

### Main Pages (EN + ES)
- **Home** - Hero, services, pricing, testimonials, FAQ
- **Services** - Overview of all 6 services
- **About** - Company values and mission
- **Case Studies** - 2 success stories
- **Contact** - Contact form + Calendly

### Service Detail Pages
1. Data Platforms & BI
2. Process Automation
3. Applied AI
4. ML Forecasting
5. Software Selection
6. Managed Services

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

## 📈 Performance

- **Turbopack**: Up to 76% faster builds
- **Static Generation**: All pages pre-rendered
- **Image Optimization**: Automatic with next/image
- **Code Splitting**: Automatic

---

Built with Next.js 16, React 19, and Tailwind CSS v4
