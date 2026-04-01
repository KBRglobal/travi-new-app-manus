import { useRef, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Dimensions, Animated, KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const { dispatch } = useStore();
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const inputScale = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setEmailFocused(true);
    Animated.timing(inputScale, { toValue: 1.02, duration: 150, useNativeDriver: true }).start();
  };
  const handleBlur = () => {
    setEmailFocused(false);
    Animated.timing(inputScale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  const handleContinue = () => {
    if (!email.trim() || !email.includes("@")) return;
    router.push({ pathname: "/(auth)/verify" as never, params: { email } });
  };

  const handleSocial = (provider: string) => {
    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: true, isGuest: false } });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: Date.now().toString(),
        name: "",
        email: `user@${provider.toLowerCase()}.com`,
        quizCompleted: false,
        travelerDNA: {},
        foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
        points: 0,
        lifetimeSavings: 0,
        subscriptionActive: false,
      },
    });
    router.replace("/(auth)/profile-setup" as never);
  };

  const handleGuest = () => {
    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, isGuest: true } });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: "guest",
        name: "Traveler",
        email: "",
        quizCompleted: false,
        travelerDNA: {},
        foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
        points: 0,
        lifetimeSavings: 0,
        subscriptionActive: false,
      },
    });
    router.replace("/(auth)/welcome" as never);
  };

  return (
    <View style={styles.container}>
      {/* Deep background */}
      <LinearGradient
        colors={["#040010", "#0D0520", "#1A0A3D", "#0D0520"]}
        locations={[0, 0.3, 0.6, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Ambient orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Logo area */}
          <View style={styles.logoArea}>
            <View style={styles.logoRingOuter}>
              <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.logoRingGradient}>
                <View style={styles.logoInner}>
                  <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.logo} contentFit="contain" />
                </View>
              </LinearGradient>
            </View>
            <Text style={styles.appName}>TRAVI</Text>
            <Text style={styles.appTagline}>Your AI Travel Companion</Text>
          </View>

          {/* Glass card */}
          <View style={styles.card}>
            <LinearGradient colors={["rgba(255,255,255,0.09)", "rgba(255,255,255,0.03)"]} style={styles.cardBg}>

              {/* Tab toggle */}
              <View style={styles.tabRow}>
                {["Sign Up", "Log In"].map((label, i) => {
                  const active = (i === 0 && !isLogin) || (i === 1 && isLogin);
                  return (
                    <TouchableOpacity key={label} style={styles.tab} onPress={() => setIsLogin(i === 1)} activeOpacity={0.8}>
                      {active && (
                        <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                      )}
                      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{isLogin ? "Welcome back" : "Start your journey"}</Text>
                <Text style={styles.cardSub}>{isLogin ? "Log in to your TRAVI account" : "Create your free account today"}</Text>
              </View>

              {/* Email input */}
              <Animated.View style={[styles.inputWrap, { transform: [{ scale: inputScale }] }]}>
                <LinearGradient
                  colors={emailFocused ? ["rgba(123,47,190,0.35)", "rgba(233,30,140,0.18)"] : ["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"]}
                  style={[styles.inputGradient, { borderColor: emailFocused ? "rgba(233,30,140,0.6)" : "rgba(255,255,255,0.10)" }]}
                >
                  <IconSymbol name="envelope.fill" size={18} color={emailFocused ? "#E91E8C" : "#5A4D72"} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#3D3050"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="go"
                    onSubmitEditing={handleContinue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </LinearGradient>
              </Animated.View>

              {/* CTA */}
              <TouchableOpacity onPress={handleContinue} activeOpacity={0.85} style={styles.cta}>
                <LinearGradient colors={["#7B2FBE", "#C2185B", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
                  <Text style={styles.ctaText}>Continue with Email</Text>
                  <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social */}
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocial("Google")} activeOpacity={0.8}>
                  <LinearGradient colors={["rgba(66,133,244,0.18)", "rgba(66,133,244,0.08)"]} style={[styles.socialGradient, { borderColor: "rgba(66,133,244,0.45)" }]}>
                    <Text style={styles.socialIcon}>G</Text>
                    <Text style={styles.socialLabel}>Google</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocial("Apple")} activeOpacity={0.8}>
                  <LinearGradient colors={["rgba(255,255,255,0.09)", "rgba(255,255,255,0.04)"]} style={[styles.socialGradient, { borderColor: "rgba(255,255,255,0.18)" }]}>
                    <IconSymbol name="apple.logo" size={20} color="#FFFFFF" />
                    <Text style={styles.socialLabel}>Apple</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Guest */}
          <TouchableOpacity style={styles.guestBtn} onPress={handleGuest} activeOpacity={0.7}>
            <Text style={styles.guestText}>Continue as Guest</Text>
            <Text style={styles.guestSub}>Explore without an account</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing, you agree to our <Text style={styles.termsLink}>Terms</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: {
    position: "absolute", width: width * 0.9, height: width * 0.9,
    borderRadius: width * 0.45, top: -width * 0.3, left: -width * 0.2,
    backgroundColor: "rgba(123,47,190,0.12)",
  },
  orb2: {
    position: "absolute", width: width * 0.7, height: width * 0.7,
    borderRadius: width * 0.35, bottom: height * 0.05, right: -width * 0.25,
    backgroundColor: "rgba(233,30,140,0.08)",
  },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 64, paddingBottom: 40, alignItems: "center" },
  logoArea: { alignItems: "center", gap: 10, marginBottom: 28 },
  logoRingOuter: { width: 88, height: 88, borderRadius: 26, overflow: "hidden" },
  logoRingGradient: { flex: 1, padding: 2.5 },
  logoInner: { flex: 1, borderRadius: 23, backgroundColor: "#0D0520", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  logo: { width: 70, height: 70 },
  appName: { fontSize: 30, fontWeight: "900", color: "#FFFFFF", letterSpacing: 8 },
  appTagline: { fontSize: 12, color: "rgba(196,181,217,0.55)", letterSpacing: 1.8, textTransform: "uppercase" },
  card: { width: "100%", borderRadius: 28, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.09)" },
  cardBg: { padding: 22, gap: 18 },
  tabRow: {
    flexDirection: "row", backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 14, padding: 4, overflow: "hidden",
  },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 11, alignItems: "center", overflow: "hidden" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#3D3050" },
  tabTextActive: { color: "#FFFFFF" },
  cardHeader: { gap: 4 },
  cardTitle: { fontSize: 24, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5 },
  cardSub: { fontSize: 14, color: "#5A4D72" },
  inputWrap: { borderRadius: 16, overflow: "hidden" },
  inputGradient: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 16, paddingVertical: 16,
    borderWidth: 1, borderRadius: 16,
  },
  input: { flex: 1, color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
  cta: { borderRadius: 16, overflow: "hidden" },
  ctaGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 17, gap: 10,
  },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.07)" },
  dividerText: { color: "#3D3050", fontSize: 12, fontWeight: "500" },
  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: { flex: 1, borderRadius: 14, overflow: "hidden" },
  socialGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 14, gap: 8, borderRadius: 14, borderWidth: 1,
  },
  socialIcon: { fontSize: 17 },
  socialLabel: { color: "#C4B5D9", fontSize: 14, fontWeight: "600" },
  guestBtn: {
    marginTop: 20, alignItems: "center", gap: 3,
    paddingVertical: 16, paddingHorizontal: 32,
    borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
    backgroundColor: "rgba(255,255,255,0.025)", width: "100%",
  },
  guestText: { color: "#C4B5D9", fontSize: 15, fontWeight: "600" },
  guestSub: { color: "#3D3050", fontSize: 12 },
  terms: { marginTop: 18, fontSize: 12, color: "#3D3050", textAlign: "center", lineHeight: 18 },
  termsLink: { color: "#7B2FBE", fontWeight: "600" },
});
