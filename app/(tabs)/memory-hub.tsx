// @ts-nocheck
/**
 * TRAVI — Memory Hub Screen
 * Trip memory journal: photos, notes, highlights, and travel timeline.
 */

import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

const { width } = Dimensions.get("window");

interface Memory {
  id: string;
  tripTitle: string;
  destination: string;
  flag: string;
  date: string;
  coverImage: string;
  photos: number;
  highlights: string[];
  mood: string;
  rating: number;
  notes: string;
  tags: string[];
  cashbackEarned: number;
}

const MEMORIES: Memory[] = [
  {
    id: "m1",
    tripTitle: "Dubai Winter Escape",
    destination: "Dubai, UAE",
    flag: "🇦🇪",
    date: "Feb 2025",
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    photos: 47,
    highlights: ["Burj Khalifa at sunset", "Desert safari", "Gold Souk shopping", "Nobu dinner"],
    mood: "🤩",
    rating: 5,
    notes: "One of the best trips of my life. The desert safari was magical — watching the sunset over the dunes with a cup of Arabic coffee. Nobu was absolutely incredible.",
    tags: ["Luxury", "Culture", "Food", "Adventure"],
    cashbackEarned: 420,
  },
  {
    id: "m2",
    tripTitle: "Paris Romantic Getaway",
    destination: "Paris, France",
    flag: "🇫🇷",
    date: "Nov 2024",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    photos: 83,
    highlights: ["Eiffel Tower at night", "Louvre Museum", "Seine River cruise", "Croissants at Café de Flore"],
    mood: "😍",
    rating: 5,
    notes: "Paris never disappoints. The city of lights truly lives up to its name. We spent hours at the Louvre and still didn't see everything.",
    tags: ["Romantic", "Culture", "Art", "Food"],
    cashbackEarned: 380,
  },
  {
    id: "m3",
    tripTitle: "Tokyo Tech & Tradition",
    destination: "Tokyo, Japan",
    flag: "🇯🇵",
    date: "Sep 2024",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    photos: 124,
    highlights: ["Shibuya crossing", "Tsukiji fish market", "Mount Fuji day trip", "Akihabara tech district"],
    mood: "🤯",
    rating: 5,
    notes: "Tokyo is unlike any city on earth. The contrast between ultra-modern Akihabara and ancient Senso-ji temple is breathtaking. The food is on another level.",
    tags: ["Culture", "Food", "Tech", "Nature"],
    cashbackEarned: 550,
  },
  {
    id: "m4",
    tripTitle: "Maldives Honeymoon",
    destination: "Maldives",
    flag: "🇲🇻",
    date: "Jun 2024",
    coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    photos: 212,
    highlights: ["Overwater bungalow", "Snorkeling with manta rays", "Sunset dolphin cruise", "Private beach dinner"],
    mood: "🥰",
    rating: 5,
    notes: "Pure paradise. The water is the most incredible shade of turquoise I've ever seen. Snorkeling with manta rays was a life-changing experience.",
    tags: ["Luxury", "Beach", "Romance", "Nature"],
    cashbackEarned: 890,
  },
];

// Country code → flag emoji + name lookup for common destinations
const COUNTRY_FLAGS: Record<string, string> = {
  UAE: "🇦🇪", France: "🇫🇷", Japan: "🇯🇵", Maldives: "🇲🇻", Thailand: "🇹🇭",
  Italy: "🇮🇹", Spain: "🇪🇸", USA: "🇺🇸", UK: "🇬🇧", Germany: "🇩🇪",
  Greece: "🇬🇷", Israel: "🇮🇱", Turkey: "🇹🇷", Portugal: "🇵🇹", Mexico: "🇲🇽",
};

type DbTrip = {
  id: number;
  destination: string;
  country: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string;
  budget: number | null;
  currency: string | null;
};

