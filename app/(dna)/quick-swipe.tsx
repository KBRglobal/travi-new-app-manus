// Screen 8 — Quick DNA: Swipe — STATIC WIREFRAME
// Route: /dna/quick-swipe | Mode: Onboarding
// Spec: Full-screen card, swipe left/right indicators, progress bar,
// Category badge, Like/Dislike/Undo buttons bottom

import { View, Text, StyleSheet, Pressable } from "react-native";

export default function QuickSwipeScreen() {
  return (
    <View style={s.root}>
      {/* Progress bar */}
      <View style={s.progressArea}>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: "35%" }]} />
        </View>
        <Text style={s.progressLabel}>7 / 20</Text>
      </View>

      {/* Card area */}
      <View style={s.cardArea}>
        <View style={[s.swipeIndicator, s.swipeLeft]}>
          <Text style={s.swipeTextNope}>NOPE</Text>
        </View>
        <View style={[s.swipeIndicator, s.swipeRight]}>
          <Text style={s.swipeTextLike}>LIKE</Text>
        </View>

        <View style={s.card}>
          <View style={s.cardImage}>
            <Text style={s.imagePlaceholder}>Activity Image</Text>
          </View>
          <View style={s.categoryBadge}>
            <Text style={s.categoryText}>Adventure</Text>
          </View>
          <View style={s.cardInfo}>
            <Text style={s.cardTitle}>Bungee Jumping</Text>
            <Text style={s.cardSubtitle}>Queenstown, New Zealand</Text>
            <View style={s.tagRow}>
              <View style={s.tag}><Text style={s.tagText}>Extreme</Text></View>
              <View style={s.tag}><Text style={s.tagText}>Outdoor</Text></View>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={s.bottomBar}>
        <Pressable style={[s.actionBtn, s.dislikeBtn]}>
          <Text style={s.actionIcon}>✕</Text>
        </Pressable>
        <Pressable style={[s.actionBtn, s.undoBtn]}>
          <Text style={s.actionIconSmall}>↩</Text>
        </Pressable>
        <Pressable style={[s.actionBtn, s.likeBtn]}>
          <Text style={s.actionIcon}>♥</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  progressArea: {
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 12,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  progressTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: "#333" },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: "#666" },
  progressLabel: { color: "#888", fontSize: 13 },
  cardArea: { flex: 1, padding: 16 },
  swipeIndicator: {
    position: "absolute", top: "40%", zIndex: 10,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 2,
  },
  swipeLeft: { left: 24, borderColor: "#EF4444", transform: [{ rotate: "-15deg" }] },
  swipeRight: { right: 24, borderColor: "#22C55E", transform: [{ rotate: "15deg" }] },
  swipeTextNope: { color: "#EF4444", fontSize: 24, fontWeight: "800" },
  swipeTextLike: { color: "#22C55E", fontSize: 24, fontWeight: "800" },
  card: {
    flex: 1, borderRadius: 20, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", overflow: "hidden",
  },
  cardImage: {
    flex: 1, backgroundColor: "#222",
    justifyContent: "center", alignItems: "center",
  },
  imagePlaceholder: { color: "#555", fontSize: 16 },
  categoryBadge: {
    position: "absolute", top: 16, left: 16,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  categoryText: { color: "#FFF", fontSize: 13, fontWeight: "500" },
  cardInfo: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: 20, backgroundColor: "rgba(0,0,0,0.7)",
  },
  cardTitle: { color: "#FFF", fontSize: 22, fontWeight: "700", marginBottom: 4 },
  cardSubtitle: { color: "#999", fontSize: 14, marginBottom: 8 },
  tagRow: { flexDirection: "row", gap: 8 },
  tag: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  tagText: { color: "#CCC", fontSize: 12 },
  bottomBar: {
    flexDirection: "row", justifyContent: "center", gap: 24,
    paddingVertical: 20, paddingBottom: 40,
  },
  actionBtn: {
    width: 64, height: 64, borderRadius: 32,
    justifyContent: "center", alignItems: "center", borderWidth: 2,
  },
  dislikeBtn: { borderColor: "#EF4444", backgroundColor: "rgba(239,68,68,0.1)" },
  undoBtn: { borderColor: "#555", backgroundColor: "#1A1A1A", width: 48, height: 48, borderRadius: 24 },
  likeBtn: { borderColor: "#22C55E", backgroundColor: "rgba(34,197,94,0.1)" },
  actionIcon: { fontSize: 24, color: "#FFF" },
  actionIconSmall: { fontSize: 20, color: "#888" },
});
