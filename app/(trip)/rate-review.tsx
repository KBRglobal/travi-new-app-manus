// Screen 46 — Rate & Review — STATIC 
// 5 large stars 48px each, 5 aspect sliders, Text area 120px (500 chars), Submit
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const ASPECTS = [
  { label: "Accommodation", value: 4 },
  { label: "Activities", value: 5 },
  { label: "Food & Dining", value: 4 },
  { label: "Transportation", value: 3 },
  { label: "Value for Money", value: 4 },
];

export default function RateReviewScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Rate Your Trip</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={s.tripInfo}>
          <Text style={s.tripTitle}>Bali, Indonesia</Text>
          <Text style={s.tripDates}>Apr 15 - Apr 21, 2026</Text>
        </View>

        {/* 5 large stars — 48px each */}
        <View style={s.starsSection}>
          <Text style={s.starsLabel}>Overall Experience</Text>
          <View style={s.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} style={s.star}>
                <Text style={[s.starText, star <= 4 && s.starFilled]}>*</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 5 aspect sliders */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Rate by Aspect</Text>
          {ASPECTS.map((a) => (
            <View key={a.label} style={s.aspectRow}>
              <Text style={s.aspectLabel}>{a.label}</Text>
              <View style={s.sliderTrack}>
                <View style={[s.sliderFill, { width: `${a.value * 20}%` }]} />
              </View>
              <Text style={s.aspectValue}>{a.value}/5</Text>
            </View>
          ))}
        </View>

        {/* Text area — 120px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Tell us more</Text>
          <View style={s.textArea}>
            <Text style={s.textPlaceholder}>Share your experience, tips, or recommendations for other travelers... (max 500 characters)</Text>
          </View>
          <Text style={s.charCount}>0 / 500</Text>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.submitBtn}><Text style={s.submitText}>Submit Review</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  tripInfo: { alignItems: "center", paddingVertical: 20 },
  tripTitle: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  tripDates: { color: "#888", fontSize: 13, marginTop: 4 },
  starsSection: { alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#222" },
  starsLabel: { color: "#888", fontSize: 14, marginBottom: 12 },
  starsRow: { flexDirection: "row", gap: 12 },
  star: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#222", borderWidth: 1, borderColor: "#444", justifyContent: "center", alignItems: "center" },
  starText: { color: "#444", fontSize: 28 },
  starFilled: { color: "#FBBF24" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  aspectRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  aspectLabel: { color: "#BBB", fontSize: 13, width: 100 },
  sliderTrack: { flex: 1, height: 8, borderRadius: 4, backgroundColor: "#222" },
  sliderFill: { height: 8, borderRadius: 4, backgroundColor: "#555" },
  aspectValue: { color: "#888", fontSize: 12, width: 28 },
  textArea: { height: 120, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 14 },
  textPlaceholder: { color: "#555", fontSize: 14, lineHeight: 22 },
  charCount: { color: "#666", fontSize: 12, textAlign: "right", marginTop: 4 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  submitBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  submitText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
