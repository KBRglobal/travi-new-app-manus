// @ts-nocheck
import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  TextInput, Image, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Traveler {
  id: string;
  name: string;
  age: number;
  location: string;
  avatar: string;
  dnaType: string;
  dnaColor: string;
  destinations: string[];
  dates: string;
  bio: string;
  mutual: number;
  verified: boolean;
  connected: boolean;
  dnaMatch: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TRAVELERS: Traveler[] = [
  {
    id: "1", name: "Maya Rosen", age: 28, location: "Tel Aviv",
    dnaType: "Explorer", dnaColor: BRAND.purple,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    destinations: ["Tokyo", "Bali", "Lisbon"], dates: "Mar 15–30",
    bio: "Solo traveler obsessed with street food and hidden gems.",
    mutual: 3, verified: true, connected: false, dnaMatch: 94,
  },
  {
    id: "2", name: "Lior Cohen", age: 31, location: "Haifa",
    dnaType: "Adventurer", dnaColor: BRAND.orange,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    destinations: ["Barcelona", "Kyoto", "NYC"], dates: "Apr 1–15",
    bio: "Photographer and hiker. Love off-the-beaten-path adventures.",
    mutual: 1, verified: false, connected: false, dnaMatch: 87,
  },
  {
    id: "3", name: "Noa Levy", age: 25, location: "Jerusalem",
    dnaType: "Culturalist", dnaColor: BRAND.cyan,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    destinations: ["Rome", "Athens", "Istanbul"], dates: "May 5–20",
    bio: "History buff and museum lover. Always seeking cultural depth.",
    mutual: 5, verified: true, connected: true, dnaMatch: 82,
  },
  {
    id: "4", name: "Avi Shapiro", age: 34, location: "Beer Sheva",
    dnaType: "Foodie", dnaColor: BRAND.pink,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    destinations: ["Paris", "Bangkok", "NYC"], dates: "Jun 10–25",
    bio: "Michelin stars and street stalls — I eat it all. Food is culture.",
    mutual: 2, verified: true, connected: false, dnaMatch: 79,
  },
  {
    id: "5", name: "Tamar Ben-David", age: 29, location: "Eilat",
    dnaType: "Relaxer", dnaColor: BRAND.green,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    destinations: ["Maldives", "Bali", "Santorini"], dates: "Jul 1–14",
    bio: "Beach lover and wellness seeker. Yoga at sunrise, cocktails at sunset.",
    mutual: 0, verified: false, connected: false, dnaMatch: 71,
  },
];

// ─── DNA Match Badge ──────────────────────────────────────────────────────────
function MatchBadge({ score }: { score: number }) {
  const color = score >= 90 ? BRAND.green : score >= 75 ? BRAND.orange : BRAND.textSecondary;
  return (
    <View style={[styles.matchBadge, { borderColor: color + "40" }]}>
      <Text style={[styles.matchText, { color }]}>{score}% match</Text>
    </View>
  );
}

// ─── Traveler Card ────────────────────────────────────────────────────────────
function TravelerCard({ traveler, onConnect }: { traveler: Traveler; onConnect: (id: string) => void }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/(social)/compatibility", params: { travelerId: traveler.id } })}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={["rgba(58,31,92,0.9)", "rgba(26,10,48,0.95)"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: traveler.avatar }} style={styles.avatar} />
          {traveler.verified && (
            <View style={styles.verifiedBadge}>
              <IconSymbol name="checkmark" size={8} color="#fff" />
            </View>
          )}
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.travelerName}>{traveler.name}, {traveler.age}</Text>
            <MatchBadge score={traveler.dnaMatch} />
          </View>
          <View style={styles.locationRow}>
            <IconSymbol name="location.fill" size={12} color={BRAND.textSecondary} />
            <Text style={styles.locationText}>{traveler.location}</Text>
            <View style={[styles.dnaPill, { backgroundColor: traveler.dnaColor + "25", borderColor: traveler.dnaColor + "50" }]}>
              <Text style={[styles.dnaText, { color: traveler.dnaColor }]}>{traveler.dnaType}</Text>
            </View>
          </View>
          <Text style={styles.bioText} numberOfLines={2}>{traveler.bio}</Text>
          <View style={styles.destinationsRow}>
            {traveler.destinations.slice(0, 3).map((d, i) => (
              <View key={i} style={styles.destChip}>
                <Text style={styles.destText}>{d}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.datesText}>{traveler.dates}</Text>
        {traveler.mutual > 0 && (
          <Text style={styles.mutualText}>{traveler.mutual} mutual</Text>
        )}
        <TouchableOpacity
          style={[styles.connectBtn, traveler.connected && styles.connectedBtn]}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onConnect(traveler.id);
          }}
        >
          <Text style={[styles.connectBtnText, traveler.connected && styles.connectedBtnText]}>
            {traveler.connected ? "Connected" : "Connect"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [travelers, setTravelers] = useState(TRAVELERS);

  const filtered = travelers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.dnaType.toLowerCase().includes(search.toLowerCase()) ||
    t.destinations.some(d => d.toLowerCase().includes(search.toLowerCase()))
  );

  const handleConnect = (id: string) => {
    setTravelers(prev => prev.map(t => t.id === id ? { ...t, connected: !t.connected } : t));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[BRAND.bgDeep, BRAND.bgOverlay]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color={BRAND.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Discover Travelers</Text>
          <Text style={styles.headerSub}>Find your perfect travel companion</Text>
        </View>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
        >
          <IconSymbol name="gearshape.fill" size={20} color={BRAND.purple} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={16} color={BRAND.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, DNA type, destination..."
          placeholderTextColor={BRAND.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <IconSymbol name="xmark.circle.fill" size={16} color={BRAND.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.countText}>{filtered.length} travelers found</Text>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TravelerCard traveler={item} onConnect={handleConnect} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { padding: 4 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary },
  headerSub: { ...TYPE.small, color: BRAND.textSecondary, marginTop: 1 },
  filterBtn: { marginLeft: "auto", width: 40, height: 40, borderRadius: 20, backgroundColor: BRAND.purple + "20", alignItems: "center", justifyContent: "center" },
  searchContainer: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 20, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: BRAND.border },
  searchInput: { flex: 1, ...TYPE.body, color: BRAND.textPrimary },
  countText: { ...TYPE.caption, color: BRAND.textSecondary, paddingHorizontal: 20, marginBottom: 8 },
  listContent: { paddingHorizontal: 20, paddingBottom: 130 },
  card: { borderRadius: RADIUS.lg, overflow: "hidden", borderWidth: 1, borderColor: BRAND.border },
  cardContent: { flexDirection: "row", gap: 14, padding: 18 },
  avatarContainer: { position: "relative" },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: BRAND.bgCard },
  verifiedBadge: { position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderRadius: 9, backgroundColor: BRAND.purple, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: BRAND.bgDeep },
  cardInfo: { flex: 1, gap: 5 },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  travelerName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  matchBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, borderWidth: 1, backgroundColor: "transparent" },
  matchText: { ...TYPE.caption, fontFamily: "Satoshi-Bold" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: { ...TYPE.caption, color: BRAND.textSecondary, flex: 1 },
  dnaPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1 },
  dnaText: { ...TYPE.caption, fontFamily: "Satoshi-Bold" },
  bioText: { ...TYPE.small, color: BRAND.textSecondary },
  destinationsRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  destChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)" },
  destText: { ...TYPE.caption, color: BRAND.textSecondary },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingBottom: 130, paddingTop: 4 },
  datesText: { ...TYPE.caption, color: BRAND.textMuted, flex: 1 },
  mutualText: { ...TYPE.caption, color: BRAND.textSecondary },
  connectBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, backgroundColor: BRAND.purple },
  connectedBtn: { backgroundColor: "transparent", borderWidth: 1, borderColor: BRAND.border },
  connectBtnText: { ...TYPE.label, color: "#fff" },
  connectedBtnText: { color: BRAND.textSecondary },
});
