# TRAVI — מה עושים אחרי שכל הריפואים מחוברים
# Phase 2: Business Logic — הלב של TRAVI
# April 2026

---

## הנחת יסוד
כשמגיעים לשלב הזה:
- כל המסכים בנויים עם mock data
- כל הריפואים מחוברים
- ניווט עובד end-to-end
- אין עדיין DNA scoring אמיתי, אין API אמיתי

---

# 1. DNA Signal Pipeline

## מה זה
כל אינטרקציה של המשתמש מייצרת signal. הpipeline אוסף, שוקל ומחשב מהם פרופיל DNA.

## Signals שצריך לתעד

| Signal | איפה | Weight |
|--------|------|--------|
| `swipe_like` | S8, S25 | +1.0 |
| `swipe_reject` | S8, S25 | -0.8 |
| `swipe_like_hesitant` | S8 (>2s לפני swipe) | +0.3 |
| `viewed_not_tapped` | S11 (>3s ללא tap) | -0.4 |
| `detail_view_no_booking` | S14 (עזב בלי להזמין) | -0.2 |
| `booking_completed` | S31 | +2.0 |
| `activity_added` | S26 | +1.5 |
| `activity_removed` | S26 | -1.0 |
| `rated_5_stars` | S46 | +2.5 |
| `rated_1_2_stars` | S46 | -2.0 |
| `wishlist_added` | S14, S17 | +0.8 |
| `wishlist_removed` | S17 | -0.5 |
| `checkin_completed` | S38 | +1.2 |

## מבנה DB

```sql
dna_signals (
  id          UUID PRIMARY KEY,
  user_id     UUID FK users,
  type        VARCHAR(50),
  item_id     UUID nullable,
  item_type   VARCHAR(30), -- destination/activity/hotel
  weight      DECIMAL(3,2),
  metadata    JSONB, -- { hesitation_ms, scroll_depth, etc }
  created_at  TIMESTAMPTZ
)

dna_profiles (
  user_id             UUID PRIMARY KEY,
  adventure_sports    DECIMAL(5,4),
  culture_history     DECIMAL(5,4),
  luxury_comfort      DECIMAL(5,4),
  social_nightlife    DECIMAL(5,4),
  nature_wildlife     DECIMAL(5,4),
  food_gastronomy     DECIMAL(5,4),
  wellness_relaxation DECIMAL(5,4),
  budget_conscious    DECIMAL(5,4),
  signal_count        INTEGER,
  last_calculated     TIMESTAMPTZ,
  vector              vector(8)  -- pgvector
)
```

## Calculation Logic

```typescript
// POST /dna/calculate
// מחשב מחדש את הפרופיל מכל הsignals

async function calculateDNA(userId: string) {
  const signals = await db.dna_signals.findMany({ where: { userId } });

  // Group by item → average weights
  const itemScores = groupAndAverage(signals);

  // Map items to dimensions
  // כל destination/activity יש לו tag לפי dimension
  const dimensions = mapToDimensions(itemScores, itemTags);

  // Normalize 0→1
  const normalized = normalizeDimensions(dimensions);

  // Convert to pgvector
  const vector = [
    normalized.adventure,
    normalized.culture,
    normalized.luxury,
    normalized.social,
    normalized.nature,
    normalized.food,
    normalized.wellness,
    normalized.budget,
  ];

  await db.dna_profiles.upsert({
    userId,
    ...normalized,
    vector,
    lastCalculated: new Date(),
  });
}
```

## מתי לחשב
- אחרי DNA quiz (S10): חישוב ראשוני
- Background job: כל 6 שעות אם היו signals חדשים
- אחרי כל booking (S31): re-calculate עם +2.0 weight
- אחרי review (S46): re-calculate עם rating weight

---

# 2. Matching Engine

## מה זה
מחשב אחוז התאמה בין פרופיל המשתמש לכל destination/activity/hotel.

## DB: Destinations

```sql
destinations (
  id          UUID PRIMARY KEY,
  name        VARCHAR(200),
  country     VARCHAR(100),
  description TEXT,
  images      JSONB,
  tags        JSONB, -- ["adventure", "culture", "food"]
  dna_vector  vector(8),  -- "fingerprint" של היעד
  price_index DECIMAL(3,2),  -- 0=cheap 1=luxury
  popularity  INTEGER
)
```

## DNA Vector לכל יעד (נבנה ידנית / semi-auto)

