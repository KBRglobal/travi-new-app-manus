// Screen 14 — My Trips (v2)
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, Easing, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image as ExpoImage } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const C = { bg: "#0A0514", purple: "#6443F4", purpleLight: "#9B7EFF", pink: "#F94498", green: "#00C96B", orange: "#FF9327", gold: "#FDCD0A", white: "#FFFFFF", muted: "rgba(255,255,255,0.45)" };
function haptic() { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }

const TABS = ["Upcoming", "Past", "Draft"];
const TRIPS = {
  Upcoming: [
    { id: "1", dest: "Bali, Indonesia", dates: "Mar 15–22, 2025", status: "Confirmed", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80", days: 7, daysUntil: 18, companions: ["You", "Sarah"], checklistDone: 8, checklistTotal: 12, nextStep: null, planningStep: null, planningTotal: null, rating: null, photos: null, spent: null, cashback: null },
    { id: "2", dest: "Tokyo, Japan", dates: "Apr 3–10, 2025", status: "Planning", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80", days: 7, daysUntil: 34, companions: ["You"], checklistDone: 3, checklistTotal: 12, nextStep: "Select Activities", planningStep: 3, planningTotal: 5, rating: null, photos: null, spent: null, cashback: null },
  ],
  Past: [
    { id: "3", dest: "Paris, France", dates: "Dec 10–17, 2024", status: "Completed", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=700&q=80", days: 7, daysUntil: -90, companions: ["You", "Emma"], checklistDone: 12, checklistTotal: 12, nextStep: null, planningStep: null, planningTotal: null, rating: 5, photos: 47, spent: 342, cashback: 6.84 },
    { id: "4", dest: "Dubai, UAE", dates: "Oct 5–9, 2024", status: "Completed", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80", days: 4, daysUntil: -150, companions: ["You", "Mark", "Lior"], checklistDone: 12, checklistTotal: 12, nextStep: null, planningStep: null, planningTotal: null, rating: 4, photos: 31, spent: 890, cashback: 17.80 },
  ],
  Draft: [
    { id: "5", dest: "Santorini, Greece", dates: "Not scheduled", status: "Draft", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&q=80", days: 5, daysUntil: null, companions: ["You", "Sarah"], checklistDone: 1, checklistTotal: 12, nextStep: "Set Travel Dates", planningStep: 1, planningTotal: 5, rating: null, photos: null, spent: null, cashback: null },
  ],
};
type Trip = { id: string; dest: string; dates: string; status: string; img: string; days: number; daysUntil: number | null; companions: string[]; checklistDone: number; checklistTotal: number; nextStep: string | null; planningStep: number | null; planningTotal: number | null; rating: number | null; photos: number | null; spent: number | null; cashback: number | null; };

function ProgressBar({ progress, color = C.purple }: { progress: number; color?: string }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(anim, { toValue: progress, duration: 700, delay: 200, easing: Easing.out(Easing.ease), useNativeDriver: false }).start(); }, []);
  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });
  return (
    <View style={{ height: 5, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
      <Animated.View style={{ height: 5, width, backgroundColor: color, borderRadius: 3 }} />
    </View>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1,2,3,4,5].map(i => <MaterialIcons key={i} name="star" size={13} color={i <= rating ? C.gold : "rgba(255,255,255,0.2)"} />)}
    </View>
  );
}

function LiveDot() {
  const pulse = useRef(new Animated.Value(0.3)).current;
  useEffect(() => { Animated.loop(Animated.sequence([Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }), Animated.timing(pulse, { toValue: 0.3, duration: 900, useNativeDriver: true })])).start(); }, []);
  return (
    <View style={{ width: 16, height: 16, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={{ position: "absolute", width: 16, height: 16, borderRadius: 8, backgroundColor: C.green, opacity: pulse }} />
      <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: C.green }} />
    </View>
  );
}

