# TRAVI — Mock to Code Guide
# איך הופכים כל מסך לקוד באמצעות הריפואים
# Version 1.0 · April 2026

---

## כלל הזהב
```
לכל מסך: קח את ה-UX spec → מצא את הריפו → העתק logic → עטוף ב-TRAVI design
אל תכתוב קוד מאפס אם ריפו כבר עשה את זה
```

---

# PART 1 — Foundation (לפני הכל)

## Step 1.1 — T3 Turbo Setup
```bash
npx create-t3-turbo@latest DNAFLOW_APP
cd DNAFLOW_APP
```
מה זה נותן: Expo + tRPC + TypeScript + Turborepo — הכל מחובר מהקופסה.
**Repo:** `t3-oss/create-t3-turbo`

## Step 1.2 — NativeWind v4
```bash
npm install nativewind@latest
npm install --save-dev tailwindcss@3
```
כל styling: `className` בלבד. אין `StyleSheet`.

## Step 1.3 — useResponsive Hook
העתק מה-spec:
```typescript
// hooks/useResponsive.ts
import { useBreakpointValue } from 'nativewind';
const deviceType = useBreakpointValue({
  base: 'phone', sm: 'phone-landscape', md: 'tablet', lg: 'desktop'
});
```

## Step 1.4 — Navigation Shell
```bash
# Create all route files as empty shells first
# Every screen = <View><Text>ScreenName</Text></View>
# Test navigation works end-to-end BEFORE adding UI
```

---

# PART 2 — Auth Flow (S1–S10)

## S1 Splash — Animation
**What to copy:** spring physics pattern
```bash
npm install react-native-reanimated
```
From `sdras/page-transitions-travelapp`: page transition patterns
From `JideGuru/FlutterTravel`: entrance animation concepts → adapt to RN

**Code pattern:**
```typescript
// Copy spring bounce from reanimated docs
const mascotY = useSharedValue(80);
useEffect(() => {
  mascotY.value = withSpring(0, { damping: 12, stiffness: 80 });
}, []);
```

## S3 Sign Up — Form Validation
**What to use:** react-hook-form (already in T3 stack)
```bash
npm install react-hook-form zod @hookform/resolvers
```
No repo to copy — standard pattern.

## S7–S9 DNA Quiz — Form Logic
**What to use:** Zustand + local state
Signal queue: build custom — no open source equivalent at this quality level.

## S8 DNA Swipe — The Card Stack
**Repo:** `antoine-cottineau/react-native-swipeable-card-stack`
```bash
npm install react-native-swipeable-card-stack
```
**What to copy from repo:**
```typescript
// From repo README:
import { SwipeableCardStack } from 'react-native-swipeable-card-stack';

<SwipeableCardStack
  cards={dnaCards}
  renderCard={(card) => <DNACard card={card} />}
  onSwipeRight={(card) => logSignal('swipe_like', card)}
  onSwipeLeft={(card) => logSignal('swipe_reject', card)}
/>
```
**Wrap in TRAVI design:** dark card, full-bleed image, DNA match badge.

---

# PART 3 — Discovery (S11–S14)

## S11 Home — Recommendations
**No external repo needed** — tRPC query + FlatList
```typescript
const { data } = trpc.recommendations.getForUser.useQuery({ limit: 5 });
```

## S13 Search — Autocomplete
**Pattern from:** `satendra03/Journey-Jolt` — study their search UX
```bash
# Debounce pattern:
npm install use-debounce
const debouncedSearch = useDebounce(query, 300);
```

## S14 Destination Detail — Parallax
```typescript
// Parallax hero pattern (standard RN Animated)
const scrollY = useSharedValue(0);
// translateY = scrollY × 0.4
```
No external repo — pure Reanimated.

---

# PART 4 — Planning Funnel (S19–S31)

## S21 Dates — Calendar
**Repo:** `wix/react-native-calendars`
```bash
npm install react-native-calendars
```
**What to copy from repo:**
```typescript
import { CalendarList } from 'react-native-calendars';
<CalendarList
  markingType="period"
  markedDates={markedDates}
  onDayPress={handleDayPress}
  theme={{ calendarBackground: '#0A0514', ... }}
/>
```

