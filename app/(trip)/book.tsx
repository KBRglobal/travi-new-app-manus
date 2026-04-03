// @ts-nocheck
/**
 * TRAVI — 2-Phase Booking Flow
 * Phase 1: Flight-only with 15-min countdown (airline urgency)
 * Phase 2: Full trip summary (hotel + attractions) with Apple Pay + invite friend
 */

import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

const { width } = Dimensions.get("window");

type BookingPhase = "flight" | "complete";

interface TripItem {
  id: string;
  type: "flight" | "hotel" | "attraction";
  icon: string;
  name: string;
  description: string;
  price: number;
  cashback: number;
  infoUrl?: string;
}

// Sample data — in production this comes from swipe selections
const SAMPLE_FLIGHT: TripItem = {
  id: "flight-1",
  type: "flight",
  icon: "✈️",
  name: "Round-trip Flights",
  description: "Tel Aviv (TLV) → Dubai (DXB) → Tel Aviv\nDeparture: Jun 15, 09:30 · Return: Jun 20, 18:45\nEconomy · 2 passengers",
  price: 680,
  cashback: 54,
  infoUrl: "https://www.skyscanner.com",
};

const SAMPLE_HOTEL: TripItem = {
  id: "hotel-1",
  type: "hotel",
  icon: "🏨",
  name: "Atlantis The Palm",
  description: "Deluxe Room · 5 nights · Jun 15–20\nBreakfast included · Pool & beach access\n2 guests",
  price: 1250,
  cashback: 150,
  infoUrl: "https://www.atlantis.com/dubai",
};

const SAMPLE_ATTRACTIONS: TripItem[] = [
  {
    id: "attr-1",
    type: "attraction",
    icon: "🏙️",
    name: "Burj Khalifa — At the Top",
    description: "Floor 148 observation deck · Skip-the-line ticket\nBest time: Sunset (5-7pm)",
    price: 85,
    cashback: 13,
    infoUrl: "https://www.burjkhalifa.ae",
  },
  {
    id: "attr-2",
    type: "attraction",
    icon: "🏜️",
    name: "Desert Safari Adventure",
    description: "Dune bashing · Camel ride · BBQ dinner\nPickup from hotel · 6 hours",
    price: 95,
    cashback: 14,
    infoUrl: "https://www.desertsafari.ae",
  },
  {
    id: "attr-3",
    type: "attraction",
    icon: "🍽️",
    name: "Zuma Dubai — Dinner",
    description: "Contemporary Japanese robata grill\nReservation confirmed · 8:00 PM",
    price: 120,
    cashback: 18,
    infoUrl: "https://www.zumarestaurant.com/dubai",
  },
  {
    id: "attr-4",
    type: "attraction",
    icon: "🖼️",
    name: "Dubai Frame",
    description: "Iconic landmark with 360° city views\nGlass bridge walkway · 1.5 hours",
    price: 30,
    cashback: 5,
    infoUrl: "https://www.dubaiframe.ae",
  },
];

