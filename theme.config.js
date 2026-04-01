/** @type {const} */
// TRAVI Brand Colors — from official Brandbook
// Primary: Purple #6443F4, Pink #F94498, Orange #FF9327, Green #02A65C
// App Dark BG: #24103E
const themeColors = {
  // Primary brand purple
  primary:    { light: '#6443F4', dark: '#6443F4' },
  // Pink accent (CTA buttons, highlights)
  accent:     { light: '#F94498', dark: '#F94498' },
  // Orange accent
  orange:     { light: '#FF9327', dark: '#FF9327' },
  // Green accent
  green:      { light: '#02A65C', dark: '#02A65C' },
  // App background (dark purple from brandbook)
  background: { light: '#24103E', dark: '#24103E' },
  // Surface cards
  surface:    { light: '#3A1F5C', dark: '#3A1F5C' },
  // Surface alt (lighter cards)
  surfaceAlt: { light: '#4A2870', dark: '#4A2870' },
  // Text on dark
  foreground: { light: '#FFFFFF', dark: '#FFFFFF' },
  // Muted text
  muted:      { light: '#A79FB2', dark: '#A79FB2' },
  // Borders
  border:     { light: '#504065', dark: '#504065' },
  // Success
  success:    { light: '#02A65C', dark: '#50A99A' },
  // Warning
  warning:    { light: '#FF9327', dark: '#E09549' },
  // Error
  error:      { light: '#B22565', dark: '#F94498' },
  // Gold for points
  gold:       { light: '#FFD112', dark: '#FFD112' },
  // Tint (active tab color)
  tint:       { light: '#F94498', dark: '#F94498' },
  // Base purple for fills
  basePurple: { light: '#7B44E6', dark: '#7B44E6' },
  // Cyan accent
  cyan:       { light: '#01BEFF', dark: '#01BEFF' },
  // Light purple
  lightPurple:{ light: '#9077EF', dark: '#9077EF' },
  // Deep purple
  deepPurple: { light: '#582898', dark: '#582898' },
};

module.exports = { themeColors };
