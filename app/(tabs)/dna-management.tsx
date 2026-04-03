// Screen 16 — DNA Management — STATIC WIREFRAME
// Route: /(tabs)/dna-management (or /profile/dna) | Mode: Universal
// Spec: Header 60px, Hero 200px gradient, 8 dimension cards (120px each, progress bars), Retake section

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const DIMENSIONS = [
  { label: "Adventurer", score: 87, emoji: "🪂", color: "#EF4444" },
  { label: "Explorer", score: 74, emoji: "🧭", color: "#3B82F6" },
  { label: "Foodie", score: 68, emoji: "🍜", color: "#F59E0B" },
  { label: "Culturalist", score: 55, emoji: "🏛️", color: "#8B5CF6" },
  { label: "Photographer", score: 48, emoji: "📸", color: "#EC4899" },
  { label: "Naturalist", score: 42, emoji: "🌿", color: "#22C55E" },
  { label: "Relaxer", score: 35, emoji: "🧘", color: "#06B6D4" },
  { label: "Historian", score: 28, emoji: "📜", color: "#78350F" },
];

export default function DNAManagementScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>My Travel DNA</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero — 200px */}
        <View style={s.hero}>
          <Text style={s.heroEmoji}>🧬</Text>
          <Text style={s.heroTitle}>Your Travel DNA</Text>
          <Text style={s.heroSub}>Based on 20 preferences analyzed</Text>
          <View style={s.heroBadge}><Text style={s.heroBadgeText}>Explorer Type</Text></View>
        </View>

        {/* 8 Dimension Cards — 120px each */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>All Dimensions</Text>
          {DIMENSIONS.map((dim) => (
            <View key={dim.label} style={s.dimCard}>
              <View style={s.dimHeader}>
                <Text style={s.dimEmoji}>{dim.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.dimLabel}>{dim.label}</Text>
                  <View style={s.barTrack}>
                    <View style={[s.barFill, { width: `${dim.score}%`, backgroundColor: dim.color }]} />
                  </View>
                </View>
                <Text style={[s.dimScore, { color: dim.color }]}>{dim.score}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Retake section */}
        <View style={s.section}>
          <View style={s.retakeCard}>
            <Text style={s.retakeTitle}>Want to update your DNA?</Text>
            <Text style={s.retakeSub}>Retake the quiz to get fresh recommendations</Text>
            <Pressable style={s.retakeBtn}>
              <Text style={s.retakeBtnText}>Retake DNA Quiz</Text>
            </Pressable>
          </View>
        </View>

        {/* Last updated */}
        <Text style={s.lastUpdated}>Last updated: March 15, 2026</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#222", marginTop: 48,
  },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  hero: {
    height: 200, backgroundColor: "#1A1A1A", alignItems: "center",
    justifyContent: "center", gap: 8,
    borderBottomWidth: 1, borderBottomColor: "#222",
  },
  heroEmoji: { fontSize: 48 },
  heroTitle: { color: "#FFF", fontSize: 22, fontWeight: "700" },
  heroSub: { color: "#888", fontSize: 14 },
  heroBadge: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16,
    backgroundColor: "#333", borderWidth: 1, borderColor: "#555",
  },
  heroBadgeText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  dimCard: {
    height: 72, borderRadius: 12, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", paddingHorizontal: 16,
    justifyContent: "center", marginBottom: 8,
  },
  dimHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  dimEmoji: { fontSize: 24 },
  dimLabel: { color: "#FFF", fontSize: 15, fontWeight: "600", marginBottom: 6 },
  barTrack: { height: 6, borderRadius: 3, backgroundColor: "#222" },
  barFill: { height: 6, borderRadius: 3 },
  dimScore: { fontSize: 16, fontWeight: "700", width: 44, textAlign: "right" },
  retakeCard: {
    padding: 20, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", alignItems: "center", gap: 8,
  },
  retakeTitle: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  retakeSub: { color: "#888", fontSize: 13, textAlign: "center" },
  retakeBtn: {
    marginTop: 8, paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 20, backgroundColor: "#333", borderWidth: 1, borderColor: "#555",
  },
  retakeBtnText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  lastUpdated: { color: "#555", fontSize: 12, textAlign: "center", marginTop: 24 },
});