```typescript
// Example: Dubai
const dubaiVector = [
  0.7, // adventure (desert safari, watersports)
  0.8, // culture (museums, heritage)
  0.9, // luxury (hotels, shopping)
  0.8, // social (nightlife, restaurants)
  0.5, // nature (desert, beach)
  0.9, // food (diverse cuisine)
  0.6, // wellness (spas, beach)
  0.3, // budget (expensive city)
];

// Example: Chiang Mai
const chiangMaiVector = [
  0.6, // adventure (trekking)
  0.9, // culture (temples, history)
  0.3, // luxury (budget-friendly)
  0.4, // social (quieter nightlife)
  0.8, // nature (mountains, jungle)
  0.9, // food (street food heaven)
  0.8, // wellness (yoga retreats, spas)
  0.9, // budget (very affordable)
];
```

## Cosine Similarity Query

```sql
-- GET /recommendations?userId=xxx
SELECT
  d.id,
  d.name,
  d.country,
  d.images,
  1 - (d.dna_vector <=> u.vector) AS match_score
FROM destinations d
CROSS JOIN dna_profiles u
WHERE u.user_id = $userId
  AND d.id NOT IN (
    SELECT destination_id FROM trips WHERE user_id = $userId
  )
ORDER BY match_score DESC
LIMIT 20;
```

## Match Score → "Why this matches you"

```typescript
function generateMatchReason(
  userProfile: DNAProfile,
  destination: Destination
): string {
  const topDimensions = getTopMatchingDimensions(userProfile, destination);
  // Returns: "Matches your love of Culture & Food"
  // Or: "Perfect for your Adventure & Nature DNA"
}
```

---

# 3. Recommendations API

## Endpoints שצריך לבנות

```
GET  /recommendations
     ?userId= &limit= &min_match=0.70
     → sorted by match_score DESC

GET  /recommendations/dna-cards
     ?userId= &limit=30 &exclude_seen=true
     → for DNA swipe screens (S8, S25)

GET  /recommendations/activities
     ?destinationId= &userId= &limit=30
     → for activity swipe (S25)

POST /recommendations/feedback
     { userId, itemId, itemType, feedbackType }
     → logs signal + triggers background recalculation
```

---

# 4. tRPC API — כל ה-Endpoints

## Auth

```typescript
auth.register(email, password) → { token, user }
auth.login(email, password) → { token, user }
auth.validate(token) → { user } | 401
auth.refresh(refreshToken) → { token }
auth.verifyEmail(code) → { success }
auth.resendVerification(email) → { success }
```

## Users / DNA

```typescript
users.me() → { user, dnaProfile }
users.update(data) → { user }
users.uploadAvatar(presignedUrl) → { avatarUrl }
dna.calculate(userId) → { profile }
dna.getProfile(userId) → { profile }
dna.logSignal(signal) → { success }
dna.flushSignals(signals[]) → { processed: N }
```

## Destinations

```typescript
destinations.getById(id) → { destination, matchScore, whyText }
destinations.search(query) → { results[] }
destinations.getPopular() → { destinations[] }
destinations.getRecommendations(filters) → { destinations[] }
```

## Trips

```typescript
trips.create(data) → { trip }
trips.getAll(userId) → { trips[] }
trips.getById(tripId) → { trip, activities, flights, hotels }
trips.updateStatus(tripId, status) → { trip }
trips.buildCart(tripId) → { cart, pricing }
trips.hold(cartId) → { holdId, expiresAt }
trips.confirm(holdId, paymentIntentId) → { booking }
trips.cancel(tripId) → { refundEstimate }
```

## Live Mode

```typescript
live.activate(tripId) → { liveSession }
live.updateLocation(tripId, coords) → { success }
live.checkin(actId) → { checkin, pointsEarned }
live.addExpense(tripId, expense) → { expense }
live.addMemory(tripId, imageUrl) → { memory }
live.endTrip(tripId) → { postTrip }
```

## Payments

```typescript
payments.createIntent(cartId) → { clientSecret }
payments.confirm(paymentIntentId) → { booking }
payments.createSplit(amount, participants[]) → { splitId, links[] }
payments.topupWallet(amount) → { clientSecret }
payments.getWallet(userId) → { balance, transactions[] }
```

## Points

```typescript
points.getBalance(userId) → { balance, tier, earnRate }
points.getTransactions(userId) → { transactions[] }
points.transfer(userId, partnerId, amount) → { transfer }
points.buyGiftCard(userId, brand, amount) → { giftCode }
points.redeem(userId, type, amount) → { redemption }
```

---

# 5. WebSocket Events

