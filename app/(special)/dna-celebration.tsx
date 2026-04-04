// Screen 74 — DNA Completion Celebration — STATIC 
// Confetti, DNA badge 160px, top 3 dimensions, auto-enable CTA 3s
import { View, Text, StyleSheet, Pressable } from "react-native";

const TOP_3 = [
  { label: "Adventure", score: "92%", icon: "🏔" },
  { label: "Culture", score: "87%", icon: "🏛" },
  { label: "Relaxation", score: "78%", icon: "🏖" },
];

export default function DnaCelebrationScreen() {
  return (
    <View style={s.root}>
      {/* Confetti placeholder */}
      <Text style={s.confetti}>🎊 🎉 ✨</Text>

      <View style={s.badge}><Text style={s.badgeText}>🧬</Text></View>
      <Text style={s.title}>Your Travel DNA is Ready!</Text>
      <Text style={s.subtitle}>Based on your preferences, here's your travel personality</Text>

      {/* Top 3 dimensions */}
      <View style={s.dimensionsCard}>
        {TOP_3.map((d) => (
          <View key={d.label} style={s.dimRow}>
            <Text style={s.dimIcon}>{d.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.dimLabel}>{d.label}</Text>
              <View style={s.dimBar}><View style={[s.dimFill, { width: d.score as any }]} /></View>
            </View>
            <Text style={s.dimScore}>{d.score}</Text>
          </View>
        ))}
      </View>

      <View style={s.bottom}>
        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>See Recommendations</Text></Pressable>
        <Pressable><Text style={s.skipText}>Explore on my own</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 20 },
  confetti: { position: "absolute", top: 60, fontSize: 32 },
  badge: { width: 160, height: 160, borderRadius: 40, backgroundColor: "#1A1A1A", borderWidth: 2, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  badgeText: { fontSize: 64 },
  title: { color: "#FFF", fontSize: 24, fontWeight: "800", textAlign: "center" },
  subtitle: { color: "#888", fontSize: 14, textAlign: "center", marginTop: 6 },
  dimensionsCard: { width: "100%", marginTop: 28, padding: 16, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 14 },
  dimRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  dimIcon: { fontSize: 24 },
  dimLabel: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  dimBar: { height: 6, borderRadius: 3, backgroundColor: "#222", marginTop: 4 },
  dimFill: { height: 6, borderRadius: 3, backgroundColor: "#555" },
  dimScore: { color: "#888", fontSize: 13, fontWeight: "600", width: 36 },
  bottom: { position: "absolute", bottom: 40, left: 20, right: 20, alignItems: "center", gap: 12 },
  ctaBtn: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  skipText: { color: "#888", fontSize: 14 },
});
