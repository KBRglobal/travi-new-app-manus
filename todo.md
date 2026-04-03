# TRAVI App — Master TODO

> Last updated: April 3, 2026
> Status: 112 screens | 24 DB tables | 74 tRPC routes | 80 tests | Railway deployed

---

## URGENT — Priority 0: Security Vulnerabilities

### axios — Prototype Pollution (CVSS 8.7) ✅ FIX NOW
- [ ] Upgrade `axios` from 1.13.2 → **1.13.5** in package.json
- This is a **direct dependency** — easy fix, high impact
- Allows attacker to pollute global JS prototype → DoS, logic manipulation, potential RCE

### minimatch@9.0.5 — ReDoS + Algorithmic Complexity (CVSS 8.7) ⏳ NO FIX YET
- [ ] Monitor for fix from expo/react-native upstream
- Two separate vulnerabilities: exponential algorithm growth + catastrophic regex backtracking
- Affects almost all transitive deps (expo, expo-constants, expo-image, react-native, etc.)
- **No action possible** — wait for expo/react-native to update minimatch

### brace-expansion@2.0.2 — Infinite Loop (CVSS 7.1) ⏳ NO FIX YET
- [ ] Monitor for fix from expo/react-native upstream
- Specific input patterns cause infinite loop → DoS
- Same transitive dependency chain as minimatch
- **No action possible** — wait for upstream fix

---

## NOW — Priority 1: Auth & Live Connections

### Auth Flow (CRITICAL — no one can use the app without this)
- [x] Connect sign-up screen to server OAuth (Google/Apple/Email) — startOAuthLogin wired
- [x] Connect login screen to server auth
- [ ] Guest mode flow — guestToken, isGuest, 25-hour timer
- [ ] Guest → account merge (preserve DNA, trips, favorites)
- [ ] JWT token refresh on 401
- [ ] Email verification (OTP via SendGrid/Resend)
- [ ] Wire auth state to all screens (show real user data when logged in)

### tRPC UI→DB Connections (partially done)
- [x] Wallet screen → Railway PostgreSQL (transaction history)
- [x] Trips screen → Railway PostgreSQL (real trips)
- [x] Profile screen → Railway PostgreSQL (XP/points from traveler_profiles)
- [ ] DNA screens → Railway PostgreSQL (dna_sessions, quick_dna_results)
- [x] Social screens → message-chat connected to social_messages via tRPC
- [ ] Support screen → Railway PostgreSQL (support_tickets)
- [ ] Enterprise screens → Railway PostgreSQL (enterprise_metrics, prospects)
- [ ] Notifications → Railway PostgreSQL (no separate table; enriched from price_alerts + trips)
- [x] Price Alerts → Railway PostgreSQL (price_alerts table) — alerts.tsx connected
- [ ] Referrals → Railway PostgreSQL (referrals table)

---

## NOW — Priority 2: UI Polish (fonts + contrast + spacing)

### Typography — 40 screens missing custom fonts
Run `grep -rL "Chillax" app/ --include="*.tsx" | grep -v "_layout"` to see full list.

Rules:
- `fontWeight: "800"/"900"` → add `fontFamily: "Chillax-Bold"`
- `fontWeight: "700"` + `fontSize >= 16` → add `fontFamily: "Chillax-Semibold"`
- `fontWeight: "400"/"500"` + `fontSize >= 13` → add `fontFamily: "Satoshi-Regular"` or `"Satoshi-Medium"`
- `fontSize <= 11` captions → leave as system font
- Styles using `...TYPE.*` spread → already have fonts, skip

