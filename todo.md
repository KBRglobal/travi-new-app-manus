# TRAVI — Full Button Navigation Map
# כל כפתור, כל gesture, כל action → לאן מוביל
# April 2026

---

## app/index.tsx — S1 Splash
| Element | Action | Destination |
|---------|--------|------------|
| Auto | token valid + activeTripId | `/(live)/[tripId]` |
| Auto | token valid, no active trip | `/(tabs)/home` |
| Auto | no token | `/(auth)/welcome` |
| Auto | no network >5s | NoInternet overlay |
| NoInternet "Retry" | tap | re-run token check |

---

## app/(auth)/welcome.tsx — S2
| Element | Action | Destination |
|---------|--------|------------|
| "Get Started" | tap | `/(auth)/signup` |
| "Sign In" | tap | `/(auth)/signup` (login mode) |
| Back gesture | swipe | BLOCKED |

---

## app/(auth)/signup.tsx — S3
| Element | Action | Destination |
|---------|--------|------------|
| "Create Account" | tap (email+pass valid) | `/(auth)/verify-email?email=` |
| Google button | tap | OAuth → new user → `/(auth)/profile-setup` / existing → `/(tabs)/home` |
| Apple button | tap (iOS only) | OAuth → new user → `/(auth)/profile-setup` / existing → `/(tabs)/home` |
| "Sign In" link | tap | same screen, login mode |
| Back `‹` | tap | `/(auth)/welcome` |

---

## app/(auth)/verify-email.tsx — S4
| Element | Action | Destination |
|---------|--------|------------|
| OTP box 6 | fill (auto-submit) | `/(auth)/profile-setup` |
| "Resend Code" | tap (after 30s) | same screen, new code |
| "Wrong email?" | tap | `/(auth)/signup` |
| Back `‹` | tap | `/(auth)/signup` |

---

## app/(auth)/profile-setup.tsx — S5
| Element | Action | Destination |
|---------|--------|------------|
| Avatar circle | tap | ActionSheet: Take Photo / Library / Skip |
| "Take Photo" | tap | camera → crop → back |
| "Library" | tap | image picker → crop → back |
| Country field | tap | `/_modals/country-picker` |
| "Continue" | tap (name valid) | `/(auth)/welcome-travi` |
| Back `‹` | tap | `/(auth)/verify-email` |

---

## app/(auth)/welcome-travi.tsx — S6
| Element | Action | Destination |
|---------|--------|------------|
| "Let's Go →" | tap | `/(auth)/quick-dna/index` |
| "Skip for now" | tap | confirm modal → "/(tabs)/home" |
| Auto | 10s idle | `/(auth)/quick-dna/index` |
| Back gesture | swipe | BLOCKED |

---

## app/(auth)/quick-dna/index.tsx — S7 Categories
| Element | Action | Destination |
|---------|--------|------------|
| Category chip | tap | toggle selected + logSignal |
| "Continue (X selected)" | tap (≥1 selected) | `/(auth)/quick-dna/swipe` |
| Back `‹` | tap | `/(auth)/welcome-travi` |

---

## app/(auth)/quick-dna/swipe.tsx — S8
| Element | Action | Destination |
|---------|--------|------------|
| Card | swipe right | logSignal(like) + next card |
| Card | swipe left | logSignal(reject) + next card |
| ♥ button | tap | logSignal(like) + next card |
| ✕ button | tap | logSignal(reject) + next card |
| "Undo" | tap (visible 3s) | restore prev card |
| Card 30 swiped | auto | `/(auth)/quick-dna/schedule` |
| Back `‹` | tap | `/(auth)/quick-dna/index` |

---

## app/(auth)/quick-dna/schedule.tsx — S9
| Element | Action | Destination |
|---------|--------|------------|
| Option card | tap | select + highlight |
| "Continue" | tap (option selected) | `/(auth)/quick-dna/summary` |
| Back `‹` | tap | `/(auth)/quick-dna/swipe` |

---

## app/(auth)/quick-dna/summary.tsx — S10
| Element | Action | Destination |
|---------|--------|------------|
| "See My Recommendations →" | tap | `/(tabs)/home` + trigger `/_modals/dna-celebration` |
| Back `‹` | tap | `/(auth)/quick-dna/schedule` |

---

