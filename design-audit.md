# Design Audit Results

## Available Assets
- Mascot: assets/images/mascot-dark.png (duck with sunglasses, pool float, tropical drink)
- Logotype: assets/images/logotype-dark.webp (white TRAVI wordmark for dark bg)
- Destination photos in assets/destinations/: bali, santorini, kyoto, paris, dubai, tokyo, barcelona, amsterdam, iceland, machupicchu, maldives, newyork, patagonia, phuket, rome (all from Unsplash)

## Fonts (loaded in _layout.tsx)
- Chillax-Regular, Chillax-Semibold, Chillax-Bold (headings)
- Satoshi-Regular, Satoshi-Medium, Satoshi-Bold (body)

## Icons
- IconSymbol component maps SF Symbols to MaterialIcons (200+ mappings)
- FontAwesome just installed: @fortawesome/react-native-fontawesome
- Key travel icons available: airplane, hotel, restaurant, location, star, heart, map, calendar, etc.

## Design System Colors
- BG: #1A0B2E (deep purple), Surface: #24103E
- Gradient CTA: #6443F4 → #F94498
- Text: #FFFFFF primary, #D3CFD8 secondary, #A79FB2 tertiary
- Border: rgba(123,68,230,0.25)
- Success: #34D399

## Splash Reference (user's HTML)
- Tropical sunset gradient: #0D0221 → #1A0D3D → #3D1480 → #6443F4 → #F94498 → #FF9327 → #FDCD0A
- Sun with radial glow, palm silhouettes, ocean waves, birds
- Mascot drops in with spring bounce, bobs on water with ripples
- SVG logotype reveals with slide-up, tagline fades in
- 5 loading bars wave animation at bottom

## Routing
- app/index.tsx → Redirect to /(auth)/splash
- Splash navigates to /(auth)/welcome after 2.5s
