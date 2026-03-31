import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// Fixed star positions to avoid re-renders
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: (i * 37 + 17) % height,
  left: (i * 53 + 23) % width,
  size: (i % 3) + 1,
  opacity: 0.15 + (i % 5) * 0.1,
}));

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Duck bounces in
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
      ]),
      Animated.delay(200),
      // Glow pulses
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
        ]),
        { iterations: 2 }
      ),
      // Tagline fades in
      Animated.timing(taglineAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      // Loading bar fills
      Animated.timing(loadingAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
      Animated.delay(300),
    ]).start(() => {
      router.replace("/(auth)/sign-up" as never);
    });
  }, []);

  const loadingWidth = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Deep purple gradient background */}
      <LinearGradient
        colors={["#0D0120", "#1A0533", "#2D1B69", "#1A0533", "#0D0120"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      />

      {/* Stars */}
      {STARS.map((star) => (
        <View
          key={star.id}
          style={[styles.star, { top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }]}
        />
      ))}

      {/* Glow circle behind duck */}
      <Animated.View style={[styles.glowCircle, { opacity: glowAnim }]} />

      {/* Main content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Duck mascot */}
        <View style={styles.duckContainer}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.duck}
            contentFit="contain"
          />
        </View>

        {/* TRAVI wordmark */}
        <View style={styles.wordmarkContainer}>
          <Text style={styles.wordmark}>TRAVI</Text>
          <View style={styles.wordmarkUnderline} />
        </View>
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[styles.taglineContainer, { opacity: taglineAnim }]}>
        <Text style={styles.tagline}>Your AI Travel Companion</Text>
        <Text style={styles.taglineSub}>Where Every Trip Gets Personal ✨</Text>
      </Animated.View>

      {/* Loading bar */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingTrack}>
          <Animated.View style={[styles.loadingBar, { width: loadingWidth }]} />
        </View>
        <Text style={styles.loadingText}>Preparing your adventure...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0120",
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  glowCircle: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(123,47,190,0.15)",
    shadowColor: "#7B2FBE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
  },
  content: {
    alignItems: "center",
    gap: 20,
  },
  duckContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(45,27,105,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(123,47,190,0.4)",
    shadowColor: "#7B2FBE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    overflow: "hidden",
  },
  duck: {
    width: 160,
    height: 160,
  },
  wordmarkContainer: {
    alignItems: "center",
    gap: 6,
  },
  wordmark: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: 12,
    textShadowColor: "rgba(123,47,190,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  wordmarkUnderline: {
    width: 80,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#E91E8C",
  },
  taglineContainer: {
    position: "absolute",
    bottom: height * 0.2,
    alignItems: "center",
    gap: 6,
  },
  tagline: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  taglineSub: {
    color: "#A78BCA",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 60,
    width: width * 0.6,
    alignItems: "center",
    gap: 10,
  },
  loadingTrack: {
    width: "100%",
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingBar: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#E91E8C",
  },
  loadingText: {
    color: "#6B5A8A",
    fontSize: 12,
    letterSpacing: 0.3,
  },
});
