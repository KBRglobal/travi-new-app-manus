// Screen 10 — Quick DNA: Summary — STATIC 
// Route: /dna/summary | Mode: Onboarding
// Spec: Top 3 DNA dimensions with bars, Share card, See Recommendations CTA

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const DNA_RESULTS = [
  { label: "Adventurer", score: 87, color: "#EF4444" },
  { label: "Explorer", score: 74, color: "#3B82F6" },
  { label: "Foodie", score: 68, color: "#F59E0B" },
  { label: "Culturalist", score: 55, color: "#6443F4" },
  { label: "Photographer", score: 48, color: "#F94498" },
  { label: "Naturalist", score: 42, color: "#22C55E" },
  { label: "Relaxer", score: 35, color: "#06B6D4" },
  { label: "Historian", score: 28, color: "#78350F" },
];

export default function SummaryScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <View style={{ width: 44 }} />
        <Text style={s.headerTitle}>Your Travel DNA</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyContent}>
        <View style={s.titleBadge}>
          <Text style={s.titleEmoji}>🧬</Text>
          <Text style={s.titleText}>DNA Analysis Complete!</Text>
        </View>

        <Text style={s.subtitle}>Based on your preferences, here's your travel personality</Text>

        {/* Top 3 */}
        <View style={s.topSection}>
          <Text style={s.sectionLabel}>YOUR TOP TRAITS</Text>
          {DNA_RESULTS.slice(0, 3).map((dim, i) => (
            <View key={dim.label} style={s.topTrait}>
              <View style={s.traitHeader}>
                <Text style={s.traitRank}>#{i + 1}</Text>
                <Text style={s.traitLabel}>{dim.label}</Text>
                <Text style={[s.traitScore, { color: dim.color }]}>{dim.score}%</Text>
              </View>
              <View style={s.barTrack}>
                <View style={[s.barFill, { width: `${dim.score}%`, backgroundColor: dim.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* All dimensions */}
        <View style={s.allSection}>
          <Text style={s.sectionLabel}>ALL DIMENSIONS</Text>
          {DNA_RESULTS.map((dim) => (
            <View key={dim.label} style={s.dimRow}>
              <Text style={s.dimLabel}>{dim.label}</Text>
              <View style={s.dimBarTrack}>
                <View style={[s.dimBarFill, { width: `${dim.score}%`, backgroundColor: dim.color }]} />
              </View>
              <Text style={s.dimScore}>{dim.score}</Text>
            </View>
          ))}
        </View>

        <Pressable style={s.shareBtn}>
          <Text style={s.shareText}>Share My DNA Card</Text>
        </Pressable>
      </ScrollView>

      <View style={s.bottomBar}>
        <Pressable style={s.primaryBtn}>
          <Text style={s.primaryText}>See My Recommendations</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#222", marginTop: 48,
  },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  body: { flex: 1 },
  bodyContent: { padding: 24, paddingBottom: 100 },
  titleBadge: {
    flexDirection: "row", alignItems: "center", gap: 8,
    alignSelf: "center", marginBottom: 8,
  },
  titleEmoji: { fontSize: 28 },
  titleText: { fontSize: 22, fontWeight: "700", color: "#FFF" },
  subtitle: { color: "#999", fontSize: 14, textAlign: "center", marginBottom: 28 },
  topSection: { marginBottom: 28 },
  sectionLabel: { color: "#888", fontSize: 12, fontWeight: "600", marginBottom: 16, letterSpacing: 1 },
  topTrait: { marginBottom: 16 },
  traitHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  traitRank: { color: "#666", fontSize: 14, fontWeight: "700", width: 28 },
  traitLabel: { flex: 1, color: "#FFF", fontSize: 16, fontWeight: "600" },
  traitScore: { fontSize: 16, fontWeight: "700" },
  barTrack: { height: 8, borderRadius: 4, backgroundColor: "#222" },
  barFill: { height: 8, borderRadius: 4 },
  allSection: { marginBottom: 24 },
  dimRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  dimLabel: { color: "#CCC", fontSize: 13, width: 90 },
  dimBarTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: "#222" },
  dimBarFill: { height: 4, borderRadius: 2 },
  dimScore: { color: "#888", fontSize: 13, width: 28, textAlign: "right" },
  shareBtn: {
    alignSelf: "center", paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 20, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333",
  },
  shareText: { color: "#CCC", fontSize: 14 },
  bottomBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 36, backgroundColor: "#111",
    borderTopWidth: 1, borderTopColor: "#222",
  },
  primaryBtn: {
    height: 56, borderRadius: 28, backgroundColor: "#333",
    borderWidth: 1, borderColor: "#555",
    justifyContent: "center", alignItems: "center",
  },
  primaryText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
