# Part 3 Spec Notes — Social Layer (78-90) + TRAVI Points (91-100)

## Social Layer Screens (78-90)
- 78: Community Feed — /social/feed — stories row, posts, DNA match badges
- 79: Discover Travelers — /social/discover — 2-col masonry grid, filter chips, connect button
- 80: Travel Compatibility Score — /social/compatibility — versus section, score ring, dimension comparison
- 81: Traveler Card Swipe — /social/discover/swipe — same swipe stack as activity select
- 82: Traveler Profile — /social/profile/:userId — hero, DNA comparison, travel highlights
- 83: Match/Connect Flow — modal sequence (request, pending, accepted)
- 84: Messages List — /social/messages — active travelers row, conversation rows
- 85: Chat Screen — /social/chat/:conversationId — bubbles, compatibility bar
- 86: Travel Buddies — /social/buddies — active/planning/past trips with buddies
- 87-90: Story viewer, group trip social, notifications social, blocked users (implied from index)

## TRAVI Points Screens (91-100)
- 91: Points Dashboard — /points — hero balance, promo cards, products grid, transactions
- 92: Redeem Points Hub — /points/redeem — featured rewards, 6 categories
- 93: Airline Miles — /points/airline-miles — linked airlines, all airlines, transfer history
- 94: Partner/Airline Detail — /points/partner/:id — hero, transfer rate, how it works
- 95: Gift Cards — /points/gift-cards — 2-col brand cards, purchase modal
- 96: Earn Points Guide — /points/earn — hero, earn categories, promotions
- 97: Points Transactions — /points/transactions — summary, filter, grouped by date
- 98: Plan Perks (Tier Benefits) — /points/perks — tier hero, active perks, upgrade
- 99: Earn from Referrals — /points/referrals — referral code, steps, referred users
- 100: Points Redemption Confirmation — /points/redeem/confirm — full-screen success

## Navigation Update
- Tab bar changes from 5 to 6 tabs:
  1. Home (home) → /home
  2. Explore (compass) → /explore
  3. Trips (airplane) → /tabs/trips
  4. Social (account-group) → /social/feed
  5. Points (hexagon-multiple) → /points
  6. Wallet (wallet) → /wallet
