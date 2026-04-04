# TRAVI — Master Screen List (Complete)
_Last updated: Phase 17 audit_

---

## GROUP 1: AUTH / ONBOARDING

### 1. Splash Screen `(auth)/splash.tsx` ✅
- TRAVI logo animated
- Loading spinner
- Auto-navigates to sign-up

### 2. Sign Up `(auth)/sign-up.tsx` ✅
- Email input + Continue button
- Google / Apple / Guest login buttons
- Terms & Privacy links

### 3. OTP Verify `(auth)/verify.tsx` ✅
- 6-digit code input
- Resend code link
- Back button

### 4. Profile Setup `(auth)/profile-setup.tsx` ✅
- Name input
- Avatar selection (vector icon avatars)
- Home city input
- Continue button

### 5. Welcome `(auth)/welcome.tsx` ✅
- 3 feature highlight cards (AI planning, DNA quiz, rewards)
- "Get Started" CTA

### 6. Traveler DNA Quiz `(auth)/quiz.tsx` ✅
- 10 questions with animated transitions
- Progress bar
- Result screen: DNA type, description, top 3 destinations with photos, trait tags, +250 points earned
- "Start Exploring" CTA

---

## GROUP 2: MAIN TABS

### 7. Home `(tabs)/index.tsx` ✅ (needs hero redesign)
- Header: "Good morning, [Name]" + DNA badge + notification bell
- TRAVI Points card (points, tier badge, travel credit)
- "Plan Your Next Trip" gradient CTA banner
- Quick Actions: Flights, Hotels, Experiences, Price Alert
- Price Alerts section: horizontal scroll cards with destination photos
- "Picked for You" section: horizontal scroll destination cards with photos + DNA match / Trending badges
- ❌ MISSING: Hero full-bleed photo background at top

### 8. Explore `(tabs)/explore.tsx` ✅
- Header + search bar
- Featured destination hero card (auto-rotating carousel)
- Category filter chips: All, Beach, City, Nature, Culture, Adventure
- Destination grid (2 columns) with photos, price, rating, tag badges
- Heart/save button on each card

### 9. My Trips `(tabs)/trips.tsx` ✅
- Header + "New Trip" button
- Stats row: Upcoming / Completed / Points Earned
- Filter tabs: All / Upcoming / Past
- Trip cards with destination photo, status badge, dates, travelers, cost, points
- "Live" badge for active trips → navigates to Live Trip

### 10. TRAVI Wallet `(tabs)/wallet.tsx` ⚠️ (needs full rebuild)
- Header: "TRAVI Wallet" + Alerts + tier badge
- Points balance card with tier icon
- Progress bar to next tier (Explorer → Adventurer → Elite → Legend)
- Stats: Lifetime Saved, Trips Rewarded, Cashback Rate
- Tabs: Overview / Redeem / History
- Overview: "How to Earn Points" list (Book flight 5%, Book hotel 5%, Activities 3%, Refer 500pts)
- ❌ MISSING: Streak counter, Achievement badges, animated level-up
- ❌ MISSING: Subscription Plans tab (Free/Plus/Elite)
- ❌ MISSING: Refer-a-Friend section with invite code
- ❌ MISSING: KYC / Balance Withdrawal section
- ❌ MISSING: Full Redeem tab with reward cards + photos
- ❌ MISSING: Full History tab with transaction list + destination photos

### 11. Profile `(tabs)/profile.tsx` ✅
- Avatar + name + DNA type badge
- Stats: Trips, Countries, Points
- Settings sections: Account, Preferences, Support, About
- Dark mode toggle
- Sign out button

### 12. Price Alerts `(tabs)/alerts.tsx` ✅
- Header + "Set Alert" button
- Active alerts list: destination, route, current price, target price, % drop
- Alert toggle (on/off)
- "Add New Alert" modal: destination picker, max price slider

---

## GROUP 3: TRIP PLANNING FLOW