## app/(tabs)/home/index.tsx — S11 Home
| Element | Action | Destination |
|---------|--------|------------|
| Logo | tap | scroll to top |
| Avatar (top right) | tap | `/(trip)/profile` |
| Bell icon | tap | `/(trip)/notifications` |
| "Complete DNA" banner | tap | `/(auth)/quick-dna/index` |
| "Complete DNA" banner X | tap | dismiss (sessionStore) |
| Live Trip strip | tap | `/(live)/[activeTripId]` |
| Plan a Trip card | tap | `/(trip)/plan` |
| Cashback card | tap | `/(tabs)/wallet` |
| Explore card | tap | `/(tabs)/explore` |
| Recommendation card | tap | `/(tabs)/home/destination/[id]` |
| Recommendation card | visible >3s (no tap) | logSignal(viewed_not_tapped) |
| Pull to refresh | drag down | invalidate recommendations |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(tabs)/home/destination/[id].tsx — S14 Destination Detail
| Element | Action | Destination |
|---------|--------|------------|
| Back `‹` | tap | previous screen |
| Heart icon | tap | POST/DELETE /wishlist + optimistic toggle |
| Share icon | tap | native share sheet |
| "Plan Your Trip" | tap | `/(trip)/plan/destination?id=` |
| "Why this matches" | tap | expand DNA breakdown modal |
| Tab: Activities | tap | scroll to activities section |
| Tab: Hotels | tap | scroll to hotels section |
| Activity card | tap | `/(trip)/plan/activities?preview=actId` |
| Hotel card | tap | `/(trip)/plan/hotel/[id]` |
| Map thumbnail | tap | `/(tabs)/explore` (map mode) |
| Scroll past 200px | auto | floating header appears |
| Back gesture | swipe | previous screen + log detail_view_no_booking |

---

## app/(tabs)/explore/index.tsx — S12 Explore
| Element | Action | Destination |
|---------|--------|------------|
| Search bar | tap | `/(tabs)/home/search` |
| Filter chip | tap | filter results in-place |
| Destination card | tap | `/(tabs)/explore/destination/[id]` |
| Pull to refresh | drag | refresh results |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(tabs)/home/search.tsx — S13 Search
| Element | Action | Destination |
|---------|--------|------------|
| Input | auto-focus | keyboard opens |
| Input typing | keystroke | GET /search/suggestions (debounce 300ms) |
| Suggestion row | tap | `/(tabs)/home/search-results?q=` |
| Recent search row | tap | `/(tabs)/home/search-results?q=` |
| Recent search X | tap | delete from recents |
| "Cancel" | tap | back to previous |
| Submit (keyboard) | tap | `/(tabs)/home/search-results?q=` |

---

## app/(tabs)/trips/index.tsx — S57 My Trips
| Element | Action | Destination |
|---------|--------|------------|
| Filter tab: Upcoming | tap | filter list |
| Filter tab: Active | tap | filter list |
| Filter tab: Past | tap | filter list |
| Filter tab: Cancelled | tap | filter list |
| Trip card (upcoming) | tap | `/(trip)/pre/[tripId]` |
| Trip card (active) | tap | `/(live)/[tripId]` |
| Trip card (completed) | tap | `/(trip)/post/[tripId]/celebration` |
| Trip card (draft) | tap | `/(trip)/plan/destination` |
| Trip card | long press | ActionSheet: Continue / Share / Delete |
| "+" FAB | tap | `/(trip)/plan` |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(tabs)/wallet/index.tsx — S48 Wallet
| Element | Action | Destination |
|---------|--------|------------|
| "Add Funds" | tap | `/(trip)/wallet/add-funds` |
| "Withdraw" | tap | withdrawal modal |
| "Split Pay" | tap | `/(trip)/wallet/split` |
| "Transactions" | tap | `/(trip)/wallet/transactions` |
| Payment method row | tap | edit payment method modal |
| "Add Payment Method" | tap | `/_modals/payment-method` |
| KYC banner | tap | `/(trip)/wallet/kyc` |
| Transaction row | tap | transaction detail modal |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(tabs)/points/index.tsx — S91 Points Dashboard
| Element | Action | Destination |
|---------|--------|------------|
| "Redeem" | tap | `/(trip)/points/redeem` |
| "Earn" | tap | `/(trip)/points/earn` |
| "History" | tap | `/(trip)/points/transactions` |
| "Perks" | tap | `/(trip)/points/perks` |
| "Referrals" | tap | `/(trip)/points/referrals` |
| AI recommendation card | tap | `/(trip)/points/redeem/partner/[id]` |
| Partner logo | tap | `/(trip)/points/redeem/partner/[id]` |
| Featured deal | tap | `/(trip)/points/redeem/index` |
| Tier badge | tap | `/(trip)/membership` |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(tabs)/social/index.tsx — S78 Community Feed
| Element | Action | Destination |
|---------|--------|------------|
| "Discover" | tap | `/(social)/discover` |
| "Messages" icon | tap | `/(social)/messages` |
| "Buddies" | tap | `/(social)/buddies` |
| Post card avatar | tap | `/(social)/profile/[userId]` |
| Post card ♥ | tap | like + haptic (optimistic) |
| Post card 💬 | tap | comments bottom sheet |
| Post card share | tap | native share sheet |
| Story avatar | tap | story viewer full-screen |
| "+" create post | tap | create post modal |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(trip)/plan/index.tsx — S19 Plan Trip Entry
| Element | Action | Destination |
|---------|--------|------------|
| Draft card | tap | `/(trip)/plan/destination` (continue draft) |
| Draft card | long press | ActionSheet: Continue / Delete |
| "Start New Trip" | tap | `/(trip)/plan/destination` |
| Back `‹` | tap | `/(tabs)/trips` + show tab bar |

