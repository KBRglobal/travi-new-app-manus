import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore, Trip } from "@/lib/store";

const { width } = Dimensions.get("window");

const MOCK_UPCOMING: Trip[] = [
  {
    id: "mock1",
    destination: "Paris",
    destinationCode: "CDG",
    country: "France",
    startDate: "Apr 15",
    endDate: "Apr 22",
    travelers: 2,
    budget: "Luxury",
    status: "upcoming",
    interests: ["culture", "food"],
    landmarks: ["Eiffel Tower"],
    itinerary: [],
    totalCost: 4850,
    pointsEarned: 2425,
  },
];

const TRENDING = [
  { city: "Paris", country: "France", emoji: "🗼", temp: "18°C", price: 1200, rating: 4.9 },
  { city: "Tokyo", country: "Japan", emoji: "⛩️", temp: "22°C", price: 1800, rating: 4.8 },
  { city: "Bali", country: "Indonesia", emoji: "🌴", temp: "30°C", price: 950, rating: 4.7 },
  { city: "Santorini", country: "Greece", emoji: "🏛️", temp: "24°C", price: 1600, rating: 4.9 },
  { city: "Dubai", country: "UAE", emoji: "🌆", temp: "35°C", price: 1100, rating: 4.7 },
];

const QUICK_ACTIONS = [
  { icon: "✈️", label: "Flights", route: "/(trip)/flights" },
  { icon: "🏨", label: "Hotels", route: "/(trip)/hotels" },
  { icon: "🎭", label: "Activities", route: "/(trip)/interests" },
  { icon: "🗺️", label: "Explore", route: "/(tabs)/explore" },
];

const TRAVI_TIPS = [
  { emoji: "💡", tip: "Book 6 weeks early to save up to 30% on flights", dest: "General" },
  { emoji: "🌅", tip: "Visit the Eiffel Tower at golden hour for the best photos", dest: "Paris" },
  { emoji: "🍜", tip: "Try ramen at Ichiran for an authentic solo dining experience", dest: "Tokyo" },
  { emoji: "🧘", tip: "Sunrise yoga at Campuhan Ridge Walk is free and magical", dest: "Bali" },
];

