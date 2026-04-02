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