---

## app/(trip)/plan/destination.tsx — S20
| Element | Action | Destination |
|---------|--------|------------|
| Search input | tap | auto-focus |
| Search input typing | keystroke | GET /destinations/search (debounce 300ms) |
| Search suggestion | tap | select destination |
| Popular card | tap | select destination |
| DNA match card | tap | select destination |
| "Continue" | tap (destination selected) | `/(trip)/plan/dates` |
| Back `‹` | tap | `/(trip)/plan/index` |

---

## app/(trip)/plan/dates.tsx — S21
| Element | Action | Destination |
|---------|--------|------------|
| Calendar day | tap | set check-in (first tap) / check-out (second tap) |
| Calendar range | select | highlight range |
| Adults "+" | tap | increment |
| Adults "-" | tap | decrement (min 1) |
| Children "+" | tap | increment |
| Children "-" | tap | decrement (min 0) |
| "Continue" | tap (range selected) | `/(trip)/plan/flights` |
| Back `‹` | tap | `/(trip)/plan/destination` |

---

## app/(trip)/plan/flights.tsx — S22
| Element | Action | Destination |
|---------|--------|------------|
| Sort: DNA Match | tap | re-sort list |
| Sort: Price | tap | re-sort list |
| Sort: Duration | tap | re-sort list |
| Filter icon | tap | `/_modals/filter-sheet` |
| Swap button (↕) | tap | swap origin/destination + rotate 180° |
| "Flexible Dates" tab | tap | calendar heatmap view |
| Flight card | tap | expand detail accordion |
| "Select" on expanded | tap | select + `/(trip)/plan/hotels` |
| "Skip Flights" | tap | `/(trip)/plan/hotels` |
| First Class locked icon | tap | `/(trip)/membership` modal |
| Back `‹` | tap | `/(trip)/plan/dates` |

---

## app/(trip)/plan/hotels.tsx — S23
| Element | Action | Destination |
|---------|--------|------------|
| Filter chip | tap | filter results |
| Sort button | tap | sort bottom sheet |
| Map toggle | tap | toggle map/list view |
| Hotel card | tap | `/(trip)/plan/hotel/[id]` |
| Hotel card heart | tap | add to wishlist |
| "Skip Hotels" | tap | `/(trip)/plan/activities` |
| Back `‹` | tap | `/(trip)/plan/flights` |

---

## app/(trip)/plan/hotel/[id].tsx — S24
| Element | Action | Destination |
|---------|--------|------------|
| Image | swipe | next image in gallery |
| Gallery dots | tap | jump to image |
| Room type row | tap | expand room detail |
| "Select This Room" | tap | select + `/(trip)/plan/activities` |
| Heart icon | tap | add to wishlist |
| Map thumbnail | tap | full map modal |
| "Reviews" tab | tap | scroll to reviews |
| Back `‹` | tap | `/(trip)/plan/hotels` |

---

## app/(trip)/plan/activities.tsx — S25
| Element | Action | Destination |
|---------|--------|------------|
| Card | swipe right | add to itinerary + logSignal(like) |
| Card | swipe left | skip + logSignal(reject) |
| ♥ button | tap | add to itinerary |
| ✕ button | tap | skip |
| "Undo" | tap | restore last card |
| Card 30 done | auto | `/(trip)/plan/itinerary` |
| Back `‹` | tap | confirm → `/(trip)/plan/hotels` |

