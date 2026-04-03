# TRAVI — Product Requirements Document (PRD)

**Version:** 2.0
**Date:** April 3, 2026
**Author:** TRAVI Engineering
**Status:** Approved for Development
**Classification:** Internal — Confidential

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [Market Analysis](#3-market-analysis)
4. [User Personas & Journeys](#4-user-personas--journeys)
5. [Product Architecture Overview](#5-product-architecture-overview)
6. [Feature Specifications — Authentication & Onboarding](#6-feature-specifications--authentication--onboarding)
7. [Feature Specifications — Travel DNA Engine](#7-feature-specifications--travel-dna-engine)
8. [Feature Specifications — Trip Planning & Booking](#8-feature-specifications--trip-planning--booking)
9. [Feature Specifications — Live Trip Mode](#9-feature-specifications--live-trip-mode)
10. [Feature Specifications — Wallet & Points System](#10-feature-specifications--wallet--points-system)
11. [Feature Specifications — Social & Community](#11-feature-specifications--social--community)
12. [Feature Specifications — Destination Guides & Events](#12-feature-specifications--destination-guides--events)
13. [Feature Specifications — Real Estate Module](#13-feature-specifications--real-estate-module)
14. [Feature Specifications — B2B Enterprise Suite](#14-feature-specifications--b2b-enterprise-suite)
15. [Feature Specifications — Support & Help Center](#15-feature-specifications--support--help-center)
16. [Technical Architecture](#16-technical-architecture)
17. [Database Schema](#17-database-schema)
18. [API Design](#18-api-design)
19. [AI/ML System](#19-aiml-system)
20. [Payment & Financial Infrastructure](#20-payment--financial-infrastructure)
21. [Security & Data Protection](#21-security--data-protection)
22. [Testing Strategy](#22-testing-strategy)
23. [Deployment & Infrastructure](#23-deployment--infrastructure)
24. [Development Phases & Timeline](#24-development-phases--timeline)
25. [KPIs & Success Metrics](#25-kpis--success-metrics)
26. [Risk Assessment & Mitigation](#26-risk-assessment--mitigation)
27. [Legal & Regulatory Compliance](#27-legal--regulatory-compliance)
28. [Team Structure & Resource Plan](#28-team-structure--resource-plan)
29. [Appendix A — Screen Inventory](#appendix-a--screen-inventory)
30. [Appendix B — Design System Tokens](#appendix-b--design-system-tokens)
31. [Appendix C — Data Models (Full TypeScript)](#appendix-c--data-models-full-typescript)
32. [Appendix D — Gamification & Avatar System](#appendix-d--gamification--avatar-system)
33. [Appendix E — Visual DNA System](#appendix-e--visual-dna-system-alternative-to-quiz)
34. [Appendix F — First Class DNA Monetization & Anti-Gaming](#appendix-f--first-class-dna--monetization--anti-gaming)
35. [Appendix G — Trip State Adaptation (Contextual UI)](#appendix-g--trip-state-adaptation-contextual-ui)
36. [Appendix H — Trip Preparation Hub](#appendix-h--trip-preparation-hub-detailed-spec)
37. [Appendix I — Post-Trip Summary](#appendix-i--post-trip-summary-detailed-spec)
38. [Appendix J — Onboarding Deep Dive (17 Steps)](#appendix-j--onboarding-deep-dive-17-steps)
39. [Appendix K — Concierge as Control Center](#appendix-k--concierge-as-control-center)
40. [Appendix L — Business Model Deep Dive](#appendix-l--business-model-deep-dive)
41. [Appendix M — Learning Engine (7 Phases)](#appendix-m--learning-engine-7-phases)
42. [Appendix N — UI Style Bible (Locked Decisions)](#appendix-n--ui-style-bible-locked-decisions)
43. [Appendix O — Guest Mode & Session Management](#appendix-o--guest-mode--session-management)
44. [Appendix P — Client Web App (85+ Pages)](#appendix-p--client-web-app-85-pages)

---

## 1. Executive Summary

### 1.1 What is TRAVI?

TRAVI is an AI-powered travel intelligence platform that combines behavioral profiling ("Travel DNA"), end-to-end trip planning, live trip management, and social travel features into a single mobile-first experience. TRAVI operates across two revenue streams: B2C (consumer travel app with commissions and subscriptions) and B2B (analytics dashboard and CRM tools for travel operators).

### 1.2 The Problem

The $1.9 trillion global travel market is fragmented across dozens of apps and services. Travelers must juggle separate tools for flights, hotels, activities, expenses, itineraries, and social coordination. None of these tools know who the traveler is as a person — their personality, preferences, comfort zones, or travel style. The result: generic recommendations, decision fatigue, and missed experiences.

### 1.3 The Solution

TRAVI's Travel DNA system creates a behavioral profile from a combination of quick swipe-based assessments (116 items across 11 categories) and deep 9-module personality analysis. This DNA profile drives every recommendation, from destinations to restaurants to hotel rooms. The entire travel lifecycle — plan, book, experience, reflect — happens in one app.

### 1.4 Key Numbers

| Metric | Value |
|--------|-------|
| Pre-money Valuation | $2,000,000 |
| Seed Round | $500,000 |
| Post-money Valuation | $2,500,000 |
| Founder Equity | 70% (7,000,000 shares) |
| Employee Pool | 20% (2,000,000 shares) |
| Investor Allocation | 5% (500,000 shares) |
| Target Waitlist | 10,000+ signups |
| Target CAC | <$15 (pre-launch), <$5 (launch) |
| Target Markets | UAE, Saudi Arabia, UK, Singapore |
| Total Addressable Market | $1.9T (global travel) |
| Serviceable Addressable Market | $83B (travel tech) |
| Serviceable Obtainable Market | $12B (B2B travel software) |

### 1.5 Product Portfolio

| Product | Type | Status | Revenue Model |
|---------|------|--------|---------------|
| **TRAVI Main App** | B2C Mobile | In Development | Commission (5% flights, 5% hotels, 3% activities) + Subscriptions |
| **TRAVI Insights** | B2B Dashboard | Planned | SaaS ($299-$999/month) |
| **TraVendors** | B2B CRM | Planned | SaaS ($29-$200/month) |
| **travi.co.il** | Content Platform | Live | Ads + Lead Gen |

### 1.6 Use of Seed Funds

| Category | Allocation | Amount |
|----------|-----------|--------|
| Product Development & Engineering | 60% | $300,000 |
| Market Expansion & User Acquisition | 25% | $125,000 |
| Operations & Working Capital | 15% | $75,000 |

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement

"The Netflix of Travel" — an AI system that knows you better than you know yourself as a traveler, and uses that knowledge to eliminate friction from every stage of the travel lifecycle.

### 2.2 Strategic Pillars

**Pillar 1: Personalization Through DNA**
Every interaction is informed by the user's Travel DNA profile. No two users see the same recommendations, itineraries, or suggestions. The DNA engine improves with every trip, creating a compounding data advantage.

**Pillar 2: End-to-End Trip Lifecycle**
One app for the entire journey: inspiration → planning → booking → live navigation → expense management → reflection → sharing. Users never need to leave TRAVI.

**Pillar 3: Social Travel Network**
DNA-based traveler matching, group trip coordination, expense splitting, and community storytelling. Travel is inherently social — TRAVI makes it frictionless.

**Pillar 4: Dual Revenue Engine**
B2C commission/subscription revenue from travelers, B2B SaaS revenue from operators. Each side feeds the other: more travelers attract more operators, more operator inventory attracts more travelers.

### 2.3 Competitive Positioning

| Competitor | Strength | TRAVI Advantage |
|-----------|----------|-----------------|
| TripAdvisor (28% share) | Reviews database | End-to-end booking vs. redirect model |
| Airbnb Experiences (18% share) | Unique local experiences | Full trip planning, not just activities |
| Viator (15% share) | Activity marketplace | DNA-matched recommendations + flights/hotels |
| GetYourGuide (12% share) | Curated experiences | Personalization + live trip management |
| Klook (10% share) | Asia-Pacific leader | Multi-region + behavioral profiling |

**TRAVI Differentiators:**
1. Travel DNA — no competitor has behavioral profiling at this depth
2. Full-stack — plan, book, live manage, split costs, reflect — all in one app
3. Israeli market advantage — Hebrew UI, kosher/Shabbat-aware features
4. Regional expertise — Dubai/UAE cultural intelligence, South America events

### 2.4 Growth Strategy

**Phase 1 — Pre-Launch (Weeks 1-16):**
- Build 10,000+ qualified waitlist through community infiltration, SEO, micro-influencers
- Test 6+ acquisition channels simultaneously in 2-week sprint cycles
- Viral coefficient target: 0.25+
- Channel focus: Travel communities (Reddit, Discord, Facebook), long-tail SEO, micro-influencers (10K-100K followers)

**Phase 2 — Soft Launch:**
- 200+ beta testers from waitlist
- Limited geography (Israel → UAE → UK)
- Measure: activation rate (target 40%), retention D7 (target 30%), NPS (target 50+)

**Phase 3 — Public Launch:**
- App Store + Google Play
- Content migration from travi.co.il (17 destinations ready)
- Partnership launches with operators

**Phase 4 — Scale:**
- B2B product launches (TRAVI Insights + TraVendors)
- Geographic expansion to Saudi Arabia, Singapore
- Payment infrastructure (multi-currency wallet)

---

## 3. Market Analysis

### 3.1 Market Size

| Segment | Size | Growth |
|---------|------|--------|
| Global Travel Market | $1.9T | +5.8% CAGR |
| Travel Technology | $83B | +8.2% CAGR |
| B2B Travel Software | $12B | +12% CAGR |
| Online Travel Agencies | $600B | +9.5% CAGR |

### 3.2 Target Market Segments

**B2C Primary Segments:**

| Segment | Age | Income | Travel Frequency | Key Need |
|---------|-----|--------|-----------------|----------|
| Young Professionals | 25-35 | $40K-$80K | 2-4 trips/year | Efficiency, discovery |
| Affluent Couples | 30-45 | $80K-$150K | 3-6 trips/year | Quality, uniqueness |
| Family Travelers | 30-50 | $60K-$120K | 1-3 trips/year | Planning, safety |
| Digital Nomads | 25-40 | $50K-$100K | 6+ trips/year | Flexibility, community |

**B2B Primary Segments:**

| Segment | Size | Pain Point | TRAVI Product |
|---------|------|-----------|---------------|
| Tour Operators | 15,000+ (Israel) | Excel-based vendor management | TraVendors |
| DMCs | 2,000+ (UAE) | Data silos, no forecasting | TRAVI Insights |
| Hotel Chains | 500+ (regional) | Poor demand visibility | TRAVI Insights |
| Travel Agencies | 5,000+ (Israel) | Manual operations | TraVendors |

### 3.3 Competitive Window

The travel tech personalization gap is a 12-18 month window before major OTAs (Booking, Expedia) build similar DNA-style features. TRAVI's advantage is speed to market with a niche focus on behavioral profiling + regional expertise (Israel, UAE, South America).

### 3.4 Growth Arbitrage Opportunities

| Channel | Opportunity | Why |
|---------|-------------|-----|
| TikTok Travel Content | 70% lower CPM, 5x engagement vs. Instagram | Under-saturated for travel |
| Micro-influencers (10K-100K) | 3x better ROI than macro | Higher trust, lower cost |
| Local Facebook Groups | 80% low saturation | Untapped travel communities |
| Voice Search | 15% of travel queries | Almost zero optimization |
| Google My Business | 80% under-optimized | Free traffic, local intent |

---

## 4. User Personas & Journeys

### 4.1 Primary Personas

**Persona 1: Maya, 28 — "The Explorer"**
- Role: UX designer at a Tel Aviv startup
- Travel: 3-4 trips/year, mix of Europe and Asia
- DNA Profile: Explorer 85, Culturalist 72, Foodie 68
- Pain: Spends 8+ hours planning each trip across 5+ apps
- TRAVI Value: DNA-matched recommendations, 90-second trip planning, one-app experience

**Persona 2: David & Sarah, 35 — "The Connected Couple"**
- Role: Both work in tech, dual income
- Travel: 4-5 luxury trips/year
- DNA Profile: Luxury 90, Relaxer 78, Photographer 65
- Pain: Want unique experiences but don't want to research
- TRAVI Value: AI concierge, curated luxury recommendations, expense splitting

**Persona 3: Amit, 42 — "The Business Traveler"**
- Role: VP Sales at a travel agency
- Travel: 8+ work trips/year
- DNA Profile: Planned 95, Urban 80, Cultural 60
- Pain: Company has no visibility into travel spend
- TRAVI Value: Enterprise dashboard, compliance tracking, policy management

**Persona 4: Guest User — "Just Browsing"**
- No account, exploring the app
- Can take Quick DNA quiz and browse
- Prompted to create account after first meaningful action
- guestToken maintains session continuity

### 4.2 User Journey — 13 Steps

The system tracks each user through a gated progression of 13 steps. Each step unlocks specific features and content:

```
Step 1:  registration ────────── Account created (or guest token issued)
Step 2:  email_verified ──────── Email confirmed (skip for guests)
Step 3:  profile_basic ───────── Name, avatar, basic preferences set
Step 4:  quick_dna ────────────── 11-category swipe quiz completed (116 items)
Step 5:  first_class_dna ──────── Deep 9-module assessment completed
Step 6:  first_trip_planned ───── First trip created (draft status)
Step 7:  first_booking ────────── First flight/hotel/activity booked
Step 8:  payment_setup ────────── Payment method added to wallet
Step 9:  profile_complete ─────── All profile sections filled
Step 10: referral_shared ──────── First referral link shared
Step 11: premium_explored ─────── Subscription page viewed
Step 12: community_joined ─────── Connected with another traveler
Step 13: power_user ───────────── 3+ trips completed, 5+ connections
```

**Gate Rules:**
- Steps 1-3: Must complete before accessing DNA quiz
- Step 4: Must complete before trip planning
- Step 5: Optional but unlocks 50% subscription discount
- Steps 6-7: Must complete before live trip mode
- Steps 8-13: Progression rewards unlock via gamification

### 4.3 Feature Unlocking by Journey Step

| Journey Step | Features Unlocked |
|-------------|-------------------|
| Guest (no account) | Browse, Quick DNA, explore destinations |
| Step 1-3 | Profile, basic recommendations, save favorites |
| Step 4 (Quick DNA) | Personalized recommendations, trip planning |
| Step 5 (First Class DNA) | Deep matching, AI concierge, 50% subscription discount |
| Step 6-7 (First trip) | Live trip mode, expense tracking, itinerary |
| Step 8 (Payment) | Booking, wallet features, points earning |
| Step 9+ (Complete) | Social features, referrals, premium |

---

## 5. Product Architecture Overview

### 5.1 System Architecture

```
                    ┌──────────────────────────┐
                    │      Mobile App           │
                    │  (Expo + React Native)    │
                    │  Expo Router / NativeWind │
                    │  Zustand + React Query    │
                    └──────────┬───────────────┘
                               │
                    ┌──────────▼───────────────┐
                    │      API Gateway          │
                    │  (tRPC + Express)         │
                    │  JWT + Cookie Auth        │
                    │  Rate Limiting            │
                    └──────────┬───────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                     │
┌─────────▼──────────┐ ┌──────▼──────────┐ ┌───────▼─────────┐
│   Core Services    │ │   AI Services   │ │  Payment Layer  │
│  Auth, Trips,      │ │  DNA Engine,    │ │  Stripe,        │
│  Wallet, Points,   │ │  Matching,      │ │  Multi-currency │
│  Bookings          │ │  Recommendations│ │  KYC            │
└─────────┬──────────┘ └──────┬──────────┘ └───────┬─────────┘
          │                    │                     │
          └────────────────────┼─────────────────────┘
                               │
                    ┌──────────▼───────────────┐
                    │      Data Layer          │
                    │  PostgreSQL + Drizzle    │
                    │  13 Tables               │
                    │  AsyncStorage (local)    │
                    └──────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                     │
┌─────────▼──────────┐ ┌──────▼──────────┐ ┌───────▼─────────┐
│  External APIs     │ │  Storage        │ │  Real-time      │
│  OpenAI GPT-4o,    │ │  Cloudflare R2, │ │  Socket.IO,     │
│  Amadeus, Weather  │ │  AsyncStorage   │ │  Push Notifs    │
└────────────────────┘ └─────────────────┘ └─────────────────┘
```

### 5.2 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Mobile Framework** | Expo + React Native | 54.0 / 0.81.5 |
| **Language** | TypeScript | 5.9.3 |
| **Navigation** | Expo Router (file-based) | 6.0.19 |
| **Styling** | NativeWind (Tailwind for RN) | 4.2.1 |
| **State (Client)** | React Context + useReducer | (built-in) |
| **State (Server)** | TanStack React Query | 5.90.12 |
| **API Layer** | tRPC | 11.7.2 |
| **Server** | Express.js | 4.22.1 |
| **Database** | PostgreSQL | 16 |
| **ORM** | Drizzle ORM | 0.44.7 |
| **Validation** | Zod | 4.2.1 |
| **Authentication** | JWT (jose) + OAuth | 6.1.0 |
| **Payments** | Stripe | Latest |
| **AI** | OpenAI GPT-4o | Latest |
| **Storage** | Cloudflare R2 | - |
| **Real-time** | Socket.IO | Latest |
| **Push Notifications** | Expo Notifications | 0.32.15 |
| **Build** | esbuild (server) + Metro (mobile) | 0.25.12 |
| **Testing** | Vitest + Detox | 2.1.9 |
| **CI/CD** | GitHub Actions | - |
| **Infrastructure** | AWS ECS + Terraform | - |

### 5.3 Monorepo Structure

```
travi-new-app-manus/
├── app/                          # Expo Router screens (47 files)
│   ├── (auth)/                   # Auth screens (6)
│   ├── (tabs)/                   # Tab screens (17)
│   ├── (trip)/                   # Trip planning screens (7)
│   ├── (live)/                   # Live trip screens (9)
│   ├── (social)/                 # Social screens (5 planned)
│   └── dev/                      # Development tools
├── components/                   # Shared UI components
│   ├── ui/                       # Base UI components
│   └── auth/                     # Auth-specific components
├── lib/                          # Core libraries
│   ├── _core/                    # Auth, API, theme, runtime
│   ├── design-system.ts          # Brand tokens
│   ├── store.tsx                 # Global state
│   ├── trpc.ts                   # tRPC client
│   └── utils.ts                  # Utilities
├── server/                       # Backend
│   ├── _core/                    # Express server setup
│   ├── routers.ts                # tRPC routers
│   ├── db.ts                     # Database connection
│   └── storage.ts                # File storage
├── drizzle/                      # Database migrations
│   └── schema.ts                 # Table definitions
├── shared/                       # Shared types & constants
├── assets/                       # Images, fonts, logos
│   ├── destinations/             # 15 destination photos
│   ├── logos/                    # Brand assets
│   └── fonts/                    # Chillax, Satoshi
└── tests/                        # Test files
```

---

## 6. Feature Specifications — Authentication & Onboarding

### 6.1 Splash Screen

**File:** `app/(auth)/splash.tsx`

| Aspect | Specification |
|--------|--------------|
| **Duration** | 2.5 seconds animated, then auto-navigate |
| **Visual** | TRAVI mascot (centered, large) + logotype-white below |
| **Animation** | Fade-in mascot → logotype slide-up → progress bar fill |
| **Background** | Gradient: #0D0628 → #1A0A3D with ambient purple orb |
| **Logic** | Check AsyncStorage for existing session → if authenticated, go to tabs; if onboarding incomplete, go to welcome; else go to sign-up |

### 6.2 Sign Up / Log In

**File:** `app/(auth)/sign-up.tsx`

| Aspect | Specification |
|--------|--------------|
| **Modes** | Tab toggle: Sign Up / Log In |
| **Fields (Sign Up)** | Email, Password (with strength indicator) |
| **Fields (Log In)** | Email, Password |
| **OAuth** | Google, Apple (native), Guest mode |
| **Validation** | Email format, password 8+ chars, 1 uppercase, 1 number |
| **Error States** | Inline errors, shake animation on submit failure |
| **Guest Mode** | Creates user with isGuest=1, issues guestToken |
| **Security** | Password hashed (bcrypt), JWT issued, stored in SecureStore |

**Guest Flow Detail:**
```
1. User taps "Continue as Guest"
2. POST /api/guest/init → returns { guestToken, userId, isNew }
3. guestToken stored in AsyncStorage
4. User can browse, take Quick DNA, explore destinations
5. On first booking attempt → prompt to create full account
6. Guest data (DNA, trips) preserved and linked to new account
```

### 6.3 Email Verification (OTP)

**File:** `app/(auth)/verify.tsx`

| Aspect | Specification |
|--------|--------------|
| **Input** | 6 individual digit boxes with auto-advance |
| **Timer** | 30-second countdown before resend available |
| **Feedback** | Success: green checkmark + haptic. Error: shake + red border |
| **Retry** | "Resend Code" link after timer expires |
| **Expiry** | OTP valid for 10 minutes |

### 6.4 Profile Setup

**File:** `app/(auth)/profile-setup.tsx`

| Aspect | Specification |
|--------|--------------|
| **Step** | "Step 2 of 3" badge |
| **Avatar** | 12 icon-based options with color backgrounds |
| **Name** | Full name text input with validation |
| **Preview** | Live profile card preview updates as user types |
| **Completion** | Marks journey step `profile_basic` as complete |

### 6.5 Welcome Screen

**File:** `app/(auth)/welcome.tsx`

| Aspect | Specification |
|--------|--------------|
| **Greeting** | Personalized: "Hi, {firstName}!" with mascot |
| **Features Grid** | 2x2 cards: AI Knowledge, Zero Fees, Real-Time Agent, Travel Gamified |
| **Primary CTA** | "Build My Traveler Profile" → navigates to DNA quiz |
| **Skip Option** | "I'll do this later" → goes to home (limited features) |

---

## 7. Feature Specifications — Travel DNA Engine

### 7.1 Quick DNA Assessment

**Purpose:** Fast personality profiling in ~2 minutes via swipe-based selection.

| Aspect | Specification |
|--------|--------------|
| **UX Pattern** | Tinder-style swipe cards (like/dislike/super-like) |
| **Total Items** | 116 travel-related items |
| **Categories** | 11 (see below) |
| **Duration** | ~2 minutes |
| **Output** | Basic DNA profile with 7 travel style scores (0-10) |

**11 Categories:**

| # | Category | Items | Examples |
|---|----------|-------|---------|
| 1 | Landmarks | ~12 | Eiffel Tower, Machu Picchu, Taj Mahal |
| 2 | Museums | ~10 | Louvre, MoMA, British Museum |
| 3 | Food | ~12 | Street food, fine dining, cooking class |
| 4 | Nature | ~10 | Rainforest, mountains, waterfalls |
| 5 | Beaches | ~10 | Tropical, surfing, secluded coves |
| 6 | Shopping | ~8 | Luxury brands, local markets, souks |
| 7 | Nightlife | ~10 | Rooftop bars, clubs, live music |
| 8 | Activities | ~12 | Kayaking, yoga, city tours |
| 9 | Extreme/Adventure | ~10 | Skydiving, bungee, scuba |
| 10 | Family | ~10 | Theme parks, zoos, family resorts |
| 11 | Investments | ~12 | Real estate, business travel, conferences |

**Scoring Algorithm:**

Each category maps to travel style weights:

```
landmarks    → luxury:3, cultural:2, adventure:1
museums      → cultural:4, luxury:1
food         → cultural:2, budget:1, relaxation:1
nature       → adventure:2, relaxation:3
beaches      → relaxation:4, family:2
shopping     → luxury:3, budget:1
nightlife    → nightlife:4, luxury:1, adventure:1
activities   → adventure:3, family:2, budget:1
extreme      → adventure:5
family       → family:4, relaxation:1, budget:1
investments  → luxury:4, budget:2
```

Liked items contribute their category's weights. Scores normalized to 0-10 scale. Primary style = highest score. Budget style derived: luxury if luxury > budget+3, budget if budget > luxury+3, else medium.

### 7.2 Current Quiz Implementation (10 Scenario Questions)

**File:** `app/(auth)/quiz.tsx`

The existing implementation uses 10 scenario-based questions with 4 options each. Each option has associated DNA tags (culture, adventure, food, luxury, social, solo, nature, urban, relax, spontaneous, planned). Tags are counted and the highest count determines the DNA type.

**Existing DNA Types (11):**

| Type | Icon | Description |
|------|------|-------------|
| Cultural Explorer | building.columns.fill | Museums, history, authentic local experiences |
| Culinary Nomad | fork.knife | Itinerary built around meals |
| Adrenaline Seeker | mountain.2.fill | Hikes, dives, off-the-beaten-path |
| Luxury Connoisseur | crown.fill | Finest things, quality over quantity |
| Social Butterfly | person.2.fill | Travel for the people and connections |
| Nature Wanderer | leaf.fill | Wild places, no WiFi |
| Mindful Traveler | moon.fill | Slow mornings, beautiful surroundings |
| City Connoisseur | building.fill | Skylines, rooftops, urban energy |
| Free Spirit | bolt.fill | Unplanned moments, best stories |
| Master Planner | list.bullet.clipboard.fill | Know the best restaurant 3 months ahead |
| Solo Adventurer | figure.walk | Travel on your own terms |

**Required Enhancement:**
- Add 8-dimension scoring (0-100 each): Explorer, Relaxer, Adventurer, Culturalist, Foodie, Photographer, Historian, Naturalist
- Add confidence score per destination recommendation
- Add share card generation (Instagram Stories format)
- Add "Retake Quiz" functionality
- Add fun facts per DNA type

### 7.3 First Class DNA Assessment

**Purpose:** Deep 9-module personality assessment for users who want maximum personalization accuracy. Unlocks 50% subscription discount as incentive.

| Module | Name | Questions | Focus |
|--------|------|-----------|-------|
| 1 | Identity | 8-10 | Who you are as a traveler (values, motivations) |
| 2 | Crisis | 6-8 | How you handle travel problems (adaptability) |
| 3 | Money | 8-10 | Budget attitudes, spending priorities |
| 4 | Visual | 6-8 | Aesthetic preferences (architecture, nature, design) |
| 5 | Brand | 6-8 | Brand loyalty, quality expectations |
| 6 | Social | 8-10 | Solo vs. group, introversion/extraversion |
| 7 | Sensory | 6-8 | Food, music, tactile preferences |
| 8 | Future | 6-8 | Bucket list, dream destinations |
| 9 | AI Challenge | 4-6 | Scenario-based AI puzzles for hidden preferences |

**Output:** Full 580-signal behavioral profile with:
- 8-dimension DNA scores (0-100)
- Processed preferences: primaryMotivations[], avoidanceFactors[], mustHaves[], dealBreakers[], flexibilityAreas[]
- Budget estimate per destination
- Recommended travel windows (seasons)
- Confidence scores per recommendation

### 7.4 AI Pre-fill from Quick DNA

After Quick DNA completion, GPT-4o analyzes swipe patterns to pre-fill First Class DNA answers. This reduces friction for the deep assessment.

```
POST /api/dna/analyze-quick-dna
Body: { selectedCategories[], likedItems[], categoryDetails }
Response: { suggestedAnswers: Record<module, answers>, confidence: number }
```

### 7.5 DNA-Powered Recommendation Engine

The matching engine uses DNA profiles to score destinations, activities, and accommodations:

```
matchScore = (
  dna.adventureLevel * destination.adventureScore +
  dna.luxuryPreference * destination.luxuryScore +
  dna.culturalCuriosity * destination.culturalScore +
  dna.comfortZone * destination.noveltyScore +
  ...
) / totalWeight

confidence = min(matchScore * profileCompleteness, 100)
```

Recommendations are filtered by:
- Budget compatibility
- Season preferences
- Accessibility needs
- Dietary restrictions
- Group type

---

## 8. Feature Specifications — Trip Planning & Booking

### 8.1 Trip Planning Flow (5 Steps)

**Files:** `app/(trip)/plan.tsx`, `interests.tsx`, `landmarks.tsx`, `flights.tsx`, `hotels.tsx`, `summary.tsx`, `completion.tsx`

**Step 1: Destination Selection** (`plan.tsx`)
- TRAVI mascot with conversational bubble: "Where shall we go?"
- 8 destination cards with gradient backgrounds, city name, country, vibe
- Each card shows DNA match score (if DNA completed)
- Search bar for custom destinations
- Progress: "1 of 5"

**Step 2: Interests & Travel Style** (`interests.tsx`)
- 12 interest cards in 2-column grid with multi-select
- Categories: Local Food, History, Nature, Art & Culture, Adventure, Beaches, Nightlife, Shopping, Wellness, Sports, Photography, Wine & Drinks
- Travel style selector: Adventure / Luxury / Culture / Chill / Foodie / Nightlife
- Travelers count: increment/decrement
- Budget tier: Budget / Mid-range / Premium / Luxury

**Step 3: Dates** (inline in plan.tsx)
- Calendar range picker
- Start + end date selection
- Visual date range highlighting
- Duration badge: "7N/8D"

**Step 4: Flights** (`flights.tsx`)
- Loading state: TRAVI duck animation + "Searching flights..."
- Filter chips: All, Direct, Cheapest, Business
- Flight cards (horizontal scroll): airline, departure/arrival times, duration, stops, price, class
- Tap to select, highlighted card

**Step 5: Hotels** (`hotels.tsx`)
- Hotel cards: name, stars, location, price/night, total, amenities chips
- Filter by: rating, price range, amenities
- Photos carousel per hotel

### 8.2 Trip Summary

**File:** `app/(trip)/summary.tsx`

| Section | Content |
|---------|---------|
| Hero Card | Destination + country, duration badge (7N/8D), departure date, travelers, budget |
| Flight Details | From/To airport codes, times, duration, stops, airline, price |
| Hotel Details | Name, stars, dates, nightly rate, total |
| Itinerary Preview | Day-by-day collapsed list (expand to see activities) |
| Cost Breakdown | Flight + Hotel + Activities = Total |
| Points Earned | Calculated: 5% flights + 5% hotels + 3% activities |
| CTA | "Confirm & Book" (gradient button) |

### 8.3 Trip Completion

**File:** `app/(trip)/completion.tsx`

| Element | Animation |
|---------|-----------|
| Confetti | 40+ particles falling with varied colors, speeds, rotations |
| Success Icon | Checkmark in gradient circle with expanding rings |
| Points Counter | Animated count from 0 to earned points |
| CTA | "Go Live" button → navigates to live trip dashboard |

### 8.4 Trip Preparation Hub (NEW — to build)

**Purpose:** Pre-departure services and preparation checklist.

| Section | Content |
|---------|---------|
| Trip Context | Destination weather, visa requirements, currency info |
| Services Grid | Travel insurance, airport transfer, SIM card, luggage storage, currency exchange |
| AI Concierge | "Ask TRAVI anything about your upcoming trip" |
| Packing List | AI-generated based on destination + DNA + weather |
| Documents | Passport, visa, booking confirmations, travel insurance |
| Checklist | Editable pre-departure checklist with check/uncheck |

---

## 9. Feature Specifications — Live Trip Mode

### 9.1 Live Home Dashboard

**File:** `app/(live)/home.tsx`

| Section | Specification |
|---------|--------------|
| Header | "LIVE MODE" badge with pulsing green dot |
| Hero Card | Destination, weather widget (temp, condition), day progress bar, travelers, dates |
| Current Activity | Large card: title, time, description, location, distance, "Directions" + "Ask TRAVI" buttons |
| Next Activity | Compact preview of upcoming item |
| Quick Actions | 2x3 grid: Ask TRAVI, Schedule, Nearby, Split Bill, Expenses, Emergency |
| Rotating Tips | Auto-cycling destination-specific tips from AI |
| Weather Grid | Temperature, Humidity, Wind, UV Index |
| Points | Daily points accumulator |
| Emergency Modal | Police, Ambulance, Fire, Embassy with local numbers |

### 9.2 Full Itinerary

**File:** `app/(live)/itinerary.tsx`

- Day selector tabs (Day 1, Day 2, ...)
- Timeline view with color-coded dots: food (orange), activity (purple), hotel (blue), transport (green)
- Activity cards: time, title, description, location, distance, price, status (completed/confirmed/pending)
- Actions per activity: Directions, Details, Swap
- Category filter chips
- "Add Activity" floating button

### 9.3 Nearby Map

**File:** `app/(live)/map.tsx`

- Category filters: All, Food, Hotels, Museums, Shopping, Parks
- 8+ nearby places with: icon, name, type, distance, rating, price range, open/closed status, tags
- "Get Directions" button per place
- Map visualization (mock grid in mockup phase, real map in production via react-native-maps)

### 9.4 AI TRAVI Chat

**File:** `app/(live)/chat.tsx`

| Aspect | Specification |
|--------|--------------|
| Messages | User (right, gradient bg) + TRAVI (left, with logo avatar) |
| Typing Indicator | 3 animated dots |
| Smart Triggers | Keywords: restaurant, weather, hotel, transport, itinerary, spending, emergency, points, souvenirs |
| Suggestion Chips | "Best food nearby", "Today's plan", "Weather today", "How to get around", "My points", "Emergency info" |
| AI Backend | GPT-4o with context: DNA profile, current trip, current location, current day/time |

### 9.5 Expenses & Split Payment

**Files:** `app/(live)/expenses.tsx`, `split-payment.tsx`, `split.tsx`

**Expense Tracking:**
- Donut chart: visual breakdown by category (Food, Transport, Hotel, Activity, Shopping)
- Summary card: total spent, my share, expenses count
- Category filter tabs
- Expense cards: category icon, title, amount, paid by, split details, date
- Add Expense Modal: title, amount, category picker, paid by, split among

**Split Payment:**
- Split modes: Equal, Custom, Percentage, Shares
- Participant rows: avatar, name, amount, percentage, owed/owe balance
- Payment methods: Visa, Apple Pay, TRAVI Points
- Settle Up button → success modal

### 9.6 Trip Summary (Post-Trip)

**File:** `app/(live)/trip-summary.tsx`

| Section | Content |
|---------|---------|
| Cover Image | Full-bleed destination photo |
| Trip Stats | Distance traveled, activities completed, restaurants visited, photos taken |
| Highlights | 3 items with photo, emoji, title, rating, personal note |
| Memories Grid | 6-photo grid |
| Badges | 4 earned achievements (e.g., "Flew 11,000+ km", "Foodie Explorer") |
| DNA Match Score | Percentage match between DNA prediction and actual experience |
| Share | Share trip summary (social media) |
| Rate | Star rating + text feedback |
| CTA | "Plan Next Trip" |

---

## 10. Feature Specifications — Wallet & Points System

### 10.1 Current Implementation

**File:** `app/(tabs)/wallet.tsx`

| Section | Content |
|---------|---------|
| Points Hero | Balance, travel value ($), tier badge, progress bar to next tier |
| Tier System | Explorer → Adventurer → Globetrotter → Elite Nomad |
| Stats Row | Lifetime Saved, Trips Rewarded, Cashback Rate |
| 3 Tabs | Overview (earn rules), Redeem (6 reward options), History (transactions) |

### 10.2 Enhanced Wallet (Target State)

**Multi-Currency Support:**

| Currency | Code | Symbol |
|----------|------|--------|
| US Dollar | USD | $ |
| Euro | EUR | E |
| British Pound | GBP | L |
| Israeli Shekel | ILS | S |
| UAE Dirham | AED | د.إ |
| Japanese Yen | JPY | ¥ |
| Australian Dollar | AUD | A$ |
| Canadian Dollar | CAD | C$ |
| Swiss Franc | CHF | CHF |
| Singapore Dollar | SGD | S$ |
| Hong Kong Dollar | HKD | HK$ |
| New Zealand Dollar | NZD | NZ$ |

**KYC Verification Levels:**

| Level | Requirements | Limits |
|-------|-------------|--------|
| Basic (Level 1) | Email + phone verified | $500/month spend |
| Enhanced (Level 2) | ID document + selfie | $5,000/month spend |
| Premium (Level 3) | Address proof + bank verification | Unlimited |

**Payment Methods:**
- Credit/debit cards (Visa, Mastercard, Amex)
- Bank transfer
- Apple Pay / Google Pay
- TRAVI Points (as payment method)

**Transaction Types:**
credit, debit, booking_payment, refund, reward, cashback, fee, transfer_in, transfer_out, exchange, penalty, bonus

### 10.3 Gamification — 5-Tier XP System

| Tier | XP Required | Cashback Rate | Badge | Perks |
|------|------------|---------------|-------|-------|
| Bronze | 0 | 1% | Bronze shield | Basic features |
| Silver | 1,000 | 2% | Silver shield | Priority support |
| Gold | 5,000 | 3% | Gold shield | Free cancellation |
| Platinum | 15,000 | 4% | Platinum shield | Lounge access |
| Diamond | 50,000 | 5% | Diamond shield | Personal concierge |

**XP Earning Rules:**
- Complete booking: 100 XP per $100 spent
- Complete Quick DNA: 250 XP
- Complete First Class DNA: 500 XP
- Refer a friend: 200 XP
- Leave a review: 50 XP
- Complete a trip: 300 XP
- Birthday bonus: 200 XP
- 7-day streak: 100 XP

### 10.4 Subscription Tiers

**File:** `app/(tabs)/subscription.tsx`

| Plan | Price | Key Features |
|------|-------|-------------|
| **Explorer (Free)** | $0 | 3 trips/year, basic AI, 1x points, community, 2 price alerts |
| **Adventurer** | $9.99/mo | Unlimited trips, advanced AI, 2x points, unlimited alerts, full split bill, priority support, 30% deals |
| **Elite Nomad** | $24.99/mo | Everything + GPT-4 Turbo, 5x points, 60% deals, lounge access, 24/7 concierge, insurance, private trips |

Annual billing saves 20%.

---

## 11. Feature Specifications — Social & Community

### 11.1 Travel Partner Discovery

**File:** `app/(tabs)/connecting.tsx`

| Section | Content |
|---------|---------|
| 3 Tabs | Discover / Requests / My Trips |
| Traveler Cards | Avatar, name, age, location, DNA type badge, bio, destination chips, dates, mutual friends, verified badge |
| DNA Matching | Color-coded by DNA compatibility |
| Connect | "Connect" button → sends request |
| Requests | Pending requests with accept/decline |

### 11.2 Referral Program

**File:** `app/(tabs)/refer.tsx`

| Section | Content |
|---------|---------|
| Hero | "Share the Adventure" — invite friends, earn 500 points each |
| Stats | Friends joined, points earned, until Elite tier |
| Referral Code | Large display (TRAVI-{NAME}{NUM}), copy button with feedback |
| Share Via | WhatsApp, Instagram, Copy Link, More |
| Rewards | 500 pts/referral, free month after 5, Elite upgrade after 10 |
| Friends List | Referred friends with status (completed/pending), date, reward |

### 11.3 Notifications

**File:** `app/(tabs)/notifications.tsx`

| Type | Visual | Action |
|------|--------|--------|
| Price Drop | Destination photo, % drop | "Book Now" button |
| Trip Reminder | Days countdown | Navigate to trip |
| Friend Joined | Avatar + name | View profile |
| Points Earned | Amount badge | Navigate to wallet |
| TRAVI Tip | Lightbulb icon | Dismiss |
| Booking Confirmation | Checkmark | View booking |

---

## 12. Feature Specifications — Destination Guides & Events

### 12.1 Destination Guide Template

**File:** `app/(tabs)/destination-guide.tsx`

| Section | Content |
|---------|---------|
| Hero | Full-bleed destination photo + flag + name + country |
| Quick Stats | Temperature, currency, language, timezone |
| 4 Tabs | Overview, Culture, Food, Tips |
| Overview | Description, region selector, region detail card (type, budget, duration, climate, highlights), "Plan Trip" CTA |
| Culture | Icon cards: dress code, customs, religious considerations, photography rules, alcohol policy |
| Food | Dish cards: name, description, price range |
| Tips | Icon cards: Israeli traveler tips (kosher, Shabbat, security), safety, money tips, best time to visit |

**Implemented Destinations:** Dubai (UAE), Barcelona (Spain)
**Planned:** Tokyo, Bali, Paris, Rome, Amsterdam, Santorini, Iceland, Machu Picchu + all DNA destinations

### 12.2 Dubai Cultural Guide (NEW — to build)

| Section | Content |
|---------|---------|
| Islamic Values | Modest dress, Ramadan rules, Friday customs |
| Prayer Times Widget | 5 daily prayer times with countdown to next |
| Halal & Kosher | Restaurant list with ratings, location, dietary tags |
| Local Customs | Handshake etiquette, photography, alcohol, PDA rules |
| Language Tips | 10 Arabic phrases + pronunciation + translation |
| Emergency | Police (999), ambulance (998), embassy numbers |

### 12.3 Events & Carnival Hub

**File:** `app/(tabs)/events.tsx`

| Section | Content |
|---------|---------|
| Stats Row | Events count, countries, expected attendance |
| Country Filter | All, Brazil, Colombia, Uruguay, Bolivia |
| Category Filter | Parade, Block Party, Concert, Workshop, Cultural (color-coded) |
| Event Cards | Photo, name, city, dates, price range, category badge, attendance |
| Expanded Card | Description, budget guide (3 tiers), highlights, weather, "Add to Trip" CTA |
| Language Tips | 5 essential phrases with pronunciation |

**Events Data:** 5 events (Rio Carnival, Barranquilla, Oruro, Montevideo, Sao Paulo Street Carnival)

---

## 13. Feature Specifications — Real Estate Module

### 13.1 Real Estate Hub

**File:** `app/(tabs)/real-estate.tsx`

| Section | Content |
|---------|---------|
| City Toggle | Dubai / Abu Dhabi |
| Market Insights | Avg price/sqft, avg yield %, listings count |
| Trend Badge | YoY growth percentage |
| Filters | Developer (Emaar, DAMAC, Meraas, Nakheel), Type (Apartment, Villa, Studio, Penthouse) |
| Property Cards | Photo, developer badge, yield badge, name, type, bedrooms, completion date, price, payment plan, amenities |
| CTA | "Schedule Consultation" |

### 13.2 Property Detail (NEW — to build)

| Section | Content |
|---------|---------|
| Gallery | 4-5 photos horizontal scroll |
| Header | Name + developer + map location |
| Price | Price + payment plan (40/60, 50/50) |
| Specs | Area sqm, bedrooms, floor, completion date |
| ROI Calculator | Monthly rental, annual yield, break-even point |
| Amenities | Pool, gym, parking, security, etc. |
| CTAs | "Request Info" / "Schedule Visit" / "Share" |

### 13.3 Investment Guide for Israeli Investors (NEW — to build)

| Section | Content |
|---------|---------|
| Legal Process | Step-by-step UAE property purchase for foreigners |
| Golden Visa | Requirements, benefits, process |
| Tax Implications | UAE (0% income tax) vs. Israel tax obligations |
| Banking | Opening UAE bank account, transfer regulations |
| Rental Management | Short-term vs. long-term, management companies |
| CTA | "Talk to Expert" |

---

## 14. Feature Specifications — B2B Enterprise Suite

### 14.1 Enterprise Dashboard

**File:** `app/(tabs)/enterprise.tsx`

| Tab | Content |
|-----|---------|
| **Overview** | KPI grid (total trips, avg savings, satisfaction, compliance), quick actions (analytics, employees, travel requests, settings), recent activity feed |
| **Analytics** | Time range selector (7d/30d/90d), metrics grid (avg trip cost, booking lead time, policy compliance, preferred hotel %), cost breakdown bar chart with legend |

### 14.2 Revenue Dashboard (NEW — to build)

| Section | Content |
|---------|---------|
| KPI Cards | MRR ($), CAC ($), CLV ($), Churn Rate (%) |
| Revenue Chart | Line graph — 6 months trend |
| Conversion | Trial→Paid rate, Free→Premium rate |
| Pricing Tiers | TraVendors cards ($29/$99/$200 per month) |
| Quick Actions | Generate Report, Refresh Data |

### 14.3 Competitor Analysis

**File:** `app/(tabs)/competitors.tsx`

| Mode | Content |
|------|---------|
| **Overview** | Strengths (green dots), Weaknesses (red dots), TRAVI Advantage card |
| **Journey** | Numbered step flow of competitor user journey + TRAVI journey comparison |
| **Frictions** | Friction point cards with severity dots (1-3), "How TRAVI Solves This" card |

**Competitors:** TripAdvisor (28%), Airbnb Exp. (18%), Viator (15%), GetYourGuide (12%), Klook (10%)

### 14.4 Prospects / Sales CRM (NEW — to build)

| Section | Content |
|---------|---------|
| Header | "Prospects" + "Add Prospect" button |
| Search | Search by company name or contact |
| Filters | Company type: Hotels, DMCs, Tour Operators, Travel Agencies, Airlines |
| Prospect Cards | Company name, contact person, type badge, status, last contact date |
| Bulk Actions | Export CSV, Delete, Tag |
| Add Modal | Company, contact, email, phone, type, notes |

### 14.5 Regulations Tracker (NEW — to build)

| Section | Content |
|---------|---------|
| Search | Text search + status filter |
| Status Distribution | Pie chart (Compliant / Non-Compliant / Pending) |
| Regulation Cards | Title, type badge, compliance status (green/yellow/red), last updated |
| Detail Modal | Description, requirements list, penalties, deadline, update status button |

---

## 15. Feature Specifications — Support & Help Center

**File:** `app/(tabs)/support.tsx`

### 15.1 FAQ Tab
- 8 expandable accordion items covering: DNA Quiz, Points, Trip changes, Split Bill, Subscriptions, Price Alerts, Security, Referrals
- Tap to expand/collapse with rotation animation

### 15.2 Contact Tab
- Category dropdown: General, Booking, Points, Live Trip, Payment, Account
- Priority selector: Low (green), Medium (yellow), High (red)
- Subject line input
- Message textarea (multiline)
- "Send Message" gradient CTA
- Email fallback: support@travi.world

### 15.3 Tickets Tab
- Ticket cards: ID, category badge, status badge (open/in_progress/resolved/closed), title, date
- Color-coded statuses: open (blue), in_progress (orange), resolved (green), closed (gray)
- Empty state with icon for new users

---

## 16. Technical Architecture

### 16.1 Frontend Architecture

**Rendering Strategy:**
- React Native with Expo managed workflow
- File-based routing via Expo Router
- Route groups: `(auth)`, `(tabs)`, `(trip)`, `(live)`, `(social)`
- Hidden tabs for sub-screens (href: null in tab layout)
- Dark theme only (userInterfaceStyle: "dark")

**State Management:**
- Client state: React Context + useReducer (lib/store.tsx)
  - 12 action types for auth, profile, trips, points, notifications, alerts, expenses
  - AsyncStorage persistence with automatic hydration
  - Storage key: "travi_app_state"
- Server state: TanStack React Query
  - Stale time: varies by data type (30s for real-time, 5min for static)
  - Automatic background refetch
  - Optimistic updates for mutations

**API Communication:**
- tRPC v11 with httpBatchLink
- SuperJSON transformer for dates, Maps, Sets
- JWT Bearer token in Authorization header
- HTTP-only cookies for web platform
- 30-second timeout, 3 retry attempts for failures

**Animations:**
- React Native Animated API (primary)
- React Native Reanimated for gesture-based animations
- Expo Haptics for tactile feedback on all interactive elements
- Animation durations: 80-600ms depending on context

### 16.2 Backend Architecture

**Server Setup:**
- Express.js on Node.js
- 50MB body size limit
- CORS with origin reflection and credentials
- tRPC middleware at /api/trpc
- Static file serving for assets
- Health check at /api/health

**Authentication Flow:**
```
1. User signs up → POST /api/auth/register
2. Server creates user → hashes password (bcrypt)
3. Server generates JWT (jose library) → returns token
4. Client stores token in SecureStore (mobile) or HTTP-only cookie (web)
5. All subsequent requests include Bearer token
6. Token refresh: automatic on 401 response
7. Guest flow: guestToken in AsyncStorage, no full auth required
```

**Error Handling:**
- Custom error classes: APIError, NetworkError, AuthError
- 4xx errors: not retried, returned to client
- 5xx errors: retried 3x with exponential backoff (1s, 2s, 4s)
- Network errors: detected via NetInfo, shown as offline state

### 16.3 Real-time Architecture (Phase 5)

```
Client ←→ Socket.IO Server
  │
  ├── trip:{tripId}:activity:update   # Activity status changes
  ├── trip:{tripId}:expense:add       # New expense added
  ├── trip:{tripId}:location:share    # Traveler location sharing
  ├── trip:{tripId}:chat:message      # Group chat messages
  └── user:{userId}:notification      # Push notification relay
```

---

## 17. Database Schema

### 17.1 Core Tables

```sql
-- 1. Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  avatar VARCHAR(255),
  is_guest INTEGER DEFAULT 0,
  guest_token VARCHAR(255),
  journey_step INTEGER DEFAULT 1,
  xp_points INTEGER DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'bronze',
  subscription_plan VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Trips
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  destination VARCHAR(255) NOT NULL,
  destination_code VARCHAR(10),
  country VARCHAR(255),
  start_date DATE,
  end_date DATE,
  travelers INTEGER DEFAULT 1,
  budget DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft', -- draft/upcoming/active/completed
  interests TEXT[],
  landmarks TEXT[],
  flight_data JSONB,
  hotel_data JSONB,
  total_cost DECIMAL(10,2),
  points_earned INTEGER DEFAULT 0,
  cover_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Itinerary Items
CREATE TABLE itinerary_items (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id),
  day INTEGER NOT NULL,
  time VARCHAR(10),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50), -- food/activity/hotel/transport
  location VARCHAR(255),
  duration VARCHAR(50),
  price DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending', -- pending/confirmed/completed
  sort_order INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Wallet Transactions
CREATE TABLE wallet_transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(30) NOT NULL, -- credit/debit/booking_payment/refund/reward/cashback/fee/transfer/exchange
  status VARCHAR(20) DEFAULT 'pending', -- pending/processing/completed/failed/cancelled
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  category VARCHAR(30), -- cashback/referral/promo/withdrawal/booking
  description TEXT,
  reference_id VARCHAR(255),
  payment_method_id VARCHAR(255),
  exchange_rate DECIMAL(10,6),
  original_amount DECIMAL(10,2),
  original_currency VARCHAR(3),
  fee DECIMAL(10,2),
  trip_id INTEGER REFERENCES trips(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. DNA Sessions
CREATE TABLE dna_sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  guest_token VARCHAR(255),
  assessment_type VARCHAR(20) NOT NULL, -- quick/first_class
  status VARCHAR(20) DEFAULT 'started', -- started/completed
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- 6. Quick DNA Results
CREATE TABLE quick_dna_results (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES dna_sessions(id),
  selected_categories TEXT[],
  liked_item_ids TEXT[],
  liked_items_details JSONB,
  category_details JSONB,
  travel_style_scores JSONB, -- {adventure:0-10, luxury:0-10, cultural:0-10, ...}
  primary_style VARCHAR(30),
  budget_style VARCHAR(20),
  trip_days INTEGER DEFAULT 3,
  schedule_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. First Class DNA Results
CREATE TABLE first_class_dna_results (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES dna_sessions(id),
  module_1_data JSONB, -- Identity
  module_2_data JSONB, -- Crisis
  module_3_data JSONB, -- Money
  module_4_data JSONB, -- Visual
  module_5_data JSONB, -- Brand
  module_6_data JSONB, -- Social
  module_7_data JSONB, -- Sensory
  module_8_data JSONB, -- Future
  module_9_data JSONB, -- AI Challenge
  dna_scores JSONB, -- {explorer:0-100, relaxer:0-100, ...}
  processed_preferences JSONB,
  completion_time_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. User Calibration (Learning)
CREATE TABLE user_calibration (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),
  style_choices TEXT[],
  pace_preference INTEGER, -- 0-100
  do_categories TEXT[],
  dont_categories TEXT[],
  budget_style VARCHAR(20),
  companions VARCHAR(20),
  is_complete INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. Learning Events (Implicit)
CREATE TABLE learning_events (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),
  trip_id INTEGER REFERENCES trips(id),
  event_type VARCHAR(50), -- item_liked/item_removed/day_reordered/filter_applied/search/view_duration
  event_data JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- 10. User Preferences
CREATE TABLE user_preferences (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  trip_id INTEGER REFERENCES trips(id),
  styles TEXT[],
  pace INTEGER, -- 0-100
  liked_image_ids INTEGER[],
  dietary_restrictions TEXT[],
  accessibility_needs TEXT[],
  preferred_transport TEXT[],
  cultural_interests TEXT[],
  seasonal_preferences TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- 11. Trip Reflections
CREATE TABLE trip_reflections (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id),
  user_id UUID REFERENCES users(id),
  highlight_moment TEXT,
  would_change_moment TEXT,
  nps_score INTEGER, -- 0-10
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 12. Conversations (AI Chat)
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  trip_id INTEGER REFERENCES trips(id),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 13. Messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- system/user/assistant
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 14. Payment Methods
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(20) NOT NULL, -- credit_card/debit_card/bank_transfer/apple_pay/google_pay
  is_default BOOLEAN DEFAULT false,
  card_brand VARCHAR(20),
  card_last4 VARCHAR(4),
  card_expiry_month INTEGER,
  card_expiry_year INTEGER,
  card_holder_name VARCHAR(255),
  stripe_payment_method_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 15. Support Tickets
CREATE TABLE support_tickets (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  category VARCHAR(30) NOT NULL,
  priority VARCHAR(10) DEFAULT 'medium',
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open', -- open/in_progress/resolved/closed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 16. Referrals
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  referral_code VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending/completed
  reward_points INTEGER DEFAULT 500,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 17. Price Alerts
CREATE TABLE price_alerts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  destination VARCHAR(255) NOT NULL,
  destination_code VARCHAR(10),
  max_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2),
  is_triggered BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  triggered_at TIMESTAMP
);
```

### 17.2 Indexes

```sql
CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_itinerary_trip ON itinerary_items(trip_id);
CREATE INDEX idx_wallet_user ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_type ON wallet_transactions(type);
CREATE INDEX idx_dna_user ON dna_sessions(user_id);
CREATE INDEX idx_learning_user ON learning_events(user_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_alerts_user ON price_alerts(user_id);
CREATE INDEX idx_tickets_user ON support_tickets(user_id);
CREATE INDEX idx_referrals_code ON referrals(referral_code);
```

---

## 18. API Design

### 18.1 tRPC Router Structure

```typescript
// Root router
appRouter = {
  auth: {
    me: publicProcedure.query(),           // Get current user
    register: publicProcedure.mutation(),   // Create account
    login: publicProcedure.mutation(),      // Login
    logout: protectedProcedure.mutation(),  // Clear session
    refreshToken: publicProcedure.mutation(),
  },
  guest: {
    init: publicProcedure.mutation(),       // Create guest session
    convert: protectedProcedure.mutation(), // Convert guest to full user
  },
  dna: {
    startSession: protectedProcedure.mutation(), // Start DNA assessment
    submitQuick: protectedProcedure.mutation(),   // Submit Quick DNA results
    submitFirstClass: protectedProcedure.mutation(),
    getProfile: protectedProcedure.query(),      // Get DNA profile
    getRecommendations: protectedProcedure.query(),
    analyzeQuickDna: protectedProcedure.mutation(), // AI pre-fill
  },
  trips: {
    list: protectedProcedure.query(),
    getById: protectedProcedure.query(),
    create: protectedProcedure.mutation(),
    update: protectedProcedure.mutation(),
    delete: protectedProcedure.mutation(),
    setActive: protectedProcedure.mutation(),
    getItinerary: protectedProcedure.query(),
    addItineraryItem: protectedProcedure.mutation(),
    updateItineraryItem: protectedProcedure.mutation(),
    reflect: protectedProcedure.mutation(), // Post-trip reflection
  },
  wallet: {
    getBalance: protectedProcedure.query(),
    getTransactions: protectedProcedure.query(),
    addPoints: protectedProcedure.mutation(),
    spendPoints: protectedProcedure.mutation(),
    addPaymentMethod: protectedProcedure.mutation(),
    getPaymentMethods: protectedProcedure.query(),
    exchange: protectedProcedure.mutation(), // Currency exchange
  },
  bookings: {
    searchFlights: protectedProcedure.query(),
    searchHotels: protectedProcedure.query(),
    book: protectedProcedure.mutation(),
    cancel: protectedProcedure.mutation(),
    getConfirmation: protectedProcedure.query(),
  },
  ai: {
    tip: protectedProcedure.mutation(),    // Page-specific tip
    chat: protectedProcedure.mutation(),   // Contextual chat
    analyzeDna: protectedProcedure.mutation(),
    suggestFlights: protectedProcedure.mutation(),
    suggestHotels: protectedProcedure.mutation(),
    suggestExperiences: protectedProcedure.mutation(),
  },
  social: {
    discover: protectedProcedure.query(),  // Find travelers
    connect: protectedProcedure.mutation(),
    getConnections: protectedProcedure.query(),
    getReferralCode: protectedProcedure.query(),
    submitReferral: protectedProcedure.mutation(),
  },
  notifications: {
    list: protectedProcedure.query(),
    markRead: protectedProcedure.mutation(),
    updateSettings: protectedProcedure.mutation(),
  },
  priceAlerts: {
    list: protectedProcedure.query(),
    create: protectedProcedure.mutation(),
    delete: protectedProcedure.mutation(),
    toggle: protectedProcedure.mutation(),
  },
  support: {
    getFaq: publicProcedure.query(),
    submitTicket: protectedProcedure.mutation(),
    getTickets: protectedProcedure.query(),
    updateTicket: protectedProcedure.mutation(),
  },
  enterprise: {
    getDashboard: protectedProcedure.query(),
    getAnalytics: protectedProcedure.query(),
    getEmployees: protectedProcedure.query(),
    getTravelRequests: protectedProcedure.query(),
    approveTravelRequest: protectedProcedure.mutation(),
  },
}
```

### 18.2 External API Integrations

| Service | Purpose | Endpoint |
|---------|---------|----------|
| **OpenAI GPT-4o** | AI chat, DNA analysis, recommendations | api.openai.com |
| **Stripe** | Payments, subscriptions, webhooks | api.stripe.com |
| **Amadeus / Duffel** | Flight search & booking | (to be selected) |
| **Booking.com** | Hotel search & booking | (affiliate API) |
| **OpenWeather** | Live weather data | api.openweathermap.org |
| **Google Maps** | Geocoding, nearby places, directions | maps.googleapis.com |
| **Expo Push** | Push notifications | exp.host/--/api/v2/push |

---

## 19. AI/ML System

### 19.1 Architecture

```
User Input → Context Builder → GPT-4o → Response Parser → UI
                  │
                  ├── DNA Profile (8 dimensions)
                  ├── Current Trip (destination, dates, budget)
                  ├── Current Page (home, trip-builder, live-trip, etc.)
                  ├── User Location (if in live trip)
                  ├── Chat History (last 10 messages)
                  └── Time of Day / Season
```

### 19.2 AI Endpoints

| Endpoint | Model | Max Tokens | Temperature | Purpose |
|----------|-------|-----------|------------|---------|
| `/api/ai/tip` | gpt-4o-mini | 100 | 0.8 | Quick contextual tip |
| `/api/ai/chat` | gpt-4o | 200 | 0.8 | Full conversational chat |
| `/api/ai/analyze-dna` | gpt-4o | 500 | 0.3 | DNA profile analysis |
| `/api/ai/suggest-flights` | gpt-4o | 300 | 0.5 | Flight recommendations |
| `/api/ai/suggest-hotels` | gpt-4o | 300 | 0.5 | Hotel recommendations |
| `/api/ai/suggest-experiences` | gpt-4o | 400 | 0.7 | Experience matching |
| `/api/dna/analyze-quick-dna` | gpt-4o | 600 | 0.3 | Pre-fill First Class from Quick |

### 19.3 System Prompt Template

```
You are TRAVI, a friendly and knowledgeable travel assistant.
You speak concisely (2-3 sentences max).
You know about Dubai, Israel, and global destinations.
You personalize based on user's Travel DNA:
- Adventure Level: {dna.adventureLevel}/100
- Luxury Preference: {dna.luxuryPreference}/100
- Cultural Curiosity: {dna.culturalCuriosity}/100
- Social Level: {dna.socialLevel}/100
- Planning Style: {dna.planningStyle}/100 (0=spontaneous, 100=detailed)

Current context: User is on {currentPage} page.
{tripContext if applicable}
```

### 19.4 Fallback Strategy

When AI is unavailable (no API key, rate limit, network error):
- Pre-built tip database per page (5-10 tips per page)
- Random selection from relevant tips
- No visible error to user — seamless degradation

---

## 20. Payment & Financial Infrastructure

### 20.1 Stripe Integration

| Feature | Implementation |
|---------|---------------|
| **One-time Payments** | Stripe PaymentIntents for bookings |
| **Subscriptions** | Stripe Subscriptions for Adventurer/Elite plans |
| **Webhooks** | Managed webhook via Replit (or custom endpoint) |
| **Customer Creation** | Auto-create Stripe customer on first payment |
| **Multi-currency** | Stripe multi-currency with automatic conversion |
| **Refunds** | Full and partial refunds via Stripe API |
| **Disputes** | Webhook handler for dispute notifications |

### 20.2 Commission Model

| Booking Type | Commission | Points Earned |
|-------------|-----------|---------------|
| Flights | 5% | 5% of price in points |
| Hotels | 5% | 5% of price in points |
| Activities | 3% | 3% of price in points |
| Insurance | 10% | None |
| Car Rental | 8% | 3% in points |

### 20.3 Points Economy

| Action | Points Earned | XP Earned |
|--------|-------------|-----------|
| Book flight ($100) | 500 pts ($5 value) | 100 XP |
| Book hotel ($100) | 500 pts ($5 value) | 100 XP |
| Book activity ($100) | 300 pts ($3 value) | 100 XP |
| Complete Quick DNA | 250 pts | 250 XP |
| Complete First Class DNA | 500 pts | 500 XP |
| Refer friend | 500 pts | 200 XP |
| Leave review | 50 pts | 50 XP |
| Complete trip | 200 pts | 300 XP |
| Birthday | 200 pts | 200 XP |
| 7-day streak | 100 pts | 100 XP |

**Points Value:** 100 points = $1 travel credit

---

## 21. Security & Data Protection

### 21.1 Authentication Security

| Measure | Implementation |
|---------|---------------|
| Password Hashing | bcrypt with salt rounds = 12 |
| JWT Tokens | RS256 algorithm, 15-min access token, 7-day refresh token |
| Token Storage | SecureStore (mobile), HTTP-only cookies (web) |
| OAuth | Google/Apple with PKCE flow |
| Rate Limiting | 10 login attempts per 15 minutes per IP |
| Session Management | Server-side session with express-session |

### 21.2 Data Protection

| Measure | Implementation |
|---------|---------------|
| Encryption at Rest | AES-256 for sensitive data |
| Encryption in Transit | TLS 1.3 |
| PII Handling | Email, phone encrypted in DB |
| Payment Data | Never stored — Stripe handles all card data (PCI DSS compliant) |
| Data Retention | User data: retained until deletion request. Trip data: 3 years. |
| Right to Deletion | GDPR Article 17 compliant endpoint |
| Data Export | GDPR Article 20 compliant endpoint |

### 21.3 UAE Data Protection Compliance

Per Federal Decree-Law No. 45 of 2021:
- Explicit user consent for data processing
- Data localization for UAE-specific sensitive data
- Cross-border transfer restrictions — Standard Contractual Clauses required
- 72-hour breach notification to authorities
- Appointment of Data Protection Officer if >20 employees

### 21.4 Application Security

| Category | Measure |
|----------|---------|
| Input Validation | Zod schemas on all API inputs |
| SQL Injection | Drizzle ORM (parameterized queries) |
| XSS | React Native's built-in escaping + no dangerouslySetInnerHTML |
| CSRF | SameSite cookies + CSRF tokens |
| API Security | tRPC protectedProcedure middleware + JWT verification |
| Dependency Security | npm audit in CI, Snyk scanning |
| Secret Management | Environment variables, never in code |

---

## 22. Testing Strategy

### 22.1 Test Pyramid

```
          ┌────────────┐
          │    E2E     │  10% — Critical user flows
          │  (Detox)   │
          ├────────────┤
          │ Integration │  30% — API + DB
          │  (Vitest)   │
          ├────────────┤
          │    Unit     │  60% — Business logic, utils
          │  (Vitest)   │
          └────────────┘
```

### 22.2 Unit Tests (Vitest)

| Target | Tests |
|--------|-------|
| DNA Scoring Algorithm | Score calculation, normalization, edge cases |
| Points Engine | Earn rules, spend rules, tier progression |
| Store Reducers | All 12 action types, state transitions |
| Validation Schemas | Zod schema validation for all inputs |
| Utils | Date formatting, currency formatting, distance calculation |

### 22.3 Integration Tests

| Target | Tests |
|--------|-------|
| tRPC Routers | All procedures with test database |
| Auth Flow | Register → verify → login → refresh → logout |
| Trip CRUD | Create → update → add itinerary → complete |
| Wallet | Add points → spend → check balance |
| DNA Flow | Start session → submit → get profile |

### 22.4 E2E Tests (Detox)

| Flow | Steps |
|------|-------|
| Onboarding | Splash → Sign up → Verify → Profile → Welcome → Quiz → Result → Home |
| Trip Planning | Home → Plan → Interests → Dates → Flights → Hotels → Summary → Book |
| Live Trip | Navigate to live → View itinerary → Open chat → Add expense → Split payment |
| Wallet | View balance → Redeem points → Check history |

### 22.5 CI Pipeline

```yaml
# GitHub Actions: ci.yml
jobs:
  security:
    - npm audit
    - Snyk vulnerability scan
    - CodeQL analysis
  lint:
    - ESLint
    - TypeScript check (tsc --noEmit)
    - Prettier format check
  unit-tests:
    - Vitest with coverage (>80% target)
  integration-tests:
    - PostgreSQL service container
    - API endpoint tests
  mobile-build:
    - Android Gradle build
    - iOS build (on macOS runner)
  e2e-tests:
    - Detox tests on emulator
```

---

## 23. Deployment & Infrastructure

### 23.1 Environments

| Environment | Purpose | URL |
|------------|---------|-----|
| Development | Local development | localhost:3000 / localhost:8081 |
| Staging | Pre-release testing | staging.travi.world |
| Production | Live application | api.travi.world |

### 23.2 Infrastructure (AWS)

```
                    ┌─────────────────┐
                    │   CloudFront    │  CDN
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │    ALB          │  Load Balancer
                    └────────┬────────┘
                             │
               ┌─────────────┼─────────────┐
               │             │             │
     ┌─────────▼───┐ ┌──────▼──────┐ ┌────▼─────────┐
     │  ECS Task 1 │ │ ECS Task 2  │ │ ECS Task 3   │
     │  (API)      │ │ (API)       │ │ (Worker)     │
     └─────────┬───┘ └──────┬──────┘ └────┬─────────┘
               │             │             │
               └─────────────┼─────────────┘
                             │
                    ┌────────▼────────┐
                    │   RDS           │  PostgreSQL 16
                    │   (Multi-AZ)    │
                    └─────────────────┘
```

### 23.3 Mobile Deployment

| Platform | Distribution |
|----------|-------------|
| iOS | TestFlight (beta) → App Store |
| Android | Internal testing → Google Play |
| Web | Expo web build → Vercel/CloudFront |

### 23.4 CD Pipeline

```yaml
# GitHub Actions: cd-staging.yml
jobs:
  deploy:
    - Terraform infrastructure provisioning
    - Docker image build + push to ECR
    - ECS service update
    - Drizzle database migrations
    - Expo OTA update (mobile)
    - Slack notification on success/failure
```

---

## 24. Development Phases & Timeline

### Phase 1 — Data Layer & Schema (Weeks 1-2)

| Task | Description | Effort |
|------|-------------|--------|
| 1.1 | Implement full Drizzle schema (17 tables) | 3 days |
| 1.2 | Write seed data script (replace hardcoded arrays) | 2 days |
| 1.3 | Implement tRPC routers: auth, trips, wallet, dna | 4 days |
| 1.4 | Connect all screens to tRPC (replace local state) | 3 days |
| 1.5 | Database migration pipeline (drizzle-kit) | 1 day |

**Exit Criteria:** All screens fetch data from PostgreSQL via tRPC. No hardcoded mock data.

### Phase 2 — Auth & User Journey (Weeks 2-3)

| Task | Description | Effort |
|------|-------------|--------|
| 2.1 | JWT auth with bcrypt password hashing | 2 days |
| 2.2 | OAuth integration (Google, Apple) | 3 days |
| 2.3 | Guest mode (guestToken, isGuest flow) | 2 days |
| 2.4 | Email verification (OTP via SendGrid/Resend) | 1 day |
| 2.5 | 13-step journey progression system | 2 days |
| 2.6 | Feature gating based on journey step | 2 days |

**Exit Criteria:** Users can register, login, use guest mode. Journey progression tracks and gates features.

### Phase 3 — DNA Engine (Weeks 3-4)

| Task | Description | Effort |
|------|-------------|--------|
| 3.1 | Quick DNA swipe UI (116 items, 11 categories) | 4 days |
| 3.2 | 8-dimension scoring algorithm | 2 days |
| 3.3 | DNA result visualization (circle, traits, fun facts) | 2 days |
| 3.4 | AI pre-fill from Quick DNA to First Class | 2 days |
| 3.5 | Matching engine (destination scoring, confidence) | 3 days |
| 3.6 | DNA session persistence (DB) | 1 day |

**Exit Criteria:** Quick DNA works end-to-end. Recommendations are DNA-matched with confidence scores.

### Phase 4 — Booking & Payments (Weeks 4-6)

| Task | Description | Effort |
|------|-------------|--------|
| 4.1 | Stripe integration (PaymentIntents, Subscriptions) | 3 days |
| 4.2 | Flight search API (Amadeus/Duffel) | 3 days |
| 4.3 | Hotel search API (Booking.com affiliate) | 3 days |
| 4.4 | Multi-currency wallet (12 currencies, exchange) | 3 days |
| 4.5 | KYC verification flow (3 levels) | 2 days |
| 4.6 | Points engine (earn rules, spend, tier progression) | 2 days |
| 4.7 | 5-tier XP/gamification system | 2 days |
| 4.8 | Subscription management (3 tiers + annual billing) | 2 days |

**Exit Criteria:** Users can search, book, and pay for flights/hotels. Points earned automatically. Subscriptions work.

### Phase 5 — Real-time & Live Trip (Weeks 6-7)

| Task | Description | Effort |
|------|-------------|--------|
| 5.1 | Socket.IO server setup | 1 day |
| 5.2 | Real-time itinerary sync | 2 days |
| 5.3 | Location services (react-native-maps) | 2 days |
| 5.4 | Weather API integration (OpenWeather) | 1 day |
| 5.5 | AI Chat with trip context (GPT-4o) | 3 days |
| 5.6 | Push notifications (Expo Notifications) | 2 days |
| 5.7 | Price alert monitoring (background job) | 1 day |

**Exit Criteria:** Live trip shows real weather, real map, working AI chat. Push notifications deliver.

### Phase 6 — B2B Features (Weeks 7-8)

| Task | Description | Effort |
|------|-------------|--------|
| 6.1 | Enterprise dashboard with real data pipeline | 3 days |
| 6.2 | Revenue tracking (Stripe MRR/CAC/CLV) | 2 days |
| 6.3 | Prospects CRM (CRUD, filters, export) | 3 days |
| 6.4 | Regulations tracker (compliance engine) | 2 days |
| 6.5 | Real estate API integration | 2 days |

**Exit Criteria:** Enterprise users see real metrics. CRM is functional. Compliance tracks regulations.

### Phase 7 — Testing & Security (Weeks 8-9)

| Task | Description | Effort |
|------|-------------|--------|
| 7.1 | Unit tests (>80% coverage on business logic) | 3 days |
| 7.2 | Integration tests (all tRPC routers) | 3 days |
| 7.3 | E2E tests (Detox — 4 critical flows) | 3 days |
| 7.4 | Security audit (OWASP top 10 review) | 2 days |
| 7.5 | Accessibility audit (screen reader, contrast) | 1 day |
| 7.6 | Performance optimization (memoization, virtualization) | 2 days |

**Exit Criteria:** 80%+ test coverage. Zero critical security issues. WCAG 2.1 AA compliance.

### Phase 8 — Deploy & Launch (Weeks 9-10)

| Task | Description | Effort |
|------|-------------|--------|
| 8.1 | CI/CD pipeline (GitHub Actions) | 2 days |
| 8.2 | Terraform infrastructure (AWS) | 3 days |
| 8.3 | Staging environment setup | 1 day |
| 8.4 | Production database provisioning | 1 day |
| 8.5 | Expo builds (Android APK + iOS TestFlight) | 2 days |
| 8.6 | Monitoring (error tracking, uptime, performance) | 1 day |
| 8.7 | App Store submissions | 2 days |

**Exit Criteria:** App live on App Store + Google Play. Staging + production environments running. Monitoring active.

### Phase 9 — Growth & Optimization (Week 10+)

| Task | Description | Ongoing |
|------|-------------|---------|
| 9.1 | Referral program (viral loop) | Continuous |
| 9.2 | Content migration from travi.co.il | 2 weeks |
| 9.3 | SEO (programmatic destination pages) | Continuous |
| 9.4 | Waitlist landing page + email capture | 1 week |
| 9.5 | Analytics (Mixpanel/Amplitude) | Setup + continuous |
| 9.6 | A/B testing framework | Setup + continuous |

---

## 25. KPIs & Success Metrics

### 25.1 Pre-Launch KPIs

| Metric | Target | Timeline |
|--------|--------|----------|
| Waitlist Signups | 10,000+ | 16 weeks |
| Beta Testers | 200+ | Week 16 |
| Email Open Rate | 40%+ | Ongoing |
| Signup Rate | 15%+ | Ongoing |
| Viral Coefficient | 0.25+ | Ongoing |
| CAC | <$15 | Pre-launch |

### 25.2 Post-Launch KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| DAU / MAU | 20%+ | Monthly |
| Activation Rate (Day 1) | 40%+ | Weekly |
| Retention D7 | 30%+ | Weekly |
| Retention D30 | 15%+ | Monthly |
| DNA Quiz Completion | 60%+ of new users | Weekly |
| Trip Booking Rate | 10%+ of active users/month | Monthly |
| NPS Score | 50+ | Quarterly |
| App Store Rating | 4.5+ | Ongoing |
| Revenue per User (ARPU) | $15+/month | Monthly |
| Churn Rate | <5%/month | Monthly |

### 25.3 B2B KPIs

| Metric | Target |
|--------|--------|
| MRR (TRAVI Insights) | $10K within 6 months |
| MRR (TraVendors) | $5K within 6 months |
| B2B CAC | <$200 |
| B2B Churn | <3%/month |
| CLV:CAC Ratio | >3:1 |
| Trial → Paid Conversion | 20%+ |

---

## 26. Risk Assessment & Mitigation

### 26.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| AI API costs exceed budget | Medium | High | Rate limiting, caching, fallback tips, gpt-4o-mini for lower-priority calls |
| Expo build issues on native platforms | Medium | Medium | Progressive testing on both platforms, OTA updates for fixes |
| Real-time scalability | Low | High | Socket.IO clustering, Redis pub/sub for horizontal scaling |
| Third-party API downtime | Medium | Medium | Circuit breaker pattern, fallback data, graceful degradation |

### 26.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Competitor (OTA) copies DNA feature | Medium | High | 12-18 month head start, data moat from user profiles, niche focus |
| Low booking conversion | Medium | High | Optimize DNA matching accuracy, A/B test booking flows |
| UAE regulatory changes | Low | High | Legal counsel retainer, compliance monitoring, Dubai Internet City free zone |
| Seed funding delay | Medium | High | Maintain lean operations, prioritize core features |

### 26.3 Market Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Economic downturn affects travel | Low | High | B2B revenue as stabilizer, budget traveler segment |
| Currency fluctuation | Medium | Low | Multi-currency wallet, real-time exchange rates |
| Geopolitical instability | Medium | Medium | Multi-region deployment, no single-market dependency |

---

## 27. Legal & Regulatory Compliance

### 27.1 Corporate Structure

- **Entity:** TRAVI Technologies Ltd. (Israel)
- **Authorized Shares:** 10,000,000 at $0.01 par value
- **Share Classes:** Ordinary (Founder), Preferred A (Investors), Employee Options
- **Board:** 3-7 directors, 1 independent required, 1 investor seat
- **Free Zone:** Dubai Internet City (recommended for UAE operations)

### 27.2 UAE Compliance Budget

| Category | Initial (AED) | Annual (AED) |
|----------|--------------|-------------|
| Tourism Trading License | 25,000 | 10,000 |
| Professional Indemnity Insurance | 35,000 | 35,000 |
| Data Protection Registration | 15,000 | 8,000 |
| Payment Services Permit | 50,000 | 20,000 |
| Cyber Liability Insurance | 20,000 | 20,000 |
| **Total** | **145,000 (~$39,500)** | **93,000 (~$25,300)** |

### 27.3 Privacy & Data Protection

| Regulation | Requirement | Implementation |
|-----------|-------------|----------------|
| GDPR (EU users) | Consent, right to deletion, data portability | Consent management, deletion API, export API |
| UAE DPL (Decree-Law 45/2021) | Consent, localization, 72h breach notification | UAE data center, incident response plan |
| Israeli Privacy Protection Law | Registration with Privacy Authority, consent | Registration, consent flows |
| PCI DSS | Secure payment processing | Stripe (Level 1 PCI compliant) handles all card data |

### 27.4 Terms of Service Requirements

- Available in Arabic and English
- Transparent pricing (no hidden fees)
- Cancellation/refund policies (7-14 days)
- Customer complaint procedures
- Dispute resolution mechanism

---

## 28. Team Structure & Resource Plan

### 28.1 Current Team

| Role | Person | Equity |
|------|--------|--------|
| Founder & CEO | Moshe Ziv | 70% (7M shares) |

### 28.2 Hiring Plan (Post-Seed)

| Priority | Role | Equity Range | Monthly Cost | When |
|----------|------|-------------|-------------|------|
| 1 | CTO | 2-4% | $8K-$15K | Month 1 |
| 2 | Senior Full-Stack Developer | 0.1-0.5% | $5K-$8K | Month 1 |
| 3 | Mobile Developer (React Native) | 0.1-0.3% | $4K-$7K | Month 2 |
| 4 | Product Designer | 0.1-0.3% | $4K-$6K | Month 2 |
| 5 | Growth/Marketing Lead | 0.5-1% | $5K-$8K | Month 3 |
| 6 | Junior Developer | 0.02-0.1% | $3K-$5K | Month 4 |

**Employee Equity Pool:** 2,000,000 shares (20%)
- 4-year vesting, 1-year cliff
- Israeli Section 102 tax treatment available
- Double-trigger acceleration on change of control

### 28.3 Employment Terms (Israeli Law)

- Work hours: 42/week (Sunday-Thursday, 9:00-18:00)
- Probation: 2-6 months
- Pension: Employer deposit as per law
- Non-compete: 6 months, 50km radius
- IP: All work creations belong to company
- Termination notice: 1 month after probation

---

## Appendix A — Screen Inventory

### Total: 47 Implemented + 10 Planned = 57 Screens

**Implemented (47):**

| Group | Screen | File | Lines |
|-------|--------|------|-------|
| Auth | Splash | (auth)/splash.tsx | ~120 |
| Auth | Sign Up | (auth)/sign-up.tsx | ~280 |
| Auth | Verify OTP | (auth)/verify.tsx | ~200 |
| Auth | Profile Setup | (auth)/profile-setup.tsx | ~250 |
| Auth | Welcome | (auth)/welcome.tsx | ~180 |
| Auth | DNA Quiz | (auth)/quiz.tsx | ~360 |
| Tabs | Home | (tabs)/index.tsx | 467 |
| Tabs | Explore | (tabs)/explore.tsx | ~350 |
| Tabs | My Trips | (tabs)/trips.tsx | ~300 |
| Tabs | Wallet | (tabs)/wallet.tsx | ~400 |
| Tabs | Profile | (tabs)/profile.tsx | ~380 |
| Tabs | Notifications | (tabs)/notifications.tsx | ~350 |
| Tabs | Subscription | (tabs)/subscription.tsx | ~320 |
| Tabs | Refer & Earn | (tabs)/refer.tsx | ~300 |
| Tabs | Connecting | (tabs)/connecting.tsx | ~350 |
| Tabs | Price Alerts | (tabs)/alerts.tsx | ~280 |
| Tabs | Support | (tabs)/support.tsx | ~300 |
| Tabs | Destination Guide | (tabs)/destination-guide.tsx | ~350 |
| Tabs | Real Estate | (tabs)/real-estate.tsx | ~380 |
| Tabs | Events | (tabs)/events.tsx | ~400 |
| Tabs | Enterprise | (tabs)/enterprise.tsx | ~350 |
| Tabs | Competitors | (tabs)/competitors.tsx | ~330 |
| Trip | Plan | (trip)/plan.tsx | 570 |
| Trip | Interests | (trip)/interests.tsx | ~280 |
| Trip | Landmarks | (trip)/landmarks.tsx | ~200 |
| Trip | Flights | (trip)/flights.tsx | ~320 |
| Trip | Hotels | (trip)/hotels.tsx | ~300 |
| Trip | Summary | (trip)/summary.tsx | ~350 |
| Trip | Completion | (trip)/completion.tsx | ~200 |
| Live | Home | (live)/home.tsx | 472 |
| Live | Itinerary | (live)/itinerary.tsx | ~380 |
| Live | Map | (live)/map.tsx | ~300 |
| Live | Chat | (live)/chat.tsx | ~350 |
| Live | Expenses | (live)/expenses.tsx | ~380 |
| Live | Split Payment | (live)/split-payment.tsx | ~320 |
| Live | Split | (live)/split.tsx | 648 |
| Live | Trip Summary | (live)/trip-summary.tsx | ~350 |
| Live | Schedule | (live)/schedule.tsx | ~250 |
| Dev | Theme Lab | dev/theme-lab.tsx | ~200 |

**Planned (10):**

| Screen | Purpose |
|--------|---------|
| Revenue Dashboard | B2B revenue metrics |
| Prospects CRM | Sales lead management |
| Regulations Tracker | Compliance tracking |
| Real Estate Analysis | Market deep dive |
| Real Estate Contacts | Agent directory |
| Real Estate Guide | Israeli investor guide |
| Trip Preparation Hub | Pre-departure services |
| Dubai Cultural Screen | Cultural intelligence |
| South America Hub | Regional content |
| Quick DNA Swipe | Tinder-style assessment |

---

## Appendix B — Design System Tokens

### Colors

```typescript
Brand = {
  purple: "#6443F4",      // Primary
  pink: "#F94498",        // Accent
  deepPurple: "#0D0628",  // Background
  darkPurple: "#1A0A3D",  // Secondary bg
  midPurple: "#2D1B5E",   // Surface
  lightPurple: "#3D2B7A", // Elevated
}

Text = {
  primary: "#FFFFFF",     // Headings
  secondary: "#C4B5D9",   // Body
  muted: "#9B8EC4",       // Labels
  placeholder: "#7B6FA0", // Inputs
  accent: "#F94498",      // Highlights
}
```

### Typography

```typescript
Typography = {
  h1: { fontSize: 32, fontWeight: "800", letterSpacing: -0.5 },
  h2: { fontSize: 26, fontWeight: "800", letterSpacing: -0.3 },
  h3: { fontSize: 22, fontWeight: "700" },
  h4: { fontSize: 18, fontWeight: "700" },
  body: { fontSize: 15, fontWeight: "400", lineHeight: 22 },
  small: { fontSize: 13, fontWeight: "400" },
  label: { fontSize: 11, fontWeight: "700", letterSpacing: 1.5 },
  cta: { fontSize: 16, fontWeight: "700" },
}
```

### Spacing & Radius

```typescript
Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 }
Radius = { sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, pill: 999 }
```

### Gradients

```typescript
Gradients = {
  cta: ["#6443F4", "#C2185B", "#F94498"],      // CTA buttons
  authBg: ["#0D0628", "#1A0A3D", "#1A0A3D"],   // Auth backgrounds
  card: ["rgba(123,47,190,0.20)", "rgba(233,30,140,0.12)"],
  badge: ["rgba(123,47,190,0.40)", "rgba(233,30,140,0.25)"],
}
```

---

## Appendix C — Data Models (Full TypeScript)

### Core Enums

```typescript
// Travel DNA
type TravelStyle = "LUXURY" | "BUDGET" | "ADVENTURE" | "RELAXATION" | "CULTURAL" | "BUSINESS" | "FAMILY" | "ROMANTIC" | "SOLO" | "BACKPACKING";
type AccommodationType = "HOTEL" | "RESORT" | "HOSTEL" | "APARTMENT" | "VILLA" | "CAMPING" | "BOUTIQUE" | "BED_AND_BREAKFAST";
type ActivityLevel = "LOW" | "MODERATE" | "HIGH" | "EXTREME";
type GroupType = "SOLO" | "COUPLE" | "FAMILY" | "FRIENDS" | "BUSINESS" | "GROUP";
type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
type DietaryRestriction = "NONE" | "VEGETARIAN" | "VEGAN" | "GLUTEN_FREE" | "HALAL" | "KOSHER" | "ALLERGIES";
type AccessibilityNeed = "NONE" | "WHEELCHAIR" | "MOBILITY_AID" | "VISUAL" | "HEARING";
type CulturalInterest = "ART" | "MUSIC" | "FOOD" | "HISTORY" | "ARCHITECTURE" | "RELIGION" | "FESTIVALS" | "LOCAL_CUSTOMS";
type TransportMode = "FLIGHT" | "TRAIN" | "BUS" | "CAR" | "BIKE" | "WALKING" | "BOAT";

// Journey Steps
type JourneyStep = "registration" | "email_verified" | "profile_basic" | "quick_dna" | "first_class_dna" | "first_trip_planned" | "first_booking" | "payment_setup" | "profile_complete" | "referral_shared" | "premium_explored" | "community_joined" | "power_user";

// Wallet
type TransactionType = "credit" | "debit" | "booking_payment" | "refund" | "reward" | "cashback" | "fee" | "transfer_in" | "transfer_out" | "exchange" | "penalty" | "bonus";
type TransactionStatus = "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired" | "refunded";
type PaymentMethodType = "credit_card" | "debit_card" | "bank_transfer" | "apple_pay" | "google_pay" | "wallet_balance";
type Currency = "USD" | "EUR" | "GBP" | "ILS" | "AED" | "JPY" | "AUD" | "CAD" | "CHF" | "SGD" | "HKD" | "NZD";
type KycLevel = 1 | 2 | 3;
type Tier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

// Trip
type TripStatus = "draft" | "upcoming" | "active" | "completed";
type ActivityCategory = "food" | "activity" | "hotel" | "transport";
type ActivityStatus = "pending" | "confirmed" | "completed";

// Support
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";
type TicketCategory = "general" | "booking" | "points" | "live_trip" | "payment" | "account";
```

### Core Interfaces

```typescript
interface DNAProfile {
  adventureLevel: number;      // 0-100
  luxuryPreference: number;    // 0-100
  culturalCuriosity: number;   // 0-100
  socialLevel: number;         // 0-100
  planningStyle: number;       // 0=spontaneous, 100=detailed
  comfortZone: number;         // 0=stay, 100=push boundaries
  pacePreference: number;      // 0=slow, 100=fast
}

interface DNAScores {
  explorer: number;     // 0-100
  relaxer: number;      // 0-100
  adventurer: number;   // 0-100
  culturalist: number;  // 0-100
  foodie: number;       // 0-100
  photographer: number; // 0-100
  historian: number;    // 0-100
  naturalist: number;   // 0-100
}

interface ProcessedPreferences {
  primaryMotivations: string[];
  avoidanceFactors: string[];
  mustHaves: string[];
  dealBreakers: string[];
  flexibilityAreas: string[];
}

interface Wallet {
  id: string;
  userId: string;
  status: "active" | "suspended" | "closed";
  balances: WalletBalance[];
  defaultCurrency: Currency;
  paymentMethods: PaymentMethod[];
  dailySpendLimit?: number;
  monthlySpendLimit?: number;
  isKycVerified: boolean;
  kycLevel: KycLevel;
}

interface WalletBalance {
  currency: Currency;
  amount: number;
  lockedAmount: number;
  availableAmount: number;
  lastUpdated: Date;
}
```

---

## Appendix D — Gamification & Avatar System

### D.1 Living NFT Avatar

Every user gets a Living NFT Avatar — a dynamic, evolving character that reflects their travel identity. The avatar is NOT cosmetic — it's a core retention mechanic and future revenue stream.

**145 Traits across 29 Families:**

| Family Category | Example Families | Unlock Method |
|----------------|-----------------|---------------|
| Head | Headwear, Hairstyle, Glasses | XP milestones |
| Face | Expressions, Face paint | Complete trips |
| Body | Outfits, Accessories, Bags | Badge collections |
| Background | Skylines, Nature, Abstract | Seasonal events |
| Special | Rare items, Animated effects | Mini-game wins, GPS check-ins |

**Avatar Evolution Triggers:**
- Visit a landmark (GPS check-in) → Unlock location-specific trait
- Complete a badge collection → Unlock themed accessory
- Reach XP milestone (tier up) → Unlock tier-exclusive trait
- Participate in seasonal event → Unlock limited-edition trait
- Win mini-game → Unlock rare animated effect
- Complete First Class DNA → Unlock DNA-matched avatar customization

**Future (Phase 3):** NFT marketplace on Polygon/Ethereum for avatar trading.

### D.2 Badge System — 145 Badges

| Category | Count | Examples |
|----------|-------|---------|
| Landmarks | ~25 | "Tower Collector" (visit 5 iconic towers), "Temple Seeker" |
| Dining | ~20 | "Street Food Master" (10 street food spots), "Michelin Hunter" |
| Milestones | ~20 | "First Flight", "10K Points", "Year One" |
| Social | ~15 | "Connector" (5 travel partners), "Storyteller" (10 reviews) |
| Eco | ~15 | "Green Traveler" (3 eco-trips), "Carbon Conscious" |
| Luxury | ~15 | "5-Star Collector", "Lounge Life", "First Class Flyer" |
| Budget | ~15 | "Hostel Hero", "Street Smart", "Budget Beast" |
| Events | ~20 | "Carnival Spirit" (attend carnival), "Festival Hopper" |

### D.3 Mini-Games

| Aspect | Specification |
|--------|--------------|
| License | DED Dubai licensed (required for gamification) |
| Type | Skill-based only (no gambling) |
| House Edge | 20-30% for TRAVI |
| Reward | XP, avatar traits, bonus points |
| Examples | Travel trivia, destination guessing, price prediction |
| Frequency | Daily challenges + event-based specials |
| Anti-addiction | Session limits, cool-down periods |

### D.4 Leaderboards

| Board | Refresh | Scope |
|-------|---------|-------|
| Weekly | Every Monday | Global + country-specific |
| Monthly | 1st of month | Global + country-specific |
| All-Time | Never | Global only |
| Event-based | Per event | Event participants only |

**Leaderboard Metrics:** XP earned, badges collected, trips completed, countries visited, community contributions.

---

## Appendix E — Visual DNA System (Alternative to Quiz)

### E.1 Overview

In addition to the 10-question scenario quiz and the First Class DNA Assessment, DNAFLOW implements a **Visual DNA System** — a faster, image-based personality profiler using progressive disclosure.

### E.2 6-Screen Flow

**Screen 1 — Big Filter (8 Categories):**
User selects 3-5 from:
- Urban Pulse (city energy)
- Nature Escape (wilderness, hiking)
- Beach Bliss (coastal, water)
- Culture Deep (history, art, museums)
- Thrill Rush (extreme sports, adventure)
- Food Journey (culinary exploration)
- Luxury (premium experiences)
- Social Vibes (community, nightlife)

**Screens 2-5 — Contextual Refinement:**
Based on Screen 1 selections, show only relevant image pairs. User swipes left/right on 25 image pairs.

**Smart Logic:** If user didn't select "Nature" in Screen 1, never show camping/hiking options in later screens. This reduces fatigue and increases data quality.

**Screen 6 — DNA Reveal:**
- Persona icon + title (e.g., "Urban Explorer")
- Top 3 matched destinations
- Personality trait bars
- "Start Planning" CTA

### E.3 Data Extraction

The Visual DNA extracts **165 data points per user** via:

| Method | Data Points | Examples |
|--------|-------------|---------|
| Explicit Selection | ~40 | Categories chosen, images liked |
| Behavioral Signals | ~50 | Hesitation timing, swipe speed, revisit patterns |
| Inference | ~40 | Budget from accommodation choices, pace from activity density |
| Crisis Simulation | ~20 | Adaptability from disruption scenarios |
| Auction Game | ~15 | Real priorities from virtual point bidding |

**Confidence Score:** 87% prediction accuracy (vs. industry standard 55-65%)

---

## Appendix F — First Class DNA — Monetization & Anti-Gaming

### F.1 Smart Pricing Strategy

| Plan | Price/Year | DNA Assessment | Cashback |
|------|-----------|---------------|----------|
| Quick Start | $59.99 | Not included | 0% |
| Smart Start | $29.99 (50% off) | 28-min First Class DNA | Up to 25% |
| Plus | $39.99 | Included | Up to 70% |
| First Class | $59.99 | Included + Premium | Up to 100% |

**Result:** 70% of users choose Smart Start → Premium data collection at scale.

### F.2 Revenue Projections (700K Users)

| Revenue Stream | Year 1 | Year 2 | Year 3 |
|---------------|--------|--------|--------|
| Subscriptions | $20.99M | $41.99M | $41.99M |
| B2B Data Sales | $19.6M | $55M | $55M |
| **Total** | **$40.59M** | **$96.99M** | **$96.99M** |
| **3-Year Total** | | | **$234.57M** |

### F.3 5-Layer Anti-Gaming System

| Layer | Method | Purpose |
|-------|--------|---------|
| 1. Timing Checks | Track response time per question. Flag answers <1s or >60s | Prevent random clicking or overthinking |
| 2. Logic Consistency | Cross-reference answers across modules for contradictions | Detect lying or random responses |
| 3. Trap Questions | Insert 2-3 questions with known "correct" answers from earlier responses | Catch inattentive users |
| 4. Live Quality Meter | Show user their "profile quality" score in real-time | Motivate honest answers (gamification) |
| 5. ML Anomaly Detection | Pattern matching against 50K+ completed profiles | Flag statistical outliers for review |

**Completion Rate:** Only 65-70% complete the full assessment → natural quality filter.

---

## Appendix G — Trip State Adaptation (Contextual UI)

### G.1 UI Adapts to Trip Lifecycle

The entire app UI changes based on the user's current trip state:

| State | Home Screen | Explore Tab | Wallet Tab | AI Concierge |
|-------|-------------|-------------|------------|-------------|
| **No Trip** | Inspiration-focused. Featured destinations, DNA quiz CTA, community stories | Discovery mode. Collections, trending, "Explore this idea" CTAs. **No prices shown.** | Points balance, earn rules, referral CTA | "Where should I go?" mode |
| **Planning** | Plan progress card, next-step nudge | Filtered to selected destination. Shows activities, food, culture for that destination | Budget tracker, "Set aside" feature | Trip-specific Q&A, builder micro-nudges |
| **Booked** | Countdown card, pre-trip checklist, preparation hub | Curated picks for your trip (handpicked, not algorithm). Still no price frontload | Payment confirmation, upcoming charges | Preparation mode: "Do you have travel insurance?" |
| **Live** | Current activity, weather, quick actions, emergency | Nearby mode (map, restaurants, activities, ATMs). Real-time availability | Daily spend tracker, split bill | Active concierge: can book, reschedule, call taxi, order food |
| **Post-Trip** | Trip summary card, reflection prompt, "Next trip?" CTA | "Based on your Barcelona trip, you'd love..." | Cashback summary, points earned, savings report | Reflection mode: "What was the best meal?" + DNA evolution |

### G.2 Key Principle: Prices Hidden Until Context

**Explore Tab** never shows prices during discovery. Philosophy: "Let them fall in love with the idea first." Prices appear only in:
- Flight search results (comparison context)
- Hotel listings (comparison context)
- Cart/checkout (commitment context)
- Wallet (tracking context)

---

## Appendix H — Trip Preparation Hub (Detailed Spec)

### H.1 Service Categories

| Category | Services | Status Options |
|----------|----------|---------------|
| **Transportation** | Airport transfer, private driver, taxi booking, car rental | Not arranged / Arranged / Not sure |
| **Connectivity & Insurance** | eSIM data plan, travel insurance, emergency coverage | Not arranged / Arranged / I'm covered |
| **Experiences & Add-ons** | Yacht charter, safari, hot air balloon, private tours, cooking class | Not arranged / Interested / Booked |
| **Business Opportunities** | Real estate viewings, local business intros, conference passes | Not interested / Maybe / Scheduled |

### H.2 Service Card Layout

Each card shows:
- Service name + icon
- Brief description
- Current status (color-coded)
- Price range (if available)
- AI Concierge button ("Compare options for me")
- "I'm covered" dismiss button

### H.3 Checklist (AI-Generated)

The AI generates a personalized pre-departure checklist based on:
- Destination (visa requirements, vaccines, currency)
- DNA profile (luxury traveler gets "Book lounge access", budget gets "Download offline maps")
- Weather forecast (sunscreen reminder, jacket suggestion)
- Trip duration (packing list adjusts)
- Group type (family gets "Child seat for transfer")

---

## Appendix I — Post-Trip Summary (Detailed Spec)

### I.1 Sections

| Section | Content | Data Source |
|---------|---------|-------------|
| **Highlights** | Auto-selected: best experience, best meal, best day, best moment | User check-ins + ratings + time spent |
| **What We Learned** | Pace preference, activity density, food style, budget adherence | Behavioral tracking during trip |
| **Value Summary** | Total spent, cashback earned, savings vs. average, split payment summary | Wallet data |
| **Memory Hub** | Photo grid (auto-tagged by location + activity) | Camera roll integration (permission-based) |
| **DNA Evolution** | Before vs. after comparison — how this trip changed your profile | DNA engine recalculation |
| **Status & Rewards** | XP earned, badges unlocked, tier progress, avatar traits earned | Gamification engine |
| **Next Trip Tease** | "Based on your Barcelona trip, you'd love Lisbon" with match score | Recommendation engine |
| **Concierge Post-Trip** | "Need to leave a review? File an insurance claim? Get receipts?" | AI assistant |

### I.2 DNA Evolution Display

```
Before Trip:                After Trip:
Explorer:     72 ──────►    Explorer:     78  (+6)
Foodie:       65 ──────►    Foodie:       74  (+9)
Adventurer:   45 ──────►    Adventurer:   52  (+7)
Culturalist:  80 ──────►    Culturalist:  82  (+2)
```

The trip's activities, ratings, and behavioral signals feed back into the DNA engine, evolving the profile over time. This creates a **compounding data moat** — the more trips, the more accurate the recommendations.

---

## Appendix J — Onboarding Deep Dive (17 Steps)

### J.1 Client Web App Onboarding Flow (85+ Pages)

The DNAFLOW web client implements a 17-step onboarding flow that is significantly deeper than the mobile app's current 6-screen flow:

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | Welcome | Brand intro, value prop |
| 2 | DNA Welcome | Explain DNA concept, set expectations |
| 3 | Travel Mode | Solo / Couple / Group / Family |
| 4 | Planning Style | Detailed planner / Spontaneous / Mix |
| 5 | Budget Mindset | Psychology of spending (not just amount) |
| 6 | Pace Calibration | Slider: chill ↔ packed schedule |
| 7 | Non-Negotiables | Deal breakers (must-haves and must-avoids) |
| 8 | Food Preferences | Cuisines, dietary, allergies |
| 9 | Allergies Selection | Specific allergy multi-select |
| 10 | Accessibility | Mobility, visual, hearing, cognitive needs |
| 11 | Trip Directions | Short-haul vs. long-haul, domestic vs. international |
| 12 | Business Integration | Real estate interests, property types, budget ranges |
| 13 | DNA Complete | Summary + persona reveal |
| 14 | Profile Setup | Name, avatar, email |
| 15 | Notification Preferences | Push, email, SMS settings |
| 16 | First Trip Suggestion | AI-generated recommendation based on all inputs |
| 17 | Dashboard | Home screen with personalized content |

### J.2 Skip System

| Rule | Value |
|------|-------|
| Maximum skips allowed | 3 across entire onboarding |
| Skip counter | Tracked in profileStore |
| Skip consequence | Each skip reduces profile completeness score |
| Recovery | User can complete skipped steps later from Profile → "Complete Your Profile" |

### J.3 Perfect Quiz (4 Modules — Web Only)

In addition to Quick DNA and First Class DNA, the web app has a "Perfect Quiz" with 4 focused modules:

| Module | Focus | Questions |
|--------|-------|-----------|
| 1. Identity | Personal brand, values, travel identity | 6 |
| 2. Social | Group dynamics, introversion/extraversion | 5 |
| 3. Comfort | Comfort vs. authenticity spectrum | 5 |
| 4. Decisions | Decision-making style under pressure | 5 |

---

## Appendix K — Concierge as Control Center

### K.1 Philosophy

The TRAVI AI Concierge is NOT a chatbot. It's a **control center** that can execute real actions:

| Capability | Example | Implementation |
|-----------|---------|----------------|
| **Book** | "Book me a table at Nobu tonight" | Restaurant API integration |
| **Reschedule** | "Move tomorrow's museum visit to afternoon" | Itinerary update + notification to group |
| **Cancel** | "Cancel my airport transfer" | Booking cancellation + refund flow |
| **Order** | "Order delivery to my hotel" | Food delivery API integration |
| **Navigate** | "Get me a taxi to the restaurant" | Ride-hailing API integration |
| **Emergency** | "I lost my passport" | Emergency protocol: embassy contact, report template, insurance claim |
| **Inform** | "What's the dress code for this restaurant?" | AI knowledge base |
| **Compare** | "Compare eSIM plans for Dubai" | Service comparison engine |

### K.2 Context Awareness

The concierge adapts its capabilities based on trip state:

| Trip State | Available Actions |
|-----------|-------------------|
| No Trip | Suggest destinations, answer travel questions |
| Planning | Help with itinerary, compare options, check requirements |
| Booked/Pre-Trip | Preparation tasks, checklist reminders, service booking |
| Live Trip | Full execution mode (book, cancel, navigate, emergency) |
| Post-Trip | Receipts, reviews, insurance claims, reflection prompts |

---

## Appendix L — Business Model Deep Dive

### L.1 Revenue Breakdown

| Stream | Percentage | Description |
|--------|-----------|-------------|
| Booking Commissions | 60% | 5% flights, 5% hotels, 3% activities, 8% car rental, 10% insurance |
| Subscriptions | 25% | $0-$60/month across 4 tiers |
| Gaming/RE/Analytics | 15% | Mini-games (20-30% house edge), TRAVI Anatra (real estate referrals), B2B data |

### L.2 Subscription Tiers (Updated)

| Tier | Price/Month | Cashback Rate | Key Features |
|------|-----------|---------------|-------------|
| Free | $0 | 0% | 3 trips/year, basic AI, basic wallet |
| Pass | $9.99 | Up to 25% | Unlimited trips, advanced AI, full wallet |
| Plus | $29.99 | Up to 70% | Everything + priority support, 3x points, concierge |
| First Class | $59.99 | Up to 100% | Everything + personal concierge, 5x points, insurance, lounge |

### L.3 Closed-Loop Wallet Economics

**Key Design Decision:** Points/cashback NEVER convert to cash. They only convert to travel credit within the TRAVI ecosystem. This creates:

1. **Capital Efficiency** — Money stays in the system
2. **Stickiness** — Users return to spend their balance
3. **Lower CAC** — Users invite friends to maximize group savings
4. **Data Moat** — Every spend event = more behavioral data

### L.4 TRAVI Anatra (Real Estate Division)

Users who select "Investments" during DNA assessment or onboarding are flagged for TRAVI Anatra:
- Dubai/Abu Dhabi off-plan property presentations
- ROI calculators integrated into app
- Scheduled consultation booking
- Revenue: referral fees from developers (2-5% of property value)

### L.5 B2B Data Analytics

Zero-knowledge anonymized data sold to:

| Customer | Data Product | Price Range |
|----------|-------------|-------------|
| Tourism Boards | Destination demand forecasting | $10K-$50K/month |
| Hotel Chains | Traveler preference trends | $5K-$25K/month |
| Airlines | Route demand signals | $10K-$30K/month |
| Real Estate Developers | Investment appetite data | $5K-$15K/month |

Projected: $55M/year at scale (700K+ users)

---

## Appendix M — Learning Engine (7 Phases)

### M.1 Data Collection Philosophy

"Every interaction is a data point." The learning engine operates across 7 phases:

| Phase | Name | Method | Data Quality |
|-------|------|--------|-------------|
| A | Cold Start (Onboarding) | Explicit questions + quick picks | High (intentional) |
| B | Planning Learning | Builder micro-nudges, filter tracking | Medium (contextual) |
| C | Decision Learning | Search behavior, comparisons, favorites | High (behavioral) |
| D | Checkout Learning | Payment methods, split patterns, wallet usage | Very High (financial) |
| E | During Trip | Check-ins, alert responses, emergency usage | Very High (real-time) |
| F | Post-Trip | Reflection, NPS, highlight selection | High (reflective) |
| G | Privacy Controls | What users export/delete | Medium (meta-behavioral) |

### M.2 Implicit Signals Tracked

| Signal | Weight | Example |
|--------|--------|---------|
| View Duration | Medium | Spent 45s on a hotel = high interest |
| Swipe Speed | Low | Fast swipes = decisive personality |
| Hesitation | High | Paused 8s before choosing = uncertainty |
| Revisit | Very High | Returned to same destination 3x = strong intent |
| Filter Pattern | High | Always filters "5-star" = luxury preference |
| Skip Pattern | Medium | Skipped all nightlife = avoidance signal |
| Search Refinement | High | Narrowing from "Europe" → "Italy" → "Amalfi" = planning style |
| Cart Abandonment | Very High | Added but didn't book = price sensitivity or decision paralysis |

### M.3 Behavioral → DNA Feedback Loop

```
Trip Data → Learning Engine → DNA Score Update → Better Recommendations → More Trips
     ↑                                                                        │
     └────────────────────────────────────────────────────────────────────────┘
```

Each completed trip recalculates DNA scores. After 3 trips, the system achieves 87% recommendation accuracy (vs. 55-65% for traditional recommendation engines based on reviews/ratings).

---

## Appendix N — UI Style Bible (Locked Decisions)

### N.1 Mandatory Design Rules (Already Locked — Do Not Change)

| Rule | Specification | Exception |
|------|--------------|-----------|
| Dark Mode | Full dark mode only. No light mode variant. | None |
| Primary CTA | Pink #F24294, Satoshi font, white text | Never change to another color |
| Typography | Chillax for headlines, Satoshi for body | Never swap |
| Grid | 20/12/20 margins on mobile, 6 columns | None |
| Mascot (Duck) | Only in: Welcome, Onboarding, Success, Empty states | **NEVER in financial flows or form-heavy screens** |
| Nav Active State | Filled icon + pink text on light pink (#FEECF4) | Only for bottom nav |
| Nav Inactive | Stroke icon + black text on white | Only for bottom nav |
| Layer System | 4 layers: Base → Micro-texture → Route motifs → Content surfaces | All screens |

### N.2 4-Layer System

| Layer | Purpose | Opacity |
|-------|---------|---------|
| 1. Base | Dark or accent background | 100% |
| 2. Micro-texture | Cloud/Water patterns (subtle) | 5-15% |
| 3. Route motifs | Dashed lines, plane icons (travel feel) | 10-20% |
| 4. Content surfaces | Cards, sheets, modals (light-1/2/3 tokens) | 100% |

### N.3 Brand Colors (Production — Pink Update)

| Token | Hex | Usage |
|-------|-----|-------|
| Brand Pink (CTA) | #F24294 | Primary CTA only |
| Brand Purple | #6443F4 | Secondary actions, backgrounds |
| Deep Background | #0D0628 | App background |
| Surface Light-1 | rgba(255,255,255,0.04) | Card background |
| Surface Light-2 | rgba(255,255,255,0.08) | Elevated card |
| Surface Light-3 | rgba(255,255,255,0.12) | Active/hover state |
| Gold | #FFD700 | Points, rewards |
| Success | #10B981 | Positive status |
| Warning | #F59E0B | Caution |
| Error | #EF4444 | Error state |

---

## Appendix O — Guest Mode & Session Management

### O.1 Guest Timer

| Aspect | Specification |
|--------|--------------|
| Guest Session Duration | 25 hours maximum |
| Timer Display | Shown in profile area after first action |
| Countdown | Visible in last 2 hours |
| Expiry Action | Prompt to create account with all data preserved |
| Data Preserved | DNA results, trip drafts, favorites, preferences |
| guestToken | Stored in AsyncStorage, links to real DB user record (isGuest=1) |

### O.2 Guest → Account Merge

```
1. Guest takes Quick DNA → DB record created with isGuest=1
2. Guest plans a trip → Trip linked to guest user
3. Guest hits booking/25h limit → Account creation prompt
4. Guest creates account → guestToken merged to new userId
5. All previous data (DNA, trips, favorites) preserved
6. guestToken invalidated
```

### O.3 Feature Access (Guest vs. Registered)

| Feature | Guest | Free | Pass | Plus | First Class |
|---------|-------|------|------|------|-------------|
| Browse destinations | Y | Y | Y | Y | Y |
| Quick DNA | Y | Y | Y | Y | Y |
| First Class DNA | N | N | Y | Y | Y |
| Plan trip (draft) | Y | Y | Y | Y | Y |
| Book trip | N | Y (3/yr) | Y | Y | Y |
| Wallet | N | Y | Y | Y | Y |
| AI Chat | 3 messages | 10/day | 50/day | Unlimited | Unlimited + priority |
| Social | N | Y | Y | Y | Y |
| Concierge Actions | N | N | N | Y | Y (priority) |
| Cashback | 0% | 0% | 25% | 70% | 100% |

---

## Appendix P — Client Web App (85+ Pages)

### P.1 Overview

The DNAFLOW web client contains 85+ pages implementing a significantly richer experience than the current mobile app. Key additional pages not yet in mobile:

### P.2 Additional Pages to Consider for Mobile

| Category | Pages | Priority |
|----------|-------|----------|
| **Extended Onboarding** | budget-mindset, pace-calibration, non-negotiables, travel-mode, trip-directions, accessibility, allergies-select | High |
| **Trip Builder** | 9 pages: destination, flights, stays, experiences, day-plan, summary, completion, pre-trip, pre-trip-checklist | High |
| **Perfect Quiz** | 4 modules: identity, social, comfort, decisions | Medium |
| **Social/Gamification** | memory-hub, mini-games, badges, rewards-portal, wishlist, leaderboard | Medium |
| **Profile Variants** | couple-profile, family-profile, deep-profile, avatar-customization, dna-choice | Medium |
| **Settings** | language-currency, notification-settings, property-preferences, food-preferences, emergency-mode, health-activity, document-scanner, group-permissions, contact-integration, add-guest | Low |
| **Commerce** | cart, checkout, wallet-full, create-price-alert, flight-detail, hotel-detail | High |

### P.3 Total Screen Count (All Platforms)

| Platform | Screens |
|----------|---------|
| Mobile App (current) | 47 implemented + 10 planned |
| Web Client (DNAFLOW) | 85+ pages |
| **Combined unique features** | **~120 unique screens** |

---

**End of Document — Version 2.0**

*This PRD is a living document and will be updated as development progresses. All specifications are subject to change based on user feedback, technical constraints, and business priorities.*

*TRAVI Technologies Ltd. — All rights reserved.*
