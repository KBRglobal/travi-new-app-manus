# TRAVI Logo Assets

## Available Files in assets/logos/
- `logotype-dark.webp` — "travi" wordmark in WHITE (for dark backgrounds)
- `logotype-light.webp` — "travi" wordmark in BLACK (for light backgrounds)  
- `logotype-primary.webp` — "travi" wordmark in PURPLE #6443F4 (for white/light backgrounds)
- `mascot-dark.png` — Duck mascot, white background (transparent-ish)
- `mascot-light.png` — Duck mascot variant
- `full-logo-dark.webp` — Duck mascot + "travi" wordmark in WHITE side by side

## Splash Screen Issues to Fix:
1. Currently uses `logotype-primary.webp` (purple text) — on dark bg this is hard to read
   → Should use `logotype-dark.webp` (white text) for dark background
2. Mascot (duck) is not centered in the glow circle — needs to be perfectly centered
3. The glow halo is positioned absolute but mascot is in a separate View with gap spacing

## Welcome Screen Issues to Fix:
1. Uses plain `<Text>Meet TRAVI</Text>` — should use `logotype-dark.webp` image instead
2. The mascot ring (gradient circle) should have mascot perfectly centered inside it