---

## app/(trip)/plan/itinerary.tsx — S26
| Element | Action | Destination |
|---------|--------|------------|
| Activity row | long press | enable drag mode |
| Activity row | drag | reorder within day + haptic |
| Activity row | tap | activity detail expand |
| Activity row time | tap | time picker bottom sheet |
| "+" day section | tap | add activity search |
| Activity X | tap | remove from itinerary |
| "Add Activity" | tap | search modal |
| Travel time chip | tap | transit options panel |
| "Review Cart →" | tap | `/(trip)/plan/cart` |
| Back `‹` | tap | confirm "Leave? Draft saved" → `/(trip)/plan/activities` |

---

## app/(trip)/plan/cart.tsx — S27
| Element | Action | Destination |
|---------|--------|------------|
| Section accordion | tap | expand/collapse |
| Item X | tap | remove item + recalculate |
| "Add Promo Code" | tap | promo input expand |
| Promo "Apply" | tap | POST /cart/promo → green ✓ / orange ✗ |
| Payment method row | tap | `/_modals/payment-method` |
| "Split Pay" toggle | tap | show split options |
| Terms checkbox | tap | toggle (required to proceed) |
| "Proceed to Checkout →" | tap (terms checked) | `/(trip)/plan/checkout` |
| Back `‹` | tap | confirm "Leave? Cart saved 15min" → `/(trip)/plan/itinerary` |

---

## app/(trip)/plan/checkout.tsx — S28
| Element | Action | Destination |
|---------|--------|------------|
| Timer (15:00) | auto | counts down, pulse at 5:00 |
| Timer expires | auto | "Price expired" modal → "Refresh" → S27 |
| "Change Payment" | tap | `/_modals/payment-method` |
| "Split with Friends" | tap | split flow modal |
| "Pay [amount]" | tap | `/(trip)/plan/payment` |
| Back `‹` | tap | confirm "Leave? Cart saved 15min" → S27 |

---

## app/(trip)/plan/payment.tsx — S30
| Element | Action | Destination |
|---------|--------|------------|
| Processing | auto | Stripe confirmPayment() |
| Success | auto | `/(trip)/plan/confirmation` |
| Failure | auto | `/(trip)/plan/payment-failed` |
| Back gesture | swipe | BLOCKED |
| Android back | press | Alert "Payment in progress" |

---

## app/(trip)/plan/confirmation.tsx — S31
| Element | Action | Destination |
|---------|--------|------------|
| Auto (first booking) | mount | `/_modals/first-booking` overlays |
| "Copy" booking ref | tap | copy to clipboard + toast |
| "Add to Calendar" | tap | Expo Calendar API |
| "Share" | tap | native share sheet |
| "View Itinerary" | tap | `/(trip)/pre/[tripId]` |
| "Go to My Trips" | tap | `/(tabs)/trips` + show tab bar |
| Back gesture | swipe | BLOCKED |
| Back button | hidden | — |

---

## app/(trip)/plan/payment-failed.tsx — S62
| Element | Action | Destination |
|---------|--------|------------|
| "Try Different Card" | tap | `/_modals/payment-method` → retry S30 |
| "Try Again" | tap | `/(trip)/plan/payment` |
| "Contact Support" | tap | `/(trip)/settings/support` |
| "Go Home" | tap | `/(tabs)/home` + show tab bar |
| Back `‹` | tap | `/(trip)/plan/checkout` |

---

## app/(trip)/pre/[tripId]/index.tsx — S32 Pre-Trip Dashboard
| Element | Action | Destination |
|---------|--------|------------|
| "Checklist" card | tap | `/(trip)/pre/[tripId]/checklist` |
| "Documents" card | tap | `/(trip)/pre/[tripId]/documents` |
| "Booking Details" card | tap | booking detail expand |
| Flight summary | tap | booking detail |
| Hotel summary | tap | booking detail |
| "Activate Now" | tap (enabled <48h) | confirm modal → `/(live)/[tripId]` |
| "Activate Now" | tap (disabled >48h) | tooltip "Available 48h before departure" |
| Back `‹` | tap | `/(tabs)/trips` + show tab bar |

---

## app/(trip)/pre/[tripId]/checklist.tsx — S33
| Element | Action | Destination |
|---------|--------|------------|
| Section header | tap | expand/collapse accordion |
| Checkbox | tap | toggle + PATCH /checklist + optimistic |
| "Add Item" "+" | tap | inline text input appears |
| Item X | tap | delete item |
| 100% complete | auto | confetti + toast |
| Back `‹` | tap | `/(trip)/pre/[tripId]` |

