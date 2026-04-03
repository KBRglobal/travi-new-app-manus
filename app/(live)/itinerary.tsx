import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  ScrollView, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "@/lib/store";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";

const CATEGORY_ICONS: Record<string, "fork.knife" | "theatermasks.fill" | "bed.double.fill" | "car.fill" | "airplane" | "location.fill"> = {
  food: "fork.knife",
  activity: "theatermasks.fill",
  hotel: "bed.double.fill",
  transport: "car.fill",
  flight: "airplane",
};

const CATEGORY_COLORS: Record<string, string> = {
  food: "#FF9800",
  activity: BRAND.purple,
  hotel: BRAND.green,
  transport: "#2196F3",
  flight: BRAND.pink,
};

export default function ItineraryScreen() {
  const { state } = useStore();
  const insets = useSafeAreaInsets();
  const activeTrip = state.trips.find((t) => t.status === "active") || state.trips[0];
  const [selectedDay, setSelectedDay] = useState(0);

  const days = activeTrip?.itinerary || [];
  const currentDay = days[selectedDay];
  const totalBudget = currentDay?.activities.reduce((sum, a) => sum + a.price, 0) ?? 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[BRAND.bgDeep, BRAND.bgOverlay]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Header */}
      <LinearGradient
        colors={["rgba(100,67,244,0.4)", "rgba(100,67,244,0.1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <IconSymbol name="chevron.left" size={22} color={BRAND.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {activeTrip ? activeTrip.destination : "Itinerary"}
          </Text>
          <Text style={styles.headerSub}>
            {days.length} days · {days.reduce((sum, d) => sum + d.activities.length, 0)} activities
          </Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <IconSymbol name="square.and.arrow.up" size={20} color={BRAND.textSecondary} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayScrollContent}
        style={styles.dayScroll}
      >
        {(days.length > 0 ? days : [{day:1,activities:[{},{},{}]},{day:2,activities:[{},{},{}]},{day:3,activities:[{},{},{}]}]).map((day, idx) => (
          <TouchableOpacity
            key={day.day}
            style={[styles.dayPill, selectedDay === idx && styles.dayPillActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelectedDay(idx);
            }}
            activeOpacity={0.8}
          >
            {selectedDay === idx && (
              <LinearGradient
                colors={[BRAND.purple, BRAND.pink]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <Text style={[styles.dayPillNum, selectedDay === idx && styles.dayPillNumActive]}>
              Day {day.day}
            </Text>
            <Text style={[styles.dayPillCount, selectedDay === idx && styles.dayPillCountActive]}>
              {day.activities.length} stops
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Day summary bar */}
      {currentDay && (
        <View style={styles.daySummary}>
          <View style={styles.daySummaryItem}>
            <IconSymbol name="calendar" size={13} color={BRAND.textMuted} />
            <Text style={styles.daySummaryText}>{currentDay.date}</Text>
          </View>
          <View style={styles.daySummaryDivider} />
          <View style={styles.daySummaryItem}>
            <IconSymbol name="dollarsign.circle.fill" size={13} color={BRAND.gold} />
            <Text style={[styles.daySummaryText, { color: BRAND.gold }]}>Est. ${totalBudget}</Text>
          </View>
          <View style={styles.daySummaryDivider} />
          <View style={styles.daySummaryItem}>
            <IconSymbol name="clock.fill" size={13} color={BRAND.textMuted} />
            <Text style={styles.daySummaryText}>{currentDay.activities.length} activities</Text>
          </View>
        </View>
      )}

      {/* Timeline */}
      {currentDay ? (
        <FlatList
          data={currentDay.activities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const color = CATEGORY_COLORS[item.category] || BRAND.purple;
            const iconName = CATEGORY_ICONS[item.category] || "location.fill";
            const isLast = index === currentDay.activities.length - 1;
            return (
              <View style={styles.timelineRow}>
                <View style={styles.timelineCol}>
                  <View style={[styles.timelineDot, { backgroundColor: color }]}>
                    <IconSymbol name={iconName} size={10} color="#fff" />
                  </View>
                </View>
                <TouchableOpacity style={styles.stopCard} activeOpacity={0.85}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <View style={styles.stopCardHeader}>
                    <View style={[styles.timeBadge, { backgroundColor: color + "20", borderColor: color + "50" }]}>
                      <Text style={[styles.timeBadgeText, { color }]}>{item.time}</Text>
                    </View>
                    <View style={[styles.catBadge, { backgroundColor: color + "15", borderColor: color + "30" }]}>
                      <Text style={[styles.catBadgeText, { color }]}>
                        {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : ""}
                      </Text>
                    </View>
                    <View style={[styles.statusDot, item.status === "confirmed" ? styles.statusGreen : styles.statusOrange]} />
                  </View>
                  <Text style={styles.stopTitle}>{item.title}</Text>
                  <Text style={styles.stopDesc} numberOfLines={2}>{item.description}</Text>
                  <View style={styles.stopFooter}>
                    <View style={styles.stopLocation}>
                      <IconSymbol name="location.fill" size={11} color={BRAND.textMuted} />
                      <Text style={styles.stopLocationText} numberOfLines={1}>{item.location}</Text>
                    </View>
                    {item.price > 0 && (
                      <Text style={styles.stopPrice}>${item.price}</Text>
                    )}
                  </View>
                  <View style={styles.stopActions}>
                    <TouchableOpacity style={styles.stopAction}>
                      <IconSymbol name="map.fill" size={12} color={BRAND.purple} />
                      <Text style={styles.stopActionText}>Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stopAction}>
                      <IconSymbol name="info.circle.fill" size={12} color={BRAND.purple} />
                      <Text style={styles.stopActionText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stopAction}>
                      <IconSymbol name="arrow.left.arrow.right" size={12} color={BRAND.purple} />
                      <Text style={styles.stopActionText}>Swap</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          ListFooterComponent={
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
              <LinearGradient
                colors={["rgba(100,67,244,0.15)", "rgba(100,67,244,0.05)"]}
                style={StyleSheet.absoluteFillObject}
              />
              <IconSymbol name="plus.circle.fill" size={18} color={BRAND.purple} />
              <Text style={styles.addBtnText}>Add Activity</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.empty}>
          <IconSymbol name="calendar" size={48} color={BRAND.textMuted} />
          <Text style={styles.emptyTitle}>No itinerary yet</Text>
          <Text style={styles.emptyBody}>Plan a trip to see your schedule here</Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.push("/(trip)/plan" as never)}
          >
            <LinearGradient colors={[BRAND.purple, BRAND.pink]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.emptyBtnText}>Plan a Trip</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  headerBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { ...TYPE.h3, color: BRAND.textPrimary },
  headerSub: { ...TYPE.caption, color: BRAND.textSecondary, marginTop: 2 },
  dayScroll: { maxHeight: 72 },
  dayScrollContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  dayPill: { borderRadius: RADIUS.full, paddingHorizontal: 16, paddingVertical: 8, overflow: "hidden", borderWidth: 1, borderColor: BRAND.border, alignItems: "center", minWidth: 72 },
  dayPillActive: { borderColor: "transparent" },
  dayPillNum: { ...TYPE.label, color: BRAND.textSecondary },
  dayPillNumActive: { color: "#fff" },
  dayPillCount: { ...TYPE.caption, color: BRAND.textMuted, marginTop: 1 },
  dayPillCountActive: { color: "rgba(255,255,255,0.7)" },
  daySummary: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: BRAND.border },
  daySummaryItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "center" },
  daySummaryText: { ...TYPE.caption, color: BRAND.textSecondary },
  daySummaryDivider: { width: 1, height: 16, backgroundColor: BRAND.border },
  listContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 130 },
  timelineRow: { flexDirection: "row", gap: 12, marginBottom: 4 },
  timelineCol: { width: 24, alignItems: "center", paddingTop: 14 },
  timelineDot: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", zIndex: 1 },
  timelineLine: { width: 2, flex: 1, minHeight: 30, marginTop: 4 },
  stopCard: { flex: 1, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: BRAND.border, padding: 14, marginBottom: 12, gap: 6, overflow: "hidden" },
  stopCardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  timeBadge: { borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  timeBadgeText: { ...TYPE.caption, fontFamily: "Satoshi-Bold" },
  catBadge: { borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  catBadgeText: { ...TYPE.caption },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginLeft: "auto" },
  statusGreen: { backgroundColor: BRAND.green },
  statusOrange: { backgroundColor: BRAND.orange },
  stopTitle: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  stopDesc: { ...TYPE.small, color: BRAND.textSecondary },
  stopFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  stopLocation: { flexDirection: "row", alignItems: "center", gap: 4, flex: 1 },
  stopLocationText: { ...TYPE.caption, color: BRAND.textMuted, flex: 1 },
  stopPrice: { ...TYPE.label, color: BRAND.gold },
  stopActions: { flexDirection: "row", gap: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: BRAND.border },
  stopAction: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: BRAND.purple + "15", borderRadius: RADIUS.sm, paddingHorizontal: 10, paddingVertical: 5 },
  stopActionText: { ...TYPE.caption, color: BRAND.purple, fontFamily: "Satoshi-Bold" },
  addBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: RADIUS.lg, padding: 14, borderWidth: 1, borderColor: BRAND.purple + "40", borderStyle: "dashed", overflow: "hidden", marginTop: 4 },
  addBtnText: { ...TYPE.label, color: BRAND.purple },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 40 },
  emptyTitle: { ...TYPE.h3, color: BRAND.textPrimary },
  emptyBody: { ...TYPE.body, color: BRAND.textSecondary, textAlign: "center" },
  emptyBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 24, paddingVertical: 12, borderRadius: RADIUS.full, overflow: "hidden", marginTop: 8 },
  emptyBtnText: { ...TYPE.label, color: "#fff" },
});
