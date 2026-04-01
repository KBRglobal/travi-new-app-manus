import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  FlatList, Platform, TextInput, Dimensions
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, LOGOS, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterTab = "discover" | "requests" | "my_trips";

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
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TRAVELERS: Traveler[] = [
  {
    id: "1", name: "Maya Rosen", age: 28, location: "Tel Aviv", dnaType: "Explorer", dnaColor: BRAND.purple,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    destinations: ["Tokyo", "Bali", "Lisbon"], dates: "Mar 15–30",
    bio: "Solo traveler obsessed with street food and hidden gems. Looking for adventure buddies!",
    mutual: 3, verified: true, connected: false,
  },
  {
    id: "2", name: "Lior Cohen", age: 31, location: "Haifa", dnaType: "Adventurer", dnaColor: BRAND.orange,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    destinations: ["Barcelona", "Kyoto", "NYC"], dates: "Apr 1–15",
    bio: "Photographer & hiker. I find the best sunrise spots. Let's explore together!",
    mutual: 5, verified: true, connected: true,
  },
  {
    id: "3", name: "Noa Levy", age: 25, location: "Jerusalem", dnaType: "Culture Seeker", dnaColor: BRAND.pink,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    destinations: ["Paris", "Rome", "Athens"], dates: "May 10–25",
    bio: "Art museums, local markets, and good wine. Culture is my travel language.",
    mutual: 2, verified: false, connected: false,
  },
  {
    id: "4", name: "Eitan Bar", age: 33, location: "Tel Aviv", dnaType: "Luxury Traveler", dnaColor: "#FFD112",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    destinations: ["Dubai", "Maldives", "Monaco"], dates: "Jun 5–20",
    bio: "5-star hotels, business class, and Michelin restaurants. Life's too short for less.",
    mutual: 1, verified: true, connected: false,
  },
  {
    id: "5", name: "Shira Mizrahi", age: 27, location: "Beer Sheva", dnaType: "Budget Explorer", dnaColor: BRAND.green,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    destinations: ["Thailand", "Vietnam", "Cambodia"], dates: "Jul 1–30",
    bio: "Backpacker at heart. Hostels, local buses, and authentic experiences only.",
    mutual: 4, verified: true, connected: false,
  },
];

const REQUESTS = [
  { id: "r1", name: "Tom K.", avatar: "T", message: "Hey! I'm also going to Tokyo in March. Want to explore together?", time: "2h ago", dnaType: "Explorer", color: BRAND.purple },
  { id: "r2", name: "Dana S.", avatar: "D", message: "Love your travel style! Planning Bali in April, interested?", time: "1d ago", dnaType: "Adventurer", color: BRAND.orange },
];

