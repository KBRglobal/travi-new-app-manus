import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

export default function SummaryScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state, dispatch } = useStore();
  const trip = state.trips.find((t) => t.id === tripId);
  const [confirmed, setConfirmed] = useState(false);

  if (!trip) {
    return (
      <ScreenContainer containerClassName="bg-background">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Trip not found</Text>
          <TouchableOpacity onPress={() => router.replace("/(tabs)" as never)} style={{ marginTop: 16 }}>
            <Text style={{ color: "#7B2FBE" }}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const totalCost = (trip.flight?.price || 0) + (trip.hotel?.totalPrice || 0) + 350;
  const pointsToEarn = Math.floor(totalCost * 0.05 * 100);

  const handleConfirm = () => {
    dispatch({ type: "UPDATE_TRIP", payload: { id: trip.id, updates: { status: "upcoming", totalCost, pointsEarned: pointsToEarn } } });
    dispatch({ type: "UPDATE_PROFILE", payload: { points: (state.profile?.points || 0) + pointsToEarn } });
    router.push({ pathname: "/(trip)/completion" as never, params: { tripId: trip.id } });
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 6 of 6 — Review</Text>
          <View style={styles.stepBar}>
            {[1,2,3,4,5,6].map((s) => (
              <View key={s} style={[styles.stepDot, styles.stepDotActive]} />
            ))}
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Trip Summary</Text>
        <Text style={styles.subtitle}>{trip.destination} • {trip.startDate} → {trip.endDate}</Text>

        {/* Trip Overview Card */}
        <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>✈️</Text>
              <Text style={styles.overviewLabel}>Destination</Text>
              <Text style={styles.overviewValue}>{trip.destination}</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>👥</Text>
              <Text style={styles.overviewLabel}>Travelers</Text>
              <Text style={styles.overviewValue}>{trip.travelers}</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewIcon}>📅</Text>
              <Text style={styles.overviewLabel}>Duration</Text>
              <Text style={styles.overviewValue}>{trip.itinerary?.length || 3} days</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Flight Summary */}
        {trip.flight && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✈️ Flight</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{trip.flight.airline}</Text>
                <Text style={styles.summaryValue}>${trip.flight.price}</Text>
              </View>
              <Text style={styles.summaryDetail}>
                {trip.flight.from} → {trip.flight.to} • {trip.flight.departure} – {trip.flight.arrival}
              </Text>
              <Text style={styles.summaryDetail}>{trip.flight.duration} • {trip.flight.class}</Text>
            </View>
          </View>
        )}

        {/* Hotel Summary */}
        {trip.hotel && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏨 Hotel</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{trip.hotel.name}</Text>
                <Text style={styles.summaryValue}>${trip.hotel.totalPrice}</Text>
              </View>
              <Text style={styles.summaryDetail}>
                {"⭐".repeat(trip.hotel.stars)} • {trip.hotel.location}
              </Text>
              <Text style={styles.summaryDetail}>Rating: {trip.hotel.rating}/10</Text>
            </View>
          </View>
        )}

        {/* Itinerary Preview */}
        {trip.itinerary && trip.itinerary.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Itinerary</Text>
            {trip.itinerary.map((day) => (
              <View key={day.day} style={styles.dayCard}>
                <Text style={styles.dayTitle}>Day {day.day} — {day.date}</Text>
                {day.activities.slice(0, 3).map((act) => (
                  <View key={act.id} style={styles.activityRow}>
                    <Text style={styles.activityTime}>{act.time}</Text>
                    <Text style={styles.activityTitle}>{act.title}</Text>
                    {act.price > 0 && <Text style={styles.activityPrice}>${act.price}</Text>}
                  </View>
                ))}
                {day.activities.length > 3 && (
                  <Text style={styles.moreActivities}>+{day.activities.length - 3} more activities</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Cost Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Cost Breakdown</Text>
          <View style={styles.costCard}>
            {trip.flight && (
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Flights</Text>
                <Text style={styles.costValue}>${trip.flight.price}</Text>
              </View>
            )}
            {trip.hotel && (
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Hotel</Text>
                <Text style={styles.costValue}>${trip.hotel.totalPrice}</Text>
              </View>
            )}
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Activities & Food (est.)</Text>
              <Text style={styles.costValue}>$350</Text>
            </View>
            <View style={styles.costDivider} />
            <View style={styles.costRow}>
              <Text style={styles.costTotalLabel}>Total Estimated</Text>
              <Text style={styles.costTotalValue}>${totalCost}</Text>
            </View>
          </View>
        </View>

        {/* Points to Earn */}
        <View style={styles.pointsCard}>
          <LinearGradient
            colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.2)"]}
            style={styles.pointsGradient}
          >
            <Text style={styles.pointsEmoji}>✦</Text>
            <View>
              <Text style={styles.pointsTitle}>You'll earn {pointsToEarn.toLocaleString()} TRAVI Points</Text>
              <Text style={styles.pointsSubtitle}>Worth ~${(pointsToEarn / 100).toFixed(0)} in future travel</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
          <LinearGradient
            colors={["#7B2FBE", "#E91E8C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmGradient}
          >
            <Text style={styles.confirmText}>Confirm & Book Trip</Text>
            <Text style={styles.confirmSubtext}> 🔒 Secure booking</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.editText}>Edit Trip Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  stepIndicator: { flex: 1, alignItems: "center", gap: 6 },
  stepText: { color: "#A78BCA", fontSize: 12 },
  stepBar: { flexDirection: "row", gap: 4 },
  stepDot: { width: 24, height: 4, borderRadius: 2, backgroundColor: "#4A3080" },
  stepDotActive: { backgroundColor: "#E91E8C" },
  content: { padding: 24, paddingBottom: 40 },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "700", marginBottom: 4 },
  subtitle: { color: "#A78BCA", fontSize: 15, marginBottom: 20 },
  overviewCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  overviewRow: { flexDirection: "row", alignItems: "center" },
  overviewItem: { flex: 1, alignItems: "center", gap: 4 },
  overviewIcon: { fontSize: 24 },
  overviewLabel: { color: "#A78BCA", fontSize: 11 },
  overviewValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  overviewDivider: { width: 1, height: 50, backgroundColor: "#4A3080" },
  section: { marginBottom: 20 },
  sectionTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  summaryCard: {
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 4,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  summaryValue: { color: "#FFD700", fontSize: 15, fontWeight: "700" },
  summaryDetail: { color: "#A78BCA", fontSize: 13 },
  dayCard: {
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    marginBottom: 8,
  },
  dayTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", marginBottom: 8 },
  activityRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  activityTime: { color: "#7B2FBE", fontSize: 12, width: 40 },
  activityTitle: { color: "#A78BCA", fontSize: 13, flex: 1 },
  activityPrice: { color: "#FFD700", fontSize: 12 },
  moreActivities: { color: "#6B5A8A", fontSize: 12, marginTop: 4 },
  costCard: {
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 8,
  },
  costRow: { flexDirection: "row", justifyContent: "space-between" },
  costLabel: { color: "#A78BCA", fontSize: 14 },
  costValue: { color: "#FFFFFF", fontSize: 14 },
  costDivider: { height: 1, backgroundColor: "#4A3080" },
  costTotalLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  costTotalValue: { color: "#FFD700", fontSize: 18, fontWeight: "700" },
  pointsCard: { borderRadius: 14, overflow: "hidden", marginBottom: 20, borderWidth: 1, borderColor: "#7B2FBE" },
  pointsGradient: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  pointsEmoji: { fontSize: 28, color: "#FFD700" },
  pointsTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  pointsSubtitle: { color: "#A78BCA", fontSize: 13, marginTop: 2 },
  confirmBtn: { borderRadius: 28, overflow: "hidden", marginBottom: 12 },
  confirmGradient: { paddingVertical: 16, alignItems: "center" },
  confirmText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  confirmSubtext: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },
  editBtn: { alignItems: "center", paddingVertical: 12 },
  editText: { color: "#A78BCA", fontSize: 15 },
});
