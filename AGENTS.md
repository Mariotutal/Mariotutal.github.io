# AGENTS.md — OpenCode Instructions for this repo

## What to read first (in order)
1. `ARCHITECTURE.md` — complete component map, data flow, R3F patterns
2. `package.json` — scripts and deps
3. `tsconfig.json` — path alias `@/* → ./src/*`, strict mode
4. `eslint.config.mjs` — extends `next/core/web-vitals`, `next/typescript`

## Dev commands
```bash
npm run dev        # Next.js dev server (Turbopack)
npm run build      # Production build
npm start          # Serve production output
npm run lint       # ESLint via Next.js wrapper
```

No test framework is configured. There are no lint or typecheck hooks on commit.

## Architecture shortcuts
- **Single page, zero routing.** Entry: `src/app/page.tsx` → `<Scene />` + `<Overlay />`.
- **Feature dirs:** `TIN/`, `carousel/`, `overlay/` (each has a barrel `index.ts`).
- **State pattern:** local `useState` in `Scene`, callback props downward. No global store.
- **Style rule:** CSS Modules only (`*.module.css`) + one `globals.css`. No inline styles beyond initial geometry setup.
- **All R3F components** are `'use client'`.

## Gotchas / constraints
- Resolution changes force a full TIN re-mount via the `key` prop — not a diff.
- Animation loop uses direct `BufferGeometry` manipulation in `useFrame` (bypasses React re-renders).
- No environment variables (`*.env*` is gitignored); data is hardcoded in `constants/cvData.ts`.
- Build output: `next-env.d.ts` and `.tsbuildinfo` are in `.gitignore`. Do not edit them manually.
