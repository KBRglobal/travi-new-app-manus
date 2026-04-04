#!/usr/bin/env python3
"""
TRAVI DNA Comprehensive Applier
Applies the approved TRAVI design DNA to ALL screens that haven't been updated yet.
Strategy: For each screen, inject the DS constants and replace old patterns.
"""

import os
import re
import glob

BASE = "/home/ubuntu/travi-app/app"

# The DS constants block to inject at the top of each file
DS_IMPORT = '''import { LinearGradient } from "expo-linear-gradient";
'''

DS_CONST = '''
const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };
'''

# Patterns to replace in all files
REPLACEMENTS = [
    # Background colors
    (r"backgroundColor:\s*['\"]#1a1a2e['\"]", "backgroundColor: '#0A0514'"),
    (r'backgroundColor:\s*"#1a1a2e"', 'backgroundColor: "#0A0514"'),
    (r"backgroundColor:\s*['\"]#16213e['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#0f3460['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#1A0B2E['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#0D0221['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#0E0618['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#120824['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#0D1117['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]black['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#000000['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#0a0a0a['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#111111['\"]", "backgroundColor: '#0A0514'"),
    (r"backgroundColor:\s*['\"]#0d0d0d['\"]", "backgroundColor: '#0A0514'"),
    # Surface colors
    (r"backgroundColor:\s*['\"]#1e2022['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#1E1E2E['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#1a1a3e['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#16092C['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#1A0A30['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#1e1e2e['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#2a2a3e['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    (r"backgroundColor:\s*['\"]#252535['\"]", "backgroundColor: 'rgba(36,16,62,0.55)'"),
    # Old accent colors
    (r"backgroundColor:\s*['\"]#e94560['\"]", "backgroundColor: '#6443F4'"),
    (r"backgroundColor:\s*['\"]#533483['\"]", "backgroundColor: '#6443F4'"),
    (r"backgroundColor:\s*['\"]#7B44E6['\"]", "backgroundColor: '#6443F4'"),
    (r"backgroundColor:\s*['\"]#7C3AED['\"]", "backgroundColor: '#6443F4'"),
    (r"backgroundColor:\s*['\"]#8B5CF6['\"]", "backgroundColor: '#6443F4'"),
    # Inline color strings
    (r"['\"]#1a1a2e['\"]", "'#0A0514'"),
    (r"['\"]#16213e['\"]", "'#0A0514'"),
    (r"['\"]#0f3460['\"]", "'#0A0514'"),
    (r"['\"]#1A0B2E['\"]", "'#0A0514'"),
    (r"['\"]#0D0221['\"]", "'#0A0514'"),
    (r"['\"]#0E0618['\"]", "'#0A0514'"),
    (r"['\"]#1e2022['\"]", "'rgba(36,16,62,0.55)'"),
    (r"['\"]#1E1E2E['\"]", "'rgba(36,16,62,0.55)'"),
    (r"['\"]#1a1a3e['\"]", "'rgba(36,16,62,0.55)'"),
    (r"['\"]#16092C['\"]", "'rgba(36,16,62,0.55)'"),
    (r"['\"]#1A0A30['\"]", "'rgba(36,16,62,0.55)'"),
    (r"['\"]#e94560['\"]", "'#6443F4'"),
    (r"['\"]#533483['\"]", "'#6443F4'"),
    (r"['\"]#7B44E6['\"]", "'#6443F4'"),
    (r"['\"]#7C3AED['\"]", "'#6443F4'"),
    (r"['\"]#8B5CF6['\"]", "'#6443F4'"),
    # Font families
    (r"fontFamily:\s*['\"]System['\"]", "fontFamily: 'Satoshi-Regular'"),
    (r"fontFamily:\s*['\"]SF Pro Display['\"]", "fontFamily: 'Chillax-Bold'"),
    (r"fontFamily:\s*['\"]SF Pro Text['\"]", "fontFamily: 'Satoshi-Regular'"),
    (r"fontFamily:\s*['\"]Helvetica['\"]", "fontFamily: 'Satoshi-Regular'"),
    (r"fontFamily:\s*['\"]Arial['\"]", "fontFamily: 'Satoshi-Regular'"),
    # Tint/accent colors
    (r"color:\s*['\"]#e94560['\"]", "color: '#6443F4'"),
    (r"color:\s*['\"]#533483['\"]", "color: '#6443F4'"),
    (r"color:\s*['\"]#7B44E6['\"]", "color: '#6443F4'"),
    (r"color:\s*['\"]#7C3AED['\"]", "color: '#6443F4'"),
    (r"color:\s*['\"]#8B5CF6['\"]", "color: '#6443F4'"),
    # Border colors
    (r"borderColor:\s*['\"]#e94560['\"]", "borderColor: '#6443F4'"),
    (r"borderColor:\s*['\"]#533483['\"]", "borderColor: '#6443F4'"),
    (r"borderColor:\s*['\"]#7B44E6['\"]", "borderColor: '#6443F4'"),
]

# Screens already fully designed — skip these
SKIP_SCREENS = {
    "app/(tabs)/index.tsx",
    "app/(tabs)/trips.tsx",
    "app/(tabs)/wallet.tsx",
    "app/(tabs)/explore.tsx",
    "app/(tabs)/profile.tsx",
    "app/(auth)/welcome.tsx",
    "app/(auth)/sign-up.tsx",
    "app/(auth)/verify.tsx",
    "app/(auth)/profile-setup.tsx",
    "app/(auth)/welcome-travi.tsx",
    "app/(trip)/plan.tsx",
    "app/(trip)/destination-detail.tsx",
    "app/(live)/home.tsx",
    "app/(points)/dashboard.tsx",
    "app/(social)/discover.tsx",
    "app/(error)/no-internet.tsx",
    "app/(error)/api-error.tsx",
}

def process_file(filepath):
    rel = filepath.replace(BASE + "/", "app/")
    if rel in SKIP_SCREENS:
        return 0
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        changes = 0
        
        for pattern, replacement in REPLACEMENTS:
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
        print(f"  ⚠️  Error: {filepath}: {e}")
        return 0

def main():
    files = glob.glob(os.path.join(BASE, "**/*.tsx"), recursive=True)
    files = [f for f in files if not any(x in f for x in ["_layout", "+not-found", "oauth", "/dev/"])]
    
    total_files = 0
    total_changes = 0
    
    for filepath in sorted(files):
        changes = process_file(filepath)
        if changes > 0:
            total_files += 1
            total_changes += changes
            rel = filepath.replace(BASE + "/", "")
            print(f"  ✅ {rel} ({changes} replacements)")
    
    print(f"\n✅ Done! Updated {total_files} files with {total_changes} total replacements.")

if __name__ == "__main__":
    main()
