# TRAVI — Complete Prototype Specification
# כל מסך | UX מלא | ניווט | אנימציות | States | Micro-interactions
# Version 1.0 · April 2026

---

## כיצד לקרוא מסמך זה

כל מסך מכיל:
- **Route + Context** — נתיב + הקשר
- **Layout** — מבנה המסך
- **UI Elements** — כל אלמנט, גודל, צבע, מיקום
- **States** — Loading / Empty / Error / Success
- **Navigation** — כל כפתור → destination
- **Animations** — כל תנועה + timing
- **Micro-interactions** — feedback על כל אינטרקציה
- **Error Handling** — מה קורה כשמשהו נכשל

---

## Design Tokens

```
Background:     #0A0514
Surface:        #120824  (cards)
Surface-2:      rgba(255,255,255,0.05)
Border:         rgba(255,255,255,0.08)
Purple:         #6443F4
Pink:           #F94498
Text-primary:   #FFFFFF
Text-secondary: rgba(255,255,255,0.6)
Text-muted:     rgba(255,255,255,0.3)
Success:        #4ADE80
Warning:        #FBBF24
Error:          #F87171
Font-heading:   Chillax-Bold
Font-body:      Satoshi-Regular
Font-bold:      Satoshi-Bold
Radius-card:    16px
Radius-button:  12px
Radius-pill:    100px
Shadow-card:    0 4px 24px rgba(0,0,0,0.4)
```

---

# ═══════════════════════════════════
# PART A — AUTH & ONBOARDING
# ═══════════════════════════════════

---

## S1 — Splash Screen
**Route:** `app/index.tsx`
**Tab bar:** ✗ | **FAB:** ✗ | **Back:** BLOCKED

### Layout
```
[Full screen #0A0514]
  [Center column, max-w 320px]
    [Mascot 200px × 200px]
    [Logo 160px × 40px]
    [Tagline text]
    [Loading dots row]
```

### UI Elements
| Element | Size | Color | Position |
|---------|------|-------|----------|
| Background glow | 400px radial | rgba(100,67,244,0.15) | center |
| Mascot | 200×200px | — | center, -40px from mid |
| Logo (logotype_dark.png) | 160×40px | white | below mascot, mt-24 |
| Tagline | 14px Satoshi | rgba(255,255,255,0.4) | below logo, mt-12 |
| Loading dots (×3) | 8px circles | purple #6443F4 | bottom of center, mt-40 |

### Animations
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Mascot | translateY(80→0) + scale(0.7→1) | 800ms | spring damping:12 stiffness:80 |
| Logo | opacity(0→1) + translateY(20→0) | 600ms delay:400ms | ease-out |
| Tagline | opacity(0→1) | 400ms delay:700ms | ease-out |
| Dots | pulse scale(1→1.3→1) stagger 200ms | loop | ease-in-out |
| Background glow | scale(0→1) | 1000ms | ease-out |

### States
| State | What shows |
|-------|-----------|
| Loading (default) | mascot + logo + dots |
| No network | NoInternet overlay after 5s |

### Navigation
| Element | Condition | Destination |
|---------|-----------|-------------|
| Auto | token valid + activeTripId | `/(live)/[tripId]` |
| Auto | token valid, no trip | `/(tabs)/home` |
| Auto | no token | `/(auth)/welcome` |
| Auto | network fail >5s | overlay: retry button |

---

## S2 — Welcome
**Route:** `app/(auth)/welcome.tsx`
**Tab bar:** ✗ | **FAB:** ✗ | **Back:** BLOCKED

### Layout
```
[Full screen #0A0514]
  [Background: 2 glow orbs purple top-right + pink bottom-left]
  [Top 40%: Logo + tagline]
  [Bottom 40%: Buttons + link]
```

### UI Elements
| Element | Spec | Notes |
|---------|------|-------|
| Glow orb 1 | 300px, rgba(100,67,244,0.2) | top-right, blur 80px |
| Glow orb 2 | 200px, rgba(249,68,152,0.15) | bottom-left, blur 60px |
| Logo | 200×50px | center, mt-safe+40 |
| Tagline | 28px Bold, white | center, mt-16 |
| Sub-tagline | 15px, text-secondary | center, mt-8 |
| "Get Started" button | h-56px w-full, bg-purple, radius-12 | mt-auto mb-16 |
| "Sign In" link | 15px, text-secondary, underline | below button, center |

### Animations
| Element | On Mount | Duration |
|---------|----------|----------|
| Logo | fadeIn + slideUp(30px) | 600ms |
| Taglines | fadeIn stagger 200ms | 400ms each |
| Buttons | slideUp(40px) + fadeIn | 500ms delay:600ms |
| Glow orbs | slow pulse scale(1↔1.1) | 4s loop |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Get Started" | tap | `/(auth)/signup` mode:create |
| "Sign In" | tap | `/(auth)/signup` mode:login |
| Back gesture | — | BLOCKED |

### Micro-interactions
- "Get Started": scale(0.97) on press-in, haptic impactLight, scale(1) on release

---

## S3 — Sign Up / Login
**Route:** `app/(auth)/signup.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout (Create mode)
```
[ScrollView, KeyboardAvoidingView padding iOS / height Android]
  [Header: back arrow + "Create Account" title]
  [Form area, max-w 400px centered]
    [Email input]
    [Password input + strength bar]
    [Confirm password]
    [Terms row]
  [Divider "— or —"]
  [OAuth buttons]
  [Login link]
```

### UI Elements — Inputs
| Field | Height | Border inactive | Border active | Border error |
|-------|--------|-----------------|---------------|--------------|
| Email | 52px | rgba(255,255,255,0.1) | #6443F4 2px | #F87171 2px |
| Password | 52px | same | same | same |
| Confirm | 52px | same | same | same |

| Element | Spec |
|---------|------|
| Input background | rgba(255,255,255,0.05) |
| Input text | 15px Satoshi white |
| Placeholder | text-muted |
| Eye toggle (password) | 20px icon, right-16px |
| Error text | 12px #F87171, mt-4, fadeIn |
| Strength bar | h-3px below password, animated width |
| Strength colors | Weak:#F87171 / Medium:#FBBF24 / Strong:#4ADE80 |
| Terms row | 15px + checkbox 20×20px purple |
| CTA button | h-56px full-width purple, disabled:opacity-40 |

### OAuth Buttons
| Button | Height | Style |
|--------|--------|-------|
| Google | 52px | white bg, #000 text, Google logo 20px |
| Apple | 52px | white bg, #000 text, Apple logo 20px |

### States
| State | Behavior |
|-------|----------|
| Loading (submit) | button shows spinner, inputs disabled |
| Success | fade out → navigate |
| Error 409 | inline banner "Email already exists. Sign in?" |
| Error 401 (login) | shake form + "Invalid credentials" |
| Network error | banner "No connection. Try again." |

### Navigation (Create mode)
| Element | Action | Destination |
|---------|--------|-------------|
| Back `‹` | tap | `/(auth)/welcome` |
| "Create Account" | tap (valid) | `/(auth)/verify-email?email=` |
| Google | tap | OAuth flow |
| Apple | tap | OAuth flow (iOS) |
| "Sign In" link | tap | switch to login mode (animated) |

### Navigation (Login mode)
| Element | Action | Destination |
|---------|--------|-------------|
| "Sign In" | tap (valid) | `/(tabs)/home` |
| "Forgot Password?" | tap | forgot password modal |
| "Create Account" link | tap | switch to create mode |

### Animations
- Mode switch: cross-fade fields that appear/disappear (300ms)
- Input focus: border color transition 200ms
- Error: input shake translateX(±8px × 3 cycles) 400ms
- Button disabled→enabled: opacity + background transition 200ms

### Micro-interactions
- Each key press on password: strength bar animates
- Checkbox tap: scale(1.2→1) + haptic impactLight
- Submit tap: button scale(0.97) + haptic impactMedium

---

## S4 — Verify Email
**Route:** `app/(auth)/verify-email.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[Center, px-24]
  [Back arrow top-left]
  [Icon: envelope 64px, mt-safe+40]
  [Title: "Check your inbox"]
  [Subtitle: email address]
  [6 OTP boxes row]
  [Error message (conditional)]
  [Resend section]
  [Wrong email link]
```

### OTP Boxes
| Property | Value |
|----------|-------|
| Size | 52×60px each |
| Gap | 10px |
| Background | rgba(255,255,255,0.05) |
| Border | rgba(255,255,255,0.1) default / #6443F4 active / #F87171 error |
| Font | 24px Bold, center |
| Radius | 12px |

### States
| State | Visual |
|-------|--------|
| Empty | ghost border |
| Focused | purple border + cursor |
| Filled | white border + digit |
| Error | red border on all + shake |
| Success | green border flash → navigate |

### Resend Logic
```
0s-30s:   hidden
30s:      "Resend Code" active (purple link)
After 1:  countdown "Resend in Xs"
After 2:  "Resend Code" active again
After 3:  "Maximum attempts reached. Contact support."
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Back `‹` | tap | `/(auth)/signup` |
| Box 6 auto | fill | `/(auth)/profile-setup` (300ms debounce) |
| "Resend" | tap | same screen + toast "New code sent" |
| "Wrong email?" | tap | `/(auth)/signup` |

### Animations
- Auto-focus next box: immediate on digit entry
- Auto-focus prev box: immediate on backspace in empty box
- Paste: sequential fill animation (50ms per box)
- Error: all boxes shake translateX(±8 × 3) 400ms total
- Success: all boxes border flash green 300ms → navigate

---

## S5 — Profile Setup
**Route:** `app/(auth)/profile-setup.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[ScrollView, KeyboardAvoidingView]
  [Header: back + "Set Up Profile" + step indicator "2/3"]
  [Avatar circle, centered]
  [Form fields, max-w 400px]
  [Continue button, sticky bottom]
```

### UI Elements
| Element | Spec |
|---------|------|
| Avatar circle | 100×100px, border 2px #6443F4, bg rgba(100,67,244,0.2) |
| Camera icon overlay | 28×28px badge, bottom-right of avatar, bg #6443F4 |
| Avatar placeholder | person emoji 40px, centered |
| First/Last name row | flex-row gap-12 |
| Each input | h-52px, same style as S3 |
| DOB input | h-52px, opens DateTimePicker |
| Phone input | h-52px, country flag prefix |
| Country row | h-52px, right arrow, flag + name |
| "Continue" button | h-56px, sticky bottom, pb-safe |

### States
| State | Behavior |
|-------|----------|
| Avatar uploading | spinner overlay on circle |
| Avatar success | fade in uploaded image |
| DOB under 18 | inline error "Must be 18 or older" |
| Uploading (submit) | button spinner |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Back `‹` | tap | `/(auth)/verify-email` |
| Avatar | tap | ActionSheet bottom |
| "Take Photo" | tap | camera → crop 1:1 → back |
| "Choose Library" | tap | picker → crop 1:1 → back |
| "Skip" avatar | tap | use placeholder |
| Country | tap | `/_modals/country-picker` |
| "Continue" | tap (firstName+lastName valid) | `/(auth)/welcome-travi` |

### ActionSheet — Avatar
```
[ Take Photo       ]
[ Choose from Library ]
[ Remove Photo     ] ← only if avatar exists
[ Cancel           ]
```

---

## S6 — Welcome to TRAVI
**Route:** `app/(auth)/welcome-travi.tsx`
**Tab bar:** ✗ | **FAB:** ✗ | **Back:** BLOCKED

### Layout
```
[Full screen]
  [Top 50%: mascot animation centered]
  [Bottom 50%: text + buttons]
```

### UI Elements
| Element | Spec |
|---------|------|
| Mascot Lottie | 240×240px, wave animation |
| "Welcome to TRAVI," | 15px text-secondary |
| "[name]!" | 32px Bold, white, mt-4 |
| Subtitle | 16px text-secondary, mt-12, center, px-32 |
| "Let's Go →" | h-56px full-width purple, mt-32 |
| "Skip for now" | 14px text-muted, mt-16, center |
| Auto-advance bar | thin progress at very bottom, 10s |

### Skip Confirm Modal
```
[Bottom sheet, 280px]
  "Skip Travel DNA?"
  "You can complete it anytime from your profile"
  [Complete Later] [Skip]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Let's Go →" | tap | `/(auth)/quick-dna/index` |
| "Skip for now" | tap | confirm sheet → skip → `/(tabs)/home` |
| Auto-advance | 10s | `/(auth)/quick-dna/index` |

---

## S7 — DNA Categories
**Route:** `app/(auth)/quick-dna/index.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[SafeAreaView]
  [Header: back + progress bar 25%]
  [Title: "What do you love?"]
  [Subtitle: "Pick everything that speaks to you"]
  [Chips grid, flex-wrap]
  [Continue button, sticky bottom]
```

### Category Chips
| State | Style |
|-------|-------|
| Default | bg rgba(255,255,255,0.05), border rgba(255,255,255,0.1), h-44px px-16px |
| Selected | bg rgba(100,67,244,0.25), border #6443F4, text white |
| Press | scale(0.95) 100ms |

Categories (12): Adventure 🏔️ / Culture 🏛️ / Relaxation 🌊 / Food 🍜 / Nature 🌿 / Nightlife 🌙 / Wellness 🧘 / History 📜 / Shopping 🛍️ / Architecture 🏗️ / Sports ⚡ / Photography 📸

### States
| State | Button text | Button state |
|-------|-------------|--------------|
| 0 selected | "Continue" | disabled, opacity 0.4 |
| 1+ selected | "Continue (X selected)" | active, purple |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Chip | tap | toggle + logSignal + haptic |
| "Continue" | tap (≥1) | `/(auth)/quick-dna/swipe` |
| Back `‹` | tap | `/(auth)/welcome-travi` |

---

## S8 — DNA Swipe
**Route:** `app/(auth)/quick-dna/swipe.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[Full screen]
  [Header: back + progress bar 50% + count "X/30"]
  [Card stack, centered, aspect 3:4, max-w 340px]
    [Card 1: full visible]
    [Card 2: peeking 16px below, scale 0.95]
    [Card 3: peeking 8px below, scale 0.90]
  [Like/Reject buttons row]
  [Undo button, appears 3s after swipe]
```

### Card Design
| Layer | Spec |
|-------|------|
| Image | full-bleed, resizeMode cover |
| Gradient overlay | bottom 60%, black transparent→black |
| Destination name | 26px Bold, white, bottom-16px left-16px |
| Country | 14px text-secondary, below name |
| DNA category tags | pill chips, bottom-right |

### Swipe Indicator Overlays
| Direction | Overlay |
|-----------|---------|
| Right (>30px) | Green "LOVE IT" badge top-left, opacity based on distance |
| Left (>30px) | Red "SKIP" badge top-right |

### Action Buttons
| Button | Size | Style |
|--------|------|-------|
| ✕ reject | 64×64px | bg rgba(255,255,255,0.1), border white/20, white X |
| ♥ like | 72×72px | bg #F94498, white heart |

### States
| State | Behavior |
|-------|----------|
| Loading cards | skeleton card stack |
| Last card | show "Almost done!" micro-text |
| All done | auto-navigate S9 |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Swipe right | ≥100px | log + next card |
| Swipe left | ≥100px | log + next card |
| Swipe partial | <100px | spring back |
| ♥ button | tap | log like + next + haptic impactMedium |
| ✕ button | tap | log reject + next + haptic impactLight |
| "Undo" | tap | restore + haptic selection |
| Card 30 | auto | `/(auth)/quick-dna/schedule` |
| Back `‹` | tap | `/(auth)/quick-dna/index` |

### Animations
| Action | Animation |
|--------|-----------|
| Swipe commit | card flies off + rotation + next card scale(0.95→1) |
| Spring back | spring damping:15 stiffness:150 |
| Button tap | scale(0.9→1) 150ms |
| Undo | card flies back from edge 400ms spring |
| Like indicator | opacity 0→0.9 proportional to swipe distance |

---

## S9 — DNA Schedule
**Route:** `app/(auth)/quick-dna/schedule.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[SafeAreaView px-20]
  [Header: back + progress 75%]
  [Title: "How do you plan?"]
  [Subtitle: "There's no wrong answer"]
  [4 option cards, gap-12]
  [Continue button, sticky bottom]
```

### Option Cards
| Element | Default | Selected |
|---------|---------|---------|
| Height | 72px | 72px |
| Background | rgba(255,255,255,0.05) | rgba(100,67,244,0.2) |
| Border | rgba(255,255,255,0.08) | #6443F4 |
| Icon | 28px, left | same |
| Title | 16px Bold | 16px Bold white |
| Subtitle | 12px text-muted | 12px text-secondary |
| Checkmark | hidden | 20px right, purple circle |

Options:
1. 📋 "Detailed itinerary" — "Planned hour by hour"
2. 🗺️ "Rough plan" — "Key stops, flexible timing"  
3. 🎲 "Spontaneous" — "Figure it out there"
4. 🌊 "Go with the flow" — "Pure adventure"

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Option card | tap | select (deselect others) + haptic |
| "Continue" | tap (selected) | `/(auth)/quick-dna/summary` |
| Back `‹` | tap | `/(auth)/quick-dna/swipe` |

---

## S10 — DNA Summary
**Route:** `app/(auth)/quick-dna/summary.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[ScrollView px-20]
  [Header: progress 100% ✓]
  [Persona reveal card]
  [Top 3 dimension bars]
  [CTA button sticky bottom]
```

### Persona Reveal Card
| Element | Spec |
|---------|------|
| Background | gradient purple→pink, radius-20 |
| Persona icon | 60px emoji/illustration |
| "You're a" | 14px text-secondary |
| Persona name | 32px Bold white |
| Description | 14px text-secondary, 2 lines |

### Dimension Bars
Each bar:
- Label left (16px)
- Score right (16px Bold, purple)
- Bar: h-8px, bg rgba(255,255,255,0.1), fill purple, radius-full
- Animate on mount: 0→score width, 800ms delay:200ms each (stagger)

### States
| State | Visual |
|-------|--------|
| Loading (calculating) | skeleton bars + pulse |
| Success | reveal animation |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "See My Recommendations →" | tap | `/(tabs)/home` + trigger dna-celebration modal |
| Back `‹` | tap | `/(auth)/quick-dna/schedule` |

---

# ═══════════════════════════════════
# PART B — DISCOVERY
# ═══════════════════════════════════

---

## S11 — Home
**Route:** `app/(tabs)/home/index.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[ScrollView]
  [StatusBar transparent]
  [Header row — pt-safe]
  [Greeting section]
  [Mascot accent — absolute top-right]
  ["Complete DNA" banner — conditional]
  [Live Trip strip — conditional]
  [Plan a Trip card — hero]
  [Quick stats row — 2 cards]
  ["Recommended for You" section]
    [Horizontal scroll cards]
  [pb-safe + tab bar height]
