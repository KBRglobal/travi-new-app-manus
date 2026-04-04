// ═══════════════════════════════════════════════
// TRAVI DESIGN SYSTEM — Single Source of Truth
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

  // Background
  bg: {
    primary: '#0A0514',
    secondary: '#120824',
    card: '#120824',
    surface: 'rgba(255,255,255,0.05)',
    overlay: 'rgba(0,0,0,0.85)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.6)',
    muted: 'rgba(255,255,255,0.3)',
    inverse: '#0A0514',
    link: '#6443F4',
  },

  // Borders
  border: {
    default: 'rgba(255,255,255,0.08)',
    strong: 'rgba(255,255,255,0.15)',
    focus: '#6443F4',
    error: '#F87171',
    success: '#4ADE80',
  },

  // Status
  success: '#4ADE80',
  successLight: 'rgba(74,222,128,0.15)',
  warning: '#FBBF24',
  warningLight: 'rgba(251,191,36,0.15)',
  error: '#F87171',
  errorLight: 'rgba(248,113,113,0.15)',

  // Trip Status
  trip: {
    upcoming: '#60A5FA',
    active: '#4ADE80',
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

// ─── Fonts ──────────────────────────────────
export const fonts = {
  heading: 'Chillax-Bold',
  body: 'Satoshi-Regular',
  bold: 'Satoshi-Bold',
} as const;

// ─── Font Sizes ─────────────────────────────
export const fontSizes = {
  display: 36,
  h1: 28,
  h2: 24,
  h3: 20,
  bodyLg: 18,
  body: 16,
  bodySm: 14,
  caption: 12,
  tiny: 10,
} as const;

// ─── Line Heights ───────────────────────────
export const lineHeights = {
  display: 44,
  h1: 36,
  h2: 32,
  h3: 28,
  bodyLg: 26,
  body: 24,
  bodySm: 20,
  caption: 16,
  tiny: 14,
} as const;

// ─── Spacing ─────────────────────────────────
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
} as const;

// ─── Border Radius ───────────────────────────
export const radius = {
  card: 16,
  button: 12,
  input: 12,
  modal: 24,
  pill: 100,
  full: 9999,
} as const;

// ─── Shadows ─────────────────────────────────
export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  cardHover: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 12,
  },
  fab: {
    shadowColor: '#6443F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
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

// ─── Breakpoints ─────────────────────────────
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// ─── Animation Durations ─────────────────────
export const durations = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
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
  height: 80,
  iconSize: 24,
  labelSize: 11,
  activeColor: colors.primary,
  inactiveColor: colors.text.muted,
  backgroundColor: colors.bg.secondary,
} as const;

// ─── Header ──────────────────────────────────
export const header = {
  height: 56,
  backgroundColor: colors.bg.primary,
  titleSize: fontSizes.h3,
} as const;

// ─── Export default theme ────────────────────
const theme = {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  spacing,
  radius,
  shadows,
  breakpoints,
  durations,
  zIndex,
  tabBar,
  header,
} as const;

export default theme;
