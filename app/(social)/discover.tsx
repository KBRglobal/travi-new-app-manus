// Screen 79 — Discover Travelers (Static Wireframe)
// Route: /social/discover | Mode: Discovery (Social)
// Zones: Header 60px, Filter Chips 48px, Body (2-col masonry grid)

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const FILTERS = ["All", "Near Me", "Same DNA", "Online Now", "Verified"];

const TRAVELERS = [
  { id: "1", name: "Sarah M.", age: 28, dnaMatch: 92, location: "Barcelona", interests: ["Food", "Culture"], verified: true, online: true },
  { id: "2", name: "Marco R.", age: 31, dnaMatch: 78, location: "Rome", interests: ["Adventure", "Hiking"], verified: true, online: false },
  { id: "3", name: "Yuki T.", age: 26, dnaMatch: 85, location: "Tokyo", interests: ["Photography", "Temples"], verified: false, online: true },
  { id: "4", name: "Elena K.", age: 29, dnaMatch: 88, location: "Athens", interests: ["History", "Beaches"], verified: true, online: false },
  { id: "5", name: "James L.", age: 34, dnaMatch: 71, location: "London", interests: ["Nightlife", "Music"], verified: false, online: true },
  { id: "6", name: "Priya S.", age: 27, dnaMatch: 94, location: "Mumbai", interests: ["Yoga", "Wellness"], verified: true, online: false },
];

export default function DiscoverTravelersScreen() {
  const col1 = TRAVELERS.filter((_, i) => i % 2 === 0);
  const col2 = TRAVELERS.filter((_, i) => i % 2 === 1);

  return (
    <ScreenContainer>
      <View style={s.container}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.backArrow}>←</Text>
          <Text style={s.headerTitle}>Discover Travelers</Text>
          <Text style={s.headerIcon}>🔍</Text>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
          {FILTERS.map((f, i) => (
            <View key={f} style={[s.chip, i === 0 && s.chipActive]}>
              <Text style={[s.chipText, i === 0 && s.chipTextActive]}>{f}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 2-Column Masonry Grid */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.gridContainer}>
          <View style={s.column}>
            {col1.map((t, i) => (
              <View key={t.id} style={[s.card, { height: i % 2 === 0 ? 220 : 260 }]}>
                <View style={s.cardImage}>
                  {t.online && <View style={s.onlineDot} />}
                  {t.verified && (
                    <View style={s.verifiedBadge}><Text style={s.verifiedText}>✓</Text></View>
                  )}
                  <Text style={s.cardInitial}>{t.name[0]}</Text>
                </View>
                <View style={s.cardInfo}>
                  <Text style={s.cardName}>{t.name}, {t.age}</Text>
                  <Text style={s.cardLocation}>{t.location}</Text>
                  <View style={s.matchRow}>
                    <View style={s.matchBar}>
                      <View style={[s.matchFill, { width: `${t.dnaMatch}%` }]} />
                    </View>
                    <Text style={s.matchText}>{t.dnaMatch}%</Text>
                  </View>
                  <View style={s.interestsRow}>
                    {t.interests.map((int) => (
                      <View key={int} style={s.interestPill}>
                        <Text style={s.interestText}>{int}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={s.connectBtn}>
                    <Text style={s.connectText}>Connect</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={s.column}>
            {col2.map((t, i) => (
              <View key={t.id} style={[s.card, { height: i % 2 === 0 ? 260 : 220 }]}>
                <View style={s.cardImage}>
                  {t.online && <View style={s.onlineDot} />}
                  {t.verified && (
                    <View style={s.verifiedBadge}><Text style={s.verifiedText}>✓</Text></View>
                  )}
                  <Text style={s.cardInitial}>{t.name[0]}</Text>
                </View>
                <View style={s.cardInfo}>
                  <Text style={s.cardName}>{t.name}, {t.age}</Text>
                  <Text style={s.cardLocation}>{t.location}</Text>
                  <View style={s.matchRow}>
                    <View style={s.matchBar}>
                      <View style={[s.matchFill, { width: `${t.dnaMatch}%` }]} />
                    </View>
                    <Text style={s.matchText}>{t.dnaMatch}%</Text>
                  </View>
                  <View style={s.interestsRow}>
                    {t.interests.map((int) => (
                      <View key={int} style={s.interestPill}>
                        <Text style={s.interestText}>{int}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={s.connectBtn}>
                    <Text style={s.connectText}>Connect</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const N = "#111"; const N2 = "#1a1a1a"; const N3 = "#222"; const W = "#fff"; const G = "#888";

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: N },
  header: { height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  backArrow: { fontSize: 24, color: W },
  headerTitle: { fontSize: 20, fontWeight: "700", color: W },
  headerIcon: { fontSize: 20 },

  filtersRow: { paddingHorizontal: 16, gap: 8, height: 48, alignItems: "center" },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: N2, borderWidth: 1, borderColor: N3 },
  chipActive: { backgroundColor: "#333", borderColor: "#555" },
  chipText: { fontSize: 14, color: G },
  chipTextActive: { color: W },

  gridContainer: { flexDirection: "row", paddingHorizontal: 12, gap: 12, paddingBottom: 100 },
  column: { flex: 1, gap: 12 },
  card: { backgroundColor: N2, borderRadius: 16, borderWidth: 1, borderColor: N3, overflow: "hidden" },
  cardImage: { flex: 1, backgroundColor: N3, alignItems: "center", justifyContent: "center" },
  onlineDot: { position: "absolute", top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: "#4a4" },
  verifiedBadge: { position: "absolute", top: 8, left: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: "#369", alignItems: "center", justifyContent: "center" },
  verifiedText: { fontSize: 10, color: W, fontWeight: "700" },
  cardInitial: { fontSize: 32, fontWeight: "700", color: "#444" },
  cardInfo: { padding: 10, gap: 4 },
  cardName: { fontSize: 15, fontWeight: "600", color: W },
  cardLocation: { fontSize: 12, color: G },
  matchRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  matchBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: N3 },
  matchFill: { height: 4, borderRadius: 2, backgroundColor: "#555" },
  matchText: { fontSize: 12, fontWeight: "600", color: G },
  interestsRow: { flexDirection: "row", gap: 4, flexWrap: "wrap", marginTop: 4 },
  interestPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, backgroundColor: N3 },
  interestText: { fontSize: 10, color: G },
  connectBtn: { marginTop: 6, paddingVertical: 6, borderRadius: 12, backgroundColor: "#333", alignItems: "center" },
  connectText: { fontSize: 13, fontWeight: "600", color: W },
});
