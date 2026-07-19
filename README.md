# SneakPeek

SneakPeek is a cinematic sneaker showcase built in Next.js. It presents a small curated collection as interactive product boxes, then expands each pair into a detailed storytelling view with motion, adaptive backgrounds, notes, photos, and styling inspiration.

## What It Includes

- Animated collection view with clickable shoebox cards
- Open-box detail view with reveal motion and previous / next navigation
- Brand-only header treatment and custom favicon
- Adaptive notes card, centered spec grid, and hover tooltips
- Real photo carousel and styling inspiration collage
- Mobile-friendly layout with reduced-motion support

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Three Fiber, Drei, and Three.js
- Lenis smooth scrolling
- React Icons

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Key Files

- [app/page.tsx](app/page.tsx): homepage entry point
- [app/layout.tsx](app/layout.tsx): global metadata, fonts, and layout shell
- [app/components/SneakPeekExperience.tsx](app/components/SneakPeekExperience.tsx): main UI, collection view, and detail view
- [app/data/shoes.ts](app/data/shoes.ts): sneaker data and visual metadata
- [app/icon.png](app/icon.png): browser tab icon

## Notes

The content is data-driven, so updating [app/data/shoes.ts](app/data/shoes.ts) changes the shoes shown in the experience.
