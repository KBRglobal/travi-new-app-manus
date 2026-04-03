/**
 * TRAVI — Flight Detail Screen
 * Full flight details: route map, seat classes, amenities, baggage, cashback, booking.
 */

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const FLIGHT_DATA: Record<string, {
  airline: string; logo: string; from: string; fromCity: string; to: string; toCity: string;
  departure: string; arrival: string; duration: string; stops: string; aircraft: string;
  price: number; businessPrice: number; cashback: number; color: string; color2: string;
  amenities: string[]; baggage: { cabin: string; checked: string; extra: string };
  classes: Array<{ name: string; price: number; perks: string[] }>;
  reviews: Array<{ name: string; rating: number; comment: string }>;
}> = {
  "f1": {
    airline: "Emirates", logo: "🇦🇪", from: "TLV", fromCity: "Tel Aviv", to: "DXB", toCity: "Dubai",
    departure: "06:45", arrival: "10:20", duration: "3h 35m", stops: "Non-stop", aircraft: "Boeing 777",
    price: 420, businessPrice: 1850, cashback: 42, color: "#E31837", color2: "#C41230",
    amenities: ["🍽️ In-flight meals", "📺 ICE entertainment", "🔌 USB charging", "🛜 Wi-Fi available", "🥂 Complimentary drinks"],
    baggage: { cabin: "7kg carry-on", checked: "23kg included", extra: "+$45 per extra bag" },
    classes: [
      { name: "Economy", price: 420, perks: ["23kg baggage", "Meal included", "ICE entertainment"] },
      { name: "Business", price: 1850, perks: ["40kg baggage", "Lie-flat bed", "Lounge access", "Chauffeur service"] },
      { name: "First Class", price: 4200, perks: ["50kg baggage", "Private suite", "Shower spa", "Fine dining"] },
    ],
    reviews: [
      { name: "Yael K.", rating: 5, comment: "Emirates is always exceptional. The food was incredible and staff were so attentive." },
      { name: "Oren M.", rating: 4, comment: "Great flight, comfortable seats. The entertainment system is the best in the sky." },
      { name: "Dana S.", rating: 5, comment: "Smooth flight, on time, and the service was top notch. Highly recommend." },
    ],
  },
  "f2": {
    airline: "Air France", logo: "🇫🇷", from: "TLV", fromCity: "Tel Aviv", to: "CDG", toCity: "Paris",
    departure: "09:15", arrival: "12:40", duration: "4h 25m", stops: "Non-stop", aircraft: "Airbus A320",
    price: 380, businessPrice: 1400, cashback: 38, color: "#002157", color2: "#001A45",
    amenities: ["🥐 French cuisine", "📺 Entertainment system", "🔌 Power outlets", "🍷 Wine selection"],
    baggage: { cabin: "12kg carry-on", checked: "23kg included", extra: "+$55 per extra bag" },
    classes: [
      { name: "Economy", price: 380, perks: ["23kg baggage", "Meal included", "Entertainment"] },
      { name: "Business", price: 1400, perks: ["40kg baggage", "Flat bed", "Lounge access"] },
    ],
    reviews: [
      { name: "Sarah L.", rating: 4, comment: "Good flight with typical French hospitality. Food was above average." },
      { name: "Mike R.", rating: 5, comment: "Loved the Air France experience. Punctual and comfortable." },
    ],
  },
};

