// Screen 77 — Delete Account — STATIC WIREFRAME
// Warning card, wallet/trips blockers, type DELETE, reason dropdown, final confirm
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const REASONS = ["Found a better app", "Too expensive", "Privacy concerns", "Not enough features", "Other"];

export default function DeleteAccountScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Delete Account</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Warning card */}
        <View style={s.warningCard}>
          <Text style={s.warningIcon}>⚠️</Text>
          <Text style={s.warningTitle}>This action is permanent</Text>
          <Text style={s.warningBody}>Deleting your account will permanently remove all your data, trips, wallet balance, and travel DNA. This cannot be undone.</Text>
        </View>

        {/* Blockers */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Before you go</Text>
          <View style={s.blockerRow}>
            <Text style={s.blockerIcon}>💰</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.blockerLabel}>Wallet Balance</Text>
              <Text style={s.blockerValue}>€45.00 remaining — will be forfeited</Text>
            </View>
          </View>
          <View style={s.blockerRow}>
            <Text style={s.blockerIcon}>✈️</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.blockerLabel}>Upcoming Trips</Text>
              <Text style={s.blockerValue}>1 active trip — must be cancelled first</Text>
            </View>
          </View>
        </View>

        {/* Reason dropdown */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Why are you leaving?</Text>
          <View style={s.dropdown}>
            <Text style={s.dropdownText}>Select a reason...</Text>
            <Text style={s.dropdownArrow}>▼</Text>
          </View>
          <View style={s.reasonsList}>
            {REASONS.map((r) => (
              <View key={r} style={s.reasonRow}>
                <View style={s.radio} />
                <Text style={s.reasonText}>{r}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Type DELETE */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Confirm Deletion</Text>
          <Text style={s.confirmBody}>Type <Text style={s.deleteWord}>DELETE</Text> to confirm</Text>
          <View style={s.input}><Text style={s.inputPlaceholder}>Type DELETE here</Text></View>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.deleteBtn}><Text style={s.deleteText}>Delete My Account</Text></Pressable>
        <Pressable><Text style={s.cancelText}>Cancel</Text></Pressable>
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
  warningCard: { margin: 20, padding: 20, borderRadius: 16, backgroundColor: "#F8717115", borderWidth: 1, borderColor: "#F8717140", alignItems: "center" },
  warningIcon: { fontSize: 32, marginBottom: 8 },
  warningTitle: { color: "#F87171", fontSize: 18, fontWeight: "800" },
  warningBody: { color: "#F87171", fontSize: 13, textAlign: "center", lineHeight: 20, marginTop: 6, opacity: 0.8 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  blockerRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  blockerIcon: { fontSize: 20 },
  blockerLabel: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  blockerValue: { color: "#888", fontSize: 12, marginTop: 2 },
  dropdown: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 48, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", paddingHorizontal: 14 },
  dropdownText: { color: "#555", fontSize: 15 },
  dropdownArrow: { color: "#555", fontSize: 10 },
  reasonsList: { marginTop: 8, gap: 6 },
  reasonRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#333" },
  reasonText: { color: "#888", fontSize: 14 },
  confirmBody: { color: "#888", fontSize: 14, marginBottom: 8 },
  deleteWord: { color: "#F87171", fontWeight: "800" },
  input: { height: 48, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#F8717140", justifyContent: "center", paddingHorizontal: 14 },
  inputPlaceholder: { color: "#555", fontSize: 15 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222", alignItems: "center", gap: 10 },
  deleteBtn: { width: "100%", height: 52, borderRadius: 26, backgroundColor: "#F8717130", borderWidth: 1, borderColor: "#F87171", justifyContent: "center", alignItems: "center" },
  deleteText: { color: "#F87171", fontSize: 16, fontWeight: "700" },
  cancelText: { color: "#888", fontSize: 14 },
});
