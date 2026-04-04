// Screen 19 — Plan Trip Entry — STATIC 
// Route: /(tabs)/plan-trip | Mode: Planning
// Spec: Header 60px, Hero 240px gradient, 3 entry method cards (140px each), Drafts + Recent sections

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const ENTRY_METHODS = [
  { icon: "🧬", title: "DNA-Based", desc: "Let your travel DNA pick the perfect destination", color: "#3B82F6" },
  { icon: "✍️", title: "Custom Plan", desc: "Build your trip from scratch with full control", color: "#22C55E" },
  { icon: "🎲", title: "Surprise Me", desc: "Let TRAVI surprise you with a random match", color: "#F59E0B" },
];

const DRAFTS = [
  { id: "1", title: "Bali Adventure", dates: "Apr 15–22", progress: 60 },
  { id: "2", title: "Tokyo Culture Trip", dates: "May 1–10", progress: 30 },
];

const RECENT = [
  { id: "1", title: "Paris Getaway", dates: "Feb 10–17, 2026", status: "Completed" },
  { id: "2", title: "Dubai Luxury", dates: "Jan 5–12, 2026", status: "Completed" },
];

export default function PlanTripScreen() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero — 240px */}
        <View style={s.hero}>
          <Text style={s.heroEmoji}>🗺️</Text>
          <Text style={s.heroTitle}>Plan Your Trip</Text>
          <Text style={s.heroSub}>Choose how you want to start planning</Text>
        </View>

        {/* 3 Entry Method Cards — 140px each */}
        <View style={s.section}>
          {ENTRY_METHODS.map((method) => (
            <Pressable key={method.title} style={s.methodCard}>
              <View style={[s.methodIconWrap, { backgroundColor: method.color + "20" }]}>
                <Text style={s.methodIcon}>{method.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.methodTitle}>{method.title}</Text>
                <Text style={s.methodDesc}>{method.desc}</Text>
              </View>
              <Text style={s.chevron}>›</Text>
            </Pressable>
          ))}
        </View>

        {/* Drafts */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Drafts</Text>
            <Text style={s.seeAll}>See All</Text>
          </View>
          {DRAFTS.map((draft) => (
            <Pressable key={draft.id} style={s.draftCard}>
              <View style={{ flex: 1 }}>
                <Text style={s.draftTitle}>{draft.title}</Text>
                <Text style={s.draftDates}>{draft.dates}</Text>
              </View>
              <View style={s.progressWrap}>
                <View style={s.progressTrack}>
                  <View style={[s.progressFill, { width: `${draft.progress}%` }]} />
                </View>
                <Text style={s.progressText}>{draft.progress}%</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Recent Trips */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Trips</Text>
            <Text style={s.seeAll}>See All</Text>
          </View>
          {RECENT.map((trip) => (
            <Pressable key={trip.id} style={s.recentCard}>
              <View style={s.recentImage}><Text style={s.imgText}>📷</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.recentTitle}>{trip.title}</Text>
                <Text style={s.recentDates}>{trip.dates}</Text>
              </View>
              <View style={s.statusBadge}><Text style={s.statusText}>{trip.status}</Text></View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  hero: {
    height: 240, backgroundColor: "#1A1A1A", alignItems: "center",
    justifyContent: "center", gap: 8, paddingTop: 48,
    borderBottomWidth: 1, borderBottomColor: "#222",
  },
  heroEmoji: { fontSize: 48 },
  heroTitle: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  heroSub: { color: "#888", fontSize: 14 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#888", fontSize: 13 },
  methodCard: {
    flexDirection: "row", alignItems: "center", gap: 14,
    height: 80, borderRadius: 14, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", paddingHorizontal: 16, marginBottom: 10,
  },
  methodIconWrap: { width: 48, height: 48, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  methodIcon: { fontSize: 24 },
  methodTitle: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  methodDesc: { color: "#888", fontSize: 12, marginTop: 2 },
  chevron: { color: "#555", fontSize: 22 },
  draftCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8,
  },
  draftTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  draftDates: { color: "#888", fontSize: 12, marginTop: 2 },
  progressWrap: { alignItems: "flex-end", gap: 4 },
  progressTrack: { width: 60, height: 4, borderRadius: 2, backgroundColor: "#222" },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: "#3B82F6" },
  progressText: { color: "#888", fontSize: 11 },
  recentCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#1A1A1A",
  },
  recentImage: { width: 48, height: 48, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgText: { fontSize: 18, opacity: 0.3 },
  recentTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  recentDates: { color: "#888", fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  statusText: { color: "#888", fontSize: 11 },
});
