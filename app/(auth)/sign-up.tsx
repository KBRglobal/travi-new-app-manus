// Screen 3 — Sign Up — DESIGNED
// Route: /sign-up | Mode: Auth
// Spec: Back arrow, Step 1/4, Email+Password+Confirm, strength bar, terms, gradient CTA, social, sign-in link

import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const C = {
  bgBase: "#1A0B2E",
  bgInput: "rgba(36,16,62,0.6)",
  borderInput: "rgba(123,68,230,0.3)",
  borderFocus: "rgba(100,67,244,0.6)",
  purple: "#6443F4",
  pink: "#F94498",
  textPrimary: "#FFFFFF",
  textSecondary: "#D3CFD8",
  textTertiary: "#A79FB2",
  textPlaceholder: "#7B6A94",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
};

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const strength = password.length === 0
    ? { label: "", color: "transparent", pct: 0 }
    : password.length < 6
      ? { label: "Weak", color: C.error, pct: 33 }
      : password.length < 10
        ? { label: "Medium", color: C.warning, pct: 66 }
        : { label: "Strong", color: C.success, pct: 100 };

  const canSubmit = email.length > 3 && password.length >= 6 && password === confirm && agreed;

  return (
    <View style={s.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={s.header}>
          <Pressable style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.6 }]} onPress={() => router.back()}>
            <Text style={s.backArrow}>‹</Text>
          </Pressable>
          <Text style={s.stepText}>Step 1 of 4</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <Text style={s.headline}>Create Account</Text>
          <Text style={s.body}>Start your personalized travel journey</Text>

          {/* Email */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Email</Text>
            <View style={[s.inputWrap, focused === "email" && s.inputFocused]}>
              <Text style={s.inputIcon}>📧</Text>
              <TextInput style={s.input} placeholder="your@email.com" placeholderTextColor={C.textPlaceholder}
                value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
            </View>
          </View>

          {/* Password */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Password</Text>
            <View style={[s.inputWrap, focused === "pass" && s.inputFocused]}>
              <Text style={s.inputIcon}>🔒</Text>
              <TextInput style={s.input} placeholder="Min. 8 characters" placeholderTextColor={C.textPlaceholder}
                value={password} onChangeText={setPassword} secureTextEntry={!showPass}
                onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)} />
              <Pressable onPress={() => setShowPass(!showPass)} style={s.eyeBtn}>
                <Text style={{ fontSize: 16 }}>{showPass ? "👁️" : "👁️‍🗨️"}</Text>
              </Pressable>
            </View>
            {password.length > 0 && (
              <View style={s.strengthRow}>
                <View style={s.strengthTrack}>
                  <View style={[s.strengthFill, { width: `${strength.pct}%` as any, backgroundColor: strength.color }]} />
                </View>
                <Text style={[s.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
              </View>
            )}
          </View>

          {/* Confirm */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Confirm Password</Text>
            <View style={[s.inputWrap, focused === "confirm" && s.inputFocused]}>
              <Text style={s.inputIcon}>🔒</Text>
              <TextInput style={s.input} placeholder="Re-enter password" placeholderTextColor={C.textPlaceholder}
                value={confirm} onChangeText={setConfirm} secureTextEntry={!showPass}
                onFocus={() => setFocused("confirm")} onBlur={() => setFocused(null)} />
              {confirm.length > 0 && password === confirm && <Text style={{ fontSize: 16 }}>✅</Text>}
            </View>
          </View>

          {/* Terms */}
          <Pressable style={s.termsRow} onPress={() => setAgreed(!agreed)}>
            <View style={[s.checkbox, agreed && s.checkboxOn]}>
              {agreed && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.termsText}>
              I agree to the <Text style={s.termsLink}>Terms of Service</Text> and <Text style={s.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>

          {/* CTA */}
          <Pressable
            style={({ pressed }) => [s.ctaBtn, pressed && canSubmit && { opacity: 0.8, transform: [{ scale: 0.98 }] }]}
            onPress={() => canSubmit && router.push("/(auth)/verify")}
            disabled={!canSubmit}
          >
            <LinearGradient
              colors={canSubmit ? [C.purple, C.pink] : ["#3A2A5C", "#3A2A5C"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGrad}
            >
              <Text style={[s.ctaText, !canSubmit && { opacity: 0.5 }]}>Create Account</Text>
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social */}
          <View style={s.socialRow}>
            <Pressable style={({ pressed }) => [s.socialBtn, pressed && { opacity: 0.7 }]}>
              <Text style={s.socialIcon}>G</Text>
              <Text style={s.socialLabel}>Google</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [s.socialBtn, pressed && { opacity: 0.7 }]}>
              <Text style={s.socialIcon}></Text>
              <Text style={s.socialLabel}>Apple</Text>
            </Pressable>
          </View>

          {/* Sign In */}
          <Pressable style={s.signInLink} onPress={() => router.back()}>
            <Text style={s.signInText}>Already have an account? <Text style={s.signInAccent}>Sign In</Text></Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bgBase },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8 },
  backBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  backArrow: { fontSize: 32, color: C.textPrimary, fontWeight: "300" },
  stepText: { fontSize: 14, color: C.textTertiary, fontWeight: "500" },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  headline: { fontSize: 28, fontWeight: "800", color: C.textPrimary, marginBottom: 8, marginTop: 8 },
  body: { fontSize: 16, color: C.textSecondary, marginBottom: 28 },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: C.textSecondary, fontWeight: "600", marginBottom: 8 },
  inputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: C.bgInput, borderWidth: 1, borderColor: C.borderInput, borderRadius: 16, height: 52, paddingHorizontal: 16 },
  inputFocused: { borderColor: C.borderFocus },
  inputIcon: { fontSize: 16, marginRight: 12 },
  input: { flex: 1, color: C.textPrimary, fontSize: 16 },
  eyeBtn: { padding: 8, minWidth: 44, minHeight: 44, justifyContent: "center", alignItems: "center" },
  strengthRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  strengthTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.1)" },
  strengthFill: { height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontWeight: "600" },
  termsRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 24, gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: C.borderInput, justifyContent: "center", alignItems: "center", marginTop: 2 },
  checkboxOn: { backgroundColor: C.purple, borderColor: C.purple },
  checkmark: { color: C.textPrimary, fontSize: 14, fontWeight: "700" },
  termsText: { flex: 1, fontSize: 13, color: C.textTertiary, lineHeight: 20 },
  termsLink: { color: C.pink, fontWeight: "500" },
  ctaBtn: { width: "100%", height: 56, borderRadius: 28, overflow: "hidden", shadowColor: C.pink, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  ctaGrad: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 28 },
  ctaText: { fontSize: 16, fontWeight: "700", color: C.textPrimary },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(123,68,230,0.2)" },
  dividerText: { marginHorizontal: 16, fontSize: 14, color: C.textTertiary },
  socialRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  socialBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: C.bgInput, borderWidth: 1, borderColor: C.borderInput, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
  socialIcon: { fontSize: 18, color: C.textPrimary },
  socialLabel: { fontSize: 14, color: C.textPrimary, fontWeight: "600" },
  signInLink: { alignSelf: "center", paddingVertical: 8, minHeight: 44, justifyContent: "center" },
  signInText: { fontSize: 14, color: C.textTertiary },
  signInAccent: { color: C.pink, fontWeight: "600" },
});
