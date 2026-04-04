// Screen 76 — Change Email/Password — STATIC 
// Email: 3 fields + verify code | Password: 3 fields + requirements checklist
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const PW_REQS = [
  { label: "At least 8 characters", met: true },
  { label: "One uppercase letter", met: true },
  { label: "One lowercase letter", met: true },
  { label: "One number", met: false },
  { label: "One special character", met: false },
];

export default function ChangeCredentialsScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Change Password</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Change Email Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Change Email</Text>
          <View style={s.field}><Text style={s.fieldLabel}>Current Email</Text><View style={s.input}><Text style={s.inputText}>amit@example.com</Text></View></View>
          <View style={s.field}><Text style={s.fieldLabel}>New Email</Text><View style={s.input}><Text style={s.inputPlaceholder}>Enter new email</Text></View></View>
          <View style={s.field}><Text style={s.fieldLabel}>Verification Code</Text><View style={s.input}><Text style={s.inputPlaceholder}>Enter code sent to new email</Text></View></View>
          <Pressable style={s.actionBtn}><Text style={s.actionText}>Send Verification Code</Text></Pressable>
        </View>

        {/* Change Password Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Change Password</Text>
          <View style={s.field}><Text style={s.fieldLabel}>Current Password</Text><View style={s.input}><Text style={s.inputPlaceholder}>Enter current password</Text></View></View>
          <View style={s.field}><Text style={s.fieldLabel}>New Password</Text><View style={s.input}><Text style={s.inputPlaceholder}>Enter new password</Text></View></View>
          <View style={s.field}><Text style={s.fieldLabel}>Confirm New Password</Text><View style={s.input}><Text style={s.inputPlaceholder}>Confirm new password</Text></View></View>

          {/* Requirements checklist */}
          <View style={s.reqsCard}>
            <Text style={s.reqsTitle}>Password Requirements</Text>
            {PW_REQS.map((r) => (
              <View key={r.label} style={s.reqRow}>
                <Text style={[s.reqCheck, r.met && s.reqMet]}>{r.met ? "✓" : "○"}</Text>
                <Text style={[s.reqLabel, r.met && s.reqLabelMet]}>{r.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.saveBtn}><Text style={s.saveText}>Save Changes</Text></Pressable>
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
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 12 },
  field: { marginBottom: 12 },
  fieldLabel: { color: "#888", fontSize: 13, marginBottom: 4 },
  input: { height: 48, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 14 },
  inputText: { color: "#FFF", fontSize: 15 },
  inputPlaceholder: { color: "#555", fontSize: 15 },
  actionBtn: { alignSelf: "flex-start", marginTop: 4, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: "#333" },
  actionText: { color: "#888", fontSize: 13 },
  reqsCard: { marginTop: 12, padding: 14, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  reqsTitle: { color: "#FFF", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  reqRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  reqCheck: { color: "#555", fontSize: 14, width: 18 },
  reqMet: { color: "#4ADE80" },
  reqLabel: { color: "#888", fontSize: 13 },
  reqLabelMet: { color: "#BBB" },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  saveBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  saveText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
