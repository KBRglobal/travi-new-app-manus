/**
 * TRAVI — My Trips Screen (Redesigned)
 * Apple Wallet–inspired layout: large hero next-trip card, clean stats, stacked trip cards
 */

import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Platform, ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore, Trip } from "@/lib/store";
import * as Haptics from "expo-haptics";
import { AgentFAB } from "@/components/agent-fab";

const { width } = Dimensions.get("window");

// ── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_TRIPS: Trip[] = [
  {
    id: "mock1", destination: "Paris", destinationCode: "CDG", country: "France",
    startDate: "Apr 15, 2026", endDate: "Apr 22, 2026", travelers: 2, budget: "luxury",
    status: "upcoming", interests: ["culture", "food", "art"], landmarks: ["Eiffel Tower", "Louvre"],
    flight: { id: "f1", airline: "Air France", from: "TLV", to: "CDG", departure: "08:00", arrival: "11:30", duration: "4h 30m", price: 680, class: "Business", stops: 0 },
    hotel: { id: "h1", name: "Le Bristol Paris", stars: 5, location: "8th Arrondissement", pricePerNight: 420, totalPrice: 2940, amenities: ["Pool", "Spa", "Michelin Restaurant"], rating: 9.4 },
    itinerary: [], totalCost: 4850, pointsEarned: 2425,
  },
  {
    id: "mock2", destination: "Tokyo", destinationCode: "NRT", country: "Japan",
    startDate: "Jun 1, 2026", endDate: "Jun 10, 2026", travelers: 1, budget: "mid-range",
    status: "upcoming", interests: ["culture", "food", "technology"], landmarks: ["Shibuya Crossing", "Mount Fuji"],
    itinerary: [], totalCost: 3200, pointsEarned: 1600,
  },
  {
    id: "mock3", destination: "Bali", destinationCode: "DPS", country: "Indonesia",
    startDate: "Jan 10, 2026", endDate: "Jan 17, 2026", travelers: 2, budget: "mid-range",
    status: "completed", interests: ["beach", "wellness", "food"], landmarks: ["Uluwatu Temple", "Tegallalang Rice Terraces"],
    itinerary: [], totalCost: 2100, pointsEarned: 1050,
  },
];

const DEST_PHOTOS: Record<string, ReturnType<typeof require>> = {
  Paris:     require("@/assets/destinations/paris.jpg"),
  Tokyo:     require("@/assets/destinations/tokyo.jpg"),
  Bali:      require("@/assets/destinations/bali.jpg"),
  "New York":require("@/assets/destinations/newyork.jpg"),
  Santorini: require("@/assets/destinations/santorini.jpg"),
  Dubai:     require("@/assets/destinations/dubai.jpg"),
  Kyoto:     require("@/assets/destinations/kyoto.jpg"),
  Barcelona: require("@/assets/destinations/barcelona.jpg"),
  Maldives:  require("@/assets/destinations/maldives.jpg"),
  Iceland:   require("@/assets/destinations/iceland.jpg"),
  Rome:      require("@/assets/destinations/rome.jpg"),
  Amsterdam: require("@/assets/destinations/amsterdam.jpg"),
};

const WEATHER: Record<string, { temp: number; condition: string; icon: string }> = {
  Paris:     { temp: 16, condition: "Partly Cloudy", icon: "⛅" },
  Tokyo:     { temp: 22, condition: "Sunny",         icon: "☀️" },
  Bali:      { temp: 30, condition: "Tropical",      icon: "🌤️" },
  Dubai:     { temp: 38, condition: "Hot & Sunny",   icon: "☀️" },
  "New York":{ temp: 18, condition: "Cloudy",        icon: "🌥️" },
  Santorini: { temp: 24, condition: "Clear",         icon: "☀️" },
  Kyoto:     { temp: 20, condition: "Partly Cloudy", icon: "⛅" },
  Barcelona: { temp: 26, condition: "Sunny",         icon: "☀️" },
  Maldives:  { temp: 31, condition: "Tropical",      icon: "🌤️" },
  Iceland:   { temp: 4,  condition: "Overcast",      icon: "🌫️" },
  Rome:      { temp: 23, condition: "Sunny",         icon: "☀️" },
  Amsterdam: { temp: 13, condition: "Rainy",         icon: "🌧️" },
};

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

