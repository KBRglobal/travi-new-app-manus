// Screen 4 — Verify Email — DESIGNED
// Route: /verify | Mode: Auth
// Spec: Icon 120x120 borderRadius 24, 6 code boxes (48x56, gap 12), auto-submit, shake, resend timer

import { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Animated } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const C = {
  bgBase: "#1A0B2E",
  bgSurface: "#24103E",
  bgInput: "rgba(36,16,62,0.6)",
  borderInput: "rgba(123,68,230,0.3)",
  borderFocus: "rgba(100,67,244,0.6)",
  purple: "#6443F4",
  pink: "#F94498",
  textPrimary: "#FFFFFF",
  textSecondary: "#D3CFD8",
  textTertiary: "#A79FB2",
  error: "#F87171",
};

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(28);
  const inputRef = useRef<TextInput>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleCodeChange = (text: string) => {
    if (text.length <= 6) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = text[i] || "";
      }
      setCode(newCode);
      setActiveIdx(Math.min(text.length, 5));
      setError(false);
      // Auto-submit on 6th digit
      if (text.length === 6) {
        // Simulate verification
        router.push("/(auth)/profile-setup");
      }
    }
  };

  return (
    <View style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <Pressable
          style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.6 }]}
          onPress={() => router.back()}
        >
          <Text style={s.backArrow}>‹</Text>
        </Pressable>
        <Text style={s.stepText}>Step 2 of 4</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={s.content}>
        {/* Icon — 120x120, borderRadius 24, glass style */}
        <View style={s.iconBox}>
          <Text style={s.iconEmoji}>✉️</Text>
        </View>

        <Text style={s.title}>Check your email</Text>
        <Text style={s.subtitle}>We sent a 6-digit code to{"\n"}user@example.com</Text>

        {/* Hidden TextInput for keyboard */}
        <TextInput
          ref={inputRef}
          style={s.hiddenInput}
          value={code.join("")}
          onChangeText={handleCodeChange}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
        />

        {/* 6 code boxes — 48x56 each, gap 12 */}
        <Animated.View style={[s.codeRow, { transform: [{ translateX: shakeAnim }] }]}>
          <Pressable style={s.codeRow} onPress={() => inputRef.current?.focus()}>
            {code.map((digit, i) => (
              <View
                key={i}
                style={[
                  s.codeBox,
                  i === activeIdx && s.codeBoxActive,
                  error && s.codeBoxError,
                ]}
              >
                <Text style={s.codeText}>{digit}</Text>
                {i === activeIdx && !digit && <View style={s.cursor} />}
              </View>
            ))}
          </Pressable>
        </Animated.View>

        {/* Resend timer */}
        <Text style={s.resendText}>
          Resend code in <Text style={s.resendTimer}>0:{resendTimer.toString().padStart(2, "0")}</Text>
        </Text>
        <Text style={s.resendNote}>3 resends remaining</Text>

        {/* Error state */}
        {error && (
          <View style={s.errorBox}>
            <Text style={s.errorText}>Invalid code. Please try again.</Text>
          </View>
        )}

        {/* Auto-submit note */}
        <Text style={s.autoNote}>Code auto-submits on 6th digit</Text>
      </View>

      {/* Back link — bottom */}
      <View style={s.bottomArea}>
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          onPress={() => router.back()}
        >
          <Text style={s.backLink}>← Back to Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bgBase },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8 },
  backBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  backArrow: { fontSize: 32, color: C.textPrimary, fontWeight: "300" },
  stepText: { fontSize: 14, color: C.textTertiary, fontWeight: "500" },
  content: { flex: 1, alignItems: "center", paddingTop: 48, paddingHorizontal: 24 },
  iconBox: {
    width: 120, height: 120, borderRadius: 24,
    backgroundColor: C.bgSurface,
    borderWidth: 1, borderColor: C.borderInput,
    justifyContent: "center", alignItems: "center", marginBottom: 24,
  },
  iconEmoji: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: "700", color: C.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 15, color: C.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 32 },
  hiddenInput: { position: "absolute", opacity: 0, height: 0, width: 0 },
  codeRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  codeBox: {
    width: 48, height: 56, borderRadius: 12,
    backgroundColor: C.bgInput,
    borderWidth: 1, borderColor: C.borderInput,
    justifyContent: "center", alignItems: "center",
  },
  codeBoxActive: { borderColor: C.borderFocus },
  codeBoxError: { borderColor: C.error },
  codeText: { fontSize: 24, fontWeight: "700", color: C.textPrimary },
  cursor: { position: "absolute", bottom: 12, width: 2, height: 24, backgroundColor: C.purple, borderRadius: 1 },
  resendText: { color: C.textTertiary, fontSize: 14, marginBottom: 4 },
  resendTimer: { color: C.textSecondary, fontWeight: "600" },
  resendNote: { color: C.textTertiary, fontSize: 12, marginBottom: 20 },
  errorBox: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8,
    backgroundColor: "rgba(248,113,113,0.1)", borderWidth: 1, borderColor: "rgba(248,113,113,0.3)",
    marginBottom: 16,
  },
  errorText: { color: C.error, fontSize: 13 },
  autoNote: { color: C.textTertiary, fontSize: 12, fontStyle: "italic" },
  bottomArea: { paddingBottom: 40, alignItems: "center" },
  backLink: { color: C.textTertiary, fontSize: 14 },
});
