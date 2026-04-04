# TRAVI — New Screens from All Repos
# מסכים חדשים שנדרשים מהריפואים החדשים
# Version 1.0 · April 2026
# אין קוד — רק UX/UI + תוכן + ניווט

---

## כלל: ריפו ללא UI → עיצוב → רספונסיביות → פיתוח

---

# ═══════════════════════════════════
# NEW SCREENS — FLIGHTS
# ═══════════════════════════════════

---

## S_FA — Flight Price Alerts
**File:** `app/(trip)/plan/flight-alerts.tsx`
**Source repos:** `broadtoad/Flight_Tracker` · `n-patel/flights` · `yang/flight-scraper`
**Entry:** ← S22 Flight Select · ← S91 Points (deals section)
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
משתמש מגדיר התראת מחיר לנתיב מסוים. כשהמחיר יורד מתחת לסף — push notification. כמו Google Flights "Price tracking" אבל ממוקד ל-DNA match.

### UI Content
- "Flight Price Alerts" headline
- "+ New Alert" button
- Alerts list (active + paused)
- Each alert card:
  - Route: Origin → Destination (with flags)
  - Current price: €XXX
  - Your threshold: €XXX
  - Status: "Watching" / "Price dropped! €XXX" / "Paused"
  - Last checked: "2h ago"
  - DNA match: "✦ 87% Match"
- Empty state: "No alerts yet — set a price you'd pay"

### New Alert Form (bottom sheet)
- Route picker (Origin / Destination)
- Date range: flexible or fixed
- My price limit: €___ input
- Class: Economy / Business
- Alert when: "Below my limit" / "Drops 20%" / "Lowest in 30 days"
- "Set Alert" CTA

### Alert Card States
| State | Visual |
|-------|--------|
| Watching | blue border, "Watching" badge |
| Price dropped | green border, "🔥 Price Dropped!" banner |
| At limit | orange border, "At your limit" badge |
| Paused | gray, toggle to resume |
| Expired | muted, "Trip date passed" |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "View Flights" on alert | tap | S22 with filters pre-applied |
| "+ New Alert" | tap | new alert bottom sheet |
| Alert card X | tap | delete + confirm |
| Alert toggle | tap | pause/resume |
| Price dropped card | tap | S22 filtered to this route |
| Back `‹` | tap | previous |

---

## S_FS — Flight Status Live
**File:** `app/(trip)/pre/[tripId]/flight-status.tsx`
**Source repos:** `Ysurac/FlightAirMap` · `KaiserDMC/Sky-Tracker-App`
**Entry:** ← S32 Pre-Trip Dashboard · ← S35 Live Dashboard (if flight today)
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
מעקב בזמן אמת אחר מצב הטיסה — גייט, עיכוב, מפת מסלול, זמן נחיתה עדכני.

### UI Content
- Flight header: "EK001 · Dubai → London"
- Status banner: "On Time" / "Delayed 45min" / "Boarding" / "Departed" / "Landed"
- Live map: מסלול הטיסה על dark map, מטוס זזז בזמן אמת
- Flight info grid:
  - Gate: B14 (updates live)
  - Terminal: T3
  - Scheduled: 07:30 / Actual: 08:15
  - Duration: 8h 15m remaining
  - Altitude: 38,000 ft
  - Speed: 890 km/h
- Timeline: Scheduled → Boarding → Departed → Landing
- "Add to Calendar" button
- "Share Flight Status" button

### Status Banner Colors
| Status | Color | Icon |
|--------|-------|------|
| On Time | green | ✈️ |
| Delayed | orange | ⏰ |
| Boarding | blue | 🚶 |
| Departed | purple | 🛫 |
| Landed | green | 🛬 |
| Cancelled | red | ✗ |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Share" | tap | native share sheet |
| "Add to Calendar" | tap | Expo Calendar API |
| Map pin | tap | airport info modal |
| Back `‹` | tap | previous |

---

## S_FD — Flexible Dates Dashboard
**File:** `app/(trip)/plan/flexible-dates.tsx`
**Source repos:** `n-patel/flights` · `AWeirdDev/flights` · `baekchun/find-cheapest-flights`
**Entry:** ← S22 "Flexible Dates" tab
**Tab bar:** ✗ | **FAB:** ✗
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
Heatmap של מחירי טיסות לפי תאריך — המשתמש רואה איזה ימים זולים ויכול לבחור תאריך גמיש.

