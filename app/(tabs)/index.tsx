import { useRef, useState, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Animated, Platform, FlatList, StatusBar
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FEATURED_DESTINATIONS = [
  { id: "1", city: "Kyoto", country: "Japan", tagline: "Cherry blossoms & ancient temples", gradient: ["#1a0533", "#4a1a7a", "#2d0d5c"] as [string,string,string], price: "From $1,240", badge: "DNA Match", badgeColor: "#E91E8C" },
  { id: "2", city: "Santorini", country: "Greece", tagline: "Sunsets that stop time", gradient: ["#0d2040", "#1a3a6e", "#0a1a3d"] as [string,string,string], price: "From $980", badge: "Trending", badgeColor: "#F59E0B" },
  { id: "3", city: "Tokyo", country: "Japan", tagline: "Where neon meets tradition", gradient: ["#1a0020", "#3d0040", "#1a0030"] as [string,string,string], price: "From $1,450", badge: "Popular", badgeColor: "#7B2FBE" },
  { id: "4", city: "Bali", country: "Indonesia", tagline: "Find your inner peace", gradient: ["#0d2a1a", "#1a4a2e", "#0a2015"] as [string,string,string], price: "From $760", badge: "Best Value", badgeColor: "#10B981" },
];

const QUICK_ACTIONS = [
  { id: "flights", label: "Flights", iconName: "airplane", colors: ["#1E3A5F", "#2563EB"] as [string,string] },
  { id: "hotels", label: "Hotels", iconName: "bed.double.fill", colors: ["#7C3AED", "#A855F7"] as [string,string] },
  { id: "experiences", label: "Experiences", iconName: "sparkles", colors: ["#BE185D", "#EC4899"] as [string,string] },
  { id: "alerts", label: "Price Alert", iconName: "bell.fill", colors: ["#065F46", "#10B981"] as [string,string] },
];

const TRENDING_STORIES = [
  { id: "1", author: "Maya R.", dest: "Lisbon", text: "The most underrated city in Europe. Pastéis de nata changed my life.", avatar: "M", gradient: ["#C2410C", "#EA580C"] as [string,string] },
  { id: "2", author: "James K.", dest: "Kyoto", text: "Woke up at 5am to see Fushimi Inari alone. Worth every second.", avatar: "J", gradient: ["#1E3A5F", "#2563EB"] as [string,string] },
  { id: "3", author: "Sara L.", dest: "Bali", text: "Ubud rice terraces at sunrise. No words. Just go.", avatar: "S", gradient: ["#065F46", "#10B981"] as [string,string] },
];

const PRICE_ALERTS = [
  { id: "1", dest: "Barcelona", from: "TLV", price: "$420", drop: "-23%", gradient: ["rgba(123,47,190,0.3)", "rgba(233,30,140,0.15)"] as [string,string] },
  { id: "2", dest: "Amsterdam", from: "TLV", price: "$380", drop: "-18%", gradient: ["rgba(30,58,95,0.3)", "rgba(37,99,235,0.15)"] as [string,string] },
];

export default function HomeScreen() {
  const { state } = useStore();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState<"discover" | "trips">("discover");

  const profile = state.profile;
  const trips = state.trips;
  const activeTrip = state.activeTrip;
  const points = profile?.points || 0;
  const dnaType = profile?.travelerDNA?.type || "Explorer";
  const firstName = profile?.name?.split(" ")[0] || "Traveler";

  const headerOpacity = scrollY.interpolate({ inputRange: [0, 80], outputRange: [0, 1], extrapolate: "clamp" });
  const heroScale = scrollY.interpolate({ inputRange: [-100, 0], outputRange: [1.08, 1], extrapolate: "clamp" });

  const handlePlan = useCallback(() => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(trip)/plan" as never);
  }, []);

  const handleLiveTrip = useCallback(() => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(live)/home" as never);
  }, []);

  const upcomingTrips = trips.filter((t) => t.status === "upcoming" || t.status === "active");

  return (
    <View style={S.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Floating orbs */}
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Sticky mini-header on scroll */}
      <Animated.View style={[S.stickyHeader, { opacity: headerOpacity }]}>
        <LinearGradient colors={["rgba(4,0,16,0.95)", "rgba(13,5,32,0.9)"]} style={StyleSheet.absoluteFillObject} />
        <Text style={S.stickyTitle}>TRAVI</Text>
        <View style={S.stickyPoints}>
          <IconSymbol name="star.fill" size={13} color="#FFD700" />
          <Text style={S.stickyPointsText}>{points.toLocaleString()}</Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── Hero Section ── */}
        <Animated.View style={[S.hero, { transform: [{ scale: heroScale }] }]}>
          <LinearGradient colors={["#040010", "#1A0A3D", "#2D0A5C"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.heroOrb} />

          <View style={S.heroContent}>
            <View style={S.heroTop}>
              <View>
                <Text style={S.heroGreeting}>Good morning,</Text>
                <Text style={S.heroName}>{firstName}</Text>
              </View>
              <TouchableOpacity style={S.notifBtn} onPress={() => router.push("/(tabs)/profile" as never)} activeOpacity={0.8}>
                <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={S.notifGradient}>
                  <IconSymbol name="bell.fill" size={18} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* DNA Badge */}
            <View style={S.dnaBadge}>
              <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <IconSymbol name="sparkles" size={14} color="#C084FC" />
              <Text style={S.dnaText}>{dnaType}</Text>
            </View>

            {/* Points card */}
            <View style={S.pointsCard}>
              <LinearGradient colors={["rgba(255,215,0,0.15)", "rgba(255,149,0,0.08)", "rgba(123,47,190,0.1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
              <View style={S.pointsLeft}>
                <Text style={S.pointsLabel}>TRAVI POINTS</Text>
                <Text style={S.pointsValue}>{points.toLocaleString()}</Text>
                <Text style={S.pointsSub}>≈ ${Math.floor(points / 100)} travel credit</Text>
              </View>
              <View style={S.pointsRight}>
                <View style={S.tierBadge}>
                  <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                  <Text style={S.tierText}>{points < 1000 ? "Explorer" : points < 5000 ? "Adventurer" : "Elite"}</Text>
                </View>
                <IconSymbol name="star.fill" size={36} color="rgba(255,215,0,0.3)" />
              </View>
            </View>

            {/* Active trip banner */}
            {activeTrip && (
              <TouchableOpacity style={S.activeTripBanner} onPress={handleLiveTrip} activeOpacity={0.88}>
                <LinearGradient colors={["rgba(16,185,129,0.3)", "rgba(5,150,105,0.2)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                <View style={S.activeDot} />
                <View style={{ flex: 1 }}>
                  <Text style={S.activeTripLabel}>LIVE TRIP</Text>
                  <Text style={S.activeTripDest}>{activeTrip.destination}, {activeTrip.country}</Text>
                </View>
                <View style={S.activeTripArrow}>
                  <IconSymbol name="chevron.right" size={16} color="#10B981" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* ── Plan New Trip CTA ── */}
        <View style={S.section}>
          <TouchableOpacity style={S.planCta} onPress={handlePlan} activeOpacity={0.88}>
            <LinearGradient colors={["#7B2FBE", "#C026D3", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <View style={S.planCtaLeft}>
              <View style={S.planCtaIcon}>
                <IconSymbol name="airplane" size={22} color="rgba(255,255,255,0.9)" />
              </View>
              <View>
                <Text style={S.planCtaTitle}>Plan Your Next Trip</Text>
                <Text style={S.planCtaSub}>TRAVI builds it in 90 seconds</Text>
              </View>
            </View>
            <View style={S.planCtaArrow}>
              <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Quick Actions ── */}
        <View style={S.section}>
          <View style={S.quickRow}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={S.quickAction}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  if (action.id === "flights" || action.id === "hotels" || action.id === "experiences") router.push("/(trip)/plan" as never);
                  else if (action.id === "alerts") router.push("/(tabs)/alerts" as never);
                }}
                activeOpacity={0.8}
              >
                <View style={S.quickIcon}>
                  <LinearGradient colors={action.colors} style={S.quickIconGradient}>
                    <IconSymbol name={action.iconName as never} size={22} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={S.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Price Alerts ── */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Price Alerts</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(tabs)/alerts" as never)}>
              <Text style={S.sectionLink}>Set alert</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}>
            {PRICE_ALERTS.map((alert) => (
              <TouchableOpacity key={alert.id} style={S.alertCard} activeOpacity={0.85}>
                <LinearGradient colors={alert.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
                <View style={S.alertCardBorder} />
                <View style={S.alertTop}>
                  <Text style={S.alertDest}>{alert.dest}</Text>
                  <View style={S.alertDropBadge}>
                    <Text style={S.alertDrop}>{alert.drop}</Text>
                  </View>
                </View>
                <Text style={S.alertFrom}>{alert.from} → {alert.dest}</Text>
                <Text style={S.alertPrice}>{alert.price}</Text>
                <View style={S.alertAction}>
                  <IconSymbol name="airplane" size={13} color="rgba(192,132,252,0.7)" />
                  <Text style={S.alertActionText}>Book now</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Featured Destinations ── */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <View>
              <Text style={S.sectionTitle}>Picked for You</Text>
              <Text style={S.sectionSub}>Based on your {dnaType} DNA</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore" as never)} activeOpacity={0.7}>
              <Text style={S.sectionLink}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_DESTINATIONS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={S.featCard}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/(trip)/plan" as never);
                }}
                activeOpacity={0.88}
              >
                <LinearGradient colors={item.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
                <View style={S.featOverlay} />
                <View style={S.featBadge}>
                  <View style={[S.featBadgeDot, { backgroundColor: item.badgeColor }]} />
                  <Text style={S.featBadgeText}>{item.badge}</Text>
                </View>
                <View style={S.featBottom}>
                  <Text style={S.featCity}>{item.city}</Text>
                  <Text style={S.featCountry}>{item.country}</Text>
                  <Text style={S.featTagline} numberOfLines={1}>{item.tagline}</Text>
                  <View style={S.featPriceRow}>
                    <Text style={S.featPrice}>{item.price}</Text>
                    <View style={S.featPlanBtn}>
                      <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                      <Text style={S.featPlanText}>Plan</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── Upcoming Trips ── */}
        {upcomingTrips.length > 0 && (
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <Text style={S.sectionTitle}>Your Trips</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/trips" as never)} activeOpacity={0.7}>
                <Text style={S.sectionLink}>View all</Text>
              </TouchableOpacity>
            </View>
            {upcomingTrips.slice(0, 2).map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={S.tripCard}
                onPress={() => router.push("/(tabs)/trips" as never)}
                activeOpacity={0.88}
              >
                <LinearGradient colors={["rgba(123,47,190,0.25)", "rgba(233,30,140,0.12)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
                <View style={S.tripCardBorder} />
                <View style={S.tripCardLeft}>
                  <View style={S.tripIconWrap}>
                    <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={S.tripIconGradient}>
                      <IconSymbol name="airplane" size={18} color="#FFFFFF" />
                    </LinearGradient>
                  </View>
                  <View>
                    <Text style={S.tripDest}>{trip.destination}, {trip.country}</Text>
                    <Text style={S.tripDates}>{trip.startDate} → {trip.endDate}</Text>
                  </View>
                </View>
                <View style={[S.tripStatus, { backgroundColor: trip.status === "active" ? "rgba(16,185,129,0.2)" : "rgba(123,47,190,0.2)" }]}>
                  <Text style={[S.tripStatusText, { color: trip.status === "active" ? "#10B981" : "#C084FC" }]}>
                    {trip.status === "active" ? "Live" : "Upcoming"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── Community Stories ── */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Traveler Stories</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore" as never)} activeOpacity={0.7}>
              <Text style={S.sectionLink}>More</Text>
            </TouchableOpacity>
          </View>
          {TRENDING_STORIES.map((story) => (
            <TouchableOpacity key={story.id} style={S.storyCard} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(255,255,255,0.04)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />
              <View style={S.storyCardBorder} />
              <View style={S.storyAvatar}>
                <LinearGradient colors={story.gradient} style={S.storyAvatarGradient}>
                  <Text style={S.storyAvatarText}>{story.avatar}</Text>
                </LinearGradient>
              </View>
              <View style={{ flex: 1 }}>
                <View style={S.storyHeader}>
                  <Text style={S.storyAuthor}>{story.author}</Text>
                  <View style={S.storyDestPill}>
                    <IconSymbol name="location.fill" size={10} color="#C084FC" />
                    <Text style={S.storyDestText}>{story.dest}</Text>
                  </View>
                </View>
                <Text style={S.storyText}>{story.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width * 1.5, height: width * 1.5, borderRadius: width * 0.75, top: -width * 0.6, left: -width * 0.4, backgroundColor: "rgba(123,47,190,0.12)" },
  orb2: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: height * 0.3, right: -width * 0.4, backgroundColor: "rgba(233,30,140,0.06)" },
  stickyHeader: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 56, paddingBottom: 12 },
  stickyTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", letterSpacing: 2 },
  stickyPoints: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,215,0,0.15)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  stickyPointsText: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  hero: { paddingTop: 60, paddingBottom: 24, overflow: "hidden" },
  heroOrb: { position: "absolute", width: width * 1.2, height: width * 1.2, borderRadius: width * 0.6, top: -width * 0.4, right: -width * 0.3, backgroundColor: "rgba(123,47,190,0.15)" },
  heroContent: { paddingHorizontal: 20, gap: 14 },
  heroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heroGreeting: { color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: "500" },
  heroName: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.5, lineHeight: 34 },
  notifBtn: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  notifGradient: { flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", borderRadius: 22 },
  dnaBadge: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", borderRadius: 20, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  dnaText: { color: "#C084FC", fontSize: 13, fontWeight: "700" },
  pointsCard: { borderRadius: 22, overflow: "hidden", padding: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "rgba(255,215,0,0.15)" },
  pointsLeft: { gap: 2 },
  pointsLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: "700", letterSpacing: 1.5 },
  pointsValue: { color: "#FFD700", fontSize: 30, fontWeight: "900", letterSpacing: -1 },
  pointsSub: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  pointsRight: { alignItems: "center", gap: 6 },
  tierBadge: { borderRadius: 12, overflow: "hidden", paddingHorizontal: 10, paddingVertical: 4 },
  tierText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  activeTripBanner: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(16,185,129,0.3)" },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981" },
  activeTripLabel: { color: "#10B981", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  activeTripDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  activeTripArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(16,185,129,0.2)", alignItems: "center", justifyContent: "center" },
  section: { paddingTop: 24 },
  sectionHeader: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "900", letterSpacing: -0.3 },
  sectionSub: { color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 },
  sectionLink: { color: "#C084FC", fontSize: 14, fontWeight: "700" },
  planCta: { marginHorizontal: 20, borderRadius: 22, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 18 },
  planCtaLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  planCtaIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  planCtaTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  planCtaSub: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 2 },
  planCtaArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  quickRow: { flexDirection: "row", paddingHorizontal: 20, gap: 12 },
  quickAction: { flex: 1, alignItems: "center", gap: 8 },
  quickIcon: { width: 54, height: 54, borderRadius: 18, overflow: "hidden" },
  quickIconGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  quickLabel: { color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: "600", textAlign: "center" },
  alertCard: { width: 160, borderRadius: 18, overflow: "hidden", padding: 14, gap: 6 },
  alertCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, borderWidth: 1, borderColor: "rgba(123,47,190,0.3)" },
  alertTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  alertDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  alertDropBadge: { backgroundColor: "rgba(16,185,129,0.25)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  alertDrop: { color: "#10B981", fontSize: 11, fontWeight: "800" },
  alertFrom: { color: "rgba(255,255,255,0.4)", fontSize: 11 },
  alertPrice: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  alertAction: { flexDirection: "row", alignItems: "center", gap: 5 },
  alertActionText: { color: "rgba(192,132,252,0.7)", fontSize: 12, fontWeight: "600" },
  featCard: { width: width * 0.62, height: 220, borderRadius: 24, overflow: "hidden", justifyContent: "space-between", padding: 14 },
  featOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.2)" },
  featBadge: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  featBadgeDot: { width: 6, height: 6, borderRadius: 3 },
  featBadgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  featBottom: { gap: 2 },
  featCity: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", letterSpacing: -0.5 },
  featCountry: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: "600" },
  featTagline: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 },
  featPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  featPrice: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  featPlanBtn: { borderRadius: 10, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 6 },
  featPlanText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  tripCard: { marginHorizontal: 20, borderRadius: 18, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, marginBottom: 10 },
  tripCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, borderWidth: 1, borderColor: "rgba(123,47,190,0.3)" },
  tripCardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  tripIconWrap: { width: 42, height: 42, borderRadius: 13, overflow: "hidden" },
  tripIconGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  tripDest: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  tripDates: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },
  tripStatus: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  tripStatusText: { fontSize: 12, fontWeight: "700" },
  storyCard: { marginHorizontal: 20, borderRadius: 18, overflow: "hidden", flexDirection: "row", gap: 12, padding: 14, marginBottom: 10 },
  storyCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  storyAvatar: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  storyAvatarGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  storyAvatarText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  storyHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  storyAuthor: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  storyDestPill: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(123,47,190,0.25)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  storyDestText: { color: "#C084FC", fontSize: 11, fontWeight: "600" },
  storyText: { color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 19 },
});
