# Portfolio Codebase Architecture

## Overview

This is a **Next.js 15 + Three.js** portfolio application that renders an immersive, interactive 3D triangular mesh simulation as the hero section, overlaid with a name card and an experience carousel for displaying career history. The entire app lives on a single page -- there is no routing infrastructure.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 |
| 3D Engine | Three.js + @react-three/fiber + @react-three/drei |
| Carousel | Embla Carousel 8 |
| Language | TypeScript 5 (strict mode) |
| Styling | CSS Modules + global CSS custom properties |
| Linting | ESLint 9 (flat config) |

**No Redux, no RTK, no Zustand.** State management is entirely React hooks.

---

## Project Structure

```
Portfolio/
├── public/                          # Static assets
├── src/
│   ├── app/                        # Next.js App Router root
│   │   ├── layout.tsx              # Root layout (fonts, metadata, globals.css)
│   │   ├── page.tsx                # Entry: <Scene /> + <Overlay />
│   │   └── globals.css             # Dark theme via CSS variables
│   ├── components/
│   │   ├── Scene.tsx               # 3D scene orchestrator (Canvas, camera, lights, TIN)
│   │   ├── TIN/                    # Triangular Irregular Network simulation
│   │   │   ├── TIN.tsx             # Mesh generation + wave propagation engine
│   │   │   ├── TINControls.tsx     # Collapsible control panel (resolution, amplitude, etc.)
│   │   │   └── index.ts            # Barrel export
│   │   ├── carousel/               # Experience carousel feature
│   │   │   ├── EmblaCarousel.tsx   # Carousel wrapper
│   │   │   ├── types.ts            # Shared TS interfaces
│   │   │   ├── hooks/              # useDotButton, usePrevNextButtons
│   │   │   ├── styles/             # Carousel CSS module
│   │   │   ├── ui/                 # CarouselButton, ExperienceCard, CarouselControls
│   │   │   └── index.ts            # Barrel export
│   │   ├── overlay/                # Name card + carousel overlay
│   │   │   ├── Overlay.tsx         # Fixed-position overlay component
│   │   │   └── Overlay.module.css  # Overlay positioning styles
│   │   └── index.ts?               # Barrel exports per feature directory
│   └── constants/
│       └── cvData.ts               # Hardcoded career data (6 entries: employers, roles, tools)
├── package.json
├── tsconfig.json                   # Path alias @/* → ./src/*
├── eslint.config.mjs
└── next.config.ts
```

---

## How It Works

### 1. App Entry (`src/app/page.tsx`)

Renders two stacked components within the full-viewport layout:

```tsx
<Scene />        // 3D canvas (full screen)
<Overlay />      // Fixed content overlay (name + carousel)
```

The root `layout.tsx` loads Geist Sans and Geist Mono fonts from Google and imports global CSS that sets a dark color scheme and disables scrolling.

### 2. Scene Orchestrator (`src/components/Scene.tsx`)

`Scene` is the top-level component that composes everything inside an R3F `<Canvas>`:

- **Camera**: `OrthographicCamera` for a flat, isometric-like view of the mesh.
- **Resize handling**: A `useEffect` listens to window resize events and updates the camera frustum bounds + renderer size dynamically.
- **State**: Holds `TINParameters` (`resolution`, `amplitude`, `speed`, `wireframe`) via `useState`. Passed as props downward.
- **Lighting rig** (passed into `<Canvas>`):
  - Ambient light at 0.4 intensity
  - Directional light with shadows (shadow map: 2048x2048)
  - Green point light (#4CAF50) + blue point light (#2196F3) for accent colors
- **Controls**: `OrbitControls` from three/drei with pan + zoom enabled, camera limits set, screen-space panning.
- **TIN re-mount**: When resolution changes, the `key` prop on `<TIN>` changes, forcing a full remount and geometry regeneration.

### 3. TIN: Triangular Irregular Network (`src/components/TIN/TIN.tsx`)

This is the core visual component. It generates and animates a deformed mesh surface.

#### Mesh Generation (Memoized via `useMemo`)

1. Creates a grid of points based on `resolution` prop, with slight random offsets per vertex to create an "irregular" look.
2. Computes triangle indices to form the mesh topology.
3. Initializes vertex colors and positions as buffers.
4. Creates a `BufferGeometry` from these arrays.

#### Wave Propagation Engine (`calculateWindWave`)

A well-documented 10-step physics formula (lines of inline math in the source):

| Step | Concept | What it does |
|------|---------|-------------|
| 1 | Edge Damping | Reduces displacement near mesh boundaries |
| 2 | Dynamic Wind Direction | Rotating wind vector based on time |
| 3 | Primary Wave Equation | Main sinusoidal wave driven by position + time |
| 4 | Wind Gusts | Secondary burst frequency for irregularity |
| 5 | Turbulence Modeling | Two superposed sine/cosine pairs at high frequency |
| 6 | Pressure Waves | Subtle vertical displacement variation |
| 7-10 | Intensity, Lull, Final Assembly, Edge Damping Reapplication | Modulates overall amplitude over time and distance |

Final formula:
```
displacement = (mainWind + windGust + turbulence + pressure) × intensity × lull × edgeDamping × amplitude
```

#### Animation Loop (`useFrame`)

- Iterates over all vertices each frame (~60fps)
- Calls `calculateWindWave` to compute new Y displacement per vertex
- Uses **direct BufferGeometry manipulation** (`position.setY(i, y)`, `color.setXYZ(i, r, g, b)`) for performance
- Maps color by displacement magnitude (darker valleys → brighter peaks)
- Calls `computeVertexNormals()` each frame so lighting reacts correctly to deformation

### 4. TIN Controls (`src/components/TIN/TINControls.tsx`)

A collapsible floating panel (gear icon in top-right corner) with:

| Control | Range | Effect |
|---------|-------|--------|
| Resolution | 20–100 | Grid density (changes mesh complexity) |
| Amplitude | 0.5–5 | Wave height intensity |
| Speed | 0.1–2 | Animation time multiplier |
| Wireframe toggle | checkbox | Switches between solid and wireframe rendering |
| Axes helper toggle | checkbox | Shows XYZ coordinate axes |
| Reset button | - | Returns all values to defaults |

All controls communicate via **callback props** to `Scene`, which updates state and passes it down.

### 5. Experience Carousel (`src/components/carousel/`)

A horizontal carousel that overlays the 3D scene with career experience cards.

#### Data

`@/constants/cvData.ts` holds an array of 6 career entries, each with:
- `id`, `jobtitle`, `companyname`, `worktype`, `duration`, `location`
- `responsibility` (string[]), `tools` (string[])

Sources include: Wizards of the Coast, 2600Hz/Ooma, Premper, Freelance (Go backend), Saplic, CAE.

#### Components

```
EmblaCarousel.tsx    → Wraps embla-carousel-react (loop + start alignment)
ExperienceCard.tsx   → Renders single entry card with title, company, badges, bullets, tech tags
CarouselButton.tsx   → Reusable button with SVG arrows / dot variants
CarouselControls.tsx → Combines prev/next buttons + dot navigation
```

#### Hooks

| Hook | Purpose |
|------|---------|
| `useDotButton` | Tracks selected dot index, scroll snaps, click-to-scroll behavior. Listens to embla `reInit`/`select` events. |
| `usePrevNextButtons` | Manages button disabled state via `canScrollPrev()` / `canScrollNext()`. |

### 6. Overlay (`src/components/overlay/Overlay.tsx`)

A fixed-position wrapper that combines:
- The user's name/title block
- The Embla carousel mounted below it

Positioned over the 3D canvas to create a layered visual effect.

---

## Architecture Patterns

### State Management

No global store. Everything is **local state + props + callbacks**:

| Pattern | Where used | Why |
|---------|-----------|-----|
| `useState` | Scene (TIN params), TINControls | Local UI state |
| `useCallback` | Control handlers, carousel callbacks | Stable references passed to memoized children |
| `useMemo` | Geometry generation, color arrays | Avoid expensive recomputation on every frame |
| `useFrame` | TIN (R3F) | Animation loop with ref-based mutable access, bypassing React re-renders |
| `useRef` | TIME reference in animation loop, mesh refs | Mutable values without re-render triggers |

### Performance Strategy

1. **Geometry memoization** -- grid points, indices, colors computed once via `useMemo`
2. **Key prop forcing remount** -- resolution changes cause full TIN remount instead of complex geometry diffing
3. **Direct BufferGeometry manipulation** in `useFrame` -- bypasses React render cycle for 60fps updates
4. **React.memo on carousel components** -- prevents re-render when parent state changes
5. **Ref-based mutable access** to Three.js objects (mesh, material) -- avoids closing over stale props

### Styling Strategy

- **CSS Modules** exclusively per component (`component.module.css`)
- **Global CSS** for CSS custom properties (`--background`, `--foreground`) and base reset
- **No CSS-in-JS**, no Tailwind, no inline styles beyond initial geometry setup
- Responsive breakpoints at 768px and 480px with consistent media query usage

### TypeScript Patterns

- Literal string union types (`variant: 'prev' | 'next' | 'dot'`)
- Generic component typing via `memo<PropsType>`
- Type-only imports (`import type`), nullish embla API guards (`if (!emblaApi) return`)
- Path alias `@/*` → `./src/*` used throughout imports

### Component Organization

- **Feature directories** (PascalCase): `TIN/`, `carousel/`, `overlay/`
- **Barrel exports**: Each feature directory has an `index.ts` for clean public APIs
- **Component files match exported names**: `TIN.tsx` exports `TIN`, `ExperienceCard.tsx` exports `ExperienceCard`
- **Hooks**: Follow `use` prefix convention (`useDotButton`, `usePrevNextButtons`)

---

## R3F Patterns Used

| Pattern | Where |
|---------|-------|
| `'use client'` directive | All components using R3F hooks |
| `<Suspense>` wrapper | Around Canvas content for graceful loading |
| `makeDefault` on camera | Making OrthographicCamera the primary camera |
| drei utilities | OrbitControls, OrthographicCamera helpers |
| `useFrame` for animation loop | TIN mesh deformation |
| `<meshPhongMaterial>` with vertex colors | Deformed surface rendering |
| Inline helpers via R3F exports | `<axesHelper>` used directly in JSX |

---

## Data Flow Diagram

```
                        Scene (state orchestrator)
                        ┌─────────────────────────┐
                        │ TINParameters state       │
                        │ - resolution, amplitude   │
                        │ - speed, wireframe        │
                        └────┬──────────┬─────────┘
                             │          │
              props ↓        │          │ callbacks ↑
                   ┌─────────┘          └─────────┐
                   ▼                              ▼
             <TIN>                          <TINControls>
           (R3F mesh + wave)            (gear panel sliders)
                                                │
                                                │ onClick → reset()
                                                ▼
                                           callback to Scene

             Overlay (fixed position)
             ┌──────────────────────┐
             │ Name block            │
             │ EmblaCarousel         │
             │   ├── hooks           │ ←→ embla API events
             │   ├── ExperienceCard  │ ← cvData.ts
             │   └── CarouselButton  │
             └──────────────────────┘
```

---

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack (hot reload) |
| `npm run build` | Production static export (`out/` directory) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint check via Next.js wrapper |

---

## Browser Support

Designed for modern browsers with CSS Grid, flexbox, and WebGL. No polyfills are included.

---

## Future Enhancement Opportunities (observed from codebase)

1. **Add actual routing** -- currently a single page with no navigation infrastructure
2. **Make cvData.ts dynamic** -- could be fetched from an API for easier updates
3. **Consider using a state management library** if component tree grows deeper
4. **Remove unused CSS class names** from `page.module.css` (template defaults)
5. **Make axesHelper import explicit** instead of relying on R3F implicit THREE exports
