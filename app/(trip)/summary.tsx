import { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

export default function SummaryScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const trip = state.trips.find((t) => t.id === tripId);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleConfirm = () => {
    if (!tripId) return;
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const pointsEarned = Math.floor((trip?.totalCost || 0) * 10);
    dispatch({ type: "UPDATE_TRIP", payload: { id: tripId, updates: { status: "upcoming", pointsEarned } } });
    dispatch({ type: "ADD_POINTS", payload: { amount: pointsEarned, description: "Trip booked: " + (trip?.destination || "New Trip") } });
    router.push({ pathname: "/(trip)/completion", params: { tripId } } as never);
  };

  if (!trip) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.centerWrap}>
          <Text style={styles.errorText}>Trip not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtnCenter}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const nights = trip.startDate && trip.endDate
    ? Math.max(1, Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000))
    : 7;
  const pointsToEarn = Math.floor((trip.totalCost || 0) * 10);

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Summary</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], gap: 16 }}>
          <View style={styles.duckRow}>
            <View style={styles.duckAvatar}>
              <LinearGradient colors={["#6443F4", "#F94498"]} style={styles.duckGradient}>
                <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.duckImg} resizeMode="contain" />
              </LinearGradient>
            </View>
            <View style={styles.duckBubble}>
              <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} style={styles.duckBubbleGradient}>
                <Text style={styles.duckMessage}>Your perfect trip is ready!</Text>
                <Text style={styles.duckSub}>Review and confirm to lock it in</Text>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.heroCard}>
            <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.15)"]} style={StyleSheet.absoluteFillObject} />
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroDestination}>{trip.destination}</Text>
                <Text style={styles.heroCountry}>{trip.country}</Text>
              </View>
              <View style={styles.heroBadge}>
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.heroBadgeGradient}>
                  <Text style={styles.heroBadgeText}>{nights}N / {nights + 1}D</Text>
                </LinearGradient>
              </View>
            </View>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <IconSymbol name="calendar" size={16} color="rgba(192,132,252,0.8)" />
                <Text style={styles.heroStatLabel}>Departure</Text>
                <Text style={styles.heroStatValue}>{formatDate(trip.startDate || "")}</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <IconSymbol name="person.2.fill" size={16} color="rgba(192,132,252,0.8)" />
                <Text style={styles.heroStatLabel}>Travelers</Text>
                <Text style={styles.heroStatValue}>{trip.travelers} people</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <IconSymbol name="creditcard.fill" size={16} color="rgba(192,132,252,0.8)" />
                <Text style={styles.heroStatLabel}>Budget</Text>
                <Text style={styles.heroStatValue}>{trip.budget}</Text>
              </View>
            </View>
          </View>
          {trip.flight && (
            <View style={styles.sectionCard}>
              <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconWrap}>
                  <LinearGradient colors={["#6443F4", "#5B21B6"]} style={styles.sectionIconGradient}>
                    <IconSymbol name="airplane" size={18} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.sectionTitle}>Flight</Text>
                <View style={styles.confirmedBadge}>
                  <IconSymbol name="checkmark.circle.fill" size={14} color="#4CAF50" />
                  <Text style={styles.confirmedText}>Confirmed</Text>
                </View>
              </View>
              <View style={styles.flightRow}>
                <View style={styles.flightEndpoint}>
                  <Text style={styles.flightCode}>{trip.flight.from}</Text>
                  <Text style={styles.flightTime}>{trip.flight.departure}</Text>
                </View>
                <View style={styles.flightMiddle}>
                  <Text style={styles.flightDuration}>{trip.flight.duration}</Text>
                  <View style={styles.flightLine}>
                    <View style={styles.flightDot} />
                    <View style={styles.flightLineBar} />
                    <IconSymbol name="airplane" size={14} color="#F94498" />
                    <View style={styles.flightLineBar} />
                    <View style={styles.flightDot} />
                  </View>
                  <Text style={styles.flightStops}>{trip.flight.stops === 0 ? "Direct" : trip.flight.stops + " stop"}</Text>
                </View>
                <View style={styles.flightEndpoint}>
                  <Text style={styles.flightCode}>{trip.flight.to}</Text>
                  <Text style={styles.flightTime}>{trip.flight.arrival}</Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardAirline}>{trip.flight.airline} · {trip.flight.class}</Text>
                <Text style={styles.cardPrice}>${trip.flight.price}</Text>
              </View>
            </View>
          )}
          {trip.hotel && (
            <View style={styles.sectionCard}>
              <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconWrap}>
                  <LinearGradient colors={["#F94498", "#C2185B"]} style={styles.sectionIconGradient}>
                    <IconSymbol name="building.2.fill" size={18} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.sectionTitle}>Hotel</Text>
                <View style={styles.confirmedBadge}>
                  <IconSymbol name="checkmark.circle.fill" size={14} color="#4CAF50" />
                  <Text style={styles.confirmedText}>Confirmed</Text>
                </View>
              </View>
              <Text style={styles.hotelName}>{trip.hotel.name}</Text>
              <View style={styles.hotelMeta}>
                <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.5)" />
                <Text style={styles.hotelLocation}>{trip.hotel.location}</Text>
                <View style={styles.starsRow}>
                  {Array.from({ length: trip.hotel.stars }).map((_, i) => (
                    <IconSymbol key={i} name="star.fill" size={10} color="#FBBF24" />
                  ))}
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardAirline}>{nights} nights · ${trip.hotel.pricePerNight}/night</Text>
                <Text style={styles.cardPrice}>${trip.hotel.totalPrice}</Text>
              </View>
            </View>
          )}
          {trip.interests.length > 0 && (
            <View style={styles.sectionCard}>
              <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconWrap}>
                  <LinearGradient colors={["#FF6B35", "#F94498"]} style={styles.sectionIconGradient}>
                    <IconSymbol name="heart.fill" size={18} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.sectionTitle}>Your Interests</Text>
              </View>
              <View style={styles.tagsWrap}>
                {trip.interests.map((interest) => (
                  <View key={interest} style={styles.tag}>
                    <Text style={styles.tagText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <View style={styles.pointsBanner}>
            <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.35)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <View style={styles.pointsLeft}>
              <IconSymbol name="star.fill" size={24} color="#FBBF24" />
              <View>
                <Text style={styles.pointsTitle}>You'll earn</Text>
                <Text style={styles.pointsAmount}>{pointsToEarn.toLocaleString()} TRAVI Points</Text>
              </View>
            </View>
            <Text style={styles.pointsValue}>${(pointsToEarn / 100).toFixed(0)} value</Text>
          </View>
          <View style={styles.totalCard}>
            <LinearGradient colors={["rgba(123,47,190,0.2)", "rgba(233,30,140,0.1)"]} style={StyleSheet.absoluteFillObject} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Trip Cost</Text>
              <Text style={styles.totalAmount}>${(trip.totalCost || 0).toLocaleString()}</Text>
            </View>
            <Text style={styles.totalSub}>Includes flights, hotel, and all activities</Text>
          </View>
        </Animated.View>
      </ScrollView>
      <View style={styles.ctaWrap}>
        <TouchableOpacity style={styles.ctaBtn} onPress={handleConfirm} activeOpacity={0.88}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
            <IconSymbol name="checkmark.circle.fill" size={22} color="#FFFFFF" />
            <Text style={styles.ctaText}>Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.editBtnText}>Edit Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width * 1.2, height: width * 1.2, borderRadius: width * 0.6, top: -width * 0.5, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.08)" },
  orb2: { position: "absolute", width: width, height: width, borderRadius: width / 2, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  scroll: { paddingHorizontal: 20, paddingBottom: 130 },
  centerWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  errorText: { color: "rgba(255,255,255,0.6)", fontSize: 16, fontFamily: "Satoshi-Regular" },
  backBtnCenter: { paddingHorizontal: 24, paddingVertical: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14 },
  backBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  duckRow: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
  duckAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 30, height: 30 },
  duckBubble: { flex: 1, borderRadius: 18, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Medium", lineHeight: 20 },
  duckSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  heroCard: { borderRadius: 24, overflow: "hidden", padding: 20, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)", gap: 16 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  heroDestination: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold", lineHeight: 34 },
  heroCountry: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: 2 },
  heroBadge: { borderRadius: 12, overflow: "hidden" },
  heroBadgeGradient: { paddingHorizontal: 14, paddingVertical: 8 },
  heroBadgeText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  heroStats: { flexDirection: "row", alignItems: "center" },
  heroStat: { flex: 1, alignItems: "center", gap: 4 },
  heroStatLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, textAlign: "center" },
  heroStatValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Medium", textAlign: "center" },
  heroDivider: { width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.06)" },
  sectionCard: { borderRadius: 20, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", gap: 12 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionIconWrap: { borderRadius: 10, overflow: "hidden" },
  sectionIconGradient: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  sectionTitle: { flex: 1, color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  confirmedBadge: { flexDirection: "row", alignItems: "center", gap: 4 },
  confirmedText: { color: "#4CAF50", fontSize: 12, fontWeight: "600" },
  flightRow: { flexDirection: "row", alignItems: "center" },
  flightEndpoint: { alignItems: "center", gap: 4 },
  flightCode: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  flightTime: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  flightMiddle: { flex: 1, alignItems: "center", gap: 4 },
  flightDuration: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  flightLine: { flexDirection: "row", alignItems: "center", width: "100%" },
  flightDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)" },
  flightLineBar: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  flightStops: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)" },
  cardAirline: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  cardPrice: { color: "#F94498", fontSize: 20, fontWeight: "900", fontFamily: "Satoshi-Bold" },
  hotelName: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  hotelMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  hotelLocation: { color: "rgba(255,255,255,0.5)", fontSize: 12, flex: 1 },
  starsRow: { flexDirection: "row", gap: 2 },
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: "rgba(123,47,190,0.25)", borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  tagText: { color: "rgba(192,132,252,0.9)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  pointsBanner: { borderRadius: 20, overflow: "hidden", padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  pointsLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  pointsTitle: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  pointsAmount: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Satoshi-Bold" },
  pointsValue: { color: "#FBBF24", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  totalCard: { borderRadius: 20, overflow: "hidden", padding: 20, borderWidth: 1, borderColor: "rgba(123,47,190,0.3)", gap: 6 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  totalAmount: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Satoshi-Bold" },
  totalSub: { color: "rgba(255,255,255,0.55)", fontSize: 12 },
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 130, paddingTop: 12, gap: 12 },
  ctaBtn: { borderRadius: 20, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  editBtn: { alignItems: "center", paddingVertical: 12 },
  editBtnText: { color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: "600", fontFamily: "Satoshi-Medium" },
});
