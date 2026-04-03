/**
 * Verify Email Screen — Neutral Wireframe
 * Spec: 6-digit code, auto-submit on 6th digit, shake on error,
 *       resend timer (30s), max 3 resends, paste detection, back link.
 */
import { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Animated, KeyboardAvoidingView, Platform, Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const CODE_LENGTH = 6;
const MAX_RESENDS = 3;

const N = {
  bg:       "#111111",
  surface:  "#1A1A1A",
  white:    "#FFFFFF",
  textSec:  "#ABABAB",
  textTer:  "#777777",
  accent:   "#007AFF",
  border:   "#333333",
  error:    "#FF6B6B",
  success:  "#4ADE80",
  disabled: "#444444",
};

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { dispatch } = useStore();

  const [code, setCode]           = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer]         = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [verified, setVerified]   = useState(false);
  const [error, setError]         = useState(false);
  const [loading, setLoading]     = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);
  const shakeAnim     = useRef(new Animated.Value(0)).current;
  const successScale  = useRef(new Animated.Value(0)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer((v) => v - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    setTimeout(() => inputs.current[0]?.focus(), 300);
  }, []);

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleChange = (val: string, idx: number) => {
    // Paste detection: if user pastes a 6-digit code
    if (val.length >= CODE_LENGTH) {
      const digits = val.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
      if (digits.length === CODE_LENGTH) {
        const newCode = digits.split("");
        setCode(newCode);
        setError(false);
        setTimeout(() => handleVerify(newCode.join("")), 300);
        return;
      }
    }

    const digit = val.replace(/[^0-9]/g, "").slice(-1);
    const newCode = [...code];
    newCode[idx] = digit;
    setCode(newCode);
    setError(false);

    if (digit && idx < CODE_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }

    // Auto-submit on 6th digit
    if (idx === CODE_LENGTH - 1 && digit && newCode.every((c) => c !== "")) {
      setTimeout(() => handleVerify(newCode.join("")), 300);
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[idx] && idx > 0) {
      const newCode = [...code];
      newCode[idx - 1] = "";
      setCode(newCode);
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = (fullCode?: string) => {
    const entered = fullCode || code.join("");
    if (entered.length < CODE_LENGTH) return;

    setLoading(true);

    // Demo: any 6 digits = success
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      Animated.parallel([
        Animated.spring(successScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(successOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        dispatch({ type: "SET_AUTH", payload: { isAuthenticated: true, isGuest: false } });
        dispatch({
          type: "SET_PROFILE",
          payload: {
            id: Date.now().toString(), name: "", email: email || "",
            quizCompleted: false, travelerDNA: {},
            activityCategories: [], tripPace: "balanced" as const,
            foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
            points: 0, xp: 0, lifetimeSavings: 0, subscriptionActive: false,
          },
        });
        router.push("/(auth)/profile-setup" as never);
      }, 1200);
    }, 800);
  };

  const handleResend = () => {
    if (resendCount >= MAX_RESENDS) {
      Alert.alert("Too many attempts", "Please contact support for help.");
      return;
    }
    setTimer(30);
    setCanResend(false);
    setResendCount((c) => c + 1);
    setCode(Array(CODE_LENGTH).fill(""));
    setError(false);
    inputs.current[0]?.focus();
    // Toast would show "Code resent to {email}"
  };

  const allFilled = code.every(Boolean);

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={s.inner}>
            {/* Back button */}
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
              <IconSymbol name="chevron.left" size={20} color={N.textSec} />
            </TouchableOpacity>

            {/* Icon */}
            <View style={s.iconWrap}>
              <IconSymbol name="envelope.fill" size={40} color={N.accent} />
            </View>

            {/* Title */}
            <Text style={s.title}>Check your email</Text>
            <Text style={s.subtitle}>
              We sent a verification code to{"\n"}
              <Text style={s.emailHighlight}>{email || "your email"}</Text>
            </Text>

            {/* Code inputs */}
            <Animated.View style={[s.codeRow, { transform: [{ translateX: shakeAnim }] }]}>
              {code.map((digit, idx) => (
                <View
                  key={idx}
                  style={[
                    s.codeBox,
                    digit ? s.codeBoxFilled : null,
                    error ? s.codeBoxError : null,
                    verified ? s.codeBoxSuccess : null,
                  ]}
                >
                  <TextInput
                    ref={(r) => { inputs.current[idx] = r; }}
                    style={[s.codeInput, digit ? s.codeInputFilled : null]}
                    value={digit}
                    onChangeText={(v) => handleChange(v, idx)}
                    onKeyPress={(e) => handleKeyPress(e, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    caretHidden
                    editable={!verified && !loading}
                  />
                </View>
              ))}
            </Animated.View>

            {/* Error message */}
            {error && (
              <Text style={s.errorText}>Invalid code. Please try again.</Text>
            )}

            {/* Success badge */}
            {verified && (
              <Animated.View style={[s.successBadge, {
                opacity: successOpacity,
                transform: [{ scale: successScale }],
              }]}>
                <IconSymbol name="checkmark.circle.fill" size={22} color={N.success} />
                <Text style={s.successText}>Verified! Redirecting...</Text>
              </Animated.View>
            )}

            {/* Verify button */}
            {!verified && (
              <TouchableOpacity
                style={[s.verifyBtn, !allFilled && s.verifyBtnDisabled]}
                onPress={() => handleVerify()}
                activeOpacity={0.8}
                disabled={!allFilled || loading}
              >
                <Text style={[s.verifyText, !allFilled && s.verifyTextDim]}>
                  {loading ? "Verifying..." : "Verify Email"}
                </Text>
              </TouchableOpacity>
            )}

            {/* Resend */}
            <View style={s.resendRow}>
              <Text style={s.resendLabel}>Didn't receive the code? </Text>
              {resendCount >= MAX_RESENDS ? (
                <Text style={s.resendDisabled}>Contact support</Text>
              ) : canResend ? (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <Text style={s.resendLink}>Resend</Text>
                </TouchableOpacity>
              ) : (
                <Text style={s.resendTimer}>Resend ({timer}s)</Text>
              )}
            </View>

            {/* Back link */}
            <TouchableOpacity
              style={s.backLink}
              onPress={() => router.push("/(auth)/sign-up" as never)}
              activeOpacity={0.7}
            >
              <Text style={s.backLinkText}>{"< Back"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  safe: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 28, paddingTop: 20, alignItems: "center" },

  backBtn: {
    alignSelf: "flex-start",
    width: 44, height: 44,
    borderRadius: 12,
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  iconWrap: {
    width: 80, height: 80,
    borderRadius: 24,
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 28, fontWeight: "800", color: N.white,
    letterSpacing: -0.5, marginBottom: 10, textAlign: "center",
  },
  subtitle: {
    fontSize: 15, color: N.textSec, textAlign: "center",
    lineHeight: 22, marginBottom: 36,
  },
  emailHighlight: { color: N.accent, fontWeight: "700" },

  codeRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  codeBox: {
    width: 48, height: 56, borderRadius: 12, overflow: "hidden",
    borderWidth: 1.5, borderColor: N.border,
    backgroundColor: N.surface,
    alignItems: "center", justifyContent: "center",
  },
  codeBoxFilled: { borderColor: N.accent },
  codeBoxError: { borderColor: N.error },
  codeBoxSuccess: { borderColor: N.success },
  codeInput: {
    width: 48, height: 56, textAlign: "center",
    fontSize: 24, fontWeight: "700", color: "transparent",
  },
  codeInputFilled: { color: N.white },

  errorText: {
    color: N.error, fontSize: 13, fontWeight: "500",
    marginBottom: 12, textAlign: "center",
  },

  successBadge: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 14, borderWidth: 1,
    borderColor: N.success,
    backgroundColor: "rgba(74,222,128,0.1)",
    marginBottom: 16,
  },
  successText: { color: N.success, fontSize: 15, fontWeight: "700" },

  verifyBtn: {
    width: "100%", height: 56, borderRadius: 28,
    backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center",
    marginBottom: 20,
  },
  verifyBtnDisabled: { backgroundColor: N.disabled },
  verifyText: { color: N.white, fontSize: 16, fontWeight: "700" },
  verifyTextDim: { color: N.textTer },

  resendRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  resendLabel: { color: N.textTer, fontSize: 14 },
  resendLink: { color: N.accent, fontSize: 14, fontWeight: "600" },
  resendTimer: { color: N.textTer, fontSize: 14 },
  resendDisabled: { color: N.error, fontSize: 14, fontWeight: "500" },

  backLink: { paddingVertical: 8, paddingHorizontal: 16 },
  backLinkText: { color: N.textTer, fontSize: 14, fontWeight: "500" },
});
