// Screen 3 — Sign Up — STATIC WIREFRAME
// Route: /signup | Mode: Auth
// Spec: Header 60px (back + Step 1/3), Email + Password + Confirm + Strength bar
// + Terms checkbox, Primary button disabled until all valid, Social (Google/Apple), Sign-in link

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backIcon}>←</Text></Pressable>
        <Text style={s.headerTitle}>Create Account</Text>
        <Text style={s.stepLabel}>Step 1/3</Text>
      </View>

      <ScrollView style={s.body} contentContainerStyle={s.bodyContent}>
        {/* Email */}
        <View style={s.field}>
          <Text style={s.label}>Email</Text>
          <View style={s.input}><Text style={s.placeholder}>your@email.com</Text></View>
        </View>

        {/* Password */}
        <View style={s.field}>
          <Text style={s.label}>Password</Text>
          <View style={s.input}>
            <Text style={s.placeholder}>••••••••</Text>
            <Text style={s.eye}>👁</Text>
          </View>
          {/* Strength bar */}
          <View style={s.strengthRow}>
            <View style={s.strengthTrack}>
              <View style={[s.strengthFill, { width: "40%", backgroundColor: "#F59E0B" }]} />
            </View>
            <Text style={{ color: "#F59E0B", fontSize: 12 }}>Medium</Text>
          </View>
          {/* Requirements checklist */}
          <View style={s.reqList}>
            <Text style={s.reqOk}>✓ 8+ characters</Text>
            <Text style={s.reqOk}>✓ Uppercase letter</Text>
            <Text style={s.reqNo}>○ Number</Text>
            <Text style={s.reqNo}>○ Special character</Text>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={s.field}>
          <Text style={s.label}>Confirm Password</Text>
          <View style={s.input}><Text style={s.placeholder}>••••••••</Text></View>
        </View>

        {/* Terms checkbox */}
        <View style={s.checkRow}>
          <View style={s.checkbox} />
          <Text style={s.checkLabel}>
            I agree to the <Text style={s.link}>Terms of Service</Text> and{" "}
            <Text style={s.link}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Primary CTA — disabled */}
        <Pressable style={[s.primaryBtn, { opacity: 0.4 }]}>
          <Text style={s.primaryText}>Create Account</Text>
        </Pressable>

        {/* Divider */}
        <View style={s.divider}>
          <View style={s.dividerLine} />
          <Text style={s.dividerText}>or</Text>
          <View style={s.dividerLine} />
        </View>

        {/* Social buttons */}
        <Pressable style={s.socialBtn}>
          <Text style={s.socialIcon}>G</Text>
          <Text style={s.socialText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={s.socialBtn}>
          <Text style={s.socialIcon}></Text>
          <Text style={s.socialText}>Continue with Apple</Text>
        </Pressable>

        {/* Sign in link */}
        <Text style={s.bottomText}>
          Already have an account? <Text style={s.link}>Sign In</Text>
        </Text>
      </ScrollView>
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
  stepLabel: { color: "#888", fontSize: 13 },
  body: { flex: 1 },
  bodyContent: { padding: 24, gap: 20, paddingBottom: 60 },
  field: { gap: 8 },
  label: { color: "#CCC", fontSize: 14, fontWeight: "500" },
  input: {
    height: 52, borderRadius: 12, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", paddingHorizontal: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  placeholder: { color: "#555", fontSize: 15 },
  eye: { fontSize: 16 },
  strengthRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  strengthTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: "#333" },
  strengthFill: { height: 4, borderRadius: 2 },
  reqList: { gap: 4 },
  reqOk: { color: "#4ADE80", fontSize: 12 },
  reqNo: { color: "#555", fontSize: 12 },
  checkRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 1.5, borderColor: "#555", marginTop: 2 },
  checkLabel: { flex: 1, color: "#999", fontSize: 13, lineHeight: 20 },
  link: { color: "#AAA", textDecorationLine: "underline" },
  primaryBtn: {
    height: 56, borderRadius: 28, backgroundColor: "#333",
    justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#555",
  },
  primaryText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#333" },
  dividerText: { color: "#666", fontSize: 13 },
  socialBtn: {
    height: 52, borderRadius: 12, backgroundColor: "#1A1A1A",
    borderWidth: 1, borderColor: "#333", flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 10,
  },
  socialIcon: { fontSize: 18, color: "#FFF" },
  socialText: { color: "#CCC", fontSize: 15, fontWeight: "500" },
  bottomText: { color: "#888", fontSize: 14, textAlign: "center", marginTop: 8 },
});
