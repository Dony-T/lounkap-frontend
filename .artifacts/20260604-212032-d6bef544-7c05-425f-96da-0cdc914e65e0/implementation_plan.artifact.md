# Implementation Plan - Lounkap Setup with Lumina Design System

Initialize the Lounkap project with Next.js, Tailwind CSS, and a clean architecture structure. Apply the "Lumina" Premium Minimalism design system.

## Proposed Changes

### Project Configuration

#### [NEW] `tailwind.config.ts`
- Define the Lumina color palette:
    - `primary`: `#D4AF37` (Gold)
    - `background`: `#f9f9ff`
    - `surface`: `#ffffff`
    - `on-surface`: `#111c2d`
    - `secondary`: `#0058be`
    - `error`: `#ba1a1a`
    - `success`: `#4caf82`
- Define Typography (Sora, DM Sans, JetBrains Mono)
- Define Border Radii: `3xl`: 24px, `2xl`: 18px

#### [NEW] `src/styles/globals.css`
- Setup Tailwind directives.
- Implement "Air Shadow": `0 4px 20px rgba(0,0,0,0.03)`.

### Clean Architecture Layers

- `src/core`: Entities and Use Cases (Pure JS/TS logic).
- `src/infrastructure`: Data sources, Repositories (Axios, API).
- `src/presentation`: Components, Hooks, Context, Pages.

### Core Reusable Components

- `src/presentation/components/ui/Button.tsx`: Supporting Primary, Secondary, and Ghost styles.
- `src/presentation/components/ui/Card.tsx`: White background, 24px radius, air shadow.
- `src/presentation/components/ui/Input.tsx`: 18px radius, gold focus glow.

