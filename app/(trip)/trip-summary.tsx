// Screen 45 — Trip Summary — STATIC WIREFRAME
// Hero 200px photo collage, Highlights scroll 300px, Map summary 220px, Expenses donut 200px, DNA Impact 160px
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const HIGHLIGHTS = [
  { title: "Ubud Rice Terraces", rating: "4.9", type: "Activity" },
  { title: "Sunset at Tanah Lot", rating: "4.8", type: "Activity" },
  { title: "Sardine Restaurant", rating: "4.7", type: "Food" },
  { title: "Monkey Forest", rating: "4.5", type: "Activity" },
];

const EXPENSES = [
  { category: "Accommodation", amount: "E1,400", pct: "34%" },
  { category: "Flights", amount: "E1,200", pct: "29%" },
  { category: "Activities", amount: "E650", pct: "16%" },
  { category: "Food & Drink", amount: "E520", pct: "12%" },
  { category: "Transport", amount: "E250", pct: "6%" },
  { category: "Shopping", amount: "E150", pct: "3%" },
];

export default function TripSummaryScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Trip Summary</Text>
        <Pressable><Text style={s.shareText}>Share</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero — 200px photo collage */}
        <View style={s.hero}>
          <View style={s.heroMain}><Text style={s.heroPlaceholder}>[MAIN PHOTO]</Text></View>
          <View style={s.heroSide}>
            <View style={s.heroSmall}><Text style={s.heroPlaceholder}>[2]</Text></View>
            <View style={s.heroSmall}><Text style={s.heroPlaceholder}>[3]</Text></View>
          </View>
        </View>
        <View style={s.heroInfo}>
          <Text style={s.heroTitle}>Bali, Indonesia</Text>
          <Text style={s.heroSub}>Apr 15 - Apr 21, 2026 | 7 days</Text>
        </View>

        {/* Highlights scroll — 300px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Highlights</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hlScroll}>
            {HIGHLIGHTS.map((h, i) => (
              <View key={i} style={s.hlCard}>
                <View style={s.hlPhoto}><Text style={s.hlPhotoText}>[PHOTO]</Text></View>
                <Text style={s.hlTitle}>{h.title}</Text>
                <Text style={s.hlSub}>{h.type} | {h.rating} *</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Map summary — 220px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Your Journey</Text>
          <View style={s.mapCard}>
            <Text style={s.mapPlaceholder}>[MAP WITH ROUTE]</Text>
            <View style={s.mapStats}>
              <View style={s.mapStat}><Text style={s.mapStatNum}>12</Text><Text style={s.mapStatLabel}>Places</Text></View>
              <View style={s.mapStat}><Text style={s.mapStatNum}>180km</Text><Text style={s.mapStatLabel}>Traveled</Text></View>
              <View style={s.mapStat}><Text style={s.mapStatNum}>4</Text><Text style={s.mapStatLabel}>Cities</Text></View>
            </View>
          </View>
        </View>

        {/* Expenses donut — 200px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Expenses Breakdown</Text>
          <View style={s.expCard}>
            <View style={s.donut}><Text style={s.donutText}>E4,170</Text><Text style={s.donutSub}>Total</Text></View>
            <View style={s.expList}>
              {EXPENSES.map((e, i) => (
                <View key={i} style={s.expRow}>
                  <Text style={s.expCat}>{e.category}</Text>
                  <Text style={s.expAmt}>{e.amount}</Text>
                  <Text style={s.expPct}>{e.pct}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* DNA Impact — 160px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>DNA Impact</Text>
          <View style={s.dnaCard}>
            <Text style={s.dnaTitle}>Your travel DNA evolved!</Text>
            <View style={s.dnaRow}>
              <View style={s.dnaDim}><Text style={s.dnaLabel}>Adventure</Text><View style={s.dnaBar}><View style={[s.dnaFill, { width: "85%" }]} /></View></View>
              <View style={s.dnaDim}><Text style={s.dnaLabel}>Culture</Text><View style={s.dnaBar}><View style={[s.dnaFill, { width: "72%" }]} /></View></View>
              <View style={s.dnaDim}><Text style={s.dnaLabel}>Food</Text><View style={s.dnaBar}><View style={[s.dnaFill, { width: "68%" }]} /></View></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  shareText: { color: "#888", fontSize: 14 },
  hero: { flexDirection: "row", height: 200, margin: 16, gap: 4 },
  heroMain: { flex: 2, borderRadius: 14, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" },
  heroSide: { flex: 1, gap: 4 },
  heroSmall: { flex: 1, borderRadius: 14, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" },
  heroPlaceholder: { color: "#444", fontSize: 14 },
  heroInfo: { paddingHorizontal: 20 },
  heroTitle: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  heroSub: { color: "#888", fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  hlScroll: { gap: 12 },
  hlCard: { width: 160, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  hlPhoto: { height: 100, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  hlPhotoText: { color: "#444", fontSize: 12 },
  hlTitle: { color: "#FFF", fontSize: 13, fontWeight: "600", padding: 10, paddingBottom: 2 },
  hlSub: { color: "#888", fontSize: 11, paddingHorizontal: 10, paddingBottom: 10 },
  mapCard: { height: 220, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  mapPlaceholder: { color: "#444", fontSize: 14 },
  mapStats: { flexDirection: "row", position: "absolute", bottom: 16, gap: 24 },
  mapStat: { alignItems: "center" },
  mapStatNum: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  mapStatLabel: { color: "#888", fontSize: 11 },
  expCard: { flexDirection: "row", height: 200, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16, gap: 16 },
  donut: { width: 100, justifyContent: "center", alignItems: "center" },
  donutText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  donutSub: { color: "#888", fontSize: 11 },
  expList: { flex: 1, justifyContent: "center", gap: 4 },
  expRow: { flexDirection: "row", alignItems: "center" },
  expCat: { flex: 1, color: "#BBB", fontSize: 12 },
  expAmt: { color: "#FFF", fontSize: 12, fontWeight: "600", width: 60, textAlign: "right" },
  expPct: { color: "#888", fontSize: 11, width: 32, textAlign: "right" },
  dnaCard: { height: 160, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16, justifyContent: "center" },
  dnaTitle: { color: "#FFF", fontSize: 14, fontWeight: "600", marginBottom: 12 },
  dnaRow: { gap: 8 },
  dnaDim: { gap: 4 },
  dnaLabel: { color: "#888", fontSize: 12 },
  dnaBar: { height: 8, borderRadius: 4, backgroundColor: "#222" },
  dnaFill: { height: 8, borderRadius: 4, backgroundColor: "#555" },
});
