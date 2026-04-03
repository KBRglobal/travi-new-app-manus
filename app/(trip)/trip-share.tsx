import { useRef, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Share, Animated
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useStore } from "@/lib/store";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ShareCardData {
  destination: string;
  country: string;
  days: number;
  dates: string;
  activities: string[];
  companions: string[];
  dnaType: string;
  highlights: string[];
  cashback: number;
  coverEmoji: string;
  accentColor: string;
}

// ─── Mock data builder ────────────────────────────────────────────────────────
function buildCardData(destination: string, dnaType: string): ShareCardData {
  const destMap: Record<string, Partial<ShareCardData>> = {
    Tokyo: { days: 7, dates: "Apr 12–19", activities: ["TeamLab Planets", "Shibuya Crossing", "Tsukiji Market"], highlights: ["Sunrise at Mt. Fuji", "Ramen at 2am in Shinjuku", "Cherry blossoms in Ueno"], cashback: 124, coverEmoji: "🗼", accentColor: "#F94498", country: "Japan" },
    Bali: { days: 10, dates: "May 3–13", activities: ["Ubud Rice Terraces", "Seminyak Beach", "Tanah Lot"], highlights: ["Sunrise yoga at Campuhan Ridge", "Sunset at Uluwatu Temple", "Cooking class in Ubud"], cashback: 98, coverEmoji: "🌴", accentColor: "#02A65C", country: "Indonesia" },
    Barcelona: { days: 5, dates: "Jun 8–13", activities: ["Sagrada Família", "Park Güell", "La Boqueria"], highlights: ["Tapas crawl in El Born", "Sunrise at Bunkers del Carmel", "Beach day at Barceloneta"], cashback: 76, coverEmoji: "🏛️", accentColor: "#F59E0B", country: "Spain" },
    Dubai: { days: 6, dates: "Mar 20–26", activities: ["Burj Khalifa", "Dubai Mall", "Desert Safari"], highlights: ["Sunrise over the desert", "Dubai Fountain show", "Gold Souk at night"], cashback: 210, coverEmoji: "🏙️", accentColor: "#FBBF24", country: "UAE" },
  };
  const base = destMap[destination] || { days: 7, dates: "TBD", activities: ["Sightseeing", "Local food", "Culture"], highlights: ["Amazing sunsets", "Local markets", "Hidden gems"], cashback: 80, coverEmoji: "✈️", accentColor: "#6443F4", country: "Unknown" };
  return {
    destination,
    country: base.country ?? "Unknown",
    days: base.days ?? 7,
    dates: base.dates ?? "TBD",
    activities: base.activities ?? [],
    companions: ["You", "Maya R.", "Tom K."],
    dnaType,
    highlights: base.highlights ?? [],
    cashback: base.cashback ?? 0,
    coverEmoji: base.coverEmoji ?? "✈️",
    accentColor: base.accentColor ?? "#6443F4",
  };
}

