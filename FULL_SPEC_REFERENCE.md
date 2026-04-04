# TRAVI Wireframe Spec v2.0 — Full Reference (77 Screens)

## Global Elements
- Bottom Nav: 5 tabs (Home/Trips/Wallet/Explore/Profile), 60px + safe area, Discovery only
- AI Chat FAB: 64x64, borderRadius 20, bottom-right, 16px from right, 80px from bottom
- Emergency Exit: top-left in Live Mode, home icon
- Mode Badge: header pill (Planning/Live/Post-Trip)

## Screen 1 — Splash (/splash)
- Full screen centered, mascot 120x120, logo, tagline, 3 loading dots
- First-time → /welcome (2s hold), Returning → auth check (3s max) → /home or /welcome

## Screen 2 — Welcome (/welcome)
- Skip top-right, Hero 55% full-bleed + gradient overlay, Headline + body + primary button (56px pill) + secondary link
- Primary → /signup, Secondary → /login, Skip → /signup

## Screen 3 — Sign Up (/signup)
- Header 60px (back + Step 1/3), Email + Password + Confirm + Strength bar + Terms checkbox
- Primary button disabled until all valid, Social buttons (Google/Apple), Sign-in link bottom

## Screen 4 — Verify Email (/verify-email)
- Icon 120x120 borderRadius 24, 6 boxes (48x56 each, gap 12), Resend 30s countdown max 3
- Auto-submit on 6th digit (300ms), Error shake ±8px, Back link bottom

## Screen 5 — Profile Setup (/profile-setup)
- Header 60px (back + Step 2/3), Avatar 120x120 circle + Add photo
- 5 fields: First Name, Last Name, DOB (date picker), Phone, Country (searchable picker)

## Screen 6 — Welcome to TRAVI (/welcome-travi)
- Full screen centered, Mascot 160x160, 3 feature pills (72px each), CTA button, Skip link
- Auto-advance 3s to /quick-dna/categories

## Screen 7 — DNA Categories (/quick-dna/categories)
- Header + progress 25%, 8 cards 2-col grid (~140px each), Continue with count, multi-select

## Screen 8 — DNA Swipe (/quick-dna/swipe)
- Header + progress 50% + counter X/20, Card stack 85%x60% (3 z-stacked)
- Nope/Like 64x64 borderRadius 16, Undo 48x48 (max 3), After 20 → /quick-dna/schedule

## Screen 9 — DNA Schedule (/quick-dna/schedule)
- Header + progress 75%, 4 radio option cards (72px each), single-select, Continue

## Screen 10 — DNA Summary (/quick-dna/summary)
- Progress 100%, Mascot 140x140 + confetti, 3 dimension cards, CTA + secondary link

## Screen 11 — Home Dashboard (/home)
- Header 160px gradient (logo + avatar), Quick Actions (Plan Trip full-width 140px + Cashback/Explore 48% 120px each)
- Destinations horizontal scroll (280x380 cards), DNA badge conditional

## Screen 12 — Explore Feed (/explore)
- Header 120px + search bar 48px, Filter chips horizontal, Top Picks (full-width 220px) + Trending (180x240 horizontal) + Hidden Gems (2-col)

## Screen 13 — Search (/search)
- Header 60px (back + search input + Cancel), States: empty/typing/results/no results
- Sort/Filter bottom sheet modals

## Screen 14 — Destination Detail (/destination-detail)
- Hero 50% parallax, Floating header (transparent→solid), DNA badge, stats row
- Sections: Why This For You, Tags, Overview, Photo Gallery (3-col), Best Time (month chips), Top Attractions, Price, Similar Destinations
- Fixed bottom: price + Plan Your Trip CTA

## Screen 15 — Profile & Settings (/profile)
- Header 180px (avatar 80x80 circle + name + email), Grouped menu sections, Logout bottom

## Screen 16 — DNA Management (/profile/dna)
- Header 60px, Hero 200px gradient, 8 dimension cards (120px each, progress bars), Retake section

## Screen 17 — Wishlist (/wishlist)
- Header 60px + Sort, Filter chips, 2-col grid (3:4 ratio), Remove confirm + undo toast, Empty state

## Screen 18 — Notifications (/notifications)
- Header 60px + Mark All Read, Filter tabs, Date-grouped rows (88px min), Swipe-to-delete

