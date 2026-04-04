// Screen 25 — Activity Select Swipe — STATIC WIREFRAME
// Route: /(trip)/activity-select | Mode: Planning
// Spec: Progress 8px, Card stack 90%x65%, Skip/Info/Love buttons (56/48/56px), 30 cards, Undo max 3

import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ActivitySelectScreen() {
  return (
    <View style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Select Activities</Text>
        <Pressable><Text style={s.skipText}>Skip</Text></Pressable>
      </View>

      {/* Progress bar — 8px */}
      <View style={s.progressWrap}>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: "40%" }]} />
        </View>
        <Text style={s.progressText}>12/30</Text>
      </View>

      {/* Card stack — 90% width x 65% height */}
      <View style={s.cardStack}>
        {/* Background card */}
        <View style={[s.card, s.cardBg2]}>
          <Text style={s.cardPlaceholder}>Next Activity</Text>
        </View>
        {/* Middle card */}
        <View style={[s.card, s.cardBg1]}>
          <Text style={s.cardPlaceholder}>Next Activity</Text>
        </View>
        {/* Front card */}
        <View style={[s.card, s.cardFront]}>
          <View style={s.cardImage}>
            <Text style={s.imgText}>Activity Photo</Text>
          </View>
          <View style={s.cardBody}>
            <View style={s.categoryBadge}><Text style={s.categoryText}>Adventure</Text></View>
            <Text style={s.cardTitle}>Bali Swing Experience</Text>
            <Text style={s.cardDesc}>Swing over the jungle canopy with breathtaking views of the rice terraces and river valley below.</Text>
            <View style={s.cardMeta}>
              <Text style={s.metaItem}>3h</Text>
              <Text style={s.metaDot}>·</Text>
              <Text style={s.metaItem}>E45</Text>
              <Text style={s.metaDot}>·</Text>
              <Text style={s.metaItem}>4.8 stars</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action buttons — Skip(56) / Info(48) / Love(56) */}
      <View style={s.actionRow}>
        <Pressable style={[s.actionBtn, s.skipBtn]}>
          <Text style={s.skipIcon}>✕</Text>
          <Text style={s.actionLabel}>Skip</Text>
        </Pressable>
        <Pressable style={[s.actionBtn, s.infoBtn]}>
          <Text style={s.infoIcon}>i</Text>
          <Text style={s.actionLabel}>Info</Text>
        </Pressable>
        <Pressable style={[s.actionBtn, s.loveBtn]}>
          <Text style={s.loveIcon}>♥</Text>
          <Text style={s.actionLabel}>Love</Text>
        </Pressable>
      </View>

      {/* Undo */}
      <Pressable style={s.undoBtn}><Text style={s.undoText}>Undo (3 left)</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  skipText: { color: "#888", fontSize: 14 },
  progressWrap: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 12, gap: 10 },
  progressTrack: { flex: 1, height: 8, borderRadius: 4, backgroundColor: "#222" },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: "#555" },
  progressText: { color: "#888", fontSize: 12 },
  cardStack: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  card: { position: "absolute", width: "90%", height: "85%", borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  cardBg2: { transform: [{ scale: 0.92 }, { translateY: -16 }], opacity: 0.4 },
  cardPlaceholder: { color: "#666", fontSize: 14, textAlign: "center" as const, padding: 20 },
  cardBg1: { transform: [{ scale: 0.96 }, { translateY: -8 }], opacity: 0.6 },
  cardFront: { position: "relative", width: "90%", height: "85%" },
  cardImage: { height: "55%", backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  imgText: { color: "#555", fontSize: 16 },
  cardBody: { flex: 1, padding: 16, gap: 6 },
  categoryBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: "#222", borderWidth: 1, borderColor: "#444" },
  categoryText: { color: "#CCC", fontSize: 11, fontWeight: "600" },
  cardTitle: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  cardDesc: { color: "#888", fontSize: 13, lineHeight: 19 },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  metaItem: { color: "#888", fontSize: 13 },
  metaDot: { color: "#555" },
  actionRow: { flexDirection: "row", justifyContent: "center", gap: 24, paddingVertical: 16 },
  actionBtn: { alignItems: "center", gap: 4 },
  skipBtn: { width: 56, height: 56, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  infoBtn: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  loveBtn: { width: 56, height: 56, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  skipIcon: { color: "#888", fontSize: 20 },
  infoIcon: { color: "#888", fontSize: 18, fontWeight: "700" },
  loveIcon: { color: "#888", fontSize: 22 },
  actionLabel: { color: "#666", fontSize: 10 },
  undoBtn: { alignSelf: "center", paddingHorizontal: 16, paddingVertical: 8, marginBottom: 36 },
  undoText: { color: "#666", fontSize: 13 },
});
