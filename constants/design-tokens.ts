/**
 * TRAVI Design System — Global Design Tokens
 * 
 * Use these tokens across all screens for visual consistency.
 */

// ─── Spacing Scale ────────────────────────────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// ─── Typography Scale ─────────────────────────────────────────────────────────
export const TYPOGRAPHY = {
  // Headings
  h1: { fontSize: 28, fontWeight: "800" as const, lineHeight: 36, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: "800" as const, lineHeight: 28, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: "700" as const, lineHeight: 24, letterSpacing: -0.2 },
  h4: { fontSize: 16, fontWeight: "700" as const, lineHeight: 22, letterSpacing: 0 },
  
  // Body
  body: { fontSize: 15, fontWeight: "400" as const, lineHeight: 22, letterSpacing: 0 },
  bodyBold: { fontSize: 15, fontWeight: "700" as const, lineHeight: 22, letterSpacing: 0 },
  bodySmall: { fontSize: 13, fontWeight: "400" as const, lineHeight: 18, letterSpacing: 0 },
  
  // Caption
  caption: { fontSize: 12, fontWeight: "600" as const, lineHeight: 16, letterSpacing: 0.2 },
  captionSmall: { fontSize: 10, fontWeight: "600" as const, lineHeight: 14, letterSpacing: 0.3 },
} as const;

// ─── Border Radius Scale ──────────────────────────────────────────────────────
export const RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  round: 9999,
} as const;

// ─── Colors (from theme.config.js) ────────────────────────────────────────────
export const COLORS = {
  // Brand
  primary: "#C084FC",
  primaryDark: "#A855F7",
  secondary: "#F94498",
  
  // Backgrounds
  background: "#0A0520",
  surface: "#1A0A3D",
  surfaceLight: "rgba(255,255,255,0.06)",
  
  // Text
  text: "#ECEDEE",
  textMuted: "#9BA1A6",
  textDim: "rgba(255,255,255,0.4)",
  
  // Borders
  border: "rgba(192,132,252,0.15)",
  borderLight: "rgba(255,255,255,0.08)",
  
  // Status
  success: "#4ADE80",
  warning: "#FBBF24",
  error: "#F87171",
  info: "#06B6D4",
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: "#C084FC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ─── Button Sizes ─────────────────────────────────────────────────────────────
export const BUTTON_SIZES = {
  sm: { paddingHorizontal: 16, paddingVertical: 10, fontSize: 13 },
  md: { paddingHorizontal: 20, paddingVertical: 13, fontSize: 15 },
  lg: { paddingHorizontal: 24, paddingVertical: 16, fontSize: 16 },
} as const;

// ─── Animation Durations ──────────────────────────────────────────────────────
export const ANIMATION = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;
