// Screen 4 — Verify Email
// Route: /verify | Mode: Auth
// Visual DNA: #0A0514 bg, Chillax-Bold, Satoshi, glass code boxes, gradient icon

import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Animated } from "react-native";
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
  error: "#FF6B6B",
};

export default function VerifyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(28);
  const inputRef = useRef<TextInput>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t = setInterval(() => {
      setResendTimer((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleCodeChange = (text: string) => {
    if (text.length <= 6) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) newCode[i] = text[i] || "";
      setCode(newCode);
      setActiveIdx(Math.min(text.length, 5));
      setError(false);
      if (text.length === 6) router.push("/(auth)/profile-setup");
    }
  };

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
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
          <Text style={s.stepText}>Step 2 of 4</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={s.content}>
        {/* Icon */}
        <LinearGradient
          colors={[C.purple, C.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.iconBox}
        >
          <MaterialIcons name="mark-email-unread" size={48} color={C.white} />
        </LinearGradient>

        <Text style={s.title}>Check your email</Text>
        <Text style={s.subtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={s.emailHighlight}>user@example.com</Text>
        </Text>

        {/* Hidden input */}
        <TextInput
          ref={inputRef}
          style={s.hiddenInput}
          value={code.join("")}
          onChangeText={handleCodeChange}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
        />

        {/* Code boxes */}
        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <Pressable style={s.codeRow} onPress={() => inputRef.current?.focus()}>
            {code.map((digit, i) => (
              <View
                key={i}
                style={[
                  s.codeBox,
                  i === activeIdx && s.codeBoxActive,
                  error && s.codeBoxError,
                  digit && s.codeBoxFilled,
                ]}
              >
                <Text style={s.codeText}>{digit}</Text>
                {i === activeIdx && !digit && <View style={s.cursor} />}
              </View>
            ))}
          </Pressable>
        </Animated.View>

        {/* Resend */}
        <View style={s.resendArea}>
          {resendTimer > 0 ? (
            <Text style={s.resendText}>
              Resend in{" "}
              <Text style={s.resendTimer}>
                0:{resendTimer.toString().padStart(2, "0")}
              </Text>
            </Text>
          ) : (
            <Pressable onPress={() => setResendTimer(28)}>
              <Text style={s.resendActive}>Resend Code</Text>
            </Pressable>
          )}
          <Text style={s.resendNote}>3 resends remaining</Text>
        </View>

        {error && (
          <View style={s.errorBox}>
            <MaterialIcons name="error-outline" size={16} color={C.error} />
            <Text style={s.errorText}>Invalid code. Please try again.</Text>
          </View>
        )}

        <Text style={s.autoNote}>Code auto-submits on 6th digit</Text>
      </View>

      {/* Bottom back link */}
      <View style={[s.bottomArea, { paddingBottom: insets.bottom + 24 }]}>
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
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
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
  content: { flex: 1, alignItems: "center", paddingTop: 40, paddingHorizontal: 24 },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "Chillax-Bold",
    color: C.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Satoshi-Regular",
    color: C.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },
  emailHighlight: { color: C.white, fontFamily: "Satoshi-Bold" },
  hiddenInput: { position: "absolute", opacity: 0, height: 0, width: 0 },
  codeRow: { flexDirection: "row", gap: 10, marginBottom: 28 },
  codeBox: {
    width: 48,
    height: 58,
    borderRadius: 14,
    backgroundColor: C.surface,
    borderWidth: 1.5,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
  },
  codeBoxActive: { borderColor: C.purple },
  codeBoxFilled: { borderColor: "rgba(100,67,244,0.5)", backgroundColor: "rgba(100,67,244,0.1)" },
  codeBoxError: { borderColor: C.error },
  codeText: {
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    color: C.white,
  },
  cursor: {
    position: "absolute",
    bottom: 10,
    width: 2,
    height: 20,
    backgroundColor: C.purple,
    borderRadius: 1,
  },
  resendArea: { alignItems: "center", gap: 4, marginBottom: 20 },
  resendText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
  },
  resendTimer: { color: C.white, fontFamily: "Satoshi-Bold" },
  resendActive: {
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
    color: C.pink,
  },
  resendNote: {
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,107,107,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.3)",
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Satoshi-Regular",
    color: C.error,
  },
  autoNote: {
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
    fontStyle: "italic",
  },
  bottomArea: { alignItems: "center" },
  backLink: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: C.muted,
  },
});
