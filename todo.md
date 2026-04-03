# TRAVI App — Master TODO

> Last updated: April 4, 2026
> Source: TRAVI Wireframe Spec v2.0 — 77 screens
> Status: ALL screens rebuilt from scratch as neutral wireframes
> Rule: After completing each screen, double-check against spec before marking [x]

---

## Phase 1 — UX / UI / Wireframes — ALL 77 SCREENS FROM SCRATCH

### Part A — Auth & Onboarding (Screens 1–10)
- [ ] Screen 1 — Splash Screen (/splash)
- [ ] Screen 2 — Welcome Screen (/welcome)
- [ ] Screen 3 — Sign Up (/signup)
- [ ] Screen 4 — Verify Email (/verify-email)
- [ ] Screen 5 — Profile Setup (/profile-setup)
- [ ] Screen 6 — Welcome to TRAVI (/welcome-travi)
- [ ] Screen 7 — Quick DNA Categories (/quick-dna/categories)
- [ ] Screen 8 — Quick DNA Swipe (/quick-dna/swipe)
- [ ] Screen 9 — Quick DNA Schedule (/quick-dna/schedule)
- [ ] Screen 10 — Quick DNA Summary (/quick-dna/summary)

### Part B — Discovery Mode (Screens 11–19)
- [ ] Screen 11 — Home Dashboard (/home)
- [ ] Screen 12 — Explore Feed (/explore)
- [ ] Screen 13 — Search Modal (/search)
- [ ] Screen 14 — Destination Detail (/destination-detail)
- [ ] Screen 15 — Profile & Settings (/profile)
- [ ] Screen 16 — DNA Management (/profile/dna)
- [ ] Screen 17 — Wishlist (/wishlist)
- [ ] Screen 18 — Notifications Center (/notifications)
- [ ] Screen 19 — Plan Trip Entry (/plan-trip)

### Part C — Planning Mode (Screens 20–31)
- [ ] Screen 20 — Trip Builder Destination Select
- [ ] Screen 21 — Trip Builder Dates & Travelers
- [ ] Screen 22 — Trip Builder Flight Select
- [ ] Screen 23 — Trip Builder Hotel Select
- [ ] Screen 24 — Hotel Detail
- [ ] Screen 25 — Activity Select Swipe
- [ ] Screen 26 — Itinerary Builder
- [ ] Screen 27 — Cart / Trip Review
- [ ] Screen 28 — Checkout Phase 1 — Review & Hold
- [ ] Screen 29 — Payment Method Modal
- [ ] Screen 30 — Checkout Phase 2 — Payment
- [ ] Screen 31 — Booking Confirmation

### Part D — Pre-Trip Mode (Screens 32–34)
- [ ] Screen 32 — Pre-Trip Dashboard
- [ ] Screen 33 — Pre-Trip Checklist
- [ ] Screen 34 — Pre-Trip Documents

### Part E — Live Mode (Screens 35–43)
- [ ] Screen 35 — Live Dashboard
- [ ] Screen 36 — Live Timeline
- [ ] Screen 37 — Live Map
- [ ] Screen 38 — Activity Detail (Live)
- [ ] Screen 39 — Expenses Tracker
- [ ] Screen 40 — Memories Gallery
- [ ] Screen 41 — AI Chat (Live Concierge)
- [ ] Screen 42 — Emergency Contacts
- [ ] Screen 43 — Trip Settings

### Part F — Post-Trip Mode (Screens 44–47)
- [ ] Screen 44 — Post-Trip Celebration
- [ ] Screen 45 — Trip Summary
- [ ] Screen 46 — Rate & Review
- [ ] Screen 47 — Photo Gallery (Post-Trip)

### Part G — Universal Screens (Screens 48–59)
- [ ] Screen 48 — Wallet Full View
- [ ] Screen 49 — Add Funds
- [ ] Screen 50 — Transaction History
- [ ] Screen 51 — Split Payment Calculator
- [ ] Screen 52 — KYC Verification
- [ ] Screen 53 — Membership & Upgrade
- [ ] Screen 54 — Profile Edit
- [ ] Screen 55 — Settings
- [ ] Screen 56 — Notifications Center (Discovery)
- [ ] Screen 57 — My Trips
- [ ] Screen 58 — Wishlist (Full View)
- [ ] Screen 59 — Search Results

### Part H+I — Error, Loading & Special (Screens 60–77)
- [ ] Screen 60 — No Internet Connection (overlay)
- [ ] Screen 61 — API Error / Server Error (modal)
- [ ] Screen 62 — Payment Failed
- [ ] Screen 63 — Session Expired
- [ ] Screen 64 — GPS Permission Denied
- [ ] Screen 65 — Camera Permission Denied
- [ ] Screen 66 — Help & Support
- [ ] Screen 67 — Empty State — No Trips
- [ ] Screen 68 — Empty State — No Search Results
- [ ] Screen 69 — Loading — Initial App Load
- [ ] Screen 70 — Loading — Matching Engine (overlay)
- [ ] Screen 71 — Loading — Payment Processing (overlay)
- [ ] Screen 72 — Onboarding — First Swipe Tutorial
- [ ] Screen 73 — Onboarding — Welcome Tour
- [ ] Screen 74 — First DNA Completion Celebration (modal)
- [ ] Screen 75 — First Booking Success Moment (overlay)
- [ ] Screen 76 — Change Email / Password
- [ ] Screen 77 — Delete Account Confirmation

### Global Elements
- [ ] Bottom Nav Bar (5 tabs, 60px + safe area, hide in Planning/Live/DNA)
- [ ] AI Chat FAB (64x64, borderRadius 20, pulse, badge)
- [ ] Mode Badge (header pill: Planning/Live/Post-Trip)
- [ ] Emergency Exit (Live Mode top-left)
- [ ] Route groups: (pre-trip), (post-trip) layouts
- [ ] Register all screens in their respective _layout.tsx files

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