---

## app/(trip)/pre/[tripId]/documents.tsx — S34
| Element | Action | Destination |
|---------|--------|------------|
| Document row "Upload" | tap | ActionSheet: Camera / Library |
| Document row "View" | tap | full-screen image viewer |
| Full-screen image | pinch | zoom |
| Full-screen image | swipe down | dismiss |
| "Export All as PDF" | tap | generate PDF → share sheet |
| Back `‹` | tap | `/(trip)/pre/[tripId]` |

---

## app/(live)/[tripId]/index.tsx — S35 Live Dashboard
| Element | Action | Destination |
|---------|--------|------------|
| Emergency exit (top-left) | tap | Alert "Exit Live Mode?" → `/(tabs)/home` |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |
| Quick Action: Timeline | tap | `/(live)/[tripId]/timeline` |
| Quick Action: Map | tap | `/(live)/[tripId]/map` |
| Quick Action: Expenses | tap | `/(live)/[tripId]/expenses` |
| Quick Action: Memories | tap | `/(live)/[tripId]/memories` |
| Quick Action: Emergency | tap | `/(live)/[tripId]/emergency` |
| Quick Action: Tax | tap | `/(live)/[tripId]/tax` |
| Quick Action: Settings | tap | `/(live)/[tripId]/settings` |
| Current activity card | tap | `/(live)/[tripId]/activity/[actId]` |
| Activity card "Navigate" | tap | `react-native-map-link` → external maps |
| AI message card | tap | `/_modals/ai-chat` |
| AI message card X | tap | dismiss |

---

## app/(live)/[tripId]/timeline.tsx — S36
| Element | Action | Destination |
|---------|--------|------------|
| Date chip | tap | scroll to day |
| Activity row | tap | `/(live)/[tripId]/activity/[actId]` |
| Activity "Navigate" | tap | external maps app |
| Activity "Rate" | tap | `/_modals/quick-rating` |
| Travel time chip | tap | transit detail expand |
| Back `‹` | tap | `/(live)/[tripId]/index` |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(live)/[tripId]/map.tsx — S37
| Element | Action | Destination |
|---------|--------|------------|
| Activity pin | tap | bottom sheet: activity card |
| Activity card (sheet) | tap | `/(live)/[tripId]/activity/[actId]` |
| "Start Navigation" | tap | `react-native-map-link` picker |
| Bottom sheet drag | swipe up/down | expand/collapse (3 snap points) |
| User location | tap | center map on user |
| Back `‹` | tap | `/(live)/[tripId]/index` |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(live)/[tripId]/activity/[actId].tsx — S38
| Element | Action | Destination |
|---------|--------|------------|
| "I'm Here" check-in | tap | POST /activities/:id/checkin + haptic |
| QR code | tap | full-screen QR modal |
| Full-screen QR | tap | dismiss |
| "Add Photo" | tap | expo-image-picker → upload → S40 |
| "Rate Experience" | tap | `/_modals/quick-rating` |
| "Navigate" | tap | `react-native-map-link` |
| "Nearby Stories" | tap | audio player expand |
| Audio play | tap | expo-av play |
| Back `‹` | tap | previous screen |
| FAB (AI Chat) | tap | `/_modals/ai-chat` |

---

