// Screen 51 — Split Payment — STATIC WIREFRAME
// Total amount 140px, People section, Equal/Custom toggle, Summary card 100px, Send Requests
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const PEOPLE = [
  { name: "You", amount: "E695", avatar: "Y" },
  { name: "Sarah M.", amount: "E695", avatar: "S" },
  { name: "David K.", amount: "E695", avatar: "D" },
];

export default function SplitPaymentScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Split Payment</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Total amount — 140px */}
        <View style={s.totalCard}>
          <Text style={s.totalLabel}>Total Amount</Text>
          <Text style={s.totalAmount}>E2,085</Text>
          <Text style={s.totalSub}>Bali Trip — Hotel + Activities</Text>
        </View>

        {/* Equal/Custom toggle */}
        <View style={s.toggleRow}>
          <Pressable style={[s.toggleBtn, s.toggleActive]}><Text style={[s.toggleText, s.toggleTextActive]}>Equal Split</Text></Pressable>
          <Pressable style={s.toggleBtn}><Text style={s.toggleText}>Custom</Text></Pressable>
        </View>

        {/* People section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Split Between</Text>
          {PEOPLE.map((p) => (
            <View key={p.name} style={s.personRow}>
              <View style={s.avatar}><Text style={s.avatarText}>{p.avatar}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.personName}>{p.name}</Text>
                <Text style={s.personStatus}>{p.name === "You" ? "Your share" : "Pending"}</Text>
              </View>
              <Text style={s.personAmount}>{p.amount}</Text>
            </View>
          ))}
          <Pressable style={s.addPerson}><Text style={s.addPersonText}>+ Add Person</Text></Pressable>
        </View>

        {/* Summary card — 100px */}
        <View style={s.summaryCard}>
          <View style={s.summaryRow}><Text style={s.summaryLabel}>Your share</Text><Text style={s.summaryValue}>E695</Text></View>
          <View style={s.summaryRow}><Text style={s.summaryLabel}>Others owe you</Text><Text style={s.summaryValue}>E1,390</Text></View>
          <View style={[s.summaryRow, { borderBottomWidth: 0 }]}><Text style={s.summaryLabel}>Requests to send</Text><Text style={s.summaryValue}>2</Text></View>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.sendBtn}><Text style={s.sendText}>Send Requests</Text></Pressable>
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
  totalCard: { alignItems: "center", margin: 20, padding: 20, height: 140, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  totalLabel: { color: "#888", fontSize: 13 },
  totalAmount: { color: "#FFF", fontSize: 36, fontWeight: "800", marginTop: 4 },
  totalSub: { color: "#666", fontSize: 12, marginTop: 4 },
  toggleRow: { flexDirection: "row", marginHorizontal: 20, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: "center" },
  toggleActive: { backgroundColor: "#333" },
  toggleText: { color: "#888", fontSize: 14, fontWeight: "600" },
  toggleTextActive: { color: "#FFF" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  personRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#888", fontSize: 16, fontWeight: "700" },
  personName: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  personStatus: { color: "#888", fontSize: 12, marginTop: 2 },
  personAmount: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  addPerson: { alignSelf: "center", marginTop: 8, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#333" },
  addPersonText: { color: "#888", fontSize: 13 },
  summaryCard: { margin: 20, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#222" },
  summaryLabel: { color: "#888", fontSize: 13 },
  summaryValue: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  sendBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  sendText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
