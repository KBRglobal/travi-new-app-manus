import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Dimensions
} from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const { dispatch } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleEmailAuth = () => {
    if (!email.trim()) return;
    // Navigate to OTP verification
    router.push({ pathname: "/(auth)/verify" as never, params: { email } });
  };

  const handleGuestMode = () => {
    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, isGuest: true } });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: "guest",
        name: "Guest",
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

  const handleSocialAuth = (provider: string) => {
    // Simulate social auth
    const mockEmail = `user@${provider.toLowerCase()}.com`;
    dispatch({ type: "SET_AUTH", payload: { isAuthenticated: true, isGuest: false } });
    dispatch({
      type: "SET_PROFILE",
      payload: {
        id: Date.now().toString(),
        name: provider + " User",
        email: mockEmail,
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A0533", "#2D1B69", "#1A0533"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.subtitle}>Your AI-powered travel agent</Text>
          </View>

          {/* Tab Toggle */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.tabActive]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.tabActive]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <IconSymbol name="person.fill" size={18} color="#A78BCA" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#A78BCA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputContainer}>
            <IconSymbol name="lock.fill" size={18} color="#A78BCA" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="#A78BCA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onSubmitEditing={handleEmailAuth}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <IconSymbol name={showPassword ? "eye.slash.fill" : "eye.fill"} size={18} color="#A78BCA" />
            </TouchableOpacity>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity style={styles.ctaWrapper} onPress={handleEmailAuth} activeOpacity={0.85}>
            <LinearGradient
              colors={["#7B2FBE", "#E91E8C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{isLogin ? "Log In" : "Create Account"}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Auth */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialAuth("Google")} activeOpacity={0.8}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocialAuth("Apple")} activeOpacity={0.8}>
              <Text style={styles.socialIcon}></Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Guest Mode */}
          <TouchableOpacity style={styles.guestBtn} onPress={handleGuestMode} activeOpacity={0.7}>
            <Text style={styles.guestText}>Continue as Guest</Text>
            <Text style={styles.guestNote}> (23h session)</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0533" },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  logoContainer: { alignItems: "center", marginBottom: 36 },
  logo: { width: width * 0.55, height: 100 },
  subtitle: { color: "#A78BCA", fontSize: 14, marginTop: 8, letterSpacing: 0.3 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#2D1B69",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "#7B2FBE" },
  tabText: { color: "#A78BCA", fontWeight: "600", fontSize: 15 },
  tabTextActive: { color: "#FFFFFF" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 14,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: "#FFFFFF", fontSize: 16, paddingVertical: 12 },
  eyeBtn: { padding: 4 },
  ctaWrapper: { borderRadius: 28, overflow: "hidden", marginTop: 8, marginBottom: 24 },
  ctaGradient: { paddingVertical: 16, alignItems: "center" },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700", letterSpacing: 0.3 },
  divider: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#4A3080" },
  dividerText: { color: "#A78BCA", fontSize: 13, marginHorizontal: 12 },
  socialRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    paddingVertical: 13,
    gap: 8,
  },
  socialIcon: { fontSize: 18, color: "#FFFFFF", fontWeight: "700" },
  socialText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  guestBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, marginBottom: 20 },
  guestText: { color: "#A78BCA", fontSize: 15, fontWeight: "500" },
  guestNote: { color: "#7B2FBE", fontSize: 13 },
  terms: { color: "#6B5A8A", fontSize: 12, textAlign: "center", lineHeight: 18 },
  termsLink: { color: "#A78BCA", textDecorationLine: "underline" },
});
