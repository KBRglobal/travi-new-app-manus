import { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Dimensions, Animated, KeyboardAvoidingView, Platform
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");
const CODE_LENGTH = 6;

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { dispatch } = useStore();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer((v) => v - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (val: string, idx: number) => {
    const newCode = [...code];
    newCode[idx] = val.replace(/[^0-9]/g, "").slice(-1);
    setCode(newCode);
    setError(false);
    if (val && idx < CODE_LENGTH - 1) inputs.current[idx + 1]?.focus();
    if (newCode.every((c) => c !== "") && newCode.join("").length === CODE_LENGTH) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = (fullCode?: string) => {
    const entered = fullCode || code.join("");
    if (entered.length === 6) {
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
    } else {
      setError(true);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setCode(Array(CODE_LENGTH).fill(""));
    setError(false);
    inputs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0628", "#1A0A3D", "#1A0A3D", "#1A0A3D"]}
        locations={[0, 0.3, 0.6, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.inner}>
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={styles.backGradient}>
              <IconSymbol name="chevron.left" size={20} color="#C4B5D9" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconWrap}>
            <LinearGradient colors={["rgba(123,47,190,0.45)", "rgba(233,30,140,0.25)"]} style={styles.iconGradient}>
              <IconSymbol name="envelope.fill" size={48} color="#6443F4" />
            </LinearGradient>
            <View style={styles.iconGlow} />
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{"\n"}
            <Text style={styles.emailHighlight}>{email || "your email"}</Text>
          </Text>

          {/* Code inputs */}
          <Animated.View style={[styles.codeRow, { transform: [{ translateX: shakeAnim }] }]}>
            {code.map((digit, idx) => (
              <View key={idx} style={[
                styles.codeBox,
                digit ? styles.codeBoxFilled : null,
                error ? styles.codeBoxError : null,
                verified ? styles.codeBoxSuccess : null,
              ]}>
                {digit ? (
                  <LinearGradient
                    colors={verified
                      ? ["rgba(0,230,118,0.25)", "rgba(0,188,212,0.12)"]
                      : ["rgba(123,47,190,0.35)", "rgba(233,30,140,0.18)"]}
                    style={StyleSheet.absoluteFillObject}
                  />
                ) : null}
                <TextInput
                  ref={(r) => { inputs.current[idx] = r; }}
                  style={[styles.codeInput, digit ? styles.codeInputFilled : null]}
                  value={digit}
                  onChangeText={(v) => handleChange(v, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  caretHidden
                />
              </View>
            ))}
          </Animated.View>

          {error && <Text style={styles.errorText}>Incorrect code — any 6 digits work in demo</Text>}

          {/* Success */}
          {verified && (
            <Animated.View style={[styles.successBadge, { opacity: successOpacity, transform: [{ scale: successScale }] }]}>
              <LinearGradient colors={["rgba(0,230,118,0.25)", "rgba(0,188,212,0.15)"]} style={styles.successGradient}>
                <IconSymbol name="checkmark" size={28} color="#02A65C" />
                <Text style={styles.successText}>Verified! Redirecting...</Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Verify button */}
          {!verified && (
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={() => handleVerify()}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={code.every(Boolean) ? ["#6443F4", "#F94498"] : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.verifyGradient}
              >
                <Text style={[styles.verifyText, !code.every(Boolean) && styles.verifyTextDim]}>
                  Verify Email
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Resend */}
          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>Didn't receive it? </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text style={styles.resendLink}>Resend code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendTimer}>Resend in {timer}s</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: {
    position: "absolute", width: width, height: width, borderRadius: width / 2,
    top: -width * 0.4, left: -width * 0.2, backgroundColor: "rgba(123,47,190,0.10)",
  },
  orb2: {
    position: "absolute", width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4,
    bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)",
  },
  inner: { flex: 1, paddingHorizontal: 28, paddingTop: 60, alignItems: "center" },
  backBtn: { alignSelf: "flex-start", marginBottom: 40 },
  backGradient: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  iconWrap: { width: 90, height: 90, alignItems: "center", justifyContent: "center", marginBottom: 28 },
  iconGradient: { width: 90, height: 90, borderRadius: 28, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(123,47,190,0.5)" },
  iconGlow: { position: "absolute", width: 90, height: 90, borderRadius: 45, backgroundColor: "rgba(123,47,190,0.15)", shadowColor: "#6443F4", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 30 },
  iconEmoji: { fontSize: 38 },
  title: { fontSize: 28, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5, marginBottom: 10, textAlign: "center", fontFamily: "Chillax-Bold" },
  subtitle: { fontSize: 15, color: "#8B7AAA", textAlign: "center", lineHeight: 22, marginBottom: 36, fontFamily: "Satoshi-Regular" },
  emailHighlight: { color: "#F94498", fontWeight: "700", fontFamily: "Satoshi-Bold" },
  codeRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  codeBox: {
    width: 46, height: 60, borderRadius: 14, overflow: "hidden",
    borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center",
  },
  codeBoxFilled: { borderColor: "rgba(123,47,190,0.8)" },
  codeBoxError: { borderColor: "rgba(239,68,68,0.8)" },
  codeBoxSuccess: { borderColor: "rgba(0,230,118,0.8)" },
  codeInput: { width: 46, height: 60, textAlign: "center", fontSize: 24, fontWeight: "700", color: "transparent", fontFamily: "Chillax-Semibold" },
  codeInputFilled: { color: "#FFFFFF" },
  errorText: { color: "#EF4444", fontSize: 13, fontWeight: "500", marginBottom: 12, textAlign: "center", fontFamily: "Satoshi-Medium" },
  successBadge: { marginBottom: 16 },
  successGradient: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: "rgba(0,230,118,0.4)" },
  successIcon: { fontSize: 18, color: "#00E676" },
  successText: { color: "#00E676", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },
  verifyBtn: { width: "100%", borderRadius: 16, overflow: "hidden", marginBottom: 20 },
  verifyGradient: { paddingVertical: 17, alignItems: "center" },
  verifyText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  verifyTextDim: { color: "#3D3050" },
  resendRow: { flexDirection: "row", alignItems: "center" },
  resendLabel: { color: "#5A4D72", fontSize: 14, fontFamily: "Satoshi-Regular" },
  resendLink: { color: "#6443F4", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  resendTimer: { color: "#5A4D72", fontSize: 14, fontFamily: "Satoshi-Regular" },
});
