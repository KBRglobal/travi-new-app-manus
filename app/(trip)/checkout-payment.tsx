// Screen 30 — Checkout Phase 2 — STATIC WIREFRAME
// Progress step 2, Billing address, Terms, Pay Now button + processing overlay
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const STEPS = ["Review", "Payment", "Confirm"];

export default function CheckoutPaymentScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Payment</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Progress — step 2 active */}
      <View style={s.steps}>
        {STEPS.map((step, i) => (
          <View key={step} style={s.stepItem}>
            <View style={[s.stepCircle, i <= 1 && s.stepDone]}>
              <Text style={[s.stepNum, i <= 1 && s.stepNumDone]}>{i < 1 ? "+" : i + 1}</Text>
            </View>
            <Text style={[s.stepLabel, i <= 1 && s.stepLabelDone]}>{step}</Text>
            {i < STEPS.length - 1 && <View style={[s.stepLine, i < 1 && s.stepLineDone]} />}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        {/* Selected payment method */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Payment Method</Text>
          <View style={s.methodCard}>
            <View style={s.cardIcon}><Text style={s.cardIconText}>V</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.methodName}>Visa **** 4242</Text>
              <Text style={s.methodExp}>Expires 12/27</Text>
            </View>
            <Pressable><Text style={s.changeText}>Change</Text></Pressable>
          </View>
        </View>

        {/* Billing address */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Billing Address</Text>
          <View style={s.formCard}>
            <View style={s.input}><Text style={s.inputPlaceholder}>Full Name</Text></View>
            <View style={s.input}><Text style={s.inputPlaceholder}>Address Line 1</Text></View>
            <View style={s.input}><Text style={s.inputPlaceholder}>Address Line 2 (optional)</Text></View>
            <View style={s.inputRow}>
              <View style={[s.input, { flex: 1 }]}><Text style={s.inputPlaceholder}>City</Text></View>
              <View style={[s.input, { flex: 1 }]}><Text style={s.inputPlaceholder}>ZIP</Text></View>
            </View>
            <View style={s.input}><Text style={s.inputPlaceholder}>Country</Text></View>
          </View>
        </View>

        {/* Terms */}
        <View style={s.termsRow}>
          <View style={s.checkbox} />
          <Text style={s.termsText}>I agree to the Terms of Service, Privacy Policy, and Cancellation Policy</Text>
        </View>

        {/* Price summary */}
        <View style={s.priceCard}>
          <View style={s.priceRow}><Text style={s.priceLabel}>Total</Text><Text style={s.priceValue}>E4,170</Text></View>
          <View style={s.priceRow}><Text style={s.cashLabel}>Cashback</Text><Text style={s.cashValue}>+E417</Text></View>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.cta}><Text style={s.ctaText}>Pay E4,170 Now</Text></Pressable>
        <Text style={s.secureText}>Secured by 256-bit SSL encryption</Text>
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
  stepDone: { backgroundColor: "#555" },
  stepNum: { color: "#666", fontSize: 12, fontWeight: "700" },
  stepNumDone: { color: "#FFF" },
  stepLabel: { color: "#666", fontSize: 12 },
  stepLabelDone: { color: "#FFF" },
  stepLine: { width: 24, height: 1, backgroundColor: "#333", marginHorizontal: 4 },
  stepLineDone: { backgroundColor: "#555" },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  methodCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  cardIcon: { width: 40, height: 28, borderRadius: 4, backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
  cardIconText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  methodName: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  methodExp: { color: "#888", fontSize: 12, marginTop: 2 },
  changeText: { color: "#888", fontSize: 13 },
  formCard: { gap: 8 },
  input: { height: 48, borderRadius: 10, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 14 },
  inputRow: { flexDirection: "row", gap: 8 },
  inputPlaceholder: { color: "#555", fontSize: 14 },
  termsRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingHorizontal: 20, marginTop: 20 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: "#555", marginTop: 2 },
  termsText: { color: "#888", fontSize: 12, flex: 1, lineHeight: 18 },
  priceCard: { marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  priceLabel: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  priceValue: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  cashLabel: { color: "#4ADE80", fontSize: 13 },
  cashValue: { color: "#4ADE80", fontSize: 14, fontWeight: "700" },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222", alignItems: "center", gap: 8 },
  cta: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  secureText: { color: "#666", fontSize: 11 },
});
