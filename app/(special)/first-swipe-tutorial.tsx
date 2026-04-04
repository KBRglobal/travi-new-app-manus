// Screen 72 — First Swipe Tutorial — STATIC 
// 4 steps, spotlight, progress dots, skip
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function FirstSwipeTutorialScreen() {
  return (
    <View style={s.root}>
      <View style={s.overlay} />
      {/* Spotlight area */}
      <View style={s.spotlightArea}>
        <View style={s.fakeCard}>
          <Text style={s.fakeCardText}>[DESTINATION CARD]</Text>
        </View>
      </View>
      {/* Tutorial tooltip */}
      <View style={s.tooltip}>
        <Text style={s.tooltipTitle}>Swipe Right to Like</Text>
        <Text style={s.tooltipBody}>Swipe right on destinations you love. We'll use this to build your travel DNA profile.</Text>
        <View style={s.dotsRow}>
          <View style={[s.dot, s.dotActive]} />
          <View style={s.dot} />
          <View style={s.dot} />
          <View style={s.dot} />
        </View>
        <View style={s.tooltipActions}>
          <Pressable><Text style={s.skipText}>Skip</Text></Pressable>
          <Pressable style={s.nextBtn}><Text style={s.nextText}>Next</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000", opacity: 0.6 },
  spotlightArea: { flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 80 },
  fakeCard: { width: "85%", height: "60%", borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 2, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  fakeCardText: { color: "#555", fontSize: 16 },
  tooltip: { position: "absolute", bottom: 80, left: 20, right: 20, padding: 20, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  tooltipTitle: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  tooltipBody: { color: "#888", fontSize: 14, lineHeight: 22, marginTop: 6 },
  dotsRow: { flexDirection: "row", gap: 6, marginTop: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#333" },
  dotActive: { backgroundColor: "#FFF", width: 20 },
  tooltipActions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 },
  skipText: { color: "#888", fontSize: 14 },
  nextBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: "#333", borderWidth: 1, borderColor: "#555" },
  nextText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
});
