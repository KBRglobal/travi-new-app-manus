// Screen 31 — Booking Confirmation — STATIC WIREFRAME
// Hero 320px gradient + confetti, Confirmation number, What's Next timeline, No back button
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const NEXT_STEPS = [
  { step: 1, title: "Check Your Email", desc: "Confirmation details sent to user@example.com", done: true },
  { step: 2, title: "Complete Pre-Trip Checklist", desc: "Passport, visa, insurance, packing list", done: false },
  { step: 3, title: "Upload Documents", desc: "Add passport, visa, and insurance documents", done: false },
  { step: 4, title: "Activate Live Mode", desc: "Available 24h before departure", done: false },
];

export default function ConfirmationScreen() {
  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero — 320px */}
        <View style={s.hero}>
          <Text style={s.confetti}>* * * * *</Text>
          <View style={s.checkCircle}><Text style={s.checkMark}>+</Text></View>
          <Text style={s.heroTitle}>Booking Confirmed!</Text>
          <Text style={s.heroSub}>Your trip to Bali is booked</Text>

          {/* Confirmation number */}
          <View style={s.confNumCard}>
            <Text style={s.confLabel}>Confirmation Number</Text>
            <Text style={s.confNum}>TRAVI-2604-A7X9K</Text>
          </View>
        </View>

        {/* Trip summary */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Trip Summary</Text>
          <View style={s.summaryCard}>
            <View style={s.sumRow}><Text style={s.sumLabel}>Destination</Text><Text style={s.sumValue}>Bali, Indonesia</Text></View>
            <View style={s.sumRow}><Text style={s.sumLabel}>Dates</Text><Text style={s.sumValue}>Apr 15-22, 2026</Text></View>
            <View style={s.sumRow}><Text style={s.sumLabel}>Travelers</Text><Text style={s.sumValue}>2 Adults</Text></View>
            <View style={s.divider} />
            <View style={s.sumRow}><Text style={s.sumLabel}>Total Paid</Text><Text style={s.sumTotal}>E4,170</Text></View>
            <View style={s.sumRow}><Text style={s.cashLabel}>Cashback Earned</Text><Text style={s.cashValue}>+E417</Text></View>
          </View>
        </View>

        {/* What's Next timeline */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>What's Next</Text>
          {NEXT_STEPS.map((item, i) => (
            <View key={item.step} style={s.timelineItem}>
              <View style={s.timelineLeft}>
                <View style={[s.timelineDot, item.done && s.timelineDotDone]}>
                  <Text style={s.timelineDotText}>{item.done ? "+" : item.step}</Text>
                </View>
                {i < NEXT_STEPS.length - 1 && <View style={s.timelineLine} />}
              </View>
              <View style={s.timelineBody}>
                <Text style={s.timelineTitle}>{item.title}</Text>
                <Text style={s.timelineDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={s.actions}>
          <Pressable style={s.primaryBtn}><Text style={s.primaryText}>Go to My Trips</Text></Pressable>
          <Pressable style={s.secondaryBtn}><Text style={s.secondaryText}>Share Trip Details</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  hero: { height: 320, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center", paddingTop: 48, gap: 8 },
  confetti: { color: "#555", fontSize: 24, letterSpacing: 8 },
  checkCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#222", borderWidth: 2, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  checkMark: { color: "#FFF", fontSize: 28, fontWeight: "700" },
  heroTitle: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  heroSub: { color: "#888", fontSize: 14 },
  confNumCard: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, backgroundColor: "#222", borderWidth: 1, borderColor: "#444", alignItems: "center" },
  confLabel: { color: "#888", fontSize: 11 },
  confNum: { color: "#FFF", fontSize: 18, fontWeight: "800", marginTop: 2, letterSpacing: 1 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  summaryCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16 },
  sumRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  sumLabel: { color: "#888", fontSize: 14 },
  sumValue: { color: "#FFF", fontSize: 14 },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 8 },
  sumTotal: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  cashLabel: { color: "#4ADE80", fontSize: 13 },
  cashValue: { color: "#4ADE80", fontSize: 14, fontWeight: "700" },
  timelineItem: { flexDirection: "row", marginBottom: 4 },
  timelineLeft: { width: 40, alignItems: "center" },
  timelineDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#222", borderWidth: 1, borderColor: "#444", justifyContent: "center", alignItems: "center" },
  timelineDotDone: { backgroundColor: "#333", borderColor: "#666" },
  timelineDotText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  timelineLine: { flex: 1, width: 1, backgroundColor: "#333", marginVertical: 4 },
  timelineBody: { flex: 1, paddingLeft: 8, paddingBottom: 16 },
  timelineTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  timelineDesc: { color: "#888", fontSize: 12, marginTop: 2, lineHeight: 18 },
  actions: { paddingHorizontal: 20, marginTop: 24, gap: 10 },
  primaryBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  primaryText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  secondaryBtn: { height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  secondaryText: { color: "#888", fontSize: 14 },
});
