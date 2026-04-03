// Screen 67 — Empty No Trips — STATIC WIREFRAME
// Suitcase icon + Plan a Trip CTA
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function EmptyTripsScreen() {
  return (
    <View style={s.root}>
      <View style={s.iconWrap}><Text style={s.icon}>🧳</Text></View>
      <Text style={s.title}>No Trips Yet</Text>
      <Text style={s.body}>Start planning your first adventure! TRAVI will help you find the perfect destination based on your travel DNA.</Text>
      <Pressable style={s.ctaBtn}><Text style={s.ctaText}>Plan a Trip</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 40 },
  iconWrap: { width: 120, height: 120, borderRadius: 30, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  icon: { fontSize: 48 },
  title: { color: "#FFF", fontSize: 22, fontWeight: "800", textAlign: "center" },
  body: { color: "#888", fontSize: 14, textAlign: "center", lineHeight: 22, marginTop: 8 },
  ctaBtn: { marginTop: 24, height: 48, paddingHorizontal: 32, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
});
