// Screen 73 — Welcome Tour — STATIC WIREFRAME
// 3 slides horizontal swipe, auto-advance 10s, progress dots
import { View, Text, StyleSheet, Pressable } from "react-native";

const SLIDES = [
  { title: "Discover Your Travel DNA", body: "Answer a few questions and we'll build your unique travel personality profile.", icon: "🧬" },
  { title: "AI-Powered Recommendations", body: "Get personalized destination and activity suggestions based on your preferences.", icon: "🤖" },
  { title: "Plan, Book & Experience", body: "From planning to live trip management, TRAVI is with you every step of the way.", icon: "✈️" },
];

export default function WelcomeTourScreen() {
  return (
    <View style={s.root}>
      {/* Skip */}
      <Pressable style={s.skipBtn}><Text style={s.skipText}>Skip</Text></Pressable>

      {/* Current slide (showing slide 1) */}
      <View style={s.slideContent}>
        <View style={s.iconWrap}><Text style={s.icon}>{SLIDES[0].icon}</Text></View>
        <Text style={s.slideTitle}>{SLIDES[0].title}</Text>
        <Text style={s.slideBody}>{SLIDES[0].body}</Text>
      </View>

      {/* Slide indicators */}
      <View style={s.indicators}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[s.dot, i === 0 && s.dotActive]} />
        ))}
      </View>

      {/* Bottom buttons */}
      <View style={s.bottom}>
        <Pressable style={s.nextBtn}><Text style={s.nextText}>Next</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  skipBtn: { position: "absolute", top: 56, right: 20, zIndex: 10 },
  skipText: { color: "#888", fontSize: 14 },
  slideContent: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  iconWrap: { width: 120, height: 120, borderRadius: 30, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 32 },
  icon: { fontSize: 48 },
  slideTitle: { color: "#FFF", fontSize: 26, fontWeight: "800", textAlign: "center" },
  slideBody: { color: "#888", fontSize: 15, textAlign: "center", lineHeight: 24, marginTop: 12 },
  indicators: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#333" },
  dotActive: { backgroundColor: "#FFF", width: 24 },
  bottom: { paddingHorizontal: 20, paddingBottom: 40 },
  nextBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  nextText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