## S22 Flights — Data Source
**Production (Phase 2):**
```bash
npm install amadeus
# amadeus4dev/amadeus-node — official SDK
```
```typescript
const amadeus = new Amadeus({ clientId, clientSecret });
const response = await amadeus.shopping.flightOffersSearch.get({
  originLocationCode: 'DXB',
  destinationLocationCode: 'LHR',
  departureDate: '2026-04-15',
  adults: 2,
});
```

**MVP (Phase 1):** mock data from `dimitryzub/hotels-scraper-js` patterns.

**AI Search Enhancement:**
```bash
# LetsFG/LetsFG — study their multi-airline search pattern
# Adapt their API call structure to TRAVI backend
```

## S22 Flexible Dates — Heatmap
**What to build:** custom calendar grid with color coding
**Data from:** `n-patel/flights` — study how they find cheapest dates
```python
# Python backend (from n-patel/flights adapted):
# GET /flights/price-calendar?origin=DXB&destination=LHR&month=2026-04
# Returns: { "2026-04-01": 340, "2026-04-02": 289, ... }
```

## S23 Hotels — Data Source
**Production (Phase 2):** Amadeus Hotel Search
```typescript
const hotels = await amadeus.shopping.hotelOffersSearch.get({
  cityCode: 'DXB',
  checkInDate: '2026-04-15',
  checkOutDate: '2026-04-22',
});
```

**Airbnb/Booking data:** use scrapers as fallback
```bash
# Backend scraper (Python):
# digital-engineering/airbnb-scraper → wrap in FastAPI endpoint
# ZoranPandovski/BookingScraper → wrap in FastAPI endpoint
# Serve via GET /accommodations?city=Dubai&check_in=...
```

## S24 Hotel Detail — Image Gallery
Standard FlatList horizontal. No external repo.

## S25 Activity Swipe
Reuse SwipeStack component from S8. Same component, different data.

## S26 Itinerary Builder — Drag & Drop
**Repo:** `computerjazz/react-native-draggable-flatlist`
```bash
npm install react-native-draggable-flatlist
```
```typescript
import DraggableFlatList from 'react-native-draggable-flatlist';
<DraggableFlatList
  data={activities}
  onDragEnd={({ data }) => updateOrder(data)}
  keyExtractor={(item) => item.id}
  renderItem={({ item, drag, isActive }) => (
    <ActivityRow item={item} drag={drag} isActive={isActive} />
  )}
/>
```

**Travel times between activities:**
```bash
# opentripplanner/OpenTripPlanner — deploy as microservice
# GET /plan?from=25.2048,55.2708&to=25.1972,55.2796&mode=CAR
```

## S26 Collaborative — TREK
```bash
# Study TREK's real-time collab implementation:
# github.com/mauriceboe/TREK
# Their WebSocket pattern for multi-user editing
# Adapt to TRAVI's existing Railway WebSocket setup
```

## S27 Cart — Price Calculations
Pure tRPC. No external repo.

## S28–S30 Checkout — Stripe
```bash
npm install @stripe/stripe-react-native
```
```typescript
import { useStripe } from '@stripe/stripe-react-native';
const { confirmPayment } = useStripe();
// PaymentSheet — ONLY this. Never custom card UI.
```

---

# PART 5 — Pre-Trip (S32–S34)

## S32 Progress Ring — SVG
```typescript
// Pure SVG, no repo needed:
const circumference = 2 * Math.PI * 54;
const strokeDashoffset = circumference * (1 - completionPercent);
<Svg><Circle strokeDashoffset={strokeDashoffset} /></Svg>
```

## S34 Documents — Image Upload
```bash
npm install expo-image-picker expo-image-manipulator
```
Compress before upload:
```typescript
const result = await ImageManipulator.manipulateAsync(
  uri, [{ resize: { width: 1200 } }],
  { compress: 0.8, format: 'jpeg' }
);
```

