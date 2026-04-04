// Screen 49 — Add Funds — STATIC 
// Balance display, Large amount input, Quick chips (€20/50/100/200), Fee notice
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const QUICK_AMOUNTS = ["E20", "E50", "E100", "E200"];

export default function AddFundsScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Add Funds</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Current balance */}
        <View style={s.balanceCard}>
          <Text style={s.balanceLabel}>Current Balance</Text>
          <Text style={s.balanceAmount}>E1,247.50</Text>
        </View>

        {/* Large amount input */}
        <View style={s.inputSection}>
          <Text style={s.inputLabel}>Amount to Add</Text>
          <View style={s.amountInput}>
            <Text style={s.currency}>E</Text>
            <Text style={s.amountText}>0.00</Text>
          </View>
        </View>

        {/* Quick chips */}
        <View style={s.chipsRow}>
          {QUICK_AMOUNTS.map((amt) => (
            <Pressable key={amt} style={s.chip}>
              <Text style={s.chipText}>{amt}</Text>
            </Pressable>
          ))}
        </View>

        {/* Payment method */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Payment Method</Text>
          <Pressable style={s.methodCard}>
            <View style={s.methodIcon}><Text style={s.methodIconText}>V</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.methodTitle}>Visa ending in 4242</Text>
              <Text style={s.methodSub}>Expires 12/28</Text>
            </View>
            <Text style={s.methodArrow}>{">"}</Text>
          </Pressable>
        </View>

        {/* Fee notice */}
        <View style={s.feeNotice}>
          <Text style={s.feeText}>No fees for adding funds. Funds are available immediately.</Text>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.addBtn}><Text style={s.addText}>Add Funds</Text></Pressable>
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
  balanceCard: { alignItems: "center", paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: "#222" },
  balanceLabel: { color: "#888", fontSize: 13 },
  balanceAmount: { color: "#FFF", fontSize: 28, fontWeight: "800", marginTop: 4 },
  inputSection: { alignItems: "center", paddingVertical: 32 },
  inputLabel: { color: "#888", fontSize: 14, marginBottom: 12 },
  amountInput: { flexDirection: "row", alignItems: "baseline" },
  currency: { color: "#888", fontSize: 24, marginRight: 4 },
  amountText: { color: "#FFF", fontSize: 48, fontWeight: "800" },
  chipsRow: { flexDirection: "row", justifyContent: "center", gap: 12, paddingHorizontal: 20 },
  chip: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  chipText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 28 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  methodCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  methodIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  methodIconText: { color: "#888", fontSize: 16, fontWeight: "700" },
  methodTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  methodSub: { color: "#888", fontSize: 12, marginTop: 2 },
  methodArrow: { color: "#555", fontSize: 14 },
  feeNotice: { marginHorizontal: 20, marginTop: 16, padding: 12, borderRadius: 10, backgroundColor: "#1A1A1A" },
  feeText: { color: "#888", fontSize: 12, textAlign: "center" },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  addBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  addText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
