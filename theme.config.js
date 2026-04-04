/** @type {const} */
// ─── TRAVI Official Brand Design System ──────────────────────────────────────
// Dark = default (deep purple #1A0D3D base, brand purple #6443F4 accents)
// Light = toggle (white base, purple/pink accents)
const themeColors = {
  // Primary brand purple — active elements, icons, highlights
  primary:    { light: '#6443F4', dark: '#7B5CF6' },

  // App background — dark: deep purple-black, light: clean white
  background: { light: '#FAFAFA', dark: '#1A0D3D' },

  // Card / elevated surface
  surface:    { light: '#FFFFFF', dark: '#241155' },

  // Secondary surface (nested cards, inputs)
  surface2:   { light: '#F4F0FF', dark: '#2E1A6E' },

  // Primary text
  foreground: { light: '#24103E', dark: '#FFFFFF' },

  // Secondary / muted text
  muted:      { light: '#7B6B8D', dark: '#B8A8D4' },

  // Borders / dividers
  border:     { light: '#EDE8FF', dark: '#3D2480' },

  // Pink accent — CTA buttons, rewards, highlights
  accent:     { light: '#F94498', dark: '#F94498' },

  // Orange — badges, energy, rewards
  orange:     { light: '#FF9327', dark: '#FF9327' },

  // Green — success, live, cashback
  success:    { light: '#02A65C', dark: '#02A65C' },

  // Cyan — live trip, info
  info:       { light: '#01BEFF', dark: '#01BEFF' },

  // Warning
  warning:    { light: '#F59E0B', dark: '#FBBF24' },

  // Error
  error:      { light: '#F94498', dark: '#F94498' },

  // Tab bar background
  tabBar:     { light: '#FFFFFF', dark: '#1A0D3D' },

  // Tab bar border
  tabBorder:  { light: '#EDE8FF', dark: '#3D2480' },

  // Tint (active icon color in tab bar)
  tint:       { light: '#6443F4', dark: '#7B5CF6' },

  // Brand extras (for direct use in components)
  purple:     { light: '#6443F4', dark: '#7B5CF6' },
  pink:       { light: '#F94498', dark: '#F94498' },
  green:      { light: '#02A65C', dark: '#02A65C' },
  cyan:       { light: '#01BEFF', dark: '#01BEFF' },
};

module.exports = { themeColors };
