# TRAVI App — Master TODO

> Design DNA: Home Dashboard (approved) is the visual reference for all screens.
> Design System: constants/design-system.ts — single source of truth.
> Rule: Background #0A0514 solid. Glass cards. Chillax-Bold headings. Satoshi body. No emoji.

---

## Global Components
- [x] Design system constants (constants/design-system.ts)
- [x] Home Dashboard — approved visual DNA
- [x] Tab Bar — 6 tabs (Home/Explore/Trips/Social/Points/Profile), #120824, active pink pill
- [ ] GlassCard reusable component
- [ ] GradientButton component
- [ ] ScreenHeader component (per-mode gradient)
- [ ] AI Chat FAB (64×64 rounded-square, gradient)
- [ ] EmptyState component (mascot + CTA)

---

## Phase 1 — Auth & Onboarding (Screens 1–10)
- [x] Screen 1 — Splash (/splash)
- [x] Screen 2 — Welcome (/welcome)
- [x] Screen 3 — Sign Up (/signup)
- [x] Screen 4 — Verify Email (/verify-email)
- [x] Screen 5 — Profile Setup (/profile-setup)
- [x] Screen 6 — Welcome to TRAVI (/welcome-travi)
- [x] Screen 7 — Quick DNA Categories (/quick-dna/categories)
- [x] Screen 8 — Quick DNA Swipe (/quick-dna/swipe)
- [x] Screen 9 — Quick DNA Schedule (/quick-dna/schedule)
- [x] Screen 10 — Quick DNA Summary (/quick-dna/summary)

## Phase 2 — Discovery Mode (Screens 11–19)
- [x] Screen 11 — Home Dashboard (/home) — APPROVED VISUAL DNA
- [x] Screen 12 — Explore Feed (/explore)
- [x] Screen 13 — Search Modal (/search)
- [x] Screen 14 — Destination Detail (/destination-detail)
- [x] Screen 15 — Profile & Settings (/profile)
- [x] Screen 16 — DNA Management (/profile/dna)
- [x] Screen 17 — Wishlist (/wishlist)
- [x] Screen 18 — Notifications Center (/notifications)
- [x] Screen 19 — Plan Trip Entry (/plan-trip)

## Phase 3 — Planning Mode (Screens 20–31)
- [x] Screen 20 — Trip Builder: Destination Select
- [x] Screen 21 — Trip Builder: Dates & Travelers
- [x] Screen 22 — Trip Builder: Flight Select
- [x] Screen 23 — Trip Builder: Hotel Select
- [x] Screen 24 — Hotel Detail
- [x] Screen 25 — Activity Select Swipe
- [x] Screen 26 — Itinerary Builder
- [x] Screen 27 — Cart / Trip Review
- [x] Screen 28 — Checkout Phase 1
- [x] Screen 29 — Payment Method Modal
- [x] Screen 30 — Checkout Phase 2 Payment
- [x] Screen 31 — Booking Confirmation

## Phase 4 — Pre-Trip Mode (Screens 32–34)
- [x] Screen 32 — Pre-Trip Dashboard
- [x] Screen 33 — Pre-Trip Checklist
- [x] Screen 34 — Pre-Trip Documents

## Phase 5 — Live Mode (Screens 35–43)
- [x] Screen 35 — Live Dashboard
- [x] Screen 36 — Live Timeline
- [x] Screen 37 — Live Map
- [x] Screen 38 — Activity Detail Live
- [x] Screen 39 — Expenses Tracker
- [x] Screen 40 — Memories Gallery
- [x] Screen 41 — AI Chat Live Concierge
- [x] Screen 42 — Emergency Contacts
- [x] Screen 43 — Trip Settings

## Phase 6 — Post-Trip Mode (Screens 44–47)
- [x] Screen 44 — Post-Trip Celebration
- [x] Screen 45 — Trip Summary
- [x] Screen 46 — Rate & Review
- [x] Screen 47 — Photo Gallery Post-Trip

