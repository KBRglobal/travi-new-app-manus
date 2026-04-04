# TRAVI App — Master TODO

> Last updated: April 4, 2026
> Source: TRAVI Wireframe Spec v2.0 + Part 2 (Design Tokens) + Part 3 (Social + Points)
> Status: 96 screens built as neutral wireframes
> Rule: After completing each screen, double-check against spec before marking [x]

---

## Phase 1 — UX / UI / Wireframes — ALL SCREENS FROM SCRATCH

### Part A — Auth & Onboarding (Screens 1–10)
- [x] Screen 1 — Splash Screen (/splash)
- [x] Screen 2 — Welcome Screen (/welcome)
- [x] Screen 3 — Sign Up (/signup)
- [x] Screen 4 — Verify Email (/verify-email)
- [x] Screen 5 — Profile Setup (/profile-setup)
- [x] Screen 6 — Welcome to TRAVI (/welcome-travi)
- [x] Screen 7 — Quick DNA Categories (/quick-dna/categories)
- [x] Screen 8 — Quick DNA Swipe (/quick-dna/swipe)
- [x] Screen 9 — Quick DNA Schedule (/quick-dna/schedule)
- [x] Screen 10 — Quick DNA Summary (/quick-dna/summary)

### Part B — Discovery Mode (Screens 11–19)
- [x] Screen 11 — Home Dashboard (/home)
- [x] Screen 12 — Explore Feed (/explore)
- [x] Screen 13 — Search Modal (/search)
- [x] Screen 14 — Destination Detail (/destination-detail)
- [x] Screen 15 — Profile & Settings (/profile)
- [x] Screen 16 — DNA Management (/profile/dna)
- [x] Screen 17 — Wishlist (/wishlist)
- [x] Screen 18 — Notifications Center (/notifications)
- [x] Screen 19 — Plan Trip Entry (/plan-trip)

### Part C — Planning Mode (Screens 20–31)
- [x] Screen 20 — Trip Builder Destination Select
- [x] Screen 21 — Trip Builder Dates & Travelers
- [x] Screen 22 — Trip Builder Flight Select
- [x] Screen 23 — Trip Builder Hotel Select
- [x] Screen 24 — Hotel Detail
- [x] Screen 25 — Activity Select Swipe
- [x] Screen 26 — Itinerary Builder
- [x] Screen 27 — Cart / Trip Review
- [x] Screen 28 — Checkout Phase 1 — Review & Hold
- [x] Screen 29 — Payment Method Modal
- [x] Screen 30 — Checkout Phase 2 — Payment
- [x] Screen 31 — Booking Confirmation

### Part D — Pre-Trip Mode (Screens 32–34)
- [x] Screen 32 — Pre-Trip Dashboard
- [x] Screen 33 — Pre-Trip Checklist
- [x] Screen 34 — Pre-Trip Documents

### Part E — Live Mode (Screens 35–43)
- [x] Screen 35 — Live Dashboard
- [x] Screen 36 — Live Timeline
- [x] Screen 37 — Live Map
- [x] Screen 38 — Activity Detail (Live)
- [x] Screen 39 — Expenses Tracker
- [x] Screen 40 — Memories Gallery
- [x] Screen 41 — AI Chat (Live Concierge)
- [x] Screen 42 — Emergency Contacts
- [x] Screen 43 — Trip Settings

### Part F — Post-Trip Mode (Screens 44–47)
- [x] Screen 44 — Post-Trip Celebration
- [x] Screen 45 — Trip Summary
- [x] Screen 46 — Rate & Review
- [x] Screen 47 — Photo Gallery (Post-Trip)

### Part G — Universal Screens (Screens 48–59)
- [x] Screen 48 — Wallet Full View
- [x] Screen 49 — Add Funds
- [x] Screen 50 — Transaction History
- [x] Screen 51 — Split Payment Calculator
- [x] Screen 52 — KYC Verification
- [x] Screen 53 — Membership & Upgrade
- [x] Screen 54 — Profile Edit
- [x] Screen 55 — Settings
- [x] Screen 56 — Notifications Center (Discovery) — same as Screen 18
- [x] Screen 57 — My Trips — same as Trips tab
- [x] Screen 58 — Wishlist (Full View) — same as Screen 17
- [x] Screen 59 — Search Results — part of Screen 13
- [x] Screen 66 — Help & Support

