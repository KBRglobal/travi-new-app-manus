// Screen 38 — Activity Detail Live — STATIC 
// Hero 50%, Quick Actions + Booking Details + What to Know + Photos + Nearby
// Context button: Mark as Done / I'm Here / Rate Experience
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function ActivityDetailLiveScreen() {
  return (
    <View style={s.root}>
      {/* Hero — 50% */}
      <View style={s.hero}>
        <Text style={s.heroPlaceholder}>[ACTIVITY PHOTO]</Text>
        <View style={s.heroOverlay}>
          <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        </View>
        <View style={s.heroInfo}>
          <Text style={s.heroTitle}>Ubud Rice Terraces</Text>
          <Text style={s.heroSub}>Tegallalang, Bali</Text>
          <View style={s.ratingRow}>
            <Text style={s.stars}>* * * * *</Text>
            <Text style={s.ratingText}>4.7 (2,340 reviews)</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Quick actions */}
        <View style={s.quickActions}>
          <Pressable style={s.qAction}><Text style={s.qIcon}>N</Text><Text style={s.qLabel}>Navigate</Text></Pressable>
          <Pressable style={s.qAction}><Text style={s.qIcon}>C</Text><Text style={s.qLabel}>Call</Text></Pressable>
          <Pressable style={s.qAction}><Text style={s.qIcon}>S</Text><Text style={s.qLabel}>Share</Text></Pressable>
          <Pressable style={s.qAction}><Text style={s.qIcon}>P</Text><Text style={s.qLabel}>Photos</Text></Pressable>
        </View>

        {/* Booking details */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Booking Details</Text>
          <View style={s.card}>
            <View style={s.detailRow}><Text style={s.detailLabel}>Date</Text><Text style={s.detailValue}>Apr 16, 2026</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Time</Text><Text style={s.detailValue}>10:00 - 12:00</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Duration</Text><Text style={s.detailValue}>2 hours</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Tickets</Text><Text style={s.detailValue}>2 Adults</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Confirmation</Text><Text style={s.detailValue}>#RT-2604-X7</Text></View>
          </View>
        </View>

        {/* What to know */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>What to Know</Text>
          <View style={s.card}>
            <Text style={s.tipText}>• Wear comfortable shoes for walking on uneven terrain</Text>
            <Text style={s.tipText}>• Bring sunscreen and a hat — limited shade</Text>
            <Text style={s.tipText}>• Best photos at the main terrace viewpoint</Text>
            <Text style={s.tipText}>• Local guides available at entrance (E10/person)</Text>
          </View>
        </View>

        {/* Nearby */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Nearby</Text>
          <View style={s.nearbyRow}>
            <View style={s.nearbyCard}><Text style={s.nearbyTitle}>Cafe Wayan</Text><Text style={s.nearbySub}>300m | Restaurant</Text></View>
            <View style={s.nearbyCard}><Text style={s.nearbyTitle}>Art Market</Text><Text style={s.nearbySub}>500m | Shopping</Text></View>
          </View>
        </View>
      </ScrollView>

      {/* Context button */}
      <View style={s.bottom}>
        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>I'm Here</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  hero: { height: "50%", backgroundColor: "#1A1A1A", justifyContent: "flex-end" },
  heroPlaceholder: { position: "absolute", top: "40%", alignSelf: "center", color: "#333", fontSize: 18 },
  heroOverlay: { position: "absolute", top: 48, left: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 20 },
  heroInfo: { padding: 20 },
  heroTitle: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  heroSub: { color: "#BBB", fontSize: 14, marginTop: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  stars: { color: "#FBBF24", fontSize: 14 },
  ratingText: { color: "#888", fontSize: 12 },
  quickActions: { flexDirection: "row", paddingHorizontal: 20, paddingVertical: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: "#222" },
  qAction: { flex: 1, alignItems: "center", gap: 4 },
  qIcon: { color: "#888", fontSize: 18, fontWeight: "700" },
  qLabel: { color: "#888", fontSize: 11 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  card: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  detailLabel: { color: "#888", fontSize: 14 },
  detailValue: { color: "#FFF", fontSize: 14 },
  tipText: { color: "#BBB", fontSize: 13, lineHeight: 22 },
  nearbyRow: { flexDirection: "row", gap: 12 },
  nearbyCard: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  nearbyTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  nearbySub: { color: "#888", fontSize: 11, marginTop: 4 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  ctaBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