## Live Mode Channel: `ws://api/live/:tripId`

```typescript
// Server → Client
{ type: 'location_updated', coords }
{ type: 'checkin_confirmed', actId, points }
{ type: 'ai_message', message, actions[] }
{ type: 'expense_added', expense }
{ type: 'schedule_updated', activities[] }

// Client → Server
{ type: 'location_update', coords }
{ type: 'request_ai_help', context }
```

## Collaborative Planning: `ws://api/collab/:tripId`

```typescript
// Server → Client
{ type: 'user_joined', userId, name }
{ type: 'user_left', userId }
{ type: 'activity_moved', actId, newIndex, dayId, movedBy }
{ type: 'activity_added', activity, addedBy }
{ type: 'activity_removed', actId, removedBy }
{ type: 'vote_cast', actId, userId, vote }
{ type: 'cursor_moved', userId, position }

// Client → Server
{ type: 'move_activity', actId, newIndex, dayId }
{ type: 'add_activity', activity }
{ type: 'remove_activity', actId }
{ type: 'cast_vote', actId, vote }
```

## Social: `ws://api/social/:userId`

```typescript
// Server → Client
{ type: 'new_message', convId, message }
{ type: 'message_read', convId, messageId }
{ type: 'connection_request', fromUser }
{ type: 'connection_accepted', userId }
{ type: 'feed_update', post }
```

---

# 6. Background Jobs

## Job Queue (BullMQ on Railway)

```typescript
// כל job מוגדר כqueue נפרד

// DNA Recalculation — runs after signals batch
dnaRecalcQueue.add('recalculate', { userId }, {
  delay: 5000, // wait 5s for more signals
  jobId: `dna-${userId}`, // deduplicate
});

// Flight Price Alert Check — every 6 hours
flightAlertsQueue.add('check', {}, {
  repeat: { cron: '0 */6 * * *' }
});

// Pre-flight notification — 48h before departure
preFlightQueue.add('notify', { tripId, userId }, {
  delay: timeUntil48hBefore,
});

// Cashback calculation — after trip ends
cashbackQueue.add('calculate', { tripId }, {
  delay: 1000 * 60 * 5 // 5min after trip ends
});

// DNA vector update — after booking/review
dnaUpdateQueue.add('update', { userId, triggerId });

// Points expiry warning — 30 days before expiry
pointsExpiryQueue.add('warn', { userId }, {
  delay: timeUntil30DaysBefore,
});
```

---

# 7. AI Chat — Claude Integration

## System Prompt Structure

```typescript
const buildSystemPrompt = (user: User, context: LiveContext) => `
You are TRAVI's AI travel assistant for ${user.firstName}.

USER DNA PROFILE:
- Adventure & Sports: ${user.dna.adventure * 100}%
- Culture & History: ${user.dna.culture * 100}%
- Food & Gastronomy: ${user.dna.food * 100}%
- Budget consciousness: ${user.dna.budget * 100}%
[...all 8 dimensions]

CURRENT CONTEXT:
- Trip: ${context.tripName} in ${context.destination}
- Day ${context.currentDay} of ${context.totalDays}
- Current activity: ${context.currentActivity?.name || 'Free time'}
- Location: ${context.currentLocation}
- Time: ${context.localTime}
- Budget remaining: €${context.budgetRemaining}
- Weather: ${context.weather}

NEXT ACTIVITIES:
${context.upcomingActivities.map(a => `- ${a.time}: ${a.name}`).join('\n')}

Be concise, practical, and match recommendations to the DNA profile above.
Always provide specific, actionable suggestions.
`;
```

## Proactive Messages (AI-initiated)

```typescript
// Triggers that cause AI to send proactive message via WebSocket:

// 1. Near activity (geofence 80% of radius)
if (distanceToNextActivity < activity.radius * 0.8) {
  sendProactiveMessage(tripId, {
    text: `${nextActivity.name} is ${minutesAway} min away by ${transport}`,
    actions: ['Navigate', 'Get ready', 'Skip']
  });
}

// 2. Lunch time (12:00-13:30) + no lunch activity
if (isLunchTime && !hasLunchActivity) {
  const nearbyRestaurants = await getNearbyFoodMatches(location, dna);
  sendProactiveMessage(tripId, {
    text: `Time for lunch! ${nearbyRestaurants[0].name} matches your food DNA`,
    actions: ['Show menu', 'Navigate', 'Dismiss']
  });
}

// 3. Weather change
if (weatherChanged) {
  sendProactiveMessage(tripId, {
    text: `Rain expected in 2h. Shall I suggest indoor alternatives?`,
    actions: ['Yes, suggest', 'Keep current plan']
  });
}
```