// ─── Traveler Card ────────────────────────────────────────────────────────────
function TravelerCard({ traveler, onConnect }: { traveler: Traveler; onConnect: (id: string) => void }) {
  return (
    <View style={S.travelerCard}>
      <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />

      {/* Top row */}
      <View style={S.cardTop}>
        <View style={S.avatarWrap}>
          <Image source={{ uri: traveler.avatar }} style={S.avatar} resizeMode="cover" />
          {traveler.verified && (
            <View style={S.verifiedBadge}>
              <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
              <IconSymbol name="checkmark" size={8} color="#FFF" />
            </View>
          )}
        </View>
        <View style={S.cardInfo}>
          <View style={S.nameRow}>
            <Text style={S.travelerName}>{traveler.name}</Text>
            <Text style={S.travelerAge}>{traveler.age}</Text>
          </View>
          <View style={S.locationRow}>
            <IconSymbol name="location.fill" size={11} color={BRAND.textMuted} />
            <Text style={S.travelerLocation}>{traveler.location}</Text>
          </View>
          <View style={[S.dnaBadge, { backgroundColor: traveler.dnaColor + "20", borderColor: traveler.dnaColor + "40" }]}>
            <Text style={[S.dnaText, { color: traveler.dnaColor }]}>{traveler.dnaType}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[S.connectBtn, traveler.connected && S.connectedBtn]}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onConnect(traveler.id);
          }}
          activeOpacity={0.8}
        >
          {!traveler.connected && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
          <Text style={[S.connectBtnText, traveler.connected && S.connectedBtnText]}>
            {traveler.connected ? "Connected ✓" : "Connect"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bio */}
      <Text style={S.bio} numberOfLines={2}>{traveler.bio}</Text>

      {/* Destinations */}
      <View style={S.destRow}>
        <IconSymbol name="airplane" size={12} color={BRAND.textMuted} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
          {traveler.destinations.map((d, i) => (
            <View key={i} style={S.destChip}>
              <Text style={S.destChipText}>{d}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={S.cardFooter}>
        <View style={S.footerItem}>
          <IconSymbol name="calendar" size={12} color={BRAND.textMuted} />
          <Text style={S.footerText}>{traveler.dates}</Text>
        </View>
        {traveler.mutual > 0 && (
          <View style={S.footerItem}>
            <IconSymbol name="person.2.fill" size={12} color={BRAND.purple} />
            <Text style={[S.footerText, { color: BRAND.purple }]}>{traveler.mutual} mutual</Text>
          </View>
        )}
        <TouchableOpacity style={S.msgBtn} activeOpacity={0.8}>
          <IconSymbol name="message.fill" size={14} color={BRAND.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Request Card ─────────────────────────────────────────────────────────────
function RequestCard({ req }: { req: typeof REQUESTS[0] }) {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");
  return (
    <View style={S.requestCard}>
      <LinearGradient colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.requestTop}>
        <View style={[S.requestAvatar, { backgroundColor: req.color + "25", borderColor: req.color + "50" }]}>
          <Text style={[S.requestAvatarText, { color: req.color }]}>{req.avatar}</Text>
        </View>
        <View style={S.requestInfo}>
          <View style={S.requestNameRow}>
            <Text style={S.requestName}>{req.name}</Text>
            <Text style={S.requestTime}>{req.time}</Text>
          </View>
          <Text style={S.requestMessage} numberOfLines={2}>{req.message}</Text>
        </View>
      </View>
      {status === "pending" && (
        <View style={S.requestActions}>
          <TouchableOpacity
            style={S.declineBtn}
            onPress={() => setStatus("declined")}
            activeOpacity={0.8}
          >
            <Text style={S.declineBtnText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={S.acceptBtn}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              setStatus("accepted");
            }}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.acceptBtnText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
      {status !== "pending" && (
        <View style={[S.statusBadge, { backgroundColor: status === "accepted" ? "rgba(2,166,92,0.15)" : "rgba(249,68,152,0.12)" }]}>
          <Text style={[S.statusText, { color: status === "accepted" ? BRAND.green : BRAND.pink }]}>
            {status === "accepted" ? "✓ Connected! Say hi 👋" : "Request declined"}
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ConnectingScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<FilterTab>("discover");
  const [search, setSearch] = useState("");
  const [travelers, setTravelers] = useState(TRAVELERS);

  const handleConnect = (id: string) => {
    setTravelers((prev) => prev.map((t) => t.id === id ? { ...t, connected: !t.connected } : t));
  };

  const filtered = travelers.filter((t) =>
    search === "" ||
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.destinations.some((d) => d.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#24103E", "#1A0A30", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={S.header}>
        <View style={S.headerLeft}>
          <Image source={LOGOS.logotypePrimary} style={S.headerLogo} resizeMode="contain" />
        </View>
        <Text style={S.headerTitle}>Connecting</Text>
        <TouchableOpacity style={S.notifBtn} activeOpacity={0.7}>
          <View style={S.notifDot} />
          <IconSymbol name="bell.fill" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Hero banner */}
      <View style={S.heroBanner}>
        <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.12)"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.heroText}>
          <Text style={S.heroTitle}>Find Your Travel Tribe</Text>
          <Text style={S.heroSub}>Connect with travelers who match your vibe</Text>
        </View>
        <Image source={LOGOS.mascotDark} style={S.heroMascot} resizeMode="contain" />
      </View>

      {/* Search */}
      <View style={S.searchWrap}>
        <IconSymbol name="magnifyingglass" size={16} color={BRAND.textMuted} />
        <TextInput
          style={S.searchInput}
          placeholder="Search by name or destination..."
          placeholderTextColor={BRAND.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <IconSymbol name="xmark.circle.fill" size={16} color={BRAND.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tab switcher */}
      <View style={S.tabRow}>
        {([
          { key: "discover", label: "Discover" },
          { key: "requests", label: `Requests${REQUESTS.length > 0 ? ` (${REQUESTS.length})` : ""}` },
          { key: "my_trips", label: "My Trips" },
        ] as const).map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[S.tabBtn, tab === t.key && S.tabBtnActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setTab(t.key);
            }}
            activeOpacity={0.8}
          >
            {tab === t.key && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
            <Text style={[S.tabBtnText, tab === t.key && S.tabBtnTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <FlatList
        data={(tab === "discover" ? filtered : tab === "requests" ? REQUESTS : []) as any[]}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 12, paddingTop: 8 }}
        renderItem={({ item }) => {
          if (tab === "discover") return <TravelerCard traveler={item as unknown as Traveler} onConnect={handleConnect} />;
          return <RequestCard req={item as unknown as typeof REQUESTS[0]} />;
        }}
        ListEmptyComponent={
          tab === "my_trips" ? (
            <View style={S.emptyState}>
              <Image source={LOGOS.mascotDark} style={S.emptyMascot} resizeMode="contain" />
              <Text style={S.emptyTitle}>No shared trips yet</Text>
              <Text style={S.emptyBody}>Connect with travelers and plan your first group adventure!</Text>
              <TouchableOpacity style={S.emptyBtn} onPress={() => setTab("discover")} activeOpacity={0.85}>
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                <Text style={S.emptyBtnText}>Discover Travelers</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  orb1: { position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(100,67,244,0.1)" },
  orb2: { position: "absolute", bottom: 200, left: -80, width: 160, height: 160, borderRadius: 80, backgroundColor: "rgba(249,68,152,0.07)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 },
  headerLeft: { marginRight: 8 },
  headerLogo: { width: 60, height: 24 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary, flex: 1 },
  notifBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center", position: "relative" },
  notifDot: { position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: BRAND.pink, zIndex: 1 },

  heroBanner: { overflow: "hidden", marginHorizontal: 16, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", flexDirection: "row", alignItems: "center", padding: 16, marginBottom: 14 },
  heroText: { flex: 1 },
  heroTitle: { ...TYPE.h3, color: BRAND.textPrimary, marginBottom: 4 },
  heroSub: { ...TYPE.small, color: BRAND.textSecondary },
  heroMascot: { width: 64, height: 64 },

  searchWrap: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: RADIUS.xl, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  searchInput: { flex: 1, ...TYPE.body, color: BRAND.textPrimary },

  tabRow: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  tabBtn: { overflow: "hidden", flex: 1, borderRadius: RADIUS.full, paddingVertical: 9, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  tabBtnActive: { borderColor: "transparent" },
  tabBtnText: { ...TYPE.caption, color: BRAND.textSecondary },
  tabBtnTextActive: { color: "#FFF" },

  // Traveler card
  travelerCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", padding: 14, gap: 10 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  avatarWrap: { position: "relative" },
  avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: "rgba(100,67,244,0.4)" },
  verifiedBadge: { position: "absolute", bottom: 0, right: 0, width: 16, height: 16, borderRadius: 8, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  cardInfo: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  travelerName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  travelerAge: { ...TYPE.caption, color: BRAND.textMuted },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 6 },
  travelerLocation: { ...TYPE.caption, color: BRAND.textMuted },
  dnaBadge: { alignSelf: "flex-start", borderRadius: RADIUS.full, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  dnaText: { ...TYPE.caption, fontFamily: "Satoshi-Bold" },
  connectBtn: { overflow: "hidden", borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 8 },
  connectedBtn: { backgroundColor: "rgba(2,166,92,0.15)", borderWidth: 1, borderColor: "rgba(2,166,92,0.3)" },
  connectBtnText: { ...TYPE.label, color: "#FFF" },
  connectedBtnText: { color: BRAND.green },
  bio: { ...TYPE.small, color: BRAND.textSecondary, lineHeight: 18 },
  destRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  destChip: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4 },
  destChipText: { ...TYPE.caption, color: BRAND.textSecondary },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 12 },
  footerItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerText: { ...TYPE.caption, color: BRAND.textMuted },
  msgBtn: { marginLeft: "auto" as any, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.07)", alignItems: "center", justifyContent: "center" },

  // Request card
  requestCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", padding: 14, gap: 12 },
  requestTop: { flexDirection: "row", gap: 12 },
  requestAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  requestAvatarText: { ...TYPE.h3, fontFamily: "Chillax-Bold" },
  requestInfo: { flex: 1 },
  requestNameRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  requestName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  requestTime: { ...TYPE.caption, color: BRAND.textMuted },
  requestMessage: { ...TYPE.small, color: BRAND.textSecondary, lineHeight: 18 },
  requestActions: { flexDirection: "row", gap: 10 },
  declineBtn: { flex: 1, borderRadius: RADIUS.xl, paddingVertical: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  declineBtnText: { ...TYPE.label, color: BRAND.textSecondary },
  acceptBtn: { overflow: "hidden", flex: 2, borderRadius: RADIUS.xl, paddingVertical: 10, alignItems: "center" },
  acceptBtnText: { ...TYPE.label, color: "#FFF" },
  statusBadge: { borderRadius: RADIUS.xl, paddingVertical: 8, alignItems: "center" },
  statusText: { ...TYPE.small, fontFamily: "Satoshi-Medium" },

  // Empty
  emptyState: { alignItems: "center", paddingTop: 40, paddingHorizontal: 32 },
  emptyMascot: { width: 100, height: 100, marginBottom: 16 },
  emptyTitle: { ...TYPE.h3, color: BRAND.textPrimary, marginBottom: 8 },
  emptyBody: { ...TYPE.body, color: BRAND.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 24 },
  emptyBtn: { overflow: "hidden", borderRadius: RADIUS.xl, paddingHorizontal: 24, paddingVertical: 14 },
  emptyBtnText: { ...TYPE.button, color: "#FFF" },
});