## app/(live)/[tripId]/expenses.tsx — S39
| Element | Action | Destination |
|---------|--------|------------|
| "+" FAB | tap | add expense bottom sheet |
| Expense row | tap | expense detail edit |
| Category chip | tap | filter by category |
| Currency converter | tap | expand mini converter |
| "Split" | tap | `/(trip)/wallet/split` |
| Receipt scan | tap | T2 Camera |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## app/(live)/[tripId]/memories.tsx — S40
| Element | Action | Destination |
|---------|--------|------------|
| Photo | tap | full-screen viewer |
| Full-screen | swipe left/right | next/prev photo |
| Full-screen | swipe down | dismiss |
| Full-screen | pinch | zoom |
| "+" upload | tap | expo-image-picker → S3 upload |
| "Share Album" | tap | generate public URL → native share |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## app/(live)/[tripId]/emergency.tsx — S42
| Element | Action | Destination |
|---------|--------|------------|
| Phone number | tap | `Linking.openURL('tel:...')` |
| SMS number | tap | `Linking.openURL('sms:...')` |
| "Share My Location" | tap | generate location link → native share |
| Embassy row | tap | embed map + phone |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## app/(live)/[tripId]/settings.tsx — S43
| Element | Action | Destination |
|---------|--------|------------|
| "Download PDF" | tap | generate trip PDF → share sheet |
| "End Trip Early" | tap | confirm modal → `/(trip)/post/[tripId]/celebration` |
| "Cancel Trip" | tap | refund estimate modal → confirm → cancel API |
| Notifications toggle | tap | toggle push for this trip |
| AI level slider | drag | set AI verbosity |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## app/(live)/[tripId]/tax/index.tsx — T1
| Element | Action | Destination |
|---------|--------|------------|
| "+" FAB | tap | `/(live)/[tripId]/tax/add` |
| Threshold card | tap | expand breakdown |
| VAT Refund card | tap | `/(live)/[tripId]/tax/vat` |
| "Must Declare" card | tap | expand items |
| "Country Rules" | tap | `/(live)/[tripId]/tax/rules` |
| "Pre-Flight" | tap | `/(live)/[tripId]/tax/checklist` |
| Purchase row | tap | `/_modals/purchase-detail` |
| Currency rate | tap | expand converter |
| Back `‹` | tap | `/(live)/[tripId]/index` |

---

## app/(live)/[tripId]/tax/add.tsx — T2
| Element | Action | Destination |
|---------|--------|------------|
| Tab: Receipt | tap | receipt mode |
| Tab: Price Tag | tap | price tag mode |
| Capture button | tap | capture → `/(live)/[tripId]/tax/review` |
| Flash toggle | tap | toggle flash |
| "Add Manually" | tap | `/(live)/[tripId]/tax/review` (empty) |
| Back X | tap | `/(live)/[tripId]/tax` |

---

## app/(live)/[tripId]/tax/review.tsx — T3
| Element | Action | Destination |
|---------|--------|------------|
| Store name field | tap | inline edit |
| Item price | tap | inline edit |
| Category | tap | `/_modals/category-picker` |
| Gift toggle | tap | toggle |
| Tax-Free toggle | tap | mark all eligible |
| Item X | tap | delete item |
| "+ Add Item" | tap | new empty row |
| "Save Purchases" | tap | POST /purchases → T1 |
| "Discard" | tap | confirm → T1 |
| Back X | tap | confirm → T1 |

---

## app/(live)/[tripId]/tax/checklist.tsx — T6
| Element | Action | Destination |
|---------|--------|------------|
| Checkbox | tap | toggle + animate |
| "Download PDF" | tap | generate → share sheet |
| "Add to Reminders" | tap | Expo Calendar / Notifications |
| "Customs Form" | tap | `/(live)/[tripId]/tax/form` |
| Back `‹` | tap | `/(live)/[tripId]/tax` |

---

## app/(trip)/post/[tripId]/celebration.tsx — S44
| Element | Action | Destination |
|---------|--------|------------|
| "Rate Your Trip" | tap | `/(trip)/post/[tripId]/review` |
| "View Summary" | tap | `/(trip)/post/[tripId]/summary` |
| "Share Cashback" | tap | native share sheet |
| Back gesture | swipe | BLOCKED |
| Tap anywhere | tap | — (no dismiss) |

---

## app/(trip)/post/[tripId]/summary.tsx — S45
| Element | Action | Destination |
|---------|--------|------------|
| "Gallery" | tap | `/(trip)/post/[tripId]/gallery` |
| "Rate & Review" | tap | `/(trip)/post/[tripId]/review` |
| "Book Similar" | tap | `/(trip)/plan/destination?similar=tripId` |
| Countries visited map | tap | expand to full-screen |
| DNA impact card | tap | `/(trip)/profile/dna` |
| Static map | tap | `/(live)/[tripId]/map` (read-only) |
| Back `‹` | tap | `/(trip)/post/[tripId]/celebration` |

---

## app/(trip)/post/[tripId]/review.tsx — S46
| Element | Action | Destination |
|---------|--------|------------|
| Star rating | tap | set overall score |
| Aspect sliders | drag | set aspect scores |
| "Add Photo" | tap | expo-image-picker |
| Public/Private toggle | tap | toggle visibility |
| "Submit Review" | tap | POST /reviews → toast → `/(tabs)/home` + show tab bar |
| Back `‹` | tap | `/(trip)/post/[tripId]/summary` |

---

