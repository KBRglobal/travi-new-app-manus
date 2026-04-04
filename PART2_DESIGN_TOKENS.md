# Part 2 Design Tokens & Component Specs — Reference

## Color Tokens
- bg.base: #1A0B2E
- bg.surface: #24103E
- bg.surface2: #2D1649
- bg.glass: rgba(36,16,62,0.6)
- bg.overlay: rgba(26,11,46,0.95)
- purple: #6443F4
- pink: #F94498
- orange: #FF9327
- green: #02A65C
- text.primary: #FFFFFF
- text.secondary: #D3CFD8
- text.tertiary: #A79FB2
- text.disabled: #504065
- border.default: rgba(123,68,230,0.3)
- border.focus: #6443F4 2px
- border.error: #FF9327 2px
- border.selected: #F94498 2px

## Gradients
- primary: #6443F4 → #F94498 (90°)
- discovery: #6443F4 → #F94498
- planning: #F94498 → #6443F4
- live: #02A65C → #FF9327
- post.trip: #6443F4 → #F94498 (135°)
- image.overlay: transparent → rgba(26,11,46,0.9)

## Typography
- Display: Chillax Bold (H1-H3, amounts, celebrations)
- Body: Satoshi Regular
- Body Medium: Satoshi Medium (nav labels, buttons)
- Body Bold: Satoshi Bold (prices, stats, CTA)
- Mono: Courier New (confirmation numbers)

## Type Scale
- hero: 40px/94%
- h1: 36px/110%
- h2: 32px/110%
- h3: 28px/120%
- h4: 24px/120%
- h5: 20px/130%
- body.lg: 18px/150%
- body.md: 16px/150%
- body.sm: 14px/140%
- caption: 12px/130%
- overline: 10px/160% (all caps + letter-spacing 1.5)

## Spacing
- xs: 4, sm: 8, md: 12, lg: 16, xl: 20, 2xl: 24, 3xl: 32, 4xl: 40

## Border Radius
- sm: 8, md: 12, lg: 16, xl: 20, 2xl: 24, pill: 28, fab: 20, avatar: 9999

## Shadows
- card: 0 8px 24px rgba(100,67,244,0.2)
- cta: 0 8px 16px rgba(249,68,152,0.3)
- fab: 0 8px 16px rgba(249,68,152,0.4)
- modal: 0 16px 48px rgba(0,0,0,0.4)
- green: 0 4px 12px rgba(2,166,92,0.4)
- orange: 0 4px 8px rgba(255,147,39,0.4)
- purple: 0 4px 12px rgba(100,67,244,0.3)

## Key Component Specs
- Primary Button: 56px, radius.pill, gradient.primary, shadow.cta
- Secondary Button: 56px, radius.pill, transparent, border 1px #F94498
- Standard Card: bg.surface, border default, radius.xl, shadow.card
- Glass Card: bg.glass, backdrop-blur 10px, border default, radius.xl
- Input Field: 56px, bg.glass, border default, radius.lg
- Tab Bar: 60px + safe area, bg.surface, active #F94498, inactive #A79FB2
- AI Chat FAB: 64x64, radius.fab (20px NOT circle), gradient.primary, shadow.fab
- Mode Badge: 28px pill, color per mode
- DNA Match Badge: green pill, shadow.green
- Swipe Card: 90% width × 65% height, radius.2xl, 3-card stack

## This document is for DESIGN REFERENCE only.
## Wireframes are built first (current state). Visual design applied later.
