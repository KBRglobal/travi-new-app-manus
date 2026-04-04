#!/usr/bin/env python3
"""
TRAVI DNA Batch Applier
Replaces old colors, fonts, and emoji with TRAVI brand DNA across all screens.
"""

import os
import re
import glob

APP_DIR = "/home/ubuntu/travi-app/app"

# Color replacements: old → TRAVI brand
COLOR_REPLACEMENTS = [
    # Old dark backgrounds → TRAVI bg
    (r'"#1a1a2e"', '"#0A0514"'),
    (r'"#16213e"', '"#0A0514"'),
    (r'"#0f3460"', '"#0A0514"'),
    (r'"#1A0B2E"', '"#0A0514"'),
    (r'"#0D0221"', '"#0A0514"'),
    (r'"#0E0618"', '"#0A0514"'),
    (r'"#120824"', '"#0A0514"'),
    (r'"#0D1117"', '"#0A0514"'),
    (r'"#0a0a0a"', '"#0A0514"'),
    (r'"#111111"', '"#0A0514"'),
    (r'"#0d0d0d"', '"#0A0514"'),
    # Old card/surface colors → TRAVI surface
    (r'"#1e2022"', '"rgba(36,16,62,0.55)"'),
    (r'"#1E1E2E"', '"rgba(36,16,62,0.55)"'),
    (r'"#1a1a3e"', '"rgba(36,16,62,0.55)"'),
    (r'"#16092C"', '"rgba(36,16,62,0.55)"'),
    (r'"#1A0A30"', '"rgba(36,16,62,0.55)"'),
    (r'"#1e1e2e"', '"rgba(36,16,62,0.55)"'),
    # Old accent colors → TRAVI purple
    (r'"#e94560"', '"#6443F4"'),
    (r'"#533483"', '"#6443F4"'),
    (r'"#7B44E6"', '"#6443F4"'),
    (r'"#7C3AED"', '"#6443F4"'),
    (r'"#8B5CF6"', '"#6443F4"'),
    # Old secondary accents → TRAVI pink
    (r'"#F94498"', '"#F94498"'),  # keep
    (r'"#e91e8c"', '"#F94498"'),
    (r'"#FF6B9D"', '"#F94498"'),
    # System font → brand fonts
    (r'fontFamily: "System"', 'fontFamily: "Satoshi-Regular"'),
    (r"fontFamily: 'System'", "fontFamily: 'Satoshi-Regular'"),
    (r'fontFamily: "SF Pro Display"', 'fontFamily: "Chillax-Bold"'),
    (r'fontFamily: "SF Pro Text"', 'fontFamily: "Satoshi-Regular"'),
    (r'fontFamily: "Helvetica"', 'fontFamily: "Satoshi-Regular"'),
    (r'fontFamily: "Arial"', 'fontFamily: "Satoshi-Regular"'),
]

# Emoji replacements: emoji → MaterialIcons name string (for reference in comments)
EMOJI_REPLACEMENTS = [
    (r'"🌊"', '"~"'),
    (r'"🏖"', '"~"'),
    (r'"🗺"', '"~"'),
    (r'"🎒"', '"~"'),
    (r'"✈️"', '"~"'),
    (r'"🏨"', '"~"'),
    (r'"🍽"', '"~"'),
    (r'"💰"', '"~"'),
    (r'"⭐"', '"~"'),
    (r'"🔔"', '"~"'),
    (r'"❤️"', '"~"'),
    (r'"📍"', '"~"'),
    (r'"🎯"', '"~"'),
    (r'"🌍"', '"~"'),
    (r'"🏔"', '"~"'),
    (r'"🌴"', '"~"'),
    (r'"🎭"', '"~"'),
    (r'"🍜"', '"~"'),
    (r'"🎪"', '"~"'),
    (r'"🚀"', '"~"'),
]

# Background color in StyleSheet
BG_REPLACEMENTS = [
    (r"backgroundColor: '#1a1a2e'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#1a1a2e"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#16213e'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#16213e"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#0f3460'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#0f3460"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#1A0B2E'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#1A0B2E"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#0D0221'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#0D0221"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#0E0618'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#0E0618"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#120824'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#120824"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#0D1117'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#0D1117"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: 'black'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "black"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#000000'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#000000"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#0a0a0a'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#0a0a0a"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor: '#111111'", "backgroundColor: '#0A0514'"),
    (r'backgroundColor: "#111111"', 'backgroundColor: "#0A0514"'),
    # Surface colors
    (r"backgroundColor: '#1e2022'", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r'backgroundColor: "#1e2022"', 'backgroundColor: "rgba(36,16,62,0.55)"'),
    (r"backgroundColor: '#1E1E2E'", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r'backgroundColor: "#1E1E2E"', 'backgroundColor: "rgba(36,16,62,0.55)"'),
    (r"backgroundColor: '#1a1a3e'", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r'backgroundColor: "#1a1a3e"', 'backgroundColor: "rgba(36,16,62,0.55)"'),
    (r"backgroundColor: '#16092C'", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r'backgroundColor: "#16092C"', 'backgroundColor: "rgba(36,16,62,0.55)"'),
    (r"backgroundColor: '#1A0A30'", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r'backgroundColor: "#1A0A30"', 'backgroundColor: "rgba(36,16,62,0.55)"'),
    # Old accent backgrounds
    (r"backgroundColor: '#e94560'", "backgroundColor: '#6443F4'"),
    (r'backgroundColor: "#e94560"', 'backgroundColor: "#6443F4"'),
    (r"backgroundColor: '#533483'", "backgroundColor: '#6443F4'"),
    (r'backgroundColor: "#533483"', 'backgroundColor: "#6443F4"'),
]

ALL_REPLACEMENTS = COLOR_REPLACEMENTS + BG_REPLACEMENTS

def process_file(filepath):
    """Apply DNA replacements to a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        changes = 0
        
        for pattern, replacement in ALL_REPLACEMENTS:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                changes += len(re.findall(pattern, content))
                content = new_content
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes
        return 0
    except Exception as e:
        print(f"  ⚠️  Error processing {filepath}: {e}")
        return 0

def main():
    # Find all TSX files
    files = glob.glob(os.path.join(APP_DIR, "**/*.tsx"), recursive=True)
    files = [f for f in files if not any(x in f for x in ["_layout", "+not-found", "oauth", "/dev/", ".bak"])]
    
    total_files = 0
    total_changes = 0
    
    for filepath in sorted(files):
        rel = filepath.replace(APP_DIR + "/", "")
        changes = process_file(filepath)
        if changes > 0:
            total_files += 1
            total_changes += changes
            print(f"  ✅ {rel} ({changes} replacements)")
    
    print(f"\n✅ Done! Updated {total_files} files with {total_changes} total replacements.")

if __name__ == "__main__":
    main()
