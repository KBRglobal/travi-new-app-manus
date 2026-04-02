import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const { width } = Dimensions.get("window");

const BOOKING_COMPONENTS = [
  {
    id: "flight",
    icon: "✈️",
    label: "Round-trip Flights",
    detail: "Tel Aviv → Dubai → Tel Aviv",
    price: 680,
    commission: 0.08,
    color: "#F94498",
    gradient: ["#F94498", "#C2185B"],
    booked: false,
  },
  {
    id: "hotel",
    icon: "🏨",
    label: "Hotel (5 nights)",
    detail: "Atlantis The Palm — Deluxe Room",
    price: 1250,
    commission: 0.12,
    color: "#6443F4",
    gradient: ["#6443F4", "#4527A0"],
    booked: false,
  },
  {
    id: "activities",
    icon: "🎡",
    label: "Activities (4 selected)",
    detail: "Burj Khalifa · Desert Safari · Dubai Mall · Dubai Frame",
    price: 185,
    commission: 0.15,
    color: "#F97316",
    gradient: ["#F97316", "#E65100"],
    booked: false,
  },
  {
    id: "transfers",
    icon: "🚗",
    label: "Airport Transfers",
    detail: "Private car, both ways",
    price: 90,
    commission: 0.10,
    color: "#06B6D4",
    gradient: ["#06B6D4", "#0277BD"],
    booked: false,
  },
];

