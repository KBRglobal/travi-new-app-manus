// Screen 14 — Destination Detail — STATIC WIREFRAME
// Route: /(trip)/destination-detail | Mode: Discovery
// Spec: Hero 50% parallax, Floating header, DNA badge, stats row
//       Sections: Why This For You, Tags, Overview, Photo Gallery (3-col),
//       Best Time (month chips), Top Attractions, Price, Similar Destinations
//       Fixed bottom: price + Plan Your Trip CTA

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const TAGS = ["Adventure", "Nature", "Culture", "Beach"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BEST_MONTHS = [3, 4, 5, 8, 9];

const ATTRACTIONS = [
  { name: "Ubud Rice Terraces", type: "Nature", rating: 4.8 },
  { name: "Tanah Lot Temple", type: "Culture", rating: 4.7 },
  { name: "Mount Batur Sunrise", type: "Adventure", rating: 4.9 },
  { name: "Seminyak Beach", type: "Beach", rating: 4.5 },
];

const SIMILAR = [
  { city: "Lombok", country: "Indonesia", match: 89 },
  { city: "Phuket", country: "Thailand", match: 84 },
  { city: "Sri Lanka", country: "Sri Lanka", match: 81 },
];

export default function DestinationDetailScreen() {
  return (
    <View style={s.root}>
      <View style={s.floatingHeader}>
        <Pressable style={s.headerBtn}><Text style={s.headerBtnText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Bali</Text>
        <Pressable style={s.headerBtn}><Text style={s.headerBtnText}>♡</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={s.hero}>
          <Text style={s.heroText}>Bali, Indonesia</Text>
          <View style={s.dnaBadge}><Text style={s.dnaBadgeText}>96% DNA Match</Text></View>
        </View>

        <View style={s.statsRow}>
          <View style={s.stat}><Text style={s.statValue}>€850</Text><Text style={s.statLabel}>From</Text></View>
          <View style={s.statDivider} />
          <View style={s.stat}><Text style={s.statValue}>7-10</Text><Text style={s.statLabel}>Days</Text></View>
          <View style={s.statDivider} />
          <View style={s.stat}><Text style={s.statValue}>4.8</Text><Text style={s.statLabel}>Rating</Text></View>
          <View style={s.statDivider} />
          <View style={s.stat}><Text style={s.statValue}>28°C</Text><Text style={s.statLabel}>Avg Temp</Text></View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Why This For You</Text>
          <View style={s.card}>
            <Text style={s.cardText}>Based on your DNA profile as an Explorer, Bali matches your love for adventure, nature, and cultural discovery.</Text>
          </View>
        </View>

        <View style={s.section}>
          <View style={s.tagRow}>
            {TAGS.map((t) => (<View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Overview</Text>
          <Text style={s.bodyText}>Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Photo Gallery</Text>
          <View style={s.photoGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (<View key={i} style={s.photoCell}><Text style={s.photoText}>{i}</Text></View>))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Best Time to Visit</Text>
          <View style={s.monthRow}>
            {MONTHS.map((m, i) => (
              <View key={m} style={[s.monthChip, BEST_MONTHS.includes(i) && s.monthBest]}>
                <Text style={[s.monthText, BEST_MONTHS.includes(i) && s.monthTextBest]}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Top Attractions</Text>
          {ATTRACTIONS.map((a) => (
            <View key={a.name} style={s.attractionRow}>
              <View style={s.attractionIcon}><Text style={{ fontSize: 18 }}>📍</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.attractionName}>{a.name}</Text>
                <Text style={s.attractionType}>{a.type}</Text>
              </View>
              <Text style={s.attractionRating}>⭐ {a.rating}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Similar Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {SIMILAR.map((d) => (
              <Pressable key={d.city} style={s.similarCard}>
                <View style={s.similarImage}><Text style={s.imgText}>{d.city}</Text></View>
                <Text style={s.similarCity}>{d.city}</Text>
                <Text style={s.similarMatch}>{d.match}% Match</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <View><Text style={s.bottomLabel}>From</Text><Text style={s.bottomPrice}>€850</Text></View>
        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>Plan Your Trip</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  floatingHeader: {
    position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
    height: 100, flexDirection: "row", alignItems: "flex-end",
    paddingHorizontal: 16, paddingBottom: 8, gap: 12,
  },
  headerBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  headerBtnText: { color: "#FFF", fontSize: 20 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 17, fontWeight: "600", textAlign: "center" },
  hero: { height: 380, backgroundColor: "#222", justifyContent: "flex-end", padding: 20, paddingBottom: 24 },
  heroText: { color: "#FFF", fontSize: 28, fontWeight: "800" },
  dnaBadge: { alignSelf: "flex-start", marginTop: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.5)" },
  dnaBadgeText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  statsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: 16, marginHorizontal: 20, marginTop: 12, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  stat: { alignItems: "center" },
  statValue: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  statLabel: { color: "#888", fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: "#333" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: { padding: 16, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  cardText: { color: "#CCC", fontSize: 14, lineHeight: 20 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  tagText: { color: "#CCC", fontSize: 13 },
  bodyText: { color: "#CCC", fontSize: 14, lineHeight: 20 },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  photoCell: { width: "32%", aspectRatio: 1, backgroundColor: "#222", borderRadius: 8, justifyContent: "center", alignItems: "center" },
  photoText: { color: "#555", fontSize: 14 },
  monthRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  monthChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  monthBest: { backgroundColor: "#333", borderColor: "#666" },
  monthText: { color: "#666", fontSize: 12 },
  monthTextBest: { color: "#FFF", fontWeight: "600" },
  attractionRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  attractionIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" },
  attractionName: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  attractionType: { color: "#888", fontSize: 12, marginTop: 2 },
  attractionRating: { color: "#FFF", fontSize: 13 },
  similarCard: { width: 140, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  similarImage: { height: 100, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgText: { color: "#555", fontSize: 12 },
  similarCity: { color: "#FFF", fontSize: 14, fontWeight: "600", paddingHorizontal: 10, paddingTop: 8 },
  similarMatch: { color: "#888", fontSize: 12, paddingHorizontal: 10, paddingTop: 2, paddingBottom: 10 },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  bottomLabel: { color: "#888", fontSize: 12 },
  bottomPrice: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  ctaBtn: { height: 52, paddingHorizontal: 32, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
