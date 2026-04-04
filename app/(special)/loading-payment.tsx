// Screen 71 — Loading Payment — STATIC 
// Mascot credit card, security badge, 90s timeout
import { View, Text, StyleSheet } from "react-native";

export default function LoadingPaymentScreen() {
  return (
    <View style={s.root}>
      <View style={s.mascot}><Text style={s.mascotText}>[MASCOT + 💳]</Text></View>
      <Text style={s.title}>Processing Payment</Text>
      <Text style={s.subtitle}>Securing your booking...</Text>
      <View style={s.progressBar}>
        <View style={s.progressFill} />
      </View>
      <View style={s.securityBadge}>
        <Text style={s.badgeIcon}>🔒</Text>
        <Text style={s.badgeText}>256-bit SSL Encrypted</Text>
      </View>
      <Text style={s.hint}>Please don't close this screen. This may take up to 90 seconds.</Text>
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
  progressFill: { width: "40%", height: 6, borderRadius: 3, backgroundColor: "#555" },
  securityBadge: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 24, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  badgeIcon: { fontSize: 14 },
  badgeText: { color: "#888", fontSize: 12 },
  hint: { color: "#555", fontSize: 12, textAlign: "center", marginTop: 20, lineHeight: 18 },
});
