import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SectionList, Dimensions } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

const CATEGORY_ICONS: Record<string, string> = {
  food: "🍽️",
  activity: "🎭",
  hotel: "🏨",
  transport: "🚗",
  flight: "✈️",
};

const CATEGORY_COLORS: Record<string, string> = {
  food: "#FF9800",
  activity: "#7B2FBE",
  hotel: "#4CAF50",
  transport: "#2196F3",
  flight: "#E91E8C",
};

export default function ItineraryScreen() {
  const { state } = useStore();
  const activeTrip = state.trips.find((t) => t.status === "active") || state.trips[0];
  const [selectedDay, setSelectedDay] = useState(0);

  const days = activeTrip?.itinerary || [];
  const currentDay = days[selectedDay];

  return (
    <ScreenContainer containerClassName="bg-background">
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Full Itinerary</Text>
        <TouchableOpacity style={styles.editBtn}>
          <IconSymbol name="pencil" size={18} color="#A78BCA" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {days.map((day, idx) => (
          <TouchableOpacity
            key={day.day}
            style={[styles.dayTab, selectedDay === idx && styles.dayTabActive]}
            onPress={() => setSelectedDay(idx)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dayTabText, selectedDay === idx && styles.dayTabTextActive]}>
              Day {day.day}
            </Text>
            {selectedDay === idx && <View style={styles.dayTabDot} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Activities Timeline */}
      {currentDay ? (
        <SectionList
          sections={[{ title: currentDay.date, data: currentDay.activities }]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderSectionHeader={({ section }) => (
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>📅 {section.title}</Text>
              <Text style={styles.dayBudget}>
                Est. ${currentDay.activities.reduce((sum, a) => sum + a.price, 0)}
              </Text>
            </View>
          )}
          renderItem={({ item, index }) => {
            const color = CATEGORY_COLORS[item.category] || "#7B2FBE";
            const icon = CATEGORY_ICONS[item.category] || "📍";
            const isLast = index === currentDay.activities.length - 1;
            return (
              <View style={styles.activityItem}>
                {/* Timeline */}
                <View style={styles.timeline}>
                  <View style={[styles.timelineDot, { backgroundColor: color }]} />
                  {!isLast && <View style={[styles.timelineLine, { backgroundColor: color + "40" }]} />}
                </View>

                {/* Card */}
                <TouchableOpacity style={styles.activityCard} activeOpacity={0.85}>
                  <View style={styles.activityHeader}>
                    <View style={styles.activityTime}>
                      <Text style={styles.activityTimeText}>{item.time}</Text>
                    </View>
                    <View style={[styles.categoryBadge, { backgroundColor: color + "20", borderColor: color }]}>
                      <Text style={styles.categoryIcon}>{icon}</Text>
                      <Text style={[styles.categoryText, { color }]}>{item.category}</Text>
                    </View>
                    <View style={[styles.statusDot, item.status === "confirmed" ? styles.statusConfirmed : styles.statusPending]} />
                  </View>

                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityDesc}>{item.description}</Text>

                  <View style={styles.activityFooter}>
                    <View style={styles.locationRow}>
                      <IconSymbol name="location.fill" size={12} color="#A78BCA" />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    {item.price > 0 && (
                      <Text style={styles.priceText}>${item.price}</Text>
                    )}
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <IconSymbol name="map.fill" size={13} color="#7B2FBE" />
                      <Text style={styles.actionBtnText}>Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <IconSymbol name="info.circle.fill" size={13} color="#7B2FBE" />
                      <Text style={styles.actionBtnText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <IconSymbol name="arrow.left.arrow.right" size={13} color="#7B2FBE" />
                      <Text style={styles.actionBtnText}>Swap</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          ListFooterComponent={
            <TouchableOpacity style={styles.addActivityBtn} activeOpacity={0.8}>
              <IconSymbol name="plus.circle.fill" size={18} color="#7B2FBE" />
              <Text style={styles.addActivityText}>Add Activity</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No itinerary yet</Text>
          <Text style={styles.emptySubtext}>Plan a trip to see your schedule here</Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, color: "#FFFFFF", fontSize: 18, fontWeight: "700", textAlign: "center" },
  editBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  daySelector: {
    flexDirection: "row",
    backgroundColor: "#2D1B69",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#4A3080",
  },
  dayTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  dayTabActive: { backgroundColor: "#3D2580" },
  dayTabText: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  dayTabTextActive: { color: "#FFFFFF" },
  dayTabDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#E91E8C" },
  list: { padding: 20, paddingBottom: 100 },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dayHeaderText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  dayBudget: { color: "#FFD700", fontSize: 14, fontWeight: "600" },
  activityItem: { flexDirection: "row", gap: 12, marginBottom: 4 },
  timeline: { width: 20, alignItems: "center", paddingTop: 16 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, zIndex: 1 },
  timelineLine: { width: 2, flex: 1, minHeight: 40, marginTop: 4 },
  activityCard: {
    flex: 1,
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    marginBottom: 12,
    gap: 6,
  },
  activityHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  activityTime: {
    backgroundColor: "#3D2580",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activityTimeText: { color: "#7B2FBE", fontSize: 12, fontWeight: "700" },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    gap: 3,
  },
  categoryIcon: { fontSize: 10 },
  categoryText: { fontSize: 10, fontWeight: "600" },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginLeft: "auto" },
  statusConfirmed: { backgroundColor: "#4CAF50" },
  statusPending: { backgroundColor: "#FF9800" },
  activityTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  activityDesc: { color: "#A78BCA", fontSize: 13, lineHeight: 18 },
  activityFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: { color: "#A78BCA", fontSize: 12 },
  priceText: { color: "#FFD700", fontSize: 13, fontWeight: "600" },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#4A3080",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#3D2580",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionBtnText: { color: "#7B2FBE", fontSize: 12, fontWeight: "600" },
  addActivityBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    borderStyle: "dashed",
    marginTop: 8,
  },
  addActivityText: { color: "#7B2FBE", fontSize: 15, fontWeight: "600" },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
  emptyText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginBottom: 8 },
  emptySubtext: { color: "#A78BCA", fontSize: 14, textAlign: "center" },
});
