import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── DNA Dimensions ───────────────────────────────────────────────────────────
const MY_DNA: Record<string, number> = {
  Explorer: 88, Adventurer: 72, Culturalist: 65, Foodie: 80,
  Photographer: 55, Historian: 45, Naturalist: 60, Relaxer: 40,
};

const THEIR_DNA: Record<string, number> = {
  Explorer: 92, Adventurer: 68, Culturalist: 70, Foodie: 75,
  Photographer: 60, Historian: 50, Naturalist: 55, Relaxer: 35,
};

const DIMENSION_COLORS: Record<string, string> = {
  Explorer: BRAND.purple, Adventurer: BRAND.orange, Culturalist: BRAND.cyan,
  Foodie: BRAND.pink, Photographer: BRAND.gold, Historian: "#8B7355",
  Naturalist: BRAND.green, Relaxer: "#60A5FA",
};

// ─── Compatibility Bar ────────────────────────────────────────────────────────
function CompatBar({ label, myScore, theirScore }: { label: string; myScore: number; theirScore: number }) {
  const diff = Math.abs(myScore - theirScore);
  const compatibility = Math.round(100 - diff * 0.7);
  const color = DIMENSION_COLORS[label] ?? BRAND.purple;
  const compatColor = compatibility >= 80 ? BRAND.green : compatibility >= 60 ? BRAND.orange : BRAND.textSecondary;

  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${myScore}%` as `${number}%`, backgroundColor: color }]} />
        <View style={[styles.barFillOverlay, { width: `${theirScore}%` as `${number}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.compatScore, { color: compatColor }]}>{compatibility}%</Text>
    </View>
  );
}

// ─── Shared Interest Tag ──────────────────────────────────────────────────────
function SharedTag({ label, icon }: { label: string; icon: React.ComponentProps<typeof IconSymbol>["name"] }) {
  return (
    <View style={styles.sharedTag}>
      <IconSymbol name={icon} size={14} color={BRAND.purple} />
      <Text style={styles.sharedTagText}>{label}</Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CompatibilityScreen() {
  const insets = useSafeAreaInsets();
  const { travelerId } = useLocalSearchParams<{ travelerId?: string }>();

  const overallScore = Math.round(
    Object.keys(MY_DNA).reduce((sum, key) => {
      const diff = Math.abs((MY_DNA[key] ?? 0) - (THEIR_DNA[key] ?? 0));
      return sum + (100 - diff * 0.7);
    }, 0) / Object.keys(MY_DNA).length
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[BRAND.bgDeep, BRAND.bgOverlay]} style={StyleSheet.absoluteFillObject} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color={BRAND.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DNA Compatibility</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Overall Score Card */}
        <View style={styles.scoreCard}>
          <LinearGradient
            colors={[BRAND.purple + "30", BRAND.pink + "15"]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.scoreCircle}>
            <LinearGradient
              colors={BRAND.gradientPrimary}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Text style={styles.scoreNumber}>{overallScore}%</Text>
            <Text style={styles.scoreLabel}>Match</Text>
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>
              {overallScore >= 85 ? "Excellent Match!" : overallScore >= 70 ? "Great Match" : "Good Match"}
            </Text>
            <Text style={styles.scoreDesc}>
              {overallScore >= 85
                ? "You two are highly compatible travel partners. Your DNA profiles align on most dimensions."
                : "You share many travel interests. A few differences could make the trip more interesting!"}
            </Text>
          </View>
        </View>

        {/* DNA Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DNA Breakdown</Text>
          <Text style={styles.sectionSub}>Purple = You · Faded = Them</Text>
          <View style={styles.barsContainer}>
            {Object.entries(MY_DNA).map(([key, val]) => (
              <CompatBar key={key} label={key} myScore={val} theirScore={THEIR_DNA[key] ?? 0} />
            ))}
          </View>
        </View>

        {/* Shared Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shared Interests</Text>
          <View style={styles.tagsWrap}>
            <SharedTag label="Street Food" icon="fork.knife" />
            <SharedTag label="Photography" icon="camera.fill" />
            <SharedTag label="Museums" icon="book.fill" />
            <SharedTag label="Night Markets" icon="moon.stars.fill" />
            <SharedTag label="Hiking" icon="figure.climbing" />
            <SharedTag label="Local Culture" icon="globe" />
          </View>
        </View>

        {/* Trip Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfect Destinations for You Two</Text>
          {["Tokyo", "Lisbon", "Barcelona"].map((dest, i) => (
            <View key={i} style={styles.destRow}>
              <View style={styles.destIcon}>
                <IconSymbol name="location.fill" size={16} color={BRAND.purple} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.destName}>{dest}</Text>
                <Text style={styles.destReason}>Matches both your Explorer and Foodie dimensions</Text>
              </View>
              <Text style={styles.destScore}>{95 - i * 4}%</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.messageBtn}
            onPress={() => router.push({ pathname: "/(social)/message-chat", params: { travelerId } })}
          >
            <IconSymbol name="message.fill" size={18} color="#fff" />
            <Text style={styles.messageBtnText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.planBtn} onPress={() => router.push("/(tabs)/trips")}>
            <IconSymbol name="airplane" size={18} color={BRAND.purple} />
            <Text style={styles.planBtnText}>Plan Trip Together</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { padding: 4 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 130 },

  scoreCard: { flexDirection: "row", alignItems: "center", gap: 16, borderRadius: RADIUS.lg, padding: 20, marginBottom: 24, overflow: "hidden", borderWidth: 1, borderColor: BRAND.purple + "40" },
  scoreCircle: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  scoreNumber: { ...TYPE.h1, color: "#fff" },
  scoreLabel: { ...TYPE.caption, color: "rgba(255,255,255,0.8)" },
  scoreInfo: { flex: 1, gap: 6 },
  scoreTitle: { ...TYPE.h3, color: BRAND.textPrimary },
  scoreDesc: { ...TYPE.small, color: BRAND.textSecondary },

  section: { marginBottom: 24 },
  sectionTitle: { ...TYPE.h3, color: BRAND.textPrimary, marginBottom: 4 },
  sectionSub: { ...TYPE.caption, color: BRAND.textMuted, marginBottom: 14 },

  barsContainer: { gap: 12 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  barLabel: { ...TYPE.caption, color: BRAND.textSecondary, width: 90 },
  barTrack: { flex: 1, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" },
  barFill: { position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 4, opacity: 0.9 },
  barFillOverlay: { position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 4, opacity: 0.4 },
  compatScore: { ...TYPE.caption, fontFamily: "Satoshi-Bold", width: 36, textAlign: "right" },

  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sharedTag: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: BRAND.purple + "20", borderWidth: 1, borderColor: BRAND.purple + "40" },
  sharedTagText: { ...TYPE.body, color: BRAND.textPrimary },

  destRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: BRAND.border },
  destIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: BRAND.purple + "20", alignItems: "center", justifyContent: "center" },
  destName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  destReason: { ...TYPE.caption, color: BRAND.textSecondary, marginTop: 2 },
  destScore: { ...TYPE.h4, color: BRAND.green },

  actions: { gap: 12, marginTop: 8 },
  messageBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: RADIUS.md, backgroundColor: BRAND.purple },
  messageBtnText: { ...TYPE.button, color: "#fff" },
  planBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: RADIUS.md, backgroundColor: "transparent", borderWidth: 1, borderColor: BRAND.purple },
  planBtnText: { ...TYPE.button, color: BRAND.purple },
});