## Screen 19 — Plan Trip Entry (/plan-trip)
- Header 60px, Hero 240px gradient, 3 entry method cards (140px each), Drafts + Recent sections

## Screen 20 — Destination Select (/trip-builder/destination-select)
- Gradient header + search, 2-col grid (4:5 ratio), Selection bar slides up on pick

## Screen 21 — Dates & Travelers (/trip-builder/dates-travelers)
- Destination summary 80px, Date cards side-by-side 120px, Travelers card 72px, Flexible toggle
- Date picker modal, Travelers stepper modal

## Screen 22 — Flight Select (/trip-builder/flight-select)
- Flight type tabs, Origin/Dest swap, Class chips, Flight cards 160px, Skip link

## Screen 23 — Hotel Select (/trip-builder/hotel-select)
- Filter chips, Sort + Map toggle, Hotel cards 240px, Skip link

## Screen 24 — Hotel Detail (/trip-builder/hotel-detail)
- Hero 60% swipe gallery, Quick info 80px (4 cols), Room types, Policies accordion, Fixed CTA

## Screen 25 — Activity Select Swipe (/trip-builder/activity-select)
- Progress 8px, Card stack 90%x65%, Skip/Info/Love buttons (56/48/56px, borderRadius 16/12/16)
- 30 cards, Undo max 3, Completion modal

## Screen 26 — Itinerary Builder (/trip-builder/itinerary-builder)
- Trip summary 140px, Day headers sticky, Activity cards 120px, Travel time indicators 40px
- Drag reorder, 3-dot menu, Continue requires ≥3 activities

## Screen 27 — Cart / Trip Review (/trip-builder/cart)
- Accordion sections (Flights/Hotel/Activities), Price summary 240px, Promo code, Terms checkbox

## Screen 28 — Checkout Phase 1 (/trip-builder/checkout)
- Progress steps, Security badge, Price lock timer (MM:SS), Split pay toggle, Confirmation checkbox

## Screen 29 — Payment Method Modal
- 75% bottom sheet, Saved cards + Add new form + Social payments, Radio selection

## Screen 30 — Checkout Phase 2 (/trip-builder/checkout-payment)
- Progress step 2, Billing address, Terms, Pay Now → processing overlay with mascot

## Screen 31 — Booking Confirmation (/trip-builder/confirmation)
- Hero 320px gradient + confetti, Confirmation number (TRAVI-YYMM-XXXXX), What's Next timeline, No back button

## Screen 32 — Pre-Trip Dashboard (/pre-trip/dashboard)
- Header 80px gradient, Countdown card 140px (progress ring), 2x2 quick actions 160px, Live Mode activation card

## Screen 33 — Pre-Trip Checklist (/pre-trip/checklist)
- Progress card 100px, Accordion sections, Checkbox items 28x28, Add custom item, Confetti on 100%

## Screen 34 — Pre-Trip Documents (/pre-trip/documents)
- Status card 100px, Document cards 100px, Status badges (Valid/Pending/Not Added/Expired), Export PDF

## Screen 35 — Live Dashboard (/live/dashboard)
- Activation overlay (once), Header 120px gradient, 2x3 quick actions 88px, Today's Schedule 240px, AI Proactive 140px, Emergency card

## Screen 36 — Live Timeline (/live/timeline)
- Date selector chips, Daily summary, Activity cards 140px with status, Travel time indicators, Rate button

## Screen 37 — Live Map (/live/map)
- Full screen map, Floating header (glass), Map pins (blue user/green activities), Draggable bottom sheet (120px collapsed / 60% expanded)

## Screen 38 — Activity Detail Live (/live/activity-detail)
- Hero 50%, Quick Actions + Booking Details + What to Know + Photos + Nearby
- Context button: Mark as Done / I'm Here / Rate Experience

## Screen 39 — Expenses Tracker (/live/expenses)
- Summary 140px + budget bar, Filter tabs, Date-grouped rows 88px, Add expense modal 70%, Split button

## Screen 40 — Memories Gallery (/live/memories)
- Summary 100px, 3-col grid, Group by Day toggle, Long-press multi-select, Full-screen viewer

