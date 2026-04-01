import { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");
const CONFETTI_COLORS = ["#7B2FBE", "#E91E8C", "#FFD700", "#4CAF50", "#00BCD4", "#FF6B35", "#C084FC"];

function ConfettiPiece({ color, delay }: { color: string; delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const xPos = useRef(Math.random() * width).current;
  const rotateEnd = useRef(Math.random() * 720 - 360).current;
  const size = useRef(8 + Math.random() * 6).current;
  useEffect(() => {
    const t = setTimeout(() => {
      Animated.timing(anim, { toValue: 1, duration: 2000 + Math.random() * 1000, useNativeDriver: true }).start();
    }, delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <Animated.View style={{
      position: "absolute", left: xPos, top: -20, width: size, height: size, borderRadius: 2, backgroundColor: color,
      opacity: anim.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 1, 0] }),
      transform: [
        { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, height + 40] }) },
        { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", rotateEnd + "deg"] }) },
      ],
    }} />
  );
}

export default function CompletionScreen() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { state } = useStore();
  const trip = state.trips.find((t) => t.id === tripId);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pointsAnim = useRef(new Animated.Value(0)).current;
  const [displayPoints, setDisplayPoints] = useState(0);
  const pointsToEarn = trip?.pointsEarned || Math.floor((trip?.totalCost || 500) * 10);

  useEffect(() => {
    if (Platform.OS !== "web") {
      const t1 = setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 400);
      const t2 = setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.15, duration: 400, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: 300, useNativeDriver: true }).start();
    Animated.timing(pointsAnim, { toValue: pointsToEarn, duration: 2000, delay: 600, useNativeDriver: false }).start();
    const id = pointsAnim.addListener(({ value }) => setDisplayPoints(Math.floor(value)));
    return () => pointsAnim.removeListener(id);
  }, []);

  const confetti = Array.from({ length: 40 }, (_, i) => ({ id: i, color: CONFETTI_COLORS[i % CONFETTI_COLORS.length], delay: i * 50 }));

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {confetti.map((c) => <ConfettiPiece key={c.id} color={c.color} delay={c.delay} />)}
      </View>
      <View style={styles.content}>
        <Animated.View style={[styles.successIconWrap, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.successIconGradient}>
            <IconSymbol name="checkmark" size={52} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.successRing} />
        </Animated.View>
        <Animated.View style={[styles.textBlock, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Trip Booked!</Text>
          <Text style={styles.subtitle}>
            {"Your adventure to "}
            <Text style={styles.subtitleAccent}>{trip?.destination || "your destination"}</Text>
            {" is confirmed"}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.pointsCard, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.25)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.pointsCardInner}>
            <View style={styles.pointsStarWrap}>
              <LinearGradient colors={["#FFD700", "#FFA000"]} style={styles.pointsStarGradient}>
                <IconSymbol name="star.fill" size={28} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.pointsLabel}>TRAVI Points Earned</Text>
              <Text style={styles.pointsCount}>{displayPoints.toLocaleString()} pts</Text>
            </View>
            <View style={styles.pointsValueBadge}>
              <Text style={styles.pointsValueText}>${(pointsToEarn / 100).toFixed(0)}</Text>
              <Text style={styles.pointsValueSub}>value</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.detailsCard, { opacity: fadeAnim }]}>
          <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrap}><IconSymbol name="location.fill" size={16} color="#C084FC" /></View>
            <Text style={styles.detailLabel}>Destination</Text>
            <Text style={styles.detailValue}>{trip?.destination || "—"}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrap}><IconSymbol name="calendar" size={16} color="#C084FC" /></View>
            <Text style={styles.detailLabel}>Departure</Text>
            <Text style={styles.detailValue}>{trip?.startDate ? new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrap}><IconSymbol name="creditcard.fill" size={16} color="#C084FC" /></View>
            <Text style={styles.detailLabel}>Total Cost</Text>
            <Text style={styles.detailValue}>${(trip?.totalCost || 0).toLocaleString()}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.duckRow, { opacity: fadeAnim }]}>
          <View style={styles.duckAvatar}>
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={styles.duckGradient}>
              <Image source={require("@/assets/logos/mascot-dark.png")} style={styles.duckImg} contentFit="contain" />
            </LinearGradient>
          </View>
          <View style={styles.duckBubble}>
            <LinearGradient colors={["rgba(123,47,190,0.35)", "rgba(233,30,140,0.2)"]} style={styles.duckBubbleGradient}>
              <Text style={styles.duckMessage}>Pack your bags — adventure awaits!</Text>
            </LinearGradient>
          </View>
        </Animated.View>
      </View>
      <Animated.View style={[styles.ctaWrap, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/(tabs)/" as never);
          }}
          activeOpacity={0.88}
        >
          <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Go to My Trips</Text>
            <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.liveBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push({ pathname: "/(live)/home", params: { tripId } } as never);
          }}
          activeOpacity={0.88}
        >
          <LinearGradient colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]} style={styles.liveBtnGradient}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBtnText}>Open Live Trip Mode</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width * 1.4, height: width * 1.4, borderRadius: width * 0.7, top: -width * 0.6, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: width, height: width, borderRadius: width / 2, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.08)" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, gap: 20 },
  successIconWrap: { position: "relative", alignItems: "center", justifyContent: "center" },
  successIconGradient: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  successRing: { position: "absolute", width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "rgba(233,30,140,0.3)" },
  textBlock: { alignItems: "center", gap: 8 },
  title: { color: "#FFFFFF", fontSize: 36, fontWeight: "900", letterSpacing: -0.5 },
  subtitle: { color: "rgba(255,255,255,0.6)", fontSize: 16, textAlign: "center", lineHeight: 24 },
  subtitleAccent: { color: "#E91E8C", fontWeight: "700" },
  pointsCard: { width: "100%", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(123,47,190,0.5)" },
  pointsCardInner: { flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  pointsStarWrap: { borderRadius: 14, overflow: "hidden" },
  pointsStarGradient: { width: 52, height: 52, alignItems: "center", justifyContent: "center" },
  pointsLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  pointsCount: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  pointsValueBadge: { alignItems: "center" },
  pointsValueText: { color: "#FFD700", fontSize: 20, fontWeight: "900" },
  pointsValueSub: { color: "rgba(255,215,0,0.6)", fontSize: 11 },
  detailsCard: { width: "100%", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", padding: 4 },
  detailRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  detailIconWrap: { width: 32, height: 32, borderRadius: 10, backgroundColor: "rgba(192,132,252,0.1)", alignItems: "center", justifyContent: "center" },
  detailLabel: { flex: 1, color: "rgba(255,255,255,0.5)", fontSize: 14 },
  detailValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  detailDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginHorizontal: 16 },
  duckRow: { flexDirection: "row", alignItems: "flex-end", gap: 10, width: "100%" },
  duckAvatar: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  duckGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  duckImg: { width: 28, height: 28 },
  duckBubble: { flex: 1, borderRadius: 16, borderBottomLeftRadius: 4, overflow: "hidden" },
  duckBubbleGradient: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.4)" },
  duckMessage: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", lineHeight: 20 },
  ctaWrap: { paddingHorizontal: 24, paddingBottom: 48, gap: 12 },
  ctaBtn: { borderRadius: 20, overflow: "hidden" },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10, borderRadius: 20 },
  ctaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  liveBtn: { borderRadius: 16, overflow: "hidden" },
  liveBtnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50" },
  liveBtnText: { color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: "600" },
});
