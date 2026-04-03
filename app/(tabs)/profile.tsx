/**
 * TRAVI — Profile Screen (Wireframe / Neutral)
 * Clean minimal dark theme. Toggle state bug fixed.
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Switch,
} from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const N = {
  bg:         "#111111",
  surface:    "#1C1C1E",
  surfaceAlt: "#2C2C2E",
  border:     "rgba(255,255,255,0.10)",
  white:      "#FFFFFF",
  textPri:    "#FFFFFF",
  textSec:    "#ABABAB",
  textMuted:  "#777777",
  accent:     "#007AFF",
  green:      "#34C759",
  red:        "#FF3B30",
};

const DNA_TRAITS = [
  { label: "Adventure", pct: 85 },
  { label: "Culture",   pct: 72 },
  { label: "Wellness",  pct: 65 },
  { label: "Food",      pct: 90 },
  { label: "Nature",    pct: 78 },
];

const ACHIEVEMENTS = [
  { id: "a1", emoji: "🌍", title: "World Explorer",  desc: "Visited 10+ countries", earned: true },
  { id: "a2", emoji: "✈️", title: "Frequent Flyer",  desc: "20+ flights booked",    earned: true },
  { id: "a3", emoji: "🏆", title: "Elite Nomad",     desc: "Gold tier member",       earned: false },
  { id: "a4", emoji: "🧬", title: "DNA Pioneer",     desc: "Completed DNA quiz",     earned: true },
  { id: "a5", emoji: "💎", title: "Hidden Gem",      desc: "Visited 3 hidden gems",  earned: false },
  { id: "a6", emoji: "⭐", title: "5-Star Traveler", desc: "All 5-star reviews",     earned: true },
];

const SETTINGS_SECTIONS = [
  {
    title: "Preferences",
    items: [
      { id: "s1", icon: "globe" as const,                  label: "Language",      value: "English",  hasChevron: true,  isToggle: false },
      { id: "s2", icon: "dollarsign.circle.fill" as const, label: "Currency",      value: "EUR (€)",  hasChevron: true,  isToggle: false },
      { id: "s3", icon: "bell.fill" as const,              label: "Notifications", value: "",         hasChevron: false, isToggle: true },
      { id: "s4", icon: "moon.fill" as const,              label: "Dark Mode",     value: "",         hasChevron: false, isToggle: true },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "s5", icon: "person.fill" as const,              label: "Edit Profile",       value: "", hasChevron: true,  isToggle: false },
      { id: "s6", icon: "lock.fill" as const,                label: "Privacy & Security", value: "", hasChevron: true,  isToggle: false },
      { id: "s7", icon: "creditcard.fill" as const,          label: "Payment Methods",    value: "", hasChevron: true,  isToggle: false },
      { id: "s8", icon: "questionmark.circle.fill" as const, label: "Help & Support",     value: "", hasChevron: true,  isToggle: false },
    ],
  },
];

function TraitBar({ trait }: { trait: typeof DNA_TRAITS[0] }) {
  return (
    <View style={S.traitRow}>
      <Text style={S.traitLabel}>{trait.label}</Text>
      <View style={S.traitBarBg}>
        <View style={[S.traitBarFill, { width: `${trait.pct}%` }]} />
      </View>
      <Text style={S.traitPct}>{trait.pct}%</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const tabBarOffset = 56 + Math.max(insets.bottom, 8) + 16;

  // FIX: toggles now actually update state
  const [toggles, setToggles] = useState<Record<string, boolean>>({ s3: true, s4: true });
  const toggleSwitch = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={S.root}>
      {/* ── Header ── */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <View style={S.profileRow}>
          <View style={S.avatar}>
            <Text style={S.avatarText}>AT</Text>
          </View>
          <View style={S.profileInfo}>
            <Text style={S.profileName}>Alex Traveler</Text>
            <Text style={S.profileEmail}>alex@travi.app</Text>
            <View style={S.tierBadge}>
              <Text style={S.tierBadgeText}>Gold Explorer</Text>
            </View>
          </View>
          <TouchableOpacity style={S.editBtn} activeOpacity={0.7}>
            <IconSymbol name="pencil" size={16} color={N.white} />
          </TouchableOpacity>
        </View>

        <View style={S.statsRow}>
          {([["23", "Countries"], ["47", "Trips"], ["8,450", "Points"], ["4.9", "Rating"]] as const).map(([num, label], i, arr) => (
            <React.Fragment key={label}>
              <View style={S.statItem}>
                <Text style={S.statNum}>{num}</Text>
                <Text style={S.statLabel}>{label}</Text>
              </View>
              {i < arr.length - 1 && <View style={S.statDivider} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        {/* ── Travel DNA ── */}
        <View style={S.sectionPad}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Travel DNA</Text>
            <TouchableOpacity onPress={() => router.push("/(trip)/swipe" as never)} activeOpacity={0.7}>
              <Text style={S.retakeText}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={S.card}>
            {DNA_TRAITS.map(t => <TraitBar key={t.label} trait={t} />)}
          </View>
        </View>

        {/* ── Achievements ── */}
        <View style={S.sectionPad}>
          <Text style={S.sectionTitle}>Achievements</Text>
          <View style={S.achievementsGrid}>
            {ACHIEVEMENTS.map(a => (
              <View key={a.id} style={[S.achievementCard, !a.earned && S.achievementLocked]}>
                <Text style={S.achievementEmoji}>{a.emoji}</Text>
                <Text style={S.achievementTitle}>{a.title}</Text>
                <Text style={S.achievementDesc}>{a.desc}</Text>
                {!a.earned && <Text style={S.lockedText}>Locked</Text>}
              </View>
            ))}
          </View>
        </View>

        {/* ── Settings ── */}
        {SETTINGS_SECTIONS.map(section => (
          <View key={section.title} style={S.sectionPad}>
            <Text style={S.sectionTitle}>{section.title}</Text>
            <View style={S.settingsCard}>
              {section.items.map((item, i) => (
                <View key={item.id} style={[S.settingsRow, i === section.items.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={S.settingsIconWrap}>
                    <IconSymbol name={item.icon} size={18} color={N.accent} />
                  </View>
                  <Text style={S.settingsLabel}>{item.label}</Text>
                  {item.isToggle ? (
                    <Switch
                      value={toggles[item.id] ?? false}
                      onValueChange={() => toggleSwitch(item.id)}
                      trackColor={{ false: N.surfaceAlt, true: N.accent }}
                      thumbColor={N.white}
                    />
                  ) : (
                    <View style={S.settingsRight}>
                      {item.value ? <Text style={S.settingsValue}>{item.value}</Text> : null}
                      <IconSymbol name="chevron.right" size={16} color={N.textMuted} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* ── Sign Out ── */}
        <View style={S.sectionPad}>
          <TouchableOpacity style={S.signOutBtn} activeOpacity={0.7}>
            <IconSymbol name="arrow.right.square.fill" size={18} color={N.red} />
            <Text style={S.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },

  // Header
  header: { paddingHorizontal: 20, paddingBottom: 16, gap: 16, backgroundColor: N.bg },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: N.surfaceAlt,
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: N.white, fontSize: 20, fontWeight: "700" },
  profileInfo: { flex: 1, gap: 3 },
  profileName: { color: N.white, fontSize: 20, fontWeight: "700" },
  profileEmail: { color: N.textSec, fontSize: 13 },
  tierBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3, marginTop: 2,
  },
  tierBadgeText: { color: N.textSec, fontSize: 11, fontWeight: "600" },
  editBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: N.surface, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  statItem: { flex: 1, alignItems: "center", gap: 2 },
  statNum: { color: N.white, fontSize: 16, fontWeight: "700" },
  statLabel: { color: N.textMuted, fontSize: 10 },
  statDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: N.border },

  // Sections
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { color: N.white, fontSize: 18, fontWeight: "700", marginBottom: 12 },
  retakeText: { color: N.accent, fontSize: 13, fontWeight: "500" },

  // DNA Card
  card: {
    backgroundColor: N.surface, borderRadius: 14, padding: 16, gap: 12,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  traitRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  traitLabel: { color: N.textSec, fontSize: 13, width: 75 },
  traitBarBg: { flex: 1, height: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" },
  traitBarFill: { height: "100%", borderRadius: 3, backgroundColor: N.accent },
  traitPct: { color: N.textSec, fontSize: 12, fontWeight: "600", width: 36, textAlign: "right" },

  // Achievements
  achievementsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  achievementCard: {
    width: "30.5%", backgroundColor: N.surface, borderRadius: 12,
    padding: 12, alignItems: "center", gap: 4,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  achievementLocked: { opacity: 0.45 },
  achievementEmoji: { fontSize: 24 },
  achievementTitle: { color: N.white, fontSize: 11, fontWeight: "600", textAlign: "center" },
  achievementDesc: { color: N.textMuted, fontSize: 9, textAlign: "center" },
  lockedText: { color: N.textMuted, fontSize: 9, marginTop: 2 },

  // Settings
  settingsCard: {
    backgroundColor: N.surface, borderRadius: 14, overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  settingsRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: N.border,
  },
  settingsIconWrap: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  settingsLabel: { flex: 1, color: N.textPri, fontSize: 15 },
  settingsRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  settingsValue: { color: N.textMuted, fontSize: 14 },

  // Sign Out
  signOutBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    backgroundColor: "rgba(255,59,48,0.08)", borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1, borderColor: "rgba(255,59,48,0.2)",
  },
  signOutText: { color: N.red, fontSize: 15, fontWeight: "600" },
});
