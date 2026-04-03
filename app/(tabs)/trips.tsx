/**
 * TRAVI — My Trips Screen (Neutral Mockup)
 * Clean, minimal dark theme. Focus on UX and information.
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  ImageBackground, Platform,
} from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const N = {
  bg:         "#111111",
  surface:    "#1C1C1E",
  surfaceAlt: "#2C2C2E",
  border:     "rgba(255,255,255,0.10)",
  white:      "#FFFFFF",
  textPri:    "#FFFFFF",
  textSec:    "#ABABAB",
  textMuted:  "#777777",
  accent:     "#007AFF",
  green:      "#34C759",
  orange:     "#FF9500",
};

const FILTER_TABS = ["All", "Upcoming", "Active", "Completed"];

const MOCK_TRIPS = [
  {
    id: "1", destination: "Bali, Indonesia", startDate: "2026-05-10", endDate: "2026-05-20",
    status: "upcoming", budget: 1800, travelers: 2, image: require("@/assets/destinations/bali.jpg"),
    tags: ["Adventure", "Nature"],
  },
  {
    id: "2", destination: "Santorini, Greece", startDate: "2026-07-15", endDate: "2026-07-22",
    status: "upcoming", budget: 2400, travelers: 2, image: require("@/assets/destinations/santorini.jpg"),
    tags: ["Romance", "Sunsets"],
  },
  {
    id: "3", destination: "Kyoto, Japan", startDate: "2025-10-01", endDate: "2025-10-10",
    status: "completed", budget: 1950, travelers: 1, image: require("@/assets/destinations/kyoto.jpg"),
    tags: ["Culture", "History"],
  },
  {
    id: "4", destination: "Paris, France", startDate: "2025-06-20", endDate: "2025-06-26",
    status: "completed", budget: 1600, travelers: 2, image: require("@/assets/destinations/paris.jpg"),
    tags: ["Romance", "Art"],
  },
];

function TripCard({ trip, onPress }: { trip: typeof MOCK_TRIPS[0]; onPress: () => void }) {
  const isUpcoming = trip.status === "upcoming";
  const isActive   = trip.status === "active";
  const daysLeft   = isUpcoming ? Math.ceil((new Date(trip.startDate).getTime() - Date.now()) / 86400000) : null;

  return (
    <TouchableOpacity style={S.tripCard} onPress={onPress} activeOpacity={0.7}>
      <ImageBackground
        source={trip.image}
        style={S.tripCardImage}
        imageStyle={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
        resizeMode="cover"
      >
        <View style={S.tripImageOverlay} />
        <View style={[
          S.statusBadge,
          isActive && S.statusBadgeActive,
          !isUpcoming && !isActive && S.statusBadgeCompleted,
        ]}>
          <Text style={S.statusBadgeText}>
            {isActive ? "Live" : isUpcoming ? "Upcoming" : "Completed"}
          </Text>
        </View>
        {daysLeft !== null && (
          <View style={S.countdownBadge}>
            <Text style={S.countdownNum}>{daysLeft}</Text>
            <Text style={S.countdownLabel}>days</Text>
          </View>
        )}
        <Text style={S.tripCardCity}>{trip.destination}</Text>
      </ImageBackground>

      <View style={S.tripCardContent}>
        <View style={S.tripCardRow}>
          <View style={S.tripCardInfo}>
            <Text style={S.tripCardDates}>{trip.startDate} – {trip.endDate}</Text>
            <View style={S.tripCardMeta}>
              <IconSymbol name="person.2.fill" size={13} color={N.textMuted} />
              <Text style={S.tripCardMetaText}>{trip.travelers} travelers</Text>
              <Text style={S.tripCardMetaDot}>·</Text>
              <Text style={S.tripCardMetaText}>€{trip.budget}</Text>
            </View>
          </View>
          <View style={S.tagsCol}>
            {trip.tags.slice(0, 2).map(t => (
              <View key={t} style={S.tag}><Text style={S.tagText}>{t}</Text></View>
            ))}
          </View>
        </View>

        <View style={S.tripCardActions}>
          <TouchableOpacity style={S.viewBtn} onPress={onPress} activeOpacity={0.7}>
            <Text style={S.viewBtnText}>View Details</Text>
            <IconSymbol name="chevron.right" size={14} color={N.white} />
          </TouchableOpacity>
          {isUpcoming && (
            <TouchableOpacity style={S.editBtn} activeOpacity={0.7}>
              <IconSymbol name="pencil" size={16} color={N.accent} />
              <Text style={S.editBtnText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("All");
  const tabBarOffset = 56 + Math.max(insets.bottom, 8) + 16;

  const filtered = activeFilter === "All" ? MOCK_TRIPS : MOCK_TRIPS.filter(t => t.status === activeFilter.toLowerCase());
  const upcoming  = MOCK_TRIPS.filter(t => t.status === "upcoming").length;
  const completed = MOCK_TRIPS.filter(t => t.status === "completed").length;
  const totalSpent = MOCK_TRIPS.filter(t => t.status === "completed").reduce((sum, t) => sum + t.budget, 0);

  return (
    <View style={S.root}>
      {/* ── Header ── */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <Text style={S.headerTitle}>My Trips</Text>
        <Text style={S.headerSub}>Your travel history & plans</Text>
        <View style={S.statsRow}>
          <View style={S.statItem}>
            <Text style={S.statNum}>{upcoming}</Text>
            <Text style={S.statLabel}>Upcoming</Text>
          </View>
          <View style={S.statDivider} />
          <View style={S.statItem}>
            <Text style={S.statNum}>{completed}</Text>
            <Text style={S.statLabel}>Completed</Text>
          </View>
          <View style={S.statDivider} />
          <View style={S.statItem}>
            <Text style={S.statNum}>€{totalSpent.toLocaleString()}</Text>
            <Text style={S.statLabel}>Total Spent</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        {/* ── Filters ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filtersScroll}>
          {FILTER_TABS.map(f => (
            <TouchableOpacity
              key={f}
              style={[S.filterChip, activeFilter === f && S.filterChipActive]}
              onPress={() => { setActiveFilter(f); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.7}
            >
              <Text style={[S.filterChipText, activeFilter === f && S.filterChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Trip Cards ── */}
        <View style={S.cardsContainer}>
          {filtered.length === 0 ? (
            <View style={S.emptyState}>
              <IconSymbol name="airplane" size={48} color={N.textMuted} />
              <Text style={S.emptyTitle}>No trips yet</Text>
              <Text style={S.emptySub}>Start planning your next adventure</Text>
              <TouchableOpacity style={S.emptyBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.7}>
                <Text style={S.emptyBtnText}>Plan a Trip</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filtered.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onPress={() => router.push("/(tabs)/trip-hub" as never)}
              />
            ))
          )}
        </View>

        {/* ── New Trip Button ── */}
        <View style={S.sectionPad}>
          <TouchableOpacity style={S.newTripBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.7}>
            <IconSymbol name="plus" size={20} color={N.white} />
            <Text style={S.newTripBtnText}>Plan a New Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },

  // Header
  header: { paddingHorizontal: 20, paddingBottom: 16, gap: 8, backgroundColor: N.bg },
  headerTitle: { color: N.white, fontSize: 28, fontWeight: "700" },
  headerSub: { color: N.textSec, fontSize: 14 },
  statsRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: N.surface, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 16, marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border,
  },
  statItem: { flex: 1, alignItems: "center", gap: 2 },
  statNum: { color: N.white, fontSize: 18, fontWeight: "700" },
  statLabel: { color: N.textMuted, fontSize: 11 },
  statDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: N.border },

  // Filters
  filtersScroll: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
  },
  filterChipActive: { backgroundColor: N.accent, borderColor: N.accent },
  filterChipText: { color: N.textSec, fontSize: 13, fontWeight: "500" },
  filterChipTextActive: { color: N.white, fontWeight: "600" },

  // Cards
  cardsContainer: { paddingHorizontal: 20, gap: 16 },
  tripCard: {
    borderRadius: 14, backgroundColor: N.surface,
    borderWidth: StyleSheet.hairlineWidth, borderColor: N.border, overflow: "hidden",
  },
  tripCardImage: { height: 160, justifyContent: "flex-end", padding: 14 },
  tripImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  statusBadge: {
    position: "absolute", top: 14, left: 14,
    backgroundColor: N.accent, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  statusBadgeActive: { backgroundColor: N.green },
  statusBadgeCompleted: { backgroundColor: N.textMuted },
  statusBadgeText: { color: N.white, fontSize: 11, fontWeight: "700" },
  countdownBadge: {
    position: "absolute", top: 14, right: 14,
    backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6, alignItems: "center",
  },
  countdownNum: { color: N.white, fontSize: 18, fontWeight: "700", lineHeight: 20 },
  countdownLabel: { color: "rgba(255,255,255,0.7)", fontSize: 9 },
  tripCardCity: { color: N.white, fontSize: 18, fontWeight: "700" },
  tripCardContent: { padding: 16, gap: 12 },
  tripCardRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  tripCardInfo: { flex: 1, gap: 4 },
  tripCardDates: { color: N.textSec, fontSize: 13 },
  tripCardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  tripCardMetaText: { color: N.textMuted, fontSize: 12 },
  tripCardMetaDot: { color: N.textMuted, fontSize: 12 },
  tagsCol: { gap: 4, alignItems: "flex-end" },
  tag: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { color: N.textSec, fontSize: 10 },
  tripCardActions: { flexDirection: "row", gap: 10 },
  viewBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    backgroundColor: N.accent, borderRadius: 10, paddingVertical: 11,
  },
  viewBtnText: { color: N.white, fontSize: 14, fontWeight: "600" },
  editBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 11,
    borderWidth: 1, borderColor: N.accent,
  },
  editBtnText: { color: N.accent, fontSize: 14, fontWeight: "600" },

  // Empty State
  emptyState: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyTitle: { color: N.white, fontSize: 20, fontWeight: "700" },
  emptySub: { color: N.textMuted, fontSize: 14 },
  emptyBtn: { backgroundColor: N.accent, borderRadius: 10, paddingHorizontal: 28, paddingVertical: 14, marginTop: 8 },
  emptyBtnText: { color: N.white, fontSize: 15, fontWeight: "600" },

  // New Trip
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  newTripBtn: {
    borderRadius: 12,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    paddingVertical: 16,
    backgroundColor: N.accent,
  },
  newTripBtnText: { color: N.white, fontSize: 16, fontWeight: "600" },
});