### UI Content
- "Cheapest Days to Fly" headline
- Month navigation: ← April 2026 →
- Calendar heatmap grid (7×5):
  - Each cell: day number + price
  - Color: green (cheapest) → yellow → orange → red (expensive)
  - Best day badge: "Best" chip on cheapest
  - Selected: purple border
- "Cheapest month" bar chart below calendar
- "Nearby airports" toggle (TLV / SDV / ETH)
- Trip length selector: 3-7 nights / 1-2 weeks / 2+ weeks
- "Search These Dates" CTA

### Heatmap Cell
```
[15]
€189
Best ← badge on cheapest
```
Size: (screen-32)/7 per cell, square-ish

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Calendar cell | tap | select dates + "Search" enabled |
| "Search These Dates" | tap | back to S22 with dates pre-filled |
| Month navigation | tap | load next/prev month prices |
| Back `‹` | tap | S22 no change |

---

# ═══════════════════════════════════
# NEW SCREENS — HOTELS & STAYS
# ═══════════════════════════════════

---

## S_HC — Hotel Comparison
**File:** `app/(trip)/plan/hotel-compare.tsx`
**Source repos:** `dimitryzub/hotels-scraper-js` · `ZoranPandovski/BookingScraper` · `digital-engineering/airbnb-scraper`
**Entry:** ← S23 Hotel Select (compare button on 2+ selected hotels)
**Tab bar:** ✗ | **FAB:** ✗
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
השוואה של עד 3 מלונות זה לצד זה — מחיר, דירוג, DNA match, amenities.

### UI Content
- "Compare Hotels" headline (X selected)
- Comparison table (sticky left column = attribute names):

```
                  [Hotel A] [Hotel B] [Hotel C]
Price/night       €89       €120      €65
DNA Match         87%       72%       91%
Rating            8.9       7.8       9.1
Stars             ⭐⭐⭐⭐   ⭐⭐⭐     ⭐⭐⭐⭐⭐
Pool              ✓         ✗         ✓
Breakfast         ✓         ✓         ✗
Cancellation      Free      €20       Free
Distance center   1.2km     0.8km     3.1km
WiFi              ✓         ✓         ✓
```
Winner highlight: green cell per row for best value

- "Select [Hotel Name]" button under each column

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Select Hotel A" | tap | select + S25 Activities |
| X on hotel | tap | remove from comparison |
| "+ Add Hotel" | tap | back to S23 to add another |
| Back `‹` | tap | S23 |

---

## S_AS — Alternative Stays
**File:** `app/(trip)/plan/alternative-stays.tsx`
**Source repos:** `digital-engineering/airbnb-scraper` · `johnbalvin/pyairbnb` · `dtrungtin/actor-airbnb-scraper`
**Entry:** ← S23 Hotel Select (tab: "Alternative Stays")
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
Airbnb-style stays — דירות, וילות, בתים פרטיים — כאלטרנטיבה למלונות. מותאם ל-DNA.

### UI Content
- Filter tabs: All / Apartment / Villa / Unique / Hostel
- Filter chips: Entire place / Room / Budget / Luxury / DNA Match
- Map/List toggle
- Stay cards:
  - Hero image (swipeable)
  - Type badge: "Entire apartment" / "Private room"
  - Name + neighborhood
  - Price/night + "Total €XXX"
  - Rating + reviews count
  - DNA match badge
  - Amenities icons: WiFi / Kitchen / Pool / Parking
  - "Save" heart
- "Skip to Hotels" link

### Stay Card
```
[Image swipeable gallery]
[Entire apartment · Marina District]
[⭐ 4.92 (128 reviews)]
[✦ 91% Match]
[€85/night · €595 total]
[🌐 🍳 🅿️ 🏊]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Card | tap | stay detail modal |
| Heart | tap | wishlist |
| "Select" in detail | tap | S25 Activities |
| Map toggle | tap | map view with pins |
| Back `‹` | tap | S23 |

---

# ═══════════════════════════════════
# NEW SCREENS — TRIP PLANNING AI
# ═══════════════════════════════════

---

## S_AI — AI Itinerary Generator
**File:** `app/(trip)/plan/ai-itinerary.tsx`
**Source repos:** `hardikverma22/travel-planner-ai` · `zinedkaloc/ai-travel-planner` · `shaheennabi/.../Multi-AI-Agents` · `aws-samples/personalized-travel-itinerary-planner` · `chernistry/voyant`
**Entry:** ← S26 Itinerary Builder ("Generate with AI" button) · ← S41 AI Chat (suggestion card)
**Tab bar:** ✗ | **FAB:** ✗
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
AI מייצר itinerary מלא בהתבסס על DNA, תאריכים, תקציב, העדפות. ה-AI מסביר כל המלצה (fact-verified כמו voyant).

### UI Content

**Step 1 — Preferences Input**
```
[AI Mascot animation]
"Let me plan your perfect Dubai trip"

