# Velomint Brand Guidelines

## Brand Identity

**Name:** Velomint  
**Tagline:** Ship sharper. Build faster.  
**Domain (placeholder):** velomint.dev

Velomint combines *velocity* and *mint* — fresh, fast tooling for developers who ship with precision. The brand feels premium, technical, and approachable — not a generic utility site.

## Logo Concept

The mark is an abstract **velocity chevron** (upward triangle) with a horizontal **spectrum bar** (violet) representing the refraction of complex data into clarity. The mint apex dot signals precision and "go."

- **Primary mark:** Chevron + crossbar on midnight rounded square
- **Wordmark:** Outfit Bold, tight tracking
- **Minimum clear space:** 0.5× mark height on all sides

Assets: `/public/logo.svg`, `/public/favicon.svg`

## Color Palette

| Token | Hex | Usage |
|-------|-----|--------|
| Midnight | `#0B1221` | Primary background (dark), text (light) |
| Slate | `#151E32` | Elevated surfaces |
| Mist | `#8B9BB8` | Secondary text |
| Paper | `#F4F7FC` | Light mode background |
| Snow | `#FFFFFF` | Cards, inputs (light) |
| Mint | `#2EE6A6` | Primary accent, CTAs, success |
| Violet | `#7C5CFF` | Secondary accent, focus rings |
| Coral | `#FF6B6B` | Errors, destructive |
| Amber | `#FFB547` | Warnings |

## Typography

| Role | Family | Weights |
|------|--------|---------|
| Display | Outfit | 600–800 |
| Body | Inter | 400–700 |
| Code | JetBrains Mono | 400–600 |

## Design System Principles

1. **Glass surfaces** — `backdrop-blur` + semi-transparent borders for nav, cards, command palette
2. **Motion** — Subtle Framer Motion transitions; respect `prefers-reduced-motion`
3. **Density** — Comfortable spacing on mobile; information-rich on desktop
4. **Accessibility** — WCAG AA contrast, focus-visible rings, semantic landmarks
5. **Dark-first** — Default dark mode; light mode as peer experience

## Voice & Tone

- Confident, concise, developer-native
- No fluff; explain *why* a tool helps
- Avoid: "simply", "just", "easy" — respect complexity

## Ad Placement Zones

- `top-banner` — Below header, full width
- `sidebar` — Tool pages, desktop only
- `in-content` — Between tool input/output
- `sticky-mobile` — Bottom safe-area on mobile
- `footer` — Above site footer

## SEO Branding

- Title pattern: `{Tool Name} — Free Online Tool | Velomint`
- OG image: midnight + mint gradient with tool name
