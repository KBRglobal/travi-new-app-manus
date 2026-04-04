// Screen 3 — Sign Up
// Route: /sign-up | Mode: Auth
// Visual DNA: #0A0514 bg, Chillax-Bold headline, Satoshi body, glass inputs, gradient CTA

import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const C = {
  bg: "#0A0514",
  surface: "rgba(36,16,62,0.6)",
  border: "rgba(123,68,230,0.3)",
  borderFocus: "#6443F4",
  purple: "#6443F4",
  pink: "#F94498",
  white: "#FFFFFF",
  secondary: "#D3CFD8",
  muted: "#A79FB2",
  placeholder: "#7B6A94",
  success: "#02A65C",
  warning: "#FF9327",
  error: "#FF6B6B",
};

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const strength =
    password.length === 0
      ? { label: "", color: "transparent", pct: 0 }
      : password.length < 6
      ? { label: "Weak", color: C.error, pct: 33 }
      : password.length < 10
      ? { label: "Medium", color: C.warning, pct: 66 }
      : { label: "Strong", color: C.success, pct: 100 };

  const canSubmit =
    email.length > 3 && password.length >= 6 && password === confirm && agreed;

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={s.header}>
          <Pressable
            style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.6 }]}
            onPress={() => router.back()}
          >
            <View style={s.backCircle}>
              <MaterialIcons name="arrow-back" size={20} color={C.white} />
            </View>
          </Pressable>
          <View style={s.stepPill}>
            <Text style={s.stepText}>Step 1 of 4</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 40 }]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={s.headline}>Create Account</Text>
          <Text style={s.body}>Start your personalized travel journey</Text>

          {/* Email */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Email</Text>
            <View style={[s.inputWrap, focused === "email" && s.inputFocused]}>
              <MaterialIcons name="email" size={18} color={C.muted} style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="your@email.com"
                placeholderTextColor={C.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Password */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Password</Text>
            <View style={[s.inputWrap, focused === "pass" && s.inputFocused]}>
              <MaterialIcons name="lock" size={18} color={C.muted} style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="Min. 8 characters"
                placeholderTextColor={C.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
              />
              <Pressable onPress={() => setShowPass(!showPass)} style={s.eyeBtn}>
                <MaterialIcons
                  name={showPass ? "visibility" : "visibility-off"}
                  size={20}
                  color={C.muted}
                />
              </Pressable>
            </View>
            {password.length > 0 && (
              <View style={s.strengthRow}>
                <View style={s.strengthTrack}>
                  <View
                    style={[
                      s.strengthFill,
                      { width: `${strength.pct}%` as any, backgroundColor: strength.color },
                    ]}
                  />
                </View>
                <Text style={[s.strengthLabel, { color: strength.color }]}>
                  {strength.label}
                </Text>
              </View>
            )}
          </View>

          {/* Confirm Password */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Confirm Password</Text>
            <View style={[s.inputWrap, focused === "confirm" && s.inputFocused]}>
              <MaterialIcons name="lock-outline" size={18} color={C.muted} style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="Re-enter password"
                placeholderTextColor={C.placeholder}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showPass}
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused(null)}
              />
              {confirm.length > 0 && password === confirm && (
                <MaterialIcons name="check-circle" size={20} color={C.success} />
              )}
            </View>
          </View>

          {/* Terms */}
          <Pressable style={s.termsRow} onPress={() => setAgreed(!agreed)}>
            <View style={[s.checkbox, agreed && s.checkboxOn]}>
              {agreed && <MaterialIcons name="check" size={14} color={C.white} />}
            </View>
            <Text style={s.termsText}>
              I agree to the{" "}
              <Text style={s.termsLink}>Terms of Service</Text> and{" "}
              <Text style={s.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>

          {/* CTA */}
          <Pressable
            style={({ pressed }) => [
              s.ctaBtn,
              pressed && canSubmit && { opacity: 0.85, transform: [{ scale: 0.98 }] },
            ]}
            onPress={() => canSubmit && router.push("/(auth)/verify")}
            disabled={!canSubmit}
          >
            <LinearGradient
              colors={canSubmit ? [C.purple, C.pink] : ["#2A1A4A", "#2A1A4A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.ctaGrad}
            >
              <Text style={[s.ctaText, !canSubmit && { opacity: 0.4 }]}>
                Create Account
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or continue with</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social auth */}
          <View style={s.socialRow}>
            <Pressable style={({ pressed }) => [s.socialBtn, pressed && { opacity: 0.7 }]}>
              <Text style={s.socialLetter}>G</Text>
              <Text style={s.socialLabel}>Google</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [s.socialBtn, pressed && { opacity: 0.7 }]}>
              <MaterialIcons name="apple" size={20} color={C.white} />
              <Text style={s.socialLabel}>Apple</Text>
            </Pressable>
          </View>

          {/* Sign In */}
          <Pressable
            style={s.signInLink}
            onPress={() => router.back()}
          >
            <Text style={s.signInText}>
              Already have an account?{" "}
              <Text style={s.signInAccent}>Sign In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(36,16,62,0.6)",
    borderWidth: 1,
    borderColor: "rgba(123,68,230,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  stepPill: {
    backgroundColor: "rgba(100,67,244,0.15)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.3)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  stepText: { fontSize: 13, color: C.purple, fontFamily: "Satoshi-Medium" },
  scroll: { paddingHorizontal: 24 },
  headline: {
    fontSize: 32,
    fontFamily: "Chillax-Bold",
    color: C.white,
    marginBottom: 8,
    marginTop: 8,
  },
  body: {
    fontSize: 15,
    fontFamily: "Satoshi-Regular",
    color: C.secondary,
    marginBottom: 28,
  },
  fieldGroup: { marginBottom: 20 },
  label: {
    fontSize: 13,
    fontFamily: "Satoshi-Medium",
    color: C.secondary,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
  },
  inputFocused: { borderColor: C.borderFocus },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    color: C.white,
    fontSize: 15,
    fontFamily: "Satoshi-Regular",
  },
  eyeBtn: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  strengthRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  strengthTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  strengthFill: { height: 3, borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontFamily: "Satoshi-Medium" },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  checkboxOn: { backgroundColor: C.purple, borderColor: C.purple },
  termsText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
    lineHeight: 20,
  },
  termsLink: { color: C.pink, fontFamily: "Satoshi-Medium" },
  ctaBtn: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaGrad: { flex: 1, justifyContent: "center", alignItems: "center" },
  ctaText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: C.white,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(123,68,230,0.2)" },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
  },
  socialRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  socialLetter: {
    fontSize: 18,
    fontFamily: "Satoshi-Bold",
    color: C.white,
  },
  socialLabel: {
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    color: C.white,
  },
  signInLink: {
    alignSelf: "center",
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: "center",
  },
  signInText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
  },
  signInAccent: { color: C.pink, fontFamily: "Satoshi-Bold" },
});