```

### Header
| Element | Spec | Position |
|---------|------|----------|
| TRAVI logo | 80×28px | left |
| Bell icon | 24px | right, badge if unread |
| Avatar | 36×36px circle | rightmost |

### Greeting
| Element | Spec |
|---------|------|
| "Good [time], [name]" | 26px Bold white |
| DNA persona badge | pill: 12px, bg rgba(100,67,244,0.2), border #6443F4 |
| "✦ Explorer DNA" | 12px purple |

### Complete DNA Banner
| Property | Value |
|----------|-------|
| Background | rgba(249,68,152,0.1) |
| Border | rgba(249,68,152,0.3) |
| Left icon | DNA helix 24px |
| Text | "Complete your Travel DNA" |
| Arrow | › right |
| X dismiss | top-right 16px |

### Live Trip Strip
| Property | Value |
|----------|-------|
| Background | rgba(74,222,128,0.1) |
| Border | rgba(74,222,128,0.3) |
| Left dot | 8px green pulsing |
| Text | "Active: [Trip Name] · Day X" |
| Arrow | › right |

### Plan a Trip Card (Hero)
| Property | Value |
|----------|-------|
| Height | 100px |
| Background | gradient 135deg #6443F4 → #F94498 |
| Border radius | 20px |
| Left icon | ✈️ in 48×48px bg rgba(255,255,255,0.2) radius-12 |
| Title | 22px Bold white "Plan a Trip" |
| Subtitle | 13px rgba(255,255,255,0.7) |
| Right arrow | › white |

### Quick Stats Row (2 cols)
Each card: bg rgba(255,255,255,0.05), border rgba(255,255,255,0.08), radius-16, p-16

| Card | Icon | Label | Value |
|------|------|-------|-------|
| Cashback | 💰 | "Cashback" | "€XX.XX" |
| Explore | 🧭 | "New for you" | "X destinations" |

### Recommendation Cards
| Property | Value |
|----------|-------|
| Width | 200px (280px tablet) |
| Height | 260px (320px tablet) |
| Border radius | 20px |
| Image | full-bleed |
| Match badge | top-right pill, bg #F94498, "✦ XX% Match" |
| Name | 22px Bold white, bottom-left |
| Country | 13px text-secondary |
| Gradient | bottom 60% black transparent |

### States
| State | Visual |
|-------|--------|
| Loading | skeleton cards animate pulse |
| Empty (no DNA) | illustration + "Complete DNA to see recommendations" |
| Error | "Couldn't load" + retry button |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Bell | tap | `/(trip)/notifications` |
| Avatar | tap | `/(trip)/profile` |
| DNA banner | tap | `/(auth)/quick-dna/index` |
| DNA banner X | tap | modal: "Don't show again?" → [Yes → MMKV permanent] [Just hide → sessionStore this session] |
| Live strip | tap | `/(live)/[activeTripId]` |
| Plan a Trip | tap | `/(trip)/plan` |
| Cashback card | tap | `/(tabs)/wallet` |
| Explore card | tap | `/(tabs)/explore` |
| Recommendation | tap | `/(tabs)/home/destination/[id]` |
| Recommendation | visible >3s | logSignal(viewed_not_tapped) |
| Pull refresh | drag | invalidate query |
| FAB | tap | `/_modals/ai-chat` |

### Micro-interactions
- Recommendation card: scale(0.97) on press
- Plan a Trip: scale(0.98) on press
- Quick stat cards: scale(0.97) + haptic impactLight
- Scroll: parallax on mascot (translateY × 0.3)

---

## S12 — Explore
**Route:** `app/(tabs)/explore/index.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Header: "Explore" title]
  [Search bar — inactive, tap to navigate]
  [Filter chips — horizontal scroll]
  [Section: "Top Picks" — vertical FlatList]
  [Section: "Trending" — horizontal FlatList]
  [Section: "Hidden Gems" — 2-col grid on tablet]
  [pb-tab-height]
```

### Search Bar (inactive)
| Property | Value |
|----------|-------|
| Height | 48px |
| Background | rgba(255,255,255,0.05) |
| Border | rgba(255,255,255,0.08) |
| Border radius | 100px |
| Left icon | 🔍 20px text-muted |
| Placeholder | "Search destinations..." text-muted |

### Filter Chips
Height: 36px, px-16, radius-100
| State | Style |
|-------|-------|
| Default | bg rgba(255,255,255,0.05), border rgba(255,255,255,0.1) |
| Active | bg rgba(100,67,244,0.2), border #6443F4, text purple |

Filters: 🌍 All / 🏖️ Beaches / 🏙️ Cities / 🏔️ Mountains / 🏛️ Culture / 🍜 Food

### Destination Card (vertical)
| Element | Spec |
|---------|------|
| Height | 200px |
| Image | full-bleed, radius-16 |
| Gradient | bottom 50% |
| Match badge | top-right, pill pink |
| Name | 18px Bold white bottom-left |
| Country | 12px text-secondary |
| Price from | 14px white, bottom-right |

### States
| State | Visual |
|-------|--------|
| Loading | skeleton cards |
| Empty filter | "Nothing here yet" illustration |
| Error | retry |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Search bar | tap | `/(tabs)/home/search` (push, auto-focus) |
| Filter chip | tap | filter in-place + animate list |
| Card | tap | `/(tabs)/explore/destination/[id]` |
| Pull refresh | drag | refresh |
| FAB | tap | `/_modals/ai-chat` |

---

## S13 — Search
**Route:** `app/(tabs)/home/search.tsx`
**Tab bar:** ✓ | **FAB:** ✗

### Layout
```
[SafeAreaView]
  [Search input row (auto-focus) + Cancel button]
  [Content area — switches by state]
    [Empty: Recent searches + Popular]
    [Typing: Suggestions dropdown]
    [Results: destination list]
```

### Search Input Row
| Element | Spec |
|---------|------|
| Back/search icon | 20px left-16px |
| Input | flex-1, 16px, auto-focus on mount |
| Clear ✕ | 20px, appears when text exists |
| "Cancel" | 15px purple, right, tap → back |

### Suggestion Row
Height: 48px, flex-row, icon left + text + destination type right

### States
| State | Trigger | Content |
|-------|---------|---------|
| Empty | on mount, no text | Recent searches + Popular |
| Typing | text input | GET /suggestions debounce 300ms |
| Searching | submit | loading skeleton |
| Results | API response | destination list |
| No results | empty API | "No results for '[query]'" |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Suggestion | tap | `/(tabs)/home/search-results?q=` |
| Recent | tap | `/(tabs)/home/search-results?q=` |
| Recent X | tap | delete + POST /search/recents/delete |
| "Cancel" | tap | pop back |
| Submit (keyboard) | return | `/(tabs)/home/search-results?q=` |

---

## S14 — Destination Detail
**Route:** `app/(tabs)/home/destination/[id].tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[Full screen]
  [Hero image — parallax scroll 55vh]
  [Floating header — appears scroll >200px]
  [Content scroll]
    [Name + Country]
    [Match + Why row]
    [Quick info row: weather + cost + best season]
    [Tabs: Overview / Activities / Hotels]
    [Tab content]
  [Bottom bar: sticky "Plan Your Trip" button]
```

### Hero Image
| Property | Value |
|----------|-------|
| Height | 55vh |
| Parallax | translateY = scrollY × 0.4 |
| Gradient | bottom 60% transparent→#0A0514 |

### Floating Header (scroll >200px)
| Property | Value |
|----------|-------|
| Background | rgba(10,5,20,0.95) blur-20 |
| Content | back arrow + destination name + heart + share |
| Fade in | opacity 0→1, translateY -10→0, 300ms |

### Match Section
| Element | Spec |
|---------|------|
| "XX% Match" | 20px Bold, color #F94498 |
| DNA icon | ✦ 16px |
| "Why this matches you" | 13px text-secondary, 2 lines |
| "Show more" | tap → expand full explanation |

### Quick Info Row
3 pills: 🌡️ Weather / 💰 Avg Cost / 📅 Best Time

### Tab Active State
| State | Visual |
|-------|--------|
| Active | underline 2px purple, text white |
| Inactive | no underline, text-secondary |
| Transition | underline slides 300ms ease-in-out |

### Tabs
| Tab | Content |
|-----|---------|
| Overview | description + highlights + map thumbnail |
| Activities | grid of activity cards |
| Hotels | list of hotel cards |

### Activity Card (in detail)
Width: (screen-32)/2, height 140px, image + name + price + category

### Hotel Card (in detail)
Height: 100px, flex-row: image 100px + info + price

### Bottom Bar
| Element | Spec |
|---------|------|
| Background | rgba(10,5,20,0.95) blur-20 |
| "Plan Your Trip" | h-52px full-width purple |
| pb-safe | ✓ |

### States
| State | Visual |
|-------|--------|
| Loading | skeleton layout |
| Error | retry |
| Wishlisted | heart filled pink |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Back `‹` | tap | pop + logSignal(detail_view_no_booking) |
| Heart | tap | toggle wishlist, optimistic |
| Share | tap | native share sheet |
| "Why matches" expand | tap | expand inline |
| Activity card | tap | activity preview modal |
| Hotel card | tap | `/(trip)/plan/hotel/[id]` |
| "Plan Your Trip" | tap | `/(trip)/plan/destination?id=` |
| Map thumbnail | tap | map modal |
| FAB | tap | `/_modals/ai-chat` |

### On Unmount (without booking)
```typescript
logSignal({
  type: 'detail_view_no_booking',
  destinationId: id,
  timeSpentMs: Date.now() - mountTime,
  scrollDepthPercent: maxScrollY / contentHeight * 100,
  tabsViewed: visitedTabs,
})
```


# ═══════════════════════════════════
# PART C — PLANNING FUNNEL
# ═══════════════════════════════════

---

## S19 — Plan Trip Entry
**Route:** `app/(trip)/plan/index.tsx`
**Tab bar:** ✗ (hidden on enter) | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Header: "← My Trips" + "Plan a Trip" title]
  [Draft cards section — if drafts exist]
  ["Start New Trip" CTA]
```

### Draft Card
| Element | Spec |
|---------|------|
| Height | 80px |
| Layout | flex-row |
| Left | destination flag + name + dates |
| Right | "Continue →" pill + progress dots |
| Background | rgba(255,255,255,0.05) |
| Border | rgba(255,255,255,0.08) |
| Long press | ActionSheet: Continue / Delete |

### States
| State | Visual |
|-------|--------|
| No drafts | illustration + "Where to next?" + big CTA |
| Has drafts | draft list + "Or start new" secondary link |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Draft card | tap | `/(trip)/plan/destination` (pre-filled) |
| Draft card LP | long press | ActionSheet: Continue / Delete |
| "Start New Trip" | tap | `/(trip)/plan/destination` (blank) |
| Back `‹` | tap | `/(tabs)/trips` + show tab bar |

---

## S20 — Destination Select
**Route:** `app/(trip)/plan/destination.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Progress: Step 1/6 "Where?"]
  [Search input — auto-focus]
  [Content area]
    [Empty: Popular + DNA Matches]
    [Typing: Suggestions list]
    [Selected: destination confirmed pill]
  [Continue button — sticky, disabled until selected]
```

### Step Indicator
```
[●]—[○]—[○]—[○]—[○]—[○]
 1    2    3    4    5    6
Where Dates Fly  Hotel Act  Plan
```
Color: purple filled / gray empty

### Search Input
| Property | Value |
|----------|-------|
| Height | 52px |
| Left | 🔍 20px |
| Auto-focus | true |
| Placeholder | "Where do you want to go?" |

### Suggestion Row
Height: 56px
Left: flag emoji (if country) or destination icon
Center: destination name (Bold) + country (muted)
Right: DNA match pill (if available) "✦ XX%"

### Selected State
- Pill appears directly **below search input**, full-width minus 32px margin
- Continue button becomes enabled when pill is visible
```
[🌍 Dubai, UAE   ✕]  ← dismissible pill, bg rgba(100,67,244,0.2), mt-8
```

### States
| State | Content |
|-------|---------|
| Empty, no text | "Popular" section + "DNA Matches" section |
| Typing | real-time suggestions |
| Selected | pill + "Continue" enabled |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Suggestion | tap | select + show pill |
| Popular card | tap | select |
| DNA match card | tap | select |
| Pill ✕ | tap | deselect |
| "Continue" | tap (selected) | `/(trip)/plan/dates` |
| Back `‹` | tap | `/(trip)/plan/index` |

---

## S21 — Dates & Travelers
**Route:** `app/(trip)/plan/dates.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[ScrollView]
  [Progress: Step 2/6 "When?"]
  [Night count chip — center, updates live]
  [Calendar component]
  [Divider]
  [Travelers section]
  [Continue button sticky]
```

### Night Count Chip
```
[📅  5 nights]  ← bg rgba(100,67,244,0.2), border purple
```
Appears when range selected. Animates count change.

### Calendar
| Property | Value |
|----------|-------|
| Component | react-native-calendars CalendarList |
| Mode | period (range) |
| Min date | today |
| Max date | today + 2 years |
| Selected color | #6443F4 |
| Start color | darker purple |
| End color | darker purple |
| Range fill | rgba(100,67,244,0.2) |
| Day text | 15px |
| Today | underline |

### Travelers Section
```
[Adults row]
  "Adults"  ←  [−]  2  [+]  → (min 1, max 10)
[Children row]
  "Children (0-12)"  ←  [−]  0  [+]  → (min 0, max 8)
```
Stepper button: 36×36px circle, bg rgba(255,255,255,0.1)
Value: 20px Bold center

### States
| State | Continue button |
|-------|----------------|
| No range | disabled "Select dates" |
| Range selected | enabled "Continue — X nights" |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Calendar day | tap | set check-in, 2nd tap set check-out |
| Adults +/- | tap | ±1 + haptic selection |
| Children +/- | tap | ±1 + haptic selection |
| "Continue" | tap (range valid) | `/(trip)/plan/flights` |
| Back `‹` | tap | `/(trip)/plan/destination` |

---

## S22 — Flight Select
**Route:** `app/(trip)/plan/flights.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Progress: Step 3/6 "Flights"]
  [Route header: Origin ↕ Destination]
  [Tabs: Best Match / Cheapest / Fastest / Flexible]
  [Filter + sort row]
  [FlatList: flight cards]
  [Bottom: "Skip Flights" link]
```

### Route Header
```
[🛫 Dubai DXB]  [↕ swap]  [🛬 London LHR]
      [Tue 15 Apr — Mon 22 Apr · 2 Adults]
```
Swap button: rotate 180° animation 300ms

### Flexible Dates Tab Behavior
- Tap "Flexible" tab → **replaces flight list** with calendar heatmap (same screen, no modal)
- Back button (top-left) → returns to flight list without changing date
- Tap date cell → date selected → returns to flight list with new date automatically

### Calendar Heatmap
- 7 columns (days) × 5 rows (weeks)
- Cell color: green (cheap) → yellow → red (expensive)
- Selected cell: purple border + white text
- Price label: tiny below day number

### Filter Bar
```
[Filter 🔽]  [Nonstop ○]  [Morning ○]  [<10h ○]
```
Active filter: bg rgba(100,67,244,0.2), border purple

### Flight Card
```
[Airline logo 32px] [Airline name]              [DNA ✦ XX%]
[07:30 DXB] ——————————[8h 15m]——————————[15:45 LHR]
             [Nonstop]                    [from €340]
[Economy ▾]                      [Select →]
```
| Property | Value |
|----------|-------|
| Height | 110px collapsed / 180px expanded |
| Background | rgba(255,255,255,0.05) |
| Border | rgba(255,255,255,0.08) |
| DNA badge | top-right pill, bg rgba(249,68,152,0.2) |
| Best match highlight | border-l-4 purple + "Best Match" pill |
| First Class lock | blur overlay + lock icon + "First Class" |

### Expanded Card State
Shows: baggage allowance / cancellation policy / seat selection preview

### States
| State | Visual |
|-------|--------|
| Loading | 3 skeleton flight cards |
| No results | "No flights found" + "Try flexible dates" |
| Error | retry |
| First Class locked | paywall card |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Sort tab | tap | resort + animate |
| Swap ↕ | tap | swap + rotate anim |
| Filter | tap | filter bottom sheet |
| Flight card | tap | expand |
| "Select" expanded | tap | select + `/(trip)/plan/hotels` |
| Lock icon | tap | `/(trip)/membership` |
| "Flexible Dates" | tap | heatmap view |
| Calendar day (flex) | tap | set date + go back to list |
| "Skip Flights" | tap | `/(trip)/plan/hotels` |
| Back `‹` | tap | `/(trip)/plan/dates` |

---

## S23 — Hotel Select
**Route:** `app/(trip)/plan/hotels.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Progress: Step 4/6 "Hotel"]
  [Filter chips row — horizontal scroll]
  [Sort + Map toggle row]
  [FlatList: hotel cards] OR [MapView with pins]
  [Bottom: "Skip Hotels" link]
```

### Filter Chips
All / ⭐ Stars / 💰 Price / 🏊 Pool / 🍳 Breakfast / 💆 Spa / 🐾 Pet-friendly

### Sort Options (bottom sheet)
- DNA Match (default)
- Price: Low to High
- Price: High to Low
- Guest Rating
- Distance to Center

### Hotel Card (list mode)
```
[Image 120px] | [Hotel Name Bold]           [DNA ✦ XX%]
              | ⭐⭐⭐⭐ [Rating: 8.9]
              | [Location: City Center]
              | [Pool ✓] [Breakfast ✓]     [from €89/night]
```
| Property | Value |
|----------|-------|
| Height | 120px |
| Image | 120×120px, radius-12 left |
| Background | rgba(255,255,255,0.05) |
| Heart | top-right of image, wishlist |

### Map Mode
- Dark Google Maps
- Hotel pins: white circle + price label
- Selected pin: purple, larger
- Bottom sheet: selected hotel card
- Cluster pins for dense areas

