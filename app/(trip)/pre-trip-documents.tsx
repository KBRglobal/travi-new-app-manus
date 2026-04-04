// Screen 34 — Pre-Trip Documents — STATIC 
// Status card 100px, Document cards 100px, Status badges, Export PDF
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const DOCS = [
  { title: "Passport", status: "Valid", exp: "Dec 2029", statusColor: "#4ADE80" },
  { title: "Visa / eVisa", status: "Pending", exp: "Applied Mar 28", statusColor: "#FBBF24" },
  { title: "Travel Insurance", status: "Not Added", exp: "", statusColor: "#888" },
  { title: "Flight Tickets", status: "Valid", exp: "Emirates TLV-DPS", statusColor: "#4ADE80" },
  { title: "Hotel Confirmation", status: "Valid", exp: "The Mulia Resort", statusColor: "#4ADE80" },
  { title: "COVID Certificate", status: "Expired", exp: "Expired Jan 2024", statusColor: "#F87171" },
];

export default function PreTripDocumentsScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Documents</Text>
        <Pressable><Text style={s.exportText}>Export PDF</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Status card — 100px */}
        <View style={s.statusCard}>
          <Text style={s.statusTitle}>Document Status</Text>
          <View style={s.statusRow}>
            <View style={s.statusItem}><Text style={[s.statusDot, { color: "#4ADE80" }]}>o</Text><Text style={s.statusLabel}>3 Valid</Text></View>
            <View style={s.statusItem}><Text style={[s.statusDot, { color: "#FBBF24" }]}>o</Text><Text style={s.statusLabel}>1 Pending</Text></View>
            <View style={s.statusItem}><Text style={[s.statusDot, { color: "#888" }]}>o</Text><Text style={s.statusLabel}>1 Missing</Text></View>
            <View style={s.statusItem}><Text style={[s.statusDot, { color: "#F87171" }]}>o</Text><Text style={s.statusLabel}>1 Expired</Text></View>
          </View>
        </View>

        {/* Document cards — 100px each */}
        {DOCS.map((doc) => (
          <Pressable key={doc.title} style={s.docCard}>
            <View style={s.docIcon}><Text style={s.docIconText}>D</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.docTitle}>{doc.title}</Text>
              {doc.exp ? <Text style={s.docExp}>{doc.exp}</Text> : null}
            </View>
            <View style={[s.badge, { borderColor: doc.statusColor }]}>
              <Text style={[s.badgeText, { color: doc.statusColor }]}>{doc.status}</Text>
            </View>
          </Pressable>
        ))}

        {/* Add document */}
        <Pressable style={s.addBtn}>
          <Text style={s.addText}>+ Add Document</Text>
        </Pressable>
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
  exportText: { color: "#888", fontSize: 13 },
  statusCard: { margin: 20, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  statusTitle: { color: "#FFF", fontSize: 15, fontWeight: "600", marginBottom: 10 },
  statusRow: { flexDirection: "row", gap: 16 },
  statusItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  statusDot: { fontSize: 14 },
  statusLabel: { color: "#888", fontSize: 12 },
  docCard: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 8, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 12 },
  docIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  docIconText: { color: "#888", fontSize: 16, fontWeight: "700" },
  docTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  docExp: { color: "#888", fontSize: 12, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  addBtn: { marginHorizontal: 20, marginTop: 8, height: 48, borderRadius: 12, borderWidth: 1, borderColor: "#333", borderStyle: "dashed", justifyContent: "center", alignItems: "center" },
  addText: { color: "#888", fontSize: 14 },
});
