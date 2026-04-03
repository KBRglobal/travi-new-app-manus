/**
 * TRAVI Post-Booking Assistant
 *
 * Appears after trip is confirmed. Offers smart upsells:
 * - Airport taxi (both ways)
 * - Travel insurance
 * - e-SIM data plan
 * - Travel wallet / currency
 * - Luggage storage
 *
 * Each upsell shows cashback earned. Skippable.
 */

import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, Platform, Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const haptic = (style = Haptics.ImpactFeedbackStyle.Light) => {
  if (Platform.OS !== "web") Haptics.impactAsync(style);
};

// ── Upsell data ───────────────────────────────────────────────────────────────

type Upsell = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  price: number;
  cashback: number;
  tag?: string;
  gradient: [string, string];
  accentColor: string;
  features: string[];
};

const UPSELLS: Upsell[] = [
  {
    id: "taxi",
    icon: "🚕",
    title: "Airport Taxi",
    subtitle: "Both ways, door-to-door",
    desc: "Pre-booked, fixed price. Driver waits for you even if your flight is delayed.",
    price: 45,
    cashback: 5,
    tag: "Most popular",
    gradient: ["#1a3320", "#2d5c35"],
    accentColor: "#22C55E",
    features: ["Fixed price, no surprises", "Flight tracking included", "Free cancellation 24h", "Meet & greet service"],
  },
  {
    id: "insurance",
    icon: "🛡️",
    title: "Travel Insurance",
    subtitle: "Full coverage, zero stress",
    desc: "Medical, cancellation, lost luggage, and flight delay — all in one plan.",
    price: 28,
    cashback: 3,
    tag: "Recommended",
    gradient: ["#1a1a4e", "#2d2d7a"],
    accentColor: "#6443F4",
    features: ["Medical up to $1M", "Trip cancellation", "Lost baggage $2,500", "24/7 emergency line"],
  },
  {
    id: "esim",
    icon: "📶",
    title: "e-SIM Data Plan",
    subtitle: "Unlimited data, no roaming fees",
    desc: "Activate instantly before you land. Works in 190+ countries.",
    price: 19,
    cashback: 2,
    gradient: ["#0d2040", "#1a3a5c"],
    accentColor: "#0EA5E9",
    features: ["Unlimited data 10GB/day", "Activate from the app", "No SIM card needed", "190+ countries"],
  },
  {
    id: "wallet",
    icon: "💳",
    title: "Travel Wallet",
    subtitle: "Best exchange rate, zero fees",
    desc: "Load your travel currency at the best rate. Spend like a local.",
    price: 0,
    cashback: 1,
    gradient: ["#3d2a00", "#6b4800"],
    accentColor: "#FBBF24",
    features: ["Zero conversion fees", "Best live exchange rate", "Freeze card instantly", "Works in 150+ currencies"],
  },
  {
    id: "luggage",
    icon: "🧳",
    title: "Luggage Storage",
    subtitle: "Drop off & explore hands-free",
    desc: "Secure storage near airports, stations, and city centers.",
    price: 8,
    cashback: 1,
    gradient: ["#2d1a00", "#4a2d00"],
    accentColor: "#F97316",
    features: ["500+ locations worldwide", "Insured up to $2,000", "Open 7 days a week", "QR code access"],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PostBookingScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ destination?: string; totalCost?: string }>();
  const { state, dispatch } = useStore();
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);
  const checkAnims = useRef<Record<string, Animated.Value>>({});

  UPSELLS.forEach((u) => {
    if (!checkAnims.current[u.id]) checkAnims.current[u.id] = new Animated.Value(0);
  });

  const destination = params.destination ?? "Your Trip";
  const tripCost = parseInt(params.totalCost ?? "0", 10);
  const totalAdded = UPSELLS.filter((u) => added.has(u.id)).reduce((s, u) => s + u.price, 0);
  const totalCashback = UPSELLS.filter((u) => added.has(u.id)).reduce((s, u) => s + u.cashback, 0);

  const handleToggle = (upsell: Upsell) => {
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    setAdded((prev) => {
      const next = new Set(prev);
      if (next.has(upsell.id)) {
        next.delete(upsell.id);
        Animated.timing(checkAnims.current[upsell.id], { toValue: 0, duration: 200, useNativeDriver: true }).start();
      } else {
        next.add(upsell.id);
        Animated.spring(checkAnims.current[upsell.id], { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }).start();
        if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      return next;
    });
  };

  const handleDone = () => {
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    if (totalCashback > 0) {
      dispatch({ type: "ADD_POINTS", payload: { amount: totalCashback * 100, description: `Upsell cashback: ${destination}` } });
    }
    router.push({ pathname: "/(trip)/trip-companions", params: { destination, totalCost: params.totalCost } } as never);
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 12 }]}>
        <View style={S.headerBadge}>
          <LinearGradient colors={["rgba(34,197,94,0.25)", "rgba(34,197,94,0.1)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.headerBadgeText}>✅ Trip Confirmed!</Text>
        </View>
        <Text style={S.headerTitle}>Complete your trip</Text>
        <Text style={S.headerSub}>
          Add these services to {destination} and earn cashback on each one.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.list}>
        {UPSELLS.map((upsell) => {
          const isAdded = added.has(upsell.id);
          const checkScale = checkAnims.current[upsell.id].interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

          return (
            <TouchableOpacity
              key={upsell.id}
              style={[S.card, isAdded && S.cardAdded]}
              onPress={() => handleToggle(upsell)}
              activeOpacity={0.88}
            >
              <LinearGradient colors={upsell.gradient} style={StyleSheet.absoluteFillObject} />
              {isAdded && (
                <LinearGradient
                  colors={[upsell.accentColor + "30", upsell.accentColor + "10"]}
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
                />
              )}

              {/* Top row */}
              <View style={S.cardTop}>
                <View style={[S.cardIcon, { backgroundColor: upsell.accentColor + "22" }]}>
                  <Text style={S.cardIconEmoji}>{upsell.icon}</Text>
                </View>
                <View style={S.cardTitleWrap}>
                  <View style={S.cardTitleRow}>
                    <Text style={S.cardTitle}>{upsell.title}</Text>
                    {upsell.tag && (
                      <View style={[S.cardTag, { backgroundColor: upsell.accentColor + "33", borderColor: upsell.accentColor + "66" }]}>
                        <Text style={[S.cardTagText, { color: upsell.accentColor }]}>{upsell.tag}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={S.cardSubtitle}>{upsell.subtitle}</Text>
                </View>
                <Animated.View style={[S.checkCircle, isAdded && { backgroundColor: upsell.accentColor }, { transform: [{ scale: checkScale }] }]}>
                  <IconSymbol name="checkmark" size={14} color="#FFFFFF" />
                </Animated.View>
              </View>

              {/* Description */}
              <Text style={S.cardDesc}>{upsell.desc}</Text>

              {/* Features */}
              <View style={S.featuresGrid}>
                {upsell.features.map((f) => (
                  <View key={f} style={S.featureItem}>
                    <View style={[S.featureDot, { backgroundColor: upsell.accentColor }]} />
                    <Text style={S.featureText}>{f}</Text>
                  </View>
                ))}
              </View>

              {/* Price row */}
              <View style={S.cardPriceRow}>
                <View>
                  {upsell.price > 0 ? (
                    <Text style={S.cardPrice}>${upsell.price} <Text style={S.cardPricePer}>/ trip</Text></Text>
                  ) : (
                    <Text style={[S.cardPrice, { color: "#22C55E" }]}>Free</Text>
                  )}
                </View>
                {upsell.cashback > 0 && (
                  <View style={S.cashbackBadge}>
                    <Text style={S.cashbackText}>+${upsell.cashback} cashback</Text>
                  </View>
                )}
                <View style={[S.addBtn, isAdded && { backgroundColor: upsell.accentColor }]}>
                  <Text style={S.addBtnText}>{isAdded ? "Added ✓" : "Add"}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[S.bottomCta, { paddingBottom: insets.bottom + 12 }]}>
        <LinearGradient colors={["rgba(13,6,40,0)", "rgba(13,6,40,0.98)"]} locations={[0, 0.25]} style={S.bottomGradient} />

        {added.size > 0 && (
          <View style={S.summaryRow}>
            <View>
              <Text style={S.summaryLabel}>{added.size} service{added.size > 1 ? "s" : ""} added</Text>
              <Text style={S.summaryValue}>
                {totalAdded > 0 ? `$${totalAdded} total` : "Free"}
                {totalCashback > 0 && <Text style={S.summaryCashback}> · +${totalCashback} cashback</Text>}
              </Text>
            </View>
          </View>
        )}

        <View style={S.ctaRow}>
          <TouchableOpacity style={S.skipBtn} onPress={handleDone} activeOpacity={0.7}>
            <Text style={S.skipBtnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.confirmBtn} onPress={handleDone} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.confirmBtnText}>
              {added.size > 0 ? `Confirm & Go to My Trip →` : "Go to My Trip →"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: 350, height: 350, borderRadius: 175, top: -100, right: -80, backgroundColor: "rgba(100,67,244,0.07)" },
  orb2: { position: "absolute", width: 250, height: 250, borderRadius: 125, bottom: 100, left: -60, backgroundColor: "rgba(249,68,152,0.05)" },

  header: { paddingHorizontal: 20, paddingBottom: 16, gap: 8 },
  headerBadge: { alignSelf: "flex-start", borderRadius: 12, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(34,197,94,0.4)" },
  headerBadgeText: { color: "#22C55E", fontSize: 13, fontFamily: "Chillax-Bold", fontWeight: "800" },
  headerTitle: { color: "#FFFFFF", fontSize: 26, fontFamily: "Chillax-Bold", fontWeight: "900", lineHeight: 32 },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular", lineHeight: 20 },

  list: { paddingHorizontal: 16, gap: 12, paddingTop: 4 },

  card: { borderRadius: 20, overflow: "hidden", padding: 18, gap: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  cardAdded: { borderColor: "rgba(255,255,255,0.12)" },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cardIconEmoji: { fontSize: 24, fontFamily: "Satoshi-Regular" },
  cardTitleWrap: { flex: 1, gap: 2 },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  cardTitle: { color: "#FFFFFF", fontSize: 16, fontFamily: "Chillax-Bold", fontWeight: "800" },
  cardTag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  cardTagText: { fontSize: 10, fontFamily: "Chillax-Bold", fontWeight: "800" },
  cardSubtitle: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  checkCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },

  cardDesc: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 19 },

  featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 6, width: "47%" },
  featureDot: { width: 5, height: 5, borderRadius: 2.5 },
  featureText: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Satoshi-Regular", flex: 1 },

  cardPriceRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardPrice: { color: "#FFFFFF", fontSize: 20, fontFamily: "Chillax-Bold", fontWeight: "900" },
  cardPricePer: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", fontWeight: "500" },
  cashbackBadge: { flex: 1, backgroundColor: "rgba(255,215,0,0.12)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  cashbackText: { color: "#FBBF24", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  addBtn: { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  addBtnText: { color: "#FFFFFF", fontSize: 13, fontFamily: "Chillax-Bold", fontWeight: "800" },

  bottomCta: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 24, gap: 10 },
  bottomGradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  summaryRow: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 12 },
  summaryLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  summaryValue: { color: "#FFFFFF", fontSize: 16, fontFamily: "Chillax-Bold", fontWeight: "800" },
  summaryCashback: { color: "#FBBF24" },
  ctaRow: { flexDirection: "row", gap: 10 },
  skipBtn: { paddingHorizontal: 20, paddingVertical: 16, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  skipBtnText: { color: "rgba(255,255,255,0.5)", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  confirmBtn: { flex: 1, borderRadius: 18, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", paddingVertical: 16, alignItems: "center" },
  confirmBtnText: { color: "#FFFFFF", fontSize: 15, fontFamily: "Chillax-Bold", fontWeight: "800" },
});
