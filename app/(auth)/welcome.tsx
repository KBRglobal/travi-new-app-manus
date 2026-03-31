import { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { GradientButton } from "@/components/ui/gradient-button";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

const FEATURES = [
  { icon: "🧠", title: "AI That Knows You", desc: "Learns your travel personality through fun scenarios" },
  { icon: "💸", title: "Zero Hidden Fees", desc: "All commissions returned as TRAVI Points" },
  { icon: "📍", title: "Real-Time Agent", desc: "Your AI guide knows exactly where you are" },
];

export default function WelcomeScreen() {
  const { state, dispatch } = useStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push("/(auth)/quiz" as never);
  };

  const handleSkip = () => {
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)" as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A0533", "#2D1B69", "#1A0533"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Duck Mascot */}
        <View style={styles.mascotContainer}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.mascot}
            contentFit="contain"
          />
        </View>

        <Text style={styles.greeting}>
          Welcome{state.profile?.name ? `, ${state.profile.name}` : ""}! 👋
        </Text>
        <Text style={styles.title}>Meet TRAVI</Text>
        <Text style={styles.subtitle}>
          Your personal AI travel agent that plans, books, and guides your perfect trips
        </Text>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <GradientButton
          title="Build My Traveler Profile"
          onPress={handleGetStarted}
          style={{ width: "100%", marginBottom: 14 }}
          size="lg"
        />

        <Text style={styles.quizNote}>
          10 quick scenarios • Takes 2 minutes
        </Text>

        <GradientButton
          title="Skip for now"
          onPress={handleSkip}
          variant="ghost"
          size="sm"
          style={{ marginTop: 4 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0533" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  mascotContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#2D1B69",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#7B2FBE",
    overflow: "hidden",
  },
  mascot: { width: 130, height: 130 },
  greeting: { color: "#A78BCA", fontSize: 16, marginBottom: 4 },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "800", marginBottom: 10, textAlign: "center" },
  subtitle: { color: "#A78BCA", fontSize: 15, textAlign: "center", lineHeight: 22, marginBottom: 28 },
  featuresContainer: { width: "100%", gap: 10, marginBottom: 28 },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    gap: 14,
  },
  featureIcon: { fontSize: 28 },
  featureText: { flex: 1 },
  featureTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "600", marginBottom: 2 },
  featureDesc: { color: "#A78BCA", fontSize: 13, lineHeight: 18 },
  quizNote: { color: "#7B2FBE", fontSize: 13, marginBottom: 4 },
});
