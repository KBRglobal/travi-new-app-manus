import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { GradientButton } from "@/components/ui/gradient-button";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

export default function CompletionScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state } = useStore();
  const trip = state.trips.find((t) => t.id === tripId);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(confettiAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A0533", "#2D1B69", "#1A0533"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Confetti dots */}
      {["#E91E8C", "#7B2FBE", "#FFD700", "#4CAF50", "#FF9800"].map((color, i) => (
        <Animated.View
          key={i}
          style={[
            styles.confettiDot,
            {
              backgroundColor: color,
              top: 80 + i * 40,
              left: 30 + i * 60,
              opacity: confettiAnim,
              transform: [{ scale: confettiAnim }],
            },
          ]}
        />
      ))}

      <View style={styles.content}>
        <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={["#7B2FBE", "#E91E8C"]}
            style={styles.successGradient}
          >
            <Text style={styles.checkmark}>✓</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          <Text style={styles.title}>Trip Booked! 🎉</Text>
          <Text style={styles.destination}>{trip?.destination || "Your destination"}</Text>
          <Text style={styles.dates}>{trip?.startDate} → {trip?.endDate}</Text>

          {/* Points Earned */}
          <View style={styles.pointsCard}>
            <LinearGradient
              colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.3)"]}
              style={styles.pointsGradient}
            >
              <Text style={styles.pointsEmoji}>✦</Text>
              <View>
                <Text style={styles.pointsTitle}>
                  +{(trip?.pointsEarned || 0).toLocaleString()} TRAVI Points Earned!
                </Text>
                <Text style={styles.pointsSubtitle}>
                  Your total: {(state.profile?.points || 0).toLocaleString()} pts
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Duck Mascot */}
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.duck}
            contentFit="contain"
          />

          <Text style={styles.message}>
            TRAVI will be your guide every step of the way. Start Live Mode when you arrive!
          </Text>
        </Animated.View>

        <Animated.View style={[styles.buttons, { opacity: fadeAnim }]}>
          <GradientButton
            title="View My Trip"
            onPress={() => router.replace({ pathname: "/(trip)/summary" as never, params: { tripId } })}
            style={{ width: "100%", marginBottom: 12 }}
            size="lg"
          />
          <GradientButton
            title="Go to Home"
            onPress={() => router.replace("/(tabs)" as never)}
            variant="ghost"
            size="md"
            style={{ width: "100%" }}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0533" },
  confettiDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 8,
  },
  successGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: { color: "#FFFFFF", fontSize: 48, fontWeight: "300" },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "800", textAlign: "center" },
  destination: { color: "#E91E8C", fontSize: 22, fontWeight: "700", textAlign: "center" },
  dates: { color: "#A78BCA", fontSize: 15, textAlign: "center" },
  pointsCard: { borderRadius: 14, overflow: "hidden", width: "100%", borderWidth: 1, borderColor: "#7B2FBE" },
  pointsGradient: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  pointsEmoji: { fontSize: 28, color: "#FFD700" },
  pointsTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  pointsSubtitle: { color: "#A78BCA", fontSize: 13, marginTop: 2 },
  duck: { width: 100, height: 100 },
  message: { color: "#A78BCA", fontSize: 14, textAlign: "center", lineHeight: 20, paddingHorizontal: 20 },
  buttons: { width: "100%" },
});
