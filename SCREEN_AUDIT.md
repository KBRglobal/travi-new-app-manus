# TRAVI App — Complete Screen Audit

## EXISTING SCREENS (31 files)

### Auth Group
| File | Screen | Status |
|------|--------|--------|
| (auth)/splash.tsx | Splash/Loading | ✅ Done |
| (auth)/sign-up.tsx | Sign Up (Email/Google/Apple/Guest) | ✅ Done |
| (auth)/verify.tsx | OTP Verification | ✅ Done |
| (auth)/profile-setup.tsx | Profile Setup | ✅ Done |
| (auth)/welcome.tsx | Welcome / Feature Highlights | ✅ Done |
| (auth)/quiz.tsx | Traveler DNA Quiz + Results | ✅ Done |

### Tabs Group (Main Navigation)
| File | Screen | Status |
|------|--------|--------|
| (tabs)/index.tsx | Home | ✅ Done (needs hero redesign) |
| (tabs)/explore.tsx | Explore / Discover | ✅ Done |
| (tabs)/trips.tsx | My Trips | ✅ Done |
| (tabs)/wallet.tsx | TRAVI Wallet | ✅ Done (needs gamification) |
| (tabs)/profile.tsx | Profile / Settings | ✅ Done |
| (tabs)/alerts.tsx | Price Alerts | ✅ Done |

### Trip Planning Group
| File | Screen | Status |
|------|--------|--------|
| (trip)/plan.tsx | Plan Trip (destination, dates, budget) | ✅ Done |
| (trip)/interests.tsx | Choose Interests | ✅ Done |
| (trip)/landmarks.tsx | Choose Landmarks | ✅ Done |
| (trip)/flights.tsx | Choose Flight | ✅ Done |
| (trip)/hotels.tsx | Choose Hotel | ✅ Done |
| (trip)/summary.tsx | Trip Summary | ✅ Done |
| (trip)/completion.tsx | Trip Completion + Points | ✅ Done |

### Live Trip Group
| File | Screen | Status |
|------|--------|--------|
| (live)/home.tsx | Live Trip Home | ✅ Done |
| (live)/itinerary.tsx | Full Itinerary | ✅ Done |
| (live)/map.tsx | Nearby Map | ✅ Done |
| (live)/chat.tsx | AI TRAVI Chat | ✅ Done |
| (live)/split.tsx | Split Bill (basic) | ⚠️ Needs full rebuild |

---

## MISSING SCREENS (from Figma App Flow)

### Social / Traveler Chat
| Missing | Description | Priority |
|---------|-------------|----------|
| **Traveler Chat** | Chat between trip members (not AI) — group chat for invited travelers | 🔴 HIGH |
| **Invited Travel Partner Flow** | Accept/decline trip invite, join trip | 🔴 HIGH |

### Trip Management
| Missing | Description | Priority |
|---------|-------------|----------|
| **Trip Detail Screen** | Full trip detail view (from Trips tab) with all bookings | 🔴 HIGH |
| **End-of-Trip Summary** | Post-trip recap: photos, expenses, points earned, memories | 🔴 HIGH |
| **Notifications Screen** | Price drops, trip updates, friend invites, reminders | 🔴 HIGH |

### Booking Details
| Missing | Description | Priority |
|---------|-------------|----------|
| **Flight Details Screen** | View/change flight booking details | 🟡 MEDIUM |
| **Hotel Details Screen** | View/edit hotel booking | 🟡 MEDIUM |
| **Restaurant Details Screen** | View/add restaurant reservation | 🟡 MEDIUM |
| **Add Activity Screen** | Add custom activity to live trip itinerary | 🟡 MEDIUM |

### Wallet / Finance
| Missing | Description | Priority |
|---------|-------------|----------|
| **Split Payment (full)** | Full split with friend avatars, amounts, payment methods | 🔴 HIGH |
| **Subscription Plans** | Free / Plus / Elite comparison with upgrade CTA | 🔴 HIGH |
| **Refer-a-Friend** | Share invite code, track referrals, see rewards | 🟡 MEDIUM |
| **KYC / Balance Withdrawal** | Identity verification + withdraw wallet balance | 🟡 MEDIUM |

### Visual Fixes
| Missing | Description | Priority |
|---------|-------------|----------|
| **Home Hero** | Full-bleed destination photo in top hero section | 🔴 HIGH |
| **Wallet Gamification** | Streak counter, achievement badges, animated level-up | 🔴 HIGH |

---

## BUILD ORDER

1. Traveler Chat screen (app/(live)/traveler-chat.tsx)
2. Full Split Payment rebuild (app/(live)/split.tsx)
3. Notifications screen (app/(tabs)/notifications.tsx)
4. Trip Detail screen (app/(tabs)/trip-detail.tsx)
5. End-of-Trip Summary (app/(trip)/end-summary.tsx)
6. Subscription Plans (app/(tabs)/subscription.tsx)
7. Refer-a-Friend (app/(tabs)/refer.tsx)
8. Flight/Hotel/Restaurant Details (app/(live)/flight-detail.tsx, hotel-detail.tsx, restaurant-detail.tsx)
9. Add Activity (app/(live)/add-activity.tsx)
10. Wallet gamification redesign
11. Home hero redesign
