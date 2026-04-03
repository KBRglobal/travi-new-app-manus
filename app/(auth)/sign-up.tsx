/**
 * SignUpScreen — TRAVI
 *
 * Layout (top → middle → bottom, SafeAreaView space-between):
 *   TOP    : Logotype image (always visible below Dynamic Island)
 *   MIDDLE : Mascot (small, centered above card) + Auth card  [flex:1]
 *   BOTTOM : Guest CTA + Legal
 *
 * Background: two symmetric orbs (top-left, bottom-right).
 */
import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Svg, Path } from "react-native-svg";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { trpc } from "@/lib/trpc";
import {
  Brand,
  Gradients,
  Text as DS,
  Border,
  Typography,
  Radius,
  Spacing,
} from "@/lib/design-system";

WebBrowser.maybeCompleteAuthSession();

const { width: W } = Dimensions.get("window");
const MASCOT_SIZE = Math.round(W * 0.22); // ~96px on 390px screen

/* ─── Google icon ─────────────────────────────────────────────────────────── */
function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      <Path fill="none" d="M0 0h48v48H0z" />
    </Svg>
  );
}

/* ─── Apple icon ──────────────────────────────────────────────────────────── */
function AppleIcon({ size = 18, color = "#FFF" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size * 1.22} viewBox="0 0 814 1000">
      <Path
        fill={color}
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663.6 0 541.8c0-207.8 135.4-317.7 268.3-317.7 70.2 0 128.6 45.8 171.8 45.8 41.4 0 106.1-48.3 185.6-48.3zm-164-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
      />
    </Svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function SignUpScreen() {
  const { dispatch } = useStore();
  const [email, setEmail]           = useState("");
  const [isLogin, setIsLogin]       = useState(false);
  const [emailFocused, setFocused]  = useState(false);
  const [emailError, setEmailError] = useState("");

  const inputScale = useRef(new Animated.Value(1)).current;
  const shakeAnim  = useRef(new Animated.Value(0)).current;

  // Entrance animations
  const topOpacity  = useRef(new Animated.Value(0)).current;
  const topY        = useRef(new Animated.Value(-16)).current;
  const midOpacity  = useRef(new Animated.Value(0)).current;
  const midY        = useRef(new Animated.Value(24)).current;
  const btmOpacity  = useRef(new Animated.Value(0)).current;
  const btmY        = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(topOpacity, { toValue: 1, duration: 380, useNativeDriver: true }),
        Animated.timing(topY,       { toValue: 0, duration: 380, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(midOpacity, { toValue: 1, duration: 340, useNativeDriver: true }),
        Animated.timing(midY,       { toValue: 0, duration: 340, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(btmOpacity, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.timing(btmY,       { toValue: 0, duration: 260, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const initGuestMutation = trpc.auth.initGuest.useMutation();

  const handleFocus = () => {
    setFocused(true);
    setEmailError("");
    Animated.timing(inputScale, { toValue: 1.015, duration: 130, useNativeDriver: true }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    Animated.timing(inputScale, { toValue: 1, duration: 130, useNativeDriver: true }).start();
  };

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8,  duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 5,  duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0,  duration: 55, useNativeDriver: true }),
    ]).start();
  };

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleContinue = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      shake();
      return;
    }
    setEmailError("");
    router.push({ pathname: "/(auth)/verify" as never, params: { email } });
  };

  const [, , promptGoogleAsync] = Google.useAuthRequest({
    iosClientId:     process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId:     process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  const handleGoogle = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Google Sign-In", "Please use the iOS or Android app.");
      return;
    }
    try {
      const result = await promptGoogleAsync();
      if (result?.type === "success") {
        const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.authentication?.accessToken}` },
        });
        const info = await res.json();
        dispatch({ type: "SET_AUTH", payload: { isAuthenticated: true, isGuest: false } });
        dispatch({
          type: "SET_PROFILE",
          payload: {
            id: info.id ?? "google-user", name: info.name ?? "Traveler",
            email: info.email ?? "", quizCompleted: false, travelerDNA: {},
            activityCategories: [], tripPace: "balanced" as const,
            foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
            points: 0, xp: 0, lifetimeSavings: 0, subscriptionActive: false,
          },
        });
        router.replace("/(auth)/welcome" as never);
      }
    } catch {
      Alert.alert("Sign in failed", "Could not sign in with Google. Please try again.");
    }
  };

  const handleApple = async () => {
    if (Platform.OS !== "ios") {
      Alert.alert("Apple Sign-In", "Apple Sign-In is only available on iOS.");
      return;
    }
    try {
      const cred = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      dispatch({ type: "SET_AUTH", payload: { isAuthenticated: true, isGuest: false } });
      dispatch({
        type: "SET_PROFILE",
        payload: {
          id: cred.user,
          name: cred.fullName
            ? `${cred.fullName.givenName ?? ""} ${cred.fullName.familyName ?? ""}`.trim()
            : "Traveler",
          email: cred.email ?? "", quizCompleted: false, travelerDNA: {},
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
    const result    = await initGuestMutation.mutateAsync().catch(() => null);
    const token     = result?.guestToken ?? null;
    dispatch({ type: "SET_AUTH",          payload: { isAuthenticated: false, isGuest: true } });
    dispatch({ type: "SET_GUEST_EXPIRES", payload: expiresAt });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: token ?? "guest", name: "Traveler", email: "",
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
    <View style={s.root}>
      {/* Background gradient */}
      <LinearGradient
        colors={Gradients.authBg}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Symmetric orbs — top-left and bottom-right, same size */}
      <View style={s.orbTL} />
      <View style={s.orbBR} />

      {/*
        SafeAreaView handles Dynamic Island (top) and home indicator (bottom).
        justifyContent:space-between → 3 zones fill the screen evenly.
      */}
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>

        {/* ══ TOP: Logotype ══ */}
        <Animated.View style={[s.topZone, { opacity: topOpacity, transform: [{ translateY: topY }] }]}>
          <Image
            source={require("@/assets/logos/logotype-white.webp")}
            style={s.logotype}
            resizeMode="contain"
          />
          <Text style={s.tagline}>YOUR AI TRAVEL COMPANION</Text>
        </Animated.View>

        {/* ══ MIDDLE: Mascot + Auth card ══ */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={s.midZone}
        >
          <Animated.View style={[s.midInner, { opacity: midOpacity, transform: [{ translateY: midY }] }]}>

            {/* Mascot floats above card */}
            <View style={s.mascotWrap}>
              <Image
                source={require("@/assets/logos/mascot-centered.png")}
                style={s.mascot}
                resizeMode="contain"
              />
            </View>

            {/* Auth card */}
            <View style={s.card}>
              <LinearGradient
                colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]}
                style={s.cardInner}
              >
                {/* Sign Up / Log In tabs */}
                <View style={s.tabRow}>
                  {(["Sign Up", "Log In"] as const).map((label, i) => {
                    const active = (i === 0 && !isLogin) || (i === 1 && isLogin);
                    return (
                      <TouchableOpacity
                        key={label}
                        style={s.tab}
                        onPress={() => setIsLogin(i === 1)}
                        activeOpacity={0.8}
                      >
                        {active && (
                          <LinearGradient
                            colors={["#6443F4", "#F94498"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFillObject}
                          />
                        )}
                        <Text style={[s.tabText, active && s.tabActive]}>{label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Heading */}
                <View style={s.heading}>
                  <Text style={s.headTitle}>
                    {isLogin ? "Welcome back" : "Start your journey"}
                  </Text>
                  <Text style={s.headSub}>
                    {isLogin ? "Log in to your TRAVI account" : "Create your free account today"}
                  </Text>
                </View>

                {/* Email input */}
                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                  <Animated.View
                    style={[
                      s.inputWrap,
                      emailFocused && s.inputFocused,
                      hasError && s.inputError,
                      { transform: [{ scale: inputScale }] },
                    ]}
                  >
                    <LinearGradient
                      colors={emailFocused ? Gradients.inputFocus : Gradients.inputIdle}
                      style={s.inputRow}
                    >
                      <IconSymbol
                        name="envelope.fill"
                        size={17}
                        color={hasError ? "#F94498" : emailFocused ? DS.accent : DS.muted}
                      />
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
                  {hasError && <Text style={s.errorMsg}>{emailError}</Text>}
                </Animated.View>

                {/* Primary CTA */}
                <TouchableOpacity onPress={handleContinue} activeOpacity={0.85} style={s.cta}>
                  <LinearGradient
                    colors={Gradients.cta}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={s.ctaInner}
                  >
                    <Text style={s.ctaText}>Continue with Email</Text>
                    <IconSymbol name="arrow.right" size={17} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={s.divider}>
                  <View style={s.divLine} />
                  <Text style={s.divText}>or continue with</Text>
                  <View style={s.divLine} />
                </View>

                {/* Social buttons */}
                <View style={s.socialRow}>
                  <TouchableOpacity style={s.socialBtn} onPress={handleGoogle} activeOpacity={0.8}>
                    <View style={s.socialInner}>
                      <GoogleIcon size={18} />
                      <Text style={s.socialLabel}>Google</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.socialBtn} onPress={handleApple} activeOpacity={0.8}>
                    <View style={s.socialInner}>
                      <AppleIcon size={18} color="#FFF" />
                      <Text style={s.socialLabel}>Apple</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </LinearGradient>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>

        {/* ══ BOTTOM: Guest + Legal ══ */}
        <Animated.View style={[s.btmZone, { opacity: btmOpacity, transform: [{ translateY: btmY }] }]}>
          <TouchableOpacity style={s.guestBtn} onPress={handleGuest} activeOpacity={0.7}>
            <Text style={s.guestTitle}>Continue as Guest</Text>
            <Text style={s.guestSub}>Explore without an account</Text>
          </TouchableOpacity>
          <Text style={s.legal}>
            By continuing you agree to our{" "}
            <Text style={s.legalLink} onPress={openTerms}>Terms</Text>
            {" "}and{" "}
            <Text style={s.legalLink} onPress={openPrivacy}>Privacy Policy</Text>
          </Text>
        </Animated.View>

      </SafeAreaView>
    </View>
  );
}

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.deepPurple },

  /* Symmetric orbs — same size, opposite corners */
  orbTL: {
    position: "absolute",
    width: 280, height: 280, borderRadius: 140,
    top: -80, left: -80,
    backgroundColor: "rgba(100,67,244,0.15)",
  },
  orbBR: {
    position: "absolute",
    width: 280, height: 280, borderRadius: 140,
    bottom: -80, right: -80,
    backgroundColor: "rgba(249,68,152,0.12)",
  },

  /*
   * SafeAreaView: flex:1 + justifyContent:space-between
   * Three children → top / middle / bottom
   */
  safe: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },

  /* TOP zone */
  topZone: {
    alignItems: "center",
    paddingTop: 6,
    gap: 5,
  },
  logotype: { width: 140, height: 44 },
  tagline: {
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.65)",
    fontFamily: "Satoshi-Regular",
  },

  /* MIDDLE zone */
  midZone: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  midInner: { width: "100%", alignItems: "center" },

  /* Mascot */
  mascotWrap: {
    width: MASCOT_SIZE,
    height: MASCOT_SIZE,
    marginBottom: -MASCOT_SIZE / 2, // overlap the card top
    zIndex: 10,
  },
  mascot: { width: MASCOT_SIZE, height: MASCOT_SIZE },

  /* Card */
  card: {
    width: "100%",
    borderRadius: Radius.xxl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Border.subtle,
  },
  cardInner: {
    paddingTop: MASCOT_SIZE / 2 + 12, // space for mascot overlap
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 14,
  },

  /* Tabs */
  tabRow: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    padding: 4,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
    overflow: "hidden",
  },
  tabText: { fontSize: 14, fontWeight: "600", color: DS.disabled, fontFamily: "Satoshi-Medium" },
  tabActive: { color: "#FFFFFF" },

  /* Heading */
  heading: { gap: 2 },
  headTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Chillax-Semibold",
    letterSpacing: -0.2,
  },
  headSub: {
    fontSize: 13,
    color: DS.muted,
    fontFamily: "Satoshi-Regular",
    lineHeight: 19,
  },

  /* Input */
  inputWrap: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: Border.idle,
  },
  inputFocused: { borderColor: Border.focused },
  inputError:   { borderColor: "#F94498" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  input: { flex: 1, color: "#FFFFFF", fontSize: 15, fontFamily: "Satoshi-Medium" },
  errorMsg: {
    color: "#F94498", fontSize: 12, marginTop: 4, marginLeft: 3,
    fontFamily: "Satoshi-Regular",
  },

  /* CTA */
  cta: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    shadowColor: "#F94498",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  ctaInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Chillax-Semibold",
    letterSpacing: 0.1,
  },

  /* Divider */
  divider: { flexDirection: "row", alignItems: "center", gap: 10 },
  divLine: { flex: 1, height: 1, backgroundColor: Border.subtle },
  divText: { fontSize: 12, color: DS.muted, fontFamily: "Satoshi-Regular" },

  /* Social */
  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: {
    flex: 1,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Border.idle,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  socialInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  socialLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },

  /* BOTTOM zone */
  btmZone: { alignItems: "center", gap: 10, paddingBottom: 2 },
  guestBtn: {
    width: "100%",
    alignItems: "center",
    gap: 2,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Border.subtle,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  guestTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    fontFamily: "Satoshi-Medium",
  },
  guestSub: { fontSize: 12, color: DS.muted, fontFamily: "Satoshi-Regular" },
  legal: {
    fontSize: 11,
    color: DS.muted,
    textAlign: "center",
    lineHeight: 17,
    fontFamily: "Satoshi-Regular",
  },
  legalLink: { color: Brand.pink, fontWeight: "600" },
});
