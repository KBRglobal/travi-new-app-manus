// Screen 81 — Traveler Card Swipe (Static Wireframe)
// Route: /social/discover/swipe | Mode: Discovery (Social)
// Zones: Header 60px, Card Stack (full), Action Buttons 80px

import { Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function SwipeTravelersScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.backArrow}>←</Text>
          <Text style={s.headerTitle}>Find Travel Buddies</Text>
          <Text style={s.headerIcon}>⚙</Text>
        </View>

        {/* Card Stack */}
        <View style={s.cardStack}>
          {/* Background card (peek) */}
          <View style={[s.card, s.cardBehind]}>
            <View style={s.cardImageArea}>
              <Text style={s.cardInitial}>E</Text>
            </View>
          </View>

          {/* Front card */}
          <View style={s.card}>
            <View style={s.cardImageArea}>
              <Text style={s.cardInitial}>S</Text>
              <View style={s.onlineBadge}><Text style={s.onlineText}>● Online</Text></View>
              <View style={s.verifiedBadge}><Text style={s.verifiedText}>✓ Verified</Text></View>
            </View>
            <View style={s.cardInfo}>
              <View style={s.nameRow}>
                <Text style={s.cardName}>Sarah Mitchell, 28</Text>
                <View style={s.matchBadge}><Text style={s.matchText}>92% Match</Text></View>
              </View>
              <Text style={s.cardLocation}>Barcelona, Spain</Text>
              <Text style={s.cardBio}>Food lover, culture explorer. Always looking for the best local spots and hidden gems.</Text>
              <View style={s.interestsRow}>
                {["Food", "Culture", "Photography", "Markets"].map((i) => (
                  <View key={i} style={s.interestPill}><Text style={s.interestText}>{i}</Text></View>
                ))}
              </View>
              <View style={s.dnaPreview}>
                <Text style={s.dnaLabel}>Top DNA:</Text>
                <Text style={s.dnaValue}>Food 95 · Culture 90 · Adventure 85</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons — 80px */}
        <View style={s.actionsRow}>
          <View style={[s.actionBtn, s.actionSkip]}>
            <Text style={s.actionEmoji}>✕</Text>
            <Text style={s.actionLabel}>Skip</Text>
          </View>
          <View style={[s.actionBtn, s.actionSuperLike]}>
            <Text style={s.actionEmoji}>⭐</Text>
            <Text style={s.actionLabel}>Super</Text>
          </View>
          <View style={[s.actionBtn, s.actionConnect]}>
            <Text style={s.actionEmoji}>✓</Text>
            <Text style={s.actionLabel}>Connect</Text>
          </View>
        </View>
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
  headerIcon: { fontSize: 20, color: G },

  cardStack: { flex: 1, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  card: { position: "absolute", top: 8, left: 16, right: 16, bottom: 0, backgroundColor: N2, borderRadius: 24, borderWidth: 1, borderColor: N3, overflow: "hidden" },
  cardBehind: { top: 16, left: 24, right: 24, transform: [{ scale: 0.95 }], opacity: 0.5 },
  cardImageArea: { height: "50%", backgroundColor: N3, alignItems: "center", justifyContent: "center" },
  cardInitial: { fontSize: 64, fontWeight: "700", color: "#333" },
  onlineBadge: { position: "absolute", top: 12, left: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.6)" },
  onlineText: { fontSize: 12, color: "#4a4" },
  verifiedBadge: { position: "absolute", top: 12, right: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.6)" },
  verifiedText: { fontSize: 12, color: "#69c" },
  cardInfo: { flex: 1, padding: 16, gap: 8 },
  nameRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardName: { fontSize: 22, fontWeight: "700", color: W },
  matchBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: "#1a3a1a" },
  matchText: { fontSize: 12, fontWeight: "600", color: "#4a4" },
  cardLocation: { fontSize: 14, color: G },
  cardBio: { fontSize: 14, color: "#aaa", lineHeight: 20 },
  interestsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  interestPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: N3 },
  interestText: { fontSize: 12, color: G },
  dnaPreview: { flexDirection: "row", gap: 6, marginTop: 4 },
  dnaLabel: { fontSize: 12, fontWeight: "600", color: G },
  dnaValue: { fontSize: 12, color: "#aaa" },

  actionsRow: { flexDirection: "row", justifyContent: "center", gap: 24, paddingVertical: 16, paddingBottom: 24 },
  actionBtn: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", backgroundColor: N2, borderWidth: 1, borderColor: N3 },
  actionSkip: { borderColor: "#533" },
  actionSuperLike: { borderColor: "#553" },
  actionConnect: { borderColor: "#353" },
  actionEmoji: { fontSize: 24 },
  actionLabel: { fontSize: 10, color: G, marginTop: 2 },
});
