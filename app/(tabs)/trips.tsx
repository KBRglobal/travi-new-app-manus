import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Platform } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore, Trip } from "@/lib/store";
import * as Haptics from "expo-haptics";

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
        <Image source={photoSource} style={StyleSheet.absoluteFillObject} contentFit="cover" />
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
              <IconSymbol name="sparkles" size={12} color="#FFD700" />
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
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.liveBtnGradient}>
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

export default function TripsScreen() {
  const { state } = useStore();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const allTrips = state.trips.length > 0 ? state.trips : MOCK_TRIPS;
  const filtered = filter === "all" ? allTrips : allTrips.filter((t) => {
    if (filter === "upcoming") return t.status === "upcoming" || t.status === "active" || t.status === "draft";
    return t.status === "completed";
  });

  const upcomingCount = allTrips.filter((t) => t.status === "upcoming" || t.status === "active").length;
  const completedCount = allTrips.filter((t) => t.status === "completed").length;
  const totalPoints = allTrips.reduce((sum, t) => sum + (t.pointsEarned || 0), 0);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
                <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.newTripGradient}>
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
                  { value: totalPoints.toLocaleString(), label: "Points Earned", color: "#FFD700" },
                ].map((stat, i) => (
                  <View key={i} style={styles.statItem}>
                    {i > 0 && <View style={styles.statDivider} />}
                    <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </LinearGradient>
            </View>

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
                router.push({ pathname: "/(trip)/summary" as never, params: { tripId: item.id } });
              }
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}><IconSymbol name="airplane" size={40} color="#7B2FBE" /></View>
            <Text style={styles.emptyTitle}>No trips yet</Text>
            <Text style={styles.emptySub}>Plan your first adventure with TRAVI</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emptyBtnGradient}>
                <Text style={styles.emptyBtnText}>Plan a Trip</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  listContent: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 100, gap: 14 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  headerSub: { color: "#5A4D72", fontSize: 13, marginTop: 2 },
  newTripBtn: { borderRadius: 14, overflow: "hidden" },
  newTripGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, gap: 6 },
  newTripText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  statsCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  statsGradient: { flexDirection: "row", padding: 18 },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statDivider: { position: "absolute", width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.08)" },
  statValue: { fontSize: 18, fontWeight: "800" },
  statLabel: { color: "#5A4D72", fontSize: 11 },
  filterRow: { flexDirection: "row", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" },
  filterTab: { flex: 1, paddingVertical: 13, alignItems: "center", overflow: "hidden" },
  filterTabActive: {},
  filterTabText: { color: "#5A4D72", fontSize: 14, fontWeight: "600" },
  filterTabTextActive: { color: "#FFFFFF" },
  tripCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  tripCardInner: { flexDirection: "row", alignItems: "center", padding: 16, gap: 14, overflow: "hidden", minHeight: 100 },
  accentBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: 2 },
  tripEmojiWrap: { width: 52, height: 52, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  tripEmoji: { fontSize: 28 },
  tripInfo: { flex: 1, gap: 6 },
  tripTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  tripDest: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  tripCountry: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 1 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: "rgba(0,0,0,0.4)" },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "700" },
  tripMetaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  tripMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  tripMetaText: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  tripMetaDot: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  tripFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  tripCost: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  tripPointsBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,215,0,0.15)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  tripPointsStar: { color: "#FFD700", fontSize: 10 },
  tripPointsText: { color: "#FFD700", fontSize: 11, fontWeight: "700" },
  liveBtn: { borderRadius: 12, overflow: "hidden" },
  liveBtnGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, gap: 5 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF" },
  liveBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  viewBtn: { padding: 8 },
  emptyState: { alignItems: "center", paddingVertical: 80, gap: 12 },
  emptyIconWrap: { width: 80, height: 80, borderRadius: 24, backgroundColor: "rgba(123,47,190,0.2)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  emptySub: { color: "#5A4D72", fontSize: 14, textAlign: "center" },
  emptyBtn: { borderRadius: 16, overflow: "hidden", marginTop: 8 },
  emptyBtnGradient: { paddingHorizontal: 32, paddingVertical: 14 },
  emptyBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
