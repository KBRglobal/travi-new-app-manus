import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore, Trip } from "@/lib/store";
import * as Haptics from "expo-haptics";
import { AgentFAB } from "@/components/agent-fab";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

const { width } = Dimensions.get("window");

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
  Paris: require("@/assets/destinations/paris.jpg"),
  Tokyo: require("@/assets/destinations/tokyo.jpg"),
  Bali: require("@/assets/destinations/bali.jpg"),
  "New York": require("@/assets/destinations/newyork.jpg"),
  Santorini: require("@/assets/destinations/santorini.jpg"),
  Dubai: require("@/assets/destinations/dubai.jpg"),
  Kyoto: require("@/assets/destinations/kyoto.jpg"),
  Barcelona: require("@/assets/destinations/barcelona.jpg"),
  Maldives: require("@/assets/destinations/maldives.jpg"),
  Iceland: require("@/assets/destinations/iceland.jpg"),
  Rome: require("@/assets/destinations/rome.jpg"),
  Amsterdam: require("@/assets/destinations/amsterdam.jpg"),
};

// ── Weather mock data per destination ───────────────────────────────────────
const WEATHER_DATA: Record<string, { temp: number; condition: string; icon: string; humidity: number; wind: number }> = {
  Paris:      { temp: 16, condition: "Partly Cloudy", icon: "⛅", humidity: 72, wind: 18 },
  Tokyo:      { temp: 22, condition: "Sunny",         icon: "☀️", humidity: 60, wind: 12 },
  Bali:       { temp: 30, condition: "Tropical",      icon: "🌤️", humidity: 80, wind: 8  },
  Dubai:      { temp: 38, condition: "Hot & Sunny",   icon: "☀️", humidity: 35, wind: 15 },
  "New York": { temp: 18, condition: "Cloudy",        icon: "🌥️", humidity: 65, wind: 22 },
  Santorini:  { temp: 24, condition: "Clear",         icon: "☀️", humidity: 55, wind: 20 },
  Kyoto:      { temp: 20, condition: "Partly Cloudy", icon: "⛅", humidity: 68, wind: 10 },
  Barcelona:  { temp: 26, condition: "Sunny",         icon: "☀️", humidity: 50, wind: 14 },
  Maldives:   { temp: 31, condition: "Tropical",      icon: "🌤️", humidity: 82, wind: 7  },
  Iceland:    { temp: 4,  condition: "Overcast",      icon: "🌫️", humidity: 85, wind: 35 },
  Rome:       { temp: 23, condition: "Sunny",         icon: "☀️", humidity: 48, wind: 11 },
  Amsterdam:  { temp: 13, condition: "Rainy",         icon: "🌧️", humidity: 78, wind: 25 },
};

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

