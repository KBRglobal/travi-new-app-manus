import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { getDNA, getTopInterests } from "@/lib/dna-store";

const { width, height } = Dimensions.get("window");

const DESTINATIONS = [
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    tagline: "Where luxury meets the desert",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    bestFor: ["shopping", "luxury", "landmarks", "nightlife"],
    vibe: "Glamorous",
    temp: "28°C",
    flight: "~4h from TLV",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Ancient temples, modern soul",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    bestFor: ["history", "art_culture", "food", "nature"],
    vibe: "Serene",
    temp: "18°C",
    flight: "~11h from TLV",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "The island of the gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    bestFor: ["nature", "beaches", "wellness", "adventure"],
    vibe: "Spiritual",
    temp: "30°C",
    flight: "~13h from TLV",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    tagline: "Art, food, and endless sun",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    bestFor: ["art_culture", "food", "beaches", "nightlife"],
    vibe: "Vibrant",
    temp: "22°C",
    flight: "~4.5h from TLV",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    tagline: "The future, now",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    bestFor: ["food", "shopping", "nightlife", "art_culture"],
    vibe: "Electric",
    temp: "20°C",
    flight: "~11h from TLV",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    tagline: "Paradise, redefined",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    bestFor: ["beaches", "water_sports", "wellness", "luxury"],
    vibe: "Blissful",
    temp: "29°C",
    flight: "~6h from TLV",
  },
];

export default function SurpriseScreen() {
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");
  const [picked, setPicked] = useState(DESTINATIONS[0]);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    // Spin animation while "thinking"
    const spin = Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 1200, useNativeDriver: true })
    );
    spin.start();

    // Dot cycling
    const dotInterval = setInterval(() => setDotIndex((d) => (d + 1) % 4), 400);

    // Pick destination based on DNA
    getDNA().then((dna) => {
      const top = getTopInterests(dna, 3);
      let best = DESTINATIONS[0];
      let bestScore = -1;

      for (const dest of DESTINATIONS) {
        const score = dest.bestFor.filter((cat) => top.includes(cat as never)).length;
        if (score > bestScore) {
          bestScore = score;
          best = dest;
        }
      }

      // If no DNA yet, pick random
      if (bestScore === 0) {
        best = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
      }

      setTimeout(() => {
        spin.stop();
        clearInterval(dotInterval);
        setPicked(best);
        setPhase("reveal");

        Animated.parallel([
          Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
          Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]).start();
      }, 2400);
    });

    return () => clearInterval(dotInterval);
  }, []);

  const handleAccept = () => {
    router.push({ pathname: "/(trip)/plan", params: { destination: picked.id } } as never);
  };

  const handleReroll = () => {
    setPhase("loading");
    scaleAnim.setValue(0.8);
    opacityAnim.setValue(0);
    spinAnim.setValue(0);

    const spin = Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 1200, useNativeDriver: true })
    );
    spin.start();

    setTimeout(() => {
      const random = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
      spin.stop();
      setPicked(random);
      setPhase("reveal");
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 1600);
  };

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const dots = ".".repeat(dotIndex);

  return (
    <View style={styles.container}>
      {phase === "reveal" && (
        <Image source={{ uri: picked.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={800} />
      )}
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.75)", "rgba(0,0,0,0.97)"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {phase === "loading" ? (
        <View style={styles.loadingWrap}>
          <Animated.Text style={[styles.dnaSpinner, { transform: [{ rotate: spin }] }]}>🧬</Animated.Text>
          <Text style={styles.loadingTitle}>Reading your DNA{dots}</Text>
          <Text style={styles.loadingSubtitle}>Finding the perfect destination for you</Text>
        </View>
      ) : (
        <Animated.View style={[styles.revealWrap, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.vibePill}>
            <Text style={styles.vibeText}>{picked.vibe}</Text>
          </View>
          <Text style={styles.destName}>{picked.name}</Text>
          <Text style={styles.destCountry}>{picked.country}</Text>
          <Text style={styles.destTagline}>"{picked.tagline}"</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🌡️</Text>
              <Text style={styles.statValue}>{picked.temp}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>✈️</Text>
              <Text style={styles.statValue}>{picked.flight}</Text>
            </View>
          </View>

          <Text style={styles.dnaMatch}>
            Matched to your DNA: {picked.bestFor.slice(0, 2).join(" + ")}
          </Text>

          <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.acceptGradient}>
              <Text style={styles.acceptText}>Yes, take me to {picked.name} →</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rerollBtn} onPress={handleReroll} activeOpacity={0.7}>
            <Text style={styles.rerollText}>🎲 Surprise me again</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  backBtn: { position: "absolute", top: 60, left: 24, zIndex: 10, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)" },
  backText: { color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: "600" },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  dnaSpinner: { fontSize: 64 },
  loadingTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  loadingSubtitle: { color: "rgba(255,255,255,0.5)", fontSize: 15 },
  revealWrap: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 28, paddingBottom: 56, gap: 12 },
  vibePill: { alignSelf: "flex-start", backgroundColor: "rgba(100,67,244,0.5)", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(100,67,244,0.8)" },
  vibeText: { color: "#C084FC", fontSize: 13, fontWeight: "700" },
  destName: { color: "#FFFFFF", fontSize: 52, fontWeight: "900", lineHeight: 58 },
  destCountry: { color: "rgba(255,255,255,0.5)", fontSize: 18, fontWeight: "600", marginTop: -8 },
  destTagline: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontStyle: "italic", lineHeight: 22 },
  statsRow: { flexDirection: "row", alignItems: "center", gap: 20, marginVertical: 4 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  statEmoji: { fontSize: 16 },
  statValue: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  statDivider: { width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.2)" },
  dnaMatch: { color: "#C084FC", fontSize: 13, fontWeight: "600" },
  acceptBtn: { borderRadius: 18, overflow: "hidden", marginTop: 8 },
  acceptGradient: { paddingVertical: 18, alignItems: "center", borderRadius: 18 },
  acceptText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  rerollBtn: { alignItems: "center", paddingVertical: 12 },
  rerollText: { color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: "600" },
});