---

# PART 6 — Live Mode (S35–S43)

## S35 Live Dashboard — Real-time
WebSocket: standard. No external repo.

## S37 Live Map
```bash
npm install react-native-maps react-native-maps-directions react-native-map-link
```
**From `react-native-maps` docs:**
```typescript
<MapView customMapStyle={darkMapStyle} showsUserLocation>
  {activities.map((act, i) => (
    <Marker key={act.id} coordinate={act.coords}>
      <NumberPin number={i+1} />
    </Marker>
  ))}
  <MapViewDirections
    origin={start} destination={end}
    waypoints={waypoints}
    strokeColor="#6443F4" strokeWidth={4}
  />
</MapView>
```

**Dark map style JSON:**
```bash
# Get from: snazzymaps.com — search "dark" → export JSON
# Paste in: darkMapStyle constant
```

## S37 Bottom Sheet
```bash
npm install @gorhom/bottom-sheet
```
```typescript
const bottomSheetRef = useRef<BottomSheet>(null);
<BottomSheet ref={bottomSheetRef} snapPoints={[120, '40%', '80%']}>
  <NearbyList />
</BottomSheet>
```

## S38 Geofencing — Auto Check-in
```bash
npm install @rn-bridge/react-native-geofencing react-native-background-geolocation
```
```typescript
// From @rn-bridge docs:
await Geofencing.addGeofence({
  id: activity.id,
  latitude: activity.lat,
  longitude: activity.lng,
  radius: 200, // meters
});
Geofencing.onEntry((event) => {
  if (event.id === activity.id) {
    POST('/activities/' + activity.id + '/checkin');
  }
});
```

## S38 QR Code
```bash
npm install react-native-qrcode-svg
```
```typescript
import QRCode from 'react-native-qrcode-svg';
<QRCode value={bookingRef} size={200} color="white" backgroundColor="transparent" />
```

## S38 Audio Stories
```bash
npm install expo-av
```
```typescript
// From realityexpander/FredsRoadtripStoryteller — study their:
// 1. Location proximity trigger (within 500m)
// 2. Audio file loading pattern
// 3. Background audio handling
const sound = await Audio.Sound.createAsync(require('./story.mp3'));
await sound.playAsync();
```

## S39 Currency Conversion
```bash
npm install cashify
# xxczaki/cashify
```
```typescript
import { convert } from 'cashify';
const result = convert(100, { from: 'EUR', to: 'ILS', rates });
// rates from ECB: alexprengere/currencyconverter pattern
// Backend: GET /rates → cache 1h in Redis
```

## S41 AI Chat
Pure WebSocket + Claude API. No external repo.

---

# PART 7 — Tax & Customs (T1–T7)

## T1 Threshold Calculations
Pure math + tRPC. No external repo.

## T2 Camera + OCR
```bash
npm install react-native-vision-camera expo-image-manipulator
```
```typescript
// react-native-vision-camera frame processor:
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  // Send to backend OCR
}, []);
```
**Backend OCR:** Google Cloud Vision API
```python
from google.cloud import vision
client = vision.ImageAnnotatorClient()
response = client.text_detection(image=image)
```

## T4 Visa Requirements
```bash
# Backend: seed DB from passport-index-dataset
# ilyankou/passport-index-dataset — download CSV
# Parse and load into PostgreSQL:
# visa_requirements(passport_country, destination_country, requirement, max_days)
```
```typescript
// Frontend: GET /visa-requirements?passport=IL&destination=AE
```

---

# PART 8 — Post-Trip (S44–S47)

## S44 Confetti
```bash
npm install react-native-fast-confetti @shopify/react-native-skia
```
```typescript
import { Confetti } from 'react-native-fast-confetti';
<Confetti
  count={150}
  colors={['#6443F4', '#F94498', '#FFFFFF']}
  cannonsPositions={[{ x: 0, y: 0 }, { x: screenWidth, y: 0 }]}
/>
```

