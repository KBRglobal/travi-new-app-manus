/**
 * TRAVI Design System — Single Source of Truth
 * Based on Phase 1 Part 2 spec + approved Home Dashboard visual DNA
 * 
 * RULES:
 * - Background: #0A0514 solid (NOT #1A0B2E from spec — user approved #0A0514)
 * - No gradient backgrounds on screens (only on headers/cards/CTAs)
 * - All cards: glass style with BlurView
 * - No emoji — MaterialIcons only
 * - Fonts: Chillax-Bold for headings, Satoshi for body
 */

// ─── Colors ───────────────────────────────────────────────────────────────────
export const Colors = {
  // Backgrounds
  bg: {
    base: '#0A0514',        // Screen background (user-approved, overrides spec #1A0B2E)
    surface: '#24103E',     // Cards, elevated elements
    surface2: '#2D1649',    // Pressed states
    glass: 'rgba(36,16,62,0.6)',   // Glass cards
    overlay: 'rgba(10,5,20,0.95)', // Full-screen overlays
    overlayMd: 'rgba(10,5,20,0.85)',
  },

  // Brand
  purple: '#6443F4',
  pink: '#F94498',
  orange: '#FF9327',
  green: '#02A65C',
  blue: '#2196F3',   // AI Chat only — distinct from brand purple

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#D3CFD8',
    tertiary: '#A79FB2',
    disabled: '#504065',
  },

  // Borders
  border: {
    default: 'rgba(123,68,230,0.3)',
    focus: '#6443F4',
    error: '#FF9327',
    selected: '#F94498',
  },

  // State
  state: {
    success: '#02A65C',
    warning: '#FF9327',
    error: '#FF6B6B',
    info: '#6443F4',
  },

  // Points
  points: {
    gold: '#FFD700',
    bg: 'rgba(255,215,0,0.08)',
    border: 'rgba(255,215,0,0.25)',
  },
} as const;

// ─── Gradients ────────────────────────────────────────────────────────────────
export const Gradients = {
  primary: ['#6443F4', '#F94498'] as const,        // 90° — CTAs, FAB
  discovery: ['#6443F4', '#F94498'] as const,       // Discovery header
  planning: ['#F94498', '#6443F4'] as const,        // Planning header
  live: ['#02A65C', '#FF9327'] as const,            // Live header
  postTrip: ['#6443F4', '#F94498'] as const,        // Post-trip header (135°)
  imageOverlay: ['transparent', 'rgba(10,5,20,0.9)'] as const,
  points: ['#FF9327', '#FFD700'] as const,

  // DNA dimension gradients
  explorer: ['#6443F4', '#8B5CF6'] as const,
  foodie: ['#FF9327', '#FFAA00'] as const,
  adventurer: ['#02A65C', '#10B981'] as const,
  culturalist: ['#F94498', '#EC4899'] as const,
  luxurist: ['#6443F4', '#7C3AED'] as const,
  planner: ['#02A65C', '#059669'] as const,
  social: ['#FF9327', '#FB923C'] as const,
  spontaneous: ['#F94498', '#F472B6'] as const,
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const Typography = {
  fonts: {
    display: 'Chillax-Bold',
    body: 'Satoshi-Regular',
    bodyMd: 'Satoshi-Medium',
    bodyBold: 'Satoshi-Bold',
    mono: 'Courier New',
  },
  sizes: {
    hero: 40,
    h1: 36,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 20,
    bodyLg: 18,
    bodyMd: 16,
    bodySm: 14,
    caption: 12,
    overline: 10,
  },
  lineHeights: {
    hero: 0.94,
    h1: 1.1,
    h2: 1.1,
    h3: 1.2,
    h4: 1.2,
    h5: 1.3,
    bodyLg: 1.5,
    bodyMd: 1.5,
    bodySm: 1.4,
    caption: 1.3,
    overline: 1.6,
  },
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  safeTop: 59,
  safeBottom: 34,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  pill: 28,
  fab: 20,       // AI Chat FAB — rounded square, NOT circle
  avatar: 9999,  // ONLY for user profile photos
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const Shadows = {
  card: {
    shadowColor: '#6443F4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  cta: {
    shadowColor: '#F94498',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  fab: {
    shadowColor: '#F94498',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 48,
    elevation: 20,
  },
  green: {
    shadowColor: '#02A65C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  orange: {
    shadowColor: '#FF9327',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  purple: {
    shadowColor: '#6443F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ─── Animation Timing ─────────────────────────────────────────────────────────
export const Timing = {
  micro: 150,
  fast: 200,
  standard: 300,
  moderate: 400,
  slow: 600,
  verySlow: 800,
} as const;

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
export const TabBar = {
  height: 60,
  safeArea: 34,
  bg: '#120824',
  borderColor: 'rgba(123,68,230,0.2)',
  activePillBg: 'rgba(249,68,152,0.15)',
  activePillRadius: 12,
  activeColor: '#F94498',
  inactiveColor: '#A79FB2',
  iconSize: 24,
} as const;

// ─── Component Sizes ──────────────────────────────────────────────────────────
export const Sizes = {
  // Buttons
  buttonHeight: 56,
  buttonSmHeight: 40,
  
  // Cards
  destinationCard: { width: 280, height: 380 },
  destinationCardImage: 200,
  hotelCard: { width: '100%' as const, height: 240 },
  hotelCardImage: 140,
  
  // Navigation
  headerHeight: 60,
  tabBarTotal: 94, // 60 + 34 safe area
  
  // FAB
  fabSize: 64,
  fabRadius: 20,
  
  // Avatar
  avatarSm: 36,
  avatarMd: 40,
  avatarLg: 120,
  
  // Icons
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
  iconXl: 48,
} as const;