### States
| State | Visual |
|-------|--------|
| Loading | skeleton list |
| No results | "Try adjusting filters" |
| Map loading | spinner center |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Filter chip | tap | filter + animate |
| Sort | tap | bottom sheet options |
| Map/List toggle | tap | switch view mode |
| Hotel card | tap | `/(trip)/plan/hotel/[id]` |
| Hotel heart | tap | wishlist toggle |
| Map pin | tap | bottom sheet hotel card |
| Sheet hotel card | tap | `/(trip)/plan/hotel/[id]` |
| "Skip Hotels" | tap | `/(trip)/plan/activities` |
| Back `‹` | tap | `/(trip)/plan/flights` |

---

## S24 — Hotel Detail
**Route:** `app/(trip)/plan/hotel/[id].tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[Full screen]
  [Image gallery — swipeable hero 260px]
    [Dot indicators]
  [Hotel info]
    [Name + stars + rating]
    [Location row]
    [DNA match]
  [Tabs: Rooms / Amenities / Reviews / Location]
  [Sticky bottom: "Select This Room" or room selector]
```

### Image Gallery
| Property | Value |
|----------|-------|
| Height | 260px |
| Swipe | FlatList horizontal paginated |
| Dots | bottom center, 6px each, active white |
| Counter | "X/Y" top-right |
| Tap | full-screen gallery modal |

### Hotel Info
| Element | Spec |
|---------|------|
| Name | 22px Bold white |
| Stars | ⭐ row, 16px each |
| Rating | "8.9 Excellent" 14px |
| Location | 📍 14px text-secondary + map link |
| DNA match | pill "✦ XX% Match" pink |

### Room Cards
```
[Room Name Bold]          [from €89/night]
[Image 80px]  King Bed · 32m² · Balcony
              [Breakfast ✓] [Free cancel ✓]
              [❤️ Save] [Select This Room →]
```

### Amenities Grid
Icons + labels in 3-col grid: WiFi / Pool / Gym / Spa / Restaurant / Parking / etc.

### Reviews Section
Overall score + bar chart + individual reviews (avatar + score + text)

### States
| State | Visual |
|-------|--------|
| Loading | skeleton |
| No rooms | "Sold out for these dates" + date change option |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Image | swipe | next/prev |
| Gallery | tap | full-screen viewer |
| "Select Room" | tap | select + `/(trip)/plan/activities` |
| Heart | tap | wishlist |
| Location | tap | map modal |
| "Reviews" tab | tap | scroll to reviews |
| Back `‹` | tap | `/(trip)/plan/hotels` |

---

## S25 — Activity Swipe
**Route:** `app/(trip)/plan/activities.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout — Same structure as S8
Activities added: counter "X added"
After 30: `/(trip)/plan/itinerary`

### Activity Card
| Element | Spec |
|---------|------|
| Image | full-bleed |
| Category chip | top-left pill (Cultural / Adventure / Food etc.) |
| Duration chip | top-right "⏱ 2h" |
| Price | bottom-right "€45/person" |
| Name | 24px Bold white bottom |
| DNA match | "✦ XX% Match" pill pink |
| Rating | "⭐ 4.8 (240)" bottom |

### Swipe Indicators
| Right | Left |
|-------|------|
| Green "ADD +" badge | Gray "SKIP" badge |

### States
| State | Visual |
|-------|--------|
| Loading | skeleton stack |
| Added counter | pill: "X activities added" top |

---

## S26 — Itinerary Builder
**Route:** `app/(trip)/plan/itinerary.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Progress: Step 5/6 "Itinerary"]
  [Summary row: X days, X activities, est. €XXX]
  [Day sections — DraggableFlatList]
    [Day header: "Day 1 · Tue 15 Apr"]
    [Activity rows]
    [Travel time chip between rows]
    [+ Add activity button]
  [Review Cart button sticky]
```

### Day Section Header
```
[Day 1 · Tue 15 Apr]           [Sort by time ▾]
```
Background: rgba(100,67,244,0.1)

### Activity Row
```
[≡ drag]  [⏰ 09:00]  [🏛️] [Activity Name]  [€45]  [✕]
          [          2h · City Center          ]
```
| Element | Spec |
|---------|------|
| Height | 72px |
| Drag handle | ≡ left-16px, text-muted |
| Time | 14px purple, tap → time picker |
| Icon | 24px category icon |
| Name | 15px Bold white |
| Price | 14px text-secondary right |
| ✕ | 20px, tap → remove + undo toast |
| Duration row | 12px text-muted below |

### Travel Time Chip
```
          🚗 15 min  ·  🚶 45 min
```
Tap → expands **inline, directly below chip** (not a modal):
```
  🚗 Drive    15 min
  🚌 Bus      28 min
  🚇 Metro    22 min
  🚶 Walk     45 min
```
- Each row: tap → chip updates to show selected mode
- Tap chip again → panel collapses
- Only one chip expanded at a time

### Time Picker (bottom sheet)
```
[Time: 09:30]
[◀ ▶ scroll wheel — 30min intervals]
[Set Time] [Cancel]
```

### Add Activity Modal
Search input + suggestions + recently added list

### Summary Row
```
📅 5 days  🎯 12 activities  💰 est. €890
```

### States
| State | Visual |
|-------|--------|
| Loading times | spinner on travel chips |
| Overlap warning | orange badge on overlapping activities |
| Empty day | "Drop activities here" dashed placeholder |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Activity LP | long press | enable drag |
| Activity drag | drag | reorder + haptic per snap |
| Time field | tap | time picker sheet |
| Travel chip | tap | transit options expand |
| Activity ✕ | tap | remove + undo toast 5s |
| "+ Add" | tap | search modal |
| "Review Cart →" | tap | `/(trip)/plan/cart` |
| Back `‹` | tap | confirm "Draft saved" → S25 |

---

## S27 — Cart
**Route:** `app/(trip)/plan/cart.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[ScrollView]
  [Progress: Step 6/6 "Review"]
  [Trip summary header]
  [Sections accordion]
    [✈️ Flight]
    [🏨 Hotel]
    [🎯 Activities (X)]
    [🛡️ Add-ons: Travel Insurance]
  [Promo code section]
  [Price breakdown]
  [Payment method row]
  [Split Pay toggle]
  [Terms checkbox]
  [CTA sticky bottom]
```

### Section Accordion
| State | Visual |
|-------|--------|
| Collapsed | section title + total + › |
| Expanded | items list + remove option |

### Item Row
```
[Item name]                    [€XXX  ✕]
```
✕ tap: remove + confirm if total changes significantly

### Promo Code Section
```
[Enter promo code ————————] [Apply]
```
| State | Visual Location |
|-------|----------------|
| Success | green border on input + green ✓ icon inside input (right-16px) + "PROMO10 applied: -€45" text directly below input + price breakdown updates instantly |
| Error | red border on input + red ✗ icon inside input + "Invalid or expired code" text below input |
| Loading | spinner inside input (right-16px), input disabled |

### Price Breakdown
```
Flights               €340
Hotel (5 nights)      €445
Activities (4)        €180
Travel Insurance       €35
Promo (PROMO10)       -€45
─────────────────────────
Subtotal              €955
Service fee (2%)       €19
─────────────────────────
Total                 €974
```

### Payment Method Row
```
[💳 Visa ···· 4242]           [Change]
```
Tap "Change" → `/_modals/payment-method`

### Split Pay Toggle
```
[Split with friends  ○———]
  → expands: Add friends input when toggled
```

### Terms Checkbox
```
[○] I agree to the Terms of Service and Cancellation Policy
```
Links underlined, open webview

### CTA Area
```
[Proceed to Checkout →]  ← disabled if terms unchecked
[🔒 Secure payment · Powered by Stripe]
```

### States
| State | Visual |
|-------|--------|
| Loading cart | skeleton breakdown |
| Items removed | animate height collapse |
| Cart empty | "Your cart is empty" + back CTA |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Section header | tap | expand/collapse |
| Item ✕ | tap | remove + recalculate |
| "Apply" promo | tap | POST /cart/promo |
| Payment method | tap | `/_modals/payment-method` |
| Split toggle | tap | expand split section |
| Terms links | tap | webview |
| Terms checkbox | tap | toggle |
| "Proceed" | tap (checked) | `/(trip)/plan/checkout` |
| Back `‹` | tap | confirm → S26 |

---

## S28 — Checkout
**Route:** `app/(trip)/plan/checkout.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[SafeAreaView]
  [Header: "Checkout" + timer]
  [Order summary card — collapsed]
  [Payment method selected]
  [3D Secure notice — conditional]
  [Total row — large]
  [Pay button — sticky bottom]
```

### Timer
```
[🕐 14:32]  ← red pulse when <5:00
"Price held for [time]"
```
At 5:00: text turns red, button border pulses
At 0:00: modal "Price expired. Refresh to continue."

### Order Summary Card
Collapsed: destination + dates + total
Expand: full price breakdown (same as cart)

### Payment Method Row
```
[Card icon] [Visa ending 4242]     [Change →]
```

### 3DS Notice (if required by bank)
```
ℹ️ Your bank may require verification in the next step
```

### Total Row
```
Total  €974
```
32px Bold, highlighted, center

### Pay Button
```
[🔒  Pay €974]
```
| State | Visual |
|-------|--------|
| Default | full-width purple |
| Press | scale(0.98) haptic impactMedium |
| Loading | disabled + spinner |

### Timer Expired Modal
```
[⏰ Price Expired]
"The price hold has expired. Refresh to get current pricing."
[Refresh Prices] [Cancel]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Change Payment" | tap | `/_modals/payment-method` |
| Order summary | tap | expand |
| "Pay" | tap | `/(trip)/plan/payment` |
| Timer = 0 | auto | expired modal |
| "Refresh" | tap | re-fetch prices + back to cart |
| Back `‹` | tap | confirm → S27 |

---

## S29 — Payment Method Modal
**Route:** `app/_modals/payment-method.tsx`
**Type:** modal slide_from_bottom

### Layout
```
[Handle bar]
[Title: "Payment Method"]
[Saved methods list]
[Divider]
[Apple Pay row — iOS]
[Google Pay row — Android]
[+ Add New Card row]
[Stripe CardField — expands when "Add" tapped]
```

### Saved Card Row
```
[💳 icon] [Visa ···· 4242  Exp 12/26]  [✓ selected]
```
Selected: checkmark + purple border

### New Card Form (Stripe CardField)
```
[Card Number ________________]
[MM/YY  ___] [CVC  ___]
[Name on card _______________]
[Save for future payments ○]
[Add Card button]
```

### States
| State | Visual |
|-------|--------|
| Loading save | spinner |
| Success | card added + selected |
| Error | inline card error from Stripe |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Saved card | tap | select + dismiss |
| Apple/Google Pay | tap | select + dismiss |
| "+ Add New Card" | tap | expand CardField |
| "Add Card" | tap | Stripe tokenize → save → select → dismiss |
| Cancel / X | tap | dismiss no change |

---

## S30 — Payment Processing
**Route:** `app/(trip)/plan/payment.tsx`
**Tab bar:** ✗ | **FAB:** ✗ | **Back:** BLOCKED

### Layout
```
[Full screen, dark]
[Center column]
  [TRAVI logo 80px]
  [Animated circles — pulsing]
  [Spinner 48px]
  [Status text]
  [Progress steps]
```

### Status Text Sequence
```
0-3s:   "Processing your payment..."
3-10s:  "Confirming your booking..."
10-30s: "Almost there..."
30-60s: "This is taking longer than usual..."
90s:    timeout → error modal
```

### 3DS Sheet (Stripe, if triggered)
Stripe handles this natively — sheet slides up

### Success State
```
[✓ green circle, scale(0→1.2→1) spring]
["Booking confirmed!" — fadeIn]
→ auto-navigate S31 after 1s
```

### Failure State
```
[✗ red circle]
["Payment failed"]
[Reason: "Your card was declined"]
[Try Different Card] [Go Back]
```

### Timeout Modal (90s)
```
"This is taking longer than usual.
Your card has NOT been charged.
Please try again."
[Try Again] [Contact Support]
```

### Navigation — ALL AUTO, no user taps
| Event | Destination |
|-------|-------------|
| Success | `/(trip)/plan/confirmation` |
| Failure | `/(trip)/plan/payment-failed` |
| Timeout | modal → retry → S28 / support → S66 |
| Back/gesture | BLOCKED |

---

## S31 — Booking Confirmation
**Route:** `app/(trip)/plan/confirmation.tsx`
**Tab bar:** ✗ | **FAB:** ✗ | **Back:** BLOCKED

### Layout
```
[ScrollView]
  [Green checkmark circle — animated]
  ["Booking Confirmed!" headline]
  [Booking reference: TRV-2026-XXXX + Copy button]
  [Trip summary card]
  [Action buttons: Calendar / Share / Itinerary]
  [CTA: "Go to My Trips" — sticky bottom]
```

### Checkmark Animation
Scale(0) → scale(1.3) → scale(1), 600ms spring
Green circle border draws in (SVG strokeDashoffset)

### Booking Reference Row
```
[TRV-2026-4521]     [📋 Copy]
```
Copy tap: toast "Copied to clipboard" + haptic impactLight

### Trip Summary Card
```
[Destination image 120px]
[Trip Name]
[📅 Tue 15 Apr — Mon 22 Apr · 5 nights]
[✈️ Nonstop · 8h 15m]
[🏨 Dubai Marina Hotel ⭐⭐⭐⭐]
[🎯 4 activities]
[💰 Total: €974]
```

### Action Buttons Row (3 icons)
```
[📅 Calendar]  [📤 Share]  [🗺️ Itinerary]
```

### First Booking Overlay (S75)
If `user.has_completed_first_booking === false`:
- Full-screen overlay on top
- Mascot animation
- "First booking! 🎉" + achievement badge
- Auto-dismiss 5s or tap

### States
| State | Visual |
|-------|--------|
| Mount | checkmark animation auto-plays |
| First booking | S75 overlay appears |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Mount, first booking | auto | `/_modals/first-booking` overlays |
| "Copy" | tap | clipboard + toast |
| "Add to Calendar" | tap | Expo Calendar API |
| "Share" | tap | native share sheet |
| "View Itinerary" | tap | `/(trip)/pre/[tripId]` |
| "Go to My Trips" | tap | `/(tabs)/trips` + show tab bar |
| All back | — | BLOCKED |

---

## S62 — Payment Failed
**Route:** `app/(trip)/plan/payment-failed.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[Center px-24]
  [✗ red circle icon]
  ["Payment Failed" headline]
  [Error reason text]
  [Reservation timer — if hold still active]
  [Action buttons]
```

### Error Reason Mapping
| Stripe Code | User Message |
|-------------|-------------|
| card_declined | "Your card was declined by your bank" |
| insufficient_funds | "Insufficient funds" |
| expired_card | "Your card has expired" |
| incorrect_cvc | "Incorrect security code" |
| card_velocity_exceeded | "Too many attempts. Try again later." |
| generic_decline | "Payment could not be processed" |

### Reservation Timer
```
⏰ Reservation held for 8:23
```
Only shown if hold still active. Disappears when expired.

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Try Different Card" | tap | `/_modals/payment-method` → retry |
| "Try Again" | tap | `/(trip)/plan/payment` |
| "Contact Support" | tap | `/(trip)/settings/support` |
| "Go Home" | tap | `/(tabs)/home` + show tab bar |
| Back `‹` | tap | `/(trip)/plan/checkout` |

---

# ═══════════════════════════════════
# PART D — PRE-TRIP
# ═══════════════════════════════════

---

## S32 — Pre-Trip Dashboard
**Route:** `app/(trip)/pre/[tripId]/index.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[ScrollView]
  [Header: "← My Trips" + trip name]
  [Hero: destination image 180px + overlay info]
  [Progress ring + stats row]
  [Quick access cards grid]
  [Flight summary]
  [Hotel summary]
  [Activate button sticky]
```

### Hero Section
```
[Image 180px full-width]
  [Gradient overlay]
  [Bottom left: "Dubai, UAE"]
  [Bottom right: "Tue 15 — Mon 22 Apr · 5 nights"]
```

### Progress Ring
```
       [SVG Ring 120px]
         XX%
       Complete
```
Ring: strokeWidth 8, track rgba(255,255,255,0.1), fill purple
Below ring: X/Y checklist items

### Quick Access Cards (2×2 grid)
```
[📋 Checklist     X/Y] [📄 Documents  X/Y]
[✈️ Booking Details  ] [🌍 Visa & Rules   ]
```
Each: 80px height, bg surface, radius-12

### Flight Summary Card
```
[✈️] [07:30 DXB] ——[8h 15m]—— [15:45 LHR]
     Emirates · EK001 · Nonstop
     [View Booking →]
```

### Hotel Summary Card
```
[Image 60px] Dubai Marina Hotel ⭐⭐⭐⭐
              Check-in: Tue 15 Apr 14:00
              [View Booking →]
```

### Activate Button
```
[🟢 Activate Live Mode]  ← enabled <48h before departure
[Available in Xd Xh]     ← disabled state
```

### States
| State | Visual |
|-------|--------|
| >48h to departure | button disabled, countdown |
| <48h | button active, green |
| No documents | doc card shows warning badge |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Checklist" card | tap | `/(trip)/pre/[tripId]/checklist` |
| "Documents" card | tap | `/(trip)/pre/[tripId]/documents` |
| "Booking Details" | tap | booking detail modal |
| Flight "View" | tap | flight detail modal |
| Hotel "View" | tap | hotel detail modal |
| "Activate" (active) | tap | confirm → `/(live)/[tripId]` |
| "Activate" (disabled) | tap | tooltip |
| Back `‹` | tap | `/(tabs)/trips` + show tab bar |

---

## S33 — Checklist
**Route:** `app/(trip)/pre/[tripId]/checklist.tsx`

### Layout
```
[ScrollView]
  [Header + overall progress bar]
  [Sections accordion list]
  [100% animation area]
```

### Overall Progress Bar
```
[████████░░░░]  8/14 complete
```
h-8px, purple fill, animated

### Section Accordion
Header: section name + "X/Y" + expand/collapse chevron
Background: rgba(100,67,244,0.08) when expanded

### Item Row
```
[○/✓] [Item title]              [Due: 3 days]  [⋮]
      [Subtitle — optional]
```
| State | Checkbox | Text |
|-------|----------|------|
| Incomplete | empty circle border | normal |
| Complete | filled purple circle ✓ | strikethrough muted |