### Contrast Fixes (across ALL screens)
- [ ] All `rgba(255,255,255,0.35)` or lower on text → raise to `0.55` minimum
- [ ] All `rgba(255,255,255,0.4)` on labels → raise to `0.5` minimum
- [ ] Small gold text (#FFD700) → use `#FBBF24` instead (better contrast)

### Card & Border Fixes
- [ ] All `borderColor: "rgba(255,255,255,0.06)"` → raise to `0.12`
- [ ] All `borderColor: "rgba(255,255,255,0.07)"` → raise to `0.12`
- [ ] All card `backgroundColor: "rgba(255,255,255,0.04)"` → keep (this is fine)

### CTA Button Glow (all gradient CTA buttons across the app)
- [ ] Add to every gradient CTA: `shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10`

### Spacing Improvements
- [ ] Section spacing: `paddingTop: 24` → `32` (room to breathe)
- [ ] Card padding: `14-16px` → `18-20px` (more premium)
- [ ] Home screen: reduce sections from 7 to 5 (less overwhelming)
- [ ] All scrollable screens: `paddingBottom: 130` minimum (clear of tab bar)

---

## NEXT — Priority 3: Real-time & Notifications

### Socket.IO Real-Time Messaging
- [ ] Server-side Socket.IO setup
- [ ] Connect social_messages table to chat screens
- [ ] Real-time message delivery (no polling)
- [ ] Trip group chat support
- [ ] Online/offline status indicators

### Push Notifications
- [ ] Connect push_tokens table to Expo Push API
- [ ] Price alert triggers (when price drops below threshold)
- [ ] Trip reminders (3 days before, 1 day before)
- [ ] Friend request notifications
- [ ] Booking confirmation notifications

---

## NEXT — Priority 4: Stripe & Payments

### Stripe Integration
- [ ] Add STRIPE_SECRET_KEY + STRIPE_PUBLISHABLE_KEY to Railway env vars
- [ ] Subscription billing (Free/Adventurer/Elite Nomad)
- [ ] One-time booking payments (PaymentIntents)
- [ ] Webhook handlers (payment success, subscription changes, disputes)
- [ ] Refund flow

---

## LATER — Priority 5: Remaining Feature Gaps

### Screens Still Unchecked from PRD Phase 38
- [ ] Dubai Cultural Guide (Islamic etiquette, prayer times, halal/kosher, dress code)
- [ ] Mexico Destination Guide (Urban vs Coastal comparison)
- [ ] Quick DNA expand to 116 items across 11 categories (currently 10 questions)
- [ ] DNA 8-dimension scoring with confidence scores + share card
- [ ] "Surprise Me" mode in destination selection (pick by DNA)
- [ ] Multi-traveler DNA merge (invite friend → combine DNA profiles)

### Phase 14 — Still Open
- [ ] Replace app icon with official TRAVI logo (Group30.png)
- [ ] Update splash screen with official TRAVI logo

### Phase 17 — Wallet Polish
- [ ] Wallet gamification (streak counter, animated progress bar)
- [ ] Cashback display with real-time calculation

### Phase 22 — Trip Builder Polish
- [ ] Redesign interests step as photo-grid picker (real Unsplash images)
- [ ] Budget step: large visual slider that changes background by amount

### Phase 26 — Remaining Items
- [ ] Unique Unsplash images per attraction in swipe cards
- [ ] Trip Detail screen: tap trip → full itinerary + edit/add/remove
- [ ] "Surprise Me" mode in destination selection
- [ ] Multi-traveler invite + merge DNA profiles
- [ ] Beautiful empty states across all screens with actionable CTAs

### Phase 34 — Home Screen
- [ ] Clarify DNA card action text
- [ ] Reduce visual clutter / confusion
- [ ] Make user flow obvious: hero → CTA → trip planning

### Phase 35 — Explore Immersive
- [ ] Destination-specific hero with cinematic slideshow
- [ ] Personality match score (% match based on DNA)
- [ ] Neighborhoods section with photos and vibe descriptions
- [ ] Hidden Gems section
- [ ] Casino-level visual design throughout

---

## COMPLETED — Reference Only

### Infrastructure
- [x] Railway PostgreSQL deployment (24 tables, seeded)
- [x] Dockerfile + railway.toml
- [x] GitHub Actions CI/CD
- [x] 80 Vitest unit tests (DNA engine, points engine, wallet)
- [x] Health endpoint for Railway

### Backend
- [x] 10 tRPC routers (auth, profile, trips, wallet, dna, social, support, enterprise, itinerary, notifications, referrals, stripe, preferences, priceAlerts, culturalGuide, agent, pushTokens)
- [x] DNA Engine utility module
- [x] Points Engine utility module
- [x] Stripe SDK installed + router scaffold
- [x] Seed script for all 23 tables
- [x] Server-side AI Agent chat (Hebrew, via invokeLLM)

### tRPC UI→DB (Phase 40 — Session 4)
- [x] Connect Wallet screen to real DB data (wallet.balance, wallet transactions)
- [x] Connect Trips screen to real DB data (trips.list, trips.get)
- [x] Connect Profile/DNA screen to real DB data (profile.get, dna.getResult)
- [x] Push merged ui/fixes-round2 to GitHub

### Screens (112 total)
- [x] Auth: splash, sign-up, verify, profile-setup, welcome, quiz, onboarding, deep-onboarding
- [x] DNA: quick-swipe, first-class-dna (9 modules)
- [x] Tabs: home, explore, trips, profile, wallet, alerts, notifications, subscription, refer, connecting
- [x] Tabs: destination-guide, destination-swipe, events, real-estate, enterprise, support
- [x] Tabs: badges-leaderboard, memory-hub, rewards-portal, dna-evolution, prospects-crm
- [x] Tabs: trip-hub, trip-detail, wallet-kyc, wallet-withdraw, wallet-exchange, wishlist, invite-partner
- [x] Tabs: property-detail, real-estate-analysis, real-estate-contacts, real-estate-guide, south-america-hub
- [x] Tabs: revenue-dashboard, regulations-tracker, competitors
- [x] Trip: plan, interests, landmarks, flights, hotels, summary, completion, book, swipe
- [x] Trip: destination-detail, destination-pick, destination-map, flight-detail, hotel-detail, restaurant-detail
- [x] Trip: trip-prep, trip-companions, trip-chat, trip-share, food-preferences, itinerary-builder, itinerary
- [x] Trip: packing-list, visa-info, currency-converter, cultural-guide, surprise, dna-update, post-booking
- [x] Live: home, itinerary, map, chat, expenses, split, split-payment, expense-tracker, trip-summary, trip-review, schedule
- [x] Social: discover, compatibility, messages, message-chat, community
- [x] Settings: edit-profile, notifications, privacy-security, change-password, language-selector, currency-selector, emergency, health-activity
- [x] Agent: chat (AI agent with Hebrew support)

### UI Sweep (Claude Code)
- [x] Chillax + Satoshi fonts applied to 72 screens
- [x] BlurView tab bar (iOS)
- [x] Design tokens: FONTS, SPRING, EASING_EXPO_OUT, GLOW
- [x] New components: AnimatedPress, GradientText, BlurCard, SkeletonLoader
- [x] 3 hidden tab registrations fixed (competitors, revenue-dashboard, regulations-tracker)
- [x] Explore: hero height reduced, region banner conditional, bottom padding fixed
- [x] Trips: gap and padding improved
- [x] PRD v2.0 (2,800+ lines, 44 sections)
