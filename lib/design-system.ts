/**
 * TRAVI Design System v2.0
 * Single source of truth for all visual decisions.
 * Based on the official UX/UI specification document.
 *
 * 4 Modes × Color Palettes:
 *   Discovery  → Purple  #6443F4
 *   Planning   → Pink    #F94498
 *   Live       → Green   #02A65C
 *   Post-Trip  → Orange  #FF9327
 */

// ─── Base Palette ─────────────────────────────────────────────────────────────
export const Brand = {
  // Core brand
  purple:       "#6443F4",   // Discovery mode primary
  pink:         "#F94498",   // Planning mode primary / CTA
  green:        "#02A65C",   // Live mode primary
  orange:       "#FF9327",   // Post-trip mode primary
  cyan:         "#01BEFF",   // Info / live trip accent

  // Background layers (dark-first)
  deepPurple:   "#0D0628",   // Deepest background
  darkPurple:   "#1A0A3D",   // Primary background
  midPurple:    "#241155",   // Card / surface
  lightPurple:  "#2E1A6E",   // Elevated surface / input bg
  borderPurple: "#3D2480",   // Borders / dividers

  // Text
  white:        "#FFFFFF",
  offWhite:     "rgba(255,255,255,0.92)",
  dim:          "rgba(255,255,255,0.60)",
  dimmer:       "rgba(255,255,255,0.35)",
  dimmest:      "rgba(255,255,255,0.18)",
} as const;

// ─── Mode Color Palettes ──────────────────────────────────────────────────────
export const ModeColors = {
  discovery: {
    primary:    "#6443F4",
    secondary:  "#8B6FF8",
    bg:         "#1A0A3D",
    surface:    "#241155",
    accent:     "#F94498",
    gradient:   ["#6443F4", "#F94498"] as const,
  },
  planning: {
    primary:    "#F94498",
    secondary:  "#FF6BB5",
    bg:         "#1A0A3D",
    surface:    "#2A0F1E",
    accent:     "#FF9327",
    gradient:   ["#F94498", "#FF9327"] as const,
  },
  live: {
    primary:    "#02A65C",
    secondary:  "#04D475",
    bg:         "#0A1A12",
    surface:    "#0F2B1C",
    accent:     "#01BEFF",
    gradient:   ["#02A65C", "#01BEFF"] as const,
  },
  postTrip: {
    primary:    "#FF9327",
    secondary:  "#FFB05C",
    bg:         "#1A0F05",
    surface:    "#2A1A0A",
    accent:     "#F94498",
    gradient:   ["#FF9327", "#F94498"] as const,
  },
} as const;

// ─── Gradient Presets ─────────────────────────────────────────────────────────
export const Gradients = {
  /** Main CTA button — purple → pink */
  cta:          ["#6443F4", "#C2185B", "#F94498"] as const,
  /** Subtle CTA variant */
  ctaSubtle:    ["rgba(100,67,244,0.80)", "rgba(249,68,152,0.80)"] as const,
  /** Auth/Splash background */
  authBg:       ["#1A0B2E", "#1A0B2E", "#24103E"] as const,
  /** Home hero overlay */
  heroOverlay:  ["rgba(26,10,61,0.55)", "rgba(26,10,61,0.10)", "rgba(26,10,61,0.85)"] as const,
  /** Card surface */
  card:         ["rgba(36,17,85,0.95)", "rgba(46,26,110,0.90)"] as const,
  /** Input idle */
  inputIdle:    ["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"] as const,
  /** Input focus */
  inputFocus:   ["rgba(100,67,244,0.25)", "rgba(249,68,152,0.15)"] as const,
  /** Live mode card */
  liveCard:     ["rgba(2,166,92,0.20)", "rgba(1,190,255,0.12)"] as const,
  /** Planning mode card */
  planCard:     ["rgba(249,68,152,0.20)", "rgba(255,147,39,0.12)"] as const,
  /** Discovery mode card */
  discoveryCard:["rgba(100,67,244,0.20)", "rgba(249,68,152,0.12)"] as const,
  /** Step badge / pill gradient */
  badge:        ["#6443F4", "#F94498"] as const,
} as const;