### 13. Plan Trip `(trip)/plan.tsx` ✅
- Destination input (with suggestions)
- Date picker (departure + return)
- Travelers count
- Budget selector (Budget / Mid-range / Luxury)
- "Find My Trip" CTA

### 14. Interests `(trip)/interests.tsx` ✅
- Grid of interest cards with icons: Culture, Food, Adventure, Relax, Nightlife, Nature, Shopping, Sports
- Multi-select with visual feedback
- Continue button

### 15. Landmarks `(trip)/landmarks.tsx` ✅
- Grid of landmark cards with photos for selected destination
- Multi-select
- Continue button

### 16. Flights `(trip)/flights.tsx` ✅
- AI-generated flight options list
- Each card: airline, times, duration, stops, price
- Select + Continue

### 17. Hotels `(trip)/hotels.tsx` ✅
- AI-generated hotel options list
- Each card: hotel name, stars, location, price/night, photo
- Select + Continue

### 18. Trip Summary `(trip)/summary.tsx` ✅
- Full trip overview: destination, dates, flight, hotel
- Itinerary preview (Day 1-7 collapsed)
- Total cost breakdown
- Points to be earned
- "Confirm & Book" CTA

### 19. Trip Completion `(trip)/completion.tsx` ✅
- Confetti animation
- Points earned badge
- "Your trip is ready!" message
- "Go Live" button → navigates to Live Trip

---

## GROUP 4: LIVE TRIP

### 20. Live Home `(live)/home.tsx` ✅
- Header: back + LIVE badge + more menu
- Hero card: destination, dates, travelers, day progress bar
- "Happening Now" current activity card with Directions + Ask TRAVI buttons
- "Up Next" activity preview
- Quick Actions grid: Ask TRAVI, Today's Plan, Nearby, Split Bill, Emergency
- TRAVI Tip rotating card
- Weather details grid
- Points earned card
- Emergency contacts modal

### 21. Full Itinerary `(live)/itinerary.tsx` ✅
- Header + day selector tabs
- Timeline view: activities by time
- Each activity: time, title, description, location, price, category icon, status badge
- Category filter chips
- "Add Activity" button → ❌ MISSING: Add Activity screen

### 22. Nearby Map `(live)/map.tsx` ✅
- Header + destination name
- Map placeholder (static visual)
- Category filter chips: All, Food, Hotels, Museums, Shopping, Parks
- Nearby places list with icon, name, distance, rating, price range
- "Get Directions" button on each

### 23. AI TRAVI Chat `(live)/chat.tsx` ✅
- Header: TRAVI logo + "TRAVI AI" + "Your travel assistant"
- Message bubbles (user right, TRAVI left with logo avatar)
- Quick suggestion chips
- Text input + send button
- Typing indicator

### 24. Split Bill `(live)/split.tsx` ✅ (basic — needs upgrade)
- Header: back + "Split Bill" + trip name + Add button
- Summary card: Total Spent, My Share, Expenses count
- Balances section: who owes whom
- Expenses list: category icon, title, payer, time, total, per-person, members chips, owed banner
- Add Expense modal: title, amount, paid by, split among, category
- ❌ MISSING: Payment method selection (Venmo/PayPal/Cash)
- ❌ MISSING: "Settle up" button with confirmation
- ❌ MISSING: Receipt photo upload

---

## GROUP 5: MISSING SCREENS (TO BUILD)

### 25. Traveler Chat `(live)/traveler-chat.tsx` ❌ TO BUILD
- Header: group name + members avatars + back
- Message bubbles between trip members (not AI)
- Each message: avatar, name, text, time, read receipts
- Photo sharing button
- Location sharing button
- "Share itinerary item" button
- Text input + send

### 26. Notifications `(tabs)/notifications.tsx` ❌ TO BUILD
- Header: "Notifications" + mark all read
- Sections: Today / This Week / Earlier
- Notification types:
  - Price drop alert (destination photo + % drop + "Book Now")
  - Trip reminder (days until trip + destination)
  - Friend joined trip (avatar + name)
  - Points earned (amount + reason)
  - TRAVI tip / news