Tap ⋮: Edit due date / Delete

### Custom Item Input (+ Add)
```
[+ Add item ____________] [📅] [✓ Save]
```
Appears inline at bottom of section

### 100% Complete State
```
[🎉 confetti burst]
["All done! You're ready for Dubai!"]
[Share your prep →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Section header | tap | expand/collapse |
| Checkbox | tap | toggle + PATCH + haptic |
| ⋮ item | tap | edit/delete sheet |
| "+ Add item" | tap | inline input appears |
| Complete 100% | auto | confetti + share toast |
| Back `‹` | tap | `/(trip)/pre/[tripId]` |

---

## S34 — Documents
**Route:** `app/(trip)/pre/[tripId]/documents.tsx`

### Layout
```
[ScrollView]
  [Header: "Documents"]
  [Required section]
    [Document rows]
  [Optional section]
    [Document rows]
  ["Export All as PDF" button]
```

### Document Row
```
[Status icon] [Doc name]                [Upload/View]
              [Expires: 2028 — optional]
```
| Status | Icon | Color |
|--------|------|-------|
| Missing | ✗ circle | red |
| Uploaded | ✓ circle | green |
| Expiring soon | ⚠️ triangle | yellow |

### Upload Action Sheet
```
[ 📷 Take Photo     ]
[ 📁 Choose Library ]
[ ✕ Cancel          ]
```

### Full-Screen Viewer
| Property | Value |
|----------|-------|
| Background | #000 |
| Gesture | pinch zoom / swipe down to dismiss |
| Top bar | X close + share + delete |
| Counter | "X of Y" if multiple |

### States
| State | Visual |
|-------|--------|
| Uploading | progress bar on row |
| Upload success | animate to green |
| Upload error | red + retry |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Upload" | tap | action sheet |
| "View" | tap | full-screen viewer |
| Viewer swipe down | — | dismiss |
| "Export All" | tap | generate PDF → share sheet |
| Back `‹` | tap | `/(trip)/pre/[tripId]` |


# ═══════════════════════════════════
# PART E — LIVE MODE
# ═══════════════════════════════════

---

## S35 — Live Dashboard
**Route:** `app/(live)/[tripId]/index.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Header: [🆘 Exit] ··· "LIVE" badge ··· [Settings ⚙]]
  [Current Activity Card — conditional]
  [Quick Actions Grid 2×4]
  [Today's Timeline — condensed]
  [AI Message Card — conditional, WebSocket]
  [pb-80 for FAB]
```

### Header
```
[← Exit] ·· [● LIVE  Dubai, UAE  Day 2] ·· [⚙]
```
"● LIVE" badge: 8px green circle pulsing + "LIVE" text green

### Current Activity Card
```
[Image 60px] NOW: [🏛️ Dubai Museum]
              09:00 — 11:00 · 45min left
              [Navigate →]          [I'm Here ✓]
```
Background: rgba(74,222,128,0.1) border rgba(74,222,128,0.3)
Only shows if time is within activity window (30min before → end)

### Quick Actions Grid
```
[🗓️ Timeline] [🗺️ Map      ]
[💰 Expenses] [📸 Memories ]
[🆘 Emergency][💳 Tax       ]
[⚙️ Settings ] [+ More      ]
```
Each cell: 80px height, bg rgba(255,255,255,0.05), icon 28px, label 11px

### Today's Timeline (condensed)
```
✓ 08:00 Breakfast at Hotel
● 09:00 Dubai Museum (NOW)
○ 11:30 Gold Souk
○ 13:00 Lunch — Al Fanar
○ 15:00 Desert Safari
```
✓ done (muted), ● current (green pulse), ○ upcoming

### AI Message Card Layout
- Position: **below header, above Quick Actions grid**
- Structure: `[mascot 32px] [message text + action buttons flex-1] [✕ top-right corner]`
- ✕ button: always visible, top-right of card, 20px
- Dismiss animation: card slides up + fades out 300ms
```
[🤖] "The Gold Souk is 8 min away by taxi — shall I book one?"  [✕]
     [Yes, book taxi] [No thanks]
```
Background: rgba(100,67,244,0.1) border rgba(100,67,244,0.3)
Appears when WebSocket sends proactive_message event

### Exit Live Mode Confirmation
```
[Bottom sheet]
"Exit Live Mode?"
"Your trip will continue and you can return anytime"
[Exit] [Stay in Live Mode]
```

### States
| State | Visual |
|-------|--------|
| Activation (first time) | full-screen onboarding overlay (1 time only) |
| No active activity | quick actions only |
| AI message | card slides down from top |

### Navigation — full list
| Element | Action | Destination |
|---------|--------|-------------|
| Exit (top-left) | tap | confirm sheet |
| Exit confirm | tap | `/(tabs)/home` + show tab bar |
| Settings ⚙ | tap | `/(live)/[tripId]/settings` |
| FAB | tap | `/_modals/ai-chat` |
| "I'm Here" | tap | POST checkin + haptic + animation |
| "Navigate" | tap | react-native-map-link picker |
| Timeline tile | tap | `/(live)/[tripId]/timeline` |
| Map tile | tap | `/(live)/[tripId]/map` |
| Expenses tile | tap | `/(live)/[tripId]/expenses` |
| Memories tile | tap | `/(live)/[tripId]/memories` |
| Emergency tile | tap | `/(live)/[tripId]/emergency` |
| Tax tile | tap | `/(live)/[tripId]/tax` |
| Settings tile | tap | `/(live)/[tripId]/settings` |
| Current activity | tap | `/(live)/[tripId]/activity/[actId]` |
| AI message CTA | tap | action (varies per message) |
| AI message ✕ | tap | dismiss |

---

## S36 — Live Timeline
**Route:** `app/(live)/[tripId]/timeline.tsx`

### Layout
```
[SafeAreaView]
  [Header: ← back + "Timeline"]
  [Date chips — horizontal scroll]
  [Timeline FlatList — grouped by day]
  [AI Chat FAB]
```

### Date Chips
Horizontal scroll, each chip:
| State | Style |
|-------|-------|
| Other day | bg surface, text-secondary |
| Today | bg rgba(100,67,244,0.2), border purple, text white |
| Selected | bg purple, text white |

### Activity Row
```
[time: 09:00]  [●line]  [🏛️ Dubai Museum          ]
                        [Cultural · 2h · €45       ]
                        [📍 Al Fahidi District       ]
                        [Rate ⭐] [Navigate 🗺️]
```
| Status | Dot color | Line |
|--------|-----------|------|
| Done | ✓ green | green solid |
| Current | ● green pulse | green |
| Upcoming | ○ gray | gray dashed |

### Travel Time Between
```
               [🚗 15 min between activities]
```
Gray, smaller text, centered

### Current Activity Visual Hierarchy
- Timeline **line color**: solid green up to current, dashed gray after
- Current **dot**: animated pulse scale(1↔1.2) infinite 2s ease-in-out
- Current **card background**: rgba(74,222,128,0.08)
- No shadow or transform elevation — color change is the indicator
- Activities above: completed (green solid dot + muted text)
- Activities below: upcoming (gray dashed dot + normal text)

### Desktop Layout (side-by-side)
Left 400px: timeline | Right: flex-1: live map

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Date chip | tap | scroll to day section |
| Activity row | tap | `/(live)/[tripId]/activity/[actId]` |
| "Navigate" | tap | react-native-map-link |
| "Rate" | tap | `/_modals/quick-rating` |
| Travel chip | tap | transit options expand |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## S37 — Live Map
**Route:** `app/(live)/[tripId]/map.tsx`

### Layout
```
[Full screen]
  [MapView — dark style]
  [User location button — top right]
  [Back button — top left, over map]
  [Bottom sheet — 3 snap points]
    [Snap 1: handle only 50px]
    [Snap 2: 40% screen — nearby list]
    [Snap 3: 80% screen — full nearby]
```

### Map Configuration
| Property | Value |
|----------|-------|
| Style | Google Maps dark JSON |
| User location | pulsing blue dot |
| Follow user | toggle button |
| Initial region | center of all activity pins |

### Activity Pins
```
[Number circle: 1]  ← purple bg, white number, 36px
```
Currently active: larger + green border + pulse

### Route Polyline
| Property | Value |
|----------|-------|
| Color | #6443F4 |
| Width | 4px |
| Style | solid between done, dashed for upcoming |

### Nearby Places (bottom sheet)
Section: "Nearby Restaurants" / "Nearby Attractions" / "Getting Around"
Each row: name + category + distance + rating

### "Start Navigation" Button
```
[🗺️ Start Navigation]
```
Tap → picker: Google Maps / Apple Maps / Waze / Uber

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Activity pin | tap | bottom sheet: activity card |
| Activity card in sheet | tap | `/(live)/[tripId]/activity/[actId]` |
| "Start Navigation" | tap | react-native-map-link picker |
| Bottom sheet | drag | snap to point |
| User location btn | tap | center map + follow user |
| Back `‹` | tap | `/(live)/[tripId]/index` |
| FAB | tap | `/_modals/ai-chat` |

---

## S38 — Activity Detail (Live)
**Route:** `app/(live)/[tripId]/activity/[actId].tsx`

### Layout
```
[ScrollView]
  [Image 220px full-width]
  [Status bar: Done / Now / Upcoming]
  [Activity info]
  [Action row: Check-in / QR / Photo / Rate]
  ["Nearby Stories" audio card — conditional]
  [Description]
  [Booking details]
  [Navigate button]
```

### Status Bar
| Status | Style |
|--------|-------|
| Done | green bg "✓ Visited" |
| Now | green pulse "● Now" |
| In X hours | gray "○ In 3h" |

### Check-in Button
```
[📍 I'm Here!]  ← green, full-width
```
After check-in: morphs to "✓ Checked In" disabled state
Animation: green pulse burst on tap

### QR Code
```
[QR code 200×200px]
[Activity ticket #TRV-ACT-2026-001]
[Tap to fullscreen]
```
Tap: full-screen modal, white bg, centered, dismiss tap anywhere

### Audio Story Card
**Display condition:** only shows when user is within 500m of activity location AND audio content exists for this activity. If neither condition is met, section does not render at all.

**Position:** below Action row, above Description
```
[🎙️] "Stories at this location"
     "Dubai Creek Heritage" · 4:32
     [▶ Play]
```
Background: rgba(249,68,152,0.1)
Audio: expo-av, progress bar, play/pause/seek

### Micro-interactions
- Check-in: haptic notificationSuccess + green burst animation
- Rating stars: haptic selection per star
- QR tap: scale spring animation

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Back `‹` | tap | previous |
| "I'm Here" | tap | POST checkin + animation |
| QR tap | tap | full-screen QR modal |
| Full-screen QR | tap | dismiss |
| "Add Photo" | tap | expo-image-picker → upload |
| "Rate" | tap | `/_modals/quick-rating` |
| "Navigate" | tap | react-native-map-link |
| Audio play | tap | expo-av |
| FAB | tap | `/_modals/ai-chat` |

---

## S39 — Expenses
**Route:** `app/(live)/[tripId]/expenses.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Expenses"]
  [Budget card — top summary]
  [Category filter chips]
  [Expenses FlatList — grouped by day]
  [+ FAB]
```

### Budget Summary Card
```
[💰 Budget: €500]     [Spent: €234]     [Left: €266]
[████████░░░░░░░░░░░░]  47% used
```
Bar: green (< 70%) / yellow (70-90%) / red (>90%)

### Category Filter Chips
All / 🍜 Food / 🚗 Transport / 🏛️ Activities / 🛍️ Shopping / 🏨 Hotel / Other

### Expense Row
```
[🍜 icon] [Restaurant Name]        [€45.00]
          [Tue 15 Apr · 13:00]     [€15.00/person]
```

### Day Group Header
```
[Tue 15 Apr ·················· €120 total]
```

### Add Expense Bottom Sheet
```
[Amount: ___________]
[Category: ____▾]
[Description: ___]
[Date/Time: now ▾]
[Split with: + Add person]
[📷 Receipt photo]
[Add Expense button]
```

### Currency Converter (expandable)
```
[€ 100.00]  ←→  [₪ 402.50]
[Rate: 1 EUR = 4.025 ILS · Updated 2h ago]
[Quick: €10 €20 €50 €100]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "+" FAB | tap | add expense sheet |
| Filter chip | tap | filter |
| Expense row | tap | edit sheet |
| Currency widget | tap | expand |
| "Split" | tap | `/(trip)/wallet/split` |
| "Scan Receipt" | tap | T2 Camera |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## S40 — Memories
**Route:** `app/(live)/[tripId]/memories.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Memories" + count + share album]
  [Upload button row]
  [Photo grid — masonry 2-col]
```

### Photo Grid
| Col layout | Mobile | Tablet |
|-----------|--------|--------|
| Columns | 2 | 3 |
| Gap | 4px | 6px |
| Item height | varies (masonry) | same |

Each photo:
- Thumbnail (full fill)
- Activity label overlay (bottom): "🏛️ Dubai Museum"
- Tap: full-screen viewer

### Full-Screen Viewer
| Property | Value |
|----------|-------|
| Background | #000 |
| Navigation | swipe left/right (all photos) |
| Dismiss | swipe down |
| Zoom | pinch to zoom |
| Top bar | X + share + delete + info |
| Bottom: activity label | yes |

### Upload Row
```
[📷 Camera]  [🖼️ Library]
```
Both: haptic impactLight on tap

### States
| State | Visual |
|-------|--------|
| Empty | illustration "Capture your moments!" |
| Uploading | progress overlay on thumbnail |
| Upload error | red border + retry |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Photo | tap | full-screen viewer |
| Viewer prev/next | swipe | navigate |
| Viewer | swipe down | dismiss |
| "Share Album" | tap | generate public URL → native share |
| "Camera" | tap | camera → upload |
| "Library" | tap | picker → upload |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## S41 — AI Chat (Live)
**Route:** `app/_modals/ai-chat.tsx`
**Triggers:** FAB on any compatible screen

### Layout
```
[Bottom sheet snapPoints=['100%']]
  [Handle bar]
  [Header: "AI Assistant" + X]
  [Inverted FlatList: messages]
  [Quick chips row — context aware]
  [Input bar — KeyboardAvoidingView]
```

### Message Bubble
| Type | Alignment | Background |
|------|-----------|------------|
| User | right | #6443F4 |
| AI | left | rgba(255,255,255,0.08) |
| System | center | transparent, italic, small |

### Quick Chips (context-aware)
Changes based on current screen:
- In live: "What's nearby?" / "Book a taxi" / "Weather?" / "Translate"
- In planning: "Find alternatives" / "Best price" / "Add to cart"
- General: "Recommend" / "Help" / "Info"

### AI Rich Responses
Special message types:
```
[Map card]: mini map with pin
[Hotel card]: image + name + price
[Activity card]: image + name + "Add to trip" button
[Flight card]: route + price + "Select" button
[Weather card]: forecast widget
```

### Input Bar
```
[+ attach]  [Type a message...........] [🎙 voice] [➤ send]
```
Voice: tap → speech-to-text → fill input

### States
| State | Visual |
|-------|--------|
| AI typing | 3 animated dots |
| Error | "Couldn't get response. Try again." |
| Empty | welcome message + suggestion chips |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| X / swipe down | — | dismiss modal |
| Quick chip | tap | fill input + send |
| Rich card CTA | tap | varies (deep link) |
| Message LP | long press | copy to clipboard |
| Send | tap | POST /ai/chat |
| Voice | tap | speech-to-text |

---

## S42 — Emergency Contacts
**Route:** `app/(live)/[tripId]/emergency.tsx`

### Layout
```
[ScrollView]
  [Banner: current country flag + "Emergency in [Country]"]
  [Local Emergency Numbers — large]
  [Embassy contact]
  [Personal emergency contacts]
  ["Share My Location" button]
  [Offline badge: "Works offline ✓"]
```

### Local Numbers Section
```
[🚨 Police]     [112]  [📞 Call]
[🚑 Ambulance]  [998]  [📞 Call]
[🚒 Fire]       [997]  [📞 Call]
```
Each: large tap target 64px height

### Embassy Section
```
[🏛️ Israeli Embassy Dubai]
[+971 4 XXX XXXX]
[📍 Address]
[📞 Call] [🌐 Website]
```

### Personal Emergency Contacts
List with: avatar + name + relationship + phone
"+ Add Contact" → contact picker

### Share Location Button
```
[📍 Share My Location]
```
Generates: "I'm at [GPS coordinates] in [City, Country]"
Offers: WhatsApp / SMS / Copy link

### Offline Indicator
```
[✓ Available offline]
```
Data cached in WatermelonDB

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Phone number | tap | `Linking.openURL('tel:...')` |
| SMS | tap | `Linking.openURL('sms:...')` |
| Embassy address | tap | map modal |
| "Share Location" | tap | share sheet |
| "+ Add Contact" | tap | contact picker |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

# ═══════════════════════════════════
# TAX & CUSTOMS SYSTEM (T1–T7)
# ═══════════════════════════════════

---

## T1 — Tax Dashboard
**Route:** `app/(live)/[tripId]/tax/index.tsx`

### Layout
```
[ScrollView]
  [Header: "Tax & Customs" + country flag]
  [Card 1: Tax-Free Threshold]
  [Card 2: VAT Refund]
  [Card 3: Must Declare]
  [Purchases list — grouped by day]
  [+ FAB]
```

### Card 1 — Tax-Free Threshold
```
┌─────────────────────────────────┐
│ TAX-FREE THRESHOLD               │
│ ████████████░░░░░░░  67%         │
│ ₪1,340 / ₪2,000 used            │
│ ₪660 remaining                   │
│ [⚠️ Approaching limit]            │
└─────────────────────────────────┘
```
Bar: green→orange→red based on %, animated on mount
Warning banner: appears at 80%

### Card 2 — VAT Refund
```
┌─────────────────────────────────┐
│ VAT REFUND ELIGIBLE 💰           │
│ €234.50 eligible across 8 shops │
│ Est. refund: €47.00 (20%)       │
│ [View Details →]                 │
└─────────────────────────────────┘
```

### Card 3 — Must Declare
```
┌─────────────────────────────────┐
│ CUSTOMS DECLARATION ✓           │
│ Nothing to declare currently    │
│ OR:                             │
│ 2 items over limit              │
│ [View Items →]                  │
└─────────────────────────────────┘
```

### Purchase Row
```
[🏪 icon] [Store Name]      [₪450]  [Tax-Free ✓]
          [15 Apr · Clothes]         [VAT: ₪81]
```

### Day Group
```
[Tue 15 Apr ·········· ₪1,200 · 3 purchases]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "+" FAB | tap | T2 Camera |
| Card 1 | tap | expand threshold breakdown |
| Card 2 "Details" | tap | T5 VAT Guide |
| Card 3 "Items" | tap | T4 Country Rules |
| "Country Rules" | tap | T4 |
| "Pre-Flight" | tap | T6 |
| Purchase row | tap | `/_modals/purchase-detail` |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## T2 — Camera Capture
**Route:** `app/(live)/[tripId]/tax/add.tsx`
**FAB:** ✗

### Layout
```
[Full screen camera]
  [Tab bar top: Receipt | Price Tag]
  [Camera preview — full height]
  [Guide frame overlay]
  [Capture button — bottom center]
  [Flash toggle — top right]
  [Gallery shortcut — bottom left]
  ["Add manually" — bottom, text link]
  [X close — top left]
```

### Guide Frame
| Mode | Shape | Orientation |
|------|-------|-------------|
| Receipt | tall rectangle, 85% width | portrait locked — app locks rotation |
| Price Tag | square, 70% width | any orientation, frame rotates with device |

- Frame color: white 2px corners only (no full border)
- Instruction text below frame: "Align receipt within frame" / "Center price tag in frame"
- Frame center of camera preview always

### Capture Button
```
[○ outer ring] [● inner fill] ← 72×72px
```
Press: inner scale(0.85) + outer ripple

### States
| State | Visual |
|-------|--------|
| Scanning | "Scanning..." overlay |
| OCR success | green flash + navigate |
| OCR low confidence | "Some fields need review" |
| OCR failure | "Couldn't read. Add manually?" |
| No camera permission | permission request UI |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Tab: Receipt | tap | receipt mode |
| Tab: Price Tag | tap | tag mode |
| Capture | tap | OCR → T3 |
| "Add Manually" | tap | T3 (empty form) |
| Gallery shortcut | tap | image picker → OCR → T3 |
| X close | tap | T1 |

---

## T3 — Review & Confirm
**Route:** `app/(live)/[tripId]/tax/review.tsx`

### Layout
```
[ScrollView, modal presentation]
  [Header: "X items found" + X close]
  [Store card]
  [Items list — editable]
  [+ Add item row]
  [Tax Preview Card — real-time]
  [Save button sticky]
```

### Store Card
```
[Store Name — editable]  [📅 15 Apr — editable]
[Total: ₪450 — auto-sum] [Tax-Free toggle ○——]
```

### Item Row (editable inline)
```
[Item name _______] [₪120    ] [Category▾] [🎁▾] [✕]
```
Tap any field: inline keyboard edit
Category: bottom sheet picker
Gift: toggle (gifts tracked separately for duty)

### Tax Preview Card
**Position:** below all item rows, above Save button
**Behavior:** sticky — scrolls with content until it reaches save button area, then sticks
**Updates:** debounced 300ms after any field change. Border pulses briefly (purple flash 200ms) when values change.
```
┌─────────────────────────────────┐
│ AFTER THIS PURCHASE:             │
│ Threshold: ₪1,790 / ₪2,000 ⚠️  │
│ VAT Eligible: +₪81              │
│ Declaration: Nothing to declare │
└─────────────────────────────────┘
```

### "+ Add Item" Row
```
[+ Add another item]  ← tap → new empty row appears
```

### States
| State | Visual |
|-------|--------|
| Saving | button spinner |
| Save success | navigate T1 |
| Save error | inline error |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Any field | tap | inline edit |
| Category | tap | `/_modals/category-picker` |
| Item ✕ | tap | delete row |
| "+ Add Item" | tap | new row |
| "Save" | tap | POST /purchases → T1 |
| "Discard" | tap | confirm modal → T1 |
| X / Back | tap | confirm if unsaved → T1 |

---

## T4 — Country Rules
**Route:** `app/(live)/[tripId]/tax/rules.tsx`

### Layout
```
[ScrollView]
  [Header: "Country Rules" + flag]
  [Current passport section]
  [Allowances table]
  [Visa Requirements section]
  [Prohibited items section]
```

### Allowances Table
```
Category         Allowance    Your Total   Status
────────────────────────────────────────────────
Clothing         ₪3,000       ₪1,200       ✅ OK
Electronics      ₪1,500       ₪1,800       🔴 Over
Alcohol          2 bottles    0            ✅ OK
Tobacco          200 cigs     0            ✅ OK
```
Exceeded rows: red highlight + "!!" badge

### Visa Requirements
```
[🛂 Passport: Israeli 🇮🇱]
[✅ No visa required for UAE]
[Valid for: 30 days]
[Max stay: 90 days/180]
```

### Prohibited Items
```
🚫 [Item name] — [reason]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Exceeded row | tap | expand "What to do" |
| "Change Passport" | tap | passport picker |
| Back `‹` | tap | T1 |

---

## T5 — VAT Refund Guide
**Route:** `app/(live)/[tripId]/tax/vat.tsx`

### Layout
```
[ScrollView]
  [3-step guide banner]
  [Airport warning persistent]
  [Eligible purchases — scrollable]
  [Non-eligible purchases — scrollable]
  [QR/Barcode section]
```

### 3-Step Guide
```
Step 1: 🛍️ Shop        → Request Tax-Free form
Step 2: ✍️ Get Stamped → At customs, before security
Step 3: 💰 Get Refund  → At VAT refund counter/kiosk
```
Horizontal carousel, swipeable

### Airport Warning Banner (persistent)
```
⚠️ Get your forms stamped BEFORE security!
   You cannot return after security.
```
Sticky, yellow bg

### Eligible Purchases
```
[Store Name]              [₪450]  [VAT: ₪81]
[Tax-Free form: REQUIRED]
[Tap for QR code ▾]
```
Expand: QR code for that specific store form

### Non-Eligible
```
[Store Name] — [Reason: "Below minimum €50 threshold"]
```

---

## T6 — Pre-Flight Checklist
**Route:** `app/(live)/[tripId]/tax/checklist.tsx`

### Layout
```
[ScrollView]
  [Banner: "Pre-Flight — X hours to departure"]
  [Must Declare section]
  [Carry-on Classification table]
  [VAT refund status row]
  [Financial summary]
  [Action buttons row]
  [Customs Form CTA]
```

### Must Declare Checklist
```
[○] Goods over ₪2,000 threshold
[○] More than €10,000 cash
[○] Restricted items (see list)
[✓] Declared medications
```

### Carry-On Classification Table
```
Item              Status
────────────────────────
Perfume <100ml    ✅ Safe
Laptop             ✅ Safe  
Power bank >100Wh  ⚠️ Restricted
Liquids >100ml     🚫 Must Check-in
```

### VAT Row
```
[VAT Stamp Status: NOT YET]
→ "Get stamp BEFORE security!"
```

### Financial Summary
```
Total Spent:      ₪3,400
Tax-Free Refund:  +₪234 ← green
Total Declared:   ₪0
Net:              ₪3,166
```

### Action Buttons Row
```
[📥 Download PDF]  [⏰ Phone Reminder]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Checkbox | tap | toggle |
| "Download PDF" | tap | generate → share sheet |
| "Phone Reminder" | tap | Expo Notifications/Calendar |
| "Customs Form →" | tap | T7 |
| Back `‹` | tap | T1 |

---

## T7 — Customs Form
**Route:** `app/(live)/[tripId]/tax/form.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Customs Form" + form selector]
  [Form preview — PDF-like]
  [Auto-filled fields highlighted]
  [Action buttons]
```

### Form Selector
```
[🇮🇱 IL] [🇺🇸 US] [🇬🇧 UK] [🇪🇺 EU]
```
Tabs, active: underline purple

### Form Preview
Rendered PDF-like:
- White card on dark bg
- Blue highlight on auto-filled fields
- Empty fields: dashed outline
- Scrollable

### Auto-Filled Fields
- Full Name (from profile)
- Passport Number (if added in Documents)
- Flight Number (from booking)
- Departure Date
- Goods declared (from T1 data)
- Total value (from T1 data)

### Action Row
```
[📥 Download PDF] [📧 Email] [🖨️ Print]
```

---

# ═══════════════════════════════════
# PART F — POST-TRIP
# ═══════════════════════════════════

---

## S44 — Post-Trip Celebration
**Route:** `app/(trip)/post/[tripId]/celebration.tsx`
**Back:** X button top-right → S45 (animation can be skipped)

### Layout
```
[Full screen, dark]
  [Confetti full-screen — auto]
  [Mascot animation — center]
  ["You're back!" — animated text]
  [Stats row — count-up animation]
  [Cashback card — slides up]
  [Action buttons]
```

### Stats Row (count-up animation)
```
[5 days] [12 activities] [47 photos]
```
Numbers count up from 0 over 1.5s

### Cashback Card
```
[💰 Cashback Earned]
[€47.50]
[From this trip's bookings]
[Share 📤]
```
Slides up from bottom after 1s

### Action Buttons
```
[⭐ Rate Your Trip]    [← primary]
[📊 View Summary]     [← secondary]
```

### States
| State | Visual |
|-------|--------|
| First time | full sequence: confetti → mascot → stats |
| Revisiting | stats visible, no confetti |

### Haptic Sequence
Mount: pattern O.O.O (3 celebration pulses) with 300ms gaps

---

## S45 — Trip Summary

### Layout
```
[ScrollView]
  [Hero header: trip image + name + dates]
  [Stats grid 2×3]
  [Spending donut chart]
  [Countries visited map]
  [Top activities carousel]
  [DNA impact card]
  [Action buttons]
```

### Stats Grid
```
[🌍 1 Country] [🎯 12 Activities]
[📸 47 Photos] [💰 €974 Spent]
[⭐ 4.8 Rating][✈️ 2,450 km]
```

### Spending Donut Chart
Center: total spent
Segments: Hotels / Activities / Food / Transport
Tap segment: highlight + show amount

### Countries Visited Map
World map SVG, visited country highlighted purple
Tap: full-screen modal

### Top Activities Carousel
3 cards: image + name + rating you gave

### DNA Impact Card
```
[🧬 DNA Updated]
"Based on this trip, your Explorer score +5"
[See changes →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Gallery" | tap | S47 |
| "Rate & Review" | tap | S46 |
| "Book Similar" | tap | `/(trip)/plan/destination?similar=` |
| Countries map | tap | full-screen |
| DNA card | tap | `/(trip)/profile/dna` |
| Back `‹` | tap | S44 |

---

## S46 — Rate & Review

### Layout
```
[ScrollView, KeyboardAvoidingView]
  [Header: "Share Your Experience"]
  [5-star overall]
  [Aspect ratings]
  [Text review area]
  [Photo row]
  [Public/Private toggle]
  [Submit button]
```

### 5-Star Overall
Large stars: 48px each, row of 5
Tap: set score + haptic selection × score
Color: gold ⭐ filled

### Aspect Ratings (5 categories)
Each row:
```
[Planning]    ⭐⭐⭐⭐⭐
[Activities]  ⭐⭐⭐⭐⭐
[Value]       ⭐⭐⭐⭐⭐
[AI Assistant]⭐⭐⭐⭐⭐
[Overall]     ⭐⭐⭐⭐⭐
```

### Text Area
Min height 100px, expandable
Placeholder: "What made this trip special?"

### Photo Row
3 placeholder slots + add button
Upload: expo-image-picker

### Public/Private Toggle
```
[🌍 Public — others can see this]  [———○]
```

---

## S47 — Photo Gallery

### Layout
```
[SafeAreaView]
  [Header: "Your Memories" + count]
  ["Generate Video" button]
  [Photo grid 3-col]
  [Download / Share actions]
```

### Generate Video Button
```
[🎬 Generate Highlight Video]
```
States: idle → generating (progress bar) → "Watch Video ▶"

### Photo Grid
3 columns, gap 2px, all square aspect ratio
Long press → multi-select mode
Multi-select: checkmarks, action bar at bottom

### Full-Screen Viewer
Same as S40

---

# ═══════════════════════════════════
# WALLET
# ═══════════════════════════════════

---

## S48 — Wallet
**Route:** `app/(tabs)/wallet/index.tsx`

### Layout
```
[ScrollView]
  [Balance card]
  [Quick actions row]
  [Payment methods section]
  [Recent transactions section — last 5]
  [KYC banner — if not verified]
```

### Balance Card
```
┌─────────────────────────────────┐
│ Total Balance              🔒   │
│ €1,247.50                       │
│ ████████████████████ +12% 30d   │
│ [Add Funds]    [Withdraw]       │
└─────────────────────────────────┘
```
Background: gradient purple dark
Balance: 48px Bold
Trend indicator: green arrow if positive

### Quick Actions Row
```
[💳 Split Pay] [📊 Transactions] [🎁 Send]
```

### Payment Method Row
```
[💳 Visa ···· 4242]  [Default ✓]  [Edit]
[+ Add Payment Method]
```

### Recent Transactions
```
[💰 Cashback from Dubai trip]   +€47.50   [Today]
[✈️ EK001 Dubai–London]         -€340     [15 Apr]
[🏨 Dubai Marina Hotel]         -€445     [15 Apr]
[See all →]
```

### KYC Banner
```
[🔐 Verify your identity to send & withdraw]
[Verify Now →]
```
If not verified, appears above payment methods

### States
| State | Visual |
|-------|--------|
| WebSocket update | balance animates to new value |
| No payment method | CTA prominent |
| KYC pending | banner + some features locked |
| KYC verified | green badge |

---

## S49 — Add Funds

### Layout
```
[ScrollView, KeyboardAvoidingView]
  [Header: "Add Funds"]
  [Preset amounts row]
  [Custom amount input]
  [Fee display]
  [Total row]
  [Add button sticky]
```

### Preset Row
```
[€10] [€20] [€50] [€100]
```
Active: bg purple, tap → fill input

### Custom Input
Large: 48px center, € prefix, numeric keyboard

### Fee Display
```
Amount:     €100.00
Fee (1.5%):  €1.50
─────────────────
Total:      €101.50
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Preset | tap | fill input |
| "Add Funds" | tap | Stripe PaymentIntent → process |
| Success | auto | `/(tabs)/wallet` + toast |
| Back `‹` | tap | `/(tabs)/wallet` |

---

## S51 — Split Pay

### Layout
```
[SafeAreaView]
  [Header: "Split Payment"]
  [Amount display]
  [Split type selector]
  [Participants list]
  [Per-person breakdown]
  [Share section]
  [Status tracker]
```

### Split Type
```
[Equal Split ○] [Custom Amount ○]
```

### Participants
```
[You: Sarah]          €162.33 (auto)
[+ Add participant]
  → [Search contacts or enter email/phone]
```

Added participant:
```
[Avatar] [Dana Cohen]    €162.33  [Edit amount if custom]
                                  [Remove ×]
```

### Share Section
```
[📱 WhatsApp] [💬 SMS] [📋 Copy Link] [📤 Share]
```
Link: `travi.world/split/ABC123`

### Status Tracker
After sharing:
```
[You: Sarah]   ✓ Paid  €162.33
[Dana Cohen]   ⏳ Sent  €162.33
[Yael Levi]    ⏳ Sent  €162.33
```
| Connection State | Visual |
|-----------------|--------|
| Connected | status updates fade in immediately |
| Disconnected | banner top: "Updates paused — reconnecting..." (yellow) |
| Reconnected | banner changes to "Back online ✓" (green) → fades 3s |
| Pull-to-refresh | always available regardless of connection |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "+" participant | tap | add person |
| Share buttons | tap | respective app |
| Participant X | tap | remove |
| Back `‹` | tap | `/(tabs)/wallet` |

---

## S52 — KYC (Identity Verification)

### Layout
```
[Center px-24]
  [Shield icon 80px]
  ["Verify Your Identity" title]
  [Why we need it — explanation]
  [What you'll need — list]
  [Stripe Identity CTA]
  [Status states]
```

### Why Section
```
✓ Send money to friends
✓ Withdraw to bank account
✓ Increase transaction limits
```

### What You'll Need
```
📄 Government ID (passport/ID card)
🤳 Selfie photo
```

### Status States
| State | Visual |
|-------|--------|
| Not started | CTA: "Start Verification" |
| Pending | spinner + "Reviewing your submission..." |
| Verified | ✓ green + "Identity Verified" |
| Failed | ✗ red + reason + "Try Again" |

### Stripe Identity Sheet
Opens natively via `presentIdentityVerificationSheet()`
Handles: ID capture / selfie / liveness check

---

# ═══════════════════════════════════
# MEMBERSHIP — S53
# ═══════════════════════════════════

---

## S53 — Membership
**Route:** `app/(trip)/membership.tsx`

### Layout
```
[ScrollView]
  [Header: "TRAVI Membership"]
  [Current plan badge]
  [Plan cards — horizontal scroll or 2×2 grid on tablet]
  [Feature comparison table]
  [CTA button]
```

### Plan Card
```
┌─────────────────┐
│ ⭐ First Class  │  ← highlighted for best value
│ €19.99/month    │
│ ─────────────── │
│ ✓ Unlimited AI  │
│ ✓ Priority book │
│ ✓ Lounge access │
│ ✓ 3× points     │
│                 │
│ [Upgrade Now]   │
└─────────────────┘
```

| Tier | Price | Badge |
|------|-------|-------|
| Freemium | Free | none |
| Pass | €4.99/mo | none |
| Plus | €9.99/mo | "Popular" |
| First Class | €19.99/mo | "Best Value" |

### Current Plan
```
[✓ Your current plan: Pass]  ← pill at top
```
Current plan card: different border, "Current" badge

### Feature Comparison Table
Scrollable, sticky header row:
```
Feature         Free  Pass  Plus  FC
─────────────────────────────────────
AI Chat         Basic  ✓    ✓     ✓
Recommendations   3    10   20   Unlimited
Points rate      1×    2×   2.5×  3×
Split pay         ✗    ✓    ✓     ✓
Tax & Customs     ✗    ✗    ✓     ✓
Airport lounges   ✗    ✗    ✗     ✓
```

### CTA Area
If current is Freemium:
```
[🎉 Start 7-Day Free Trial — Then €9.99/mo]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Plan card | tap | expand features |
| "Upgrade" | tap | Stripe subscription modal |
| "Free Trial" | tap | trial start modal |
| Back `‹` | tap | previous |

---

# ═══════════════════════════════════
# POINTS SYSTEM (S91–S100)
# ═══════════════════════════════════

---

## S91 — Points Dashboard

### Layout
```
[ScrollView]
  [Balance card — large]
  [Tier + earn rate row]
  [AI Recommendation card]
  [Featured deals — horizontal scroll]
  [Partner logos — horizontal scroll]
  [Quick navigation grid]
```

### Balance Card
```
┌─────────────────────────────────┐
│ TRAVI Points                    │
│  47,250  pts                    │  ← animated counter on mount
│ ████████████████  Gold tier     │
│ 2,750 pts to Platinum           │
└─────────────────────────────────┘
```

### Tier Progress
```
[Silver ——[●]————————— Gold ——————— Platinum]
                       ↑ you are here
```

### AI Recommendation (borski)
```
┌─────────────────────────────────┐
│ 🤖 Best Use Right Now           │
│ Transfer to Emirates Skywards:  │
│ 40,000 pts = DXB–LHR Business  │
│ Est. value: $1,200 → cpp: 3¢   │
│ [View Deal →]                   │
└─────────────────────────────────┘
```
Border: rgba(100,67,244,0.4)

### Quick Navigation Grid
```
[🎁 Redeem   ][💎 Earn    ]
[📜 History  ][👑 Perks   ]
[👥 Referrals][🏷️ Promotions]
```

---

## S94 — Partner Detail

### Layout
```
[ScrollView]
  [Partner header: logo + name]
  [Current ratio card]
  [CPP Calculator — interactive]
  [AI Analysis card]
  [Transfer amount selector]
  [IRREVERSIBLE warning]
  [Transfer button]
```

### CPP Calculator
```
Transfer amount: [━━━━●━━━━━━━] 10,000 pts

Your points:     10,000
Transfer ratio:  1:1.2 (bonus until Apr 30)
You receive:     12,000 Skywards miles
Est. value:      $300 (at 2.5¢ cpp)
Is it worth it?  [✅ Great value]
```
Slider: updates all values in real-time

### IRREVERSIBLE Warning (before transfer)
```
⚠️ This transfer cannot be undone
Points transfers are immediate and permanent.
Emirates Skywards miles cannot be converted
back to TRAVI Points.

[I Understand, Transfer]   [Cancel]
```

---

## S99 — Referrals

### Layout
```
[ScrollView]
  [Your referral card]
  [Stats row]
  [Share section]
  [Friends list]
  [How it works — 3 steps]
```

### Referral Code Card
```
┌─────────────────────────────────┐
│ Your Referral Code               │
│                                  │
│      DAVID2026                   │
│                                  │
│ travi.world/join?ref=DAVID2026  │
│                                  │
│ [📋 Copy Link]  [📤 Share]      │
└─────────────────────────────────┘
```

### Stats Row
```
[12 Friends Joined] [3,400 Points Earned] [2 Subscribed]
```

### Share Buttons
```
[💬 WhatsApp] [📱 SMS] [📧 Email] [📋 Copy]
```

### Friends List
```
[Avatar] Dana Cohen     [Plus member]    +400 pts
[Avatar] Yael Levi      [Registered]     +500 pts
[Avatar] Tom Ben-David  [Invited 3d ago] pending
```

### How It Works
```
① Share link → friend installs → both get 500 pts
② Friend upgrades subscription → you get up to 800 pts
③ Friend renews annually → you get 100 pts/year
```

Points only on subscription. Not on trips. Self-referral blocked.

---

# ═══════════════════════════════════
# SOCIAL SYSTEM (S78–S86)
# ═══════════════════════════════════

---

## S78 — Community Feed

### Layout
```
[SafeAreaView]
  [Header: "Community" + [Messages 💬] + [Discover 🔭]]
  [Stories bar — horizontal]
  [Feed FlatList]
```

### Story Circle
| State | Style |
|-------|-------|
| Unseen | purple gradient ring 2px |
| Seen | gray ring |
| Your story | "+" add story |

### Feed Post
```
[Avatar 36px] [Name · 2h ago]        [•••]
[Trip photo or text content          ]
[Text content below image            ]
[────────────────────────────────────]
[♥ 124] [💬 18] [↗️ Share]   [🔖 Save]
```

### Responsive Behavior
| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | single column, full width |
| Tablet (768–1024px) | feed centered max-w-600, padding 32px sides |
| Desktop (>1024px) | 3-column: sidebar 240px + feed max-w-600 + widgets 300px |

---

## S85 — Chat

### Layout
```
[SafeAreaView]
  [Header: Avatar + Name + "View Profile"]
  [FlatList inverted — messages]
  [KeyboardAvoidingView]
    [Input bar]
```

### Message Types

**Text:**
```
         [User message bubble purple right]
[AI/Other message bubble glass left      ]
```

**Trip Share Card:**
```
[Image 120px  |  Dubai, UAE               ]
[             |  "Check out this place!"  ]
[             |  [View Destination →]     ]
```

**Image Message:**
```
[Image 200px, radius-16, full-width bubble]
```

### Input Bar
```
[+ ] [Type a message.............] [🎙] [➤]
```
"+" expands attachment menu:
- 📷 Camera
- 🖼️ Library  
- 📍 Share Location
- ✈️ Share Trip

### Message LP Options
```
[ ↩️ Reply     ]
[ 😀 React     ]
[ 📋 Copy      ]
[ 🗑️ Delete   ]
```

---

# GLOBAL MODALS

---

## S74 — DNA Celebration Modal
**Route:** `app/_modals/dna-celebration.tsx`
**Animation:** fade | **Back:** BLOCKED

### Layout
```
[Full screen dark]
  [Confetti blast from center]
  [Mascot animation: celebrating]
  ["Your Travel DNA" label]
  ["You're an Explorer" — reveal]
  [Persona description]
  [CTA: "Discover Your Matches →"]
```

### Reveal Animation Sequence
```
0ms:   confetti starts
200ms: mascot appears (bounce)
800ms: "You're a" fades in
1200ms: persona name slides up (large, bold)
1600ms: description fades in
2000ms: CTA button slides up
```

---

## Session Expired — S63
**Route:** `app/_modals/session-expired.tsx`

### Layout
```
[Full screen, blur overlay over previous]
  [Lock icon 80px]
  ["Session Expired" title]
  ["Your session has expired. Sign in to continue."]
  [Biometric button — if enrolled]
  [Sign In Again — primary CTA]
  [Start Fresh — text link]
```

### Biometric Button
```
[Face ID / Touch ID icon] "Sign in with Face ID"
```
Auto-prompt on mount (if biometric enrolled)

### States
| State | Visual |
|-------|--------|
| Biometric enrolled | auto-prompt + button visible |
| Not enrolled | only "Sign In Again" |
| Biometric failed | "Try again" + manual option |

---

## No Internet — S60
**Type:** overlay component (not a route)

### Layout
```
[Full screen overlay rgba(0,0,0,0.95)]
  [📶 icon — animated (signal bars filling)]
  ["No Internet Connection"]
  ["Check your connection and try again"]
  [Retry button]
  [Cached content notice — if available]
```

### Show/Hide Logic
- Show: 2000ms after connection lost (debounce)
- Hide: 500ms after connection restored + "Back online!" toast
- Toast duration: 3s, green

---

*TRAVI · Complete Prototype Specification · April 2026*
*All screens · All states · All animations · All UX details*

# ═══════════════════════════════════
# PART B2 — DISCOVERY (המשך)
# ═══════════════════════════════════

---

## S15 — Profile
**File:** `app/(trip)/profile/index.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[ScrollView]
  [Profile header card]
  [Menu sections]
  [Sign out button]
```

### Profile Header Card
```
[Avatar 80px circle]  [Name: Sarah Cohen]
                      [✦ Explorer · Gold tier]
                      [15 trips · 8 countries]
```
Background: rgba(100,67,244,0.1), border rgba(100,67,244,0.2)

### Menu Sections

**Account**
```
[👤 Edit Profile          ›]
[🧬 Travel DNA            ›]
[⭐ Membership            ›]
[🎁 Wishlist              ›]
```

**Activity**
```
[✈️ My Trips              ›]
[💰 Wallet                ›]
[⭐ Points & Rewards      ›]
```

**Support**
```
[⚙️ Settings              ›]
[❓ Help & Support         ›]
[📄 Privacy Policy        ›]
[📋 Terms of Service      ›]
```

**Danger Zone**
```
[🚪 Sign Out]  ← text only, red, centered
```

### Menu Row
Height: 56px, flex-row, icon 24px left + label flex-1 + › right
Tap: scale(0.99) 100ms + haptic impactLight

### Sign Out Confirmation Sheet
```
[Bottom sheet 260px]
"Sign out of TRAVI?"
[Sign Out]  ← red
[Cancel]
```
On confirm: clear SecureStore + authStore.reset() + router.replace('/(auth)/welcome')

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Avatar | tap | `/(trip)/profile/edit` |
| "Edit Profile" | tap | `/(trip)/profile/edit` |
| "Travel DNA" | tap | `/(trip)/profile/dna` |
| "Membership" | tap | `/(trip)/membership` |
| "Wishlist" | tap | `/(trip)/wishlist` |
| "My Trips" | tap | `/(tabs)/trips` |
| "Wallet" | tap | `/(tabs)/wallet` |
| "Points" | tap | `/(tabs)/points` |
| "Settings" | tap | `/(trip)/settings/index` |
| "Help" | tap | `/(trip)/settings/support` |
| "Sign Out" | tap | confirm sheet → clear → `/(auth)/welcome` |

---

## S16 — DNA Management
**File:** `app/(trip)/profile/dna.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[ScrollView]
  [Header: "Your Travel DNA"]
  [Persona card — top]
  [Completion ring + score]
  [8 Dimension cards]
  [Retake section — bottom]
```

### Persona Card
```
┌──────────────────────────────────────┐
│  ✦ Explorer                          │
│  "You chase experiences, not hotels" │
│  [DNA helix illustration right side] │
└──────────────────────────────────────┘
```
Gradient: purple → pink, radius-20

### Completion Ring
```
[SVG ring 100px, 92% filled]
   92%
  Complete
```
Below: "X signals logged · X trips analyzed"

### Dimension Card
```
[Adventure & Sports]          [78%]
[████████████████░░░░] ← animated bar
"You prefer outdoor challenges and active experiences"
[▾ show details]
```
8 dimensions:
1. Adventure & Sports
2. Culture & History
3. Luxury & Comfort
4. Social & Nightlife
5. Nature & Wildlife
6. Food & Gastronomy
7. Wellness & Relaxation
8. Budget Consciousness

Expand: shows sub-signals breakdown

### States
| State | Visual |
|-------|--------|
| Loading | skeleton bars |
| Quick DNA only | "Complete full DNA for more insights" banner |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Dimension card | tap | expand/collapse |
| "Retake DNA Quiz" | tap | confirm modal → `/(auth)/quick-dna/index` |
| Back `‹` | tap | `/(trip)/profile` |

---

## S17 — Wishlist
**File:** `app/(trip)/wishlist.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Header: "Wishlist" + count]
  [Filter chips]
  [FlatList or Empty state]
```

### Filter Chips
All / 🌍 Destinations / 🏨 Hotels / 🎯 Activities

### Wishlist Card
```
[Image 100px]  [Name Bold]           [♥ pink]
               [Country / Category]
               [DNA ✦ XX% Match]
               [from €XX / night or €XX]
```
Height: 100px, image left square, info right

### Swipe to Remove
Swipe left reveals: red "Remove" button 80px
Tap Remove: optimistic remove + "Undo" toast 5s
Undo: PUT back to wishlist

### Multi-select Mode
Long press → enter multi-select:
- Each card: checkbox appears left
- Bottom action bar: "Remove (X)" button
- X to exit mode

### Empty States
| Filter | Illustration | Text |
|--------|-------------|------|
| All | heart with + | "Save places you love" |
| Destinations | globe | "No saved destinations" |
| Hotels | bed | "No saved hotels" |
| Activities | compass | "No saved activities" |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Card | tap | destination/hotel/activity detail |
| ♥ icon | tap | remove (optimistic) + undo toast |
| Swipe left | swipe | delete action |
| Long press | press | multi-select mode |
| FAB | tap | `/_modals/ai-chat` |

---

## S18 — Notifications
**File:** `app/(trip)/notifications.tsx`
**Tab bar:** ✓ | **FAB:** ✗

### Layout
```
[SafeAreaView]
  [Header: "Notifications" + "Mark all read"]
  [Notification FlatList grouped by date]
  [Empty state if none]
```

### Date Groups
```
[TODAY ·················]
  [notification rows]
[YESTERDAY ············]
  [notification rows]
[EARLIER ··············]
  [notification rows]
```

### Notification Row
```
[Icon 40px circle]  [Title Bold]                [2h · ●unread]
                    [Subtitle text-secondary]
```
| Type | Icon bg | Icon |
|------|---------|------|
| Booking confirmed | green | ✈️ |
| Price drop | yellow | 💰 |
| Pre-flight | blue | ⏰ |
| AI message | purple | 🤖 |
| Trip update | purple | 🗺️ |
| Points earned | pink | ⭐ |
| Message | gray | 💬 |

Unread: bg rgba(100,67,244,0.05), dot right
Read: standard bg

### Swipe Left
Red "Delete" 80px — immediate delete

### Mark All Read
Top-right button: "Mark all read" → marks instantly + haptic

### Empty State
```
[Bell illustration]
"You're all caught up!"
"Notifications will appear here"
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Booking row | tap | `/(trip)/pre/[tripId]` |
| Price drop row | tap | `/(trip)/plan/flights` |
| Pre-flight row | tap | `/(live)/[tripId]/tax/checklist` |
| Message row | tap | `/(social)/messages/[convId]` |
| Points row | tap | `/(tabs)/points` |
| Swipe left | swipe | delete |
| "Mark all read" | tap | PATCH /notifications/read-all |

---

## S59 — Search Results
**File:** `app/(tabs)/home/search-results.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Search input (active, with query prefilled)]
  [Results count: "X results for 'dubai'"]
  [Filter bar]
  [FlatList results]
```

### Result Card
Same as S14 Destination Detail card preview:
Image + Name + Country + Match % + Price from

### Filter Bar (horizontal scroll)
All / Destinations / Hotels / Activities / Experiences

### States
| State | Visual |
|-------|--------|
| Loading | 4 skeleton cards |
| Results | list |
| No results | "No results for '[query]'" + suggestions |
| Error | retry |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Search input | tap | `/(tabs)/home/search` |
| Result card | tap | `/(tabs)/home/destination/[id]` |
| Filter chip | tap | filter in-place |
| Infinite scroll | scroll to bottom | load more |
| FAB | tap | `/_modals/ai-chat` |

---

# ═══════════════════════════════════
# PART H2 — UNIVERSAL (המשך)
# ═══════════════════════════════════

---

## S43 — Trip Settings (Live)
**File:** `app/(live)/[tripId]/settings.tsx`
**Tab bar:** ✗ | **FAB:** ✓

### Layout
```
[ScrollView]
  [Header: "Trip Settings"]
  [Trip info row]
  [Toggles section]
  [Export section]
  [Danger zone]
```

### Toggles Section
```
[🔔 Trip Notifications    ○———]
[🤖 AI Proactive Messages ○———]
[📍 Share Location        ○———]
```

### Export Section
```
[📄 Download Trip PDF →]
[📤 Export Memories  →]
```

### Danger Zone
```
[⏹ End Trip Early]   ← orange
[✕ Cancel Trip]      ← red
```

### End Trip Early — Confirmation Sheet
```
[Bottom sheet 340px]
"End trip early?"
[Trip stats: X days · X activities · X photos]
"Your cashback will be calculated now"
[End Trip]  [Keep Going]
```
On confirm → `/(trip)/post/[tripId]/celebration`

### Cancel Trip — Confirmation
```
[Refund estimate card: €XXX]
"This action cannot be undone"
[Cancel Trip & Get Refund]  [Keep Trip]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Download PDF" | tap | generate → share sheet |
| "Export Memories" | tap | zip photos → share |
| "End Trip" | tap | confirm sheet → `/(trip)/post/[tripId]/celebration` |
| "Cancel Trip" | tap | refund estimate → confirm → cancel API → `/(tabs)/trips` |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## S50 — Transactions
**File:** `app/(trip)/wallet/transactions.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[SafeAreaView]
  [Header: "Transactions"]
  [Filter tabs]
  [FlatList — infinite scroll]
```

### Filter Tabs
All / Cashback / Trips / Top-ups / Refunds

### Transaction Row
```
[Icon 40px]  [Description]           [+€47.50]
             [Tue 15 Apr · 14:23]    [-€340  ]
```
| Type | Icon | Color |
|------|------|-------|
| Cashback | 💰 green circle | amount green |
| Trip booking | ✈️ purple | amount red |
| Top-up | ⬆️ blue | amount green |
| Refund | ↩️ orange | amount green |

### Transaction Detail (tap row)
Bottom sheet:
```
[Transaction type icon]
[Amount: €47.50]
[Date: Tue 15 Apr 14:23]
[Reference: TRV-2026-XXXX]
[Description: Cashback from Dubai trip]
[Download Receipt PDF →]
```

### Infinite Scroll
Load 20 per page, spinner at bottom

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Filter tab | tap | filter |
| Row | tap | detail bottom sheet |
| "Download Receipt" | tap | PDF → share sheet |
| Back `‹` | tap | `/(tabs)/wallet` |

---

## S54 — Profile Edit
**File:** `app/(trip)/profile/edit.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[ScrollView, KeyboardAvoidingView]
  [Header: "Edit Profile" + Save button]
  [Avatar section]
  [Form fields]
```

### Avatar Section
```
[Avatar 100px circle]
[Edit Photo]  ← tap → ActionSheet
```
ActionSheet: Take Photo / Choose Library / Remove Photo

### Form Fields
```
[First Name *]
[Last Name  *]
[Email ·····] [Change →]
[Phone      ]
[Date of Birth]
[Country    ] [Change →]
[Bio (optional, 160 chars max)]
```
Each: h-52px input, same style as S3

### Unsaved Changes Guard
`useBeforeRemove` → if form dirty:
```
[Bottom sheet]
"Unsaved changes"
[Save Changes]  [Discard]  [Keep Editing]
```

### Save Button
Top-right header button (text: "Save")
Only sends changed fields: PATCH /users/me { ...dirtyFields }
Loading: spinner in header
Success: pop back + toast "Profile updated"

### Change Email Flow
Tap "Change →" → modal:
```
[New email input]
[Current password (verification)]
[Send Verification →]
```
→ POST /users/me/change-email → OTP verification

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Avatar | tap | ActionSheet |
| "Change Email" | tap | change email modal |
| "Save" header | tap | PATCH → back |
| Back `‹` | tap | guard if dirty |

---

## S55 — Settings
**File:** `app/(trip)/settings/index.tsx`
**Tab bar:** ✗ | **FAB:** ✗

### Layout
```
[ScrollView]
  [Header: "Settings"]
  [Sections with rows]
```

### Sections

**Notifications**
```
[🔔 Trip Updates          ○———]
[✈️ Flight Alerts          ○———]
[💰 Price Drops            ○———]
[🤖 AI Messages            ○———]
[💬 Social Messages        ○———]
```

**Security**
```
[👁 Face ID / Touch ID     ○———]
[🔐 Change Password         ›]
[📧 Change Email            ›]
```

**Privacy**
```
[📍 Location Access         › (opens OS settings)]
[🔍 Search History          › Clear]
[📊 Data & Analytics        ○———]
```

**App**
```
[🌙 Dark Mode              (always on)]
[🔤 Language               English ›]
[💾 Clear Cache             › (shows size)]
[⭐ Rate the App            ›]
```

**About**
```
[📄 Privacy Policy          ›]
[📋 Terms of Service        ›]
[ℹ️ Version 2.1.0 (241)    ]
```

**Danger Zone**
```
[🗑️ Delete Account          ›]  ← red
```

### Toggle Behavior
Immediate optimistic + PATCH /settings debounced 1s

### Clear Cache
Tap → "Clearing 124MB..." → done toast

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Change Password" | tap | `/(trip)/account/change-password` |
| "Change Email" | tap | `/(trip)/account/change-email` |
| "Location Access" | tap | `Linking.openSettings()` |
| "Delete Account" | tap | `/(trip)/account/delete` |
| "Rate the App" | tap | App Store / Play Store |
| "Privacy Policy" | tap | webview |
| "Terms" | tap | webview |
| Back `‹` | tap | `/(trip)/profile` |

---

## S57 — My Trips
**File:** `app/(tabs)/trips/index.tsx`
**Tab bar:** ✓ | **FAB:** ✓

### Layout
```
[SafeAreaView]
  [Header: "My Trips"]
  [Filter tabs]
  [FlatList trips]
  ["+" FAB]
```

### Filter Tabs
All / ✈️ Upcoming / 🟢 Active / ✓ Past / ✗ Cancelled

### Trip Card
```
[Image 120px full-width top, radius-16 top]
[Content padding 16px]
  [Status badge: "Upcoming · 12 days away"]
  [Trip name: "Dubai Adventure 2026"]
  [📅 Tue 15 Apr — Mon 22 Apr · 5 nights]
  [🏙️ 4 activities · 🏨 Marina Hotel]
  [Progress bar (if pre-trip): X/Y checklist]
```
| Status | Badge color |
|--------|-------------|
| Draft | gray |
| Upcoming | blue |
| Pre-trip ready | yellow |
| Active | green pulse |
| Completed | purple |
| Cancelled | red strikethrough |

### Trip Card Long Press
ActionSheet:
```
[Share Trip]
[Duplicate Trip]
[Delete Trip]  ← red, confirm required
```

### Empty State per Filter
```
[Illustration]
"No upcoming trips"
[Plan Your Next Trip →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Card (draft) | tap | `/(trip)/plan/destination` |
| Card (upcoming/pre) | tap | `/(trip)/pre/[tripId]` |
| Card (active) | tap | `/(live)/[tripId]` |
| Card (completed) | tap | `/(trip)/post/[tripId]/celebration` |
| Card (cancelled) | tap | cancelled detail modal |
| Card long press | press | ActionSheet |
| "+" FAB | tap | `/(trip)/plan` |
| Filter tab | tap | filter list |

---

## S63 — Session Expired
**File:** `app/_modals/session-expired.tsx`
**Type:** full-screen modal | **Back:** BLOCKED

### Layout
```
[Full screen dark, blur overlay]
[Center column px-32]
  [Lock icon 80px, animated bounce]
  ["Session Expired" 24px Bold]
  ["Please sign in again to continue"]
  [Biometric button — if enrolled]
  ["Sign In Again" — primary]
  ["Start Fresh" — link]
```

### Biometric Button
```
[🔒 Sign in with Face ID]  ← or Touch ID / Fingerprint
```
Auto-prompt on mount (300ms delay)

### States
| State | Visual |
|-------|--------|
| Biometric enrolled | auto-prompt + button visible |
| Biometric failed | "Couldn't verify" + button again |
| Not enrolled | only manual sign-in |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Biometric success | auto | restore `sessionStore.lastRoute` |
| "Sign In Again" | tap | `/(auth)/signup` login mode → restore route |
| "Start Fresh" | tap | clear all stores + `/(auth)/welcome` |
| Back gesture | — | BLOCKED |

---

# ═══════════════════════════════════
# POINTS (המשך)
# ═══════════════════════════════════

---

## S92 — Redeem Hub
**File:** `app/(trip)/points/redeem/index.tsx`

### Layout
```
[ScrollView]
  [Header: "Redeem Points"]
  [Balance reminder: "47,250 pts available"]
  [AI best value banner]
  [Categories row]
  [Featured redemptions — horizontal scroll]
```

### Balance Reminder
```
[⭐ 47,250 pts]  ← pill top, bg rgba(100,67,244,0.2)
```

### AI Best Value Banner
```
[🤖 Best value right now: Emirates transfer]
[40,000 pts = €1,200 Business class]
[cpp: 3.0¢]                [View →]
```

### Category Cards Row
```
[✈️ Airline Miles] [🎁 Gift Cards] [💰 Cashback] [⬆️ Upgrades]
```
Each: 80px height, icon + label

### Featured Redemptions
Horizontal scroll cards:
```
[Partner logo] [Name]
[X,XXX pts]   [Est. value: €XX]
[cpp: X.Xc]
```

---

## S93 — Airline Miles
**File:** `app/(trip)/points/redeem/airline-miles.tsx`

### Layout
```
[ScrollView]
  [Header: "Airline Miles"]
  [Linked programs — top]
  [All partner airlines — list]
  [Recent transfers]
```

### Linked Program Row
```
[Emirates logo] [Emirates Skywards]  [Linked ✓]
[Balance: 24,500 miles]              [Transfer →]
```

### Partner Airline Row
```
[Logo 40px] [Airline Name]     [Ratio: 1:1.2]  [Transfer →]
            [Min: 1,000 pts]   [Bonus until X]
```
Bonus indicator: orange badge "🔥 Bonus active"

### borski AI Section
```
[🤖 Award Availability]
[DXB → LHR Business: 40,000 pts · 2 seats]
[DXB → JFK First: 80,000 pts · 1 seat]
[Updated: 5 min ago]
```

### Recent Transfers
```
[Emirates Skywards  40,000 pts  →  48,000 miles  15 Apr]
```

---

## S95 — Gift Cards
**File:** `app/(trip)/points/redeem/gift-cards.tsx`

### Layout
```
[SafeAreaView]
  [Search brands bar]
  [Filter: All / Travel / Shopping / Food / Entertainment]
  [Grid 2-col]
```

### Gift Card Cell
```
[Brand logo 80×80px centered]
[Brand Name]
[from 5,000 pts]
```
| State | Visual |
|-------|--------|
| Sufficient points | normal |
| Insufficient | grayed out + "Need X more pts" |

### Purchase Modal (bottom sheet)
```
[Brand logo 60px]
[Amazon Gift Card]
[Select amount:]
  [€10 · 5,000pts] [€25 · 12,000pts] [€50 · 24,000pts]
[Confirm Purchase]
[⚠️ Gift codes are non-refundable]
```

---

## S96 — Earn Guide
**File:** `app/(trip)/points/earn.tsx`

### Layout
```
[ScrollView]
  [Earn rate table per tier]
  [Active promotions]
  [Earn opportunities list]
```

### Earn Rate Table
```
Action          Free  Pass  Plus   FC
Book a trip     1×    2×    2.5×   3×
Refer a friend  500   500   500    500
Complete DNA    200   200   200    200
Daily check-in  10    10    10     10
Write review    50    50    50     50
```

### Active Promotions
```
[🔥 2× points on all bookings this weekend!]
[Ends in: 1d 4h 22m]  ← countdown
```

### Earn Opportunities
```
[○] Complete Travel DNA     +200 pts  [Go →]
[○] Add first trip photo    +50 pts   [Go →]
[○] Refer a friend          +500 pts  [Go →]
[✓] First booking made      +100 pts  ← done
```

---

## S97 — Points Transactions
**File:** `app/(trip)/points/transactions.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Points History"]
  [Filter: All / Earned / Redeemed / Expired]
  [FlatList with date groups]
```

### Row
```
[Icon]  [Action description]          [+500 pts]
        [15 Apr · From booking]        [-40,000 pts]
```
| Type | Color |
|------|-------|
| Earned | green +XXX |
| Redeemed | red -XXX |
| Expired | gray strikethrough |
| Pending | yellow (awaiting) |

### Expiry Warning
```
[⚠️ 2,500 pts expire in 30 days]
[Use them before 15 May]
```
Yellow banner at top if points expiring <60 days

---

## S98 — Plan Perks
**File:** `app/(trip)/points/perks.tsx`

### Layout
```
[ScrollView]
  [Current tier highlight]
  [Perks grid — current tier]
  [Locked perks — next tier, blurred]
  [Upgrade CTA]
```

### Perk Card
```
[Icon 40px]  [Perk name]
             [Description 1 line]
             [✓ Active / 🔒 Upgrade to unlock]
```

### Locked Perks
Blurred overlay + lock icon + "Upgrade to Plus to unlock"

---

# ═══════════════════════════════════
# SOCIAL (המשך)
# ═══════════════════════════════════

---

## S79 — Discover Travelers
**File:** `app/(social)/discover/index.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Discover" + filter icon]
  [Filter chips — horizontal scroll]
  [FlatList: traveler cards]
  ["Swipe Mode" FAB — bottom center]
```

### Filter Chips
🌍 Country / 🗣️ Language / 💰 Budget / 🧳 Style / 📅 Available

### Traveler Card
```
[Avatar 56px]  [Name · Age · Country flag]    [✦ 87% Match]
               [Bio: "Love hiking and street food"]
               [Past trips: 🌍 12 countries]
               [Languages: EN, FR, HE]
               [Connect →]
```
Height: auto, padding 16px, bg rgba(255,255,255,0.05)

### "Swipe Mode" FAB
```
[💫 Swipe Mode]  ← bottom center, pill button, bg pink
```

### Empty State
```
[Illustration: two travelers]
"No travelers found with these filters"
[Adjust Filters]
```

---

## S80 — Compatibility Score
**File:** `app/(social)/compatibility/[userId].tsx`

### Layout
```
[SafeAreaView]
  [Header: back + user name]
  [Score ring — large]
  [Score label]
  [Shared dimensions breakdown]
  [What you share section]
  [Action buttons]
```

### Score Ring (SVG animated)
```
[Ring 160px, strokeWidth 12]
  [Score: 87%]
  [Great Match!]
```
Ring animates 0 → score on mount, 1200ms ease-out
Color: green (≥80%) / yellow (60-79%) / gray (<60%)
Score ≥85: confetti blast on mount

### Shared Dimensions
```
[Adventure]     You: 78%  Dana: 82%  ██████████ Close match
[Food]          You: 90%  Dana: 85%  ████████░░ Strong match
[Budget]        You: 60%  Dana: 30%  ████░░░░░░ Some difference
```

### What You Share
```
Visited both: 🇬🇧 🇫🇷 🇮🇹
Both love: Hiking, Street Food, Museums
Both planning: Japan 2026
```

### Action Buttons
```
[💬 Message]  [👥 Connect]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Connect" | tap | `/_modals/connect-flow` |
| "Message" | tap | `/(social)/messages/[convId]` |
| ≥85% mount | auto | confetti burst |

---

## S81 — Traveler Swipe
**File:** `app/(social)/discover/swipe.tsx`

### Layout
Identical structure to S8 DNA Swipe
Cards: traveler profile instead of destinations

### Traveler Card
```
[Avatar 120px center-top]
[Name · Age · Country flag]
[Bio: "Foodie traveler..."]
[✦ 87% Match]
[Past: 🇺🇸 🇬🇧 🇯🇵 🇮🇱 (flags row)]
[Languages: 🇬🇧 🇫🇷]
```

### Swipe Indicators
| Right | Left |
|-------|------|
| 💚 "CONNECT" | ✕ "SKIP" |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Swipe right | — | POST /social/connect + haptic notificationSuccess |
| Swipe left | — | skip |
| Card avatar | tap | `/(social)/profile/[userId]` |
| ♥ button | tap | POST /social/connect |
| ✕ button | tap | skip |
| Back `‹` | tap | `/(social)/discover` |

---

## S82 — Traveler Profile
**File:** `app/(social)/profile/[userId].tsx`

### Layout
```
[ScrollView]
  [Hero: bg gradient + avatar 80px]
  [Name + location + compatibility]
  [Action buttons]
  [Bio section]
  [DNA dimensions — public only]
  [Past trips gallery]
  [Upcoming trips — if shared]
```

### Hero Section
```
[Background: gradient or trip photo]
[Avatar 80px, border 3px white, bottom-center]
[Name: Dana Cohen · 28 · 🇮🇱]
[✦ 87% Match with you]
```

### Action Buttons Row
```
[👥 Connect]  [💬 Message]  [•••]
```
"•••" → ActionSheet: Report / Block / Share Profile

### DNA Dimensions (public)
Same bars as S16 but read-only
"Dana shares 6 of 8 dimensions publicly"

### Past Trips Mini Gallery
3-col grid of trip photos
Tap photo → destination detail

### Connected State (if already connected)
"Connect" button changes to "Connected ✓"
"Message" button always available

---

## S83 — Connect Flow Modal
**File:** `app/_modals/connect-flow.tsx`

### Layout
```
[Bottom sheet 380px]
[Handle]
[Traveler info: avatar + name + score]
[Optional message input]
[Send Request CTA]
[Cancel link]
```

### Traveler Mini Card
```
[Avatar 48px] [Dana Cohen · ✦ 87%]
```

### Message Input
```
[Hi Dana! I noticed we both love hiking...]  ← optional
[160 chars max]
```
Placeholder: "Send a message with your request (optional)"

### States
| State | Visual |
|-------|--------|
| Default | input empty, CTA active |
| Sending | spinner, inputs disabled |
| Success | sheet closes + toast "Request sent to Dana!" |
| Already connected | "You're already connected" |

---

## S84 — Messages List
**File:** `app/(social)/messages/index.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Messages" + compose icon]
  [Search bar]
  [Conversation FlatList]
  [Empty state]
```

### Search Bar
Same as S13, filters conversations in-place

### Conversation Row
```
[Avatar 52px]  [Name Bold]               [2h]
[Unread badge] [Last message preview...] [● unread]
```
| State | Visual |
|-------|--------|
| Unread | bg rgba(100,67,244,0.05), name bold, blue dot |
| Read | standard bg |
| Online | green dot on avatar |
| Typing | "..." animation |

### Swipe Left
```
[📌 Pin]  [🔇 Mute]  [🗑️ Delete]
```

### Empty State
```
[Speech bubbles illustration]
"No messages yet"
"Connect with travelers to start chatting"
[Discover Travelers →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Conversation | tap | `/(social)/messages/[convId]` |
| Swipe left | swipe | Pin / Mute / Delete options |
| Compose icon | tap | new message search |
| Search | type | filter conversations |
| "Discover" link | tap | `/(social)/discover` |

---

## S86 — Travel Buddies
**File:** `app/(social)/buddies.tsx`

### Layout
```
[SafeAreaView]
  [Header: "Travel Buddies" + X connected]
  [Status filter: All / Traveling / Home]
  [Buddies FlatList]
  [Shared Trips section]
```

### Buddy Row
```
[Avatar 52px]  [Name]              [🟢 Traveling in Tokyo]
[Online ring]  [Common: 3 trips]   [● or ○ online status]
               [Message →]
```
Status: green ring = active traveler, gray = home

### Traveling Now Section
```
[🌍 3 buddies are traveling now]
  [Dana — Tokyo 🇯🇵]
  [Yael — Paris 🇫🇷]
  [Tom  — NYC   🇺🇸]
```

### Shared Trips Section
Past trips with buddies:
```
[Trip thumbnail] [Dubai 2025 · with Dana +2]
                 [Apr 15–22 · 5 nights]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Buddy row | tap | `/(social)/profile/[userId]` |
| "Message" | tap | `/(social)/messages/[convId]` |
| Shared trip | tap | `/(trip)/post/[tripId]/summary` |
| "Find Buddies" | tap | `/(social)/discover` |
| Filter tab | tap | filter |

---

## S75 — First Booking Modal
**File:** `app/_modals/first-booking.tsx`

### Layout
```
[Full screen overlay rgba(0,0,0,0.85)]
[Center card: radius-24, bg #1A0B32, border purple]
  [Confetti behind card]
  [Mascot animation center — celebrating]
  [🎉 "First Booking!"]
  [Achievement badge: "Explorer Unlocked"]
  [Achievement description]
  ["Awesome!" dismiss button]
```

### Achievement Badge
```
[🏅 achievement icon 60px]
[Explorer]
[unlocked]
```
Scale: 0→1.2→1 spring 600ms

### Auto-dismiss
5 seconds → auto-dismiss → back to S31

### PATCH call
`PATCH /users/me { has_completed_first_booking: true }`

---

## S60 — No Internet Overlay
**File:** `components/NoInternetOverlay.tsx` (component, not a route)

### Layout
```
[Full screen overlay rgba(0,0,0,0.95)]
[Center]
  [📶 icon with animated signal bars]
  ["No Internet Connection" 20px Bold]
  ["Check your connection and try again" text-secondary]
  [Retry button]
  ["Cached content available" — conditional]
```

### Animated Signal Icon
4 signal bars, animate filling left→right loop when reconnecting

### Cached Content Notice
```
[📦 Some content available offline]
```
Shows if WatermelonDB has cached data

### Show/Hide Timing
- Detect loss: immediate
- Show overlay: 2000ms delay (debounce — prevents flash)
- Detect restore: immediate
- Hide overlay: 500ms delay
- "Back online" toast: 3s, green


# ═══════════════════════════════════
# FILE TREE & NAVIGATION MAP
# ═══════════════════════════════════

---

## Complete File Tree

```
app/
├── index.tsx                          ← S1  Splash
├── _layout.tsx                        ← Root: SafeArea + Auth guard
│
├── (auth)/
│   ├── _layout.tsx                    ← Stack, headerShown:false
│   ├── welcome.tsx                    ← S2  Welcome
│   ├── signup.tsx                     ← S3  Sign Up / Login
│   ├── verify-email.tsx               ← S4  Verify Email
│   ├── profile-setup.tsx              ← S5  Profile Setup
│   ├── welcome-travi.tsx              ← S6  Welcome to TRAVI
│   └── quick-dna/
│       ├── index.tsx                  ← S7  DNA Categories
│       ├── swipe.tsx                  ← S8  DNA Swipe
│       ├── schedule.tsx               ← S9  DNA Schedule
│       └── summary.tsx                ← S10 DNA Summary
│
├── (tabs)/
│   ├── _layout.tsx                    ← BottomTabs / redirect drawer
│   ├── home/
│   │   ├── index.tsx                  ← S11 Home
│   │   ├── destination/
│   │   │   └── [id].tsx               ← S14 Destination Detail
│   │   ├── search.tsx                 ← S13 Search
│   │   └── search-results.tsx         ← S59 Search Results
│   ├── trips/
│   │   └── index.tsx                  ← S57 My Trips
│   ├── wallet/
│   │   └── index.tsx                  ← S48 Wallet
│   ├── explore/
│   │   ├── index.tsx                  ← S12 Explore
│   │   └── destination/
│   │       └── [id].tsx               ← S14 (shared component)
│   ├── points/
│   │   └── index.tsx                  ← S91 Points Dashboard
│   └── social/
│       └── index.tsx                  ← S78 Community Feed
│
├── (drawer)/
│   └── _layout.tsx                    ← Drawer for tablet+
│
├── (trip)/
│   ├── _layout.tsx                    ← Stack, hides tab bar
│   ├── plan/
│   │   ├── index.tsx                  ← S19 Plan Trip Entry
│   │   ├── destination.tsx            ← S20 Destination Select
│   │   ├── dates.tsx                  ← S21 Dates & Travelers
│   │   ├── flights.tsx                ← S22 Flight Select
│   │   ├── hotels.tsx                 ← S23 Hotel Select
│   │   ├── hotel/
│   │   │   └── [id].tsx               ← S24 Hotel Detail
│   │   ├── activities.tsx             ← S25 Activity Swipe
│   │   ├── itinerary.tsx              ← S26 Itinerary Builder
│   │   ├── cart.tsx                   ← S27 Cart
│   │   ├── checkout.tsx               ← S28 Checkout
│   │   ├── payment.tsx                ← S30 Payment Processing
│   │   ├── confirmation.tsx           ← S31 Booking Confirmation
│   │   └── payment-failed.tsx         ← S62 Payment Failed
│   ├── pre/
│   │   └── [tripId]/
│   │       ├── index.tsx              ← S32 Pre-Trip Dashboard
│   │       ├── checklist.tsx          ← S33 Checklist
│   │       └── documents.tsx          ← S34 Documents
│   ├── post/
│   │   └── [tripId]/
│   │       ├── celebration.tsx        ← S44 Post-Trip Celebration
│   │       ├── summary.tsx            ← S45 Trip Summary
│   │       ├── review.tsx             ← S46 Rate & Review
│   │       └── gallery.tsx            ← S47 Photo Gallery
│   ├── wallet/
│   │   ├── add-funds.tsx              ← S49 Add Funds
│   │   ├── transactions.tsx           ← S50 Transactions
│   │   ├── split.tsx                  ← S51 Split Pay
│   │   └── kyc.tsx                    ← S52 KYC
│   ├── points/
│   │   ├── redeem/
│   │   │   ├── index.tsx              ← S92 Redeem Hub
│   │   │   ├── airline-miles.tsx      ← S93 Airline Miles
│   │   │   ├── partner/
│   │   │   │   └── [id].tsx           ← S94 Partner Detail
│   │   │   ├── gift-cards.tsx         ← S95 Gift Cards
│   │   │   └── confirm.tsx            ← S100 Redeem Confirm
│   │   ├── earn.tsx                   ← S96 Earn Guide
│   │   ├── transactions.tsx           ← S97 Points Transactions
│   │   ├── perks.tsx                  ← S98 Perks
│   │   └── referrals.tsx              ← S99 Referrals
│   ├── profile/
│   │   ├── index.tsx                  ← S15 Profile
│   │   ├── edit.tsx                   ← S54 Profile Edit
│   │   └── dna.tsx                    ← S16 DNA Management
│   ├── settings/
│   │   ├── index.tsx                  ← S55 Settings
│   │   └── support.tsx                ← S66 Help & Support
│   ├── account/
│   │   ├── change-email.tsx           ← S76a Change Email
│   │   ├── change-password.tsx        ← S76b Change Password
│   │   └── delete.tsx                 ← S77 Delete Account
│   ├── wishlist.tsx                   ← S17 Wishlist
│   ├── notifications.tsx              ← S18 Notifications
│   └── membership.tsx                 ← S53 Membership
│
├── (live)/
│   ├── _layout.tsx                    ← Stack, hides tab bar, shows FAB
│   └── [tripId]/
│       ├── index.tsx                  ← S35 Live Dashboard
│       ├── timeline.tsx               ← S36 Live Timeline
│       ├── map.tsx                    ← S37 Live Map
│       ├── activity/
│       │   └── [actId].tsx            ← S38 Activity Detail
│       ├── expenses.tsx               ← S39 Expenses
│       ├── memories.tsx               ← S40 Memories
│       ├── emergency.tsx              ← S42 Emergency Contacts
│       ├── settings.tsx               ← S43 Trip Settings
│       └── tax/
│           ├── index.tsx              ← T1 Tax Dashboard
│           ├── add.tsx                ← T2 Camera Capture
│           ├── review.tsx             ← T3 Review & Confirm
│           ├── rules.tsx              ← T4 Country Rules
│           ├── vat.tsx                ← T5 VAT Refund Guide
│           ├── checklist.tsx          ← T6 Pre-Flight Checklist
│           └── form.tsx               ← T7 Customs Form
│
├── (social)/
│   ├── _layout.tsx                    ← Stack
│   ├── discover/
│   │   ├── index.tsx                  ← S79 Discover Travelers
│   │   └── swipe.tsx                  ← S81 Traveler Swipe
│   ├── profile/
│   │   └── [userId].tsx               ← S82 Traveler Profile
│   ├── compatibility/
│   │   └── [userId].tsx               ← S80 Compatibility Score
│   ├── messages/
│   │   ├── index.tsx                  ← S84 Messages List
│   │   └── [convId].tsx               ← S85 Chat
│   └── buddies.tsx                    ← S86 Travel Buddies
│
└── _modals/
    ├── _layout.tsx                    ← Stack, presentation:modal
    ├── ai-chat.tsx                    ← S41 AI Chat
    ├── payment-method.tsx             ← S29 Payment Method
    ├── connect-flow.tsx               ← S83 Connect Flow
    ├── quick-rating.tsx               ← Quick Rating
    ├── purchase-detail.tsx            ← Purchase Detail (from T1)
    ├── dna-celebration.tsx            ← S74 DNA Celebration
    ├── first-booking.tsx              ← S75 First Booking
    ├── country-picker.tsx             ← Country Picker
    ├── category-picker.tsx            ← Category Picker (T3)
    └── session-expired.tsx            ← S63 Session Expired

hooks/
├── useResponsive.ts                   ← breakpoints hook
├── useTabBarVisibility.ts             ← show/hide tab bar
└── useDeepLink.ts                     ← deep link handler

components/
├── NoInternetOverlay.tsx              ← S60 No Internet
├── FABChat.tsx                        ← Global AI Chat FAB
├── SwipeStack.tsx                     ← Reused: S8, S25, S81
└── DestinationCard.tsx                ← Reused: S11, S12, S14, S59
```

---

## Navigation Flow Diagram

```
                    ┌─────────────────────────────────────────────────────┐
                    │                    SPLASH (S1)                       │
                    └──────────────┬──────────────┬───────────────────────┘
                                   │              │
                    ┌──────────────▼──┐      ┌────▼────────────────────┐
                    │  AUTH FLOW      │      │  MAIN APP               │
                    │  (auth)/        │      │  (tabs)/                │
                    └──────────────┬──┘      └────┬────────────────────┘
                                   │              │
          ┌────────────────────────┤              ├────────────────────────┐
          ▼                        ▼              ▼                        ▼
      S2 Welcome              S10 Summary    ┌────────────────┐      S78 Social
          │                        │         │  6 TABS        │         (social)/
          ▼                        │         ├────────────────┤
      S3 Sign Up                   │         │ Home    S11    │
          │                        │         │ Trips   S57    │
          ▼                        │         │ Wallet  S48    │
      S4 Verify                    │         │ Explore S12    │
          │                        │         │ Points  S91    │
          ▼                        │         │ Social  S78    │
      S5 Profile                   └────────►│                │
          │                                  └────────┬───────┘
          ▼                                           │
      S6 Welcome                           ┌──────────▼──────────────────┐
          │                                │    TRIP GROUP (trip)/       │
          ▼                                │                             │
      S7-S10 DNA Quiz               ┌──────┤ PLANNING    UNIVERSAL       │
                                    │      │ S19→S31     S15,S53,S55     │
                                    │      │             S17,S18,S54     │
                                    │      │             S57,S91-S100    │
                                    │      └─────────────────────────────┘
                                    │
                                    │      ┌──────────────────────────────┐
                                    │      │    LIVE GROUP (live)/        │
                                    ├─────►│                              │
                                    │      │ S35→S43 + T1→T7              │
                                    │      └──────────────────────────────┘
                                    │
                                    │      ┌──────────────────────────────┐
                                    └─────►│  POST-TRIP (trip)/post/      │
                                           │  S44→S47                      │
                                           └──────────────────────────────┘
```

---

## Screen → File → Screen Number Index

| Screen # | Name | File |
|----------|------|------|
| S1 | Splash | `app/index.tsx` |
| S2 | Welcome | `app/(auth)/welcome.tsx` |
| S3 | Sign Up / Login | `app/(auth)/signup.tsx` |
| S4 | Verify Email | `app/(auth)/verify-email.tsx` |
| S5 | Profile Setup | `app/(auth)/profile-setup.tsx` |
| S6 | Welcome TRAVI | `app/(auth)/welcome-travi.tsx` |
| S7 | DNA Categories | `app/(auth)/quick-dna/index.tsx` |
| S8 | DNA Swipe | `app/(auth)/quick-dna/swipe.tsx` |
| S9 | DNA Schedule | `app/(auth)/quick-dna/schedule.tsx` |
| S10 | DNA Summary | `app/(auth)/quick-dna/summary.tsx` |
| S11 | Home | `app/(tabs)/home/index.tsx` |
| S12 | Explore | `app/(tabs)/explore/index.tsx` |
| S13 | Search | `app/(tabs)/home/search.tsx` |
| S14 | Destination Detail | `app/(tabs)/home/destination/[id].tsx` |
| S15 | Profile | `app/(trip)/profile/index.tsx` |
| S16 | DNA Management | `app/(trip)/profile/dna.tsx` |
| S17 | Wishlist | `app/(trip)/wishlist.tsx` |
| S18 | Notifications | `app/(trip)/notifications.tsx` |
| S19 | Plan Trip Entry | `app/(trip)/plan/index.tsx` |
| S20 | Destination Select | `app/(trip)/plan/destination.tsx` |
| S21 | Dates & Travelers | `app/(trip)/plan/dates.tsx` |
| S22 | Flight Select | `app/(trip)/plan/flights.tsx` |
| S23 | Hotel Select | `app/(trip)/plan/hotels.tsx` |
| S24 | Hotel Detail | `app/(trip)/plan/hotel/[id].tsx` |
| S25 | Activity Swipe | `app/(trip)/plan/activities.tsx` |
| S26 | Itinerary Builder | `app/(trip)/plan/itinerary.tsx` |
| S27 | Cart | `app/(trip)/plan/cart.tsx` |
| S28 | Checkout | `app/(trip)/plan/checkout.tsx` |
| S29 | Payment Method Modal | `app/_modals/payment-method.tsx` |
| S30 | Payment Processing | `app/(trip)/plan/payment.tsx` |
| S31 | Booking Confirmation | `app/(trip)/plan/confirmation.tsx` |
| S32 | Pre-Trip Dashboard | `app/(trip)/pre/[tripId]/index.tsx` |
| S33 | Checklist | `app/(trip)/pre/[tripId]/checklist.tsx` |
| S34 | Documents | `app/(trip)/pre/[tripId]/documents.tsx` |
| S35 | Live Dashboard | `app/(live)/[tripId]/index.tsx` |
| S36 | Live Timeline | `app/(live)/[tripId]/timeline.tsx` |
| S37 | Live Map | `app/(live)/[tripId]/map.tsx` |
| S38 | Activity Detail Live | `app/(live)/[tripId]/activity/[actId].tsx` |
| S39 | Expenses | `app/(live)/[tripId]/expenses.tsx` |
| S40 | Memories | `app/(live)/[tripId]/memories.tsx` |
| S41 | AI Chat | `app/_modals/ai-chat.tsx` |
| S42 | Emergency Contacts | `app/(live)/[tripId]/emergency.tsx` |
| S43 | Trip Settings Live | `app/(live)/[tripId]/settings.tsx` |
| S44 | Post-Trip Celebration | `app/(trip)/post/[tripId]/celebration.tsx` |
| S45 | Trip Summary | `app/(trip)/post/[tripId]/summary.tsx` |
| S46 | Rate & Review | `app/(trip)/post/[tripId]/review.tsx` |
| S47 | Photo Gallery | `app/(trip)/post/[tripId]/gallery.tsx` |
| S48 | Wallet | `app/(tabs)/wallet/index.tsx` |
| S49 | Add Funds | `app/(trip)/wallet/add-funds.tsx` |
| S50 | Transactions | `app/(trip)/wallet/transactions.tsx` |
| S51 | Split Pay | `app/(trip)/wallet/split.tsx` |
| S52 | KYC | `app/(trip)/wallet/kyc.tsx` |
| S53 | Membership | `app/(trip)/membership.tsx` |
| S54 | Profile Edit | `app/(trip)/profile/edit.tsx` |
| S55 | Settings | `app/(trip)/settings/index.tsx` |
| S57 | My Trips | `app/(tabs)/trips/index.tsx` |
| S59 | Search Results | `app/(tabs)/home/search-results.tsx` |
| S62 | Payment Failed | `app/(trip)/plan/payment-failed.tsx` |
| S63 | Session Expired | `app/_modals/session-expired.tsx` |
| S66 | Help & Support | `app/(trip)/settings/support.tsx` |
| S74 | DNA Celebration | `app/_modals/dna-celebration.tsx` |
| S75 | First Booking | `app/_modals/first-booking.tsx` |
| S76a | Change Email | `app/(trip)/account/change-email.tsx` |
| S76b | Change Password | `app/(trip)/account/change-password.tsx` |
| S77 | Delete Account | `app/(trip)/account/delete.tsx` |
| S78 | Community Feed | `app/(tabs)/social/index.tsx` |
| S79 | Discover Travelers | `app/(social)/discover/index.tsx` |
| S80 | Compatibility Score | `app/(social)/compatibility/[userId].tsx` |
| S81 | Traveler Swipe | `app/(social)/discover/swipe.tsx` |
| S82 | Traveler Profile | `app/(social)/profile/[userId].tsx` |
| S83 | Connect Flow | `app/_modals/connect-flow.tsx` |
| S84 | Messages List | `app/(social)/messages/index.tsx` |
| S85 | Chat | `app/(social)/messages/[convId].tsx` |
| S86 | Travel Buddies | `app/(social)/buddies.tsx` |
| S91 | Points Dashboard | `app/(tabs)/points/index.tsx` |
| S92 | Redeem Hub | `app/(trip)/points/redeem/index.tsx` |
| S93 | Airline Miles | `app/(trip)/points/redeem/airline-miles.tsx` |
| S94 | Partner Detail | `app/(trip)/points/redeem/partner/[id].tsx` |
| S95 | Gift Cards | `app/(trip)/points/redeem/gift-cards.tsx` |
| S96 | Earn Guide | `app/(trip)/points/earn.tsx` |
| S97 | Points Transactions | `app/(trip)/points/transactions.tsx` |
| S98 | Perks | `app/(trip)/points/perks.tsx` |
| S99 | Referrals | `app/(trip)/points/referrals.tsx` |
| S100 | Redeem Confirm | `app/(trip)/points/redeem/confirm.tsx` |
| T1 | Tax Dashboard | `app/(live)/[tripId]/tax/index.tsx` |
| T2 | Camera Capture | `app/(live)/[tripId]/tax/add.tsx` |
| T3 | Review & Confirm | `app/(live)/[tripId]/tax/review.tsx` |
| T4 | Country Rules | `app/(live)/[tripId]/tax/rules.tsx` |
| T5 | VAT Refund Guide | `app/(live)/[tripId]/tax/vat.tsx` |
| T6 | Pre-Flight Checklist | `app/(live)/[tripId]/tax/checklist.tsx` |
| T7 | Customs Form | `app/(live)/[tripId]/tax/form.tsx` |
| — | No Internet | `components/NoInternetOverlay.tsx` |
| — | Quick Rating | `app/_modals/quick-rating.tsx` |
| — | Purchase Detail | `app/_modals/purchase-detail.tsx` |
| — | Country Picker | `app/_modals/country-picker.tsx` |
| — | Category Picker | `app/_modals/category-picker.tsx` |

**TOTAL: 92 screens + 5 utility modals = 97 files**