// ─── Share Card Visual ────────────────────────────────────────────────────────
function ShareCardVisual({ data }: { data: ShareCardData }) {
  return (
    <View style={[S.card, { borderColor: data.accentColor + "40" }]}>
      <LinearGradient
        colors={["#1A0A3D", data.accentColor + "33", "#0D0628"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Top row */}
      <View style={S.cardTop}>
        <View style={S.traviBadge}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <Text style={S.traviBadgeText}>TRAVI</Text>
        </View>
        <Text style={S.cardDates}>{data.dates}</Text>
      </View>

      {/* Hero */}
      <View style={S.cardHero}>
        <Text style={S.cardEmoji}>{data.coverEmoji}</Text>
        <Text style={S.cardCity}>{data.destination}</Text>
        <Text style={S.cardCountry}>{data.country}</Text>
        <View style={[S.daysChip, { backgroundColor: data.accentColor + "25", borderColor: data.accentColor + "50" }]}>
          <Text style={[S.daysChipText, { color: data.accentColor }]}>{data.days} days</Text>
        </View>
      </View>

      {/* Highlights */}
      <View style={S.cardSection}>
        <Text style={S.cardSectionLabel}>✨ Trip Highlights</Text>
        {data.highlights.map((h, i) => (
          <View key={i} style={S.highlightRow}>
            <View style={[S.highlightDot, { backgroundColor: data.accentColor }]} />
            <Text style={S.highlightText}>{h}</Text>
          </View>
        ))}
      </View>

      {/* Activities */}
      <View style={S.cardSection}>
        <Text style={S.cardSectionLabel}>📍 Top Activities</Text>
        <View style={S.activityPills}>
          {data.activities.map((a, i) => (
            <View key={i} style={S.activityPill}>
              <Text style={S.activityPillText}>{a}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={S.cardFooter}>
        <View>
          <Text style={S.cardFooterLabel}>DNA Type</Text>
          <Text style={S.cardFooterValue}>{data.dnaType}</Text>
        </View>
        <View style={S.cashbackBadge}>
          <Text style={S.cashbackLabel}>💰 Cashback</Text>
          <Text style={S.cashbackAmount}>${data.cashback}</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function TripShareScreen() {
  const insets = useSafeAreaInsets();
  const { state } = useStore();
  const params = useLocalSearchParams<{ destination?: string }>();
  const destination = params.destination ?? "Tokyo";
  const dnaType = state.profile?.travelerDNA?.type ?? "The Explorer";

  const cardData = buildCardData(destination, dnaType);
  const [shared, setShared] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleShare = async () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    try {
      await Share.share({
        message: `🌍 I'm heading to ${cardData.destination}, ${cardData.country} for ${cardData.days} days with TRAVI!\n\n✨ ${cardData.highlights[0]}\n📍 ${cardData.activities.join(", ")}\n💰 Earned $${cardData.cashback} cashback\n\nPlan your trip: travi.app`,
        title: `My ${cardData.destination} Trip`,
      });
      setShared(true);
    } catch {
      // User cancelled
    }
  };

  const SHARE_OPTIONS = [
    { label: "Copy Link", icon: "link" as const, color: "#6443F4", onPress: handleShare },
    { label: "Instagram", icon: "camera.fill" as const, color: "#E1306C", onPress: handleShare },
    { label: "WhatsApp", icon: "message.fill" as const, color: "#25D366", onPress: handleShare },
    { label: "More", icon: "square.and.arrow.up" as const, color: "#9BA1A6", onPress: handleShare },
  ];

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#1A0A3D", "#0D0628", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Share Your Trip</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130 }}>
        {/* Card */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <ShareCardVisual data={cardData} />
        </Animated.View>

        {/* Success message */}
        {shared && (
          <View style={S.successBanner}>
            <LinearGradient colors={["rgba(2,166,92,0.2)", "rgba(2,166,92,0.08)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={{ fontSize: 20 }}>🎉</Text>
            <Text style={S.successText}>Shared! Your friends are going to be jealous.</Text>
          </View>
        )}

        {/* Share options */}
        <Text style={S.shareLabel}>Share via</Text>
        <View style={S.shareGrid}>
          {SHARE_OPTIONS.map((opt) => (
            <TouchableOpacity key={opt.label} style={S.shareOption} onPress={opt.onPress} activeOpacity={0.8}>
              <View style={[S.shareIconWrap, { backgroundColor: opt.color + "20", borderColor: opt.color + "40" }]}>
                <IconSymbol name={opt.icon} size={22} color={opt.color} />
              </View>
              <Text style={S.shareOptionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Big share button */}
        <TouchableOpacity style={S.mainShareBtn} onPress={handleShare} activeOpacity={0.88}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="square.and.arrow.up" size={20} color="#FFF" />
          <Text style={S.mainShareBtnText}>Share Trip Card</Text>
        </TouchableOpacity>

        <Text style={S.footerNote}>Your trip card is generated from your TRAVI itinerary. Cashback is earned after your trip.</Text>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },

  // Card
  card: { borderRadius: 24, overflow: "hidden", borderWidth: 1, padding: 20, gap: 16, marginBottom: 20 },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  traviBadge: { borderRadius: 8, overflow: "hidden", paddingHorizontal: 10, paddingVertical: 4 },
  traviBadgeText: { color: "#FFF", fontSize: 12, fontWeight: "900", letterSpacing: 2, fontFamily: "Chillax-Bold" },
  cardDates: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  cardHero: { alignItems: "center", gap: 4, paddingVertical: 8 },
  cardEmoji: { fontSize: 52 },
  cardCity: { color: "#FFF", fontSize: 32, fontWeight: "900", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  cardCountry: { color: "rgba(255,255,255,0.5)", fontSize: 14 },
  daysChip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, borderWidth: 1, marginTop: 4 },
  daysChipText: { fontSize: 13, fontWeight: "700" },
  cardSection: { gap: 8 },
  cardSectionLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  highlightRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  highlightDot: { width: 6, height: 6, borderRadius: 3 },
  highlightText: { color: "#ECEDEE", fontSize: 13, lineHeight: 18 },
  activityPills: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  activityPill: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  activityPillText: { color: "#ECEDEE", fontSize: 12 },
  cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)" },
  cardFooterLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  cardFooterValue: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  cashbackBadge: { alignItems: "flex-end" },
  cashbackLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  cashbackAmount: { color: "#22C55E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },

  // Success
  successBanner: { borderRadius: 14, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20, borderWidth: 1, borderColor: "rgba(2,166,92,0.3)" },
  successText: { color: "#4ADE80", fontSize: 14, fontWeight: "600", flex: 1 },

  // Share options
  shareLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 },
  shareGrid: { flexDirection: "row", gap: 12, marginBottom: 20 },
  shareOption: { flex: 1, alignItems: "center", gap: 6 },
  shareIconWrap: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  shareOptionLabel: { color: "#9BA1A6", fontSize: 11 },

  mainShareBtn: { borderRadius: 16, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16, marginBottom: 16 },
  mainShareBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },

  footerNote: { color: "rgba(255,255,255,0.55)", fontSize: 11, textAlign: "center", lineHeight: 16 },
});