- Swipe to dismiss
- Unread dot indicator

### 27. Trip Detail `(tabs)/trip-detail.tsx` ❌ TO BUILD
- Header: destination photo (full-bleed) + back + share
- Trip name, dates, travelers
- Tabs: Overview / Itinerary / Expenses / Members
- Overview: flight card, hotel card, total cost, points earned
- Itinerary: day-by-day list
- Expenses: total + breakdown chart
- Members: avatars + names + invite button

### 28. End-of-Trip Summary `(trip)/end-summary.tsx` ❌ TO BUILD
- Full-screen celebration design
- Trip stats: days, countries, activities completed, money spent
- Points earned (animated counter)
- Photo memories grid (mock photos)
- "Share your trip" button
- "Rate your experience" stars
- "Plan Next Trip" CTA

### 29. Subscription Plans `(tabs)/subscription.tsx` ❌ TO BUILD
- Header: "TRAVI Plans"
- 3 plan cards: Free / Plus ($9.99/mo) / Elite ($19.99/mo)
- Each card: price, feature list with checkmarks, highlighted differences
- "Current Plan" badge on active plan
- "Upgrade" CTA with gradient button
- Annual vs Monthly toggle (save 20%)
- Feature comparison table

### 30. Refer a Friend `(tabs)/refer.tsx` ❌ TO BUILD
- Header: "Invite Friends"
- Hero: "+500 TRAVI Points per friend"
- Your invite code (large, copyable)
- Share buttons: WhatsApp, Messages, Copy Link, More
- "Friends Invited" counter
- List of pending/joined friends with status

### 31. KYC / Balance `(tabs)/kyc.tsx` ❌ TO BUILD
- Header: "Wallet Balance"
- Available balance card
- "Withdraw" button
- Identity verification steps (if not verified): ID upload, selfie
- Verification status badge
- Bank account / PayPal connection
- Transaction history

### 32. Flight Details `(live)/flight-detail.tsx` ❌ TO BUILD
- Header: airline logo + flight number + back
- Route: TLV → CDG with stops
- Departure + arrival times + terminal
- Seat info + class
- Baggage allowance
- Booking reference (QR code)
- "Change Flight" button
- "Add to Wallet" button

### 33. Hotel Details `(live)/hotel-detail.tsx` ❌ TO BUILD
- Header: hotel photo (full-bleed) + back
- Hotel name, stars, address
- Check-in / Check-out dates + times
- Room type + amenities icons
- Booking reference
- "Get Directions" button
- "Call Hotel" button
- "Edit Booking" button

### 34. Restaurant Details `(live)/restaurant-detail.tsx` ❌ TO BUILD
- Header: restaurant photo + back
- Name, cuisine type, price range, rating
- Address + distance
- Opening hours
- Menu highlights (3-4 dishes with photos)
- "Reserve Table" button (opens time picker)
- "Get Directions" button
- "Add to Itinerary" button

### 35. Add Activity `(live)/add-activity.tsx` ❌ TO BUILD
- Header: "Add to Itinerary" + back
- Search bar for activities
- Category filter chips
- Suggested activities list (based on destination)
- Each item: photo, name, description, price, duration
- Time picker for when to add
- "Add to Day [X]" button

### 36. Invited Travel Partner `(live)/invite-partner.tsx` ❌ TO BUILD
- Header: "Trip Invitation"
- Inviter's avatar + name
- Trip details: destination, dates, travelers
- Trip preview card
- "Accept" (gradient) + "Decline" buttons
- After accept: joins trip + navigates to Live Trip

---

## SUMMARY

| Status | Count |
|--------|-------|
| ✅ Done | 24 screens |
| ⚠️ Needs upgrade | 2 screens (Wallet, Split Bill) |
| ❌ Missing | 12 screens |
| **Total** | **38 screens** |