## app/(trip)/post/[tripId]/gallery.tsx — S47
| Element | Action | Destination |
|---------|--------|------------|
| Photo | tap | full-screen viewer |
| "Generate Highlight Video" | tap | start job → poll → show when ready |
| "Download All" | tap | expo-media-library save |
| "Share Album" | tap | public URL → native share |
| Back `‹` | tap | `/(trip)/post/[tripId]/summary` |

---

## app/(trip)/wallet/add-funds.tsx — S49
| Element | Action | Destination |
|---------|--------|------------|
| Amount presets (€10/20/50/100) | tap | fill amount |
| Custom amount | type | fill amount |
| Fee display | — | updates as amount changes |
| "Add €[amount]" | tap | Stripe PaymentIntent → process |
| Success | auto | toast + `/(tabs)/wallet` |
| Back `‹` | tap | `/(tabs)/wallet` |

---

## app/(trip)/wallet/split.tsx — S51
| Element | Action | Destination |
|---------|--------|------------|
| "Equal Split" | tap | auto-divide |
| "Custom" | tap | per-person input |
| Participant row "+" | tap | add participant |
| Participant X | tap | remove |
| "Share Link" | tap | generate link → native share |
| "WhatsApp" | tap | `Linking.openURL(whatsapp://...)` |
| "SMS" | tap | `Linking.openURL(sms:...)` |
| Payment status | auto poll | update per participant |
| Back `‹` | tap | `/(tabs)/wallet` |

---

## app/(trip)/points/redeem/index.tsx — S92 Redeem Hub
| Element | Action | Destination |
|---------|--------|------------|
| "Airline Miles" | tap | `/(trip)/points/redeem/airline-miles` |
| "Gift Cards" | tap | `/(trip)/points/redeem/gift-cards` |
| "Cashback" | tap | cashback redeem modal |
| Featured deal | tap | `/(trip)/points/redeem/partner/[id]` |
| Back `‹` | tap | `/(tabs)/points` |

---

## app/(trip)/points/redeem/partner/[id].tsx — S94
| Element | Action | Destination |
|---------|--------|------------|
| Transfer slider | drag | set amount |
| CPP calculator | — | updates value display |
| "Transfer Points" | tap | IRREVERSIBLE warning modal |
| Warning "Confirm" | tap | POST /points/transfer → S100 |
| Warning "Cancel" | tap | dismiss |
| borski AI card | tap | expand full recommendation |
| Back `‹` | tap | `/(trip)/points/redeem/airline-miles` |

---

## app/(trip)/points/redeem/confirm.tsx — S100
| Element | Action | Destination |
|---------|--------|------------|
| Auto 5s | auto | `/(tabs)/points` |
| "Done" | tap | `/(tabs)/points` |
| Confetti | auto | plays on mount |
| Back gesture | swipe | BLOCKED |

---

## app/(trip)/points/referrals.tsx — S99
| Element | Action | Destination |
|---------|--------|------------|
| "Copy Link" | tap | copy to clipboard + toast |
| "Share" | tap | native share sheet |
| "WhatsApp" | tap | `Linking.openURL(whatsapp://...)` |
| "SMS" | tap | `Linking.openURL(sms:...)` |
| Friend row | tap | friend detail expand |
| "How it works" | tap | expand 3-step guide |
| Back `‹` | tap | `/(tabs)/points` |

---

## app/(trip)/membership.tsx — S53
| Element | Action | Destination |
|---------|--------|------------|
| Tier card | tap | expand features |
| "Upgrade to [tier]" | tap | Stripe subscription modal |
| "Start Free Trial" | tap | trial start modal |
| "Compare Plans" | tap | comparison table modal |
| Current tier badge | — | highlighted |
| Back `‹` | tap | previous screen |

---

## app/(trip)/profile/index.tsx — S15 Profile
| Element | Action | Destination |
|---------|--------|------------|
| "Edit Profile" | tap | `/(trip)/profile/edit` |
| "Travel DNA" | tap | `/(trip)/profile/dna` |
| "Wishlist" | tap | `/(trip)/wishlist` |
| "Membership" | tap | `/(trip)/membership` |
| "Settings" | tap | `/(trip)/settings` |
| "Help & Support" | tap | `/(trip)/settings/support` |
| "Sign Out" | tap | confirm modal → clear SecureStore → `/(auth)/welcome` |
| Back `‹` | tap | previous tab |

---