[Budget per day: €___ slider]
[Pace: Relaxed ←——→ Packed]
[Priorities: Food / Culture / Adventure / Nightlife chips]
[Any must-haves? text input]
[Generate My Itinerary →]
```

**Step 2 — Generating State**
```
[Pulsing DNA helix animation]
"Analyzing your Travel DNA..."
"Finding 87% match activities..."
"Optimizing routes..."
[Progress bar]
```

**Step 3 — Generated Itinerary**
```
[Day 1 — Cultural Immersion]
  09:00 Dubai Museum
        "Based on your 78% History score"
        ✦ Why: "Matches your cultural DNA perfectly"
        [Keep ✓] [Swap ↺]
  
  11:30 Gold Souk
        "A must for your Shopping dimension"
        [Keep ✓] [Swap ↺]

[Regenerate Day]  [Accept All]
```

Each activity has:
- AI explanation: why it matches DNA
- "Keep" or "Swap" for each item
- "Regenerate Day" if user doesn't like whole day

**Step 4 — Review & Accept**
```
[5 days · 18 activities · est. €890]
[DNA match score: 89% overall]
[Add to My Itinerary →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Generate" | tap | loading → generated |
| Activity "Keep" | tap | mark green |
| Activity "Swap" | tap | show alternatives inline |
| "Regenerate Day" | tap | re-generate that day only |
| "Add to Itinerary" | tap | S26 pre-populated |
| Back `‹` | tap | confirm "Discard generation?" |

---

## S_CP — Collaborative Planning Room
**File:** `app/(trip)/plan/collab/[tripId].tsx`
**Source repos:** `mauriceboe/TREK` (3,547⭐)
**Entry:** ← S26 Itinerary Builder ("Invite Friends" button)
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
חדר תכנון שיתופי — מספר אנשים יכולים לערוך את ה-itinerary בו-זמנית, עם presence indicators ו-real-time sync.

### UI Content
- "Planning Together" header
- Presence avatars: X people online now
- Shared itinerary (same as S26 but with:)
  - Who added each activity: avatar badge
  - Live editing: cursor of other person visible
  - Activity lock: "Dana is editing this..."
  - Vote system: ♥ per activity (majority keeps)
- Chat panel (right side on tablet, bottom sheet on mobile)
- "Invite More" button
- "Finalize & Book" CTA (requires all agree)

### Presence Indicator
```
[Avatar1] [Avatar2] [Avatar3] + 2 more · 5 editing now
```

### Activity Row with Voting
```
[≡] [Dubai Museum]        [👍 3] [👎 1]    [Dana added]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Activity vote | tap | increment vote |
| "Invite More" | tap | share room link |
| "Finalize" | tap | if all agreed → S27 Cart |
| Chat icon | tap | chat bottom sheet |
| Back `‹` | tap | S26 |

---

# ═══════════════════════════════════
# NEW SCREENS — ADVENTURE & TRACKING
# ═══════════════════════════════════

---

## S_AL — Adventure Log (My Journey)
**File:** `app/(trip)/profile/adventure-log.tsx`
**Source repos:** `seanmorley15/AdventureLog` (3,020⭐) · `rbardini/countryquest` · `OSSPhilippines/philippines-travel-level-map`
**Entry:** ← S15 Profile ("Adventure Log" menu item) · ← S45 Trip Summary
**Tab bar:** ✓ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
המפה האישית של המשתמש — אילו מדינות ביקר, כמה ערים, timeline של טיולים, סטטיסטיקות.

### UI Content

**Top: World Map**
```
[Interactive SVG world map 300px height]
[Visited countries: highlighted purple]
[Planned countries: dashed purple border]
[Tap country: show trips there]
```

**Stats Row**
```
[🌍 23 Countries] [🏙️ 67 Cities] [✈️ 41 Flights] [📸 1,204 Photos]
```

**Achievements**
Horizontal scroll badges:
- "First Trip" / "5 Continents" / "100 Activities" / "Night Owl" etc.
- Locked achievements: grayed out with progress

**Timeline**
Vertical timeline of all trips:
```
[2026] Dubai Adventure → rating ⭐⭐⭐⭐⭐ → [view]
[2025] Tokyo Explorer  → rating ⭐⭐⭐⭐   → [view]
[2024] Paris Romantic  → rating ⭐⭐⭐⭐⭐ → [view]
```

**"Scratch Map" mode toggle**
Scratch-style: countries hidden until visited (countryquest style)

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Map country | tap | country trips modal |
| Trip in timeline | tap | `/(trip)/post/[tripId]/summary` |
| Achievement badge | tap | achievement detail |
| Scratch mode toggle | tap | toggle map style |
| Back `‹` | tap | S15 Profile |

---

## S_RT — Road Trip Mode
**File:** `app/(trip)/plan/road-trip.tsx`
**Source repos:** `blakek/road-tripper` · `realityexpander/FredsRoadtripStoryteller` · `itskovacs/trip`
**Entry:** ← S20 Destination Select (mode selector: "Road Trip")
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
מצב road trip — מתכנן מסלול כביש עם עצירות, מסעדות, אטרקציות לאורך הדרך + audio stories כשמגיעים לנקודות היסטוריות.

### UI Content
- Full-screen map (dark style)
- Route line drawn between stops
- Stop markers numbered 1,2,3...
- Right panel (tablet) / bottom sheet (mobile): stops list
- Each stop: name + category + distance from prev + estimated time
- "+ Add Stop" between any two stops
- "Audio Stories On/Off" toggle
- Total distance + estimated drive time
- "Start Road Trip" CTA (activates Live Mode road trip variant)

### Stop Card
```
[🍔] [1] Roadside Grill      ← restaurant
         42km from last stop
         ~35min drive
         Rating: 4.7 ⭐
         [Remove] [Details]
```

### Audio Story Trigger Point
On map: 🎙️ icon at historical locations
```
[🎙️ Masada Fortress]  ← tap to preview story
"5 min audio story available"
[Preview ▶]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Map stop marker | tap | stop detail bottom sheet |
| "+ Add Stop" | tap | search/browse stops |
| "Start Road Trip" | tap | `/(live)/[tripId]` road trip variant |
| Audio story ▶ | tap | audio player modal |
| Back `‹` | tap | S20 |

---

# ═══════════════════════════════════
# NEW SCREENS — FINANCE
# ═══════════════════════════════════

---

## S_CC — Currency Converter (Full Screen)
**File:** `app/(trip)/wallet/currency.tsx`
**Source repos:** `xxczaki/cashify` · `Oztechan/CCC` (342⭐) · `sal0max/currencies` (325⭐) · `alexprengere/currencyconverter`
**Entry:** ← S39 Expenses (expand widget) · ← S48 Wallet · ← T1 Tax Dashboard
**Tab bar:** ✗ | **FAB:** ✗
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
המרת מטבעות מלאה — כל המטבעות, שערים חיים מה-ECB, היסטוריה, מחשבון.

### UI Content
- "Currency Converter" headline
- From/To swap button
- Large amount input (keypad style)
- Conversion result (large)
- Rate display: "1 EUR = 4.025 ILS · Updated 5m ago"
- Quick amounts: €10 / €20 / €50 / €100 / €200
- "My Trip Currencies" section (currencies from current/past trips)
- All currencies list (searchable)
- Rate chart: 30-day history graph for selected pair
- "Add to Expenses" button (when in trip context)

### Amount Input
```
[EUR flag] [€]  [100.00       ]   [↕ swap]
                                  [ILS flag]
           Result: ₪ 402.50
           Rate: 1 EUR = 4.025 ILS
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Currency "From" | tap | currency picker modal |
| Currency "To" | tap | currency picker modal |
| Swap ↕ | tap | swap currencies |
| "Add to Expenses" | tap | back to S39 with amount |
| Back `‹` | tap | previous |

---

## S_BM — Trip Budget Manager
**File:** `app/(live)/[tripId]/budget.tsx`
**Source repos:** `davefaliskie/travel_treasury` (307⭐) · `spliit-app/spliit` (2,616⭐)
**Entry:** ← S35 Live Dashboard (budget tile) · ← S39 Expenses header
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
ניהול תקציב trip מלא — קטגוריות, הגבלות, הוצאות בפועל vs. מתוכנן, split view.

### UI Content

**Overview Card**
```
[Total Budget: €1,500]
[Spent: €847  ·  Left: €653]
[████████████░░░░░░░░]  56% used
[X days left · €93/day remaining]
```

**Category Breakdown**
```
🏨 Accommodation  €445  Budget: €500  [████████░░] 89% ⚠️
🍜 Food           €180  Budget: €200  [████████░░] 90% ⚠️
🚗 Transport      €95   Budget: €150  [██████░░░░] 63% ✓
🎯 Activities     €127  Budget: €400  [███░░░░░░░] 32% ✓
🛍️ Shopping       €0    Budget: €250  [          ]  0% ✓
```
Tap category: drill down to expenses in that category

**Daily Spend Chart**
Bar chart: one bar per day, green/yellow/red by budget

**Split Summary** (if group trip)
```
[You owe Dana: €45.50]
[Tom owes you: €32.00]
[Net: you owe €13.50]
[Settle Up →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Category row | tap | expenses filtered by category |
| "Settle Up" | tap | S51 Split Pay |
| "+ Add Expense" FAB | tap | add expense bottom sheet |
| "Edit Budget" | tap | edit totals inline |
| Back `‹` | tap | S35 |

---

# ═══════════════════════════════════
# NEW SCREENS — TRAVEL INFO
# ═══════════════════════════════════

---

## S_DN — Digital Nomad Hub
**File:** `app/(tabs)/explore/nomad.tsx`
**Source repos:** `cbovis/awesome-digital-nomads` (1,026⭐) · `lukasz-madon/awesome-remote-job` (44,781⭐) · `rignaneseleo/groups-for-nomads`
**Entry:** ← S12 Explore (tab: "Nomad") · ← S55 Settings (if nomad mode enabled)
**Tab bar:** ✓ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
Hub לנוודים דיגיטליים — coworking spaces, wifi scores, cost of living, communities.

### UI Content
- "Digital Nomad" header + destination selector
- **Nomad Score Card** for current destination:
  - Internet speed: 92 Mbps
  - Cost of living index: 4.2/10 (affordable)
  - Nomad population: 2,400 nomads/month
  - Visa: 30 days / Digital Nomad Visa available
  - Weather: 28°C ☀️
  - Safety: 8.1/10
- **Coworking Spaces** list (map/list toggle)
- **Communities** section: WhatsApp groups / Facebook groups / Meetups
- **Remote Jobs** section (from awesome-remote-job)
- **Cost Breakdown**: coffee €2 / lunch €8 / coworking/day €15

### Nomad Score Donut
```
[Donut chart: Internet / Cost / Safety / Vibe]
Overall: 8.4 / 10
"Great for nomads"
```

### Coworking Card
```
[Image] [Coworking Name]         [€15/day]
        [⭐ 4.7]  [WiFi: 95mbps]
        [Open 08:00-22:00]       [Book →]
```

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Destination selector | tap | destination picker |
| Coworking card | tap | detail + booking link |
| "Join Group" | tap | `Linking.openURL` |
| "Find Jobs" | tap | remote jobs modal |
| Back `‹` | tap | S12 Explore |

---

## S_VP — Visa & Passport Center
**File:** `app/(trip)/pre/[tripId]/visa.tsx`
**Source repos:** `ilyankou/passport-index-dataset` (301⭐) · `imorte/passport-index-data`
**Entry:** ← S32 Pre-Trip Dashboard · ← T4 Country Rules
**Tab bar:** ✗ | **FAB:** ✓
**UX/UI:** 🎨 טרם תוכנן

### מה המסך עושה
מידע מלא על ויזה ודרישות כניסה — מבוסס על דרכון המשתמש + יעד הטיול.

### UI Content
- "Visa Requirements" header
- Passport: 🇮🇱 Israeli (change option)
- Destination: 🇦🇪 UAE
- **Status Banner:**
  ```
  [✅ No Visa Required]
  Valid for 30 days / Max 90 per 180 days
  ```
- **Requirements checklist:**
  - ✓ Valid passport (>6 months remaining)
  - ✓ Return ticket
  - ✓ Proof of accommodation
  - ℹ️ Travel insurance recommended
- **Passport expiry warning** (if passport expires <6 months)
- **Visa on Arrival** details (if applicable)
- **eVisa** option (if available) with apply button
- **Entry restrictions** (if any COVID/other)
- Comparison: other common passport holders
- "Check Another Country" button
- Source: "Data from Passport Index, updated April 2026"

### Status Types
| Status | Banner | Color |
|--------|--------|-------|
| No visa | ✅ Visa-free · 30 days | green |
| Visa on arrival | 🟡 Visa on arrival · $50 | yellow |
| eVisa required | 🔵 eVisa required | blue |
| Full visa | 🔴 Visa required | red |
| Access denied | ⛔ Entry not permitted | red |

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| "Change Passport" | tap | passport picker modal |
| "Apply eVisa" | tap | `Linking.openURL` official site |
| "Check Another Country" | tap | country picker |
| Back `‹` | tap | S32 |

---

# ═══════════════════════════════════
# ENHANCEMENTS TO EXISTING SCREENS
# (שינויים משמעותיים ב-UI קיים)
# ═══════════════════════════════════

---

## S22 + AI Search Mode
**Adds to existing:** `app/(trip)/plan/flights.tsx`
**Source:** `LetsFG/LetsFG` (AI searches 400+ airlines)

### New UI Element — AI Search Banner
```
[🤖 AI Mode]
"Searching 400+ airlines for your DNA match..."
[Progress: scanning ████░░░░ EK, QR, LH...]
```
Replace standard search with AI-powered search that:
- Searches 400+ airlines simultaneously
- Ranks by DNA match + price + quality
- Shows "AI found €116 cheaper than Google Flights"

---

## S26 + TREK Collab Button
**Adds to existing:** `app/(trip)/plan/itinerary.tsx`
**Source:** `mauriceboe/TREK`

### New UI Element
```
[👥 Plan Together →]  ← new button in header
[Presence avatars if others joined]
```
Tap → S_CP Collaborative Planning Room

---

## S39 + Budget Widget
**Adds to existing:** `app/(live)/[tripId]/expenses.tsx`
**Source:** `davefaliskie/travel_treasury`

### New UI Element — Budget Progress
```
[Budget: €1,500  |  Spent: €847  |  Left: €653]
[████████████░░░░] 56%  [Full Budget →]
```
"Full Budget" → S_BM Budget Manager

---

## S45 + Adventure Stats
**Adds to existing:** `app/(trip)/post/[tripId]/summary.tsx`
**Source:** `seanmorley15/AdventureLog`

### New Section — "Your Journey So Far"
```
[🌍 23 countries total]  [↗ +1 new this trip]
[Adventure Log →]
```
Links to S_AL Adventure Log

---

# ═══════════════════════════════════
# SUMMARY
# ═══════════════════════════════════

## New Screens Added

| Screen | File | Source Repos | Status |
|--------|------|-------------|--------|
| S_FA — Flight Price Alerts | `plan/flight-alerts.tsx` | broadtoad/Flight_Tracker, n-patel/flights | 🎨 Design needed |
| S_FS — Flight Status Live | `pre/[tripId]/flight-status.tsx` | FlightAirMap, Sky-Tracker | 🎨 Design needed |
| S_FD — Flexible Dates Dashboard | `plan/flexible-dates.tsx` | n-patel/flights, AWeirdDev/flights | 🎨 Design needed |
| S_HC — Hotel Comparison | `plan/hotel-compare.tsx` | hotels-scraper-js, BookingScraper | 🎨 Design needed |
| S_AS — Alternative Stays | `plan/alternative-stays.tsx` | airbnb-scraper, pyairbnb | 🎨 Design needed |
| S_AI — AI Itinerary Generator | `plan/ai-itinerary.tsx` | travel-planner-ai, Multi-AI-Agents, voyant | 🎨 Design needed |
| S_CP — Collaborative Planning | `plan/collab/[tripId].tsx` | TREK | 🎨 Design needed |
| S_AL — Adventure Log | `profile/adventure-log.tsx` | AdventureLog, countryquest | 🎨 Design needed |
| S_RT — Road Trip Mode | `plan/road-trip.tsx` | road-tripper, FredsRoadtripStoryteller | 🎨 Design needed |
| S_CC — Currency Converter | `wallet/currency.tsx` | cashify, CCC, currencies | 🎨 Design needed |
| S_BM — Budget Manager | `live/[tripId]/budget.tsx` | travel_treasury, spliit | 🎨 Design needed |
| S_DN — Digital Nomad Hub | `explore/nomad.tsx` | awesome-digital-nomads, awesome-remote-job | 🎨 Design needed |
| S_VP — Visa & Passport | `pre/[tripId]/visa.tsx` | passport-index-dataset | 🎨 Design needed |

**Total new screens: 13**
**Total TRAVI screens: 97 + 13 = 110 screens**


---

# ═══════════════════════════════════
# EXISTING SCREENS — UPDATES NEEDED
# כפתורים חדשים שצריך להוסיף למסכים קיימים
# ═══════════════════════════════════

---

## S11 — Home (עדכונים)
**File:** `app/(tabs)/home/index.tsx`

### כפתורים/אלמנטים חדשים
| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "Flight Deals 🔥" card | Quick stats row (3rd card) | tap | S_FA Flight Alerts |
| "Nomad Mode" badge | על DNA persona badge | tap | S_DN Digital Nomad Hub |

---

## S15 — Profile (עדכונים)
**File:** `app/(trip)/profile/index.tsx`

### שינוי בתפריט — Activity section
```
[✈️ My Trips              ›]
[🗺️ Adventure Log   NEW   ›]  ← חדש
[💰 Wallet                ›]
[⭐ Points & Rewards      ›]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "Adventure Log" row | מתחת "My Trips" | tap | S_AL Adventure Log |

---

## S22 — Flight Select (עדכונים)
**File:** `app/(trip)/plan/flights.tsx`

### כפתורים/אלמנטים חדשים
| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "🔔 Set Price Alert" | bottom, מעל "Skip Flights" | tap | S_FA Flight Alerts |
| "AI Search" toggle | בheader, ליד sort tabs | tap | activates AI mode (LetsFG) |
| "Flexible Dates" tab | tab bar, אחרי "Fastest" | tap | S_FD Flexible Dates Dashboard |

---

## S23 — Hotel Select (עדכונים)
**File:** `app/(trip)/plan/hotels.tsx`

### שינוי בtabs
```
[Hotels] [Alternative Stays NEW] ← חדש
```

### כפתורים/אלמנטים חדשים
| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "Alternative Stays" tab | header tabs | tap | S_AS Alternative Stays |
| "Compare (X)" button | bottom, מופיע אחרי בחירת 2+ | tap | S_HC Hotel Comparison |

### Compare Mode
- Long press על hotel card → enters select mode
- Selected cards: checkbox + count
- After 2 selected: "Compare (2)" button appears bottom-center

---

## S26 — Itinerary Builder (עדכונים)
**File:** `app/(trip)/plan/itinerary.tsx`

### כפתורים/אלמנטים חדשים
| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "🤖 Generate with AI" | header, ליד progress | tap | S_AI AI Itinerary Generator |
| "👥 Plan Together" | header, אחרי AI button | tap | S_CP Collaborative Planning |
| "🚗 Road Trip Mode" | bottom, מתחת ל"Review Cart" | tap | S_RT Road Trip Mode |

### Header layout חדש
```
[← back]  [Itinerary]  [🤖] [👥]  [Review →]
```

---

## S32 — Pre-Trip Dashboard (עדכונים)
**File:** `app/(trip)/pre/[tripId]/index.tsx`

### שינוי ב-Quick Cards Grid
```
[📋 Checklist] [📄 Documents]
[🛂 Visa & Entry  NEW] [✈️ Flight Status  NEW]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "🛂 Visa & Entry" card | grid 3rd cell | tap | S_VP Visa & Passport |
| "✈️ Flight Status" card | grid 4th cell | tap | S_FS Flight Status Live |

---

## S35 — Live Dashboard (עדכונים)
**File:** `app/(live)/[tripId]/index.tsx`

### שינוי ב-Quick Actions Grid
מ-8 tiles ל-9 tiles (2×4 + 1 row):
```
[🗓️ Timeline] [🗺️ Map      ]
[💰 Expenses] [📸 Memories ]
[🆘 Emergency][💳 Tax       ]
[📊 Budget NEW][⚙️ Settings ]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "📊 Budget" tile | grid 7th cell | tap | S_BM Budget Manager |

---

## S39 — Expenses (עדכונים)
**File:** `app/(live)/[tripId]/expenses.tsx`

### כפתורים/אלמנטים חדשים
| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "Full Budget →" link | מתחת לbudget bar | tap | S_BM Budget Manager |
| Currency widget "Expand →" | מתחת לcurrency row | tap | S_CC Currency Converter |

---

## S45 — Trip Summary (עדכונים)
**File:** `app/(trip)/post/[tripId]/summary.tsx`

### Section חדש — אחרי Countries Map
```
[🌍 Your Journey So Far]
[23 countries total] [↗ +1 new this trip]
[See Adventure Log →]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "See Adventure Log →" | חדש, אחרי countries map | tap | S_AL Adventure Log |

---

## S48 — Wallet (עדכונים)
**File:** `app/(tabs)/wallet/index.tsx`

### שינוי ב-Quick Actions Row
```
[💳 Split Pay] [📊 Transactions] [💱 Currency NEW]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "💱 Currency" button | Quick Actions row 3rd | tap | S_CC Currency Converter |

---

## S91 — Points Dashboard (עדכונים)
**File:** `app/(tabs)/points/index.tsx`

### שינוי ב-Quick Navigation Grid
```
[🎁 Redeem   ][💎 Earn    ]
[📜 History  ][👑 Perks   ]
[👥 Referrals][🚨 Alerts NEW]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "🚨 Alerts" tile | grid 6th cell | tap | S_FA Flight Alerts (with points filter) |

---

## T4 — Country Rules (עדכונים)
**File:** `app/(live)/[tripId]/tax/rules.tsx`

### כפתורים/אלמנטים חדשים
| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "Full Visa Center →" | מתחת לvisa section | tap | S_VP Visa & Passport |

---

## S12 — Explore (עדכונים)
**File:** `app/(tabs)/explore/index.tsx`

### שינוי ב-Filter Chips
```
All / Beaches / Cities / Mountains / Culture / Food / Nomad NEW
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "Nomad" filter chip | filter bar, rightmost | tap | S_DN Digital Nomad Hub |

---

## S20 — Destination Select (עדכונים)
**File:** `app/(trip)/plan/destination.tsx`

### Mode Selector חדש — מעל search input
```
[✈️ City Trip] [🚗 Road Trip NEW]
```

| Element | Position | Action | Destination |
|---------|----------|--------|-------------|
| "🚗 Road Trip" mode | toggle above search | tap | S_RT Road Trip Mode (replaces planning funnel) |

---

# ═══════════════════════════════════
# NAVIGATION ADDITIONS SUMMARY
# כל החיבורים החדשים בטבלה אחת
# ═══════════════════════════════════

| From Screen | New Button | → To New Screen |
|-------------|-----------|-----------------|
| S11 Home | "Flight Deals 🔥" card | S_FA |
| S12 Explore | "Nomad" filter chip | S_DN |
| S15 Profile | "Adventure Log" menu item | S_AL |
| S20 Destination | "Road Trip" mode toggle | S_RT |
| S22 Flights | "Set Price Alert 🔔" | S_FA |
| S22 Flights | "AI Search" toggle | AI mode |
| S22 Flights | "Flexible Dates" tab | S_FD |
| S23 Hotels | "Alternative Stays" tab | S_AS |
| S23 Hotels | "Compare (X)" button | S_HC |
| S26 Itinerary | "Generate with AI 🤖" | S_AI |
| S26 Itinerary | "Plan Together 👥" | S_CP |
| S26 Itinerary | "Road Trip Mode 🚗" | S_RT |
| S32 Pre-Trip | "Visa & Entry" card | S_VP |
| S32 Pre-Trip | "Flight Status" card | S_FS |
| S35 Live | "Budget 📊" tile | S_BM |
| S39 Expenses | "Full Budget →" link | S_BM |
| S39 Expenses | "Currency →" expand | S_CC |
| S45 Summary | "Adventure Log →" | S_AL |
| S48 Wallet | "Currency 💱" button | S_CC |
| S91 Points | "Alerts 🚨" tile | S_FA |
| T4 Country Rules | "Full Visa Center →" | S_VP |

