// Screen 27 — Cart / Trip Review — STATIC 
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FLIGHTS = [
  { route: "TLV > DPS", airline: "Emirates", time: "22:00-14:30+1", price: "E890" },
  { route: "DPS > TLV", airline: "Emirates", time: "16:00-06:30+1", price: "E890" },
];
const HOTEL = { name: "The Mulia Resort", room: "Deluxe Ocean View", nights: 7, price: "E2,240" };
const ACTIVITIES = [
  { title: "Bali Swing Experience", price: "E45" },
  { title: "Ubud Rice Terraces Tour", price: "E35" },
  { title: "Mount Batur Sunrise Trek", price: "E55" },
  { title: "Monkey Forest Sanctuary", price: "E15" },
];

export default function CartScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Trip Review</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 300 }}>
        {/* Flights accordion */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Flights</Text>
            <Text style={s.sectionCount}>{FLIGHTS.length} items</Text>
          </View>
          {FLIGHTS.map((f, i) => (
            <View key={i} style={s.itemCard}>
              <View style={{ flex: 1 }}>
                <Text style={s.itemTitle}>{f.route}</Text>
                <Text style={s.itemSub}>{f.airline} | {f.time}</Text>
              </View>
              <Text style={s.itemPrice}>{f.price}</Text>
            </View>
          ))}
        </View>

        {/* Hotel accordion */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Hotel</Text>
            <Text style={s.sectionCount}>1 item</Text>
          </View>
          <View style={s.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={s.itemTitle}>{HOTEL.name}</Text>
              <Text style={s.itemSub}>{HOTEL.room} | {HOTEL.nights} nights</Text>
            </View>
            <Text style={s.itemPrice}>{HOTEL.price}</Text>
          </View>
        </View>

        {/* Activities accordion */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Activities</Text>
            <Text style={s.sectionCount}>{ACTIVITIES.length} items</Text>
          </View>
          {ACTIVITIES.map((a, i) => (
            <View key={i} style={s.itemCard}>
              <Text style={[s.itemTitle, { flex: 1 }]}>{a.title}</Text>
              <Text style={s.itemPrice}>{a.price}</Text>
            </View>
          ))}
        </View>

        {/* Promo code */}
        <View style={s.promoRow}>
          <View style={s.promoInput}><Text style={s.promoPlaceholder}>Promo code</Text></View>
          <Pressable style={s.promoBtn}><Text style={s.promoBtnText}>Apply</Text></Pressable>
        </View>
      </ScrollView>

      {/* Price summary — 240px */}
      <View style={s.priceSummary}>
        <View style={s.priceRow}><Text style={s.priceLabel}>Flights</Text><Text style={s.priceValue}>E1,780</Text></View>
        <View style={s.priceRow}><Text style={s.priceLabel}>Hotel</Text><Text style={s.priceValue}>E2,240</Text></View>
        <View style={s.priceRow}><Text style={s.priceLabel}>Activities</Text><Text style={s.priceValue}>E150</Text></View>
        <View style={s.divider} />
        <View style={s.priceRow}><Text style={s.totalLabel}>Total</Text><Text style={s.totalValue}>E4,170</Text></View>
        <View style={s.priceRow}><Text style={s.cashbackLabel}>Cashback earned</Text><Text style={s.cashbackValue}>+E417</Text></View>

        <View style={s.termsRow}>
          <View style={s.checkbox} />
          <Text style={s.termsText}>I agree to the Terms & Conditions</Text>
        </View>

        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>Proceed to Checkout</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  sectionCount: { color: "#888", fontSize: 12 },
  itemCard: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  itemTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  itemSub: { color: "#888", fontSize: 12, marginTop: 2 },
  itemPrice: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  promoRow: { flexDirection: "row", paddingHorizontal: 20, marginTop: 16, gap: 8 },
  promoInput: { flex: 1, height: 44, borderRadius: 10, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 14 },
  promoPlaceholder: { color: "#555", fontSize: 14 },
  promoBtn: { height: 44, paddingHorizontal: 16, borderRadius: 10, backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
  promoBtnText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  priceSummary: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#151515", borderTopWidth: 1, borderTopColor: "#222" },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  priceLabel: { color: "#888", fontSize: 14 },
  priceValue: { color: "#FFF", fontSize: 14 },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 8 },
  totalLabel: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  totalValue: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  cashbackLabel: { color: "#4ADE80", fontSize: 13 },
  cashbackValue: { color: "#4ADE80", fontSize: 14, fontWeight: "700" },
  termsRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: "#555" },
  termsText: { color: "#888", fontSize: 12, flex: 1 },
  ctaBtn: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center", marginTop: 12 },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
