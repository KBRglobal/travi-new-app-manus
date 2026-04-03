// Screen 11 — Home Dashboard — STATIC WIREFRAME
// Route: /(tabs) (index) | Mode: Discovery
// Spec: Header 160px (logo + avatar), Quick Actions (Plan Trip full-width 140px
//       + Cashback/Explore 48% 120px each), Destinations horizontal scroll
//       (280x380 cards), DNA badge conditional, Live Trip banner, Upcoming Trips

import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from "react-native";

const DESTINATIONS = [
  { id: "1", city: "Bali", country: "Indonesia", match: 96, price: "€850", days: "7-10" },
  { id: "2", city: "Santorini", country: "Greece", match: 91, price: "€1,200", days: "5-7" },
  { id: "3", city: "Kyoto", country: "Japan", match: 88, price: "€950", days: "7-10" },
  { id: "4", city: "Paris", country: "France", match: 85, price: "€780", days: "4-6" },
];

const TRENDING = [
  { id: "t1", city: "Dubai", price: "€650" },
  { id: "t2", city: "Tokyo", price: "€1,100" },
  { id: "t3", city: "Barcelona", price: "€720" },
];

export default function HomeScreen() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header — 160px gradient area */}
        <View style={s.header}>
          <Text style={s.logo}>TRAVI</Text>
          <View style={s.avatar}>
            <Text style={s.avatarText}>D</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={s.greeting}>
          <Text style={s.greetingText}>Good morning, David</Text>
          <Text style={s.greetingSub}>DNA Profile: Explorer</Text>
        </View>

        {/* Quick Actions — Plan Trip full-width 140px */}
        <View style={s.section}>
          <Pressable style={s.planTripCard}>
            <Text style={s.planTripIcon}>✈️</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.planTripTitle}>Plan a Trip</Text>
              <Text style={s.planTripSub}>AI-powered itinerary in minutes</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </Pressable>

          {/* Cashback + Explore — 48% each, 120px */}
          <View style={s.quickRow}>
            <Pressable style={s.quickCard}>
              <Text style={s.quickIcon}>💰</Text>
              <Text style={s.quickLabel}>Cashback</Text>
              <Text style={s.quickValue}>€45.20</Text>
            </Pressable>
            <Pressable style={s.quickCard}>
              <Text style={s.quickIcon}>🧭</Text>
              <Text style={s.quickLabel}>Explore</Text>
              <Text style={s.quickValue}>12 new</Text>
            </Pressable>
          </View>
        </View>

        {/* DNA Badge — conditional */}
        <View style={s.section}>
          <Pressable style={s.dnaBanner}>
            <Text style={s.dnaIcon}>🧬</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.dnaTitle}>Complete Your DNA</Text>
              <Text style={s.dnaSub}>Get personalized recommendations</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        </View>

        {/* Live Trip Banner */}
        <View style={s.section}>
          <Pressable style={s.liveBanner}>
            <View style={s.liveDot} />
            <View style={{ flex: 1 }}>
              <Text style={s.liveLabel}>LIVE TRIP</Text>
              <Text style={s.liveDest}>Bali, Indonesia</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        </View>

        {/* Recommended Destinations — 280x380 horizontal scroll */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={DESTINATIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            renderItem={({ item }) => (
              <Pressable style={s.destCard}>
                <View style={s.destImage}>
                  <Text style={s.imagePlaceholder}>{item.city}</Text>
                  <View style={s.matchBadge}>
                    <Text style={s.matchText}>{item.match}% Match</Text>
                  </View>
                </View>
                <View style={s.destInfo}>
                  <Text style={s.destCity}>{item.city}, {item.country}</Text>
                  <Text style={s.destPrice}>From {item.price} · {item.days} days</Text>
                  <Pressable style={s.destBtn}>
                    <Text style={s.destBtnText}>Plan Trip</Text>
                  </Pressable>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Trending Now */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Trending Now</Text>
          <FlatList
            data={TRENDING}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => (
              <Pressable style={s.trendCard}>
                <Text style={s.trendCity}>{item.city}</Text>
                <Text style={s.trendPrice}>From {item.price}</Text>
              </Pressable>
            )}
          />
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },

  // Header — 160px
  header: {
    height: 160, paddingHorizontal: 20, paddingTop: 56,
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",
    backgroundColor: "#1A1A1A", borderBottomWidth: 1, borderBottomColor: "#222",
  },
  logo: { color: "#FFF", fontSize: 24, fontWeight: "800", letterSpacing: 2 },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: "#333",
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { color: "#FFF", fontSize: 16, fontWeight: "600" },

  // Greeting
  greeting: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  greetingText: { color: "#FFF", fontSize: 22, fontWeight: "700" },
  greetingSub: { color: "#888", fontSize: 14, marginTop: 4 },

  // Sections
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },

  // Plan Trip — full-width 140px
  planTripCard: {
    height: 140, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", paddingHorizontal: 20, gap: 16, marginBottom: 12,
  },
  planTripIcon: { fontSize: 36 },
  planTripTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  planTripSub: { color: "#888", fontSize: 13, marginTop: 4 },
  chevron: { color: "#666", fontSize: 24 },

  // Quick row — 48% each, 120px
  quickRow: { flexDirection: "row", gap: 12 },
  quickCard: {
    flex: 1, height: 120, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", padding: 16, justifyContent: "space-between",
  },
  quickIcon: { fontSize: 24 },
  quickLabel: { color: "#888", fontSize: 13 },
  quickValue: { color: "#FFF", fontSize: 18, fontWeight: "700" },

  // DNA Banner
  dnaBanner: {
    height: 72, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", paddingHorizontal: 16, gap: 12,
  },
  dnaIcon: { fontSize: 28 },
  dnaTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  dnaSub: { color: "#888", fontSize: 13, marginTop: 2 },

  // Live Trip Banner
  liveBanner: {
    height: 72, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", paddingHorizontal: 16, gap: 12,
  },
  liveDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: "#22C55E",
  },
  liveLabel: { color: "#22C55E", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  liveDest: { color: "#FFF", fontSize: 16, fontWeight: "600" },

  // Destination cards — 280x380
  destCard: {
    width: 280, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", overflow: "hidden",
  },
  destImage: {
    height: 240, backgroundColor: "#222",
    justifyContent: "flex-end", padding: 12,
  },
  imagePlaceholder: { color: "#666", fontSize: 20, fontWeight: "600" },
  matchBadge: {
    position: "absolute", top: 12, right: 12,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  matchText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  destInfo: { padding: 16 },
  destCity: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  destPrice: { color: "#888", fontSize: 13, marginTop: 4, marginBottom: 12 },
  destBtn: {
    height: 40, borderRadius: 20, backgroundColor: "#333",
    borderWidth: 1, borderColor: "#555",
    justifyContent: "center", alignItems: "center",
  },
  destBtnText: { color: "#FFF", fontSize: 14, fontWeight: "600" },

  // Trending cards
  trendCard: {
    width: 180, height: 240, borderRadius: 16, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", padding: 16,
    justifyContent: "flex-end",
  },
  trendCity: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  trendPrice: { color: "#888", fontSize: 13, marginTop: 4 },
});
