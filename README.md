# TRAVI SuperApp

> Your AI-powered personal travel companion — from dream to destination and beyond.

## About

TRAVI is a mobile-first super app built with **Expo** and **React Native** using **expo-router** for file-based navigation. The app covers the entire travel lifecycle: planning, booking, live trip management, post-trip memories, wallet, points/rewards, and social features.

## Project Structure

```
travi-superapp/
├── app/                          # All screens (expo-router file-based routing)
│   ├── index.tsx                 # S1  — Splash
│   ├── _layout.tsx               # Root layout (SafeArea + Auth guard)
│   ├── (auth)/                   # Auth & Onboarding flow (S2–S10)
│   ├── (tabs)/                   # Main app with 6 bottom tabs
│   │   ├── home/                 # Home tab (S11, S13, S14, S59)
│   │   ├── trips/                # My Trips tab (S57)
│   │   ├── wallet/               # Wallet tab (S48)
│   │   ├── explore/              # Explore tab (S12, S14)
│   │   ├── points/               # Points tab (S91)
│   │   └── social/               # Social tab (S78)
│   ├── (trip)/                   # Trip group — planning, pre/post trip, settings
│   │   ├── plan/                 # Planning funnel (S19–S31, S62)
│   │   ├── pre/[tripId]/         # Pre-trip (S32–S34)
│   │   ├── post/[tripId]/        # Post-trip (S44–S47)
│   │   ├── wallet/               # Wallet screens (S49–S52)
│   │   ├── points/               # Points screens (S92–S100)
│   │   ├── profile/              # Profile (S15, S16, S54)
│   │   ├── settings/             # Settings (S55, S66)
│   │   └── account/              # Account management (S76a, S76b, S77)
│   ├── (live)/                   # Live trip mode (S35–S43, T1–T7)
│   │   └── [tripId]/
│   ├── (social)/                 # Social features (S79–S86)
│   ├── (drawer)/                 # Drawer layout for tablet+
│   └── _modals/                  # Global modals (S29, S41, S63, S74, S75, S83)
├── components/                   # Reusable components
│   ├── NoInternetOverlay.tsx     # S60 — No Internet overlay
│   ├── FABChat.tsx               # Global AI Chat FAB
│   ├── SwipeStack.tsx            # Reused in S8, S25, S81
│   └── DestinationCard.tsx       # Reused in S11, S12, S14, S59
├── hooks/                        # Custom hooks
│   ├── useResponsive.ts          # Breakpoints hook
│   ├── useTabBarVisibility.ts    # Show/hide tab bar
│   └── useDeepLink.ts            # Deep link handler
├── docs/                         # Documentation
│   └── PROTOTYPE_SPEC.md         # Full prototype specification
└── assets/                       # Images, fonts, etc.
```

## Screen Count

**Total: 92 screens + 5 utility modals = 97 files**

## Current Status

### Phase 1 — Skeleton (CURRENT)
- [x] All 97 screen files created (empty placeholders)
- [x] Full navigation structure with expo-router
- [x] Layout files for all groups (auth, tabs, trip, live, social, drawer, modals)
- [x] Reusable components scaffolded
- [x] Custom hooks scaffolded
- [ ] No styling — just screen names displayed

### Phase 2 — Design & UI (NEXT)
- [ ] Design system & style guide
- [ ] Screen-by-screen UI implementation
- [ ] Animations & transitions
- [ ] Dark mode theming

### Phase 3 — Functionality
- [ ] State management
- [ ] API integration
- [ ] Authentication flow
- [ ] Data persistence

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Expo SDK 52 | Framework |
| React Native | UI |
| expo-router | File-based navigation |
| TypeScript | Type safety |
| React Native Reanimated | Animations |
| React Native Gesture Handler | Gestures |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android
```

## Navigation Architecture

The app uses **expo-router** with the following navigation groups:

- **(auth)** — Stack navigation for onboarding (no header)
- **(tabs)** — Bottom tab navigation with 6 tabs
- **(trip)** — Stack navigation (hides tab bar)
- **(live)** — Stack navigation for live trip mode
- **(social)** — Stack navigation for social features
- **(drawer)** — Drawer navigation for tablet+
- **_modals** — Modal presentation for overlays

## License

Private — All rights reserved.