function TripCard({ trip, onPress, index }: { trip: Trip; onPress: () => void; index: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(anim, { toValue: 1, duration: 380, delay: index * 90, easing: Easing.out(Easing.ease), useNativeDriver: true }).start(); }, []);
  const isLive = trip.status === "Confirmed" && trip.daysUntil !== null && trip.daysUntil <= 1;
  const isPast = trip.status === "Completed";
  const isDraft = trip.status === "Draft";
  const statusColor = STATUS_COLORS[trip.status];
  const progress = trip.checklistDone / trip.checklistTotal;
  const companionText = trip.companions.length === 1 ? "Just you" : trip.companions.length === 2 ? "You + " + trip.companions[1] : "You + " + (trip.companions.length - 1) + " others";
  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], marginBottom: 16 }}>
      <Pressable onPress={() => { haptic(); onPress(); }} style={({ pressed }) => [tc.card, pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] }]}>
        <ExpoImage source={{ uri: trip.img }} style={tc.img} contentFit="cover" transition={300} />
        <LinearGradient colors={["rgba(10,5,20,0.05)", "rgba(10,5,20,0.55)", "rgba(10,5,20,0.97)"]} locations={[0, 0.45, 1]} style={StyleSheet.absoluteFill} />
        {isLive ? (
          <View style={tc.liveBadge}><LiveDot /><Text style={tc.liveText}>LIVE MODE</Text></View>
        ) : (
          <View style={[tc.statusBadge, { backgroundColor: statusColor + "22", borderColor: statusColor + "55" }]}>
            <View style={[tc.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[tc.statusText, { color: statusColor }]}>{trip.status}</Text>
          </View>
        )}
        <View style={tc.content}>
          <Text style={tc.dest}>{trip.dest}</Text>
          <Text style={tc.dates}>{trip.dates}</Text>
          <View style={tc.metaRow}>
            <MaterialIcons name="calendar-today" size={12} color={C.muted} />
            <Text style={tc.metaText}>{trip.days} days</Text>
            <View style={tc.metaDot} />
            <MaterialIcons name="people" size={12} color={C.muted} />
            <Text style={tc.metaText}>{companionText}</Text>
          </View>
          <View style={tc.divider} />
          {trip.status === "Confirmed" && (
            <View style={tc.section}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={tc.sLabel}>Pre-Trip Checklist: {trip.checklistDone}/{trip.checklistTotal} ✓</Text>
                <Text style={[tc.sLabel, { color: C.green }]}>{Math.round(progress * 100)}%</Text>
              </View>
              <ProgressBar progress={progress} color={C.green} />
              {trip.daysUntil !== null && trip.daysUntil > 1 && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 }}>
                  <MaterialIcons name="schedule" size={13} color={C.orange} />
                  <Text style={[tc.sLabel, { color: C.orange }]}>Trip starts in {trip.daysUntil} days</Text>
                </View>
              )}
            </View>
          )}
          {(trip.status === "Planning" || isDraft) && trip.planningStep !== null && (
            <View style={tc.section}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View style={[tc.statusDot, { backgroundColor: isDraft ? C.purpleLight : C.orange }]} />
                <Text style={[tc.sLabel, { color: isDraft ? C.purpleLight : C.orange }]}>{isDraft ? "Draft" : "Planning"} (Step {trip.planningStep} of {trip.planningTotal})</Text>
              </View>
              {trip.nextStep && <Text style={[tc.sLabel, { color: C.muted }]}>Next: {trip.nextStep}</Text>}
              <ProgressBar progress={(trip.planningStep ?? 0) / (trip.planningTotal ?? 5)} color={isDraft ? C.purpleLight : C.orange} />
            </View>
          )}
          {isPast && trip.rating !== null && (
            <View style={tc.section}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Stars rating={trip.rating} />
                <Text style={tc.sLabel}>You rated {trip.rating}/5</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <MaterialIcons name="photo-library" size={13} color={C.muted} />
                <Text style={tc.sLabel}>{trip.photos} photos</Text>
                <View style={tc.metaDot} />
                <MaterialIcons name="account-balance-wallet" size={13} color={C.muted} />
                <Text style={tc.sLabel}>€{trip.spent} spent</Text>
                <View style={tc.metaDot} />
                <MaterialIcons name="savings" size={13} color={C.gold} />
                <Text style={[tc.sLabel, { color: C.gold }]}>€{trip.cashback} back</Text>
              </View>
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
            <Pressable onPress={() => { haptic(); onPress(); }} style={({ pressed }) => [{ flex: 1, borderRadius: 14, overflow: "hidden" }, pressed && { opacity: 0.8 }]}>
              <LinearGradient colors={isDraft ? [C.purpleLight, C.purple] as [string,string] : isPast ? ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.08)"] as [string,string] : [C.purple, C.pink] as [string,string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 12, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: C.white, fontSize: 13, fontFamily: "Satoshi-Bold" }}>{isLive ? "Open Live Dashboard →" : isPast ? "View Memories →" : trip.status === "Planning" || isDraft ? "Continue Planning →" : "Continue Preparation →"}</Text>
              </LinearGradient>
            </Pressable>
            {isPast && (
              <Pressable onPress={() => haptic()} style={({ pressed }) => [tc.bookAgainBtn, pressed && { opacity: 0.8 }]}>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Satoshi-Bold" }}>Book Again</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const tc = StyleSheet.create({
  card: { borderRadius: 24, overflow: "hidden", backgroundColor: "rgba(36,16,62,0.4)", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", shadowColor: "#6443F4", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 8 },
  img: { width: "100%", height: 180 },
  liveBadge: { position: "absolute", top: 14, right: 14, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(0,201,107,0.18)", borderWidth: 1, borderColor: "rgba(0,201,107,0.4)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  liveText: { color: "#00C96B", fontSize: 11, fontFamily: "Satoshi-Bold", letterSpacing: 0.8 },
  statusBadge: { position: "absolute", top: 14, right: 14, flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontFamily: "Satoshi-Bold" },
  content: { padding: 18, paddingTop: 14, gap: 8 },
  dest: { color: "#FFFFFF", fontSize: 22, fontFamily: "Chillax-Bold", lineHeight: 26 },
  dates: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Satoshi-Regular" },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: "rgba(255,255,255,0.2)" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.06)", marginVertical: 2 },
  section: { gap: 6 },
  sLabel: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "Satoshi-Medium" },
  bookAgainBtn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", justifyContent: "center", alignItems: "center" },
});

const STATUS_COLORS: Record<string,string> = { Confirmed: C.green, Planning: C.orange, Completed: "rgba(255,255,255,0.45)", Draft: C.purpleLight };

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const trips = TRIPS[activeTab as keyof typeof TRIPS] || [];
  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: C.bg }]} />
      <View style={s.header}>
        <Text style={s.title}>My Trips</Text>
        <Pressable style={({ pressed }) => [s.addBtn, pressed && { opacity: 0.7 }]} onPress={() => { haptic(); router.push("/(trip)/plan" as any); }}>
          <MaterialIcons name="add" size={22} color={C.white} />
        </Pressable>
      </View>
      <View style={s.tabsWrap}>
        {TABS.map(tab => (
          <Pressable key={tab} style={[s.tab, activeTab === tab && s.tabActive]} onPress={() => { haptic(); setActiveTab(tab); }}>
            <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={s.tabUnderline} />}
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: insets.bottom + 110 }} showsVerticalScrollIndicator={false}>
        {trips.map((trip, i) => <TripCard key={trip.id} trip={trip} index={i} onPress={() => router.push("/(tabs)/trip-hub" as any)} />)}
        {trips.length === 0 && (
          <View style={s.empty}>
            <MaterialIcons name="luggage" size={48} color="rgba(255,255,255,0.15)" />
            <Text style={s.emptyTitle}>No {activeTab.toLowerCase()} trips</Text>
          </View>
        )}
        <Pressable style={({ pressed }) => [s.planBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => { haptic(); router.push("/(trip)/plan" as any); }}>
          <LinearGradient colors={[C.purple, "#7B5CF6", C.pink] as [string,string,string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.planGrad}>
            <MaterialIcons name="add" size={20} color={C.white} />
            <Text style={s.planText}>Plan a New Trip</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: C.white },
  addBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(100,67,244,0.18)", borderWidth: 1, borderColor: "rgba(100,67,244,0.35)", justifyContent: "center", alignItems: "center" },
  tabsWrap: { flexDirection: "row", paddingHorizontal: 20, gap: 4, marginBottom: 4 },
  tab: { paddingHorizontal: 20, paddingVertical: 9, borderRadius: 20, position: "relative" },
  tabActive: { backgroundColor: "rgba(100,67,244,0.15)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  tabText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: "rgba(255,255,255,0.45)" },
  tabTextActive: { color: C.white, fontFamily: "Satoshi-Bold" },
  tabUnderline: { position: "absolute", bottom: 4, left: "25%", right: "25%", height: 2, backgroundColor: C.purpleLight, borderRadius: 1 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyTitle: { color: "rgba(255,255,255,0.4)", fontSize: 18, fontFamily: "Chillax-Bold" },
  planBtn: { marginTop: 8, height: 54, borderRadius: 27, overflow: "hidden", shadowColor: C.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 14, elevation: 8 },
  planGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
  planText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: C.white },
});
