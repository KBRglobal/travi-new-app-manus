// Screen 70 — Loading Matching Engine — STATIC 
// Mascot with magnifier, rotating subtext, progress bar, 30s timeout
import { View, Text, StyleSheet } from "react-native";

export default function LoadingMatchingScreen() {
  return (
    <View style={s.root}>
      <View style={s.mascot}><Text style={s.mascotText}>[MASCOT + 🔍]</Text></View>
      <Text style={s.title}>Finding Your Perfect Match</Text>
      <Text style={s.subtitle}>Analyzing your travel DNA...</Text>
      <View style={s.progressBar}>
        <View style={s.progressFill} />
      </View>
      <Text style={s.progressText}>65%</Text>
      <Text style={s.hint}>This usually takes 10-30 seconds</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 40 },
  mascot: { width: 140, height: 140, borderRadius: 35, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  mascotText: { color: "#555", fontSize: 16 },
  title: { color: "#FFF", fontSize: 22, fontWeight: "800", textAlign: "center" },
  subtitle: { color: "#888", fontSize: 14, marginTop: 8 },
  progressBar: { width: "80%", height: 6, borderRadius: 3, backgroundColor: "#222", marginTop: 24 },
  progressFill: { width: "65%", height: 6, borderRadius: 3, backgroundColor: "#555" },
  progressText: { color: "#888", fontSize: 13, marginTop: 6 },
  hint: { color: "#555", fontSize: 12, marginTop: 20 },
});