export default function HomeScreen() {
  const { state } = useStore();
  const profile = state.profile;
  const [tipIndex, setTipIndex] = useState(0);

  const trips = state.trips.length > 0 ? state.trips : MOCK_UPCOMING;
  const upcomingTrips = trips.filter((t) => t.status === "upcoming" || t.status === "active");
  const activeTrip = trips.find((t) => t.status === "active");
  const points = profile?.points || 4250;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* ── HERO HEADER ─────────────────────────────────────────────────── */}
        <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
          {/* Top row */}
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>{profile?.name || "Traveler"} 👋</Text>
            </View>
            <View style={styles.headerRight}>
              {/* Points badge */}
              <TouchableOpacity
                style={styles.pointsBadge}
                onPress={() => router.push("/(tabs)/wallet" as never)}
                activeOpacity={0.85}
              >
                <Text style={styles.pointsStar}>✦</Text>
                <Text style={styles.pointsVal}>{points.toLocaleString()}</Text>
                <Text style={styles.pointsUnit}>pts</Text>
              </TouchableOpacity>
              {/* Notification bell */}
              <TouchableOpacity style={styles.bellBtn}>
                <IconSymbol name="bell.fill" size={22} color="#FFFFFF" />
                <View style={styles.bellDot} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push("/(tabs)/explore" as never)}
            activeOpacity={0.9}
          >
            <IconSymbol name="magnifyingglass" size={18} color="#A78BCA" />
            <Text style={styles.searchPlaceholder}>Where to next?</Text>
            <View style={styles.searchFilter}>
              <IconSymbol name="slider.horizontal.3" size={16} color="#7B2FBE" />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* ── ACTIVE TRIP LIVE BANNER ──────────────────────────────────────── */}
        {activeTrip && (
          <TouchableOpacity
            style={styles.liveBanner}
            onPress={() => router.push("/(live)/home" as never)}
            activeOpacity={0.9}
          >
            <LinearGradient colors={["#1B4D1E", "#2D4A1E"]} style={styles.liveBannerGradient}>
              <View style={styles.liveIndicator}>
                <View style={styles.livePulse} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <View style={styles.liveBannerInfo}>
                <Text style={styles.liveBannerTitle}>{activeTrip.destination} Trip is Active</Text>
                <Text style={styles.liveBannerSub}>Tap to open Live Mode</Text>
              </View>
              <IconSymbol name="arrow.right" size={20} color="#4CAF50" />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* ── PLAN NEW TRIP CTA ─────────────────────────────────────────────── */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => router.push("/(trip)/plan" as never)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#7B2FBE", "#E91E8C"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.planCard}
            >
              <View style={styles.planCardContent}>
                <View>
                  <Text style={styles.planCardLabel}>AI-Powered Planning</Text>
                  <Text style={styles.planCardTitle}>Plan Your Next{"\n"}Adventure ✈️</Text>
                  <Text style={styles.planCardSub}>Flights • Hotels • Itinerary</Text>
                </View>
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={styles.planCardDuck}
                  contentFit="contain"
                />
              </View>
              <View style={styles.planCardBtn}>
                <Text style={styles.planCardBtnText}>Start Planning →</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── QUICK ACTIONS ─────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            {QUICK_ACTIONS.map((a) => (
              <TouchableOpacity
                key={a.label}
                style={styles.quickAction}
                onPress={() => router.push(a.route as never)}
                activeOpacity={0.8}
              >
                <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.quickActionGradient}>
                  <Text style={styles.quickActionIcon}>{a.icon}</Text>
                  <Text style={styles.quickActionLabel}>{a.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── UPCOMING TRIPS ────────────────────────────────────────────────── */}
        {upcomingTrips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Trips</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/trips" as never)}>
                <Text style={styles.seeAll}>See all →</Text>
              </TouchableOpacity>
            </View>
            {upcomingTrips.slice(0, 2).map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.upcomingCard}
                onPress={() => router.push({ pathname: "/(trip)/summary" as never, params: { tripId: trip.id } })}
                activeOpacity={0.85}
              >
                <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.upcomingCardGradient}>
                  <View style={styles.upcomingCardLeft}>
                    <Text style={styles.upcomingEmoji}>
                      {trip.destination === "Paris" ? "🗼" : trip.destination === "Tokyo" ? "⛩️" : "✈️"}
                    </Text>
                    <View>
                      <Text style={styles.upcomingDest}>{trip.destination}, {trip.country}</Text>
                      <Text style={styles.upcomingDates}>{trip.startDate} → {trip.endDate}</Text>
                      <View style={styles.upcomingMeta}>
                        <IconSymbol name="person.2.fill" size={12} color="#A78BCA" />
                        <Text style={styles.upcomingMetaText}>{trip.travelers} travelers</Text>
                        <Text style={styles.upcomingDot}>•</Text>
                        <Text style={styles.upcomingCost}>${trip.totalCost.toLocaleString()}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.upcomingRight}>
                    <TouchableOpacity
                      style={styles.liveModeBtn}
                      onPress={() => router.push({ pathname: "/(live)/home" as never, params: { tripId: trip.id } })}
                      activeOpacity={0.85}
                    >
                      <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.liveModeGradient}>
                        <Text style={styles.liveModeText}>Live</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.pointsEarned}>
                      <Text style={styles.pointsEarnedStar}>✦</Text>
                      <Text style={styles.pointsEarnedVal}>{trip.pointsEarned.toLocaleString()}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── TRAVI TIP ─────────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.tipCard}
            onPress={() => setTipIndex((i) => (i + 1) % TRAVI_TIPS.length)}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["rgba(123,47,190,0.25)", "rgba(233,30,140,0.15)"]} style={styles.tipGradient}>
              <Image source={require("@/assets/images/icon.png")} style={styles.tipDuck} contentFit="contain" />
              <View style={styles.tipContent}>
                <Text style={styles.tipLabel}>TRAVI Tip • {TRAVI_TIPS[tipIndex].dest}</Text>
                <Text style={styles.tipText}>{TRAVI_TIPS[tipIndex].emoji} {TRAVI_TIPS[tipIndex].tip}</Text>
                <Text style={styles.tipHint}>Tap for next tip</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── TRENDING DESTINATIONS ─────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore" as never)}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={TRENDING}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.city}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.trendCard}
                onPress={() => router.push({ pathname: "/(trip)/plan" as never, params: { destination: item.city } })}
                activeOpacity={0.85}
              >
                <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.trendCardGradient}>
                  <Text style={styles.trendEmoji}>{item.emoji}</Text>
                  <Text style={styles.trendCity}>{item.city}</Text>
                  <Text style={styles.trendCountry}>{item.country}</Text>
                  <View style={styles.trendMeta}>
                    <Text style={styles.trendRating}>⭐ {item.rating}</Text>
                    <Text style={styles.trendTemp}>{item.temp}</Text>
                  </View>
                  <Text style={styles.trendPrice}>from ${item.price}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── POINTS CARD ───────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/wallet" as never)}
            activeOpacity={0.9}
          >
            <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.pointsCard}>
              <View style={styles.pointsCardLeft}>
                <Text style={styles.pointsCardLabel}>TRAVI Points</Text>
                <Text style={styles.pointsCardVal}>✦ {points.toLocaleString()}</Text>
                <Text style={styles.pointsCardSub}>≈ ${(points / 100).toFixed(0)} travel value</Text>
              </View>
              <View style={styles.pointsCardRight}>
                <TouchableOpacity
                  style={styles.redeemBtn}
                  onPress={() => router.push("/(tabs)/wallet" as never)}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.redeemGradient}>
                    <Text style={styles.redeemText}>Redeem</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── EMPTY STATE (no trips) ────────────────────────────────────────── */}
        {upcomingTrips.length === 0 && (
          <View style={styles.emptyState}>
            <Image source={require("@/assets/images/icon.png")} style={styles.emptyDuck} contentFit="contain" />
            <Text style={styles.emptyTitle}>Ready to explore?</Text>
            <Text style={styles.emptySubtitle}>Tap "Plan Your Next Adventure" above and let TRAVI build your perfect trip</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, gap: 14 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerLeft: { gap: 2 },
  greeting: { color: "#A78BCA", fontSize: 14 },
  userName: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  pointsBadge: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#3D2580", borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 6,
    gap: 4, borderWidth: 1, borderColor: "#7B2FBE",
  },
  pointsStar: { color: "#FFD700", fontSize: 12 },
  pointsVal: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  pointsUnit: { color: "#A78BCA", fontSize: 11 },
  bellBtn: { position: "relative", padding: 6 },
  bellDot: {
    position: "absolute", top: 4, right: 4,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: "#E91E8C", borderWidth: 1.5, borderColor: "#1A0533",
  },
  searchBar: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: "#4A3080", gap: 10,
  },
  searchPlaceholder: { flex: 1, color: "#A78BCA", fontSize: 15 },
  searchFilter: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: "rgba(123,47,190,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  liveBanner: { marginHorizontal: 20, marginTop: 14, borderRadius: 14, overflow: "hidden" },
  liveBannerGradient: {
    flexDirection: "row", alignItems: "center",
    padding: 14, gap: 12,
    borderWidth: 1, borderColor: "#4CAF50",
    borderRadius: 14,
  },
  liveIndicator: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(76,175,80,0.2)",
    borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4,
    gap: 5, borderWidth: 1, borderColor: "#4CAF50",
  },
  livePulse: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#4CAF50" },
  liveText: { color: "#4CAF50", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  liveBannerInfo: { flex: 1 },
  liveBannerTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  liveBannerSub: { color: "#A78BCA", fontSize: 12, marginTop: 1 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#7B2FBE", fontSize: 14, fontWeight: "600" },
  planCard: { borderRadius: 22, overflow: "hidden" },
  planCardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingBottom: 12 },
  planCardLabel: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "600", letterSpacing: 0.5, marginBottom: 4 },
  planCardTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", lineHeight: 28, marginBottom: 6 },
  planCardSub: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  planCardDuck: { width: 80, height: 80 },
  planCardBtn: {
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12, paddingVertical: 10, alignItems: "center",
  },
  planCardBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  quickActions: { flexDirection: "row", gap: 10 },
  quickAction: { flex: 1, borderRadius: 14, overflow: "hidden" },
  quickActionGradient: {
    padding: 14, alignItems: "center", gap: 6,
    borderWidth: 1, borderColor: "#4A3080",
    borderRadius: 14,
  },
  quickActionIcon: { fontSize: 24 },
  quickActionLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  upcomingCard: { borderRadius: 16, overflow: "hidden", marginBottom: 10 },
  upcomingCardGradient: {
    flexDirection: "row", alignItems: "center",
    padding: 14, borderWidth: 1, borderColor: "#4A3080", borderRadius: 16,
  },
  upcomingCardLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  upcomingEmoji: { fontSize: 36 },
  upcomingDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  upcomingDates: { color: "#A78BCA", fontSize: 12, marginTop: 2 },
  upcomingMeta: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  upcomingMetaText: { color: "#A78BCA", fontSize: 12 },
  upcomingDot: { color: "#4A3080", fontSize: 12 },
  upcomingCost: { color: "#4CAF50", fontSize: 12, fontWeight: "600" },
  upcomingRight: { alignItems: "center", gap: 8 },
  liveModeBtn: { borderRadius: 10, overflow: "hidden" },
  liveModeGradient: { paddingHorizontal: 12, paddingVertical: 6 },
  liveModeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  pointsEarned: { flexDirection: "row", alignItems: "center", gap: 3 },
  pointsEarnedStar: { color: "#FFD700", fontSize: 11 },
  pointsEarnedVal: { color: "#FFD700", fontSize: 12, fontWeight: "600" },
  tipCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#7B2FBE" },
  tipGradient: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  tipDuck: { width: 52, height: 52 },
  tipContent: { flex: 1, gap: 4 },
  tipLabel: { color: "#7B2FBE", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  tipText: { color: "#FFFFFF", fontSize: 14, lineHeight: 20 },
  tipHint: { color: "#6B5A8A", fontSize: 11 },
  trendCard: { width: 130, borderRadius: 16, overflow: "hidden" },
  trendCardGradient: {
    padding: 14, alignItems: "center", gap: 4,
    borderWidth: 1, borderColor: "#4A3080", borderRadius: 16,
  },
  trendEmoji: { fontSize: 36, marginBottom: 4 },
  trendCity: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  trendCountry: { color: "#A78BCA", fontSize: 12 },
  trendMeta: { flexDirection: "row", gap: 8, marginTop: 4 },
  trendRating: { color: "#FFD700", fontSize: 11, fontWeight: "600" },
  trendTemp: { color: "#A78BCA", fontSize: 11 },
  trendPrice: { color: "#4CAF50", fontSize: 12, fontWeight: "700", marginTop: 2 },
  pointsCard: {
    borderRadius: 16, flexDirection: "row", alignItems: "center",
    padding: 16, borderWidth: 1, borderColor: "#4A3080",
  },
  pointsCardLeft: { flex: 1, gap: 4 },
  pointsCardLabel: { color: "#A78BCA", fontSize: 13 },
  pointsCardVal: { color: "#FFD700", fontSize: 24, fontWeight: "800" },
  pointsCardSub: { color: "#4CAF50", fontSize: 12 },
  pointsCardRight: {},
  redeemBtn: { borderRadius: 12, overflow: "hidden" },
  redeemGradient: { paddingHorizontal: 16, paddingVertical: 10 },
  redeemText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  emptyState: { alignItems: "center", paddingHorizontal: 40, paddingTop: 20 },
  emptyDuck: { width: 100, height: 100, marginBottom: 12 },
  emptyTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 6 },
  emptySubtitle: { color: "#A78BCA", fontSize: 14, textAlign: "center", lineHeight: 20 },
});
