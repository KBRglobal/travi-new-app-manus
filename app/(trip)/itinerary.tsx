/**
 * TRAVI — Generated Itinerary Screen
 * Day-by-day timeline with walking/taxi times between stops.
 * Built from the user's swipe selections + DNA profile.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

type TransportMode = "walk" | "taxi" | "metro" | "boat";

interface Stop {
  id: string;
  time: string;
  name: string;
  type: string;
  duration: string;
  image: any;
  color: string;
  notes?: string;
}

interface Transfer {
  mode: TransportMode;
  duration: string;
  distance?: string;
  cost?: string;
}

interface DayPlan {
  day: number;
  date: string;
  theme: string;
  emoji: string;
  stops: (Stop | Transfer)[];
}

const TRANSPORT_ICONS: Record<TransportMode, string> = {
  walk: "🚶",
  taxi: "🚕",
  metro: "🚇",
  boat: "⛵",
};

const TRANSPORT_COLORS: Record<TransportMode, string> = {
  walk: "#22C55E",
  taxi: "#F59E0B",
  metro: "#6443F4",
  boat: "#06B6D4",
};

const SAMPLE_ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: "Mon, Sep 15",
    theme: "Arrive & Explore",
    emoji: "🌅",
    stops: [
      {
        id: "s1", time: "14:00", name: "Check in — Burj Al Arab", type: "Hotel",
        duration: "30 min", image: require("@/assets/destinations/dubai.jpg"), color: "#F59E0B",
        notes: "Early check-in arranged. Ask for sea-view room.",
      },
      { mode: "taxi", duration: "12 min", distance: "4.2 km", cost: "$8" } as Transfer,
      {
        id: "s2", time: "15:30", name: "Dubai Frame", type: "Landmark",
        duration: "1.5 hrs", image: require("@/assets/destinations/dubai.jpg"), color: "#F94498",
        notes: "Book tickets in advance to skip the queue.",
      },
      { mode: "walk", duration: "8 min", distance: "600 m" } as Transfer,
      {
        id: "s3", time: "17:30", name: "Zabeel Park Sunset", type: "Nature",
        duration: "1 hr", image: require("@/assets/destinations/bali.jpg"), color: "#22C55E",
        notes: "Best spot for golden hour photos.",
      },
      { mode: "taxi", duration: "20 min", distance: "7 km", cost: "$12" } as Transfer,
      {
        id: "s4", time: "20:00", name: "Dinner — Zuma Dubai", type: "Restaurant",
        duration: "2 hrs", image: { uri: "https://d2xsxph8kpxj0f.cloudfront.net/310519663492248962/5G6CWkFZowcex8zpzMErDd/food_7b47d10b.jpg" }, color: "#F59E0B",
        notes: "Japanese robata. Reservation confirmed.",
      },
    ],
  },
  {
    day: 2,
    date: "Tue, Sep 16",
    theme: "Heights & Souks",
    emoji: "🏙️",
    stops: [
      {
        id: "s5", time: "09:00", name: "Burj Khalifa — At the Top", type: "Landmark",
        duration: "2 hrs", image: require("@/assets/destinations/dubai.jpg"), color: "#F94498",
        notes: "Floor 148 ticket. Arrive 15 min early.",
      },
      { mode: "walk", duration: "5 min", distance: "400 m" } as Transfer,
      {
        id: "s6", time: "11:30", name: "Dubai Mall & Aquarium", type: "Experience",
        duration: "2 hrs", image: require("@/assets/destinations/barcelona.jpg"), color: "#06B6D4",
        notes: "World's largest indoor aquarium. Tunnel walk included.",
      },
      { mode: "taxi", duration: "25 min", distance: "9 km", cost: "$15" } as Transfer,
      {
        id: "s7", time: "14:30", name: "Gold Souk", type: "Shopping",
        duration: "1.5 hrs", image: require("@/assets/destinations/barcelona.jpg"), color: "#D97706",
        notes: "Bargain! Start at 60% of asking price.",
      },
      { mode: "walk", duration: "3 min", distance: "200 m" } as Transfer,
      {
        id: "s8", time: "16:30", name: "Spice Souk", type: "Food & Culture",
        duration: "45 min", image: { uri: "https://d2xsxph8kpxj0f.cloudfront.net/310519663492248962/5G6CWkFZowcex8zpzMErDd/food_7b47d10b.jpg" }, color: "#F97316",
        notes: "Try the saffron and dried limes.",
      },
      { mode: "boat", duration: "10 min", distance: "Dubai Creek", cost: "$1" } as Transfer,
      {
        id: "s9", time: "19:00", name: "Al Fahidi Historic District", type: "History",
        duration: "1 hr", image: require("@/assets/destinations/rome.jpg"), color: "#6443F4",
        notes: "Wind towers and art galleries. Free entry.",
      },
    ],
  },
  {
    day: 3,
    date: "Wed, Sep 17",
    theme: "Desert & Dunes",
    emoji: "🏜️",
    stops: [
      {
        id: "s10", time: "06:00", name: "Desert Safari Pickup", type: "Adventure",
        duration: "30 min", image: require("@/assets/destinations/patagonia.jpg"), color: "#EF4444",
        notes: "Driver meets you at hotel lobby.",
      },
      { mode: "taxi", duration: "45 min", distance: "55 km", cost: "Included" } as Transfer,
      {
        id: "s11", time: "07:30", name: "Dune Bashing & Sandboarding", type: "Extreme",
        duration: "2 hrs", image: require("@/assets/destinations/patagonia.jpg"), color: "#F97316",
        notes: "Deflate tires to 15 PSI before dunes.",
      },
      {
        id: "s12", time: "10:00", name: "Camel Ride & Bedouin Camp", type: "Culture",
        duration: "2 hrs", image: require("@/assets/destinations/dubai.jpg"), color: "#D97706",
        notes: "Traditional breakfast included. Henna tattoos available.",
      },
      { mode: "taxi", duration: "45 min", distance: "55 km", cost: "Included" } as Transfer,
      {
        id: "s13", time: "14:00", name: "Pool Recovery at Hotel", type: "Wellness",
        duration: "2 hrs", image: require("@/assets/destinations/maldives.jpg"), color: "#10B981",
        notes: "You earned this.",
      },
      { mode: "metro", duration: "18 min", distance: "8 km", cost: "$2" } as Transfer,
      {
        id: "s14", time: "20:00", name: "Dubai Marina Night Walk", type: "Nightlife",
        duration: "2 hrs", image: require("@/assets/destinations/tokyo.jpg"), color: "#6443F4",
        notes: "Yacht-lined waterfront. Dozens of restaurants.",
      },
    ],
  },
];

function isTransfer(item: Stop | Transfer): item is Transfer {
  return "mode" in item;
}

// ── Build dynamic itinerary from full liked activity objects ─────────────────
function buildItineraryFromActivities(activities: any[], tripDays: number): DayPlan[] {
  const TRANSPORT_POOL: Transfer[] = [
    { mode: "walk", duration: "10 min", distance: "700 m" },
    { mode: "taxi", duration: "12 min", distance: "4 km", cost: "$8" },
    { mode: "metro", duration: "15 min", distance: "6 km", cost: "$3" },
    { mode: "walk", duration: "7 min", distance: "500 m" },
    { mode: "taxi", duration: "20 min", distance: "8 km", cost: "$12" },
  ];
  const THEMES = [
    { theme: "Arrive & Explore", emoji: "🌅" },
    { theme: "Deep Dive", emoji: "🏙️" },
    { theme: "Hidden Gems", emoji: "💎" },
    { theme: "Culture & Food", emoji: "🍽️" },
    { theme: "Adventure Day", emoji: "🧗" },
    { theme: "Relax & Wander", emoji: "🌿" },
    { theme: "Final Memories", emoji: "✨" },
  ];
  const START_TIMES = ["09:00", "11:00", "14:00", "16:30", "19:00"];
  const stopsPerDay = Math.max(2, Math.min(4, Math.ceil(activities.length / tripDays)));
  const days: DayPlan[] = [];
  let idx = 0;
  for (let d = 0; d < tripDays; d++) {
    const dayActivities = activities.slice(idx, idx + stopsPerDay);
    idx += stopsPerDay;
    const dayStops: (Stop | Transfer)[] = [];
    dayActivities.forEach((act: any, i: number) => {
      const stop: Stop = {
        id: act.id,
        time: START_TIMES[Math.min(i * 2, START_TIMES.length - 1)],
        name: act.name,
        type: act.type ?? "Activity",
        duration: act.duration ?? "2 hrs",
        image: act.image ?? { uri: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" },
        color: act.color ?? "#F94498",
        notes: act.description,
      };
      dayStops.push(stop);
      if (i < dayActivities.length - 1) dayStops.push(TRANSPORT_POOL[i % TRANSPORT_POOL.length]);
    });
    const theme = THEMES[d % THEMES.length];
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() + d);
    const dateStr = dateOffset.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    days.push({ day: d + 1, date: dateStr, theme: theme.theme, emoji: theme.emoji, stops: dayStops });
  }
  return days;
}

// ── Build dynamic itinerary from liked activity IDs ──────────────────────────
function buildItinerary(likedIds: string[], destination: string, tripDays: number): DayPlan[] {
  // Import all attractions from swipe data inline (subset for itinerary building)
  const DEST_IMAGES: Record<string, any> = {
    paris: { uri: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" },
    dubai: require("@/assets/destinations/dubai.jpg"),
    bali: require("@/assets/destinations/bali.jpg"),
    barcelona: require("@/assets/destinations/barcelona.jpg"),
    tokyo: require("@/assets/destinations/tokyo.jpg"),
    kyoto: require("@/assets/destinations/tokyo.jpg"),
    maldives: require("@/assets/destinations/maldives.jpg"),
    santorini: require("@/assets/destinations/barcelona.jpg"),
    "new york": require("@/assets/destinations/rome.jpg"),
  };
  const destImg = DEST_IMAGES[destination.toLowerCase()] || require("@/assets/destinations/dubai.jpg");

  const TRANSPORT_POOL: Transfer[] = [
    { mode: "walk", duration: "10 min", distance: "700 m" },
    { mode: "taxi", duration: "12 min", distance: "4 km", cost: "$8" },
    { mode: "metro", duration: "15 min", distance: "6 km", cost: "$3" },
    { mode: "walk", duration: "7 min", distance: "500 m" },
    { mode: "taxi", duration: "20 min", distance: "8 km", cost: "$12" },
  ];

  const THEMES = [
    { theme: "Arrive & Explore", emoji: "🌅" },
    { theme: "Deep Dive", emoji: "🏙️" },
    { theme: "Hidden Gems", emoji: "💎" },
    { theme: "Culture & Food", emoji: "🍽️" },
    { theme: "Adventure Day", emoji: "🧗" },
    { theme: "Relax & Wander", emoji: "🌿" },
    { theme: "Final Memories", emoji: "✨" },
  ];

  const START_TIMES = ["09:00", "11:00", "14:00", "16:30", "19:00"];
  const days: DayPlan[] = [];

  // Chunk liked IDs into days (max 3 stops per day)
  const stopsPerDay = Math.max(2, Math.min(3, Math.ceil(likedIds.length / tripDays)));
  let stopIdx = 0;

  for (let d = 0; d < tripDays; d++) {
    const dayStops: (Stop | Transfer)[] = [];
    const dayLiked = likedIds.slice(stopIdx, stopIdx + stopsPerDay);
    stopIdx += stopsPerDay;

    dayLiked.forEach((id, i) => {
      // Create stop from ID (we reconstruct basic info from the id pattern)
      const timeIdx = Math.min(i * 2, START_TIMES.length - 1);
      const stop: Stop = {
        id,
        time: START_TIMES[timeIdx],
        name: id.replace(/^[a-z]+\d+$/, id), // fallback to id if no name
        type: "Activity",
        duration: "2 hrs",
        image: destImg,
        color: ["#F94498", "#6443F4", "#F59E0B", "#22C55E", "#06B6D4", "#D97706"][i % 6],
      };
      dayStops.push(stop);
      if (i < dayLiked.length - 1) {
        dayStops.push(TRANSPORT_POOL[i % TRANSPORT_POOL.length]);
      }
    });

    const theme = THEMES[d % THEMES.length];
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() + d);
    const dateStr = dateOffset.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

    days.push({ day: d + 1, date: dateStr, theme: theme.theme, emoji: theme.emoji, stops: dayStops });
  }

  return days;
}

export default function ItineraryScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, destination, liked } = useLocalSearchParams<{ tripId: string; destination: string; liked?: string }>();
  const { state } = useStore();
  const [activeDay, setActiveDay] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [building, setBuilding] = useState(true);

  // Find trip to get number of days
  const trip = state.trips.find((t) => t.id === tripId);
  const tripDays = useMemo(() => {
    if (!trip) return 3;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff || 3);
  }, [trip]);

  // Load full liked activity data from AsyncStorage
  const [likedActivities, setLikedActivities] = useState<any[]>([]);
  useEffect(() => {
    if (tripId) {
      AsyncStorage.getItem(`liked_activities_${tripId}`).then((data) => {
        if (data) {
          try { setLikedActivities(JSON.parse(data)); } catch (_) {}
        }
      });
    }
  }, [tripId]);

  const likedIds = useMemo(() => liked ? liked.split(",").filter(Boolean) : [], [liked]);
  const itinerary = useMemo(() => {
    if (likedActivities.length > 0) return buildItineraryFromActivities(likedActivities, tripDays);
    if (likedIds.length > 0) return buildItinerary(likedIds, destination ?? "dubai", tripDays);
    return SAMPLE_ITINERARY;
  }, [likedActivities, likedIds, destination, tripDays]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBuilding(false);
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const switchDay = (i: number) => {
    setActiveDay(i);
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const day = itinerary[activeDay] ?? itinerary[0];
  const totalStops = itinerary.reduce((acc, d) => acc + d.stops.filter((s) => !isTransfer(s)).length, 0);

  if (building) {
    return (
      <View style={[styles.container, styles.buildingContainer, { paddingTop: insets.top }]}>
        <View style={styles.orb1} />
        <View style={styles.orb2} />
        <View style={styles.buildingContent}>
          <Text style={styles.buildingEmoji}>🗺️</Text>
          <Text style={styles.buildingTitle}>Building your perfect itinerary...</Text>
          <Text style={styles.buildingSub}>Calculating walking routes, booking windows, and hidden gems</Text>
          <View style={styles.buildingDots}>
            {[0, 1, 2].map((i) => (
              <BuildingDot key={i} delay={i * 200} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, paddingTop: insets.top }]}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Compact Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{destination ? destination.charAt(0).toUpperCase() + destination.slice(1) : "Dubai"}</Text>
          <Text style={styles.headerSub}>{itinerary.length} days · {totalStops} stops</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
          <IconSymbol name="square.and.arrow.up" size={18} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Compact Day Pill Selector */}
      <View style={styles.dayRow}>
        {itinerary.map((d, i) => (
          <TouchableOpacity
            key={d.day}
            style={[styles.dayPill, i === activeDay && styles.dayPillActive]}
            onPress={() => switchDay(i)}
            activeOpacity={0.8}
          >
            {i === activeDay && (
              <LinearGradient
                colors={["#F94498", "#6443F4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <Text style={[styles.dayPillText, i === activeDay && styles.dayPillTextActive]}>
              Day {d.day}
            </Text>
            <Text style={[styles.dayPillDate, i === activeDay && styles.dayPillDateActive]}>
              {d.date.split(",")[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Day Theme Bar */}
      <View style={styles.themeBar}>
        <Text style={styles.themeEmoji}>{day.emoji}</Text>
        <View style={styles.themeInfo}>
          <Text style={styles.themeDate}>{day.date}</Text>
          <Text style={styles.themeName}>{day.theme}</Text>
        </View>
        <View style={styles.stopCountBadge}>
          <Text style={styles.stopCountText}>
            {day.stops.filter((s) => !isTransfer(s)).length} stops
          </Text>
        </View>
      </View>

      {/* Timeline */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.timeline}
      >
        {day.stops.map((item, idx) => {
          if (isTransfer(item)) {
            return (
              <View key={`t-${idx}`} style={styles.transferRow}>
                <View style={styles.transferDotLine}>
                  <View style={styles.transferVertLine} />
                </View>
                <View style={[styles.transferChip, { borderColor: TRANSPORT_COLORS[item.mode] + "40" }]}>
                  <LinearGradient
                    colors={[TRANSPORT_COLORS[item.mode] + "18", TRANSPORT_COLORS[item.mode] + "08"]}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Text style={styles.transferIcon}>{TRANSPORT_ICONS[item.mode]}</Text>
                  <Text style={[styles.transferText, { color: TRANSPORT_COLORS[item.mode] }]}>
                    {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}
                    {item.distance ? ` · ${item.distance}` : ""}
                    {" · "}{item.duration}
                    {item.cost ? ` · ${item.cost}` : ""}
                  </Text>
                </View>
              </View>
            );
          }

          const stop = item as Stop;
          return (
            <View key={stop.id} style={styles.stopRow}>
              {/* Left: time + dot + line */}
              <View style={styles.timelineLeft}>
                <Text style={styles.stopTime}>{stop.time}</Text>
                <View style={[styles.stopDot, { backgroundColor: stop.color }]}>
                  <View style={styles.stopDotInner} />
                </View>
                <View style={styles.stopLine} />
              </View>

              {/* Right: card */}
              <View style={styles.stopCardWrap}>
                <View style={[styles.stopCard, { borderColor: stop.color + "25" }]}>
                  {/* Image */}
                  <Image source={stop.image} style={styles.stopImage} resizeMode="cover" />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.9)"]}
                    style={styles.stopImageOverlay}
                  />
                  {/* Type pill */}
                  <View style={[styles.typePill, { backgroundColor: stop.color + "CC" }]}>
                    <Text style={styles.typePillText}>{stop.type}</Text>
                  </View>
                  {/* Content */}
                  <View style={styles.stopContent}>
                    <Text style={styles.stopName}>{stop.name}</Text>
                    <View style={styles.stopMeta}>
                      <Text style={styles.stopDuration}>⏱ {stop.duration}</Text>
                    </View>
                    {stop.notes && (
                      <View style={styles.stopNote}>
                        <Text style={styles.stopNoteText}>💡 {stop.notes}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.push({ pathname: "/(trip)/book", params: { destination: destination ?? "dubai", tripId } } as never);
          }}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={["#F94498", "#6443F4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bookBtnGradient}
          >
            <Text style={styles.bookBtnText}>Book This Trip</Text>
            <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.bookNote}>Commission-free · Your cashback after travel</Text>
      </View>
    </Animated.View>
  );
}

function BuildingDot({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.delay(600 - delay),
      ])
    ).start();
  }, []);
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.2] });
  return <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.5, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.07)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.05)" },
  // Building state
  buildingContainer: { alignItems: "center", justifyContent: "center" },
  buildingContent: { alignItems: "center", gap: 16, paddingHorizontal: 40 },
  buildingEmoji: { fontSize: 56, fontFamily: "Satoshi-Regular" },
  buildingTitle: { color: "#FFFFFF", fontSize: 22, fontFamily: "Chillax-Bold", fontWeight: "800", textAlign: "center" },
  buildingSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 20 },
  buildingDots: { flexDirection: "row", gap: 10, marginTop: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#F94498" },
  // Header — compact
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 17, fontFamily: "Chillax-Bold", fontWeight: "800" },
  headerSub: { color: "rgba(249,68,152,0.75)", fontSize: 11, fontFamily: "Chillax-Semibold", marginTop: 1, fontWeight: "600" },
  shareBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  // Day pill selector — compact horizontal
  dayRow: { flexDirection: "row", paddingHorizontal: 20, gap: 8, marginBottom: 10 },
  dayPill: { flex: 1, borderRadius: 12, paddingVertical: 8, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden", alignItems: "center", gap: 1 },
  dayPillActive: { borderColor: "transparent" },
  dayPillText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Chillax-Bold", fontWeight: "800" },
  dayPillTextActive: { color: "#FFFFFF" },
  dayPillDate: { color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Satoshi-Regular" },
  dayPillDateActive: { color: "rgba(255,255,255,0.85)" },
  // Theme bar
  themeBar: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 12, gap: 10 },
  themeEmoji: { fontSize: 22, fontFamily: "Satoshi-Regular" },
  themeInfo: { flex: 1 },
  themeDate: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  themeName: { color: "#FFFFFF", fontSize: 15, fontFamily: "Chillax-Bold", fontWeight: "800", marginTop: 1 },
  stopCountBadge: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  stopCountText: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  // Timeline
  scroll: { flex: 1 },
  timeline: { paddingLeft: 16, paddingRight: 16, paddingTop: 4 },
  // Stop row
  stopRow: { flexDirection: "row", gap: 10, marginBottom: 2 },
  timelineLeft: { width: 48, alignItems: "center" },
  stopTime: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700", marginBottom: 4 },
  stopDot: { width: 12, height: 12, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  stopDotInner: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "rgba(0,0,0,0.4)" },
  stopLine: { flex: 1, width: 2, backgroundColor: "rgba(255,255,255,0.06)", marginTop: 4 },
  stopCardWrap: { flex: 1, marginBottom: 12 },
  stopCard: { borderRadius: 18, overflow: "hidden", borderWidth: 1 },
  stopImage: { width: "100%", height: 140 },
  stopImageOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, height: 140 },
  typePill: { position: "absolute", top: 10, left: 10, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  typePillText: { color: "#FFFFFF", fontSize: 10, fontFamily: "Chillax-Bold", fontWeight: "800", letterSpacing: 0.5 },
  stopContent: { padding: 12, gap: 4 },
  stopName: { color: "#FFFFFF", fontSize: 15, fontFamily: "Chillax-Bold", fontWeight: "800", lineHeight: 20 },
  stopMeta: { flexDirection: "row" },
  stopDuration: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  stopNote: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 8, padding: 8, marginTop: 2 },
  stopNoteText: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "Satoshi-Regular", lineHeight: 16 },
  // Transfer
  transferRow: { flexDirection: "row", gap: 10, marginBottom: 2, alignItems: "center" },
  transferDotLine: { width: 48, alignItems: "center" },
  transferVertLine: { width: 2, height: 28, backgroundColor: "rgba(255,255,255,0.06)" },
  transferChip: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1, overflow: "hidden", marginBottom: 6 },
  transferIcon: { fontSize: 14, fontFamily: "Satoshi-Regular" },
  transferText: { fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "600", flex: 1 },
  // Bottom bar
  bottomBar: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: "rgba(13,6,40,0.98)", gap: 8, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)" },
  bookBtn: { borderRadius: 18, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  bookBtnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 10 },
  bookBtnText: { color: "#FFFFFF", fontSize: 17, fontFamily: "Chillax-Bold", fontWeight: "900" },
  bookNote: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "Satoshi-Regular", textAlign: "center" },
});
