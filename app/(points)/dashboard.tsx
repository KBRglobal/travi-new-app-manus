// Points Dashboard
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const PERKS = [
  { icon: "flight-upgrade", label: "Flight Upgrade", points: 5000, color: DS.purple },
  { icon: "hotel", label: "Free Night", points: 8000, color: DS.pink },
  { icon: "local-activity", label: "Activity Pass", points: 2500, color: DS.success },
  { icon: "card-giftcard", label: "Gift Card", points: 3000, color: DS.warning },
];

export default function PointsDashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>TRAVI Points</Text>
        <Pressable style={s.historyBtn} onPress={() => router.push("/(points)/transactions" as any)}>
          <MaterialIcons name="history" size={20} color={DS.white} />
        </Pressable>
      </View>

      {/* Points card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.pointsCard}>
          <Text style={s.pointsLabel}>Your Points Balance</Text>
          <Text style={s.pointsAmount}>12,840</Text>
          <Text style={s.pointsSub}>≈ $128.40 travel credit</Text>
          <View style={s.tierRow}>
            <MaterialIcons name="star" size={14} color={DS.warning} />
            <Text style={s.tierText}>Gold Explorer Tier</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Redeem */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={s.sectionTitle}>Redeem Points</Text>
        <View style={s.perksGrid}>
          {PERKS.map(p => (
            <Pressable key={p.label} style={({ pressed }) => [s.perkCard, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(points)/redeem" as any)}>
              <View style={[s.perkIcon, { backgroundColor: p.color + "22", borderColor: p.color + "44" }]}>
                <MaterialIcons name={p.icon as any} size={24} color={p.color} />
              </View>
              <Text style={s.perkLabel}>{p.label}</Text>
              <Text style={[s.perkPoints, { color: p.color }]}>{p.points.toLocaleString()} pts</Text>
            </Pressable>
          ))}
        </View>

        {/* Earn guide */}
        <Pressable style={({ pressed }) => [s.earnBtn, pressed && { opacity: 0.8 }]} onPress={() => router.push("/(points)/earn-guide" as any)}>
          <MaterialIcons name="add-circle-outline" size={18} color={DS.purple} style={{ marginRight: 8 }} />
          <Text style={s.earnText}>How to Earn More Points</Text>
          <MaterialIcons name="chevron-right" size={18} color={DS.muted} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  historyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  pointsCard: { borderRadius: 24, padding: 24 },
  pointsLabel: { fontSize: 13, fontFamily: "Satoshi-Medium", color: "rgba(255,255,255,0.8)", marginBottom: 8 },
  pointsAmount: { fontSize: 44, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 4 },
  pointsSub: { fontSize: 14, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)", marginBottom: 12 },
  tierRow: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  tierText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: DS.white },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 14 },
  perksGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  perkCard: { width: "47%", alignItems: "center", padding: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, gap: 8 },
  perkIcon: { width: 52, height: 52, borderRadius: 14, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  perkLabel: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.white, textAlign: "center" },
  perkPoints: { fontSize: 13, fontFamily: "Satoshi-Bold" },
  earnBtn: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14 },
  earnText: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white },
});
