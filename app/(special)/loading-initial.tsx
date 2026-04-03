// Screen 69 — Loading Initial — STATIC WIREFRAME
// Mascot 180px + 3 loading dots
import { View, Text, StyleSheet } from "react-native";

export default function LoadingInitialScreen() {
  return (
    <View style={s.root}>
      <View style={s.mascot}><Text style={s.mascotText}>[MASCOT]</Text></View>
      <Text style={s.logo}>TRAVI</Text>
      <Text style={s.tagline}>Your AI Travel Companion</Text>
      <View style={s.dotsRow}>
        <View style={s.dot} />
        <View style={[s.dot, s.dotActive]} />
        <View style={s.dot} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center" },
  mascot: { width: 180, height: 180, borderRadius: 40, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  mascotText: { color: "#555", fontSize: 16 },
  logo: { color: "#FFF", fontSize: 36, fontWeight: "900", letterSpacing: 4 },
  tagline: { color: "#888", fontSize: 14, marginTop: 6 },
  dotsRow: { flexDirection: "row", gap: 8, marginTop: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#333" },
  dotActive: { backgroundColor: "#888" },
});