// ── Weather + Countdown Widget ────────────────────────────────────────────────
function WeatherCountdownWidget({ trip }: { trip: Trip }) {
  const weather = WEATHER_DATA[trip.destination] ?? { temp: 25, condition: "Sunny", icon: "☀️", humidity: 60, wind: 15 };
  const daysUntil = getDaysUntil(trip.startDate);
  const isVerySoon = daysUntil <= 7;

  return (
    <View style={wS.widget}>
      <LinearGradient
        colors={isVerySoon ? ["rgba(249,68,152,0.2)", "rgba(100,67,244,0.15)"] : ["rgba(100,67,244,0.15)", "rgba(14,165,233,0.1)"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={wS.widgetHeader}>
        <Text style={wS.widgetTitle}>✈️ {trip.destination}</Text>
        {isVerySoon && (
          <View style={wS.soonBadge}>
            <Text style={wS.soonBadgeText}>🔥 Very soon!</Text>
          </View>
        )}
      </View>
      <View style={wS.widgetBody}>
        {/* Countdown */}
        <View style={wS.countdownBlock}>
          <Text style={[wS.countdownNumber, isVerySoon && { color: "#F94498" }]}>{daysUntil}</Text>
          <Text style={wS.countdownLabel}>days to go</Text>
          <Text style={wS.countdownDate}>{trip.startDate}</Text>
        </View>
        {/* Divider */}
        <View style={wS.divider} />
        {/* Weather */}
        <View style={wS.weatherBlock}>
          <Text style={wS.weatherIcon}>{weather.icon}</Text>
          <Text style={wS.weatherTemp}>{weather.temp}°C</Text>
          <Text style={wS.weatherCondition}>{weather.condition}</Text>
          <View style={wS.weatherMeta}>
            <Text style={wS.weatherMetaText}>💧 {weather.humidity}%</Text>
            <Text style={wS.weatherMetaText}>💨 {weather.wind}km/h</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={wS.widgetCta}
        onPress={() => router.push({ pathname: "/(trip)/trip-companions", params: { destination: trip.destination, totalCost: String(trip.totalCost) } } as never)}
        activeOpacity={0.8}
      >
        <Text style={wS.widgetCtaText}>👥 Invite companions →</Text>
      </TouchableOpacity>
    </View>
  );
}

const wS = StyleSheet.create({
  widget: { borderRadius: 20, overflow: "hidden", padding: 16, gap: 12, borderWidth: 1.5, borderColor: "rgba(100,67,244,0.3)", marginBottom: 4 },
  widgetHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  widgetTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  soonBadge: { backgroundColor: "rgba(249,68,152,0.25)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(249,68,152,0.5)" },
  soonBadgeText: { color: "#F94498", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  widgetBody: { flexDirection: "row", alignItems: "center", gap: 16 },
  countdownBlock: { flex: 1, alignItems: "center", gap: 2 },
  countdownNumber: { color: "#6443F4", fontSize: 48, fontWeight: "900", fontFamily: "Chillax-Bold", lineHeight: 52 },
  countdownLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  countdownDate: { color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 2 },
  divider: { width: 1, height: 80, backgroundColor: "rgba(255,255,255,0.55)" },
  weatherBlock: { flex: 1, alignItems: "center", gap: 2 },
  weatherIcon: { fontSize: 32 },
  weatherTemp: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  weatherCondition: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  weatherMeta: { flexDirection: "row", gap: 8, marginTop: 4 },
  weatherMetaText: { color: "rgba(255,255,255,0.55)", fontSize: 10 },
  widgetCta: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 12, paddingVertical: 8, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  widgetCtaText: { color: "rgba(192,132,252,0.8)", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Bold" },
});

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", color: "#2196F3", bg: "rgba(33,150,243,0.15)" },
  active: { label: "Live Now", color: "#4CAF50", bg: "rgba(76,175,80,0.15)" },
  completed: { label: "Completed", color: "#8B7AAA", bg: "rgba(139,122,170,0.15)" },
  draft: { label: "Draft", color: "#FF9800", bg: "rgba(255,152,0,0.15)" },
};

function TripCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  const photoSource = DEST_PHOTOS[trip.destination] || require("@/assets/destinations/paris.jpg");
  const status = STATUS_CONFIG[trip.status];

  return (
    <TouchableOpacity style={styles.tripCard} onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress(); }} activeOpacity={0.88}>
      <View style={styles.tripCardInner}>
        {/* Full photo background */}
        <Image source={photoSource} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        {/* Dark gradient overlay */}
        <LinearGradient colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.65)"]} style={StyleSheet.absoluteFillObject} />

        {/* Main info */}
        <View style={styles.tripInfo}>
          <View style={styles.tripTopRow}>
            <View>
              <Text style={styles.tripDest}>{trip.destination}</Text>
              <Text style={styles.tripCountry}>{trip.country}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.bg, borderColor: status.color + "66" }]}>
              {trip.status === "active" && <View style={[styles.statusDot, { backgroundColor: status.color }]} />}
              <Text style={[styles.statusText, { color: status.color }]}>{trip.status === "active" ? "Live Now" : status.label}</Text>
            </View>
          </View>

          <View style={styles.tripMetaRow}>
            <View style={styles.tripMetaItem}>
              <IconSymbol name="calendar" size={11} color="#5A4D72" />
              <Text style={styles.tripMetaText}>{trip.startDate}</Text>
            </View>
            <Text style={styles.tripMetaDot}>·</Text>
            <View style={styles.tripMetaItem}>
              <IconSymbol name="person.2.fill" size={11} color="#5A4D72" />
              <Text style={styles.tripMetaText}>{trip.travelers} travelers</Text>
            </View>
          </View>

          <View style={styles.tripFooter}>
            <Text style={styles.tripCost}>${trip.totalCost.toLocaleString()}</Text>
            <View style={styles.tripPointsBadge}>
              <IconSymbol name="sparkles" size={12} color="#FBBF24" />
              <Text style={styles.tripPointsText}>{trip.pointsEarned.toLocaleString()} pts</Text>
            </View>
          </View>
        </View>

        {/* Action button */}
        {(trip.status === "upcoming" || trip.status === "active") ? (
          <TouchableOpacity
            style={styles.liveBtn}
            onPress={() => router.push({ pathname: "/(live)/home" as never, params: { tripId: trip.id } })}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.liveBtnGradient}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBtnText}>Live</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.viewBtn} activeOpacity={0.7}>
            <IconSymbol name="chevron.right" size={18} color="#5A4D72" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Convert a DB trip row to the local Trip type used by TripCard
