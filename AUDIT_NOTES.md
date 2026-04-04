# UX Audit — Neutral Mockup Conversion

## Goal
Convert all 5 main tab screens from heavy decorative styling to a clean, neutral, iOS-native mockup.
Focus on UX correctness and information architecture, NOT visual design.

## Current Issues Found

### Global
- Each screen defines its own `C = { ... }` color object — duplicated 5 times
- Heavy use of LinearGradient headers — visually noisy
- Custom fonts (Chillax/Satoshi) referenced but may not load on all platforms
- Tab bar has custom pink/purple styling

### Home Screen
- Overly complex hero section with image background + gradient overlay
- Too many sections (7+) — overwhelming
- Mock data scattered inline
- Agent FAB overlapping content

### Explore Screen
- Good information architecture (search, filters, destination cards, hidden gems)
- Filter chips work correctly
- Destination cards have good data (match %, price, days, tags)
- FlatList used correctly for horizontal scroll

### Trips Screen
- Good filter tabs (All/Upcoming/Active/Completed)
- Trip cards have correct data (dates, travelers, budget, tags)
- Empty state exists with CTA
- Stats row in header (upcoming count, completed count, total spent)

### Wallet Screen
- Good information: balance, points, cashback
- Card carousel works
- Quick actions (Top Up, Transfer, Redeem, History)
- Points progress bar
- Transaction list with categories
- Redeem options grid with emojis (should use icons)

### Profile Screen
- @ts-nocheck — needs fixing
- Toggle switches don't actually update state
- DNA traits with progress bars
- Achievements with emoji icons
- Settings sections properly grouped
- Sign out button exists

## Neutral Mockup Plan
1. Create simple neutral color tokens (dark gray bg, white text, subtle borders)
2. Replace gradient headers with simple flat headers
3. Keep all data/information exactly as-is
4. Simplify card styling (flat bg, subtle border, no gradients)
5. Fix Profile toggle state bug
6. Keep tab bar but simplify colors
