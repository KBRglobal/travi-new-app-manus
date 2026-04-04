#!/usr/bin/env python3
"""
TRAVI Batch Tab Screen Updater
Updates all main tab screens with TRAVI Design DNA.
"""

import os

BASE = "/home/ubuntu/travi-app/app"

DS = '''const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };'''

SCREENS = {

"(tabs)/explore.tsx": '''// Screen 12 — Explore Feed
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const FILTERS = ["All", "Beach", "City", "Mountain", "Culture", "Adventure", "Food"];
const DESTINATIONS = [
  { id: "1", name: "Bali", country: "Indonesia", match: 96, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", tag: "Beach" },
  { id: "2", name: "Santorini", country: "Greece", match: 91, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", tag: "City" },
  { id: "3", name: "Kyoto", country: "Japan", match: 88, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", tag: "Culture" },
  { id: "4", name: "Patagonia", country: "Argentina", match: 85, img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", tag: "Mountain" },
  { id: "5", name: "Tokyo", country: "Japan", match: 82, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", tag: "City" },
  { id: "6", name: "Maldives", country: "Maldives", match: 79, img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", tag: "Beach" },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = DESTINATIONS.filter(d =>
    (activeFilter === "All" || d.tag === activeFilter) &&
    (query === "" || d.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.searchBar}>
          <MaterialIcons name="search" size={20} color={DS.placeholder} />
          <TextInput
            style={s.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={DS.placeholder}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <MaterialIcons name="close" size={18} color={DS.muted} />
            </Pressable>
          )}
        </View>
        <Pressable style={s.filterBtn} onPress={() => {}}>
          <MaterialIcons name="tune" size={20} color={DS.white} />
        </Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtersScroll} contentContainerStyle={s.filtersContent}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.chip, activeFilter === f && s.chipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={s.row}
        contentContainerStyle={[s.listContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-detail" as any)}>
            <Image source={{ uri: item.img }} style={s.cardImg} />
            <LinearGradient colors={["transparent", "rgba(10,5,20,0.9)"]} style={s.cardOverlay} />
            <View style={s.matchBadge}>
              <Text style={s.matchText}>✦ {item.match}%</Text>
            </View>
            <View style={s.cardInfo}>
              <Text style={s.cardName}>{item.name}</Text>
              <Text style={s.cardCountry}>{item.country}</Text>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          <Text style={s.sectionTitle}>
            {filtered.length} Destinations <Text style={{ color: DS.purple }}>for You</Text>
          </Text>
        }
      />
    </View>
  );
}

const CARD_W = (360 - 48 - 12) / 2;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, paddingHorizontal: 12, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.white },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  filtersScroll: { maxHeight: 48 },
  filtersContent: { paddingHorizontal: 16, gap: 8, alignItems: "center" },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  chipText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.muted },
  chipTextActive: { color: DS.white },
  listContent: { paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 16 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: { width: CARD_W, height: CARD_W * 1.3, borderRadius: 16, overflow: "hidden", backgroundColor: DS.surface },
  cardImg: { ...StyleSheet.absoluteFillObject },
  cardOverlay: { ...StyleSheet.absoluteFillObject },
  matchBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "#02A65C", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  matchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  cardInfo: { position: "absolute", bottom: 12, left: 12 },
  cardName: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  cardCountry: { fontSize: 12, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)" },
});
''',

"(tabs)/profile.tsx": '''// Screen 15 — Profile & Settings
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Switch, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const MENU_SECTIONS = [
  { title: "Account", items: [
    { label: "Edit Profile", icon: "person-outline", route: "/(tabs)/profile-edit" },
    { label: "Travel DNA", icon: "science", route: "/(tabs)/dna-management" },
    { label: "Membership", icon: "star-outline", route: "/(tabs)/membership" },
  ]},
  { title: "Wallet & Payments", items: [
    { label: "Wallet", icon: "account-balance-wallet", route: "/(tabs)/wallet" },
    { label: "Transaction History", icon: "receipt-long", route: "/(tabs)/transaction-history" },
  ]},
  { title: "Preferences", items: [
    { label: "Notifications", icon: "notifications-none", route: "/(settings)/notifications" },
    { label: "Language", icon: "language", route: "/(settings)/language-selector" },
    { label: "Currency", icon: "attach-money", route: "/(settings)/currency-selector" },
  ]},
  { title: "Support", items: [
    { label: "Help Center", icon: "help-outline", route: "/(tabs)/help" },
    { label: "Privacy & Security", icon: "security", route: "/(settings)/privacy-security" },
  ]},
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(10,5,20,0)"]} style={[s.hero, { paddingTop: insets.top + 16 }]}>
        <View style={s.avatarWrap}>
          <LinearGradient colors={[DS.purple, DS.pink]} style={s.avatarRing}>
            <View style={s.avatarInner}>
              <MaterialIcons name="person" size={40} color={DS.white} />
            </View>
          </LinearGradient>
        </View>
        <Text style={s.name}>David Cohen</Text>
        <Text style={s.email}>david@example.com</Text>
        <View style={s.dnaRow}>
          <View style={s.dnaBadge}>
            <MaterialIcons name="science" size={12} color={DS.purple} />
            <Text style={s.dnaText}>Explorer DNA</Text>
          </View>
          <View style={s.statBadge}>
            <Text style={s.statNum}>12</Text>
            <Text style={s.statLabel}>Trips</Text>
          </View>
          <View style={s.statBadge}>
            <Text style={s.statNum}>8</Text>
            <Text style={s.statLabel}>Countries</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Menu sections */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            <View style={s.sectionCard}>
              {section.items.map((item, idx) => (
                <Pressable key={item.label} style={({ pressed }) => [s.menuRow, idx < section.items.length - 1 && s.menuRowBorder, pressed && { opacity: 0.7 }]} onPress={() => router.push(item.route as any)}>
                  <View style={s.menuIconWrap}>
                    <MaterialIcons name={item.icon as any} size={18} color={DS.purple} />
                  </View>
                  <Text style={s.menuLabel}>{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Dark mode toggle */}
        <View style={s.section}>
          <View style={s.sectionCard}>
            <View style={s.menuRow}>
              <View style={s.menuIconWrap}>
                <MaterialIcons name="dark-mode" size={18} color={DS.purple} />
              </View>
              <Text style={s.menuLabel}>Dark Mode</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: DS.surface, true: DS.purple }} thumbColor={DS.white} />
            </View>
          </View>
        </View>

        {/* Logout */}
        <Pressable style={({ pressed }) => [s.logoutBtn, pressed && { opacity: 0.7 }]} onPress={() => router.replace("/(auth)/sign-up" as any)}>
          <MaterialIcons name="logout" size={18} color={DS.error} style={{ marginRight: 8 }} />
          <Text style={s.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { alignItems: "center", paddingBottom: 24, paddingHorizontal: 24 },
  avatarWrap: { marginBottom: 12 },
  avatarRing: { width: 88, height: 88, borderRadius: 44, padding: 2 },
  avatarInner: { flex: 1, borderRadius: 42, backgroundColor: DS.surface, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 22, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 4 },
  email: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted, marginBottom: 16 },
  dnaRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  dnaBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.15)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  dnaText: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.purple },
  statBadge: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  statNum: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  statLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.muted },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.muted, marginBottom: 8, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.8 },
  sectionCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, overflow: "hidden" },
  menuRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  menuIconWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.12)", justifyContent: "center", alignItems: "center" },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Medium", color: DS.white },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,107,107,0.25)", backgroundColor: "rgba(255,107,107,0.08)", marginBottom: 16 },
  logoutText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.error },
});
''',

"(tabs)/notifications.tsx": '''// Screen 18 — Notifications
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

''' + DS + '''

const FILTERS = ["All", "Trips", "Deals", "Social", "System"];
const NOTIFS = [
  { id: "1", type: "trip", icon: "flight-takeoff", title: "Your Bali trip starts tomorrow!", body: "Check your itinerary and packing list.", time: "2h ago", unread: true, color: DS.purple },
  { id: "2", type: "deal", icon: "local-offer", title: "Flash Deal: Tokyo -40%", body: "Limited seats available. Book now.", time: "5h ago", unread: true, color: DS.pink },
  { id: "3", type: "social", icon: "people", title: "Sarah joined your trip", body: "Sarah Cohen accepted your invite to Santorini.", time: "1d ago", unread: false, color: DS.success },
  { id: "4", type: "system", icon: "verified", title: "Identity Verified", body: "Your KYC verification was approved.", time: "2d ago", unread: false, color: DS.info },
  { id: "5", type: "trip", icon: "hotel", title: "Hotel Confirmed", body: "Alaya Resort Ubud — Check-in Mar 15", time: "3d ago", unread: false, color: DS.purple },
  { id: "6", type: "deal", icon: "star", title: "New destinations match your DNA", body: "6 new places added to your Explore feed.", time: "4d ago", unread: false, color: DS.warning },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = NOTIFS.filter(n => activeFilter === "All" || n.type === activeFilter.toLowerCase());

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Notifications</Text>
        <Pressable style={s.markAllBtn}>
          <Text style={s.markAllText}>Mark All Read</Text>
        </Pressable>
      </View>

      {/* Filters */}
      <View style={s.filtersWrap}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.chip, activeFilter === f && s.chipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.notifRow, item.unread && s.notifUnread, pressed && { opacity: 0.8 }]}>
            <View style={[s.iconWrap, { backgroundColor: item.color + "22", borderColor: item.color + "44" }]}>
              <MaterialIcons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.notifHeader}>
                <Text style={s.notifTitle} numberOfLines={1}>{item.title}</Text>
                {item.unread && <View style={s.unreadDot} />}
              </View>
              <Text style={s.notifBody} numberOfLines={2}>{item.body}</Text>
              <Text style={s.notifTime}>{item.time}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 24, fontFamily: "Chillax-Bold", color: DS.white },
  markAllBtn: { paddingVertical: 6, paddingHorizontal: 12 },
  markAllText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.purple },
  filtersWrap: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  chipText: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted },
  chipTextActive: { color: DS.white },
  notifRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 14, borderRadius: 16, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  notifUnread: { borderColor: "rgba(100,67,244,0.35)", backgroundColor: "rgba(100,67,244,0.08)" },
  iconWrap: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  notifHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 3 },
  notifTitle: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Bold", color: DS.white },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: DS.pink },
  notifBody: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted, lineHeight: 18, marginBottom: 4 },
  notifTime: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.placeholder },
});
''',

"(tabs)/wishlist.tsx": '''// Screen 17 — Wishlist
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const FILTERS = ["All", "Destinations", "Activities", "Hotels"];
const ITEMS = [
  { id: "1", name: "Ubud, Bali", type: "Destinations", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", match: 96 },
  { id: "2", name: "Santorini Sunset", type: "Activities", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", match: 91 },
  { id: "3", name: "Fushimi Inari", type: "Activities", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", match: 88 },
  { id: "4", name: "Alaya Resort", type: "Hotels", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80", match: 85 },
  { id: "5", name: "Patagonia Trek", type: "Activities", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", match: 82 },
  { id: "6", name: "Overwater Villa", type: "Hotels", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80", match: 79 },
];

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = ITEMS.filter(i => activeFilter === "All" || i.type === activeFilter);

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>Wishlist</Text>
        <Pressable style={s.sortBtn}>
          <MaterialIcons name="sort" size={20} color={DS.white} />
        </Pressable>
      </View>

      <View style={s.filtersWrap}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.chip, activeFilter === f && s.chipActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={s.row}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [s.card, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-detail" as any)}>
            <Image source={{ uri: item.img }} style={s.cardImg} />
            <LinearGradient colors={["transparent", "rgba(10,5,20,0.9)"]} style={s.cardOverlay} />
            <Pressable style={s.heartBtn}>
              <MaterialIcons name="favorite" size={18} color={DS.pink} />
            </Pressable>
            <View style={s.matchBadge}>
              <Text style={s.matchText}>✦ {item.match}%</Text>
            </View>
            <Text style={s.cardName} numberOfLines={1}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const CARD_W = (360 - 48 - 12) / 2;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 24, fontFamily: "Chillax-Bold", color: DS.white },
  sortBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  filtersWrap: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: DS.purple },
  chipText: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted },
  chipTextActive: { color: DS.white },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: { width: CARD_W, height: CARD_W * 1.3, borderRadius: 16, overflow: "hidden", backgroundColor: DS.surface },
  cardImg: { ...StyleSheet.absoluteFillObject },
  cardOverlay: { ...StyleSheet.absoluteFillObject },
  heartBtn: { position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(10,5,20,0.6)", justifyContent: "center", alignItems: "center" },
  matchBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#02A65C", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  matchText: { fontSize: 11, fontFamily: "Satoshi-Bold", color: DS.white },
  cardName: { position: "absolute", bottom: 12, left: 12, right: 12, fontSize: 15, fontFamily: "Chillax-Bold", color: DS.white },
});
''',

"(tabs)/search.tsx": '''// Screen 13 — Search
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const RECENT = ["Bali", "Tokyo", "Paris", "Santorini", "Dubai"];
const POPULAR = [
  { id: "1", name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80" },
  { id: "2", name: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80" },
  { id: "3", name: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80" },
  { id: "4", name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80" },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Search bar */}
      <View style={s.searchWrap}>
        <View style={s.searchBar}>
          <MaterialIcons name="search" size={20} color={DS.placeholder} />
          <TextInput
            style={s.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor={DS.placeholder}
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <MaterialIcons name="close" size={18} color={DS.muted} />
            </Pressable>
          )}
        </View>
        <Pressable style={s.cancelBtn} onPress={() => router.back()}>
          <Text style={s.cancelText}>Cancel</Text>
        </Pressable>
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => ""}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Recent */}
            {query.length === 0 && (
              <>
                <View style={s.sectionHeader}>
                  <Text style={s.sectionTitle}>Recent</Text>
                  <Pressable><Text style={s.clearText}>Clear</Text></Pressable>
                </View>
                {RECENT.map(r => (
                  <Pressable key={r} style={({ pressed }) => [s.recentRow, pressed && { opacity: 0.7 }]}>
                    <View style={s.recentIcon}><MaterialIcons name="history" size={16} color={DS.muted} /></View>
                    <Text style={s.recentText}>{r}</Text>
                    <MaterialIcons name="north-west" size={16} color={DS.muted} />
                  </Pressable>
                ))}
                <Text style={[s.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Popular Now</Text>
                <View style={s.popularGrid}>
                  {POPULAR.map(p => (
                    <Pressable key={p.id} style={({ pressed }) => [s.popularCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-detail" as any)}>
                      <Image source={{ uri: p.img }} style={s.popularImg} />
                      <LinearGradient colors={["transparent", "rgba(10,5,20,0.85)"]} style={StyleSheet.absoluteFillObject} />
                      <Text style={s.popularName}>{p.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </>
        }
        renderItem={() => null}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  searchWrap: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, paddingHorizontal: 12, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.white },
  cancelBtn: { paddingVertical: 8 },
  cancelText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.purple },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white },
  clearText: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.muted },
  recentRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: DS.border },
  recentIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: DS.surface, justifyContent: "center", alignItems: "center" },
  recentText: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.white },
  popularGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  popularCard: { width: "47%", height: 120, borderRadius: 14, overflow: "hidden", backgroundColor: DS.surface },
  popularImg: { ...StyleSheet.absoluteFillObject },
  popularName: { position: "absolute", bottom: 10, left: 10, fontSize: 15, fontFamily: "Chillax-Bold", color: DS.white },
});
''',

"(tabs)/settings.tsx": '''// Screen 55 — Settings
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";

''' + DS + '''

const SECTIONS = [
  { title: "Account", items: [
    { label: "Change Email", icon: "email", route: "/(settings)/edit-profile" },
    { label: "Change Password", icon: "lock-outline", route: "/(settings)/change-password" },
    { label: "Privacy & Security", icon: "security", route: "/(settings)/privacy-security" },
  ]},
  { title: "Notifications", items: [
    { label: "Push Notifications", icon: "notifications-none", route: "/(settings)/notifications" },
    { label: "Email Alerts", icon: "mail-outline", route: "/(settings)/notifications" },
  ]},
  { title: "App Preferences", items: [
    { label: "Language", icon: "language", route: "/(settings)/language-selector" },
    { label: "Currency", icon: "attach-money", route: "/(settings)/currency-selector" },
  ]},
  { title: "AI Settings", items: [
    { label: "Travel DNA", icon: "science", route: "/(tabs)/dna-management" },
    { label: "AI Recommendations", icon: "auto-awesome", route: "/(tabs)/dna-management" },
  ]},
  { title: "Support", items: [
    { label: "Help Center", icon: "help-outline", route: "/(tabs)/help" },
    { label: "Contact Support", icon: "support-agent", route: "/(tabs)/support" },
    { label: "Rate TRAVI", icon: "star-outline", route: "/(tabs)/support" },
  ]},
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>Settings</Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionLabel}>{section.title}</Text>
            <View style={s.sectionCard}>
              {section.items.map((item, idx) => (
                <Pressable key={item.label} style={({ pressed }) => [s.row, idx < section.items.length - 1 && s.rowBorder, pressed && { opacity: 0.7 }]} onPress={() => router.push(item.route as any)}>
                  <View style={s.iconWrap}>
                    <MaterialIcons name={item.icon as any} size={18} color={DS.purple} />
                  </View>
                  <Text style={s.rowLabel}>{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Toggles */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>Quick Toggles</Text>
          <View style={s.sectionCard}>
            <View style={[s.row, s.rowBorder]}>
              <View style={s.iconWrap}><MaterialIcons name="notifications" size={18} color={DS.purple} /></View>
              <Text style={s.rowLabel}>Push Notifications</Text>
              <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: DS.surface, true: DS.purple }} thumbColor={DS.white} />
            </View>
            <View style={s.row}>
              <View style={s.iconWrap}><MaterialIcons name="auto-awesome" size={18} color={DS.purple} /></View>
              <Text style={s.rowLabel}>AI Suggestions</Text>
              <Switch value={aiSuggestions} onValueChange={setAiSuggestions} trackColor={{ false: DS.surface, true: DS.purple }} thumbColor={DS.white} />
            </View>
          </View>
        </View>

        {/* Logout */}
        <Pressable style={({ pressed }) => [s.logoutBtn, pressed && { opacity: 0.7 }]} onPress={() => router.replace("/(auth)/sign-up" as any)}>
          <MaterialIcons name="logout" size={18} color={DS.error} style={{ marginRight: 8 }} />
          <Text style={s.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted, marginBottom: 8, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.8 },
  sectionCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  iconWrap: { width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.12)", justifyContent: "center", alignItems: "center" },
  rowLabel: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Medium", color: DS.white },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,107,107,0.25)", backgroundColor: "rgba(255,107,107,0.08)", marginBottom: 16 },
  logoutText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.error },
});
''',

"(tabs)/dna-management.tsx": '''// Screen 16 — DNA Management
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS + '''

const DIMENSIONS = [
  { label: "Adventurer", score: 87, icon: "terrain", color: "#EF4444" },
  { label: "Culture Seeker", score: 74, icon: "museum", color: DS.purple },
  { label: "Foodie", score: 91, icon: "restaurant", color: DS.warning },
  { label: "Nature Lover", score: 68, icon: "forest", color: DS.success },
  { label: "Luxury Traveler", score: 55, icon: "hotel", color: DS.pink },
  { label: "Budget Conscious", score: 42, icon: "savings", color: DS.info },
  { label: "Solo Explorer", score: 79, icon: "person", color: "#A78BFA" },
  { label: "Social Butterfly", score: 63, icon: "people", color: "#FB923C" },
];

export default function DnaManagementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={["rgba(100,67,244,0.35)", "rgba(249,68,152,0.15)", "rgba(10,5,20,0)"]} style={[s.hero, { paddingTop: insets.top + 16 }]}>
        <View style={s.dnaIconWrap}>
          <LinearGradient colors={[DS.purple, DS.pink]} style={s.dnaIcon}>
            <MaterialIcons name="science" size={32} color={DS.white} />
          </LinearGradient>
        </View>
        <Text style={s.heroTitle}>Your Travel DNA</Text>
        <Text style={s.heroSub}>Based on 47 interactions and 3 trips</Text>
        <View style={s.typeBadge}>
          <Text style={s.typeText}>✦ Explorer Archetype</Text>
        </View>
      </LinearGradient>

      {/* Dimensions */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Text style={s.sectionTitle}>DNA Dimensions</Text>
        {DIMENSIONS.map((dim) => (
          <View key={dim.label} style={s.dimCard}>
            <View style={[s.dimIcon, { backgroundColor: dim.color + "22", borderColor: dim.color + "44" }]}>
              <MaterialIcons name={dim.icon as any} size={20} color={dim.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.dimHeader}>
                <Text style={s.dimLabel}>{dim.label}</Text>
                <Text style={[s.dimScore, { color: dim.color }]}>{dim.score}%</Text>
              </View>
              <View style={s.barBg}>
                <View style={[s.barFill, { width: `${dim.score}%` as any, backgroundColor: dim.color }]} />
              </View>
            </View>
          </View>
        ))}

        {/* Retake */}
        <Pressable style={({ pressed }) => [s.retakeBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(auth)/quiz" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.retakeGrad}>
            <MaterialIcons name="refresh" size={18} color={DS.white} style={{ marginRight: 8 }} />
            <Text style={s.retakeText}>Retake DNA Quiz</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { alignItems: "center", paddingBottom: 28, paddingHorizontal: 24 },
  dnaIconWrap: { marginBottom: 12 },
  dnaIcon: { width: 72, height: 72, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  heroTitle: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 6 },
  heroSub: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.muted, marginBottom: 14 },
  typeBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.2)", borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  typeText: { fontSize: 13, fontFamily: "Satoshi-Bold", color: DS.purple },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 14 },
  dimCard: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12, padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14 },
  dimIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  dimHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  dimLabel: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white },
  dimScore: { fontSize: 14, fontFamily: "Satoshi-Bold" },
  barBg: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)" },
  barFill: { height: 6, borderRadius: 3 },
  retakeBtn: { marginTop: 8, height: 52, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  retakeGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  retakeText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
''',

}

def update_screens():
    updated = []
    for rel_path, content in SCREENS.items():
        full_path = os.path.join(BASE, rel_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w") as f:
            f.write(content)
        updated.append(rel_path)
        print(f"✅ Updated: {rel_path}")
    print(f"\\n✅ Done! Updated {len(updated)} screens.")

if __name__ == "__main__":
    update_screens()
