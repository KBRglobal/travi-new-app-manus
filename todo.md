# TRAVI App TODO

## Phase 1 — Setup & Theme
- [x] Configure TRAVI dark purple theme in theme.config.js
- [x] Generate TRAVI duck mascot app icon
- [x] Set up bottom tab navigation (Home, Trips, Wallet, Explore, Profile)
- [x] Set up icon mappings in icon-symbol.tsx (160+ icons)
- [x] Update app.config.ts with TRAVI branding

## Phase 2 — Onboarding & Auth
- [x] Splash screen with animated duck mascot and loading bar
- [x] Sign Up screen (Email / Google / Apple / Guest)
- [x] Email Verification screen (6-digit OTP with countdown timer)
- [x] Profile Setup screen (photo + name)
- [x] Welcome screen with duck mascot and feature highlights
- [x] Personality Quiz (10 scenario questions, Traveler DNA)
- [x] Auth state management with AsyncStorage persistence

## Phase 3 — Home Screen
- [x] Home screen — upcoming trip cards with Live Mode button
- [x] Home screen — active trip live banner
- [x] Home screen — trending destinations horizontal scroll
- [x] TRAVI Points display in header
- [x] TRAVI Tip rotating card with duck mascot
- [x] Quick actions grid (Flights, Hotels, Activities, Explore)
- [x] Plan New Trip CTA card

## Phase 4 — Trip Planning Flow
- [x] Step 1: Plan Adventure (destination, dates, travelers, budget)
- [x] Step 2: Choose Interests (visual cards with categories)
- [x] Step 3: Choose Landmarks (city-specific with AI picks)
- [x] Step 4: Choose Flight (3 options with airline details)
- [x] Step 5: Choose Hotel (3-5 options with amenities)
- [x] Step 6: Trip Summary (flight, hotel, itinerary, cost breakdown)
- [x] Trip Completion screen with confetti animation and points earned
- [x] Trip data persistence with AsyncStorage

## Phase 5 — Trips Screen
- [x] Trips list with All / Upcoming / Completed filter tabs
- [x] Trip cards with destination gradient, status badge, Live Mode button
- [x] Stats header (upcoming count, completed count, total points)

