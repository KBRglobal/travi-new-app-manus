// Screen 29 — Payment Method Modal — STATIC WIREFRAME
// 75% bottom sheet, Saved cards + Add new form + Social payments, Radio selection
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const SAVED_CARDS = [
  { id: "1", type: "Visa", last4: "4242", exp: "12/27" },
  { id: "2", type: "Mastercard", last4: "8888", exp: "06/26" },
];

const SOCIAL_PAY = ["Apple Pay", "Google Pay", "PayPal"];

export default function PaymentModalScreen() {
  return (
    <View style={s.root}>
      {/* Backdrop */}
      <View style={s.backdrop} />

      {/* Bottom sheet — 75% */}
      <View style={s.sheet}>
        <View style={s.handle} />
        <Text style={s.sheetTitle}>Payment Method</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Saved cards */}
          <Text style={s.sectionTitle}>Saved Cards</Text>
          {SAVED_CARDS.map((card) => (
            <Pressable key={card.id} style={s.cardRow}>
              <View style={s.radio}><View style={card.id === "1" ? s.radioFill : undefined} /></View>
              <View style={s.cardIcon}><Text style={s.cardIconText}>{card.type[0]}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.cardType}>{card.type} **** {card.last4}</Text>
                <Text style={s.cardExp}>Expires {card.exp}</Text>
              </View>
            </Pressable>
          ))}

          {/* Add new card */}
          <Text style={[s.sectionTitle, { marginTop: 20 }]}>Add New Card</Text>
          <View style={s.formCard}>
            <View style={s.input}><Text style={s.inputPlaceholder}>Card Number</Text></View>
            <View style={s.inputRow}>
              <View style={[s.input, { flex: 1 }]}><Text style={s.inputPlaceholder}>MM/YY</Text></View>
              <View style={[s.input, { flex: 1 }]}><Text style={s.inputPlaceholder}>CVV</Text></View>
            </View>
            <View style={s.input}><Text style={s.inputPlaceholder}>Cardholder Name</Text></View>
          </View>

          {/* Social payments */}
          <Text style={[s.sectionTitle, { marginTop: 20 }]}>Quick Pay</Text>
          {SOCIAL_PAY.map((method) => (
            <Pressable key={method} style={s.socialRow}>
              <View style={s.radio} />
              <Text style={s.socialText}>{method}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={s.cta}><Text style={s.ctaText}>Confirm Payment Method</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  backdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)" },
  sheet: { position: "absolute", bottom: 0, left: 0, right: 0, height: "75%", backgroundColor: "#151515", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#444", alignSelf: "center", marginBottom: 16 },
  sheetTitle: { color: "#FFF", fontSize: 20, fontWeight: "700", marginBottom: 20 },
  sectionTitle: { color: "#FFF", fontSize: 14, fontWeight: "600", marginBottom: 10 },
  cardRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  radioFill: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#FFF" },
  cardIcon: { width: 36, height: 24, borderRadius: 4, backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
  cardIconText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  cardType: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  cardExp: { color: "#888", fontSize: 12, marginTop: 2 },
  formCard: { gap: 8 },
  input: { height: 48, borderRadius: 10, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 14 },
  inputRow: { flexDirection: "row", gap: 8 },
  inputPlaceholder: { color: "#555", fontSize: 14 },
  socialRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  socialText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  cta: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