## app/(trip)/settings/index.tsx — S55
| Element | Action | Destination |
|---------|--------|------------|
| Notifications toggle | tap | toggle + Permissions |
| Biometric toggle | tap | Face ID / Touch ID prompt |
| Location "Manage" | tap | `Linking.openSettings()` |
| "Change Email" | tap | `/(trip)/account/change-email` |
| "Change Password" | tap | `/(trip)/account/change-password` |
| "Clear Cache" | tap | confirm → clear + toast |
| "Delete Account" | tap | `/(trip)/account/delete` |
| Back `‹` | tap | `/(trip)/profile` |

---

## app/(social)/discover/index.tsx — S79
| Element | Action | Destination |
|---------|--------|------------|
| "Swipe Mode" | tap | `/(social)/discover/swipe` |
| Traveler card | tap | `/(social)/profile/[userId]` |
| Compatibility badge | tap | `/(social)/compatibility/[userId]` |
| Filter chip | tap | filter results |
| Back `‹` | tap | `/(tabs)/social` |

---

## app/(social)/discover/swipe.tsx — S81
| Element | Action | Destination |
|---------|--------|------------|
| Card | swipe right | POST /social/connect + haptic |
| Card | swipe left | log skip |
| ♥ button | tap | POST /social/connect |
| ✕ button | tap | skip |
| Card avatar | tap | `/(social)/profile/[userId]` |
| Back `‹` | tap | `/(social)/discover` |

---

## app/(social)/profile/[userId].tsx — S82
| Element | Action | Destination |
|---------|--------|------------|
| "See Compatibility" | tap | `/(social)/compatibility/[userId]` |
| "Connect" | tap | `/_modals/connect-flow` |
| "Message" | tap | `/(social)/messages/[convId]` |
| DNA dimension | tap | expand description |
| Trip card | tap | destination detail |
| Back `‹` | tap | previous screen |

---

## app/(social)/messages/index.tsx — S84
| Element | Action | Destination |
|---------|--------|------------|
| Conversation row | tap | `/(social)/messages/[convId]` |
| Conversation row | swipe left | delete conversation |
| "New Message" | tap | new conversation search |
| Search bar | tap | search conversations |
| Back `‹` | tap | `/(tabs)/social` |

---

## app/(social)/messages/[convId].tsx — S85
| Element | Action | Destination |
|---------|--------|------------|
| Avatar | tap | `/(social)/profile/[userId]` |
| Message bubble long press | press | ActionSheet: Copy / Delete / React |
| Trip share card | tap | `/(tabs)/home/destination/[id]` |
| "+" attachment | tap | ActionSheet: Photo / Location / Trip |
| Send button | tap | POST /messages + clear input |
| Keyboard | opens | adjustResize |
| Back `‹` | tap | `/(social)/messages` |

---

## app/_modals/ai-chat.tsx — S41
| Element | Action | Destination |
|---------|--------|------------|
| Swipe down | swipe | dismiss modal |
| X button | tap | dismiss modal |
| Quick chip | tap | fill input + send |
| Send button | tap | POST /ai/chat |
| Voice button | tap | speech-to-text |
| AI suggestion card | tap | deep link (e.g. → S14) |
| Message long press | press | copy to clipboard |

---

## app/_modals/payment-method.tsx — S29
| Element | Action | Destination |
|---------|--------|------------|
| Saved card row | tap | select + return to caller |
| "Add New Card" | tap | Stripe CardField |
| "Save Card" | tap | save + select + return |
| Apple Pay | tap | select + return |
| Google Pay | tap | select + return |
| X / Cancel | tap | dismiss, no change |

---

## app/_modals/session-expired.tsx — S63
| Element | Action | Destination |
|---------|--------|------------|
| Biometric prompt | auto | Face ID / Touch ID |
| Biometric success | auto | restore lastRoute |
| "Sign In Again" | tap | `/(auth)/signup` (login mode) |
| "Start Fresh" | tap | clear all + `/(auth)/welcome` |
| Back gesture | swipe | BLOCKED |

---

## Global — Tab Bar (כל מסך Discovery)
| Element | Action | Destination |
|---------|--------|------------|
| Tab 1: Home | tap | `/(tabs)/home` |
| Tab 2: Trips | tap | `/(tabs)/trips` |
| Tab 3: Wallet | tap | `/(tabs)/wallet` |
| Tab 4: Explore | tap | `/(tabs)/explore` |
| Tab 5: Points | tap | `/(tabs)/points` |
| Tab 6: Social | tap | `/(tabs)/social` |

---

*TRAVI · Full Button Navigation Map · April 2026*
*כל כפתור · כל gesture · כל action → destination*