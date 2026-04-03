// Screen 75 — First Booking Success — STATIC WIREFRAME
// Confetti, trip card 180px, achievement badge, auto-dismiss 5s
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function FirstBookingSuccessScreen() {
  return (
    <View style={s.root}>
      <Text style={s.confetti}>🎊 🎉 ✨ 🎆</Text>

      <View style={s.achievementBadge}>
        <Text style={s.badgeIcon}>🏆</Text>
        <Text style={s.badgeTitle}>First Trip Booked!</Text>
      </View>

      <Text style={s.title}>Congratulations!</Text>
      <Text style={s.subtitle}>Your first adventure awaits</Text>

      {/* Trip card — 180px */}
      <View style={s.tripCard}>
        <View style={s.tripImage}><Text style={s.tripImageText}>[DESTINATION IMAGE]</Text></View>
        <View style={s.tripInfo}>
          <Text style={s.tripDest}>Bali, Indonesia</Text>
          <Text style={s.tripDates}>Apr 15 - Apr 21, 2026</Text>
          <Text style={s.tripPrice}>E2,450</Text>
        </View>
      </View>

      <View style={s.bottom}>
        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>View My Trip</Text></Pressable>
        <Pressable><Text style={s.skipText}>Go to Home</Text></Pressable>
        <Text style={s.autoText}>Auto-dismissing in 5s...</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 20 },
  confetti: { position: "absolute", top: 60, fontSize: 32 },
  achievementBadge: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#FBBF2440", marginBottom: 20 },
  badgeIcon: { fontSize: 20 },
  badgeTitle: { color: "#FBBF24", fontSize: 14, fontWeight: "700" },
  title: { color: "#FFF", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#888", fontSize: 15, marginTop: 4 },
  tripCard: { width: "100%", height: 180, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden", marginTop: 24 },
  tripImage: { height: 100, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  tripImageText: { color: "#555", fontSize: 14 },
  tripInfo: { padding: 14 },
  tripDest: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  tripDates: { color: "#888", fontSize: 13, marginTop: 2 },
  tripPrice: { color: "#FFF", fontSize: 15, fontWeight: "700", position: "absolute", right: 14, bottom: 14 },
  bottom: { position: "absolute", bottom: 40, left: 20, right: 20, alignItems: "center", gap: 10 },
  ctaBtn: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  skipText: { color: "#888", fontSize: 14 },
  autoText: { color: "#555", fontSize: 11 },
});
