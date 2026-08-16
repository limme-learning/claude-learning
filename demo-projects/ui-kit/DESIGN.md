---
name: UI Kit Design System
description: Dual-engine shadcn design system for Base UI and Radix UI primitives
colors:
  primary: "#18181b"
  primary-foreground: "#fafafa"
  background: "#ffffff"
  foreground: "#09090b"
  card: "#ffffff"
  card-foreground: "#09090b"
  popover: "#ffffff"
  popover-foreground: "#09090b"
  secondary: "#f4f4f5"
  secondary-foreground: "#18181b"
  muted: "#f4f4f5"
  muted-foreground: "#71717a"
  accent: "#f4f4f5"
  accent-foreground: "#18181b"
  destructive: "#ef4444"
  destructive-foreground: "#fafafa"
  border: "#e4e4e7"
  input: "#e4e4e7"
  ring: "#18181b"
typography:
  display:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: "2.5rem"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.25rem"
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
---

# Design System: UI Kit

## Overview

**Creative North Star: "Precision Engineering & Headless Craft"**

A modern, highly tactile design system that unites the flexibility of unstyled headless primitives with the aesthetic rigor of the modern shadcn design language. Surfaces are quiet, crisp, and content-first, featuring balanced typography, soft atmospheric elevations, and clear keyboard focus indicators.

**Key Characteristics:**

- High legibility with neutral grayscale and deliberate accent punches
- Subtly rounded geometry (`rounded-md`, `rounded-xl`)
- Smooth interactive micro-animations with `:active:scale-[0.98]` tactile press states
- Clean portaled modals with backdrop blur and z-index isolation

## Colors

The palette is built on neutral OKLCH color spaces, ensuring uniform contrast across light and dark modes.

### Primary

- **Deep Slate/Zinc** (`#18181b`): High-intent action buttons, active navigation markers, and prominent headlines.

### Neutral

- **Background** (`#ffffff` / dark `#09090b`): Canvas surface.
- **Card & Popover** (`#ffffff` / dark `#121215`): Elevated component containers.
- **Muted Foreground** (`#71717a` / dark `#a1a1aa`): Secondary descriptions and helper labels.
- **Border** (`#e4e4e7` / dark `#27272a`): Subtle boundary lines dividing layout sections.

## Typography

**Display Font:** Geist / Inter (sans-serif)  
**Body Font:** Geist / Inter (sans-serif)  
**Mono Font:** Geist Mono / JetBrains Mono

### Hierarchy

- **Display** (600, `2.25rem`, `2.5rem` line-height): Main showcase headers.
- **Headline** (600, `1.25rem`, `1.75rem` line-height): Component category titles.
- **Title** (500, `0.875rem`, `1.25rem` line-height): Pattern preview headers.
- **Body** (400, `0.875rem`, `1.25rem` line-height): Explanatory text.
- **Label** (500, `0.75rem`, `1rem` line-height): Badges, table headers, and form labels.

## Elevation & Depth

Surfaces rely on subtle ambient shadows with genuine blur and offsets.

### Shadow Vocabulary

- **Card Shadow** (`shadow-sm`): Default elevation for cards and preview boxes.
- **Hover Shadow** (`hover:shadow-md`): Active feedback state on interactive cards.
- **Modal Depth** (`shadow-xl`): High-elevation popovers, dialog popups, and dropdown menus.

## Shapes

- Small controls (badges, tags): `rounded-sm` or `rounded-md` (4px–6px)
- Interactive buttons and inputs: `rounded-md` (6px)
- Cards, dialogs, and large panels: `rounded-xl` (12px)

## Components

### Buttons

- Primary, secondary, outline, ghost, and link variants with `:active:scale-[0.98]` and `:focus-visible:ring-2` offset rings.

### Dialogs & Modals

- Fixed center viewport positioning with dark translucent backdrops and spring enter/exit transitions.

### Calendar

- Fixed square cell grids (`w-9 h-9`) with rounded range selections and outside-day fading.
