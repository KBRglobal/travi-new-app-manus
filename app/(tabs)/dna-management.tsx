// Screen 16 — DNA Management
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const DIMENSIONS = [
  { label: "Adventurer", score: 87, icon: "terrain", color: "#EF4444" },
  { label: "Culture Seeker", score: 74, icon: "museum", color: DS.purple },
  { label: "Foodie", score: 91, icon: "restaurant", color: DS.warning },
  { label: "Nature Lover", score: 68, icon: "forest", color: DS.success },
  { label: "Luxury Traveler", score: 55, icon: "hotel", color: DS.pink },
  { label: "Budget Conscious", score: 42, icon: "savings", color: DS.info },
  { label: "Solo Explorer", score: 79, icon: "person", color: "#A78BFA" },
  { label: "Social Butterfly", score: 63, icon: "people", color: "#FB923C" },
];

export default function DnaManagementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={["rgba(100,67,244,0.35)", "rgba(249,68,152,0.15)", "rgba(10,5,20,0)"]} style={[s.hero, { paddingTop: insets.top + 16 }]}>
        <View style={s.dnaIconWrap}>
          <LinearGradient colors={[DS.purple, DS.pink]} style={s.dnaIcon}>
            <MaterialIcons name="science" size={32} color={DS.white} />
          </LinearGradient>
        </View>
        <Text style={s.heroTitle}>Your Travel DNA</Text>
        <Text style={s.heroSub}>Based on 47 interactions and 3 trips</Text>
        <View style={s.typeBadge}>
          <Text style={s.typeText}>✦ Explorer Archetype</Text>
        </View>
      </LinearGradient>

      {/* Dimensions */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Text style={s.sectionTitle}>DNA Dimensions</Text>
        {DIMENSIONS.map((dim) => (
          <View key={dim.label} style={s.dimCard}>
            <View style={[s.dimIcon, { backgroundColor: dim.color + "22", borderColor: dim.color + "44" }]}>
              <MaterialIcons name={dim.icon as any} size={20} color={dim.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.dimHeader}>
                <Text style={s.dimLabel}>{dim.label}</Text>
                <Text style={[s.dimScore, { color: dim.color }]}>{dim.score}%</Text>
              </View>
              <View style={s.barBg}>
                <View style={[s.barFill, { width: `${dim.score}%` as any, backgroundColor: dim.color }]} />
              </View>
            </View>
          </View>
        ))}

        {/* Retake */}
        <Pressable style={({ pressed }) => [s.retakeBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(auth)/quiz" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.retakeGrad}>
            <MaterialIcons name="refresh" size={18} color={DS.white} style={{ marginRight: 8 }} />
            <Text style={s.retakeText}>Retake DNA Quiz</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { alignItems: "center", paddingBottom: 28, paddingHorizontal: 24 },
  dnaIconWrap: { marginBottom: 12 },
  dnaIcon: { width: 72, height: 72, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  heroTitle: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 6 },
  heroSub: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.muted, marginBottom: 14 },
  typeBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.2)", borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  typeText: { fontSize: 13, fontFamily: "Satoshi-Bold", color: DS.purple },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 14 },
  dimCard: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12, padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14 },
  dimIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  dimHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  dimLabel: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white },
  dimScore: { fontSize: 14, fontFamily: "Satoshi-Bold" },
  barBg: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)" },
  barFill: { height: 6, borderRadius: 3 },
  retakeBtn: { marginTop: 8, height: 52, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  retakeGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  retakeText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
