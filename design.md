# TRAVI — Mobile App Interface Design

## Brand Identity

| Element | Value |
|---------|-------|
| Primary Color | `#7B2FBE` — Deep Purple |
| Accent Color | `#E91E8C` — Hot Pink |
| Background | `#1A0533` — Dark Purple |
| Card Background | `#2D1B69` — Mid Purple |
| Text Primary | `#FFFFFF` |
| Text Muted | `#A78BCA` |
| Success | `#4CAF50` |
| Warning | `#FF9800` |
| Error | `#F44336` |
| Gradient | Purple `#7B2FBE` → Pink `#E91E8C` (left to right) |
| Font | SF Pro Display (iOS) / Roboto (Android) |
| Mascot | TRAVI Duck — appears at onboarding, completion, empty states |

## Screen List

### Auth / Onboarding
1. **Splash** — TRAVI logo + duck mascot, animated entrance
2. **Sign Up** — Email / Google / Apple / Guest mode
3. **Email Verification** — 6-digit OTP input
4. **Profile Setup** — Photo upload + full name
5. **Welcome** — Duck mascot + "Get Started" CTA
6. **Personality Quiz** — 10 scenario-based questions (swipe cards)

### Main App (Tab Bar)
7. **Home** — Personalized dashboard (before/during/after trip states)
8. **Trips** — Upcoming, Completed, Deals tabs
9. **Wallet** — TRAVI Points balance, history, cashback
10. **Explore** — Community feed, discover travelers
11. **Settings** — Profile, notifications, preferences

### Trip Planning Flow
12. **Plan Adventure** — Destination, dates, travelers, budget
13. **Flights & Hotel** — Toggle: already have / let TRAVI book
14. **Choose Interests** — Visual cards (Nature, Culture, Food, etc.)
15. **Choose Landmarks** — AI-selected, user customizable
16. **Choose Flight** — 3 filtered options
17. **Enter Flight Details** — Manual or PDF upload
18. **Choose Hotel** — 3-5 filtered options
19. **Enter Hotel Details** — Manual or PDF upload
20. **Trip Summary** — Day-by-day itinerary
21. **Trip Completion** — Duck mascot + "Your trip is all set"

### Live Trip Mode
22. **Live Home** — Today's itinerary, weather, tips widget
23. **Map View** — Route visualization for the day
24. **Chat with TRAVI** — Conversational AI interface
25. **SOS Mode** — Emergency contacts, hospital, pharmacy, embassy

### Post-Trip
26. **Trip Completed** — Summary screen
27. **Expense Breakdown** — Category breakdown + TRAVI Points earned
28. **Trip Rating** — 1-10 + open feedback

### Wallet & KYC
29. **Wallet Detail** — Balance, history, promo tab
30. **Withdraw** — Transfer points/cashback

## Key User Flows

### New User Onboarding
Splash → Sign Up → Email OTP → Profile Setup → Welcome → Personality Quiz → Home

### Create a Trip
Home (+) → Plan Adventure → Flights & Hotel → Interests → Landmarks → Choose Flight → Enter Flight → Choose Hotel → Enter Hotel → Trip Summary → Completion

### Live Trip
Home (trip active) → Live Trip Mode → Chat with TRAVI / Map / SOS

### End of Trip
Live Trip (last day) → Trip Completed → Expense Breakdown → Rating → Thank You

## Color Choices (Specific to TRAVI Brand)

The app uses an **always-dark** theme (no light mode) to match the deep space/travel aesthetic:
- **Background**: `#1A0533` — Deep cosmic purple, sets the premium travel mood
- **Cards**: `#2D1B69` — Slightly lighter purple for elevation
- **Primary CTA**: Gradient `#7B2FBE` → `#E91E8C` — Energetic purple-to-pink
- **Points/Wallet**: Gold `#FFD700` accent for TRAVI Points display
- **Live Mode**: Subtle green glow `#4CAF50` for active trip indicators

## UI Patterns

- Cards with 16px rounded corners for all content blocks
- Gradient buttons: Purple → Pink (left to right) for primary CTAs
- Bottom navigation: Home / Trips / Wallet / Explore / Settings
- Floating action button (+) on Home for creating new trips
- Status badges: Upcoming (purple), Completed (green), Deal (orange), Failed (red)
- TRAVI Points displayed in header next to wallet icon at all times
- Personality Quiz: Full-screen swipeable scenario cards
- Trip planning: Step indicator at top showing progress (1/10)
