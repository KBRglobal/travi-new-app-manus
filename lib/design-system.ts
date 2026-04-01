/**
 * TRAVI Design System
 * Single source of truth for all visual decisions.
 * Every screen MUST use these tokens — never hardcode colors or sizes.
 */

// ─── Brand Colors ────────────────────────────────────────────────────────────
export const Brand = {
  purple:       "#6443F4",   // Primary brand purple
  pink:         "#F94498",   // Primary brand pink
  deepPurple:   "#0D0628",   // Deepest background
  darkPurple:   "#1A0A3D",   // Secondary background
  midPurple:    "#2D1B5E",   // Surface / card background
  lightPurple:  "#3D2B7A",   // Elevated surface
} as const;

// ─── Gradient Presets ────────────────────────────────────────────────────────
export const Gradients = {
  /** Main CTA button — purple → pink */
  cta:          ["#6443F4", "#C2185B", "#F94498"] as const,
  /** Background gradient for all Auth screens */
  authBg:       ["#0D0628", "#1A0A3D", "#1A0A3D"] as const,
  /** Subtle input focus state */
  inputFocus:   ["rgba(100,67,244,0.35)", "rgba(249,68,152,0.18)"] as const,
  /** Inactive input background */
  inputIdle:    ["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"] as const,
  /** Card / surface */
  card:         ["rgba(123,47,190,0.20)", "rgba(233,30,140,0.12)"] as const,
  /** Step badge */
  badge:        ["rgba(123,47,190,0.40)", "rgba(233,30,140,0.25)"] as const,
} as const;

// ─── Text Colors ─────────────────────────────────────────────────────────────
export const Text = {
  primary:      "#FFFFFF",   // Headings, active labels
  secondary:    "#C4B5D9",   // Body text, descriptions
  muted:        "#9B8EC4",   // Section labels, icons (idle), subtitles
  placeholder:  "#7B6FA0",   // Input placeholder text
  disabled:     "#8B7AAA",   // Disabled button text / icons
  dim:          "#5A4D72",   // Very subtle — use sparingly
  accent:       "#F94498",   // Focused icons, highlights
} as const;

// ─── Border Colors ───────────────────────────────────────────────────────────
export const Border = {
  idle:         "rgba(255,255,255,0.12)",  // Default input/card border
  focused:      "rgba(249,68,152,0.60)",   // Focused input border
  subtle:       "rgba(255,255,255,0.08)",  // Very subtle dividers
  card:         "rgba(123,47,190,0.30)",   // Card borders
  badge:        "rgba(123,47,190,0.40)",   // Badge borders
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
export const Typography = {
  h1:    { fontSize: 32, fontWeight: "800" as const, letterSpacing: -0.5, color: Text.primary },
  h2:    { fontSize: 26, fontWeight: "800" as const, letterSpacing: -0.3, color: Text.primary },
  h3:    { fontSize: 22, fontWeight: "700" as const, color: Text.primary },
  h4:    { fontSize: 18, fontWeight: "700" as const, color: Text.primary },
  body:  { fontSize: 15, fontWeight: "400" as const, color: Text.secondary, lineHeight: 22 },
  small: { fontSize: 13, fontWeight: "400" as const, color: Text.muted },
  label: { fontSize: 11, fontWeight: "700" as const, letterSpacing: 1.5, color: Text.muted },
  cta:   { fontSize: 16, fontWeight: "700" as const, color: Text.primary },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────
export const Radius = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  28,
  pill: 999,
} as const;

// ─── Logo Usage Rules ────────────────────────────────────────────────────────
/**
 * LOGO USAGE RULES:
 * - Splash screen:    mascot (large, centered) + logotype-white below
 * - Auth screens:     logotype-white only (no mascot) — clean, focused
 * - Welcome screen:   mascot (large) + first name greeting — no logotype
 * - In-app header:    logotype-white (small) OR mascot icon (small)
 * - Never show both mascot AND logotype at large size on same screen
 */
export const LogoAssets = {
  mascot:         require("../assets/logos/mascot-centered.png"),
  logotypeWhite:  require("../assets/logos/logotype-white.webp"),
  logotypePrimary: require("../assets/logos/logotype-primary.webp"),
  fullLogoDark:   require("../assets/logos/full-logo-dark.webp"),
} as const;
