// @ts-nocheck
import { useRef, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Share,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";

const { width } = Dimensions.get("window");

const DESTINATION_DATA: Record<string, {
  name: string; country: string; image: string; flag: string;
  days: Array<{
    date: string; label: string;
    stops: Array<{ time: string; name: string; type: string; duration: string; travelNext: string; travelMode: string; notes: string; cost: string }>;
  }>;
}> = {
  dubai: {
    name: "Dubai", country: "UAE", flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    days: [
      {
        date: "Day 1", label: "Arrival & Downtown",
        stops: [
          { time: "14:00", name: "Check-in — Address Downtown", type: "Hotel", duration: "1h", travelNext: "5 min walk", travelMode: "🚶", notes: "Stunning Burj Khalifa view from room", cost: "$0" },
          { time: "16:00", name: "Burj Khalifa — Level 124", type: "Landmark", duration: "2h", travelNext: "2 min walk", travelMode: "🚶", notes: "Book tickets in advance to skip queue", cost: "$40" },
          { time: "19:00", name: "Dubai Fountain Show", type: "Experience", duration: "45 min", travelNext: "10 min walk", travelMode: "🚶", notes: "Free show every 30 min after sunset", cost: "Free" },
          { time: "20:30", name: "Dinner — Zuma Dubai", type: "Restaurant", duration: "2h", travelNext: "", travelMode: "", notes: "Japanese robata. Reservation confirmed.", cost: "$120" },
        ],
      },
      {
        date: "Day 2", label: "Desert & Culture",
        stops: [
          { time: "08:00", name: "Gold Souk & Spice Souk", type: "Shopping", duration: "2h", travelNext: "15 min taxi", travelMode: "🚕", notes: "Bargain hard — start at 40% of asking price", cost: "$50" },
          { time: "11:00", name: "Dubai Museum", type: "Culture", duration: "1.5h", travelNext: "45 min drive", travelMode: "🚕", notes: "AED 3 entry — best value in Dubai", cost: "$1" },
          { time: "15:00", name: "Desert Safari & BBQ Dinner", type: "Adventure", duration: "5h", travelNext: "1h drive back", travelMode: "🚐", notes: "Dune bashing + camel ride + sunset + BBQ", cost: "$80" },
        ],
      },
    ],
  },
  kyoto: {
    name: "Kyoto", country: "Japan", flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    days: [
      {
        date: "Day 1", label: "Temples & Shrines",
        stops: [
          { time: "07:00", name: "Fushimi Inari Shrine", type: "Temple", duration: "2.5h", travelNext: "20 min train", travelMode: "🚃", notes: "Go early to avoid crowds. Full hike = 2h", cost: "Free" },
          { time: "11:00", name: "Nishiki Market Food Tour", type: "Food", duration: "1.5h", travelNext: "10 min walk", travelMode: "🚶", notes: "Try tamagoyaki and pickled vegetables", cost: "$25" },
          { time: "14:00", name: "Kinkaku-ji Golden Pavilion", type: "Temple", duration: "1.5h", travelNext: "15 min bus", travelMode: "🚌", notes: "Most photographed spot in Japan", cost: "$4" },
          { time: "18:00", name: "Gion District Evening Walk", type: "Culture", duration: "2h", travelNext: "", travelMode: "", notes: "Best chance to spot a geisha after 18:00", cost: "Free" },
        ],
      },
    ],
  },
};

const TRAVEL_MODE_COLORS: Record<string, string> = {
  "🚶": "#22C55E",
  "🚕": "#F97316",
  "🚃": "#6443F4",
  "🚌": "#06B6D4",
  "🚐": "#F94498",
  "⛵": "#0EA5E9",
};

export default function TripDetailScreen() {
  const { destination = "dubai", tripName = "My Dubai Trip" } = useLocalSearchParams<{ destination: string; tripName: string }>();
  const [activeDay, setActiveDay] = useState(0);
  const data = DESTINATION_DATA[destination] ?? DESTINATION_DATA["dubai"];
  const day = data.days[activeDay] ?? data.days[0];

  const totalCost = day.stops.reduce((sum, s) => {
    const n = parseFloat(s.cost.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my ${data.name} itinerary built with TRAVI!\n\n${day.stops.map((s) => `${s.time} — ${s.name}`).join("\n")}\n\nBuilt with TRAVI — the travel agent that works for you.`,
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <Image source={{ uri: data.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
        <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]} style={StyleSheet.absoluteFillObject} />

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={20} color="#1A0B2E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.7}>
          <IconSymbol name="paperplane.fill" size={18} color="#1A0B2E" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.heroFlag}>{data.flag}</Text>
          <Text style={styles.heroTitle}>{tripName as string}</Text>
          <Text style={styles.heroSub}>{data.name}, {data.country}</Text>
        </View>
      </View>

      {/* Day tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
        {data.days.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dayTab, i === activeDay && styles.dayTabActive]}
            onPress={() => setActiveDay(i)}
            activeOpacity={0.8}
          >
            {i === activeDay && (
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            )}
            <Text style={[styles.dayTabText, i === activeDay && styles.dayTabTextActive]}>{d.date}</Text>
            <Text style={[styles.dayTabLabel, i === activeDay && styles.dayTabLabelActive]}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Timeline */}
      <ScrollView style={styles.timeline} contentContainerStyle={{ padding: 20, gap: 0, paddingBottom: 130 }}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayHeaderTitle}>{day.date} — {day.label}</Text>
          <Text style={styles.dayHeaderCost}>Est. ${totalCost}</Text>
        </View>

        {day.stops.map((stop, i) => (
          <View key={i} style={styles.stopWrap}>
            {/* Time line */}
            <View style={styles.timelineLeft}>
              <Text style={styles.stopTime}>{stop.time}</Text>
              <View style={styles.timelineDot} />
              {i < day.stops.length - 1 && <View style={styles.timelineLine} />}
            </View>

            {/* Stop card */}
            <View style={styles.stopCard}>
              <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
              <View style={styles.stopHeader}>
                <View style={styles.stopInfo}>
                  <Text style={styles.stopName}>{stop.name}</Text>
                  <Text style={styles.stopType}>{stop.type} · {stop.duration}</Text>
                </View>
                <Text style={styles.stopCost}>{stop.cost}</Text>
              </View>
              {stop.notes ? <Text style={styles.stopNotes}>💡 {stop.notes}</Text> : null}

              {/* Travel to next */}
              {stop.travelNext ? (
                <View style={[styles.travelBadge, { backgroundColor: (TRAVEL_MODE_COLORS[stop.travelMode] ?? "#6443F4") + "22" }]}>
                  <Text style={styles.travelMode}>{stop.travelMode}</Text>
                  <Text style={[styles.travelText, { color: TRAVEL_MODE_COLORS[stop.travelMode] ?? "#6443F4" }]}>{stop.travelNext} to next stop</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Book CTA */}
      <View style={styles.bookBar}>
        <LinearGradient colors={["rgba(13,6,40,0.95)", "rgba(13,6,40,1)"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => router.push({ pathname: "/(trip)/book", params: { destination } } as never)}
          activeOpacity={0.88}
        >
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bookGradient}>
            <Text style={styles.bookText}>Book This Trip — Get Cashback →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  hero: { height: 220, overflow: "hidden" },
  backBtn: { position: "absolute", top: 56, left: 20, zIndex: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  shareBtn: { position: "absolute", top: 56, right: 20, zIndex: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  heroContent: { position: "absolute", bottom: 20, left: 20, gap: 2 },
  heroFlag: { fontSize: 28 },
  heroTitle: { color: "#1A0B2E", fontSize: 22, fontWeight: "800", fontFamily: "Chillax-Bold" },
  heroSub: { color: "rgba(255,255,255,0.6)", fontSize: 14 },
  dayTabs: { maxHeight: 72, flexGrow: 0 },
  dayTab: { borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden", minWidth: 100, alignItems: "center" },
  dayTabActive: { borderColor: "transparent" },
  dayTabText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  dayTabTextActive: { color: "#1A0B2E" },
  dayTabLabel: { color: "rgba(255,255,255,0.55)", fontSize: 10 },
  dayTabLabelActive: { color: "rgba(255,255,255,0.8)" },
  timeline: { flex: 1 },
  dayHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  dayHeaderTitle: { color: "#1A0B2E", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  dayHeaderCost: { color: "#C084FC", fontSize: 14, fontWeight: "600" },
  stopWrap: { flexDirection: "row", gap: 12, minHeight: 80 },
  timelineLeft: { width: 56, alignItems: "center", gap: 0 },
  stopTime: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600", marginBottom: 6 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#6443F4", borderWidth: 2, borderColor: "#C084FC" },
  timelineLine: { width: 2, flex: 1, backgroundColor: "rgba(100,67,244,0.3)", marginTop: 4, marginBottom: 0 },
  stopCard: { flex: 1, borderRadius: 16, padding: 14, gap: 8, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden", marginBottom: 12 },
  stopHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  stopInfo: { flex: 1, gap: 2 },
  stopName: { color: "#1A0B2E", fontSize: 15, fontWeight: "700" },
  stopType: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  stopCost: { color: "#22C55E", fontSize: 14, fontWeight: "700" },
  stopNotes: { color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 18 },
  travelBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  travelMode: { fontSize: 14 },
  travelText: { fontSize: 12, fontWeight: "600" },
  bookBar: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 130, overflow: "hidden" },
  bookBtn: { borderRadius: 18, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  bookGradient: { paddingVertical: 18, alignItems: "center", borderRadius: 18 },
  bookText: { color: "#1A0B2E", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
