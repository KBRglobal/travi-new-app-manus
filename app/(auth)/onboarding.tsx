import { useRef, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Animated, NativeSyntheticEvent, NativeScrollEvent,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    emoji: "✈️",
    title: "You are your\nown agent.",
    subtitle: "Every time you book a trip, a travel agent takes a cut. With TRAVI — there's no middleman. That cut comes back to you.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    accent: "#6443F4",
    accent2: "#F94498",
  },
  {
    id: "2",
    emoji: "🧬",
    title: "TRAVI learns\nwho you are.",
    subtitle: "Every swipe, every choice, every hesitation — TRAVI builds a traveler DNA that's uniquely yours. The more you use it, the better it gets.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    accent: "#F94498",
    accent2: "#FF9800",
  },
  {
    id: "3",
    emoji: "💰",
    title: "The commission\nis yours.",
    subtitle: "After every trip you book through TRAVI, the agent commission — usually 10–15% — lands back in your wallet as cashback.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    accent: "#22C55E",
    accent2: "#06B6D4",
  },
];

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    if (idx !== current) setCurrent(idx);
  };

  const goNext = () => {
    if (current < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (current + 1) * width, animated: true });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem("travi_onboarded", "1");
    router.replace("/(auth)/splash" as never);
  };

  const slide = SLIDES[current];

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={{ uri: slide.image }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={600}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.95)"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleFinish} activeOpacity={0.7}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Swipeable content */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {SLIDES.map((s) => (
          <View key={s.id} style={styles.slide}>
            <Text style={styles.emoji}>{s.emoji}</Text>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.subtitle}>{s.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === current && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.88}>
          <LinearGradient
            colors={[slide.accent, slide.accent2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>
              {current === SLIDES.length - 1 ? "Let's go →" : "Next →"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  skipBtn: { position: "absolute", top: 60, right: 24, zIndex: 10, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.55)" },
  skipText: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  scrollView: { flex: 1 },
  slide: { width, flex: 1, justifyContent: "flex-end", paddingHorizontal: 32, paddingBottom: 180 },
  emoji: { fontSize: 56, marginBottom: 16 },
  title: { color: "#FFFFFF", fontSize: 40, fontWeight: "900", lineHeight: 48, marginBottom: 16, fontFamily: "Chillax-Bold" },
  subtitle: { color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 26, fontFamily: "Satoshi-Regular" },
  dots: { position: "absolute", bottom: 140, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.55)" },
  dotActive: { width: 24, backgroundColor: "#FFFFFF" },
  footer: { position: "absolute", bottom: 56, left: 24, right: 24 },
  nextBtn: { borderRadius: 18, overflow: "hidden" },
  nextGradient: { paddingVertical: 18, alignItems: "center", borderRadius: 18 },
  nextText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
