// Screen — Destination Detail
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const HIGHLIGHTS = [
  { icon: "wb-sunny", label: "Best Season", value: "Apr–Oct" },
  { icon: "attach-money", label: "Avg Budget", value: "$120/day" },
  { icon: "language", label: "Language", value: "Balinese" },
  { icon: "access-time", label: "Timezone", value: "UTC+8" },
];

const ACTIVITIES = [
  { id: "1", name: "Tanah Lot Temple", type: "Culture", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80", match: 94 },
  { id: "2", name: "Tegalalang Rice", type: "Nature", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", match: 88 },
  { id: "3", name: "Seminyak Beach", type: "Beach", img: "https://images.unsplash.com/photo-1520454974749-611d7d931571?w=300&q=80", match: 91 },
];

export default function DestinationDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: DS.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.heroWrap}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" }} style={s.heroImg} />
          <LinearGradient colors={["rgba(10,5,20,0.3)", "transparent", "rgba(10,5,20,0.95)"]} style={StyleSheet.absoluteFillObject} />
          <View style={[s.heroHeader, { paddingTop: insets.top + 8 }]}>
            <Pressable style={s.backBtn} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={22} color={DS.white} />
            </Pressable>
            <Pressable style={s.heartBtn}>
              <MaterialIcons name="favorite-border" size={22} color={DS.white} />
            </Pressable>
          </View>
          <View style={s.heroContent}>
            <View style={s.matchBadge}>
              <Text style={s.matchText}>✦ 96% DNA Match</Text>
            </View>
            <Text style={s.heroTitle}>Bali, Indonesia</Text>
            <View style={s.heroMeta}>
              <MaterialIcons name="star" size={14} color={DS.warning} />
              <Text style={s.heroRating}>4.9</Text>
              <Text style={s.heroDot}>·</Text>
              <Text style={s.heroReviews}>2,847 reviews</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Highlights */}
          <View style={s.highlightsRow}>
            {HIGHLIGHTS.map(h => (
              <View key={h.label} style={s.highlightCard}>
                <MaterialIcons name={h.icon as any} size={18} color={DS.purple} />
                <Text style={s.highlightValue}>{h.value}</Text>
                <Text style={s.highlightLabel}>{h.label}</Text>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={s.sectionTitle}>About</Text>
          <Text style={s.aboutText}>Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Immerse yourself in the island's rich culture, stunning rice terraces, and pristine beaches.</Text>

          {/* Top Activities */}
          <Text style={[s.sectionTitle, { marginTop: 24 }]}>Top Activities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {ACTIVITIES.map(a => (
              <Pressable key={a.id} style={s.actCard}>
                <Image source={{ uri: a.img }} style={s.actImg} />
                <LinearGradient colors={["transparent", "rgba(10,5,20,0.9)"]} style={StyleSheet.absoluteFillObject} />
                <View style={s.actMatchBadge}>
                  <Text style={s.actMatchText}>{a.match}%</Text>
                </View>
                <Text style={s.actName}>{a.name}</Text>
                <Text style={s.actType}>{a.type}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[s.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/dates-travelers" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGrad}>
            <Text style={s.ctaText}>Plan This Trip</Text>
            <MaterialIcons name="arrow-forward" size={18} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  heroWrap: { height: 340, position: "relative" },
  heroImg: { ...StyleSheet.absoluteFillObject },
  heroHeader: { position: "absolute", top: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(10,5,20,0.5)", justifyContent: "center", alignItems: "center" },
  heartBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(10,5,20,0.5)", justifyContent: "center", alignItems: "center" },
  heroContent: { position: "absolute", bottom: 20, left: 16 },
  matchBadge: { backgroundColor: "#02A65C", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: "flex-start", marginBottom: 8 },
  matchText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: DS.white },
  heroTitle: { fontSize: 32, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 6 },
  heroMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  heroRating: { fontSize: 14, fontFamily: "Satoshi-Bold", color: DS.white },
  heroDot: { fontSize: 14, color: DS.muted },
  heroReviews: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted },
  highlightsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  highlightCard: { flex: 1, alignItems: "center", padding: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, gap: 4 },
  highlightValue: { fontSize: 13, fontFamily: "Satoshi-Bold", color: DS.white },
  highlightLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.muted },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 10 },
  aboutText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.secondary, lineHeight: 22 },
  actCard: { width: 160, height: 200, borderRadius: 16, overflow: "hidden", backgroundColor: DS.surface },
  actImg: { ...StyleSheet.absoluteFillObject },
  actMatchBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "#02A65C", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  actMatchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  actName: { position: "absolute", bottom: 28, left: 12, right: 12, fontSize: 14, fontFamily: "Chillax-Bold", color: DS.white },
  actType: { position: "absolute", bottom: 12, left: 12, fontSize: 12, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)" },
  ctaWrap: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: DS.bg, borderTopWidth: 1, borderTopColor: DS.border },
  ctaBtn: { height: 56, borderRadius: 28, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  ctaGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  ctaText: { fontSize: 16, fontFamily: "Satoshi-Bold", color: DS.white },
});
