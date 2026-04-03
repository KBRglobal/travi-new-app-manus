// @ts-nocheck
/**
 * TRAVI Itinerary Builder
 *
 * Day-by-day planner built from Smart Routing engine.
 * Features:
 *  - Auto-generated itinerary via buildSmartItinerary()
 *  - Per-day view with stops, transport, and times
 *  - Move up / move down to reorder stops
 *  - "Auto-Optimize" button to re-run routing
 *  - Book activity inline via ActivityBookingModal
 *  - Pace-aware: shows daily tip based on tripPace
 */

import { useState, useRef, useCallback, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, Image, Platform, FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useStore } from "@/lib/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildSmartItinerary, type RoutingActivity, type RoutedDay, type RoutedStop } from "@/lib/smart-routing";
import { ActivityBookingModal, type BookableActivity } from "@/components/activity-booking";
import type { ActivityCategory } from "@/lib/store";

const { width } = Dimensions.get("window");

// ── Sample activity data for Dubai (would come from destination data in production) ──

const DUBAI_ROUTING_ACTIVITIES: RoutingActivity[] = [
  { id: "a1", title: "Burj Khalifa — At the Top", desc: "Floor 148 observation deck.", price: 400, cashback: 32, rating: 4.9, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.burjkhalifa.ae", categories: ["architecture", "culture"], mustSee: true, area: "Downtown", openTime: "08:30", closeTime: "23:00" },
  { id: "a2", title: "Dubai Fountain Show", desc: "World's largest choreographed fountain.", price: 0, cashback: 0, rating: 4.8, duration: "30min", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.thedubaimall.com", categories: ["culture", "architecture"], mustSee: true, area: "Downtown", openTime: "18:00", closeTime: "23:30" },
  { id: "a3", title: "Desert Safari with BBQ Dinner", desc: "Dune bashing, camel ride, henna, and a Bedouin camp dinner.", price: 120, cashback: 10, rating: 4.8, duration: "6h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["adventure", "culture", "food"], mustSee: false, area: "Desert", openTime: "15:00", closeTime: "22:00" },
  { id: "a4", title: "Dubai Aquarium & Underwater Zoo", desc: "Walk-through tunnel with 33,000 aquatic animals.", price: 85, cashback: 7, rating: 4.7, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["nature", "culture"], mustSee: false, area: "Downtown", openTime: "10:00", closeTime: "22:00" },
  { id: "a5", title: "La Mer Beach", desc: "Trendy beachfront district with cafes and water sports.", price: 0, cashback: 0, rating: 4.6, duration: "Half day", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["beaches", "food", "shopping"], mustSee: false, area: "Jumeirah", openTime: "08:00", closeTime: "22:00" },
  { id: "a6", title: "Gold & Spice Souks", desc: "Old Dubai's legendary markets.", price: 0, cashback: 0, rating: 4.7, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["shopping", "culture"], mustSee: false, area: "Old Dubai", openTime: "09:00", closeTime: "22:00" },
  { id: "a7", title: "Alserkal Avenue Art Walk", desc: "Dubai's creative district — galleries and studios.", price: 0, cashback: 0, rating: 4.5, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["art", "culture"], mustSee: false, area: "Al Quoz", openTime: "10:00", closeTime: "20:00" },
  { id: "a8", title: "Skydive Dubai — Palm Drop Zone", desc: "Tandem skydive over the Palm Jumeirah.", price: 850, cashback: 68, rating: 4.9, duration: "3h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["adventure"], mustSee: false, area: "Palm Jumeirah", openTime: "07:00", closeTime: "17:00" },
  { id: "a9", title: "Talise Ottoman Spa", desc: "Award-winning spa at Jumeirah Zabeel Saray.", price: 280, cashback: 22, rating: 4.9, duration: "3h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["wellness"], mustSee: false, area: "Palm Jumeirah", openTime: "09:00", closeTime: "22:00" },
  { id: "a10", title: "Dubai Opera — Live Show", desc: "World-class venue in Downtown.", price: 150, cashback: 12, rating: 4.8, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.dubaiopera.com", categories: ["music", "art", "culture"], mustSee: false, area: "Downtown", openTime: "19:00", closeTime: "23:00" },
  { id: "a11", title: "Dubai Mall — Full Day", desc: "200+ restaurants, ice rink, VR park, and 1,200+ stores.", price: 0, cashback: 0, rating: 4.6, duration: "Full day", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.thedubaimall.com", categories: ["shopping", "food"], mustSee: false, area: "Downtown", openTime: "10:00", closeTime: "00:00" },
  { id: "a12", title: "Kite Beach Watersports", desc: "Kitesurfing, paddleboarding, and beach volleyball.", price: 60, cashback: 5, rating: 4.6, duration: "Half day", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["beaches", "adventure"], mustSee: false, area: "Jumeirah", openTime: "08:00", closeTime: "18:00" },
];

const TRANSPORT_ICONS: Record<string, string> = { walk: "🚶", taxi: "🚕", metro: "🚇", boat: "⛵" };
const TRANSPORT_COLORS: Record<string, string> = { walk: "#22C55E", taxi: "#F59E0B", metro: "#6443F4", boat: "#06B6D4" };

// ── Component ─────────────────────────────────────────────────────────────────

export default function ItineraryBuilderScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ destination?: string; days?: string; startDate?: string; tripId?: string }>();
  const { state } = useStore();

  const userCategories = (state.profile?.activityCategories ?? []) as ActivityCategory[];
  const userPace = state.profile?.tripPace ?? "balanced";
  const tripDays = parseInt(params.days ?? "3", 10);
  const destination = params.destination ?? "Dubai";

  const haptic = (style = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== "web") Haptics.impactAsync(style);
  };

  const [sourceActivities, setSourceActivities] = useState<RoutingActivity[]>(DUBAI_ROUTING_ACTIVITIES);

  // Load liked activities from AsyncStorage (saved by swipe screen)
  useEffect(() => {
    AsyncStorage.getItem("travi_liked_activities").then((raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const converted: RoutingActivity[] = parsed.map((a: Record<string, unknown>) => ({
            id: String(a.id ?? ""),
            title: String(a.name ?? a.title ?? ""),
            desc: String(a.description ?? a.desc ?? ""),
            price: parseInt(String(a.price ?? "0").replace(/[^0-9]/g, ""), 10),
            cashback: Math.round(parseInt(String(a.price ?? "0").replace(/[^0-9]/g, ""), 10) * 0.08),
            rating: Number(a.rating ?? 4.5),
            duration: String(a.duration ?? "2h"),
            image: a.image ?? require("@/assets/destinations/dubai.jpg"),
            url: String(a.url ?? "https://example.com"),
            categories: (Array.isArray(a.categories) ? a.categories : [String(a.category ?? "culture")]) as ActivityCategory[],
            mustSee: Number(a.rating ?? 0) >= 4.8,
            area: String(a.location ?? destination).split(",")[0],
            openTime: "09:00",
            closeTime: "22:00",
          }));
          setSourceActivities(converted);
        }
      } catch { /* use default */ }
    });
  }, []);

  // Build initial itinerary
  const buildItinerary = useCallback(() => {
    return buildSmartItinerary(sourceActivities, {
      pace: userPace,
      days: tripDays,
      userCategories,
      startDate: params.startDate,
    });
  }, [userPace, tripDays, userCategories, params.startDate, sourceActivities]);

  const [days, setDays] = useState<RoutedDay[]>(() => buildItinerary());

  // Rebuild when liked activities load
  useEffect(() => {
    if (sourceActivities !== DUBAI_ROUTING_ACTIVITIES) {
      setDays(buildItinerary());
    }
  }, [sourceActivities]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [bookingActivity, setBookingActivity] = useState<BookableActivity | null>(null);
  const [bookingVisible, setBookingVisible] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const optimizeAnim = useRef(new Animated.Value(0)).current;

  const currentDay = days[selectedDay];

  const handleAutoOptimize = () => {
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    setOptimizing(true);
    Animated.timing(optimizeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }).start(() => {
      const rebuilt = buildItinerary();
      setDays(rebuilt);
      setOptimizing(false);
      optimizeAnim.setValue(0);
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });
  };

  const handleMoveUp = (stopIndex: number) => {
    if (stopIndex === 0) return;
    haptic();
    setDays((prev) => {
      const updated = [...prev];
      const dayStops = [...updated[selectedDay].stops];
      const temp = dayStops[stopIndex];
      dayStops[stopIndex] = dayStops[stopIndex - 1];
      dayStops[stopIndex - 1] = temp;
      updated[selectedDay] = { ...updated[selectedDay], stops: dayStops };
      return updated;
    });
  };

  const handleMoveDown = (stopIndex: number) => {
    if (!currentDay || stopIndex >= currentDay.stops.length - 1) return;
    haptic();
    setDays((prev) => {
      const updated = [...prev];
      const dayStops = [...updated[selectedDay].stops];
      const temp = dayStops[stopIndex];
      dayStops[stopIndex] = dayStops[stopIndex + 1];
      dayStops[stopIndex + 1] = temp;
      updated[selectedDay] = { ...updated[selectedDay], stops: dayStops };
      return updated;
    });
  };

  const handleBookActivity = (stop: RoutedStop) => {
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    setBookingActivity({
      id: stop.id,
      title: stop.title,
      desc: stop.desc,
      price: stop.price,
      cashback: stop.cashback,
      rating: stop.rating,
      reviews: 1000,
      duration: stop.duration,
      image: stop.image,
      url: stop.url,
    });
    setBookingVisible(true);
  };

  const handleRemoveStop = (stopIndex: number) => {
    haptic();
    setDays((prev) => {
      const updated = [...prev];
      const dayStops = updated[selectedDay].stops.filter((_, i) => i !== stopIndex);
      updated[selectedDay] = { ...updated[selectedDay], stops: dayStops };
      return updated;
    });
  };

  const spinInterpolate = optimizeAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  const paceEmoji = userPace === "slow" ? "🌿" : userPace === "full" ? "🔥" : "⚡";
  const paceLabel = userPace === "slow" ? "Slow & Deep" : userPace === "full" ? "Full Send" : "Balanced";

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={S.backBtn} onPress={() => { haptic(); router.back(); }} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#1A0B2E" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>{destination}</Text>
          <Text style={S.headerSub}>{tripDays}-day itinerary · {paceEmoji} {paceLabel}</Text>
        </View>
        <TouchableOpacity style={S.optimizeBtn} onPress={handleAutoOptimize} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(100,67,244,0.4)", "rgba(249,68,152,0.3)"]} style={StyleSheet.absoluteFillObject} />
          <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={16} color="#1A0B2E" />
          </Animated.View>
          <Text style={S.optimizeBtnText}>{optimizing ? "Routing..." : "Auto-Route"}</Text>
        </TouchableOpacity>
      </View>

      {/* Day selector */}
      <View style={S.daySelectorWrap}>
        <FlatList
          data={days}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.daySelector}
          keyExtractor={(item) => item.day.toString()}
          renderItem={({ item, index }) => {
            const isActive = index === selectedDay;
            return (
              <TouchableOpacity
                style={[S.dayTab, isActive && S.dayTabActive]}
                onPress={() => { haptic(); setSelectedDay(index); }}
                activeOpacity={0.8}
              >
                {isActive && (
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                )}
                <Text style={S.dayTabEmoji}>{item.emoji}</Text>
                <Text style={[S.dayTabLabel, isActive && S.dayTabLabelActive]}>Day {item.day}</Text>
                <Text style={[S.dayTabDate, isActive && S.dayTabDateActive]}>{item.date.split(",")[0]}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Day summary strip */}
      {currentDay && (
        <View style={S.daySummary}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.daySummaryTheme}>{currentDay.emoji} {currentDay.theme}</Text>
          <View style={S.daySummaryMeta}>
            <Text style={S.daySummaryItem}>📍 {currentDay.area}</Text>
            <Text style={S.daySummaryItem}>💰 ${currentDay.totalCost}</Text>
            {currentDay.totalCashback > 0 && <Text style={S.daySummaryCashback}>+${currentDay.totalCashback} back</Text>}
            <Text style={S.daySummaryItem}>🚶 {currentDay.walkingMinutes}min walking</Text>
          </View>
        </View>
      )}

      {/* Stops list */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.stopsList}>
        {currentDay?.stops.map((stop, idx) => (
          <View key={stop.id + idx} style={S.stopWrapper}>
            {/* Transport connector (before stop) */}
            {stop.transport && (
              <View style={S.transportRow}>
                <View style={[S.transportLine, { backgroundColor: TRANSPORT_COLORS[stop.transport.mode] + "40" }]} />
                <View style={[S.transportBadge, { backgroundColor: TRANSPORT_COLORS[stop.transport.mode] + "22", borderColor: TRANSPORT_COLORS[stop.transport.mode] + "60" }]}>
                  <Text style={S.transportEmoji}>{TRANSPORT_ICONS[stop.transport.mode]}</Text>
                  <Text style={[S.transportText, { color: TRANSPORT_COLORS[stop.transport.mode] }]}>
                    {stop.transport.minutes} min{stop.transport.cost > 0 ? ` · $${stop.transport.cost}` : " · free"}
                  </Text>
                </View>
              </View>
            )}

            {/* Stop card */}
            <View style={S.stopCard}>
              <Image source={stop.image} style={S.stopImage} resizeMode="cover" />
              <LinearGradient colors={["transparent", "rgba(13,6,40,0.9)"]} locations={[0.4, 1]} style={StyleSheet.absoluteFillObject} />

              {/* Must-see badge */}
              {stop.mustSee && (
                <View style={S.mustSeeBadge}>
                  <Text style={S.mustSeeBadgeText}>⭐ Must-See</Text>
                </View>
              )}

              {/* Reorder controls */}
              <View style={S.reorderControls}>
                <TouchableOpacity style={[S.reorderBtn, idx === 0 && S.reorderBtnDisabled]} onPress={() => handleMoveUp(idx)} activeOpacity={0.8}>
                  <IconSymbol name="chevron.up" size={14} color={idx === 0 ? "rgba(255,255,255,0.06)" : "#1A0B2E"} />
                </TouchableOpacity>
                <TouchableOpacity style={[S.reorderBtn, idx === (currentDay?.stops.length ?? 0) - 1 && S.reorderBtnDisabled]} onPress={() => handleMoveDown(idx)} activeOpacity={0.8}>
                  <IconSymbol name="chevron.down" size={14} color={idx === (currentDay?.stops.length ?? 0) - 1 ? "rgba(255,255,255,0.06)" : "#1A0B2E"} />
                </TouchableOpacity>
              </View>

              {/* Remove button */}
              <TouchableOpacity style={S.removeBtn} onPress={() => handleRemoveStop(idx)} activeOpacity={0.8}>
                <IconSymbol name="xmark" size={12} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>

              <View style={S.stopContent}>
                <View style={S.stopTimeRow}>
                  <Text style={S.stopTime}>{stop.time}</Text>
                  <Text style={S.stopEndTime}>→ {stop.endTime}</Text>
                  <Text style={S.stopDuration}>{stop.duration}</Text>
                </View>
                <Text style={S.stopTitle}>{stop.title}</Text>
                <Text style={S.stopArea}>📍 {stop.area}</Text>

                <View style={S.stopFooter}>
                  <View style={S.stopPriceRow}>
                    {stop.price > 0 ? (
                      <>
                        <Text style={S.stopPrice}>${stop.price}</Text>
                        {stop.cashback > 0 && <Text style={S.stopCashback}>+${stop.cashback} back</Text>}
                      </>
                    ) : (
                      <Text style={S.stopFree}>Free</Text>
                    )}
                  </View>
                  {stop.price > 0 && (
                    <TouchableOpacity style={S.bookBtn} onPress={() => handleBookActivity(stop)} activeOpacity={0.85}>
                      <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                      <Text style={S.bookBtnText}>Book Now</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Add activity hint */}
        <TouchableOpacity style={S.addActivityBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="plus.circle.fill" size={22} color="rgba(192,132,252,0.8)" />
          <Text style={S.addActivityText}>Add activity from destination</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[S.bottomCta, { paddingBottom: insets.bottom + 12 }]}>
        <LinearGradient colors={["rgba(13,6,40,0)", "rgba(13,6,40,0.98)"]} locations={[0, 0.3]} style={S.bottomCtaGradient} />
        <View style={S.bottomCtaRow}>
          <View style={S.totalSummary}>
            <Text style={S.totalLabel}>Total trip</Text>
            <Text style={S.totalValue}>${days.reduce((sum, d) => sum + d.totalCost, 0).toLocaleString()}</Text>
            {days.reduce((sum, d) => sum + d.totalCashback, 0) > 0 && (
              <Text style={S.totalCashback}>+${days.reduce((sum, d) => sum + d.totalCashback, 0)} cashback</Text>
            )}
          </View>
          <TouchableOpacity
            style={S.confirmTripBtn}
            onPress={() => { haptic(Haptics.ImpactFeedbackStyle.Medium); router.push({ pathname: "/(trip)/post-booking", params: { destination, totalCost: String(days.reduce((s, d) => s + d.totalCost, 0)) } } as never); }}
            activeOpacity={0.88}
          >
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.confirmTripBtnText}>Confirm Itinerary →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Booking modal */}
      <ActivityBookingModal
        activity={bookingActivity}
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
      />
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: 400, height: 400, borderRadius: 200, top: -150, right: -100, backgroundColor: "rgba(100,67,244,0.07)" },
  orb2: { position: "absolute", width: 250, height: 250, borderRadius: 125, bottom: 100, left: -80, backgroundColor: "rgba(249,68,152,0.05)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 1 },
  optimizeBtn: { borderRadius: 14, overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  optimizeBtnText: { color: "#1A0B2E", fontSize: 12, fontWeight: "700" },

  daySelectorWrap: { marginBottom: 0 },
  daySelector: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  dayTab: { borderRadius: 16, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 10, alignItems: "center", minWidth: 80, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.06)" },
  dayTabActive: { borderColor: "transparent" },
  dayTabEmoji: { fontSize: 18, marginBottom: 2 },
  dayTabLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  dayTabLabelActive: { color: "#1A0B2E" },
  dayTabDate: { color: "rgba(255,255,255,0.55)", fontSize: 10, marginTop: 1 },
  dayTabDateActive: { color: "rgba(255,255,255,0.7)" },

  daySummary: { marginHorizontal: 16, marginBottom: 12, borderRadius: 16, overflow: "hidden", padding: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  daySummaryTheme: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", marginBottom: 6, fontFamily: "Chillax-Bold" },
  daySummaryMeta: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  daySummaryItem: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  daySummaryCashback: { color: "#FBBF24", fontSize: 12, fontWeight: "700" },

  stopsList: { paddingHorizontal: 16 },
  stopWrapper: { marginBottom: 4 },

  transportRow: { flexDirection: "row", alignItems: "center", paddingVertical: 4, paddingLeft: 20, gap: 10, marginBottom: 4 },
  transportLine: { width: 2, height: 24, borderRadius: 1 },
  transportBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1 },
  transportEmoji: { fontSize: 14 },
  transportText: { fontSize: 12, fontWeight: "700" },

  stopCard: { borderRadius: 20, overflow: "hidden", marginBottom: 8, height: 200 },
  stopImage: { width: "100%", height: 200 },
  mustSeeBadge: { position: "absolute", top: 12, left: 12, backgroundColor: "rgba(255,215,0,0.9)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  mustSeeBadgeText: { color: "#000", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  reorderControls: { position: "absolute", top: 12, right: 44, flexDirection: "column", gap: 4 },
  reorderBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  reorderBtnDisabled: { opacity: 0.3 },
  removeBtn: { position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  stopContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, gap: 4 },
  stopTimeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  stopTime: { color: "#1A0B2E", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  stopEndTime: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  stopDuration: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginLeft: "auto" },
  stopTitle: { color: "#1A0B2E", fontSize: 16, fontWeight: "800", lineHeight: 20, fontFamily: "Chillax-Bold" },
  stopArea: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  stopFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  stopPriceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  stopPrice: { color: "#1A0B2E", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  stopCashback: { color: "#FBBF24", fontSize: 11, fontWeight: "700" },
  stopFree: { color: "#22C55E", fontSize: 14, fontWeight: "700" },
  bookBtn: { borderRadius: 12, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", paddingHorizontal: 14, paddingVertical: 8 },
  bookBtnText: { color: "#1A0B2E", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },

  addActivityBtn: { borderRadius: 18, overflow: "hidden", padding: 16, flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 1.5, borderColor: "rgba(100,67,244,0.3)", borderStyle: "dashed", marginTop: 8 },
  addActivityText: { color: "rgba(192,132,252,0.7)", fontSize: 14, fontWeight: "700" },

  bottomCta: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 20 },
  bottomCtaGradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  bottomCtaRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  totalSummary: { flex: 1 },
  totalLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  totalValue: { color: "#1A0B2E", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  totalCashback: { color: "#FBBF24", fontSize: 12, fontWeight: "700" },
  confirmTripBtn: { borderRadius: 18, overflow: "hidden", paddingHorizontal: 20, paddingVertical: 16 },
  confirmTripBtnText: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
