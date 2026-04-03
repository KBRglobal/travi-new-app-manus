# TRAVI Wireframe Spec v2.0 — 77 Screens Reference

Source: /home/ubuntu/upload/TRAVI_Wireframe_Spec_v2.docx

## Complete Screen Index

### Part A — Auth & Onboarding (1-10)
1. Splash Screen — /splash
2. Welcome Screen — /welcome
3. Sign Up — /signup
4. Verify Email — /verify-email
5. Profile Setup — /profile-setup
6. Welcome to TRAVI — /welcome-travi
7. Quick DNA Categories — /quick-dna/categories
8. Quick DNA Swipe — /quick-dna/swipe
9. Quick DNA Schedule — /quick-dna/schedule
10. Quick DNA Summary — /quick-dna/summary

### Part B — Discovery Mode (11-19)
11. Home Dashboard — /home
12. Explore Feed — /explore
13. Search (Modal) — /search
14. Destination Detail — /destination-detail
15. Profile & Settings — /profile
16. DNA Management — /profile/dna
17. Wishlist — /wishlist
18. Notifications Center — /notifications
19. Plan Trip Entry — /plan-trip

### Part C — Planning Mode (20-31)
20. Trip Builder Destination Select — /trip-builder/destination-select
21. Trip Builder Dates & Travelers — /trip-builder/dates-travelers
22. Trip Builder Flight Select — /trip-builder/flight-select
23. Trip Builder Hotel Select — /trip-builder/hotel-select
24. Hotel Detail — /trip-builder/hotel-detail
25. Activity Select Swipe — /trip-builder/activity-select
26. Itinerary Builder — /trip-builder/itinerary-builder
27. Cart / Trip Review — /trip-builder/cart
28. Checkout Phase 1 — /trip-builder/checkout
29. Payment Method Modal — modal overlay
30. Checkout Phase 2 — /trip-builder/checkout-payment
31. Booking Confirmation — /trip-builder/confirmation

### Part D — Pre-Trip Mode (32-34)
32. Pre-Trip Dashboard — /pre-trip/dashboard
33. Pre-Trip Checklist — /pre-trip/checklist
34. Pre-Trip Documents — /pre-trip/documents

### Part E — Live Mode (35-43)
35. Live Dashboard — /live/dashboard
36. Live Timeline — /live/timeline
37. Live Map — /live/map
38. Activity Detail (Live) — /live/activity-detail
39. Expenses Tracker — /live/expenses
40. Memories Gallery — /live/memories
41. AI Chat (Live Concierge) — /live/chat
42. Emergency Contacts — /live/emergency
43. Trip Settings — /live/settings

### Part F — Post-Trip Mode (44-47)
44. Post-Trip Celebration — /post-trip/celebration
45. Trip Summary — /post-trip/summary
46. Rate & Review — /post-trip/review
47. Photo Gallery (Post-Trip) — /post-trip/gallery

### Part G — Universal Screens (48-59)
48. Wallet (Full View) — /wallet
49. Add Funds — /wallet/add-funds
50. Transaction History — /wallet/transactions
51. Split Payment Calculator — /wallet/split
52. KYC Verification — /wallet/kyc
53. Membership & Upgrade — /membership
54. Profile Edit — /profile/edit
55. Settings — /settings
56. Notifications Center (Discovery) — /notifications
57. My Trips — /tabs/trips
58. Wishlist (Full View) — /wishlist
59. Search Results — /search

### Part H+I — Error, Loading & Special (60-77)
60. No Internet Connection — overlay
61. API Error / Server Error — modal
62. Payment Failed — /payment-failed
63. Session Expired — full-screen takeover
64. GPS Permission Denied — banner/modal
65. Camera Permission Denied — modal
66. Help & Support — /support
67. Empty State No Trips — /tabs/trips (0 trips)
68. Empty State No Search Results — /search (0 results)
69. Loading Initial App Load — /splash
70. Loading Matching Engine — overlay
71. Loading Payment Processing — overlay
72. Onboarding First Swipe Tutorial — /tutorial/swipe
73. Onboarding Welcome Tour — /onboarding/tour
74. First DNA Completion Celebration — modal
75. First Booking Success Moment — overlay
76. Change Email / Password — /account/change-email, /account/change-password
77. Delete Account Confirmation — /account/delete

## Global Elements
- Bottom Nav: 5 tabs, 60px + safe area, visible in Discovery only
- AI Chat FAB: 64x64, borderRadius 20, bottom-right, visible everywhere except DNA/checkout
- Mode Badge: header pill showing Planning/Live/Post-Trip
- Emergency Exit: top-left in Live Mode