## S45 Trip Summary — Stats
```bash
# seanmorley15/AdventureLog — study their stats calculation:
# Total km (sum of all activity distances)
# Countries visited (unique from activities)
# Photos count (from memories)
```

## S45 Countries Map
```bash
# rbardini/countryquest — adapt their SVG world map
# Pure SVG, highlight visited countries
# npm install react-native-svg
```

---

# PART 9 — Points (S91–S100)

## S91 AI Recommendations
```bash
git clone https://github.com/borski/travel-hacking-toolkit
# Set up as MCP server
# Connects to TRAVI via Claude Code MCP protocol
```

## S94 CPP Calculator
```bash
# ayostepht/Cents-Per-Point — study their calculation:
# cpp = (cash_value / points_required) * 100
# Adapt their formula + UI slider pattern
```

## S99 Referrals — Deep Links
```bash
npm install react-native-branch
# BranchMetrics/react-native-branch-deep-linking-attribution
```
```typescript
import branch from 'react-native-branch';
const { url } = await branch.createBranchUniversalObject('referral', {
  customMetadata: { referrerId: user.id, referralCode: user.referralCode }
});
const { url: shareUrl } = await url.generateShortUrl();
```

**Backend rewards engine:**
```bash
git clone https://github.com/amicalhq/refref
# Deploy on Railway alongside existing server
```

---

# PART 10 — New Screens from Repos

## S_FD Flexible Dates Heatmap
```bash
# Backend: adapt AWeirdDev/flights Python scraper
# Or: use Amadeus price analysis endpoint
# GET /flights/price-calendar → return price per date
# Frontend: custom grid component with color interpolation
```

## S_AI AI Itinerary Generator
```bash
# hardikverma22/travel-planner-ai — study their:
# 1. System prompt structure for itinerary generation
# 2. How they pass user preferences to OpenAI
# 3. Response parsing pattern

# Adapt to TRAVI:
# System prompt includes user DNA profile
# Uses Claude API (not OpenAI)
# Fact-verification layer from chernistry/voyant pattern
```

## S_AL Adventure Log
```bash
# seanmorley15/AdventureLog — extract:
# 1. World SVG map component
# 2. Country highlighting logic
# 3. Stats calculation functions

# rbardini/countryquest — extract:
# 1. Scratch map interaction pattern
# 2. Country completion tracking
```

## S_CP Collaborative Planning
```bash
# mauriceboe/TREK — extract:
# 1. Real-time presence system (who's editing what)
# 2. Conflict resolution for simultaneous edits
# 3. Vote/react system on activities

# Adapt to TRAVI's Railway WebSocket:
# ws://api/collab/:tripId
# Events: user_joined, user_left, activity_updated, vote_cast
```

## S_DN Digital Nomad Hub
```bash
# cbovis/awesome-digital-nomads — use as data source
# Parse their curated list → seed TRAVI database
# lukasz-madon/awesome-remote-job — parse job listings
# rignaneseleo/groups-for-nomads — parse community links
```

## S_HC Hotel Comparison
```bash
# dimitryzub/hotels-scraper-js — extract:
# Multi-source hotel data fetching
# Normalize data structure across Airbnb/Booking/Hotels.com

# Build comparison matrix:
# Compare up to 3 hotels side-by-side
# Highlight best value per attribute
```

## S_AS Alternative Stays (Airbnb)
```bash
# digital-engineering/airbnb-scraper (Scrapy) → deploy as Python service
# johnbalvin/pyairbnb → simpler alternative
# dtrungtin/actor-airbnb-scraper → Apify-based (requires account)

# Recommended: johnbalvin/pyairbnb for MVP:
pip install pyairbnb
# Wrap in FastAPI → call from tRPC backend
```

---

# PART 11 — Split Pay

## S51 Split Pay Logic
```bash
# spliit-app/spliit (2,616⭐) — extract:
# 1. Debt simplification algorithm
# 2. Settlement calculation (who owes who)
# 3. Payment tracking per participant

# Stripe transfer_group for actual payments:
const paymentIntent = await stripe.paymentIntents.create({
  amount: userShare,
  currency: 'eur',
  transfer_group: tripId, // all participants share this
});
```