export default function BookTripScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destination, tripId } = useLocalSearchParams<{ destination: string; tripId: string }>();
  const [bookedItems, setBookedItems] = useState<Set<string>>(new Set());
  const [showCashbackModal, setShowCashbackModal] = useState(false);

  const totalCost = BOOKING_COMPONENTS.reduce((sum, c) => sum + c.price, 0);
  const totalCashback = BOOKING_COMPONENTS.reduce((sum, c) => sum + Math.round(c.price * c.commission), 0);
  const bookedCost = BOOKING_COMPONENTS
    .filter((c) => bookedItems.has(c.id))
    .reduce((sum, c) => sum + c.price, 0);
  const bookedCashback = BOOKING_COMPONENTS
    .filter((c) => bookedItems.has(c.id))
    .reduce((sum, c) => sum + Math.round(c.price * c.commission), 0);

  const allBooked = bookedItems.size === BOOKING_COMPONENTS.length;

  const handleBook = (id: string) => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setBookedItems((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (bookedItems.size + 1 === BOOKING_COMPONENTS.length) {
      setTimeout(() => setShowCashbackModal(true), 600);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0D1A", "#1A0D2E"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Your Trip</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Destination Banner */}
        <LinearGradient
          colors={["rgba(249,68,152,0.15)", "rgba(100,67,244,0.15)"]}
          style={styles.destBanner}
        >
          <Text style={styles.destEmoji}>🌍</Text>
          <View style={styles.destInfo}>
            <Text style={styles.destName}>{(destination ?? "Dubai").charAt(0).toUpperCase() + (destination ?? "Dubai").slice(1)}</Text>
            <Text style={styles.destDates}>5 nights · 2 travelers · Jun 15–20</Text>
          </View>
          <View style={styles.cashbackPill}>
            <Text style={styles.cashbackPillLabel}>Cashback</Text>
            <Text style={styles.cashbackPillAmount}>${totalCashback}</Text>
          </View>
        </LinearGradient>

        {/* What is Cashback */}
        <View style={styles.explainerCard}>
          <View style={styles.explainerRow}>
            <Text style={styles.explainerIcon}>💡</Text>
            <View style={styles.explainerText}>
              <Text style={styles.explainerTitle}>You earn the commission</Text>
              <Text style={styles.explainerSub}>
                Traditional agents keep 8–15% of every booking. With TRAVI, that money comes back to you — automatically.
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Components */}
        <Text style={styles.sectionTitle}>Your Trip Components</Text>
        {BOOKING_COMPONENTS.map((component) => {
          const isBooked = bookedItems.has(component.id);
          const cashback = Math.round(component.price * component.commission);
          return (
            <View key={component.id} style={[styles.componentCard, isBooked && styles.componentCardBooked]}>
              <View style={styles.componentTop}>
                <View style={[styles.componentIconWrap, { backgroundColor: component.color + "20" }]}>
                  <Text style={styles.componentEmoji}>{component.icon}</Text>
                </View>
                <View style={styles.componentInfo}>
                  <Text style={styles.componentLabel}>{component.label}</Text>
                  <Text style={styles.componentDetail}>{component.detail}</Text>
                </View>
                {isBooked && (
                  <View style={styles.bookedBadge}>
                    <Text style={styles.bookedBadgeText}>✓</Text>
                  </View>
                )}
              </View>
              <View style={styles.componentBottom}>
                <View style={styles.priceRow}>
                  <Text style={styles.componentPrice}>${component.price}</Text>
                  <View style={styles.cashbackRow}>
                    <Text style={styles.cashbackLabel}>You get back</Text>
                    <Text style={[styles.cashbackAmount, { color: component.color }]}>+${cashback}</Text>
                  </View>
                </View>
                {!isBooked ? (
                  <TouchableOpacity
                    style={[styles.bookBtn, { backgroundColor: component.color }]}
                    onPress={() => handleBook(component.id)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.bookBtnText}>Book Now</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.bookedBtn, { borderColor: component.color + "60" }]}>
                    <Text style={[styles.bookedBtnText, { color: component.color }]}>Booked ✓</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}

        {/* Total Summary */}
        <LinearGradient
          colors={["rgba(249,68,152,0.12)", "rgba(100,67,244,0.12)"]}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Trip Cost</Text>
            <Text style={styles.summaryValue}>${totalCost.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Booked So Far</Text>
            <Text style={styles.summaryValue}>${bookedCost.toLocaleString()}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryHighlight]}>
            <Text style={styles.summaryHighlightLabel}>💰 Total Cashback Earned</Text>
            <Text style={styles.summaryHighlightValue}>+${bookedCashback}</Text>
          </View>
          <Text style={styles.summaryNote}>
            Cashback is credited to your TRAVI wallet within 48 hours of travel completion.
          </Text>
        </LinearGradient>
      </ScrollView>

      {/* Cashback Modal */}
      {showCashbackModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <LinearGradient colors={["#1A0D2E", "#0D0D1A"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Your trip is fully booked!</Text>
            <Text style={styles.modalSub}>
              You just earned{" "}
              <Text style={styles.modalHighlight}>${totalCashback} cashback</Text>
              {" "}that a traditional agent would have kept.
            </Text>
            <LinearGradient colors={["#F94498", "#6443F4"]} style={styles.modalBtn}>
              <TouchableOpacity
                style={styles.modalBtnInner}
                onPress={() => {
                  setShowCashbackModal(false);
                  router.push({
                    pathname: "/(tabs)/trip-hub" as never,
                    params: {
                      destination: destination ?? "dubai",
                      tripName: `${(destination ?? "Dubai").charAt(0).toUpperCase() + (destination ?? "Dubai").slice(1)} Adventure`,
                      totalCashback: String(totalCashback),
                      departureDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                  });
                }}
                activeOpacity={0.88}
              >
                <Text style={styles.modalBtnText}>View My Trip →</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D1A" },
  orb1: { position: "absolute", width: 280, height: 280, borderRadius: 140, backgroundColor: "rgba(249,68,152,0.08)", top: -60, right: -80 },
  orb2: { position: "absolute", width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(100,67,244,0.08)", bottom: 100, left: -60 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#FFFFFF" },
  headerRight: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
  destBanner: { borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  destEmoji: { fontSize: 32, marginRight: 12 },
  destInfo: { flex: 1 },
  destName: { fontSize: 18, fontWeight: "700", color: "#FFFFFF" },
  destDates: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 },
  cashbackPill: { backgroundColor: "rgba(249,68,152,0.2)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center", borderWidth: 1, borderColor: "rgba(249,68,152,0.4)" },
  cashbackPillLabel: { fontSize: 10, color: "#F94498", fontWeight: "600" },
  cashbackPillAmount: { fontSize: 18, fontWeight: "800", color: "#F94498" },
  explainerCard: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  explainerRow: { flexDirection: "row", alignItems: "flex-start" },
  explainerIcon: { fontSize: 22, marginRight: 12, marginTop: 2 },
  explainerText: { flex: 1 },
  explainerTitle: { fontSize: 14, fontWeight: "700", color: "#FFFFFF", marginBottom: 4 },
  explainerSub: { fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", marginBottom: 12 },
  componentCard: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  componentCardBooked: { borderColor: "rgba(249,68,152,0.3)", backgroundColor: "rgba(249,68,152,0.04)" },
  componentTop: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  componentIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  componentEmoji: { fontSize: 22 },
  componentInfo: { flex: 1 },
  componentLabel: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  componentDetail: { fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 },
  bookedBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#22C55E", alignItems: "center", justifyContent: "center" },
  bookedBadgeText: { fontSize: 14, color: "#FFFFFF", fontWeight: "700" },
  componentBottom: {},
  priceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  componentPrice: { fontSize: 22, fontWeight: "800", color: "#FFFFFF" },
  cashbackRow: { alignItems: "flex-end" },
  cashbackLabel: { fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: "600" },
  cashbackAmount: { fontSize: 16, fontWeight: "700" },
  bookBtn: { borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  bookBtnText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  bookedBtn: { borderRadius: 12, paddingVertical: 12, alignItems: "center", borderWidth: 1 },
  bookedBtnText: { fontSize: 15, fontWeight: "600" },
  summaryCard: { borderRadius: 16, padding: 18, marginTop: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  summaryTitle: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", marginBottom: 14 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: "rgba(255,255,255,0.5)" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#FFFFFF" },
  summaryHighlight: { backgroundColor: "rgba(249,68,152,0.1)", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginTop: 4, marginBottom: 12 },
  summaryHighlightLabel: { fontSize: 14, fontWeight: "700", color: "#F94498" },
  summaryHighlightValue: { fontSize: 18, fontWeight: "800", color: "#F94498" },
  summaryNote: { fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 16 },
  modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modal: { width: width - 48, borderRadius: 24, padding: 28, alignItems: "center", overflow: "hidden", borderWidth: 1, borderColor: "rgba(249,68,152,0.3)" },
  modalEmoji: { fontSize: 56, marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: "800", color: "#FFFFFF", textAlign: "center", marginBottom: 10 },
  modalSub: { fontSize: 15, color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 22, marginBottom: 24 },
  modalHighlight: { color: "#F94498", fontWeight: "700" },
  modalBtn: { borderRadius: 16, width: "100%" },
  modalBtnInner: { paddingVertical: 16, alignItems: "center" },
  modalBtnText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
});
