// ═══════════════════════════════════════════════
// TRAVI DESIGN SYSTEM v2.0 — Premium Dark Cinema
// "Revolut meets Airbnb in outer space"
// ═══════════════════════════════════════════════

// ─── Colors ──────────────────────────────────
export const colors = {
  // Brand
  primary: '#6443F4',
  primaryLight: 'rgba(100,67,244,0.15)',
  primaryDark: '#4A2FD4',
  pink: '#F94498',
  pinkLight: 'rgba(249,68,152,0.15)',
  pinkDark: '#D42E78',
  orange: '#FF9327',
  orangeLight: 'rgba(255,147,39,0.15)',
  green: '#02A65C',
  greenLight: 'rgba(2,166,92,0.15)',
  blue: '#2196F3',
  gold: '#FFD700',
  goldLight: 'rgba(255,215,0,0.08)',

  // Background
  bg: {
    primary: '#0A0514',
    secondary: '#120824',
    card: '#24103E',
    surface: '#24103E',
    surface2: '#2D1649',
    glass: 'rgba(36,16,62,0.6)',
    overlay: 'rgba(10,5,20,0.85)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#D3CFD8',
    tertiary: '#A79FB2',
    disabled: '#504065',
    placeholder: '#7B6FA0',
    inverse: '#0A0514',
    link: '#6443F4',
    muted: '#A79FB2',
  },

  // Borders
  border: {
    default: 'rgba(255,255,255,0.06)',
    strong: 'rgba(255,255,255,0.12)',
    focus: 'rgba(249,68,152,0.55)',
    error: 'rgba(255,147,39,0.80)',
    success: 'rgba(2,166,92,0.50)',
    card: 'rgba(255,255,255,0.06)',
    input: 'rgba(255,255,255,0.10)',
  },

  // Status
  success: '#02A65C',
  successLight: 'rgba(2,166,92,0.15)',
  warning: '#FF9327',
  warningLight: 'rgba(255,147,39,0.15)',
  error: '#F87171',
  errorLight: 'rgba(248,113,113,0.15)',

  // Trip Status
  trip: {
    upcoming: '#60A5FA',
    active: '#02A65C',
    completed: '#A78BFA',
    cancelled: '#F87171',
  },

  // Mascot Colors
  mascot: {
    yellow: '#FFD93D',
    purple: '#6443F4',
    blue: '#4FC3F7',
    green: '#4CAF50',
    orange: '#FF9800',
  },

  // Membership tiers
  tier: {
    explorer: '#B8B0D0',
    adventurer: '#6C5CE7',
    globetrotter: '#FFD700',
  },
} as const;

// ─── Gradients ──────────────────────────────
export const gradients = {
  primaryCTA: ['#6443F4', '#F94498'] as const,
  planning: ['#F94498', '#6443F4'] as const,
  live: ['#02A65C', '#FF9327'] as const,
  points: ['#FF9327', '#FFD700'] as const,
  imageOverlay: ['transparent', 'rgba(10,5,20,0.9)'] as const,
  cardTintLive: ['rgba(2,166,92,0.20)', 'rgba(1,190,255,0.12)'] as const,
  cardTintPlanning: ['rgba(249,68,152,0.20)', 'rgba(255,147,39,0.12)'] as const,
  cardTintDiscovery: ['rgba(100,67,244,0.20)', 'rgba(249,68,152,0.12)'] as const,
  avatar: ['#6443F4', '#F94498'] as const,
} as const;

// ─── Fonts ──────────────────────────────────
export const fonts = {
  heading: 'Chillax-Bold',
  headingSemibold: 'Chillax-Semibold',
  body: 'Satoshi-Regular',
  bodyMedium: 'Satoshi-Medium',
  bold: 'Satoshi-Bold',
} as const;

// ─── Font Sizes ─────────────────────────────
export const fontSizes = {
  display: 40,
  h1: 32,
  h2: 26,
  h3: 22,
  h4: 18,
  bodyLg: 17,
  body: 15,
  bodySm: 13,
  cta: 16,
  label: 11,
  caption: 12,
  tiny: 10,
} as const;