---

# PART 12 — Social (S78–S86)

## Compatibility Score — pgvector
```sql
-- DNA profiles stored as vectors in PostgreSQL
-- npm install pgvector
SELECT user_id, 
  1 - (dna_vector <=> current_user_vector) AS compatibility
FROM users
ORDER BY compatibility DESC
LIMIT 20;
```

No external repo — pure pgvector SQL.

---

# MASTER INSTALL COMMAND

```bash
# Run this after scaffold:
npm install react-native-swipeable-card-stack
npm install react-native-calendars
npm install react-native-maps react-native-maps-directions react-native-map-link
npm install @rn-bridge/react-native-geofencing react-native-background-geolocation
npm install @stripe/stripe-react-native
npm install react-native-draggable-flatlist
npm install react-native-fast-confetti @shopify/react-native-skia
npm install lottie-react-native
npm install react-native-haptic-feedback
npm install @gorhom/bottom-sheet
npm install react-native-image-viewing
npm install react-native-qrcode-svg
npm install react-native-flash-message
npm install react-native-vision-camera
npm install expo-image-picker expo-image-manipulator
npm install expo-location expo-notifications
npm install expo-secure-store expo-local-authentication
npm install @nozbe/watermelondb
npm install @react-native-community/netinfo
npm install react-native-mmkv
npm install react-native-branch react-native-share
npm install @react-native-clipboard/clipboard
npm install @sentry/react-native expo-updates
npm install cashify amadeus
npm install expo-av
npm install react-native-svg

# Backend repos (clone separately):
git clone https://github.com/amicalhq/refref        # Referral backend
git clone https://github.com/borski/travel-hacking-toolkit  # Points AI
# Python services:
pip install pyairbnb scrapy google-cloud-vision
```

---

# WORKFLOW PER SCREEN

```
1. Open TRAVI_PROTOTYPE_SPEC_FULL.md → find screen spec
2. Open this file → find which repos to use
3. Clone/install the repo
4. Copy the logic/component
5. Wrap in TRAVI design tokens (dark bg, purple/pink, NativeWind)
6. Connect to tRPC endpoint
7. Test on device
```

---

# REPO → SCREEN MATRIX (Quick Reference)

| Repo | Screens | What to take |
|------|---------|-------------|
| react-native-swipeable-card-stack | S8, S25, S81 | SwipeStack component |
| react-native-calendars | S21 | CalendarList range picker |
| react-native-draggable-flatlist | S26 | DraggableFlatList |
| TREK | S26, S_CP | Collab real-time pattern |
| amadeus-node | S22, S23 | Flight + Hotel search |
| AWeirdDev/flights | S22, S_FD | Flexible dates data |
| digital-engineering/airbnb-scraper | S23, S_AS | Airbnb data |
| ZoranPandovski/BookingScraper | S23 | Booking.com data |
| react-native-maps + directions | S37, S26 | Dark map + routes |
| @gorhom/bottom-sheet | S37, S41, T3 | Bottom sheets |
| @rn-bridge/geofencing | S35, S38 | Auto check-in |
| react-native-fast-confetti | S44, S74, S100 | Celebration |
| FredsRoadtripStoryteller | S38, S_RT | Audio stories |
| cashify | S39, T1, S_CC | Currency math |
| passport-index-dataset | T4, S_VP | Visa data CSV |
| spliit-app/spliit | S51, S_BM | Split pay logic |
| seanmorley15/AdventureLog | S45, S_AL | Stats + map |
| rbardini/countryquest | S45, S_AL | Scratch map |
| borski/travel-hacking-toolkit | S91-S94 | Points AI |
| Cents-Per-Point | S94 | CPP formula |
| react-native-branch | S99 | Referral deep links |
| amicalhq/refref | S99 backend | Rewards engine |
| travel-planner-ai | S_AI | AI prompt structure |
| awesome-digital-nomads | S_DN | Nomad data |
| OpenTripPlanner | S26, S37 | Transit routing |