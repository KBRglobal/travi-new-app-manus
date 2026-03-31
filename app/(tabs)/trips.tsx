import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore, Trip } from "@/lib/store";
import { GradientButton } from "@/components/ui/gradient-button";

const { width } = Dimensions.get("window");

const MOCK_TRIPS: Trip[] = [
  {
    id: "mock1",
    destination: "Paris",
    destinationCode: "CDG",
    country: "France",
    startDate: "Apr 15, 2026",
    endDate: "Apr 22, 2026",
    travelers: 2,
    budget: "luxury",
    status: "upcoming",
    interests: ["culture", "food", "art"],
    landmarks: ["Eiffel Tower", "Louvre"],
    flight: { id: "f1", airline: "Air France", from: "TLV", to: "CDG", departure: "08:00", arrival: "11:30", duration: "4h 30m", price: 680, class: "Business", stops: 0 },
    hotel: { id: "h1", name: "Le Bristol Paris", stars: 5, location: "8th Arrondissement", pricePerNight: 420, totalPrice: 2940, amenities: ["Pool", "Spa", "Michelin Restaurant"], rating: 9.4 },
    itinerary: [
      {
        day: 1, date: "Apr 15",
        activities: [
          { id: "a1", time: "14:00", title: "Check-in Le Bristol", description: "Luxury 5-star hotel check-in", location: "Rue du Faubourg Saint-Honoré", price: 0, category: "hotel", status: "confirmed" },
          { id: "a2", time: "16:00", title: "Eiffel Tower Visit", description: "Skip-the-line tickets booked", location: "Champ de Mars", price: 28, category: "activity", status: "confirmed" },
          { id: "a3", time: "20:00", title: "Dinner at Jules Verne", description: "Michelin-starred restaurant inside Eiffel Tower", location: "Eiffel Tower, 2nd floor", price: 180, category: "food", status: "confirmed" },
        ],
      },
    ],
    totalCost: 4850,
    pointsEarned: 2425,
  },
  {
    id: "mock2",
    destination: "Tokyo",
    destinationCode: "NRT",
    country: "Japan",
    startDate: "Jun 1, 2026",
    endDate: "Jun 10, 2026",
    travelers: 1,
    budget: "mid-range",
    status: "upcoming",
    interests: ["culture", "food", "technology"],
    landmarks: ["Shibuya Crossing", "Mount Fuji"],
    itinerary: [],
    totalCost: 3200,
    pointsEarned: 1600,
  },
  {
    id: "mock3",
    destination: "Bali",
    destinationCode: "DPS",
    country: "Indonesia",
    startDate: "Jan 10, 2026",
    endDate: "Jan 17, 2026",
    travelers: 2,
    budget: "mid-range",
    status: "completed",
    interests: ["beach", "wellness", "food"],
    landmarks: ["Uluwatu Temple", "Tegallalang Rice Terraces"],
    itinerary: [],
    totalCost: 2100,
    pointsEarned: 1050,
  },
];

const DEST_EMOJIS: Record<string, string> = {
  Paris: "🗼", Tokyo: "⛩️", Bali: "🌴", "New York": "🗽", Santorini: "🏛️", Dubai: "🌆",
};
const DEST_COLORS: Record<string, [string, string]> = {
  Paris: ["#2D1B69", "#4A1942"],
  Tokyo: ["#1A3A5C", "#2D1B69"],
  Bali: ["#1B4D1E", "#2D3A1B"],
  "New York": ["#1A2A4A", "#2D1B69"],
  Santorini: ["#1A3A5C", "#2D1B69"],
  Dubai: ["#3A2A1A", "#2D1B69"],
};

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", color: "#2196F3", bg: "rgba(33,150,243,0.15)" },
  active: { label: "🟢 Live", color: "#4CAF50", bg: "rgba(76,175,80,0.15)" },
  completed: { label: "Completed", color: "#A78BCA", bg: "rgba(167,139,202,0.15)" },
  draft: { label: "Draft", color: "#FF9800", bg: "rgba(255,152,0,0.15)" },
};

function TripCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  const emoji = DEST_EMOJIS[trip.destination] || "✈️";
  const colors = DEST_COLORS[trip.destination] || (["#2D1B69", "#3D2580"] as [string, string]);
  const status = STATUS_CONFIG[trip.status];

  return (
    <TouchableOpacity style={styles.tripCard} onPress={onPress} activeOpacity={0.9}>
      <LinearGradient colors={colors} style={styles.tripCardGradient}>
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: status.bg, borderColor: status.color }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>

        {/* Emoji */}
        <Text style={styles.tripEmoji}>{emoji}</Text>

        {/* Info */}
        <View style={styles.tripInfo}>
          <Text style={styles.tripDest}>{trip.destination}</Text>
          <Text style={styles.tripCountry}>{trip.country}</Text>

          <View style={styles.tripMeta}>
            <View style={styles.tripMetaItem}>
              <IconSymbol name="calendar" size={12} color="#A78BCA" />
              <Text style={styles.tripMetaText}>{trip.startDate}</Text>
            </View>
            <View style={styles.tripMetaItem}>
              <IconSymbol name="person.2.fill" size={12} color="#A78BCA" />
              <Text style={styles.tripMetaText}>{trip.travelers}</Text>
            </View>
          </View>

          <View style={styles.tripFooter}>
            <Text style={styles.tripCost}>${trip.totalCost.toLocaleString()}</Text>
            <View style={styles.tripPoints}>
              <Text style={styles.tripPointsStar}>✦</Text>
              <Text style={styles.tripPointsText}>{trip.pointsEarned.toLocaleString()} pts</Text>
            </View>
          </View>
        </View>

        {/* Live Mode Button */}
        {trip.status === "upcoming" || trip.status === "active" ? (
          <TouchableOpacity
            style={styles.liveModeBtn}
            onPress={() => router.push({ pathname: "/(live)/home" as never, params: { tripId: trip.id } })}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#7B2FBE", "#E91E8C"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.liveModeGradient}
            >
              <View style={styles.liveDot} />
              <Text style={styles.liveModeText}>Live Mode</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.viewBtn} activeOpacity={0.8}>
            <Text style={styles.viewBtnText}>View Trip</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function TripsScreen() {
  const { state } = useStore();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const allTrips = [...(state.trips.length > 0 ? state.trips : MOCK_TRIPS)];
  const filtered = filter === "all" ? allTrips : allTrips.filter((t) => {
    if (filter === "upcoming") return t.status === "upcoming" || t.status === "active" || t.status === "draft";
    return t.status === "completed";
  });

  const upcomingCount = allTrips.filter((t) => t.status === "upcoming" || t.status === "active").length;
  const completedCount = allTrips.filter((t) => t.status === "completed").length;
  const totalPoints = allTrips.reduce((sum, t) => sum + (t.pointsEarned || 0), 0);

  return (
    <ScreenContainer containerClassName="bg-background">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.headerTitle}>My Trips</Text>
                  <Text style={styles.headerSub}>Your travel collection</Text>
                </View>
                <TouchableOpacity
                  style={styles.newTripBtn}
                  onPress={() => router.push("/(trip)/plan" as never)}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.newTripGradient}>
                    <IconSymbol name="plus" size={18} color="#FFFFFF" />
                    <Text style={styles.newTripText}>New Trip</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{upcomingCount}</Text>
                  <Text style={styles.statLabel}>Upcoming</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{completedCount}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: "#FFD700" }]}>✦ {totalPoints.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Points Earned</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Filter Tabs */}
            <View style={styles.filterRow}>
              {(["all", "upcoming", "completed"] as const).map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterTab, filter === f && styles.filterTabActive]}
                  onPress={() => setFilter(f)}
                  activeOpacity={0.8}
                >
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
            <Text style={styles.emptyEmoji}>✈️</Text>
            <Text style={styles.emptyTitle}>No trips yet</Text>
            <Text style={styles.emptySubtitle}>Plan your first adventure with TRAVI</Text>
            <GradientButton
              title="Plan a Trip"
              onPress={() => router.push("/(trip)/plan" as never)}
              style={{ marginTop: 20, paddingHorizontal: 32 }}
            />
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingBottom: 20, gap: 16 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  headerSub: { color: "#A78BCA", fontSize: 14, marginTop: 2 },
  newTripBtn: { borderRadius: 12, overflow: "hidden" },
  newTripGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, gap: 6 },
  newTripText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14, padding: 14,
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  statLabel: { color: "#A78BCA", fontSize: 11 },
  statDivider: { width: 1, backgroundColor: "#4A3080" },
  filterRow: {
    flexDirection: "row",
    backgroundColor: "#2D1B69",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 4,
  },
  filterTab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  filterTabActive: { backgroundColor: "#7B2FBE" },
  filterTabText: { color: "#A78BCA", fontSize: 14, fontWeight: "600" },
  filterTabTextActive: { color: "#FFFFFF" },
  tripCard: { marginHorizontal: 20, marginVertical: 8, borderRadius: 20, overflow: "hidden" },
  tripCardGradient: { padding: 18, gap: 10 },
  statusBadge: {
    alignSelf: "flex-start", borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
  tripEmoji: { fontSize: 48, textAlign: "center", marginVertical: 8 },
  tripInfo: { gap: 6 },
  tripDest: { color: "#FFFFFF", fontSize: 26, fontWeight: "800" },
  tripCountry: { color: "#A78BCA", fontSize: 14 },
  tripMeta: { flexDirection: "row", gap: 16, marginTop: 4 },
  tripMetaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  tripMetaText: { color: "#A78BCA", fontSize: 13 },
  tripFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  tripCost: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  tripPoints: { flexDirection: "row", alignItems: "center", gap: 4 },
  tripPointsStar: { color: "#FFD700", fontSize: 14 },
  tripPointsText: { color: "#FFD700", fontSize: 13, fontWeight: "600" },
  liveModeBtn: { borderRadius: 14, overflow: "hidden", marginTop: 6 },
  liveModeGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, gap: 8 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" },
  liveModeText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  viewBtn: {
    borderWidth: 1, borderColor: "#4A3080", borderRadius: 14,
    paddingVertical: 12, alignItems: "center", marginTop: 6,
  },
  viewBtnText: { color: "#A78BCA", fontSize: 15, fontWeight: "600" },
  emptyState: { alignItems: "center", paddingTop: 80, paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "700", marginBottom: 8 },
  emptySubtitle: { color: "#A78BCA", fontSize: 15, textAlign: "center" },
});