export default function FlightDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ flightId?: string; tripId?: string }>();
  const flightId = params.flightId ?? "f1";
  const tripId = params.tripId;

  const flight = FLIGHT_DATA[flightId] ?? FLIGHT_DATA["f1"];
  const [selectedClass, setSelectedClass] = useState(0);
  const [booked, setBooked] = useState(false);

  const selectedClassData = flight.classes[selectedClass];

  const handleBook = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setBooked(true);
    setTimeout(() => {
      router.push({ pathname: "/(trip)/hotels", params: { tripId } } as never);
    }, 1200);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Hero */}
      <LinearGradient colors={[flight.color, flight.color2, "#1A0A3D"]} style={styles.hero}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.airlineLogo}>{flight.logo}</Text>
          <Text style={styles.airlineName}>{flight.airline}</Text>
          <Text style={styles.aircraft}>{flight.aircraft} · {flight.stops}</Text>

          {/* Route */}
          <View style={styles.routeRow}>
            <View style={styles.routeEnd}>
              <Text style={styles.routeCode}>{flight.from}</Text>
              <Text style={styles.routeCity}>{flight.fromCity}</Text>
              <Text style={styles.routeTime}>{flight.departure}</Text>
            </View>
            <View style={styles.routeMiddle}>
              <Text style={styles.routeDuration}>{flight.duration}</Text>
              <View style={styles.routeLine}>
                <View style={styles.routeDot} />
                <View style={styles.routeLineBar} />
                <Text style={styles.routePlane}>✈️</Text>
                <View style={styles.routeLineBar} />
                <View style={styles.routeDot} />
              </View>
              <Text style={styles.routeStops}>{flight.stops}</Text>
            </View>
            <View style={[styles.routeEnd, { alignItems: "flex-end" }]}>
              <Text style={styles.routeCode}>{flight.to}</Text>
              <Text style={styles.routeCity}>{flight.toCity}</Text>
              <Text style={styles.routeTime}>{flight.arrival}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Cashback badge */}
        <View style={styles.cashbackCard}>
          <LinearGradient colors={["rgba(34,197,94,0.15)", "rgba(34,197,94,0.05)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.cashbackEmoji}>💰</Text>
          <View style={styles.cashbackInfo}>
            <Text style={styles.cashbackTitle}>Earn ${flight.cashback} Cashback</Text>
            <Text style={styles.cashbackSub}>10% of your booking goes back to your TRAVI wallet</Text>
          </View>
        </View>

        {/* Class selector */}
        <Text style={styles.sectionTitle}>Select Class</Text>
        <View style={styles.classRow}>
          {flight.classes.map((cls, i) => (
            <TouchableOpacity
              key={cls.name}
              style={[styles.classCard, selectedClass === i && { borderColor: flight.color, backgroundColor: flight.color + "22" }]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedClass(i);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.className, selectedClass === i && { color: "#FFFFFF" }]}>{cls.name}</Text>
              <Text style={[styles.classPrice, { color: selectedClass === i ? flight.color : "#FFFFFF" }]}>${cls.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected class perks */}
        <View style={styles.perksCard}>
          {selectedClassData.perks.map((perk, i) => (
            <View key={i} style={styles.perkRow}>
              <Text style={[styles.perkDot, { color: flight.color }]}>●</Text>
              <Text style={styles.perkText}>{perk}</Text>
            </View>
          ))}
        </View>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>In-Flight Amenities</Text>
        <View style={styles.amenitiesGrid}>
          {flight.amenities.map((a, i) => (
            <View key={i} style={styles.amenityChip}>
              <Text style={styles.amenityText}>{a}</Text>
            </View>
          ))}
        </View>

        {/* Baggage */}
        <Text style={styles.sectionTitle}>Baggage Policy</Text>
        <View style={styles.baggageCard}>
          {[
            { icon: "🎒", label: "Cabin Bag", value: flight.baggage.cabin },
            { icon: "🧳", label: "Checked Bag", value: flight.baggage.checked },
            { icon: "➕", label: "Extra Bag", value: flight.baggage.extra },
          ].map((b, i) => (
            <View key={i} style={[styles.baggageRow, i < 2 && styles.baggageRowBorder]}>
              <Text style={styles.baggageIcon}>{b.icon}</Text>
              <Text style={styles.baggageLabel}>{b.label}</Text>
              <Text style={styles.baggageValue}>{b.value}</Text>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <Text style={styles.sectionTitle}>Passenger Reviews</Text>
        {flight.reviews.map((review, i) => (
          <View key={i} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewAvatar}>
                <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
              </View>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Text style={styles.reviewRating}>{"⭐".repeat(review.rating)}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Book CTA */}
      <View style={[styles.bookingBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.bookingPrice}>
          <Text style={styles.bookingPriceLabel}>Total</Text>
          <Text style={styles.bookingPriceAmount}>${selectedClassData.price}</Text>
          <Text style={styles.bookingCashback}>+${Math.round(selectedClassData.price * 0.1)} back</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookBtn, booked && styles.bookBtnDone]}
          onPress={handleBook}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={booked ? ["#22C55E", "#16A34A"] : [flight.color, flight.color2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bookBtnGrad}
          >
            <Text style={styles.bookBtnText}>{booked ? "✓ Booked!" : "Book This Flight"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  hero: { paddingHorizontal: 20, paddingBottom: 130 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  heroContent: { alignItems: "center", gap: 4 },
  airlineLogo: { fontSize: 40 },
  airlineName: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  aircraft: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  routeRow: { flexDirection: "row", alignItems: "center", width: "100%", marginTop: 20 },
  routeEnd: { flex: 1, gap: 2 },
  routeCode: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  routeCity: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  routeTime: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginTop: 4, fontFamily: "Chillax-Semibold" },
  routeMiddle: { flex: 1.5, alignItems: "center", gap: 4 },
  routeDuration: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  routeLine: { flexDirection: "row", alignItems: "center", gap: 2 },
  routeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.5)" },
  routeLineBar: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.55)" },
  routePlane: { fontSize: 16 },
  routeStops: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  cashbackCard: { borderRadius: 16, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20, borderWidth: 1, borderColor: "rgba(34,197,94,0.2)" },
  cashbackEmoji: { fontSize: 28 },
  cashbackInfo: { flex: 1 },
  cashbackTitle: { color: "#22C55E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  cashbackSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  sectionTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginBottom: 12, marginTop: 4, fontFamily: "Chillax-Bold" },
  classRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  classCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, padding: 12, alignItems: "center", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.55)" },
  className: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "700" },
  classPrice: { fontSize: 16, fontWeight: "900", marginTop: 4, fontFamily: "Chillax-Bold" },
  perksCard: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, padding: 14, gap: 8, marginBottom: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  perkRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  perkDot: { fontSize: 8, marginTop: 6 },
  perkText: { color: "rgba(255,255,255,0.8)", fontSize: 13, flex: 1 },
  amenitiesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  amenityChip: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  amenityText: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  baggageCard: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, overflow: "hidden", marginBottom: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  baggageRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  baggageRowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.55)" },
  baggageIcon: { fontSize: 20 },
  baggageLabel: { flex: 1, color: "rgba(255,255,255,0.6)", fontSize: 13 },
  baggageValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(100,67,244,0.3)", alignItems: "center", justifyContent: "center" },
  reviewAvatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  reviewName: { flex: 1, color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  reviewRating: { fontSize: 12 },
  reviewComment: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20 },
  bookingBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(13,6,40,0.95)", paddingHorizontal: 20, paddingTop: 14, flexDirection: "row", alignItems: "center", gap: 14, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.55)" },
  bookingPrice: { flex: 1 },
  bookingPriceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  bookingPriceAmount: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  bookingCashback: { color: "#22C55E", fontSize: 12, fontWeight: "700" },
  bookBtn: { flex: 1.5, borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  bookBtnDone: {},
  bookBtnGrad: { paddingVertical: 16, alignItems: "center" },
  bookBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
