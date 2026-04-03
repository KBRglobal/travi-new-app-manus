// Screen 4 — Verify Email — STATIC WIREFRAME
// Route: /verify-email | Mode: Auth
// Spec: Icon 120x120 borderRadius 24, 6 code boxes (48x56, gap 12)
// Resend 30s countdown max 3, Auto-submit on 6th, Error shake, Back link

import { View, Text, StyleSheet, Pressable } from "react-native";

export default function VerifyScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backIcon}>←</Text></Pressable>
        <Text style={s.headerTitle}>Verify Email</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={s.content}>
        {/* Icon — 120x120, borderRadius 24 */}
        <View style={s.iconBox}>
          <Text style={s.iconEmoji}>✉️</Text>
        </View>

        <Text style={s.title}>Check your email</Text>
        <Text style={s.subtitle}>We sent a 6-digit code to{"\n"}user@example.com</Text>

        {/* 6 code boxes — 48x56 each, gap 12 */}
        <View style={s.codeRow}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={[s.codeBox, i === 0 && s.codeBoxActive]}>
              <Text style={s.codeText}>{i === 0 ? "4" : ""}</Text>
            </View>
          ))}
        </View>

        {/* Resend timer */}
        <Text style={s.resendText}>
          Resend code in <Text style={s.resendTimer}>0:28</Text>
        </Text>
        <Text style={s.resendNote}>3 resends remaining</Text>

        {/* Error state example */}
        <View style={s.errorBox}>
          <Text style={s.errorText}>Invalid code. Please try again.</Text>
        </View>

        {/* Auto-submit note */}
        <Text style={s.autoNote}>Code auto-submits on 6th digit</Text>
      </View>

      {/* Back link — bottom */}
      <View style={s.bottomArea}>
        <Text style={s.backLink}>← Back to Sign Up</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#222", marginTop: 48,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center" },
  backIcon: { color: "#FFF", fontSize: 20 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  content: { flex: 1, alignItems: "center", paddingTop: 48, paddingHorizontal: 24 },
  iconBox: {
    width: 120, height: 120, borderRadius: 24,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
    justifyContent: "center", alignItems: "center", marginBottom: 24,
  },
  iconEmoji: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: "700", color: "#FFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#999", textAlign: "center", lineHeight: 22, marginBottom: 32 },
  codeRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  codeBox: {
    width: 48, height: 56, borderRadius: 12,
    backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333",
    justifyContent: "center", alignItems: "center",
  },
  codeBoxActive: { borderColor: "#555" },
  codeText: { fontSize: 24, fontWeight: "700", color: "#FFF" },
  resendText: { color: "#888", fontSize: 14, marginBottom: 4 },
  resendTimer: { color: "#AAA", fontWeight: "600" },
  resendNote: { color: "#666", fontSize: 12, marginBottom: 20 },
  errorBox: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8,
    backgroundColor: "rgba(239,68,68,0.1)", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)",
    marginBottom: 16,
  },
  errorText: { color: "#EF4444", fontSize: 13 },
  autoNote: { color: "#555", fontSize: 12, fontStyle: "italic" },
  bottomArea: { paddingBottom: 40, alignItems: "center" },
  backLink: { color: "#888", fontSize: 14 },
});