export default function BookTripScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { destination, tripId } = useLocalSearchParams<{ destination: string; tripId: string }>();
  
  const [phase, setPhase] = useState<BookingPhase>("flight");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [flightBooked, setFlightBooked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Countdown timer for flight phase
  useEffect(() => {
    if (phase === "flight" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const allItems = [SAMPLE_HOTEL, ...SAMPLE_ATTRACTIONS];
  const totalCost = SAMPLE_FLIGHT.price + allItems.reduce((sum, item) => sum + item.price, 0);
  const totalCashback = SAMPLE_FLIGHT.cashback + allItems.reduce((sum, item) => sum + item.cashback, 0);

  const handleBookFlight = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setFlightBooked(true);
    // Fade out and switch to phase 2
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPhase("complete");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCompleteBooking = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowSuccessModal(true);
    setTimeout(() => {
      router.push({
        pathname: "/(tabs)/trip-hub" as never,
        params: {
          destination: destination ?? "dubai",
          tripName: `${(destination ?? "Dubai").charAt(0).toUpperCase() + (destination ?? "Dubai").slice(1)} Adventure`,
          totalCashback: String(totalCashback),
          departureDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });
    }, 2000);
  };

  const handleInviteFriend = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In production: open share sheet with trip link
    alert("Invite friend feature — opens share sheet with trip link + cost split calculator");
  };

  const handleMoreInfo = async (url?: string) => {
    if (!url) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await WebBrowser.openBrowserAsync(url);
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
        <Text style={styles.headerTitle}>{phase === "flight" ? "Secure Your Flight" : "Complete Your Trip"}</Text>
        <View style={styles.headerRight} />
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
          showsVerticalScrollIndicator={false}
        >
          {phase === "flight" ? (
            <>
              {/* Countdown Timer */}
              <LinearGradient
                colors={timeLeft < 300 ? ["rgba(239,68,68,0.2)", "rgba(220,38,38,0.15)"] : ["rgba(249,68,152,0.15)", "rgba(100,67,244,0.15)"]}
                style={styles.timerCard}
              >
                <Text style={styles.timerIcon}>⏰</Text>
                <View style={styles.timerInfo}>
                  <Text style={styles.timerLabel}>Price locked for</Text>
                  <Text style={[styles.timerValue, timeLeft < 300 && styles.timerValueUrgent]}>{formatTime(timeLeft)}</Text>
                </View>
                {timeLeft < 300 && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>HURRY!</Text>
                  </View>
                )}
              </LinearGradient>

              {/* Flight Card */}
              <View style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={[styles.itemIconWrap, { backgroundColor: "#F9449820" }]}>
                    <Text style={styles.itemIcon}>{SAMPLE_FLIGHT.icon}</Text>
                  </View>
                  <View style={styles.itemTitleWrap}>
                    <Text style={styles.itemName}>{SAMPLE_FLIGHT.name}</Text>
                    <TouchableOpacity onPress={() => handleMoreInfo(SAMPLE_FLIGHT.infoUrl)} activeOpacity={0.7}>
                      <Text style={styles.moreInfoLink}>More info →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.itemDescription}>{SAMPLE_FLIGHT.description}</Text>
                <View style={styles.itemPriceRow}>
                  <View>
                    <Text style={styles.itemPrice}>${SAMPLE_FLIGHT.price}</Text>
                    <Text style={styles.itemPriceLabel}>per person</Text>
                  </View>
                  <View style={styles.cashbackBadge}>
                    <Text style={styles.cashbackLabel}>You get back</Text>
                    <Text style={styles.cashbackValue}>+${SAMPLE_FLIGHT.cashback}</Text>
                  </View>
                </View>
              </View>

              {/* Why Book Now */}
              <View style={styles.explainerCard}>
                <Text style={styles.explainerIcon}>💡</Text>
                <View style={styles.explainerText}>
                  <Text style={styles.explainerTitle}>Why book the flight first?</Text>
                  <Text style={styles.explainerSub}>
                    Flight prices change every few minutes. Hotels and activities are flexible — you can adjust them later.
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Success Banner */}
              <LinearGradient
                colors={["rgba(34,197,94,0.15)", "rgba(16,185,129,0.1)"]}
                style={styles.successBanner}
              >
                <Text style={styles.successIcon}>✓</Text>
                <View style={styles.successInfo}>
                  <Text style={styles.successTitle}>Flight Confirmed!</Text>
                  <Text style={styles.successSub}>Now complete your trip — hotels & activities are flexible</Text>
                </View>
              </LinearGradient>

              {/* Trip Summary */}
              <Text style={styles.sectionTitle}>Your Complete Trip</Text>
              
              {/* Hotel */}
              <View style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={[styles.itemIconWrap, { backgroundColor: "#6443F420" }]}>
                    <Text style={styles.itemIcon}>{SAMPLE_HOTEL.icon}</Text>
                  </View>
                  <View style={styles.itemTitleWrap}>
                    <Text style={styles.itemName}>{SAMPLE_HOTEL.name}</Text>
                    <TouchableOpacity onPress={() => handleMoreInfo(SAMPLE_HOTEL.infoUrl)} activeOpacity={0.7}>
                      <Text style={styles.moreInfoLink}>More info →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.itemDescription}>{SAMPLE_HOTEL.description}</Text>
                <View style={styles.itemPriceRow}>
                  <Text style={styles.itemPrice}>${SAMPLE_HOTEL.price}</Text>
                  <View style={styles.cashbackBadge}>
                    <Text style={styles.cashbackLabel}>You get back</Text>
                    <Text style={styles.cashbackValue}>+${SAMPLE_HOTEL.cashback}</Text>
                  </View>
                </View>
              </View>

              {/* Attractions */}
              <Text style={styles.sectionTitle}>Your Selected Experiences</Text>
              {SAMPLE_ATTRACTIONS.map((attr) => (
                <View key={attr.id} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <View style={[styles.itemIconWrap, { backgroundColor: "#F9731620" }]}>
                      <Text style={styles.itemIcon}>{attr.icon}</Text>
                    </View>
                    <View style={styles.itemTitleWrap}>
                      <Text style={styles.itemName}>{attr.name}</Text>
                      <TouchableOpacity onPress={() => handleMoreInfo(attr.infoUrl)} activeOpacity={0.7}>
                        <Text style={styles.moreInfoLink}>More info →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.itemDescription}>{attr.description}</Text>
                  <View style={styles.itemPriceRow}>
                    <Text style={styles.itemPrice}>${attr.price}</Text>
                    <View style={styles.cashbackBadge}>
                      <Text style={styles.cashbackLabel}>+${attr.cashback} back</Text>
                    </View>
                  </View>
                </View>
              ))}

              {/* Total Summary */}
              <LinearGradient
                colors={["rgba(249,68,152,0.12)", "rgba(100,67,244,0.12)"]}
                style={styles.summaryCard}
              >
                <Text style={styles.summaryTitle}>Trip Total</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Cost</Text>
                  <Text style={styles.summaryValue}>${totalCost.toLocaleString()}</Text>
                </View>
                <View style={[styles.summaryRow, styles.summaryHighlight]}>
                  <Text style={styles.summaryHighlightLabel}>💰 Total Cashback</Text>
                  <Text style={styles.summaryHighlightValue}>+${totalCashback}</Text>
                </View>
                <Text style={styles.summaryNote}>
                  Cashback credited within 48 hours of travel completion
                </Text>
              </LinearGradient>
            </>
          )}
        </ScrollView>

        {/* Bottom CTA */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
          {phase === "flight" ? (
            <TouchableOpacity style={styles.ctaBtn} onPress={handleBookFlight} activeOpacity={0.88}>
              <LinearGradient colors={["#F94498", "#6443F4"]} style={styles.ctaBtnGradient}>
                <Text style={styles.ctaBtnText}>Book Flight — ${SAMPLE_FLIGHT.price}</Text>
                <Text style={styles.ctaBtnSub}>Apple Pay · Instant confirmation</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.inviteBtn} onPress={handleInviteFriend} activeOpacity={0.85}>
                <Text style={styles.inviteBtnText}>👥 Invite Friend to Split</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ctaBtn} onPress={handleCompleteBooking} activeOpacity={0.88}>
                <LinearGradient colors={["#F94498", "#6443F4"]} style={styles.ctaBtnGradient}>
                  <Text style={styles.ctaBtnText}>Pay ${totalCost} with Apple Pay</Text>
                  <Text style={styles.ctaBtnSub}>Earn ${totalCashback} cashback</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>

      {/* Success Modal */}
      {showSuccessModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <LinearGradient colors={["#1A0D2E", "#0D0D1A"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Trip Confirmed!</Text>
            <Text style={styles.modalSub}>
              You just earned <Text style={styles.modalHighlight}>${totalCashback} cashback</Text>
            </Text>
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
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#FFFFFF", fontFamily: "Chillax-Semibold" },
  headerRight: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
  // Timer
  timerCard: { borderRadius: 16, padding: 18, flexDirection: "row", alignItems: "center", marginBottom: 16, borderWidth: 1, borderColor: "rgba(249,68,152,0.3)" },
  timerIcon: { fontSize: 32, marginRight: 14 },
  timerInfo: { flex: 1 },
  timerLabel: { fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: "600" },
  timerValue: { fontSize: 32, fontWeight: "900", color: "#F94498", marginTop: 2, fontFamily: "Chillax-Bold" },
  timerValueUrgent: { color: "#EF4444" },
  urgentBadge: { backgroundColor: "rgba(239,68,68,0.2)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(239,68,68,0.4)" },
  urgentText: { fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", color: "#EF4444", letterSpacing: 0.5 },
  // Success Banner
  successBanner: { borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  successIcon: { fontSize: 32, marginRight: 12, color: "#22C55E" },
  successInfo: { flex: 1 },
  successTitle: { fontSize: 17, fontWeight: "700", color: "#22C55E", fontFamily: "Chillax-Semibold" },
  successSub: { fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  // Item Cards
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#FFFFFF", marginBottom: 12, marginTop: 8, fontFamily: "Chillax-Bold" },
  itemCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  itemHeader: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  itemIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  itemIcon: { fontSize: 22 },
  itemTitleWrap: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", marginBottom: 4, fontFamily: "Chillax-Semibold" },
  moreInfoLink: { fontSize: 13, color: "#6443F4", fontWeight: "600" },
  itemDescription: { fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 19, marginBottom: 12 },
  itemPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemPrice: { fontSize: 24, fontWeight: "900", color: "#FFFFFF", fontFamily: "Chillax-Bold" },
  itemPriceLabel: { fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 },
  cashbackBadge: { backgroundColor: "rgba(249,68,152,0.15)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, alignItems: "flex-end", borderWidth: 1, borderColor: "rgba(249,68,152,0.3)" },
  cashbackLabel: { fontSize: 10, color: "rgba(249,68,152,0.8)", fontWeight: "600" },
  cashbackValue: { fontSize: 16, fontWeight: "800", color: "#F94498", marginTop: 1, fontFamily: "Chillax-Bold" },
  // Explainer
  explainerCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", flexDirection: "row", alignItems: "flex-start" },
  explainerIcon: { fontSize: 22, marginRight: 12, marginTop: 2 },
  explainerText: { flex: 1 },
  explainerTitle: { fontSize: 14, fontWeight: "700", color: "#FFFFFF", marginBottom: 4 },
  explainerSub: { fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 18 },
  // Summary
  summaryCard: { borderRadius: 16, padding: 18, marginTop: 8, marginBottom: 16, borderWidth: 1, borderColor: "rgba(249,68,152,0.2)" },
  summaryTitle: { fontSize: 17, fontWeight: "800", color: "#FFFFFF", marginBottom: 12, fontFamily: "Chillax-Bold" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: "rgba(255,255,255,0.6)" },
  summaryValue: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", fontFamily: "Chillax-Semibold" },
  summaryHighlight: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)" },
  summaryHighlightLabel: { fontSize: 15, fontWeight: "700", color: "#F94498" },
  summaryHighlightValue: { fontSize: 20, fontWeight: "900", color: "#F94498", fontFamily: "Chillax-Bold" },
  summaryNote: { fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 8, lineHeight: 16 },
  // Bottom Bar
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 12, backgroundColor: "rgba(13,13,26,0.98)", gap: 10 },
  inviteBtn: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  inviteBtnText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  ctaBtn: { borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaBtnGradient: { paddingVertical: 16, alignItems: "center" },
  ctaBtnText: { fontSize: 17, fontWeight: "800", color: "#FFFFFF", fontFamily: "Chillax-Bold" },
  ctaBtnSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  // Modal
  modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.85)", alignItems: "center", justifyContent: "center" },
  modal: { width: width - 60, borderRadius: 24, padding: 32, alignItems: "center", overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  modalEmoji: { fontSize: 64, marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: "900", color: "#FFFFFF", textAlign: "center", marginBottom: 8, fontFamily: "Chillax-Bold" },
  modalSub: { fontSize: 15, color: "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 22 },
  modalHighlight: { color: "#F94498", fontWeight: "800", fontFamily: "Chillax-Bold" },
});
