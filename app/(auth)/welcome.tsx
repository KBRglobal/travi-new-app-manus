import { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const FEATURES = [
  { iconName: "sparkles" as const, title: "AI That Knows You", desc: "Learns your travel personality through fun scenarios", color: "#6443F4" },
  { iconName: "dollarsign.circle.fill" as const, title: "Zero Hidden Fees", desc: "All commissions returned as TRAVI Points", color: "#F94498" },
  { iconName: "location.fill" as const, title: "Real-Time Agent", desc: "Your AI guide knows exactly where you are", color: "#00BCD4" },
  { iconName: "trophy.fill" as const, title: "Travel Gamified", desc: "Earn badges, climb tiers, unlock rewards", color: "#FFD700" },
];

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotY = useRef(new Animated.Value(30)).current;
  const card1Y = useRef(new Animated.Value(50)).current;
  const card2Y = useRef(new Animated.Value(70)).current;
  const card3Y = useRef(new Animated.Value(90)).current;
  const card4Y = useRef(new Animated.Value(110)).current;
  const ctaY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(mascotY, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true }),
    ]).start();

    const delays = [card1Y, card2Y, card3Y, card4Y].map((anim, i) =>
      Animated.timing(anim, { toValue: 0, duration: 400, delay: 200 + i * 80, useNativeDriver: true })
    );
    Animated.parallel([
      ...delays,
      Animated.timing(ctaY, { toValue: 0, duration: 400, delay: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const cardAnims = [card1Y, card2Y, card3Y, card4Y];

  const handleGetStarted = () => router.push("/(auth)/quiz" as never);

  const handleSkip = () => {
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)" as never);
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: mascotY }] }]}>
          {/* Mascot — no ring, just the duck */}
          <Image source={require("@/assets/logos/mascot-centered.png")} style={styles.mascot} resizeMode="contain" />

          <Text style={styles.greeting}>
            {state.profile?.name ? `Hey ${state.profile.name}!` : "Welcome aboard!"}
          </Text>
          {/* Official TRAVI logotype — white version for dark background */}
          <Image
            source={require("@/assets/logos/logotype-white.webp")}
            style={styles.logotype}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>
            Your personal AI travel agent that plans, books, and guides your perfect trips
          </Text>
        </Animated.View>

        {/* Feature cards */}
        <View style={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <Animated.View key={i} style={[styles.featureCard, { opacity: fadeAnim, transform: [{ translateY: cardAnims[i] }] }]}>
              <LinearGradient
                colors={[`${f.color}22`, `${f.color}11`]}
                style={styles.featureGradient}
              >
                <View style={[styles.featureIconWrap, { borderColor: `${f.color}44` }]}>
                  <IconSymbol name={f.iconName} size={22} color={f.color} />
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>

        {/* CTA section */}
        <Animated.View style={[styles.ctaSection, { opacity: fadeAnim, transform: [{ translateY: ctaY }] }]}>
          <View style={styles.quizBadge}>
            <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.2)"]} style={styles.quizBadgeGradient}>
              <IconSymbol name="star.fill" size={13} color="#C4B5D9" />
              <Text style={styles.quizBadgeText}> 10 quick scenarios • 2 minutes</Text>
            </LinearGradient>
          </View>

          <TouchableOpacity style={styles.ctaBtn} onPress={handleGetStarted} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#C2185B", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
              <Text style={styles.ctaText}>Build My Traveler Profile</Text>
              <IconSymbol name="arrow.right" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: width * 0.9, height: width * 0.9, borderRadius: width * 0.45, top: -width * 0.3, left: -width * 0.2, backgroundColor: "rgba(123,47,190,0.12)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: height * 0.1, right: -width * 0.25, backgroundColor: "rgba(233,30,140,0.08)" },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 64, paddingBottom: 40, gap: 28 },
  heroSection: { alignItems: "center", gap: 12 },
  mascot: { width: 160, height: 160, marginBottom: 4 },
  logotype: { width: 160, height: 52 },
  greeting: { color: "#8B7AAA", fontSize: 15, fontWeight: "500" },
  subtitle: { fontSize: 15, color: "#8B7AAA", textAlign: "center", lineHeight: 22, maxWidth: 300 },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  featureCard: { width: (width - 56) / 2, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  featureGradient: { padding: 18, gap: 10 },
  featureIconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center", borderWidth: 1 },
  featureIcon: { fontSize: 22 },
  featureTitle: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
  featureDesc: { fontSize: 12, color: "#8B7AAA", lineHeight: 17 },
  ctaSection: { gap: 14, alignItems: "center" },
  quizBadge: { alignSelf: "center" },
  quizBadgeGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)", gap: 4 },
  quizBadgeText: { color: "#C4B5D9", fontSize: 13, fontWeight: "500" },
  ctaBtn: { width: "100%", borderRadius: 18, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  ctaArrow: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  skipBtn: { paddingVertical: 10 },
  skipText: { color: "#5A4D72", fontSize: 14, fontWeight: "500" },
});