## Phase 6 — Live Trip Mode
- [x] Live home screen with current/next activity cards
- [x] Weather widget with conditions
- [x] Quick actions (Ask TRAVI, Today's Plan, Nearby, Emergency)
- [x] Rotating TRAVI tips
- [x] Nearby highlights section
- [x] SOS emergency modal
- [x] AI Chat screen with mock TRAVI responses and quick prompts
- [x] Full Itinerary screen with day selector and timeline
- [x] Nearby / Map screen with category filters and place cards

## Phase 7 — Wallet & Points
- [x] Wallet screen with TRAVI Points balance and tier progress
- [x] Points history list with transaction types
- [x] Redeem options (6 reward types)
- [x] Tier system (Explorer → Adventurer → Globetrotter → Elite Nomad)
- [x] Lifetime savings display

## Phase 8 — Explore / Community
- [x] Explore screen with destination cards and category filters
- [x] Trending experiences section
- [x] Travel stories / community feed
- [x] Save/bookmark destinations

## Phase 9 — Settings & Profile
- [x] Profile screen with Traveler DNA display
- [x] Achievements section
- [x] Settings sections (Account, Preferences, Travel, Support)
- [x] Toggle controls (Dark Mode, Notifications)
- [x] Logout functionality

## Phase 10 — Polish & QA
- [x] Zero TypeScript errors
- [x] All icon mappings verified
- [x] End-to-end onboarding flow (Splash → Sign Up → OTP → Profile → Welcome → Quiz → Home)
- [x] End-to-end trip flow (Plan → Interests → Landmarks → Flights → Hotels → Summary → Completion)
- [x] Live Mode flow (Trips → Live Home → Chat / Itinerary / Map)
- [x] Wallet redeem flow
- [x] Logout → re-onboarding flow

## Phase 11 — Premium Redesign (Full Visual Overhaul)
- [x] New design system: glass morphism cards, deep mesh gradients, cinematic typography
- [x] Redesign Splash screen — full-bleed animated gradient, large mascot, cinematic entrance
- [x] Redesign Sign Up screen — glass card, floating labels, premium social buttons
- [x] Redesign OTP screen — large digit boxes with glow focus states
- [x] Redesign Profile Setup — avatar with gradient ring, elegant input
- [x] Redesign Welcome screen — immersive hero, feature cards with glass effect
- [x] Redesign Quiz screen — full-screen question cards with depth
- [x] Redesign Home screen — hero banner with parallax feel, premium destination cards
- [x] Redesign Trip Planning flow — step progress with glow, immersive selection cards
- [x] Redesign Live Trip Mode — dark green/purple cinematic header, activity timeline
- [x] Redesign AI Chat — bubble design with glass, typing indicator, premium feel
- [x] Redesign Wallet — holographic card effect, tier badges, animated progress
- [x] Redesign Explore — magazine-style layout, full-bleed destination photos
- [x] Redesign Trips tab — cinematic trip cards with destination imagery
- [x] Redesign Profile — premium avatar, DNA visualization, achievement badges

## Phase 12 — Card-Tap Conversational UX

- [x] Trip Planner: TRAVI asks one question at a time with animated duck message bubble
- [x] Destination picker: full-screen visual cards with gradient backgrounds (tap to select)
- [x] Date picker: beautiful calendar card with range selection
- [x] Travel style picker: large illustrated cards (Adventure / Luxury / Culture / Chill)
- [x] Travelers & budget: large tap-to-increment controls, not text inputs
- [x] Flights: premium airline cards with logo, times, price — tap to select
- [x] Hotels: immersive hotel cards with photos, stars, amenities chips — tap to select
- [x] Interests: large icon cards in a 2-col grid — tap to toggle
- [x] Landmarks: full-width photo cards — tap to add
- [x] Trip Summary: cinematic reveal with animated sections
- [x] Completion: confetti burst + points counter animation
- [x] Haptic feedback on every card tap

## Phase 13 — World-Class DNA Quiz & Trip Planner Rebuild
- [x] DNA Quiz: 10 visual swipe questions with full-bleed image cards (Unsplash-style)
- [x] DNA Quiz: Animated progress bar and smooth question transitions
- [x] DNA Quiz: DNA result reveal with traveler type + 3 matched destinations
- [x] Trip Planner: Destination visual card grid (not text input)
- [x] Trip Planner: Smart date window picker with season/price hints
- [x] Trip Planner: Traveler type tap (Solo/Couple/Family/Friends icons)
- [x] Trip Planner: Budget slider (Backpacker → Luxury with live examples)
- [x] Trip Planner: Swipe-style interests (10 experience photo cards)
- [x] AI Chat: Premium rebuild with smart keyword responses and typing animation

## Phase 14 — Logo, Price Alert & Split Bill
- [ ] Replace app icon with official TRAVI logo (Group30.png)
- [ ] Update splash screen with official TRAVI logo
- [ ] Build Price Alert screen (destination + max price + mock alerts)
- [ ] Add Price Alert entry point in Home screen and Explore screen
- [ ] Build Split Bill screen inside Live Trip Mode
- [ ] Add Split Bill tab in Live Trip navigation
- [ ] Wire up all new screens in navigation

## Phase 15 — UX/UI Intuitive Redesign (Emoji Removal & Vector Icons)
- [x] Replace all emoji in profile-setup.tsx with vector icon avatars
- [x] Replace duck emoji in quiz.tsx with TRAVI logo image
- [x] Replace duck emoji in chat.tsx with TRAVI logo image
- [x] Replace duck emoji in plan.tsx with TRAVI logo image
- [x] Replace duck emoji in interests.tsx with TRAVI logo image
- [x] Replace duck emoji in landmarks.tsx with TRAVI logo image
- [x] Replace duck emoji in flights.tsx with TRAVI logo image
- [x] Replace duck emoji in hotels.tsx with TRAVI logo image
- [x] Replace duck emoji in summary.tsx with TRAVI logo image
- [x] Replace duck emoji in completion.tsx with TRAVI logo image
- [x] Replace emoji category icons in itinerary.tsx with vector icons
- [x] Replace emoji category icons in live/home.tsx with vector icons
- [x] Replace emoji in map.tsx with vector icons
- [x] Replace emoji in wallet.tsx with vector icons
- [x] Replace emoji feature icons in welcome.tsx with vector icons
- [x] Replace emoji avatar options in split.tsx with initials
- [x] Replace flag emoji in alerts.tsx with country codes
- [x] Replace Apple logo emoji in sign-up.tsx with vector icon
- [x] Replace envelope emoji in verify.tsx with vector icon
- [x] Zero TypeScript errors after all emoji replacements

## Phase 16 — Visual Richness & Intuitive UX

- [x] Add real destination photo URLs to Home screen "Picked for You" cards
- [x] Add destination photos to Price Alert cards on Home screen
- [x] Redesign Home screen hero section with full-width destination photo
- [x] Add destination photos to DNA quiz result destination cards
- [x] Redesign Explore screen with full-bleed photo grid
- [x] Improve Trips screen with trip cover photos
- [ ] Add visual richness to Wallet screen

## Phase 17 — Wallet Gamification & New Screens
- [ ] Redesign Wallet with full gamification (level card, animated progress bar, streak counter, achievement badges)
- [ ] Add Subscription Plans tab in Wallet (Free / Plus / Elite comparison with visual cards)
- [ ] Add Cashback display with real-time calculation
- [ ] Build Split Payment screen with friend avatars and amount splitting
- [ ] Build Refer-a-Friend screen with share code and rewards display
- [ ] Fix Home screen hero with full-bleed photo background
- [ ] Fix TypeScript errors in quiz.tsx (image source type)

## Phase 18 — Missing Screens from Figma App Flow
- [ ] Build Notifications screen (price alerts, trip updates, friend invites)
- [ ] Build End-of-Trip Summary screen (photos, expenses, points earned, memories)
- [ ] Build Restaurant Details screen (info, menu preview, reserve table)
- [ ] Build Flight Details screen (booking info, change flight option)
- [ ] Build Hotel Details screen (room info, amenities, edit booking)
- [ ] Build Add Activity screen (for live trip - search & add to itinerary)
- [ ] Build Refer-a-Friend screen (invite code, share link, rewards)
- [ ] Build KYC / Balance screen (identity verification + wallet balance)
- [ ] Build Subscription Plans screen (Free/Plus/Elite with feature comparison)
- [ ] Build Invited Travel Partner flow (accept/decline trip invite)
- [ ] Wire all new screens into navigation

## Phase 19 — New Screens & Navigation (Current)
- [x] Build Notifications screen (price alerts, trip updates, friend invites, system)
- [x] Build Trip Summary / End-of-Trip screen (memories, stats, badges, rating)
- [x] Build Expenses Management screen (categories, pie chart, add expense, split)
- [x] Build Split Payment screen (equal/custom/percentage modes, payment methods)
- [x] Build Connecting / Travel Partners screen (discover, match, requests)
- [x] Build Schedule / Itinerary screen (day-by-day timeline, weather, events)
- [x] Wire all new screens into navigation (live layout + tabs layout)
- [x] Wire notification bell to Notifications screen
- [x] Wire Connecting to Quick Actions on Home screen
- [x] Wire Schedule, Expenses, Trip Summary to Live Trip Quick Actions
- [x] Fix all TypeScript errors (0 errors)
- [x] Wire Split Payment from Expenses screen
- [x] Build Subscription Plans screen
- [x] Build Refer-a-Friend screen
- [x] Wire Subscription and Refer to Profile screen
- [x] Replace all icon.png with official mascot-dark.png logos
- [x] Update all screens to use correct TRAVI logos (dark/light backgrounds)
- [ ] Build Restaurant/Hotel/Flight Details screens

## Phase 20 — Gap Analysis: New Screens & Enhancements
- [x] DNA Result Enhanced — DNA Circle, 6 traits with progress bars, fun facts, share, retake, 5 destinations
- [x] Destination Guide screen — hero, quick stats, tabs (Overview/Culture/Food/Budget/Tips), Israeli tips
- [x] Support / Help Center — 3 tabs (FAQ accordion, Contact form, Tickets list)
- [x] Real Estate Hub — Dubai/Abu Dhabi toggle, market insights, property cards, filters
- [x] Events / Experiences Hub — hero carousel, filters, event cards, budget guide, cultural context
- [x] Enterprise Dashboard — 4 tabs (Overview KPIs, Revenue breakdown, Competitors, Regulations)
- [x] Wire all new screens to Home "Explore More" section
- [ ] Property Detail screen (gallery, specs, ROI calculator, map)
- [ ] Mexico Destination Guide (Urban vs Coastal comparison)
- [ ] Dubai Cultural Screen (Islamic etiquette, prayer times, halal/kosher)

## Phase 21 — Home Screen Redesign: "The Travel Friend You Never Had"
- [x] Replace current Home with cinematic, emotional trip-planning experience
- [x] Hero: full-screen rotating destination imagery, "The travel friend you never had" headline
- [x] DNA section: personalized greeting if quiz done / teaser if not
- [x] How It Works: 3-step visual (Know You → Plan It → Commission Back)
- [x] No-middleman explanation block with simple visual
- [x] "Where's your head at?" CTA with 3 options
- [x] Remove prices, points, price alerts, trending, community stories from Home

## Phase 22 — Immersive Trip-Building Flow
- [ ] Redesign interests step as photo-grid picker (real images, 2-col, label pill, checkmark)
- [ ] Build Tinder-swipe screen for attractions & restaurants (swipe right = add, left = skip)
- [ ] Build generated itinerary screen: timeline, walking/taxi times, day-by-day loz
- [ ] Add budget step: large visual slider that changes background by amount

## Phase 23 — DNA Learning Engine
- [ ] Build travelerDNA store with AsyncStorage persistence (interests, traits, swipes, hesitation times)
- [ ] Photo-grid interest picker with real images — selections update DNA in real time
- [ ] Tinder-swipe attractions screen — swipe + hesitation time feeds DNA traits
- [ ] Generated itinerary screen — timeline with walking/taxi times between stops
- [ ] DNA profile screen shows live-updating traits from all interactions

## Phase 24 — Destination Picker Before Swipe
- [ ] Build destination picker screen (visual grid of destinations with real photos)
- [ ] Wire: interests → destination picker → swipe (filtered by chosen destination)
- [ ] Pass chosen destination to swipe screen so only relevant attractions show
- [ ] Pass destination to itinerary screen for accurate loz generation

## Phase 24 — Destination Picker + DNA Summary
- [x] Build destination picker screen (visual grid with real photos, wire after interests)
- [x] Filter swipe attractions by chosen destination
- [x] Build DNA personality summary screen after swipe (what we learned, traits updated, interests boosted)
- [x] Wire: interests → destination picker → swipe → DNA summary → itinerary

## Phase 25 — Flow Fix + Smart Swipe Filtering
- [x] Remove destination-pick from flow (destination already chosen in plan.tsx)
- [x] Wire interests → swipe directly, passing destination + budget from plan.tsx
- [x] Fix slow image loading in interests grid (use Expo Image with lazy loading)
- [x] Filter swipe attractions by destination + budget level + selected interests
- [x] Add budget-aware filtering (e.g. Shopping + Luxury → high-end malls only)

## Phase 26 — All 9 Improvements

### High Priority
- [ ] Unique Unsplash images per attraction in swipe cards (not generic destination image)
- [ ] Book This Trip flow: cost summary + cashback calculation + booking buttons per component
- [ ] Trip Detail screen: tap trip → see full itinerary + edit/add/remove stops

### Medium Priority
- [ ] DNA Profile visualization in Profile tab: animated trait bars, traveler type badge
- [ ] "Surprise Me" mode in destination selection: pick destination by DNA
- [ ] Multi-traveler invite: "Add a traveler" → share link → merge DNA profiles

### Polish
- [ ] Onboarding screens (3 slides): philosophy explanation before first use
- [ ] Beautiful empty states across all screens with actionable CTAs

## Phase 27 — Trip Hub (Post-Booking Command Center)
- [ ] Build trip-hub.tsx — post-booking screen with AI concierge personality
- [ ] Countdown timer to departure date
- [ ] Live weather widget for destination
- [ ] Upsell cards with cashback badge: airport taxi, eSIM, travel insurance, hotel upgrade, activities
- [ ] Traveler connections: similar-DNA travelers going to same destination
- [ ] Split payment + invite travel partner flow
- [ ] Wire from book.tsx confirmation → trip-hub
- [ ] Register trip-hub in tabs layout

## Phase 28 — Food Preferences Gate + Trip Hub
- [ ] Build food-preferences.tsx — cuisines, foods to avoid, allergies, notes, saves to DNA
- [ ] Wire interests.tsx: if "food" selected → navigate to food-preferences before swipe
- [ ] Filter swipe restaurants by food preferences (cuisine type, avoid list, allergies)
- [ ] Build trip-hub.tsx — post-booking command center
- [ ] Trip Hub: AI concierge greeting with TRAVI personality
- [ ] Trip Hub: countdown timer to departure
- [ ] Trip Hub: live weather widget for destination
- [ ] Trip Hub: upsell cards (airport taxi, eSIM, travel insurance, hotel upgrade, activities) each with cashback badge
- [ ] Trip Hub: traveler connections (similar DNA travelers going same destination)
- [ ] Trip Hub: split payment + invite travel partner
- [ ] Wire book.tsx confirmation → trip-hub
- [ ] Register both screens in navigation layouts

## Phase 28 — Food Preferences Gate + Trip Hub
- [ ] Build food-preferences.tsx — cuisines, foods to avoid, allergies, notes
- [ ] All food preferences saved to DNA store (foodPreferences field)
- [ ] Wire interests.tsx: if "food" selected → navigate to food-preferences before swipe
- [ ] Filter swipe restaurants by food preferences (cuisine, avoid list, allergies)
- [ ] Build trip-hub.tsx — post-booking command center with AI concierge personality
- [ ] Trip Hub: countdown timer to departure
- [ ] Trip Hub: live weather widget for destination
- [ ] Trip Hub: upsell cards (airport taxi, eSIM, travel insurance, hotel upgrade, activities) each with cashback badge
- [ ] Trip Hub: traveler connections (similar DNA travelers going same destination)
- [ ] Trip Hub: split payment + invite travel partner
- [ ] Wire book.tsx confirmation → trip-hub
- [ ] Register both screens in navigation layouts

## Phase 29 — Food Preferences + Trip Hub (COMPLETED)
- [x] Build food-preferences.tsx — cuisines, foods to avoid, allergies, notes
- [x] All food preferences saved to DNA store (foodPreferences field)
- [x] Wire interests.tsx: if "food" selected → navigate to food-preferences before swipe
- [x] Build trip-hub.tsx — post-booking command center with AI concierge personality
- [x] Trip Hub: countdown timer to departure
- [x] Trip Hub: live weather widget for destination
- [x] Trip Hub: upsell cards (airport taxi, eSIM, travel insurance, hotel upgrade, activities) each with cashback badge
- [x] Trip Hub: traveler connections (similar DNA travelers going same destination)
- [x] Trip Hub: split payment + invite travel partner
- [x] Wire book.tsx confirmation → trip-hub
- [x] Register trip-hub in tabs layout as hidden route
- [x] 10 passing tests for food preferences + trip hub logic

## Phase 30 — Restaurant Filtering + Weather API + Push Notifications (COMPLETED)
- [x] Filter swipe restaurants by food preferences from DNA (cuisine match, avoid list, allergies)
- [x] Integrate Open-Meteo live weather API in Trip Hub (real temperature + condition + humidity)
- [x] Push notifications for trip reminders (3 days before: book taxi, 1 day before: check-in reminder)
- [x] Zero TypeScript errors

## Phase 31 — Itinerary & DNA Update Design Improvements
- [x] Itinerary: Replace gray header with gradient (brand colors)
- [x] Itinerary: Add animated day tab transitions
- [x] Itinerary: Polish stop cards with shadows and better spacing
- [x] Itinerary: Improve typography hierarchy
- [x] DNA Update: Animate trait bars (fill animation on mount)
- [x] DNA Update: Add gradient fills to trait bars
- [x] DNA Update: Fix duplicate score display bug
- [x] DNA Update: Add icons animation on mount

## Phase 32 — Booking Flow Redesign (2-Phase)
- [x] Phase 1: Flight-only booking with 15-minute countdown timer (airline-style urgency)
- [x] Phase 1: Flight card with full details (airline, route, times, class, cashback)
- [x] Phase 1: Apple Pay / "Book Flight" CTA
- [x] Phase 2: Full trip summary — hotel + all swipe-selected attractions
- [x] Phase 2: Each item has description + "More Info" link (opens in-app browser)
- [x] Phase 2: Total cashback summary
- [x] Phase 2: Apple Pay payment button
- [x] Phase 2: "Invite Friend to Split" button
- [x] Redesign itinerary.tsx — gradient header, better stop cards
- [x] Redesign dna-update.tsx — fix duplicate scores, animated bars with gradient fills

## Phase 33 — Itinerary Full Redesign
- [x] Fix oversized day tabs (compact horizontal pill selector)
- [x] Redesign timeline layout — clean, spacious, visually stunning
- [x] Better stop cards with proper image sizing
- [x] Compact header that doesn't waste space

## Phase 34 — Home Screen CTA Clarity
- [x] Add prominent "Plan a Trip" CTA button below hero image
- [ ] Clarify DNA card action text
- [ ] Reduce visual clutter / confusion on home screen
- [ ] Make user flow obvious: hero → CTA → trip planning

## Phase 35 — Explore Screen: Destination-Specific Immersive UI
- [ ] Destination-specific hero with cinematic slideshow
- [ ] Personality match score (% match based on DNA)
- [ ] Neighborhoods section with photos and vibe descriptions
- [ ] Top Experiences with price + cashback per item
- [ ] Food & Drink section with mouth-watering photos
- [ ] Hidden Gems section
- [ ] "Plan This Trip" CTA throughout
- [ ] Casino-level visual design: colorful, addictive, stunning

## Phase 36 — Wallet Redesign (Revolut-style) + Destination Detail
- [x] Wallet main: dramatic gradient balance card, tier progress, lifetime stats
- [x] Wallet redeem tab: featured rewards with photos, ways to redeem list
- [x] Wallet history tab: grouped by trip, transaction detail modal
- [x] Destination Detail screen: hero slideshow, personality match, neighborhoods, experiences+prices+cashback, food, hidden gems
- [x] Connect Explore destination cards to destination-detail screen

## Phase 37 — Explore Fix + In-Trip Chat
- [x] Fix Explore screen broken images (confirmed using local bundled assets)
- [x] Improve Explore visual design: more color, better hero card with real image
- [x] Build in-trip chat screen (AI concierge) accessible from Trip Hub
- [x] Chat: context-aware quick suggestions (nearby restaurant, change plan, I'm lost)
- [x] Floating chat button on Trip Hub

## Phase 30 — Screen Improvements
- [ ] Destination Detail screen (tap card in Explore → full screen with hero image, attractions, CTA)
- [ ] Explore 2-column grid toggle view
- [ ] Connect Plan a Trip button on Home to real planning flow
- [ ] Connect Profile DNA traits to real quiz data
- [ ] Sync Wallet tier badge with real points

## Profile Settings Fix (Broken Navigation)
- [x] Build Edit Profile screen
- [x] Build Privacy - [ ] Build Privacy & Security screen Security screen
- [x] Build Change Password screen
- [x] Build Language selector screen
- [x] Build Currency selector screen
- [x] Build TRAVI Pro subscription screen
- [x] Wire all routes in profile.tsx

## Critical Bug Fixes
- [x] Move settings screens out of (tabs)/ to prevent them appearing in tab bar
- [x] Fix react-native-maps iOS crash

## Onboarding Flow Fix
- [ ] Remove Activities and Pace steps from quiz.tsx
- [ ] Move activity/pace selection into trip planning flow

## Phase 29 — Social & Community Screens
- [x] Discover Travelers screen — search, DNA match %, connect button
- [x] DNA Compatibility screen — breakdown bars, shared interests, trip suggestions
- [x] Messages list screen — conversations, online status, unread badges
- [x] Message Chat screen — real-time chat UI, DNA match banner, send messages
- [x] Community Feed screen — posts with categories (tips/stories/questions/photos), likes
- [x] Navigation buttons (Messages + Community) added to Connecting tab header
- [x] All social screens registered in (social)/_layout.tsx
- [x] Zero TypeScript errors across all social screens
- [x] 17 database tables live in Railway PostgreSQL

## Phase 38 — PRD Full Implementation (from PRD v2.0)

### First Class DNA Assessment (9 Modules)
- [ ] Build first-class-dna.tsx — 9-module deep personality assessment
- [ ] Module 1: Identity (8-10 questions — who you are as a traveler)
- [ ] Module 2: Crisis (6-8 questions — how you handle travel problems)
- [ ] Module 3: Money (8-10 questions — budget attitudes, spending priorities)
- [ ] Module 4: Visual (6-8 questions — aesthetic preferences)
- [ ] Module 5: Brand (6-8 questions — brand loyalty, quality expectations)
- [ ] Module 6: Social (8-10 questions — solo vs. group, introversion/extraversion)
- [ ] Module 7: Sensory (6-8 questions — food, music, tactile preferences)
- [ ] Module 8: Future (6-8 questions — bucket list, dream destinations)
- [ ] Module 9: AI Challenge (4-6 scenario-based AI puzzles)
- [ ] Output: 8-dimension DNA scores (explorer/relaxer/adventurer/culturalist/foodie/photographer/historian/naturalist)
- [ ] Unlock 50% subscription discount on completion
- [ ] Wire from Profile → "Upgrade Your DNA" CTA

### Extended Onboarding (17 Steps)
- [ ] Build onboarding-travel-mode.tsx (Solo/Couple/Group/Family)
- [ ] Build onboarding-planning-style.tsx (Detailed/Spontaneous/Mix)
- [ ] Build onboarding-budget-mindset.tsx (psychology of spending)
- [ ] Build onboarding-pace.tsx (slider: chill ↔ packed schedule)
- [ ] Build onboarding-non-negotiables.tsx (must-haves and must-avoids)
- [ ] Build onboarding-food-preferences.tsx (cuisines, dietary, allergies)
- [ ] Build onboarding-allergies.tsx (specific allergy multi-select)
- [ ] Build onboarding-accessibility.tsx (mobility, visual, hearing, cognitive)
- [ ] Build onboarding-trip-directions.tsx (short-haul vs long-haul, domestic vs international)
- [ ] Build onboarding-business.tsx (real estate interests, property types, budget ranges)
- [ ] Build onboarding-dna-complete.tsx (summary + persona reveal)
- [ ] Wire all 17 onboarding steps in sequence after sign-up

### Trip Preparation Hub
- [ ] Build trip-prep.tsx — pre-departure services hub
- [ ] Trip Prep: destination weather, visa requirements, currency info
- [ ] Trip Prep: services grid (insurance, airport transfer, SIM card, luggage storage, currency exchange)
- [ ] Trip Prep: AI Concierge "Ask TRAVI anything about your upcoming trip"
- [ ] Trip Prep: AI-generated packing list based on destination + DNA + weather
- [ ] Trip Prep: Documents section (passport, visa, booking confirmations, travel insurance)
- [ ] Trip Prep: Editable pre-departure checklist with check/uncheck
- [ ] Wire from Trip Hub → "Prepare for Trip" CTA

### Flight / Hotel / Restaurant Detail Screens
- [ ] Build flight-detail.tsx (booking info, seat map, change flight, cancel, add baggage)
- [ ] Build hotel-detail.tsx (room info, amenities, photo gallery, edit booking, cancel)
- [ ] Build restaurant-detail.tsx (info, menu preview, reserve table, reviews, directions)
- [ ] Wire flight-detail from itinerary transport stops
- [ ] Wire hotel-detail from itinerary hotel stops
- [ ] Wire restaurant-detail from itinerary food stops and nearby map

### B2B Screens
- [ ] Build revenue-dashboard.tsx (MRR, CAC, CLV, churn, revenue chart, conversion rates)
- [ ] Build prospects-crm.tsx (company cards, search, filters, add prospect modal, bulk actions)
- [ ] Build regulations-tracker.tsx (pie chart, regulation cards, detail modal, status update)
- [ ] Wire all 3 B2B screens from Enterprise tab

### Gamification Screens
- [ ] Build badges.tsx (achievement badges grid, locked/unlocked states, progress)
- [ ] Build leaderboard.tsx (weekly/monthly/all-time tabs, user rank, top travelers)
- [ ] Build memory-hub.tsx (trip photos, highlights, stories, share to community)
- [ ] Build rewards-portal.tsx (available rewards, redeem flow, reward history)
- [ ] Wire badges from Profile achievements section
- [ ] Wire leaderboard from Community/Connecting tab

### Wallet KYC & Withdrawal
- [ ] Build wallet-kyc.tsx (identity verification, document upload, KYC levels 1/2/3)
- [ ] Build wallet-withdraw.tsx (bank transfer, amount, currency, fee display)
- [ ] Build wallet-exchange.tsx (currency exchange with live rates, fee display)
- [ ] Wire KYC from Wallet screen "Verify Identity" CTA
- [ ] Wire withdrawal from Wallet screen "Withdraw" button

### Destination Detail Immersive Screen
- [ ] Build destination-detail.tsx (full immersive screen per PRD §8/Appendix P)
- [ ] Hero: cinematic slideshow with destination name overlay
- [ ] DNA match score (% match based on user's DNA profile)
- [ ] Neighborhoods section with photos and vibe descriptions
- [ ] Top Experiences with price + cashback per item
- [ ] Food & Drink section with mouth-watering photos
- [ ] Hidden Gems section
- [ ] "Plan This Trip" CTA throughout
- [ ] Wire from Explore destination cards

### Home Screen Improvements
- [ ] Clarify DNA card action text (make it obvious what to tap)
- [ ] Reduce visual clutter on home screen
- [ ] Make user flow obvious: hero → CTA → trip planning
- [ ] Connect Plan a Trip button to real planning flow

### South America Hub & Dubai Cultural Screen
- [ ] Build south-america-hub.tsx (Brazil/Argentina/Colombia/Peru content, events, guides)
- [ ] Build dubai-cultural.tsx (Islamic etiquette, prayer times, halal/kosher, dress code, tipping)
- [ ] Wire both from Destination Guide tab

### Real Estate Enhancements
- [ ] Build real-estate-analysis.tsx (market deep dive, price trends, ROI calculator)
- [ ] Build real-estate-contacts.tsx (agent directory, developer contacts, consultation booking)
- [ ] Build real-estate-guide.tsx (Israeli investor guide, UAE property law, off-plan explained)
- [ ] Build property-detail.tsx (gallery, specs, ROI calculator, map, contact agent)
- [ ] Wire all from Real Estate tab

### Quick DNA 8-Dimension Enhancement
- [ ] Enhance quiz result to show 8-dimension DNA scores (explorer/relaxer/adventurer/culturalist/foodie/photographer/historian/naturalist)
- [ ] Add confidence score per destination recommendation
- [ ] Add share card generation (Instagram Stories format)
- [ ] Add "Retake Quiz" functionality
- [ ] Add fun facts per DNA type

### Settings Screens
- [ ] Build settings-notifications.tsx (push, email, SMS preferences)
- [ ] Build settings-language-currency.tsx (language + currency combined)
- [ ] Build settings-emergency.tsx (emergency contacts, medical info, SOS settings)
- [ ] Build settings-health-activity.tsx (fitness level, health conditions for trip planning)
- [ ] Wire all from Profile settings

### Invite & Social
- [ ] Build invite-partner.tsx (accept/decline trip invite, merge itineraries)
- [ ] Build wishlist.tsx (saved destinations, experiences, hotels)
- [ ] Wire wishlist from Explore save button
- [ ] Wire invite-partner from Trip Hub "Invite Travel Partner"

## Phase 39 — PRD Full Implementation (Session 3 — Apr 3 2026)

- [x] First Class DNA Assessment (9 modules, 60+ questions, 8-dimension output)
- [x] Extended deep onboarding (10 steps: travel mode, planning style, budget mindset, pace, non-negotiables, food prefs, allergies, accessibility, trip directions, business integration)
- [x] Trip Preparation Hub (weather, visa, services grid, AI packing list, documents, checklist)
- [x] Flight Detail screen (seat map, amenities, booking flow, cashback)
- [x] Hotel Detail screen (photos, amenities, room types, reviews, booking)
- [x] Restaurant Detail screen (menu, reviews, reservation)
- [x] B2B Prospects CRM screen (pipeline, contacts, deal tracking)
- [x] Badges & Leaderboard screen (badge collection, global leaderboard)
- [x] Memory Hub screen (trip photo journal, notes, highlights)
- [x] Rewards Portal screen (cashback, points redemption, tier benefits)
- [x] Wallet KYC verification flow (document upload, identity steps)
- [x] Wallet withdrawal screen (bank/PayPal/crypto options)
- [x] South America Hub screen (6 countries: Brazil, Argentina, Colombia, Peru, Chile, Ecuador)
- [x] Real Estate Market Analysis screen (Dubai/Abu Dhabi/RAK, price trends, ROI calculator)
- [x] Real Estate Contacts screen (agents, developers, lawyers, mortgage — free consultation booking)
- [x] Real Estate Investor Guide screen (5 chapters: why UAE, buying process, off-plan, legal, mortgage)
- [x] Wire all new screens to existing navigation (profile, real-estate, enterprise, wallet tabs)
- [x] Zero TypeScript errors confirmed

## Phase 39 — Full PRD Completion (Session 3)
- [x] First Class DNA Assessment (9 modules, 60+ questions, 8-dimension scoring)
- [x] Deep Onboarding (10 extended personality steps)
- [x] Trip Preparation Hub (weather/visa/packing/checklist)
- [x] Flight Detail screen (seat map, amenities, booking)
- [x] Hotel Detail screen (photos, amenities, room types, reviews)
- [x] Restaurant Detail screen (menu, reviews, reservation)
- [x] Prospects CRM screen (pipeline, contacts, deal tracking)
- [x] Badges & Leaderboard screen
- [x] Memory Hub screen (trip journal)
- [x] Rewards Portal screen
- [x] Wallet KYC verification flow
- [x] Wallet Withdrawal screen
- [x] Wallet Exchange screen
- [x] Property Detail screen
- [x] South America Hub screen
- [x] Real Estate Analysis screen
- [x] Real Estate Contacts screen
- [x] Real Estate Guide screen
- [x] Notifications Settings screen
- [x] Language & Currency Settings screen
- [x] Emergency Contacts screen
- [x] Health & Activity Settings screen
- [x] Wishlist screen
- [x] Invite Partner screen
- [x] Wire Explore → South America Hub banner
- [x] Wire Real Estate → Property Detail navigation
- [x] Wire Trip Hub → Invite Travel Partner button
- [x] Wire Profile → First Class DNA Assessment
- [x] Wire Profile → Badges, Memory Hub, Rewards Portal
- [x] Wire Profile → Deep Onboarding, all Settings screens
- [x] Fix server/db.ts TypeScript type issue (NodePgDatabase → any)
- [x] Add tsconfig.server.json for server-side TypeScript
- [x] Add skipLibCheck to tsconfig.json

## Phase 29 — Full Build: Backend, Engines, Screens, Railway

### Database & Backend
- [ ] Database schema — 17 tables (trips, dna_profiles, activities, bookings, wallet, transactions, points, badges, destinations, properties, re_contacts, social_connections, messages, notifications, price_alerts, compliance_rules)
- [x] Seed data — realistic mock data for all tables (23 tables, Railway PostgreSQL)
- [ ] tRPC router: trips (CRUD, search, filter)
- [ ] tRPC router: dna (profile, update, scoring)
- [ ] tRPC router: bookings (create, cancel, history)
- [ ] tRPC router: wallet (balance, transfer, exchange)
- [ ] tRPC router: ai (chat, itinerary, recommendations)
- [ ] tRPC router: social (connections, messages, community)
- [ ] tRPC router: support (tickets, FAQ)
- [ ] tRPC router: enterprise (CRM, revenue, prospects)

### Logic Engines
- [ ] DNA Scoring Engine — 8 dimensions (0-100), confidence scores
- [ ] Matching Engine — destination scoring based on DNA
- [ ] Points Engine — earn/spend rules, tier progression
- [ ] XP/Gamification — 5 tiers (Bronze→Diamond), badges
- [ ] Learning Engine — 7 phases, implicit signals tracking
- [ ] Multi-currency Wallet — 12 currencies, exchange rates
- [ ] Price Alert Monitor — background job

### DNA Swipe
- [ ] Expand to 116 items across 11 categories

### Missing Screens
- [x] Revenue Dashboard (MRR, CAC, CLV, Churn, pricing tiers)
- [x] Prospects / CRM — B2B lead management
- [x] Regulations Tracker — compliance
- [ ] Dubai Cultural Guide (prayers, kosher/halal, customs)
- [ ] Trip Preparation Hub — pre-trip services, AI checklist
- [ ] Property Detail — gallery, ROI calculator, specs
- [ ] RE Investment Guide — guide for Israeli investors
- [ ] RE Contacts — agents, developers, lawyers
- [ ] South America Hub — destinations, carnival, tasks
- [ ] Social: Discover screen
- [ ] Social: Compatibility screen
- [ ] Social: Messages screen
- [ ] Social: Message Chat screen
- [ ] Social: Community screen

### Integrations
- [ ] Stripe — payments, subscriptions, webhooks
- [ ] Socket.IO — real-time messaging
- [ ] Push Notifications — Expo Notifications connected

### Tests
- [x] Vitest unit tests for DNA Scoring Engine
- [x] Vitest unit tests for Matching Engine
- [x] Vitest unit tests for Points Engine
- [x] Vitest unit tests for tRPC routers (wallet logic)

### Infrastructure
- [x] Dockerfile for server
- [x] Railway deployment configuration
- [x] CI/CD — GitHub Actions (lint, test, build, deploy)
- [x] Environment variables for production
