import { useRef, useState, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Animated, Platform, FlatList, StatusBar
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

// ─── Local destination photos (bundled assets) ───────────────────────────────
const IMG = {
  kyoto: require("@/assets/destinations/kyoto.jpg"),
  santorini: require("@/assets/destinations/santorini.jpg"),
  tokyo: require("@/assets/destinations/tokyo.jpg"),
  bali: require("@/assets/destinations/bali.jpg"),
  barcelona: require("@/assets/destinations/barcelona.jpg"),
  paris: require("@/assets/destinations/paris.jpg"),
  amsterdam: require("@/assets/destinations/amsterdam.jpg"),
  maldives: require("@/assets/destinations/maldives.jpg"),
  rome: require("@/assets/destinations/rome.jpg"),
  iceland: require("@/assets/destinations/iceland.jpg"),
  dubai: require("@/assets/destinations/dubai.jpg"),
  machupicchu: require("@/assets/destinations/machupicchu.jpg"),
  phuket: require("@/assets/destinations/phuket.jpg"),
  patagonia: require("@/assets/destinations/patagonia.jpg"),
  newyork: require("@/assets/destinations/newyork.jpg"),
};

const FEATURED_DESTINATIONS = [
  { id: "1", city: "Kyoto", country: "Japan", tagline: "Cherry blossoms & ancient temples", image: IMG.kyoto, price: "From $1,240", badge: "DNA Match", badgeColor: "#F94498" },
  { id: "2", city: "Santorini", country: "Greece", tagline: "Sunsets that stop time", image: IMG.santorini, price: "From $980", badge: "Trending", badgeColor: "#F59E0B" },
  { id: "3", city: "Tokyo", country: "Japan", tagline: "Where neon meets tradition", image: IMG.tokyo, price: "From $1,450", badge: "Popular", badgeColor: "#6443F4" },
  { id: "4", city: "Bali", country: "Indonesia", tagline: "Find your inner peace", image: IMG.bali, price: "From $760", badge: "Best Value", badgeColor: "#02A65C" },
  { id: "5", city: "Barcelona", country: "Spain", tagline: "Art, food and endless sun", image: IMG.barcelona, price: "From $620", badge: "Hot Deal", badgeColor: "#EF4444" },
];

const QUICK_ACTIONS = [
  { id: "flights", label: "Flights", iconName: "airplane", colors: ["#6443F4", "#6443F4"] as [string, string] },
  { id: "hotels", label: "Hotels", iconName: "bed.double.fill", colors: ["#6443F4", "#9077EF"] as [string, string] },
  { id: "connecting", label: "Connecting", iconName: "person.2.fill", colors: ["#F94498", "#F94498"] as [string, string] },
  { id: "alerts", label: "Price Alert", iconName: "bell.fill", colors: ["#02A65C", "#02A65C"] as [string, string] },
];

const PRICE_ALERTS = [
  { id: "1", dest: "Barcelona", from: "TLV", price: "$420", drop: "-23%", image: IMG.barcelona },
  { id: "2", dest: "Amsterdam", from: "TLV", price: "$380", drop: "-18%", image: IMG.amsterdam },
  { id: "3", dest: "Paris", from: "TLV", price: "$510", drop: "-12%", image: IMG.paris },
];

const TRENDING_STORIES = [
  { id: "1", author: "Maya R.", dest: "Lisbon", text: "The most underrated city in Europe. Pastéis de nata changed my life.", avatar: "M", gradient: ["#C2410C", "#EA580C"] as [string, string] },
  { id: "2", author: "James K.", dest: "Kyoto", text: "Woke up at 5am to see Fushimi Inari alone. Worth every second.", avatar: "J", gradient: ["#6443F4", "#6443F4"] as [string, string] },
  { id: "3", author: "Sara L.", dest: "Bali", text: "Ubud rice terraces at sunrise. No words. Just go.", avatar: "S", gradient: ["#02A65C", "#02A65C"] as [string, string] },
];

export default function HomeScreen() {
  const { state } = useStore();
  const scrollY = useRef(new Animated.Value(0)).current;

  const profile = state.profile;
  const trips = state.trips;
  const activeTrip = state.activeTrip;
  const points = profile?.points || 0;
  const dnaType = profile?.travelerDNA?.type || "Explorer";
  const firstName = profile?.name?.split(" ")[0] || "Traveler";

  const headerOpacity = scrollY.interpolate({ inputRange: [0, 80], outputRange: [0, 1], extrapolate: "clamp" });

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
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Sticky mini-header */}
      <Animated.View style={[S.stickyHeader, { opacity: headerOpacity }]}>
        <LinearGradient colors={["rgba(4,0,16,0.97)", "rgba(13,5,32,0.95)"]} style={StyleSheet.absoluteFillObject} />
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
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Hero Header ── */}
        <View style={S.hero}>
          <LinearGradient colors={["#0D0628", "#1A0A3D", "#2D0A5C"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.heroOrb} />
          <View style={S.heroContent}>
            <View style={S.heroTop}>
              <View>
                <Text style={S.heroGreeting}>Good morning,</Text>
                <Text style={S.heroName}>{firstName}</Text>
              </View>
              <TouchableOpacity style={S.notifBtn} onPress={() => router.push("/(tabs)/notifications" as never)} activeOpacity={0.8}>
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
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
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
                  <IconSymbol name="chevron.right" size={16} color="#02A65C" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── Plan New Trip CTA ── */}
        <View style={S.section}>
          <TouchableOpacity style={S.planCta} onPress={handlePlan} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
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
                  if (action.id === "alerts") router.push("/(tabs)/alerts" as never);
                  else if (action.id === "connecting") router.push("/(tabs)/connecting" as never);
                  else router.push("/(trip)/plan" as never);
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

        {/* ── Price Alerts with Photos ── */}
        <View style={S.section}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Price Alerts</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(tabs)/alerts" as never)}>
              <Text style={S.sectionLink}>Set alert</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}>
            {PRICE_ALERTS.map((alert) => (
              <TouchableOpacity key={alert.id} style={S.alertCard} activeOpacity={0.88}
                onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}>
                {/* Background photo */}
                <Image source={{ uri: alert.image }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                {/* Dark overlay gradient */}
                <LinearGradient colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.75)"]} style={StyleSheet.absoluteFillObject} />
                <View style={S.alertTop}>
                  <Text style={S.alertDest}>{alert.dest}</Text>
                  <View style={S.alertDropBadge}>
                    <Text style={S.alertDrop}>{alert.drop}</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }} />
                <Text style={S.alertFrom}>{alert.from} → {alert.dest}</Text>
                <Text style={S.alertPrice}>{alert.price}</Text>
                <View style={S.alertAction}>
                  <IconSymbol name="airplane" size={13} color="rgba(255,255,255,0.8)" />
                  <Text style={S.alertActionText}>Book now</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Picked for You — Full Photo Cards ── */}
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
                activeOpacity={0.9}
              >
                {/* Full-bleed destination photo */}
                <Image source={{ uri: item.image }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                {/* Cinematic gradient overlay — bottom heavy */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.85)"]}
                  locations={[0, 0.4, 1]}
                  style={StyleSheet.absoluteFillObject}
                />
                {/* Badge top-left */}
                <View style={S.featBadge}>
                  <View style={[S.featBadgeDot, { backgroundColor: item.badgeColor }]} />
                  <Text style={S.featBadgeText}>{item.badge}</Text>
                </View>
                {/* Content bottom */}
                <View style={S.featBottom}>
                  <Text style={S.featCity}>{item.city}</Text>
                  <Text style={S.featCountry}>{item.country}</Text>
                  <Text style={S.featTagline} numberOfLines={1}>{item.tagline}</Text>
                  <View style={S.featPriceRow}>
                    <Text style={S.featPrice}>{item.price}</Text>
                    <View style={S.featPlanBtn}>
                      <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
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
                    <LinearGradient colors={["#6443F4", "#F94498"]} style={S.tripIconGradient}>
                      <IconSymbol name="airplane" size={18} color="#FFFFFF" />
                    </LinearGradient>
                  </View>
                  <View>
                    <Text style={S.tripDest}>{trip.destination}, {trip.country}</Text>
                    <Text style={S.tripDates}>{trip.startDate} → {trip.endDate}</Text>
                  </View>
                </View>
                <View style={[S.tripStatus, { backgroundColor: trip.status === "active" ? "rgba(16,185,129,0.2)" : "rgba(123,47,190,0.2)" }]}>
                  <Text style={[S.tripStatusText, { color: trip.status === "active" ? "#02A65C" : "#C084FC" }]}>
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
  container: { flex: 1, backgroundColor: "#0D0628" },
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
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#02A65C" },
  activeTripLabel: { color: "#02A65C", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
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
  quickIcon: { width: 58, height: 58, borderRadius: 20, overflow: "hidden" },
  quickIconGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  quickLabel: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "600", textAlign: "center" },
  // Alert cards — now with photos
  alertCard: { width: 170, height: 200, borderRadius: 20, overflow: "hidden", padding: 14, justifyContent: "flex-end" },
  alertTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 12, left: 12, right: 12 },
  alertDest: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  alertDropBadge: { backgroundColor: "rgba(16,185,129,0.9)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  alertDrop: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  alertFrom: { color: "rgba(255,255,255,0.7)", fontSize: 11, marginBottom: 2 },
  alertPrice: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
  alertAction: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 6 },
  alertActionText: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "700" },
  // Featured destination cards — full photo
  featCard: { width: width * 0.65, height: 240, borderRadius: 24, overflow: "hidden", justifyContent: "space-between", padding: 14 },
  featBadge: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  featBadgeDot: { width: 6, height: 6, borderRadius: 3 },
  featBadgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  featBottom: { gap: 2 },
  featCity: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", letterSpacing: -0.5, textShadowColor: "rgba(0,0,0,0.4)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  featCountry: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600" },
  featTagline: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 },
  featPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  featPrice: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  featPlanBtn: { borderRadius: 10, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7 },
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
  storyAvatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  storyAvatarGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  storyAvatarText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  storyHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  storyAuthor: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  storyDestPill: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(123,47,190,0.25)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  storyDestText: { color: "#C084FC", fontSize: 11, fontWeight: "600" },
  storyText: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 19 },
});
