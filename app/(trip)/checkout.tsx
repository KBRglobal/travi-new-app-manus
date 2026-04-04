// Screen 28 — Checkout Phase 1 — STATIC 
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const STEPS = ["Review", "Payment", "Confirm"];

export default function CheckoutScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Checkout</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Progress steps */}
      <View style={s.steps}>
        {STEPS.map((step, i) => (
          <View key={step} style={s.stepItem}>
            <View style={[s.stepCircle, i === 0 && s.stepActive]}>
              <Text style={[s.stepNum, i === 0 && s.stepNumActive]}>{i + 1}</Text>
            </View>
            <Text style={[s.stepLabel, i === 0 && s.stepLabelActive]}>{step}</Text>
            {i < STEPS.length - 1 && <View style={s.stepLine} />}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        {/* Security badge */}
        <View style={s.securityBadge}>
          <Text style={s.securityIcon}>LOCK</Text>
          <Text style={s.securityText}>256-bit SSL Encrypted | PCI Compliant</Text>
        </View>

        {/* Price lock timer */}
        <View style={s.timerCard}>
          <Text style={s.timerLabel}>Price locked for</Text>
          <Text style={s.timerValue}>14:59</Text>
          <Text style={s.timerSub}>Complete checkout to secure this price</Text>
        </View>

        {/* Order summary */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Order Summary</Text>
          <View style={s.summaryCard}>
            <View style={s.sumRow}><Text style={s.sumLabel}>Flights (2)</Text><Text style={s.sumValue}>E1,780</Text></View>
            <View style={s.sumRow}><Text style={s.sumLabel}>Hotel (7 nights)</Text><Text style={s.sumValue}>E2,240</Text></View>
            <View style={s.sumRow}><Text style={s.sumLabel}>Activities (4)</Text><Text style={s.sumValue}>E150</Text></View>
            <View style={s.divider} />
            <View style={s.sumRow}><Text style={s.sumTotal}>Total</Text><Text style={s.sumTotalVal}>E4,170</Text></View>
          </View>
        </View>

        {/* Split pay toggle */}
        <View style={s.section}>
          <View style={s.splitRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.splitTitle}>Split Payment</Text>
              <Text style={s.splitSub}>Pay in 4 installments of E1,042.50</Text>
            </View>
            <View style={s.toggle}><View style={s.toggleKnob} /></View>
          </View>
        </View>

        {/* Contact info */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Contact Information</Text>
          <View style={s.inputCard}>
            <Text style={s.inputLabel}>Email</Text>
            <Text style={s.inputValue}>user@example.com</Text>
          </View>
          <View style={s.inputCard}>
            <Text style={s.inputLabel}>Phone</Text>
            <Text style={s.inputValue}>+972 50 123 4567</Text>
          </View>
        </View>

        {/* Confirmation checkbox */}
        <View style={s.confirmRow}>
          <View style={s.checkbox} />
          <Text style={s.confirmText}>I confirm the details above are correct and I agree to the booking terms</Text>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.cta}><Text style={s.ctaText}>Continue to Payment</Text></Pressable>
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
  steps: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 16, gap: 4 },
  stepItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  stepActive: { backgroundColor: "#555" },
  stepNum: { color: "#666", fontSize: 12, fontWeight: "700" },
  stepNumActive: { color: "#FFF" },
  stepLabel: { color: "#666", fontSize: 12 },
  stepLabelActive: { color: "#FFF" },
  stepLine: { width: 24, height: 1, backgroundColor: "#333", marginHorizontal: 4 },
  securityBadge: { flexDirection: "row", alignItems: "center", gap: 8, marginHorizontal: 20, marginTop: 8, padding: 10, borderRadius: 8, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  securityIcon: { color: "#4ADE80", fontSize: 12, fontWeight: "700" },
  securityText: { color: "#888", fontSize: 11 },
  timerCard: { marginHorizontal: 20, marginTop: 12, padding: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", alignItems: "center" },
  timerLabel: { color: "#888", fontSize: 12 },
  timerValue: { color: "#FFF", fontSize: 32, fontWeight: "800", marginTop: 4 },
  timerSub: { color: "#666", fontSize: 11, marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  summaryCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16 },
  sumRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  sumLabel: { color: "#888", fontSize: 14 },
  sumValue: { color: "#FFF", fontSize: 14 },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 8 },
  sumTotal: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  sumTotalVal: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  splitRow: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  splitTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  splitSub: { color: "#888", fontSize: 12, marginTop: 2 },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#333", justifyContent: "center", paddingHorizontal: 2 },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#666" },
  inputCard: { padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  inputLabel: { color: "#888", fontSize: 11, marginBottom: 4 },
  inputValue: { color: "#FFF", fontSize: 14 },
  confirmRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingHorizontal: 20, marginTop: 16 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: "#555", marginTop: 2 },
  confirmText: { color: "#888", fontSize: 12, flex: 1, lineHeight: 18 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  cta: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
