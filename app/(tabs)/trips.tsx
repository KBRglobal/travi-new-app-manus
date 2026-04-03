// @ts-nocheck
/**
 * TRAVI — My Trips Screen
 * Dark mode: #1A0B2E bg, #24103E surface, purple→pink gradients
 * NO circles — bare icons, pill badges, glassmorphism cards
 */
import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  ImageBackground, Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const C = {
  bg:           "#1A0B2E",
  surface:      "#24103E",
  glassStroke:  "rgba(123,68,230,0.3)",
  purple:       "#6443F4",
  pink:         "#F94498",
  orange:       "#FF9327",
  green:        "#02A65C",
  white:        "#1A0B2E",
  textPrimary:  "#1A0B2E",
  textSecondary:"#D3CFD8",
  textMuted:    "#A79FB2",
  textDisabled: "#504065",
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
    <TouchableOpacity style={S.tripCard} onPress={onPress} activeOpacity={0.88}>
      <ImageBackground
        source={trip.image}
        style={S.tripCardImage}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        resizeMode="cover"
      >
        <LinearGradient colors={["transparent", "rgba(26,11,46,0.9)"]} style={StyleSheet.absoluteFillObject} />
        <View style={[S.statusBadge, isActive && S.statusBadgeActive, !isUpcoming && !isActive && S.statusBadgeCompleted]}>
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
              <IconSymbol name="person.2.fill" size={13} color={C.textMuted} />
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
          <TouchableOpacity style={S.viewBtn} onPress={onPress} activeOpacity={0.85}>
            <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.viewBtnText}>View Details</Text>
            <IconSymbol name="chevron.right" size={14} color={C.white} />
          </TouchableOpacity>
          {isUpcoming && (
            <TouchableOpacity style={S.editBtn} activeOpacity={0.85}>
              <IconSymbol name="pencil" size={16} color={C.purple} />
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
  const tabBarOffset = 60 + Math.max(insets.bottom, 8) + 16;

  const filtered = activeFilter === "All" ? MOCK_TRIPS : MOCK_TRIPS.filter(t => t.status === activeFilter.toLowerCase());
  const upcoming  = MOCK_TRIPS.filter(t => t.status === "upcoming").length;
  const completed = MOCK_TRIPS.filter(t => t.status === "completed").length;
  const totalSpent = MOCK_TRIPS.filter(t => t.status === "completed").reduce((sum, t) => sum + t.budget, 0);

  return (
    <View style={S.root}>
      <LinearGradient
        colors={[C.purple, "#9B3FD4", C.pink]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[S.header, { paddingTop: insets.top + 12 }]}
      >
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
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filtersScroll} style={S.filtersContainer}>
          {FILTER_TABS.map(f => (
            <TouchableOpacity
              key={f}
              style={[S.filterChip, activeFilter === f && S.filterChipActive]}
              onPress={() => { setActiveFilter(f); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.8}
            >
              {activeFilter === f && (
                <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              )}
              <Text style={[S.filterChipText, activeFilter === f && S.filterChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={S.cardsContainer}>
          {filtered.length === 0 ? (
            <View style={S.emptyState}>
              <IconSymbol name="airplane" size={48} color={C.textDisabled} />
              <Text style={S.emptyTitle}>No trips yet</Text>
              <Text style={S.emptySub}>Start planning your next adventure</Text>
              <TouchableOpacity style={S.emptyBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
                <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
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

        <View style={S.sectionPad}>
          <TouchableOpacity style={S.newTripBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.88}>
            <LinearGradient colors={[C.purple, "#9B3FD4", C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
            <IconSymbol name="plus" size={20} color={C.white} />
            <Text style={S.newTripBtnText}>Plan a New Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20, gap: 8 },
  headerTitle: { color: C.white, fontSize: 28, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  statsRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16,
    paddingVertical: 14, paddingHorizontal: 20, marginTop: 8,
  },
  statItem: { flex: 1, alignItems: "center", gap: 2 },
  statNum: { color: C.white, fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold" },
  statLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Satoshi-Regular" },
  statDivider: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.2)" },
  filtersContainer: { backgroundColor: C.bg },
  filtersScroll: { paddingHorizontal: 20, paddingVertical: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: "rgba(36,16,62,0.95)", borderWidth: 1.5, borderColor: "rgba(123,68,230,0.55)", overflow: "hidden",
  },
  filterChipActive: { borderColor: "transparent" },
  filterChipText: { color: "#C8C0D8", fontSize: 13, fontFamily: "Satoshi-Medium", fontWeight: "600" },
  filterChipTextActive: { color: C.white, fontFamily: "Satoshi-Bold" },
  cardsContainer: { paddingHorizontal: 20, gap: 16 },
  tripCard: {
    borderRadius: 20, backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.glassStroke, overflow: "hidden",
  },
  tripCardImage: { height: 180, justifyContent: "flex-end", padding: 14 },
  statusBadge: {
    position: "absolute", top: 14, left: 14,
    backgroundColor: "rgba(100,67,244,0.8)", borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  statusBadgeActive: { backgroundColor: "rgba(2,166,92,0.85)" },
  statusBadgeCompleted: { backgroundColor: "rgba(80,64,101,0.85)" },
  statusBadgeText: { color: C.white, fontSize: 11, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  countdownBadge: {
    position: "absolute", top: 14, right: 14,
    backgroundColor: "rgba(249,68,152,0.85)", borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 6, alignItems: "center",
  },
  countdownNum: { color: C.white, fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold", lineHeight: 20 },
  countdownLabel: { color: "rgba(255,255,255,0.8)", fontSize: 9, fontFamily: "Satoshi-Medium" },
  tripCardCity: { color: C.white, fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tripCardContent: { padding: 16, gap: 12 },
  tripCardRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  tripCardInfo: { flex: 1, gap: 4 },
  tripCardDates: { color: C.textSecondary, fontSize: 13, fontFamily: "Satoshi-Regular" },
  tripCardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  tripCardMetaText: { color: C.textMuted, fontSize: 12, fontFamily: "Satoshi-Regular" },
  tripCardMetaDot: { color: C.textDisabled, fontSize: 12 },
  tagsCol: { gap: 4, alignItems: "flex-end" },
  tag: { backgroundColor: "rgba(249,68,152,0.18)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  tagText: { color: C.pink, fontSize: 10, fontFamily: "Satoshi-Medium" },
  tripCardActions: { flexDirection: "row", gap: 10 },
  viewBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    borderRadius: 24, paddingVertical: 11, overflow: "hidden",
  },
  viewBtnText: { color: C.white, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  editBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    borderRadius: 24, paddingHorizontal: 16, paddingVertical: 11,
    borderWidth: 1.5, borderColor: C.purple,
  },
  editBtnText: { color: C.purple, fontSize: 14, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  emptyState: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyTitle: { color: C.white, fontSize: 20, fontWeight: "700", fontFamily: "Chillax-Bold" },
  emptySub: { color: C.textMuted, fontSize: 14, fontFamily: "Satoshi-Regular" },
  emptyBtn: { borderRadius: 24, paddingHorizontal: 28, paddingVertical: 14, overflow: "hidden", marginTop: 8 },
  emptyBtnText: { color: C.white, fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  newTripBtn: {
    borderRadius: 20, overflow: "hidden",
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    paddingVertical: 18,
  },
  newTripBtnText: { color: C.white, fontSize: 16, fontWeight: "700", fontFamily: "Satoshi-Bold" },
});
