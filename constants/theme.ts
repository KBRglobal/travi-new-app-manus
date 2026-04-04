// ═══════════════════════════════════════════════
// TRAVI SUPERAPP — Design Tokens
// Single source of truth for all visual constants
// ═══════════════════════════════════════════════

// ─── Colors ──────────────────────────────────
export const colors = {
  // Primary brand
  primary: '#6443F4',
  primaryLight: 'rgba(100,67,244,0.2)',
  primaryDark: '#4A2FD4',

  // Pink — second most important color
  pink: '#F94498',
  pinkLight: 'rgba(249,68,152,0.15)',
  pinkDark: '#D42E78',

  // Backgrounds
  bg: {
    primary: '#0A0514',
    secondary: '#1A0B32',
    card: '#1A0B32',
    surface: 'rgba(255,255,255,0.05)',
    overlay: 'rgba(0,0,0,0.85)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.6)',
    tertiary: 'rgba(255,255,255,0.4)',
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
  status: {
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#3B82F6',
  },

  // Accent
  accent: {
    gold: '#FFD700',
    green: '#51CF66',
    red: '#FF6B6B',
    blue: '#74C0FC',
    orange: '#FFA94D',
    pink: '#F06595',
    teal: '#20C997',
  },

  // Membership tiers
  tier: {
    explorer: '#B8B0D0',
    adventurer: '#6C5CE7',
    globetrotter: '#FFD700',
  },
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
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  card: 16,
  button: 12,
  pill: 9999,
  full: 9999,
} as const;

// ─── Typography ──────────────────────────────
export const typography = {
  // Font sizes
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
  },
  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ─── Shadows ─────────────────────────────────
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ─── Breakpoints ─────────────────────────────
export const breakpoints = {
  sm: 0,       // Mobile (default)
  md: 768,     // Tablet
  lg: 1024,    // Desktop
  xl: 1280,    // Large desktop
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
  titleSize: typography.size.md,
} as const;

// ─── Export default theme ────────────────────
const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  breakpoints,
  durations,
  zIndex,
  tabBar,
  header,
} as const;

export default theme;
