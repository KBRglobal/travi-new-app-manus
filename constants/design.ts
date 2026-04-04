/**
 * TRAVI Premium Design System
 * Cinematic, glass morphism, deep gradients
 */

export const COLORS = {
  // Core brand
  deepPurple: "#0D0520",
  richPurple: "#1A0A3D",
  midPurple: "#2D1B69",
  vibrantPurple: "#7B2FBE",
  electricPink: "#E91E8C",
  hotPink: "#FF2D78",

  // Glass surfaces
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.12)",
  glassMedium: "rgba(255,255,255,0.10)",
  glassStrong: "rgba(255,255,255,0.15)",

  // Text
  white: "#FFFFFF",
  textSecondary: "#C4B5D9",
  textMuted: "#8B7AAA",
  textFaint: "#5A4D72",

  // Accents
  gold: "#FFD700",
  goldLight: "#FFE566",
  green: "#00E676",
  greenDim: "#4CAF50",
  cyan: "#00BCD4",

  // Gradients (as arrays for LinearGradient)
  gradientBrand: ["#7B2FBE", "#E91E8C"] as [string, string],
  gradientDeep: ["#0D0520", "#1A0A3D"] as [string, string],
  gradientCard: ["rgba(123,47,190,0.25)", "rgba(233,30,140,0.15)"] as [string, string],
  gradientHeader: ["#1A0A3D", "#0D0520"] as [string, string],
  gradientGold: ["#FFD700", "#FF9500"] as [string, string],
  gradientGreen: ["#00E676", "#00BCD4"] as [string, string],
};

export const SHADOWS = {
  purple: {
    shadowColor: "#7B2FBE",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  pink: {
    shadowColor: "#E91E8C",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: "#7B2FBE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
};

export const RADIUS = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  pill: 100,
};

export const TYPOGRAPHY = {
  hero: { fontSize: 42, fontWeight: "900" as const, letterSpacing: -1.5, lineHeight: 48 },
  display: { fontSize: 34, fontWeight: "800" as const, letterSpacing: -1, lineHeight: 40 },
  title: { fontSize: 26, fontWeight: "800" as const, letterSpacing: -0.5, lineHeight: 32 },
  heading: { fontSize: 20, fontWeight: "700" as const, letterSpacing: -0.3, lineHeight: 26 },
  subheading: { fontSize: 17, fontWeight: "600" as const, lineHeight: 24 },
  body: { fontSize: 15, fontWeight: "400" as const, lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: "500" as const, lineHeight: 18 },
  label: { fontSize: 11, fontWeight: "700" as const, letterSpacing: 1.2, lineHeight: 16 },
};
