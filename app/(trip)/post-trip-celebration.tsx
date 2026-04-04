// Screen 44 — Post-Trip Celebration — STATIC 
// Full screen, Confetti 2s, Stats 2x2, Cashback card 140px, 5 star rating
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function PostTripCelebrationScreen() {
  return (
    <View style={s.root}>
      <Text style={s.confetti}>* * * * * * *</Text>
      <Text style={s.title}>Welcome Back!</Text>
      <Text style={s.sub}>Your Bali trip was amazing</Text>

      {/* Stats 2x2 */}
      <View style={s.statsGrid}>
        <View style={s.statCard}><Text style={s.statNum}>7</Text><Text style={s.statLabel}>Days</Text></View>
        <View style={s.statCard}><Text style={s.statNum}>9</Text><Text style={s.statLabel}>Activities</Text></View>
        <View style={s.statCard}><Text style={s.statNum}>142</Text><Text style={s.statLabel}>Photos</Text></View>
        <View style={s.statCard}><Text style={s.statNum}>E4,170</Text><Text style={s.statLabel}>Total Spent</Text></View>
      </View>

      {/* Cashback card — 140px */}
      <View style={s.cashbackCard}>
        <Text style={s.cashbackTitle}>Cashback Earned</Text>
        <Text style={s.cashbackAmount}>+E417</Text>
        <Text style={s.cashbackSub}>Added to your TRAVI Wallet</Text>
      </View>

      {/* 5 star rating */}
      <View style={s.ratingSection}>
        <Text style={s.ratingTitle}>How was your trip?</Text>
        <View style={s.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} style={s.star}><Text style={s.starText}>*</Text></Pressable>
          ))}
        </View>
      </View>

      <Pressable style={s.cta}><Text style={s.ctaText}>View Trip Summary</Text></Pressable>
      <Pressable><Text style={s.skipText}>Skip for now</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 20 },
  confetti: { color: "#555", fontSize: 20, letterSpacing: 8, marginBottom: 16 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "800" },
  sub: { color: "#888", fontSize: 15, marginTop: 4 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 28, width: "100%" },
  statCard: { width: "47%", height: 80, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  statNum: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  statLabel: { color: "#888", fontSize: 12, marginTop: 2 },
  cashbackCard: { width: "100%", height: 140, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginTop: 16 },
  cashbackTitle: { color: "#888", fontSize: 13 },
  cashbackAmount: { color: "#4ADE80", fontSize: 36, fontWeight: "800", marginTop: 4 },
  cashbackSub: { color: "#666", fontSize: 12, marginTop: 4 },
  ratingSection: { alignItems: "center", marginTop: 24 },
  ratingTitle: { color: "#FFF", fontSize: 16, fontWeight: "600", marginBottom: 12 },
  starsRow: { flexDirection: "row", gap: 12 },
  star: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#222", borderWidth: 1, borderColor: "#444", justifyContent: "center", alignItems: "center" },
  starText: { color: "#FBBF24", fontSize: 24 },
  cta: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center", marginTop: 24 },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  skipText: { color: "#888", fontSize: 14, marginTop: 12 },
});