## Phase 7 — Universal Screens (Screens 48–59)
- [x] Screen 48 — Wallet Full View
- [x] Screen 49 — Add Funds
- [x] Screen 50 — Transaction History
- [x] Screen 51 — Split Payment Calculator
- [x] Screen 52 — KYC Verification
- [x] Screen 53 — Membership & Upgrade
- [x] Screen 54 — Profile Edit
- [x] Screen 55 — Settings
- [x] Screen 56 — Notifications Center
- [x] Screen 57 — My Trips
- [x] Screen 58 — Wishlist Full View
- [x] Screen 59 — Search Results
- [x] Screen 66 — Help & Support

## Phase 8 — Error, Loading & Special (Screens 60–77)
- [x] Screen 60 — No Internet Connection
- [x] Screen 61 — API Error / Server Error
- [x] Screen 62 — Payment Failed
- [x] Screen 63 — Session Expired
- [x] Screen 64 — GPS Permission Denied
- [x] Screen 65 — Camera Permission Denied
- [x] Screen 67 — Empty State: No Trips
- [x] Screen 68 — Empty State: No Search Results
- [x] Screen 69 — Loading: Initial App Load
- [x] Screen 70 — Loading: Matching Engine
- [x] Screen 71 — Loading: Payment Processing
- [x] Screen 72 — Onboarding: First Swipe Tutorial
- [x] Screen 73 — Onboarding: Welcome Tour
- [x] Screen 74 — First DNA Completion Celebration
- [x] Screen 75 — First Booking Success Moment
- [x] Screen 76 — Change Email/Password
- [x] Screen 77 — Delete Account Confirmation

## Phase 9 — Social Layer (Screens 78–90)
- [x] Screen 78 — Community Feed
- [x] Screen 79 — Discover Travelers
- [x] Screen 80 — Travel Compatibility Score
- [x] Screen 81 — Traveler Card Swipe
- [x] Screen 82 — Traveler Profile
- [x] Screen 83 — Match/Connect Flow
- [x] Screen 84 — Messages List
- [x] Screen 85 — Chat Screen
- [x] Screen 86 — Travel Buddies
- [x] Screen 87 — Group Trip Invite (/social/group-invite)
- [x] Screen 88 — Group Trip View (/social/group/:id)
- [x] Screen 89 — Shared Wishlist (/social/shared-wishlist)
- [x] Screen 90 — Social Settings (/social/settings)

## Phase 10 — TRAVI Points (Screens 91–100)
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

---

## Navigation Fixes (Completed)
- [x] Fixed trip planning funnel navigation (destination-select → dates-travelers → flights → hotels → swipe → itinerary-builder → cart → checkout → checkout-payment → confirmation → trips)
- [x] Fixed DNA flow navigation (quick-swipe → schedule → summary → tabs)
- [x] Fixed post-trip flow navigation (post-trip-celebration → rate-review → trip-summary → trips)
- [x] Fixed social community navigation (community → discover, traveler-profile)
- [x] Fixed pre-trip dashboard navigation (pre-trip-checklist, pre-trip-documents)
- [x] Fixed plan-trip → /(trip)/plan navigation
- [x] Updated trip layout to register all 50+ screens
- [x] Updated live layout to register expense-tracker and trip-review
- [x] Fixed all TypeScript errors (0 errors)

---

## Design Rollout — Apply Approved Visual DNA to All Screens
> Priority: Apply design system from constants/design-system.ts to every screen
> Reference: Home Dashboard (Screen 11) is the approved visual template

- [ ] Apply design DNA to Auth screens (1–10)
- [ ] Apply design DNA to Discovery screens (12–19) — Explore, Search, Destination, Profile, DNA, Wishlist, Notifications, Plan Entry
- [ ] Apply design DNA to Planning screens (20–31)
- [ ] Apply design DNA to Pre-Trip screens (32–34)
- [ ] Apply design DNA to Live screens (35–43)
- [ ] Apply design DNA to Post-Trip screens (44–47)
- [ ] Apply design DNA to Universal screens (48–59, 66)
- [ ] Apply design DNA to Error/Loading screens (60–77)
- [ ] Apply design DNA to Social screens (78–90)
- [ ] Apply design DNA to Points screens (91–100)

---

## Backend / Infra (Phase 2 — DO NOT TOUCH NOW)
- [ ] Email OTP verification
- [ ] DNA scoring algorithm
- [ ] PostgreSQL connections
- [ ] Real-time Socket.IO
- [ ] In-app purchases (IAP)
- [ ] Push notifications