const STATUS_CONFIG = {
  upcoming:  { label: "Upcoming",  color: "#60A5FA", bg: "rgba(96,165,250,0.15)"  },
  active:    { label: "Live",      color: "#4ADE80", bg: "rgba(74,222,128,0.15)"  },
  completed: { label: "Completed", color: "#A78BFA", bg: "rgba(167,139,250,0.15)" },
  draft:     { label: "Draft",     color: "#FBBF24", bg: "rgba(251,191,36,0.15)"  },
};

// ── Next Trip Hero Card ───────────────────────────────────────────────────────
function NextTripHero({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  const photo = DEST_PHOTOS[trip.destination] || require("@/assets/destinations/paris.jpg");
  const weather = WEATHER[trip.destination] ?? { temp: 25, condition: "Sunny", icon: "☀️" };
  const days = getDaysUntil(trip.startDate);
  const isVerySoon = days <= 7;

  return (
    <TouchableOpacity style={S.heroCard} onPress={onPress} activeOpacity={0.92}>
      <ImageBackground source={photo} style={S.heroCardBg} imageStyle={S.heroCardImg} resizeMode="cover">
        {/* Gradient overlays */}
        <LinearGradient
          colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.0)", "rgba(0,0,0,0.82)"]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={isVerySoon ? ["rgba(249,68,152,0.25)", "transparent"] : ["rgba(100,67,244,0.2)", "transparent"]}
          locations={[0, 0.5]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Top row: label + weather */}
        <View style={S.heroTop}>
          <View style={S.nextTripLabel}>
            <View style={[S.nextTripDot, { backgroundColor: isVerySoon ? "#F94498" : "#6443F4" }]} />
            <Text style={S.nextTripLabelText}>NEXT TRIP</Text>
          </View>
          <View style={S.weatherPill}>
            <Text style={S.weatherIcon}>{weather.icon}</Text>
            <Text style={S.weatherTemp}>{weather.temp}°C</Text>
          </View>
        </View>

        {/* Bottom: destination + countdown */}
        <View style={S.heroBottom}>
          <View style={S.heroBottomLeft}>
            <Text style={S.heroCity}>{trip.destination}</Text>
            <View style={S.heroMeta}>
              <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.6)" />
              <Text style={S.heroCountry}>{trip.country}</Text>
              <Text style={S.heroMetaDot}>·</Text>
              <IconSymbol name="person.2.fill" size={12} color="rgba(255,255,255,0.6)" />
              <Text style={S.heroCountry}>{trip.travelers} travelers</Text>
            </View>
            <Text style={S.heroDate}>{trip.startDate} → {trip.endDate}</Text>
          </View>
          <View style={S.heroCountdown}>
            <Text style={[S.heroCountdownNum, isVerySoon && { color: "#F94498" }]}>{days}</Text>
            <Text style={S.heroCountdownLabel}>days</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

// ── Trip Card ─────────────────────────────────────────────────────────────────
function TripCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  const photo = DEST_PHOTOS[trip.destination] || require("@/assets/destinations/paris.jpg");
  const status = STATUS_CONFIG[trip.status];

  return (
    <TouchableOpacity
      style={S.tripCard}
      onPress={() => {
        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      activeOpacity={0.88}
    >
      <ImageBackground source={photo} style={S.tripCardBg} imageStyle={S.tripCardImg} resizeMode="cover">
        <LinearGradient
          colors={["rgba(0,0,0,0.08)", "rgba(0,0,0,0.72)"]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Status badge */}
        <View style={[S.statusBadge, { backgroundColor: status.bg, borderColor: status.color + "55" }]}>
          {trip.status === "active" && <View style={[S.statusDot, { backgroundColor: status.color }]} />}
          <Text style={[S.statusText, { color: status.color }]}>{status.label}</Text>
        </View>

        {/* Info */}
        <View style={S.tripCardInfo}>
          <View style={S.tripCardTop}>
            <View>
              <Text style={S.tripCardCity}>{trip.destination}</Text>
              <Text style={S.tripCardCountry}>{trip.country}</Text>
            </View>
            <View style={S.tripCardRight}>
              <Text style={S.tripCardCost}>${trip.totalCost.toLocaleString()}</Text>
              <View style={S.pointsBadge}>
                <Text style={S.pointsText}>{trip.pointsEarned.toLocaleString()} pts</Text>
              </View>
            </View>
          </View>
          <View style={S.tripCardMeta}>
            <IconSymbol name="calendar" size={11} color="rgba(255,255,255,0.45)" />
            <Text style={S.tripCardMetaText}>{trip.startDate}</Text>
            <Text style={S.tripCardMetaDot}>·</Text>
            <IconSymbol name="person.2.fill" size={11} color="rgba(255,255,255,0.45)" />
            <Text style={S.tripCardMetaText}>{trip.travelers} travelers</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function TripsScreen() {
  const { state } = useStore();
  const [activeFilter, setActiveFilter] = useState<"all" | "upcoming" | "past">("all");

  const allTrips = state.trips.length > 0 ? state.trips : MOCK_TRIPS;
  const upcoming = allTrips.filter((t) => t.status === "upcoming" || t.status === "active");
  const past = allTrips.filter((t) => t.status === "completed");
  const nextTrip = upcoming[0];

  const filtered = activeFilter === "all" ? allTrips
    : activeFilter === "upcoming" ? upcoming
    : past;

  const stats = {
    upcoming: upcoming.length,
    completed: past.length,
    points: allTrips.reduce((s, t) => s + (t.pointsEarned ?? 0), 0),
  };

  const goToTrip = (trip: Trip) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/(trip)/trip-detail", params: { id: trip.id } } as never);
  };

  return (
    <View style={S.container}>
      <LinearGradient
        colors={["#0D0820", "#1A0D3D", "#0D0820"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={S.safeArea} edges={["top", "left", "right"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.scrollContent}>

          {/* ── Header ── */}
          <View style={S.header}>
            <View>
              <Text style={S.headerTitle}>My Trips</Text>
              <Text style={S.headerSub}>Your travel collection</Text>
            </View>
            <TouchableOpacity
              style={S.newTripBtn}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push("/(trip)/new-trip" as never);
              }}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <IconSymbol name="plus" size={16} color="#FFFFFF" />
              <Text style={S.newTripBtnText}>New Trip</Text>
            </TouchableOpacity>
          </View>

          {/* ── Stats Row ── */}
          <View style={S.statsRow}>
            <View style={S.statItem}>
              <Text style={S.statNum}>{stats.upcoming}</Text>
              <Text style={S.statLabel}>Upcoming</Text>
            </View>
            <View style={S.statDivider} />
            <View style={S.statItem}>
              <Text style={S.statNum}>{stats.completed}</Text>
              <Text style={S.statLabel}>Completed</Text>
            </View>
            <View style={S.statDivider} />
            <View style={S.statItem}>
              <Text style={[S.statNum, { color: "#FBBF24" }]}>{stats.points.toLocaleString()}</Text>
              <Text style={S.statLabel}>Points</Text>
            </View>
          </View>

          {/* ── Next Trip Hero ── */}
          {nextTrip && (
            <>
              <Text style={S.sectionLabel}>NEXT ADVENTURE</Text>
              <NextTripHero trip={nextTrip} onPress={() => goToTrip(nextTrip)} />
            </>
          )}

          {/* ── Filter Tabs ── */}
          <View style={S.filterRow}>
            {(["all", "upcoming", "past"] as const).map((f) => (
              <TouchableOpacity
                key={f}
                style={[S.filterTab, activeFilter === f && S.filterTabActive]}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setActiveFilter(f);
                }}
                activeOpacity={0.75}
              >
                {activeFilter === f && (
                  <LinearGradient
                    colors={["#6443F4", "#F94498"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
                <Text style={[S.filterTabText, activeFilter === f && S.filterTabTextActive]}>
                  {f === "all" ? "All" : f === "upcoming" ? "Upcoming" : "Past"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Trip Cards ── */}
          {filtered.map((trip) => (
            <TripCard key={trip.id} trip={trip} onPress={() => goToTrip(trip)} />
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <View style={S.emptyState}>
              <Text style={S.emptyIcon}>✈️</Text>
              <Text style={S.emptyTitle}>No trips yet</Text>
              <Text style={S.emptyText}>Start planning your next adventure</Text>
              <TouchableOpacity
                style={S.emptyBtn}
                onPress={() => router.push("/(trip)/new-trip" as never)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#6443F4", "#F94498"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <Text style={S.emptyBtnText}>Plan a Trip</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
      <AgentFAB />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0820" },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
    fontFamily: "Chillax-Bold",
  },
  headerSub: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },
  newTripBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 24,
    overflow: "hidden",
  },
  newTripBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statNum: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontFamily: "Chillax-Bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Satoshi-Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  // Section label
  sectionLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    fontFamily: "Chillax-Bold",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  // Hero card
  heroCard: {
    marginHorizontal: 20,
    height: 240,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 28,
  },
  heroCardBg: { flex: 1, justifyContent: "space-between", padding: 20 },
  heroCardImg: { borderRadius: 28 },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextTripLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  nextTripDot: { width: 7, height: 7, borderRadius: 4 },
  nextTripLabelText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontFamily: "Chillax-Bold",
  },
  weatherPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  weatherIcon: { fontSize: 16 },
  weatherTemp: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },

  heroBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  heroBottomLeft: { gap: 4 },
  heroCity: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1.5,
    lineHeight: 42,
    fontFamily: "Chillax-Bold",
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  heroCountry: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Satoshi-Medium",
  },
  heroMetaDot: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 12,
  },
  heroDate: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    marginTop: 2,
  },
  heroCountdown: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  heroCountdownNum: {
    color: "#6443F4",
    fontSize: 36,
    fontWeight: "900",
    fontFamily: "Chillax-Bold",
    lineHeight: 38,
  },
  heroCountdownLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Satoshi-Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Filter tabs
  filterRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    overflow: "hidden",
  },
  filterTabActive: {},
  filterTabText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Chillax-Semibold",
  },
  filterTabTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  // Trip card
  tripCard: {
    marginHorizontal: 20,
    height: 160,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 14,
  },
  tripCardBg: { flex: 1, justifyContent: "space-between", padding: 16 },
  tripCardImg: { borderRadius: 22 },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
    letterSpacing: 0.5,
  },

  tripCardInfo: { gap: 6 },
  tripCardTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  tripCardCity: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontFamily: "Chillax-Bold",
    lineHeight: 28,
  },
  tripCardCountry: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
  tripCardRight: { alignItems: "flex-end", gap: 4 },
  tripCardCost: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Chillax-Bold",
  },
  pointsBadge: {
    backgroundColor: "rgba(251,191,36,0.15)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
  },
  pointsText: {
    color: "#FBBF24",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },
  tripCardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  tripCardMetaText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontFamily: "Satoshi-Regular",
  },
  tripCardMetaDot: {
    color: "rgba(255,255,255,0.25)",
    fontSize: 11,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: { fontSize: 48 },
  emptyTitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Chillax-Bold",
  },
  emptyText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
    lineHeight: 20,
  },
  emptyBtn: {
    marginTop: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
    overflow: "hidden",
  },
  emptyBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: "Chillax-Bold",
  },
});
