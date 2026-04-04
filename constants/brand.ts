/**
 * TRAVI Brand Constants
 * Official brand assets, colors, and typography from the TRAVI Brandbook.
 * Use these consistently across all screens.
 */

// ─── Logo Assets ─────────────────────────────────────────────────────────────
// Rules:
//   Dark background  → use DARK variants (white logo/text)
//   Light background → use LIGHT variants (purple logo/text)
//   Primary (purple) → use PRIMARY logotype

export const LOGOS = {
  // Full logo (mascot + logotype) — for splash, onboarding, headers on dark bg
  fullDark: require("@/assets/logos/full-logo-dark.webp"),
  // Full logo for light backgrounds
  fullLight: require("@/assets/logos/full-logo-light.webp"),

  // Mascot only (duck) — for chat bubbles, tips, loading states
  mascotDark: require("@/assets/logos/mascot-dark.png"),   // dark bg
  mascotLight: require("@/assets/logos/mascot-light.png"), // light bg

  // Logotype only ("Travi" text) — for compact headers
  logotypeDark: require("@/assets/logos/logotype-dark.webp"),     // white text
  logotypeLight: require("@/assets/logos/logotype-light.webp"),   // black text
  logotypePrimary: require("@/assets/logos/logotype-primary.webp"), // purple #6443F4
} as const;

// ─── Brand Colors ─────────────────────────────────────────────────────────────
export const BRAND = {
  // Primary palette
  purple: "#6443F4",       // Primary brand purple
  pink: "#F94498",         // Hot pink accent
  orange: "#FF9327",       // Orange accent
  green: "#02A65C",        // Green accent

  // App backgrounds
  bgDeep: "#24103E",       // Main app dark background
  bgCard: "#3A1F5C",       // Card/surface background
  bgCardAlt: "#4A2870",    // Lighter card variant
  bgOverlay: "#1A0A30",    // Deep overlay

  // Secondary shades
  purpleLight: "#9077EF",  // Light purple
  purpleDark: "#582898",   // Dark purple
  purpleMid: "#7B44E6",    // Mid purple
  cyan: "#01BEFF",         // Cyan accent
  gold: "#FFD112",         // Gold for points/rewards
  lime: "#59ED63",         // Lime green accent
  pinkLight: "#FDA9E5",    // Light pink

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#A79FB2",
  textMuted: "#6B5F80",

  // Borders
  border: "#504065",
  borderLight: "rgba(255,255,255,0.1)",

  // Gradients
  gradientPrimary: ["#6443F4", "#F94498"] as [string, string],
  gradientPurple: ["#3A1F5C", "#6443F4"] as [string, string],
  gradientPink: ["#F94498", "#FF9327"] as [string, string],
  gradientGold: ["#FFD112", "#FF9327"] as [string, string],
  gradientGreen: ["#02A65C", "#01BEFF"] as [string, string],
  gradientBg: ["#24103E", "#1A0A30", "#0D0520"] as [string, string, string],
  gradientCard: ["rgba(100,67,244,0.3)", "rgba(249,68,152,0.15)"] as [string, string],
  gradientGlass: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"] as [string, string],
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
// Chillax = display/headings (playful, bold)
// Satoshi = body/UI text (clean, readable)

export const FONTS = {
  // Chillax — for headlines, display text, brand moments
  chillaxRegular: "Chillax-Regular",
  chillaxSemibold: "Chillax-Semibold",
  chillaxBold: "Chillax-Bold",

  // Satoshi — for body text, labels, UI elements
  satoshiRegular: "Satoshi-Regular",
  satoshiMedium: "Satoshi-Medium",
  satoshiBold: "Satoshi-Bold",
} as const;

// ─── Typography Scale ─────────────────────────────────────────────────────────
export const TYPE = {
  // Display — hero titles, splash
  display: { fontFamily: FONTS.chillaxBold, fontSize: 48, lineHeight: 56 },
  // Hero — section heroes
  hero: { fontFamily: FONTS.chillaxBold, fontSize: 36, lineHeight: 44 },
  // H1 — screen titles
  h1: { fontFamily: FONTS.chillaxBold, fontSize: 28, lineHeight: 36 },
  // H2 — section headers
  h2: { fontFamily: FONTS.chillaxSemibold, fontSize: 22, lineHeight: 30 },
  // H3 — card titles
  h3: { fontFamily: FONTS.chillaxSemibold, fontSize: 18, lineHeight: 26 },
  // H4 — sub-section labels
  h4: { fontFamily: FONTS.satoshiBold, fontSize: 15, lineHeight: 22 },
  // Body — main content
  body: { fontFamily: FONTS.satoshiRegular, fontSize: 15, lineHeight: 24 },
  // Body medium
  bodyMed: { fontFamily: FONTS.satoshiMedium, fontSize: 15, lineHeight: 24 },
  // Small — secondary info
  small: { fontFamily: FONTS.satoshiRegular, fontSize: 13, lineHeight: 20 },
  // Caption — timestamps, metadata
  caption: { fontFamily: FONTS.satoshiRegular, fontSize: 11, lineHeight: 16 },
  // Label — buttons, chips, badges
  label: { fontFamily: FONTS.satoshiBold, fontSize: 13, lineHeight: 18 },
  // Button — CTA text
  button: { fontFamily: FONTS.satoshiBold, fontSize: 16, lineHeight: 22 },
  // Tab — tab bar labels
  tab: { fontFamily: FONTS.satoshiMedium, fontSize: 10, lineHeight: 14 },
} as const;

// ─── Spacing & Radius ─────────────────────────────────────────────────────────
export const SPACING = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, huge: 48,
} as const;

export const RADIUS = {
  sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999,
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const SHADOW = {
  purple: {
    shadowColor: "#6443F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  pink: {
    shadowColor: "#F94498",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    shadowColor: "#6443F4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;
