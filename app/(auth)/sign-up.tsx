import { useRef, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert
} from "react-native";
import { router } from "expo-router";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Svg, Path } from "react-native-svg";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { trpc } from "@/lib/trpc";
import { Brand, Gradients, Text as DS, Border, Typography, Radius, Spacing } from "@/lib/design-system";

// Complete any pending auth sessions on mount
WebBrowser.maybeCompleteAuthSession();

// ── Google "G" SVG (official brand colours) ──────────────────────────────────
function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <Path fill="none" d="M0 0h48v48H0z"/>
    </Svg>
  );
}

// ── Apple logo SVG (works on iOS + Android) ───────────────────────────────────
function AppleIcon({ size = 18, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size * 1.22} viewBox="0 0 814 1000">
      <Path
        fill={color}
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663.6 0 541.8c0-207.8 135.4-317.7 268.3-317.7 70.2 0 128.6 45.8 171.8 45.8 41.4 0 106.1-48.3 185.6-48.3zm-164-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
      />
    </Svg>
  );
}

export default function SignUpScreen() {
  const { dispatch } = useStore();
  const [email, setEmail]               = useState("");
  const [isLogin, setIsLogin]           = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError]     = useState("");

  const inputScale  = useRef(new Animated.Value(1)).current;
  const shakeAnim   = useRef(new Animated.Value(0)).current;

  // ── tRPC ──
  const initGuestMutation = trpc.auth.initGuest.useMutation();

  // ── Handlers ──
  const handleFocus = () => {
    setEmailFocused(true);
    setEmailError("");
    Animated.timing(inputScale, { toValue: 1.02, duration: 150, useNativeDriver: true }).start();
  };
  const handleBlur = () => {
    setEmailFocused(false);
    Animated.timing(inputScale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue:  8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleContinue = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email");
      shake();
      return;
    }
    setEmailError("");
    router.push({ pathname: "/(auth)/verify" as never, params: { email } });
  };

  // ── Google OAuth ──
  // webClientId is required on web platform; we use iosClientId as fallback so the
  // hook doesn't throw on web (the button will be disabled on web anyway).
  const [_googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID, // required on web; OAuth won't work on web but prevents crash
  });

  const handleGoogle = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Google Sign-In", "Please use the iOS or Android app to sign in with Google.");
      return;
    }
    try {
      const result = await promptGoogleAsync();
      if (result?.type === "success") {
        const { authentication } = result;
        // Fetch user info from Google
        const userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${authentication?.accessToken}` },
        });
        const userInfo = await userInfoRes.json();
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, isGuest: false },
        });
        dispatch({
          type: "SET_PROFILE",
          payload: {
            id: userInfo.id ?? "google-user",
            name: userInfo.name ?? "Traveler",
            email: userInfo.email ?? "",
            quizCompleted: false, travelerDNA: {},
            activityCategories: [], tripPace: "balanced" as const,
            foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
            points: 0, xp: 0, lifetimeSavings: 0, subscriptionActive: false,
          },
        });
        router.replace("/(auth)/welcome" as never);
      }
    } catch (e) {
      console.error("[Google OAuth]", e);
      Alert.alert("Sign in failed", "Could not sign in with Google. Please try again.");
    }
  };

  // ── Apple Sign-In ──
  const handleApple = async () => {
    if (Platform.OS !== "ios") {
      Alert.alert("Apple Sign-In", "Apple Sign-In is only available on iOS devices.");
      return;
    }
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: true, isGuest: false },
      });
      dispatch({
        type: "SET_PROFILE",
        payload: {
          id: credential.user,
          name: credential.fullName
            ? `${credential.fullName.givenName ?? ""} ${credential.fullName.familyName ?? ""}`.trim()
            : "Traveler",
          email: credential.email ?? "",
          quizCompleted: false, travelerDNA: {},
          activityCategories: [], tripPace: "balanced" as const,
          foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
          points: 0, xp: 0, lifetimeSavings: 0, subscriptionActive: false,
        },
      });
      router.replace("/(auth)/welcome" as never);
    } catch (e: any) {
      if (e?.code !== "ERR_REQUEST_CANCELED") {
        Alert.alert("Sign in failed", "Could not sign in with Apple. Please try again.");
      }
    }
  };

  const handleGuest = async () => {
    const expiresAt = new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString();
    // Register guest in DB
    const result = await initGuestMutation.mutateAsync().catch(() => null);
    const guestToken = result?.guestToken ?? null;

    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, isGuest: true } });
    dispatch({ type: "SET_GUEST_EXPIRES", payload: expiresAt });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: guestToken ?? "guest",
        name: "Traveler", email: "",
        quizCompleted: false, travelerDNA: {},
        activityCategories: [], tripPace: "balanced" as const,
        foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
        points: 0, xp: 0, lifetimeSavings: 0, subscriptionActive: false,
      },
    });
    router.replace("/(auth)/welcome" as never);
  };

  const openTerms   = () => WebBrowser.openBrowserAsync("https://travi.app/terms");
  const openPrivacy = () => WebBrowser.openBrowserAsync("https://travi.app/privacy");

  const hasError = emailError.length > 0;

  return (
    <View style={s.container}>
      <LinearGradient colors={Gradients.authBg} locations={[0, 0.35, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={s.orbTopRight} />
      <View style={s.orbBottomLeft} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Logo area */}
          <View style={s.logoArea}>
            <Image source={require("@/assets/logos/logotype-white.webp")} style={s.logotype} resizeMode="contain" />
            <Text style={s.tagline}>YOUR AI TRAVEL COMPANION</Text>
          </View>

          {/* Glass card */}
          <View style={s.card}>
            <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={s.cardBg}>

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

              {/* Email input with shake + error */}
              <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <Animated.View style={[
                  s.inputWrap,
                  emailFocused && s.inputWrapFocused,
                  hasError && s.inputWrapError,
                  { transform: [{ scale: inputScale }] },
                ]}>
                  <LinearGradient
                    colors={emailFocused ? Gradients.inputFocus : Gradients.inputIdle}
                    style={s.inputGradient}
                  >
                    <IconSymbol name="envelope.fill" size={18} color={hasError ? "#F94498" : emailFocused ? DS.accent : DS.muted} />
                    <TextInput
                      style={s.input}
                      placeholder="Email address"
                      placeholderTextColor={DS.placeholder}
                      value={email}
                      onChangeText={(v) => { setEmail(v); if (emailError) setEmailError(""); }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="go"
                      onSubmitEditing={handleContinue}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </LinearGradient>
                </Animated.View>
                {hasError && (
                  <Text style={s.errorText}>{emailError}</Text>
                )}
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
                <TouchableOpacity style={s.socialBtn} onPress={handleGoogle} activeOpacity={0.8}>
                  <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={s.socialGradient}>
                    <GoogleIcon size={18} />
                    <Text style={s.socialLabel}>Google</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={s.socialBtn} onPress={handleApple} activeOpacity={0.8}>
                  <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={s.socialGradient}>
                    <AppleIcon size={18} color="#FFFFFF" />
                    <Text style={s.socialLabel}>Apple</Text>
                  </LinearGradient>
                </TouchableOpacity>
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
            <Text style={s.termsLink} onPress={openTerms}>Terms</Text> and{" "}
            <Text style={s.termsLink} onPress={openPrivacy}>Privacy Policy</Text>
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
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 72, paddingBottom: 130, alignItems: "center" },

  // Logo
  logoArea: { alignItems: "center", gap: 8, marginBottom: 32 },
  logotype: { width: 160, height: 52 },
  tagline: { fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: 2, textTransform: "uppercase" },

  // Card
  card: { width: "100%", borderRadius: Radius.xxl, overflow: "hidden", borderWidth: 1, borderColor: Border.subtle },
  cardBg: { padding: 22, gap: 18 },
  tabRow: { flexDirection: "row", backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 14, padding: 4, overflow: "hidden" },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 11, alignItems: "center", overflow: "hidden" },
  tabText: { fontSize: 14, fontWeight: "600", color: DS.disabled, fontFamily: "Satoshi-Medium" },
  tabTextActive: { color: DS.primary },
  cardHeader: { gap: 4 },
  cardTitle: { ...Typography.h3, fontFamily: "Chillax-Semibold" },
  cardSub: { ...Typography.body, color: DS.muted, fontFamily: "Satoshi-Regular" },

  // Input
  inputWrap: { borderRadius: Radius.lg, overflow: "hidden", borderWidth: 1.5, borderColor: Border.idle },
  inputWrapFocused: { borderColor: Border.focused },
  inputWrapError: { borderColor: "#F94498" },
  inputGradient: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  input: { flex: 1, color: DS.primary, fontSize: 16, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  errorText: {
    color: "#F94498", fontSize: 12, marginTop: 6, marginLeft: 4,
    fontFamily: "Satoshi-Regular",
  },

  // CTA
  cta: { borderRadius: Radius.lg, overflow: "hidden", shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, gap: 10 },
  ctaText: { ...Typography.cta, fontFamily: "Chillax-Semibold" },

  // Divider
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Border.subtle },
  dividerText: { ...Typography.small, color: DS.muted, fontFamily: "Satoshi-Regular" },

  // Social
  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: { flex: 1, borderRadius: Radius.lg, overflow: "hidden" },
  socialGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 14, gap: 8, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Border.idle,
  },
  socialLabel: { color: DS.primary, fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },

  // Guest
  guestBtn: {
    marginTop: 20, alignItems: "center", gap: 3,
    paddingVertical: 16, paddingHorizontal: 32,
    borderRadius: Radius.lg, borderWidth: 1, borderColor: Border.subtle,
    backgroundColor: "rgba(255,255,255,0.06)", width: "100%",
  },
  guestText: { color: DS.secondary, fontSize: 15, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  guestSub: { ...Typography.small, color: DS.muted, fontFamily: "Satoshi-Regular" },

  // Legal
  terms: { marginTop: 18, fontSize: 12, color: DS.muted, textAlign: "center", lineHeight: 18 },
  termsLink: { color: Brand.pink, fontWeight: "600" },
});