---

# 8. Points Engine

## Earn Rules

```typescript
const EARN_RULES = {
  booking_flight:     { base: 100, multiplier: 'tier' },
  booking_hotel:      { base: 50,  multiplier: 'tier' },
  booking_activity:   { base: 25,  multiplier: 'tier' },
  checkin:            { base: 10,  multiplier: 1 },
  review_written:     { base: 50,  multiplier: 1 },
  referral_signup:    { base: 500, multiplier: 1 },
  referral_upgrade:   {
    pass: 200, plus: 400, first_class: 800,
  },
  referral_renewal:   { base: 100, multiplier: 1 },
  dna_completed:      { base: 200, multiplier: 1 },
  first_booking:      { base: 100, multiplier: 1 },
};

const TIER_MULTIPLIERS = {
  freemium:    1.0,
  pass:        2.0,
  plus:        2.5,
  first_class: 3.0,
};
```

## Tier Thresholds

```typescript
const TIER_THRESHOLDS = {
  silver:   0,
  gold:     10_000,
  platinum: 50_000,
  diamond:  200_000,
};
```

---

# 9. Cashback System

```typescript
// Cashback accrues on every booking
const CASHBACK_RATES = {
  flights:    0.02, // 2%
  hotels:     0.03, // 3%
  activities: 0.05, // 5%
};

// Multiplied by tier:
const CASHBACK_MULTIPLIERS = {
  freemium:    0,    // no cashback on free
  pass:        1.0,
  plus:        1.5,
  first_class: 2.0,
};

// Example: First Class books €500 hotel
// cashback = 500 × 0.03 × 2.0 = €30

// Cashback goes to wallet as pending
// Released: 14 days after trip end
// Or: trip cancelled → cashback cancelled
```

---

# 10. Security Checklist (לפני Production)

```bash
# 1. CVEs
npm audit --audit-level=high
npm install react@19.2.4

# 2. Environment variables
# NEVER in code — all in EAS Secrets
eas secret:create --scope project --name JWT_SECRET
eas secret:create --scope project --name STRIPE_SECRET_KEY
eas secret:create --scope project --name CLAUDE_API_KEY

# 3. Auth tokens
# ONLY expo-secure-store — never AsyncStorage

# 4. API rate limiting (Railway)
# 100 req/min per user on all endpoints
# 10 req/min on auth endpoints

# 5. Stripe webhooks
# Validate signature on every webhook
stripe.webhooks.constructEvent(body, sig, secret)

# 6. SSL cert pinning
npm install react-native-ssl-pinning

# 7. OTA code signing
eas update:configure

# 8. Dependabot
# .github/dependabot.yml — weekly
```

---

# 11. Performance Checklist (לפני Launch)

```typescript
// 1. React.memo on every list card
const DestinationCard = React.memo(({ item }) => ...)

// 2. FlatList optimization
<FlatList
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index
  })}
/>

// 3. Image caching
import { Image } from 'expo-image'; // not react-native Image
<Image source={url} cachePolicy="memory-disk" />

// 4. Query caching
const { data } = trpc.recommendations.useQuery(params, {
  staleTime: 1000 * 60 * 60 * 6, // 6 hours
  cacheTime: 1000 * 60 * 60 * 24, // 24 hours
});

// 5. Bundle size
npx expo export --dump-sourcemap
// Check: no unused imports, no heavy libraries in main bundle
```

---

# 12. סדר עבודה — Phase 2

```
שבוע 1: DNA Pipeline
  → signals table + calculation logic
  → דוקטרינה: "אין recommendation בלי DNA"

שבוע 2: Matching Engine
  → destinations vectors (17 יעדים)
  → cosine similarity query
  → /recommendations endpoint

שבוע 3: tRPC API
  → auth, users, trips, bookings
  → connect mock data to real API

שבוע 4: Payments
  → Stripe integration
  → wallet, cashback, points

שבוע 5: Live Mode
  → WebSocket server
  → geofencing on device

שבוע 6: AI Chat
  → Claude API + system prompt
  → proactive messages

שבוע 7: Background Jobs
  → BullMQ queues
  → flight alerts, notifications

שבוע 8: Polish + Security
  → performance optimization
  → security checklist
  → EAS build production
```

---

*TRAVI · Phase 2 Guide · April 2026*
*הלב של המוצר — מה שאף ריפו לא יכול לעשות בשבילך*