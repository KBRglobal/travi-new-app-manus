import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  TextInput, Animated, Platform, Dimensions
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface ActivityReview {
  id: string;
  title: string;
  category: string;
  emoji: string;
  rating: number;
  note: string;
  submitted: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ACTIVITIES: ActivityReview[] = [
  { id: "a1", title: "TeamLab Planets", category: "Art & Culture", emoji: "🎨", rating: 0, note: "", submitted: false },
  { id: "a2", title: "Sushi Saito Dinner", category: "Food & Drink", emoji: "🍣", rating: 0, note: "", submitted: false },
  { id: "a3", title: "Fushimi Inari Shrine", category: "Sightseeing", emoji: "⛩️", rating: 0, note: "", submitted: false },
  { id: "a4", title: "Nishiki Market", category: "Shopping", emoji: "🛍️", rating: 0, note: "", submitted: false },
  { id: "a5", title: "Arashiyama Bamboo Grove", category: "Nature", emoji: "🎋", rating: 0, note: "", submitted: false },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, onRate, size = 28 }: { rating: number; onRate: (r: number) => void; size?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRate(star)} activeOpacity={0.7}>
          <Text style={{ fontSize: size, color: star <= rating ? "#FBBF24" : "rgba(255,255,255,0.06)" }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({
  item,
  onRate,
  onNote,
  onSubmit,
}: {
  item: ActivityReview;
  onRate: (id: string, rating: number) => void;
  onNote: (id: string, note: string) => void;
  onSubmit: (id: string) => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSubmit = () => {
    if (item.rating === 0) return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSubmit(item.id);
  };

  if (item.submitted) {
    return (
      <Animated.View style={[S.reviewCard, S.reviewCardDone, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient colors={["rgba(34,197,94,0.15)", "rgba(34,197,94,0.05)"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.doneRow}>
          <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={S.reviewTitle}>{item.title}</Text>
            <View style={{ flexDirection: "row", gap: 4, marginTop: 2 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Text key={s} style={{ fontSize: 14, color: s <= item.rating ? "#FBBF24" : "rgba(255,255,255,0.06)" }}>★</Text>
              ))}
            </View>
          </View>
          <View style={S.doneBadge}>
            <Text style={S.doneBadgeText}>+20 pts</Text>
          </View>
        </View>
        {item.note ? <Text style={S.doneNote}>"{item.note}"</Text> : null}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[S.reviewCard, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient colors={["rgba(100,67,244,0.1)", "rgba(249,68,152,0.05)"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.reviewHeader}>
        <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={S.reviewTitle}>{item.title}</Text>
          <Text style={S.reviewCategory}>{item.category}</Text>
        </View>
      </View>
      <StarRating rating={item.rating} onRate={(r) => {
        onRate(item.id, r);
        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }} />
      <TextInput
        style={S.noteInput}
        placeholder="Add a note (optional)..."
        placeholderTextColor="#5A4D72"
        value={item.note}
        onChangeText={(t) => onNote(item.id, t)}
        multiline
        maxLength={200}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[S.submitBtn, item.rating === 0 && S.submitBtnDisabled]}
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        {item.rating > 0 ? (
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.submitBtnGrad}>
            <Text style={S.submitBtnText}>Submit Review · +20 pts</Text>
          </LinearGradient>
        ) : (
          <View style={S.submitBtnGrad}>
            <Text style={[S.submitBtnText, { color: "#5A4D72" }]}>Rate to submit</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function TripReviewScreen() {
  const insets = useSafeAreaInsets();
  const [activities, setActivities] = useState<ActivityReview[]>(ACTIVITIES);
  const [showComplete, setShowComplete] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const submittedCount = activities.filter((a) => a.submitted).length;
  const totalPoints = submittedCount * 20;
  const allDone = submittedCount === activities.length;

  const handleRate = (id: string, rating: number) => {
    setActivities((prev) => prev.map((a) => a.id === id ? { ...a, rating } : a));
  };

  const handleNote = (id: string, note: string) => {
    setActivities((prev) => prev.map((a) => a.id === id ? { ...a, note } : a));
  };

  const handleSubmit = (id: string) => {
    setActivities((prev) => prev.map((a) => a.id === id ? { ...a, submitted: true } : a));
    const newCount = activities.filter((a) => a.submitted).length + 1;
    if (newCount === activities.length) {
      setTimeout(() => {
        setShowComplete(true);
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      }, 300);
    }
  };

  if (showComplete) {
    return (
      <Animated.View style={[S.container, { paddingTop: insets.top, opacity: fadeAnim }]}>
        <LinearGradient colors={["#0D1B2A", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.completeWrap}>
          <Text style={{ fontSize: 72 }}>🏆</Text>
          <Text style={S.completeTitle}>Reviews Complete!</Text>
          <Text style={S.completeSub}>You earned {totalPoints} TRAVI Points for sharing your experience.</Text>
          <View style={S.pointsBadge}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={S.pointsBadgeGrad}>
              <Text style={S.pointsBadgeText}>+{totalPoints} pts added to your account</Text>
            </LinearGradient>
          </View>
          <Text style={S.completeTip}>Your reviews help TRAVI learn your preferences and improve future recommendations.</Text>
          <TouchableOpacity style={S.doneBtn} onPress={() => router.back()} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.doneBtnGrad}>
              <Text style={S.doneBtnText}>Back to My Trips</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D1B2A", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>Rate Your Trip</Text>
          <Text style={S.headerSub}>Tokyo & Kyoto · {submittedCount}/{activities.length} reviewed</Text>
        </View>
        <View style={S.ptsCounter}>
          <Text style={S.ptsCounterText}>+{totalPoints} pts</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={S.progressWrap}>
        <View style={S.progressTrack}>
          <LinearGradient
            colors={["#6443F4", "#F94498"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[S.progressFill, { width: `${(submittedCount / activities.length) * 100}%` }]}
          />
        </View>
      </View>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ReviewCard item={item} onRate={handleRate} onNote={handleNote} onSubmit={handleSubmit} />
        )}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4, gap: 8 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "#5A4D72", fontSize: 12 },
  ptsCounter: { backgroundColor: "rgba(100,67,244,0.2)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(100,67,244,0.4)" },
  ptsCounterText: { color: "#A78BFA", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },

  progressWrap: { paddingHorizontal: 16, paddingBottom: 130 },
  progressTrack: { height: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2 },

  reviewCard: { borderRadius: 20, padding: 16, gap: 12, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  reviewCardDone: { borderColor: "rgba(34,197,94,0.3)" },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  reviewTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  reviewCategory: { color: "#5A4D72", fontSize: 12, marginTop: 2 },
  noteInput: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 12, color: "#FFF", fontSize: 14, fontFamily: "Satoshi-Regular", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", minHeight: 60, textAlignVertical: "top" },
  submitBtn: { borderRadius: 14, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden" },
  submitBtnDisabled: { backgroundColor: "rgba(255,255,255,0.06)" },
  submitBtnGrad: { padding: 14, alignItems: "center" },
  submitBtnText: { color: "#FFF", fontSize: 15, fontWeight: "700", fontFamily: "Satoshi-Bold" },

  doneRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  doneBadge: { backgroundColor: "rgba(34,197,94,0.2)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(34,197,94,0.4)" },
  doneBadgeText: { color: "#22C55E", fontSize: 12, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  doneNote: { color: "#9BA1A6", fontSize: 13, fontFamily: "Satoshi-Regular", fontStyle: "italic" },

  completeWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, paddingHorizontal: 32 },
  completeTitle: { color: "#FFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold", textAlign: "center" },
  completeSub: { color: "#9BA1A6", fontSize: 15, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 22 },
  pointsBadge: { borderRadius: 16, overflow: "hidden" },
  pointsBadgeGrad: { paddingHorizontal: 24, paddingVertical: 12 },
  pointsBadgeText: { color: "#FFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  completeTip: { color: "#5A4D72", fontSize: 13, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 20 },
  doneBtn: { borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", marginTop: 8, width: "100%" },
  doneBtnGrad: { padding: 16, alignItems: "center" },
  doneBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
