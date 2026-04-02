/**
 * TRAVI — Generated Itinerary Screen
 * Day-by-day timeline with walking/taxi times between stops.
 * Built from the user's swipe selections + DNA profile.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

// Sample generated itinerary — in production this would be built from liked attractions
const SAMPLE_ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: "Mon, Sep 15",
    theme: "Arrive & Explore",
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
    stops: [
      {
        id: "s5", time: "09:00", name: "Burj Khalifa — At the Top", type: "Landmark",
        duration: "2 hrs", image: require("@/assets/destinations/dubai.jpg"), color: "#F94498",
        notes: "Floor 148 ticket. Arrive 15 min early.",
      },
      { mode: "walk", duration: "5 min", distance: "400 m" } as Transfer,
      {
        id: "s6", time: "11:30", name: "Dubai Mall & Aquarium", type: "Experience",
        duration: "2 hrs", image: require("@/assets/interests/shopping.jpg"), color: "#06B6D4",
        notes: "World's largest indoor aquarium. Tunnel walk included.",
      },
      { mode: "taxi", duration: "25 min", distance: "9 km", cost: "$15" } as Transfer,
      {
        id: "s7", time: "14:30", name: "Gold Souk", type: "Shopping",
        duration: "1.5 hrs", image: require("@/assets/interests/shopping.jpg"), color: "#D97706",
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
        duration: "1 hr", image: require("@/assets/destinations/rome.jpg"), color: "#8B5CF6",
        notes: "Wind towers and art galleries. Free entry.",
      },
    ],
  },
  {
    day: 3,
    date: "Wed, Sep 17",
    theme: "Desert & Dunes",
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
        duration: "2 hrs", image: require("@/assets/interests/wellness.jpg"), color: "#10B981",
        notes: "You earned this.",
      },
      { mode: "metro", duration: "18 min", distance: "8 km", cost: "$2" } as Transfer,
      {
        id: "s14", time: "20:00", name: "Dubai Marina Night Walk", type: "Nightlife",
        duration: "2 hrs", image: require("@/assets/interests/nightlife.jpg"), color: "#8B5CF6",
        notes: "Yacht-lined waterfront. Dozens of restaurants.",
      },
    ],
  },
];

function isTransfer(item: Stop | Transfer): item is Transfer {
  return "mode" in item;
}

export default function ItineraryScreen() {
  const insets = useSafeAreaInsets();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const [activeDay, setActiveDay] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [building, setBuilding] = useState(true);

  useEffect(() => {
    // Simulate AI building the itinerary
    const timer = setTimeout(() => {
      setBuilding(false);
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const day = SAMPLE_ITINERARY[activeDay];

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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Your Itinerary</Text>
          <Text style={styles.headerSub}>Dubai · 3 days · {SAMPLE_ITINERARY.reduce((acc, d) => acc + d.stops.filter((s) => !isTransfer(s)).length, 0)} stops</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
          <IconSymbol name="square.and.arrow.up" size={18} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Day selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayTabs}>
        {SAMPLE_ITINERARY.map((d, i) => (
          <TouchableOpacity
            key={d.day}
            style={[styles.dayTab, i === activeDay && styles.dayTabActive]}
            onPress={() => {
              setActiveDay(i);
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.8}
          >
            {i === activeDay && (
              <LinearGradient colors={["#F94498", "#6443F4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            )}
            <Text style={[styles.dayTabNum, i === activeDay && styles.dayTabNumActive]}>Day {d.day}</Text>
            <Text style={[styles.dayTabDate, i === activeDay && styles.dayTabDateActive]}>{d.date.split(",")[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Day theme */}
      <View style={styles.dayThemeWrap}>
        <LinearGradient colors={["rgba(249,68,152,0.15)", "rgba(100,67,244,0.1)"]} style={styles.dayThemeBg} />
        <Text style={styles.dayThemeEmoji}>✨</Text>
        <View>
          <Text style={styles.dayThemeLabel}>{day.date}</Text>
          <Text style={styles.dayThemeName}>{day.theme}</Text>
        </View>
      </View>

      {/* Timeline */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.timeline}>
        {day.stops.map((item, idx) => {
          if (isTransfer(item)) {
            return (
              <View key={`t-${idx}`} style={styles.transferRow}>
                <View style={styles.transferLine} />
                <View style={[styles.transferBubble, { borderColor: TRANSPORT_COLORS[item.mode] + "50" }]}>
                  <LinearGradient
                    colors={[TRANSPORT_COLORS[item.mode] + "20", TRANSPORT_COLORS[item.mode] + "10"]}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Text style={styles.transferIcon}>{TRANSPORT_ICONS[item.mode]}</Text>
                  <View style={styles.transferInfo}>
                    <Text style={[styles.transferMode, { color: TRANSPORT_COLORS[item.mode] }]}>
                      {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}
                      {item.distance ? ` · ${item.distance}` : ""}
                    </Text>
                    <Text style={styles.transferDuration}>{item.duration}{item.cost ? ` · ${item.cost}` : ""}</Text>
                  </View>
                </View>
                <View style={styles.transferLine} />
              </View>
            );
          }

          const stop = item as Stop;
          return (
            <View key={stop.id} style={styles.stopRow}>
              {/* Time column */}
              <View style={styles.timeCol}>
                <Text style={styles.stopTime}>{stop.time}</Text>
                <View style={[styles.timeDot, { backgroundColor: stop.color }]} />
              </View>

              {/* Card */}
              <View style={[styles.stopCard, { borderColor: stop.color + "30" }]}>
                <Image source={stop.image} style={styles.stopImage} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} style={StyleSheet.absoluteFillObject} />

                <View style={styles.stopContent}>
                  <View style={styles.stopTypePill}>
                    <Text style={styles.stopTypeText}>{stop.type}</Text>
                  </View>
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
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.push("/(tabs)/trips" as never);
          }}
          activeOpacity={0.88}
        >
          <LinearGradient colors={["#F94498", "#6443F4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bookBtnGradient}>
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
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  // Building state
  buildingContainer: { alignItems: "center", justifyContent: "center" },
  buildingContent: { alignItems: "center", gap: 16, paddingHorizontal: 40 },
  buildingEmoji: { fontSize: 56 },
  buildingTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", textAlign: "center" },
  buildingSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 20 },
  buildingDots: { flexDirection: "row", gap: 10, marginTop: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#F94498" },
  // Header
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },
  shareBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  // Day tabs
  dayTabs: { paddingHorizontal: 20, gap: 10, paddingBottom: 12 },
  dayTab: { borderRadius: 16, paddingHorizontal: 18, paddingVertical: 10, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", overflow: "hidden", alignItems: "center", gap: 2 },
  dayTabActive: { borderColor: "transparent" },
  dayTabNum: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  dayTabNumActive: { color: "#FFFFFF" },
  dayTabDate: { color: "rgba(255,255,255,0.3)", fontSize: 11 },
  dayTabDateActive: { color: "rgba(255,255,255,0.8)" },
  // Day theme
  dayThemeWrap: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 20, borderRadius: 16, padding: 14, marginBottom: 8, overflow: "hidden", borderWidth: 1, borderColor: "rgba(249,68,152,0.2)" },
  dayThemeBg: { ...StyleSheet.absoluteFillObject },
  dayThemeEmoji: { fontSize: 24 },
  dayThemeLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
  dayThemeName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  // Timeline
  scroll: { flex: 1 },
  timeline: { paddingHorizontal: 20, paddingTop: 8 },
  stopRow: { flexDirection: "row", gap: 12, marginBottom: 4 },
  timeCol: { width: 52, alignItems: "center", paddingTop: 14 },
  stopTime: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700" },
  timeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 6 },
  stopCard: { flex: 1, borderRadius: 20, overflow: "hidden", borderWidth: 1, marginBottom: 4 },
  stopImage: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: 160 },
  stopContent: { padding: 14, paddingTop: 80, gap: 4 },
  stopTypePill: { alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  stopTypeText: { color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  stopName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", lineHeight: 22 },
  stopMeta: { flexDirection: "row", gap: 12 },
  stopDuration: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  stopNote: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 10, marginTop: 4 },
  stopNoteText: { color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 17 },
  // Transfer
  transferRow: { flexDirection: "row", alignItems: "center", marginLeft: 64, gap: 8, marginVertical: 4 },
  transferLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  transferBubble: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, overflow: "hidden" },
  transferIcon: { fontSize: 16 },
  transferInfo: { gap: 1 },
  transferMode: { fontSize: 12, fontWeight: "700" },
  transferDuration: { color: "rgba(255,255,255,0.4)", fontSize: 11 },
  // Bottom bar
  bottomBar: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: "rgba(13,6,40,0.95)", gap: 8 },
  bookBtn: { borderRadius: 20, overflow: "hidden" },
  bookBtnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, gap: 10 },
  bookBtnText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  bookNote: { color: "rgba(255,255,255,0.35)", fontSize: 12, textAlign: "center" },
});
