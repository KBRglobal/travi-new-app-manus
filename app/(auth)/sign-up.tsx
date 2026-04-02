import { useRef, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, KeyboardAvoidingView, Platform, ScrollView, TextInput
} from "react-native";
import { router } from "expo-router";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { Brand, Gradients, Text as DS, Border, Typography, Radius, Spacing } from "@/lib/design-system";

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
        id: Date.now().toString(), name: "",
        email: `user@${provider.toLowerCase()}.com`,
        quizCompleted: false, travelerDNA: {},
        activityCategories: [], tripPace: "balanced" as const,
        foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
        points: 0, lifetimeSavings: 0, subscriptionActive: false,
      },
    });
    router.replace("/(auth)/profile-setup" as never);
  };

  const handleGuest = () => {
    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, isGuest: true } });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: "guest", name: "Traveler", email: "",
        quizCompleted: false, travelerDNA: {},
        activityCategories: [], tripPace: "balanced" as const,
        foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
        points: 0, lifetimeSavings: 0, subscriptionActive: false,
      },
    });
    router.replace("/(auth)/welcome" as never);
  };

  return (
    <View style={s.container}>
      <LinearGradient colors={Gradients.authBg} locations={[0, 0.35, 1]} style={StyleSheet.absoluteFillObject} />
      {/* Ambient orbs — corners only, never center */}
      <View style={s.orbTopRight} />
      <View style={s.orbBottomLeft} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Logo area — logotype only, no mascot */}
          <View style={s.logoArea}>
            <Image source={require("@/assets/logos/logotype-white.webp")} style={s.logotype} resizeMode="contain" />
            <Text style={s.tagline}>YOUR AI TRAVEL COMPANION</Text>
          </View>

          {/* Glass card */}
          <View style={s.card}>
            <LinearGradient colors={["rgba(255,255,255,0.09)", "rgba(255,255,255,0.03)"]} style={s.cardBg}>

              {/* Tab toggle */}
              <View style={s.tabRow}>
                {["Sign Up", "Log In"].map((label, i) => {
                  const active = (i === 0 && !isLogin) || (i === 1 && isLogin);
                  return (
                    <TouchableOpacity key={label} style={s.tab} onPress={() => setIsLogin(i === 1)} activeOpacity={0.8}>
                      {active && (
                        <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                      )}
                      <Text style={[s.tabText, active && s.tabTextActive]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={s.cardHeader}>
                <Text style={s.cardTitle}>{isLogin ? "Welcome back" : "Start your journey"}</Text>
                <Text style={s.cardSub}>{isLogin ? "Log in to your TRAVI account" : "Create your free account today"}</Text>
              </View>

              {/* Email input */}
              <Animated.View style={[s.inputWrap, emailFocused && s.inputWrapFocused, { transform: [{ scale: inputScale }] }]}>
                <LinearGradient
                  colors={emailFocused ? Gradients.inputFocus : Gradients.inputIdle}
                  style={s.inputGradient}
                >
                  <IconSymbol name="envelope.fill" size={18} color={emailFocused ? DS.accent : DS.muted} />
                  <TextInput
                    style={s.input}
                    placeholder="Email address"
                    placeholderTextColor={DS.placeholder}
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
              <TouchableOpacity onPress={handleContinue} activeOpacity={0.85} style={s.cta}>
                <LinearGradient colors={Gradients.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGradient}>
                  <Text style={s.ctaText}>Continue with Email</Text>
                  <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={s.divider}>
                <View style={s.dividerLine} />
                <Text style={s.dividerText}>or continue with</Text>
                <View style={s.dividerLine} />
              </View>

              {/* Social buttons */}
              <View style={s.socialRow}>
                {(["Google", "Apple"] as const).map((p) => (
                  <TouchableOpacity key={p} style={s.socialBtn} onPress={() => handleSocial(p)} activeOpacity={0.8}>
                    <LinearGradient colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.05)"]} style={s.socialGradient}>
                      {p === "Google" ? (
                        <Text style={s.googleG}>
                          <Text style={{ color: "#4285F4" }}>G</Text>
                          <Text style={{ color: "#EA4335" }}>o</Text>
                          <Text style={{ color: "#FBBC05" }}>o</Text>
                          <Text style={{ color: "#4285F4" }}>g</Text>
                          <Text style={{ color: "#34A853" }}>l</Text>
                          <Text style={{ color: "#EA4335" }}>e</Text>
                        </Text>
                      ) : (
                        <IconSymbol name="apple.logo" size={18} color="#FFFFFF" />
                      )}
                      <Text style={s.socialLabel}>{p}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* Guest */}
          <TouchableOpacity style={s.guestBtn} onPress={handleGuest} activeOpacity={0.7}>
            <Text style={s.guestText}>Continue as Guest</Text>
            <Text style={s.guestSub}>Explore without an account</Text>
          </TouchableOpacity>

          <Text style={s.terms}>
            By continuing, you agree to our{" "}
            <Text style={s.termsLink}>Terms</Text> and{" "}
            <Text style={s.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Brand.deepPurple },
  orbTopRight: {
    position: "absolute", width: 320, height: 320, borderRadius: 160,
    top: -100, right: -120, backgroundColor: "rgba(100,67,244,0.13)",
  },
  orbBottomLeft: {
    position: "absolute", width: 260, height: 260, borderRadius: 130,
    bottom: 60, left: -100, backgroundColor: "rgba(249,68,152,0.09)",
  },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 72, paddingBottom: 40, alignItems: "center" },

  // Logo — logotype only
  logoArea: { alignItems: "center", gap: 8, marginBottom: 32 },
  logotype: { width: 160, height: 52 },
  tagline: { fontSize: 11, color: "rgba(196,181,217,0.75)", letterSpacing: 2, textTransform: "uppercase" },

  // Card
  card: { width: "100%", borderRadius: Radius.xxl, overflow: "hidden", borderWidth: 1, borderColor: Border.subtle },
  cardBg: { padding: 22, gap: 18 },
  tabRow: { flexDirection: "row", backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 14, padding: 4, overflow: "hidden" },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 11, alignItems: "center", overflow: "hidden" },
  tabText: { fontSize: 14, fontWeight: "600", color: DS.disabled },
  tabTextActive: { color: DS.primary },
  cardHeader: { gap: 4 },
  cardTitle: { ...Typography.h3 },
  cardSub: { ...Typography.body, color: DS.muted },

  // Input
  inputWrap: { borderRadius: Radius.lg, overflow: "hidden", borderWidth: 1.5, borderColor: Border.idle },
  inputWrapFocused: { borderColor: Border.focused },
  inputGradient: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  input: { flex: 1, color: DS.primary, fontSize: 16, fontWeight: "500" },

  // CTA
  cta: { borderRadius: Radius.lg, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, gap: 10 },
  ctaText: { ...Typography.cta },

  // Divider
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Border.subtle },
  dividerText: { ...Typography.small, color: DS.muted },

  // Social
  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: { flex: 1, borderRadius: Radius.lg, overflow: "hidden" },
  socialGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 14, gap: 8, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Border.idle,
  },
  googleG: { fontSize: 16, fontWeight: "800" },
  socialLabel: { color: DS.primary, fontSize: 14, fontWeight: "600" },

  // Guest
  guestBtn: {
    marginTop: 20, alignItems: "center", gap: 3,
    paddingVertical: 16, paddingHorizontal: 32,
    borderRadius: Radius.lg, borderWidth: 1, borderColor: Border.subtle,
    backgroundColor: "rgba(255,255,255,0.025)", width: "100%",
  },
  guestText: { color: DS.secondary, fontSize: 15, fontWeight: "600" },
  guestSub: { ...Typography.small, color: DS.muted },

  // Legal
  terms: { marginTop: 18, fontSize: 12, color: DS.muted, textAlign: "center", lineHeight: 18 },
  termsLink: { color: Brand.pink, fontWeight: "600" },
});