// ─── Letter Spacing ─────────────────────────
export const letterSpacing = {
  display: -1.0,
  h1: -0.5,
  h2: -0.3,
  label: 1.5,
  cta: 0.3,
} as const;

// ─── Line Heights ───────────────────────────
export const lineHeights = {
  display: 48,
  h1: 40,
  h2: 34,
  h3: 30,
  h4: 26,
  bodyLg: 26,
  body: 22,
  bodySm: 18,
  caption: 16,
  tiny: 14,
} as const;

// ─── Spacing ─────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  screenH: 24, // Screen horizontal padding — always 24px
  cardPad: 18, // Card internal padding
} as const;

// ─── Border Radius ───────────────────────────
export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  pill: 999,
  card: 20,
  button: 28,
  input: 14,
  modal: 24,
  full: 9999,
} as const;

// ─── Shadows ─────────────────────────────────
export const shadows = {
  card: {
    shadowColor: '#6443F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 8,
  },
  cta: {
    shadowColor: '#F94498',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.40,
    shadowRadius: 16,
    elevation: 12,
  },
  live: {
    shadowColor: '#02A65C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  fab: {
    shadowColor: '#6443F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 20,
    elevation: 16,
  },
  glow: {
    shadowColor: '#6443F4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 4,
  },
  glowPink: {
    shadowColor: '#F94498',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 4,
  },
} as const;

// ─── Icon Sizes ──────────────────────────────
export const iconSizes = {
  tabBar: 22,
  card: 20,
  header: 24,
  list: 20,
  fab: 28,
  emptyState: 56,
} as const;

// ─── Breakpoints ─────────────────────────────
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// ─── Animation Durations ─────────────────────
export const durations = {
  instant: 80,
  fast: 150,
  normal: 250,
  slow: 400,
  verySlow: 600,
} as const;

// ─── Press Animation Config ─────────────────
export const pressAnimation = {
  scale: 0.97,
  spring: {
    damping: 20,
    stiffness: 90,
  },
} as const;

// ─── Z-Index ─────────────────────────────────
export const zIndex = {
  base: 0,
  card: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
  fab: 60,
} as const;

// ─── Tab Bar ─────────────────────────────────
export const tabBar = {
  height: 60,
  bg: '#120824',
  borderTop: 'rgba(123,68,230,0.2)',
  activeColor: '#F94498',
  activePillBg: 'rgba(249,68,152,0.15)',
  inactiveColor: 'rgba(255,255,255,0.35)',
  iconSize: 22,
  labelSize: 11,
} as const;

// ─── Header ──────────────────────────────────
export const header = {
  height: 56,
  backgroundColor: 'transparent',
  titleFont: fonts.headingSemibold,
  titleSize: fontSizes.h4,
  backButtonSize: 40,
} as const;

// ─── Typography Presets ──────────────────────
export const typography = {
  display: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.display,
    letterSpacing: letterSpacing.display,
    color: colors.text.primary,
  },
  h1: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.h1,
    letterSpacing: letterSpacing.h1,
    color: colors.text.primary,
  },
  h2: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.h2,
    letterSpacing: letterSpacing.h2,
    color: colors.text.primary,
  },
  h3: {
    fontFamily: fonts.headingSemibold,
    fontSize: fontSizes.h3,
    color: colors.text.primary,
  },
  h4: {
    fontFamily: fonts.headingSemibold,
    fontSize: fontSizes.h4,
    color: colors.text.primary,
  },
  bodyLg: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodyLg,
    color: colors.text.primary,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.text.secondary,
  },
  bodySm: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySm,
    color: colors.text.secondary,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.label,
    letterSpacing: letterSpacing.label,
    textTransform: 'uppercase' as const,
    color: colors.text.primary,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.text.tertiary,
  },
  cta: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.cta,
    letterSpacing: letterSpacing.cta,
    color: colors.text.primary,
  },
} as const;

// ─── Export default theme ────────────────────
const theme = {
  colors,
  gradients,
  fonts,
  fontSizes,
  letterSpacing,
  lineHeights,
  spacing,
  radius,
  shadows,
  iconSizes,
  breakpoints,
  durations,
  pressAnimation,
  zIndex,
  tabBar,
  header,
  typography,
} as const;

export default theme;
