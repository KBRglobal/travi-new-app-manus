/**
 * SignUpScreen — Neutral Wireframe
 * Spec: Email + Password + Confirm + Terms checkbox + Password strength
 *       + Social (Google/Apple) + Guest mode
 * All logic preserved from original + spec additions.
 */
import { useState, useRef, useEffect, useMemo } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, TextInput,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Path } from "react-native-svg";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { trpc } from "@/lib/trpc";

WebBrowser.maybeCompleteAuthSession();

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
  warning:  "#FBBF24",
  disabled: "#444444",
};

/* ─── Google "G" icon ─── */
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

/* ─── Apple icon ─── */
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

/* ─── Password strength calculator ─── */
function getPasswordStrength(pw: string): { level: "weak" | "medium" | "strong"; pct: number } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (score <= 2) return { level: "weak", pct: 0.33 };
  if (score === 3) return { level: "medium", pct: 0.66 };
  return { level: "strong", pct: 1 };
}

const strengthColors = { weak: N.error, medium: N.warning, strong: N.success };

/* ─── Main component ─── */
export default function SignUpScreen() {
  const { dispatch } = useStore();
  const [isLogin, setIsLogin]               = useState(false);
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]     = useState(false);
  const [termsAccepted, setTermsAccepted]   = useState(false);
  const [emailError, setEmailError]         = useState("");
  const [passwordError, setPasswordError]   = useState("");
  const [confirmError, setConfirmError]     = useState("");

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const initGuestMutation = trpc.auth.initGuest.useMutation();

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const pwStrength = useMemo(() => getPasswordStrength(password), [password]);

  const canSubmit = isLogin
    ? isValidEmail(email) && password.length >= 1
    : isValidEmail(email) && pwStrength.level !== "weak" && confirmPassword === password && termsAccepted;

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -5, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  };

  const handleContinue = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      shake();
      return;
    }
    if (!isLogin) {
      if (pwStrength.level === "weak") {
        setPasswordError("Password must be at least 8 chars with uppercase, lowercase, and number");
        shake();
        return;
      }
      if (password !== confirmPassword) {
        setConfirmError("Passwords do not match");
        shake();
        return;
      }
      if (!termsAccepted) {
        Alert.alert("Terms Required", "Please agree to Terms and Privacy Policy");
        return;
      }
    }
    router.push({ pathname: "/(auth)/verify" as never, params: { email } });
  };

  /* Google OAuth */
  const [, , promptGoogleAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
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

  /* Apple Sign-In */
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

  /* Guest */
  const handleGuest = async () => {
    const expiresAt = new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString();
    const result = await initGuestMutation.mutateAsync().catch(() => null);
    const token = result?.guestToken ?? null;
    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, isGuest: true } });
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

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={s.backBtn}>
            <IconSymbol name="chevron.left" size={24} color={N.white} />
          </TouchableOpacity>
          <Text style={s.stepText}>Step 1/3</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={s.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <Text style={s.title}>
              {isLogin ? "Welcome back" : "Create your account"}
            </Text>

            {/* Tab toggle */}
            <View style={s.tabRow}>
              {(["Sign Up", "Log In"] as const).map((label, i) => {
                const active = (i === 0 && !isLogin) || (i === 1 && isLogin);
                return (
                  <TouchableOpacity
                    key={label}
                    style={[s.tab, active && s.tabActive]}
                    onPress={() => setIsLogin(i === 1)}
                    activeOpacity={0.8}
                  >
                    <Text style={[s.tabText, active && s.tabTextActive]}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Email */}
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <View style={[s.inputWrap, emailError ? s.inputError : null]}>
                <IconSymbol name="envelope.fill" size={18} color={N.textTer} />
                <TextInput
                  style={s.input}
                  placeholder="Email address"
                  placeholderTextColor={N.textTer}
                  value={email}
                  onChangeText={(v) => { setEmail(v); if (emailError) setEmailError(""); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType={isLogin ? "go" : "next"}
                  onSubmitEditing={isLogin ? handleContinue : undefined}
                />
              </View>
              {emailError ? <Text style={s.errorText}>{emailError}</Text> : null}
            </Animated.View>

            {/* Password */}
            <View style={[s.inputWrap, passwordError ? s.inputError : null]}>
              <IconSymbol name="lock.fill" size={18} color={N.textTer} />
              <TextInput
                style={s.input}
                placeholder="Password"
                placeholderTextColor={N.textTer}
                value={password}
                onChangeText={(v) => { setPassword(v); if (passwordError) setPasswordError(""); }}
                secureTextEntry={!showPassword}
                returnKeyType={isLogin ? "go" : "next"}
                onSubmitEditing={isLogin ? handleContinue : undefined}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <IconSymbol
                  name={showPassword ? "eye.slash.fill" : "eye.fill"}
                  size={18}
                  color={N.textTer}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={s.errorText}>{passwordError}</Text> : null}

            {/* Password strength (sign up only) */}
            {!isLogin && password.length > 0 && (
              <View style={s.strengthRow}>
                <View style={s.strengthBarBg}>
                  <View style={[s.strengthBarFill, {
                    width: `${pwStrength.pct * 100}%`,
                    backgroundColor: strengthColors[pwStrength.level],
                  }]} />
                </View>
                <Text style={[s.strengthLabel, { color: strengthColors[pwStrength.level] }]}>
                  {pwStrength.level.charAt(0).toUpperCase() + pwStrength.level.slice(1)}
                </Text>
              </View>
            )}

            {/* Confirm password (sign up only) */}
            {!isLogin && (
              <>
                <View style={[s.inputWrap, confirmError ? s.inputError : null]}>
                  <IconSymbol name="lock.fill" size={18} color={N.textTer} />
                  <TextInput
                    style={s.input}
                    placeholder="Confirm password"
                    placeholderTextColor={N.textTer}
                    value={confirmPassword}
                    onChangeText={(v) => { setConfirmPassword(v); if (confirmError) setConfirmError(""); }}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                  />
                </View>
                {confirmError ? <Text style={s.errorText}>{confirmError}</Text> : null}
              </>
            )}

            {/* Terms checkbox (sign up only) */}
            {!isLogin && (
              <TouchableOpacity
                style={s.checkboxRow}
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.7}
              >
                <View style={[s.checkbox, termsAccepted && s.checkboxChecked]}>
                  {termsAccepted && <IconSymbol name="checkmark" size={14} color={N.white} />}
                </View>
                <Text style={s.legalText}>
                  I agree to the{" "}
                  <Text style={s.legalLink} onPress={openTerms}>Terms</Text>
                  {" "}and{" "}
                  <Text style={s.legalLink} onPress={openPrivacy}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            )}

            {/* Primary CTA */}
            <TouchableOpacity
              style={[s.primaryBtn, !canSubmit && s.primaryBtnDisabled]}
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={!canSubmit}
            >
              <Text style={[s.primaryBtnText, !canSubmit && s.primaryBtnTextDisabled]}>
                {isLogin ? "Log In" : "Continue with Email"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={s.divider}>
              <View style={s.divLine} />
              <Text style={s.divText}>or</Text>
              <View style={s.divLine} />
            </View>

            {/* Social buttons */}
            <TouchableOpacity style={s.socialBtn} onPress={handleGoogle} activeOpacity={0.8}>
              <GoogleIcon size={20} />
              <Text style={s.socialLabel}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.socialBtn} onPress={handleApple} activeOpacity={0.8}>
              <AppleIcon size={18} color={N.white} />
              <Text style={s.socialLabel}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Footer: Already have account / Sign In */}
            <View style={s.footerRow}>
              <Text style={s.footerText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={s.footerLink}>{isLogin ? "Sign Up" : "Sign In"}</Text>
              </TouchableOpacity>
            </View>

            {/* Guest */}
            <TouchableOpacity style={s.guestBtn} onPress={handleGuest} activeOpacity={0.7}>
              <Text style={s.guestTitle}>Continue as Guest</Text>
              <Text style={s.guestSub}>Explore without an account</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

/* ─── Styles ─── */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  safe: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: N.border,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center" },
  stepText: { fontSize: 14, color: N.textTer, fontWeight: "500" },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 60,
    gap: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: N.white,
    letterSpacing: -0.3,
    marginBottom: 8,
  },

  // Tab toggle
  tabRow: {
    flexDirection: "row",
    backgroundColor: N.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: { backgroundColor: N.accent },
  tabText: { fontSize: 14, fontWeight: "600", color: N.textTer },
  tabTextActive: { color: N.white },

  // Inputs
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 56,
    backgroundColor: N.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: N.border,
    paddingHorizontal: 20,
  },
  inputError: { borderColor: N.error },
  input: { flex: 1, color: N.white, fontSize: 16, height: "100%" },
  errorText: { color: N.error, fontSize: 12, marginTop: -8, marginLeft: 20 },

  // Password strength
  strengthRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: -8 },
  strengthBarBg: { flex: 1, height: 4, backgroundColor: N.border, borderRadius: 2 },
  strengthBarFill: { height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontWeight: "600" },

  // Checkbox
  checkboxRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 2, borderColor: N.textTer,
    alignItems: "center", justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: N.accent, borderColor: N.accent },
  legalText: { flex: 1, fontSize: 14, color: N.textSec, lineHeight: 20 },
  legalLink: { color: N.accent, fontWeight: "600" },

  // Primary button
  primaryBtn: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    backgroundColor: N.accent,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  primaryBtnDisabled: { backgroundColor: N.disabled },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: N.white },
  primaryBtnTextDisabled: { color: N.textTer },

  // Divider
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  divLine: { flex: 1, height: 1, backgroundColor: N.border },
  divText: { fontSize: 14, color: N.textTer },

  // Social buttons
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: N.border,
    backgroundColor: N.surface,
  },
  socialLabel: { fontSize: 16, fontWeight: "600", color: N.white },

  // Footer
  footerRow: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { fontSize: 14, color: N.textSec },
  footerLink: { fontSize: 14, fontWeight: "700", color: N.accent },

  // Guest
  guestBtn: {
    width: "100%",
    alignItems: "center",
    gap: 2,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: N.border,
    backgroundColor: N.surface,
  },
  guestTitle: { fontSize: 15, fontWeight: "600", color: N.textSec },
  guestSub: { fontSize: 12, color: N.textTer },
});
