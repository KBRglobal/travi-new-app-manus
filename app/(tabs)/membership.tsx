// Screen 53 — Membership — STATIC WIREFRAME
// Current tier 160px, 3-col comparison table, FAQ accordion, Cancel link
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const TIERS = [
  { name: "Free", price: "E0", features: ["Basic DNA", "3 trips/year", "Standard support", "—", "—"] },
  { name: "Explorer", price: "E9.99/mo", features: ["Full DNA", "Unlimited trips", "Priority support", "10% cashback", "—"], current: true },
  { name: "Elite", price: "E24.99/mo", features: ["Full DNA+", "Unlimited trips", "24/7 concierge", "15% cashback", "Lounge access"] },
];

const FEATURES = ["DNA Analysis", "Trips", "Support", "Cashback", "Perks"];

const FAQS = [
  { q: "Can I cancel anytime?", a: "Yes, cancel anytime. You'll keep access until the end of your billing period." },
  { q: "What happens to my cashback?", a: "Earned cashback stays in your wallet regardless of membership status." },
  { q: "Can I upgrade mid-cycle?", a: "Yes, you'll be charged the prorated difference for the remaining period." },
];

export default function MembershipScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Membership</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Current tier — 160px */}
        <View style={s.currentCard}>
          <Text style={s.currentLabel}>Current Plan</Text>
          <Text style={s.currentTier}>Explorer</Text>
          <Text style={s.currentPrice}>E9.99/month</Text>
          <Text style={s.currentRenewal}>Renews Apr 15, 2026</Text>
        </View>

        {/* 3-col comparison table */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Compare Plans</Text>
          <View style={s.table}>
            {/* Header row */}
            <View style={s.tableRow}>
              <View style={s.tableCell}><Text style={s.tableCellText}> </Text></View>
              {TIERS.map((t) => (
                <View key={t.name} style={[s.tableCell, t.current && s.tableCellCurrent]}>
                  <Text style={[s.tierName, t.current && { color: "#FFF" }]}>{t.name}</Text>
                  <Text style={s.tierPrice}>{t.price}</Text>
                </View>
              ))}
            </View>
            {/* Feature rows */}
            {FEATURES.map((feat, fi) => (
              <View key={feat} style={s.tableRow}>
                <View style={s.tableCell}><Text style={s.featLabel}>{feat}</Text></View>
                {TIERS.map((t) => (
                  <View key={t.name} style={[s.tableCell, t.current && s.tableCellCurrent]}>
                    <Text style={s.featValue}>{t.features[fi]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* FAQ accordion */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>FAQ</Text>
          {FAQS.map((faq, i) => (
            <View key={i} style={s.faqCard}>
              <Text style={s.faqQ}>{faq.q}</Text>
              <Text style={s.faqA}>{faq.a}</Text>
            </View>
          ))}
        </View>

        {/* Cancel link */}
        <Pressable style={s.cancelLink}><Text style={s.cancelText}>Cancel Membership</Text></Pressable>
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
  currentCard: { alignItems: "center", margin: 20, padding: 20, height: 160, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  currentLabel: { color: "#888", fontSize: 12 },
  currentTier: { color: "#FFF", fontSize: 28, fontWeight: "800", marginTop: 4 },
  currentPrice: { color: "#BBB", fontSize: 15, marginTop: 4 },
  currentRenewal: { color: "#666", fontSize: 12, marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  table: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#222" },
  tableCell: { flex: 1, padding: 10, alignItems: "center", justifyContent: "center" },
  tableCellCurrent: { backgroundColor: "#222" },
  tierName: { color: "#888", fontSize: 13, fontWeight: "700" },
  tierPrice: { color: "#666", fontSize: 11, marginTop: 2 },
  featLabel: { color: "#888", fontSize: 12, textAlign: "left" },
  featValue: { color: "#BBB", fontSize: 12, textAlign: "center" },
  faqCard: { padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  faqQ: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  faqA: { color: "#888", fontSize: 13, marginTop: 6, lineHeight: 20 },
  cancelLink: { alignSelf: "center", marginTop: 20, paddingVertical: 8 },
  cancelText: { color: "#F87171", fontSize: 14 },
});
