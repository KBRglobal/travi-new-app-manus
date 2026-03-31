import { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions
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
  const [error, setError] = useState("");
  const inputs = useRef<(TextInput | null)[]>([]);

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
    setError("");
    if (val && idx < CODE_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
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
    // For demo: any 6-digit code works
    if (entered.length === 6) {
      dispatch({ type: "SET_AUTH", payload: { isAuthenticated: true, isGuest: false } });
      dispatch({
        type: "SET_PROFILE",
        payload: {
          id: Date.now().toString(),
          name: "",
          email: email || "",
          quizCompleted: false,
          travelerDNA: {},
          foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
          points: 0,
          lifetimeSavings: 0,
          subscriptionActive: false,
        },
      });
      router.push("/(auth)/profile-setup" as never);
    } else {
      setError("Please enter the 6-digit code");
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setCode(Array(CODE_LENGTH).fill(""));
    inputs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A0533", "#2D1B69", "#1A0533"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.emailEmoji}>✉️</Text>
        </View>

        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={styles.emailText}>{email || "your email"}</Text>
        </Text>

        {/* OTP Inputs */}
        <View style={styles.codeRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
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
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Verify Button */}
        <TouchableOpacity
          style={styles.ctaWrapper}
          onPress={() => handleVerify()}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#7B2FBE", "#E91E8C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Verify Email</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the code? </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendTimer}>Resend in {timer}s</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0533" },
  backBtn: { position: "absolute", top: 56, left: 20, zIndex: 10, padding: 8 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2D1B69",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  emailEmoji: { fontSize: 36 },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  subtitle: { color: "#A78BCA", fontSize: 15, textAlign: "center", lineHeight: 22, marginBottom: 36 },
  emailText: { color: "#E91E8C", fontWeight: "600" },
  codeRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  codeInput: {
    width: 46,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#4A3080",
    backgroundColor: "#2D1B69",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  codeInputFilled: { borderColor: "#7B2FBE", backgroundColor: "#3D2580" },
  error: { color: "#F44336", fontSize: 13, marginBottom: 12 },
  ctaWrapper: { borderRadius: 28, overflow: "hidden", width: "100%", marginBottom: 20 },
  ctaGradient: { paddingVertical: 16, alignItems: "center" },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  resendRow: { flexDirection: "row", alignItems: "center" },
  resendLabel: { color: "#A78BCA", fontSize: 14 },
  resendLink: { color: "#E91E8C", fontSize: 14, fontWeight: "600" },
  resendTimer: { color: "#7B2FBE", fontSize: 14 },
});