## Screen 41 — AI Chat (/live/chat)
- Swipe handle + title, Message bubbles (AI left 40px avatar, User right), Quick chips, Input 72px + mic + send

## Screen 42 — Emergency Contacts (/live/emergency)
- Alert banner 100px red, Contact cards 88px (Call + Message), Share Location card 120px

## Screen 43 — Trip Settings (/live/settings)
- Toggle rows 56px, Preference selectors, Trip Management buttons, Danger Zone (End Trip / Cancel Trip)

## Screen 44 — Post-Trip Celebration (/post-trip/celebration)
- Full screen, Confetti 2s, Stats 2x2, Cashback card 140px, 5 star rating, Shown once

## Screen 45 — Trip Summary (/post-trip/summary)
- Hero 200px photo collage, Highlights scroll 300px, Map summary 220px, Expenses donut 200px, DNA Impact 160px

## Screen 46 — Rate & Review (/post-trip/review)
- 5 large stars 48px each, 5 aspect sliders, Text area 120px (500 chars), Submit success modal

## Screen 47 — Photo Gallery Post-Trip (/post-trip/gallery)
- Album info 100px, Sorting tabs, 3-col grid, Highlight Video, Multi-select long-press

## Screen 48 — Wallet (/wallet)
- Balance card 180px gradient, Cashback card 120px, Quick actions 88px (Send/Request/Split), Transaction rows 88px

## Screen 49 — Add Funds (/wallet/add-funds)
- Balance display, Large amount input, Quick chips (€20/50/100/200), Fee notice, Success modal

## Screen 50 — Transaction History (/wallet/transactions)
- Summary row 80px, Filter chips, Month-grouped rows 96px, Detail modal, Load more

## Screen 51 — Split Payment (/wallet/split)
- Total amount 140px, People section, Equal/Custom toggle, Summary card 100px, Send Requests

## Screen 52 — KYC Verification (/wallet/kyc)
- Why card 140px, 4-step timeline 200px, Upload area 180px with camera guide

## Screen 53 — Membership (/membership)
- Current tier 160px, 3-col comparison table, FAQ accordion, Cancel link

## Screen 54 — Profile Edit (/profile/edit)
- Header 60px (back + Save), Avatar 120px + Change Photo, Personal Info + Location + Travel Prefs + Emergency + About + Privacy + Delete Account

## Screen 55 — Settings (/settings)
- Header 60px, Sections: Account / Notifications / Privacy / App Prefs / AI Settings / Storage / Support / Logout

## Screen 56 — Notifications Center = Screen 18

## Screen 57 — My Trips = Screen in tabs with status tabs + trip cards 200px + FAB + empty state

## Screen 58 — Wishlist Full = Screen 17

## Screen 59 — Search Results = part of Screen 13

## Screens 60-68 — Error/Empty States (overlay/modal/inline components)
- 60: No Internet (cloud-off 120px, Retry)
- 61: API Error (warning triangle 120px, Try Again + Contact Support)
- 62: Payment Failed (modal 400px, error-specific copy)
- 63: Session Expired (modal, cannot dismiss, must sign in)
- 64: GPS Denied (banner 56px in Live)
- 65: Camera Denied (inline in KYC)
- 66: Help & Support (search + 2x2 quick actions + popular topics + contact form)
- 67: Empty No Trips (suitcase + Plan a Trip)
- 68: Empty No Search Results (suggestions + popular + browse categories)

## Screens 69-77 — Loading & Special
- 69: Loading Initial = Splash with mascot 180px + 3 dots
- 70: Loading Matching Engine (mascot magnifier, rotating subtext, progress bar, 30s timeout)
- 71: Loading Payment (mascot credit card, security badge, 90s timeout)
- 72: First Swipe Tutorial (4 steps, spotlight, progress dots, skip)
- 73: Welcome Tour (3 slides horizontal swipe, auto-advance 10s)
- 74: DNA Completion Celebration (confetti, DNA badge 160px, top 3, auto-enable CTA 3s)
- 75: First Booking Success (confetti, trip card 180px, achievement badge, auto-dismiss 5s)
- 76: Change Email/Password (email: 3 fields + verify code, password: 3 fields + requirements checklist)
- 77: Delete Account (warning card, wallet/trips blockers, type DELETE, reason dropdown, final confirm)
