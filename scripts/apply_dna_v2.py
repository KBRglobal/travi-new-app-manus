#!/usr/bin/env python3
"""
TRAVI DNA Applier v2 — applies brand colors to all 51 remaining screens
"""
import os, re, glob

BASE = "/home/ubuntu/travi-app/app"

# Simple string replacements (no regex needed for most)
REPLACEMENTS = [
    # Old background colors → TRAVI bg
    ("#1a1a2e", "#0A0514"),
    ("#16213e", "#0A0514"),
    ("#0f3460", "#0A0514"),
    ("#1A0B2E", "#0A0514"),
    ("#0D0221", "#0A0514"),
    ("#0E0618", "#0A0514"),
    ("#120824", "#0A0514"),
    ("#0D1117", "#0A0514"),
    # Old surface colors → TRAVI surface
    ("#1e2022", "rgba(36,16,62,0.55)"),
    ("#1E1E2E", "rgba(36,16,62,0.55)"),
    ("#1a1a3e", "rgba(36,16,62,0.55)"),
    ("#16092C", "rgba(36,16,62,0.55)"),
    ("#1A0A30", "rgba(36,16,62,0.55)"),
    ("#1e1e2e", "rgba(36,16,62,0.55)"),
    ("#2a2a3e", "rgba(36,16,62,0.55)"),
    ("#252535", "rgba(36,16,62,0.55)"),
    ("#1C1C2E", "rgba(36,16,62,0.55)"),
    ("#1c1c2e", "rgba(36,16,62,0.55)"),
    ("#2C2C3E", "rgba(36,16,62,0.55)"),
    ("#2c2c3e", "rgba(36,16,62,0.55)"),
    ("#1B1B2F", "rgba(36,16,62,0.55)"),
    ("#1b1b2f", "rgba(36,16,62,0.55)"),
    # Old accent/primary colors → TRAVI purple
    ("#e94560", "#6443F4"),
    ("#533483", "#6443F4"),
    ("#7B44E6", "#6443F4"),
    ("#7C3AED", "#6443F4"),
    ("#8B5CF6", "#6443F4"),
    ("#6D28D9", "#6443F4"),
    ("#5B21B6", "#6443F4"),
    ("#4C1D95", "#6443F4"),
    ("#7B68EE", "#6443F4"),
    ("#9B59B6", "#6443F4"),
    ("#8E44AD", "#6443F4"),
    # Old secondary accent → TRAVI pink
    ("#F472B6", "#F94498"),
    ("#EC4899", "#F94498"),
    ("#DB2777", "#F94498"),
    ("#BE185D", "#F94498"),
    # WIREFRAME placeholder text
    ("WIREFRAME", ""),
    ("Neutral Mockup", ""),
    ("// WIREFRAME:", "//"),
    ("/* WIREFRAME */", ""),
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in REPLACEMENTS:
            content = content.replace(old, new)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"  ⚠️  {filepath}: {e}")
        return False

def main():
    files = glob.glob(os.path.join(BASE, "**/*.tsx"), recursive=True)
    files = [f for f in files if not any(x in f for x in ["_layout", "+not-found", "oauth", "/dev/"])]
    updated = 0
    for filepath in sorted(files):
        if process_file(filepath):
            updated += 1
            rel = filepath.replace(BASE + "/", "")
            print(f"  ✅ {rel}")
    print(f"\n✅ Done! Updated {updated} files.")

if __name__ == "__main__":
    main()