function dbTripsToMemories(trips: DbTrip[]): Memory[] {
  return trips
    .filter((t) => t.status === "completed")
    .map((t, i) => {
      const flag = COUNTRY_FLAGS[t.country ?? ""] ?? "🌍";
      const date = t.startDate
        ? new Date(t.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "Unknown";
      return {
        id: `db-${t.id}`,
        tripTitle: t.destination,
        destination: t.country ? `${t.destination}, ${t.country}` : t.destination,
        flag,
        date,
        coverImage: `https://source.unsplash.com/800x600/?${encodeURIComponent(t.destination)},travel`,
        photos: 0,
        highlights: [],
        mood: "✈️",
        rating: 0,
        notes: "",
        tags: [],
        cashbackEarned: t.budget ? Math.round(t.budget * 0.05) : 0,
      };
    });
}

const TABS = ["Timeline", "Stats", "Map"];

export default function MemoryHubScreen() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // ── Real DB data via tRPC ────────────────────────────────────────────────────
  const { data: trips } = trpc.trips.list.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 60_000,
  });

  // Use real trip data if available, fall back to mock memories
  const dbMemories = useMemo(
    () => (trips?.length ? dbTripsToMemories(trips as DbTrip[]) : []),
    [trips],
  );
  const memories = dbMemories.length > 0 ? dbMemories : MEMORIES;

  const totalTrips = memories.length;
  const totalPhotos = memories.reduce((s, m) => s + m.photos, 0);
  const totalCashback = memories.reduce((s, m) => s + m.cashbackEarned, 0);
  const destinations = new Set(memories.map((m) => m.destination)).size;

  if (selectedMemory) {
    return <MemoryDetail memory={selectedMemory} onBack={() => setSelectedMemory(null)} />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Memory Hub</Text>
          <Text style={styles.headerSub}>Your travel journal</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { label: "Trips", value: String(totalTrips), emoji: "✈️" },
          { label: "Photos", value: String(totalPhotos), emoji: "📸" },
          { label: "Countries", value: String(destinations), emoji: "🌍" },
          { label: "Cashback", value: `$${totalCashback}`, emoji: "💰" },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statEmoji}>{stat.emoji}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === i && styles.tabActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab(i);
            }}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── TIMELINE TAB ── */}
      {activeTab === 0 && (
        <FlatList
          data={memories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.timelineList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: memory }) => (
            <TouchableOpacity
              style={styles.memoryCard}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedMemory(memory);
              }}
              activeOpacity={0.9}
            >
              <Image source={{ uri: memory.coverImage }} style={styles.memoryCover} contentFit="cover" />
              <LinearGradient colors={["transparent", "rgba(13,6,40,0.95)"]} style={styles.memoryCoverOverlay} />
              <View style={styles.memoryContent}>
                <View style={styles.memoryHeader}>
                  <Text style={styles.memoryFlag}>{memory.flag}</Text>
                  <Text style={styles.memoryDate}>{memory.date}</Text>
                  <Text style={styles.memoryMood}>{memory.mood}</Text>
                </View>
                <Text style={styles.memoryTitle}>{memory.tripTitle}</Text>
                <Text style={styles.memoryDest}>{memory.destination}</Text>
                <View style={styles.memoryMeta}>
                  <Text style={styles.memoryPhotos}>📸 {memory.photos} photos</Text>
                  <Text style={styles.memoryCashback}>💰 ${memory.cashbackEarned} earned</Text>
                  <Text style={styles.memoryRating}>{"⭐".repeat(memory.rating)}</Text>
                </View>
                <View style={styles.memoryTags}>
                  {memory.tags.slice(0, 3).map((tag) => (
                    <View key={tag} style={styles.memoryTag}>
                      <Text style={styles.memoryTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* ── STATS TAB ── */}
      {activeTab === 1 && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.statsContent}>
          <Text style={styles.statsTitle}>Your Travel DNA in Numbers</Text>
          {[
            { label: "Total Distance Flown", value: "47,200 km", icon: "✈️", sub: "Equivalent to circling Earth 1.2x" },
            { label: "Countries Visited", value: String(destinations), icon: "🌍", sub: memories.map((m) => m.flag).filter((v, i, a) => a.indexOf(v) === i).join(" ") || "Start traveling!" },
            { label: "Hotels Stayed", value: "12", icon: "🏨", sub: "Average 4.8 ⭐ rating" },
            { label: "Restaurants Tried", value: "38", icon: "🍽️", sub: "From street food to Michelin stars" },
            { label: "Total Cashback Earned", value: `$${totalCashback}`, icon: "💰", sub: "10% of all bookings returned" },
            { label: "Photos Taken", value: String(totalPhotos), icon: "📸", sub: "Across all trips" },
            { label: "Travel Days", value: "67", icon: "📅", sub: "Out of 365 this year" },
          ].map((stat, i) => (
            <View key={i} style={styles.bigStatCard}>
              <Text style={styles.bigStatIcon}>{stat.icon}</Text>
              <View style={styles.bigStatInfo}>
                <Text style={styles.bigStatLabel}>{stat.label}</Text>
                <Text style={styles.bigStatSub}>{stat.sub}</Text>
              </View>
              <Text style={styles.bigStatValue}>{stat.value}</Text>
            </View>
          ))}

          <Text style={[styles.statsTitle, { marginTop: 20 }]}>Top Travel Moods</Text>
          {[
            { mood: "🤩 Amazed", pct: 45, color: "#F59E0B" },
            { mood: "😍 In Love", pct: 30, color: "#F94498" },
            { mood: "🤯 Mind-Blown", pct: 15, color: "#8B5CF6" },
            { mood: "😌 Relaxed", pct: 10, color: "#22C55E" },
          ].map((m, i) => (
            <View key={i} style={styles.moodRow}>
              <Text style={styles.moodEmoji}>{m.mood}</Text>
              <View style={styles.moodBarWrap}>
                <View style={[styles.moodBar, { width: `${m.pct}%` as any, backgroundColor: m.color }]} />
              </View>
              <Text style={styles.moodPct}>{m.pct}%</Text>
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* ── MAP TAB ── */}
      {activeTab === 2 && (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapEmoji}>🗺️</Text>
          <Text style={styles.mapTitle}>Travel Map</Text>
          <Text style={styles.mapSub}>Your visited destinations will appear here as pins on an interactive world map.</Text>
          <View style={styles.mapPins}>
            {memories.map((m) => (
              <View key={m.id} style={styles.mapPin}>
                <Text style={styles.mapPinFlag}>{m.flag}</Text>
                <Text style={styles.mapPinDest}>{m.destination}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function MemoryDetail({ memory, onBack }: { memory: Memory; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Image source={{ uri: memory.coverImage }} style={styles.detailHeroImage} contentFit="cover" />
          <LinearGradient colors={["transparent", "rgba(13,6,40,0.95)"]} style={styles.detailHeroOverlay} />
          <TouchableOpacity onPress={onBack} style={[styles.backBtn, { position: "absolute", top: 16, left: 16, zIndex: 10 }]} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.detailHeroInfo}>
            <Text style={styles.detailMood}>{memory.mood}</Text>
            <Text style={styles.detailTitle}>{memory.tripTitle}</Text>
            <Text style={styles.detailDest}>{memory.flag} {memory.destination} · {memory.date}</Text>
          </View>
        </View>
        <View style={styles.detailContent}>
          <View style={styles.detailMetaRow}>
            <View style={styles.detailMetaCard}>
              <Text style={styles.detailMetaValue}>📸 {memory.photos}</Text>
              <Text style={styles.detailMetaLabel}>Photos</Text>
            </View>
            <View style={styles.detailMetaCard}>
              <Text style={styles.detailMetaValue}>{"⭐".repeat(memory.rating)}</Text>
              <Text style={styles.detailMetaLabel}>Rating</Text>
            </View>
            <View style={styles.detailMetaCard}>
              <Text style={styles.detailMetaValue}>💰 ${memory.cashbackEarned}</Text>
              <Text style={styles.detailMetaLabel}>Cashback</Text>
            </View>
          </View>

          <Text style={styles.detailSectionTitle}>Highlights</Text>
          {memory.highlights.map((h, i) => (
            <View key={i} style={styles.highlightRow}>
              <Text style={styles.highlightDot}>✦</Text>
              <Text style={styles.highlightText}>{h}</Text>
            </View>
          ))}

          <Text style={styles.detailSectionTitle}>My Notes</Text>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>{memory.notes}</Text>
          </View>

          <Text style={styles.detailSectionTitle}>Tags</Text>
          <View style={styles.tagsRow}>
            {memory.tags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#1A0B2E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  addBtn: { backgroundColor: "rgba(100,67,244,0.3)", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.5)" },
  addBtnText: { color: "#1A0B2E", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  statsRow: { flexDirection: "row", paddingHorizontal: 20, gap: 10, marginBottom: 12 },
  statCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 10, alignItems: "center", gap: 2, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  statEmoji: { fontSize: 18 },
  statValue: { color: "#1A0B2E", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
  statLabel: { color: "rgba(255,255,255,0.5)", fontSize: 10 },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(100,67,244,0.3)" },
  tabText: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#1A0B2E" },
  timelineList: { paddingHorizontal: 20, paddingBottom: 130, gap: 16 },
  memoryCard: { borderRadius: 20, overflow: "hidden", height: 220, position: "relative" },
  memoryCover: { width: "100%", height: "100%" },
  memoryCoverOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 160 },
  memoryContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, gap: 4 },
  memoryHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  memoryFlag: { fontSize: 16 },
  memoryDate: { color: "rgba(255,255,255,0.6)", fontSize: 12, flex: 1 },
  memoryMood: { fontSize: 20 },
  memoryTitle: { color: "#1A0B2E", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  memoryDest: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  memoryMeta: { flexDirection: "row", gap: 12, alignItems: "center" },
  memoryPhotos: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  memoryCashback: { color: "#22C55E", fontSize: 12, fontWeight: "700" },
  memoryRating: { fontSize: 12 },
  memoryTags: { flexDirection: "row", gap: 6 },
  memoryTag: { backgroundColor: "rgba(255,255,255,0.06)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  memoryTagText: { color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: "700" },
  statsContent: { paddingHorizontal: 20, paddingTop: 8 },
  statsTitle: { color: "#1A0B2E", fontSize: 16, fontWeight: "800", marginBottom: 12, fontFamily: "Chillax-Bold" },
  bigStatCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  bigStatIcon: { fontSize: 24 },
  bigStatInfo: { flex: 1 },
  bigStatLabel: { color: "#1A0B2E", fontSize: 14, fontWeight: "700" },
  bigStatSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  bigStatValue: { color: "#C084FC", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  moodRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  moodEmoji: { fontSize: 14, width: 80 },
  moodBarWrap: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  moodBar: { height: 8, borderRadius: 4 },
  moodPct: { color: "rgba(255,255,255,0.5)", fontSize: 12, width: 36, textAlign: "right" },
  mapPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40, gap: 12 },
  mapEmoji: { fontSize: 56 },
  mapTitle: { color: "#1A0B2E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  mapSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 22, fontFamily: "Satoshi-Regular" },
  mapPins: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 12 },
  mapPin: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center", gap: 4 },
  mapPinFlag: { fontSize: 24 },
  mapPinDest: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
  // Detail styles
  detailHero: { height: 280, position: "relative" },
  detailHeroImage: { width: "100%", height: "100%" },
  detailHeroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 160 },
  detailHeroInfo: { position: "absolute", bottom: 16, left: 20, right: 20, gap: 4 },
  detailMood: { fontSize: 32 },
  detailTitle: { color: "#1A0B2E", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  detailDest: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  detailContent: { paddingHorizontal: 20, paddingTop: 16 },
  detailMetaRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  detailMetaCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, alignItems: "center", gap: 4 },
  detailMetaValue: { color: "#1A0B2E", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  detailMetaLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  detailSectionTitle: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", marginBottom: 10, fontFamily: "Chillax-Bold" },
  highlightRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 8 },
  highlightDot: { color: "#6443F4", fontSize: 12, marginTop: 2 },
  highlightText: { color: "rgba(255,255,255,0.75)", fontSize: 14, flex: 1, lineHeight: 20, fontFamily: "Satoshi-Regular" },
  notesCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  notesText: { color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 22, fontFamily: "Satoshi-Regular" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tagChip: { backgroundColor: "rgba(100,67,244,0.2)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  tagText: { color: "#A78BFA", fontSize: 12, fontWeight: "700" },
});