type DbTrip = { id: number; destination: string; country: string | null; startDate: string | null; endDate: string | null; status: string; budget: number | null; currency: string | null };
function dbTripToLocal(t: DbTrip): Trip {
  const statusMap: Record<string, Trip["status"]> = { planning: "draft", booked: "upcoming", active: "active", completed: "completed" };
  return {
    id: String(t.id),
    destination: t.destination,
    country: t.country ?? "",
    startDate: t.startDate ?? "",
    endDate: t.endDate ?? "",
    travelers: 1,
    budget: "mid-range",
    status: statusMap[t.status] ?? "draft",
    interests: [],
    landmarks: [],
    itinerary: [],
    totalCost: t.budget ?? 0,
    pointsEarned: Math.round((t.budget ?? 0) * 0.05),
  };
}

export default function TripsScreen() {
  const { state } = useStore();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  // ── Real DB data via tRPC ────────────────────────────────────────────────────
  const { data: dbTripsRaw } = trpc.trips.list.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
  const dbTrips = useMemo(() => (dbTripsRaw ?? []).map((t: DbTrip) => dbTripToLocal(t)), [dbTripsRaw]);

  // Use DB trips if available, fall back to store trips, then mock trips
  const allTrips = dbTrips.length > 0 ? dbTrips : state.trips.length > 0 ? state.trips : MOCK_TRIPS;
  const filtered = filter === "all" ? allTrips : allTrips.filter((t: Trip) => {
    if (filter === "upcoming") return t.status === "upcoming" || t.status === "active" || t.status === "draft";
    return t.status === "completed";
  });
  const upcomingCount = allTrips.filter((t: Trip) => t.status === "upcoming" || t.status === "active").length;
  const completedCount = allTrips.filter((t: Trip) => t.status === "completed").length;
  const totalPoints = allTrips.reduce((sum: number, t: Trip) => sum + (t.pointsEarned || 0), 0);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>My Trips</Text>
                <Text style={styles.headerSub}>Your travel collection</Text>
              </View>
              <TouchableOpacity style={styles.newTripBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.newTripGradient}>
                  <IconSymbol name="plus" size={16} color="#FFFFFF" />
                  <Text style={styles.newTripText}>New Trip</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.statsCard}>
              <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.2)"]} style={styles.statsGradient}>
                {[
                  { value: String(upcomingCount), label: "Upcoming", color: "#2196F3" },
                  { value: String(completedCount), label: "Completed", color: "#8B7AAA" },
                  { value: totalPoints.toLocaleString(), label: "Points Earned", color: "#FBBF24" },
                ].map((stat, i) => (
                  <View key={i} style={styles.statItem}>
                    {i > 0 && <View style={styles.statDivider} />}
                    <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </LinearGradient>
            </View>

            {/* Weather + Countdown for next upcoming trip */}
            {(() => {
              const nextTrip = allTrips.find((t: Trip) => t.status === "upcoming" || t.status === "active");
              return nextTrip ? <WeatherCountdownWidget trip={nextTrip} /> : null;
            })()}

            {/* Filter Tabs */}
            <View style={styles.filterRow}>
              {(["all", "upcoming", "completed"] as const).map((f) => (
                <TouchableOpacity key={f} style={[styles.filterTab, filter === f && styles.filterTabActive]} onPress={() => setFilter(f)} activeOpacity={0.8}>
                  {filter === f && <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.3)"]} style={StyleSheet.absoluteFillObject} />}
                  <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>
                    {f === "all" ? "All" : f === "upcoming" ? "Upcoming" : "Past"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() => {
              if (item.status === "active") {
                router.push({ pathname: "/(live)/home" as never, params: { tripId: item.id } });
              } else {
                router.push({ pathname: "/(tabs)/trip-detail" as never, params: { destination: item.destination?.toLowerCase() ?? "dubai", tripName: `My ${item.destination} Trip` } });
              }
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}><IconSymbol name="airplane" size={40} color="#6443F4" /></View>
            <Text style={styles.emptyTitle}>No trips yet</Text>
            <Text style={styles.emptySub}>Plan your first adventure with TRAVI</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emptyBtnGradient}>
                <Text style={styles.emptyBtnText}>Plan a Trip</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }
      />
      <AgentFAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  listContent: { paddingHorizontal: 20, paddingTop: 0, paddingBottom: 130, gap: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "#5A4D72", fontSize: 13, marginTop: 2 },
  newTripBtn: { borderRadius: 14, overflow: "hidden" },
  newTripGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, gap: 6 },
  newTripText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  statsCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  statsGradient: { flexDirection: "row", padding: 18 },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statDivider: { position: "absolute", width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.55)" },
  statValue: { fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  statLabel: { color: "#5A4D72", fontSize: 11 },
  filterRow: { flexDirection: "row", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", backgroundColor: "rgba(255,255,255,0.55)" },
  filterTab: { flex: 1, paddingVertical: 13, alignItems: "center", overflow: "hidden" },
  filterTabActive: {},
  filterTabText: { color: "#5A4D72", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  filterTabTextActive: { color: "#FFFFFF" },
  tripCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  tripCardInner: { flexDirection: "row", alignItems: "center", padding: 16, gap: 14, overflow: "hidden", minHeight: 100 },
  accentBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: 2 },
  tripEmojiWrap: { width: 52, height: 52, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  tripEmoji: { fontSize: 28 },
  tripInfo: { flex: 1, gap: 6 },
  tripTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  tripDest: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", fontFamily: "Chillax-Bold", textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  tripCountry: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 1 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: "rgba(0,0,0,0.4)" },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "700" },
  tripMetaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  tripMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  tripMetaText: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  tripMetaDot: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  tripFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  tripCost: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold", textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  tripPointsBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,215,0,0.15)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  tripPointsStar: { color: "#FBBF24", fontSize: 10 },
  tripPointsText: { color: "#FBBF24", fontSize: 11, fontWeight: "700" },
  liveBtn: { borderRadius: 12, overflow: "hidden" },
  liveBtnGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, gap: 5 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF" },
  liveBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  viewBtn: { padding: 8 },
  emptyState: { alignItems: "center", paddingVertical: 80, gap: 12 },
  emptyIconWrap: { width: 80, height: 80, borderRadius: 24, backgroundColor: "rgba(123,47,190,0.2)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  emptySub: { color: "#5A4D72", fontSize: 14, textAlign: "center", fontFamily: "Satoshi-Regular" },
  emptyBtn: { borderRadius: 16, overflow: "hidden", marginTop: 8 },
  emptyBtnGradient: { paddingHorizontal: 32, paddingVertical: 14 },
  emptyBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
});