// ─── Text Colors ──────────────────────────────────────────────────────────────
export const Text = {
  primary:      "#FFFFFF",
  secondary:    "#C4B5D9",
  muted:        "#9B8EC4",
  placeholder:  "#7B6FA0",
  disabled:     "#5A4D72",
  accent:       "#F94498",
  accentGreen:  "#02A65C",
  accentOrange: "#FF9327",
  accentCyan:   "#01BEFF",
} as const;

// ─── Border Colors ────────────────────────────────────────────────────────────
export const Border = {
  idle:         "rgba(255,255,255,0.10)",
  focused:      "rgba(249,68,152,0.55)",
  subtle:       "rgba(255,255,255,0.06)",
  card:         "rgba(100,67,244,0.25)",
  live:         "rgba(2,166,92,0.40)",
  planning:     "rgba(249,68,152,0.40)",
  /** Badge / pill border */
  badge:        "rgba(100,67,244,0.50)",
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
// Chillax Bold for headings, Satoshi for body
export const Typography = {
  // Display
  display:  { fontSize: 40, fontFamily: "Chillax-Bold",   letterSpacing: -1.0, color: Text.primary, lineHeight: 46 },
  // Headings
  h1:       { fontSize: 32, fontFamily: "Chillax-Bold",   letterSpacing: -0.5, color: Text.primary, lineHeight: 38 },
  h2:       { fontSize: 26, fontFamily: "Chillax-Bold",   letterSpacing: -0.3, color: Text.primary, lineHeight: 32 },
  h3:       { fontSize: 22, fontFamily: "Chillax-Semibold", color: Text.primary, lineHeight: 28 },
  h4:       { fontSize: 18, fontFamily: "Chillax-Semibold", color: Text.primary, lineHeight: 24 },
  // Body (Satoshi)
  bodyLg:   { fontSize: 17, fontFamily: "Satoshi-Medium",  color: Text.secondary, lineHeight: 26 },
  body:     { fontSize: 15, fontFamily: "Satoshi-Regular", color: Text.secondary, lineHeight: 22 },
  bodySm:   { fontSize: 13, fontFamily: "Satoshi-Regular", color: Text.muted,     lineHeight: 18 },
  // Labels
  label:    { fontSize: 11, fontFamily: "Satoshi-Bold",    letterSpacing: 1.5,  color: Text.muted,  textTransform: "uppercase" as const },
  caption:  { fontSize: 12, fontFamily: "Satoshi-Regular", color: Text.muted,   lineHeight: 16 },
  // CTA
  cta:      { fontSize: 16, fontFamily: "Satoshi-Bold",    color: Text.primary, letterSpacing: 0.3 },
  ctaSm:    { fontSize: 14, fontFamily: "Satoshi-Bold",    color: Text.primary, letterSpacing: 0.2 },
  /** Small text — secondary info */
  small:    { fontSize: 13, fontFamily: "Satoshi-Regular", color: Text.muted,    lineHeight: 18 },
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const Radius = {
  xs:   6,
  sm:   10,
  md:   14,
  lg:   18,
  xl:   24,
  xxl:  32,
  pill: 999,
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const Shadows = {
  card: {
    shadowColor: "#6443F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButton: {
    shadowColor: "#F94498",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.40,
    shadowRadius: 16,
    elevation: 12,
  },
  liveCard: {
    shadowColor: "#02A65C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// ─── Logo Assets ──────────────────────────────────────────────────────────────
/**
 * LOGO USAGE RULES (from spec):
 * - Splash:    mascot (large, centered) + logotype below
 * - Auth:      logotype only (no mascot) — clean, focused
 * - Welcome:   mascot (large) + greeting — no logotype
 * - In-app:    logotype small in header OR mascot FAB
 * - Never show both mascot AND logotype at large size on same screen
 */
export const LogoAssets = {
  mascot:          require("../assets/logos/mascot-centered.png"),
  logotypeWhite:   require("../assets/logos/logotype-white.webp"),
  logotypePrimary: require("../assets/logos/logotype-primary.webp"),
  fullLogoDark:    require("../assets/logos/full-logo-dark.webp"),
} as const;

// ─── Animation Timing ─────────────────────────────────────────────────────────
export const Timing = {
  instant:  80,
  fast:     150,
  normal:   250,
  slow:     400,
  verySlow: 600,
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────
export const ZIndex = {
  base:    0,
  card:    10,
  fab:     50,
  modal:   100,
  overlay: 200,
  toast:   300,
} as const;
