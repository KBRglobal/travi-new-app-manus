import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Dimensions
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
type EventType = "flight" | "hotel" | "food" | "activity" | "transport" | "free";

interface ScheduleEvent {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  subtitle?: string;
  type: EventType;
  location?: string;
  duration?: string;
  confirmed: boolean;
  note?: string;
  price?: number;
  image?: string;
}

interface Day {
  id: string;
  date: string;
  dayLabel: string;
  city: string;
  weather: string;
  temp: string;
  events: ScheduleEvent[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DAYS: Day[] = [
  {
    id: "d1", date: "Mar 18", dayLabel: "Day 1", city: "Tokyo", weather: "sun.max.fill", temp: "18°",
    events: [
      { id: "e1", time: "06:30", title: "Flight TLV → TYO", subtitle: "El Al LY081 · Economy", type: "flight", duration: "11h 20m", confirmed: true, price: 890 },
      { id: "e2", time: "18:50", title: "Land at Narita Airport", subtitle: "Terminal 1 · Gate B12", type: "flight", confirmed: true },
      { id: "e3", time: "20:30", title: "Check-in Airbnb Shinjuku", subtitle: "4.9★ · Superhost · 2BR", type: "hotel", location: "Shinjuku, Tokyo", confirmed: true, price: 210 },
      { id: "e4", time: "22:00", title: "Ramen at Ichiran", subtitle: "Solo booth experience", type: "food", location: "Shinjuku", confirmed: false, price: 15 },
    ],
  },
  {
    id: "d2", date: "Mar 19", dayLabel: "Day 2", city: "Tokyo", weather: "cloud.rain.fill", temp: "14°",
    events: [
      { id: "e5", time: "09:00", title: "TeamLab Planets", subtitle: "Digital art museum · Pre-booked", type: "activity", location: "Toyosu", duration: "2h", confirmed: true, price: 30, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300" },
      { id: "e6", time: "12:30", title: "Lunch at Tsukiji Market", subtitle: "Fresh sushi & street food", type: "food", location: "Tsukiji", confirmed: false },
      { id: "e7", time: "15:00", title: "Shibuya Crossing & Shopping", subtitle: "Shibuya 109, Harajuku", type: "activity", location: "Shibuya", duration: "3h", confirmed: false },
      { id: "e8", time: "19:00", title: "Dinner at Sushi Saito", subtitle: "Reservation confirmed · 3-star Michelin", type: "food", location: "Roppongi", confirmed: true, price: 180 },
    ],
  },
  {
    id: "d3", date: "Mar 20", dayLabel: "Day 3", city: "Kyoto", weather: "sun.max.fill", temp: "16°",
    events: [
      { id: "e9", time: "08:00", title: "Shinkansen to Kyoto", subtitle: "Nozomi N700S · Reserved seats", type: "transport", duration: "2h 15m", confirmed: true, price: 140 },
      { id: "e10", time: "10:30", title: "Fushimi Inari Shrine", subtitle: "1000 torii gates hike", type: "activity", location: "Fushimi", duration: "2h", confirmed: false },
      { id: "e11", time: "14:00", title: "Arashiyama Bamboo Grove", subtitle: "Rickshaw tour available", type: "activity", location: "Arashiyama", confirmed: false },
      { id: "e12", time: "17:00", title: "Free Time", subtitle: "Explore Gion district", type: "free", confirmed: false },
      { id: "e13", time: "19:30", title: "Traditional Kaiseki Dinner", subtitle: "Ryokan restaurant · Tatami room", type: "food", location: "Gion", confirmed: true, price: 95 },
    ],
  },
  {
    id: "d4", date: "Mar 21", dayLabel: "Day 4", city: "Tokyo", weather: "sun.max.fill", temp: "20°",
    events: [
      { id: "e14", time: "10:00", title: "Return to Tokyo", subtitle: "Shinkansen · Hikari", type: "transport", duration: "2h 40m", confirmed: true },
      { id: "e15", time: "14:00", title: "Akihabara Electronics", subtitle: "Anime, gadgets & arcades", type: "activity", location: "Akihabara", confirmed: false },
      { id: "e16", time: "18:00", title: "Check-out Airbnb", subtitle: "Luggage storage available", type: "hotel", confirmed: true },
      { id: "e17", time: "22:00", title: "Flight TYO → TLV", subtitle: "El Al LY082 · Economy", type: "flight", duration: "11h 30m", confirmed: true, price: 890 },
    ],
  },
];

const EVENT_CONFIG: Record<EventType, { icon: string; color: string; bg: string }> = {
  flight:    { icon: "airplane",     color: BRAND.purple, bg: BRAND.purple + "20" },
  hotel:     { icon: "bed.double.fill", color: "#01BEFF", bg: "#01BEFF20" },
  food:      { icon: "fork.knife",   color: BRAND.orange, bg: BRAND.orange + "20" },
  activity:  { icon: "ticket.fill",  color: BRAND.pink,   bg: BRAND.pink + "20" },
  transport: { icon: "tram.fill",    color: BRAND.cyan,   bg: BRAND.cyan + "20" },
  free:      { icon: "sparkles",     color: "#FFD112",    bg: "#FFD11220" },
};

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event, isLast }: { event: ScheduleEvent; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = EVENT_CONFIG[event.type];

  return (
    <View style={S.eventRow}>
      {/* Timeline */}
      <View style={S.timelineCol}>
        <Text style={S.eventTime}>{event.time}</Text>
        <View style={[S.eventDot, { backgroundColor: cfg.color }]} />
        {!isLast && <View style={[S.eventLine, { backgroundColor: cfg.color + "30" }]} />}
      </View>

      {/* Card */}
      <TouchableOpacity
        style={[S.eventCard, !event.confirmed && S.eventCardUnconfirmed]}
        onPress={() => {
          if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setExpanded(!expanded);
        }}
        activeOpacity={0.85}
      >
        <LinearGradient colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />

        {event.image && (
          <Image source={{ uri: event.image }} style={S.eventImage} resizeMode="cover" />
        )}

        <View style={S.eventCardContent}>
          <View style={[S.eventIconWrap, { backgroundColor: cfg.bg }]}>
            <IconSymbol name={cfg.icon as any} size={16} color={cfg.color} />
          </View>
          <View style={S.eventInfo}>
            <View style={S.eventTitleRow}>
              <Text style={S.eventTitle} numberOfLines={1}>{event.title}</Text>
              {event.price && <Text style={[S.eventPrice, { color: cfg.color }]}>${event.price}</Text>}
            </View>
            {event.subtitle && <Text style={S.eventSubtitle} numberOfLines={expanded ? 3 : 1}>{event.subtitle}</Text>}
            <View style={S.eventMeta}>
              {event.location && (
                <View style={S.metaItem}>
                  <IconSymbol name="location.fill" size={10} color={BRAND.textMuted} />
                  <Text style={S.metaText}>{event.location}</Text>
                </View>
              )}
              {event.duration && (
                <View style={S.metaItem}>
                  <IconSymbol name="clock.fill" size={10} color={BRAND.textMuted} />
                  <Text style={S.metaText}>{event.duration}</Text>
                </View>
              )}
              <View style={[S.confirmBadge, { backgroundColor: event.confirmed ? "rgba(2,166,92,0.15)" : "rgba(255,211,18,0.12)" }]}>
                <Text style={[S.confirmText, { color: event.confirmed ? BRAND.green : "#FFD112" }]}>
                  {event.confirmed ? "Confirmed" : "Pending"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── Day Section ──────────────────────────────────────────────────────────────
function DaySection({ day, isActive }: { day: Day; isActive: boolean }) {
  return (
    <View style={S.daySection}>
      {/* Day header */}
      <View style={[S.dayHeader, isActive && S.dayHeaderActive]}>
        {isActive && <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />}
        <View style={[S.dayBadge, isActive && S.dayBadgeActive]}>
          {isActive && <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />}
          <Text style={[S.dayBadgeText, isActive && S.dayBadgeTextActive]}>{day.dayLabel}</Text>
        </View>
        <View style={S.dayInfo}>
          <Text style={S.dayDate}>{day.date} · {day.city}</Text>
          {isActive && <View style={S.todayBadge}><Text style={S.todayText}>Today</Text></View>}
        </View>
        <View style={S.weatherWrap}>
          <IconSymbol name={day.weather as any} size={16} color="#FFD112" />
          <Text style={S.temp}>{day.temp}</Text>
        </View>
      </View>

      {/* Events */}
      <View style={S.eventsWrap}>
        {day.events.map((event, i) => (
          <EventCard key={event.id} event={event} isLast={i === day.events.length - 1} />
        ))}
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const [activeDay, setActiveDay] = useState("d2"); // Day 2 = "today"
  const [viewMode, setViewMode] = useState<"timeline" | "compact">("timeline");

  const totalEvents = DAYS.reduce((a, d) => a + d.events.length, 0);
  const confirmedEvents = DAYS.reduce((a, d) => a + d.events.filter((e) => e.confirmed).length, 0);

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#24103E", "#1A0A30", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>Schedule</Text>
          <Text style={S.headerSub}>Tokyo & Kyoto · 4 days</Text>
        </View>
        <TouchableOpacity
          style={S.viewModeBtn}
          onPress={() => setViewMode(viewMode === "timeline" ? "compact" : "timeline")}
          activeOpacity={0.7}
        >
          <IconSymbol name={viewMode === "timeline" ? "list.bullet" : "calendar"} size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={S.progressWrap}>
        <View style={S.progressBar}>
          <LinearGradient
            colors={["#6443F4", "#F94498"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[S.progressFill, { width: `${(confirmedEvents / totalEvents) * 100}%` as any }]}
          />
        </View>
        <Text style={S.progressText}>{confirmedEvents}/{totalEvents} confirmed</Text>
      </View>

      {/* Day selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.daySelectorRow}
      >
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={[S.dayChip, activeDay === day.id && S.dayChipActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveDay(day.id);
            }}
            activeOpacity={0.8}
          >
            {activeDay === day.id && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
            <Text style={[S.dayChipLabel, activeDay === day.id && S.dayChipLabelActive]}>{day.dayLabel}</Text>
            <Text style={[S.dayChipDate, activeDay === day.id && S.dayChipDateActive]}>{day.date}</Text>
            <Text style={[S.dayChipCity, activeDay === day.id && S.dayChipCityActive]}>{day.city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {DAYS.filter((d) => d.id === activeDay).map((day) => (
          <DaySection key={day.id} day={day} isActive={day.id === "d2"} />
        ))}

        {/* Add event button */}
        <TouchableOpacity style={S.addEventBtn} activeOpacity={0.85}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="plus.circle.fill" size={20} color={BRAND.purple} />
          <Text style={S.addEventText}>Add Activity</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  orb1: { position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(100,67,244,0.1)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary },
  headerSub: { ...TYPE.caption, color: BRAND.textMuted, marginTop: 1 },
  viewModeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },

  progressWrap: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 10, marginBottom: 14 },
  progressBar: { flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2 },
  progressText: { ...TYPE.caption, color: BRAND.textMuted },

  daySelectorRow: { paddingHorizontal: 16, gap: 10, marginBottom: 16, paddingBottom: 4 },
  dayChip: { overflow: "hidden", borderRadius: RADIUS.xl, paddingHorizontal: 14, paddingVertical: 10, alignItems: "center", minWidth: 80, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  dayChipActive: { borderColor: "transparent" },
  dayChipLabel: { ...TYPE.caption, color: BRAND.textMuted, fontFamily: "Satoshi-Bold" },
  dayChipLabelActive: { color: "#FFF" },
  dayChipDate: { ...TYPE.small, color: BRAND.textMuted, marginTop: 2 },
  dayChipDateActive: { color: "rgba(255,255,255,0.8)" },
  dayChipCity: { ...TYPE.caption, color: BRAND.textMuted, marginTop: 1 },
  dayChipCityActive: { color: "rgba(255,255,255,0.7)" },

  daySection: { paddingHorizontal: 16 },
  dayHeader: { overflow: "hidden", flexDirection: "row", alignItems: "center", borderRadius: RADIUS.xl, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", gap: 12 },
  dayHeaderActive: { borderColor: "rgba(100,67,244,0.3)" },
  dayBadge: { overflow: "hidden", width: 52, height: 52, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.07)" },
  dayBadgeActive: {},
  dayBadgeText: { ...TYPE.label, color: BRAND.textSecondary },
  dayBadgeTextActive: { color: "#FFF" },
  dayInfo: { flex: 1 },
  dayDate: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  todayBadge: { backgroundColor: "rgba(100,67,244,0.2)", borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start", marginTop: 3 },
  todayText: { ...TYPE.caption, color: BRAND.purple },
  weatherWrap: { alignItems: "center", gap: 3 },
  temp: { ...TYPE.small, color: "#FFD112" },

  eventsWrap: { paddingLeft: 4, marginBottom: 8 },
  eventRow: { flexDirection: "row", gap: 12, marginBottom: 4 },
  timelineCol: { width: 52, alignItems: "center", paddingTop: 4 },
  eventTime: { ...TYPE.caption, color: BRAND.textMuted, marginBottom: 6, fontSize: 10 },
  eventDot: { width: 10, height: 10, borderRadius: 5, marginBottom: 4 },
  eventLine: { width: 2, flex: 1, minHeight: 20, borderRadius: 1 },

  eventCard: { overflow: "hidden", flex: 1, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", marginBottom: 10 },
  eventCardUnconfirmed: { borderStyle: "dashed", borderColor: "rgba(255,211,18,0.2)" },
  eventImage: { width: "100%", height: 80, borderTopLeftRadius: RADIUS.xl - 1, borderTopRightRadius: RADIUS.xl - 1 },
  eventCardContent: { flexDirection: "row", alignItems: "flex-start", padding: 12, gap: 10 },
  eventIconWrap: { width: 36, height: 36, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  eventInfo: { flex: 1 },
  eventTitleRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  eventTitle: { ...TYPE.bodyMed, color: BRAND.textPrimary, flex: 1, marginRight: 8 },
  eventPrice: { ...TYPE.label, fontFamily: "Chillax-Semibold" },
  eventSubtitle: { ...TYPE.small, color: BRAND.textSecondary, lineHeight: 16, marginBottom: 6 },
  eventMeta: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  metaText: { ...TYPE.caption, color: BRAND.textMuted, fontSize: 10 },
  confirmBadge: { borderRadius: RADIUS.full, paddingHorizontal: 7, paddingVertical: 2 },
  confirmText: { ...TYPE.caption, fontSize: 10, fontFamily: "Satoshi-Bold" },

  addEventBtn: { overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginHorizontal: 16, marginTop: 8, borderRadius: RADIUS.xl, paddingVertical: 14, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", borderStyle: "dashed" },
  addEventText: { ...TYPE.bodyMed, color: BRAND.purple },
});
