// Screen 80 — Travel Compatibility Score (Static Wireframe)
// Route: /social/compatibility | Mode: Discovery (Social)
// Zones: Header 60px, Versus Section 160px, Score Ring 200px, Dimensions 8 rows, CTA

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const DIMENSIONS = [
  { name: "Adventure", you: 85, them: 78 },
  { name: "Culture", you: 72, them: 90 },
  { name: "Food", you: 95, them: 88 },
  { name: "Relaxation", you: 60, them: 65 },
  { name: "Nightlife", you: 45, them: 70 },
  { name: "Nature", you: 80, them: 82 },
  { name: "Budget", you: 70, them: 75 },
  { name: "Luxury", you: 55, them: 40 },
];

export default function CompatibilityScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.backArrow}>←</Text>
          <Text style={s.headerTitle}>Compatibility</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Versus Section — 160px */}
          <View style={s.versusSection}>
            <View style={s.versusUser}>
              <View style={s.versusAvatar}><Text style={s.versusInitial}>Y</Text></View>
              <Text style={s.versusName}>You</Text>
            </View>
            <View style={s.vsCircle}><Text style={s.vsText}>VS</Text></View>
            <View style={s.versusUser}>
              <View style={s.versusAvatar}><Text style={s.versusInitial}>S</Text></View>
              <Text style={s.versusName}>Sarah M.</Text>
            </View>
          </View>

          {/* Score Ring — 200px */}
          <View style={s.scoreSection}>
            <View style={s.scoreRing}>
              <Text style={s.scoreNumber}>87</Text>
              <Text style={s.scorePercent}>%</Text>
            </View>
            <Text style={s.scoreLabel}>Travel Compatibility</Text>
            <Text style={s.scoreDesc}>You and Sarah share similar travel styles in Food, Nature, and Adventure.</Text>
          </View>

          {/* Dimension Comparison */}
          <View style={s.dimensionsSection}>
            <Text style={s.sectionTitle}>DNA Comparison</Text>
            <View style={s.legendRow}>
              <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: "#666" }]} /><Text style={s.legendText}>You</Text></View>
              <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: "#999" }]} /><Text style={s.legendText}>Sarah</Text></View>
            </View>
            {DIMENSIONS.map((dim) => (
              <View key={dim.name} style={s.dimRow}>
                <Text style={s.dimName}>{dim.name}</Text>
                <View style={s.dimBars}>
                  <View style={s.dimBarTrack}>
                    <View style={[s.dimBarFill, { width: `${dim.you}%`, backgroundColor: "#666" }]} />
                  </View>
                  <View style={s.dimBarTrack}>
                    <View style={[s.dimBarFill, { width: `${dim.them}%`, backgroundColor: "#999" }]} />
                  </View>
                </View>
                <View style={s.dimScores}>
                  <Text style={s.dimScore}>{dim.you}</Text>
                  <Text style={s.dimScore}>{dim.them}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Shared Interests */}
          <View style={s.sharedSection}>
            <Text style={s.sectionTitle}>Shared Interests</Text>
            <View style={s.pillsRow}>
              {["Street Food", "Hiking", "Photography", "Local Markets", "Sunsets"].map((i) => (
                <View key={i} style={s.pill}><Text style={s.pillText}>{i}</Text></View>
              ))}
            </View>
          </View>

          {/* CTA */}
          <View style={s.ctaSection}>
            <View style={s.ctaBtn}><Text style={s.ctaText}>Send Connect Request</Text></View>
            <View style={s.ctaBtnSecondary}><Text style={s.ctaTextSecondary}>Message Sarah</Text></View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const N = "#111"; const N2 = "#1a1a1a"; const N3 = "#222"; const W = "#fff"; const G = "#888";

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: N },
  header: { height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  backArrow: { fontSize: 24, color: W },
  headerTitle: { fontSize: 20, fontWeight: "700", color: W },
  scroll: { paddingHorizontal: 16 },

  versusSection: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 160, gap: 24 },
  versusUser: { alignItems: "center", gap: 8 },
  versusAvatar: { width: 72, height: 72, borderRadius: 18, backgroundColor: N2, borderWidth: 2, borderColor: N3, alignItems: "center", justifyContent: "center" },
  versusInitial: { fontSize: 28, fontWeight: "700", color: "#555" },
  versusName: { fontSize: 16, fontWeight: "600", color: W },
  vsCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: N3, alignItems: "center", justifyContent: "center" },
  vsText: { fontSize: 14, fontWeight: "700", color: G },

  scoreSection: { alignItems: "center", paddingVertical: 24 },
  scoreRing: { width: 140, height: 140, borderRadius: 70, borderWidth: 6, borderColor: "#444", alignItems: "center", justifyContent: "center", flexDirection: "row" },
  scoreNumber: { fontSize: 48, fontWeight: "700", color: W },
  scorePercent: { fontSize: 20, fontWeight: "600", color: G, marginTop: 8 },
  scoreLabel: { fontSize: 18, fontWeight: "600", color: W, marginTop: 12 },
  scoreDesc: { fontSize: 14, color: G, textAlign: "center", marginTop: 8, lineHeight: 20, paddingHorizontal: 20 },

  dimensionsSection: { marginTop: 24, gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: W, marginBottom: 4 },
  legendRow: { flexDirection: "row", gap: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: G },
  dimRow: { flexDirection: "row", alignItems: "center", gap: 8, height: 44 },
  dimName: { width: 80, fontSize: 13, color: G },
  dimBars: { flex: 1, gap: 3 },
  dimBarTrack: { height: 6, borderRadius: 3, backgroundColor: N3 },
  dimBarFill: { height: 6, borderRadius: 3 },
  dimScores: { width: 40, gap: 2, alignItems: "flex-end" },
  dimScore: { fontSize: 11, color: G },

  sharedSection: { marginTop: 24, gap: 12 },
  pillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: N2, borderWidth: 1, borderColor: N3 },
  pillText: { fontSize: 13, color: G },

  ctaSection: { marginTop: 32, gap: 12 },
  ctaBtn: { height: 52, borderRadius: 14, backgroundColor: "#333", alignItems: "center", justifyContent: "center" },
  ctaText: { fontSize: 16, fontWeight: "600", color: W },
  ctaBtnSecondary: { height: 52, borderRadius: 14, backgroundColor: N2, borderWidth: 1, borderColor: N3, alignItems: "center", justifyContent: "center" },
  ctaTextSecondary: { fontSize: 16, fontWeight: "600", color: G },
});
