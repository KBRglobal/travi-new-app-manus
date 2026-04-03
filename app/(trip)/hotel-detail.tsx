// Screen 24 — Hotel Detail — STATIC WIREFRAME
// Route: /(trip)/hotel-detail | Mode: Planning
// Spec: Hero 60% swipe gallery, Quick info 80px (4 cols), Room types, Policies accordion, Fixed CTA

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const QUICK_INFO = [
  { label: "Rating", value: "9.4" },
  { label: "Stars", value: "5" },
  { label: "Check-in", value: "15:00" },
  { label: "WiFi", value: "Free" },
];

const ROOMS = [
  { id: "1", name: "Deluxe Ocean View", size: "45m2", bed: "King", price: "E320", features: ["Ocean view", "Balcony", "Rain shower"] },
  { id: "2", name: "Pool Villa", size: "85m2", bed: "King", price: "E520", features: ["Private pool", "Garden", "Butler service"] },
  { id: "3", name: "Presidential Suite", size: "140m2", bed: "King + Twin", price: "E950", features: ["Living room", "Dining area", "Jacuzzi"] },
];

const POLICIES = ["Free cancellation until Apr 10", "Breakfast included", "No smoking", "Pets not allowed"];

export default function HotelDetailScreen() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero gallery placeholder */}
        <View style={s.hero}>
          <Text style={s.heroText}>Hotel Photo Gallery</Text>
          <View style={s.galleryDots}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View key={i} style={[s.dot, i === 0 && s.dotActive]} />
            ))}
          </View>
          <Pressable style={s.backBtnFloat}><Text style={s.backFloatText}>‹</Text></Pressable>
          <Pressable style={s.heartFloat}><Text style={s.heartFloatText}>♡</Text></Pressable>
        </View>

        {/* Hotel name + location */}
        <View style={s.nameSection}>
          <Text style={s.hotelName}>The Mulia Resort</Text>
          <Text style={s.hotelLocation}>Nusa Dua, Bali, Indonesia</Text>
        </View>

        {/* Quick info 80px 4 cols */}
        <View style={s.quickRow}>
          {QUICK_INFO.map((q) => (
            <View key={q.label} style={s.quickItem}>
              <Text style={s.quickValue}>{q.value}</Text>
              <Text style={s.quickLabel}>{q.label}</Text>
            </View>
          ))}
        </View>

        {/* About */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>About</Text>
          <Text style={s.desc}>Nestled along the pristine shores of Nusa Dua, The Mulia Resort offers an unparalleled luxury experience with world-class amenities, award-winning dining, and breathtaking ocean views.</Text>
        </View>

        {/* Room types */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Room Types</Text>
          {ROOMS.map((r) => (
            <Pressable key={r.id} style={s.roomCard}>
              <View style={s.roomImage}><Text style={s.imgPlaceholder}>Room Photo</Text></View>
              <View style={s.roomBody}>
                <Text style={s.roomName}>{r.name}</Text>
                <Text style={s.roomInfo}>{r.size} | {r.bed}</Text>
                <View style={s.featureRow}>
                  {r.features.map((f) => (
                    <Text key={f} style={s.feature}>- {f}</Text>
                  ))}
                </View>
                <Text style={s.roomPrice}>{r.price}<Text style={s.perNight}>/night</Text></Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Policies */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Policies</Text>
          <View style={s.policyCard}>
            {POLICIES.map((p, i) => (
              <View key={i} style={[s.policyRow, i < POLICIES.length - 1 && s.policyBorder]}>
                <Text style={s.policyText}>+ {p}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed CTA */}
      <View style={s.bottomBar}>
        <View>
          <Text style={s.fromLabel}>From</Text>
          <Text style={s.fromPrice}>E320<Text style={s.perNight}>/night</Text></Text>
        </View>
        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>Select Room</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  hero: { height: 360, backgroundColor: "#1A1A1A", justifyContent: "flex-end", alignItems: "center", paddingBottom: 16 },
  heroText: { color: "#555", fontSize: 16, position: "absolute", top: "45%" },
  galleryDots: { flexDirection: "row", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#555" },
  dotActive: { backgroundColor: "#FFF", width: 20 },
  backBtnFloat: { position: "absolute", top: 52, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  backFloatText: { color: "#FFF", fontSize: 22 },
  heartFloat: { position: "absolute", top: 52, right: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  heartFloatText: { color: "#FFF", fontSize: 18 },
  nameSection: { paddingHorizontal: 20, paddingTop: 20, gap: 4 },
  hotelName: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  hotelLocation: { color: "#888", fontSize: 14 },
  quickRow: { flexDirection: "row", marginHorizontal: 20, marginTop: 16, height: 80, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  quickItem: { flex: 1, justifyContent: "center", alignItems: "center" },
  quickValue: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  quickLabel: { color: "#888", fontSize: 11, marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  desc: { color: "#AAA", fontSize: 14, lineHeight: 22 },
  roomCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden", marginBottom: 12 },
  roomImage: { height: 120, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgPlaceholder: { color: "#555", fontSize: 14 },
  roomBody: { padding: 14, gap: 4 },
  roomName: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  roomInfo: { color: "#888", fontSize: 13 },
  featureRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  feature: { color: "#888", fontSize: 12 },
  roomPrice: { color: "#FFF", fontSize: 18, fontWeight: "800", marginTop: 6 },
  perNight: { color: "#888", fontSize: 12, fontWeight: "400" },
  policyCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  policyRow: { paddingHorizontal: 16, paddingVertical: 14 },
  policyBorder: { borderBottomWidth: 1, borderBottomColor: "#222" },
  policyText: { color: "#CCC", fontSize: 14 },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  fromLabel: { color: "#888", fontSize: 11 },
  fromPrice: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  ctaBtn: { height: 48, paddingHorizontal: 28, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
});
