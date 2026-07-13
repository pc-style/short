# Project Identity: short (s.pcstyle.dev)

This project follows the **pcstyle** high-performance stack and aesthetic.

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Convex (Real-time reactive database)
- **Styling**: Tailwind CSS v4 (CSS-first)
- **Runtime**: Bun
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🎨 Design System: pcstyle.dev
Matches the home site (pcstyle.dev): quiet, narrow single-column mono layout.
- **Colors**: background #0a0a0b, text #e8e6e3, muted #8a8781, faint #55524d, hairline #26262a, accent #e04fb0, accent-dim #8c1862
- **Typography**: JetBrains Mono everywhere, lowercase copy, no letter-spacing tricks
- **Motifs**: `~/pcstyle` wordmark, `→` eyebrow prompts, `##` section labels with hairline rules, pink-bordered tag pills, magenta→pink gradient CTA
- **No**: CRT overlays, matrix backgrounds, custom cursors, neon glow, uppercase tracking

## 📁 File Structure
```
short/
├── app/
│   ├── [shortCode]/
│   │   ├── page.tsx         # Redirect handler
│   │   └── not-found.tsx    # 404 for invalid links
│   ├── globals.css          # pcstyle.dev theme tokens
│   ├── layout.tsx           # Root layout with Convex
│   └── page.tsx             # Main shortener page
├── components/
│   ├── ConvexClientProvider.tsx
│   └── LinkShortener.tsx    # Main component
└── convex/
    ├── schema.ts            # Database schema
    └── links.ts             # Mutations & queries
```

## 🔧 Configuration Required

1. Initialize Convex:
```bash
bunx convex dev
```

2. Add environment variables to `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

## 🌐 Domain Setup
Configure `s.pcstyle.dev` to point to your Vercel deployment.

## 🚀 Commands
```bash
bun install          # Install dependencies
bunx convex dev      # Start Convex in dev mode
bun dev              # Start Next.js development server
bun build            # Build for production
```

## 📊 Features
- URL shortening with auto-generated codes
- Custom alias support
- Real-time click tracking
- Recent links display
- Copy-to-clipboard functionality
