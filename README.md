# The Signature Experience

**From hype to signature.**

> A luxury fragrance confidence system for L'Oréal Luxe — transforming fragrance discovery from trend-driven guesswork into identity, intelligent fit, and personal ritual.

---

## Table of Contents

1. [Concept Overview](#concept-overview)
2. [Product Vision](#product-vision)
3. [The Problem](#the-problem)
4. [Why This Is Different](#why-this-is-different)
5. [User Journey](#user-journey)
6. [Route Map](#route-map)
7. [Core Features](#core-features)
8. [Recommendation Logic](#recommendation-logic)
9. [Scent Identity Profiles](#scent-identity-profiles)
10. [Mock Data Structure](#mock-data-structure)
11. [Tech Stack](#tech-stack)
12. [Architecture](#architecture)
13. [Component Philosophy](#component-philosophy)
14. [State Management](#state-management)
15. [Design System](#design-system)
16. [Motion & Animation](#motion--animation)
17. [Inclusivity](#inclusivity)
18. [Sustainability](#sustainability)
19. [Demo Mode](#demo-mode)
20. [Running Locally](#running-locally)
21. [Available Scripts](#available-scripts)
22. [Future Roadmap](#future-roadmap)
23. [Why It Matters for L'Oréal Luxe](#why-it-matters-for-loréal-luxe)
24. [Innovation · Sustainability · Inclusion · Feasibility · Scalability](#innovation--sustainability--inclusion--feasibility--scalability)
25. [Demo Script](#demo-script)
26. [Screenshots](#screenshots)
27. [Disclaimer](#disclaimer)

---

## Concept Overview

The Signature Experience is a **phygital fragrance confidence system** that guides consumers from hype-driven fragrance choices to a signature scent that truly feels like them.

It combines:
- **Identity-first profiling** — understand your scent language before choosing a bottle
- **Scent Mirror** — visualize your fragrance identity as a living aura
- **Skin & Scent Fit** — precision recommendations based on skin type, climate, and lifestyle
- **Signature Ritual** — a guided, meaningful comparison experience
- **Scent Wardrobe** — a long-term fragrance collection built around your identity
- **Aura Card** — a shareable identity asset for social advocacy
- **Refill & Continuity** — sustainable loyalty through refill pathways

---

## Product Vision

Fragrance is the most personal luxury. Yet most consumers choose it through hype, social influence, or guesswork.

**The Signature Experience** makes fragrance discovery feel like what it should be: a confident, identity-driven, emotionally intelligent ritual that builds a lasting relationship — not just a transaction.

---

## The Problem

### The Fragrance Confidence Gap

| Symptom | Root Cause |
|---------|-----------|
| Blind buying based on TikTok trends | No personal identity framework |
| "Dupe culture" eroding brand value | Price-led choices without fit understanding |
| Fragrance regret and unused bottles | No intelligent matching layer |
| Intimidation in-store | No guided discovery pathway |
| One-and-done purchases | No wardrobe or continuity logic |

Most consumers don't lack access to fragrance. They lack **confidence** in choosing fragrance as a true extension of identity.

---

## Why This Is Different

| Traditional Discovery | The Signature Experience |
|----------------------|------------------------|
| Product-first | Identity-first |
| "Try this bestseller" | "This is your scent language" |
| Generic recommendations | Profile-matched, skin-fitted |
| Single purchase | Wardrobe + continuity |
| Passive browsing | Guided ritual |
| No visualization | Scent Mirror + Aura Card |
| No sustainability angle | Refill-first, less waste |

---

## User Journey

```
Landing → Sense Me → Decode Me → Scent Mirror → Skin & Scent Fit → Signature Ritual → Signature → Aura Card → Grow With Me → Refill
```

Each step builds on the previous — from identity capture to visualization, precision, decision, result, advocacy, wardrobe, and continuity.

---

## Route Map

| Route | Screen | Purpose |
|-------|--------|---------|
| `/` | Landing | Hero, concept entry, CTAs |
| `/sense-me` | Sense Me | Identity-first onboarding (mood, style, occasion, presence, intensity, familiarity) |
| `/decode-me` | Decode Me | AI-guided interpretation animation |
| `/scent-mirror` | Scent Mirror | Interactive aura visualization with identity scales |
| `/skin-scent-fit` | Skin & Scent Fit | Physiological refinement (skin type, climate, projection) |
| `/signature-ritual` | Signature Ritual | Guided 3-fragrance comparison with confidence scores |
| `/signature` | Signature | Emotional result state with hero card |
| `/aura-card` | Aura Card | Shareable identity card (Story / Square / Wallpaper) |
| `/grow-with-me` | Grow With Me | Scent wardrobe dashboard with layering guidance |
| `/refill` | Refill | Sustainability, loyalty, and next-chapter continuity |

---

## Core Features

### Sense Me — Identity Onboarding
Premium card-based selector across 6 dimensions. Sensitivity Mode toggle available. No boring forms — every step feels like a luxury ritual.

### Decode Me — AI Interpretation
Animated loading state with layered language: *"Interpreting identity signals…"*, *"Moving from preference to signature…"*. Computes profile via weighted scoring.

### Scent Mirror
Interactive aura visualization driven by profile data. Hover to shift intensity. Displays identity spectrum scales (intimate↔expressive, calm↔magnetic, soft↔intense, day↔night). Includes Hype Reframing for trend-driven users.

### Skin & Scent Fit
6-step physiological questionnaire generating editorial fit insight cards: *"Close-to-skin elegance"*, *"Warm climate adapted"*, *"Recommended: Eau de Parfum"*.

### Signature Ritual
3-fragrance guided comparison with **Fragrance Confidence Scores** (Signature Match, Everyday Fit, Evening Presence). Deep-dive panel with scent story, key notes, emotional character, and "Why This Is You" reasoning.

### Aura Card
Format-switchable (Story / Square / Wallpaper) shareable identity card with animated aura, profile name, mood keywords, and signature scent. Premium social advocacy layer.

### Grow With Me
Occasion-based wardrobe: Signature, Everyday, Work, Evening, Comfort, Seasonal. Includes layering guidance. Transforms one purchase into a lifestyle system.

### Refill & Continuity
Refill reminders, loyalty progression, next-chapter re-discovery, and intentional consumption messaging.

---

## Recommendation Logic

### How It Works

```
Sense Me Answers → matchProfile() → ScentProfile → getProfileFragrances() → 3 Fragrances
                                                  → buildWardrobe() → 5-slot Wardrobe
                                                  
Skin Fit Answers → computeConfidenceScores() → Signature %, Everyday %, Evening %
                 → getFitInsights() → Editorial Fit Cards
```

### Profile Matching

The `matchProfile()` function scores each of 6 profiles using three weighted mapping tables:

| Input | Maps To | Weighting |
|-------|---------|-----------|
| `mood` | `moodMap` | 3 pts (1st), 2 pts (2nd), 1 pt (3rd) |
| `style` | `styleMap` | Same |
| `presence` | `presenceMap` | Same |

The profile with the highest aggregate score is selected.

### Confidence Scoring

`computeConfidenceScores()` calculates three scores per fragrance:

- **Base**: 85 if fragrance is in profile's list, otherwise 70
- **Intensity alignment**: up to +10 based on profile–fragrance intensity match
- **Skin-fit bonuses**: +2 to +4 from skin type, sensitivity, longevity, climate variables
- **Clamped**: Signature 75–98%, Everyday 65–95%, Evening 70–98%

### Wardrobe Rules

| Slot | Selection Rule |
|------|---------------|
| Signature | User's chosen fragrance |
| Everyday | First catalogue match with `wardrobeCategory: "everyday"` |
| Work | First catalogue match with `wardrobeCategory: "work"` |
| Evening | First catalogue match with `wardrobeCategory: "evening"` |
| Comfort | First catalogue match with `wardrobeCategory: "comfort"` |

---

## Scent Identity Profiles

| Profile | Mood Direction | Aura Colors | Key Traits |
|---------|---------------|-------------|------------|
| **Quiet Gold** | Warm, refined | Amber + muted gold | Understated, Intentional |
| **Midnight Presence** | Dark, magnetic | Deep purple + black | Intense, Mysterious |
| **Soft Power** | Graceful, composed | Lavender + mauve | Elegant, Certain |
| **Velvet Heat** | Sensual, warm | Terracotta + amber | Inviting, Bold |
| **Clean Aura** | Fresh, pure | Teal + ivory | Effortless, Light |
| **Magnetic Minimalist** | Sharp, modern | Sage + charcoal | Deliberate, Minimal |

---

## Mock Data Structure

### Fragrances (12 entries)

From 3 fictional luxury houses:

| House | Character | Fragrances |
|-------|----------|------------|
| **Maison Lumière** | Warm, luminous | Noir Absolu, Amber Ritual, Iris Voile, Blanc Absolu |
| **Atelier Doré** | Rich, intimate | Velvet Oud, Dark Bloom, Suède Lumière, Santal Doré |
| **Noctis** | Dark, architectural | Obsidian Noir, Smoke & Ritual, Cèdre Frais, Terra Cálida |

Each fragrance includes: name, brand, scent family, key notes, intensity (1–5), best moment, emotional character, wardrobe category, color accent, and concentration.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Routing | React Router 6 |
| Icons | Lucide React |
| State | React Context |
| Components | shadcn/ui (customized) |

---

## Architecture

```
src/
├── types/
│   └── index.ts              # All TypeScript interfaces
├── data/
│   ├── profiles.ts           # 6 scent identity profiles
│   ├── fragrances.ts         # 12 mock fragrances
│   ├── onboarding.ts         # Onboarding & skin-fit step definitions
│   └── mockData.ts           # Re-export barrel for compatibility
├── lib/
│   ├── recommendation.ts     # Matching, scoring, wardrobe logic
│   └── utils.ts              # Tailwind merge utility
├── context/
│   └── JourneyContext.tsx     # Global journey state + demo mode
├── components/
│   ├── PageTransition.tsx     # Animated route wrapper
│   ├── ProgressBar.tsx        # Step progress indicator
│   ├── FragranceCard.tsx      # Reusable fragrance display
│   ├── NavLink.tsx            # Active-aware navigation link
│   └── ui/                   # shadcn/ui primitives
├── pages/
│   ├── Landing.tsx            # /
│   ├── SenseMe.tsx            # /sense-me
│   ├── DecodeMe.tsx           # /decode-me
│   ├── ScentMirror.tsx        # /scent-mirror
│   ├── SkinScentFit.tsx       # /skin-scent-fit
│   ├── SignatureRitual.tsx    # /signature-ritual
│   ├── Signature.tsx          # /signature
│   ├── AuraCard.tsx           # /aura-card
│   ├── GrowWithMe.tsx         # /grow-with-me
│   └── Refill.tsx             # /refill
├── hooks/
│   ├── use-mobile.tsx         # Responsive breakpoint hook
│   └── use-toast.ts           # Toast notification hook
├── assets/
│   └── hero-fragrance.jpg     # Landing hero image
└── index.css                  # Design tokens & component styles
```

---

## Component Philosophy

- **Pages** are route-level orchestrators — they compose components and manage navigation
- **Components** are reusable, stateless where possible, and accept data via props
- **Design primitives** (buttons, cards, bars) are defined as CSS classes in `index.css` for consistency
- **shadcn/ui** components are available but customized to match the luxury design system
- **Framer Motion** wraps interactive elements for refined micro-interactions

---

## State Management

A single `JourneyContext` manages the entire user journey:

```typescript
interface JourneyState {
  answers: Partial<OnboardingAnswers>;     // Sense Me inputs
  skinFit: Partial<SkinFitAnswers>;        // Skin & Scent Fit inputs
  profile: ScentProfile | null;            // Computed identity profile
  recommendations: Fragrance[];            // 3 matched fragrances
  signatureScent: Fragrance | null;        // User's chosen signature
  wardrobe: Record<string, Fragrance | null>; // 5-slot wardrobe
}
```

State persists through the session. A `reset()` function clears all state for re-discovery.

---

## Design System

### Color Tokens (HSL)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `0 0% 5%` | Page background (obsidian) |
| `--foreground` | `42 30% 90%` | Primary text (warm ivory) |
| `--primary` | `36 60% 50%` | Amber accent, CTAs |
| `--secondary` | `15 30% 35%` | Terracotta details |
| `--muted` | `0 0% 14%` | Subtle backgrounds |
| `--amber` | `36 60% 50%` | Highlight color |
| `--terracotta` | `15 40% 45%` | Warm accent |
| `--glass` | `0 0% 12%` | Glass-panel backgrounds |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Display | Cormorant Garamond | 300, 400, 500, 600, 700 |
| Body | Outfit | 200, 300, 400, 500, 600 |

### Component Classes

| Class | Description |
|-------|------------|
| `.luxury-card` | Glass-panel card with hover glow |
| `.selection-card` | Interactive selector with selected state |
| `.btn-primary-luxury` | Primary CTA with amber glow on hover |
| `.btn-outline-luxury` | Secondary CTA with border highlight |
| `.intensity-bar` | Gradient progress bar |
| `.glass-panel` | Backdrop-blur translucent panel |
| `.glow-amber` | Ambient amber box-shadow |

---

## Motion & Animation

| Element | Type | Timing |
|---------|------|--------|
| Page transitions | Fade + translateY | 500ms, cubic-bezier |
| Card selections | Scale + border glow | 300ms |
| Aura visualization | Continuous scale/opacity | 3–5s loops |
| Progress bars | Width animation | 600ms ease-out |
| Loading phrases | Fade in/out sequence | 1800ms interval |
| Particles | Random drift | 3–5s infinite |

All motion is subtle and purposeful. No excessive animation.

---

## Inclusivity

- **Non-gendered language** — discovery focused on self-expression, not stereotypes
- **Sensitivity Mode** toggle — available in Sense Me for users preferring gentle formulations
- **Beginner-friendly** — fragrance familiarity level adapts the experience tone
- **Accessible contrast** — warm ivory on obsidian exceeds WCAG AA requirements
- **Clean typography** — readable at all sizes with generous spacing

---

## Sustainability

- **Less waste, more certainty** — intelligent matching reduces wrong purchases
- **Refill pathway** — built into the continuity experience
- **Intentional consumption** — wardrobe logic promotes meaningful collection over impulse buying
- **Smarter discovery** — fewer trials needed when identity-led
- **Measurable impact** — prototype shows 87% less trial waste, 3× higher satisfaction (mock KPIs)

---

## Demo Mode

The prototype works end-to-end with mock data. Key demo features:

- **Full navigable journey** — all 10 screens connected with state persistence
- **Reset journey** — available on the Refill screen via "Start New Journey"
- **Pre-filled demo answers** — `DEMO_ANSWERS` constant in `JourneyContext.tsx` for quick walkthroughs
- **No dead ends** — every screen has clear CTAs to the next step
- **Guard redirects** — screens requiring prior state redirect to `/sense-me`

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5173
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start Vite dev server |
| Build | `npm run build` | Production build |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | ESLint check |
| Test | `npm run test` | Run Vitest tests |

---

## Future Roadmap

- [ ] Real AI-powered scent profiling via LLM integration
- [ ] AR try-on layer for in-store phygital activation
- [ ] Haptic and audio feedback (ambient sounds during ritual)
- [ ] Backend persistence with user accounts
- [ ] Retailer API integration for real product catalogue
- [ ] Advanced layering recommendation engine
- [ ] Seasonal wardrobe rotation intelligence
- [ ] Multi-language support
- [ ] A/B testing framework for UX optimization
- [ ] Analytics dashboard for brand insights

---

## Why It Matters for L'Oréal Luxe

### Strategic Value

| Dimension | Impact |
|-----------|--------|
| **Consumer confidence** | Reduces fragrance anxiety, increases conversion |
| **Brand differentiation** | No competitor offers identity-first discovery |
| **Lifetime value** | Wardrobe model creates multi-product relationships |
| **Sustainability** | Fewer returns, more intentional purchases |
| **Data intelligence** | Identity profiles create rich consumer insights |
| **Social advocacy** | Aura Cards drive organic brand awareness |
| **Retail activation** | Phygital-ready for in-store deployment |

### Market Opportunity

- 73% of fragrance consumers feel overwhelmed by choice (mock insight)
- The global prestige fragrance market is projected at $52B by 2028
- Gen Z and Millennials seek identity-aligned, sustainable luxury experiences
- No major luxury house currently offers an identity-first fragrance system

---

## Innovation · Sustainability · Inclusion · Feasibility · Scalability

| Pillar | How We Deliver |
|--------|---------------|
| **Innovation** | Scent Mirror visualization, identity-first profiling, Aura Card social layer, Fragrance Confidence Scores |
| **Sustainability** | Refill-first continuity, wardrobe-over-impulse philosophy, reduced trial waste |
| **Inclusion** | Non-gendered, sensitivity-aware, beginner-friendly, accessible design |
| **Feasibility** | Built with production-grade stack, modular architecture, real recommendation logic |
| **Scalability** | Extensible to real AI, multi-brand, multi-language, in-store phygital activation |

---

## Demo Script

### Recommended Presentation Flow (5–7 minutes)

1. **Landing** (30s) — Present the concept, tagline, and value proposition
2. **Sense Me** (60s) — Walk through 2–3 onboarding steps, emphasize ritual feeling
3. **Decode Me** (30s) — Show AI interpretation animation, discuss identity-first approach
4. **Scent Mirror** (60s) — Key wow moment. Show aura, interact with hover, discuss visualization value
5. **Skin & Scent Fit** (30s) — Show fit insight cards, discuss precision layer
6. **Signature Ritual** (60s) — Compare fragrances, highlight confidence scores and "Why This Is You"
7. **Signature** (30s) — Show result state, discuss emotional closure
8. **Aura Card** (30s) — Switch formats, discuss social advocacy potential
9. **Grow With Me** (30s) — Show wardrobe, discuss long-term relationship model
10. **Refill** (30s) — Discuss sustainability and continuity

### Key Talking Points

- *"This is not a recommendation app — it's a confidence system."*
- *"The Scent Mirror makes fragrance identity visible for the first time."*
- *"Confidence scores replace guesswork with clarity."*
- *"The wardrobe model transforms one purchase into a lifestyle."*
- *"From hype to signature — that's the journey we're building."*

---

## Screenshots

> 📸 *Screenshots and GIF recordings can be added here to showcase each screen.*

| Screen | Description |
|--------|------------|
| Landing | Hero with amber glow and concept entry |
| Sense Me | Premium card-based identity selector |
| Scent Mirror | Interactive aura visualization |
| Signature Ritual | 3-fragrance comparison with confidence scores |
| Aura Card | Shareable identity card in Story format |
| Grow With Me | Occasion-based scent wardrobe |

---

## Disclaimer

This is a **prototype built with mock data** for demonstration and competition purposes. All fragrance names, brands, and houses are fictional. No real products are represented. The recommendation logic uses simplified scoring for demo purposes and would be replaced with ML-powered matching in production.

---

<p align="center">
  <em>The Signature Experience — From hype to signature.</em><br/>
  <em>Built for L'Oréal Luxe · Brandstorm 2026</em>
</p>