### Part H+I — Error, Loading & Special (Screens 60–77)
- [x] Screen 60 — No Internet Connection (overlay)
- [x] Screen 61 — API Error / Server Error (modal)
- [x] Screen 62 — Payment Failed
- [x] Screen 63 — Session Expired
- [x] Screen 64 — GPS Permission Denied
- [x] Screen 65 — Camera Permission Denied
- [x] Screen 67 — Empty State — No Trips
- [x] Screen 68 — Empty State — No Search Results
- [x] Screen 69 — Loading — Initial App Load
- [x] Screen 70 — Loading — Matching Engine (overlay)
- [x] Screen 71 — Loading — Payment Processing (overlay)
- [x] Screen 72 — Onboarding — First Swipe Tutorial
- [x] Screen 73 — Onboarding — Welcome Tour
- [x] Screen 74 — First DNA Completion Celebration (modal)
- [x] Screen 75 — First Booking Success Moment (overlay)
- [x] Screen 76 — Change Email / Password
- [x] Screen 77 — Delete Account Confirmation

### Part J — Social Layer (Screens 78–86) — from Part 3 spec
- [x] Screen 78 — Community Feed
- [x] Screen 79 — Discover Travelers
- [x] Screen 80 — Travel Compatibility Score
- [x] Screen 81 — Traveler Card Swipe
- [x] Screen 82 — Traveler Profile
- [x] Screen 83 — Match/Connect Flow
- [x] Screen 84 — Messages List
- [x] Screen 85 — Chat Screen
- [x] Screen 86 — Travel Buddies

### Part K — TRAVI Points (Screens 91–100) — from Part 3 spec
- [x] Screen 91 — Points Dashboard
- [x] Screen 92 — Redeem Points Hub
- [x] Screen 93 — Airline Miles
- [x] Screen 94 — Partner Detail
- [x] Screen 95 — Gift Cards
- [x] Screen 96 — Earn Guide
- [x] Screen 97 — Points Transactions
- [x] Screen 98 — Membership Perks
- [x] Screen 99 — Referrals
- [x] Screen 100 — Redeem Confirmation

### Global Elements
- [x] Screen Navigator Hub (index.tsx — browse all 96 screens)
- [x] Route groups registered: (auth), (tabs), (trip), (dna), (social), (points), (error), (special)
- [ ] Bottom Nav Bar (5 tabs, 60px + safe area, hide in Planning/Live/DNA)
- [ ] AI Chat FAB (64x64, borderRadius 20, pulse, badge)
- [ ] Mode Badge (header pill: Planning/Live/Post-Trip)
- [ ] Emergency Exit (Live Mode top-left)

### Design Application (from Part 2 spec — AFTER wireframes approved)
- [ ] Apply visual design tokens (colors, gradients, typography)
- [ ] Apply component library styles (cards, buttons, inputs, badges)
- [ ] Apply animation system (transitions, micro-interactions)
- [ ] Apply screen-specific visual specs

---

## Phase 2 — Backend / Infra / Logic (LATER — DO NOT TOUCH NOW)

### Security
- [ ] Monitor minimatch@9.0.5 — ReDoS
- [ ] Monitor brace-expansion@2.0.2 — Infinite Loop

### Auth
- [ ] Email verification OTP (needs API key)

### DB Connections
- [ ] DNA screens → PostgreSQL
- [ ] Enterprise screens → PostgreSQL
- [ ] Notifications → PostgreSQL

### Real-time
- [ ] Server-side Socket.IO
- [ ] Trip group chat
- [ ] Server-side push notifications
- [ ] Price alert triggers
- [ ] Trip reminders

### Payments
- [ ] react-native-iap setup
- [ ] App Store subscription products
- [ ] Google Play subscription products
- [ ] IAP purchase flow
- [ ] Receipt validation
- [ ] Restore purchases

### Backend Logic
- [ ] DNA 8-dimension scoring
- [ ] Surprise Me algorithm
- [ ] Multi-traveler DNA merge
- [ ] Cashback calculation engine
