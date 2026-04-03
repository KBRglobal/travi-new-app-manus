/**
 * Welcome to TRAVI Screen — Neutral Wireframe
 * Spec: Post-profile-setup, pre-DNA. Shows feature pills,
 *       "Let's Go" CTA → DNA categories, "Skip" → home.
 */
import { useRef, useEffect, useState } from "react";
import {
  View, Text, StyleSheet, Animated, TouchableOpacity, Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const N = {
  bg:       "#111111",
  surface:  "#1A1A1A",
  white:    "#FFFFFF",
  textSec:  "#ABABAB",
  textTer:  "#777777",
  accent:   "#007AFF",
  border:   "#333333",
  success:  "#4ADE80",
  pink:     "#F94498",
};

const FEATURES = [
  { icon: "heart.fill" as const, text: "Trips that feel like they were made for you", color: "#F94498" },
  { icon: "safari.fill" as const, text: "No more endless searching", color: "#007AFF" },
  { icon: "checkmark.circle.fill" as const, text: "Decisions you'll never regret", color: "#4ADE80" },
];

export default function WelcomeTraviScreen() {
  const { dispatch } = useStore();
  const [showSkipModal, setShowSkipModal] = useState(false);

  const mascotY = useRef(new Animated.Value(100)).current;
  const mascotOpacity = useRef(new Animated.Value(0)).current;
  const pillAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Mascot bounces in
    Animated.parallel([
      Animated.spring(mascotY, { toValue: 0, friction: 6, tension: 40, useNativeDriver: true }),
      Animated.timing(mascotOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start(() => {
      // Pills fade in sequentially
      const pillSequence = pillAnims.map((anim, i) =>
        Animated.timing(anim, { toValue: 1, duration: 300, delay: i * 200, useNativeDriver: true })
      );
      Animated.stagger(200, pillSequence).start(() => {
        Animated.timing(ctaOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    });
  }, []);

  const handleLetsGo = () => {
    router.push("/(dna)/categories" as never);
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    dispatch({ type: "SET_ONBOARDING_COMPLETED" });
    router.replace("/(tabs)" as never);
  };

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>
        <View style={s.container}>

          {/* Mascot area */}
          <Animated.View style={[s.mascotWrap, {
            opacity: mascotOpacity,
            transform: [{ translateY: mascotY }],
          }]}>
            <View style={s.mascotCircle}>
              <Text style={s.mascotEmoji}>🦆</Text>
            </View>
          </Animated.View>

          {/* Headline */}
          <Text style={s.headline}>Welcome to TRAVI!</Text>
          <Text style={s.subheadline}>Let's discover your travel DNA</Text>

          {/* Feature pills */}
          <View style={s.pillsContainer}>
            {FEATURES.map((feat, i) => (
              <Animated.View key={i} style={[s.pill, { opacity: pillAnims[i] }]}>
                <View style={[s.pillIcon, { backgroundColor: feat.color + "18" }]}>
                  <IconSymbol name={feat.icon} size={22} color={feat.color} />
                </View>
                <Text style={s.pillText}>{feat.text}</Text>
              </Animated.View>
            ))}
          </View>

          {/* CTA section */}
          <Animated.View style={[s.ctaSection, { opacity: ctaOpacity }]}>
            <TouchableOpacity style={s.primaryBtn} onPress={handleLetsGo} activeOpacity={0.8}>
              <Text style={s.primaryBtnText}>Let's Go</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkip} activeOpacity={0.6}>
              <Text style={s.skipText}>I'll do this later</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Skip confirmation modal */}
        <Modal visible={showSkipModal} transparent animationType="fade">
          <View style={s.modalOverlay}>
            <View style={s.modalContent}>
              <Text style={s.modalTitle}>Skip DNA Setup?</Text>
              <Text style={s.modalMessage}>
                You can complete it later from your profile. Your recommendations won't be as accurate.
              </Text>
              <View style={s.modalActions}>
                <TouchableOpacity
                  style={s.modalCancel}
                  onPress={() => setShowSkipModal(false)}
                  activeOpacity={0.7}
                >
                  <Text style={s.modalCancelText}>Continue Setup</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.modalConfirm}
                  onPress={confirmSkip}
                  activeOpacity={0.8}
                >
                  <Text style={s.modalConfirmText}>Skip for Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  safe: { flex: 1 },
  container: {
    flex: 1, paddingHorizontal: 24,
    justifyContent: "center", alignItems: "center",
  },

  mascotWrap: { marginBottom: 28 },
  mascotCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  mascotEmoji: { fontSize: 56 },

  headline: {
    fontSize: 32, fontWeight: "800", color: N.white,
    textAlign: "center", letterSpacing: -0.5, marginBottom: 8,
  },
  subheadline: {
    fontSize: 17, color: N.textSec, textAlign: "center", marginBottom: 40,
  },

  pillsContainer: { width: "100%", gap: 12, marginBottom: 40 },
  pill: {
    flexDirection: "row", alignItems: "center", gap: 14,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18,
  },
  pillIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  pillText: { flex: 1, fontSize: 15, color: N.white, fontWeight: "500", lineHeight: 21 },

  ctaSection: { width: "100%", alignItems: "center", gap: 16 },
  primaryBtn: {
    width: "100%", height: 56, borderRadius: 28,
    backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center",
  },
  primaryBtnText: { fontSize: 17, fontWeight: "700", color: N.white },
  skipText: { fontSize: 14, color: N.textTer, fontWeight: "500" },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center", alignItems: "center", padding: 32,
  },
  modalContent: {
    width: "100%", backgroundColor: N.surface,
    borderRadius: 20, padding: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: N.white, textAlign: "center", marginBottom: 8 },
  modalMessage: { fontSize: 15, color: N.textSec, textAlign: "center", lineHeight: 22, marginBottom: 24 },
  modalActions: { flexDirection: "row", gap: 12 },
  modalCancel: {
    flex: 1, height: 48, borderRadius: 24,
    backgroundColor: N.bg, borderWidth: 1, borderColor: N.border,
    justifyContent: "center", alignItems: "center",
  },
  modalCancelText: { color: N.textSec, fontSize: 15, fontWeight: "600" },
  modalConfirm: {
    flex: 1, height: 48, borderRadius: 24, backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center",
  },
  modalConfirmText: { color: N.white, fontSize: 15, fontWeight: "700" },
});
